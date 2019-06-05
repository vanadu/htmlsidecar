
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
      writeDimViewers: function(Appobj) {

        // !VA We need the current value in dimViewers.smallphones and dimViewers.largephones to display all the dimViewers. So, if it's not explicitly user-defined, then use the default placeholder value from the HTML, then get the height from getAspectRatio
        var sPhonesW, sPhonesH, lPhonesW, lPhonesH;
        sPhonesW = document.querySelector(toolButtons.sPhonesW).value;
        lPhonesW = document.querySelector(toolButtons.sPhonesW).value;
        sPhonesW ? sPhonesW : sPhonesW = document.querySelector(toolButtons.sPhonesW).placeholder;
        lPhonesW ? lPhonesW : lPhonesW = document.querySelector(toolButtons.lPhonesW).placeholder;
        sPhonesH = Math.round(sPhonesW * (1 / Appobj.aspect[0]));
        lPhonesH = Math.round(lPhonesW * (1 / Appobj.aspect[0]));
        // !VA Hide the dropArea
        document.querySelector(staticRegions.dropArea).style.display = 'none';
        // Write the dimViewers
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
          // !VA appController private adjustImageContainers
      adjustImageContainers: function (imgH, imgW, viewerH)  {
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
      document.querySelector(dynamicRegions.curImg).style.width = imgW + 'px';
      document.querySelector(dynamicRegions.curImg).style.height = imgH + 'px';
      document.querySelector(dynamicRegions.imgViewer).style.height = viewerH + 'px';
      document.querySelector(dynamicRegions.imgViewport).style.height = viewportH + 'px';
      document.querySelector(dynamicRegions.appContainer).style.height = appH + 'px';
      }

    };
  })();

  // CALCULATIONS AND INPUT EVALUATION CONTROLLER
  var clipboardController = (function() {



    // !VA If we want to access any of the DOM IDs we have to call them from UIController where they're defined.
    var dynamicRegions = UIController.getDynamicRegionIDs();
    var staticRegions = UIController.getStaticRegionIDs();
    var toolButtons = UIController.getToolButtonIDs();
    var ccpUserInput = UIController.getCcpUserInputIDs();

    // !VA clipboardController public functions 
    return {


    };
  })();


  // GLOBAL APP MODULE
  var appController = (function(calcCtrl, UICtrl) {

    var Appobj = {};
    
    // !VA Getting DOM ID strings from UIController
    var dimViewers = UIController.getDimViewerIDs();
    var dynamicRegions = UIController.getDynamicRegionIDs();
    var staticRegions = UIController.getStaticRegionIDs();
    var toolButtons = UIController.getToolButtonIDs();
    var ccpUserInput = UIController.getCcpUserInputIDs();

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
                calcImgViewerSize(Appobj);

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

    // !VA NEW appController private calcImgViewerSize
    function calcImgViewerSize(Appobj) {
      console.log('calcImgViewerSize');
      console.dir(Appobj);
      // !VA Using the current image dimensions in Appdata, calculate the current size of imgViewer so it adjusts to the current image size. This can probably be recoded for efficiency but it works for now. Take another look at it.
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
        Appobj.imgH = Math.round((1/Appobj.aspect[0]) * Appobj.imgW);
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
        Appobj.imgH = Math.round((1/Appobj.aspect[0]) * Appobj.imgW);
        // Set the viewer height to the image height
        viewerH = Appobj.imgH;
        // Get the viewport and Appdata height from adjustContainerHeights

        // !VA TODO: Check this out, doesn't seem to be a problem anymore: BUG Problem with the 800X550, 800X600 -- no top/bottom gutter on viewport
        break;
      }
      // !VA Transfer control to UIController to print dimViewer to the UI
      UICtrl.writeDimViewers(Appobj);
      // !VA Now rec
      UICtrl.adjustImageContainers(Appobj.imgH, Appobj.imgW, viewerH);

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


    //  !VA ERROR HANDLING
    // ==============================


    // !VA NEW appController private
    var initDev = function() {
      // !VA This is where we initialize Dev mode, which is where we can start the app with a hard-coded img element in the HTML file. THis is very useful, otherwise we'd have to drop files to initialize or dink with the FileReader object to hard-code a test file.
      console.log('initDev running');
      // !VA Get the current (devimg) image dimensions and write the dimViewers
      var curImgDimensions = getCurImgDimensions(true);
      calcImgViewerSize(curImgDimensions);
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