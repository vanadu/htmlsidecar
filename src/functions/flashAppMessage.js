      // UIController: Flash a status message in the app message area
      // !VA TODO: Review this. We could probably fold this into the error handler but that's going to be complicated enough as it is and this is just for status messages
      // !VA UIController public
      flashAppMessage: function(messArray) {
        // !VA Receives an array of a boolean error flag and the message to be displayed.
        // !VA Init error flag, message string and timeout delay

        // console.log('flashAppMessage running');
        let id, isErr, mess, del;
        id = messArray[0];
        isErr = messArray[1];
        mess = messArray[2];
        // console.log('flashAppMessage - id is: ' + id);
        // !VA Get the message content and display text into variables
        let msgDisplay = document.querySelector(staticRegions.msgDisplay);
        let ccpBlocker = document.querySelector(staticRegions.ccpBlocker);
        let messType;
        // !VA If it's an error, show class show-err, otherwise it's a status message so show-mess
        isErr ? messType = 'show-err' : messType = 'show-mess';

        // !VA If isErr is false, then it's a status message, overlay the CCP blocker to prevent user input while the CSS transitions run and the status message is displayed. Cheap, but effective solution.
        isErr ? isErr : ccpBlocker.style.display = 'block';
        // !VA Add the class that displays the message
        msgDisplay.classList.add(messType);
        // !VA Write the message to the message display area
        msgDisplay.innerHTML = mess;
        // !VA Add the class to show the message
        msgDisplay.classList.add(messType);
        // !VA If it's an error, let it display for 2.5 seconds. If it's a status, just flash it because while it's onscreen the CCP blocker is active and we want that to be short.
        isErr ? del = 2500 : del = 500;
        // !VA Remove the tooltip active class in #ttip-content if an app message is displayed. To display the tooltip again, the user has to exit the element and reenter it.
        document.getElementById('tip-content').classList.remove('active');

        // !VA Show the message for two seconds
        window.setTimeout(function() {
        // !VA After two seconds, hide the message and remove the blocker
          msgDisplay.classList.add('hide-mess');
          ccpBlocker.style.display = 'none';
          setTimeout(function(){
            // !VA Once the opacity transition for the message has completed, remove the show-mess class from the element and set the innerHTML back to empty
            msgDisplay.classList.remove(messType);
            msgDisplay.classList.remove('hide-mess');
            msgDisplay.innerHTML = '';

          },250);
        }, 
        del);
      },