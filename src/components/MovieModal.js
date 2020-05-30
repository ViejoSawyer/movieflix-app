import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Image from 'material-ui-image';

export default function MovieModal(props) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={props.isOpen}
        onClose={props.onCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.isOpen}>
          <div className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs>
                <Image
                  src={props.movie.poster ? props.movie.poster : ''}
                  aspectRatio={2 / 3}
                  disableSpinner
                />
              </Grid>
              <Grid item xs={9}>
                <h2 id='transition-modal-title'>
                  {props.movie.title} (
                  {props.movie.released
                    ? props.movie.released.getFullYear()
                    : ''}
                  )
                </h2>
                <p id='transition-modal-description'>{props.movie.plot}</p>
                <h4>Director</h4>
                <p id='transition-modal-description'>{props.movie.directors}</p>
                <h4>Cast</h4>
                <p id='transition-modal-description'>{props.movie.cast}</p>
                <h4>IMDb</h4>
                <p id='transition-modal-description'>{props.movie.imdb}/10</p>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 3),
    margin: theme.spacing(0, 10, 0),
    float: 'left',
  },
}));
