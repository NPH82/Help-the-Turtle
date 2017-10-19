//////////////////////////////////////////////////////////
//BACK END
//////////////////////////////////////////////////////////

//Google Maps API apikey: AIzaSyA4PbxtjFAOdO90WsLjM_SXs_sfUEb7OM0

//Initializes Firebase
var config = {
<<<<<<< HEAD
    apiKey: "AIzaSyBZAuUkeBYHmxfplYwuf-7wNHwKUFSLZcU",
    authDomain: "turtle-project.firebaseapp.com",
    databaseURL: "https://turtle-project.firebaseio.com",
    projectId: "turtle-project",
    storageBucket: "",
    messagingSenderId: "919793437616"
};
firebase.initializeApp(config);
var database = firebase.database();
console.log('initial firebase');

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
=======
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
>>>>>>> 26e8a18d1d3b67da3a8c480df3e333dd5487f0a8
});

//Creates User Account
firebase.auth().onAuthStateChanged(function(user) {
<<<<<<< HEAD
    if (user) {
        var isAnonymous = user.isAnonymous;
        var uid = user.id;
        console.log("Locating user");
    } else {
        console.log("User signed out");
    }
});

function startUp () {
if(window.mapsLoaded = false) {
detectBrowser();
console.log("this is running")
}
};

function notInitMap() {
    if(window.mapsLoaded = true) {
      detectBrowser();
    }
    console.log("notInitMap");
=======
  if (user) {
    var isAnonymous = user.isAnonymous;
    var uid = user.id;
  }
});

function startUp() {
  if (window.mapsLoaded = false) {
    detectBrowser();
  }
};

function notInitMap() {
  if (window.mapsLoaded = true) {
    detectBrowser();
  }
>>>>>>> 26e8a18d1d3b67da3a8c480df3e333dd5487f0a8
};

//Geolocation
var map, infoWindow;
var marker;

function initMap(id) {

<<<<<<< HEAD
    map = new google.maps.Map(document.getElementById('map'), {
        disableDefaultUI: true,
        zoomControl: false,
        streetViewControl: false,
        scaleControl: false

    });
      console.log('map');

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
                map.setOptions({ draggable: false });
                console.log('geolocation');


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
                console.log('data push')
                resetForm();


            },
            function() {
                handleLocationError(true, infoWindow, map.getCenter());
                console.log('handle error')
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

    if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1) {
        mapdiv.style.width = '100%';
        mapdiv.style.height = '200px';
    } else {
        mapdiv.style.width = '100%';
        mapdiv.style.height = '100%';
    }
    console.log('detectBrowser');
}
=======
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

  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1) {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '200px';
  } else {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '100%';
  }
};
>>>>>>> 26e8a18d1d3b67da3a8c480df3e333dd5487f0a8

//Creates turtle object
var turtles = {};

<<<<<<< HEAD
// var ref = firebase.database().ref();
// ref.on("value", function(snapshot) {
//   console.log("turtle-project", snapshot.val());
// });


