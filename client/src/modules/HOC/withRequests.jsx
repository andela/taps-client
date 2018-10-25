import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// components
import Navbar from '../common/Navbar';

export const withRequests = (WrappedComponent, data) => {
  class ComponentWithData extends Component {
    constructor(props) {
      super(props);

      this.state = {
        checkAll: false,
        allRequests: []
      };

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handlePaginationClick = this.handlePaginationClick.bind(this);
    }

    componentDidMount() {
      const { loadRequests } = this.props;
      loadRequests(data.requestType, 20);
    }

    componentWillReceiveProps(nextProps) {
      // set state for pagination support
      this.setState({
        pagination: nextProps.loadedRequests.pagination
      });
      this.addCheckedFieldToRequests(nextProps.loadedRequests.requests);
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

    handlePaginationClick(event, { activePage }) {
      const { pagination } = this.state;
      const { loadRequests } = this.props;
      const nextOffset = (activePage - 1) * pagination.limit;

      loadRequests(data.requestType, '', nextOffset);
    }

    render() {
      const {
        checkBoxes, checkAll,
        allRequests, pagination
      } = this.state;
      return (
        <Fragment>
          {!data.hideNav ? <Navbar /> : null}
          <WrappedComponent
            headerText={data.pageTitle}
            handleChange={this.handleInputChange}
            checkOne={checkBoxes}
            requests={allRequests}
            checkedAll={checkAll}
            pagination={pagination}
            handlePaginationClick={this.handlePaginationClick}
          />
        </Fragment>
      );
    }
  }

  ComponentWithData.propTypes = {
    loadRequests: PropTypes.func,
    loadedRequests: PropTypes.object
  };

  ComponentWithData.defaultProps = {
    loadRequests: () => {},
    loadedRequests: []
  };
  return ComponentWithData;
};

export default withRequests;
