//////////////////////////////////////////////////////////
//BACK END
//////////////////////////////////////////////////////////

//Google Maps API apikey: AIzaSyA4PbxtjFAOdO90WsLjM_SXs_sfUEb7OM0

window.mapsLoaded = false;

function initMap() {
  window.mapsLoaded = true;
}

//Geolocation
var map, infoWindow;
var marker;

function notInitMap(id) {

  map = new google.maps.Map(document.getElementById('map'), {
    disableDefaultUI: true,
    zoomControl: false,
    streetViewControl: false,
    scaleControl: false

  });


  //Uses HTML5 geolocation
  if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var turtleStatus = "reported";
        marker = new google.maps.Marker({
          postion: pos,
          map: map,
          disableDefaultUI: true,
          animation: google.maps.Animation.DROP
        });
        marker.setPosition(pos);
        map.setCenter(pos);
        map.setZoom(20);
        map.setOptions({draggable: false});


        // REWORKED THIS CALL Getting location and creating JSON on Firebase
        var database = firebase.database();

        var comment = $("#comment-input").val(),
          name = $("#name-input").val(),
          phone = $("#phoneNumber-input").val(),
          email = $("#email-input").val(),
          turtleCard = database.ref('turtleCard'),
          time = moment().format('MMMM Do YYYY, h:mm a'),
          locationLat = position.coords.latitude,
          locationLong = position.coords.longitude,
          data = {
            Lat: locationLat,
            Long: locationLong,
            name: name,
            phone: phone,
            email: email,
            comment: comment,
            time: time,
            status: "reported"
          };

        database.ref().push(data);
        resetForm();

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

function detectBrowser() {
  var useragent = navigator.userAgent;
  var mapdiv = document.getElementById('map');

  if(useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1) {
    mapdiv.style.width = '100%';
    mapdiv.style.height= '100%';
  } else {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '200px';
  }
}

//Initializes Firebase
var config = {
  apiKey: "AIzaSyBZAuUkeBYHmxfplYwuf-7wNHwKUFSLZcU",
  authDomain: "turtle-project.firebaseapp.com",
  databaseURL: "https://turtle-project.firebaseio.com",
  projectId: "turtle-project",
  storageBucket: "",
  messagingSenderId: "919793437616"
};
firebase.initializeApp(config);
var database = firebase.database();

//Authenticates Firebase Anonymously
firebase.auth().signInAnonymously().catch(function(error) {
  //Handling errors
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


//Creates turtle object
var turtles = {};

//Sets turtle value to database
firebase.database().ref().on("value", function(snapshot) {
  turtles = snapshot.val();
});

//Sends location
$("#send").on("click", function(event) {
  event.preventDefault();
  detectBrowser();
  turtleDiv(false);
  notInitMap();
  Materialize.toast("Your location has been sent.", 2000);
});

//Submits form and sends location
$("#submit").on("click", function(event) {
  event.preventDefault();
  detectBrowser();
  validate();
  validateEmail();
  $('#message-modal').modal('close');
  turtleDiv(true);
  notInitMap();
  Materialize.toast("Your report has been sent.", 2000);
});

//Validates form
function validate() {
  if ($("#name-input").val() == "") {
    Materialize.toast("Please provide your name.", 2000);
    $.thisBreaksTheForm.database;
    return false;
  }

  if ($("#phoneNumber-input").val() == "") {
    Materialize.toast("Please provide a valid phone number.", 2000);
    $.thisBreaksTheForm.database;
    return false;
  }

  if ($("#email-input").val() == "") {
    Materialize.toast("Please provide a valid email.", 2000);
    $.thisBreaksTheForm.database;
    return false;
  }

  return (true);
};

function validateEmail() {
  var emailID = $("#email-input").val();
  atpos = emailID.indexOf("@");
  dotpos = emailID.lastIndexOf(".");

  if (atpos < 1 || (dotpos - atpos < 2)) {
    Materialize.toast("Please provide a valid email.", 2000);
    $.thisBreaksTheForm.database;
    return false;
  }
  return (true);
};

//Resets form
function resetForm() {
  $("#comment-input").val("");
  $("#name-input").val("");
  $("#phoneNumber-input").val("");
  $("#email-input").val("");
}

//Creates turtle card in document
function turtleDiv(noComm) {
  var comment = $("#comment-input").val();
  $("#fullCard").clone().prependTo("#tab1");
  $("#tab1-heading").attr('class', 'no-card hide');
  $("#turtle").attr('class', 'card hoverable show');
  $("#number").empty();
  $("#reported").empty();
  $("#reported").append("<p>" + "Reported " + moment().format('MMMM Do YYYY, h:mm a') + "</p>");
  $("#comment").empty();
  $("#comment").append(comment);
  $("#turtle").append("<div id='turtle' class='card hoverable hide");
  if (noComm) {
    $("#number").append("Turtle " + 1 + "<i class='material-icons right'>more_vert</i>");
  } else {
    $("#number").append("Turtle " + 1);
  }

}

//Moves turtle card from Reported to In Progress
$("#tab1").on("click", "#next-stage-btn", function() {
  $("#tab2-heading").attr('class', 'no-card hide');
  $("#fullCard").prependTo("#tab2");
  Materialize.toast("This rescue has been marked IN PROGRESS.", 2000);
});

//Moves turtle card from In Progress to Saved
$("#tab2").on("click", "#next-stage-btn", function() {
  $("#counter").text(turtles.Saved);
  $("#tab3-heading").attr('class', 'no-card hide');
  $(this).parents("#fullCard").prependTo("#tab3");
  $("#tab3").find(".sticky-action").html("");
  Materialize.toast("This turtle has been marked SAVED.", 2000);
});

//Formspree ajax
  $("#submit").on("click", function(e) {
    e.preventDefault();
    var name = $("#name-input")
    var email = $("#email-input")
    var phone = $("#phoneNumber-input")
    var landmarks = $("#comment-input")
    $.ajax({
      method: "POST",
      url: "//formspree.io/umassturtlepower@gmail.com",
      data: data,
      datatype: "json"
    });
  });

//////////////////////////////////////////////////////////
//DOCUMENT.READY
//////////////////////////////////////////////////////////

$(document).ready(function() {

  //FRONT END

  //Parallax page
  $('.parallax').parallax();

  //Sidebar menu
  $(".button-collapse").sideNav({
    menuWidth: 250,
    closeOnClick: true,
  });

  //Floating action button
  $("#report-button").on("mouseover", function() {
    $("#report-button").children("a").removeClass("pulse");
    $("#report-button").children("a").children("i").text("place");
  });
  $("#report-button").on("mouseout", function() {
    $("#report-button").children("a").children("i").text("add");
  });

  //Trigger modal
  $(".modal").modal();

  //Update turtles saved count upon page load
  // $("#counter").replaceAll("savedCount");
  // console.log(savedCount);





});
