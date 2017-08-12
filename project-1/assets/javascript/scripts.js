//////////////////////////////////////////////////////////
//BACK END
//////////////////////////////////////////////////////////

//Define Global Variables

var map, infoWindow;
var marker;
function initMap() {
  infoWindow = new google.maps.InfoWindow;
}

//Google Maps API apikey: AIzaSyA4PbxtjFAOdO90WsLjM_SXs_sfUEb7OM0

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

//Upon clicking send location
$("#send").on("click", function(event) {

  //Call initMap function
  initMap();

  //Display placeholder map
  map = new google.maps.Map(document.getElementById('map'));

  //Prevent default action
  event.preventDefault();

  //Getting geolocation information
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      infoWindow.setPosition(pos);
      infoWindow.setContent("Turtle");
      infoWindow.open(map);
      map.setCenter(pos);
      map.setZoom(16);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    //Browser doesn't suppport Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  //Send location to database
  firebase.database().ref().push({
    latitude: $('#latitude-input').val(),
    longitude: $('#longitude-input').val(),
    createdAt: firebase.database.ServerValue.TIMESTAMP
  });

  //Clears input fields
  $("#latitude-input").val("");
  $("#longitude-input").val("");

  //Alerts user
  Materialize.toast("Your location has been sent.", 2000);

  //Posts map or error messages to DOM
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
   infoWindow.setPosition(pos);
   infoWindow.setContent(browserHasGeolocation ?
     'Error: We can\'t get your location.  Please refresh and accept.' :
     'Error: Your browser doesn\'t support geolocation.');
   infoWindow.open(map);
  }

});

// On clicking submit, add:
// landmarks: $('#landmarks-input').val(),
// name: $('#name-input').val(),
// phonenumber: $('#phoneNumber-input').val(),
// email: $('#email-input').val(),




//////////////////////////////////////////////////////////
//FRONT END
//////////////////////////////////////////////////////////

$(document).ready(function() {

  //Sidebar Menu
  $(".button-collapse").sideNav({
      menuWidth: 200, // Default is 300
      closeOnClick: true,
    }
  );

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
