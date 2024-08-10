import { confirmAlert } from "react-confirm-alert";

export const showAlertBox = ({ title, message, onConfim, onCancel }) => {
  confirmAlert({
    title,
    message,
    buttons: [
      {
        label: onConfim.msg,
        onClick: onConfim.action
      },
      {
        label: onCancel.msg,
        onClick: onCancel.action
      }
    ]
  });
}
