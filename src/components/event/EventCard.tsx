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
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RoomIcon from '@material-ui/icons/Room';
import { Event } from "../../store/events/types";

interface IProps {
  event?: Event;
}

export default function EventCard(props: IProps) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
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
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <CardContent>
        <div className={classes.eventLocation}>
          <RoomIcon/>
          <span className={classes.eventLocationText}>Cluj-Napoca, Romania</span>
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
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      minWidth: '30%',
      maxWidth: '100%',
      float: 'left',
      margin: '15px 15px 0 0',
    },
    media: {
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
