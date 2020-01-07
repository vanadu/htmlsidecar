
/* !VA  - SWITCHED TO ARNIE on UBUNTU
===========================================================
IN PROGRESS: 060519Purge - Purging deprecated or not-yet implemented code in this build. We're rebuilding from ground up based on the flowchart 

TODO: 
TODO: Implement image swap 
TODO: Implement Td and table copy to clipboard buttons.
TODO: Parent table class att only shows in CB output if Wrapper is selected, not in just the Partent table output.
TODO: Make bgcolor add the hash if it's not in the value
TODO: FIx, when imgNW is greater than imgW the imgNW size flashes before resizing to the viewer size. This is probably because of the settimeout, which might not be necesssary if the onload function is running.
TODO: THe CCP should store all the currently selected options and restore them whenever the ccp is opened -- I think. Not sure if this is the right behavior...think bout it. Probably not.
TODO: Assign keyboard  shortcuts
TODO: Assign  tab order

*/
//SCRIPT START
//PAGE SETUP START

// Namespace
var Witty = (function () {

  // !VA DEV Test function to get the clicked element to the console
  // (function () {
  //   document.addEventListener('click', function(e) {
  //     e = e || window.event;
  //     var target = e.target || e.srcElement,
  //       text = target.textContent || target.innerText;   
  //     console.log('Get the clicked element: ' + e);
  //     console.log(e.target);
  //   }, false);
  // })();


  var UIController = (function() {

    // !VA This is where Appdata should be initialized
    var Appdata = {};

    // !VA UIController: DimViewer ID strings
    var dimViewers = {
      filename: '#dv-filename-viewer',
      display: '#dv-display',
      diskimg: '#dv-disk-img',
      aspect: '#dv-aspect',
      smallphones: '#dv-small-phones',
      largephones: '#dv-large-phones',
      retina: '#dv-retina',
      clipboardBut: '#dv-clipboard-but'
    };

    // !VA UIController: toolButton ID Strings
    var toolButtons = {
      viewerW: '#tb-input-viewerw',
      grow50: '#tb-but-grow50',
      grow10: '#tb-but-grow10',
      grow01: '#tb-but-grow01',
      customW: '#tb-input-customw',
      toggleImgSize: '#toggle-image-size',
      customH: '#tb-input-customh',
      shrink01:'#tb-but-shrink01',
      shrink10: '#tb-but-shrink10',
      shrink50: '#tb-but-shrink50',
      sPhonesW: '#tb-input-small-phonesw',
      lPhonesW: '#tb-input-large-phonesw',
    };

    //!VA If we separate this out into UI objects that correspond to the objects we want to create, then we can just loop through them rather than define each property separately. So, dynamicElements are those that resize based on the current image... but I haven't figured out how to loop through them yet.
    // !VA UIController: dynamicRegions
    var dynamicRegions = {
      curImg: '#cur-img',
      imgViewer: '#main-image-viewer',
      imgViewport: '#image-viewport',
      appContainer: '#app-container',
    };

    // !VA UIController: staticRegions
    var staticRegions = {
      dropArea: '#drop-area',
      toolsContainer: '#tools-container',
      ccpContainer: '#ccp',
      ccpImgClipbboardBut: '#img-build-html-but',
      ccpTdClipbboardBut: '#td-build-html-but',
      ccpTableClipbboardBut: '#table-build-html-but',
      appMessContainer: '#app-message-container',
      appMessDisplay: '#app-message-display',
      ccpBlocker: '#ccp-blocker'
    };

    // !VA  UIController: ccpUserInput ID Strings
    // !VA imgAnchor is just a flag for the status of the checkbox. The actual propStrings have to have an Open and Close property.
    var ccpUserInput = {
      imgClass: '#img-class-input',
      imgAnchor: '#img-anchor-checkbox',
      imgAlt: '#img-alt-input',
      // !VA This isn't even a thing... probably delete it 04.28.19
      imgIncludeStyles: '#img-include-css-checkmrk',
      imgAlign: '#img-align-select',
      imgRelPath: '#img-relpath-input',
      tdClass: '#td-class-input',
      tdAlign: '#td-align-select',
      tdValign: '#td-valign-select',
      tdBgcolor: '#td-bgcolor-input',
      tdBgimage: '#td-bgimage-checkmrk',
      tableClass: '#table-class-input',
      tableAlign: '#table-align-select',
      tableWidth: '#table-width-input',
      // !VA Not in use yet
      // tableMaxWidth: '#table-max-width-input',
      tableBgcolor: '#table-bgcolor-input',
      tableIncludeWrapper: '#table-include-wrapper-checkmrk',
      tableWrapperClass: '#table-wrapper-class-input',
      tableWrapperWidth: '#table-wrapper-width-input',
      tableWrapperAlign: '#table-wrapper-align-select',
      tableWrapperBgColor: '#table-wrapper-bgcolor-input',
    };

    // !VA UIController: ccpPropStrings ID Strings, probably deprecated in V2
    // !VA V2 - This doesn't go here, probably belongs in the App Controller module, but we'll build it here for now and move it later.
    // Stores the strings representing the HTML properties corresponding to the user CCP selections. These property snippets will be used to populate the clipboard.
    // !VA Have to include separate propStrings for opening and closing tags 
    var ccpPropStrings = {
      imgClass: '',
      imgAnchorOpen: '',
      imgAnchorClose: '',
      imgAlt: '',
      imgAlign: '',
      imgRelPath: '',
      imgWidth: '',
      imgMaxWidth: '',
      tdClass: '',
      tdAlign: '',
      tdValign: '',
      tableClass: '',
      tableAlign: '',
      tableWidth: ''
    };

    // !VA ccpBuildTag ID Strings
    // Stores the ccpMakeTag object for assembling the clipboard create tag buttons
    // !VA V2 Also doesn't belong here, we will move it later.
    var ccpBuildTag = {
      imgBuildHTMLBut: '',
      imgDisplayCSSToClipboard: '#img-display-css-to-clipboard-but',
      imgSPhoneCSSToClipboard: '#img-sphone-css-to-clipboard-but',
      imgLPhoneCSSToClipboard: '#img-lphone-css-to-clipboard-but',
      tdDisplayCSSToClipboard: '#td-display-css-to-clipboard-but',
      tdSPhoneCSSToClipboard: '#td-sphone-css-to-clipboard-but',
      tdLPhoneCSSToClipboard: '#td-lphone-css-to-clipboard-but',
      tableDisplayCSSToClipboard: '#table-display-css-to-clipboard-but',
      tableSPhoneCSSToClipboard: '#table-sphone-css-to-clipboard-but',
      tableLPhoneCSSToClipboard: '#table-lphone-css-to-clipboard-but',
    };


    // !VA CCP IIFE This tests whether the CCP is open, allowing us to access CCP elements if it is. It's also where we open the CCP by default for development and testing. 
    (function () {

      // !VA Remove this line to stop opening the CCP by default
      document.querySelector(staticRegions.ccpContainer).classList.add('active');


    })();

    
    // !VA UIController private testme
    function testme() {
      console.log('TESTED!');
    }

    // !VA  UIController private toggleCheckbox: Toggle checkboxes and run any associated actions
    function toggleCheckbox(event) {
      console.log('ToggleCheckbox');
      console.dir(event);
      // !VA TODO: !IMPORTANT! All the initialization for the CCP is better done elsewhere
      // !VA But in the meantime, we want this to run for all custom CSS checkboxes used in this project -- but the CSS calls for hiding the actual checkbox element and showing a span with a 'proxy' checkbox. We call it 'checkmrk' to make it easier to replace it with 'checkbox' here. 
      // !VA We will need Appdata to initialize the defaults for the wrapper table below
      var data = UIController.accessAppdata();
      // !VA Array of wrapper items to be displayed if 'Include wrapper table' is checked
      var wrapperItemsToShow = [];

      // !VA The clicked element is the checkmark, so we have to convert that ID to the corresponding checkbox before we can toggle it.
      var checkbox = document.getElementById(event.target.id.replace('mrk', 'box'));
      console.log('checkbox.id is: ' + checkbox.id);
      // !VA Toggle the target's checkbox 
      checkbox.checked ? checkbox.checked = false : checkbox.checked = true;

      // !VA Now run any actions associated with the checkbox
      // !VA Get the Appdata for the input default value
      // !VA TODO: This value needs to be refreshed when the CCP is opened. In fact, entering new values in any of the toolButton inputs has to call a refresh of Appdata and a closing-reopening of the CCP so the values can refresh.
      
      // !VA Defaults for wrapper width and class
      document.querySelector(ccpUserInput.tableWrapperWidth).value = `${data.viewerW}`;
      document.querySelector(ccpUserInput.tableWrapperClass).value = 'devicewidth';
      // !VA Only show the CCP wrapper width, class, align, and bgcolor options if 'Include wrapper table' is selected 

      // !VA Show wrapper table options if the checked element is 'table-include-wrapper-checkbox'
      if (checkbox.id === 'table-include-wrapper-checkbox') {
        wrapperItemsToShow = ['#table-wrapper-class', '#table-wrapper-width', '#table-wrapper-align', '#table-wrapper-bgcolor' ]; 
        // console.log('wrapperItemsToShow[i] is: ' + wrapperItemsToShow[3]);
        if (checkbox.checked) {
          console.log('checked');
          for (let i = 0; i < wrapperItemsToShow.length; i++) {
            document.querySelector(wrapperItemsToShow[i]).style.display = 'block'; 
            // console.log(document.querySelector(wrapperItemsToShow[i])); 
          }
        } else {
          console.log('unchecked');
          for (let i = 0; i < wrapperItemsToShow.length; i++) {
            document.querySelector(wrapperItemsToShow[i]).style.display = 'none'; 
          }
        }
      }
    }

    // !VA TODO: Might be able to consolidate these into a single function but doesn't seem worth it
    
    // !VA UIController private imgClipboardBut
    // !VA Clipboard output for build img tag button
    var imgClipboardBut = new Clipboard(staticRegions.ccpImgClipbboardBut, {
      text: function(trigger) {
        var clipboardStr = clipboardController.ccpGetCBImgHTML();
        // !VA Write success message to app message area on success
        imgClipboardBut.on('success', function(event) {
          // debugger;
        });
        UIController.flashAppMessage(trigger.id);
        imgClipboardBut.on('error', function(e) {
          console.error('Action:', e.action);
          console.error('Trigger:', e.trigger);
        });
        // !VA Return the clipboard string to clipboard.js to paste it to the clipboard
        return clipboardStr;
      }
    });
   
    // !VA UIController private tdClipbboardBut
    // !VA Clipboard output for build td tag button
    var tdClipbboardBut = new Clipboard(staticRegions.ccpTdClipbboardBut, {
      text: function(trigger) {
        var clipboardStr;
        clipboardStr = clipboardController.ccpGetCBTdHTML();
        tdClipbboardBut.on('success', function(event) {
        });
        UIController.flashAppMessage(trigger.id);
        tdClipbboardBut.on('error', function(e) {
          console.error('Action:', e.action);
          console.error('Trigger:', e.trigger);
        });
        return clipboardStr;
      }
    });

    // !VA UICOntroller private tableClipbboardBut
    // Clipboard output for build table tag button
    var tableClipbboardBut =  new Clipboard(staticRegions.ccpTableClipbboardBut, {
      text: function(trigger) {
        var clipboardStr = clipboardController.ccpGetCBTableHTML();

        tableClipbboardBut.on('success', function(event) {
        });
        UIController.flashAppMessage(trigger.id);
        tableClipbboardBut.on('error', function(e) {
          console.error('Action:', e.action);
          console.error('Trigger:', e.trigger);
        });

        return clipboardStr;
      }
    });

    // !VA UIcontroller private imgDisplayCSSToClipboard
    // Clipboard output for build img CSS button
    var imgDisplayCSSToClipboard = new Clipboard(ccpBuildTag.imgDisplayCSSToClipboard, {
      text: function(trigger) {
        var clipboardStr = clipboardController.ccpGetCBImgDisplayCSS();

        imgDisplayCSSToClipboard.on('success', function(event) {
        });
        UIController.flashAppMessage(trigger.id);
        imgDisplayCSSToClipboard.on('error', function(e) {
          console.error('Action:', e.action);9
          console.error('Trigger:', e.trigger);
        });
        return clipboardStr;
      }
    });

    // !VA UIController private imgLPhoneCSSToClipboard
    // Clipboard output for build large phones CSS button
    var imgLPhoneCSSToClipboard = new Clipboard(ccpBuildTag.imgLPhoneCSSToClipboard, {
      text: function(trigger) {
        var clipboardStr = clipboardController.ccpGetCBImgLPhonesCSS();
        imgLPhoneCSSToClipboard.on('success', function(event) {
        });
        UIController.flashAppMessage(trigger.id);
        imgLPhoneCSSToClipboard.on('error', function(e) {
          console.error('Action:', e.action);
          console.error('Trigger:', e.trigger);
        });
        return clipboardStr;
      }
    });

    // !VA UIController private imgSPhoneCSSToClipboard
    // Clipboard output for small phones CSS button
    var imgSPhoneCSSToClipboard = new Clipboard(ccpBuildTag.imgSPhoneCSSToClipboard, {
      text: function(trigger) {
        var clipboardStr = clipboardController.ccpGetCBImgSPhonesCSS();
        imgSPhoneCSSToClipboard.on('success', function(event) {
        });
        UIController.flashAppMessage(trigger.id);
        imgSPhoneCSSToClipboard.on('error', function(e) {
          console.error('Action:', e.action);
          console.error('Trigger:', e.trigger);
        });
        return clipboardStr;
      }
    });


    // !VA UIController public functions
    return {
      // !VA V2 Return all the strings for the UI element's IDs
      getDimViewerIDs: function() {
        return dimViewers;
      },
      getToolButtonIDs: function() {
        return toolButtons;
      },
      getDynamicRegionIDs: function() {
        return dynamicRegions;
      },
      getStaticRegionIDs: function() {
        return staticRegions;
      },
      // getCcpPropStringsIDs: function() {
      //   return ccpPropStrings;
      // },
      getCcpUserInputIDs: function() {
        return ccpUserInput;
      },
      getCcpBuildTagIDs: function() {
        return ccpBuildTag;
      },

      // !VA UIController public initUI
      initUI: function() {
        console.log('initUI');
        // !VA  Initialize the ImgViewer to accomodate the dragArea. This should be the same as the CSS definition: currently 650x450
        // !VA NEW Write the computed styles to console to make sure they are as expected: 650x450
        // var cStyles = window.getComputedStyle(document.querySelector(dynamicRegions.imgViewer));
        // viewerW = cStyles.getPropertyValue('width');
        // viewerH = cStyles.getPropertyValue('height');
        // console.log('viewerW is: ' + viewerW); 
        // console.log('viewerH is: ' + viewerH); 

        // !VA Make sure the toolsContainer is off and the dropArea is on.
        document.querySelector(staticRegions.dropArea).style.display = 'block';
        document.querySelector(staticRegions.toolsContainer).style.display = 'none';
        document.querySelector(dimViewers.clipboardBut).style.display = 'none';
        const dimarray = Object.values(dimViewers);
        for ( let i = 0; i < dimarray.length; i++ ) {
          if ( dimarray[i] !== '#dv-clipboard-but' &&  dimarray[i] !== '#dv-filename-viewer' ) {
            document.querySelector(dimarray[i]).innerHTML = '<span class="pop-font">&nbsp;&nbsp;No Image</span>';
          } 
        } 
      },

      // !VA UIController public writeDimViewers
      writeDimViewers: function(Appobj) {

        // !VA We need the current value in dimViewers.smallphones and dimViewers.largephones to display all the dimViewers. So, if it's not explicitly user-defined, then use the default placeholder value from the HTML, then get the height from getAspectRatio
        var sPhonesW, sPhonesH, lPhonesW, lPhonesH;
        sPhonesW = document.querySelector(toolButtons.sPhonesW).value;
        lPhonesW = document.querySelector(toolButtons.sPhonesW).value;
        sPhonesW ? sPhonesW : sPhonesW = document.querySelector(toolButtons.sPhonesW).placeholder;
        lPhonesW ? lPhonesW : lPhonesW = document.querySelector(toolButtons.lPhonesW).placeholder;
        sPhonesH = Math.round(sPhonesW * (1 / Appobj.aspect[0]));
        lPhonesH = Math.round(lPhonesW * (1 / Appobj.aspect[0]));



        // !VA Hide the dropArea - not sure if this is the right place for this.
        document.querySelector(staticRegions.dropArea).style.display = 'none';


        document.querySelector(dimViewers.display).innerHTML = `<span class='pop-font'><span id="display-size-width">${Appobj.imgW}</span> X <span id="display-size-height">${Appobj.imgH}</span></span>`;
        document.querySelector(dimViewers.diskimg).innerHTML = `<span class='pop-font'>${Appobj.imgNW} X ${Appobj.imgNH}</span>`;
        document.querySelector(dimViewers.aspect).innerHTML = `<span class='pop-font'>${Appobj.aspect[1]}</span>` ;
        document.querySelector(dimViewers.smallphones).innerHTML = `<span class='pop-font'><span id='small-phones-width'>${sPhonesW}</span> X <span id='small-phones-height'>${sPhonesH}</span></span>` ;
        document.querySelector(dimViewers.largephones).innerHTML = `<span class='pop-font'><span id='large-phones-width'>${lPhonesW}</span> X <span id='large-phones-height'>${lPhonesH}</span></span>` ;
        document.querySelector(dimViewers.retina).innerHTML = `<span class='pop-font'>${2 * Appobj.imgW}</span> X <span class='pop-font'>${2 * Appobj.imgH}`;

        // !VA NEW Display the clipboard button
        document.querySelector(dimViewers.clipboardBut).style.display = 'block';

      },

      // !VA UIController public writeFilenameToUI
      writeFilenameToUI: function (fileName) {
        document.querySelector(dimViewers.filename).textContent = fileName;
        document.querySelector(dimViewers.filename).style.display = 'block';
      },


      // UIController public removeCurImg
      // !VA Test for whether there is already a #cur-img element in the DOM, and if there is remove it so handleFileSelect can overwrite it without having to refresh the page to reboot the app.
      removeCurImg: function () {
        // if ( document.querySelector('#cur-img-container')) {
        document.querySelector('#cur-img-container').parentNode.removeChild(document.querySelector('#cur-img-container'));
        // } de1690c
      },

      //UIController public setDimAlerts
      setDimAlerts: function(curDimViewers, bool) {
        // !VA if evalDimAlerts returns true, then the dimViewer should be displayed in red. To reset the dim alert, set to style color to 'auto'.
        var att = bool;
        bool ? att = 'red': att = 'inherit';
        // !VA We want to use this same function to reset the dim alerts when a new image is loaded. For that, we need to pass in an array of all the dimViewer IDs, not just an array of the ones that are already red. So, first test if the argument is an object, and if it is convert it into a list of values so the loop will accept it.

        if (Array.isArray(curDimViewers) === false) {
          curDimViewers = Object.values(curDimViewers);
        }
        // !VA For each dimViewer passed from evalDimAlerts, set the font color style based on the bool argument passed in.
        for (let i = 0; i < curDimViewers.length; i++) {
          document.querySelector(curDimViewers[i]).style.color = att;
        }
      },

      // CCPF - CLIPBOARD FUNCTIONS
      // ===============================================

      // !VA UIController public ccpToggle
      ccpToggle: function () {
        document.querySelector(staticRegions.ccpContainer).classList.toggle('active');
        if (document.querySelector(staticRegions.ccpContainer).classList.contains('active')) {
          UIController.initCCP();
        }
      },

      // !VA UIController public initCCP
      initCCP: function() {
        console.log('initCCP');
        // !VA Copy Appdata to local object
        var data = UIController.accessAppdata();

        // !VA If the CCP is open...
        if (document.querySelector(staticRegions.ccpContainer).classList.contains('active')) {

          // !VA Initialize with all the 'include wrapper table' options undisplayed - uncomment this for DEV
          // var wrapperItemsToHide = ['#table-wrapper-class', '#table-wrapper-width', '#table-wrapper-align', '#table-wrapper-bgcolor' ]; 
          // for (let i = 0; i < wrapperItemsToHide.length; i++) {
          //   document.querySelector(wrapperItemsToHide[i]).style.display = 'none'; 
          // }

          // !VA Initialize with 'include wrapper table' unchecked, or true for DEV
          var includeWrapperTable = document.querySelector((ccpUserInput.tableIncludeWrapper.replace('mrk', 'box')));
          includeWrapperTable.checked = true;
          // !VA Default for table width
          document.querySelector(ccpUserInput.tableWidth).value = `${data.imgW}`;
          // !VA Defaults for wrapper width and class
          document.querySelector(ccpUserInput.tableWrapperWidth).value = `${data.viewerW}`;
          document.querySelector(ccpUserInput.tableWrapperClass).value = 'devicewidth';

          // !VA CCP Event Listeners -- we will handle CCP events separately from other UI events here to keep separation of dynamic vs static element handling
          // !VA Checkboxes that need toggling
          var imgIncludeStylesCheckmrk = document.querySelector(ccpUserInput.imgIncludeStyles);
          var tdBgimageCheckmrk = document.querySelector(ccpUserInput.tdBgimage);
          var tableIncludeWrapper = document.querySelector(ccpUserInput.tableIncludeWrapper);
          // !VA Toggle the checkbox and initialize the table wrapper defaults
          // !VA TODO: Revisit all the CCP init
          imgIncludeStylesCheckmrk.addEventListener('click', toggleCheckbox, false);
          tdBgimageCheckmrk.addEventListener('click', toggleCheckbox, false);
          tableIncludeWrapper.addEventListener('click', toggleCheckbox, false);

        }
      },


      // UIController public showElementOnInput 
      showElementOnInput: function(event) {
        // !VA Here we catch the input handlers for the CCP class input fields and show the mobile clipboard buttons when an input is made. The input event fires whenever a input element's value changes.
        console.log('Event...');
        console.dir(event);
console.log('event.target.id is: ' + event.target.id);


        var elems = [];
        // elems[0] = ccpBuildTag.imgDisplayCSSToClipboard;
        elems[0] = document.querySelector(ccpBuildTag.imgDisplayCSSToClipboard);
        elems[1] = document.querySelector(ccpBuildTag.imgSPhoneCSSToClipboard);
        elems[2] = document.querySelector(ccpBuildTag.imgLPhoneCSSToClipboard);
        elems[3] = document.querySelector(ccpBuildTag.tdDisplayCSSToClipboard);
        elems[4] = document.querySelector(ccpBuildTag.tdSPhoneCSSToClipboard);
        elems[5] = document.querySelector(ccpBuildTag.tdLPhoneCSSToClipboard);
        elems[6] = document.querySelector(ccpBuildTag.tableDisplayCSSToClipboard);
        elems[7] = document.querySelector(ccpBuildTag.tableSPhoneCSSToClipboard);
        elems[8] = document.querySelector(ccpBuildTag.tableLPhoneCSSToClipboard);
        // !VA We only want to show the buttons in each respective fieldset
        // !VA If the input is in the img fieldset, only show the first three buttons in the array
        if (event.target.id === 'img-class-input') {
          for (let i = 0; i <= 2; i++) {
            this.value ? elems[i].classList.add('active') : elems[i].classList.remove('active');
          }
        } else if (event.target.id === 'td-class-input') {
          // !VA If the input is in the td fieldset, only show the next three buttons in the array
          for (let i = 3; i <= 5 ; i++) {
            this.value ? elems[i].classList.add('active') : elems[i].classList.remove('active');
          }
        } else if (event.target.id === 'table-class-input') {
          // !VA If the input is in the table fieldset, only show the next buttons in the array
          for (let i = 6; i <= 8 ; i++) {
            this.value ? elems[i].classList.add('active') : elems[i].classList.remove('active');
          }
        }


      },

      // !VA UICOntroller public flashAppMessage
      flashAppMessage: function(id) {
        // !VA Passes in the id of the element that triggered the action for which a status message is displayed.

        // !VA Get the message container and display text into variables
        var appMessContainer = document.querySelector(staticRegions.appMessContainer);
        var appMessDisplay = document.querySelector(staticRegions.appMessDisplay);
        var ccpBlocker = document.querySelector(staticRegions.ccpBlocker);


        var statusMessages = {
          'img-build-html-but': '<img> HTML element copied to Clipboard!',
          'td-build-html-but': '<td> HTML element copied to Clipboard!',
          'table-build-html-but': '<table> HTML element copied to Clipboard!',
          'img-display-css-to-clipboard-but': 'CSS class delaration copied to the Clipboard!',
          'img-lphone-css-to-clipboard-but': 'CSS class delaration for tablets copied to the Clipboard!',
          'img-sphone-css-to-clipboard-but': 'CSS class delaration for phones copied to the Clipboard!',
          'td-display-css-to-clipboard-but': 'CSS class delaration copied to the Clipboard!',
          'td-lphone-css-to-clipboard-but': 'CSS class delaration for tablets copied to the Clipboard!',
          'td-sphone-css-to-clipboard-but': 'CSS class delaration for phones copied to the Clipboard!',
          'table-display-css-to-clipboard-but': 'CSS class delaration copied to the Clipboard!',
          'table-lphone-css-to-clipboard-but': 'CSS class delaration for tablets copied to the Clipboard!',
          'table-sphone-css-to-clipboard-but': 'CSS class delaration for phones copied to the Clipboard!',
        };

        // !VA First, overlay the CCP blocker to prevent user input while the CSS transitions run and the status message is displayed. Cheap, but effective solution.
        ccpBlocker.style.display = 'block';

        // !VA Add the class that displays the message
        appMessContainer.classList.add('show-mess');
        // !VA Loop through the status id/message pairs and find the match for the trigger
        for (const [key, value] of Object.entries(statusMessages)) { 
          if (key === id ) {
            var mess = value;
          }
        }
        // !VA Write the success message to the message display area
        appMessDisplay.textContent = mess;
        // !VA Show the message
        appMessContainer.classList.add('show-mess');
        // !VA Show the message for two seconds
        window.setTimeout(function() {
        // !VA After two seconds, hide the message and remove the blocker
          appMessContainer.classList.add('hide-mess');
          ccpBlocker.style.display = 'none';
          setTimeout(function(){
            // !VA Once the opacity transition for the message has completed, remove the show-mess class from the element and set the textContent back to empty
            appMessContainer.classList.remove('show-mess');
            appMessContainer.classList.remove('hide-mess');
            appMessDisplay.textContent = '';

          },250);
        }, 
        2000);
      }
    };
  })();

  // CALCULATIONS AND INPUT EVALUATION CONTROLLER
  var clipboardController = (function() {



    // !VA If we want to access any of the DOM IDs we have to call them from UIController where they're defined.
    var dimViewers = UIController.getDimViewerIDs();
    var dynamicRegions = UIController.getDynamicRegionIDs();
    var staticRegions = UIController.getStaticRegionIDs();
    var toolButtons = UIController.getToolButtonIDs();
    // !VA Deprecated in this version
    // var ccpPropStrings = UIController.getCcpPropStringsIDs();
    var ccpUserInput = UIController.getCcpUserInputIDs();
    // !VA Deprecated in this version
    // var ccpBuildTag = UIController.getCcpBuildTagIDs();

    // !VA Constructor for the clipboard output objects. These are all the properties all the clipboard output objects (img, td and table) will have. We will store these key/value pairs in instances of the ClipboardOutput  because they're easier to manage. Then we'll build the output into an HTML string.
    function ClipboardOutput(classAtt, alignAtt ) {
      this.classAtt = classAtt;
      this.alignAtt = alignAtt;
    }

    // !VA clipboardController public functions 
    return {

      // !VA clipboardController public clipboardControllerTest
      clipboardControllerTest: function() {
        console.log('calController test');
      },

      // clipboardController public ccpIfNoUserInput
      ccpIfNoUserInput: function(att, val) {
        // !VA We need get the filename from Appdata in case the user leaves 'path' empty
        var data = UIController.accessAppdata();
        var str;
        // !VA If there is an entry in the user entry field element, include the attribute string in the clipboard output. 
        if (val && att) {
          // !VA I might want to change this to include the # in the string itself.
          if (val === '#') {
            str = '';
          } else {
            str = `${att}="${val}"`;
          }

        } else {
          // !VA If the path field is empty, we need to return the filename without the path.
          if (att === 'src' && val === '' ) {
            str = `${att}="${data.filename}" `;
          } else if ( att === '#' || att === '') {
            str = '';
          } else {
            // !VA If there is no input, exclude the attribute entry.
            str = '';
          }
        }
        return str;

      },

      // clipboardController public ccpGetCBImgHTML
      ccpGetCBImgHTML: function() {
        // !VA Get Appdata - we need it for the filename
        var data = UIController.accessAppdata();
        // !VA The string that passes the HTML img tag
        var str; 
        // !VA Create the instance for img tag clipboard object and add img-specific properties.
        // !VA We're doing this in an object and outputting to an array because the object is easier to manage and the array is easier to reorder. The Constructor is in this module in the private functions above.
        var imgTag = new ClipboardOutput('imgTag');
        // !VA imgTag properties
        // !VA ---------------------------
        imgTag.classAtt = 
          // !VA If the user has input a value and the value exists, then build the clipboard output string. Otherwise, exclude the attribute string from the clipboard output 
          clipboardController.ccpIfNoUserInput('class',document.querySelector(ccpUserInput.imgClass).value);

        imgTag.altAtt =    
          // !VA If the user has input a value and the value exists, then build the clipboard output string. Otherwise, exclude the attribute string from the clipboard output
          clipboardController.ccpIfNoUserInput('alt',document.querySelector(ccpUserInput.imgAlt).value);
        // !VA imgTag.altAtt END

        imgTag.srcAtt = (function (id, data) {
          // !VA Pass in the ID and the copy of Appdata to get the filename
          var str;
          // !VA If the path input element is empty, just include the filename and omit the path.
          if (document.querySelector(id).value) {
            str = `src="${document.querySelector(ccpUserInput.imgRelPath).value}/${data.filename}" `;
          } else {
            str = `src="${data.filename}" `;
          }
          return str;
        })(ccpUserInput.imgRelPath, data);
        // !VA imgTag.srcAtt END
        imgTag.heightAtt = `height="${data.imgH}"`;
        imgTag.widthAtt = `width="${data.imgW}"`;
        imgTag.styleAtt =  (function (id) {
          // !VA The ID passed in isn't the checkbox, it's the 'proxy' checkmark used in the CSS checkbox styling. So we need to get the actual checkbox ID in order to get the checked state
          var str;
          id = id.replace('mrk', 'box');
          // !VA Output the style attribute with width and height properties if the checkbox is checked, otherwise omit them
          if (document.querySelector(id).checked === true) {
            str = `border="0" style="width: ${data.imgW}px; height: ${data.imgH}px; border: none; outline: none; text-decoration: none; display: block;" `;
          } else {
            str = 'border="0" style="border: none; outline: none; text-decoration: none; display: block;"';
          }
          return str;
        })(ccpUserInput.imgIncludeStyles);
        // !VA imgTag.styleAtt END
        imgTag.alignAtt = (function (id) {
          // !VA Pass in the id of the select dropdown
          var str;
          // !VA Get the selection index
          var selInd = document.querySelector(id).selectedIndex;
          // !VA Put the available options in an array
          var imgAlignOptions = [ 'none', 'left', 'middle', 'right' ];
          // !VA Put the desired output strings in an array
          var clipboardOutput = [ '', 'align="left" ', 'align="middle" ', 'align="right" '];
          // !VA If the selected index matches the index of the available options array, then output the string that matches that index
          for (let i = 0; i < imgAlignOptions.length; i++) {
            if ( selInd === i) {
              str = `${clipboardOutput[i]}`;
            }
          }
          return str;
        })(ccpUserInput.imgAlign);
        // !VA imgTag Object END ------------------------

        var imgTagStr; 
        

        // !VA Build the HTML tag

        imgTagStr = `  <img ${imgTag.classAtt + ' '}${imgTag.altAtt + ''}${imgTag.alignAtt + ' '}${imgTag.widthAtt + ' '}${imgTag.heightAtt + ' '}${imgTag.srcAtt + ' '}${imgTag.styleAtt} />`;

        // !VA Pass the imgTagArray and return it as string
        return imgTagStr;
      }, 
      
      // clipboardController public ccpGetCBTdHTML
      ccpGetCBTdHTML: function () { 
        // !VA We don't need this yet, but we will if we decide to add a width style property which is useful for Outlook 120dpi 
        var data = UIController.accessAppdata();
        // !VA Declare the string that gets the clipboard output
        var clipboardStr;


        var tdTag = new ClipboardOutput('tdTag');
        tdTag.classAtt = 
          // !VA If the user has input a value and the value exists, then build the clipboard output string. Otherwise, exclude the attribute string from the clipboard output 
          clipboardController.ccpIfNoUserInput('class',document.querySelector(ccpUserInput.tdClass).value);

        tdTag.alignAtt = (function (id) {
          // !VA TODO: The default 'left' is currently set in the HTML, that should be done programmatically
          // !VA Pass in the id of the select dropdown
          var str;
          // !VA Get the selection index
          var selInd = document.querySelector(id).selectedIndex;
          // !VA Put the available options in an array
          var tdAlignOptions = [ 'none', 'left', 'center', 'right' ];
          // !VA Put the desired output strings in an array
          var clipboardOutput = [ '', 'align="left" ', 'align="center" ', 'align="right" '];
          // !VA If the selected index matches the index of the available options array, then output the string that matches that index
          for (let i = 0; i < tdAlignOptions.length; i++) {
            if ( selInd === i) {
              str = `${clipboardOutput[i]}`;
            }
          }
          return str;
        })(ccpUserInput.tdAlign);
        // !VA tdAlign END

        tdTag.valignAtt = (function (id) {
          // !VA TODO: The default 'left' is currently set in the HTML, that should be done programmatically
          // !VA Pass in the id of the select dropdown
          var str;
          // !VA Get the selection index
          var selInd = document.querySelector(id).selectedIndex;
          // !VA Put the available options in an array
          var tdValignOptions = [ 'none', 'top', 'middle', 'bottom' ];
          // !VA Put the desired output strings in an array
          var clipboardOutput = [ '', 'valign="top"', 'valign="middle" ', 'valign="bottom" '];
          // !VA If the selected index matches the index of the available options array, then output the string that matches that index
          for (let i = 0; i < tdValignOptions.length; i++) {
            if ( selInd === i) {
              str = `${clipboardOutput[i]}`;
            }
          }
          return str;
        })(ccpUserInput.tdValign);
        // !VA tdValign END

        // !VA Pass the input value, prepending it hex # character 
        tdTag.bgcolorAtt =
         clipboardController.ccpIfNoUserInput('bgcolor',document.querySelector(ccpUserInput.tdBgcolor).value);
        // !VA tdBgcolor  END


        tdTag.tdContents =    (function () {
          // !VA Get the img tag output and put in between the td tags
          var str = clipboardController.ccpGetCBImgHTML();
          return str;
        })();

        tdTag.BgimageAtt =  (function (id) {
          // !VA The ID passed in isn't the checkbox, it's the 'proxy' checkmark used in the CSS checkbox styling. So we need to get the actual checkbox ID in order to get the checked state
          var str;
          id = id.replace('mrk', 'box');
          console.log('id is: ' + id);
          // !VA Output the style attribute with width and height properties if the checkbox is checked, otherwise omit them

          if (document.querySelector(id).checked === true) {
            str = 
            
            
  `
    <td background="${document.querySelector(ccpUserInput.imgRelPath).value}/${data.filename}" ${tdTag.bgcolorAtt}" width="${data.imgW}" height="${data.imgH}" ${tdTag.valignAtt}">
    <!--[if gte mso 9]>
      <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:${data.imgW}px;height:${data.imgH}px;">
      <v:fill type="tile" src="${document.querySelector(ccpUserInput.imgRelPath).value}/${data.filename}" color="${tdTag.bgcolorAtt}" />
      <v:textbox inset="0,0,0,0">
      <![endif]-->
        <div>
        <!-- Put Foreground Content Here -->
        </div>
      <!--[if gte mso 9]>
        </v:textbox>
      </v:rect>
      <![endif]-->
    </td>
  `;


            
          } else {
          // !VA The regular TD element
            str = 

`    <td ${tdTag.classAtt + ' '}${tdTag.alignAtt + ' '}${tdTag.valignAtt + ' '}${tdTag.bgcolorAtt + ' '}>
      ${tdTag.tdContents}
    </td>`;

          }
          clipboardStr = str;
          // return clipboardStr;
        })(ccpUserInput.tdBgimage);

        return clipboardStr;
      }, 

      // clipboardController public ccpGetCBTableHTML
      ccpGetCBTableHTML: function () {
        // !VA We need this to get Appdata.viewerW
        var data = UIController.accessAppdata();
        // !VA Variable returning the HTML to the clipboard object 
        var clipboardStr;
        // !VA Create the object for storing the individual tag attributes
        var tableTag = new ClipboardOutput('tableTag');
        // !VA Base Table options----------------------------------------------
        tableTag.classAtt = 
          // !VA If the user has input a value and the value exists, then build the clipboard output string. Otherwise, exclude the attribute string from the clipboard output 
          clipboardController.ccpIfNoUserInput('class',document.querySelector(ccpUserInput.tableClass).value);


        tableTag.alignAtt = (function (id) {
          // !VA TODO: The default 'left' is currently set in the HTML, that should be done programmatically
          // !VA Pass in the id of the select dropdown
          var str;
          // !VA Get the selection index
          var selInd = document.querySelector(id).selectedIndex;
          // !VA Put the available options in an array
          var tableAlignOptions = [ 'none', 'left', 'center', 'right' ];
          // !VA Put the desired output strings in an array
          var clipboardOutput = [ '', 'align="left"', 'align="center"', 'align="right"'];
          // !VA If the selected index matches the index of the available options array, then output the string that matches that index
          for (let i = 0; i < tableAlignOptions.length; i++) {
            if ( selInd === i) {
              str = `${clipboardOutput[i]}`;
            }
          }
          return str;
        })(ccpUserInput.tableAlign);
        // !VA tableAlign END

        tableTag.tableContents = (function () {
          var str = clipboardController.ccpGetCBTdHTML();
          return str;
        })();

        // !VA Wrapper Width Attribute
        tableTag.widthAtt = (function (id, data) {
          // !VA Get Appdata
          var data = UIController.accessAppdata();
          var tableWidthInput = document.querySelector(ccpUserInput.tableWidth);
          console.log('tableWidthInput.value is: ' + tableWidthInput.value);
          // !VA TODO: Error handling
          // !VA If there 
          if (!tableWidthInput.value) {
            tableTag.tableWidthInput.value = '0';
          } else {
            tableTag.tableWidth = `width="${tableWidthInput.value}"`;
          }

          var str = tableTag.tableWidth;
          console.log('str is: ' + str);
          return str;
        })(ccpUserInput.tableWidth, data);
        
        // !VA Pass the input value 
        tableTag.bgcolorAtt =
         clipboardController.ccpIfNoUserInput('bgcolor',document.querySelector(ccpUserInput.tableBgcolor).value);
        // !VA tdBgcolor
        // !VA Base Table Tag END------------------------------------------------------

        // !VA Table WRAPPER Start ------------------------------------------------------
        // !VA !IMPORTANT! The 'Include wrapper table' option is shown/hidden in the UIController toggleCheckbox function for the CCP
        // !VA Wrapper Class Attribute
        tableTag.wrapperclassAtt = 
        // !VA If the user has input a value and the value exists, then build the clipboard output string. Otherwise, exclude the attribute string from the clipboard output 
        clipboardController.ccpIfNoUserInput('class',document.querySelector(ccpUserInput.tableWrapperClass).value);

        // !VA Wrapper Width Attribute
        tableTag.wrapperWidthAtt = (function (id, data) {
          // !VA Get Appdata
          // var data = UIController.accessAppdata();
          var tableWrapperInput = document.querySelector(ccpUserInput.tableWrapperWidth);
          // !VA If there 
          if (!tableWrapperInput.value) {
            tableTag.wrapperWidthAtt = '';
          } else {
            tableTag.wrapperWidthAtt = `width="${tableWrapperInput.value}"`;
          }

          var str = tableTag.wrapperWidthAtt;
          return str;
        })(ccpUserInput.tableWrapperWidth, data);

        // !VA Wrapper align attribute
        tableTag.wrapperAlignAtt = (function (id) {
          // !VA TODO: The default 'left' is currently set in the HTML, that should be done programmatically
          // !VA Pass in the id of the select dropdown
          var str;
          // !VA Get the selection index
          var selInd = document.querySelector(id).selectedIndex;
          // !VA Put the available options in an array
          var tableWrapperAlignOptions = [ 'none', 'left', 'center', 'right' ];
          // !VA Put the desired output strings in an array
          var clipboardOutput = [ '', 'align="left" ', 'align="center" ', 'align="right" '];
          // !VA If the selected index matches the index of the available options array, then output the string that matches that index
          for (let i = 0; i < tableWrapperAlignOptions.length; i++) {
            if ( selInd === i) {
              str = `${clipboardOutput[i]}`;
            }
          }
          return str;
        })(ccpUserInput.tableWrapperAlign);


        // !VA Wrapper bgcolor attributePass the input value 
        tableTag.wrapperBgcolorAtt =
        clipboardController.ccpIfNoUserInput('bgcolor',document.querySelector(ccpUserInput.tableWrapperBgColor).value);
        // !VA tdBgcolor

        // !VA Get the checked status of Include table wrapper, and if it's 'checked' output the base table AND the table wrapper
        if ( document.querySelector('#table-include-wrapper-checkbox').checked) {
          clipboardStr = 

`<table ${tableTag.wrapperclassAtt + ' '}${tableTag.wrapperWidthAtt + ' '}${tableTag.wrapperAlignAtt + ' '}${tableTag.wrapperBgcolorAtt + ' '}border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" valign="top">
      <table ${tableTag.classAtt + ' '}${tableTag.alignAtt + ' '}${tableTag.widthAtt + ' '}${tableTag.bgcolorAtt + ' '}border="0" cellpadding="0" cellspacing="0">
        <tr>
      ${tableTag.tableContents}
        </tr>
      </table>
    </td>
  </tr>
</table>`;

          // !VA If the option is unchecked, output just the base table
        } else {
          clipboardStr = 

`<table ${tableTag.classAtt + ' '}${tableTag.alignAtt + ' '}${tableTag.widthAtt + ' '}${tableTag.bgcolorAtt + ' '}border="0" cellpadding="0" cellspacing="0">
    <tr>
       ${tableTag.tableContents}
    </tr>
</table>`;

        }
        return clipboardStr;
      },

      // !VA UIContoller public ccpGetCBImgDisplayCSS
      ccpGetCBImgDisplayCSS: function() {
        // !VA Get Appdata to local variable
        var data = UIController.accessAppdata();
        // !VA The string to pass the CSS declaration to the clipboard object
        var clipboardStr;
        // !VA Clipboard output object 
        var imgCSSTag = new ClipboardOutput('imgCSSTag');
        // !VA Put the user-entered class into this property
        imgCSSTag.classAtt = document.querySelector(ccpUserInput.imgClass).value;

        // !VA Build the css class declaration with width and height properties
        clipboardStr = `img.${imgCSSTag.classAtt} { width: ${data.imgW}px !important; height: ${data.imgH}px !important }`;
        // !VA Return the css string to the clipboard object.
        return clipboardStr;

      }, 

      // !VA UIContoller ccpGetCBImgLPhonesCSS
      ccpGetCBImgLPhonesCSS: function() {
        // !VA Get Appdata to local variable
        var data = UIController.accessAppdata();
        console.dir(data);
        // !VA The string to pass the CSS declaration to the clipboard object
        var clipboardStr;
        // !VA Clipboard output object 
        var largePhonesCSSTag = new ClipboardOutput('largePhonesCSSTag');
        // !VA Put the user-entered class into this property
        largePhonesCSSTag.classAtt = document.querySelector(ccpUserInput.imgClass).value;
        // !VA Build the css class declaration with and Appdata large phone width and height properties
        clipboardStr = `img.${largePhonesCSSTag.classAtt} { width: ${data.lPhoneW}px !important; height: ${data.lPhoneH}px !important }`;
        // !VA Return the css string to the clipboard object.
        return clipboardStr;
      }, 

      // !VA UIContoller ccpGetCBImgSPhonesCSS
      ccpGetCBImgSPhonesCSS: function() {
        // !VA Get Appdata to local variable
        var data = UIController.accessAppdata();
        console.dir(data);
        // !VA The string to pass the CSS declaration to the clipboard object
        var clipboardStr;
        window.addEventListener('load', function() {
          // !VA TODO: Dev mode doesn't work any more...
          console.log('initializeDevMode running...');
            
          // !VA Get the imgViewer dimensions as set in CSS:
          var initViewerW = parseInt(document.querySelector(dynamicRegions.imgViewer).style.width);
          // !VA Not sure why this isn't used.
          var initViewerH = parseInt(document.querySelector(dynamicRegions.imgViewer).style.height);
          // !VA Initalize the imgViewer width input field value to the default of 650
          document.querySelector(toolButtons.viewerW).placeholder = initViewerW;
          // !VA  Test if there is currently #cur-img element with an image.If there is, it's hardcoded in the HTML and we're in DEV MODE. If there's not, the app is being initialized in USER MODE.
          var curImgExists = document.querySelector(dynamicRegions.curImg);
          // !VA  Now we have to populate Appdata with data. We can do it manually here and just pass the object on to refresh the screen elements.
          // !VA If there's no current image, then return false. This is the flag to the initializeDOM function that there is no DEV image in the HTML. The init then shows the drop area and 'No Image' in the dimViewers.
  
          // !VA  There is a current image, so first populate Appdata manually and then populate getAppData based on the object properties in Appdata
          var AppobjDev = {
            currentimg: document.querySelector(dynamicRegions.curImg),
            viewer: document.querySelector(dynamicRegions.imgViewer),
            viewport: document.querySelector(dynamicRegions.imgViewport),
            appcontainer: document.querySelector(dynamicRegions.appContainer)
          }; 
  
          var filename = clipboardController.getFilenameFromSource(AppobjDev.currentimg.src);
          // !VA Hide the drop area.
          document.querySelector(staticRegions.dropArea).style.display = 'none';
          // !VA  Show the toolbar
          document.querySelector(staticRegions.toolsContainer).style.display = 'block';
          // !VA This is where we run writeImgToDOM to:
          /* 1) Insert the cur-img-container insider the cur-img element
            2) Include logic to exclude inserting the image unless it doesn't exist already, i.e. is the FileReader blob and not the hard-coded image from the HTML file.
          */
          // !VA AppobjDev returns NaN for the viewer containers because they don't have values yet... not sure I understand why since height and width are initially declared in CSS.
          var Appdata = UIController.getAppData(AppobjDev, filename);
          // !VA evaluate the viewer containers and adjust their size based on the returned Appdata
          var evalViewerSize = clipboardController.evalViewerSize(Appdata);
  
          // !VA Open the CCP by default in dev mode
          // !VA First, make sure it's closed
          document.querySelector(staticRegions.ccpContainer).classList.remove('active');
          // !VA Then run ccpToggle to initialize the dynamic values and open it
          UIController.ccpToggle();
        });   // !VA Clipboard output object 
        var smallPhonesCSSTag = new ClipboardOutput('smallPhonesTag');
        // !VA Put the user-entered class into this property
        smallPhonesCSSTag.classAtt = document.querySelector(ccpUserInput.imgClass).value;
        // !VA Build the css class declaration with and Appdata large phone width and height properties
        clipboardStr = `img.${smallPhonesCSSTag.classAtt} { width: ${data.sPhoneW}px !important; height: ${data.sPhoneH}px !important }`;
        // !VA Return the css string to the clipboard object.
        return clipboardStr;
      }, 

    };
  })();


  // GLOBAL APP MODULE
  var appController = (function(calcCtrl, UICtrl) {

    var Appobj = {};
    
    // !VA V2 getting DOM ID strings from UIController
    var dimViewers = UIController.getDimViewerIDs();
    var dynamicRegions = UIController.getDynamicRegionIDs();
    var staticRegions = UIController.getStaticRegionIDs();
    var toolButtons = UIController.getToolButtonIDs();
    // !VA Deprecated in this version
    // var ccpPropStrings = UIController.getCcpPropStringsIDs();
    var ccpUserInput = UIController.getCcpUserInputIDs();
    // !VA Deprecated in this version
    // var ccpBuildTag = UIController.getCcpBuildTagIDs();


    // !VA appController private setupEventListeners
    var setupEventListeners = function() {

      //DRAG AND DROP PROCESSING START
      //Drag and Drop Handler 
      function handleDragOver(evt) {
        //prevent the bubbling of the event to the parent event handler
        evt.stopPropagation();
        //prevent the default action of the element from executing -- so in this case
        //I think since it is a div the default event would be for some browsers to 
        //open the file in the browser when dropped
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
        console.log('Calling HandleFileSelect');
      }

      // Event Listeners for Drag and Drop
      // !VA dropZone is the screen region that will accept the drop event 
      var dropZone = document.querySelector(dynamicRegions.appContainer);
      dropZone.addEventListener('dragover', handleDragOver, false);
    
      // !VA Initiates the FileReader function to get the dropped image data
      dropZone.addEventListener('drop', handleFileSelect, false);
      // dropZone.addEventListener('drop', startNewDrop, false);
      // Drag and Drop Listener 
      //DRAG AND DROP PROCESSING END

      // !VA This was in the old version but it doesn't look necessary
      // function initializeHandlers() {

      //EVENT HANDLING START 
      function addEventHandler(oNode, evt, oFunc, bCaptures) {
        //Removing this -- apparently IE 9 and 10 support addEventListener
        // if (typeof(window.event) != "undefined")
        // 	oNode.attachEvent("on"+evt, oFunc);
        // else
        oNode.addEventListener(evt, oFunc, bCaptures);
      }
      // addEventHandler(document.getElementById(toolButtons.grow01),'click',doit,false);
      
      // !VA Add click and blur event handlers for clickable toolButtons: 
      var tbClickables = [ toolButtons.grow50, toolButtons.grow10, toolButtons.grow01, toolButtons.shrink50, toolButtons.shrink10, toolButtons.shrink01,  ];
      for (let i = 0; i < tbClickables.length; i++) {
        // !VA convert the ID string to the object inside the loop
        tbClickables[i] = document.querySelector(tbClickables[i]);
        addEventHandler(tbClickables[i],'click',handleUserAction,false);

      }
      
      // !VA Add event handlers for input toolButtons
      var tbKeypresses = [ toolButtons.viewerW, toolButtons.customW, toolButtons.customH, toolButtons.sPhonesW, toolButtons.lPhonesW ];
      for (let i = 0; i < tbKeypresses.length; i++) {
        // !VA convert the ID string to the object inside the loop
        tbKeypresses[i] = document.querySelector(tbKeypresses[i]);
        addEventHandler((tbKeypresses[i]),'keypress',handleUserAction,false);
        addEventHandler((tbKeypresses[i]),'focus',handleUserAction,false);
        addEventHandler(tbKeypresses[i],'blur',handleUserAction,false);
        addEventHandler(tbKeypresses[i],'dragover',handleUserAction,false);
        addEventHandler(tbKeypresses[i],'drop',handleUserAction,false);
      }

      // !VA Add event handlers for the input elements that show mobile CSS clipboard buttons in the CCP when input is made. Currently only the img class input does that.
      var ioKeypresses = [ ccpUserInput.imgClass, ccpUserInput.tdClass, ccpUserInput.tableClass ];
      for (let i = 0; i < ioKeypresses.length; i++) {
        // !VA convert the ID string to the object inside the loop
        ioKeypresses[i] = document.querySelector(ioKeypresses[i]);
        addEventHandler((ioKeypresses[i]),'input',UIController.showElementOnInput,false);
        // addEventHandler((ioKeypresses[i]),'focus',handleUserAction,false);
        // addEventHandler(ioKeypresses[i],'blur',handleUserAction,false);
        // addEventHandler(ioKeypresses[i],'dragover',handleUserAction,false);
        // addEventHandler(ioKeypresses[i],'drop',handleUserAction,false);
      }

      // addEventHandler(ccpUserInput.imgClass,'keypress',showMobileImageButtons,false);
      // ccpUserInput.imgAlt.addEventListener('keypress', showMobileImageButtons);
      // ccpUserInput.imgClass.addEventListener('keypress', showMobileImageButtons);
      // ccpUserInput.imgRelPath.addEventListener('keypress', showMobileImageButtons);






      // !VA Add click handlers for dimViewer - there's only the clipboard button now but there could be more. 
      var dvClickables = [ dimViewers.clipboardBut ];
      for (let i = 0; i < dvClickables.length; i++) {
        // !VA convert the ID string to the object inside the loop
        dvClickables[i] = document.querySelector(dvClickables[i]);
        addEventHandler((dvClickables[i]),'click',handleUserAction,false);
      }

      // appController private handleUserAction 
      function handleUserAction(e) {
        var keypressed;
        var isErr;
        // e.stopPropagation;
        var el;
        // !VA If there is an error message showing, allow the CSS transition to run, then remove it
        var appMessContainer = document.querySelector(staticRegions.appMessContainer);
        var appMessDisplay = document.querySelector(staticRegions.appMessDisplay);
        if (appMessDisplay.textContent) {
          // !VA On any event, if errorViewerContainer is showing, hide it.
          appMessContainer.classList.remove('show-err');
          appMessContainer.classList.add('hide-err');
        }
        // !VA Put the event trigger in an object first, so we don't have to keep calling document.getElementById
        el = document.getElementById(this.id);
        if (event.type === 'click') {
          // !VA If the id contains 'tb' then we're dealing with toolButtons buttons - the first two chars of the ID indicate the element category
          switch (true) {
          case ( el.id.includes('tb')) :
            var val;
            // !VA The last 2 chars of the id indicate the value by which the img dimension should be incremented,so get the last 2 chars and convert to integer
            val = parseInt(el.id.slice(-2));
            // !VA If the target ID includes 'grow' then the image dimension will be incremented, if 'shrink' then it will be decremented
            (el.id.includes('grow')) ? val : val = -val;
            clipboardController.handleTBClicks(el.id, val); 
            break;
          case ( el.id.includes('dv')) :
            UIController.ccpToggle();
            // document.querySelector(staticRegions.ccpContainer).classList.toggle('active');
            break;
          } 

        } else if (event.type === 'keypress') {
          keypressed = e.which || e.keyCode || e.key;
          if (keypressed == 13) {
            // !VA Get the input and evaluate it
            var isErr = clipboardController.validateInteger(this.value);
            if (isErr) {
              // !VA If the value entered isn't an integer, reset it to null and leave the focus there, and send the error code to errorHandler
              el.value = '';
              appController.initError(el.id, 'not_an_integer', true);
            // !VA We want to handle all the toolbutton keyboard input in one place, so send the send the target element's id and value to handleTBInput
            } else if (el.id.includes('tb-input')) {
              clipboardController.handleTBInput(el.id, el.value);
            } else {
              // !VA There will be other input fields to handle, but we're not there yet.
              console.log('Undefined keypress action');
            }
          } 
        } else if (  event.type === 'focus') {
          // !VA Set the value of the element to null when it gets the focus
          el.value = ''; 
          // !VA NOW!
        } else if ( event.type === 'blur') {
          // !VA If the target is viewerW, we want to restore the previous value to the field on blur in case of error or in case it is exited without entering a value with the return key. If the target is customW or customH, we want to restore the placeholder value.
          // !VA TODO: create function to restore placeholder value
          el.value = (function () {
            // !VA If the current element is custom height or custom width, set the value of the field to empty to display the placeholder  
            if ((el.id.includes('customw') || (el.id.includes('customh')))) {
              return '';
            // !VA Reset the viewer width field the last value of Appdata.viewerW 
            } else {
              // !VA Get the Appdata property name that corresponds to the ID of the current input element
              var prop = clipboardController.elementIdToAppdataProp(el.id);
              // !VA Access Appdata
              var data = UIController.accessAppdata();
              // !VA return the current value of the Appdata property for the current event target to that elements value property. 
              // alert(data[prop]);
              return data[prop];
            }

            // e.preventDefault;
          })();
        } else if ( event.type === 'drop') {
          // e.preventDefault;
        } else if ( event.type === 'dragover') {
          // e.preventDefault;
        } 
        else {
          console.log('other event');
        }
      }

        

      // Click handlers - focusOnClick
      // =============================
      // addEventHandler(toolButtons.customheight,'click',focusOnClick,false);
      // addEventHandler(toolButtons.customwidth,'click',focusOnClick,false);
      // addEventHandler(toolButtons.lPhoneWidth,'click',focusOnClick,false);
      // addEventHandler(toolButtons.sPhoneWidth,'click',focusOnClick,false);
      // addEventHandler(toolButtons.viewerwidth,'click',focusOnClick,false);

      // Click handlers - Misc
      // =============================
      // addEventHandler(dimViewers.clipboardBut,'click',toggleCCP,false);

      // Keypress handlers - showMobileImageButtons
      // ==================================


      // Keypress handlers - Misc
      // ==================================
      // addEventHandler(dimViewers.clipboardBut,'keypress',toggleCCP,false);

      // Blur handlers - handleInputBlur
      // =================================
      // addEventHandler(ccpUserInput.imgClass,'blur',showMobileImageButtons,false);
      // ccpUserInput.imgAlt.addEventListener('blur', showMobileImageButtons);
      // ccpUserInput.imgClass.addEventListener('blur', showMobileImageButtons);
      // ccpUserInput.imgRelPath.addEventListener('blur', showMobileImageButtons);
      
      // Change handlers - handleOnChange
      // =================================
      // addEventHandler(ccpUserInput.imgWidth,'change',handleOnChange,false);
      // addEventHandler(ccpUserInput.tableWidth,'change',handleOnChange,false);

      // !VA The closing bracket below belongs to initializeHandlers(), see the top of this function
      // }
      // addEventHandler(window, 'load', function(evt) {initializeHandlers(); } );
    };


    // !VA appController private functions
    //  ==============================
    // !VA appController private getCurImgDimensions
    function getCurImgDimensions(isDev) {
      console.log('getCurImgDimensions running');
      console.log('isDev is: ' + isDev);
      // !VA NEW Initialize Appobj here and pass it along
      var Appobj = {};
      // !VA At this point imgW and imgW = imgNW and imgNH if this is called from initDev or handleFileSelect. The only difference is that initDev needs to write the filename to the DOM because that's handled by handleFileSelect. So we get the isDev flag
      if (isDev) {
        // !VA NEW Get the filename of the devImg in the HTML. This is the only time we'll have an actual source file -- in user mode all the images are blobs -- so we can do this as a one-off.
        var filename = document.querySelector(dynamicRegions.curImg).src;
        filename = filename.split('/');
        filename = filename[filename.length - 1];
        document.querySelector(dimViewers.filename).textContent = filename;
        UICtrl.writeFilenameToUI(filename);
      } 
      // !VA NEW Read required values into Appobj.
      var curImg = document.querySelector(dynamicRegions.curImg);
      Appobj.imgW = curImg.width;
      Appobj.imgH = curImg.height;
      Appobj.imgNW = curImg.naturalWidth;
      Appobj.imgNH = curImg.naturalHeight;
      // !VA NEW We need the aspect ratio to calculate the other dimension when the user only inputs one, i.e. when width or height is entered into one of the toolbars' custom width/height fields.
      Appobj.aspect = getAspectRatio(curImg.naturalWidth,  curImg.naturalHeight);
      // !VA NEW We need new imgW and imgH properties to store the user input values. We don't want to overwrite the original imgW/imgH values because it appears it's not possible since Javascript passes values by reference, so any changes to properties are lost outside the current function's scope. Plus, we need to have the original values persist for the duration of the session, at which point the app and Appobj are reinitialized. 
      Appobj.newImgW = '';
      Appobj.newImgH = '';
      console.dir(Appobj);
      return Appobj;
    }

    // appController private: remove current image
    // !VA Test for whether there is already a #cur-img element in the DOM, and if there is remove it so handleFileSelect can overwrite it without having to refresh the page to reboot the app.
    function removeCurImg() {
      // if ( document.querySelector('#cur-img-container')) {
      document.querySelector('#cur-img-container').parentNode.removeChild(document.querySelector('#cur-img-container'));
      // } 
    }

    // appController private: hfs - FILEREADER OBJECT PROCESSING
    //Get the user-selected image file object 
    function handleFileSelect(evt) {
      console.log('hFS running');
      // If a file is already being displayed, i.e. Appdata.filename is true, then remove that image to make room for the next image being dropped
      // !VA Remove the current #cur-img from the DOM. This has to be done in a separate function call, I'm not sure why handleFileSelect doesn't see #cur-img even though it is in the DOM at this point
      // !VA NEW Commented out for now
      removeCurImg();
      //The drop event has been executed and handleFileSelect is running.
      // !VA Can't remember what this does...    
      evt.stopPropagation();
      evt.preventDefault();
      //dataTransfer object is used to hold object data during a drag operation
      var files = evt.dataTransfer.files; // FileList object.
      // files is a FileList of File objects. List some properties.
      //Note that the File objects are blob objects that include the parameter
      // type, which indicates the type of file. 
      // !VA I don't think the output array is used here, so commenting out.
      // var output = [];
      // !VA get the number of files selected
      
      var f =  files[0];
      // !VA this for loop would be used if we were using the entire filelist instead of just one
      // a single dropped file
      // for (var i = 0, f; f = files[i]; i++) {
      // Only process image files.
      //This is the query for file type -- it includes any MIME type that starts 
      //with 'image' which is a huge list of possible formats -- see the complete
      //list of MIME formats. Best to narrow that down to JPG, GIF, PNG -- not sure
      //about SVG and VML, they're not in the big list of MIME types I found 
      // !VA Need to handle this error
      if (!f.type.match('image.*')) {
        var target = "notimage";
        // !VA Below is the error handler - skipping for now
        // var isErr = errorHandler(target, 0, 0);
        return;
      }
      var reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Create the image object        
          var curImg = new Image();
          // !VA create the id
          curImg.id = 'cur-img';
          // !VA assign the blob in e.target.result to the source of the image. the onload function ensures that the blob is loaded before the
          // curImg.src = e.target.result;
          curImg.src = e.target.result;
          let fileName;
          // Read the filename of the FileReader object into a variable to pass to the getAppData function, otherwise the blob has no name
          fileName = theFile.name;
          // !VA NEW Commented out for now
          UICtrl.writeFilenameToUI(fileName);
          
          // !VA Hide the dropArea - not sure if this is the right place for this.
          document.querySelector(staticRegions.dropArea).style.display = 'none';
          // !VA NEW Once the current image has loaded, initialize the dinViewers by querying the current image properties from UICtrl and passing them to writeDimViewers.
          function initializeDimViewers() { 
            // !VA NEW Initialize the variable that will contain the new image's height, width, naturalHeight and naturalWidth
            var curImgDimensions;
            // !VA Review
            // !VA Set a short timeout while the blob loads, then run the onload function before displaying the image and getting its properties. This is probably overkill, but noone will notice the 250ms anyway and better safe then no-workie. But now that the image is loaded, we can display it and get its properties.
            setTimeout(() => {
              // Once the blob is loaded, show it and get its data
              curImg.onload = (function() {
              // !VA Hide the drop area.
                document.querySelector(staticRegions.dropArea).style.display = 'none';
                // !VA  Show the toolbar
                document.querySelector(staticRegions.toolsContainer).style.display = 'block';
                // !VA Display the current image
                curImg.style.display = 'block';
                // !VA NOW the image is in the DOM and we can call functions to get its properties.
                // !VA Pass Appdata on to evalViewerSizes in order to resize the image containers dynamically based on the dimensions of the image.
                // !VA Create and array of the Appdata properties to update
                // !VA Instead of managing Appdata based on some huge object with four HTML elements and all those unneeded properties thereof, we will just update Appdata by creating a local copy with just the properties we want to add.
                // !VA Stopped here. The problem is that Appdata is a global object in the public functions, as it is now in master. I don't want to put all that stuff in the appController's public functions, so I have to either leave it in UIController or pass it between private functions, which will get very complicated.   I think it will be much cleaner if I only use updateAppData to loop through the items to update and don't use the klunky getAppData. Also, the refreshAppUI function refreshes all the values when it's called - it should only refresh the changed values.
                // !VA NEW Now that the blob image has been displayed and has DOM properties that can be queried, query them and write them to Appobj.
                var Appobj = {};
                Appobj = getCurImgDimensions(false);
                console.log('hFS here: Appobj');
                console.dir(Appobj);

                // !VA NEW Commented out for now.
                calcViewerDimensions(Appobj);

                // !VA NEW Delete
                // clipboardController.evalViewerSize(Appdata);
              })();
              
              // !VA Timeout of 250 ms while the blob loads.
            }, 250);
          }

          // !VA First, write the new curImg object to the DOM
          function writeImgToDOM(curImg, callback) {
            // VA! The callback function allows access of image properties. You can't get image properties from a FileReader object -- it's a binary blob that takes time to load, and by the time it's loaded all the functions that get its properties have run and returned undefined. Temporary solution: hide the image object for 250 ms, then show it and get the properties -- by then it should have loaded. There is a better way to do this with promises but that will have to be for later.
            // !VA Create a div in the DOM
            var curImgDiv = document.createElement('div');
            // !VA Assign the new div an id that reflects its purpose
            curImgDiv.id = 'cur-img-container';
            // Insert cur-img-container into the existing main-image inside the main-image div.
            document.getElementById('main-image').insertBefore(curImgDiv, null);
            // !VA insert the new curImg into the new cur-img container
            document.getElementById('cur-img-container').insertBefore(curImg, null);
            // Create the image object and read in the binary image from the FileReader object.
            // This allows access of image properties. You can't get image properties from a FileReader object -- it's just a blob' 
            // !VA Hide the DOM element while the blob loads.
            document.querySelector(dynamicRegions.curImg).style.display = 'none';
            callback(curImg);		
          }
          // !VA Call the callback function that writes the new image to the DOM.
          writeImgToDOM(curImg, initializeDimViewers);
        };
      })(f);
      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
      // }
      
    }
    //FILEREADR OBJECT PROCESSING END

    // !VA NEW appController private calcViewerDimensions
    function calcViewerDimensions(Appobj) {
      // !VA This isn't necessary here, but will probably be used somewhere else...
      // !VA TODO: Try to figure out whether this is useful at all.
      // const maxViewerWidth = (parseInt(window.getComputedStyle(appRegions.appContainer,null).getPropertyValue('width'), 10)) - 48;

      // Using the current image dimensions, set the size of the viewer based on the following criteria:
      // !VA TODO: This can probably be recoded for efficiency but it works for now. Take another look at it.
      

      // !VA NEW Get the actual viewerW from getComputedStyle
      var viewerW;
      var viewerH;
      var compStyles = window.getComputedStyle(document.querySelector(dynamicRegions.imgViewer));
      viewerW = parseInt(compStyles.getPropertyValue('width'), 10);
      viewerH = parseInt(compStyles.getPropertyValue('height'), 10);

      switch(true) {
      // The image falls within the default viewer dimensions set in initApp, so do nothing.
      // !VA This case is irrelevant since we're now comparing everything to maxViewerWidth not the  init values. Change accordingly...
      // !VA  NOT SO...now we're trying to restore the previous functionality so...
      case (Appobj.imgNW <= viewerW) && (Appobj.imgNH < viewerH) :
        Appobj.imgW = Appobj.imgNW;
        Appobj.imgH = Appobj.imgNH;
        // !VA viewerH is set in initApp, so no change to it here
        // !VA viewerH is set in initapp, so no change to that here either.
        // !VA We don't need to adjust height...but maybe we do for consistency's sake
        // this.adjustContainerHeights(Appdata);
        break;

      // The image is wider than the current viewer width but shorter than current viewer height, so resize the image based on the viewer width
      
      case (Appobj.imgNW > viewerW) && (Appobj.imgNH < viewerH) :
        // Set the image width to the current viewer
        Appobj.imgW = viewerW;
        // Get the image height from the aspect ration function
        Appobj.imgH = Math.round((1/getAspectRatio(Appobj.imgNW, Appobj.imgNH)[0]) * Appobj.imgW);
        // Set the viewerH to the imgH
        viewerH = Appobj.imgH;
        // this.adjustContainerHeights(Appdata);
        break;

      // The image is not as wide as the current viewer width, but is taller than the viewer height. Keep the image width but resize the viewer in order to display the full image height
      // !VA This might be a problem with consecutive images without page refresh
      case (Appobj.imgNW <= viewerW) && (Appobj.imgNH > viewerH) :
        // Set the viewer height and the image height to the image natural height
        viewerH = Appobj.imgH = Appobj.imgNH;
        // Set the image width to the natural image width
        Appobj.imgW = Appobj.imgNW;

        // !VA  Use adjustContainerHeights to get the Appdata height
        // !VA  Note the dependency with initAppdata, see 'Dependency with adjustContainerHeights'
        // this.adjustContainerHeights(Appdata);
        break;

      // The image is wider and taller than the current viewer height and width so we have to resize the image and the viewport based on the current viewport width
      case (Appobj.imgNW > viewerW) && (Appobj.imgNH > viewerH) :
        // Set the image Width to the current  viewer width 
        Appobj.imgW = viewerW;
        // Set the image height proportional to the new image width using the aspect ratio function
        Appobj.imgH = Math.round((1/getAspectRatio(Appobj.imgNW, Appobj.imgNH)[0]) * Appobj.imgW);
        // Set the viewer height to the image height
        viewerH = Appobj.imgH;
        // Get the viewport and Appdata height from adjustContainerHeights

        // !VA TODO: Check this out, doesn't seem to be a problem anymore: BUG Problem with the 800X550, 800X600 -- no top/bottom gutter on viewport
        break;
      }
      // !VA Transfer control to UIController to print to the UI
      UIController.writeDimViewers(Appobj);
      doContainerHeights(Appobj.imgH, Appobj.imgW, viewerH);

      // !VA Run evalDimAlerts now, after all the containers have been resized.
      // !VA !IMPORTANT! THIS IS WHERE TO GET THE UPDATED APPDATA
      // clipboardController.evalDimAlerts(Appdata, dimViewers);
      
    }

    
    //appController private: getAspectRatio
    function getAspectRatio (var1, var2) {
      var aspectReal = (var1 / var2);
      var aspectInt = function() {
        //get the aspect ratio by getting the gcd (greatest common denominator) and dividing W and H by it
        //This is a single line function that wraps over two lines 
        function gcd(var1,var2) {if ( var2 > var1 ) { 
          // !VA Added variable declaration
          var temp = var1; 
          var1 = var2; 
          var2 = temp; } while(var2!= 0) { 
          // !VA Added variable declaration
          var m = var1%var2; 
          var1 = var2;
          var2 = m; } 
        return var1;}
        var gcdVal = gcd( var1 , var2 );
        //divide the W and H by the gcd
        var w = (var1 / gcdVal);
        var h = (var2 / gcdVal);
        //Express and return the aspect ratio as an integer pair
        aspectInt = (w + ' : ' + h);
        return aspectInt;
      }();
      return [aspectReal, aspectInt];  
    }

    
      // appController private: CONVERT INTEGER TO PIXEL VALUE
      function intToPx(int) {
        let pxval;
        let str = String(int);
        pxval = str + 'px';
        return pxval;
      }

    // !VA appController private doContainerHeights
    function doContainerHeights(imgH, imgW, viewerH)  {
      // !VA This calculates the imgViewer, imgViewport and appContainer height based on Appdata values.
      // !VA Initial height is 450, as it is defined in the CSS. TOo much hassle to try and get the value as defined in the CSS programmatically.
      // const initViewerH= parseInt(document.querySelector(dynamicRegions.imgViewer).height, 10);
      const initViewerH = 450;
      let viewportH;
      let appH; 

      // !VA I'm not even sure this is necessary since we're getting the viewerW from maxViewerHeight now -- but we'll leave it in here for the time being. 
      // !VA TODO: Review this whole maxViewerHeight thing.
      if (imgH <= initViewerH) {
        // !VA  This is the min-height set in CSS
        // appObj.appContainerH = 804;
        viewerH = initViewerH;
        viewportH = viewerH + 145;
      } else {
        // Need a little buffer in the viewport
        viewerH = imgH;
        viewportH = imgH + 145;

      }
      appH = viewportH;
      // viewportH = heightVal + 125;
      // appContainerH = viewportH;
      // This should write the heights to Appdata and then pass it to the function that writes Appdata to the dimViewers, probably called refreshDimViewers. In fact, there's no reason not to consolidate that function with the function that updates the image container heights and refresh the entire UI at the same time, so refreshUI.
      // dynamicRegions.imgViewer
      // dynamicRegions.imgViewPort
      // dynamicRegions.appContainer


      document.querySelector(dynamicRegions.curImg).style.width = clipboardController.intToPx(imgW);
      document.querySelector(dynamicRegions.curImg).style.height = clipboardController.intToPx(imgH);
      document.querySelector(dynamicRegions.imgViewer).style.height = clipboardController.intToPx(viewerH);
      document.querySelector(dynamicRegions.imgViewport).style.height = clipboardController.intToPx(viewportH);
      document.querySelector(dynamicRegions.appContainer).style.height = clipboardController.intToPx(appH);
    }

    //  !VA ERROR HANDLING
    // ==============================
    // !VA appController private errorHandler

    var errorHandler = function(id, str, bool) {
      var data = UIController.accessAppdata();
      console.log('in errorHandler');
      console.log('id is: ' + id);
      console.log('str is: ' + str);
      console.log('bool is: ' + bool);
      var errorMessages = {
        imgW_GT_viewerW: `An image can't be wider than its parent table (currently set at ${data.viewerW}px). The image width has to be less than the width of its container.`,
        tbButton_LT_zero: 'Sorry, that would make one of the image dimensions less than 0.',
        tbButton_GT_viewerW: `Sorry, that would make the image wider than its container, which is currently set at ${data.viewerW}px`,
        // !VA maxViewerWidth issue here, see message below;
        viewerW_GT_maxViewerWidth: `The container table width can't be greater than the width of the app itself &mdash; 800px.`,
        not_an_integer: 'Not an integer: please enter a positive whole number for width.'
      };


      // !VA Loop through the error ID/message pairs and find the match
      for (const [key, value] of Object.entries(errorMessages)) { 
        if (key === str ) {
          console.log('value is: ' + value);
          showAppMessage(id, value, true);
        }
      }
    };


    // appController private: VALIDATE INPUT FOR INTEGER
    function validateInteger(inputVal) {
      // !VA Since integer validation is used for all height/width input fields, including those not yet implemented
      let isErr;
      // let mess;
      if (!parseInt(inputVal, 10) || inputVal % 1 !== 0 || inputVal < 0) {
        isErr = true;
      } else { 
        // !VA Input fields return strings, so convert to integer
        inputVal = parseInt(inputVal);
        isErr = false;
      }
      // !VA Just returning true here, the error code is sent by the calling function in handleUserAction
      return isErr;
    }


    // !VA Need to get the Appdata property that corresponds to the ID of the DOM input element that sets it. It's easier to just create a list of these correspondences than to rename the whole UI elements and Appdata properties so they correspond, or to create functions that use string methods to extract them from each other.
    //  appController private: GET APPDATA PROPERTY NAME FROM AN HTML ELEMENT ID
    function elementIdToAppdataProp(str) {
      var IDtoProp = {
        viewerW:  'tb-input-viewerw',
        imgW: 'tb-input-customw',
        imgH: 'tb-input-customh',
        sPhoneW: 'tb-input-small-phonesw',
        lPhoneW: 'tb-input-large-phonesw'

      };
      // !VA This should return directly wihout a ret variable as tmp storage.
      var ret = Object.keys(IDtoProp).find(key => IDtoProp[key] === str);
      // alert(ret);
      return ret;
    }


      // !VA appController private
      // !VA Here we can show a message bypassing errorHandler - not all messages are errors.
    var showAppMessage = function(id, mess, isErr) {
      console.log('showAppMessage-top');      
      console.log('id is: ' + id);
      console.log('mess is: ' + mess);
      console.log('isErr is: ' + isErr);
      //Set the time the message will display
      // let displayTime;
      // Get the elements to manipulate for the error message display
      // // !VA Create objects for all the UI elements used in this function
      var appMessContainer = document.querySelector(staticRegions.appMessContainer);
      var appMessDisplay = document.querySelector(staticRegions.appMessDisplay);
      // var dimViewers = document.querySelector('#dim-viewers');
      // var toolsContainer = document.querySelector('#tools-container');
      // Put the respective error message in the error message container
      appMessDisplay.innerHTML = mess;
      // Swap dimViewers with appMessDisplay and drop toolsContainer behind viewport;


      appMessContainer.classList.add('show-err');


      // !VA Reset the value of the element into which the error was entered to empty. 
      document.getElementById(id).value = '';
      appMessContainer.classList.remove('hide-err');
      appMessContainer.classList.add('show-err');

    };

    var doit = function() {
      // SCRAP DO IT FUNCTION
      console.log('Doing it...');
    };

    // !VA NEW appController private
    var initDev = function() {
      // !VA This is where we initialize Dev mode, which is where we can start the app with a hard-coded img element in the HTML file. THis is very useful, otherwise we'd have to drop files to initialize or dink with the FileReader object to hard-code a test file.
      console.log('initDev running');
      // !VA Get the current (devimg) image dimensions and write the dimViewers
      var curImgDimensions = getCurImgDimensions(true);
      calcViewerDimensions(curImgDimensions);
      // !VA Open the CCP by default in dev mode
      // !VA First, make sure it's closed
      // document.querySelector(staticRegions.ccpContainer).classList.remove('active');
      // !VA Then run ccpToggle to initialize the dynamic values and open it
      // UIController.ccpToggle();
    };

    // !VA appController public
    return {
      initError: function(id, str, bool) {
        console.log('initError in appController');
        errorHandler(id, str, bool);
      },
      init: function(){
        // clipboardController.tst();
        console.log('App initialized.');
        // !VA NEW Make sure the CCP is off
        document.querySelector(staticRegions.ccpContainer).classList.remove('active');
        setupEventListeners();
        // !VA  Test if there is currently #cur-img element with an image.If there is, it's hardcoded in the HTML and we're in DEV MODE. If there's not, the app is being initialized in USER MODE.
        var curImgExists = document.querySelector(dynamicRegions.curImg);
        if (curImgExists) {
          initDev();
        } else {
          // !VA NEW - Initialize the app UI and wait for input
          UICtrl.initUI();
        }
      }
    };

  })(clipboardController, UIController);

  appController.init();

//Namespace closure
})();