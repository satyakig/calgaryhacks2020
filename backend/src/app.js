import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import asyncHandler from 'express-async-handler';
import { initializeApp } from './lib/Firebase';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('short'));

initializeApp();

app.use(
  '/',
  asyncHandler(async (req, res, next) => {
    res.send('Hello World');
  }),
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.debug(`Server started at http://localhost:${PORT}`);
});

export default app;
