import type {FC} from "react";
import type {ErrorData} from "../../types"
import {resendEmailVerificationByEmail} from "../../services/authService.ts";
import {setSuccessMsg} from "../../redux/slices/successMsgSlice.ts";
import {useDispatch} from "react-redux";

const FormError: FC<ErrorData> = ({ message, code, meta }) => {

    const dispatch = useDispatch();

    const onResendVerification = () => {
        const email: string = meta?.email ?? ''
        resendEmailVerificationByEmail(email)
            .then(() => dispatch(setSuccessMsg('Your verification email was resent!')))
    }

    if (!message)
        return null
    return (
        <div className="error-msg">
            <span>{message}</span>
            {code === 'AUTH_EMAIL_NOT_VERIFIED' && (
                <div style={{ marginTop: '5px' }}>
                    <button
                        className="btn-link-style"
                        onClick={onResendVerification}
                    >
                        Resend verification email (once in 15 minutes)
                    </button>
                </div>
            )}
        </div>
    );
}

export default FormError