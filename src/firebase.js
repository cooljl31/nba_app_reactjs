import firebase from 'firebase';

var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};

firebase.initializeApp(config);
const firebaseDB = firebase.database();

const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');
const firebaseImageUrl = (filename) => (
  firebase.storage().ref('images').child(filename).getDownloadURL()
)

const firebaseLooper = (snapshop) => {
  const data = [];
  snapshop.forEach(childSnap => {
    data.push({
      ...childSnap.val(),
      id: childSnap.key
    })
  });
  return data;
}

export {
  firebase,
  firebaseDB,
  firebaseArticles,
  firebaseTeams,
  firebaseVideos,
  firebaseLooper,
  firebaseImageUrl
}
