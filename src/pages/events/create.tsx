import React from 'react';
import { connect } from 'react-redux';
import {Formik} from "formik";
import { ApplicationState } from '../../store';
import { Event } from '../../store/events/types';
import { addEvent } from '../../store/events/actions';
import GoogleMap from '../../components/event/LocationSelect';
import { Container, Button, TextField, FormControl, Chip, Grid, Paper, Select, InputLabel } from "@material-ui/core";
import DatePicker, { DatePickerOptions } from '../../components/common/DatePicker';
import TimePicker from '../../components/common/TimePicker';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ImageUpload from '../../components/common/ImageUpload';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import moment from "moment";


const categories = [
  'Social',
  'Activities',
  'Other',
];


const INITIAL_FORM_VALUES = {
  name: '',
  categories: '',
  eventType: 'public',
  dateFrom: moment(new Date).format('YYYY-MM-DD'),
  timeFrom: '',
  dateTo: moment(new Date).format('YYYY-MM-DD'),
  timeTo: '',
  description: '',
  location: '',
  imageUrl: '',
};

const dateFromOptions = (): DatePickerOptions => {
  return {
    name: 'dateFrom',
    id: 'date-from',
    label: 'Start date',
    ariaLabel: 'change date',
  }
};

const dateEndOptions = (): DatePickerOptions => {
  return {
    name: 'dateTo',
    id: 'date-end',
    label: 'End date',
    ariaLabel: 'change date',
  }
};

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean;
  data: Event[];
  errors?: string;
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  addEvent: typeof addEvent
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch

const CreateEventPage = (props: AllProps) => {
  const classes = useStyles();
  const [initialFormValues, setInitialFormValues] = React.useState(INITIAL_FORM_VALUES);
  const [eventImageUrl, setEventImageUrl] = React.useState<string>('');

  React.useEffect(() => {
    setInitialFormValues({
      ...INITIAL_FORM_VALUES,
    });
  }, []);

  const onSubmit = (values: any) => {
    const newEvent = createEvent(values);
    console.log(newEvent);
    props.addEvent(newEvent);
  };

  const createEvent = (values: any): Event => {
    return {
      name: values.name,
      creator: 'admin',
      date: {
        dateTimeFrom: `${values.dateFrom} ${values.timeFrom}`,
        dateTimeTo: `${values.dateTo} ${values.timeTo}`,
      },
      location: 'Cluj-Napoca, Romania',
      eventType: values.eventType,
      price: 'free',
      categories: values.categories,
      description: values.description,
      imageUrl: eventImageUrl,
    }
  };

  const getUploadedImage = (imageUrl: any): void => {
    setEventImageUrl(imageUrl);
    console.log(imageUrl);
  };

  return (
    <Container>
        <h3>Create Events</h3>
        <Paper>
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
                  <form
                    className={classes.form}
                    onSubmit={handleSubmit}
                  >

                    <Grid container spacing={3}>
                      <Grid item md={12} sm={12} xs={12}>

                        <ImageUpload onChange={getUploadedImage} imagesFolder='events-profile-images'/>

                      </Grid>

                      <Grid item md={6} sm={6} xs={12}>
                        <FormControl className={classes.formControl}>
                          <TextField
                            fullWidth
                            value={values.name}
                            id="event-name"
                            label="Event title"
                            type="text"
                            onBlur={handleChange}
                            onChange={handleChange}
                            name='name'
                          />
                        </FormControl>
                      </Grid>

                      <Grid item md={6} sm={6} xs={12}>
                        <FormControl className={classes.formControl}>

                          <GoogleMap/>

                        </FormControl>
                      </Grid>

                      <Grid item md={6} sm={6} xs={12}>
                        <FormControl className={classes.formControl}>
                          <Autocomplete
                            multiple
                            id="categories"
                            options={categories}
                            getOptionLabel={(option: string) => option}
                            onBlur={handleBlur}
                            onChange={(el, value) => setFieldValue('categories', value)}
                            renderTags={(value: string[], getTagProps) => {
                              return value.map((option: string, index: number) => (
                                <Chip label={option} {...getTagProps({ index })} />
                              ))
                             }
                            }
                            renderInput={params => (
                              <TextField
                                name='categories'
                                {...params}
                                label="Categories"
                                placeholder="Select categories"
                                fullWidth
                              />
                            )}
                          />

                        </FormControl>
                      </Grid>

                      <Grid item md={6} sm={6} xs={12}>
                        <FormControl required className={classes.formControl}>
                          <InputLabel htmlFor="age-native-required">Event Type</InputLabel>
                          <Select
                            native
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name='eventType'
                            defaultValue=''
                          >
                            <option value='public'>Public</option>
                            <option value='private'>Private</option>
                            <option value='secret'>Secret</option>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item md={6} sm={6} xs={12}>
                        <FormControl className={classes.formControl}>

                          <DatePicker
                            onChange={(value, field) => setFieldValue(field, value)}
                            options={dateFromOptions()}
                            dateString={true}
                          />

                        </FormControl>
                      </Grid>

                      <Grid item md={6} sm={6} xs={12}>
                        <FormControl className={classes.formControl}>
                          <TimePicker
                            onChange={(value, field) => setFieldValue(field, value)}
                            timeString={true}
                            format='HH:mm'
                            options={{
                              label: 'Start time',
                              name: 'timeFrom',
                              id: 'timeFrom'
                            }}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item md={6} sm={6} xs={12}>
                        <FormControl className={classes.formControl}>

                          <DatePicker
                            onChange={(value, field) => setFieldValue(field, value)}
                            options={dateEndOptions()}
                            dateString={true}
                          />

                        </FormControl>
                      </Grid>

                      <Grid item md={6} sm={6} xs={12}>
                        <FormControl className={classes.formControl}>
                          <TimePicker
                            onChange={(value, field) => setFieldValue(field, value)}
                            timeString={true}
                            format='HH:mm'
                            options={{
                              label: 'End time',
                              name: 'timeTo',
                              id: 'timeTo'
                            }}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                          <TextField
                            value={values.description}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name='description'
                            id="event-description"
                            label="Description"
                            multiline
                            rows="4"
                            variant="outlined"
                          />
                        </FormControl>
                      </Grid>

                      <Grid item md={12} sm={12} xs={12}>
                        <FormControl className={classes.formControl}>
                          <Button onClick={() => handleSubmit()}>Submit</Button>
                        </FormControl>
                      </Grid>

                    </Grid>
                  </form>
                </React.Fragment>
              )
            }
          </Formik>
        </Paper>
      </Container>
  )
};

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ events }: ApplicationState) => ({
  loading: events.loading,
  errors: events.errors,
  data: events.data
});


const mapDispatchToProps = {
  addEvent
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEventPage)

