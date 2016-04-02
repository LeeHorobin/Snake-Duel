// Manage elements, toggle sidebar view etc

snake.layout = {
  // Enable checking if the user has interacted with the chat box yet. If they
  // have, they default text can be cleared on the first click.
  firstInteraction : true,
  // Track the number of messages so that they can be styled with the correct
  // class
  messageNumber: 0,
  open: 'chat',
  addListeners: function(){
    this.chatContent = document.getElementById('chatContent');
    this.chatMessage = document.getElementById('chatMessage');
    this.chatSubmit = document.getElementById('chatSubmit');

    this.chat = document.getElementById('chat');
    this.stats = document.getElementById('stats');
    this.highscores = document.getElementById('highscores');

    this.toggleChat = document.getElementById('toggleChat');
    this.toggleStats = document.getElementById('toggleStats');
    this.toggleHighScores = document.getElementById('toggleHighScores');

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

    this.toggleChat.onclick = function(){
      snake.layout.hideViews();
      if(snake.layout.open === 'chat'){
        // Chat is open and chat was toggled, do noting as it is now closed
        // This is so small screens can toggle nothing open
        snake.layout.open = 'nothing';
      }
      else{
        snake.layout.open = 'chat';
        snake.layout.toggleChat.className = 'toggle visible';
        snake.layout.chat.style.visibility = 'visible';
      }
    };
    this.toggleStats.onclick = function(){
      snake.layout.hideViews();
      if(snake.layout.open === 'stats'){
        // Do nothing
        snake.layout.open = 'nothing';
      }
      else{
        snake.layout.open = 'stats';
        snake.layout.toggleStats.className = 'toggle visible';
        snake.layout.stats.style.visibility = 'visible';
      }
    };
    this.toggleHighScores.onclick = function(){
      snake.layout.hideViews();
      if(snake.layout.open === 'highscores'){
        // Do nothing
        snake.layout.open = 'nothing';
      }
      else{
        snake.layout.open = 'highscores';
        snake.layout.toggleHighScores.className = 'toggle visible';
        snake.layout.highscores.style.visibility = 'visible';
      }
    };
  },
  hideViews: function(){
    snake.layout.toggleHighScores.className = 'toggle hidden';
    snake.layout.toggleStats.className = 'toggle hidden';
    snake.layout.toggleChat.className = 'toggle hidden';
    snake.layout.highscores.style.visibility = 'hidden';
    snake.layout.chat.style.visibility = 'hidden';
    snake.layout.stats.style.visibility = 'hidden';
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
