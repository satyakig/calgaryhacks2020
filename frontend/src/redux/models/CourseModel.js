export class DeliverableModel {
  date = '';
  date_day = 0;
  date_week = 0;
  hours = 0;
  name = '';
  weight = '';
  course = '';
}

export class CourseModel {
  course = '';
  Deliverables = [];
}

export class CoursesModel {
  courses = [];
  deliverables = [];
}
