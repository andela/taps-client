import React from 'react';
import { connect } from 'react-redux';
// components
import { withRequests } from '../../HOC/withRequests';
import { Request } from '../../Admin/components/AdminRequest';
import { loadRequests } from '../../../redux/actions/requests';


export const JoinTeamRequests = withRequests(Request, {
  pageTitle: 'Join Team Requests',
  hideNav: true,
  requestType: 'member_request'
});


export const mapStateToProps = ({ requestsReducer }) => ({
  loadedRequests: requestsReducer.loadedRequests
});

export default connect(mapStateToProps, { loadRequests })(JoinTeamRequests);
