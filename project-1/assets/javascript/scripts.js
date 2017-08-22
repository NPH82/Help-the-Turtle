//////////////////////////////////////////////////////////
//BACK END
//////////////////////////////////////////////////////////

//Google Maps API apikey: AIzaSyA4PbxtjFAOdO90WsLjM_SXs_sfUEb7OM0

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
  var errorCode = error.code; // why set this to a variable?
  var errorMessage = error.message; // are you using this var?

  if (errorCode === 'auth/operation-not-allowed') {
    alert('You must enable Anonymous auth in Firebase Console');
    // i'd console log this and display a modal to the user with
    // something is more user friendly
    // shouldn't alert users with scary dev stuff
  } else {
    console.error(error);
    // how would you handle this for the user?
  }
});

//Creates User Account
firebase.auth().onAuthStateChanged(function(user) {
  if (user) { // what will occur is user in null?
    var isAnonymous = user.isAnonymous;
    var uid = user.id;
  }
});

function startUp() {
  if (window.mapsLoaded = false) {
    detectBrowser();
  }
};

// ^ do we need both of these functions?
// I don't see startUp called anywhere?
// or is this you hinting you're a startup?

function notInitMap() {
  if (window.mapsLoaded = true) {
    detectBrowser();
  }
};

//Geolocation
var map, infoWindow;
var marker;

function initMap(id) {

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
      map.setZoom(18);
      map.setOptions({
        draggable: false
      });

      // REWORKED THIS CALL Getting location and creating JSON on Firebase
      var database = firebase.database();

      // you could store all the below in an object
      // that would make it easier to pass through functions
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
            time: time, // don't store formatted time in the database,
            // store a unix timestamp or other format and then format it
            // when you present it to the user
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
  // nice ternary operator
  infoWindow.setContent(browserHasGeolocation ?
    'Error: We can\'t get your location.  Please refresh and accept.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function detectBrowser() {
  var useragent = navigator.userAgent;
  var mapdiv = document.getElementById('map');

  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1) {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '200px';
  } else {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '100%';
  }
};

//Creates turtle object
var turtles = {};

firebase.database().ref().on("child_added", function(snapshot) {
  var turtleLoc = createTurtleMap();

  function createTurtleMap(obj) {
    // accepts an obj argument but is never used?
    var turtleLat = snapshot.val().Lat;
    var turtleLng = snapshot.val().Long;
    var searchTerm = turtleLat + ", " + turtleLng;
    searchTerm = encodeURIComponent(searchTerm);
    var iframe = document.createElement("iframe");
    iframe.classList.add("map");
    iframe.src = "https://www.google.com/maps/embed/v1/search?q=" + searchTerm + "&key=AIzaSyChwGcg2hUOX9Uh_qNr8KHMJcenJf0svv8&zoom=18";
    // wrap ^ this text so the cols are not too long
    return iframe;
  }
  var block = '<div id="fullCard" class="col s12 m6"><div id="turtle" class="card hoverable show"><div class="card-image"><div id="map" class="col s12 center-align">' + $(turtleLoc).prop('outerHTML') + '</div></div><div class="card-content"><span id="number" class="card-title activator green-text"><i class="material-icons right">more_vert</i></span><h5 id="reported" class="green-text">Reported ' + snapshot.val().time + '</h5></div><div class="card sticky-action"><div class="card-action right-align"><button id="next-stage-btn" class="card-button green btn-flat yellow-text waves-effect waves-light" type="button" name="button">Done</button></div></div><div class="card-reveal"><span class="card-title green-text">Comment<i class="material-icons right">close</i></span><p id="comment">' + snapshot.val().comment + '</p></div></div></div>';
  // ^ this code should be its own function, too much
  // string manipulation going on here
  $("#tab1-heading").attr('class', 'no-card hide');
  $("#tab1").prepend(block);
  // ^ if you are using IDs and know they won't change, you
  // should store references to these elements instead
  // of accessing the DOM with Jquery every time.
});

//Sets turtle value to database
firebase.database().ref().on("value", function(snapshot) {
  turtles = snapshot.val();
})

//Sends location
$("#send").on("click", function(event) {
  event.preventDefault();
  // turtleDiv(false);
  initMap();
  // mmhm, toast
  Materialize.toast("Your location has been sent.", 2000);
});

