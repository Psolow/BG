import firebase from "firebase";

var config = {
  apiKey: "AIzaSyDODbJ24UK0zSx6TzOKKS4OD92Mw_FfsXs",
  authDomain: "mbtbase.firebaseapp.com",
  databaseURL: "https://mbtbase.firebaseio.com",
  projectId: "mbtbase",
  storageBucket: "mbtbase.appspot.com",
  messagingSenderId: "75758856517"
};

firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
