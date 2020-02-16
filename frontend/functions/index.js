const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');
const { dialogflow } = require('actions-on-google');

admin.initializeApp();
const firestore = admin.firestore();

const WELCOME_INTENT = 'Default Welcome Intent';
const FALLBACK_INTENT = 'Default Fallback Intent';
const TODO = 'Generate TODO';
const NEXT_ASSIGN = 'Next Assignment';
const NEXT_WEEK = 'Next Week';
const ASK_457 = 'Ask 457';
const BUSIEST_WEEK = 'Busiest Week';
const SAFEWALK = 'Safewalk';

const app = dialogflow();

app.intent(WELCOME_INTENT, (conv) => {
  conv.ask('Hello James');
});

app.intent(FALLBACK_INTENT, (conv) => {
  conv.ask('Hello James');
});

app.intent(TODO, (conv) => {
  let todo_list = ['CPSC418: Midterm Exam: 2 Hours', 'CPSC355: Midterm: 2 Hours'];
  conv.ask('You should study for 2 hours for CPSC-559 today');
});

app.intent(NEXT_ASSIGN, (conv) => {
  let todo_list = 'You have a Midterm Exam on Friday';
  firestore.collection('bot').add({ data: todo_list });
  conv.ask(todo_list);
});

app.intent(NEXT_WEEK, (conv) => {
  let todo_list =
    'Next week will be fairly busy for you. You have Midterm Exam for 418 and a Midterm Exam for CPSC355';
  conv.ask(todo_list);
});

app.intent(ASK_457, (conv) => {
  let todo_list =
    'It is an introduction to operating systems principles. Performance measurement; concurrent programs; the management of information, memory and processor resources.';
  conv.ask(todo_list);
});

app.intent(BUSIEST_WEEK, (conv) => {
  let todo_list =
    'Your busiest week is from March 21 - March 28. You have 4 deliverables due for a total of 75 weight.';
  conv.ask(todo_list);
});

app.intent(SAFEWALK, (conv) => {
  let todo_list =
    'Safewalks number is 403-220-5333 on 24 hours/seven days a week, 365 days a year!';
  conv.ask(todo_list);
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

exports.addUser = functions.auth.user().onCreate((user) => {
  const random = Math.ceil(Math.random() * 20000);
  const id = user.uid;
  const email = user.email ? user.email : `${random}@google.com`;
  const name = user.displayName ? user.displayName : `User ${random}`;
  const phone = user.phoneNumber ? user.phoneNumber : random;

  return fetch('https://randomuser.me/api/')
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      const image = result.results[0].picture.large;

      return firestore
        .collection('users')
        .doc(id)
        .set({
          uid: id,
          email,
          name,
          phone,
          avatarUrl: image,
        });
    });
});

exports.addPics = functions.https.onRequest((req, res) => {
  return firestore
    .collection('users')
    .get()
    .then((snapshot) => {
      return snapshot.forEach((doc) => {
        fetch('https://randomuser.me/api/')
          .then((res) => {
            return res.json();
          })
          .then((result) => {
            const image = result.results[0].picture.large;

            return firestore
              .collection('users')
              .doc(doc.id)
              .update({
                avatarUrl: image,
              });
          });
      });
    })
    .then(() => {
      res.send('Okay');
    })
    .catch(() => {
      res.send('Fucked');
    });
});
