
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