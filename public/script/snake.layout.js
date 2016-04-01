// Manage elements, toggle sidebar view etc

snake.layout = {
  // Enable checking if the user has interacted with the chat box yet. If they
  // have, they default text can be cleared on the first click.
  firstInteraction : true,
  // Track the number of messages so that they can be styled with the correct
  // class
  messageNumber: 0,
  addListeners: function(){
    this.chatContent = document.getElementById('chatContent');
    this.chatMessage = document.getElementById('chatMessage');
    this.chatSubmit = document.getElementById('chatSubmit');

    this.chatMessage.onclick = function(){
      // Clear the default message the first time the input box is clicked
      if(snake.layout.firstInteraction){
        snake.layout.firstInteraction = false;
        snake.layout.chatMessage.value = '';
      }
    }
    this.chatSubmit.onclick = function(){
      // Catch any errors if the socket is not connected
      try{
        console.log(snake.layout.chatMessage.value);
        snake.session.socket.emit('chat.text', snake.layout.chatMessage.value);
      }
      catch(e){
        snake.layout.addMessage('You are not connected!');
        console.log(e);
      }

      snake.layout.chatMessage.value = '';
    }

  },
  addMessage: function(text){
    console.dir(text);
    // Append text to chat area
    var msg = document.createElement('p');

    msg.className = 'message';
    if(this.messageNumber%2 !== 0){
      msg.className = 'message messageTwo';
    }

    var msgContent = document.createTextNode(text);
    msg.appendChild(msgContent);

    this.chatContent.appendChild(msg);

    this.messageNumber++;
  }
};
