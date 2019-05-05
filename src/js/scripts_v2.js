
/* !VA  
===========================================================
TODO: Implement the toolbuttons.


DONE: FIX - Set input field value to the current value and remove the focus from the input field after the enter key is pressed. But entering values in the customw field puts the value of the viewerH field in on blur. The best fix for this requires renaming the UI elements in the HTML to be inline with the Javascript object and property names. Actually, it wasn't really necessary to rename the UI elements and it will cause some pain later when I recycle code from V1, but it does make a lot more sense now.

Renamed:

main-img               cur-img
main-img-container     cur-img-container

tb-input-viewerw       tb-input-viewerw
tb-but-grow50          tb-but-grow50
tb-but-grow10          tb-but-grow10
tb-but-grow01          tb-but-grow01
tb-but-shrink50        tb-but-shrink50
tb-but-shrink10        tb-but-shrink10
tb-but-shrink01        tb-but-shrink01
tb-input-customw       tb-input-customw
tb-input-customh       tb-input-customh






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
      filename: '#filename-viewer',
      display: '#dim-viewer-display',
      diskimg: '#dim-viewer-disk-img',
      aspect: '#dim-viewer-aspect',
      smallphones: '#dim-viewer-small-phones',
      largephones: '#dim-viewer-large-phones',
      retina: '#dim-viewer-retina',
      clipboardBut: '#clipboard-but'
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
      sPhonesW: '#tb-input-large-phonesw',
      lPhonesW: '#tb-input-small-phonesw',
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
              }, 1000);
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


      accessAppdata: function(){
        console.log('accessAppdata -- ');
        console.dir(Appdata);
        return Appdata;
      },

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
          // console.log('getAppData - Appdata is...');
          // console.table(Appdata);
          // console.log('getAppData - Appdata.filename is: ' + Appdata.filename);
          // console.log('getAppData - aspect ratio is: ' + Appdata.aspect()[1]);
          // console.log('Appdata dimViewers is...');
          // console.dir(dimViewers);

          // !VA STOP HERE -- serious problem -- at this point, the curImg hasn't been resized down to the width of the viewer, so the height and width values are also the same as NW and NH. 
          // !VA TODO: Fix this, it's not getting the right imgH and imgW
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
        // debugger;



        // !VA For each dimViewer passed from evalDimAlerts, set the font color style based on the bool argument passed in.
        for (let i = 0; i < curDimViewers.length; i++) {
          document.querySelector(curDimViewers[i]).style.color = att;
          // console.log('bool is: ' + bool);
          // console.log(curDimViewers[i]);
          // console.log('setDimAlerts - dimViewers is...');
          // console.dir(dimViewers);
        }

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
    var ccpUserInput = UIController.getDynamicRegionIDs();
    var ccpBuildTag = UIController.getCcpBuildTagIDs();


    return {
      //STRING FUNCTIONS
      // !VA Convert integer to pixel for style properties
      // CONVERT INTEGER TO PIXEL VALUE
      intToPx: function(int) {
        let pxval;
        let str = String(int);
        pxval = str + 'px';
        return pxval;
      },
      //STRING FUNCTIONS

      //ASPECT RATIO
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

      // GET FILENAME FROM SRC ATTRIBUTE OF IMG FILE
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

      // !VA Update the viewer height based on the user input in Controller.handleUserAction
      // UPDATE VIEWER HEIGHT
      updateViewerW: function (val) {
        // !VA TODO: Setting maxViewerWidth just for now
        var maxViewerWidth = 800;
        var data = UIController.accessAppdata();
        // console.log('updateViewerW -- ');
        // console.log('viewerw is: ' + val);
        // console.log('data.imgW is: ' + data.imgW);
        if (val < data.imgW ) {
          // !VA The viewer width can't be smaller than the current image width of XXX, show message
          console.log('TODO: errorHandler: viewerW cannot be smaller than imgW');
        } else if (val > maxViewerWidth ) {
          console.log('updateViewerW:  val > maxViewerWidth');
        } else {

          // !VA The viewerW is greater than the imgW so we can go ahead and widen the viewerW with no affecton the current image. 
          // console.log('continue...');
          var data2 = UIController.updateAppData('viewerW', val);
          // console.log('data2 is...');
          console.dir(data2);
          calcController.evalViewerSize(data2);
          // !VA Works...
        }
      },

      // !VA Update the image height based on the user input in Controller.handleUserAction
      // UPDATE IMAGE HEIGHT

      updateCustomW: function (val) {
        var data = UIController.accessAppdata();
        console.log('updateCustomW -- start');
        console.dir(data);
        // !VA If the new image width is greater than the viewer width, then show message. 
        if (val > data.viewerW ) {
          console.log('TODO: errorHandler: imgH cannot be larger than viewerW of XXX');
        }
        else {
          // !VA Write the user input for imgW to the data, which is the local copy of Appdata
          var data2 = UIController.updateAppData('imgW', val);
          console.log('data2 is...');
          console.dir(data2);
          // !VA Calculate the imgH based on the aspectRatio funtion and the current values for imgNW and imgNH and put it in val
          val = Math.round((1/calcController.getAspectRatio(data.imgNW, data.imgNH)[0]) * data.imgW);
          // !VA Write the updated imgH to Appdata
          data2 = UIController.updateAppData('imgH', val);
          console.log('data2 is...');
          console.dir(data2);
          debugger;
          calcController.evalViewerSize(data2);
          calcController.adjustContainerHeights(data2);

        }
      },


      // !VA There are four conditions for an image to fit into the appContainer. This evaluates them, sets the Appdata properties accordingly and calls adjustContainerHeights. 
      // !VA TODO: Actually the function needs to be called only once at the end of the routine...
      // EVALUATE VIEWER SIZE
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
      
      // ADJUST IMAGE CONTAINER HEIGHTS
      adjustContainerHeights: function (Appdata)  {
        // !VA This calculates the imgViewer, imgViewport and appContainer height based on Appdata values.

        var heightVal = Appdata.imgH;
        // console.log('heightVal is: ' + heightVal);
        // console.log('adjustContainerHeights Appdata is: ');
        let viewerH;
        let viewportH;
        let appContainerH; 

        // !VA I'm not even sure this is necessary since we're getting the viewerW from maxViewerHeight now -- but we'll leave it in here for the time being. 
        // !VA TODO: Review this whole maxViewerHeight thing.
        if (heightVal <= Appdata.initViewerH) {
          // !VA  This is the min-height set in CSS
          // appObj.appContainerH = 804;
          // !VA Trying to set the viewerH based on the initViewerH...
          viewerH = Appdata.initViewerH;
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

      // EVALUATE DIM VIEWER ALERTS
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
      // VALIDATE INPUT FOR INTEGER
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
      //  GET APPDATA PROPERTY NAME FROM AN HTML ELEMENT ID
      getAppdataPropertyFromID: function(str) {
        var IDtoProp = {
          viewerW:  'tb-input-viewerw',
          imgW: 'tb-input-customw',
          imgH: 'tb-input-customh'
        };
        var ret = Object.keys(IDtoProp).find(key => IDtoProp[key] === str);
        alert(ret);
        return ret;
      }
    };
  })();


  // !VA Not sure why UICtrl is used here...
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

      // !VA HERE! 

      
      // !VA Add click and blur event handlers for clickable toolButtons: 
      var tbClickables = [ toolButtons.grow50, toolButtons.grow10, toolButtons.grow01, toolButtons.shrink50, toolButtons.shrink10, toolButtons.shrink01 ];
      for (let i = 0; i < tbClickables.length; i++) {
        // !VA convert the ID string to the object inside the loop
        tbClickables[i] = document.querySelector(tbClickables[i]);
        // console.log(tbClickables[i]);
        addEventHandler(tbClickables[i],'click',handleUserAction,false);
        // debugger;
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
        console.log('handle user action here...');
        if (event.type === 'click') {
          console.log(event.type + ': ' + this.id);
        } else if (event.type === 'keypress') {
          keypressed = e.which || e.keyCode || e.key;
          if (keypressed == 13) {
            // console.log(event.type + ' ' + keypressed + ': ' + this.id);
            // !VA Get the input and evaluate it
            var isErr = calcController.validateInteger(this.value);
            if (isErr) {
              // !VA If the value entered isn't an integer, reset it to null and leave the focus there
              el.value = '';
            } else {
              // console.log('Pass this value...');
              // console.log('el.id is: ' + el.id);
              // console.log('el.val is: ' + el.value);
              el.id;
              switch(true) {
              case (el.id === 'tb-input-viewerw') :
                console.log('CASE 1 - updateViewerW --');
                
                calcController.updateViewerW(el.value);
                var data = UIController.accessAppdata();
                console.dir(data);
                break;

              case ( el.id === 'tb-input-customw') :
                console.log('CASE 2 - updateCustomW --');
                calcController.updateCustomW(el.value);

                break;
              }
            }
            // console.log('Pressed');
            // !VA If the value is not an integer on blur, then reset it to the previous value
            el.value = (function () {
              debugger;
              // !VA Get the Appdata property name that corresponds to the ID of the current input element
              var prop = calcController.getAppdataPropertyFromID(el.id);
              // !VA Access Appdata
              // debugger;
              var data = UIController.accessAppdata();
              // !VA return the current value of the Appdata property for the current event target to that elements value property
              alert(data[prop]);
              return data[prop];
            })();
            // !VA Blur the input field when enter is pushed whereby the current value stays in the field.
            el.blur();
            // !VA BRANCHING NOW TO FIX THIS...
          } 
        } else if (  event.type === 'focus') {
          // !VA Set the value of the element to null when it gets the focus
          el.value = ''; 
        } else if ( event.type === 'blur') {
          e.preventDefault;
        } else if ( event.type === 'drop') {
          // console.log(event.type + ': ' + this.id);
          e.preventDefault;
        } else if ( event.type === 'dragover') {
          // console.log(event.type + ': ' + this.id);
          e.preventDefault;
        } 
        else {
          console.log('other event');
        }
      }

      // SCRAP DO IT FUNCTION
      function doit() {
        console.log('Doing it...');
      }

      // doit();
        

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

      });
    };



    return {
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