import React from 'react';
import firebase from 'firebase';
import moment from 'moment';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Container, Paper, Grid, Chip, Typography } from "@material-ui/core";
import { ApplicationState } from "../../store/index";
import { connect } from "react-redux";
import { Event } from '../../store/events/types'



interface IProps {
  loading?: boolean;
  events: Event[];
  event: Event | any;
  errors?: string;
  match: any;
}


const ViewEventPage = (props: IProps) => {
  const classes = useStyles();
  const [event, setEvent] = React.useState<Event | any>(null);

  React.useEffect(() => {
    if(!props.event) {
      getEventData();
    }
  }, []);

  const getEventData = async () => {
    const eventId = props.match.params.id;
    const collectionRef = firebase.firestore().collection('events');
    const eventData = await collectionRef.doc(`${eventId}`).get();
    const event = eventData.data();
    setEvent(event);
  };

  return (
    <Container>
      <Paper style={{padding: '0 2em'}}>
        {event &&
          <Grid container spacing={3}>
            <Grid item md={6} sm={6} xs={12}>
              <h2 className={classes.title}>
                {event.name}
              </h2>
              <p className={classes.mt0}>
                {moment(event.date.dateTimeFrom).format('LL')}
              </p>
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <h3 className={classes.title}>Categories</h3>
              {
                event.categories && event.categories.map(
                  (category: string) => (<Chip key={category} label={category} variant="outlined" />)
                )
              }
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <img
                src={event.imageUrl || '/assets/images/image-placeholder.png'}
                width="400"
                height="auto"
              />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <h3 className={classes.title}>
                Location
              </h3>
              <p className={classes.mt0}>{event.location}</p>
              <h4>Map here</h4>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              <h3 className={classes.title}>
                Description
              </h3>
              <p>
                { event.description }
              </p>
            </Grid>
          </Grid>
        }
      </Paper>
    </Container>
  )
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      // fontWeight: 'normal',
      marginBottom: '0.40em',
    },
    mb1: {
      marginBottom: '0.40em',
    },
    mt0: {
      marginTop: '0',
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

const mapStateToProps = (state: ApplicationState) => ({
  events: state.events.data
});

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewEventPage as any) as any;
