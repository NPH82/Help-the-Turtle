var latitude = "latitude";
var longitude = "longitude";

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBZAuUkeBYHmxfplYwuf-7wNHwKUFSLZcU",
    authDomain: "turtle-project.firebaseapp.com",
    databaseURL: "https://turtle-project.firebaseio.com",
    projectId: "turtle-project",
    storageBucket: "",
    messagingSenderId: "919793437616"
  };
  firebase.initializeApp(config);

//function for button to add new turtle form information to the database
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