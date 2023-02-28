
//ADD YOUR FIREBASE LINKS from firebase database
 // Your web app's Firebase configuration
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


// below code will do in next class c95
  user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

/*Flow of the Add Room button : 
● it added the room name in firebase and then
● stores the room name in the localStorage and then
● redirects the user to the kwitter message page.*/

function addRoom() 
{
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose : "adding room name"
  });

    localStorage.setItem("room_name", room_name);
    
    window.location = "kwitter_page.html"; 
}

function getData() {  
  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
       Room_names = childKey;
       console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
      
      
      
      document.getElementById("output").innerHTML += row; 
      
    });
  });

}

getData();  
function redirectToRoomName(name) 
{
  console.log(name);
  localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html"; 
}

function logout() {  
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
    window.location = "index.html";
}
