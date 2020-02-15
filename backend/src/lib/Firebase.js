import admin from 'firebase-admin';

let firestore;
let auth;

export function initializeApp() {
  const firebase = admin.initializeApp({
    credential: admin.credential.cert({
      type: 'service_account',
      project_id: 'calgaryhacks2020',
      private_key_id: '63f19840bfda46ada27471909f8a2015e3063fce',
      private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDUrSWrok8RwNmw\nI8JVlRpLE5tEK7FMPc16sskTLH4mEwbVSHtvF+56FaObfbwpQA1lpHgFY7fnfSu6\n4nSOwbHNqYRi3UUAlL7q0sGQWqHrejaP0karMGTeeKJYYVkwdiyU3rfikL8qUKDY\nKC84DxrdubGA0e54Ww5ghGA9uDtRdxvGdzr/OwfGOb9aJ4m38R+/motjVzod3xdB\n+4lAyZXgkCDKrulIxHcCmygS/vc3QtD+v5nFaEpYKw/Tvj5kQ8FP2oxGuzei9QnK\nFALIfMfRVswnGQSSnWfpXcHoSwtFCu+Eeq3qFyiSQSM4V475bEjz8e29az3MvNSS\nSYHVXo0ZAgMBAAECgf8pxWUqxq2hW/drVkF+wXEYEWt5A7c2h07DHgnWHunkXL5t\n43sp/Ywvk7op7NXOjDNdUyE3Aej9UhQQ7lJvHCvYkjOfMZzo07irxWARKxUVctdn\nF4bbBIxjr7s2Am0R6ZnsIfTcTqXS41aXS/+M6UJPNhs8fLzmsuptovzFihlB3ebH\n09g4e+8h6Qqv7jjqqbRV1oR7KDgj9eYDUxkHFzoBSTFhrYZcsdjdyPGN5amPjPWf\nQczchdU9sgQnURECPG5tD1a7dKRpFIfKNqD2EPjDMefmvQKFUjTEb5lEmrXnW0U7\nHr6HDUTY8yf+IgUGvRk050gJx5ukCxqfeeWmte0CgYEA+fLHqIUQNL4gJA983zBV\na2T42xiQiGksPYSt6hzSoOn+RizF5PnmdhHr2L6lVMoJ7Kz5aaObzCo6aKs1cMqI\nMCXinm4shf9zAD5Qlszoj5NxYqkxo2H3qVXRH9fKnKZEr6SQ2dRELKXsw26tqCbE\nDxg8G7qjlbsRMZt1dsRDihMCgYEA2dNZcHrlchLJ8i2h2+7vjb+knKXKKifMVocU\nXaz80CY+wTGllshmhUNVfZlLX7zp7fdQpty1G1Pd5TIb9nLHg37vr/oKTH4T7ePZ\nqQx2hxYW+5C0sGr44hvsBVaTa2d1C2Zc8LWNxTs/eZgx/aN9qH0F/8mMTdRnX2K9\nt2lQMaMCgYBMceB2vhuyxeN2o/YBHPtDGWKzP9QUpHYPaqD2VVJmPKq0M8Vivrup\nqNmFNOnEAPcAF/dAQ/XGf7PVh2eU05zLfQrOgcvEP9igXm6vcIRARUwMbMrtuWzR\nsZmAL7OcLY4cWiyjMrSXIzhCnXsnTpPwOe1IXdDiXpBnp7BJXsV5WQKBgQCacUry\nAIEcj4vWBVrE+LWrGF1boAUmPI+aLi5XeObLosJN8qiIr1BZXnOIGR+jIuvuCLOL\ni+NxG9axwgSniZxCdMb3S97ve1kgC7RxMt/7ScND3MbwavhKQSfoZQkjVvha+9ob\n5W4+kJKh4TJYtwnKY9LUGJA9QsOEkxsWpznv5wKBgQDeUD1heD8+K0L/5aSu3g8U\njfrKn4rhAekzejfD0RSweRUMPQndACCfRW1xrbZQ4UsASpkh/lUUh6EmUOdVoTJd\n5zODt7z6l5oXgU7/pt0laPx1VqPFWtXcj6YPD8UMsMv4lZvsPMeGL1/SWLufve6o\nsiyu+FYOjCy26OotoLJYrA==\n-----END PRIVATE KEY-----\n',
      client_email: 'firebase-adminsdk-abd7s@calgaryhacks2020.iam.gserviceaccount.com',
      client_id: '116388996321922959080',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-abd7s%40calgaryhacks2020.iam.gserviceaccount.com',
    }),
  });

  firestore = firebase.firestore();
  auth = firebase.auth();
}

export const DATABASE = firestore;
export const AUTH = auth;
