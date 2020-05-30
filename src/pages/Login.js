import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

import Toast from '../components/Toast';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      Movieflix {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class Login extends Component {
  state = {
    name: '',
    toast: false,
    message: '',
    severity: 'warning',
    redirect: null,
  };

  handleCloseToast = (e) => {
    this.setState({ toast: false });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClick = async (e) => {
    e.preventDefault();

    if (this.state.name) {
      this.props.setName(this.state.name);
      this.setState({ redirect: '/movies' });
    } else {
      this.setState({
        toast: true,
        message: 'Please enter your name',
        severity: 'warning',
      });
    }
  };

  render() {
    const { classes } = this.props;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Enter your name'
              name='name'
              autoComplete='name'
              autoFocus
              onChange={this.handleChange}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={this.handleClick}
            >
              Login
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
        <Toast
          onCloseToast={this.handleCloseToast}
          open={this.state.toast}
          message={this.state.message}
          severity={this.state.severity}
        />
      </Container>
    );
  }
}

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

export default withStyles(styles)(Login);
