
/* !VA  
ISSUE 1 - The main issue here is whether I need to actually put all these DOM objects in variables or just access them when I need them. Currently, the Constructors 





*/
//SCRIPT START
//PAGE SETUP START

// Namespace
var Dimwhit = (function () {

  // INITIALIZATION FUNCTIONS
  // window.onload = function() {
  //   initApp();
  // };


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

    //!VA appRegions ID Strings 
    var appRegions = {
      dropArea: '#drop-area',
      // !VA  03.18.18 We don't define appRegions.curImg yet. That is done either by the FileReader or when the devImg is retrieved from the index.html further down in this block
      // !VA V2 I I am defining this now...for now.
      curImg: '#main-img',
      imgViewer: '#main-image-viewer',
      imgViewport: '#image-viewport',
      toolsContainer: '#tools-container',
      ccpContainer: '#ccp',
      appContainer: '#app-container',
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

    // !VA Functions that get returned from the UIContoller object go here
    return {
      // !VA V2 Return all the strings for the UI element's IDs
      dimViewerIDs: function() {
        return dimViewers;
      },
      toolButtonIDs: function() {
        return toolButtons;
      },
      appRegionIDs: function() {
        return appRegions;
      },
      ccpUserInputIDs: function() {
        return appRegions;
      },
      ccPropStrings: function() {
        return ccPropStrings;
      },
      ccpBuildTag: function() {
        return ccpBuildTag;
      }
    };


  })();


  var appRegions = UIController.appRegionIDs();
  // console.table(dimViewers);
  console.table(appRegions);


  // !VA Calculations Controller Contructor
  var calcController = (function() {

  })();



  // !VA GLOBAL APP CONTROLLER
  var controller = (function(calcCtrl, UICtrl) {
    // !VA V2 Declaring curImg here for now so I can get something working.
    var curImg;
    // !VA V2 getting ID strings from UIController
    var appRegions = UIController.appRegionIDs();
    var dimViewers = UIController.dimViewerIDs();

        // !VA appObj Constructor
    // appObj  holds image-viewport, main-image and main-img-viewer. These are all the mutable VALUES that can be displayed in the in the app
    // !VA Added initViewerW and initViewerH 03.08.18
    // !VA Added sPhoneW, sPhoneH, lPhoneW and lPhoneH
    // !VA V2 - I'm not sure this goes here or is even necessary. This doesn't reference actual UI elements. It just stores values...probably belongs in the App Controller module.
    
    // !VA THIS needs to be Constructor - most of the data is here 
    // !VA  V2 initviewer will be a prototype of Appobj, I assume, so removing it
    var Appobj = function(filename, filepath, appcontainer, viewport, viewer, currentimg, sphone, lphone) {
      this.filename = filename;
      this.filepath = filepath;
      this.appcontainer = appcontainer;
      this.viewport = viewport;
      this.viewer = viewer;
      this.currentimg = currentimg;
      this.sphone = sphone;
      this.lphone = lphone;
    };
    

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
      Appobj.currentimg = document.querySelector(appRegions.curImg);
      console.log('Appobj.currentimg is now: ' + Appobj.currentimg);
      if (!Appobj.currentimg) { 
        console.log('no current image');
        // !VA V2 Show the dropArea
        document.querySelector(appRegions.dropArea).style.display = 'block';
        // !VA Give some w and h to the imgViewer to show the white icon background.
        document.querySelector(appRegions.imgViewer).style.width = '650px';
        document.querySelector(appRegions.imgViewer).style.height = '450px';
        // !VA  !IMPORTANT! Object.key, .value and .entries to convert a list object into an array!!!!!!!
        const arr = Object.values(dimViewers);
        for ( let i = 0; i < arr.length; i++ ) {
          if ( arr[i] !== '#clipboard-but' &&  arr[i] !== '#filename-viewer' ) {
            console.log('arr[i] is: ' + arr[i] );
            document.querySelector(arr[i]).innerHTML = `<span class='pop-font'>&nbsp;&nbsp;No Image</span>`;
          } 
        } 
      } else {
        document.querySelector(appRegions.dropArea).style.display = 'none';
        // !VA  03.18.18 then set appRegions.curImg to it
        appRegions.curImg = document.querySelector(appRegions.curImg);
        // get appObj.filename
        Appobj.filename = (function () {
          var source = appRegions.curImg.src;
          var path = source.split('/');
          return  path[path.length - 1];
        })();
        Appobj.appcontainer = document.querySelector(appRegions.appContainer);
        Appobj.viewport = document.querySelector(appRegions.imgViewport);
        Appobj.viewer = document.querySelector(appRegions.imgViewer);
        document.querySelector(appRegions.toolsContainer).style.display = 'block';

        // !VA  THIS WILL NEED TO BE FIXED! THE VIEWER COMES FROM THE INPUT FIELD!
        document.querySelector(appRegions.imgViewer).style.width = '625px';
        document.querySelector(appRegions.imgViewer).style.height = '525px';

        console.log(Appobj.currentimg);
        console.log('Appobj.currentimg.width is: ' + Appobj.currentimg.width);
        console.log('Appobj.currentimg.height is: ' + Appobj.currentimg.height);
        console.log('Appobj.currentimg.naturalWidth is: ' + Appobj.currentimg.naturalWidth);
        console.log('Appobj.currentimg.naturalheight is: ' + Appobj.currentimg.naturalHeight);

        // !VA  STOPPED HERE. Have to revisit Appobj and decide what it's supposed to store...

      }
    };


    

    return {
      init: function(){
        console.log('App initialized.');
        // !VA V2 now I need to put the default image from the HTML into the viewer. 
        // If there's a devIMG in the HTML...
        var curImg = document.getElementById('main-img');
        console.log(curImg);
        setupEventListeners();
        initializeDOM();
      }
    };

  })(calcController, UIController);

  controller.init();

//Namespace closure
})();