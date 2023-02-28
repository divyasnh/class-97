// below code is part of c96

//YOUR FIRE BASE LINKS
var firebaseConfig = {
  apiKey: "AIzaSyAEFNoPqGBy82gWImB8o4RGRCuZ3Gjd8TY",
  authDomain: "adv-c93-kwitter-app.firebaseapp.com",
  databaseURL: "https://adv-c93-kwitter-app-default-rtdb.firebaseio.com",
  projectId: "adv-c93-kwitter-app",
  storageBucket: "adv-c93-kwitter-app.appspot.com",
  messagingSenderId: "715901921553",
  appId: "1:715901921553:web:0467b83a6742720a7084b0",
  measurementId: "G-8N4XRST3QL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



//after YOUR FIRE BASE LINKS

	user_name = localStorage.getItem("user_name");
	room_name = localStorage.getItem("room_name");

function send()
{
  msg = document.getElementById("msg").value; 
  firebase.database().ref(room_name).push({
    name:user_name,
    message:msg,
    like:0
   });

  document.getElementById("msg").value = ""; 
}
// in next class i.e c97
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;

         console.log(firebase_message_id);
	       console.log(message_data);
	       name = message_data['name'];
	       message = message_data['message'];
         like = message_data['like'];
         name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
         message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
         span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

        row = name_with_tag + message_with_tag +like_button + span_with_tag;       
        document.getElementById("output").innerHTML += row;

      } });  }); }
getData();

function updateLike(message_id)
{
  console.log("clicked on like button - " + message_id);
	button_id = message_id;
	likes = document.getElementById(button_id).value;
	updated_likes = Number(likes) + 1;
	console.log(updated_likes);

	firebase.database().ref(room_name).child(message_id).update({
		like : updated_likes  
	 });

}

function logout() {//we will delete the user name and room name which we store in localStorage after logout
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location.replace("index.html");
}