firebase.database().ref().on("child_added", function(snapshot){
  var turtleLoc = createTurtleMap();
  function createTurtleMap(obj) {
        var turtleLat = snapshot.val().Lat;
        var turtleLng = snapshot.val().Long;
        var searchTerm = turtleLat + ", " + turtleLng;
        searchTerm = encodeURIComponent(searchTerm);
        var iframe = document.createElement("iframe");
        iframe.classList.add("map");
        iframe.src = "https://www.google.com/maps/embed/v1/search?q=" + searchTerm + "&key=AIzaSyChwGcg2hUOX9Uh_qNr8KHMJcenJf0svv8&zoom=18";
        return iframe;
    }
=======
firebase.database().ref().on("child_added", function(snapshot) {
  var turtleLoc = createTurtleMap();

  function createTurtleMap(obj) {
    var turtleLat = snapshot.val().Lat;
    var turtleLng = snapshot.val().Long;
    var searchTerm = turtleLat + ", " + turtleLng;
    searchTerm = encodeURIComponent(searchTerm);
    var iframe = document.createElement("iframe");
    iframe.classList.add("map");
    iframe.src = "https://www.google.com/maps/embed/v1/search?q=" + searchTerm + "&key=AIzaSyChwGcg2hUOX9Uh_qNr8KHMJcenJf0svv8&zoom=18";
    return iframe;
  }
>>>>>>> 26e8a18d1d3b67da3a8c480df3e333dd5487f0a8
  var block = '<div id="fullCard" class="col s12 m6"><div id="turtle" class="card hoverable show"><div class="card-image"><div id="map" class="col s12 center-align">' + $(turtleLoc).prop('outerHTML') + '</div></div><div class="card-content"><span id="number" class="card-title activator green-text"><i class="material-icons right">more_vert</i></span><h5 id="reported" class="green-text">Reported ' + snapshot.val().time + '</h5></div><div class="card sticky-action"><div class="card-action right-align"><button id="next-stage-btn" class="card-button green btn-flat yellow-text waves-effect waves-light" type="button" name="button">Done</button></div></div><div class="card-reveal"><span class="card-title green-text">Comment<i class="material-icons right">close</i></span><p id="comment">' + snapshot.val().comment + '</p></div></div></div>';
  $("#tab1-heading").attr('class', 'no-card hide');
  $("#tab1").prepend(block);
});

<<<<<<< HEAD



=======
>>>>>>> 26e8a18d1d3b67da3a8c480df3e333dd5487f0a8
//Sets turtle value to database
firebase.database().ref().on("value", function(snapshot) {
  turtles = snapshot.val();
})

//Sends location
$("#send").on("click", function(event) {
<<<<<<< HEAD
    event.preventDefault();
    // turtleDiv(false);
    initMap();
    Materialize.toast("Your location has been sent.", 2000);
    console.log('send');
=======
  event.preventDefault();
  // turtleDiv(false);
  initMap();
  Materialize.toast("Your location has been sent.", 2000);
>>>>>>> 26e8a18d1d3b67da3a8c480df3e333dd5487f0a8
});

//Submits form and sends location
$("#submit").on("click", function(event) {
<<<<<<< HEAD
    event.preventDefault();
    validate();
    validateEmail();
    $('#message-modal').modal('close');
    // turtleDiv(true);
    initMap();
    Materialize.toast("Your report has been sent.", 2000);
    console.log('submit');
=======
  event.preventDefault();
  validate();
  validateEmail();
  $('#message-modal').modal('close');
  // turtleDiv(true);
  initMap();
  Materialize.toast("Your report has been sent.", 2000);
>>>>>>> 26e8a18d1d3b67da3a8c480df3e333dd5487f0a8
});

//Validates form
function validate() {
<<<<<<< HEAD
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
=======
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
>>>>>>> 26e8a18d1d3b67da3a8c480df3e333dd5487f0a8
};

//Resets form
function resetForm() {
<<<<<<< HEAD
    $("#comment-input").val("");
    $("#name-input").val("");
    $("#phoneNumber-input").val("");
    $("#email-input").val("");
    console.log('resetForm');
=======
  $("#comment-input").val("");
  $("#name-input").val("");
  $("#phoneNumber-input").val("");
  $("#email-input").val("");
>>>>>>> 26e8a18d1d3b67da3a8c480df3e333dd5487f0a8
}

//Creates turtle card in document
function turtleDiv(noComm) {
<<<<<<< HEAD
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
    console.log('turtleDiv');
=======
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
>>>>>>> 26e8a18d1d3b67da3a8c480df3e333dd5487f0a8
}

//Moves turtle card from Reported to In Progress
$("#tab1").on("click", "#next-stage-btn", function() {
<<<<<<< HEAD
    $("#tab2-heading").attr('class', 'no-card hide');
    $("#fullCard").prependTo("#tab2");
    Materialize.toast("This rescue has been marked IN PROGRESS.", 2000);
    console.log('move to inprogress');
=======
  $("#tab2-heading").attr('class', 'no-card hide');
  $("#fullCard").prependTo("#tab2");
  Materialize.toast("This rescue has been marked IN PROGRESS.", 2000);
>>>>>>> 26e8a18d1d3b67da3a8c480df3e333dd5487f0a8
});

//Moves turtle card from In Progress to Saved
var count = 0;
$("#tab2").on("click", "#next-stage-btn", function() {
<<<<<<< HEAD
    count++;
    $("#counter").text(count);
    $("#tab3-heading").attr('class', 'no-card hide');
    $(this).parents("#fullCard").prependTo("#tab3");
    $("#tab3").find(".sticky-action").html("");
    Materialize.toast("This turtle has been marked SAVED.", 2000);
    console.log('move to saved');
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
      data: $("#reportNewTurtle-form").serialize(),
      datatype: "json"
    });
  });
=======
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
});
>>>>>>> 26e8a18d1d3b67da3a8c480df3e333dd5487f0a8

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
<<<<<<< HEAD
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
=======
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
>>>>>>> 26e8a18d1d3b67da3a8c480df3e333dd5487f0a8
  });





});
