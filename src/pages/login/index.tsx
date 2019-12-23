import React from 'react';
import firebase from 'firebase';
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { authRequest, googleAuthRequest } from "../../store/auth/actions";
import { Button, Container, Grid, Paper, TextField} from "@material-ui/core";
import { Formik } from "formik";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const DEFAULT_FORM_VALUES = {
  email: '',
  password: '',
};

interface PropsFromState {
  loading: boolean;
  data: any;
  errors?: string;
}

interface PropsFromDispatch {
  authRequest: typeof authRequest
  googleAuthRequest: typeof googleAuthRequest
}

type AllProps = PropsFromState & PropsFromDispatch

const LoginPage = (props: AllProps) => {
  const classes = useStyles();
  const [initialFormValues, setInitialFormValues] = React.useState(DEFAULT_FORM_VALUES);

  React.useEffect(() => {
    // TODO to be removed later
    const payload = {
      email: 'events@events.com',
      password: 'events123',
    };
    props.authRequest(payload);
    setInitialFormValues({...DEFAULT_FORM_VALUES});
  }, []);

  const handleFBLogin = () => {
    console.log('facebook');
  };

  const handleGoogleLogin = () => {
    console.log('Google');
    props.googleAuthRequest();
  };

  const onSubmit = () => {
    console.log('submit');
  };
  return (
    <Container style={ {marginTop: '5%', height: '100%'} }>
        <Formik
          initialValues={initialFormValues}
          onSubmit={onSubmit}
        >
          {
            ({
               values,
               errors,
               touched,
               handleSubmit,
               handleChange,
               handleBlur,
               isSubmitting,
               setFieldValue,
             }) => (
              <React.Fragment>
                <Paper>
                    <form className={classes.form}>
                      <Grid
                        container
                        spacing={3}
                        direction="column"
                        justify="center"
                        alignItems="center"
                      >
                        <h2>Login</h2>
                        <Grid item md={12} sm={12} xs={12}>
                          <TextField
                            variant='outlined'
                            id="email-input"
                            label="Email"
                            type="email"
                            name='email'
                          />
                        </Grid>
                        <Grid item md={12}>
                          <TextField
                            variant='outlined'
                            id="password-input"
                            label="Password"
                            type="password"
                            name='password'
                            autoComplete="current-password"
                          />
                        </Grid>
                        <Grid item md={12}>
                          <Button color='primary' variant='contained'>Login</Button>
                        </Grid>
                        <Grid item md={12}>
                          <Button
                            color='primary'
                            variant='outlined'
                            onClick={handleFBLogin}
                          >
                            Login with facebook
                          </Button>
                        </Grid>
                        <Grid item md={12}>
                          <Button
                            color='secondary'
                            variant='outlined'
                            onClick={handleGoogleLogin}
                          >
                            Login with google
                          </Button>
                        </Grid>

                      </Grid>
                   </form>
                </Paper>
              </React.Fragment>
              )
          }
          </Formik>
    </Container>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      display: 'none',
    },
    formControl: {
      // margin: theme.spacing(1),
      width: '100%',
      // float: 'left',
    },
    chip: {
      margin: 2,
    },
    form: {
      width: '100%',
      padding: theme.spacing(2, 3),
      height: 'auto',
    }
  }),
);

const mapStateToProps = ({ auth }: ApplicationState) => ({
  loading: auth.loading,
  errors: auth.errors,
  data: auth.data
});

const mapDispatchToProps = {
  authRequest,
  googleAuthRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)
