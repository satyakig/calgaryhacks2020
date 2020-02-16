const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { dialogflow } = require('actions-on-google');

admin.initializeApp();

const firestore = admin.firestore();

const WELCOME_INTENT = 'Default Welcome Intent';
const FALLBACK_INTENT = 'Default Fallback Intent';
const NEED_QUOTE_INTENT = 'Generate TODO';
const app = dialogflow();

app.intent(WELCOME_INTENT, (conv) => {
  conv.ask('Hello James');
});

app.intent(FALLBACK_INTENT, (conv) => {
  conv.ask('Hello James');
});

app.intent(NEED_QUOTE_INTENT, (conv) => {
  return firestore
    .collection('courses')
    .where('course', '==', 'CPSC441')
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }

      snapshot.docs.forEach((doc) => {
        console.log(doc.data());
      });

      console.log(conv.arguments);
      console.log(conv.body);
      console.log(conv.contexts);

      conv.ask('James');
    });
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

exports.addUser = functions.auth.user().onCreate((user) => {
  const random = Math.ceil(Math.random() * 20000);
  const id = user.uid;
  const email = user.email ? user.email : `${random}@google.com`;
  const name = user.displayName ? user.displayName : `User ${random}`;
  const phone = user.phoneNumber ? user.phoneNumber : random;

  return firestore
    .collection('users')
    .doc(id)
    .set({
      uid: id,
      email,
      name,
      phone,
    });
});
