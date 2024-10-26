import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const TOAST_TIMEOUT = 3000;
const TOAST_POSITION = 'topRight';

export function showWarning(message) {
  iziToast.warning({
    message,
    timeout: TOAST_TIMEOUT,
    position: TOAST_POSITION,
    close: false,
  });
}

export function showError(message) {
  iziToast.error({
    message,
    timeout: TOAST_TIMEOUT,
    position: TOAST_POSITION,
    close: false,
  });
}
