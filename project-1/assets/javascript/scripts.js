

  //Sidebar Menu
  $(".button-collapse").sideNav();

  //Floating button
  $("#report-button").on("mouseover", function(){
    $("#report-button").children("a").removeClass("pulse");
    $("#report-button").children("a").children("i").text("sms");
  });

  $("#report-button").on("mouseout", function(){
    $("#report-button").children("a").children("i").text("add");
    console.log("Hovered!");
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
  			infoWindow.setPosition(pos);
  			infoWindow.setContent(turtleImage);
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
  }

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
							'Error: We can\'t get your location.  Please refresh and accept.' :
							'Error: Your browser doesn\'t support geolocation.');
	infoWindow.open(map);
}

