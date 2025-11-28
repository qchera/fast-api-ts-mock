import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {clearSuccessMsg} from "../../redux/slices/successMsgSlice.ts";
import {selectSuccessMsg} from "../../redux/store.ts";

const GlobalSuccessListener = () => {

    const successMessage = useSelector(selectSuccessMsg);
    const dispatch = useDispatch();

    useEffect(() => {
        if (successMessage) {
            console.log(`success message ${successMessage}`)
            toast.success(successMessage, {
                toastId: successMessage,
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            dispatch(clearSuccessMsg());
        }

    }, [successMessage, dispatch]);

    return null;
}

export default GlobalSuccessListener;
