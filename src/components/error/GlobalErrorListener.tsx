import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {selectErrorMsg} from "../../redux/store.ts";
import {useLocation} from "react-router-dom";
import {clearError} from "../../redux/slices/errorSlice.ts";

const GlobalErrorListener = () => {

    const errorMessage = useSelector(selectErrorMsg);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(clearError());
    }, [location.pathname, dispatch]);

    useEffect(() => {
        if (errorMessage) {
            console.log(`error message ${errorMessage}`)
            toast.error(errorMessage, {
                toastId: errorMessage,
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        }

    }, [errorMessage, dispatch]);

    return null;
}

export default GlobalErrorListener;
