import { toast } from 'react-toastify';

export const showToast = (type, message) => {
  if (type === 'success') {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  } else if (type === 'error') {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
    });
  } else if (type === 'info') {
    toast.info(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
    });
  } else {
    toast.warn(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
    });
  }
};
