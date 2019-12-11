import * as React from 'react';
import { connect } from 'react-redux';

import { ApplicationState } from '../../store';
import { Event } from '../../store/events/types';
import { fetchRequest } from '../../store/events/actions';
import Page from "../../components/layout/Page";
import { Container } from "@material-ui/core";

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean;
  data: Event[];
  errors?: string;
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch

const DashboardIndexPage = (props: AllProps) => {
  return (
    <Page>
      <Container>
        <h3>Dashboard Page</h3>
      </Container>
    </Page>
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
  fetchRequest
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardIndexPage)

