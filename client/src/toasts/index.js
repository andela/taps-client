import { toast } from 'react-toastify';

import swal from 'sweetalert';

export const errorMessage = message => {
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER
  });
};

export const successMessage = message => {
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER
  });
};

export const warningMessage = message => {
  toast.warn(message, {
    position: toast.POSITION.TOP_CENTER
  });
};

export const apiAlert = (success, failure) => {
  return (
    swal("Here's the title!", "...and here's the text!")
  )
}


