
/* !VA  
===========================================================
TODO: Put error container above toolbuttons


TODO: FIx, when imgNW is greater than imgW the imgNW size flashes before resizing to the viewer size. This is probably because of the settimeout, which might not be necesssary if the onload function is running.


DONE: fix select options to clipboard
DONE: Implement the CSS clipboard buttons
DONE: Fix the retina calculations: it should alert if the disk size isn't 2X the display size.
DONE: Reset the customH and customW fields on blur to their placeholders on blur when blur is on mouseclick
DONE: Fix the images on viewerW and phone input fields
DONE: fix small phones and lartge phones toolbuttons.

Changes to UI:

filename-viewer       dv-filename-viewer
clipboard-but         dv-clipboard-but
then, globally, dim-viewer to dv





*/
//SCRIPT START
//PAGE SETUP START

// Namespace
var Dimwhit = (function () {

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
      tableClass: '#table-class-input',
      tableAlign: '#table-align-select',
      tableWidth: '#table-width-select',
      tableMaxWidth: '#table-max-width-input',
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
      imgBuildCSSBut: '#img-build-css-but',
      smallPhonesBuildCSSBut: '#sphones-build-css-but',
      largePhonesBuildCSSBut: '#lphones-build-css-but'
    };


    // !VA This tests whether the CCP is open, allowing us to access CCP elements if it is. It's also where we open the CCP by default for development and testing. 
    (function () {

      // !VA Remove this line to stop opening the CCP by default
      document.querySelector(staticRegions.ccpContainer).classList.add('active');

      // !VA If the CCP is open...
      if (document.querySelector(staticRegions.ccpContainer).classList.contains('active')) {
        // !VA CCP Event Listeners -- we will handle CCP events separately from other UI events here to keep separation of dynamic vs static element handling
        // !VA Handle the checkbox
        var checkmrk = document.querySelector(ccpUserInput.imgIncludeStyles);
        // !VA Toggle the checkbox
        checkmrk.addEventListener('click', toggleCheckbox, false);
        // checkmark.addEventListener('click', function(this.) {checkbox.checked ? checkbox.checked = false : checkbox.checked = true;}, false);
      }
    })();

    
    // !VA UIController: Test function
    function testme() {
      console.log('TESTED!');
    }

    // !VA  UIController: Toggle checkboxes
    function toggleCheckbox(target) {
      // We want this to run for all custom CSS checkboxes used in this project -- but the CSS calls for hiding the actual checkbox element and showing a span with a 'proxy' checkbox. We call it 'checkmrk' to make it easier to replace it with 'checkbox' here. 
      // !VA The clicked element is the checkmark, so we have to convert that ID to the corresponding checkbox before we can toggle it.
      var str = target.target.id.replace('mrk', 'box');
      var checkbox = document.getElementById(str);
      // var checkmark = document.querySelector('#img-include-css-checkmark');
      checkbox.checked ? checkbox.checked = false : checkbox.checked = true;
    }

    // UIController: Clipboard output for build html image button
    // !VA TODO: Might be able to consolidate this into a single function but doesn't seem worth it
    var imgClipboardBut = new Clipboard(staticRegions.ccpImgClipbboardBut, {
      text: function(trigger) {
        // console.log('foo is...');
        // console.dir(foo);
        // !VA Get the clipboard string 
        var clipboardStr = calcController.ccpGetImgClipboardOutput();
        // !VA Write success message to app message area on success
        imgClipboardBut.on('success', function(event) {
          // debugger;
        });
        console.log('NOW');
        UIController.flashAppMessage(trigger.id);
        imgClipboardBut.on('error', function(e) {
          console.error('Action:', e.action);
          console.error('Trigger:', e.trigger);
        });
        // !VA Return the clipboard string to clipboard.js to paste it to the clipboard
        return clipboardStr;
      }
    });
   
    // Clipboard output for build td tag button
    var tdClipbboardBut = new Clipboard(staticRegions.ccpTdClipbboardBut, {
      text: function(trigger) {
        var clipboardStr;
        clipboardStr = calcController.ccpGetTdClipboardOutput();
        tdClipbboardBut.on('success', function(event) {
        });
        console.log('NOW');
        UIController.flashAppMessage(trigger.id);
        tdClipbboardBut.on('error', function(e) {
          console.error('Action:', e.action);
          console.error('Trigger:', e.trigger);
        });
        return clipboardStr;
      }
    });

    // Clipboard output for build table tag button
    var tableClipbboardBut =  new Clipboard(staticRegions.ccpTableClipbboardBut, {
      text: function(trigger) {
        var clipboardStr = calcController.ccpGetTableClipboardOutput();

        tableClipbboardBut.on('success', function(event) {
        });
        console.log('NOW');
        UIController.flashAppMessage(trigger.id);
        tableClipbboardBut.on('error', function(e) {
          console.error('Action:', e.action);
          console.error('Trigger:', e.trigger);
        });

        return clipboardStr;
      }
    });

    // Clipboard output for build img CSS button
    var imgBuildCSSBut = new Clipboard(ccpBuildTag.imgBuildCSSBut, {
      text: function(trigger) {
        var clipboardStr = calcController.ccpGetImgCSSClipboardOutput();

        imgBuildCSSBut.on('success', function(event) {
        });
        console.log('NOW');
        UIController.flashAppMessage(trigger.id);
        imgBuildCSSBut.on('error', function(e) {
          console.error('Action:', e.action);
          console.error('Trigger:', e.trigger);
        });
        return clipboardStr;
      }
    });

    // Clipboard output for build large phones CSS button
    var largePhonesBuildCSSBut = new Clipboard(ccpBuildTag.largePhonesBuildCSSBut, {
      text: function(trigger) {
        var clipboardStr = calcController.ccpGetLargePhonesCSSClipboardOutput();
        largePhonesBuildCSSBut.on('success', function(event) {
        });
        console.log('NOW');
        UIController.flashAppMessage(trigger.id);
        largePhonesBuildCSSBut.on('error', function(e) {
          console.error('Action:', e.action);
          console.error('Trigger:', e.trigger);
        });
        return clipboardStr;
      }
    });

    // Clipboard output for small phones CSS button
    var smallPhonesBuildCSSBut = new Clipboard(ccpBuildTag.smallPhonesBuildCSSBut, {
      text: function(trigger) {
        var clipboardStr = calcController.ccpGetSmallPhonesCSSClipboardOutput();
        smallPhonesBuildCSSBut.on('success', function(event) {
        });
        console.log('NOW');
        UIController.flashAppMessage(trigger.id);
        smallPhonesBuildCSSBut.on('error', function(e) {
          console.error('Action:', e.action);
          console.error('Trigger:', e.trigger);
        });
        return clipboardStr;
      }
    });

    // !VA UIController: Functions that get returned from the UIContoller object go here
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

      // UIController: FILEREADER OBJECT PROCESSING
      //Get the user-selected image file object 
      handleFileSelect: function(evt) {
        console.log('RUnning HandleFileSelect');
        // If a file is already being displayed, i.e. Appdata.filename is true, then remove that image to make room for the next image being dropped
        // !VA Remove the current #cur-img from the DOM. This has to be done in a separate function call, I'm not sure why handleFileSelect doesn't see #cur-img even though it is in the DOM at this point
        UIController.removeCurImg();
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
          console.log('NOT IMAGE');
          var target = "notimage";
          // !VA Below is the error handler - skipping for now
          // var isErr = errorHandler(target, 0, 0);
          console.log('!VA Not an image file error: Exiting...');
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

            // !VA Hide the dropArea - not sure if this is the right place for this.
            document.querySelector(staticRegions.dropArea).style.display = 'none';
            // !VA Populate the Appobj with the new image. Not sure if this is the right place to declare it.
            var Appobj = {
              currentimg: curImg,
              viewer: document.querySelector(dynamicRegions.imgViewer),
              viewport: document.querySelector(dynamicRegions.imgViewport),
              appcontainer: document.querySelector(dynamicRegions.appContainer)
            };

            // !VA Get element properties here
            function getElementProperties() { 
              // !VA Set a short timeout while the blob loads, then run the onload function before displaying the image and getting its properties. This is probably overkill, but noone will notice the 250ms anyway and better safe then no-workie.
              setTimeout(() => {
                // Once the blob is loaded, show it and get its data
                curImg.onload = (function() {
                // !VA Hide the drop area.
                  document.querySelector(staticRegions.dropArea).style.display = 'none';
                  // !VA  Show the toolbar
                  document.querySelector(staticRegions.toolsContainer).style.display = 'block';
                  document.querySelector(dynamicRegions.curImg).style.display = 'block';
                  // !VA Pass the blob to the Appobj for passing to getImgData
                  Appobj.currentimg = document.querySelector(dynamicRegions.curImg);
                  // !VA Call getAppData to get the image properties
                  Appdata = UIController.getAppData(Appobj, fileName);
                  // !VA Pass Appdata on to evalViewerSizes in order to resize the image containers dynamically based on the dimensions of the image.
                  calcController.evalViewerSize(Appdata);


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
            writeImgToDOM(curImg, getElementProperties);

          };
        })(f);
        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
        // }
        
      },
      //FILEREADER OBJECT PROCESSING END

      // UIController: UPDATE APP DATA
      updateAppData: function (prop, val) {
        val = parseInt(val); 
        // !VA !IMPORTANT! Referencing a property of an object in bracket notation!
        Appdata[prop] = val;
        UIController.refreshAppUI(Appdata);
        return Appdata;
      },

      // UIController: return a copy of Appdata to an outside function
      accessAppdata: function(){
        return Appdata;
      },


      // UIController: initialize AppData, this should probably be renamed to such
      getAppData: function(Appobj, filename) {
        // !VA  Appdata can only be populated if there's an image. If the DEV image isn't loaded or the USER hasn't dropped in an image yet, then Appdata.filename is undefined and script won't run.
        // !VA  I think I fixed the above problem by creating a different function for Dev initialization. It can be messy and not DRY since it's not for production anyway.
        // !VA If there's no current image, then return false. This is the flag to the initializeDOM function that there is no DEV image in the HTML. The init then shows the drop area and 'No Image' in the dimViewers.
        // !VA TODO: Need to revisit where the 'No Image' flags are written to the dimViewers. I think there are two places where that is done...
        if (Appobj.currentimg == null || Appobj.currentimg === 'undefined') {
          return false;
        } else {
          // !VA  There is a current image, so populate Appdata based on the object properties in Appdata
          Appdata = {
            // !VA The filename comes from the FileReader or the src property of the HTML img element if we're in Dev mode. Since the FileReader returns a blob with the binary data in the src property, there is not filename attached to the blob itself, so we need to pass in as a separate parameter along with the Appobj in all the function calls.
            filename: filename,
            imgH: Appobj.currentimg.height,
            imgW: Appobj.currentimg.width,
            imgNH: Appobj.currentimg.naturalHeight,
            imgNW: Appobj.currentimg.naturalWidth,
            aspect: function() {
              var a = calcController.getAspectRatio(this.imgNW, this.imgNH);
              return a;
            },
            // !VA These values are now initialized in CSS based on the size of dropArea, but they are updated with each new image in the adjustContainerHeight function.
            viewerH: parseInt(Appobj.viewer.style.height),
            viewerW: parseInt(Appobj.viewer.style.width),
            viewportH: parseInt(Appobj.viewport.style.height),
            viewportW: parseInt(Appobj.viewport.style.width),
            appH: parseInt(Appobj.appcontainer.style.height),
            appW: parseInt(Appobj.appcontainer.style.width),
            // !VA Using default values here, but they should be provided elsewhere, like in a template
            sPhoneW: 320,
            lPhoneW: 480

      
          };
          // !VA Evaluate the dim alerts
          calcController.evalDimAlerts(Appdata, dimViewers);
        }
        return Appdata;
      },
      
      // UIController: OBJECT AND DISPLAY REFRESH FUNCTIONS
      // This is where we pass in the recalculated Appdata data and update the onscreen display of the Appdata data in the dimViewers as well as the image object and image containers. 
      refreshAppUI: function (Appdata) {
        // VA! TODO: Need to revisit this...this is also done in the init function, I think and it only needs to be done once.
        // !VA The page has been initialized but no image has been selected yet, so set all the dimViewers to No Image.
        // !VA Appdata is still empty, so show 'No Image' in the dimViewers and hide the clipboard button.
        if (!Appdata.filename) {
          document.querySelector(dimViewers.clipboardBut).style.display = 'none';
          const dimarray = Object.values(dimViewers);
          for ( let i = 0; i < dimarray.length; i++ ) {
            if ( dimarray[i] !== '#dv-clipboard-but' &&  dimarray[i] !== '#dv-filename-viewer' ) {
              document.querySelector(dimarray[i]).innerHTML = '<span class="pop-font">&nbsp;&nbsp;No Image</span>';
            } 
          } 
          // return;
        } else {
          // !VA Write the dimViewers to the UI based on Appdata values and show the clipboard button
          document.querySelector(dimViewers.clipboardBut).style.display = 'block';
          // Filename
          document.querySelector(dimViewers.filename).innerHTML = Appdata.filename;
          // Current image display dimensions
          document.querySelector(dimViewers.display).innerHTML = `<span class='pop-font'><span id="display-size-width">${Appdata.imgW}</span> X <span id="display-size-height">${Appdata.imgH}</span></span>`;
          // !VA Dimensions on disk, i.e. natural dimensions
          document.querySelector(dimViewers.diskimg).innerHTML = `<span class='pop-font'>${Appdata.imgNW} X ${Appdata.imgNH}</span>` ;
          // Aspect ratio
          document.querySelector(dimViewers.aspect).innerHTML = `<span class='pop-font'>${calcController.getAspectRatio(Appdata.imgNW, Appdata.imgNH)[1]}</span>` ;
          // Small phone dimensions
          // VA! Calculate the height of the image if the width is whatever the small device width is, here 320 pixels
          // !VA  ALL these values need to be put in a global object
          // 
          // // !VA use object instead const smallphonewidth = 320;
          Appdata.sPhoneH = Math.round(Appdata.sPhoneW * (1 / calcController.getAspectRatio(Appdata.imgNW, Appdata.imgNH)[0]));
          document.querySelector(dimViewers.smallphones).innerHTML = `<span class='pop-font'><span id='small-phones-width'>${Appdata.sPhoneW}</span> X <span id='small-phones-height'>${Appdata.sPhoneH}</span></span>` ;
          // Large phone dimensions
          // Calculate the height of the image if the width is whatever the large device width is, here 480 pixels
          // !VA use object instead const largephonewidth = 480;
          Appdata.lPhoneH = Math.round(Appdata.lPhoneW * (1 / calcController.getAspectRatio(Appdata.imgNW, Appdata.imgNH)[0]));
          document.querySelector(dimViewers.largephones).innerHTML = `<span class='pop-font'><span id='large-phones-width'>${Appdata.lPhoneW}</span> X <span id='large-phones-height'>${Appdata.lPhoneH}</span></span>` ;
          // Retina dimensions are twice the display dimensions
          document.querySelector(dimViewers.retina).innerHTML = `<span class='pop-font'>${2 * Appdata.imgW}</span> X <span class='pop-font'>${2 * Appdata.imgH}`;

          // !VA Adjust the image container heights based on the Appdata values calculated in adjustContainerHeights
          document.querySelector(dynamicRegions.curImg).style.width = calcController.intToPx(Appdata.imgW);
          document.querySelector(dynamicRegions.curImg).style.height = calcController.intToPx(Appdata.imgH);
          document.querySelector(dynamicRegions.imgViewer).style.width = calcController.intToPx(Appdata.viewerW);
          document.querySelector(dynamicRegions.imgViewer).style.height = calcController.intToPx(Appdata.viewerH);
          // !VA This is NaN-- not sure we even need this since the app width is static.
          document.querySelector(dynamicRegions.imgViewport).style.width = calcController.intToPx(Appdata.viewportW);
          document.querySelector(dynamicRegions.imgViewport).style.height = calcController.intToPx(Appdata.viewportH);
          // !VA This is also NaN - same as above.
          document.querySelector(dynamicRegions.appContainer).style.height = calcController.intToPx(Appdata.appH);

          // !VA TODO: Show the dimension alerts if an image too large or small...
          // showDimensionAlerts();

          return Appdata, dimViewers;
        }
      },

      // UIController: remove current image
      // !VA Test for whether there is already a #cur-img element in the DOM, and if there is remove it so handleFileSelect can overwrite it without having to refresh the page to reboot the app.
      removeCurImg: function () {
        // if ( document.querySelector('#cur-img-container')) {
        document.querySelector('#cur-img-container').parentNode.removeChild(document.querySelector('#cur-img-container'));
        // } 
      },

      //UIController: set dim alerts
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

      // !VA UIController: Not currently in use
      resetPlaceholders: function (...ids) {
        // If the cursor is in an image resize field, set the value to no value so that the placeholders take over. Only do this for the image resize fields, because the current value is displayed in the dimViewer and doesn't need to be shown in the field itself. For the viewer width field, we need the value to stay in the field because this is the only way to tell the current width of the viewer. 
        // !VA  viewer width input field value display should also be handled here...currently is not. Search for main-image-viewer-wdth to find out where it's currently handled.
      },

      // CCPF - CLIPBOARD FUNCTIONS
      // ===============================================

      // // TOGGLE CLIPBOARD CONTROL PANEL
      ccpToggle: function () {
        document.querySelector(staticRegions.ccpContainer).classList.toggle('active');
        if (document.querySelector(staticRegions.ccpContainer).classList.contains('active')) {
          UIController.initCCP();
        }
      },

      // !VA UIController: Init function for CCP
      initCCP: function() {
        console.log('initCCP');
        // !VA Copy Appdata to local object
        var data = UIController.accessAppdata();


        // !VA Displaying all the programmatically-populated options here for now
        // !VA Set the value of the dropdown in ccpUserInput.tableWidth
        var twidth = document.querySelector(ccpUserInput.tableWidth);
        twidth.options[0].innerHTML = 'none';
        twidth.options[1].innerHTML = data.imgW;
        twidth.options[2].innerHTML = data.viewerW;
        twidth.options[3].innerHTML = '100%';

        // !VA Not ready for these yet
        // var tableMaxWidth = `'<option>${Appdata.viewerW}</option><option>100%</option>'`;
        // document.getElementById('table-width-select').innerHTML = tableMaxWidth;
        // document.getElementById('table-max-width').style.display = 'none';

        // var imgMaxWidth = `'<option>${Appdata.imgW}</option><option>100%</option>'`;
        // document.getElementById('img-width-select').innerHTML = imgMaxWidth;
        // document.getElementById('img-max-width').style.display = 'none'; 

      },


      // UIController Show element when input in another element is made 
      showElementOnInput: function(event) {
        // !VA Here we catch the input handlers for the CCP class input fields and show the mobile clipboard buttons when an input is made. The input event fires whenever a input element's value changes.
        var elems = [];
        // elems[0] = ccpBuildTag.imgBuildCSSBut;
        elems[0] = document.querySelector(ccpBuildTag.imgBuildCSSBut);
        elems[1] = document.querySelector(ccpBuildTag.smallPhonesBuildCSSBut);
        elems[2] = document.querySelector(ccpBuildTag.largePhonesBuildCSSBut);

        for (let i = 0; i < elems.length; i++) {
          // console.log(elems[i]);
          this.value ? elems[i].classList.add('active') : elems[i].classList.remove('active');
        }
      },

      // UIController: Flash a status message in the app message area
      // !VA We could probably fold this into the error handler but that's going to be complicated enough as it is and this is just for status messages
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
          'img-build-css-but': 'CSS class delaration copied to the Clipboard!',
          'lphones-build-css-but': 'CSS class delaration for tablets copied to the Clipboard!',
          'sphones-build-css-but': 'CSS class delaration for phones copied to the Clipboard!'
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
  // var r = UIController.getAppdata();

  // CALCULATIONS AND INPUT EVALUATION CONTROLLER
  var calcController = (function() {

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

    // !VA calcController module public functions from 
    return {

      // TESTING FUNCTION
      calcControllerTest: function() {
        console.log('calController test');
      },


      //STRING FUNCTIONS
      // !VA Convert integer to pixel for style properties
      // calcController: CONVERT INTEGER TO PIXEL VALUE
      intToPx: function(int) {
        let pxval;
        let str = String(int);
        pxval = str + 'px';
        return pxval;
      },
      //STRING FUNCTIONS

      // calcController: ASPECT RATIO
      getAspectRatio: function (var1, var2) {
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
      },

      // calcController: GET FILENAME FROM SRC ATTRIBUTE OF IMG FILE
      getFilenameFromSource: function (source) {
        if (source) {
          var path = source.split('/');
          return  path[path.length - 1];
        } else {
          console.log('getFilenameFromSource: there is no source');
        }
      },

      // USER ACTION HANDLERS
      // ==========================

      //  calcController: HANDLE THE USER INPUT FIELDS IN THE TOOLBUTTONS
      handleTBInput: function(id, val) {
        // !VA Get the Appdata property that corresponds to the element ID
        var prop = calcController.elementIdToAppdataProp(id);
        // !VA get a copy of Appdata
        var data = UIController.accessAppdata();
        // !VA TODO: Setting maxViewerWidth just for now
        var maxViewerWidth = 800;
        switch (true) {
        // !VA Handle the viewer width toolButton input
        case (prop === 'viewerW') :
          if (val < data.imgW ) {
            // !VA TODO: review this...
            // !VA The viewer width can't be smaller than the current image width of XXX, show message
            console.log('TODO: errorHandler: viewerW cannot be smaller than imgW');
          } else if (val > maxViewerWidth ) {
            // !VA Setting a maxViewerWidth here but I need to review V1 and revisit this.
            // !VA TODO: review the maxViewerWidth issue, but for now set it to 800px
            controller.initError(id, 'viewerW_GT_maxViewerWidth', true);
          } else {
            // !VA The viewerW is greater than the imgW so we can go ahead and widen the viewerW with no affecton the current image and without running evalViewerWidth. 
            data = UIController.updateAppData(prop, val);
          }
          break;
        // !VA Handle the custom width toolButton input
        case (prop === 'imgW') :
        // !VA TODO: restore the placeholder value on blur
          // !VA If the new image width is greater than the viewer width, then show message. This is a temporary fix, the errorHandler should reset the field value to ''.
          if (val > data.viewerW ) {
            // !VA errorHandler!
            controller.initError(id, 'imgW_GT_viewerW');
            
          }
          else {
            // !VA Write the user input for imgW to the data, which is the local copy of Appdata
            data = UIController.updateAppData(prop, val);
            // !VA Calculate the imgH based on the aspectRatio funtion and the current values for imgNW and imgNH and put it in val
            val = Math.round((1/calcController.getAspectRatio(data.imgNW, data.imgNH)[0]) * data.imgW);
            // !VA Write the updated imgH to Appdata
            data = UIController.updateAppData('imgH', val);
          }
          break;
        // !VA Handle the custom height toolButton input
        case (prop ==='imgH') :
          // !VA Write the user input for imgH to the data, which is the local copy of Appdata
          data = UIController.updateAppData(prop, val);
          // !VA TODO: restore the placeholder value on blur
          val = Math.round((calcController.getAspectRatio(data.imgNW, data.imgNH)[0]) * data.imgH);
          // !VA Write the updated imgH to Appdata
          data = UIController.updateAppData('imgW', val);
          break;
        case (prop ==='sPhoneW') :
          // !VA Write the user input for imgH to the data, which is the local copy of Appdata
          // !VA TODO: add error handling;
          data = UIController.updateAppData(prop, val);
          // !VA TODO: restore the placeholder value on blur
          // val = Math.round((calcController.getAspectRatio(data.imgNW, data.imgNH)[0]) * data.imgH);
          // !VA Write the updated imgH to Appdata
          // data = UIController.updateAppData('imgW', val);
          break;
        case (prop ==='lPhoneW') :
          // !VA TODO: add error handling;
          // !VA Write the user input for imgH to the data, which is the local copy of Appdata
          data = UIController.updateAppData(prop, val);
          // !VA TODO: restore the placeholder value on blur
          // val = Math.round((calcController.getAspectRatio(data.imgNW, data.imgNH)[0]) * data.imgH);
          // !VA Write the updated imgH to Appdata
          // data = UIController.updateAppData('imgW', val);
          break;
        }
        // !VA Adjust the container heights based on the updated Appdata properties
        calcController.adjustContainerHeights(data);
      },

      // // calcController: HANDLES MOUSECLICKS FROM TOOLBUTTONS
      handleTBClicks: function(id, val) {
        // !VA Put getAspectRatio in a variable
        var aspect;
        var imgWNew;
        var imgHNew;
        var data = UIController.accessAppdata();
        aspect = calcController.getAspectRatio(data.imgNH, data.imgNW)[0];  
        // debugger;
        // !VA If adding the button increment value to the existing imgW or imgH results in a value less than or equal to 0 then abort and error, because an image has to have a positive dimension.
        if ( data.imgW + val <= 0 || data.imgH + val <= 0 ) {
          controller.initError(id, 'tbButton_LT_zero');
        } else if ( data.imgW + val > data.viewerW  ) {
          controller.initError(id, 'tbButton_GT_viewerW');
        }   else {
          // !VA If we're incrementing...
          if ( id.includes('grow')) {
            imgWNew = data.imgW + val;
            imgHNew = imgWNew * aspect;
            // !VA The image height is growing past the viewer height, so adjust the viewer height
            if ( imgHNew > data.viewerH ) {
              console.log('Enlarging viewerH');
              console.log('imgHNew is: ' + imgHNew);
              UIController.updateAppData('viewerH', imgHNew);
            }
          } else {
            imgHNew = data.imgH + val;
            imgWNew = imgHNew * 1/aspect;
          }
          UIController.updateAppData('imgW', imgWNew);
          UIController.updateAppData('imgH', imgHNew);
          calcController.adjustContainerHeights(data);
        }
      },

      // calcController: EVALUATE VIEWER SIZE
      // !VA There are four conditions for an image to fit into the appContainer. This evaluates them, sets the Appdata properties accordingly and calls adjustContainerHeights. 
      // !VA TODO: Actually the function needs to be called only once at the end of the routine...
      evalViewerSize: function (Appdata) {
        // !VA This isn't necessary here, but will probably be used somewhere else...
        // !VA TODO: Try to figure out whether this is useful at all.
        // const maxViewerWidth = (parseInt(window.getComputedStyle(appRegions.appContainer,null).getPropertyValue('width'), 10)) - 48;

        // Using the current image dimensions, set the size of the viewer based on the following criteria:
        // !VA TODO: This can probably be recoded for efficiency but it works for now. Take another look at it.
        switch(true) {
        // The image falls within the default viewer dimensions set in initApp, so do nothing.
        // !VA This case is irrelevant since we're now comparing everything to maxViewerWidth not the  init values. Change accordingly...
        // !VA  NOT SO...now we're trying to restore the previous functionality so...
        case (Appdata.imgNW <= Appdata.viewerW) && (Appdata.imgNH < Appdata.viewerH) :
          Appdata.imgW = Appdata.imgNW;
          Appdata.imgH = Appdata.imgNH;
          // !VA viewerH is set in initApp, so no change to it here
          // !VA viewerH is set in initapp, so no change to that here either.
          // !VA We don't need to adjust height...but maybe we do for consistency's sake
          this.adjustContainerHeights(Appdata);
          break;

        // The image is wider than the current viewer width but shorter than current viewer height, so resize the image based on the viewer width
        case (Appdata.imgNW > Appdata.viewerW) && (Appdata.imgNH < Appdata.viewerH) :
          // Set the image width to the current viewer
          Appdata.imgW = Appdata.viewerW;
          // Get the image height from the aspect ration function
          Appdata.imgH = Math.round((1/this.getAspectRatio(Appdata.imgNW, Appdata.imgNH)[0]) * Appdata.imgW);
          // Set the viewerH to the imgH
          Appdata.viewerH = Appdata.imgH;
          this.adjustContainerHeights(Appdata);
          break;

        // The image is not as wide as the current viewer width, but is taller than the viewer height. Keep the image width but resize the viewer in order to display the full image height
        // !VA This might be a problem with consecutive images without page refresh
        case (Appdata.imgNW <= Appdata.viewerW) && (Appdata.imgNH > Appdata.viewerH) :
          // Set the viewer height and the image height to the image natural height
          Appdata.viewerH = Appdata.imgH = Appdata.imgNH;
          // Set the image width to the natural image width
          Appdata.imgW = Appdata.imgNW;

          // !VA  Use adjustContainerHeights to get the Appdata height
          // !VA  Note the dependency with initAppdata, see 'Dependency with adjustContainerHeights'
          this.adjustContainerHeights(Appdata);
          break;

        // The image is wider and taller than the current viewer height and width so we have to resize the image and the viewport based on the current viewport width
        case (Appdata.imgNW > Appdata.viewerW) && (Appdata.imgNH > Appdata.viewerH) :
          // Set the image Width to the current  viewer width 
          Appdata.imgW = Appdata.viewerW;
          // Set the image height proportional to the new image width using the aspect ratio function
          Appdata.imgH = Math.round((1/this.getAspectRatio(Appdata.imgNW, Appdata.imgNH)[0]) * Appdata.imgW);
          // Set the viewer height to the image height
          Appdata.viewerH = Appdata.imgH;
          // Get the viewport and Appdata height from adjustContainerHeights
          this.adjustContainerHeights(Appdata);
          // !VA TODO: Check this out, doesn't seem to be a problem anymore: BUG Problem with the 800X550, 800X600 -- no top/bottom gutter on viewport
          break;
        }
        // !VA Run evalDimAlerts now, after all the containers have been resized.
        // !VA !IMPORTANT! THIS IS WHERE TO GET THE UPDATED APPDATA
        calcController.evalDimAlerts(Appdata, dimViewers);
        
      },
      
      // calcController: ADJUST IMAGE CONTAINER HEIGHTS
      adjustContainerHeights: function (Appdata)  {
        // !VA This calculates the imgViewer, imgViewport and appContainer height based on Appdata values.
        // !VA Initial height is 450, which is set in the init function, not in Appdata,or as it was V1, in the Appobj.
        var initViewerH= 450;
        var heightVal = Appdata.imgH;
        let viewerH;
        let viewportH;
        let appContainerH; 

        // !VA I'm not even sure this is necessary since we're getting the viewerW from maxViewerHeight now -- but we'll leave it in here for the time being. 
        // !VA TODO: Review this whole maxViewerHeight thing.
        if (heightVal <= initViewerH) {
          // !VA  This is the min-height set in CSS
          // appObj.appContainerH = 804;
          viewerH = initViewerH;
          viewportH = viewerH + 145;
        } else {
          // Need a little buffer in the viewport
          viewerH = heightVal;
          viewportH = heightVal + 145;
        }
    
        // viewportH = heightVal + 125;
        appContainerH = viewportH;
        // This should write the heights to Appdata and then pass it to the function that writes Appdata to the dimViewers, probably called refreshDimViewers. In fact, there's no reason not to consolidate that function with the function that updates the image container heights and refresh the entire UI at the same time, so refreshUI.
        Appdata.viewerH = viewerH;
        Appdata.viewportH = viewportH;
        Appdata.appH = appContainerH;
        UIController.refreshAppUI(Appdata);
      },

      // calcController: EVALUATE DIM VIEWER ALERTS
      evalDimAlerts: function(Appdata, dimViewers) {
        // !VA Size On Disk is NOT 2X the Display Size: flag Size on Disk and Retina
        var curDimViewer = [];
        if (Appdata.imgNW <= (Appdata.imgW * 2) ) {
          curDimViewer.push(dimViewers.diskimg);
        } 
        // !VA Small phones isn't at least 2X size on Disk and Retina
        if (Appdata.imgNW < (Appdata.sPhoneW * 2) ) {
          curDimViewer.push(dimViewers.smallphones);
        } 
        // !VA Large phones isn't at least 2X Size on Disk and Retina
        if (Appdata.imgNW < (Appdata.lPhoneW * 2) ) {
          curDimViewer.push(dimViewers.largephones);
        } 
        // !VA Reset all the dim viewer alerts by passing in the entire dimViewer array
        UIController.setDimAlerts(dimViewers, false);
        // !VA Now set the individual dim viewer alerts for the current image.
        UIController.setDimAlerts(curDimViewer, true);
      },

      // !VA Might be good to fold this into error handling
      // calcController: VALIDATE INPUT FOR INTEGER
      validateInteger: function(inputVal) {
        // !VA Since integer validation is used for all height/width input fields, including those not yet implemented, we're going to use a separate error handler for it, call showAppMessages from it and return 
        let isErr;
        // let mess;
        if (!parseInt(inputVal, 10) || inputVal % 1 !== 0 || inputVal < 0) {
          // errorMessages(target, "Width and height must be entered as positive whole number.");
          UIController.showAppMessage('blob', true)
          console.log('validateInteger -- not an integer');
          isErr = true;
          // !VA Deal with actual error handling later
          // showAppMessage(mess, isErr);
        } else { 
          // !VA Input fields return strings, so convert to integer
          inputVal = parseInt(inputVal);
          isErr = false;
        }
        return isErr;
      },

      // !VA Need to get the Appdata property that corresponds to the ID of the DOM input element that sets it. It's easier to just create a list of these correspondences than to rename the whole UI elements and Appdata properties so they correspond, or to create functions that use string methods to extract them from each other.
      //  calcController: GET APPDATA PROPERTY NAME FROM AN HTML ELEMENT ID
      elementIdToAppdataProp: function(str) {
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
      },

      // calcController: IF NO USER INPUT IN CCP OPTION ELEMENTS 
      ccpIfNoUserInput: function(att, val) {
        // !VA We need get the filename from Appdata in case the user leaves 'path' empty
        var data = UIController.accessAppdata();
        var str;
        // !VA If there is an entry in the user entry field element, include the attribute string in the clipboard output. 
        if (val && att) {
          str = `${att}="${val}" `;
        } else {
          // !VA If the path field is empty, we need to return the filename without the path.
          if (att === 'src' && val === '' ) {
            str = `${att}="${data.filename}" `;
          } else {
            // !VA If there is no input, exclude the attribute entry.
            str = '';
          }
        }
        return str;

      },

      // calcController: GET STRINGS FOR THE IMG CLIPBOARD OUTPUT
      ccpGetImgClipboardOutput: function() {
        // !VA Get Appdata - we need it for the filename
        var data = UIController.accessAppdata();
        // !VA The string that passes the HTML img tag
        var clipboardStr; 
        // !VA Create the instance for img tag clipboard object and add img-specific properties.
        // !VA We're doing this in an object and outputting to an array because the object is easier to manage and the array is easier to reorder. The Constructor is in this module in the private functions above.
        var imgTag = new ClipboardOutput('imgTag');
        // !VA imgTag properties
        // !VA ---------------------------
        imgTag.classAtt = 
          // !VA If the user has input a value and the value exists, then build the clipboard output string. Otherwise, exclude the attribute string from the clipboard output 
          calcController.ccpIfNoUserInput('class',document.querySelector(ccpUserInput.imgClass).value);

        imgTag.altAtt =    
          // !VA If the user has input a value and the value exists, then build the clipboard output string. Otherwise, exclude the attribute string from the clipboard output
          calcController.ccpIfNoUserInput('alt',document.querySelector(ccpUserInput.imgAlt).value);
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
        imgTag.heightAtt = `height="${data.imgH}" `;
        imgTag.widthAtt = `width="${data.imgW}" `;
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

        // !VA Build the HTML tag
        clipboardStr = 
`  <img ${imgTag.widthAtt} ${imgTag.heightAtt} ${imgTag.srcAtt} border="0' ${imgTag.styleAtt} />`;

        // !VA Pass the imgTagArray and return it as string
        return clipboardStr;
      }, 
      
      // calcController: GET STRINGS FOR THE TD CLIPBOARD OUTPUT
      ccpGetTdClipboardOutput: function () {
        // !VA We don't need this yet, but we will if we decide to add a width style property which is useful for Outlook 120dpi 
        // var data = UIController.accessAppdata();

        var tdTag = new ClipboardOutput('tdTag');
        tdTag.classAtt = 
          // !VA If the user has input a value and the value exists, then build the clipboard output string. Otherwise, exclude the attribute string from the clipboard output 
          calcController.ccpIfNoUserInput('class',document.querySelector(ccpUserInput.tdClass).value);

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

        tdTag.tdContents =    (function () {
          // !VA Get the img tag output and put in between the td tags
          var str = calcController.ccpGetImgClipboardOutput();
          return str;
        })();



        var clipboardStr = 

`    <td ${tdTag.alignAtt} ${tdTag.valignAtt}>
      ${tdTag.tdContents}
    </td>`;

        var tdTagArray = [];
        tdTagArray[0] = '\t' + tdTag.openTag;
        tdTagArray[1] = tdTag.classAtt;
        tdTagArray[2] = tdTag.alignAtt;
        tdTagArray[3] = tdTag.valignAtt + '\n';
        tdTagArray[4] = '\t\t' + tdTag.tdContents  + '\n';
        tdTagArray[5] = '\t' + tdTag.closeTag;
        return clipboardStr;
      }, 

      // calcController: GET STRINGS FOR THE TABLE CLIPBOARD OUTPUT
      ccpGetTableClipboardOutput: function () {
        // !VA We need this to get Appdata.viewerW
        var data = UIController.accessAppdata();
        // !VA Variable returning the HTML to the clipboard object 
        var clipboardStr;
        // !VA Create the object for storing the individual tag attributes
        var tableTag = new ClipboardOutput('tableTag');
        tableTag.classAtt = 
          // !VA If the user has input a value and the value exists, then build the clipboard output string. Otherwise, exclude the attribute string from the clipboard output 
          calcController.ccpIfNoUserInput('class',document.querySelector(ccpUserInput.tableClass).value);


        tableTag.alignAtt = (function (id) {
          // !VA TODO: The default 'left' is currently set in the HTML, that should be done programmatically
          // !VA Pass in the id of the select dropdown
          console.log('id alignAtt is: ' + id);
          var str;
          // !VA Get the selection index
          var selInd = document.querySelector(id).selectedIndex;
          console.log('selInt alignAtt is: ' + selInd);
          // !VA Put the available options in an array
          var tableAlignOptions = [ 'none', 'left', 'center', 'right' ];
          // !VA Put the desired output strings in an array
          var clipboardOutput = [ '', 'align="left" ', 'align="center" ', 'align="right" '];
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
          var str = calcController.ccpGetTdClipboardOutput();
          return str;
        })();

        tableTag.widthAtt = (function (id, data) {
          // !VA TODO: The default 'none' is currently set in the HTML, that should be done programmatically
          // !VA Pass in the id of the select dropdown
          console.log('id widthAtt is: ' + id);
          var str;
          // !VA Get the selection index
          var selInd = document.querySelector(id).selectedIndex;
          console.log('selInd is: ' + selInd);
          // !VA Put the available options in an array
          var tableWidthOptions = [ 'none', data.imgW, data.viewerW, '100%' ];
          // !VA Put the desired output strings in an array
          var clipboardOutput = [ '',`width="${data.imgW}"`, `width="${data.viewerW}" `, '100%'];
          // !VA If the selected index matches the index of the available options array, then output the string that matches that index
          for (let i = 0; i < tableWidthOptions.length; i++) {
            if ( selInd === i) {
              str = `${clipboardOutput[i]}`;
            }
          }
          return str;
        })(ccpUserInput.tableWidth, data);

        clipboardStr = 
`<table border="0" cellpadding="0" cellspacing="0" ${tableTag.classAtt} ${tableTag.alignAtt} ${tableTag.widthAtt}>
  <tr>
${tableTag.tableContents}
  </tr>
</table>`;

        return clipboardStr;
      },

      // !VA UIContoller: build CSS clipboard output
      // !VA TODO: This can be consolidated with other CSS output or all other clipboard object functions
      ccpGetImgCSSClipboardOutput: function() {
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

      // !VA UIContoller: build large phone CSS clipboard output
      // !VA TODO: This can be consolidated with other CSS output or all other clipboard object functions
      ccpGetLargePhonesCSSClipboardOutput: function() {
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

      // !VA UIContoller: build large phone CSS clipboard output
      // !VA TODO: This can be consolidated with other CSS output or all other clipboard object functions
      ccpGetSmallPhonesCSSClipboardOutput: function() {
        // !VA Get Appdata to local variable
        var data = UIController.accessAppdata();
        console.dir(data);
        // !VA The string to pass the CSS declaration to the clipboard object
        var clipboardStr;
        // !VA Clipboard output object 
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


  // !VA Not sure why UICtrl is used here.
  // GLOBAL APP CONTROLLER
  var controller = (function(calcCtrl, UICtrl) {

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
      dropZone.addEventListener('drop', UIController.handleFileSelect, false);
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

      // !VA Need to decide whether to handle all events here or route actions directly from the event handler. For now...
      // HANDLE USER ACTION 
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
            calcController.handleTBClicks(el.id, val); 
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
            var isErr = calcController.validateInteger(this.value);
            if (isErr) {
              // !VA If the value entered isn't an integer, reset it to null and leave the focus there
              el.value = '';
            // !VA We want to handle all the toolbutton keyboard input in one place, so send the send the target element's id and value to handleTBInput
            } else if (el.id.includes('tb-input')) {
              calcController.handleTBInput(el.id, el.value);
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
              var prop = calcController.elementIdToAppdataProp(el.id);
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

    //  ERROR HANDLING
    // ==============================
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
        viewerW_GT_maxViewerWidth: `The container table width can't be greater than the width of the app itself &mdash; 800px.`
      };
      console.log('errorMessages.length is: ' + errorMessages.length);

      // !VA Loop through the error ID/message pairs and find the match
      for (const [key, value] of Object.entries(errorMessages)) { 
        if (key === str ) {
          console.log('match');
          console.log('value is: ' + value);
          showAppMessage(id, value, true);
        }
      }

      

    };

    var showAppMessage = function(id, mess, isErr) {

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
      console.log('HERE');

      appMessContainer.classList.add('show-err');
      console.log(appMessContainer);


      // !VA Reset the value of the element into which the error was entered to empty. 
      document.getElementById(id).value = '';
      appMessContainer.classList.remove('hide-err');
      appMessContainer.classList.add('show-err');


      // }
      // hide toolbarButtons


      // setTimeout(function(){
      //   // Swap the error positions back to normal after 3 seconds
      //   appMessContainer.classList.add('hide-err');
      //   // dimViewers.classList.add('hide-err');
      //   // toolsContainer.classList.add('hide-err');
      //   appMessContainer.classList.remove('show-err');
      //   // dimViewers.classList.remove('show-err');
      //   // toolsContainer.classList.remove('show-err');
      //   setTimeout(function(){
      //     // Remove the hide-err class after the .5 seconds -- which is the animation run time set in the CSS transforms.
      //     appMessContainer.classList.remove('hide-err');
      //     // dimViewers.classList.remove('hide-err');
      //     // toolsContainer.classList.remove('hide-err');
      //   },250);
      // },displayTime);
    };



    var doit = function() {
      // SCRAP DO IT FUNCTION
      console.log('Doing it...');
    };

    // !VA This is where we initialize Dev mode, which is where we can start the app with a hard-coded img element in the HTML file. THis is very useful, otherwise we'd have to drop files to initialize or dink with the FileReader object to hard-code a test file.
    // INITIALIZE DEV MODE 
    var initializeDevMode = function() {

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

        var filename = calcController.getFilenameFromSource(AppobjDev.currentimg.src);
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
        var evalViewerSize = calcController.evalViewerSize(Appdata);

        // !VA Open the CCP by default in dev mode
        // !VA First, make sure it's closed
        document.querySelector(staticRegions.ccpContainer).classList.remove('active');
        // !VA Then run ccpToggle to initialize the dynamic values and open it
        UIController.ccpToggle();
      });
    };



    return {
      initError: function(id, str, bool) {
        console.log('initError in controller');
        errorHandler(id, str, bool);
      },
      init: function(){
        // calcController.tst();
        console.log('App initialized.');
        // !VA  Initialize the ImgViewer to accomodate the dragArea. This should be the same as the CSS definition.
        document.querySelector(dynamicRegions.imgViewer).style.width = '650px';
        document.querySelector(dynamicRegions.imgViewer).style.height = '450px';
        // !VA Make sure the toolsContainer is off and the dropArea is on.
        document.querySelector(staticRegions.dropArea).style.display = 'block';
        document.querySelector(staticRegions.toolsContainer).style.display = 'none';

        setupEventListeners();
        // !VA  Test if there is currently #cur-img element with an image.If there is, it's hardcoded in the HTML and we're in DEV MODE. If there's not, the app is being initialized in USER MODE.
        var curImgExists = document.querySelector(dynamicRegions.curImg);
        if (curImgExists) {
          initializeDevMode();
        } else {
          // !VA Run refreshAppUI which tests for an existing image and writes 'No Image' to the dimViewers if none is found. Once that is done, the app waits for a drop event.
          document.querySelector(staticRegions.ccpContainer).classList.remove('active');
          UIController.refreshAppUI(Appobj);
        }
      }
    };

  })(calcController, UIController);

  controller.init();

//Namespace closure
})();