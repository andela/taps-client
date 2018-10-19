import React, { Component, Fragment } from 'react';

// components
import Navbar from '../common/Navbar';

const withRequests = (WrappedComponent, data) => {
  class ComponentWithData extends Component {
    constructor(props) {
      super(props);

      this.state = {
        checkAll: false
      };

      this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
      this.addCheckedFieldToRequests(data.requests);
    }

    handleInputChange(event, request) {
      const { target } = event;
      const { name, checked } = target;

      /**to check if the mark all button was clicked
       * then change the checked field of all the requests
      */
      if (name === 'main-control') {
        return this.setState(previousState => {
          const updatedRequests = previousState.allRequests
            .map(request => ({ ...request, checked }));

          return {
            ...previousState,
            checkAll: !previousState.checkAll,
            allRequests: updatedRequests
          };
        });
      }

      /**
       * this will handle when a single request is
       * selected and change the state of the mark all button
       */
      return this.setState(previousState => {
        const updatedRequest = previousState.allRequests
          .map(previousRequest => ((previousRequest.id === request.id) ?
            { ...previousRequest, checked } : previousRequest));

        return {
          ...previousState,
          checkAll: false,
          allRequests: updatedRequest
        };
      });
    }

    addCheckedFieldToRequests(requests) {
      // take all the requests map through and add checked field
      const requestsWithCheckedField = requests
        .map(request => ({ ...request, checked: false }));

      return this.setState({
        ...this.state,
        allRequests: requestsWithCheckedField
      });
    }

    render() {
      const { checkBoxes, checkAll, allRequests } = this.state;
      return (
        <Fragment>
          <Navbar />
          <WrappedComponent
            headerText={data.pageTitle}
            handleChange={this.handleInputChange}
            checkOne={checkBoxes}
            requests={allRequests}
            checkedAll={checkAll}
          />
        </Fragment>
      );
    }
  }

  return ComponentWithData;
};

export default withRequests;
