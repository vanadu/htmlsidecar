

//SCRIPT START
//PAGE SETUP START

// Namespace
var Dimwhit = (function () {

  // INITIALIZATION FUNCTIONS
  window.onload = function() {
    initApp();
  };

  // initialize appObj  to hold the image-viewport, main-image and main-img-viewer. These are all the mutable VALUES that can be displayed in the in the app
  // !VA Added initViewerW and initViewerH 03.08.18
  // !VA Added sPhoneW, sPhoneH, lPhoneW and lPhoneH
  function appObj(filename, appContainerW, appContainerH, viewportW, viewportH, initViewerW, initViewerH, viewerW, viewerH, imgW, imgH, imgNW, imgNH, sPhoneW, sPhoneH, lPhoneW, lPhoneH) {
    return { filename, appContainerW, appContainerH, viewportW, viewportH, initViewerW, initViewerH, viewerW, viewerH, imgW, imgH, imgNW, imgNH, sPhoneW, sPhoneH, lPhoneW, lPhoneH };
  }

  // Initialize dimViewers -- these are the HTML elements in the Dimension Viewer.
  function dimViewers(filename, display, diskimg, aspect, smallphones, largephones, retina, clipboardBut) {
    return { filename, display, diskimg, aspect, smallphones, largephones, retina, clipboardBut };
  }
  // Initialize toolButtons -- these are the HTML elements in the Toolbar
  function toolButtons(viewerWidth, grow50, grow10, grow01, customWidth, toggleImgSize, customHeight, shrink01, shrink10, shrink50, sPhoneWidth, lPhoneWidth ) {
    return { viewerWidth, grow50, grow10, grow01, customWidth, toggleImgSize, customHeight, shrink01, shrink10, shrink50, sPhoneWidth, lPhoneWidth };

    //turn off tab index for everything but DoIt
    //Turn on tabIndex for build-img-tag -- not working!
  }

  // Initialize appRegions -- these are the regions in the application used for the main image itself, its viewer, viewport, appcontainer
  function appRegions(dropArea, curImg, imgViewer, imgViewport, toolsContainer, ccpContainer, appContainer ) {
    return { dropArea, curImg, imgViewer, imgViewport,  toolsContainer, ccpContainer, appContainer };
  }

  // Initialize object for CCP Elements
  // !VA imgAnchor is just a flag for the status of the checkbox. The actual propStrings have to have an Open and Close property.
  function ccpUserInput(imgClass, imgAnchor, imgAlt, imgAlign, imgRelPath, tdClass, tdAlign, tdValign, tableClass, tableAlign, tableWidth, tableMaxWidth) {
    return { imgClass, imgAnchor, imgAlt, imgAlign, imgRelPath, tdClass, tdAlign, tdValign, tableClass, tableAlign, tableWidth, tableMaxWidth};
  }

  // Initialize object for storing the strings representing the HTML properties corresponding to the user CCP selections. These property snippets will be used to populate the clipboard.
  // !VA Have to include separate propStrings for opening and closing tags 
  function ccpPropStrings(imgClass, imgAnchorOpen, imgAnchorClose, imgAlt, imgAlign, imgRelPath, imgWidth, imgMaxWidth, tdClass, tdAlign, tdValign, tableClass, tableAlign, tableWidth) {
    return { imgClass, imgAnchorOpen, imgAnchorClose, imgAlt, imgAlign, imgRelPath, imgWidth, imgMaxWidth, tdClass, tdAlign, tdValign, tableClass, tableAlign, tableWidth};
  }

  // Initialize the ccpMakeTag object for the clipboard create tag buttons
  function ccpBuildTag( imgBuildHTMLBut, imgBuildCSSBut, smallPhonesBuildCSSBut, largePhonesBuildCSSBut ) {
    return { imgBuildHTMLBut, imgBuildCSSBut, smallPhonesBuildCSSBut, largePhonesBuildCSSBut };
  }


  function initApp() {
    // console.log('initApp: initializing...');
    // populate the dimViewers object
    dimViewers.filename = document.getElementById('filename-viewer');
    dimViewers.display = document.getElementById('dim-viewer-display');
    // !VA 03.19.18 Trying these new dimViewer properties...not sure whether we'd ever access the individual display size width and height, since these are covered in the appObj object.
    

    dimViewers.diskimg = document.getElementById('dim-viewer-disk-img');
    dimViewers.aspect = document.getElementById('dim-viewer-aspect');
    dimViewers.smallphones = document.getElementById('dim-viewer-small-phones');
    dimViewers.largephones = document.getElementById('dim-viewer-large-phones');
    dimViewers.retina = document.getElementById('dim-viewer-retina');
    dimViewers.clipboardBut = document.getElementById('clipboard-but');

    // populate the toolButtons object
    // !VA Added sPhoneWidth and sPhoneHeight
    toolButtons.viewerWidth = document.getElementById('main-image-viewer-wdth');
    toolButtons.grow50 = document.getElementById('main-image-grow-50');
    toolButtons.grow10 = document.getElementById('main-image-grow-10');
    toolButtons.grow01 = document.getElementById('main-image-grow-01');
    toolButtons.customWidth = document.getElementById('main-img-custom-wdth');
    toolButtons.toggleImgSize = document.getElementById('toggle-image-size');
    toolButtons.customHeight = document.getElementById('main-img-custom-hght');
    toolButtons.shrink01 = document.getElementById('main-image-shrink-01');
    toolButtons.shrink10 = document.getElementById('main-image-shrink-10');
    toolButtons.shrink50 = document.getElementById('main-image-shrink-50');
    toolButtons.sPhoneWidth = document.getElementById('small-phones-wdth');
    toolButtons.lPhoneWidth = document.getElementById('large-phones-wdth');

    // populate the ccpUserInput object -- these are the HTML elements that get the user input in the CCP -- their values are paired with the ccpPropStrings object which holds the values residing in these HTML elements
    ccpUserInput.imgAnchor = document.getElementById('img-anchor-checkbox');
    ccpUserInput.imgClass = document.getElementById('img-class-input');
    ccpUserInput.imgAlt = document.getElementById('img-alt-input');
    ccpUserInput.imgAlign = document.getElementById('img-align-select');
    ccpUserInput.imgRelPath = document.getElementById('img-relpath-input');
    ccpUserInput.imgWidth = document.getElementById('img-width-select');
    ccpUserInput.imgMaxWidth = document.getElementById('img-max-width-input');
    ccpUserInput.tdClass = document.getElementById('td-class-input');
    ccpUserInput.tdAlign = document.getElementById('td-align-select');
    ccpUserInput.tdValign = document.getElementById('td-valign-select');
    ccpUserInput.tableClass = document.getElementById('table-class-input');
    ccpUserInput.tableAlign = document.getElementById('table-align-select');
    ccpUserInput.tableWidth = document.getElementById('table-width-select');
    ccpUserInput.tableMaxWidth = document.getElementById('table-max-width-input');

    // populate the ccpBuildTag object with the build tag HTML elements
    ccpBuildTag.imgBuildHTMLBut = document.getElementById('img-build-html-but'); 
    ccpBuildTag.imgBuildCSSBut = document.getElementById('img-build-css-but');
    ccpBuildTag.smallPhonesBuildCSSBut =  document.getElementById('sphones-build-css-but');
    ccpBuildTag.largePhonesBuildCSSBut = document.getElementById('lphones-build-css-but');
    ccpBuildTag.tdBuildHTMLBut = document.getElementById('td-build-html-but'); 
    ccpBuildTag.tableBuildHTMLBut = document.getElementById('table-build-html-but'); 
    
    // populate the appRegions object
    appRegions.dropArea = document.getElementById('drop-area');
    // !VA  03.18.18 We don't define appRegions.curImg yet. That is done either by the FileReader or when the devImg is retrieved from the index.html further down in this block
    // NOT YET! appRegions.curImg = document.getElementById('main-img');
    appRegions.imgViewer = document.getElementById('main-image-viewer');
    appRegions.imgViewport = document.getElementById('image-viewport');
    appRegions.toolsContainer = document.getElementById('tools-container');
    appRegions.ccpContainer = document.getElementById('ccp');
    appRegions.appContainer = document.getElementById('app-container');

    // !VA We're initializing the display here for the drop area only -- actual images are handled by getCurImg and initAppObj
    //Display drop-area and wait for user input from Filereader 
    appRegions.dropArea.style.display = 'block';
    //hide the clipboard but until an image is selected
    dimViewers.clipboardBut.style.display = 'none';
    //Initialize the viewer height and width, viewport and app container height
    // !VA The area inside the dotted line, although that's actually irrelevant
    appObj.imgW = 600;
    appObj.imgH = 400;
    // The initial viewer dimensions, which just serve as a border area for the dotted-line box.
    appObj.viewerW = appObj.initViewerW = 650;
    appObj.viewerH = appObj.initViewerH = 500;
    // 154 = 24 for the bottom border and 110 for the top border.
    // appObj.viewportH = (525 + 154);
    // 400 is the height of the drop area
    // Use adjustHeights here for consistency's sake with imgH = 400
    [appObj.viewerH, appObj.viewportH, appObj.appContainerH] = adjustHeights(appObj.imgH);

    // !VA Initialize appObj phone width to 320/480
    appObj.sPhoneW = 320;
    appObj.lPhoneW = 480;

    // !VA Viewport width is app-container width - 48 for the black border on each side of the #image-viewport. Note: image-viewport width is 100% -- the actual width is set in #app-container. 
    appObj.viewportW = (appRegions.imgViewport.offsetWidth - 48);
    // Apply the dimensions to the element styles
    appRegions.imgViewer.style.width = intToPx(appObj.initViewerW);
    appRegions.imgViewer.style.height = intToPx(appObj.initViewerH);
    appRegions.imgViewport.style.height = intToPx(appObj.viewportH);
    appRegions.appContainer.style.height = intToPx(appObj.appContainerH);

    // console.log('initApp appObj is...');
    // console.dir(appObj);

    // !VA Display the viewer width in main-image-viewer-wdth
    // !VA  NO, we don't do this here, it's irrelevant what the viewer width is because there's no image
    // document.getElementById('main-image-viewer-wdth').value = appObj.viewerW;

    // If there's a devIMG in the HTML...
    if (document.getElementById('main-img')) {
      // !VA  03.18.18 then set appRegions.curImg to it
      appRegions.curImg = document.getElementById('main-img');
      // devIMG set in HTML
      // !VA  03.18.18 We call getCurImg with NO PARAMETERS -- this is the flag to getCurImg that the image has been loaded directly from the index.html, not from the FileReader. FUNKY - not sure if I set appRegions.curImg yet...
      getCurImg();

      // !VA Optionally, show the CCP by default
      // appRegions.ccpContainer.style.transform = 'scaleX(1)';

      // console.log('initApp: devIMG set in HTML');
    } else {
      // NO devIMG set in HTML -- get curImg from Filereader
    }

    // !VA Could probably create a real-time demo by just loading a few images...
    // document.getElementById('main-img').src = 'img/TEST/_400X1000.png';

 
    // !VA Pass appObj to refreshDimViewers to initialize the screen display. Note -- main-image is still empty -it's been initialized but has no values yet. That's the trigger for refreshDimViewers to display 'No image'.
    refreshDimViewers(appObj, dimViewers);
  }

  // Get the current image from Filereader or devIMG from index.html

  // !VA  03.18.18 Not sure we need to pass in any parameters if we're populating the object -- need 
  function getCurImg(curImg, fileName) {
    // !VA First, if the CCP is open, close it
    // !VA  03.18.18 Don't need this var anymore, use object

    if  (appRegions.ccpContainer.classList.contains('active')) {
      appRegions.ccpContainer.classList.remove('active');
    }

    // !VA Second, if the toolbar isn't being displayed, display it
    // !VA Note the use of getComputedStyle -- need it if the property being queried is set in the stylesheet.
    // let toolsContainer = document.getElementById('tools-container');

    if (getComputedStyle(appRegions.toolsContainer, null).display == 'none') {
      appRegions.toolsContainer.style.display = 'block';
    }

    // Get the current image and populate appObj with its data. curImg comes either from the FileReader object or from the preset devIMG in the HTML file. If it's null or undefined, it's the devIMG. Otherwise, it's the FileReader object.
    // We set the devIMG flag if there's a devIMG in the HTML file. If there is, we can call initAppObj right away to populate the dimViewers. If not, we have to wait till the Filereader image loads before we can populate its dimViewers.
    let devIMG = '';
    // !VA  If getCurImg is called from initApp then there's no curImg yet - this is the flag that we're in devMode and it's why we're not using appRegions.curImg here.
    if (curImg) {
      // console.log('getCurImg: USER mode');
      devIMG = false;
    } else {
      // console.log('getCurImg: DEV mode');
      //hide the drop area
      appRegions.dropArea.style.display = 'none';
      //show clipboard-but
      dimViewers.clipboardBut.style.display = 'block';
      // Put the devIMG in #main-img in curImg

      // !VA Replaced with object at init
      // curImg = document.getElementById('main-img');
      // !VA Get the filename of devIMG strip off the path so we can put it in appObj.filename
      var imgPath = appRegions.curImg.src;
      var pathArray =imgPath.split( '/' );
      fileName = pathArray[pathArray.length - 1];
      devIMG = true;
    }

    // !VA I'm doing this twice, see the if/then above...
    //Hide drop-area
    appRegions.dropArea.style.display = 'none';
    //hide the clipboard but until an image is selected
    dimViewers.clipboardBut.style.display = 'block';

    // !VA Up to this point, there is no main-img because it's not defined in index.html. The main-img is created using the binary image data in e.target.result in the Filereader function.
    // Create the container div
    const curImgDiv = document.createElement('div');
    
    // Assign an id to the new div -- we're not adding this to an object because it's created here and is only used here. NOTE: These containers divs don't appear in devMode when the curImg is accessed from the index.html 
    curImgDiv.id = 'main-img-container';
    // Insert main-img-container into the existing main-image
    document.getElementById('main-image').insertBefore(curImgDiv, null);
    // !VA insert main-img-container into the newly-created main-img-container
    document.getElementById('main-img-container').insertBefore(appRegions.curImg, null);
    // Create the image object and read in the binary image from the FileReader object.
    // This allows access of image properties. You can't get image properties from a FileReader object -- it's just a blob' 

    // !VA  We put the appObj init into a separate function and make two calls - one without onload for the devIMG (since it's already loaded when the HTML file loads) and one for after the Filereader curImg has loaded.
    if (devIMG === true) {
      // Run initAppObj
      initAppObj(appRegions.curImg, fileName);
      return;
    } else {
      // Once curImg has loaded, populate its appObj
      appRegions.curImg.onload = function () {
        initAppObj(curImg, fileName);
      };
    }
  }

  function initAppObj(curImg, fileName) {
    // Initialize the appObj object which contains all the data for image (main-img), viewer (main-image-viewer) , viewport (image-viewport) and appContainer (app-container)
    // console.dir(appObj);

    
    // Make variables for the HTML elements
    // !VA   Shouldn't need this anymore since we put them all in objects at initialization
    // appRegions.imgViewer = document.getElementById('main-image-viewer');
    // appRegions.imgViewport = document.getElementById('image-viewport'); 
    // appRegions.appContainer = document.getElementById('app-container');

    // Put the dimensions of the current image into properties of the appObj object
    appObj.imgNW = curImg.naturalWidth;
    appObj.imgNH = curImg.naturalHeight;
    appObj.filename = fileName;
    // // !VA set the viewerW and viewerH to the default init values
    // appObj.viewerW = 650;
    // appObj.viewerH = 500;


    // !VA This isn't necessary here, but will probably be used somewhere else...
    const maxViewerWidth = (parseInt(window.getComputedStyle(appRegions.appContainer,null).getPropertyValue('width'), 10)) - 48;

    // Using the current image dimensions, set the size of the viewer based on the following criteria:
    // !VA This can probably be recoded for efficiency but it works for now 
    switch(true) {
    // The image falls within the default viewer dimensions set in initApp, so do nothing.
    // !VA This case is irrelevant since we're now comparing everything to maxViewerWidth not the  init values. Change accordingly...
    // !VA  NOT SO...now we're trying to restore the previous functionality so...
    case (appObj.imgNW <= appObj.viewerW) && (appObj.imgNH < appObj.viewerH) :
      // console.log('CASE 1');
      
      appObj.imgW = appObj.imgNW;
      appObj.imgH = appObj.imgNH;
      // !VA viewerH is set in initApp, so no change to it here
      // !VA viewerH is set in initapp, so no change to that here either.
      // !VA We don't need to adjust height...but maybe we do for consistency's sake
      [appObj.viewerH, appObj.viewportH, appObj.appContainerH] = adjustHeights(appObj.imgH);
      // !VA This looks good...
      break;

    // The image is wider than the current viewer width but shorter than current viewer height, so resize the image based on the viewer width
    case (appObj.imgNW > appObj.viewerW) && (appObj.imgNH < appObj.viewerH) :
      // console.log('CASE 2');
      // Set the image width to the current viewer
      appObj.imgW = appObj.viewerW;
      // Get the image height from the aspect ration function
      appObj.imgH = Math.round((1/getAspectRatio(appObj.imgNW, appObj.imgNH)[0]) * appObj.imgW);
      // Set the viewerH to the imgH
      appObj.viewerH = appObj.imgH;
      [appObj.viewerH, appObj.viewportH, appObj.appContainerH] = adjustHeights(appObj.imgH);
      // !VA Looks good...
      break;

    // The image is not as wide as the current viewer width, but is taller than the viewer height. Keep the image width but resize the viewer in order to display the full image height
    // !VA This might be a problem with consecutive images without page refresh
    case (appObj.imgNW <= appObj.viewerW) && (appObj.imgNH > appObj.viewerH) :
      // console.log('CASE 3');
      // Set the viewer height and the image height to the image natural height
      appObj.viewerH = appObj.imgH = appObj.imgNH;
      // Set the image width to the natural image width
      appObj.imgW = appObj.imgNW;

      // !VA  Use adjustHeights to get the appObj height
      // !VA  Note the dependency with initAppObj, see 'Dependency with adjustHeights'
      [appObj.viewerH, appObj.viewportH, appObj.appContainerH] = adjustHeights(appObj.imgH);
      // !VA 
      break;

    // The image is wider and taller than the current viewer height and width so we have to resize the image and the viewport based on the current viewport width
    case (appObj.imgNW > appObj.viewerW) && (appObj.imgNH > appObj.viewerH) :
      // console.log('CASE 4');
      // Set the image Width to the current  viewer width 
      appObj.imgW = appObj.viewerW;
      // Set the image height proportional to the new image width using the aspect ratio function
      appObj.imgH = Math.round((1/getAspectRatio(appObj.imgNW, appObj.imgNH)[0]) * appObj.imgW);
      // Set the viewer height to the image height
      appObj.viewerH = appObj.imgH;

      // Get the viewport and appObj height from adjustHeights
      [appObj.viewerH, appObj.viewportH, appObj.appContainerH] = adjustHeights(appObj.imgH);
      // !VA  BUG Problem with the 800X550, 800X600 -- no top/bottom gutter on viewport
      break;
    }

    // Set the placeholder of #main-image-viewer-wdth to appObj.viewerW
    // !VA This should be done in resetPlaceholders
    toolButtons.viewerWidth.placeholder = appObj.viewerW;

    // Set the viewport height and app container height as defined in adjustHeights. Note: Dependency with adjustHeights


    appRegions.curImg.style.width = intToPx(appObj.imgW);
    appRegions.curImg.style.height = intToPx(appObj.imgH);
    // !VA We're not resizing this anymore -- the viewer is independent of the image size.
    appRegions.imgViewer.style.height = intToPx(appObj.viewerH);
    // imgViewer.style.width = intToPx(appObj.viewerW);
    appRegions.imgViewport.style.height = intToPx(appObj.viewportH);
    appRegions.appContainer.style.height = intToPx(appObj.appContainerH);

    // Call the function to populate the dimViewers with the appObj data
    refreshDimViewers(appObj, dimViewers); 
  }



  // !VA This is where we get the appObj data from the toolButtons. In the old code all these operations are spread out in various functions -- we need them all in one place.
  function refreshAppObj(e) {

    // console.log('In refreshAppObj');
    // !VA Get the current image, image viewer, and image viewport since we will be resizing them in this block. 

    // !VA 03.18.18 Shouldn't need these declarations anymore since these are all initialized as objects.
    // const curImg = document.getElementById('main-img');
    // const imgViewer = document.getElementById('main-image-viewer');
    // const imgViewport = document.getElementById('image-viewport'); 
    // const appContainer = document.getElementById('app-container');
    // Initialize variables for input/button target, the key and input value of the click/press event, and the increment and sign for the grow/shrink button
    // getFocus(e);
    let keyPressed;
    let isErr;
    // !VA ResetVal is the value before the user action to change it, so the value can be reset and the change cancelled if an error is thrown. Not sure if resetVal is necessary, see below
    // VA! Looks like we don't need resetVal...
    let resetVal;
    let increm;
    let sign;
    // This is the user-initiated changed value. It is passed to errorHandler for validation
    let inputVal;
    // !VA the below is only if I implement aspect unlocking
    // const lockAspect = true;
    // !VA 
    // Use the aspect ratio function to get the aspect ratio of the image. Remember to use the natural dimensions imgNW and imgNH to calculate aspect because if you're iterating with the buttons using the display image dimensions, the resulting aspect ratio after each object resize will change and that change will accumulate exponentially every iteration.
    const aspect = getAspectRatio(appObj.imgNW, appObj.imgNH)[0];
    // Here we handle all the input from the toolButtons. Setting up one case for the toolbar buttons and another for user input, because the user input has to be validated.
    // !VA FUNKY -- wondering whether there's a better way to conditionally access these objects than using the id string...
    switch (true) {

    // Handle the grow and shrink buttons
    case (this.id.includes('grow') || this.id.includes('shrink')):
      // Get whether it's a shrink or grow toolButton based on if 'grow' is in the id
      sign = this.id.includes('grow');
      // get the last two characters of the id
      increm = this.id.slice(-2);
      // convert those last two digits to integer to strip the leading zero
      increm = Number(increm);
      // If sign is false, then it's the decrement button, so switch the sign
      if (sign === false) {increm = -increm;}
      // Get the button increment as appObj.imgW and calculate appObj.imgH using the getAspectRatio function. 
      // Set the pre-change value to resetVal so we can restore if the user-initiated value fails error checking.
      resetVal = appObj.imgW;
      // Add the change increment to the current image width and put it in inputVal for error checking
      inputVal = parseInt(appObj.imgW) + increm;
      // If the call to errorHandler returns true, quit -- the error message is displayed by the error handler. I'm not even sure resetVal is necessary since we're quitting before appObj.imgW was reassigned.
      if (errorHandler(this.id, inputVal)) {
        return;
      }
      appObj.imgW = inputVal;
      // !VA Use Math.round instead of Math.floor for now to get an height integer from the aspect ratio function
      appObj.imgH = Math.round((1/aspect) * appObj.imgW);
      break;

    // Handle the user input fields in the toolbar
    case (this.id.includes('custom-wdth') || this.id.includes('custom-hght') || this.id.includes('viewer-wdth') || this.id.includes('phones-wdth')) :
      // Include support for KeyboardEvent.key in addition to which and keyCode
      // !VA the keyPressed only handles the return key -- need to handle the target's blur as well.
      // !VA NOW -- Only support entry on keypress, otherwise it gets very complicated. So on blur, the field value reverts to the original value before the new value was entered. This is the way it should behave and it's the way it behaves for viewerW but currently not for imgW or imgH
      keyPressed = e.which || e.keyCode || e.key;
      console.log('keyPressed is: ' + keyPressed);
      if (keyPressed === 13) { // 13 is enter
        // Read the input value into inputVal
        // console.log('keyPressed is: ' + keyPressed); 
        // console.dir(e);
        inputVal = this.value;


        // The input is still a string, so convert to number
        // inputVal = parseInt(inputVal);
        // !VA Confirm that inputVal is now a number
        // var x = typeof(inputVal);
        // console.log('x is: ' + x);
        switch(true) {
        
        // Resize the viewer based on the user input 
        case (this.id === 'main-image-viewer-wdth'):
          // Save the current width in case reset is necessary
          // console.log('Case 1: appObj.viewerW is: ' + appObj.viewerW);
          // !VA We don't need any resetVal here because we're not setting appObj.viewerW until it's passed error checking, if we need to reset due to error, we just just appObj.viewerW
          // resetVal = appObj.viewerW;
          // Get the user-defined viewer width and resize the viewer
          // !VA First, test for integer
          isErr =  validateInteger(inputVal);
          // console.log('isErr is: ' + isErr);
          // !VA NOW, now I just need to integrate the validateInteger function back into the errorHandler and just make separate cases for everything and call it from them instead of trying to kill all the integer validations with one function call.
          if (isErr) {
            this.id.value = '';
            resetPlaceholders(this.id);
            return;
          }
          isErr = errorHandler(this.id, inputVal);
          if (isErr) {
            this.id.value = '';
            resetPlaceholders(this.id);
            return;
          }

          appObj.viewerW = inputVal;
          [appObj.viewerH, appObj.viewportH, appObj.appContainerH] = adjustHeights(appObj.imgH);
          break;

        // Process the image width and height inputs here separately from the viewer width
        case (this.id === 'main-img-custom-wdth'):
          // Save the current width in case reset is necessary
          console.log('Case 2: appObj.imgW is: ' + appObj.imgW);
          // !VA We don't need any resetVal here because we're not setting appObj.imgH until it's passed error checking, if we need to reset due to error, we just just appObj.imgH
          // resetVal = appObj.imgW;
          // !VA First, test for integer
          isErr =  validateInteger(inputVal);
          // console.log('isErr is: ' + isErr);
          // !VA NOW, now I just need to integrate the validateInteger function back into the errorHandler and just make separate cases for everything and call it from them instead of trying to kill all the integer validations with one function call.
          if (isErr) {
            this.id.value = '';
            resetPlaceholders(this.id);
            return;
          }
          isErr = errorHandler(this.id, inputVal);
          if (isErr) {
            this.id.value = '';
            resetPlaceholders(this.id);
            return;
          }

          // Use the inverse of the aspect here to get the image height
          appObj.imgW = inputVal;
          appObj.imgH = Math.round((1/aspect) * appObj.imgW);
          // If the resulting image height is greater than the current viewer height, make them equal.
          if (appObj.imgH > appObj.viewerH) {
            // !VA Using ES6 destructuring here
            // !VA  Note the dependency with initAppObj, see 'Dependency with adjustHeights'
            [appObj.viewerH, appObj.viewportH, appObj.appContainerH] = adjustHeights(appObj.imgH);
            
            appObj.viewerH = appObj.imgH;
          }
        
          break;
        case (this.id === 'main-img-custom-hght'):
          // console.log('CASE 3');
          // console.log('inputVal is: ' + inputVal);
          
          // !VA First, test for integer
          isErr =  validateInteger(inputVal);
          // console.log('isErr is: ' + isErr);
          // !VA NOW, now I just need to integrate the validateInteger function back into the errorHandler and just make separate cases for everything and call it from them instead of trying to kill all the integer validations with one function call.
          if (isErr) {
            this.id.value = '';
            resetPlaceholders(this.id);
            return;
          }

          // User entered value into height field
          // !VA  Since we're testing the image width to see if it exceeds the viewer width, we convert the user-entered height (inputVal) value to width (checkWidth) using aspect. Then we pass that checkWidth value to errorHandler
          var checkWidth = Math.round((aspect) * inputVal);
          // !VA CAUTION
          isErr = errorHandler(this.id, checkWidth);
          if (isErr) {
            this.id.value = '';
            resetPlaceholders(this.id);
            return;
          }
          // The user-entered height yields an image width that doesn't exceed the viewer width, so we update the image
          appObj.imgH = inputVal;
          appObj.imgW = Math.round((aspect) * appObj.imgH);

          break;
        case (this.id.includes('small-phones-wdth')):

          // !VA First, test for integer
          isErr =  validateInteger(inputVal);
          // console.log('isErr is: ' + isErr);
          // !VA NOW, now I just need to integrate the validateInteger function back into the errorHandler and just make separate cases for everything and call it from them instead of trying to kill all the integer validations with one function call.
          if (isErr) {
            this.id.value = '';
            resetPlaceholders(this.id);
            return;
          }

          isErr = errorHandler(this.id, inputVal);
          if (isErr) {
            this.id.value = '';
            resetPlaceholders(this.id);
            return;
          }
          appObj.sPhoneW = inputVal;
          toolButtons.sPhoneWidth.value = appObj.sPhoneW;
          // toolButtons.sPhoneWidth.placeholder = appObj.sPhoneW;
          // toolButtons.sPhoneWidth.value = inputVal;
          break;

        case (this.id.includes('large-phones-wdth')):
          // !VA First, test for integer
          isErr =  validateInteger(inputVal);
          // console.log('isErr is: ' + isErr);
          // !VA NOW, now I just need to integrate the validateInteger function back into the errorHandler and just make separate cases for everything and call it from them instead of trying to kill all the integer validations with one function call.
          if (isErr) {
            this.id.value = '';
            resetPlaceholders(this.id);
            return;
          }

          isErr = errorHandler(this.id, inputVal);
          if (isErr) {
            this.id.value = '';
            resetPlaceholders(this.id);
            return;
          }
          appObj.lPhoneW = inputVal;
          // console.log('appObj.lPhoneW is: ' + appObj.lPhoneW);

        }
        break;
      }
    }
    // Resize width and height of image and viewer, and height of viewPort
    appRegions.curImg.style.width = intToPx(appObj.imgW);
    appRegions.curImg.style.height = intToPx(appObj.imgH);
    appRegions.imgViewer.style.width = intToPx(appObj.viewerW);
    appRegions.imgViewer.style.height = intToPx(appObj.viewerH);
    appRegions.imgViewport.style.height = intToPx(appObj.viewportH);
    appRegions.appContainer.style.height = intToPx(appObj.appContainerH);

    // console.dir(appObj);
    refreshDimViewers(appObj, dimViewers);
  }
  // INITIALIZATION FUNCTIONS end


  function showDimensionAlerts() {
    // console.dir(appObj);

    // !VA Need to reset all these font colors each time this is called
    for (const key of Object.keys(dimViewers)) {
      const val = dimViewers[key];
      val.style.color = 'rgba(255, 255, 255, 0.5)';
    }
    // !VA Don't use case/switch here because the each condition can be fulfilled separately
 
    if ((appObj.imgW > appObj.imgNW) || (appObj.imgH > appObj.imgNH)) {
      dimViewers.display.style.color = 'red';
    }
    // !VA  If the display size is smaller than the small phone width
    // !VA Wrong -- if the small phone width is more than 2X the natural width...alert
    if (( 2 * appObj.sPhoneW) > appObj.imgNW )  {
      dimViewers.smallphones.style.color = 'red';
      dimViewers.largephones.style.color = 'red';
    }
    // !VA Wrong -- if the large phone width is more than 2X the natural width...alert
    if (( 2* appObj.lPhoneW) > appObj.imgNW )  {
      dimViewers.largephones.style.color = 'red';
    }
    // !VA  If the image on disk is large enough to display at retina resolution
    if (appObj.imgNW < (2 * appObj.imgW ))  {
      dimViewers.diskimg.style.color = 'red';
    }

  }







  // OBJECT AND DISPLAY REFRESH FUNCTIONS
  // This is where we pass in the recalculated appObj data and update the onscreen display of the AppObject data in the dimViewers 
  function refreshDimViewers(appObj, dimViewers) {
    // The page has been initialized but no image has been selected yet, so set all the dimViewers to No Image.
    if (!appObj.filename) {
      dimViewers.filename.innerHTML = '';
      dimViewers.display.innerHTML = dimViewers.diskimg.innerHTML = dimViewers.aspect.innerHTML = dimViewers.smallphones.innerHTML = dimViewers.largephones.innerHTML = dimViewers.retina.innerHTML =  `<span class='pop-font'>&nbsp;&nbsp;No Image</span>`;
      return;
    } else {
      // Filename
      dimViewers.filename.innerHTML = appObj.filename;
      // Current image display dimensions
      dimViewers.display.innerHTML = `<span class='pop-font'><span id="display-size-width">${appObj.imgW}</span> X <span id="display-size-height">${appObj.imgH}</span></span>`;
      // !VA Dimensions on disk, i.e. natural dimensions
      dimViewers.diskimg.innerHTML = `<span class='pop-font'>${appObj.imgNW} X ${appObj.imgNH}</span>` ;
      // Aspect ratio
      dimViewers.aspect.innerHTML = `<span class='pop-font'>${getAspectRatio(appObj.imgNW, appObj.imgNH)[1]}</span>` ;
      // Small phone dimensions
      // VA! Calculate the height of the image if the width is whatever the small device width is, here 320 pixels
      // !VA  ALL these values need to be put in a global object
      // 
      // // !VA use object instead const smallphonewidth = 320;
      appObj.sPhoneH = Math.round(appObj.sPhoneW * (1 / getAspectRatio(appObj.imgNW, appObj.imgNH)[0]));
      dimViewers.smallphones.innerHTML = `<span class='pop-font'><span id='small-phones-width'>${appObj.sPhoneW}</span> X <span id='small-phones-height'>${appObj.sPhoneH}</span></span>` ;
      // Large phone dimensions
      // Calculate the height of the image if the width is whatever the large device width is, here 480 pixels
      // !VA use object instead const largephonewidth = 480;
      appObj.lPhoneH = Math.round(appObj.lPhoneW * (1 / getAspectRatio(appObj.imgNW, appObj.imgNH)[0]));
      dimViewers.largephones.innerHTML = `<span class='pop-font'><span id='large-phones-width'>${appObj.lPhoneW}</span> X <span id='large-phones-height'>${appObj.lPhoneH}</span></span>` ;
      // Retina dimensions are twice the display dimensions
      dimViewers.retina.innerHTML = `<span class='pop-font'>${2 * appObj.imgW}</span> X <span class='pop-font'>${2 * appObj.imgH}`;

      // !VA Show the dimension alerts if an image too large or small...
      showDimensionAlerts();


      return appObj, dimViewers;
    }
  }

  function adjustHeights(heightVal) {
    // 
    // console.log('heightVal is: ' + heightVal);
    // console.log('adjustHeights appObj is: ');
    // console.dir(appObj);
    let viewerH;
    let viewportH;
    let appContainerH; 

    // !VA These values still seem arbitrary, need to review. There's a dependency in initAppObj, see 'Dependency with adjustHeights'
    // !VA I'm not even sure this is necessary since we're getting the viewerW from maxViewerHeight now -- but we'll leave it in here for the time being.
    if (heightVal <= appObj.initViewerH) {
      // !VA  This is the min-height set in CSS
      // appObj.appContainerH = 804;
      // !VA Trying to set the viewerH based on the initViewerH...
      viewerH = appObj.initViewerH;
      viewportH = viewerH + 145;
    } else {
      // Need a little buffer in the viewport
      viewerH = heightVal;
      viewportH = heightVal + 145;
    }


    // viewportH = heightVal + 125;
    appContainerH = viewportH;
    return [viewerH, viewportH, appContainerH];
  }

  // CCPF - CLIPBOARD FUNCTIONS
  function toggleCCP() {
    // Toggle class 'active' to ccp
    appRegions.ccpContainer.classList.toggle('active');

    // !VA Displaying all the programmatically-populated options here for now
    var tableMaxWidth = `'<option>${appObj.viewerW}</option><option>100%</option>'`;
    document.getElementById('table-width-select').innerHTML = tableMaxWidth;
    document.getElementById('table-max-width').style.display = 'none';

    var imgMaxWidth = `'<option>${appObj.imgW}</option><option>100%</option>'`;
    document.getElementById('img-width-select').innerHTML = imgMaxWidth;
    document.getElementById('img-max-width').style.display = 'none';
  }

  // !VA Function for showing/hiding the CCP max-width select field based on the user selection in the width field.
  function handleOnChange(e) {
    // !VA Get whether the placeholder width or 100% is selected in the select field
    let index = e.target.selectedIndex;
    // !VA This will be the placeholder value that's shown in the max-width field if 100% isn't selected
    let plchldr;
    // !VA The select field that gets the user input -- either the image or table fieldset 
    let el;
    // !VA The max-width input field -- these are disabled for now.
    let inputel;
    switch(true) {
    case (e.target.id === 'img-width-select'):
      el = document.getElementById('img-max-width');
      inputel = document.getElementById('img-max-width-input');
      plchldr = `${appObj.imgW}`;

      break;
    case (e.target.id === 'table-width-select'):
      el = document.getElementById('table-max-width');
      inputel = document.getElementById('table-max-width-input');
      plchldr = `${appObj.viewerW}`;
      break;
    }

    if (index === 0) {
      // !VA The selected value is the placeholder value -- either imgW or viewerW
      el.style.display = 'none';
    } else {
      // !VA  The user has selected 100% for width -- show max-width CSS
      el.disabled = true;
      inputel.placeholder = plchldr;
      inputel.disabled = true;
      // el.input.placeholder = plchldr;
      el.style.display = 'block';
    }
  }

  // // !VA Get the user input from the CCP - This is where we get either the default options OR whatever CCP options are set by the user. Once we have it, we use it to create the HTML parameter strings that will build the Clipboard output.
  function ccpGetUserInput() {
    // !VA -- The pattern below will apply to all the ccpSelection/ccPropStrings pairs that take a user field input
    // !VA First, set a value here for debugging, since Chrome steals the focus and won't let you input one
    // ccpUserInput.imgClass.value = 'myclass';
    // debugger;


    // !VA  determine whether there's a value --
    // if (ccpUserInput.imgAnchor.checked) { 
    //   ccpPropStrings.imgAnchorOpen = '<a href="#">';
    //   ccpPropStrings.imgAnchorClose = '</a>';
    // } else {
    //   ccpPropStrings.imgAnchorOpen = ccpPropStrings.imgAnchorClose = '';
    // }
      


    if (ccpUserInput.imgClass.value) {
      // !VA If so, add the HTML property to the string that builds the clipboard output
      ccpPropStrings.imgClass = ' class="' + ccpUserInput.imgClass.value + '"';
      // console.log('ccpUserInput.imgClass.value is: ' + ccpUserInput.imgClass.value);
    } else {
      // !VA Otherwise, add no string so the property won't appear in the tag.
      ccpPropStrings.imgClass = '';
    }

    // Same structure as ccpUserInput.imgClass above
    if (ccpUserInput.imgAlt.value) {
      ccpPropStrings.imgAlt = ' alt="' + ccpUserInput.imgAlt.value + '"';
    } else {
      ccpPropStrings.imgAlt = '';
    }

    
    // !VA If the user explicitly selects a value for the image align property, then include it. Otherwise, don't include the align property in the clipboard output -- this is the default. 
    if (ccpUserInput.imgAlign.selectedIndex === 0) {
      ccpPropStrings.imgAlign = '';
    } else {
      ccpPropStrings.imgAlign = ' align="' + ccpUserInput.imgAlign.value + '"';
    } 

    // !VA The default is img/ but the user can change it or delete the value. If the value is deleted, then don't include any path -- in this case the images are in the same folder as the source HTML file.
    if (ccpUserInput.imgRelPath.value) {
      ccpPropStrings.imgRelPath = ccpUserInput.imgRelPath.value;
    } else {
      ccpPropStrings.imgRelPath = '';
    }

    // !VA The default is to put the current image display width as the default here. If the user chooses a width of 100%, then the 
    if (ccpUserInput.imgWidth.selectedIndex === 0) {
      // !VA width is viewerW
      ccpPropStrings.imgWidth = ' width="' + appObj.imgW + '"';
      ccpPropStrings.imgMaxWidth = '';
    } else {
      ccpPropStrings.imgWidth = ' width="100%"';
      ccpPropStrings.imgMaxWidth = ' max-width: ' + appObj.imgW + 'px; '; 
    }



    if (ccpUserInput.tdClass.value) {
      ccpPropStrings.tdClass = ' class="' + ccpUserInput.tdClass.value + '"';
    } else {
      ccpPropStrings.tdClass = '';
    }

    if (ccpUserInput.tdAlign.selectedIndex == 0) {
      ccpPropStrings.tdAlign = '';
    } else {
      ccpPropStrings.tdAlign = ' align="' + ccpUserInput.tdAlign.value + '"';
    }


    if (ccpUserInput.tdValign.selectedIndex == 0) {
      ccpPropStrings.tdValign = '';
    } else {
      ccpPropStrings.tdValign = ' valign="' + ccpUserInput.tdValign.value + '"';
    }


    // !VA Not an input element
    // ccpPropStrings.tdAlign = ' align="' + ccpUserInput.tdAlign.value + '"';
    // !VA Not an input element
    // ccpPropStrings.tdValign = ' valign="' + ccpUserInput.tdValign.value + '"';
    
    if (ccpUserInput.tableClass) {
      ccpPropStrings.tableClass = ' class="' + ccpUserInput.tableClass.value + '"';
    } else {
      ccpPropStrings.tableClass = '';
    }

    // !VA Not an input element
    ccpPropStrings.tableAlign = ' align="' + ccpUserInput.tableAlign.value + '"';

    // !VA get the value in the width select field -- need to display it first as it's going to be either the viewerW or 100% and need to add it to the ccPropStrings object.

    if (ccpUserInput.tableWidth.selectedIndex === 0) {
      // !VA width is viewerW
      ccpPropStrings.tableWidth = ' width="' + appObj.viewerW + '"';
    } else {
      ccpPropStrings.tableWidth = ' width="100%" style="max-width: ' + appObj.viewerW + 'px"';
    }
    return ccpUserInput, ccpPropStrings;
  }

  function showMobileImageButtons(e) {
    // console.log('e is: ' + e);
    // console.log('this is: ' + this);
    let target = this.id;
    let inputVal = this.value;
    // console.log('showMobileImageButtons: target is: ' + target);
    // console.log('showMobileImageButtons: inputVal is: ' + inputVal);

    // !VA  Test upon any input into any of these three fields if there is a value. If it's a keypress then of course there will be a value. But if it's a blur, then it means the user had an entry in one of the fields, and either deleted it or restored it to the default.
    // !VA Don't show CSS buttons for alt and rel path because they aren't CSS properties copied to the clipboard
    if ( ccpUserInput.imgClass.value) {
      ccpBuildTag.imgBuildCSSBut.classList.add('active');
      ccpBuildTag.smallPhonesBuildCSSBut.classList.add('active');
      ccpBuildTag.largePhonesBuildCSSBut.classList.add('active');
    } 
    else {

      ccpBuildTag.imgBuildCSSBut.classList.remove('active');
      ccpBuildTag.smallPhonesBuildCSSBut.classList.remove('active');
      ccpBuildTag.largePhonesBuildCSSBut.classList.remove('active');
    }
    let obj =  ccpGetUserInput();
    // console.dir(obj);

  }


  // Clipboard output for build html image button
  // !VA Error handling here is awful -- there's a lot of repetition but I can't deal with it now, have to move on
  new Clipboard('#img-build-html-but', {
    text: function(trigger) {
      // !VA First, get the CCP options
      // !VA DEV ONLY -- only assigning obj in case we need to log it to console 
      let obj = ccpGetUserInput();
      // console.dir(obj);
      // !VA If a class name was entered, sending className as target and the user-input class name as the inputVal to errorHandler
      if (ccpUserInput.imgClass.value) {
        // !VA If the error handler returns true, show message and abort
        if (errorHandler('className', ccpUserInput.imgClass.value)) {
          return;
        }
      }
      if (ccpUserInput.imgRelPath.value) {
        // !VA If the error handler returns true, show message and abort
        if (errorHandler('imgRelPath', ccpUserInput.imgRelPath.value)) {
          return;
        }
      }
      // !VA If the class name is valid, continue...
      
      // console.log('ccpUserInput.imgWidth.selectedIndex is: ' + ccpUserInput.imgWidth.selectedIndex);
  

      // !VA handle the user input for the width select box -- if the value is 100%, add the max-width css attribute option to the CCP 
      var fullWidthSelected;
      var widthHTMLAttribute;
      var widthCSSProperty;
      if (ccpUserInput.imgWidth.selectedIndex === 1) {
        fullWidthSelected = true; 
        widthHTMLAttribute = '100%';
        widthCSSProperty = 'max-width: ' + appObj.imgW;
      } else {
        fullWidthSelected = false;
        widthHTMLAttribute = appObj.imgW;
        widthCSSProperty = 'width: ' + appObj.imgW;
      }
     
   
      // console.log('fullWidthSelected is: ' + fullWidthSelected);

      // !VA Assigning variables to those properties that only are included if the user enters them or if there is a default value for them. 

      // !VA Build the clipboard
      // let imgClipboardOutput = `${ccpPropStrings.imgAnchorOpen}<img${ccpPropStrings.imgClass}${ccpPropStrings.imgAlign}${ccpPropStrings.imgAlt} width="${widthHTMLAttribute}" height="${appObj.imgH}" src="${ccpPropStrings.imgRelPath}/${appObj.filename}" border="0" style="${widthCSSProperty}px; height: ${appObj.imgH}px; margin: 0px; border: none; outline: none; text-decoration: none; display: block; ">${ccpPropStrings.imgAnchorClose}`;

      
      let imgClipboardOutput = `<img${ccpPropStrings.imgClass}${ccpPropStrings.imgAlign}${ccpPropStrings.imgAlt} width="${widthHTMLAttribute}" height="${appObj.imgH}" src="${ccpPropStrings.imgRelPath}/${appObj.filename}" border="0" style="${widthCSSProperty}px; height: ${appObj.imgH}px; margin: 0px; border: none; outline: none; text-decoration: none; display: block; ">`;
      
      // !VA Handle the anchor checkbox -- if the box is checked, wrap the clipboard output in an a tag.
      if (ccpUserInput.imgAnchor.checked) { 
        imgClipboardOutput = '<a href="#">' + imgClipboardOutput + '</a>';
      } 





      // !VA We show the message in the message field, but no can do without converting the angle brackets to HTML entities, otherwise the browser sees the <img> tag  as an actual element.
      var mess = convBracketsToEntities(imgClipboardOutput);
      mess = '&lt;img&gt; copied to Clipboard!';
      showMessage(mess, false);
      // !VA DEV ONLY - including the clipboard output in the message area just to make sure it is outputting
      console.log('Clipboard: ' + imgClipboardOutput);
      return imgClipboardOutput;
    }
  });

  // Clipboard output for build html TD button
  new Clipboard('#td-build-html-but', {
    text: function(trigger) {
      // !VA DEV ONLY -- only assigning obj in case we need to log it to console 
      let obj = ccpGetUserInput();

      // !VA If a class name was entered, sending className as target and the user-input class name as the inputVal to errorHandler
      if ((ccpUserInput.imgClass.value) || (ccpUserInput.tdClass.value))  {
        // !VA If the error handler returns true, show message and abort
        if (errorHandler('className', ccpUserInput.imgClass.value)) {
          return;
        }
        if (ccpUserInput.imgRelPath.value) {
          // !VA If the error handler returns true, show message and abort
          if (errorHandler('imgRelPath', ccpUserInput.imgRelPath.value)) {
            return;
          }
        }
        if (errorHandler('className', ccpUserInput.tdClass.value)) {
          return;
        }
      }
      // !VA If the class names are is valid, continue...

      // !VA Build the clipboard
      let imgClipboardOutput = 
`<td${ccpPropStrings.tdClass}${ccpPropStrings.tdAlign}${ccpPropStrings.tdValign}>
  <img${ccpPropStrings.imgClass}${ccpPropStrings.imgAlign}${ccpPropStrings.imgAlt} width="${appObj.imgW}" height="${appObj.imgH}" src="${ccpPropStrings.imgRelPath}/${appObj.filename}" border="0" style="margin: 0px; border: none; outline: none; text-decoration: none; width: ${appObj.imgW}px; height: ${appObj.imgH}px; display: block; ">
</td>`;
      var mess = convBracketsToEntities(imgClipboardOutput);
      mess = '&lt;td&gt; copied to Clipboard!';
      showMessage(mess, false);
      // !VA DEV ONLY - including the clipboard output in the message area just to make sure it is outputting
      console.log('Clipboard: ' + imgClipboardOutput);
      return imgClipboardOutput;
    }
  });

  // Clipboard output for build html TABLE button
  new Clipboard('#table-build-html-but', {
    text: function(trigger) {

      // !VA DEV ONLY -- only assigning obj in case we need to log it to console 
      let obj = ccpGetUserInput();

      // !VA If a class name was entered, sending className as target and the user-input class name as the inputVal to errorHandler
      if ((ccpUserInput.imgClass.value) || (ccpUserInput.tdClass.value || ccpUserInput.tableClass.value))  {
        // !VA If the error handler returns true, show message and abort
        if (errorHandler('className', ccpUserInput.imgClass.value)) {
          return;
        }
        if (ccpUserInput.imgRelPath) {
          // !VA If the error handler returns true, show message and abort
          if (errorHandler('imgRelPath', ccpUserInput.imgRelPath.value)) {
            return;
          }
        }
        if (errorHandler('className', ccpUserInput.tdClass.value)) {
          return;
        }
        if (errorHandler('className', ccpUserInput.tableClass.value)) {
          return;
        }
      }
      // !VA If the class names are is valid, continue...

      // !VA Build the clipboard
      let imgClipboardOutput = 
`<table border="0" cellpadding="0" cellspacing="0"${ccpPropStrings.tableClass}${ccpPropStrings.tableAlign}${ccpPropStrings.tableWidth}>
  <tbody>
  <tr>
    <td${ccpPropStrings.tdClass}${ccpPropStrings.tdAlign}${ccpPropStrings.tdValign}>
      <img${ccpPropStrings.imgClass}${ccpPropStrings.imgAlign}${ccpPropStrings.imgAlt} width="${appObj.imgW}" height="${appObj.imgH}" src="${ccpPropStrings.imgRelPath}/${appObj.filename}" border="0" style="margin: 0px; border: none; outline: none; text-decoration: none; width: ${appObj.imgW}px; height: ${appObj.imgH}px; display: block; ">
    </td>
  </tr>
  </tbody>
</table>`;
      console.log('Clipboard: ' + imgClipboardOutput);
      var mess = convBracketsToEntities(imgClipboardOutput);
      mess = '&lt;table&gt; copied to Clipboard!';
      showMessage(mess, false);
      // !VA DEV ONLY - including the clipboard output in the message area just to make sure it is outputting
      return imgClipboardOutput;
    }
  });

  // Clipboard output for build CSS IMG button
  new Clipboard('#img-build-css-but', {
    text: function(trigger) {

      // !VA DEV ONLY -- only assigning obj in case we need to log it to console 
      let obj = ccpGetUserInput();

      // !VA If a class name was entered, send className as target and the user-input class name as the inputVal to errorHandler. We don't need imgRelPath or the td or table class name because they're not included in the CSS output
      if (ccpUserInput.imgClass.value)  {
        // !VA If the error handler returns true, show message and abort
        if (errorHandler('className', ccpUserInput.imgClass.value)) {
          return;
        }
      }
      // !VA If the class names are is valid, continue...

      // !VA Build the clipboard using the display width and height
      // !VA 03.18.18 -- All these clipboard objects have to have .value property added to the object
      let imgClipboardOutput = 
`img.${ccpUserInput.imgClass.value} { width: ${appObj.imgW}px !important; height: ${appObj.imgH}px !important; }`;

      console.log('Clipboard: ' + imgClipboardOutput);
      var mess = convBracketsToEntities(imgClipboardOutput);
      mess = 'Image CSS copied to Clipboard!';
      showMessage(mess, false);
      // !VA DEV ONLY - including the clipboard output in the message area just to make sure it is outputting
      return imgClipboardOutput;
    }
  });

  // Clipboard output for build CSS Small Phones button
  new Clipboard('#sphones-build-css-but', {
    text: function(trigger) {

      // !VA DEV ONLY -- only assigning obj in case we need to log it to console 
      let obj = ccpGetUserInput();

      // !VA Use objects - appObj.sPhoneH is calculated from sPhoneW in refreshDimViewers
      // let smallPhonesWidth = document.getElementById('small-phones-width');
      // let smallPhonesHeight = document.getElementById('small-phones-height');

      // !VA If a class name was entered, send className as target and the user-input class name as the inputVal to errorHandler. We don't need imgRelPath or the td or table class name because they're not included in the CSS output
      if (ccpUserInput.imgClass.value)  {
        // !VA If the error handler returns true, show message and abort
        if (errorHandler('className', ccpUserInput.imgClass.value)) {
          return;
        }
      }
      // !VA If the class names are is valid, continue...

      // !VA Build the clipboard
      let imgClipboardOutput = 
`img.${ccpUserInput.imgClass.value} { width: ${appObj.sPhoneW}px !important; height: ${appObj.sPhoneH}px !important; }`;

      console.log('Clipboard: ' + imgClipboardOutput);
      var mess = convBracketsToEntities(imgClipboardOutput);
      mess = 'Small phone CSS copied to Clipboard!';
      showMessage(mess, false);
      // !VA DEV ONLY - including the clipboard output in the message area just to make sure it is outputting
      return imgClipboardOutput;
    }
  });

  // Clipboard output for build CSS Small Phones button
  new Clipboard('#lphones-build-css', {
    text: function(trigger) {

      // !VA DEV ONLY -- only assigning obj in case we need to log it to console 
      let obj = ccpGetUserInput();

      // !VA Use objects -- appObj.lPhoneH is calculated from lPhoneW in refreshDimViewers
      // let largePhonesWidth = document.getElementById('large-phones-width');
      // let largePhonesHeight = document.getElementById('large-phones-height');

      // !VA If a class name was entered, send className as target and the user-input class name as the inputVal to errorHandler. We don't need imgRelPath or the td or table class name because they're not included in the CSS output
      if (ccpUserInput.imgClass.value)  {
        // !VA If the error handler returns true, show message and abort
        if (errorHandler('className', ccpUserInput.imgClass.value)) {
          return;
        }
      }
      // !VA If the class names are is valid, continue...

      // !VA Build the clipboard
      let imgClipboardOutput = 
`img.${ccpUserInput.imgClass.value} { width: ${appObj.lPhoneW}px !important; height: ${appObj.lPhoneH}px !important; }`;

      console.log('Clipboard: ' + imgClipboardOutput);
      var mess = convBracketsToEntities(imgClipboardOutput);
      mess = 'Large phone CSS copied to Clipboard!';
      showMessage(mess, false);
      // !VA DEV ONLY - including the clipboard output in the message area just to make sure it is outputting
      return imgClipboardOutput;
    }
  });




  //MATH FUNCTIONS START
  // Get the aspect ratio as real number and as integer pair. Don't forget this returns an
  // array, whereby 0 is the integer and 1 is the integer pair
  // VA! I got this function verbatim from SO, so I'm not going to bother to comment it
  function getAspectRatio(var1, var2) {
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
  //Get aspect ratio End
  //MATH FUNCTIONS END

  //STRING FUNCTIONS
  // !VA Convert integer to pixel
  function intToPx(int) {
    let pxval
    let str = String(int);
    pxval = str + 'px';
    return pxval;
  }
  //STRING FUNCTIONS



  //FILEREADER OBJECT PROCESSING
  //Get the user-selected image file object 
  function handleFileSelect(evt) {

    // If a file is already being displayed, i.e. appObj.filename is true, then remove that image to make room for the next image being dropped
    if (appObj.filename) {
      // !VA 03.18.18 Don't need the var declaration anymore - it's in the appRegions object
      // var curImg = document.getElementById('main-img');
      appRegions.curImg.parentNode.removeChild(appRegions.curImg);
    }
    // console.log('HANDLEFILESELECT');
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
        curImg.id = 'main-img';
        // !VA assign the blob in e.target.result to the source of the image
        // curImg.src = e.target.result;
        curImg.src = e.target.result;
        let fileName;
        // Read the filename of the FileReader object into a variable to pass to the getCurImage function, otherwise the blob has no name
        fileName = theFile.name;
        // Pass the FileObject i.e. new Image object to the function that gets the image data
        // !VA  03.18.18 Put the curImg created with FileReader in the appRegions object
        appRegions.curImg = curImg;
        getCurImg(curImg, fileName);
      };
    })(f);
    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
    // }
  }
  //FILEREADER OBJECT PROCESSING END

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
  }



  // function startNewDrop() {

  //   if (appObj.filename) {
  //     console.log('appObj.filename is: ' + appObj.filename);
  //     console.log('Already a file here');
  //     var curImg = document.getElementById('main-img');
  //     curImg.parentNode.removeChild(curImg);

  //   } else {
  //     console.log('No file open');
  //   }


  // }

  // Event Listeners for Drag and Drop
  var dropZone = document.getElementById('app-container');
  dropZone.addEventListener('dragover', handleDragOver, false);

  dropZone.addEventListener('drop', handleFileSelect, false);
  // dropZone.addEventListener('drop', startNewDrop, false);
  // Drag and Drop Listener 
  //DRAG AND DROP PROCESSING END

  //EVENT HANDLING START 
  function addEventHandler(oNode, evt, oFunc, bCaptures) {
    //Removing this -- apparently IE 9 and 10 support addEventListener
    // if (typeof(window.event) != "undefined")
    // 	oNode.attachEvent("on"+evt, oFunc);
    // else
    oNode.addEventListener(evt, oFunc, bCaptures);
  }
  
  function initializeHandlers() {
    //Dim Viewer Clipboard Controls
    addEventHandler(dimViewers.clipboardBut,'click',toggleCCP,false);
    addEventHandler(dimViewers.clipboardBut,'keypress',toggleCCP,false);
    // CCP button show and hide
    // !VA NOW -- these should be addEventHandler calls -- but it works for now.
    // ccpUserInput.imgClass.addEventListener('keypress', showMobileImageButtons);
    // ccpUserInput.imgClass.addEventListener('blur', showMobileImageButtons);
    // !VA NOW -- changed the above two to addEventHandler calls -- seems fine.
    addEventHandler(ccpUserInput.imgClass,'keypress',showMobileImageButtons,false);
    addEventHandler(ccpUserInput.imgClass,'blur',showMobileImageButtons,false);
    // !VA alt and path fields should not show the CSS buttons
    // ccpUserInput.imgAlt.addEventListener('keypress', showMobileImageButtons);
    // ccpUserInput.imgAlt.addEventListener('blur', showMobileImageButtons);
    // ccpUserInput.imgRelPath.addEventListener('keypress', showMobileImageButtons);
    // ccpUserInput.imgRelPath.addEventListener('blur', showMobileImageButtons);

    //Image Dimensioning Controls
    addEventHandler(toolButtons.grow01,'click',refreshAppObj,false);
    addEventHandler(toolButtons.shrink01,'click',refreshAppObj,false);
    addEventHandler(toolButtons.grow10,'click',refreshAppObj,false);
    addEventHandler(toolButtons.shrink10,'click',refreshAppObj,false);
    addEventHandler(toolButtons.grow50,'click',refreshAppObj,false);
    addEventHandler(toolButtons.shrink50,'click',refreshAppObj,false);
    addEventHandler(toolButtons.customWidth,'dragover',killDrop,false);
    addEventHandler(toolButtons.customWidth,'drop',killDrop,false);
    addEventHandler(toolButtons.customHeight,'dragover',killDrop,false);
    addEventHandler(toolButtons.customHeight,'drop',killDrop,false);
    addEventHandler(toolButtons.viewerWidth,'dragover',killDrop,false);
    addEventHandler(toolButtons.viewerWidth,'drop',killDrop,false);
    addEventHandler(toolButtons.viewerWidth,'keypress',refreshAppObj,false);
    addEventHandler(toolButtons.viewerWidth,'click',focusOnClick,false);
    // !VA 
    addEventHandler(toolButtons.customWidth,'click',focusOnClick,false);
    addEventHandler(toolButtons.customWidth,'keypress',refreshAppObj,false);
    addEventHandler(toolButtons.customHeight,'click',focusOnClick,false);
    addEventHandler(toolButtons.customHeight,'keypress',refreshAppObj,false);
    addEventHandler(toolButtons.viewerWidth,'blur',handleInputBlur,false);
    addEventHandler(toolButtons.customWidth,'blur',handleInputBlur,false);
    addEventHandler(toolButtons.customHeight,'blur',handleInputBlur,false);
    // !VA NOW
    addEventHandler(toolButtons.sPhoneWidth,'dragover',killDrop,false);
    addEventHandler(toolButtons.sPhoneWidth,'drop',killDrop,false);
    addEventHandler(toolButtons.sPhoneWidth,'keypress',refreshAppObj,false);
    addEventHandler(toolButtons.sPhoneWidth,'blur',handleInputBlur,false);
    addEventHandler(toolButtons.sPhoneWidth,'click',focusOnClick,false);
    addEventHandler(toolButtons.lPhoneWidth,'dragover',killDrop,false);
    addEventHandler(toolButtons.lPhoneWidth,'drop',killDrop,false);
    addEventHandler(toolButtons.lPhoneWidth,'keypress',refreshAppObj,false);
    addEventHandler(toolButtons.lPhoneWidth,'blur',handleInputBlur,false);
    addEventHandler(toolButtons.lPhoneWidth,'click',focusOnClick,false);

    addEventHandler(ccpUserInput.tableWidth,'change',handleOnChange,false);
    addEventHandler(ccpUserInput.imgWidth,'change',handleOnChange,false);



  }
  addEventHandler(window, 'load', function(evt) {initializeHandlers(); } );

  //Kill dropping of icons onto input fields
  function killDrop(e) {
    e = e || event;
    e.preventDefault();
  }

  // handle tabbing out of input fields
  function handleInputBlur(e) {
    // console.log('handleInputBlur: e.target.id is: ' + e.target.id);
    // console.dir(e);
    console.log(e);
    let target = this.id;
    // console.log('target is: ' + target);
    // console.log('handleInputBlur: target is: ' + target);
    // console.log('handleInputBlur: val is:' + val);
    // console.dir(appObj);
    switch(true) {
    case (target === 'main-image-viewer-wdth'):
      resetPlaceholders(target);
      break;
    case (target === 'small-phones-wdth'):
    
    
      break;
    case (target === 'large-phones-wdth'):


      break;
    case (target === 'main-img-custom-wdth'):
      resetPlaceholders(target);
      break;
    case (target === 'main-img-custom-hght'):
      resetPlaceholders(target);
      break;
    }
  }

  function resetPlaceholders(target) {
    // If the cursor is in an image resize field, set the value to no value so that the placeholders take over. Only do this for the image resize fields, because the current value is displayed in the dimViewer and doesn't need to be shown in the field itself. For the viewer width field, we need the value to stay in the field because this is the only way to tell the current width of the viewer. 
    // !VA  viewer width input field value display should also be handled here...currently is not. Search for main-image-viewer-wdth to find out where it's currently handled.

    // !VA NOW 
    switch(true) {
    case (target === 'main-image-viewer-wdth'):
      console.log('target is: ' + target);
      toolButtons.viewerWidth.value = '';
      toolButtons.viewerWidth.placeholder = appObj.viewerW;
      break;
    case (target === 'main-img-custom-wdth'):
      document.getElementById(target).value = '';
      document.getElementById(target).placeholder = 'W (px)';
      break;
    case (target === 'main-img-custom-hght'):
      document.getElementById(target).value = '';
      document.getElementById(target).placeholder = 'H (px)';
      break;
    case (target === 'small-phones-wdth'):
      console.log('resetPlaceholders...');
      // var curObj = document.getElementById('small-phones-wdth');
      // console.dir(curObj);
      // console.log('curObj is: ' + curObj);
      // console.log('curObj.value is: ' + curObj.value);
      // console.log('target is: ' + target);
      document.getElementById(target).value = '';
      document.getElementById(target).placeholder = appObj.sPhoneW;
      break;
    case (target === 'large-phones-wdth'):
      document.getElementById(target).value = '';
      document.getElementById(target).placeholder = appObj.lPhoneW;
      break;
    }

  }

  // !VA  This might be unneeded
  //Reset placeholder values in input fields
  function handleAfterBlur(target) {
    //console.log('target is: ' + target);
    // !VA commented out the below for now
    // getImageData();
    //set value to nothing so placeholder is displayed
    // !VA commented out the below for now
    // resetPlaceholders();
    //display respective placeholder 
    console.log('!VA - Leaving input field...');
    
  }

  // // !VA Needs to be completely revisited
  // function handleToggleRetina(e) {
  //   var target = this;
  //   var img = document.getElementById('main-img');
  //   console.log('img is: ' + img.id);
  //   isActive = toggleMe(target);
  //   console.log('isActive is: ' + isActive);
  //   if (isActive === true) {
  //     img.setAttribute('data-is-retina', true);
  //   } else {
  //     img.setAttribute('data-is-retina', false);
  //   }
  //   var imgW = '';
  //   var imgH = '';
  //   var viewerW = '';
  //   var imgNW = img.naturalWidth;
  //   var imgNH = img.naturalHeight;
  //   console.log('img.getAttribute is: ' + img.getAttribute('data-is-retina'));
  //   if (isActive === true) {
  //     console.log('the condition is true');
  //     imgW = viewerW = parseInt(imgNW / 2);
  //     imgH = parseInt(imgNH / 2);
  //     // viewerW = parseInt(document.getElementById('main-image-viewer').style.width) / 2;
  //     // var viewerH = parseInt(document.getElementById('main-image-viewer').style.height);
  //     //FOO
  //     // var viewerHeight = parseInt(document.getElementById('main-image-viewer').style.height);
  //     // var viewerHeight = imgHeight; 
  //   } else {
  //     imgW = parseInt(img.style.width);
  //     imgH = parseInt(img.style.height);
  //     viewerW = parseInt(document.getElementById('main-image-viewer').style.width);

  //   } 
  //   var imgData = getImageData();
  //   updatePageObjects(imgData);
  // }

  //EVENT HANDLING END

  // !VA Separate error handler for integer validation since that's the only error that's common to all input fields. We need to call it from the respective CASE in refreshAppObj because each CASE has a different reset value that is sent to resetPlaceholders in case the error is true. 


  function validateInteger(inputVal) {
    // !VA Since integer validation is used for all height/width input fields, including those not yet implemented, we're going to use a separate error handler for it, call showMessages from it and return 
    let isErr;
    let mess;
    console.log('in errorHandler...validating integer');
  
    if (!parseInt(inputVal, 10) || inputVal % 1 !== 0 || inputVal < 0) {
      // errorMessages(target, "Width and height must be entered as positive whole number.");
      console.log('not an integer....');
      isErr = true;
      mess = errorMessages('notinteger');
      
      showMessage(mess, isErr);
      
    } else { 
      // !VA Input fields return strings, so convert to integer
      inputVal = parseInt(inputVal);
      isErr = false;
    }
    return isErr;
  }


  // ERROR HANDLING START
  // !VA Input validation
  function errorHandler(target, inputVal) {
    // console.log('enter errorHandler: target is: ' + target);
    // console.log('enter errorHandler: inputVal is: ' + inputVal);
    let isErr = false;
    let mess;
    // !VA First we determine if the input should be an integer and if yes, validate it


    switch(true) {
    // Handle the input for the viewer width field
    case (target.includes('viewer-wdth')):

      // Actual working viewport is 48px less than the width due to the black border
      // console.log('target is: ' + target);
      // console.log('inputVal is: ' + inputVal);
      // console.log('appObj.viewportW is: ' + appObj.viewportW);
      if (inputVal >= appObj.viewportW) {
        console.log('errorHandler appObj.viewportW is: ' + appObj.viewportW);
        console.log('viewerwexceedsviewportw');
        mess = errorMessages('viewerwexceedsviewportw');
        console.log('mess is: ' + mess);
        isErr = true;
      } else if (inputVal < appObj.imgW) {
        console.log('viewerwdeceedsimgw');
        mess = errorMessages('viewerwdeceedsimgw');
        isErr = true;
      }
      resetPlaceholders();
      break;
    // Handle the input for the custom width and height fields
    case (target.includes('custom-wdth') || target.includes('custom-hght')):
      if (inputVal > appObj.viewerW) {
        console.log('imgexceedsviewerwidth');
        mess = errorMessages('imgexceedsviewerwidth');
        isErr = true;
      }
      resetPlaceholders();
      break;
    // Handle the grow and shrink button clicks
    case (target.includes('grow') || target.includes('shrink')):
      if (inputVal > appObj.viewerW) {
        console.log('inputVal: ' + inputVal);
        console.log('appObj.viewerW is: ' + appObj.viewerW);
        console.log('growimgfail');
        mess = errorMessages('growimgfail');
        isErr = true;

      } else if (inputVal < 1 ) {
        console.log('inputVal: ' + inputVal);
        console.log('appObj.viewerW is: ' + appObj.viewerW);
        console.log('shrinkimgfail');
        mess = errorMessages('shrinkimgfail');
        isErr = true;

      }
      break;
    // Handle the input for class names in the CCP
    case (target === 'className'):
      // console.log('Handling CCP class name input...');
      // !VA If the inputVal from the Clipboard object is empty, it's not an error, so return isErr = false to the calling function
      if ( !inputVal ) {
        isErr = false;
      } else if  (!/^[a-z_-][a-z\d_-]*$/i.test(inputVal)) {
      // !VA  This should probably be an OR in the above IF, but we'll leave it like this for now...

        // not a valid class name, show error message and lock inputs down...
        // console.log('errorHandler...not a valid class name ');
        var err = 'invalidclassname';
        ccpUserInput.imgClass = '';
        mess = errorMessages(err);
        isErr = true;
      }
      break;
    case (target === 'imgRelPath'):
      // console.log('Handling CCP relPath input...');
      // !VA If the inputVal from the Clipboard object is empty, it's not an error, so return isErr = false to the calling function
      if ( !inputVal ) {
        // console.log('Input OK');
        isErr = false;
      } else if (!/^[^\\/?%*:|"<>.]+$/i.test(inputVal)) {
      

      // !VA  This should probably be an OR in the above IF, but we'll leave it like this for now...

        // not a valid class name, show error message and lock inputs down...
        console.log('errorHandler...not a valid folder name ');
        // var err = 'invalidclassname';
        // ccpUserInput.imgClass = '';
        // mess = errorMessages(err);
        // isErr = true;
      }
      break;
    case (target === 'small-phones-wdth'):
      if ( inputVal > 320 || inputVal < 260  ) {
        mess = errorMessages('badsmallphoneinput');
        isErr = true;
        resetPlaceholders(target, inputVal);
      }
      break;
    case (target === 'large-phones-wdth'):
      if ( inputVal > 480 || inputVal < 400  ) {
        mess = errorMessages('badlargephoneinput');
        isErr = true;
        resetPlaceholders(target, appObj.lPhoneW);
      }
      break;
    }
    // !VA If the error flag is true, show the error message
    if (isErr) {
      showMessage(mess, true);
    }
    return isErr;
  }

  function errorMessages(err) {
    // console.log('in errorMessages');
    // console.log('err is: ' + err);
    let mess = 'undefined error';
    switch(true) {
    case (err === 'viewerwexceedsviewportw'):
      mess = `Container width can't exceed the width of the viewport.`;
      // return mess;
      break;
    case (err === 'viewerwdeceedsimgw'):
      mess = `Container width can't be smaller than the current image width. <br /> First resize the image, then the viewer.`;
      // return mess;
      break;
    case (err === 'notinteger'):
      mess = 'Image width and height must be entered as positive whole number.';
      // return mess;
      break;
    case (err === 'growimgfail'):
      mess = `Image can't be wider than its container.`;
      // return mess;
      break;
    case (err === 'shrinkimgfail'):
      mess = `Image width can't be less than 0.`;
      // return mess;
      break;
    case (err === 'imgexceedsviewerwidth'):
      mess = `Image width can't be greater than the container width.`;
      // return mess;
      break;
    case (err === 'invalidclassname'):
      mess = `Invalid class name &mdash; please check your entries.`;
      // return mess;
      break;
    case (err === 'badsmallphoneinput'):
      mess = `Small phone device width must be between 260 and 320.`;
      // return mess;
      break;
    case (err === 'badlargephoneinput'):
      mess = `Large phone device width must be between 400 and 480.`;
      // return mess;
      break;
    }

    return mess;
    
  }

  // !VA Used in Clipboard object to convert the brackets in the message variable to html entities for display in the message area, otherwise, the src attribute is read literally and the browser tries to display the image tag
  function convBracketsToEntities(str) {
    // console.log('str is: ' + str);
    str = str.replace(/</g,'&lt;');  //for <
    str = str.replace(/>/g,'&gt;');  //for >
    return str;
  }

  // !VA Function to show error and clipboard notification messages
  function showMessage(mess, isErr) {

    //Set the time the message will display
    let displayTime;
    // Get the elements to manipulate for the error message display
    // !VA  Going to leave these as HTML element references instead of creating an object for them for now since this is the only place the error elements are accessed
    var errViewerContainer = document.getElementById('dim-error-container');
    var errMessContainer = document.getElementById('dim-error-message');
    var dimViewers = document.getElementById('dim-viewers');
    // !VA  03.18.18 Don't need this var anymore, use object
    // var toolsContainer = document.getElementById('tools-container');
    // Put the respective error message in the error message container
    errMessContainer.innerHTML = mess;
    // Swap dimViewers with errMessContainer and drop toolsContainer behind viewport
    errViewerContainer.classList.add('show-err');
    dimViewers.classList.add('show-err');
    appRegions.toolsContainer.classList.add('show-err');
    // !VA If it's an error message, show the error formatting, otherwise, show the message formatting
    if (isErr) {
      document.querySelector('#dim-error-container table td').style.color = '#ff9a9a'; 
      // !VA Show the error message 3 seconds so it can be read
      displayTime = 3000;
    } else {
      document.querySelector('#dim-error-container table td').style.color = '#FFF'; 
      // !VA Flash the copy message 
      // displayTime = 1000;
      // !VA DevOnly! Lengthening this display time while dealing with CCP issues
      displayTime = 1000;

    }
    // hide toolbarButtons


    setTimeout(function(){
      // Swap the error positions back to normal after 3 seconds
      errViewerContainer.classList.add('hide-err');
      dimViewers.classList.add('hide-err');
      appRegions.toolsContainer.classList.add('hide-err');
      errViewerContainer.classList.remove('show-err');
      dimViewers.classList.remove('show-err');
      appRegions.toolsContainer.classList.remove('show-err');
      setTimeout(function(){
        // Remove the hide-err class after the .5 seconds -- which is the animation run time set in the CSS transforms.
        errViewerContainer.classList.remove('hide-err');
        dimViewers.classList.remove('hide-err');
        appRegions.toolsContainer.classList.remove('hide-err');
      },250);
    },displayTime);
  }

  // !VA DEV FUNCTIONS
  function getFocus(e){
    var focused;
    if (!e) var e = window.event;
    if (e.target) focused = e.target;
    else if (e.srcElement) focused = e.srcElement;
    if (focused.nodeType == 3) focused = focused.parentNode;
    console.log('focused is: ' + focused);
    if (document.querySelector) {
      console.log('focused.id is: ' + focused.id);
      return focused.id;
    } else if (!focused || focused == document.documentElement) {
      console.log('focused is: ' + focused);
      return focused;
    }
  }

  function focusOnClick(e) {
    // !VA This has to be here otherwise Edge won't put the focus in field on click
    console.log('e is: ' + e);
    console.log('this is: ' + this);
    // this.focus();
    this.select();
    console.log('Select Me!');
    this.style.textAlign = 'center';
  }


  // ERROR HANDLING END 

//Namespace closure
})();