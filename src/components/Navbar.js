import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

export default function Navbar(props) {
  const classes = useStyles();
  let initials = props.name.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();

  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position='fixed'>
          <Toolbar>
            <Typography variant='h6' className={classes.title}>
              <Link
                color='inherit'
                underline='none'
                component={RouterLink}
                to='/'
              >
                Movieflix
              </Link>
            </Typography>
            {initials && <Avatar className={classes.avatar}>{initials}</Avatar>}
          </Toolbar>
        </AppBar>
        <div className={classes.offset} />
      </div>
      {props.children}
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  offset: theme.mixins.toolbar,
}));
