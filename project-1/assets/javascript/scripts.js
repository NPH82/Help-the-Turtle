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




//////////////////////////////////////////////////////////
//BACK END
//////////////////////////////////////////////////////////

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
  firebase.auth().signInAnonymously().catch(function(error){
    //handling errors
    var errorCode = error.code;
    var errorMessage = error.message;

    if (errorCode === 'auth/operation-not-allowed') {
      alert('You must enable Anonymous auth in Firebase Console');
    } else {
      console.error(error);
    }
  });

  //creates User Account
  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      var isAnonymous = user.isAnonymous;
      var uid = user.id;
      console.log("grabbing user");
    } else {
      console.log("user signed out");
    }

  })

  //Google Maps API apikey: AIzaSyA4PbxtjFAOdO90WsLjM_SXs_sfUEb7OM0

  //Geolocation
  var map, infoWindow;
  var marker;
  function initMap() {
  	map = new google.maps.Map(document.getElementById('map'), {
  		center: {lat: 41.669, lng: -70.296},
  		zoom: 8
  	});

  	infoWindow = new google.maps.InfoWindow;

  	//using HTML5 geolocation
  	if (navigator.geolocation) {
  		navigator.geolocation.getCurrentPosition(function(position) {
  			var pos = {
  				lat: position.coords.latitude,
  				lng: position.coords.longitude
  			};
  			var turtleImage = '<img id="userLocation" src="assets/images/turtle-face.jpg" alt="turtle-pic"><p>Turtle Savior</p>';
  			var turtleStatus = "reported";
        infoWindow.setPosition(pos);
  			infoWindow.setContent(turtleImage);
  			infoWindow.open(map);
  			map.setCenter(pos);
  			map.setZoom(16);
        // grabbing location and creating JSON on Firebase
        firebase.database().ref().push({
        locationLat: position.coords.latitude,
        locationLong: position.coords.longitude,
        status: turtleStatus,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
  		}, function() {
  			handleLocationError(true, infoWindow, map.getCenter());

  		});
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

//Submit message to database
var latitude = position.coords.latitude;
var longitude = position.coords.longitude;
$("#submit").on("click", function(event) {
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
 Materialize.toast("Your turtle has been reported.", 2000);
});

//Submit location to database
$("#mark").on("click", function(event) {
 event.preventDefault();
 firebase.database().ref().push({
   latitude: $('#latitude-input').val(),
   longitude: $('#longitude-input').val(),
   createdAt: firebase.database.ServerValue.TIMESTAMP
 });
 Materialize.toast("Your location has been marked.", 2000);
});
