import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import asyncHandler from 'express-async-handler';
import { initializeApp, getDB } from './lib/Firebase';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('short'));

initializeApp();

app.use(
  '/',
  asyncHandler(async (req, res, next) => {
    next();
  }),
);

var buildEmptyList = function buildEmptyList(listSize, size) {
  if (!size) {
    size = 0;
  }
  let retVal = [];

  for (let i = 0; i < listSize; i++) {
    if (Array.isArray(size)) {
      retVal.push([]);
    } else {
      retVal.push(size);
    }
  }

  return retVal;
};

app.get(
  '/getweekpercent/:courses',
  asyncHandler(async (req, res) => {
    let courseArr = req.params.courses.split(',');
    let courseRef = getDB().collection('courses');

    let percentageArr = buildEmptyList(17);

    for (let i = 0; i < courseArr.length; i++) {
      let queryRef = await courseRef
        .where('course', '==', courseArr[i])
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }

          snapshot.forEach((doc) => {
            let docJSON = doc.data();
            let deliverables = docJSON.Deliverables;

            for (let j = 0; j < deliverables.length; j++) {
              percentageArr[deliverables[j].date_week - 1] += deliverables[j].weight;
            }
          });
        });
    }

    res.send({ percentageArr });
  }),
);

app.get(
  '/getweekcolour/:courses',
  asyncHandler(async (req, res) => {
    let courseArr = req.params.courses.split(',');
    let courseRef = getDB().collection('courses');

    let percentageArr = buildEmptyList();

    for (let i = 0; i < courseArr.length; i++) {
      let queryRef = await courseRef
        .where('course', '==', courseArr[i])
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }

          snapshot.forEach((doc) => {
            let docJSON = doc.data();
            let deliverables = docJSON.Deliverables;

            for (let j = 0; j < deliverables.length; j++) {
              percentageArr[deliverables[j].date_week - 1] += deliverables[j].weight;
            }
          });
        });
    }

    for (let i = 0; i < percentageArr.length; i++) {
      if (percentageArr[i] > 50) {
        percentageArr[i] = 3;
      } else if (percentageArr[i] >= 20) {
        percentageArr[i] = 2;
      } else if (percentageArr[i] > 0) {
        percentageArr[i] = 1;
      } else {
        percentageArr[i] = 0;
      }
    }

    res.send({ percentageArr });
  }),
);

app.get(
  '/getstudyplan/:courses',
  asyncHandler(async (req, res) => {
    let courseArr = req.params.courses.split(',');
    let courseRef = getDB().collection('courses');

    let all_assignments = [];

    for (let i = 0; i < courseArr.length; i++) {
      let queryRef = await courseRef
        .where('course', '==', courseArr[i])
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }

          snapshot.forEach((doc) => {
            let docJSON = doc.data();
            let deliverables = docJSON.Deliverables;

            for (let j = 0; j < deliverables.length; j++) {
              let toAdd = {};
              toAdd['deliverables'] = deliverables[j];
              toAdd['deliverables']['task'] = docJSON.course + ': ' + toAdd['deliverables']['name'];
              all_assignments.push(toAdd);
            }
          });
        });
    }

    let todo_list = buildEmptyList(119, []);
    let time_left = buildEmptyList(119, 6);

    // Generating todo_list
    for (let i = 0; i < all_assignments.length; i++) {
      let name = all_assignments[i]['deliverables']['task'];
      let day = all_assignments[i]['deliverables']['date_day'] - 1;
      let hours = all_assignments[i]['deliverables']['hours'];

      // Search for a free day;
      while (hours > 0) {
        while (time_left[day] < 2) {
          day -= 1;
        }

        time_left[day] -= 2;
        todo_list[day].push(name + ': 2 Hours');

        hours -= 2;
        day -= 1;
      }
    }

    res.send({ todo_list });
  }),
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.debug(`Server started at http://localhost:${PORT}`);
});

export default app;
