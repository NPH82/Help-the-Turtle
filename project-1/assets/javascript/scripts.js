 //Sidebar Menu
  $(".button-collapse").sideNav();

  //Floating button
  $("#report-button").on("mouseover", function(){
    $("#report-button").children("a").removeClass("pulse");
    $("#report-button").children("a").children("i").text("sms");
  });

  $("#report-button").on("mouseout", function(){
    $("#report-button").children("a").children("i").text("add");
  });


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

//function for button to add new turtle form information to the database
var latitude = "latitude";
var longitude = "longitude";
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
