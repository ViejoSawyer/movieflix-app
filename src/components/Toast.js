import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export default function Toast(props) {
  return (
    <Snackbar
      onClose={props.onCloseToast}
      open={props.open}
      autoHideDuration={5000}
    >
      <Alert onClose={props.onCloseToast} severity={props.severity}>
        {props.message}
      </Alert>
    </Snackbar>
  );
}
