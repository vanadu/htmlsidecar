
/* !VA  
===========================================================
TODO: Fix the retina calculations: it should alert if the disk size isn't 2X the display size.
TODO: FIx, when imgNW is greater than imgW the imgNW size flashes before resizing to the viewer size. This is probably because of the settimeout, which might not be necesssary if the onload function is running.

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

  var UIController = (function() {

    // !VA This is where Appdata should be initialized
    var Appdata = {};

    // !VA DimViewer ID strings
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

    // !VA toolButton ID Strings
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
    var dynamicRegions = {
      curImg: '#cur-img',
      imgViewer: '#main-image-viewer',
      imgViewport: '#image-viewport',
      appContainer: '#app-container',
    };

    var staticRegions = {
      dropArea: '#drop-area',
      toolsContainer: '#tools-container',
      ccpContainer: '#ccp',
      ccpImgClipbboardBut: '#img-build-html-but',

    };

    // !VA  ccpUserInput ID Strings
    // !VA imgAnchor is just a flag for the status of the checkbox. The actual propStrings have to have an Open and Close property.
    var ccpUserInput = {
      imgClass: '#img-class-input',
      imgAnchor: '#img-anchor-checkbox',
      imgAlt: '#img-alt-input',
      // !VA This isn't even a thing... probably delete it 04.28.19
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

    // !VA ccpPropStrings ID Strings
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

    // Clipboard output for build html image button

    new Clipboard(staticRegions.ccpImgClipbboardBut, {
      text: function(trigger) {
        console.log('new Clipboard: get img tag');
        var imgClipboardOutput = [];
        var imgTagArray = calcController.ccpGetUserInput();
        // !VA Get Appdata object, we need this to access the filename for the src property
        
        // !VA Build the array from the list of values
        for (let i = 0; i < imgTagArray.length; i++) {
          imgClipboardOutput.push(imgTagArray[i]);
        }
        // !VA Convert the array to a string, removing the comma-separators
        imgClipboardOutput = imgClipboardOutput.join('');
        // console.dir(imgClipboardOutput);
        // !VA Output to the clipboard
        return imgClipboardOutput;
      }
    });


    // !VA ccpBuildTag ID Strings
    // Stores the ccpMakeTag object for assembling the clipboard create tag buttons
    // !VA V2 Also doesn't belong here, we will move it later.
    var ccpBuildTag = {
      imgBuildHTMLBut: '',
      imgBuildCSSBut: '',
      smallPhonesBuildCSSBut: '',
      largePhonesBuildCSSBut: ''
    };


    // !VA Functions that get returned from the UIContoller object go here
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
      getCcpPropStringsIDs: function() {
        return ccpPropStrings;
      },
      getCcpUserInputIDs: function() {
        return ccpUserInput;
      },
      getCcpBuildTagIDs: function() {
        return ccpBuildTag;
      },

      //FILEREADER OBJECT PROCESSING
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
        // console.log('files is: ' + files);
        // !VA I don't think the output array is used here, so commenting out.
        // var output = [];
        // !VA get the number of files selected
        // console.log('files.length is:' + files.length);
        
        var f =  files[0];
        // console.log('f.name is: ' + f.name);
        // !VA this for loop would be used if we were using the entire filelist instead of just one
        // a single dropped file
        // for (var i = 0, f; f = files[i]; i++) {
        // console.log('files[i].name is: ' + files[i].name);
        // Only process image files.
        //This is the query for file type -- it includes any MIME type that starts 
        //with 'image' which is a huge list of possible formats -- see the complete
        //list of MIME formats. Best to narrow that down to JPG, GIF, PNG -- not sure
        //about SVG and VML, they're not in the big list of MIME types I found 
        // !VA Need to handle this error
        if (!f.type.match('image.*')) {
          console.log('NOT IMAGE');
          var target = "notimage";
          // console.log('target is: ' + target);
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

              console.log('writeImgToDOM --');
              console.log('dynamicRegions.curImg is: '+ dynamicRegions.curImg);
              
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

      updateAppData: function (prop, val) {
        val = parseInt(val); 
        // !VA !IMPORTANT! THis is HUGE!
        Appdata[prop] = val;
        // console.log('Appdata.prop is now: ' + Appdata[prop]);
        // !VA No return value should be required, this is write-only
        // console.log('updateAppData -- Appdata is...');
        // console.dir(Appdata);

        /* !VA STOPPED HERE Now we need to:
            write a function to:
                recalc imgW and imgH based on the new viewerw.
                recalc imgH and imgW based on the new customw/customh values

            return them here and update the Appdata
            run adjustContainerHeights here to recalc viewer heights based on above.
        */

        UIController.refreshAppUI(Appdata);
        return Appdata;
      },

      // UIController: return a copy of Appdata
      accessAppdata: function(){
        // console.log('accessAppdata -- ');
        // console.dir(Appdata);
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
      
      // OBJECT AND DISPLAY REFRESH FUNCTIONS
      // This is where we pass in the recalculated Appdata data and update the onscreen display of the Appdata data in the dimViewers as well as the image object and image containers. 
      refreshAppUI: function (Appdata) {
        // VA! Need to revisit this...this is also done in the init function, I think and it only needs to be done once.
        // !VA The page has been initialized but no image has been selected yet, so set all the dimViewers to No Image.
        // console.log('refreshAppUI running...');
        // !VA Appdata is still empty, so show 'No Image' in the dimViewers and hide the clipboard button.
        if (!Appdata.filename) {
          document.querySelector(dimViewers.clipboardBut).style.display = 'none';
          const dimarray = Object.values(dimViewers);
          for ( let i = 0; i < dimarray.length; i++ ) {
            if ( dimarray[i] !== '#clipboard-but' &&  dimarray[i] !== '#filename-viewer' ) {
              document.querySelector(dimarray[i]).innerHTML = `<span class='pop-font'>&nbsp;&nbsp;No Image</span>`;
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
      // !VA Test for whether there is already a #cur-img element in the DOM, and if there is remove it so handleFileSelect can overwrite it without having to refresh the page to reboot the app.
      removeCurImg: function () {
        // if ( document.querySelector('#cur-img-container')) {
        // console.log(document.querySelector('#cur-img-container').parentNode);
        document.querySelector('#cur-img-container').parentNode.removeChild(document.querySelector('#cur-img-container'));
        // } 
      },

      setDimAlerts: function(curDimViewers, bool) {
        // !VA if evalDimAlerts returns true, then the dimViewer should be displayed in red. To reset the dim alert, set to style color to 'auto'.
        var att = bool;
        bool ? att = 'red': att = 'inherit';
        // console.log('setDimAlerts - curDimViewers is...');
        // console.dir(curDimViewers);
        // !VA We want to use this same function to reset the dim alerts when a new image is loaded. For that, we need to pass in an array of all the dimViewer IDs, not just an array of the ones that are already red. So, first test if the argument is an object, and if it is convert it into a list of values so the loop will accept it.

        if (Array.isArray(curDimViewers) === false) {
          // console.log('bool is: ' + bool);
          curDimViewers = Object.values(curDimViewers);
          // console.log('curDimViewers is: ' + curDimViewers);
        }
        // !VA For each dimViewer passed from evalDimAlerts, set the font color style based on the bool argument passed in.
        for (let i = 0; i < curDimViewers.length; i++) {
          document.querySelector(curDimViewers[i]).style.color = att;
          // console.log('bool is: ' + bool);
          // console.log(curDimViewers[i]);
          // console.log('setDimAlerts - dimViewers is...');
          // console.dir(dimViewers);
        }
      },

      // !VA Not currently in use
      resetPlaceholders: function (...ids) {
        // If the cursor is in an image resize field, set the value to no value so that the placeholders take over. Only do this for the image resize fields, because the current value is displayed in the dimViewer and doesn't need to be shown in the field itself. For the viewer width field, we need the value to stay in the field because this is the only way to tell the current width of the viewer. 
        // !VA  viewer width input field value display should also be handled here...currently is not. Search for main-image-viewer-wdth to find out where it's currently handled.
      },

      // CCPF - CLIPBOARD FUNCTIONS
      // ===============================================

      // TOGGLE CLIPBOARD CONTROL PANEL
      ccpToggle: function () {
        console.log('toggleCCP -- ');
        // Toggle class 'active' to ccp
        document.querySelector(staticRegions.ccpContainer).classList.toggle('active');


        // !VA Displaying all the programmatically-populated options here for now
        // !VA What this does is populate the CCP fields for imgW and viewerW with data from Appdata. Then, more options are added to the CCP based on the selections in the dropdown fields. That functionality is in handleOnChange in V1, but we're not ready for that yet.
        var tableMaxWidth = `'<option>${Appdata.viewerW}</option><option>100%</option>'`;
        document.getElementById('table-width-select').innerHTML = tableMaxWidth;
        document.getElementById('table-max-width').style.display = 'none';

        var imgMaxWidth = `'<option>${Appdata.imgW}</option><option>100%</option>'`;
        document.getElementById('img-width-select').innerHTML = imgMaxWidth;
        document.getElementById('img-max-width').style.display = 'none';
      }





    };
  })();
  // var r = UIController.getAppdata();
  // console.dir(r);




  // CALCULATIONS AND INPUT EVALUATION CONTROLLER
  var calcController = (function() {

    // !VA If we want to access any of the DOM IDs we have to call them from UIController where they're defined.
    var dimViewers = UIController.getDimViewerIDs();
    var dynamicRegions = UIController.getDynamicRegionIDs();
    var staticRegions = UIController.getStaticRegionIDs();
    var toolButtons = UIController.getToolButtonIDs();
    var ccpPropStrings = UIController.getCcpPropStringsIDs();
    var ccpUserInput = UIController.getCcpUserInputIDs();
    var ccpBuildTag = UIController.getCcpBuildTagIDs();

    // !VA Constructor for the clipboard output objects. These are all the properties all the clipboard output objects (img, td and table) will have. We will store these key/value pairs in instances of the ClipboardOutput  because they're easier to manage. Then we'll build the output string into an array.
    function ClipboardOutput(openTag, classAtt, widthAtt ,closeTag) {
      this.openTag = openTag;
      this.classAtt = classAtt;
      this.widthAtt = widthAtt;
      this.closeTag = closeTag;
    }

    return {
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
        // console.log('getAspectRatio running...');
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
        // console.log('getFilenameFromSource running...');
        if (source) {
          // console.log('there is a source');
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
          // console.log('CASE 1: viewer width toolButton input');
          if (val < data.imgW ) {
            // !VA The viewer width can't be smaller than the current image width of XXX, show message
            console.log('TODO: errorHandler: viewerW cannot be smaller than imgW');
          } else if (val > maxViewerWidth ) {
            // !VA Setting a maxViewerWidth here but I need to review V1 and revisit this.
            console.log('updateViewerW:  val > maxViewerWidth');
          } else {
            // !VA The viewerW is greater than the imgW so we can go ahead and widen the viewerW with no affecton the current image and without running evalViewerWidth. 
            data = UIController.updateAppData(prop, val);
          }
          break;
        // !VA Handle the custom width toolButton input
        case (prop === 'imgW') :
        // !VA TODO: restore the placeholder value on blur
          // console.log('CASE 2: custom width toolButton input');
          // !VA If the new image width is greater than the viewer width, then show message. This is a temporary fix, the errorHandler should reset the field value to ''.
          if (val > data.viewerW ) {
            // !VA errorHandler!
            controller.onError(id, 'imgH_GT_viewerW');
            
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
          // console.log('CASE 3: custom height toolButton input');
          // !VA Write the user input for imgH to the data, which is the local copy of Appdata
          data = UIController.updateAppData(prop, val);
          // !VA TODO: restore the placeholder value on blur
          val = Math.round((calcController.getAspectRatio(data.imgNW, data.imgNH)[0]) * data.imgH);
          // !VA Write the updated imgH to Appdata
          data = UIController.updateAppData('imgW', val);
          break;
        case (prop ==='sPhoneW') :
          // console.log('CASE 3: custom height toolButton input');
          // !VA Write the user input for imgH to the data, which is the local copy of Appdata
          console.log('prop is: ' + prop);
          debugger;
          data = UIController.updateAppData(prop, val);
          // !VA TODO: restore the placeholder value on blur
          // val = Math.round((calcController.getAspectRatio(data.imgNW, data.imgNH)[0]) * data.imgH);
          // !VA Write the updated imgH to Appdata
          // data = UIController.updateAppData('imgW', val);
          break;
        case (prop ==='lPhoneW') :
          // console.log('CASE 3: custom height toolButton input');
          // !VA Write the user input for imgH to the data, which is the local copy of Appdata
          console.log('prop is: ' + prop);
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
        console.log('handleTBClicks --');
        // !VA Put getAspectRatio in a variable
        var aspect;
        var imgWNew;
        var imgHNew;
        var data = UIController.accessAppdata();
        aspect = calcController.getAspectRatio(data.imgNH, data.imgNW)[0];  
        // debugger;
        // !VA If adding the button increment value to the existing imgW or imgH results in a value less than or equal to 0 then abort and error, because an image has to have a positive dimension.
        if ( data.imgW + val <= 0 || data.imgH + val <= 0 ) {
          controller.onError(id, 'tbButton_LT_zero');
        } else if ( data.imgW + val > data.viewerW  ) {
          controller.onError(id, 'tbButton_GT_viewerW');
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
          // console.log('CASE 1');
          break;

        // The image is wider than the current viewer width but shorter than current viewer height, so resize the image based on the viewer width
        case (Appdata.imgNW > Appdata.viewerW) && (Appdata.imgNH < Appdata.viewerH) :
          // console.log('CASE 2');
          // Set the image width to the current viewer
          Appdata.imgW = Appdata.viewerW;
          // Get the image height from the aspect ration function
          Appdata.imgH = Math.round((1/this.getAspectRatio(Appdata.imgNW, Appdata.imgNH)[0]) * Appdata.imgW);
          // Set the viewerH to the imgH
          Appdata.viewerH = Appdata.imgH;
          this.adjustContainerHeights(Appdata);
          // console.log('CASE 2');
          break;

        // The image is not as wide as the current viewer width, but is taller than the viewer height. Keep the image width but resize the viewer in order to display the full image height
        // !VA This might be a problem with consecutive images without page refresh
        case (Appdata.imgNW <= Appdata.viewerW) && (Appdata.imgNH > Appdata.viewerH) :
          // console.log('CASE 3');
          // Set the viewer height and the image height to the image natural height
          Appdata.viewerH = Appdata.imgH = Appdata.imgNH;
          // Set the image width to the natural image width
          Appdata.imgW = Appdata.imgNW;

          // !VA  Use adjustContainerHeights to get the Appdata height
          // !VA  Note the dependency with initAppdata, see 'Dependency with adjustContainerHeights'
          this.adjustContainerHeights(Appdata);
          // console.log('CASE 3');
          break;

        // The image is wider and taller than the current viewer height and width so we have to resize the image and the viewport based on the current viewport width
        case (Appdata.imgNW > Appdata.viewerW) && (Appdata.imgNH > Appdata.viewerH) :
          // Set the image Width to the current  viewer width 
          // console.log('Case 4: Appdata.viewerW is: ' + Appdata.viewerW );
          Appdata.imgW = Appdata.viewerW;
          // Set the image height proportional to the new image width using the aspect ratio function
          Appdata.imgH = Math.round((1/this.getAspectRatio(Appdata.imgNW, Appdata.imgNH)[0]) * Appdata.imgW);
          // Set the viewer height to the image height
          Appdata.viewerH = Appdata.imgH;
          // Get the viewport and Appdata height from adjustContainerHeights
          this.adjustContainerHeights(Appdata);
          // console.log('CASE 4');
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
        // console.log('heightVal is: ' + heightVal);
        // console.log('adjustContainerHeights Appdata is: ');
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
        // console.log('Appdata.viewerH is now: ' + Appdata.viewerH);
        Appdata.viewportH = viewportH;
        Appdata.appH = appContainerH;
        // console.log('adjustContainerHeights: Appdata is...');
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
        // !VA Since integer validation is used for all height/width input fields, including those not yet implemented, we're going to use a separate error handler for it, call showMessages from it and return 
        let isErr;
        // let mess;
        if (!parseInt(inputVal, 10) || inputVal % 1 !== 0 || inputVal < 0) {
          // errorMessages(target, "Width and height must be entered as positive whole number.");
          console.log('validateInteger -- not an integer');
          isErr = true;
          // !VA Deal with actual error handling later
          // showMessage(mess, isErr);
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
        // console.log('att is: ' + att);
        // console.log('val is: ' + val);
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

      ccpGetUserInput: function() {
        var data = UIController.accessAppdata();
        console.log('ccpGetUserInput data is  -- : ');
        console.dir(data);

        // !VA Create the instance for img tag clipboard object and add img-specific properties.
        // !VA We're doing this in an object and outputting to an array because the object is easier to manage and the array is easier to reorder.
        var imgTag = new ClipboardOutput('imgTag');
        imgTag.openTag = '<img ';
        imgTag.classAtt = `class="${document.querySelector(ccpUserInput.imgClass).value}" `;
        imgTag.closeTag = '/>';
        imgTag.altAtt = `alt="${document.querySelector(ccpUserInput.imgAlt).value}" `;
        imgTag.srcAtt = `src="${document.querySelector(ccpUserInput.imgRelPath).value}/${data.filename}" `;
        imgTag.heightAtt = `height="${data.imgH}" `;
        imgTag.widthAtt = `width="${data.imgW}" `;
        imgTag.styleAtt= `border:"0" style="width: ${data.imgW}px; height: ${data.imgH}px; border: none; outline: none; text-decoration: none; display:block;" `;

        var imgTagArray = [];
        imgTagArray[0] = imgTag.openTag;
        imgTagArray[1] =    
          calcController.ccpIfNoUserInput('class',document.querySelector(ccpUserInput.imgClass).value);
        imgTagArray[2] = 
        calcController.ccpIfNoUserInput('alt',document.querySelector(ccpUserInput.imgAlt).value);
        imgTagArray[3] = imgTag.widthAtt;
        imgTagArray[4] = imgTag.heightAtt;
        imgTagArray[5] = (function () {
          var str;
          // str='bollocks';
          // str= document.querySelector(ccpUserInput.imgRelPath).value;
          if (document.querySelector(ccpUserInput.imgRelPath).value) {
            str = imgTag.srcAtt;
          } else {
            str = `src="${data.filename}" `;

          }
          return str;
        })();
        imgTagArray[6] = imgTag.styleAtt;
        imgTagArray[7] = imgTag.closeTag;

        // !VA Return the ordered array of imgTag clipboard strings
        return imgTagArray;
      }


      














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
    var ccpPropStrings = UIController.getCcpPropStringsIDs();
    var ccpUserInput = UIController.getDynamicRegionIDs();
    var ccpBuildTag = UIController.getCcpBuildTagIDs();

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
        //console.log('dragging over');
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
        // console.log(tbClickables[i]);
        addEventHandler(tbClickables[i],'click',handleUserAction,false);

      }
      
      // !VA Add event handlers for input toolButtons
      var tbKeypresses = [ toolButtons.viewerW, toolButtons.customW, toolButtons.customH, toolButtons.sPhonesW, toolButtons.lPhonesW ];
      for (let i = 0; i < tbKeypresses.length; i++) {
        // !VA convert the ID string to the object inside the loop
        tbKeypresses[i] = document.querySelector(tbKeypresses[i]);
        // console.log(tbKeypresses[i]);
        addEventHandler((tbKeypresses[i]),'keypress',handleUserAction,false);
        addEventHandler((tbKeypresses[i]),'focus',handleUserAction,false);
        addEventHandler(tbKeypresses[i],'blur',handleUserAction,false);
        addEventHandler(tbKeypresses[i],'dragover',handleUserAction,false);
        addEventHandler(tbKeypresses[i],'drop',handleUserAction,false);
      }

      // !VA Add click handlers for dimViewer - there's only the clipboard button now but there could be more. 
      var dvClickables = [ dimViewers.clipboardBut ];
      for (let i = 0; i < dvClickables.length; i++) {
        // !VA convert the ID string to the object inside the loop
        dvClickables[i] = document.querySelector(dvClickables[i]);
        // console.log(dvClickables[i]);
        addEventHandler((dvClickables[i]),'click',handleUserAction,false);
      }


      // addEventHandler(document.getElementById('tb-input-viewerw'),'focus',doit,false);


      // !VA Need to decide whether to handle all events here or route actions directly from the event handler. For now...
      // HANDLE USER ACTION 
      function handleUserAction(e) {
        var keypressed;
        var isErr;
        // e.stopPropagation;
        var el;
        // !VA Put the event trigger in an object first, so we don't have to keep calling document.getElementById
        el = document.getElementById(this.id);
        console.log('handle user action here.');
        if (event.type === 'click') {
          // !VA If the id contains 'tb' then we're dealing with toolButtons buttons.
          switch (true) {
          case ( el.id.includes('tb')) :
            // console.log('handleUserAction - tbclicks');
            // console.log('el.id is: ' + el.id);
            var val;
            // !VA The last 2 chars of the id indicate the value by which the img dimension should be incremented,so get the last 2 chars and convert to integer
            val = parseInt(el.id.slice(-2));
            // !VA If the target ID includes 'grow' then the image dimension will be incremented, if 'shrink' then it will be decremented
            (el.id.includes('grow')) ? val : val = -val;
            calcController.handleTBClicks(el.id, val); 
            break;
          case ( el.id.includes('dv')) :
            console.log('includes dv');
            UIController.ccpToggle();
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
          // console.log('blur');
          // !VA If the target is viewerW, we want to restore the previous value to the field on blur in case of error or in case it is exited without entering a value with the return key. If the target is customW or customH, we want to restore the placeholder value.
          // !VA TODO: create function to restore placeholder value
          el.value = (function () {
            console.log('Handling blur');
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
          // console.log(event.type + ': ' + this.id);
          // e.preventDefault;
        } else if ( event.type === 'dragover') {
          // console.log(event.type + ': ' + this.id);
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
      // addEventHandler(ccpUserInput.imgClass,'keypress',showMobileImageButtons,false);
      // ccpUserInput.imgAlt.addEventListener('keypress', showMobileImageButtons);
      // ccpUserInput.imgClass.addEventListener('keypress', showMobileImageButtons);
      // ccpUserInput.imgRelPath.addEventListener('keypress', showMobileImageButtons);

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
    var errorHandler = function(id, str) {
      // !VA Error handler
      // console.log('id is: ' + id);
      // console.log('str is: ' + str);
      switch (true) {
      case (str === 'imgH_GT_viewerW') :
        console.log('errorHandler: imgH cannot be larger than viewerW of XXX');
        document.getElementById(id).value = '';
        break;
      // tbButton_LT_zero
      case (str === 'tbButton_LT_zero') :
        console.log('errorHandler: the image height or width can\'t be less than zero');
        document.getElementById(id).value = '';
        break;
      case (str === 'tbButton_GT_viewerW') :
        console.log('errorHandler: the image can\'t be wider than the viewer');
        document.getElementById(id).value = '';
        break;
      }
    };


    var doit = function() {
      // SCRAP DO IT FUNCTION
      console.log('Doing it...');
    };

    // !VA This is where we initialize Dev mode, which is where we can start the app with a hard-coded img element in the HTML file. THis is very useful, otherwise we'd have to drop files to initialize or dink with the FileReader object to hard-code a test file.
    // INITIALIZE DEV MODE 
    var initializeDevMode = function() {

      window.addEventListener('load', function() {
        console.log('All assets are loaded')


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
        // console.log('curImgExists is: ' + curImgExists);
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
        document.querySelector(staticRegions.ccpContainer).classList.add('active');

      });
    };



    return {
      onError: function(id, str) {
        console.log('onError in controller');
        errorHandler(id, str);
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
        // console.log('curImgExists is: ' + curImgExists);
        if (curImgExists) {
          initializeDevMode();
        } else {
          // !VA Run refreshAppUI which tests for an existing image and writes 'No Image' to the dimViewers if none is found. Once that is done, the app waits for a drop event.
          UIController.refreshAppUI(Appobj);
        }
      }
    };

  })(calcController, UIController);

  controller.init();

//Namespace closure
})();