import { RouteHttpType } from '../../../_types/core';

import createSubjects from '../_controller/_api/Subject/createSubjects';
import listSubjects from '../_controller/_api/Subject/listSubjects';
import updateSubject from '../_controller/_api/Subject/updateSubject';
import deleteSubjects from '../_controller/_api/Subject/deleteSubjects';

import listSubjectEnrollment from '../_controller/_api/Enrollment/listSubjectEnrollment';
import updateSubjectAttendance from '../_controller/_api/Enrollment/updateSubjectAttendance';

import subjectDetails from '../_controller/_ui/Subject/subjectDetails';
import subjectListing from '../_controller/_ui/Subject/subjectListing';

const routingConfig = {
  API_ROUTING: [
    /////////////////////////// Subject Routes
    {
      routeHttpType: RouteHttpType.POST,
      subroute: '/createSubjects',
      needsAuthentication: true,
      controller: createSubjects.controller,
      parser: createSubjects.parser
    },
    {
      routeHttpType: RouteHttpType.POST,
      subroute: '/listSubjects',
      needsAuthentication: true,
      controller: listSubjects.controller,
      parser: listSubjects.parser
    },
    {
      routeHttpType: RouteHttpType.POST,
      subroute: '/updateSubject',
      needsAuthentication: true,
      controller: updateSubject.controller,
      parser: updateSubject.parser
    },
    {
      routeHttpType: RouteHttpType.POST,
      subroute: '/deleteSubject',
      needsAuthentication: true,
      controller: deleteSubjects.controller,
      parser: deleteSubjects.parser
    },
    /////////////////////////// Enrollment Routes
    {
      routeHttpType: RouteHttpType.POST,
      subroute: '/listSubjectEnrollment',
      needsAuthentication: true,
      controller: listSubjectEnrollment.controller,
      parser: listSubjectEnrollment.parser
    },
    {
      routeHttpType: RouteHttpType.POST,
      subroute: '/updateSubjectAttendance',
      needsAuthentication: true,
      controller: updateSubjectAttendance.controller,
      parser: updateSubjectAttendance.parser
    }
  ],
  UI_ROUTING: [
    {
      routeHttpType: RouteHttpType.GET,
      subroute: '/subjectListing',
      needsAuthentication: true,
      parser: subjectListing.parser,
      viewPath: '_pages/teacher_subject_listing'
    },
    {
      routeHttpType: RouteHttpType.GET,
      subroute: '/subjectDetails/:subjectId',
      needsAuthentication: true,
      parser: subjectDetails.parser,
      viewPath: '_pages/teacher_subject_details'
    }
  ]
};

export default routingConfig;
