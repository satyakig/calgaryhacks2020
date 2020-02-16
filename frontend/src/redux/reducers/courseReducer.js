import { CoursesModel } from '../models/CourseModel';
import { UPDATE_COURSES } from '../actions/CourseAction';
import { newState } from '../NewState';

export default (state = new CoursesModel(), action) => {
  if (action.type === UPDATE_COURSES) {
    const deliverables = action.courses.flatMap((course) => {
      return course.Deliverables.map((deliverable) => {
        return {
          ...deliverable,
          course: course.course,
        };
      });
    });

    return newState(state, {
      courses: action.courses,
      deliverables,
    });
  }

  return state;
};
