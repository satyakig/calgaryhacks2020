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

var buildEmptyList = function buildEmptyList(courses) {
  let length = 17;
  let retVal = [];

  for (let i = 0; i < length; i++) {
    retVal.push(0);
  }

  return retVal;
};

app.get(
  '/getweekpercent/:courses',
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

    res.send({ percentageArr });
  }),
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.debug(`Server started at http://localhost:${PORT}`);
});

export default app;
