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
                marker = new google.maps.Marker({
                    postion: pos,
                    map: map,
                    animation: google.maps.Animation.DROP
                });
                marker.setPosition(pos);
                map.setCenter(pos);
                map.setZoom(16);

                // Getting location and creating JSON on Firebase
                firebase.database().ref().push({
                    locationLat: position.coords.latitude,
                    locationLong: position.coords.longitude,
                    comment: $("#comment-input").val(),
                    volunteer: $("#name-input").val(),
                    phonenumber: $("#phoneNumber-input").val(),
                    email: $("#email-input").val(),
                    status: turtleStatus,
                    dateAdded: moment().format('MMMM Do YYYY, h:mm a')
                });
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

//Send location
var count = 0;
$("#send").on("click", function(event) {
  event.preventDefault();
  count++;
  notInitMap();
  turtleDiv();
  Materialize.toast("Your location has been sent.", 2000);
});

//Submit form and send location
var count = 0;
$("#submit").on("click", function(event) {
  event.preventDefault();
  count++;
  notInitMap();
  turtleDiv();
  Materialize.toast("Your report has been sent.", 2000);
});

//Reset form
function resetForm() {
    $("#comment-input").val("");
    $("#name-input").val("");
    $("#phoneNumber-input").val("");
    $("#email-input").val("");
}

//Create turtle card in document
function turtleDiv() {
  var comment = $("#comment-input").val();
  $("#fullCard").clone().prependTo("#tab1");
  $("#tab1-heading").attr('class', 'no-card hide');
  $("#turtle").attr('class', 'card hoverable show');
  $("#number").empty();
  $("#number").append("Turtle " + count + "<i class='material-icons right'>more_vert</i>");
  $("#reported").empty();
  $("#reported").append("<p>" + "Reported " + moment().format('MMMM Do YYYY, h:mm a') + "</p>");
  $("#comment").empty();
  $("#comment").append("<p>" + comment + "</p>");
  $("#turtle").append("<div id='turtle' class='card hoverable hide");

}

//Moving turtle card to Dispatched
$("#tab1").on("click", "#next-stage-btn", function(){
  $("#tab2-heading").attr('class', 'no-card hide');
  $("#fullCard").appendTo("#tab2");
  Materialize.toast("This turtle has been moved to DISPATCHED.", 2000);
});

//Moving turtle card to Saved
var savedCount = 0;
$("#tab2").on("click", "#next-stage-btn", function(){
  $("#tab3-heading").attr('class', 'no-card hide');
  $("#tab2").find("#fullCard").appendTo("#tab3");
  savedCount++;
  $("#counter").text(savedCount);
  Materialize.toast("This turtle has been moved to SAVED.", 2000);
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

  //BACK END

  //Formspree ajax
  $('#reportNewTurtle-form').submit(function(e) {
    var name = $('#name-input')
    var email = $('#email-input')
    var phone = $('#phoneNumber-input')
    var landmarks = $('#comment-input')
      $.ajax({
        method: 'POST',
        url: '//formspree.io/umassturtlepower@gmail.com',
        data: $('#report-form').serialize(),
        datatype: 'json'
      });
      e.preventDefault();
      $(this).get(0).reset();
  });


});
