export const UPDATE_COURSES = 'UPDATE_COURSES';

export function updateCourses(courses) {
  return {
    type: UPDATE_COURSES,
    courses,
  };
}
