
/* !VA  - SWITCHED TO ARNIE on UBUNTU
===========================================================
06.17.19






TODO: Rewrite updateAppdata to be parameters... with key/value pairs as parameter.
TOD0: Think about making getAppdata only query a specific property if possible.
TODO: Fix being able to resize viewerW smaller than imgW - current behavior is imgw resizes with viewerW. If that's the desired behavior, imgW still doesn't write the udpated width to Appdata, that needs to be fixed.
TODO: Finish reviewing and implementing write to clipboard buttons.
TODO: Implement Td and table copy to clipboard buttons.
TODO: Make mrk => box function...not sure where though or whether it's necessary since it's just a one-liner.
TODO: Fix error messages - they don't fade out. Loop that in with flashAppMessage
TODO: Fix bug - load 400X1000, multiple click on +50, Display Size shows 450 but the img doesn't grow...
TODO: Implement image swap 
TODO: Parent table class att only shows in CB output if Wrapper is selected, not in just the Partent table output.
TODO: Make bgcolor add the hash if it's not in the value
TODO: FIx, when imgNW is greater than imgW the imgNW size flashes before resizing to the viewer size. This is probably because of the settimeout, which might not be necesssary if the onload function is running.
TODO: THe CCP should store all the currently selected options and restore them whenever the ccp is opened -- I think. Not sure if this is the right behavior...think bout it. Probably not.
TODO: Assign keyboard  shortcuts
TODO: Assign tab order

DONE: Fold handleToolbarClicks into checkUserInput and rename to checkUserInput
Branch checkUserInput
DONE: Branch rewriteHandleUserAction061119
DONE: Fix that smallphones and largephones input fields show undefined and show in Appdata as pixel values.
DONE: Fix default value in viewerW field - Fixed, added to calcViewerSize
DONE: resize viewerW doesn't work Fixed, reconfigured updateAppdata to include viewerW
DONE: - imgheight and imgwidth don't work Fixed, added evalToolbarInput to follow checkUserInput
DONE: Rename UI.
DONE: Show/Hide CCP, make checkboxes functional.
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
      viewerW: '#tb-input-viewerwidth',
      grow50: '#tb-but-grow50',
      grow10: '#tb-but-grow10',
      grow01: '#tb-but-grow01',
      imgWidth: '#tb-input-imgwidth',
      toggleImgSize: '#toggle-image-size',
      imgHeight: '#tb-input-imgheight',
      shrink01:'#tb-but-shrink01',
      shrink10: '#tb-but-shrink10',
      shrink50: '#tb-but-shrink50',
      sPhonesW: '#tb-input-sphones-width',
      lPhonesW: '#tb-input-lphones-width',
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
      appMessContainer: '#app-message-container',
      appMessDisplay: '#app-message-display',
      ccpBlocker: '#ccp-blocker'
    };

    // !VA  UIController: ccpUserInput ID Strings
    // !VA imgAnchor is just a flag for the status of the checkbox. The actual propStrings have to have an Open and Close property.
    var ccpUserInput = {
      imgClass: '#ccp-input-img-class',
      // imgAnchor: '#ccp-img-anchor-checkbox',
      imgAlt: '#ccp-input-img-alt',
      // !VA This isn't even a thing... probably delete it 04.28.19
      // !VA Not renaming the checkbox/checkmarks for now because they already have code that queries the last three characters to determine if mrk or box...
      imgIncludeStyles: '#ccp-img-include-css-checkmrk',
      imgAlign: '#ccp-select-img-align',
      imgRelPath: '#ccp-input-img-relpath',
      tdClass: '#ccp-input-td-class',
      tdAlign: '#ccp-select-td-align',
      tdValign: '#ccp-select-td-valign',
      tdBgcolor: '#ccp-input-td-bgcolor',
      tdBgimage: '#ccp-td-bgimage-checkmrk',
      tableClass: '#ccp-input-table-class',
      tableAlign: '#ccp-select-table-align',
      tableWidth: '#ccp-input-table-width',
      // !VA Not in use yet
      // tableMaxWidth: '#table-max-width-input',
      tableBgcolor: '#ccp-input-table-bgcolor',
      tableIncludeWrapper: '#ccp-table-include-wrapper-checkmrk',
      tableWrapperClass: '#ccp-input-table-wrapper-class',
      tableWrapperWidth: '#ccp-input-table-wrapper-width',
      tableWrapperAlign: '#ccp-select-table-wrapper-align',
      tableWrapperBgColor: '#ccp-input-table-wrapper-bgcolor',
    };

    // !VA ccpMakeClip ID Strings
    // Stores the ccpMakeTag object for assembling the clipboard create tag buttons
    // !VA V2 Also doesn't belong here, we will move it later.
    var ccpMakeClipBut = {
      // !VA Build HTML Clipboard Buttons
      ccpImgWriteHTMLToCB: '#ccp-img-build-html-but',
      ccpTdWriteHTMLToCB: '#ccp-td-build-html-but',
      ccpTableWriteHTMLToCB: '#ccp-table-build-html-but',
      // !VA Make CSS Clip Buttons

      imgDisplayWriteCSSToCB: '#ccp-img-display-css-to-clipboard-but',
      imgSPhoneWriteCSSToCB: '#ccp-img-sphone-css-to-clipboard-but',
      imgLPhoneWriteCSSToCB: '#ccp-img-lphone-css-to-clipboard-but',
      tdDisplayWriteCSSToCB: '#ccp-td-display-css-to-clipboard-but',
      tdSPhoneWriteCSSToCB: '#ccp-td-sphone-css-to-clipboard-but',
      tdLPhoneWriteCSSToCB: '#ccp-td-lphone-css-to-clipboard-but',
      tableDisplayWriteCSSToCB: '#ccp-table-display-css-to-clipboard-but',
      tableSPhoneWriteCSSToCB: '#ccp-table-sphone-css-to-clipboard-but',
      tableLPhoneWriteCSSToCB: '#ccp-table-lphone-css-to-clipboard-but',
    };


    // !VA UIController private evalDimAlerts
    function evalDimAlerts(dimViewers) {
      var dimViewers;
      dimViewers = UIController.getDimViewerIDs();
      // !VA Query Appdata
      var Appdata = {};
      Appdata = appController.getAppdata(false);
      
      // !VA Size On Disk is NOT 2X the Display Size: flag Size on Disk and Retina
      var curDimViewer = [];
      if (Appdata.imgNW <= (Appdata.imgW * 2) ) {
        curDimViewer.push(dimViewers.diskimg);
      } 
      // !VA Small phones isn't at least 2X size on Disk and Retina
      if (Appdata.imgNW < (Appdata.sPhonesW * 2) ) {
        curDimViewer.push(dimViewers.smallphones);
      } 
      // !VA Large phones isn't at least 2X Size on Disk and Retina
      if (Appdata.imgNW < (Appdata.lPhonesW * 2) ) {
        curDimViewer.push(dimViewers.largephones);
      } 
      // !VA Reset all the dim viewer alerts by passing in the entire dimViewer array
      UIController.writeDimAlerts(dimViewers, false);
      // !VA Now set the individual dim viewer alerts for the current image.
      UIController.writeDimAlerts(curDimViewer, true);
    }






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
        return ccpMakeClip;
      },
      getCcpMakeClipButIDs: function() {
        return ccpMakeClipBut;
      },

      // !VA UIController public initUI
      initUI: function() {
        console.log('initUI');
        // !VA  Initialize the ImgViewer to accomodate the dragArea. This should be the same as the CSS definition: currently 650x450
        // !VA DEV Write the computed styles to console to make sure they are as expected: 650x450
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
      writeDimViewers: function() {
        // !VA We need the current value in dimViewers.smallphones and dimViewers.largephones to display all the dimViewers. So, if it's not explicitly user-defined, then use the default placeholder value from the HTML, then get the height from getAspectRatio
        var Appdata = {};
        // !VA Get the current Appdata
        Appdata = appController.getAppdata();
        // !VA Hide the dropArea
        document.querySelector(staticRegions.dropArea).style.display = 'none';
        // Write the dimViewers
        document.querySelector(dimViewers.filename).innerHTML = `<span class='pop-font'>${Appdata.filename}</span>`;
        document.querySelector(dimViewers.display).innerHTML = `<span class='pop-font'><span id="display-size-width">${Appdata.imgW}</span> X <span id="display-size-height">${Appdata.imgH}</span></span>`;
        document.querySelector(dimViewers.diskimg).innerHTML = `<span class='pop-font'>${Appdata.imgNW} X ${Appdata.imgNH}</span>`;
        document.querySelector(dimViewers.aspect).innerHTML = `<span class='pop-font'>${Appdata.aspect[1]}</span>` ;
        document.querySelector(dimViewers.smallphones).innerHTML = `<span class='pop-font'><span id='small-phones-width'>${Appdata.sPhonesW}</span> X <span id='small-phones-height'>${Appdata.sPhonesH}</span></span>` ;
        document.querySelector(dimViewers.largephones).innerHTML = `<span class='pop-font'><span id='large-phones-width'>${Appdata.lPhonesW}</span> X <span id='large-phones-height'>${Appdata.lPhonesH}</span></span>` ;
        document.querySelector(dimViewers.retina).innerHTML = `<span class='pop-font'>${2 * Appdata.imgW}</span> X <span class='pop-font'>${2 * Appdata.imgH}`;
        // !VA NEW Display the clipboard button
        document.querySelector(dimViewers.clipboardBut).style.display = 'block';
        // !VA Call evalDimAlerts to calculate which dimViewer values don't meet HTML email specs.
        evalDimAlerts();
      },

      // !VA NEW I had this as private but moved to public, not sure why.
      //UIController public writeDimAlerts
      writeDimAlerts: function(curDimViewers, bool) {
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

      // UIController: Flash a status message in the app message area
      // !VA NEW - review this. We could probably fold this into the error handler but that's going to be complicated enough as it is and this is just for status messages
      flashAppMessage: function(id) {
        // !VA Passes in the id of the element that triggered the action for which a status message is displayed.

        // !VA Get the message container and display text into variables
        var appMessContainer = document.querySelector(staticRegions.appMessContainer);
        var appMessDisplay = document.querySelector(staticRegions.appMessDisplay);
        var ccpBlocker = document.querySelector(staticRegions.ccpBlocker);

        // !VA TODO: These element IDs are hardcoded, but they should be aliased. Not sure how to do that...
        var statusMessages = {
          'ccp-img-build-html-but': '<img> HTML element copied to Clipboard',
          'ccp-td-build-html-but': '<td> HTML element copied to Clipboard',
          'ccp-table-build-html-but': '<table> HTML element copied to Clipboard',
          'ccp-img-display-css-to-clipboard-but': 'CSS class delaration copied to the Clipboard',
          'ccp-img-lphone-css-to-clipboard-but': 'CSS class delaration for tablets copied to the Clipboard',
          'ccp-img-sphone-css-to-clipboard-but': 'CSS class delaration for phones copied to the Clipboard',
          'ccp-td-display-css-to-clipboard-but': 'CSS class delaration copied to the Clipboard!',
          'ccp-td-lphone-css-to-clipboard-but': 'CSS class delaration for tablets copied to the Clipboard',
          'ccp-td-sphone-css-to-clipboard-but': 'CSS class delaration for phones copied to the Clipboard',
          'ccp-table-display-css-to-clipboard-but': 'CSS class delaration copied to the Clipboard',
          'ccp-table-lphone-css-to-clipboard-but': 'CSS class delaration for tablets copied to the Clipboard',
          'ccp-table-sphone-css-to-clipboard-but': 'CSS class delaration for phones copied to the Clipboard',
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
      },

    };

    
  })();



  var CBController = (function() {


    // !VA CBController private functions
    // !VA If we want to access any of the DOM IDs we have to call them from UIController where they're defined.
    var dynamicRegions = UIController.getDynamicRegionIDs();
    var staticRegions = UIController.getStaticRegionIDs();
    var toolButtons = UIController.getToolButtonIDs();
    var dimViewers = UIController.getDimViewerIDs();
    var ccpUserInput = UIController.getCcpUserInputIDs();
    var ccpMakeClipBut = UIController.getCcpMakeClipButIDs();

    
    // !VA Constructor for the clipboard output objects. These are all the properties all the clipboard output objects (img, td and table) will have. We store these key/value pairs in instances of the ClipboardOutput  because they're easier to manage. Then we write the output into an HTML string.
    function ClipboardOutput(classAtt, alignAtt ) {
      this.classAtt = classAtt;
      this.alignAtt = alignAtt;
    }

    // CBController: GET STRINGS FOR THE IMG CLIPBOARD OUTPUT
    function ccpGetCBImgHTML() {
      // !VA Get Appdata - we need it for the filename
      var data = appController.getAppdata();
      // !VA The string that passes the HTML img tag
      var str; 
      // !VA Create the instance for img tag clipboard object and add img-specific properties.
      // !VA We're doing this in an object and outputting to an array because the object is easier to manage and the array is easier to reorder. The Constructor is in this module in the private functions above.
      var imgTag = new ClipboardOutput('imgTag');
      // !VA imgTag properties
      // !VA ---------------------------
      imgTag.classAtt = 
        // !VA If the user has input a value and the value exists, then build the clipboard output string. Otherwise, exclude the attribute string from the clipboard output 
        ccpIfNoUserInput('class',document.querySelector(ccpUserInput.imgClass).value);

      imgTag.altAtt =    
        // !VA If the user has input a value and the value exists, then build the clipboard output string. Otherwise, exclude the attribute string from the clipboard output
        ccpIfNoUserInput('alt',document.querySelector(ccpUserInput.imgAlt).value);
      // !VA imgTag.altAtt END

      imgTag.srcAtt = (function (id, data) {
        // !VA Get the filename from the dimViewer
        
        var str;
        // !VA If the path input element is empty, just include the filename and omit the path.
        if (document.querySelector(id).value) {
          str = `src="${document.querySelector(ccpUserInput.imgRelPath).value}/${document.querySelector(dimViewers.filename).textContent} `;
        } else {
          str = document.querySelector(dimViewers.filename).textContent;
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
    } 

  // CBController private imgClipboardBut: Clipboard output for build html image button
  var imgClipboardBut = new Clipboard(ccpMakeClipBut.ccpImgWriteHTMLToCB, {
    text: function(trigger) {
      var clipboardStr = ccpGetCBImgHTML();
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

      // clipboardController: IF NO USER INPUT IN CCP OPTION ELEMENTS 
      // !VA TODO: THis should be in handleUserInput
      function ccpIfNoUserInput(att, value) {
        // !VA We need get the filename from Appdata in case the user leaves 'path' empty
        var Appdata = appController.getAppdata();
        var str;
        // !VA If there is an entry in the user entry field element, include the attribute string in the clipboard output. 
        if (value && att) {
          // !VA I might want to change this to include the # in the string itself.
          if (value === '#') {
            str = '';
          } else {
            str = `${att}="${value}"`;
          }

        } else {
          // !VA If the path field is empty, we need to return the filename without the path.
          if (att === 'src' && value === '' ) {
            str = `${att}="${Appdata.filename}" `;
          } else if ( att === '#' || att === '') {
            str = '';
          } else {
            // !VA If there is no input, exclude the attribute entry.
            str = '';
          }
        }
        return str;

      }

    // !VA CBController public functions 
    return {


    };
  })();


  // GLOBAL APP MODULE
  var appController = (function(calcCtrl, UICtrl) {

    
    // !VA Getting DOM ID strings from UIController
    var dimViewers = UICtrl.getDimViewerIDs();
    var dynamicRegions = UICtrl.getDynamicRegionIDs();
    var staticRegions = UICtrl.getStaticRegionIDs();
    var toolButtons = UICtrl.getToolButtonIDs();
    var ccpUserInput = UICtrl.getCcpUserInputIDs();
    var ccpMakeClipBut =  UICtrl.getCcpMakeClipButIDs();
    

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
        addEventHandler(tbClickables[i],'click',handleMouseEvents,false);

      }
      
      // !VA Add event handlers for input toolButtons
      var tbKeypresses = [ toolButtons.viewerW, toolButtons.imgWidth, toolButtons.imgHeight, toolButtons.sPhonesW, toolButtons.lPhonesW ];
      for (let i = 0; i < tbKeypresses.length; i++) {
        // !VA convert the ID string to the object inside the loop
        tbKeypresses[i] = document.querySelector(tbKeypresses[i]);
        // !VA Handles all key events except TAB, which require keyDown to get the value of the current input rather than the input being tabbed to.

        // addEventHandler((tbKeypresses[i]),'keypress',handleKeypress,false);
        addEventHandler((tbKeypresses[i]),'keyup',handleKeyup,false);
        addEventHandler((tbKeypresses[i]),'focus',handleFocus,false);
        // !VA Deprecated
        // addEventHandler(tbKeypresses[i],'blur',handleUserAction,false);
        // !VA TODO
        // addEventHandler(tbKeypresses[i],'dragover',handleUserAction,false);
        // addEventHandler(tbKeypresses[i],'drop',handleUserAction,false);
      }

      // !VA Add event handlers for the input elements that show mobile CSS clipboard buttons in the CCP when input is made. Currently only the img class input does that.
      var ccpKeypresses = [ ccpUserInput.imgClass, ccpUserInput.tdClass, ccpUserInput.tableClass ];
      for (let i = 0; i < ccpKeypresses.length; i++) {
        // !VA convert the ID string to the object inside the loop
        ccpKeypresses[i] = document.querySelector(ccpKeypresses[i]);
        addEventHandler((ccpKeypresses[i]),'input',showElementOnInput,false);
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
        addEventHandler((dvClickables[i]),'click',initCCP,false);
      }

      // !VA appController private handleFocus
      // !VA Handle behavior when an element gets the focus. Pertains only to keyboard input, actually, I'm not sure whether buttons or CCP elements need special handling.
      function handleFocus(evt) {
        // !VA Get the target element of the click
        el = document.getElementById(this.id);
        // !VA Select the clicked element's value, or if there's no value, set it to empty with a cursor, which is the default select behavior for empty fields.
        this.select();
      }

      // Click handlers - Misc
      // =============================
      // !VA This was moved to initCCP I think
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
    // appController private: remove current image
    // !VA Test for whether there is already a #cur-img element in the DOM, and if there is remove it so handleFileSelect can overwrite it without having to refresh the page to reboot the app.


    // appController private: hfs - FILEREADER OBJECT PROCESSING
    //Get the user-selected image file object 
    function handleFileSelect(evt) {
      console.log('hFS running');
      // If a file is already being displayed, i.e. Appdata.filename is true, then remove that image to make room for the next image being dropped
      // !VA Remove the current #cur-img from the DOM. This has to be done in a separate function call, I'm not sure why handleFileSelect doesn't see #cur-img even though it is in the DOM at this point
      // !VA Remove the current image if one exists so the user can drop another one over it and reboot the process rather than having to refresh the browser and drop another image. This way, all the current settings are maintained. If they want new settings they can refresh the browser.
      document.querySelector('#cur-img-container').parentNode.removeChild(document.querySelector('#cur-img-container'));
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
          // !VA Write the filename to the DOM so we can add it later to Appdata. It's not completely DRY because it's added to the DOM here and later to Appdata, and then queried in the CCP from Appdata, but it's better than having to query it from the DOM every time it's used in a separate function call. This way, we can loop through Appdata to get it if we need to.
          document.querySelector(dimViewers.filename).textContent = fileName;
          
          // !VA Hide the dropArea - not sure if this is the right place for this.
          document.querySelector(staticRegions.dropArea).style.display = 'none';
          // !VA NEW Once the current image has loaded, initialize the dinViewers by querying the current image properties from UICtrl and passing them to writeDimViewers.
          function initDimViewers() { 
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
                // !VA Review this - it might be an older comment...
                // !VA The problem is that Appdata is a global object in the public functions, as it is now in master. I don't want to put all that stuff in the appController's public functions, so I have to either leave it in UIController or pass it between private functions, which will get very complicated.   I think it will be much cleaner if I only use updateAppData to loop through the items to update and don't use the klunky getAppData. Also, the refreshAppUI function refreshes all the values when it's called - it should only refresh the changed values.
                // !VA NEW Now that the blob image has been displayed and has DOM properties that can be queried, query them and write them to Appdata.
                // !VA Now that we have a current image in the DOM, Get Appdata so we can store the filename in it.

                // !VA Initialize the value in the toolbar viewerW input field to its initial CSS value.
                // !VA Commenting this out since I changed it to hard-coded in the HTML file along with sPhonesW and sPhonesH.
                // console.log('document.querySelector(dynamicRegions.imgViewer) is: ' + document.querySelector(dynamicRegions.imgViewer));
                // console.dir(document.querySelector(dynamicRegions.imgViewer));
                // document.querySelector(toolButtons.viewerW).value = document.querySelector(dynamicRegions.imgViewer).style.width;
                
                // !VA Set the data attribute for small phone and large phone width. We need this because there is not actual HTML element that corresponds to these properties, and thus no way to persist them globally. So the data attribute sphonew and sphoneh will be written to the toolbar input field as surrogate for an actual DOM element that Appdata can query.
                var sphonesw, lphonesw;
                sphonesw = document.querySelector(toolButtons.sPhonesW);
                lphonesw = document.querySelector(toolButtons.lPhonesW)                
                sphonesw.setAttribute('data-sphonesw', '320')
                lphonesw.setAttribute('data-lphonesw', '480')
                sphonesw.value = sphonesw.getAttribute('data-sphonesw');
                lphonesw.value = lphonesw.getAttribute('data-lphonesw');

                calcViewerSize(false);
              })();
              
              // !VA Timeout of 250 ms while the blob loads.
            }, 250);
          }

          // !VA First, write the new curImg object to the DOM
          function initImgToDOM(curImg, callback) {

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
          initImgToDOM(curImg, initDimViewers);
        };

      })(f);
      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
    //FILEREADER OBJECT PROCESSING END

          
    // !VA INPUT HANDLING
    // !VA ============================================================


      // !VA Branch rewriteHandleUserAction061119 
      // !VA appController private handleMouseEvents. Preprocess mouse events and route them to respective eval handler.
      function handleMouseEvents(evt) {
        // !VA Carryover from earlier handleUserAction
        // !VA Get the target element of the click
        el = document.getElementById(this.id);

        // !VA Handle the increment toolbuttons
        if (event.type === 'click') {
          switch (true) {
            case ( el.id.includes('tb-but')) :
              // !VA Variable to hold the name of the Appdata property the event corresponds to
              var prop;
              // !VA We need to query Appdata properties to get the current value of imgW so we can add the toolbutton increments to id
              var Appdata = {};
              Appdata = appController.getAppdata();
              // !VA This is a click on one of the toolbutton increment buttons, so we're dealing with the Appdata.imgW property.
              prop = 'imgW';
              // !VA The last 2 chars of the id indicate the value by which the img dimension should be incremented,so get the last 2 chars and convert to integer
              val = parseInt(el.id.slice(-2));
              // !VA If the target ID includes 'grow' then the image dimension will be incremented, if 'shrink' then it will be decremented
              (el.id.includes('grow')) ? val : val = -val;
              // !VA Add val to the current imgW to get the value to be passed to checkUserInput for error parsing.
              val = Appdata.imgW + val;
              console.log('in handleMouseEvents');
              console.log('val is: ' + val);
              // !VA HERE!
              isErr = checkUserInput(prop, val);
              console.log('isErr is: ' + isErr);
              if (isErr) {
                // !VA If it returns an error, select the input and show the error message so the user can correct it or ESC out of the field.
                console.log('handleMouseEvents: ERROR MESSAGE SHOULD BE SHOWN NOW!');
                // !VA Post-error button handling?
              } else {
                // !VA If no error, pass the Appdata property name and the entered value for further processing.
                // !VA NOTE: We might have to include the target ID in the error handling because this button should trigger a different message than the keyboard message. Revisit.
                evalToolbarInput(prop, val);
              } 
              break;
          }
          // !VA TODO: Revisit this
        }  else if ( event.type === 'drop') {
          e.preventDefault;
          // !VA TODO: Revisit this
        } else if ( event.type === 'dragover') {
          e.preventDefault;
        } 
      }


      // !VA appController private handleKeyup
      // !VA Handle all keyboard input after the user has selected an image and handleFileSelect has added it to the DOM
      function handleKeyup(evt) {

        // !VA Error messages dont' work -- the below came from handleUserAction before I deleted it.
        var appMessContainer = document.querySelector(staticRegions.appMessContainer);
        var appMessDisplay = document.querySelector(staticRegions.appMessDisplay);
        if (appMessDisplay.textContent) {
          // !VA On any event, if errorViewerContainer is showing, hide it.
          appMessContainer.classList.remove('show-err');
          appMessContainer.classList.add('hide-err');
        }

        // !VA Get the target input element
        el = document.getElementById(this.id);
        // !VA Get the id
        target = el.id;
        // !VA Get the Appdata property that corresponds to the target input element.
        var prop = elementIdToAppdataProp(target);
        // !VA Initalize boolean that notifies of error status after checkUserInput
        var isErr;
        // !VA Find out which key was struck
        keyup = evt.which || evt.keyCode || evt.key;
        // !VA Get the current Appdata object
        var Appdata = appController.getAppdata();
        // !VA We need a separate conditional for ESC, ENTER and TAB.
        // !VA  If ESC, we want imgW and imgH to exit the field and go back to showing the placeholders defined in the CSS. This is because these values are already provided in the dimViewers and there's no need to recalc the W and H each time the user makes and entry - that would just be confusing. 
        if (keyup == 27 ) {
            if (prop === 'imgW' || prop === 'imgH') {
              this.value = ('');
              this.blur();
            // !VA For viewerW, sPhonesW and lPhonesW we want to exit the field and restore the preexisting value from Appdata.
            } else {
              this.value = Appdata[prop];
              this.blur();
            }
        }
        if (keyup == 13 ) {
          // !VA Get the input and evaluate it. 
          isErr = checkUserInput(prop, el.value);
          if (isErr) {
            // !VA If it returns an error, select the input and show the error message so the user can correct it or ESC out of the field.
            console.log('ERROR MESSAGE SHOULD BE SHOWN NOW!');
            this.select();
          } else {
            // !VA If no error, pass the Appdata property name and the entered value for further processing.
            Appdata = evalToolbarInput(prop, this.value);
          } 
        }
      }



    // !VA This works, but it's mickey-mouse too. It also handles the toolbar buttons after the changed values have been extracted by handleToolbarClicks.
    function evalToolbarInput(prop, val) {
      console.log('evalToolbarInput');
      // !VA Get Appdata properties.
      var Appdata = {};
      Appdata = appController.getAppdata(false);
      // !VA Initialize vars for imgH and imgW since we need to calculate one based on the value of the other and Appdata.aspect.
      var imgH, imgW;
      switch(true) {
        // !VA If the value was entered in the imgViewer field, go ahead and updateAppdata as is.
        case (prop === 'viewerW') :
          updateAppdata(prop, val); 
          break;          

        case (prop === 'imgW') :
          // !VA If the value was entered in imgwidth, calc imgH based on val and write to Appdata.
          imgH =  val * (1 / Appdata.aspect[0]);
          updateAppdata(prop, val); 
          updateAppdata('imgH', imgH); 
          break;

        case (prop === 'imgH') :
          // !VA If the value was entered in imgheight, calc imgW based on val and write to Appdata.
          imgW =  val * (Appdata.aspect[0]);
          updateAppdata(prop, val);
          updateAppdata('imgW', imgW)
          break;

        case (prop === 'sPhonesW') :
          // !VA TODO: needs handling
          console.log('evalToolbarInput sPhonesw: not yet handled');          
          break;

        case (prop === 'lPhonesW') :
          // !VA TODO: needs handling
          console.log('evalToolbarInput lPhonesw: not yet handled');  
          break;
      }
      calcViewerSize();
    }





    // !VA NEW appController private calcViewerSize
    // !VA PROBLEM: this is only good for initializing because it calculates the viewer size based on NW and NH. On user input, it has to calculate based on imgW and imgH
    function calcViewerSize() {
      console.log('calcViewerSize running');
      var Appdata = {};
      Appdata = appController.getAppdata(false);
      // !VA Using the current image dimensions in Appdata, calculate the current size of imgViewer so it adjusts to the current image size. 
      // !VA NEW Get the actual viewerW from getComputedStyle
      var viewerW;
      var viewerH;
      var compStyles = window.getComputedStyle(document.querySelector(dynamicRegions.imgViewer));
      viewerW = parseInt(compStyles.getPropertyValue('width'), 10);
      viewerH = parseInt(compStyles.getPropertyValue('height'), 10);
      // !VA Write the viewerW to the toolbar input field
      document.querySelector(toolButtons.viewerW).value = viewerW;

      // !VA If we're initializing a new image, use the naturalWidth and naturalHeight. If we're updating via user input, we need to use the display image and height, imgW and imgH. If we're initializing, then Appdata.imgW and Appdata.imgH will be 0 or falsy because it hasn't been resized yet. So we need to make the following decision based on the _actual_ image width and height, which will be different based on whether we're initializing or updating.
      // !VA I thought I fixed this...it appears to only apply to dev mode.
      var actualW, actualH
      if (Appdata.imgW === 0) {
        actualW = Appdata.imgNW;
        actualH = Appdata.imgNH;
      } else {
        actualW = Appdata.imgW;
        actualH = Appdata.imgH; 
      }

      switch(true) {
      // The image falls within the default viewer dimensions set in initApp, so do nothing.
      // !VA This case is irrelevant since we're now comparing everything to maxViewerWidth not the  init values. Change accordingly...
      // !VA  NOT SO...now we're trying to restore the previous functionality so...
      case (actualW <= viewerW) && (Appdata.imgNH < viewerH) :
        actualW = Appdata.imgNW;
        actualH = Appdata.imgNH;
        // !VA viewerH is set in initApp, so no change to it here
        // !VA viewerH is set in initapp, so no change to that here either.
        // !VA We don't need to adjust height...but maybe we do for consistency's sake
        // this.adjustContainerHeights(Appdata);
        break;

      // The image is wider than the current viewer width but shorter than current viewer height, so resize the image based on the viewer width
      
      case (actualW > viewerW) && (actualH < viewerH) :
        // Set the image width to the current viewer
        Appdata.imgW = viewerW;
        // Get the image height from the aspect ration function
        Appdata.imgH = Math.round((1/Appdata.aspect[0]) * Appdata.imgW);
        // Set the viewerH to the imgH
        viewerH = Appdata.imgH;
        // this.adjustContainerHeights(Appdata);
        break;

      // The image is not as wide as the current viewer width, but is taller than the viewer height. Keep the image width but resize the viewer in order to display the full image height
      // !VA This might be a problem with consecutive images without page refresh
      case (actualW <= viewerW) && (actualH > viewerH) :
        // Set the viewer height and the image height to the image natural height
        viewerH = Appdata.imgH = Appdata.imgNH;
        // Set the image width to the natural image width
        Appdata.imgW = Appdata.imgNW;

        // !VA  Use adjustContainerHeights to get the Appdata height
        // !VA  Note the dependency with initAppdata, see 'Dependency with adjustContainerHeights'
        // this.adjustContainerHeights(Appdata);
        break;

      // The image is wider and taller than the current viewer height and width so we have to resize the image and the viewport based on the current viewport width
      case (actualW > viewerW) && (actualH > viewerH) :
        // Set the image Width to the current  viewer width 
        Appdata.imgW = viewerW;
        // Set the image height proportional to the new image width using the aspect ratio function
        Appdata.imgH = Math.round((1/Appdata.aspect[0]) * Appdata.imgW);
        // Set the viewer height to the image height
        viewerH = Appdata.imgH;
        // Get the viewport and Appdata height from adjustContainerHeights

        // !VA TODO: Check this out, doesn't seem to be a problem anymore: BUG Problem with the 800X550, 800X600 -- no top/bottom gutter on viewport
        break;
      }
      // !VA Transfer control to UIController to print dimViewer to the UI
      resizeContainers(viewerH, Appdata.imgW, Appdata.imgH );


    }

    // !VA appController private doContainerHeights
    function resizeContainers(viewerH, imgW, imgH)  {
      // !VA This calculates the imgViewer, imgViewport and appContainer height based on Appdata values which are passed in from resizeContainers.
      // !VA Initial height is 450, as it is defined in the CSS. TOo much hassle to try and get the value as defined in the CSS programmatically.
      // const initViewerH= parseInt(document.querySelector(dynamicRegions.imgViewer).height, 10);
      const initViewerH = 450;
      let viewportH;
      let appH; 

      // !VA I'm not even sure this is necessary since we're getting the viewerW from maxViewerHeight now -- but we'll leave it in here for the time being. 
      // !VA The viewport is 145px taller than the imgViewer. 
      if (imgH <= initViewerH) {

        viewerH = initViewerH;
        viewportH = viewerH + 145;
      } else {
        // Need a little buffer in the viewport
        viewerH = imgH;
        viewportH = imgH + 145;
      }
      appH = viewportH;
      document.querySelector(dynamicRegions.curImg).style.width = imgW + 'px';
      document.querySelector(dynamicRegions.curImg).style.height =imgH + 'px';;
      document.querySelector(dynamicRegions.imgViewer).style.height = viewerH + 'px';
      document.querySelector(dynamicRegions.imgViewport).style.height = viewportH + 'px';
      document.querySelector(dynamicRegions.appContainer).style.height = appH + 'px';;
      // !VA Now that the image and its containers are written to the DOM, go ahead and write the dimViewers.
      UICtrl.writeDimViewers();
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
    
    // appController private intToPx: CONVERT INTEGER TO PIXEL VALUE
    // !VA TODO: Probably unused, delete
    function intToPx(int) {
      let pxval;
      let str = String(int);
      pxval = str + 'px';
      return pxval;
    }

    // !VA NEW Parsing keyboard input based on Appdata property passed in from handleKeyup.
    // !VA TODO: rename to checkUserInput and include parsing of the toolbutton mouseclicks from handleToolbarClicks.
    function checkUserInput(prop, val) {
      console.log('checkUserInput running');
      console.log('prop is: ' + prop);
      console.log('val is: ' + val);
      var errCode;
      var isErr;
      isErr = false;
      var Appdata= {};
      Appdata = appController.getAppdata();
      // !VA TODO: Setting maxViewerWidth just for now
      var maxViewerWidth = 800;

      // !VA First, we validate that the user-entered value is an integer and if so, set the error variables.
      if (validateInteger(val)) {
        // !VA NOTE: This is where we could easily trap the negative button increment if it falls below 0 to send a different message than just the standard 'not_Integer' message. Revisit.
        errCode = 'not_Integer';
        isErr = true;
      } else {
        // !VA Now, we handle the error cases if user has entered a value in the imgViewer field 
        switch (true) {
          case (prop === 'viewerW') :
            // !VA The user has selected a viewerW that's smaller than the currently displayed image. Undetermined how to deal with this but for now the current image is shrunk to the selected viewerW. But Appdata is not updated accordingly, needs to be fixed.
            if (val < Appdata.imgW ) {
              // !VA Do nothing for now, see above.
            } else if (val > maxViewerWidth ) {
              // !VA TODO: review the maxViewerWidth issue, but for now set it to 800px - and the user-entered value exceeds this, so error.
              isErr = true;
              errCode = 'viewerW_GT_maxViewerWidth';
            } else {
              // !VA first write val to the viewerW input's value
              // document.querySelector(dynamicRegions.imgViewer).value = val;
              // !VA  The viewerW is greater than the imgW so we can go ahead and widen the viewerW with no affecton the current image and without running calcViewerSize. So, return no error and continue in handleKeyup.
              isErr = false;
            }
            break;
            // !VA Handle the imagewidth toolButton input
          case (prop === 'imgW') :
              // !VA If the new image width is greater than the viewer width, then show message. 
              if (val > Appdata.viewerW ) {
                // !VA errorHandler!
                isErr = true;
                errCode = 'imgW_GT_viewerW';
              }
              break;
          // !VA TODO: Handle the imageheight toolButton input
          case (prop === 'imgW') :
              console.log('Error handling for imagewidth input not implemented!');
              break;

              // !VA TODO: Handle the small phone input
          case (prop === 'sPhoneW') :
              console.log('Error handling for sPhonesW input not implemented!');
            break;
          
          // !VA Handle the small phone input
          case (prop === 'sPhoneW') :
              console.log('Error handling for imagewidth input not implemented!');
              break;
        }
      } 

      if (isErr) {
        // !VA IF Error pass the code to errorHandler to get the error message
        appController.initError(isErr, errCode);
      } else {
        // !VA If no error, pass false back to handleKeyup and continue.
        isErr = false;
      }
      return isErr;

    }
          


    // !VA NEW So this was the concept - to have the image itself be the data store, not some object. Instead of updating the data store and writing the UI from that, you update the core UI element, then recalculate the data store each time it changes. Here, there are 5 mutable elements and 5 properties. Only one of the properties has changed. So we loop through them all, find the match for the prop argument, then update only the element/data property that matches. This is a mickey-mouse solution but it works for now. Ideally we will pass in a key/value pair including the property name and the ID alias so we can use properties... in case there are more than one.
    function updateAppdata(prop, val ) {
      console.log('updateAppdata running');
      var Appdata = {};
      // !VA Set an array with the mutable Appdata proerty names. These are the properties that get their values direcly from DOM elements, which are queried as needed by getAppdata. All the other Appdata properties are derived from these five.
      var props = [];
      props = ['viewerW', 'imgW', 'imgH', 'sPhonesW', 'lPhonesH']

      for (let i = 0; i < props.length; i++) {
      console.log('props[i] is: ' + props[i]);
        switch(true) {
          case prop === 'viewerW' :
            document.querySelector(dynamicRegions.imgViewer).style.width = val + 'px';  
            break;
          case prop === 'imgW' :
            document.querySelector(dynamicRegions.curImg).style.width = val + 'px';
          break;
          case prop === 'imgH' :
            document.querySelector(dynamicRegions.curImg).style.height = val + 'px';
          break;
          case prop === 'sPhoneW' :
            document.querySelector(toolButtons.sPhonesW).setAttribute('data-sphonesw') = val + 'px';
          break;
          case prop === 'lPhoneW ' :
            document.querySelector(toolButtons.lPhonesW).setAttribute('data-lphonesw') = val + 'px';
          break;
        }
      }
      Appdata = appController.getAppdata(false);
    }

    // !VA CCP Functions
    // !VA appController private initCCP
    function initCCP() {
      // !VA Copy Appdata to local object
      console.log('initCCP running');
      var Appdata = appController.getAppdata();
      // !VA The app initializes with the CCP closed, so toggle it on and off here.
      document.querySelector(staticRegions.ccpContainer).classList.toggle('active');
      // !VA If the CCP is open:
      if (document.querySelector(staticRegions.ccpContainer).classList.contains('active')) {
        // !VA We have to initialize CCP DOM elements here because they don't exist until the CCP is displayed.

        // !VA CCP Checkboxes - these are mock checkboxes with custom styling, so the ID names have to be converted to checkbox names in order to select or deselect them. We attach the event handler to the checkmark, not the checkbox. The checkmark is converted to checkbox for handling in toggleCheckbox.
        var ccpCheckmarks = [ ccpUserInput.imgIncludeStyles, ccpUserInput.tdBgimage, ccpUserInput.tableIncludeWrapper ]
        var ccpCheckboxes = [];
        for (let i = 0; i < ccpCheckmarks.length; i++) {
          document.querySelector(ccpCheckmarks[i]).addEventListener('click', handleCCPInput, false);
        }

        // !VA Initialize with all the 'include wrapper table' options undisplayed - uncomment this for DEV
        // var wrapperItemsToHide = ['#table-wrapper-class', '#table-wrapper-width', '#table-wrapper-align', '#table-wrapper-bgcolor' ]; 
        // for (let i = 0; i < wrapperItemsToHide.length; i++) {
        //   document.querySelector(wrapperItemsToHide[i]).style.display = 'none'; 
        // }

        // !VA Initialize with 'include wrapper table' unchecked, or true for DEV
        // var includeWrapperTable = document.querySelector((ccpUserInput.tableIncludeWrapper.replace('mrk', 'box')));
        // includeWrapperTable.checked = true;
        // !VA Default for table width
        document.querySelector(ccpUserInput.tableWidth).value = `${Appdata.imgW}`;
        // !VA Defaults for wrapper width and class
        document.querySelector(ccpUserInput.tableWrapperWidth).value = `${Appdata.viewerW}`;
        document.querySelector(ccpUserInput.tableWrapperClass).value = 'devicewidth';

      }
    }
    
    // !VA  appController: Toggle checkboxes and run any associated actions
    function handleCCPInput(event) {
      console.log('handleCCPInput running');
      // !VA Get the Appdata for the input default value
      var data = appController.getAppdata();

      // !VA Toggle CCP checkboxes and run associated operations. The CSS calls for hiding the actual checkbox element and showing a span with a 'proxy' checkbox. We call it 'checkmrk' to make it easier to replace it with 'checkbox' here. 

      // !VA Array of wrapper items to be displayed if 'Include wrapper table' is checked
      var wrapperItemsToShow = [];

      // !VA With this faux checkmark structure, the clicked element is the checkmark, so we have to convert that ID to the corresponding checkbox before we can toggle it.
      var checkbox = document.getElementById(event.target.id.replace('mrk', 'box'));
      // !VA Toggle the target's checkbox 
      checkbox.checked ? checkbox.checked = false : checkbox.checked = true;

      // !VA Now run any actions associated with the checkbox
      // !VA TODO: This value needs to be refreshed when the CCP is opened. In fact, entering new values in any of the toolButton inputs has to call a refresh of Appdata and a closing-reopening of the CCP so the values can refresh.
      
      // !VA Defaults for wrapper width and class
      document.querySelector(ccpUserInput.tableWrapperWidth).value = `${data.viewerW}`;
      document.querySelector(ccpUserInput.tableWrapperClass).value = 'devicewidth';
      // !VA Show wrapper table options if the checked element is 'table-include-wrapper-checkbox'
      if (checkbox.id === 'table-include-wrapper-checkbox') {
        wrapperItemsToShow = ['#table-wrapper-class', '#table-wrapper-width', '#table-wrapper-align', '#table-wrapper-bgcolor' ]; 
        if (checkbox.checked) {
          for (let i = 0; i < wrapperItemsToShow.length; i++) {
            document.querySelector(wrapperItemsToShow[i]).style.display = 'block'; 
          }
        } else {
          for (let i = 0; i < wrapperItemsToShow.length; i++) {
            document.querySelector(wrapperItemsToShow[i]).style.display = 'none'; 
          }
        }
      }
    }


    // UIController Show element when input in another element is made 
    function showElementOnInput(event) {
      // !VA Here we catch the event handlers for the CCP class input fields and show the mobile clipboard buttons when an input is made. The input event fires whenever a input element's value changes.
      var elems = [];
      elems[0] = document.querySelector(ccpMakeClipBut.imgDisplayWriteCSSToCB);
      elems[1] = document.querySelector(ccpMakeClipBut.imgSPhoneWriteCSSToCB);
      elems[2] = document.querySelector(ccpMakeClipBut.imgLPhoneWriteCSSToCB);
      elems[3] = document.querySelector(ccpMakeClipBut.tdDisplayWriteCSSToCB);
      elems[4] = document.querySelector(ccpMakeClipBut.tdSPhoneWriteCSSToCB);
      elems[5] = document.querySelector(ccpMakeClipBut.tdLPhoneWriteCSSToCB);
      elems[6] = document.querySelector(ccpMakeClipBut.tableDisplayWriteCSSToCB);
      elems[7] = document.querySelector(ccpMakeClipBut.tableSPhoneWriteCSSToCB);
      elems[8] = document.querySelector(ccpMakeClipBut.tableLPhoneWriteCSSToCB);
      console.dir(elems);
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
    }

    //  !VA ERROR HANDLING
    // ==============================
      var errorHandler = function(isErr, errCode) {
        console.log('errorHandler running');
        var Appdata = appController.getAppdata();
        var errorMessages = {
          not_Integer: 'This value has to be a positive whole number - try again.',
          imgW_GT_viewerW: `The image width has to be less than the width of its container table, which is now&nbsp;set&nbsp;to&nbsp;${Appdata.viewerW}px.`,
          tbButton_LT_zero: 'Sorry, that would make one of the image dimensions less than 0.',
          tbButton_GT_viewerW: `Sorry, that would make the image wider than its container, which is currently set at ${Appdata.viewerW}px`,
          // !VA maxViewerWidth issue here, see message below;
          viewerW_GT_maxViewerWidth: `The container table width can't be greater than the width of the app itself &mdash; 800px.`,
          not_an_integer: 'Not an integer: please enter a positive whole number for width.'
        };


        // !VA Loop through the error ID/message pairs and find the match
        for (const [key, value] of Object.entries(errorMessages)) { 
          if (key === errCode ) {
            showAppMessage(value);
          }
        }
        return true;
      };

      // !VA Might be good to fold this into error handling
      // appController private validateInteger
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


    // !VA appController private showAppMessage
    // !VA Here we can show a message bypassing errorHandler - not all messages are errors.
    var showAppMessage = function(errMess) {
      //Set the time the message will display
      // let displayTime;
      // Get the elements to manipulate for the error message display
      // // !VA Create objects for all the UI elements used in this function
      var appMessContainer = document.querySelector(staticRegions.appMessContainer);
      var appMessDisplay = document.querySelector(staticRegions.appMessDisplay);
      // var dimViewers = document.querySelector('#dim-viewers');
      // var toolsContainer = document.querySelector('#tools-container');
      // Put the respective error message in the error message container
      appMessDisplay.innerHTML = errMess;
      // Swap dimViewers with appMessDisplay and drop toolsContainer behind viewport;


      appMessContainer.classList.add('show-err');


      // !VA Reset the value of the element into which the error was entered to empty. 
      // document.getElementById(id).value = '';
      // appMessContainer.classList.remove('hide-err');
      // appMessContainer.classList.add('show-err');
      console.log('Error: reset the value of the element to its original value and select it.');

    };

    // !VA Need to get the Appdata property that corresponds to the ID of the DOM input element that sets it. It's easier to just create a list of these correspondences than to rename the whole UI elements and Appdata properties so they correspond, or to create functions that use string methods to extract them from each other.
    //  clipboardController: GET APPDATA PROPERTY NAME FROM AN HTML ELEMENT ID
    function elementIdToAppdataProp(str) {
      var IDtoProp = {
        viewerW:  'tb-input-viewerwidth',
        imgW: 'tb-input-imgwidth',
        imgH: 'tb-input-imgheight',
        sPhonesW: 'tb-input-sphones-width',
        lPhonesW: 'tb-input-lphones-width'

      };
      // !VA This should return directly wihout a ret variable as tmp storage.
      var ret = Object.keys(IDtoProp).find(key => IDtoProp[key] === str);
      // alert(ret);
      return ret;
    }




    // !VA NEW appController private
    var initDev = function() {
      // !VA This is where we initialize Dev mode, which is where we can start the app with a hard-coded img element in the HTML file. THis is very useful, otherwise we'd have to drop files to initialize or dink with the FileReader object to hard-code a test file.
      console.log('initDev running');
      // !VA Get Appdata so we can store the filename
      // var Appdata = appController.getAppdata();
      // !VA Get the current (devimg) image dimensions and write the dimViewers
      // !VA Turn on the toolbars
      document.querySelector(staticRegions.toolsContainer).style.display = 'block';
      document.querySelector(dynamicRegions.curImg).style.display = 'block';

      // !VA NEW Get the filename of the devImg in the HTML. This is the only time we'll have an actual source file -- in user mode all the images are blobs -- so we can do this as a one-off.
      
      var filename = document.querySelector(dynamicRegions.curImg).src;
      filename = filename.split('/');
      filename = filename[filename.length - 1];
      // !VA Write the filename to the DOM so we can add it later to Appdata. It's not completely DRY because it's added to the DOM here and later to Appdata, and then queried in the CCP from Appdata, but it's better than having to query it from the DOM every time it's used in a separate function call. This way, we can loop through Appdata to get it if we need to.
      document.querySelector(dimViewers.filename).textContent = filename;

      
      // !VA Get the dev image's NW and NH from the DOM. We do NOT write this to Appdata now because 
      // imgW = document.querySelector(dynamicRegions.curImg).naturalWidth;
      // imgH = document.querySelector(dynamicRegions.curImg).naturalHeight;



      // !VA Initialize the value in the toolbar viewerW input field to its initial CSS value.
      // !VA Commenting this out since I changed it to hard-coded in the HTML file along with sPhonesW and sPhonesH.
      // console.log('document.querySelector(dynamicRegions.imgViewer) is: ' + document.querySelector(dynamicRegions.imgViewer));
      // console.dir(document.querySelector(dynamicRegions.imgViewer));
      // document.querySelector(toolButtons.viewerW).value = document.querySelector(dynamicRegions.imgViewer).style.width;
      
      // !VA THis is duplicated in handleFileSelect, only included here to initialize dev mode.
      // !VA Set the data attribute for small phone and large phone width. We need this because there is not actual HTML element that corresponds to these properties, and thus no way to persist them globally. So the data attribute sphonew and sphoneh will be written to the toolbar input field as surrogate for an actual DOM element that Appdata can query.
      var sphonesw, lphonesw;
      sphonesw = document.querySelector(toolButtons.sPhonesW);
      lphonesw = document.querySelector(toolButtons.lPhonesW)                
      sphonesw.setAttribute('data-sphonesw', '320')
      lphonesw.setAttribute('data-lphonesw', '480')
      sphonesw.value = sphonesw.getAttribute('data-sphonesw');
      lphonesw.value = lphonesw.getAttribute('data-lphonesw');
      console.log('initDev');

      calcViewerSize();
      // !VA Open the CCP by default in dev mode
      // !VA First, set it to the opposite of how you want to start it.
      document.querySelector(staticRegions.ccpContainer).classList.add('active');
      // !VA Then run initCCP to initialize
 
      initCCP();
    };

    // !VA appController public
    return {
      // !VA Were putting this here so it can be accessed from either other module -- all it does it get the code and pass it on to the private appController function that finds the error code from the string and passes that on to UIController for display.
      initError: function(isErr, errCode) {
        errorHandler(isErr, errCode);
      },
      // !VA appController public getAppdata
      // !VA This needs to be just a pass-on function so we can get this junk out of the appController public functions.
      
      getAppdata: function() {
        // !VA NEW Initialize Appdata here and pass it along - we put it here because it's called from both the other modules 
        var Appdata = {};
        // !VA Get dynamicRegions
        dynamicRegions = UICtrl.getDynamicRegionIDs();
        dimViewers = UICtrl.getDimViewerIDs();
        // !VA NEW Read required values into Appdata.
        Appdata.filename = document.querySelector(dimViewers.filename).textContent;


        var curImg = document.querySelector(dynamicRegions.curImg);
        var imgViewer = document.querySelector(dynamicRegions.imgViewer);
        // !VA Get the computed styles for viewerW and viewerH
        var cStyles = window.getComputedStyle(document.querySelector(dynamicRegions.imgViewer));
        var viewerW = parseInt(cStyles.getPropertyValue('width'), 10);
        var viewerH = parseInt(cStyles.getPropertyValue('height'), 10);

        // !VA Assign property values
        Appdata.imgW = curImg.width;
        Appdata.imgH = curImg.height;
        Appdata.imgNW = curImg.naturalWidth;
        Appdata.imgNH = curImg.naturalHeight;
        // !VA NEW We need the aspect ratio to calculate the other dimension when the user only inputs one, i.e. when width or height is entered into one of the toolbars' custom width/height fields.
        Appdata.aspect = getAspectRatio(curImg.naturalWidth,  curImg.naturalHeight);
        // !VA NEW We need new imgW and imgH properties to store the user input values. We don't want to overwrite the original imgW/imgH values because it appears it's not possible since Javascript passes values by reference, so any changes to properties are lost outside the current function's scope. Plus, we need to have the original values persist for the duration of the session, at which point the app and Appdata are reinitialized. 
        Appdata.sPhonesW = parseInt(document.querySelector(toolButtons.sPhonesW).getAttribute('data-sphonesw'), 10);
        Appdata.lPhonesW = parseInt(document.querySelector(toolButtons.lPhonesW).getAttribute('data-lphonesw'), 10);

        Appdata.sPhonesW ? Appdata.sPhonesW : Appdata.sPhonesW = parseInt(document.querySelector(toolButtons.sPhonesW).placeholder, 10);
        Appdata.lPhonesW ? Appdata.lPhonesW : Appdata.lPhonesW = parseInt(document.querySelector(toolButtons.lPhonesW).placeholder, 10);
        Appdata.sPhonesH = Math.round(Appdata.sPhonesW * (1 / Appdata.aspect[0]));
        Appdata.lPhonesH = Math.round(Appdata.lPhonesW * (1 / Appdata.aspect[0]));
        Appdata.viewerH = viewerH;
        Appdata.viewerW = viewerW;
        return Appdata;
      },
      init: function(){
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

  })(CBController, UIController);

  appController.init();

//Namespace closure
})();