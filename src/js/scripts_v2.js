
/* !VA  
ISSUE 1 - The main issue here is whether I need to actually put all these DOM objects in variables or just access them when I need them. Currently, the Constructors 





*/
//SCRIPT START
//PAGE SETUP START

// Namespace
var Dimwhit = (function () {

  var UIController = (function() {

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
      viewerWidth: '#main-image-viewer-wdth',
      grow50: '#main-image-grow-50',
      grow10: 'main-image-grow-10',
      grow01: 'main-image-grow-01',
      customWidth: 'main-img-custom-wdth',
      toggleImgSize: 'toggle-image-size',
      customHeight: 'main-img-custom-hght',
      shrink01:'main-image-shrink-01',
      shrink10: 'main-image-shrink-10',
      shrink50: 'main-image-shrink-50',
      sPhoneWidth: 'small-phones-wdth',
      lPhoneWidth: 'large-phones-wdth',
    };

    //!VA If we separate this out into UI objects that correspond to the objects we want to create, then we can just loop through them rather than define each property separately. So, dynamicElements are those that resize based on the current image... but I haven't figured out how to loop through them yet.
    var dynamicRegions = {
      curImg: '#main-img',
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

    // !VA ccPropStrings ID Strings
    // !VA V2 - This doesn't go here, probably belongs in the App Controller module, but we'll build it here for now and move it later.
    // Stores the strings representing the HTML properties corresponding to the user CCP selections. These property snippets will be used to populate the clipboard.
    // !VA Have to include separate propStrings for opening and closing tags 
    var ccPropStrings = {
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

    
 
    // !VA  This object only contains HTML elements whose properties change based on the properties of the image that is contained in them. It does NOT need to have a Constructor because it's not serving as the blueprint for any other objects.
    // !VA  We are initializing this here, and it will be updated
    var Appdata = {
      currentimg: document.querySelector(dynamicRegions.curImg),
      viewer: document.querySelector(dynamicRegions.imgViewer),
      viewport: document.querySelector(dynamicRegions.imgViewport),
      appcontainer: document.querySelector(dynamicRegions.appContainer)
    };

    /* !VA  I don't remember what this was for. 
    function getCurIasdasfdmg(curImg, fileName) {
      var a, b;
      a = curImg;
      b = fileName;
      console.log('a is: ' + a);
      console.log('b is: ' + b);
      console.log('Appdata.currentimg is...');
      console.log(Appdata.currentimg);
      document.querySelector(staticRegions.dropArea).style.display = 'none';
      const curImgDiv = document.createElement('div');
    
      // Assign an id to the new div -- we're not adding this to an object because it's created here and is only used here. NOTE: These containers divs don't appear in devMode when the curImg is accessed from the index.html 
      curImgDiv.id = 'main-img-container';
      // Insert main-img-container into the existing main-image
      document.getElementById('main-image').insertBefore(curImgDiv, null);
      // !VA insert main-img-container into the newly-created main-img-container
      document.getElementById('main-img-container').insertBefore(dynamicRegions.curImg, null);
      // Create the image object and read in the binary image from the FileReader object.
      // This allows access of image properties. You can't get image properties from a FileReader object -- it's just a blob' 

    }
    */

    
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
        return ccPropStrings;
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
        if (Appdata.currentimg) {
          // !VA 03.18.18 Don't need the var declaration anymore - it's in the appRegions object
          // var curImg = document.getElementById('main-img');
          dynamicRegions.curImg.parentNode.removeChild(dynamicRegions.curImg);
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
            dynamicRegions.curImg = curImg;
            console.log('Showing curImg...');
            console.dir(curImg);
            Appdata.currentimg = curImg;
            Appdata.filename =fileName;
            console.dir(Appdata);

            // !VA Trying to understand how Dimwhit 1 handles the image display
            console.log(Appdata.currentimg);
            document.querySelector(staticRegions.dropArea).style.display = 'none';
            const curImgDiv = document.createElement('div');
          
            // Assign an id to the new div -- we're not adding this to an object because it's created here and is only used here. NOTE: These containers divs don't appear in devMode when the curImg is accessed from the index.html 
            curImgDiv.id = 'main-img-container';
            // Insert main-img-container into the existing main-image
            document.getElementById('main-image').insertBefore(curImgDiv, null);
            // !VA insert main-img-container into the newly-created main-img-container
            document.getElementById('main-img-container').insertBefore(dynamicRegions.curImg, null);
            // Create the image object and read in the binary image from the FileReader object.
            // This allows access of image properties. You can't get image properties from a FileReader object -- it's just a blob' 

            

          };
        })(f);
        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
        // }
      },
      //FILEREADER OBJECT PROCESSING END



      updateAppdata: function (curImg, imgViewer, imgViewport, appContainer ) {
        Appdata.currentimg = curImg;
        Appdata.viewer = imgViewer;
        Appdata.viewport = imgViewport;
        Appdata.appcontainer = appContainer;
        return Appdata;
      },



      // !VA Populate Appdata using the properties of the dynamic regions in the 
      // !VA  Appdata can only be populated if there's an image. If the DEV image isn't loaded or the USER hasn't dropped in an image yet, then Appdata.filename is undefined and script won't run.
      // !VA  I think I fixed the above problem by creating a different function for Dev initialization. It can be messy and not DRY since it's not for production anyway.
      getAppData: function(Appdata) {
        console.log('Running getAppData...');
        // console.log('getAppData: Appdata.currentimg is...');
        // console.log(Appdata.currentimg.src);
        console.log('Appdata is: ' + Appdata);

        // !VA If there's no current image, then return false. This is the flag to the initializeDOM function that there is no DEV image in the HTML. The init then shows the drop area and 'No Image' in the dimViewers.
        if (Appdata.currentimg == null || Appdata.currentimg === 'undefined') {
          return false;
        } else {
          // !VA  There is a current image, so populate Appdata based on the object properties in Appdata
          var Appdata = {
            // filename: 'blob',
            // STOP HERE -- I don't understand how to get a funcion return value and set it a property.
            filename: (function() {
              
              var typ = Appdata.currentimg.nodeName;
              if ( typ === 'DIV') {
                return 'No Image';
              } else { 
                var f =  calcController.getFilenameFromSource(Appdata.currentimg.src);
                return f;
              }
            }),
            imgH: Appdata.currentimg.height,
            imgW: Appdata.currentimg.width,
            imgNH: Appdata.currentimg.naturalHeight,
            imgNW: Appdata.currentimg.naturalWidth,
            aspect: function() {
              var a = calcController.getAspectRatio(this.imgNW, this.imgNH);
              return a;
            },
            // aspect: getAspectRatio(Appdata.currentimg.naturalHeight, Appdata.currentimg.naturalWidth),
            viewerH: Appdata.viewer.height,
            viewerW: Appdata.viewer.width,
            viewportH: Appdata.viewport.height,
            viewportW: Appdata.viewport.width,
            appH: Appdata.appcontainer.height,
            appW: Appdata.appcontainer.width,
      
          };
          console.table(Appdata);
          console.log('Appdata.filename is: ' + Appdata.filename());
          console.log('getAppData: Appdata.filename is: ' + Appdata.filename());
          console.log('getAppData: aspect ratio is: ' + Appdata.aspect()[1]);
          return Appdata;


        }
      }

    };


  })();
  // var r = UIController.getAppdata();
  // console.dir(r);



  // !VA Calculations Controller Contructor
  var calcController = (function() {

    // var data = UIController.getAppData();
    // console.log('data is: ' + data);


    return {
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

      getFilenameFromSource: function (source) {
        // console.log('getFilenameFromSource running...');
        if (source) {
          // console.log('there is a source');
          var path = source.split('/');
          console.log('now');
          return  path[path.length - 1];
        } else {
          
          console.log('getFilenameFromSource: there is no source');
          // return `<span class='pop-font'>&nbsp;&nbsp;No Image</span>`;
        }
      },

      evalViewerSize: function (Appdata) {
        // !VA This isn't necessary here, but will probably be used somewhere else...
        // const maxViewerWidth = (parseInt(window.getComputedStyle(appRegions.appContainer,null).getPropertyValue('width'), 10)) - 48;

        // Using the current image dimensions, set the size of the viewer based on the following criteria:
        // !VA This can probably be recoded for efficiency but it works for now 
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
          [Appdata.viewerH, Appdata.viewportH, Appdata.appContainerH] = this.adjustHeights(Appdata);
          console.log('CASE 1');
          // !VA This looks good...
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
          [Appdata.viewerH, Appdata.viewportH, Appdata.appContainerH] = this.adjustHeights(Appdata);
          console.log('CASE 2');
          // !VA Looks good...
          break;

        // The image is not as wide as the current viewer width, but is taller than the viewer height. Keep the image width but resize the viewer in order to display the full image height
        // !VA This might be a problem with consecutive images without page refresh
        case (Appdata.imgNW <= Appdata.viewerW) && (Appdata.imgNH > Appdata.viewerH) :
          // console.log('CASE 3');
          // Set the viewer height and the image height to the image natural height
          Appdata.viewerH = Appdata.imgH = Appdata.imgNH;
          // Set the image width to the natural image width
          Appdata.imgW = Appdata.imgNW;

          // !VA  Use adjustHeights to get the Appdata height
          // !VA  Note the dependency with initAppdata, see 'Dependency with adjustHeights'
          [Appdata.viewerH, Appdata.viewportH, Appdata.appContainerH] = this.adjustHeights(Appdata);
          console.log('CASE 3');
          // !VA 
          break;

        // The image is wider and taller than the current viewer height and width so we have to resize the image and the viewport based on the current viewport width
        case (Appdata.imgNW > Appdata.viewerW) && (Appdata.imgNH > Appdata.viewerH) :
          // console.log('CASE 4');
          // Set the image Width to the current  viewer width 
          Appdata.imgW = Appdata.viewerW;
          // Set the image height proportional to the new image width using the aspect ratio function
          Appdata.imgH = Math.round((1/this.getAspectRatio(Appdata.imgNW, Appdata.imgNH)[0]) * Appdata.imgW);
          // Set the viewer height to the image height
          Appdata.viewerH = Appdata.imgH;

          // Get the viewport and Appdata height from adjustHeights
          [Appdata.viewerH, Appdata.viewportH, Appdata.appContainerH] = this.adjustHeights(Appdata);
          console.log('CASE 4');
          // !VA  BUG Problem with the 800X550, 800X600 -- no top/bottom gutter on viewport
          break;
        }

      },

      
      adjustHeights: function (Appdata)  {
        // !VA This calculates the imgViewer, imgViewport and appContainer height based on the 
        console.dir(Appdata);
        var heightVal = Appdata.imgH;
        console.log('heightVal is: ' + heightVal);
        // console.log('adjustHeights Appdata is: ');
        // console.dir(Appdata);
        let viewerH;
        let viewportH;
        let appContainerH; 
    
        // !VA These values still seem arbitrary, need to review. There's a dependency in initAppObj, see 'Dependency with adjustHeights'
        // !VA I'm not even sure this is necessary since we're getting the viewerW from maxViewerHeight now -- but we'll leave it in here for the time being.
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
        console.log('Appdata is...');
        console.dir(Appdata);
        // This should write the heights to Appdata and then pass it to the function that writes Appdata to the dimViewers, probably called refreshDimViewers. In fact, there's no reason not to consolidate that function with the function that updates the image container heights and refresh the entire UI at the same time, so refreshUI.
        // console.log('AppcontainerH is: ' + appContainerH);
        Appdata.viewerH = viewerH;
        Appdata.viewportH = viewportH;
        Appdata.appH = appContainerH;
        console.log('adjustHeights: Appdata is...');
        console.dir(Appdata);
        //VA STOPPED HERE 5/1. This now returns these three values to evalViewerSize. Not sure why it does that. 
        return [viewerH, viewportH, appContainerH];
      }

    };

  })();



  // !VA GLOBAL APP CONTROLLER
  var controller = (function(calcCtrl, UICtrl) {

    // !VA V2 getting ID strings from UIController
    var dimViewers = UIController.getDimViewerIDs();
    var dynamicRegions = UIController.getDynamicRegionIDs();
    var staticRegions = UIController.getStaticRegionIDs();
    var toolButtons = UIController.getToolButtonIDs();
    var ccPropStrings = UIController.getCcpPropStringsIDs();
    var ccpUserInput = UIController.getDynamicRegionIDs();
    var ccpBuildTag = UIController.getCcpBuildTagIDs();
    var dynamicRegions = UIController.getDynamicRegionIDs();
    // var Appdata = UIController.getAppdata();




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
    
      dropZone.addEventListener('drop', UIController.handleFileSelect, false);
      // dropZone.addEventListener('drop', startNewDrop, false);
      // Drag and Drop Listener 

      //DRAG AND DROP PROCESSING END


    };

    var initializeDevMode = function() {
      console.log('initializeDevMode running...');
      // !VA Get the imgViewer dimensions as set in CSS:
      var initViewerW = parseInt(document.querySelector(dynamicRegions.imgViewer).style.width);
      var initViewerH = parseInt(document.querySelector(dynamicRegions.imgViewer).style.height);
      // !VA Initalize the imgViewer width input field value to the default of 650
      document.querySelector(toolButtons.viewerWidth).placeholder = initViewerW;
      // console.log('toolButtons.viewerWidth is: ' + toolButtons.viewerWidth);
      // !VA  Test if there is currently #main-img element with an image.If there is, it's hardcoded in the HTML and we're in DEV MODE. If there's not, the app is being initialized in USER MODE.
      var curImgExists = document.querySelector(dynamicRegions.curImg);
      console.log('curImgExists is: ' + curImgExists);
      // !VA  Now we have to populate Appdata with data. We can do it manually here and just pass the object on to refresh the screen elements.



      // !VA If there's no current image, then return false. This is the flag to the initializeDOM function that there is no DEV image in the HTML. The init then shows the drop area and 'No Image' in the dimViewers.

      // !VA  There is a current image, so first populate Appdata manually and then populate getAppData based on the object properties in Appdata
      var AppobjDev = {
        currentimg: document.querySelector(dynamicRegions.curImg),
        viewer: document.querySelector(dynamicRegions.imgViewer),
        viewport: document.querySelector(dynamicRegions.imgViewport),
        appcontainer: document.querySelector(dynamicRegions.appContainer)
      }; 

      // !VA Hide the drop area.
      document.querySelector(staticRegions.dropArea).style.display = 'none';
      // !VA  Show the toolbar
      document.querySelector(staticRegions.toolsContainer).style.display = 'block';

      //This is declared here and will be declared also in the USER Mode code. I hope this function is private...
      var Appdata = {
        filename: calcController.getFilenameFromSource(AppobjDev.currentimg.src),
        imgH: AppobjDev.currentimg.height,
        imgW: AppobjDev.currentimg.width,
        imgNH: AppobjDev.currentimg.naturalHeight,
        imgNW: AppobjDev.currentimg.naturalWidth,
        // !VA This only works if you use this in a method, not just when you pass the arguments using this in a regular function, like was done for 'filename' above. I don't understand why, but it causes the browser to hang, probably a circular referrence. At any rate, you have to call this method with parenths, otherwise it will just return the function expression literal.
        aspect: function() {
          var a = calcController.getAspectRatio(this.imgNW, this.imgNH);
          return a;
        },
        viewerH: initViewerH,
        viewerW: initViewerW,
        // viewportH: AppobjDev.viewport.height,
        // viewportW: AppobjDev.viewport.width,
        // appH: AppobjDev.appcontainer.height,
        // appW: Appdata.appcontainer.width,
      };
      console.log('Appdata is...');
      console.dir(Appdata);
      // console.log('Appdata.filename is: ' + Appdata.filename);
      // console.log('getAppData: Appdata.filename is: ' + Appdata.filename);
      
      // console.log('getAppData: aspect ratio is: ' + Appdata.aspect()[1]);


      var evalViewerSize = calcController.evalViewerSize(Appdata);



      // !VA This is DEV MODE, there's a hardcoded image in the HTML
      // document.querySelector(staticRegions.dropArea).style.display = 'none';
      // document.querySelector(staticRegions.toolsContainer).style.display = 'block';

      // !VA  THIS WILL NEED TO BE FIXED! THE VIEWER COMES FROM THE INPUT FIELD!
      // document.querySelector(dynamicRegions.imgViewer).style.width = '625px';
      // document.querySelector(dynamicRegions.imgViewer).style.height = '525px';



    };



    return {
      init: function(){
        console.log('App initialized.');
        // !VA  Initialize the ImgViewer to accomodate the dragArea. This should be the same as the CSS definition.
        document.querySelector(dynamicRegions.imgViewer).style.width = '650px';
        document.querySelector(dynamicRegions.imgViewer).style.height = '450px';

        setupEventListeners();
        // !VA  Test if there is currently #main-img element with an image.If there is, it's hardcoded in the HTML and we're in DEV MODE. If there's not, the app is being initialized in USER MODE.
        var curImgExists = document.querySelector(dynamicRegions.curImg);
        if (curImgExists) {
          initializeDevMode();
        } else {
          /* !VA  
          1) Set the initial interface:

          */
          // initializeUserMode();
          /*
        // !VA This is USER MODE -- there's no hardcoded image in the HTML file.
        // !VA  Initialize Appdata to provide values for the Appdata function. Use the  
        console.log('USER MODE: no current image');
        // !VA V2 Show the dropArea
        document.querySelector(staticRegions.dropArea).style.display = 'block';
        // !VA Give some w and h to the imgViewer to show the white icon background.
        document.querySelector(dynamicRegions.imgViewer).style.width = '650px';
        document.querySelector(dynamicRegions.imgViewer).style.height = '450px';
        // !VA  Now we create an Appdata using the dropArea instead of a curImg, since we don't have a curImg yet. The dropArea will be replaced with a curImg as soon as the user drops one in.
        curImg = document.querySelector('#drop-area');
        imgViewer = document.querySelector(dynamicRegions.imgViewer);
        imgViewport = document.querySelector(dynamicRegions.imgViewport);
        appContainer = document.querySelector(dynamicRegions.appContainer);
        // !VA Update the and return the Appdata with the current values
       var Appdata = UIController.updateAppdata(curImg, imgViewer, imgViewport, appContainer);
        console.dir(Appdata);
        // !VA Now get the Appdata using the current Appdata
        var Appdata = UIController.getAppData(Appdata);
        // console.dir(Appdata);
        console.log('Appdata.currentimg is: ' + Appdata.currentimg);
        console.log(Appdata.filename());

        // !VA  !IMPORTANT! To loop through an object listing, use Object.key, .value and .entries to convert a list object into an array!!!!!!!
        // !VA  Loop throug the array and assign No Image tot he dimViewers
        const dimarray = Object.values(dimViewers);
        for ( let i = 0; i < dimarray.length; i++ ) {
          if ( dimarray[i] !== '#clipboard-but' &&  dimarray[i] !== '#filename-viewer' ) {
            document.querySelector(dimarray[i]).innerHTML = `<span class='pop-font'>&nbsp;&nbsp;No Image</span>`;
          } 
        } 
              */
        }
      }
    };

  })(calcController, UIController);

  controller.init();

//Namespace closure
})();