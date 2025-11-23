import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {setError} from "../../redux/slices/errorSlice";

const GlobalErrorListener = () => {

    const errorMessage = useSelector((state: any) => state.error.errorMessage);

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
            dispatch(setError(null));
        }

    }, [errorMessage, dispatch]);

    return null;
}

export default GlobalErrorListener;
