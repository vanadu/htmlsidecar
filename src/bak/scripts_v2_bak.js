
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

    
    // !VA THIS needs to be Constructor - most of the data is here 
    // !VA  This object only contains HTML elements whose properties change based on the properties of the image that is contained in them. It does NOT need to have a Constructor because it's not serving as the blueprint for any other objects.
    var Appobj = {
      currentimg: document.querySelector(dynamicRegions.curImg),
      viewer: document.querySelector(dynamicRegions.imgViewer),
      viewport: document.querySelector(dynamicRegions.imgViewport),
      appcontainer: document.querySelector(dynamicRegions.appContainer)
    };

    function getCurIasdasfdmg(curImg, fileName) {
      var a, b;
      a = curImg;
      b = fileName;
      console.log('a is: ' + a);
      console.log('b is: ' + b);
      console.log('Appobj.currentimg is...');
      console.log(Appobj.currentimg);
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

    // function handleFileSelect () {
    //   console.log('HandleFIleSelect running..');
    // }
    
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
        // If a file is already being displayed, i.e. appObj.filename is true, then remove that image to make room for the next image being dropped
        if (Appobj.currentimg) {
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
            Appobj.currentimg = curImg;
            Appobj.filename =fileName;
            console.dir(Appobj);

            // !VA Trying to understand how Dimwhit 1 handles the image display
            console.log(Appobj.currentimg);
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


      // !VA Populate Appdata using the properties of the dynamic regions in the 
      // !VA  STOPPED HERE: Appdata can only be populated if there's an image. If the DEV image isn't loaded or the USER hasn't dropped in an image yet, then Appdata.filename is undefined and script won't run.
      getAppData: function() {
        // !VA If there's no current image, then return false. This is the flag to the initializeDOM function that there is no DEV image in the HTML. The init then shows the drop area and 'No Image' in the dimViewers.
        if (Appobj.currentimg == null) {
          return false;
        } else {
          // !VA  There is a current image, so populate Appdata based on the object properties in Appobj
          var Appdata = { 
            // filename: 'blob',
            filename: function() {
              var f =  calcController.getFilenameFromSource(Appobj.currentimg.src);
              return f;
            },
            path: '',
            imgH: Appobj.currentimg.height,
            imgW: Appobj.currentimg.width,
            imgNH: Appobj.currentimg.naturalHeight,
            imgNW: Appobj.currentimg.naturalWidth,
            aspect: function() {
              var a = calcController.getAspectRatio(this.imgNW, this.imgNH);
              return a;
            },
            // aspect: getAspectRatio(Appobj.currentimg.naturalHeight, Appobj.currentimg.naturalWidth),
            viewerH: Appobj.viewer.height,
            viewerW: Appobj.viewer.width,
            viewportH: Appobj.viewport.height,
            viewportW: Appobj.viewport.width,
            appH: Appobj.appcontainer.height,
            appW: Appobj.appcontainer.width,
      
          };
          console.table(Appdata);
          console.log(Appdata.aspect()[0]);
          console.log(Appdata.aspect()[1]);
          return Appdata;

        }
      }




    };


  })();
  // var r = UIController.getAppobj();
  // console.dir(r);




  // !VA Calculations Controller Contructor
  var calcController = (function() {
    // !VA Get Appobj from the UI controller module. I'm wondering if it's best just to create Appobj here using the UI strings in UIController.dynamicRegions, assuming this is the only module that Appobj is used.
    // var Appobj = UIController.getAppobj();
   
   
    //   function(filename, path, imgH, imgW, imgNH, imgNW, aspect, viewerW, viewerH, viewportH, viewportW, appH, appW) { 
    //   this.filename = filename;
    //   this.path = path;
    //   this.imgH = imgH;
    //   this.imgW = imgW;
    //   this.imgNH = imgNH;
    //   this.imgNW = imgNW;
    //   this.aspect = aspect;
    //   this.viewerW = viewerW;
    //   this.viewerH = viewerH;
    //   this.viewportH = viewportH;
    //   this.viewportW = viewportW;
    //   this.appH = appH;
    //   this.appW = appW;
    // };
    return {
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

      getFilenameFromSource: function (source) {
        // var source = Appobj.currentimg.src;
        if (source) {
          console.log('there is a source');
          var path = source.split('/');
          // return  path[path.length - 1];
        } else {
          
          console.log('there is no source');
          // return `<span class='pop-font'>&nbsp;&nbsp;No Image</span>`;
        }
      }



    };


    // !VA  This doesn't work, returns empty array
    /*
    var Appobj = function() {
      var n = Object.entries(UIController.getAppobj());
      return n;
    };
    console.log('appobj is...');
    console.dir(Appobj);
    */
    // !VA  This works, but it might not be the best way. Good enough for now, I think.

    // console.table(Appobj);
    // !VA  Now, we can build Appdata


  })();



  // !VA GLOBAL APP CONTROLLER
  var controller = (function(calcCtrl, UICtrl) {

    // !VA V2 getting ID strings from UIController
    var dynamicRegions = UIController.getDynamicRegionIDs();
    var staticRegions = UIController.getStaticRegionIDs();
    var dimViewers = UIController.getDimViewerIDs();
    // var Appobj = UIController.getAppobj();




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




    var initializeDOM = function() {
      // !VA V2 There are two conditions here:
      // !VA  1) The app has no content -- it's been opened in user mode but no image has been dropped in yet. This is the only case where we show the dropArea and show NO IMAGE in the dimViewers
      // !VA  2) There is content in the app, either:
      // !VA    a) because it's in dev mode and the hardcoded image is being displayed
      // !VA    b) because the user has already dropped in image in
      // !VA  SO...first we see if there is a currentimage in Appobj.
      // !VA  There might be another case... there's already an image in user mode and we want to replace
      var Appdata = UIController.getAppData();
      if (Appdata) { 
        console.log('DEV MODE: current image set in HTML file');
        var Appdata = UIController.getAppData();

        // !VA This is DEV MODE, there's a hardcoded image in the HTML
        document.querySelector(staticRegions.dropArea).style.display = 'none';
        document.querySelector(staticRegions.toolsContainer).style.display = 'block';

        // !VA  THIS WILL NEED TO BE FIXED! THE VIEWER COMES FROM THE INPUT FIELD!
        document.querySelector(dynamicRegions.imgViewer).style.width = '625px';
        document.querySelector(dynamicRegions.imgViewer).style.height = '525px';

        // !VA  STOPPED HERE. Have to revisit Appobj and decide what it's supposed to store...


      } else {

        // !VA This is USER MODE -- there's no hardcoded image in the HTML file. 
        console.log('USER MODE: no current image');
        // !VA V2 Show the dropArea
        document.querySelector(staticRegions.dropArea).style.display = 'block';
        // !VA Give some w and h to the imgViewer to show the white icon background.
        document.querySelector(dynamicRegions.imgViewer).style.width = '650px';
        document.querySelector(dynamicRegions.imgViewer).style.height = '450px';
        // !VA  !IMPORTANT! To loop through an object listing, use Object.key, .value and .entries to convert a list object into an array!!!!!!!
        // !VA  Loop throug the array and assign No Image tot he dimViewers
        const dimarray = Object.values(dimViewers);
        for ( let i = 0; i < dimarray.length; i++ ) {
          if ( dimarray[i] !== '#clipboard-but' &&  dimarray[i] !== '#filename-viewer' ) {
            document.querySelector(dimarray[i]).innerHTML = `<span class='pop-font'>&nbsp;&nbsp;No Image</span>`;
          } 
        } 
      }
    };

    return {
      init: function(){
        console.log('App initialized.');
        setupEventListeners();
        initializeDOM();
      }
    };

  })(calcController, UIController);

  controller.init();

//Namespace closure
})();