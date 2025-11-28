import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {clearError} from "../../redux/slices/errorSlice";
import {selectError} from "../../redux/store.ts";

const GlobalErrorListener = () => {

    const errorMessage = useSelector(selectError);
    const dispatch = useDispatch();

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
            dispatch(clearError());
        }

    }, [errorMessage, dispatch]);

    return null;
}

export default GlobalErrorListener;
