$( document ).ready(function(){

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
























});
