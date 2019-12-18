import React from 'react';
import {Container, Paper } from "@material-ui/core";
import { ApplicationState } from "../../store/index";
import { connect } from "react-redux";

import { getEvent } from '../../store/events/actions';


interface PropsFromState {
  loading?: boolean;
  events: Event[];
  event: Event;
  errors?: string;
}

interface PropsFromDispatch {
  getEvent: typeof getEvent
}

type AllProps = PropsFromState & PropsFromDispatch


const ViewEventPage = (props: AllProps) => {

  React.useEffect(() => {
    if(!props.events || props.events.length === 0) {
      props.getEvent('0OFr6Pa2HfTA0J94yNmM');
    }
    if(!props.event) {
      // const event = firebase.firestore().collection('events').doc('0OFr6Pa2HfTA0J94yNmM').get().then(res => console.log(res.data()));
      // console.log(event);
    }
    console.log(props.event);
  }, []);

  return (
    <Container>
      <Paper>
        <h2>View event</h2>
      </Paper>
    </Container>
  )
};

const mapStateToProps = (state: ApplicationState) => ({
  events: state.events.data
});

const mapDispatchToProps = {
  getEvent,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewEventPage as any) as any;
