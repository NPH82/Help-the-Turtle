var latitude = "latitude";
var longitude = "longitude";
/* global firebase moment */
// Steps to complete:
// 1. Initialize Firebase
// Initialize Firebase
  var config = {
    apiKey: "apiKey",
    authDomain: "authDomain",
    databaseURL: "databaseURL",
    projectId: "projectId",
    storageBucket: "storageBucket",
    messagingSenderId: "messagingSenderId"
  };
  firebase.initializeApp(config);

// 2. Button for adding new turtle form information to the database
$("#turtle-btn").on("click", function(event) {
  event.preventDefault();
  firebase.database().ref().push({
    latitude: $('#latitude-input').val(),
    longitude: $('#longitude-input').val(),
    landmarks: $('#landmarks-input').val(),
    name: $('#name-input').val(),
    phonenumber: $('#phoneNumber-input').val(),
    email: $('#email-input').val(),
    createdAt: firebase.database.ServerValue.TIMESTAMP
  });
});