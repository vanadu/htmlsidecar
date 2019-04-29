

//SCRIPT START
//PAGE SETUP START

// Namespace
var Dimwhit = (function () {

  // INITIALIZATION FUNCTIONS
  // window.onload = function() {
  //   initApp();
  // };


  var UIController = (function() {

    // !VA appObj Constructor
    // appObj  holds image-viewport, main-image and main-img-viewer. These are all the mutable VALUES that can be displayed in the in the app
    // !VA Added initViewerW and initViewerH 03.08.18
    // !VA Added sPhoneW, sPhoneH, lPhoneW and lPhoneH
    // !VA V2 - I'm not sure this goes here or is even necessary. This doesn't reference actual UI elements. It just stores values...probably belongs in the App Controller module.
    /*
    var appObj = {
      filename:'#',
      appContainerW: '#',
      appContainerH: '#',
      viewportW: '#',
      viewportH: '#',
      initViewerW: '#',
      initViewerH: '#',
      viewerW: '#',
      viewerH: '#',
      imgW: '#',
      imgH: '#',
      imgNW: '#',
      imgNH: '#',
      sPhoneW: '#',
      sPhoneH: '#',
      lPhoneW: '#',
      lPhoneH: '#'
    };
    */

    // !VA DimViewer Constructor
    var dimViewer = {
      filename: '#filename-viewer',
      display: '#dim-viewer-display',
      diskimg: '#dim-viewer-disk-img',
      aspect: '#dim-viewer-aspect',
      smallphones: '#dim-viewer-small-phones',
      largephones: '#dim-viewer-small-phones',
      clipboardBut: '#clipboard-but'
    };

    // !VA toolButton Constructor
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

    // !VA appRegions Constructor
    var appRegions = {
      dropArea: '#drop-area',
      // !VA  03.18.18 We don't define appRegions.curImg yet. That is done either by the FileReader or when the devImg is retrieved from the index.html further down in this block
      // curImg: '#',
      imgViewer: '#main-image-viewer',
      imgViewport: '#image-viewport',
      toolsContainer: '#tools-container',
      ccpContainer: '#ccp',
      appContainer: '#app-container',
    };

    // !VA  ccpUserInput Constructor
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

    // !VA ccPropStrings Constructor
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

    // !VA ccpBuildTag Constructor
    // Stores the ccpMakeTag object for assembling the clipboard create tag buttons
    // !VA V2 Also doesn't belong here, we will move it later.
    var ccpBuildTag = {
      imgBuildHTMLBut: '',
      imgBuildCSSBut: '',
      smallPhonesBuildCSSBut: '',
      largePhonesBuildCSSBut: ''
    };

    // !VA Functions that get returneed from the UIContoller object go here
    return {

      getDimViewers: function() {
        return dimViewer;
      }
    };


  })();

  var dimViewers = UIController.getDimViewers();
  console.table(dimViewers);



  var calcController = (function() {

  })();



  // !VA GLOBAL APP CONTROLLER
  var controller = (function(calcCtrl, UICtrl) {


    return {
      init: function(){
        console.log('Whitty initialized.');
      }
    };

  })(calcController, UIController);

  controller.init();

//Namespace closure
})();