//Submits form and sends location
$("#submit").on("click", function(event) {
  event.preventDefault();
  validate(); // you should call the validate email inside the validate method
  validateEmail(); // heres where you could use the true/false output
  // of validate email in order to display a error/confirmation to the user
  $('#message-modal').modal('close');
  // turtleDiv(true);
  initMap();
  Materialize.toast("Your report has been sent.", 2000);
});

//Validates form
function validate() { // <-- should pass in a form object here then you could validate for null in a loop
  // try something like this
  // var errors = [];
  if ($("#name-input").val() == "") {
    Materialize.toast("Please provide your name.", 2000);
    $.thisBreaksTheForm.database; // What this?
    return false;
    // errors.push("Please Proivde your name")
  }

  if ($("#phoneNumber-input").val() == "") {
    Materialize.toast("Please provide a valid phone number.", 2000);
    $.thisBreaksTheForm.database;
    return false;
    // errors.push("Please Proivde your name")
  }

  if ($("#email-input").val() == "") {
    Materialize.toast("Please provide a valid email.", 2000);
    $.thisBreaksTheForm.database;
    return false;
    // errors.push("Please Proivde your name")
  }

  return (true);
  // return errors
  // and in the caller..
  // if(errors.length < 1) {
  //   formIsValid = true
  // } else {
  //  Materialize.toast(errors.join(', '), 2000);
  // }
};

function validateEmail() {
  var emailID = $("#email-input").val(); // pass the address in as an argument
  // when you reference the dom inside the function, that function becomes coupled to that dom
  // element, as a result, its no longer reusable. Your site may need to verify emails on
  // mutiple forms.
  atpos = emailID.indexOf("@");
  dotpos = emailID.lastIndexOf(".");
  // Look into a regular expression to validation emails
  // Those will cover a lot more edge cases than this function
  // for example, lol..@a..com would be valid

  if (atpos < 1 || (dotpos - atpos < 2)) {
    Materialize.toast("Please provide a valid email.", 2000);
    $.thisBreaksTheForm.database;
    return false;
  }
  return (true);
};

//Resets form
function resetForm() {
  // Look at the jQuery .trigger('reset') method
  // that way, when values are cleared, an event is emitted
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
  // you can condense this by calling multiple jQuery selectors
  // in one selector. Use commas between each selector.
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
  // nice use of event delegation here
  $("#tab2-heading").attr('class', 'no-card hide');
  $("#fullCard").prependTo("#tab2");
  Materialize.toast("This rescue has been marked IN PROGRESS.", 2000);
});

//Moves turtle card from In Progress to Saved
var count = 0;
$("#tab2").on("click", "#next-stage-btn", function() {
  // if you save these Jquery selectors to variables, it
  // would read a lot cleaner
  count++;
  $("#counter").text(count);
  $("#tab3-heading").attr('class', 'no-card hide');
  $(this).parents("#fullCard").prependTo("#tab3");
  $("#tab3").find(".sticky-action").html("");
  Materialize.toast("This turtle has been marked SAVED.", 2000);
});

//Formspree ajax
$("#submit").on("click", function(e) {
  e.preventDefault();
  // again, look at getting these values from the event
  var name = $("#name-input")
  var email = $("#email-input")
  var phone = $("#phoneNumber-input")
  var landmarks = $("#comment-input")
  $.ajax({
    method: "POST",
    url: "//formspree.io/umassturtlepower@gmail.com",
    data: $("#reportNewTurtle-form").serialize(),
    datatype: "json"
  });
  // there is no callback for your POST request here?
  // what happens if the form submit returns a 500 error?
  // should you let the user know that their request did not
  // go through and that they should try again?
  // ...think of the turtles.
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
  $("#report-button").on("mouseout", jnction() {
    $("#report-button").children("a").children("i").text("add");
  });

  //Trigger modal
  $(".modal").modal();

  //BACK END

  //Formspree ajax
  $('#reportNewTurtle-form').submit(function(e) {
    // if #reportNewTurtle* is the form,
    // look into how you could get the below information from the event itself
    // in practice, the below code works though.
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
    // Again, no callback here
    e.preventDefault(); // call this before the ajax call
    $(this).get(0).reset(); // using reset here, but not above, be consistent
  });





});
