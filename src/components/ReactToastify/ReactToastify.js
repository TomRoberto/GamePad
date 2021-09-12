import "./react-toastify.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (message, type, trois) => {
  toast(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    newestOnTop: false,
    pauseOnFocusLoss: true,
    className: type,
    bodyClassName: type,
  });
};
export default notify;
