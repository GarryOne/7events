import React from 'react';
import { connect } from "react-redux";
import { ApplicationState } from "../../store/index";

import { registerRequest } from '../../store/user/actions';

import { Button, Container, Grid, Paper, TextField, FormControl } from "@material-ui/core";
import { Formik } from "formik";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";


const DEFAULT_FORM_VALUES = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

interface PropsFromState {
  loading: boolean;
  data: any;
  errors?: string;
}

interface PropsFromDispatch {
  registerRequest: typeof registerRequest
}

type AllProps = PropsFromState & PropsFromDispatch

const RegisterPage = (props: AllProps) => {
  const classes = useStyles();
  const [initialFormValues, setInitialFormValues] = React.useState(DEFAULT_FORM_VALUES);

  React.useEffect(() => {
    setInitialFormValues({...DEFAULT_FORM_VALUES});
  }, []);

  const onSubmit = (values: any) => {
    console.log('submit', values);
    props.registerRequest(values);
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
                <form
                  className={classes.form}
                  onSubmit={handleSubmit}
                >
                  <Grid
                    container
                    spacing={4}
                  >
                    <Grid item md={12} sm={12} xs={12}>
                      <h2>Register</h2>
                    </Grid>

                    <Grid item md={12} sm={12} xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          variant='outlined'
                          id="name-input"
                          label="Full name"
                          type="text"
                          name='name'
                          onBlur={handleChange}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item md={12} sm={12} xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          variant='outlined'
                          id="email-input"
                          label="Email"
                          type="email"
                          name='email'
                          onBlur={handleChange}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item md={12} sm={12} xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          variant='outlined'
                          id="password-input"
                          label="Password"
                          type="password"
                          name='password'
                          onBlur={handleChange}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item md={12} sm={12} xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          variant='outlined'
                          id="password-confirm-input"
                          label="Confirm password"
                          type="password"
                          name='passwordConfirm'
                          onBlur={handleChange}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item md={12}>
                      <Button
                        color='primary'
                        variant='contained'
                        onClick={() => handleSubmit()}
                      >
                        Register
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
      width: '100%',
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

});

const mapDispatchToProps = {
  registerRequest,
};

export default connect(
  null,
  mapDispatchToProps
)(RegisterPage)
