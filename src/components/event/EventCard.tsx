import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Button,
  Grid,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RoomIcon from '@material-ui/icons/Room';
import { Event } from "../../store/events/types";
import moment from 'moment';

interface IProps {
  event: Event;
  onClick?: () => void;
}

export default function EventCard(props: IProps) {
  const [event, setEvent] = React.useState<Event | null>(null);
  const classes = useStyles();

  React.useEffect(() => {
    setEvent(props.event);
  }, [props.event]);

  return props.event && (
    <Grid item md={3} sm={6} xs={12}>
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={event && event.name}
          subheader={event && moment(event.date.dateTimeFrom).format('LL')}
        />
        <CardMedia
          onClick={() => props.onClick && props.onClick()}
          className={classes.media}
          image={(event && event.imageUrl) || '/assets/images/image-placeholder.png'}
          title="Paella dish"
        />
        <CardContent>
          <div className={classes.eventLocation}>
            <RoomIcon/>
            <span className={classes.eventLocationText}>{event && event.location}</span>
          </div>
        </CardContent>
        <CardActions className={classes.eventCardActions} disableSpacing>
          <Button variant="contained" color="primary">Going</Button>
          <IconButton
            className={classes.watchEvent}
            aria-label="add to favorites"
          >
            <FavoriteIcon color="secondary" />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    clickable: {
      cursor: 'pointer',
    },
    media: {
      cursor: 'pointer',
      height: 0,
      paddingTop: '40%', // 16:9
    },
    avatar: {
      backgroundColor: red[500],
    },
    watchEvent: {
      marginLeft: 'auto',
    },
    eventLocation: {
      display: 'flex',
      alignItems: 'center',
    },
    eventLocationText: {
      fontSize: '16px',
    },
    eventCardActions: {
      padding: '16px',
    }
  }),
);
