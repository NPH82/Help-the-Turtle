//////////////////////////////////////////////////////////
//BACK END
//////////////////////////////////////////////////////////

//Google Maps API apikey: AIzaSyA4PbxtjFAOdO90WsLjM_SXs_sfUEb7OM0

window.mapsLoaded = false;

function initMap() {
  window.mapsLoaded = true;
}

function notInitMap(id) {

  map = new google.maps.Map(document.getElementById('map'));

  infoWindow = new google.maps.InfoWindow;

  //using HTML5 geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        var turtleStatus = "reported";
        infoWindow.setPosition(pos);
        infoWindow.setContent('<h6>Turtle</h6>');
        infoWindow.open(map);
        map.setCenter(pos);
        map.setZoom(16);

        // Getting location and creating JSON on Firebase
        firebase.database().ref().push({
            locationLat: position.coords.latitude,
            locationLong: position.coords.longitude,
            status: turtleStatus,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    },
    function() {
      handleLocationError(true, infoWindow, map.getCenter());
    })
  } else {
      //Browser doesn't suppport Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
      'Error: We can\'t get your location.  Please refresh and accept.' :
      'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

//Firebase Initialization
var config = {
    apiKey: "AIzaSyBZAuUkeBYHmxfplYwuf-7wNHwKUFSLZcU",
    authDomain: "turtle-project.firebaseapp.com",
    databaseURL: "https://turtle-project.firebaseio.com",
    projectId: "turtle-project",
    storageBucket: "",
    messagingSenderId: "919793437616"
};
firebase.initializeApp(config);

//Authenticating Firebase Anonymously
firebase.auth().signInAnonymously().catch(function(error) {
  //handling errors
  var errorCode = error.code;
  var errorMessage = error.message;

  if (errorCode === 'auth/operation-not-allowed') {
      alert('You must enable Anonymous auth in Firebase Console');
  } else {
      console.error(error);
  }
});

//Creates User Account
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      var isAnonymous = user.isAnonymous;
      var uid = user.id;
      console.log("Locating user");
  } else {
      console.log("User signed out");
  }
})

//Geolocation
var map, infoWindow;
var marker;
$("#send").on("click", function(event) {
  event.preventDefault();
  notInitMap();
  //Alert user:
  Materialize.toast("Your location has been sent.", 2000);
});



//////////////////////////////////////////////////////////
//FRONT END
//////////////////////////////////////////////////////////

$(document).ready(function() {
  //Parallax page
  $('.parallax').parallax();

  //Sidebar Menu
  $(".button-collapse").sideNav({
      menuWidth: 200, // Default is 300
      closeOnClick: true,
  });

  //Floating button
  $("#report-button").on("mouseover", function() {
      $("#report-button").children("a").removeClass("pulse");
      $("#report-button").children("a").children("i").text("location_on");
  });
  $("#report-button").on("mouseout", function() {
      $("#report-button").children("a").children("i").text("add");
  });

  //Trigger modal
  $(".modal").modal();

});
