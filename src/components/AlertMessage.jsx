import { Alert } from 'react-bootstrap';

function AlertMessage({ variant = 'danger', message, onClose }) {
  if (!message) return null;
  
  return (
    <Alert variant={variant} onClose={onClose} dismissible={!!onClose}>
      {message}
    </Alert>
  );
}

export default AlertMessage;