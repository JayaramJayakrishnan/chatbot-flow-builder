import * as React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface showAlert {
  show: boolean, 
  message: string, 
  status: string
}

const CustomSnackbar = ({showAlert, setShowAlert} : 
    {showAlert: showAlert, setShowAlert: React.Dispatch<React.SetStateAction<showAlert>>}) => {

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowAlert({show: false, message: "", status: ""})
  };

  React.useEffect(() => {
    console.log(showAlert)
  }, [showAlert])

  return (
    <div>
      <Snackbar 
        open={showAlert?.show} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert
          onClose={handleClose}
          severity={showAlert?.status}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {showAlert?.message || "Something went wrong!"}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomSnackbar