import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {resendEmailVerification, verifyUrlSafeToken} from "../services/authService.ts";
import {useDispatch} from "react-redux";
import {setSuccessMsg} from "../redux/slices/successMsgSlice.ts";


const EmailVerificationPage: React.FC = () => {
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token') ?? ''
    const [userId, setUserId] = useState('')
    const [status, setStatus] = useState<'expired' | 'error' | 'success' | 'loading' | 'sent'>(token ? 'loading' : 'error')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const verificationAttempted = useRef(false);

    useEffect(() => {
        if (token && !verificationAttempted.current) {
            verificationAttempted.current = true
            verifyUrlSafeToken(token)
                .then(() => setStatus('success'))
                .catch((err) => {
                    if (err.response?.data?.detail.msg === 'Token has expired') {
                        setStatus('expired')
                        setUserId(err.response?.data?.detail.userId)
                    } else {
                        setStatus('error')
                    }
                })
        }
    }, [token]);

    useEffect(() => {
        if (status === 'sent' || status === 'error' || status === 'success') {
            const timer = setTimeout(() => {
                navigate('/login');
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [status, navigate]);

    const handleResendEmail = () => {
        resendEmailVerification(userId)
            .then(() => setStatus('sent'))
            .catch(() => {
                setStatus('error')
            })
    }

    const renderContent = () => {
        switch (status) {
            case 'loading':
                return (
                    <div className="text-center">
                        <h2 className="text-xl font-bold mb-4">Verifying...</h2>
                        <div className="spinner"></div>
                        <p>Please wait while we verify your email address.</p>
                    </div>
                );

            case 'sent':
                dispatch(setSuccessMsg('Your verification email was resent!'))
                return (
                    <div className="text-center">
                        <h2 className="text-xl font-bold mb-4">Verification Email Sent!</h2>
                        <p className="mb-6">Please check your mailbox and verify email again.</p>
                        <p>You will be redirected to the Login page in 10 seconds.</p>
                    </div>
                );

            case 'success':
                dispatch(setSuccessMsg('Your email was successfully verified!'))
                return (
                    <div className="text-center">
                        <h2 className="text-xl font-bold mb-4 text-success">Email Verified! 🎉</h2>
                        <p className="mb-6">Your email has been successfully verified. You can now access all features.</p>
                        <p>You will be redirected to the Login page in 10 seconds.</p>
                        <Link to="/login" className="btn-primary btn">
                            Go to Login
                        </Link>
                    </div>
                );

            case 'expired':
                return (
                    <div className="text-center">
                        <h2 className="text-xl font-bold mb-4 text-warning">Link Expired ⏳</h2>
                        <p className="mb-6">This verification link is no longer valid (it expires after 24 hours).</p>
                        <button onClick={handleResendEmail} className="btn btn-primary">
                            Resend Verification Email
                        </button>
                    </div>
                );

            case 'error':
            default:
                return (
                    <div className="text-center">
                        <h2 className="text-xl font-bold mb-4 text-danger">Verification Failed ❌</h2>
                        <p className="mb-6">The link is invalid or broken. Please check your email and try again.</p>
                        <p>You will be redirected to the Login page in 10 seconds.</p>
                        <Link to="/" className="btn btn-secondary">
                            Return Home
                        </Link>
                    </div>
                );
        }
    };

    return (
        <div className="page-center-container">
            <div className="card">
                {renderContent()}
            </div>
        </div>
    );
};

export default EmailVerificationPage;