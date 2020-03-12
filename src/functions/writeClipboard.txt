    function writeClipboard(id, str) {
      var clipboardStr;
      clipboardStr = str;
      // clipboardStr = tag.outerHTML;
      var currentCB = new ClipboardJS('#' + id, {
        text: function(trigger) {

          // var clipboardStr = ccpImgBuildHtmlClip();
          // !VA Write success message to app message area on success
          currentCB.on('success', function(event) {
            appController.initMessage(false, 'copied_2_CB');
            // debugger;
          });
  
          currentCB.on('error', function(e) {
            console.error('Action:', e.action);
            console.error('Trigger:', e.trigger);
          });
          // !VA Return the clipboard string to clipboard.js to paste it to the clipboard
          return clipboardStr;
        }
      });
    }