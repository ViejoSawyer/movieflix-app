import React, { Component } from 'react';
import { Stitch, RemoteMongoClient } from 'mongodb-stitch-browser-sdk';

import { withStyles } from '@material-ui/core/styles';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import MoviesTable from '../components/MoviesTable';
import MovieModal from '../components/MovieModal';
import Toast from '../components/Toast';

import getMovies from '../data';

class Movies extends Component {
  state = {
    loading: false,
    error: null,
    data: undefined,
    selectedMovie: {},
    search: '',
    modalIsOpen: false,
    toast: false,
    message: '',
    severity: 'warning',
  };

  componentDidMount() {
    //Initialize the App Client
    if (!Stitch.hasAppClient('candidatetest-ovajb')) {
      this.client = Stitch.initializeDefaultAppClient('candidatetest-ovajb');
    } else {
      this.client = Stitch.defaultAppClient;
    }
    //Get a MongoDB Service Client
    //This is used for logging in and communicating with mongoDB Stitch
    this.db = this.client
      .getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
      .db('sample_mflix');
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClick = (event, rowData) => {
    this.setState({ modalIsOpen: true, selectedMovie: rowData });
  };

  handleCloseModal = (e) => {
    this.setState({ modalIsOpen: false });
  };

  handleCloseToast = (e) => {
    this.setState({ toast: false });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (this.state.search) {
      this.setState({ loading: true, error: null });

      try {
        const movies = await getMovies(this.client, this.db, this.state.search);
        if (movies.length > 0) {
          this.setState({ loading: false, data: movies });
        } else {
          this.setState({
            loading: false,
            data: undefined,
            toast: true,
            message: 'No movies were found',
            severity: 'info',
          });
        }
      } catch (error) {
        this.setState({ loading: false, error: error });
      }
    } else {
      this.setState({
        toast: true,
        message: 'Write what you want to search',
        severity: 'warning',
      });
    }
  };

  render() {
    const { classes } = this.props;

    if (this.state.loading === true) {
      return <PageLoading />;
    }

    if (this.state.error) {
      return <PageError error={this.state.error} />;
    }

    return (
      <React.Fragment>
        <Container maxWidth='xs'>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <TextField
              name='search'
              label='Movie information'
              variant='outlined'
              margin='normal'
              value={this.state.search}
              onChange={this.handleChange}
            />
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Search
            </Button>
          </form>
        </Container>
        <MoviesTable data={this.state.data} onClick={this.handleClick} />
        <MovieModal
          isOpen={this.state.modalIsOpen}
          movie={this.state.selectedMovie}
          onCloseModal={this.handleCloseModal}
        />
        <Toast
          onCloseToast={this.handleCloseToast}
          open={this.state.toast}
          message={this.state.message}
          severity={this.state.severity}
        />
      </React.Fragment>
    );
  }
}

const styles = (theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 3, 3),
  },
});

export default withStyles(styles)(Movies);
