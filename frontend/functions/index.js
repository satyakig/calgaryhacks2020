const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.addUser = functions.auth.user().onCreate((user) => {
  const id = user.uid;
  const email = user.email;
  const name = user.displayName;
  const phone = user.phoneNumber;

  return admin
    .firestore()
    .collection('users')
    .doc(id)
    .set({
      id,
      email,
      name,
      phone,
    });
});
