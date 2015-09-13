var messagesRef = new Firebase("https://glaring-fire-8593.firebaseio.com");
var newMessage = ('new-message');
var authData = messagesRef.getAuth();
var message = ('messages');

var $newMessage = $('#new-message');
var $username = authData.twitter.displayName;
var $messages = $('#messages');


messagesRef.child('user-chat-room').limitToLast(10).on('child_added', function (snapshot) {
   //GET DATA
   var data = snapshot.val();
   console.log ("8===>" + data);
   var username = data.name;
   var message = (" " + data.text);
   console.log("HIII" + message);

   //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
   var messageElement = $("<li>");
   var nameElement = $("<strong class='example-chat-username'></strong>");
   nameElement.text(username);
   messageElement.text(message).prepend(nameElement);

   //ADD MESSAGE TO LIST
   $messages.append(messageElement);
   console.log("8888" + messageElement);

   //SCROLL TO BOTTOM OF CHAT BOX
   $messages[0].scrollTop = $messages[0].scrollHeight;
 });


 /*
 * Listen for user input
 *
 * This method listens for each keypress
 * on the message input field and saves
 * the data to Firebase when content is submitted.
 */

 $newMessage.keypress(function (e) {
   // GET FIELD VALUES
   var username = $username;
   var message = $newMessage.val().trim();

   console.log('===========', username, message);

   // SAVE MESSAGE WHEN 'ENTER' IS PRESSED
   var x = location.pathname;
   var urlsplit = x.split("/").slice(-1)[0];
   if (e.keyCode == 13 && message.length) {
     messagesRef.child(urlsplit).push().set({name:username, text:message});
     $newMessage.val('');
   }
 });
