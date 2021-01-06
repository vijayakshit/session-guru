import { RouteHttpType } from '../../../_types/core';
import subjectListing from '../_controller/_ui/Subject/subjectListing';
import listLearnerSubjects from '../_controller/_api/Enrollment/listLearnerSubjects';
import deleteEnrollment from '../_controller/_api/Enrollment/deleteEnrollment';
import createEnrollment from '../_controller/_api/Enrollment/createEnrollment';

const routingConfig = {
  API_ROUTING: [
    {
      routeHttpType: RouteHttpType.POST,
      subroute: '/listLearnerSubjects',
      needsAuthentication: true,
      controller: listLearnerSubjects.controller,
      parser: listLearnerSubjects.parser
    },
    {
      routeHttpType: RouteHttpType.POST,
      subroute: '/createEnrollmentForLearner',
      needsAuthentication: true,
      controller: createEnrollment.controller,
      parser: createEnrollment.parser
    },
    {
      routeHttpType: RouteHttpType.POST,
      subroute: '/deleteEnrollmentForLearner',
      needsAuthentication: true,
      controller: deleteEnrollment.controller,
      parser: deleteEnrollment.parser
    }
  ],
  UI_ROUTING: [
    {
      routeHttpType: RouteHttpType.GET,
      subroute: '/subjectListing',
      needsAuthentication: true,
      parser: subjectListing.parser,
      viewPath: '_pages/learner_subject_listing'
    }
  ]
};

export default routingConfig;
