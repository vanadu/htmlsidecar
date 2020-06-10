// !VA REBOOT 12/29/19
// ===================
// See C:\Users\VANA\OneDrive\WhittyReview_12.30.19.docx

// !VA GENERAL NOTES
/* !VA  - June Reboot Notes
=========================================================
// !VA Branch: implementAppobj03 (060920)
Cleaning up - to read all the notes so far check out the last commit in implementAppobj03 

TODO: BUG! Load 625X525 with viewerW set to 600 - loads without resizing to container size
TODO: Change the default parent class on 
TODO: Have a bit problem with td options height and width fields. Currently these fields are available when the 'basic' option is selected, but there is no case when they would ever write the values the user might enter here to the clipboard. Beccause, what happens when the user enters values that are smaller than the current image resolution. That can't be possible. The TD can't be smaller than its child. The height should never be available when the child is an image and the width should either be preset to the image width or unavailable. Or it should be allowed to be larger than the child, for instance if padding is desired, but never smaller. And if you add padding, you'd add it to the img, not to the TD, right? Have to check that out before resolving this. 
NOTE: It's important to remember that handleCcpActions handles the display of elements whose state or value in the CCP is changed by OTHER CCP elements. For example, the imgType radio buttons trigger value changes in OTHER elements. So handleCcpActions handles the display of the CCP UI. In contrast, the Attributes control only the Clipboard output. For instance, the class attribute only writes to the Clipboard if there is an entry in the input field. That's why it's handled in getAttributes - it doesn't result in a change to the CCP UI.


TODO: Remove all writing of values from initUI and put them in getAttributes. initUI should only be for turning display amd disabling on and off. 
TODO: Make the filename div wider
TODO: No tooltip available for posswitch and imgswap
TODO: Tooltips don't appear on checkboxes
TODO: Add error to vmlbutton height not matching img height
TODO: Add error handling and the isErr argument to makeTdNode and makeTableNode so that the Clipboard object can discern between success messages and 'alert' messages, i.e. when the Clipboard output should be reviewed by the user for some reason, i.e. when vmlbutton height doesn't match the height of the loaded image. I don't think this is possible due to Clipboard object constraints
TODO: Determine whether the parent table class or wrapper table class is output to CSS. It should be the parent table class, or even both.
TODO: curImg doesn't resize back if you change viewerW to smaller than curImg and then change it back. It should follow the size of viewerW shouldn't it? Maybe not...
DONE: Make bgcolor add the hash if it's not in the value. Don't do that, need to allow for non-hash values like color aliases
DONE: Fix table width: doesn't reflect what's in toolbar viewer width field. FIXED - Appears to work as designed, imgW in Parent table width and viewerW in Wrapper table width

Error Handling
--------------
TODO: The CSS output will need to be revisited for td and table.
TODO: There's an issue with what to do if the user grows the image past the viewer height, but not past the viewer width. Currently, the image height CAN grow past the viewer height; the only limitation is that it can't grow past the viewer width. That's no good.
TODO: Fix Include wrapper table options don't appear if the CCP is closed and re-opened 
TODO: Assign tab order


/* !VA  - For Consideration
=========================================================

TODO: Add some kind of fluid option to the img options. Cerberus hard codes it into the img tag. That needs to be tested. Litmus overrides the width and height style properties in the CSS media queries. Need to test before that is implemented - but there's no reason to include a fluid option if that's settable in CSS.
TODO: rewrite getAppdata to only query specific items in the array, or at least use destructuring to only make a const out of which ever Appdata property is needed in the respective function.
TOD0: Think about making getAppdata only query a specific property if possible.
TODO: CCP numeric input fiels need an input validator
TODO: Fix being able to resize viewerW smaller than imgW - current behavior is imgw resizes with viewerW. If that's the desired behavior, imgW still doesn't write the udpated width to Appdata, that needs to be fixed.
TODO: Fix bug - load 400X1000, multiple click on +50, Display Size shows 450 but the img doesn't grow...
TODO: Parent table class att only shows in CB output if Wrapper is selected, not in just the Partent table output.
TODO: Fix, when imgNW is greater than imgW the imgNW size flashes before resizing to the viewer size. This is probably because of the settimeout, which might not be necesssary if the onload function is running.
TODO: THe CCP should store all the currently selected options and restore them whenever the ccp is opened -- I think. Not sure if this is the right behavior...think bout it. Probably not. I think it does this anyway. 
TODO: Assign keyboard  shortcuts

*/
//SCRIPT START
//PAGE SETUP START

// Namespace
var Witty = (function () {

  // !VA Run on page load
  // document.addEventListener("DOMContentLoaded", function() {
  //   setTimeout(function(){ 
  //     // !VA Don't forget you can't use button aliases here..
  //     document.querySelector('#btn-ccp-make-td-tag').click();

  //   }, 500);
  // });

  // !VA Test function to identify the target of the mouseclick
  // window.onclick = e => {
  //   console.log('Clicked element');
  //   console.log(e.target);
  // };

  // !VA Click on Witty logo to run test function
  // var testbut = document.querySelector('#testme');
  // function runMe(evt) {
  //   console.log('runMe running');
  //   testbut.classList.add('active')
  // }


  var testbut = document.querySelector('#testme');
  var testbut2 = document.querySelector('#testme2');
  var addMe = function() {
    console.log('event listener');
  };

  var foo;
  foo = true;

  testbut.onclick = function() {
    // foo = !foo;
    // console.log('foo is: ' + foo);
    // foo ?  testbut2.addEventListener('click', addMe, false) : testbut2.removeEventListener('click', addMe, false);
    var Attributes = CBController.initGetAttributes();
    const getImgType = Attributes.imgType;
    console.log('getImgType is: ' + getImgType);
    
  };

  // !VA GLOBAL
  let myObject = {};
  myObject.variable = 'This is a string';


  // !VA Initialize Appdata object
  let Appdata = {};


  var UIController = (function() {



    // !VA Element Aliases
    // !VA UIController: Inspector ID strings
    const inspectorElements = {
      insFilename: '#ins-filename',
      insDisplay: '#ins-display-size',
      insDisksize: '#ins-disk-size',
      insAspect: '#ins-aspect',
      insSmallPhones: '#ins-small-phones',
      insLargePhones: '#ins-large-phones',
      insRetina: '#ins-retina',
      btnToggleCcp: '#btn-toggle-ccp',
      spnDisplaySizeHeight: '#spn-display-size-height',
      spnDisplaySizeWidth: '#spn-display-size-width',
      spnSmallPhonesHeight: '#spn-small-phones-height',
      spnSmallPhonesWidth: '#spn-small-phones-width',
      spnLargePhonesHeight: '#spn-large-phones-height',
      spnLargePhonesWidth: '#spn-large-phones-width',
    };

    const inspectorLabels = {
      insDisplaySizeLabel: '#ins-display-size-label',
      insDiskSizeLabel: '#ins-disk-size-label',
      insAspectLabel: '#ins-aspect-label',
      insSmallPhonesLabel: '#ins-small-phones-label',
      insLargePhonesLabel: '#ins-large-phones-label',
      insRetinaLabel: '#ins-retina-label'
    };

    const inspectorValues = {
      insDisplaySizeWidthValue: '#ins-display-size-width-value',
      insDisplaySizeHeightValue: '#ins-display-size-height-value',
      insDiskSizeWidthValue: '#ins-disk-size-width-value',
      insDiskSizeHeightValue: '#ins-disk-size-height-value',
      insAspectValue: '#ins-aspect-value',
      insSmallPhonesWidthValue: '#ins-small-phones-width-value',
      insSmallPhonesHeightValue: '#ins-small-phones-height-value',
      insLargePhonesWidthValue: '#ins-large-phones-width-value',
      insLargePhonesHeightValue: '#ins-large-phones-height-value',
      insRetinaWidthValue: '#ins-retina-width-value',
      insRetinaHeightValue: '#ins-retina-height-value',
    };


    // !VA UIController: toolButton ID Strings
    const toolbarElements = {
      iptTbrViewerW: '#ipt-tbr-viewerw',
      btnTbrIncr50: '#btn-tbr-incr50',
      btnTbrIncr10: '#btn-tbr-incr10',
      btnTbrIncr01: '#btn-tbr-incr01',
      iptTbrImgWidth: '#ipt-tbr-imgwidth',
      iptTbrImgHeight: '#ipt-tbr-imgheight',
      btnTbrDecr01:'#btn-tbr-decr01',
      btnTbrDecr10: '#btn-tbr-decr10',
      btnTbrDecr50: '#btn-tbr-decr50',
      iptTbrSPhonesWidth: '#ipt-tbr-sphones-width',
      iptTbrLPhonesWidth: '#ipt-tbr-lphones-width',
    };

    // !VA UIController: dynamicRegions
    const dynamicRegions = {
      curImg: '#cur-img',
      imgViewer: '#main-image-viewer',
      imgViewport: '#image-viewport',
      appContainer: '#app-container',
    };

    // !VA UIController: staticRegions
    const staticRegions = {
      dropArea: '#drop-area',
      tbrContainer: '#toolbar-container',
      ccpContainer: '#ccp',
      msgContainer: '#msg-container',
      appBlocker: '#app-blocker',
      hdrIsolateApp: '.header-isolate-app'
    };

    // !VA  UIController: ccpUserInput ID Strings
    // !VA imgAnchor is just a flag for the status of the checkbox. The actual propStrings have to have an Open and Close property.
    const ccpUserInput = {
      // !VA Not renaming the checkbox/checkmarks because they already have code that queries the last three characters to determine if mrk or box...
      // !VA IMG tag user input
      iptCcpImgClass: '#ipt-ccp-img-class',
      iptCcpImgAlt: '#ipt-ccp-img-alt',
      rdoCcpImgFixed: '#rdo-ccp-img-fixed',
      rdoCcpImgFluid: '#rdo-ccp-img-fluid',
      selCcpImgAlign: '#sel-ccp-img-align',
      iptCcpImgRelPath: '#ipt-ccp-img-relpath',
      spnCcpImgIncludeAnchorCheckmrk: '#spn-ccp-img-include-anchor-checkmrk',
      // !VA TD tag user input
      iptCcpTdClass: '#ipt-ccp-td-class',
      selCcpTdAlign: '#sel-ccp-td-align',
      selCcpTdValign: '#sel-ccp-td-valign',
      iptCcpTdHeight: '#ipt-ccp-td-height',
      iptCcpTdWidth: '#ipt-ccp-td-width',
      iptCcpTdBgColor: '#ipt-ccp-td-bgcolor',
      iptCcpTdFontColor: '#ipt-ccp-td-fontcolor',
      iptCcpTdBorderColor: '#ipt-ccp-td-bordercolor',
      iptCcpTdBorderRadius: '#ipt-ccp-td-borderradius',
      rdoCcpTdBasic: '#rdo-ccp-td-basic',
      rdoCcpTdExcludeimg: '#rdo-ccp-td-excludeimg',
      rdoCcpTdImgswap: '#rdo-ccp-td-imgswap',
      rdoCcpTdPosswitch: '#rdo-ccp-td-posswitch',
      rdoCcpTdBgimage: '#rdo-ccp-td-bgimage',
      rdoCcpTdVmlbutton: '#rdo-ccp-td-vmlbutton',
      // !VA TABLE tag user input
      iptCcpTableClass: '#ipt-ccp-table-class',
      selCcpTableAlign: '#sel-ccp-table-align',
      iptCcpTableWidth: '#ipt-ccp-table-width',
      // !VA Not in use yet
      // tableMaxWidth: '#ipt-ccp-table-max-width',
      iptCcpTableBgColor: '#ipt-ccp-table-bgcolor',
      spnCcpTableIncludeWrapperCheckmrk: '#spn-ccp-table-include-wrapper-checkmrk',
      iptCcpTableWrapperClass: '#ipt-ccp-table-wrapper-class',
      iptCcpTableWrapperWidth: '#ipt-ccp-table-wrapper-width',
      selCcpTableWrapperAlign: '#sel-ccp-table-wrapper-align',
      iptCcpTableWrapperBgColor: '#ipt-ccp-table-wrapper-bgcolor',
    };
    
    // !VA CCP Elements used for tooltips. This is a different list than the CCPUserInput elements although some are duplicated. The element that triggers the tooltip has to be the parent element of the input or checkbox element, otherwise if the user hovers over a label instead of the actual input element, nothing happens.
    const ccpUserInputLabels = {
      selCcpImgAlignLabel: '#sel-ccp-img-align-label',
      iptCcpImgClassLabel: '#ipt-ccp-img-class-label',
      iptCcpImgRelpathLabel: '#ipt-ccp-img-relpath-label',
      iptCcpImgAltLabel: '#ipt-ccp-img-alt-label',
      iptCcpImgIncludeWidthHeightLabel: '#ccp-img-include-width-height-label',
    };
      
    const btnCcpMakeClips = {
      // !VA Build HTML Clipboard Buttons
      // !VA NEW
      btnCcpMakeImgTag: '#btn-ccp-make-img-tag',
      // btnCcpImgBuildHtmlClip: '#btn-ccp-img-build-html-clip',
      btnCcpMakeTdTag: '#btn-ccp-make-td-tag',
      btnCcpMakeTableTag: '#btn-ccp-make-table-tag',
      
      // !VA Make Image CSS Rule Buttons
      btnCcpMakeImgDsktpCssRule: '#btn-ccp-make-img-dsktp-css-rule',
      btnCcpMakeImgSmphnCssRule: '#btn-ccp-make-img-smphn-css-rule',
      btnCcpMakeImgLgphnCssRule: '#btn-ccp-make-img-lgphn-css-rule',
      // !VA Make Td CSS Rule Buttons
      btnCcpMakeTdDsktpCssRule:  '#btn-ccp-make-td-dsktp-css-rule',
      btnCcpMakeTdSmphnCssRule: '#btn-ccp-make-td-smphn-css-rule',
      btnCcpMakeTdLgphnCssRule: '#btn-ccp-make-td-lgphn-css-rule',
      // !VA Make Table CSS Rule  Buttons
      btnCcpMakeTableDsktpCssRule:  '#btn-ccp-make-table-dsktp-css-rule',
      btnCcpMakeTableSmphnCssRule: '#btn-ccp-make-table-smphn-css-rule',
      btnCcpMakeTableLgphnCssRule: '#btn-ccp-make-table-lgphn-css-rule',
      
    };
    
    // !VA Appmessage elements
    const appMessageElements = {
      tipContent: '#tip-content',
      msgContent: '#msg-content',
      errContent: '#err-content'
    };

    // !VA UIController private
    // !VA Reboot: passing in Appdata from 
    function evalInspectorAlerts(Appobj) {
      // !VA init inspector and flagged inspector lists
      let allInspectors = [];
      // !VA Array to hold the flagged inspector labels
      let flaggedInspectors = [];
      // !VA Get all the Inspector labels
      allInspectors = UIController.getInspectorLabelsIDs();
      // !VA Query Appdata
      // let Appdata = {};
      // Appdata = appController.initGetAppdata(false);
      // !VA Size On Disk is NOT 2X the Display Size: flag Size on Disk and Retina
      if (Appobj.imgNW < (Appobj.imgW * 2) ) {
        flaggedInspectors.push(allInspectors.insDiskSizeLabel);
      } 
      // !VA Small phones isn't at least 2X size on Disk and Retina
      if (Appobj.imgNW < (Appobj.sPhonesW * 2) ) {
        flaggedInspectors.push(allInspectors.insSmallPhonesLabel);
      }
      // !VA Large phones isn't at least 2X Size on Disk and Retina
      if (Appobj.imgNW < (Appobj.lPhonesW * 2) ) {
        flaggedInspectors.push(allInspectors.insLargePhonesLabel);
      } 
      // !VA Reset all the dim viewer alerts by passing in the entire Inspector array. We're running this function twice here, each time with different parameters -- could be DRYer but it works and 
      // UIController.writeInspectorAlerts(allInspectors, false);
      // !VA Now set the individual dim viewer alerts for the current image.
      UIController.writeInspectorAlerts(flaggedInspectors);
    }

    // !VA UIController private
    function showAppMessages(appMessContainerId, tooltipTarget) {
      // !VA Show the current appMessage. If the current appMessage is a tooltip, then show the help cursor while the mouse is in the tooltip element.
      document.querySelector(appMessContainerId).classList.add('active');
      if (!appMessContainerId.includes('tip')) {
        document.querySelector(staticRegions.appBlocker).classList.add('active');
      } 
    }

    // !VA UIController private
    function hideAppMessages(appMessContainerId, tooltipTarget) {
      // !VA Hide current app message
      document.querySelector(staticRegions.appBlocker).classList.remove('active');
      document.querySelector(appMessContainerId).classList.remove('active');
    }

    // !VA UIController private
    // !VA Calc the apsect ratio - putting this here for now until it's decided where it needs to live. It's currently needed in appController for Appdata but can live in UIController private once Appdata is deprecated.
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

    // !VA UIController private
    function handleCcpInput(arg) {
      console.log('handleCcpInput running');
      console.log('arg is: ');
      console.dir(arg);
      document.querySelector(arg[0]).value = arg[1];
    }




    // !VA CCP FUNCTIONS

    // !VA UIController public functions
    return {

      // !VA V2 Return all the strings for the UI element's IDs
      getInspectorElementIDs: function() {
        return inspectorElements;
      },
      getInspectorValuesIDs: function() {
        return inspectorValues;
      },
      getInspectorLabelsIDs: function() {
        return inspectorLabels;
      },
      // !VA Reboot: This is wrong now after renaming
      getToolButtonIDs: function() {
        return toolbarElements;
      },
      getDynamicRegionIDs: function() {
        return dynamicRegions;
      },
      getStaticRegionIDs: function() {
        return staticRegions;
      },
      getCcpUserInputIDs: function() {
        return ccpUserInput;
      },
      getCcpUserInputLabelIds: function() {
        return ccpUserInputLabels;
      },
      getBtnCcpMakeClips: function() {
        return btnCcpMakeClips;
      },
      getAppMessageElements: function() {
        return appMessageElements;
      },

      // !VA UIController public
      initUI: function(initMode) {

        const delayInMilliseconds = 10;
        // !VA Here we initialze DEV mode, i.e. reading a hardcoded image from the HTML file instead of loading one manually in production mode
        // !VA Branch: implementAppobj01 (060420) Adding nothing to Appobj here since this is only devmode
        if (initMode === 'devmode') {

          // !VA The app initializes with the CCP closed, so toggle it on and off here.
          // document.querySelector(staticRegions.ccpContainer).classList.toggle('active');

          // !VA Set a timeout to give the image time to load
          setTimeout(function() {
            // !VA Show the toolbar and curImg region
            // !VA TODO: Make function
            document.querySelector(staticRegions.tbrContainer).style.display = 'block';
            document.querySelector(dynamicRegions.curImg).style.display = 'block';
            // !VA  Get the insFilename of the devImg in the HTML. This is the only time we'll have an actual source file -- in user mode all the images are blobs -- so we can do this as a one-off.
            var fname = document.querySelector(dynamicRegions.curImg).src;
            fname = fname.split('/');
            fname = fname[fname.length - 1];
            // !VA Branch: implementAppobj02 (060420)
            // !VA Call Appobj and add filename to it here for dev mode
            var Appobj = appController.getAppobj();
            document.querySelector(inspectorElements.insFilename).textContent = Appobj.fileName = fname;



            // !VA Write the insFilename to the DOM so we can add it later to Appdata. It's not completely DRY because it's added to the DOM here and later to Appdata, and then queried in the CCP from Appdata, but it's better than having to query it from the DOM every time it's used in a separate function call. This way, we can loop through Appdata to get it if we need to.
            document.querySelector(inspectorElements.insFilename).textContent = fname;
            // !VA Initialze calcViewerSize to size the image to the app container areas
            appController.initCalcViewerSize();
            // !VA Open the CCP by default in dev mode
            // !VA First, set it to the opposite of how you want to start it.
            document.querySelector(staticRegions.ccpContainer).classList.add('active');

            // !VA NOW: The toggle Ccp element functions are all in appController either I have to replicated them here or find another solution or live with the fact that they don't initialize. Or run initUI from here...

          }, delayInMilliseconds);
        }
        // !VA The rest of the routine applies to DEV and PROD modes
        // !VA Initialize the input fields for the pertinent device widths: viewerW, sPhonesW and lPhonesW. Also initialize the data attributes for sphonesw and lphonesw - we only want to access the localStorage once and the rest we do using data-attributes
        let arr = [], curDeviceWidths = [];
        // !VA Clear localStorage for testing only.
        // localStorage.clear();
        // !VA If localStorage is set for viewerW, sPhonesW or lgPhones, add the localStorage value to curDeviceWidths, otherwise set the defaults used when the app is used for the first time or no user-values are entered.
        arr = [ 'viewerW', 'sPhonesW', 'lPhonesW' ];
        // !VA If there's localStorage, push it to the curDeviceWidths array. Otherwise, push false.
        for (let i = 0; i < arr.length; i++) {
          localStorage.getItem(arr[i]) ? curDeviceWidths.push(localStorage.getItem(arr[i])) : curDeviceWidths.push(false);
        }
        // !VA TODO: Shouldn't all localStorage operations be in one place?
        // !VA If there's a localStorage for viewerW, put that value into the viewerW field of the toolbar, otherwise use the default. NOTE: The default is set ONLY in the HTML element's placeholder. The advantage of this is that we can get it anytime without having to set a global variable or localStorage for the default.
        // !VA Branch: implementAppobj01 (060420): Not adding this to Appobj yet because we're still in appController.
        curDeviceWidths[0] ?  document.querySelector(toolbarElements.iptTbrViewerW).value = curDeviceWidths[0] : document.querySelector(toolbarElements.iptTbrViewerW).value = document.querySelector(toolbarElements.iptTbrViewerW).placeholder;
        // !VA If there's a localStorage for sPhonesW, get it, otherwise set the default to the placeholder in the HTML element on index.html. Then set the toolbar input field AND the sphonesw data attribute to this value. NOTE: The default is set ONLY in the HTML element's placeholder!
        curDeviceWidths[1] ? curDeviceWidths[1] : curDeviceWidths[1] = document.querySelector(toolbarElements.iptTbrSPhonesWidth).placeholder;
        document.querySelector(toolbarElements.iptTbrSPhonesWidth).value = curDeviceWidths[1];
        document.querySelector(toolbarElements.iptTbrSPhonesWidth).setAttribute('data-sphonesw', curDeviceWidths[1]);
        // !VA If there's a localStorage for lPhonesW, get it, otherwise set the default to the placeholdere in the HTML element in index.html. Then set the toolbar input field AND the lphonesw data attribute to this value. NOTE: The default is set ONLY in the HTML element's placeholder!
        curDeviceWidths[2] ? curDeviceWidths[2] : curDeviceWidths[2] = document.querySelector(toolbarElements.iptTbrLPhonesWidth).placeholder;
        document.querySelector(toolbarElements.iptTbrLPhonesWidth).value = curDeviceWidths[2];
        document.querySelector(toolbarElements.iptTbrLPhonesWidth).setAttribute('data-lphonesw', curDeviceWidths[2]);

        // !VA Make sure the tbrContainer is off and the dropArea is on.
        // !VA TODO: Make function
        document.querySelector(staticRegions.dropArea).style.display = 'flex';
        document.querySelector(staticRegions.tbrContainer).style.display = 'none';
        document.querySelector(inspectorElements.btnToggleCcp).style.display = 'none';

        // !VA Set this to the opposite of what you want
        document.querySelector(staticRegions.ccpContainer).classList.add('active');
        // !VA Inspector initialization comes now from the HTML file. The default 'No Image' is display: inline in CSS. When an image is loaded, inspectors are populated with values in UIController.writeInspectors.
        // !VA Branch: implementAppobj02 (060620)
        // !VA INitialize the CCP
        appController.initCcp();
      },


      // !VA UIController public
      // !VA Writes the dynamicRegion elements to the DOM based on Appobj and the height of the viewerW containers. Called from resizeContainers
      // !VA TODO: resizeContainers doesn't really have much left in it - consider splitting calcViewerSize or integrating resizeContainers into it since it now doesn't have any DOM access either
      writeDynamicRegionsDOM: function(Appobj, viewportH, appH) {
        console.log('writeDynamicRegionsDOM running');
        console.log('writeDynamicRegionsDOM Appobj is: ');
        console.log(Appobj);

        // !VA TODO: Make function
        document.querySelector(dynamicRegions.imgViewer).style.width = Appobj.viewerW + 'px';
        document.querySelector(dynamicRegions.curImg).style.width = Appobj.imgW + 'px';
        document.querySelector(dynamicRegions.curImg).style.height = Appobj.imgH + 'px';
        document.querySelector(dynamicRegions.imgViewer).style.height = Appobj.viewerH + 'px';
        document.querySelector(dynamicRegions.imgViewport).style.height = viewportH + 'px';
        document.querySelector(dynamicRegions.appContainer).style.height = appH + 'px';

      }, 

      // !VA Branch: implementAppobj04 (061020)
      // !VA Write specific CCP DOM element values based one or more arguments consisting of key/value array where the key is the element alias and the value is the value. 
      // !VA Let's try to derive the type of write action, i.e. value, disable, active class, from the ID argument. 
      writeCcpDOM: function (...args) {
        console.log('writeCcpDOM running');
        console.log('args is: ');
        console.log(args);
        for (let i = 0; i < args.length; i++) {
          // document.querySelector(args[i][0]).value = args[i][1];
          console.log('args[i] is: ' +  args[i]);
          if (args[i][0].substring( 0 , 4) === '#ipt') {
            console.log('This is an input element');
            handleCcpInput(args[i]);
          } else if (args[i][0].substring( 0 , 4) === '#rdo') {
            console.log('This is a radio button');
          } else if (args[i][0].substring( 0 , 4) === '#sel') {
            console.log('This is a select dropdown');
          } else if (args[i][0].substring( 0 , 4) === '#spn') {
            console.log('This is a mock checkbox');
          }
        }
      },

      populateAppobj: function (Appobj, access) {
        // !VA IIFE for populating 
        // let Appobj = {};
        let curImg, imgViewer, cStyles;
        // !VA Get the values for the dynamicRegions
        // !VA Get the curImg and imgViewer
        // !VA Branch: implementAppobj02 (060620)
        // console.log('access is: ' + access);
        // !VA TODO: Move to external if appropriate
        function chkmrkToChkbox(val) {
          val = val.replace('mrk', 'box');
          val = val.replace('spn', 'chk');
          return val;
        }
        function populateAppProperties(Appobj) {

          curImg = document.querySelector(dynamicRegions.curImg);
          imgViewer = document.querySelector(dynamicRegions.imgViewer);
          // !VA Get the computed width and height of imgViewer
          cStyles = window.getComputedStyle(imgViewer);

          // !VA Branch: implementAppobj03 (060820)
          // !VA Get the computed width in case there is no value from localStorage. In that case, the value is coming from the CSS file. 
          // !VA If there's no local storage, then just default to 650 rather than getting it from the CSS file - but leave it in here commented out just in case that causes problems later.
          // Appobj.viewerW = parseInt(cStyles.getPropertyValue('width'), 10);
          Appobj.viewerW = 650;
          // console.log('Appobj.viewerW is: ' + Appobj.viewerW);

          // !VA Branch: implementAppobj01 (060420)
          // !VA Get the computed height in case there is no value from localStorage. In that case, the value is coming from the CSS file. 
          // !VA If there's no local storage, then just default to 450 rather than getting it from the CSS file - but leave it in here commented out just in case that causes problems later.
          // Appobj.viewerW = parseInt(cStyles.getPropertyValue('width'), 10);
          Appobj.viewerH = 450;

          // !VA Get the dimensions of curImg
          Appobj.imgW = curImg.width;
          Appobj.imgH = curImg.height;
          Appobj.imgNW = curImg.naturalWidth;
          Appobj.imgNH = curImg.naturalHeight;
          
          // !VA Get the data properties for iptTbrSmallPhonesW and sPhonesH
          // !VA NOTE: This is no good. Can't query Appdata when it doesn't exist. Try this: if the current value doesn't equal the placeholder value...let's leave this for later and hope there's no catastrophe!
          // !VA It appears the default is coming from the placeholder now rather than the data attribute - 
          Appobj.sPhonesW = parseInt(document.querySelector(toolbarElements.iptTbrSPhonesWidth).getAttribute('data-sphonesw'), 10);
          Appobj.lPhonesW = parseInt(document.querySelector(toolbarElements.iptTbrLPhonesWidth).getAttribute('data-lphonesw'), 10);
          Appobj.iptTbrSPhonesWidth ? Appobj.iptTbrSPhonesWidth : Appobj.iptTbrSPhonesWidth = parseInt(document.querySelector(toolbarElements.iptTbrSPhonesWidth).placeholder, 10);
          Appobj.iptTbrLPhonesWidth ? Appobj.iptTbrLPhonesWidth : Appobj.iptTbrLPhonesWidth = parseInt(document.querySelector(toolbarElements.iptTbrLPhonesWidth).placeholder, 10);
          // !VA Now compute the rest of Appobj
          Appobj.aspect = getAspectRatio(Appobj.imgNW,  Appobj.imgNH);
          Appobj.sPhonesH = Math.round(Appobj.sPhonesW * (1 / Appobj.aspect[0]));
          Appobj.lPhonesH = Math.round(Appobj.lPhonesW * (1 / Appobj.aspect[0]));

        }
        function populateCcpProperties(Appobj) {
          // console.log('initCCP Appobj is: ');
          // console.log(Appobj);
          // !VA Update CCP properties
          // !VA Now initialize Appobj with the CCP element values. This includes ALL CCP elements, including those that are displayed/undisplayed depending on which TDOption or imgType radio is selected. 
          // !VA Don't forget to use bracket notation to add properties to an object: https://stackoverflow.com/questions/1184123/is-it-possible-to-add-dynamically-named-properties-to-javascript-object
          // !VA  for loop: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
          let val;
          // !VA Loop through all the ccpUserInput properties. If the property is NOT a span (i.e. a mock checkbox) add an Appobj property that corresponds to the key of the respective ccpUserInput property. Otherwise, convert the span ID to the input ID, then add the Appobj property that corresponds to the key of the respective ID.
          // !VA For instance, if the ccpUserInput value starts with '#ipt', create an Appobject property whose key is 'iptCCP...' and assign it the value of the CCP element with the corresponding ccpUserInput alias.
          for (const [key, value] of Object.entries(ccpUserInput)) {
            if (value.substring( 0, 4) === '#ipt' || value.substring( 0, 4) === '#sel' ) {
              Appobj[key] = document.querySelector(value).value;
            }
            if (value.substring( 0, 4) === '#rdo' ) {
              Appobj[key] = document.querySelector(value).checked;
            }
            if (value.substring( 0, 4) === '#spn' ) {
              val = chkmrkToChkbox(value);
              Appobj[key] = document.querySelector(val).value;
            }
          }
        }

        if ( access === 'app') {
          // !VA Branch: implementAppobj02 (060620)
          // !VA Write dynamic region values 
          populateAppProperties(Appobj);
        } else if ( access === 'ccp') {
          populateCcpProperties(Appobj);
        } else if ( access === 'all' ) {
          populateAppProperties(Appobj);
          populateCcpProperties(Appobj);
        } else {
          console.log('Error in populateAppobj: unknown argument - access');
        }
        return Appobj;
      },

      // !VA UIController public 
      toggleCcp: function() {
        // !VA Branch: implementAppobj02 (060620)
        // !VA NOTE: All this does now is toggle the CCP on and off.
        let isActive;
        /* !VA   This is where we write the Appobj properties somehow. But no - because the values aren't written to the input elements yet. Where is that done? In toggleImgType, then handleCcpActions. What's happening is that handleCcpActions gets the values from the Attributes, where the values are defined. That's ass-backwards. The values should be defined in Appobj and then written to the Attributes. So let's try that. 
      */ 
        // showTdOptions();
        // !VA Initialize the fixed/fluid imgType buttons - call getAttributes and populate the CCP elements with values based on whether fixed or fluid is selected.
        // toggleImgType();
        // !VA Initialize the Include wrapper checkboxes. Pass in false for the evt argument for initialization so that the function skips over the button click condition and just executes the display/undisplay functionality.
        // toggleIncludeWrapper('init');
        // !VA Initialize the tdoptions radio group to 'basic' if the 'fluid' imgType is selected
        // !VA NOTE: This would be better as a loop
        // if (document.querySelector(ccpUserInput.rdoCcpImgFluid).checked === true) {
        //   document.querySelector(ccpUserInput.rdoCcpTdBasic).checked = true;
        //   document.querySelector(ccpUserInput.rdoCcpTdExcludeimg).disabled = true;
        // } 
        // !VA IMPORTANT: Isn't this done somewhere else too? The app initializes with the CCP closed, so toggle it on and off here.




        // !VA Toggle the CCP on and off
        document.querySelector(staticRegions.ccpContainer).classList.toggle('active');

        // !VA If the CCP is displayed, return true, otherwise false
        document.querySelector(staticRegions.ccpContainer).classList.contains('active') ? isActive = true : isActive = false;
        return isActive;
      },

      // !VA UIController public
      queryDOMElements: function() {
        // !VA Branch: implementAppobj01 (060420)
        // !VA Add all these values to Appobj in addition to creating the domelements return array. There's no reason to do this in UICtrl though since we're not writing anything TO the UI, we're just getting values from it to populate Appobj. At this point curImg is already loaded and the 

        // !VA Return the non-calculated DOM elements and data properties, i.e. the properties that are retrieved from the DOM or from data properties: curImg.imgW, curImg.imgW, curImg.imgNW, curImg.NH and viewerW. These are passed to getAppdata, which then creates the Appdata object. Aspect is calculated from imgNW and imgNH - that calculation is done in appController, so it will be added to Appdata there.
        // !VA Declare the local variables and populate the elements array
        let fname, viewerW, viewerH, imgW, imgH, imgNW, imgNH, sPhonesW, lPhonesW;
        let domElements = {};
        domElements = {fname, viewerW, viewerH, imgW, imgH, imgNW, imgNH, sPhonesW, lPhonesW};
        let curImg, imgViewer, cStyles;

        // !VA Get the insFilename from the Inspector
        // !VA Branch: implementAppobj01 (060420): This has already been added to Appobj in handleFileSelect so need to do it again
        domElements.fname = document.querySelector(inspectorElements.insFilename).textContent;

        // !VA Get the curImg and imgViewer
        curImg = document.querySelector(dynamicRegions.curImg);
        imgViewer = document.querySelector(dynamicRegions.imgViewer);
        // !VA Get the computed width and height of imgViewer
        cStyles = window.getComputedStyle(imgViewer);
        domElements.viewerW = parseInt(cStyles.getPropertyValue('width'), 10);
        // !VA Branch: implementAppobj01 (060420)
        // Appobj.viewerW = parseInt(cStyles.getPropertyValue('width'), 10);

        domElements.viewerH = parseInt(cStyles.getPropertyValue('height'), 10);
        // !VA Get the dimensions of curImg
        domElements.imgW = curImg.width;
        domElements.imgH = curImg.height;
        domElements.imgNW = curImg.naturalWidth;
        domElements.imgNH = curImg.naturalHeight;
        // console.log('queryDomelements: this is: ');
        // console.log(this);
        
        
        // !VA Get the data properties for iptTbrSmallPhonesW and sPhonesH
        // !VA NOTE: This is no good. Can't query Appdata when it doesn't exist. Try this: if the current value doesn't equal the placeholder value...let's leave this for later and hope there's no catastrophe!
        domElements.sPhonesW = parseInt(document.querySelector(toolbarElements.iptTbrSPhonesWidth).getAttribute('data-sphonesw'), 10);
        domElements.lPhonesW = parseInt(document.querySelector(toolbarElements.iptTbrLPhonesWidth).getAttribute('data-lphonesw'), 10);
        domElements.iptTbrSPhonesWidth ? domElements.iptTbrSPhonesWidth : Appdata.iptTbrSPhonesWidth = parseInt(document.querySelector(toolbarElements.iptTbrSPhonesWidth).placeholder, 10);
        domElements.iptTbrLPhonesWidth ? domElements.iptTbrLPhonesWidth : Appdata.iptTbrLPhonesWidth = parseInt(document.querySelector(toolbarElements.iptTbrLPhonesWidth).placeholder, 10);
        return domElements;
      },

      // !VA Catch-all function for displaying/undisplaying, disabling/enabling and adding/removing classes to CCP elements. action is the action to execute, elemArray is the array of elements the action is to apply to and state is the toggle state whereby true turns the action on and false turns it off.
      handleCcpActions: function (action, elemArray, option ) {
        // console.clear();
        // console.log('handleCcpDisplay running');
        // console.log('action');
        // console.dir(action);
        // console.log('elemArray:');
        // console.dir(elemArray);
        // console.log('option');
        // console.dir(option);
        let elem, str, elementLabel;
        // !VA This function gets the id of the parent div of the td option to be displayed/hidden. We need the parent div because it contains label and input of the element, not just the input field or dropdown list itself.
        function getParentDiv(parentDivId) {
          parentDivId = '#' + parentDivId.substring( 5 );
          return parentDivId;
        }

        // !VA Function to show the specific options available for the selected TD options radio
        function setActiveClass(elemArray, option) {
          for (let i = 0; i < elemArray.length; i++) {
            // !VA If the action parameter contains the string 'parent' then apply/remove the active class to/from the parent of the target rather than the target itself.
            if (action.includes('parent')) {
              elem = getParentDiv(elemArray[i]);
            }
            // !VA If the option parameter is true, add the active class, otherwise remove it.
            if (option) {
              document.querySelector(elem).classList.add('active');
            } else {
              document.querySelector(elem).classList.remove('active');
            }
          }
        }

        // !VA Loop through and apply values to elements. The option parameter contains an array of values or false, in which case an empty string is appled to every element.
        function setValue(elemArray, option) {
          for (let i = 0; i < elemArray.length; i++) {
            if (option) {
              document.querySelector(elemArray[i]).value = option[i];
            } else {
              document.querySelector(elemArray[i]).value = '';
            }
          }
        }


        // !VA Disables/enables an radio button element, applies/removes the disabled-radio class to the input element, and applies the disabled class to the input element's label. NOTE: Currently need a separate function to disable text input elements but that can probably be folded into this.
        elementLabel;
        function setDisabledRadio(elemArray, option) {
          for (let i = 0; i < elemArray.length; i++) {
            if (option) {
              str = elemArray[i];
              elementLabel = str + '-label';
              document.querySelector(elementLabel).classList.add('disabled');
              document.querySelector(elemArray[i]).disabled = true;
              document.querySelector(elemArray[i]).classList.add('disabled-radio');
            } else {
              str = elemArray[i];
              elementLabel = str + '-label';
              document.querySelector(elementLabel).classList.remove('disabled');
              document.querySelector(elemArray[i]).disabled = false;
              document.querySelector(elemArray[i]).classList.remove('disabled-radio');
            }
          }
        }

        // !VA Disables/enables a text input field, applies/removes the disabled-input class to the input element, and applies the disabled class to the input element's label. NOTE: Currently need a separate function to disable radio button elements but that can probably be folded into this.
        function setDisabledTextInput(elemArray, option) {
          for (let i = 0; i < elemArray.length; i++) {
            if (option) {
              str = elemArray[i];
              elementLabel = str + '-label';
              document.querySelector(elementLabel).classList.add('disabled');
              document.querySelector(elemArray[i]).disabled = true;
              document.querySelector(elemArray[i]).classList.add('disabled');
            } else {
              str = elemArray[i];
              elementLabel = str + '-label';
              document.querySelector(elementLabel).classList.remove('disabled');
              document.querySelector(elemArray[i]).disabled = false;
              document.querySelector(elemArray[i]).classList.remove('disabled');
            }
          }
        }

        function selectRadioButton(elemArray, option) {
          for (let i = 0; i < elemArray.length; i++) {
            document.querySelector(elemArray).checked = option;
          }
        }

        switch(true) {
        // !VA In showTdOptions: Active class must be applied to the parent div of the target in order to display/undisplay the container including input and label. 
        case action === 'setactiveparent':
          // console.log('setactiveparent...');
          setActiveClass(elemArray, option);
          break;
        case action === 'setdisabledradio':
          // console.log('setdisabledradio...');
          setDisabledRadio(elemArray, option);
          break;
        case action === 'setdisabledtextinput':
          // console.log('setdisabledtextinput...');
          setDisabledTextInput(elemArray, option);
          break;
        case action === 'setvalue':
          // console.log('setvalue');
          setValue(elemArray, option);
          break;
        case action === 'selectradiobutton':
          // console.log('setvalue');
          selectRadioButton(elemArray, option)
          break;
        default:
          console.log('handleCcpActions: no action defined');
        } 
      },

      // !VA UIController public
      // !VA This has to cancel the timeouts for the runmn
      displayAppMessages: function (isShow, appMessContainerId, tooltipTarget) {
        // !VA Pass-thur public function to pass display actions to the UIController. If isShow is true, call showAppMessages. If it's false, call hideAppMessages. NOTE: the tooltip appMessage is undisplayed in 
        isShow ? showAppMessages(appMessContainerId, tooltipTarget) : hideAppMessages(appMessContainerId, tooltipTarget);
      },


     
      // !VA UIController public getAppdata
      // !VA Moved getAppdata from appController to UIController because Appdata is derived from the DOM elements and data properties that reside in the DOM. 



   
      // !VA UIController public
      writeInspectors: function(Appobj) {
        // !VA Hide  the default 'No Image' value displayed when the app is opened with no image and display the Inspector values for the current image, show the Clipboard button and call evalInspectorAlerts to determine which Inspector labels should get dimension alerts (red font applied). 

        // !VA Hide the dropArea
        // !VA TODO: Make function
        document.querySelector(staticRegions.dropArea).style.display = 'none';
        // Write the inspectorElements
        document.querySelector(inspectorElements.insFilename).innerHTML = `<span class='pop-font'>${Appobj.fileName}</span>`;
        // !VA Inspectors: Hide all the P elements with the class 'no-image' that contain the default 'No Image' text 
        for (let i = 0; i < document.getElementsByClassName('no-image').length; i++) {
          document.getElementsByClassName('no-image')[i].style.display = 'none';
        }
        // !VA Show all the inspector-label, inspector-x and inspector-values 
        for (let i = 0; i < document.getElementsByClassName('inspector-label').length; i++) {
          document.getElementsByClassName('inspector-label')[i].style.display = 'inline';
        }
        for (let i = 0; i < document.getElementsByClassName('inspector-x').length; i++) {
          document.getElementsByClassName('inspector-x')[i].style.display = 'inline';
        }

        // !VA NOTE: This can all be moved to a UIController public funciton like handleCcpActions
        // !VA Display the respective Appdata value in the respective inspector value span 
        // !VA TODO: DRYify this.
        document.querySelector(inspectorValues.insDisplaySizeWidthValue).innerHTML = Appobj.imgW;
        document.querySelector(inspectorValues.insDisplaySizeHeightValue).innerHTML = Appobj.imgH;
        document.querySelector(inspectorValues.insDiskSizeWidthValue).innerHTML = Appobj.imgNW;
        document.querySelector(inspectorValues.insDiskSizeHeightValue).innerHTML = Appobj.imgNH;
        document.querySelector(inspectorValues.insSmallPhonesWidthValue).innerHTML = Appobj.sPhonesW;
        document.querySelector(inspectorValues.insSmallPhonesHeightValue).innerHTML = Appobj.sPhonesH;
        document.querySelector(inspectorValues.insLargePhonesWidthValue).innerHTML = Appobj.lPhonesW;
        document.querySelector(inspectorValues.insLargePhonesHeightValue).innerHTML = Appobj.lPhonesH;
        document.querySelector(inspectorValues.insAspectValue).innerHTML = Appobj.aspect[1];
        document.querySelector(inspectorValues.insRetinaWidthValue).innerHTML = (Appobj.imgW * 2);
        document.querySelector(inspectorValues.insRetinaHeightValue).innerHTML = (Appobj.imgH * 2);
        // // !VA  Display the clipboard button
        document.querySelector(inspectorElements.btnToggleCcp).style.display = 'block';
        // !VA Call evalInspectorAlerts to calculate which Inspector values don't meet HTML email specs.
        // !VA Reboot: nothing is passed here, although evalInspectorAlerts expects an argument. So lets' try to pass Appdata
        evalInspectorAlerts(Appobj);



      },

      //UIController public
      writeInspectorAlerts: function(flaggedInspectors) {
        // !VA flaggedInspectors are displayed in red font 
        const att = 'red';
        // !VA We want to use this same function to reset the dim alerts when a new image is loaded. So first, reset all the inspector labels to their inherited font.
        for (let i = 0; i < document.getElementsByClassName('inspector-label').length; i++) {
          document.getElementsByClassName('inspector-label')[i].style.color = 'inherit';
        }
        // !VA Now loop throught the flagged inspectors from evalInspectorAlerts and apply the alert font. First, test if the argument is an object, and if it is convert it into a list of values so the loop will accept it.
        if (Array.isArray(flaggedInspectors) === false) {
          flaggedInspectors = Object.values(flaggedInspectors);
        }
        // // !VA For each flaggedInspector from evalInspectorAlerts, set the font color style 
        for (let i = 0; i < flaggedInspectors.length; i++) {
          document.querySelector(flaggedInspectors[i]).style.color = att;
        }
      },

    };

  })();


  var CBController = (function() {

    // !VA CBController private functions
    // !VA NOTE: If we want to access any of the DOM IDs we have to call them from UIController where they're defined.
    var inspectorElements = UIController.getInspectorElementIDs();
    var ccpUserInput = UIController.getCcpUserInputIDs();
    var btnCcpMakeClips = UIController.getBtnCcpMakeClips();

    // !VA ATTRIBUTE FUNCTIONS
    // !VA CBController private
    // !VA Set values for all the Attributes of the individual ccpUserInput elements. Each attribute is either get-only or settable. If it is get-only, then the user-defined value is accessed directly from the DOM element. If it is a preset, then the value is defined programmatically based on a condition. For instance, the class name 'img-fluid' is a preset that becomes active when the user selects the Fluid image option. In this case, the CCP element ID corresponding to the attribute is written to the ccpElementId variable. Otherwise, ccpElement takes the false flag.
    // !VA NOTE: Could probably make all the retObject arguments ccpElementId, str and consolidate this function somehow -- think about it.
    function getAttributes() {
      // console.log('getAttributes running');
      var Appdata = appController.initGetAppdata();
      let checked, str, options, selectid, ccpElementId, imgType, Attributes, retObj;
      // !VA Create the array to return. First value is the id of the CCP element, second value is the string to write to the CCP element.
      function returnObject(ccpElementId, str ) {
        let obj = {};
        obj.id = ccpElementId;
        obj.str = str;
        return obj;
      }




      Attributes = {


        // !VA IMG attributes
        imgType:  (function() {
          // !VA This value is written to CCP so we can pre-select the tdoption 'basic' if the imgType 'fluid' is selected. 
          // !VA If the fixed radio button is checked, set ccpElementId to the fixed element id. Otherwise, set ccpEcurvcurlementId to the fluid element id. 
          document.querySelector(ccpUserInput.rdoCcpImgFixed).checked ? ccpElementId = ccpUserInput.rdoCcpImgFixed : ccpElementId = ccpUserInput.rdoCcpImgFluid;
          // !VA Now get the str based on the above
          ccpElementId === ccpUserInput.rdoCcpImgFixed ? str = 'fixed' : str = 'fluid';
          // !VA Locally, we need a variable for the imgType, so create one.
          imgType = str;


          

          retObj = returnObject(ccpElementId, str);

          return retObj;
        })(),
        imgClass: (function() {
          // !VA For fixed images, if there's a class name entered into the class input: return the input value, or if the class input is empty, don't include the class attribute. For fluid images, return the class name 'img-fluid'.


          
          // !VA This value is written to CCP so use ccpElementId
          ccpElementId = ccpUserInput.iptCcpImgClass;
          imgType === 'fixed' ? str = ccpGetAttValue('class',document.querySelector(ccpElementId).value) : str = 'img-fluid';
          retObj = returnObject(ccpElementId, str);
          return retObj;
        })(),
        imgWidth: (function() {
          // !VA This value is get-only
          ccpElementId = false;
          retObj = returnObject(ccpElementId, Appdata.imgW);
          return retObj;
        })(),
        imgHeight: (function() {
          // !VA This value is get-only
          ccpElementId = false;
          retObj = returnObject(ccpElementId, Appdata.imgH);
          return retObj;
        })(),
        imgAlt: (function() {
          // !VA This value is get-only
          ccpElementId = false;
          retObj = returnObject(ccpElementId, ccpGetAttValue('alt',document.querySelector(ccpUserInput.iptCcpImgAlt).value));
          return retObj;
        })(),
        imgSrc: (function() {
          // !VA This value is get-only
          ccpElementId = false;
          if (document.querySelector(ccpUserInput.iptCcpImgRelPath).value) {
            str =  document.querySelector(ccpUserInput.iptCcpImgRelPath).value + '/' + document.querySelector(inspectorElements.insFilename).textContent;
          }
          retObj = returnObject( ccpElementId, str);
          return retObj;
        })(),
        imgStyle: (function() {
          // !VA Get the selected state of the fixed imgType radio. If it is not selected, then the fluid option is selected. If fixed, include the width and height in the style attribute. If fluid, don't include them
          // !VA This value is never displayed in CCP, only written to Clipboard object, so it's  get-only.
          ccpElementId = false;
          imgType === 'fixed' ? str = `display: block; width: ${Appdata.imgW}px; height: ${Appdata.imgH}px; font-family: Arial, sans-serif; font-size: 16px; line-height: 15px; text-decoration: none; border: none; outline: none;` : str = 'display: block; font-family: Arial, sans-serif; font-size: 16px; line-height: 15px; text-decoration: none; border: none; outline: none;';
          retObj = returnObject(ccpElementId , str);
          return retObj;
        })(),
        imgAlign: (function() {  
          // !VA This value is get-only.
          ccpElementId = false;
          str = '', options = [], selectid = '';
          selectid = ccpUserInput.selCcpImgAlign;
          options = [ '', 'left', 'center', 'right'];
          str = getAlignAttribute( selectid, options );
          retObj = returnObject(ccpElementId, str);
          return retObj;
        })(),
        imgIncludeAnchor: (function() {
          // !VA This value is get-only.
          ccpElementId = false;
          let target, checked;
          target = ccpUserInput.spnCcpImgIncludeAnchorCheckmrk;
          checked = getCheckboxSelection(target);
          retObj = returnObject( ccpElementId, checked );
          return retObj;
        })(),
        // !VA TD Attributes
        // !VA TD Width and height from Appdata = imgW and imgW -- only used for Stig's BG image
        tdAppdataWidth: (function() {
          // !VA This value is get-only.
          ccpElementId = false;
          retObj = returnObject( ccpElementId, Appdata.imgW );
          return retObj;
        })(),
        tdAppdataHeight: (function() {
          // !VA This value is get-only.
          ccpElementId = false;
          retObj = returnObject( ccpElementId, Appdata.imgH );
          return retObj;
        })(),
        tdHeight: (function() {
          // !VA This value is get-only.
          ccpElementId = false;
          retObj = returnObject( ccpElementId, ccpIfNoUserInput('height',document.querySelector(ccpUserInput.iptCcpTdHeight).value));
          return retObj;
        })(),
        tdWidth: (function() {
          // !VA This value is get-only.
          ccpElementId = false;
          retObj = returnObject( ccpElementId, ccpIfNoUserInput('width',document.querySelector(ccpUserInput.iptCcpTdWidth).value) );
          return retObj;
        })(),
        // !VA The selected tdoption radio button determines which TD options will be displayed/undisplayed. Only the checked one will be displayed; all other ones will be undisplayed  
        tdBasic: (function() {
          // !VA This is a tdoptions selection radio - use ccpElementId
          ccpElementId = ccpUserInput.rdoCcpTdBasic;
          checked = getRadioState(ccpElementId);
          retObj = returnObject( ccpElementId, checked );
          return retObj;
        })(),
        tdExcludeimg: (function() {
          // !VA This is a tdoptions selection radio - use ccpElementId
          ccpElementId = ccpUserInput.rdoCcpTdExcludeimg;
          checked = getRadioState(ccpElementId);
          retObj = returnObject( ccpElementId, checked );
          return retObj;
        })(),
        tdImgswap: (function() {
          // !VA This is a tdoptions selection radio - use ccpElementId
          // !VA !VA  If the imgswap radio is selected, overwrite whatever is in the imgClass input with 'hide', set parent table class to 'devicewidth' and display it, set wrapper table class to 'devicewidth' and display it. Displaying/undisplaying and disabling/enabling is handled in handleCcpActions. 
          ccpElementId = ccpUserInput.rdoCcpTdImgswap;
          checked = getRadioState(ccpElementId);
          if (checked) {
            // document.querySelector(ccpUserInput.iptCcpImgClass).style.display = 'inline-block';
            document.querySelector(ccpUserInput.iptCcpImgClass).value = 'hide';
            // document.querySelector(ccpUserInput.iptCcpTableClass).style.display = 'inline-block';
            document.querySelector(ccpUserInput.iptCcpTableClass).value = 'devicewidth';
            document.querySelector(ccpUserInput.iptCcpTableWrapperClass).value = 'devicewidth';
            document.querySelector(ccpUserInput.iptCcpTableWidth).value = Appdata.imgW;
          }
          retObj = returnObject( ccpElementId, checked );
          return retObj;
        })(),
        tdBgimage: (function() {
          // !VA This is a tdoptions selection radio - use ccpElementId
          ccpElementId = ccpUserInput.rdoCcpTdBgimage;
          checked = getRadioState(ccpElementId);
          retObj = returnObject( ccpElementId, checked );
          return retObj;
        })(),
        tdPosswitch: (function() {
          // !VA This is a tdoptions selection radio - use ccpElementId
          ccpElementId = ccpUserInput.rdoCcpTdPosswitch;
          checked = getRadioState(ccpElementId);
          retObj = returnObject( ccpElementId, checked );
          return retObj;
        })(),
        tdAlign: (function() {
          // !VA This value is get-only
          ccpElementId = false;
          let str = '', options = [], selectid = '';
          selectid = ccpUserInput.selCcpTdAlign;
          options = [ '', 'left', 'center', 'right'];
          str = getAlignAttribute( selectid, options );
          retObj = returnObject( ccpElementId, str );
          return retObj;
        })(),
        tdValign: (function() {
          // !VA This value is get-only
          ccpElementId = false;
          let str = '', options = [], selectid = '';
          selectid = ccpUserInput.selCcpTdValign;
          options = [ '', 'top', 'middle', 'bottom'];
          str = getAlignAttribute( selectid, options );
          retObj = returnObject( ccpElementId, str );
          return retObj;
        })(),
        tdClass: (function() {
          // !VA This value is get-only
          ccpElementId = false;
          retObj = returnObject( ccpElementId, ccpGetAttValue('class',document.querySelector(ccpUserInput.iptCcpTdClass).value) );
          return retObj;
        })(),
        tdBgcolor: (function() {
          // !VA This value is get-only
          ccpElementId = false;
          retObj = returnObject( ccpElementId, ccpGetAttValue('class',document.querySelector(ccpUserInput.iptCcpTdBgColor).value) );
          return retObj;
        })(),
        tdBackground: (function() {
          // !VA This value is get-only
          ccpElementId = false;
          retObj = returnObject( ccpElementId, document.querySelector(ccpUserInput.iptCcpImgRelPath).value + '/' + (Appdata.fname) );
          return retObj;
        })(),
        // !VA TABLE attributes
        tableClass: (function() {
          // !VA This value depends on the status of the Fixed/Fluid image radio button, so use ccpElementId
          ccpElementId = ccpUserInput.iptCcpTableClass;
          if (imgType === 'fixed') {
            // !VA If imgType is fixed, then set tableClass to 'devicewidth' if the imgW equals the viewerW. Otherwise, set it to the user input.
            document.querySelector(ccpElementId).value === Appdata.viewerW ? str = 'devicewidth' : 
              str = ccpIfNoUserInput('class',document.querySelector(ccpElementId).value);
          } else {
            // !VA If the imgType is fluid, set the class input value to the user input, even though that might have unforseen consequences for the user.
            str = ccpIfNoUserInput('class',document.querySelector(ccpElementId).value);
          }
          retObj = returnObject( ccpElementId, str );
          return retObj;
        })(),
        tableWidth: (function() {
          // !VA The value is written to the table width field - use ccpElementId
          ccpElementId = ccpUserInput.iptCcpTableWidth;
          imgType === 'fixed' ? str = Appdata.imgW : str = '100%';
          retObj = returnObject( ccpElementId, str );
          return retObj;
        })(),
        tableBgcolor: (function() {
          // !VA This value is get-only
          ccpElementId = false;
          retObj = returnObject( ccpElementId, ccpIfNoUserInput('bgcolor',document.querySelector(ccpUserInput.iptCcpTableBgColor).value));
          return retObj;
        })(),
        tableAlign: (function() {
          // !VA This value is get-only.
          ccpElementId = false;
          let str = '', options = [], selectid = '';
          selectid = ccpUserInput.selCcpTableAlign;
          options = [ '', 'left', 'center', 'right'];
          str = getAlignAttribute( selectid, options );
          retObj = returnObject( ccpElementId, str );
          return retObj;
        })(),
        tableIncludeWrapper: (function() {
          // !VA Changing this to CCP-write to clean up updateCcp
          ccpElementId = ccpUserInput.spnCcpTableIncludeWrapperCheckmrk;
          checked = getCheckboxSelection(ccpElementId);
          retObj = returnObject( ccpElementId, checked );
          return retObj;
        })(),
        tableTagWrapperClass: (function() {
          // !VA This value writes to the CCP in the class input so populate ccpElementId
          // !VA If imgType is fixed, set the default class to 'devicewidth'. If it's fluid, set it to 'responsive-table' as per the Litmus newsletter template.
          ccpElementId = ccpUserInput.iptCcpTableWrapperClass;
          imgType === 'fixed' ? str = 'devicewidth' : str = 'responsive-table';
          retObj = returnObject( ccpElementId, str );
          return retObj;
        })(),
        tableTagWrapperAlign: (function() {
          // !VA This value is get-only.
          ccpElementId = false;
          let str = '', options = [], selectid = '';
          selectid = ccpUserInput.selCcpTableWrapperAlign;
          options = [ '', 'left', 'center', 'right'];
          str = getAlignAttribute( selectid, options );
          retObj = returnObject( ccpElementId, str );
          return retObj;
        })(),
        tableTagWrapperWidth: (function() {
          // !VA This value depends on the selection under Fixed image. 
          ccpElementId = ccpUserInput.iptCcpTableWrapperWidth;
          // !VA If the imgTyp is fixed, set the wrapper width to the value of the input field, which for the most part will be viewerW. If it's fluid, set it to 100%
          imgType === 'fixed' ? str = Appdata.viewerW : str = '100%';
          retObj = returnObject( ccpElementId, str );
          return retObj;
        })(),
        tableTagWrapperBgcolor: (function() {
          // !VA This value is get-only.
          ccpElementId = false;
          retObj = returnObject( ccpElementId,ccpIfNoUserInput('bgcolor',document.querySelector(ccpUserInput.iptCcpTableWrapperBgColor).value));
          return retObj;
        })(),
        tableTagWrapperStyle: (function() {
          // !VA This value is get-only
          ccpElementId = false;
          // !VA Only include a style attribute for the wrapper for fluid images.  The conditional for this is in makeTableNode and there's no case where a style attribute is included for fixed images, so just provide the style attribute string to return
          imgType === 'fixed' ? str = '' : str = `max-width: ${Appdata.imgW}`;
          retObj = returnObject( ccpElementId, str );
          return retObj;
        })(),
      };
      // !VA Return the Attributes defined above. 
      return Attributes;
    }

    // !VA CBController private
    function ccpGetAttValue(att, value) {
      // !VA Gets the insFilename from Appdata in case the user leaves 'path' empty
      var Appdata = appController.initGetAppdata();
      var str;
      // !VA If there is an entry in the user entry field element, include the attribute string in the clipboard output. 
      if (value && att) {
        // !VA I might want to change this to include the # in the string itself.
        if (value === '#') {
          str = '';
        } else {
          // !VA Include the space here to ensure no duplicate spaces slip in when the clip is built
          str = value;
        }

      } else {
        // !VA If the path field is empty, return the insFilename without the path.
        if (att === 'src' && value === '' ) {
          str = `${att}="${Appdata.fname}" `;
        } else if ( att === '#' || att === '') {
          str = '';
        } else {
          // !VA If there is no input, exclude the attribute entry.
          str = '';
        }
      }
      return str;
    }

    // !VA CBController private
    // !VA Gets the selected align option from its CCP dropdown box
    function getAlignAttribute(selectid, options) {
      var str, selInd;
      selInd = document.querySelector(selectid).selectedIndex;
      switch (true) {
      case (selInd === 0):
        str = '';
        break;
      case (selInd === 1):
        str = options[1];
        break;
      case (selInd === 2):
        str = options[2];
        break;
      case (selInd === 3):
        str = options[3];
        break;
      }
      return str;
    }

    // !VA CBController private
    // !VA TODO: Change target here to alias
    // !VA Get the checked/unchecked status of a CCP mock checkbox. Note that the element alias refers to the checkmark element, which isn't the actual checkbox input element. Consequently, the checkmark element id has to be converted to its corresponding input element id in order to toggle it.
    function getCheckboxSelection(target) {
      let chkboxid, checked;
      chkboxid = document.querySelector(target).id;
      chkboxid = chkboxid.replace('mrk', 'box');
      chkboxid = chkboxid.replace('spn', 'chk');
      if (document.querySelector('#' + chkboxid).checked === false) {
        checked = false;
      } else {
        checked = true;
      }
      return checked;
    }

    // !VA CBController private
    // !VA Gets the state of a radio button element.
    function getRadioState(ccpElementId) {
      // !VA Passing in the ID, not the alias
      let checked;
      !document.querySelector(ccpElementId).checked ? checked = false : checked = true;
      return checked;
    }

    // clipboardController: IF NO USER INPUT IN CCP OPTION ELEMENTS 
    // !VA TODO: This should be in handleUserInput
    // !VA CBController private
    // !VA Called from getAttributes when an attribute should be included in the Clipboard output ONLY if there is a user input for that attribute If there is no input, exclude the attribute itself from the clipboard output. For instance, if the user doesn't enter a class name, then the class attribute itself is excluded from the clipboard output at all. 
    function ccpIfNoUserInput(att, value) {
      // !VA We need get the insFilename from Appdata in case the user leaves 'path' empty
      var Appdata = appController.initGetAppdata();
      var str;
      // !VA If there is an entry in the user entry field element, include the attribute string in the clipboard output. 
      if (value && att) {
        // !VA I might want to change this to include the # in the string itself.
        value === '#' ? str = '' : str = value;

      } else {
        // !VA If the path field is empty, we need to return the insFilename without the path.
        if (att === 'src' && value === '' ) {
          str = `${att}="${Appdata.fname}" `;
        } else if ( att === '#' || att === '') {
          str = '';
        } else {
          // !VA If there is no input, exclude the attribute entry.
          str = '';
        }
      }
      return str;
    }
    // !VA END ATTRIBUTE FUNCTIONS

    // !VA NODE FUNCTIONS
    // !VA Get the user selections that define the clipboard output configuration- the clicked Options button, the Include anchor checkbox and the Include wrapper table checkbox. The nodeList used for the indents as well as the indent implementation will depend on these options -- only the basic TD radio button option generates a simple nodeList structure whose indents can be processed with a simple for loop. The other options generate nodeLists with text nodes and comments that require a custom indent scheme.
    // !VA CBController private
    
    function getUserSelections( id ) {
      // !VA Initialize the clipboard-building process by getting those user selections in the CCP that determine the structure of the clipboard output and put those selections into the uSels object. The elements that determine the nodeList structure and thus the Clipboard output are: the makeTag buttons and the imgType radio buttons. The imgType (fluid or fixed) determines which td option is selected and has to be processed independently of the other uSels. The fluid imgType is a preset that always has to have the tdopton 'basic'. So first, preselect the tdoption 'basic' if the imgType is fluid, then proceed.
      let imgType, selectedTdOption;
      let uSels = {};
      // !VA Get the selected imgType regardless of which button was clicked to trigger this function. 
      getRadioState(ccpUserInput.rdoCcpImgFixed) ? imgType = 'fixed' : imgType = 'fluid';
      // !VA If imgType is fluid, set selectedTdOption to 'basic', otherwise set the selectedTd option to whichever option is selected. This logic is actually reflected in getAttributes. 
      imgType === 'fluid' ? selectedTdOption = 'basic' : selectedTdOption = document.querySelector('input[name="tdoptions"]:checked').value;
      // !VA Initialize uSels
      uSels = {
        buttonClicked: '',
        hasAnchor: getCheckboxSelection(ccpUserInput.spnCcpImgIncludeAnchorCheckmrk),
        hasWrapper: getCheckboxSelection(ccpUserInput.spnCcpTableIncludeWrapperCheckmrk),
        selectedTdOption: selectedTdOption
      };
      if (id === btnCcpMakeClips.btnCcpMakeImgTag.slice(1)) { 
        uSels.buttonClicked = 'imgbut';
        // !VA Override the selectedTdOption value for the IMG button - the IMG button will ALWAYS output img/anchor tags to the clipboard no matter which tdoptions radio button is selected.
        uSels.selectedTdOption = 'basic';
      } else if (id === btnCcpMakeClips.btnCcpMakeTdTag.slice(1)) { 
        uSels.buttonClicked = 'tdbut';
      } else {
        uSels.buttonClicked = 'tablebut';
      }
      buildOutputNodeList( id, uSels );
    }

    // !VA Build the subset of nodes that will be populated with indents and output to the Clipboard. NOTE: outputNL can't be a fragment because fragments don't support insertAdjacentHMTL). So we have to create a documentFragment that contains all the nodes to be output, then append them to a container div 'outputNL', then do further processing on the container div.
    // !VA CBController private
    function buildOutputNodeList( id, uSels ) {

      // !VA This and toggleImgType (and possibly initCcp - that needs to be tested) are the only places where getAttributes is called. Everywhere else it is passed as an argument to the called function.
      let Attributes, tableNodeFragment, nl, frag, outputNL, clipboardStr;
      Attributes = getAttributes();
      // !VA Get the top node, i.e. tableNodeFragment. We need to pass uSels because makeTableNode calls makeTdNode, which uses uSels to get the current tdoptions radio button selection
      tableNodeFragment = makeTableNode( id, uSels, Attributes );
      // !VA Create the full nodeList from the tableNodeFragment. If tableNodeFragment is null, return to abort without creating Clipboard object.
      try {
        nl = tableNodeFragment.querySelectorAll('*');
      } catch (e) {
        console.log('Error in buildOutputNodeList: tableNodeFragment is null. Aborting...');
        return;
      }
      // !VA Create the div container to which the extracted nodeList fragment will be appended
      var container = document.createElement('div');

      // !VA Basic TD Options - This should be extracted to a separate function
      if (uSels.selectedTdOption === 'basic' || uSels.selectedTdOption === 'excludeimg' || uSels.selectedTdOption === 'posswitch') {
        // !VA Deterimine which makeNode button was clicked and extract a nodeList fragment with only those nodes that correspond to the clicked button. The index position of the extracted fragments is determined by the length of the tableNodeFragment nodeList minus an integer to compensate for the 0-based nodeList indices.
        let rtlNodePos, extractPos;
        // !VA For the posswitch option: Get the position of the RTL node, if it exists. 
        for (let i = 0; i < nl.length; i++) {
          if (nl[i].getAttribute('dir')  === 'rtl') {
            rtlNodePos = i;
          }
        }
        // !VA Process the makeNode button clicks
        switch(true) {
        // !VA imgbut is clicked. We can hardcode the index where the extraction begins because the imgNode is created in makeTdNode and the imgbut button click overrides any other makeNode button actions. 
        case (uSels.buttonClicked === 'imgbut'):
          // !VA If there's an anchor, take the last two nodes, otherwise just take the last node.
          uSels.hasAnchor ? frag = nl[nl.length - 2] : frag = nl[nl.length - 1]; 
          break;
        // !VA tdbut is clicked. Here we handle the 'basic', 'excludeimg' and 'posswitch' options because they process indents with no modifications. 'imgswap', 'bgimage' and 'vmlbutton' options are handled separately because they import comment nodes with MS conditional code
        case (uSels.buttonClicked === 'tdbut'):
          // !VA basic option is selected 
          if ( uSels.selectedTdOption === 'basic') { 
            // !VA We can hardcode this for now, but that will be a problem if any other options with other nodes are added.
            uSels.hasAnchor ? extractPos = nl.length - 3 : extractPos = nl.length - 2;
            // frag = nl[extractPos];
          } else if ( uSels.selectedTdOption === 'excludeimg') {
            extractPos = 5;
            // !VA posswitch option is selected
          } else {
            // !VA The fragment is extracted starting at the position of the RTL node
            extractPos = rtlNodePos;
          }
          frag = nl[extractPos];
          break;
        case (uSels.buttonClicked === 'tablebut'):
          // !VA basic or excludeimg option is selected 
          // !VA We can hardcode the 'basic' and 'posswitch' positions for now, but these will have to be revisited if any new options are added that change the outputNL indices. 
          if (uSels.hasWrapper) {
            // !VA The Include wrapper table option is selected, so the entire nodeList is extracted
            extractPos = 0;
          } else {
            // !VA The Include wrapper table option is not selected, so all nodes starting at index 3 are extracted
            extractPos = 3;
          }
          frag = nl[extractPos];
          break;
        default:
          console.log('Error in buildOutputNodeList: case not defined, id is: ' + id);
          // Default code block, this should be an error code
        }
        // !VA Append the fragment to the container
        container.appendChild(frag);
        // !VA Create the outputNL nodeList to pass to the Clipboard object
        outputNL = container.querySelectorAll('*');
        applyIndents( id, uSels, outputNL );
        clipboardStr = outputNL[0].outerHTML;

      // !VA imgSwap and bgimage option - includes MS conditional code retrieved by getImgSwapBlock, getBgimageBlock, getVMLBlock which includes getIndent functions. First, run applyIndents on outputNL. applyIndents also inserts tokens at the position where the codeBlock is to be inserted. The parent nodelist is converted to a string, the code blocks are retrieved, indents are inserted, and finally the codeblocks are inserted into the string between the tags of the last node in the outputNL.outerHTML string. 
      } else if (uSels.selectedTdOption === 'imgswap' || uSels.selectedTdOption  === 'bgimage' || uSels.selectedTdOption === 'vmlbutton') {
        // !VA Start with the tdbut makeNode button because the img makeNode button isn't referenced in the imgswap option. The A/IMG tags are hard-coded into the MS Conditional code in getImgSwapBlock. Also, there's a switch to include/exclude the A/IMG node in makeTdNode.
        // !VA extractNodeIndex is the nl index position at which the nodes are extracted to build outputNL. It equals the nodeList length minus the indentLevel.
        let extractNodeIndex;
        // !VA indentLevel is the number of indents passed to getIndent.
        let indentLevel;
        // !VA codeBlock is the MS conditional code block returned as string
        let codeBlock;
        // !VA If the makeTD button is clicked, then only the last node in nl is extracted and the MS conditional comments get one indent level
        // !VA NOTE: This code is repeated above in the if clause and again here in the else
        if ( uSels.buttonClicked === 'tdbut') {
          indentLevel = 1;
          extractNodeIndex = nl.length - indentLevel;
        } else {
          if (uSels.hasWrapper) {
            // !VA If the makeTable button is clicked and hasWrapper is checked, then all nl nodes are extracted and the MS conditional comments get 6 indents
            indentLevel = 6;
            extractNodeIndex = nl.length - indentLevel;
          } else {
            // !VA If the makeTable button is clicked and hasWrapper is unchecked, then nl nodes are extracted at position 3 and the MS conditional comments get 3 indents
            indentLevel = 3;
            extractNodeIndex = nl.length - indentLevel;
          }
        }
        // !VA Extract the fragment to convert to outputNL
        // !VA NOTE: Is this not the same as frag = nl[extractPos] in the if clause above
        frag = nl[extractNodeIndex];
        // !VA Append the nodeList fragment to the container div
        container.appendChild(frag);
        // !VA Create the nodeList to pass to the Clipboard object. 
        outputNL = container.querySelectorAll('*');
        // !VA Apply the indents and insert the tokens marking the position for inserting the MS conditional code.
        applyIndents(id, uSels, outputNL);
        // !VA Convert outputNL to a string (including tokens for inserting MS conditional code) for output to Clipboard object.
        clipboardStr = outputNL[0].outerHTML;
        
        // !VA Get the codeBlock corresponding to the selected TD option
        if ( uSels.selectedTdOption === 'imgswap') {
          codeBlock = getImgSwapBlock( id, indentLevel, Attributes);
        } else if (  uSels.selectedTdOption === 'bgimage' ) {
          codeBlock = getBgimageBlock(id, indentLevel, Attributes);
        } else if (uSels.selectedTdOption === 'vmlbutton') {
          codeBlock = getVmlButtonBlock(id, indentLevel, Attributes);
        }
        // !VA Replace the tokens in clipboardStr that were added in applyIndents with the respective codeBlock
        clipboardStr = clipboardStr.replace('/replacestart//replaceend/', codeBlock + '\n');
      } 
      // !VA Convert the alias of the clicked button to an ID the Clipboard object recognizes and write clipboardStr to the clipboard.
      writeClipboard( aliasToId(uSels.buttonClicked), clipboardStr );
    }

    // !VA CBController private
    // !VA Convert uSels.buttonClicked in buildOutputNodeList back to an id before passing to Clipboard object.
    function aliasToId( alias ) {
      let id;
      if (alias === 'imgbut') {id = btnCcpMakeClips.btnCcpMakeImgTag.slice(1); }
      if (alias === 'tdbut') {id = btnCcpMakeClips.btnCcpMakeTdTag.slice(1); }
      if (alias === 'tablebut') {id = btnCcpMakeClips.btnCcpMakeTableTag.slice(1); }
      return id;
    }

    // !VA Make the nodes for the 'posswitch option' using the DIR attribute
    // !VA CBController private
    function makePosSwitchNodes( id, Attributes ) {
      // !VA Declare the arrays for new element names and new element types
      let containerIds = [], containerElements = [], sibling1Ids = [], sibling1Elements = [], sibling2Ids = [], sibling2Elements = [], containerNodes = [], sibling1Nodes = [], sibling2Nodes = [];
      // !VA Declare loop iterators
      let i, j, index;
      // !VA Populate the arrays with the new element names and their corresponding types
      containerIds = [ 'container', 'td_switchcontainer', 'table_switchparent', 'tr_switchparent' ];
      containerElements = [ 'div', 'td', 'table', 'tr' ];
      // !VA We include the anchor wrapper for the img here, and remove it from the array later if the checkbox is checked.
      sibling1Ids = [ 'container', 'td_switchsibling1', 'table_switchchild1', 'tr_switchchild1', 'td_switchcontent1', 'a_switchtcontent','img_switchcontent1' ];
      sibling1Elements = [ 'div', 'td', 'table', 'tr', 'td', 'a', 'img'];
      sibling2Ids = [ 'container', 'td_switchsibling2', 'table_switchchild2', 'tr_switchchild2', 'td_switchcontent2' ];
      sibling2Elements = [ 'div', 'td', 'table', 'tr', 'td'];
      // !VA We have to handle the Include anchor tag case here because once the nodeList is created, it's a hack to modify it. So we remove the a tag from the arrays before creating the nodeList and setting the node attributes. We'll have to remove the corresponding a tag index from the nodeAttributes array as well otherwise the loop assigning the attributes to the nodeList will break. Note: this is a HACK! But this whole makePosSwitchNodes thing is a hack anyway so lets' make it simple human-readable.
      // !VA Get the checkmark target
      var target = ccpUserInput.spnCcpImgIncludeAnchorCheckmrk;
      // !VA If Include anchor is NOT checked, remove the anchor item from both sibling1 arrays and 
      if (!getCheckboxSelection(target) ) {
        index = 5;
        sibling1Ids.splice(index, 1);
        sibling1Elements.splice(index, 1);
      }   
      // !VA Now we have two branches of the node tree, each with a different number of descendants. So we have to loop through them separately to create their nodes.
      // !VA Loop through the arrays and create the elements with name and corresponding type
      // // !VA Start with the container items that are parents of the sibling elements.
      for (i = 0; i < containerIds.length; i++) {
        containerNodes[i] = document.createElement(containerElements[i]);
        containerNodes[i].id = containerIds[i];
      }
      // !VA Append each element with its respective child
      for (i = 0; i < containerNodes.length - 1; i++) {
        j = i + 1;
        containerNodes[i].appendChild(containerNodes[j]);
      }
      // !VA Now create the first sibling's nodes
      for (i = 0; i < sibling1Ids.length; i++) {
        sibling1Nodes[i] = document.createElement(sibling1Elements[i]);
        sibling1Nodes[i].id = sibling1Ids[i];
      }
      // !VA Append each element with its respective child
      for (i = 0; i < sibling1Nodes.length - 1; i++) {
        j = i + 1;
        // !VA j is the element one position lower on the tree from i, i.e. the child
        sibling1Nodes[i].appendChild(sibling1Nodes[j]);
      }

      // !VA Now create the second sibling's nodes
      for (i = 0; i < sibling2Ids.length; i++) {
        sibling2Nodes[i] = document.createElement(sibling2Elements[i]);
        sibling2Nodes[i].id = sibling2Ids[i];
      }
      // !VA Append each element with its respective child
      for (i = 0; i < sibling2Nodes.length - 1; i++) {
        j = i + 1;
        // !VA j is the element one position lower on the tree from i, i.e. the child
        sibling2Nodes[i].appendChild(sibling2Nodes[j]);
      }
      // !VA Append the siblings to the parent tr
      containerNodes[3].appendChild(sibling1Nodes[1]);
      containerNodes[3].appendChild(sibling2Nodes[1]);
      // !VA Set the container to return to the top node of the tree
      let container = (containerNodes[0]);
      // !VA Call the function that sets the attributes for the nodes
      container = setPosSwitchNodeAttributes(container, Attributes);
      // !VA Copy the container to tdInner. This is for nomenclature, because all the other makeNode functions return the container under the name tdInner
      var tdInner = container.children[0]; 
      // !VA Return the container to makeTdNodes
      return tdInner;
    }

    // !VA Set the attributes for the nodes in the 'posswitch' option using the DIR attribute
    function setPosSwitchNodeAttributes(container, Attributes) {
      // !VA Passed-in Attributes provide height and width 
      var nodeList, index;
      let nodeAttributes = [];
      // !VA Initialize the objects that contain the attributes for the individual nodes
      let td_switchcontainerAttr, table_switchparentAttr, tr_switchparentAttr, td_switchsibling1Attr, table_switchchild1Attr, tr_switchchild1Attr, td_switchcontent1Attr, a_switchcontent1Attr, img_switchcontent1Attr, td_switchsibling2Attr, table_switchchild2Attr, tr_switchchild2Attr, td_switchcontent2Attr; 
      // !VA Make the nodeList from the container passed in from makePosSwitchNodes to apply the attributes to.
      nodeList = container.querySelectorAll( '*' );
      // !VA Build the objects that contain the attributes that will be set on the nodeList nodes.
      // !VA If the class input element under td options is empty, do nothing, otherwise add the class to the container TD and set the class attribute
      !Attributes.tdClass.str ? !Attributes.tdClass.str : nodeList[0].setAttribute('class', Attributes.tdClass.str);
      // !VA If the bkgrnd color input element under td options is empty, do nothing, otherwise add the bkgrnd color to the container TD and set the bgcolor attribute
      !Attributes.tdBgcolor.str ? !Attributes.tdBgcolor.str : nodeList[0].setAttribute('bgcolor', Attributes.tdBgcolor.str);
      // !VA Add the rest of the attributes to the nodes
      td_switchcontainerAttr = {
        dir: 'rtl',
        // !VA class: see above
        // !VA bgcolor: see above
        width: '100%',
        align: Attributes.tdAlign.str,
        valign: Attributes.tdValign.str,
      };
      table_switchparentAttr = {
        role: 'presentation',
        border: '0',
        width: '100%',
        cellPadding: '0',
        cellSpacing: '0'
      };
      // !VA The TR nodes have no attributes but we need them as placeholders to keep the array length the same as the nodeList.
      tr_switchparentAttr = {
        // !VA Placeholder node
      };
      td_switchsibling1Attr = {
        width: '50%',
        class: 'stack-column-center'
      };
      table_switchchild1Attr = {
        role: 'presentation',
        border: '0',
        width: '100%',
        cellPadding: '0',
        cellSpacing: '0'
      };
      // !VA The TR nodes have no attributes but we need them as placeholders to keep the array length the same as the nodeList.
      tr_switchchild1Attr = {
        // !VA Placeholder node
      };
      td_switchcontent1Attr = {
        dir: 'ltr',
        align: 'left',
        vAlign: 'top'
      };
      a_switchcontent1Attr = {
        href: '#',
        color: 'red'
      };
      img_switchcontent1Attr = {
        width: Attributes.imgWidth.str,
        height: Attributes.imgHeight.str,
        style: Attributes.imgStyle.str,
        src: Attributes.imgSrc.str,
        alt: Attributes.imgAlt.str
      };
      td_switchsibling2Attr = {
        width: '50%',
        class: 'stack-column-center'
      };
      table_switchchild2Attr = {
        role: 'presentation',
        border: '0',
        width: '100%',
        cellPadding: '0',
        cellSpacing: '0'
      };
      // !VA The TR nodes have no attributes but we need them as placeholders to keep the array length the same as the nodeList.
      tr_switchchild2Attr = {
        // !VA Placeholder node
      };
      td_switchcontent2Attr = {
        dir: 'ltr',
        align: 'left',
        vAlign: 'top'
      };
      // !VA Create the array with the attribute objects. We use this array to cycle through the nodeList and apply the attributes to the individual nodes. I tried many ways to do this but was not able to assign these objects to the individual nodes any other way than to loop through them ensuring that the array and nodeList length were identical. If there is a way to assign attributes to nodes using the node ID as index, I'd like to learn that technique.
      nodeAttributes = [ td_switchcontainerAttr, table_switchparentAttr,  tr_switchparentAttr, td_switchsibling1Attr, table_switchchild1Attr,  tr_switchchild1Attr, td_switchcontent1Attr, a_switchcontent1Attr, img_switchcontent1Attr, td_switchsibling2Attr, table_switchchild2Attr, tr_switchchild2Attr, td_switchcontent2Attr ];

      // !VA Remove the anchor attributes from the array if the Include anchor checkbox is checked. The a tag is at position 7 in the attributes array.
      var target = ccpUserInput.spnCcpImgIncludeAnchorCheckmrk;
      if (!getCheckboxSelection(target)) {
        index = 7;
        nodeAttributes.splice(index, 1);
      } 
      // !VA Assign the attributes to the nodes using the length of the nodeAttribute array as index.
      for (let i = 0; i < nodeAttributes.length; i++) {
        for (let entries of Object.entries(nodeAttributes[i])) {
          nodeList[i].setAttribute( entries[0], entries[1]);
        }
      }
      // !VA Now we no longer need the IDs, so we can delete them.
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].removeAttribute('id');
      }
      // !VA Return the container with the attributes to the calling function
      return container;
    }

    // !VA Make the img node, including anchor if it is checked
    // !VA CBController private
    function makeImgNode ( id, Attributes ) {
      // !VA Id is passed but not used here,  because we're only building the node.
      let imgNode, returnNodeFragment;
      // !VA Create the image node
      imgNode = document.createElement('img');
      // !VA Create the node fragment that will contain the IMG or A/IMG tags
      returnNodeFragment = document.createDocumentFragment();
      // !VA Set the img attributes. 
      // !VA Class attribute - Add to the node only if the attribute is set, i.e. the input has an entry
      // !VA Add to the node only if the attribute is set, i.e. the input has an entry
      if (Attributes.imgClass.str) { imgNode.className = Attributes.imgClass.str; }
      // !VA alt attribute - Add to the node only if the attribute is set, i.e. the input has an entry
      if (Attributes.imgAlt.str) { imgNode.alt = Attributes.imgAlt.str; }
      // !VA src attribute;
      imgNode.src = Attributes.imgSrc.str;
      // !VA width attribute
      imgNode.width = Attributes.imgWidth.str;
      // !VA height attribute
      imgNode.height = Attributes.imgHeight.str;
      // !VA style attribute
      imgNode.setAttribute('style', Attributes.imgStyle.str);
      if (Attributes.imgAlign.str) { imgNode.align = Attributes.imgAlign.str; }
      // !VA border attribute
      imgNode.border = '0';
      // !VA If the include anchor option is checked, create the anchor element, add the attributes, append the imgNode to the nodeFragment, and return it.
      if(Attributes.imgIncludeAnchor.str === true) {
        let anchor = document.createElement('a');
        anchor.href = '#';
        anchor.setAttribute('style', 'color: #FF0000');
        anchor.setAttribute('target', '_blank');
        anchor.appendChild(imgNode);
        returnNodeFragment.appendChild(anchor);
      } else {
        // !VA Otherwise, set returnNodeFragment to imgNode without the anchor.
        returnNodeFragment.appendChild(imgNode);
      }
      // return the imgNode as node fragment;
      return returnNodeFragment;
    }

    // !VA Make the TD node
    // !VA CBController private
    function makeTdNode( id, uSels, Attributes ) {
      // !VA Variables for error handling - need to include this in the return value so the Clipboard object can differentiate between alert and success messages. 
      let isErr;
      // !VA NOTE: No trapped errors here yet that would pass a code, but that will probably come.
      let errCode;
      let tdInner, imgNode;
      // !VA Create the TD node for the parent TD
      tdInner = document.createElement('td');
      // !VA Create the TD node fragment that will contain the parent TD without the code block for imgswap, bgimage or vmlbutton
      let tdNodeFragment;
      tdNodeFragment = document.createDocumentFragment();
      // !VA TODO: There are NO attributes that are included in ALL the tdoptions, but it's very repetitive to include these options individually. Think about how this can be made DRYer, like it was done in makePosSwitchNodes and setPosSwitchNodeAttributes
      // !VA bgcolor attribute. Pass the input value, don't prepend hex # character for now
      if (Attributes.tdBgcolor.str) { tdInner.bgColor = Attributes.tdBgcolor.str; }
      // !VA Now add the attributes included only with the default Td configuration
      switch(true) {
      // !VA If the 'td with options' or 'td with options (exclude img) radio buttons are checked...
      case (uSels.selectedTdOption === 'basic' || uSels.selectedTdOption === 'excludeimg'):
        // !VA class attribute
        if (Attributes.tdClass.str) { tdInner.className = Attributes.tdClass.str; }
        // !VA valign attribute
        if (Attributes.tdAlign.str) { tdInner.align = Attributes.tdAlign.str; }
        if (Attributes.tdValign.str) { tdInner.vAlign = Attributes.tdValign.str; }
        if (Attributes.tdHeight.str) { tdInner.height = Attributes.imgWidth.str; }
        if (Attributes.tdWidth.str) { tdInner.width = Attributes.imgHeight.str; }
        // !VA If 'basic' is checked, create imgNode and append it, otherwise exclude the imgNode.
        if (uSels.selectedTdOption === 'basic') {
          imgNode = makeImgNode( id, Attributes );
          tdInner.appendChild(imgNode);
        }
        break;
      // !VA (selectedTdOption === 'imgswap'):
      case (uSels.selectedTdOption === 'imgswap'):
        if (Attributes.tdClass.str) { tdInner.className = Attributes.tdClass.str; }
        if (Attributes.tdValign.str) { tdInner.vAlign = Attributes.tdValign.str; }
        if (Attributes.tdAlign.str) { tdInner.align = Attributes.tdAlign.str; }
        break;
      // !VA (selectedTdOption === 'bgimage'):
      case (uSels.selectedTdOption === 'bgimage'):
        // !VA Create the parent node to which the bgimage code block will be appended after outputNL is converted to text in buildOutputNodeList.
        // !VA Include width, height and valign as per Stig's version
        tdInner.width = Attributes.tdAppdataWidth.str;
        tdInner.height = Attributes.tdAppdataHeight.str;
        tdInner.vAlign = Attributes.tdValign.str;
        // !VA Set the background attribute to the current path/filename
        tdInner.setAttribute('background', Attributes.tdBackground.str);
        // !VA Fallback bgcolor now set in UIController.showTdOptions
        // !VA Include fallback color from the default set in showTdOptions
        break;
      // !VA  (selectedTdOption === 'posswitch'):
      case (uSels.selectedTdOption === 'posswitch'):
        tdInner  = makePosSwitchNodes( id, Attributes );
        break;
      // !VA  (selectedTdOption === 'vmlbutton'):
      case (uSels.selectedTdOption === 'vmlbutton'):
        // !VA IMPORTANT: Height and width fields have to be entered, otherwise the button can't be built. Button width and height are set here in makeTdNode, the rest of the options are set in getVmlCodeBlock in buildOutputNodeList. The defaults of 40/200 as per Stig are set in UIController.showTdOptions. So if there's no value for td height and width, then the user has deleted the default and not replaced it with a valid entry. In this case, throw an ERROR and abort before it gets to the clipboard.
        if (!document.querySelector(ccpUserInput.iptCcpTdHeight).value || !document.querySelector(ccpUserInput.iptCcpTdWidth).value) {
          console.log('ERROR in makeTdNode vmlbutton: no value for either height or width');
          isErr = true;
        } else {
          // !VA Set the width and height in the TD node, not in the code block
          tdInner.width = Attributes.tdWidth.str;
          tdInner.height = Attributes.tdHeight.str;
        }
        // !VA TODO: If the height entered doesn't match the height of the loaded image, then the user probably has forgotten to load the image used for the button background, so the code output will probably not be what the user expects. Output the code, but show an alert in the message bar. This is going to require making a different clipboard message for alerts. It will also require somehow informing the Clipboard object that two different messages can be displayed onsuccess - one success message and one alert message. That will require passing an error status along with tdNodeFragment and tableNodeFragment, which will require returning an array rather than just the node fragment. 
        if (document.querySelector(ccpUserInput.iptCcpTdHeight).value !== Attributes.imgHeight.str) {
          // !VA TODO: This error message throws an error...
          // appController.handleAppMessages('vmlbutton_height_mismatch');
          console.log('ALERT vmlbutton: height value doesn\'t match height of loaded image');
        } 
        break;
      default:
        console.log('Some error has occurred in makeTdNode');
      } 
      // // !VA Set the node fragment to the TD node
      tdNodeFragment.appendChild(tdInner);
      // !VA TODO: This error handling is poor because it only allows for one possible error. But, it does return nothing, which is then passed on to the calling function and terminates in buildOutputNodeList
      if (isErr) { 
        console.log('makeTdNode: vml_button_no_value error: id is: ' + id);
        appController.handleAppMessages('vml_button_no_value');
        // appController.initMessage(id, true, 'vmlbutton_no_value');
        console.log('returning...');
        return;
      } else {
        return tdNodeFragment;
      }
    }

    // !VA Make the table node, including parent and wrapper table if selected
    // !VA CBController private
    function makeTableNode( id, uSels, Attributes ) {
      // !VA Variables for parent and wrapper table, parent and wrapper tr, and wrapper td. Parent td is called from makeTdNode and is appended to tdNodeFragment. tableNodeFragment is the node that contains the entire nodelist which is returned to buildOutputNodeList
      let tableOuter, trOuter, tdOuter, tableInner, trInner, tdNodeFragment, tableNodeFragment;
      tableNodeFragment = document.createDocumentFragment();
      tableOuter = document.createElement('table');
      trOuter = document.createElement('tr');
      tdOuter = document.createElement('td');
      tableInner = document.createElement('table');
      trInner = document.createElement('tr');
      // !VA Make the inner table. If Include wrapper table is unchecked, we return just the inner table. If it's checked, we return the inner table and the outer table 
      // !VA Add inner table attributes
      // !VA table class attribute
      if (Attributes.tableClass.str) { tableInner.className = Attributes.tableClass.str; }
      // !VA table align attribute
      if (Attributes.tableAlign.str) { tableInner.align = Attributes.tableAlign.str; }
      tableInner.width = Attributes.tableWidth.str;
      // !VA table bgcolor attribute. Pass the input value, don't prepend hex # character for now
      if (Attributes.tableBgcolor.str) { tableInner.bgColor = Attributes.tableBgcolor.str; }
      // !VA Add border, cellspacing and cellpadding
      tableInner.border = '0', tableInner.cellSpacing = '0', tableInner.cellPadding = '0';
      tableInner.setAttribute('role', 'presentation'); 
      // !VA Build the inner tr
      tableInner.appendChild(trInner);
      // !VA Get the inner TD from makeTdNode and append it to the nodeFragment
      tdNodeFragment = makeTdNode( id, uSels, Attributes );
      // !VA If tdNodeFragment is null, then there was an error in makeTdNode, so console the error and return null to buildOutputNodeList to abort.
      try {
        trInner.appendChild(tdNodeFragment);
      } catch (e) {
        console.log('Error in makeTableNode: tdNodeFragment is null: id is: ' + id);
        return;
      }
      // !VA If include table wrapper is checked, build the outer table and return it
      // !VA table wrapper class
      if (Attributes.tableTagWrapperAlign.str) { tableOuter.align = Attributes.tableTagWrapperAlign.str; }
      // !VA wrapper table align attribute
      if (Attributes.tableTagWrapperClass.str) { tableOuter.className = Attributes.tableTagWrapperClass.str; }
      // !VA the default wrapper table width is the current display size - so it gets the value from the toolbar's Content Width field.
      tableOuter.width = Attributes.tableTagWrapperWidth.str;
      // !VA table bgcolor attribute. Pass the input value, don't prepend hex # character for now. 
      if (Attributes.tableTagWrapperBgcolor.str) { tableOuter.bgColor = Attributes.tableTagWrapperBgcolor.str; }
      // !VA Style attribute - only included for fluid images
      if (getRadioState(ccpUserInput.rdoCcpImgFluid)) {
        tableOuter.setAttribute('style', Attributes.tableTagWrapperStyle.str); 
      }
      // !VA Add default border, cellspacing, cellpadding and role for accessiblity
      tableOuter.border = '0', tableOuter.cellSpacing = '0', tableOuter.cellPadding = '0';
      tableOuter.setAttribute('role', 'presentation'); 
      // !VA Append the outer tr to the wrapper
      tableOuter.appendChild(trOuter);
      // !VA Append the outer td to the outer tr
      trOuter.appendChild(tdOuter);
      // !VA Add the outer td attributes
      if (Attributes.tdAlign.str) { tdOuter.align = Attributes.tdAlign.str; }
      // !VA valign attribute
      if (Attributes.tdValign.str) { tdOuter.vAlign = Attributes.tdValign.str; }
      // !VA Append the inner table to the outer table's td
      tdOuter.appendChild(tableInner);
      // !VA Pass the outer table to the tableNodeFragment.
      // tableNode = tableOuter;
      // !VA Append the wrapper table to the node fragment and return it
      tableNodeFragment.appendChild(tableOuter);
      return tableNodeFragment;
    }
    // !VA  END NODE FUNCTIONS

    // !VA START TD OPTIONS MS-CONDITIONAL CODE BLOCKS
    // !VA These are the code blocks that contain MS conditionals in comment nodes or text nodes, i.e. mobile swap, background image, and vmlbutton
    // !VA UIController private
    function getImgSwapBlock( id, indentLevel, Attributes ) {
      let Appdata, linebreak;
      Appdata = appController.initGetAppdata();
      linebreak = '\n';
      let mobileFilename, mobileSwapStr;
      // !VA Create the mobile image filename: Get the current image file's filename and append the name with '-mob'.
      mobileFilename = Attributes.imgSrc.str;
      // !VA The regex for appending the filename with '-mob'.
      mobileFilename = mobileFilename.replace(/(.jpg|.png|.gif|.svg)/g, '_mob$1');
      // !VA Create the code for the mobile swap TD as a Comment node of the parent td. 
      mobileSwapStr = `${linebreak}${getIndent(indentLevel)}<a href="#"><img class="hide" alt="${Attributes.imgAlt.str}" width="${Attributes.imgWidth.str}" height="${Attributes.imgHeight.str}" src="${Attributes.imgSrc.str}" border="0" style="width: ${Attributes.imgWidth.str}px; height: ${Attributes.imgHeight.str}px; margin: 0; border: none; outline: none; text-decoration: none; display: block; "></a>${linebreak}${getIndent(indentLevel)}<!--[if !mso]><!-->${linebreak}${getIndent(indentLevel)}<span style="width:0; overflow:hidden; float:left; display:none; max-height:0; line-height:0;" class="mobileshow">${linebreak}${getIndent(indentLevel)}<a href="#"><img class="mobileshow" alt="${Attributes.imgAlt.str}" width="${Appdata.sPhonesW}" height="${Appdata.sPhonesH}" src="${mobileFilename}" border="0" style="width: ${Appdata.sPhonesW}px; height: ${Appdata.sPhonesH}px; margin: 0; border: none; outline: none; text-decoration: none; display: block;" /></a>${linebreak}${getIndent(indentLevel)}<!--</span>-->${linebreak}${getIndent(indentLevel)}<!--<![endif]-->`;
      // !VA Return the code block with indents and linebreaks
      return mobileSwapStr;
    }

    // !VA UIController private
    function getBgimageBlock( id, indentLevel, Attributes ) {
      let bgimageStr, fallback, bgcolor;
      let linebreak;
      linebreak = '\n';
      // !VA 03.09.2020 Set the indentLevel to 1 for now
      fallback = '#7bceeb';
      // !VA The fallback color is written to the bgcolor input in showTdOptions, so get it from there
      Attributes.tdBgcolor.str ? bgcolor = Attributes.tdBgcolor.str : bgcolor = document.querySelector(ccpUserInput.iptCcpTdBgColor).value;
      // !VA Define the innerHTML of the bgimage code
      bgimageStr = `${linebreak}${getIndent(indentLevel)}<!--[if gte mso 9]>${linebreak}${getIndent(indentLevel)}<v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:${Attributes.imgWidth.str}px;height:${Attributes.imgHeight.str}px;">${linebreak}${getIndent(indentLevel)}<v:fill type="tile" src="${Attributes.tdBackground.str}" color="${bgcolor}" />${linebreak}${getIndent(indentLevel)}<v:textbox inset="0,0,0,0">${linebreak}${getIndent(indentLevel)}<![endif]-->${linebreak}${getIndent(indentLevel)}<div>${linebreak}${getIndent(indentLevel)}<!-- Put Foreground Content Here -->${linebreak}${getIndent(indentLevel)}</div>${linebreak}${getIndent(indentLevel)}<!--[if gte mso 9]>${linebreak}${getIndent(indentLevel)}  </v:textbox>${linebreak}${getIndent(indentLevel)}</v:rect>${linebreak}${getIndent(indentLevel)}<![endif]-->`;
      // !VA Return the code block with line breaks and indents
      return bgimageStr;
    }

    // !VA CBController private
    function getVmlButtonBlock ( id, indentLevel, Attributes) {
      let vmlButtonStr, linebreak, tdHeight, tdWidth;
      linebreak = '\n';
      // !VA Defaults for height and width are set in showTdOptions, so get the values from the inputs
      tdHeight = document.querySelector(ccpUserInput.iptCcpTdHeight).value;
      tdWidth = document.querySelector(ccpUserInput.iptCcpTdWidth).value;
      // !VA Define the innerHTML of the vmlbutton code
      vmlButtonStr = `${linebreak}${getIndent(indentLevel)}<div><!--[if mso]>${linebreak}${getIndent(indentLevel)}<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:${tdHeight}px;v-text-anchor:middle;width:${tdWidth}px;" arcsize="10%" strokecolor="#1e3650" fill="t">${linebreak}${getIndent(indentLevel)}<v:fill type="tile" src="${Attributes.imgSrc.str}" color="#556270" />${linebreak}${getIndent(indentLevel)}${linebreak}${getIndent(indentLevel)}<w:anchorlock/>${linebreak}${getIndent(indentLevel)}<center style="color:#ffffff;font-family:sans-serif;font-size:13px;font-weight:bold;">Show me the button!</center>${linebreak}${getIndent(indentLevel)}</v:roundrect>${linebreak}${getIndent(indentLevel)}<![endif]--><a href="#"
style="background-color:#556270;background-image:url(${Attributes.imgSrc.str});border:1px solid #1e3650;border-radius:4px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:13px;font-weight:bold;line-height:${tdHeight}px;text-align:center;text-decoration:none;width:${tdWidth}px;-webkit-text-size-adjust:none;mso-hide:all;">Show me the button!</a></div>`;
      try {
        !vmlButtonStr;
      } catch (error) {
        console.log('ERROR in getVmlButtonBlock: vmlButtonStr does not exist: id is:' + id);
      }
      return vmlButtonStr;
    }
    // !VA END TD OPTIONS MS-CONDITIONAL CODE BLOCKS

    // !VA INDENT FUNCTIONS
    // !VA CBController private
    // !VA NOTE: This routine identifies if the nodes 1) contain the id 'stack-column-center' 2) contain MS conditional code and 2) contain an A tag. It applies indents accordingly to the nodes using insertAdjacentHTML. 1) Is problematic because if that class name is not present in the HTML file, the indent will break. I couldn't figure out a way to do this without the id by looking for sibling nodes, so trying to create options for three or even two column tables will be ridiculous time-consuming - not an option for now.
    function applyIndents( id, uSels, outputNL ) {
      // !VA Create array to store indent strings
      let indents = [];
      // !VA Create array to store the positions of the stackable columns in the posswitch option.
      let stackColumnPos = [];
      // !VA Variable to hold the indentLevel of the second posswitch column that the first posswitch column will stack over.
      let stackColumnIndentLevel;
      // !VA Flag for whether to insert the tokens used to insert the MS conditional code blocks after converting the output node list to text.
      let hasMSConditional;
      if ( uSels.selectedTdOption === 'imgswap' || uSels.selectedTdOption === 'bgimage' || uSels.selectedTdOption === 'vmlbutton') {
        hasMSConditional = true;
      }
      for (let i = 0; i < outputNL.length; i++) {
        // !VA Get the indent strings into the indents array
        indents.push(getIndent(i));
        // !VA Push the positions of the stackable posswitch columns onto the stackColumnPos array 
        if ( outputNL[i].className === 'stack-column-center') {
          stackColumnPos.push(i);
        }
      }
      // !VA Apply exception indents to the A and IMG nodes.
      for (let i = 0; i < outputNL.length; i++) {
        // !VA If parent of the IMG node is a A, then don't apply indents because we want the IMG tag to be nested within the A with no indents
        if (outputNL[i].nodeName === 'IMG' && outputNL[i].parentNode.nodeName === 'A') {
          // Apply no indent to the IMG tag if the Include anchor option is checked
        }
        else if ( outputNL[i].nodeName === 'A') {
          // !VA If nodeList item 1 is the anchor, then Include anchor is checked. Apply the indent to the A but don't apply any afterbegin or beforeend indent, because that would affect the child img element.
          outputNL[i].insertAdjacentHTML('beforebegin', getIndent(i));
          outputNL[i].insertAdjacentHTML('afterend', '\n');
        } 
        else {
          // !VA Here we apply the 'regular' indents.
          // !VA If stackColumnPos is empty, then the 'basic' or 'excludetd' td option is selected. Apply regular indents to all nodes.
          if (stackColumnPos.length === 0) {
            // !VA If the node is the last index in outputNL AND the option 'imgswap', 'bgimage' or 'vmlbutton' is selected, then modify the indent to include the token for inserting the MS conditional code after outputNL is converted to text.
            if ( i === outputNL.length - 1 && hasMSConditional === true) {
              outputNL[i].insertAdjacentHTML('beforebegin', getIndent(i));
              outputNL[i].insertAdjacentHTML('afterbegin', '/replacestart/'); 
              outputNL[i].insertAdjacentHTML('beforeend', '/replaceend/' + getIndent(i));
              outputNL[i].insertAdjacentHTML('afterend', '\n');
            } else {
              // !VA Otherwise, apply the 'normal' indents
              outputNL[i].insertAdjacentHTML('afterend', '\n');
              outputNL[i].insertAdjacentHTML('beforebegin', getIndent(i));
              outputNL[i].insertAdjacentHTML('afterbegin', '\n');
              outputNL[i].insertAdjacentHTML('beforeend', getIndent(i));
            }

          } else {
            // !VA If the node index is less than the index of the first stacking column
            if ( i < stackColumnPos[1] ) {
              // !VA Apply the 'regular' indent scheme to all nodes up to the second stacking column
              outputNL[i].insertAdjacentHTML('afterend', '\n');
              outputNL[i].insertAdjacentHTML('beforebegin', getIndent(i));
              outputNL[i].insertAdjacentHTML('afterbegin', '\n');
              outputNL[i].insertAdjacentHTML('beforeend', getIndent(i));
            } else {
              // !VA The indent level of the second stacking column should be the same as the first stacking column, which is equal to the iterator minus the index of the second stacking column minus the index of the first stacking column. So, for the makeTd button,  i = 10, stackColumnPos[1] = 10, stackColumnPos[0] = 6, so the stackColumnIndentLevel is 4.
              stackColumnIndentLevel = (i - (stackColumnPos[1] - stackColumnPos[0]));
              outputNL[i].insertAdjacentHTML('afterend', '\n');
              outputNL[i].insertAdjacentHTML('beforebegin', getIndent(stackColumnIndentLevel));
              outputNL[i].insertAdjacentHTML('afterbegin', '\n');
              outputNL[i].insertAdjacentHTML('beforeend', getIndent(stackColumnIndentLevel));
            }
            // !VA We still need to add some indicator content to the terminating TD in this nodeList -- putting it in the makePosSwitchNode function itself would make it impossible to indent properly without some creative coding that's beyond my ability. So. we'll put it here, after the indent has been shrunk to be equal to the nextSibling's indent. It will always be added to the last node in the tree, i.e. the nodeList length - 1.
            if ( i === outputNL.length - 1) {
              outputNL[i].innerHTML = '\n' + getIndent(stackColumnIndentLevel) + '  <!-- ADD YOUR CONTENT HERE --> \n' + getIndent(stackColumnIndentLevel);
            }
            try {
              !outputNL;
            } catch (error) {
              console.log('applyIndents: outputNL does not exist: id is: '+ id);
            }
          }
        }
      }
      return outputNL;
    }

    // !VA CBController private
    // !VA Return the indent string based on the indent level passed in
    function getIndent(indentLevel) {
      let indentChar, indent;
      indentChar = '  ';
      // !VA Repeat the indent character indentLevel number of times
      indent = indentChar.repeat([indentLevel]);
      return indent;
    }
    // !VA END INDENT FUNCTTIONS


    // !VA CLIPBOARD FUNCTIONS
    // !VA CBController private
    function writeClipboard(id, str) {
      console.log('writeClipboard running');
      let clipboardStr;
      // !VA clipboardStr is returned to clipboard.js
      clipboardStr = str;
      // clipboardStr = tag.outerHTML;
      var currentCB = new ClipboardJS('#' + id, {
        text: function(trigger) {
          // !VA Write success message to app message area on success
          // !VA TODO: Need to differentiate between success messages and alert messages displayed in the message bar. 
          currentCB.on('success', function(event) {
            appController.handleAppMessages('msg_copied_2_CB');
          });
  
          currentCB.on('error', function(e) {
            console.error('Action:', e.action);
            console.error('Trigger:', e.trigger);
            // !VA TODO: Need to output an error message to message bar if the clipboard operation fails here.
          });
          // !VA Return the clipboard string to clipboard.js to paste it to the clipboard
          return clipboardStr;
        }
      });
    }

    // !VA New CSS RUle output functionality 02.20.20
    // !VA CBController private
    function  makeCssRule( id, classname, wval, hval ) {
      let Attributes = [];
      Attributes = getAttributes();
      let Appdata = [];
      Appdata = appController.initGetAppdata();
      let clipboardStr;
      // !VA TODO: isErr is passed to Clipboard object to indicate whether to flash the success message or an alert message
      // let isErr;
      // isErr = false;
      switch(true) {
      case (id.includes('img-dsktp')):
        clipboardStr = `img.${Attributes.imgClass.str} { width: ${Appdata.imgW}px !important; height: ${Appdata.imgH}px !important; }`;
        break;
      case (id.includes('img-smphn')):
        clipboardStr = `img.${Attributes.imgClass.str} { width: ${Appdata.sPhonesW}px !important; height: ${Appdata.sPhonesH}px !important; }`;
        break;
      case (id.includes('img-lgphn')):
        clipboardStr = `img.${Attributes.imgClass.str} { width: ${Appdata.lPhonesW}px !important; height: ${Appdata.lPhonesH}px !important; }`;
        break;
      case (id.includes('td-dsktp') || id.includes('td-smphn') || id.includes('td-lgphn')) :
        if ( Attributes.tdHeight.str) {
          clipboardStr = `td.${Attributes.tdClass.str} { height: ${Attributes.tdHeight.str}px !important; }`;
        } else {
          clipboardStr = `td.${Attributes.tdClass.str} {  }`;
        }
        break;
      case (id.includes('table-dsktp')):
        clipboardStr = `table.${Attributes.tableClass.str} { width: ${Attributes.tableWidth.str}px !important; align: ${Attributes.tableAlign.str} !important; }`;
        break;
      case (id.includes('table-smphn')):
        clipboardStr = `table.${Attributes.tableClass.str} { width: ${Appdata.sPhonesW}px !important; align: ${Attributes.tableAlign.str} !important; }`;
        break;
      case (id.includes('table-lgphn')):
        clipboardStr = `table.${Attributes.tableClass.str} { width: ${Appdata.lPhonesW}px !important; align: ${Attributes.tableAlign.str} !important; }`;
        break;
      default:
        console.log('ERROR in makeCssRule: case not');
      } 
      // !VA If the input includes a percent char, remove the hard-coded trailing px on the value and just output the value with the user-entered percent char.
      clipboardStr.includes('%')  ? clipboardStr = clipboardStr.replace('%px', '%') : clipboardStr;
      // !VA Write CSS code to clipboard
      writeClipboard(id, clipboardStr);
    }

    // !VA CBController private
    function handleInspectorClicks(targetid, modifierKey) {
      let Appdata, clipboardStr, widthval, heightval;
      var el = document.querySelector('#' + targetid);
      el.onmouseover = isOver();
      function isOver() {
        console.log('isOver running');
      }
      widthval = heightval = '';
      // !VA Get Appdata
      Appdata = appController.initGetAppdata(false);
      // !VA Get the value to output to Clipboard based on whether shift or ctrl is pressed
      function getVal( widthval, heightval, modifierKey ) {
        let str1, str2, val;
        // !VA NOTE: This needs to be commented
        if ( !widthval || !heightval ) {
          widthval ? str1 = 'width' : str1 = 'height';
          widthval ? val = widthval : val = heightval; 
          if ( modifierKey === 'shift') {
            clipboardStr = str1 + '="' + val + '" ';
          } else if ( modifierKey === 'ctrl') {
            clipboardStr = str1 + ': ' + val + 'px; ';
          } else {
            clipboardStr = val;
          }
        } else {
        // !VA NOTE: This needs to be commented
          str1 = 'width';
          str2 = 'height';
          if ( modifierKey === 'shift') {
            clipboardStr = str1 + '="' + widthval + '" ' + str2 + '=' + heightval + ' ';
          } else if ( modifierKey === 'ctrl') {
            clipboardStr = str1 + ': ' + widthval + 'px; ' + str2 + ': ' + heightval + 'px; ';
          } else {
            clipboardStr = widthval + ' X ' + heightval;
          }
        }
        return clipboardStr;
      }
      // !VA Get the Appdata value for the clicked Inspector element and get the Clipboard string based on whether shif or ctrl is pressed 
      switch(true) {
      // !VA Inspector Label clicked
      case targetid === 'ins-display-size-label':
        widthval = Appdata.imgW;
        heightval = Appdata.imgH;
        clipboardStr = getVal( widthval, heightval, modifierKey);
        break;
      case targetid === 'ins-small-phones-label':
        widthval = Appdata.sPhonesW;
        heightval = Appdata.sPhonesH;
        clipboardStr = getVal( widthval, heightval, modifierKey);
        break;
      case targetid === 'ins-large-phones-label':
        widthval = Appdata.lPhonesW;
        heightval = Appdata.lPhonesH;
        clipboardStr = getVal( widthval, heightval, modifierKey);
        break;
      // !VA Inspector Value clicked
      case targetid === 'ins-display-size-width-value':
        widthval = Appdata.imgW;
        clipboardStr = getVal( widthval, heightval, modifierKey);
        break;
      case targetid === 'ins-display-size-height-value':
        heightval = Appdata.imgH;
        clipboardStr = getVal( widthval, heightval, modifierKey);
        break;
      case targetid === 'ins-small-phones-width-value':
        widthval = Appdata.sPhonesW;
        clipboardStr = getVal( widthval, heightval, modifierKey);
        break;
      case targetid === 'ins-small-phones-height-value':
        heightval = Appdata.sPhonesH;
        clipboardStr = getVal( widthval, heightval, modifierKey);
        break;
      case targetid === 'ins-large-phones-width-value':
        widthval = Appdata.lPhonesW;
        clipboardStr = getVal( widthval, heightval, modifierKey);
        break;
      case targetid === 'ins-large-phones-height-value':
        heightval = Appdata.lPhonesH;
        clipboardStr = getVal( widthval, heightval, modifierKey);
        break;
      default:
        // code block
      } 
      writeClipboard(targetid, clipboardStr);
    }
    // !VA END CLIPBOARD FUNCTIONS

    // !VA CBController public functions 
    return {

      // !VA Access to getAttributes from outside its native CBController module
      initGetAttributes: function () {
        let Attributes = [];
        Attributes = getAttributes();
        return Attributes;
      },

      // !VA Called from eventHandler to initialize clipboard functionality
      doClipboard: function(evt) {
        console.log('doClipboard running');
        let targetid, modifierKey;
        targetid = evt.target.id;
        // !VA Determined if shift or ctrl is pressed while clicked
        if (evt.shiftKey) { 
          modifierKey = 'shift';
        } else if (evt.ctrlKey ) {
          modifierKey = 'ctrl';
        } else {
          modifierKey = false;
        }
        // !VA IMPORTANT: Is this still necessary? Attributes don't appear to be passed anywhere here, and the Attributes are called after getUserSelections in the switch statement below. I think this might be deprecated.
        // !VA If the CCP image fluid/fixed radio button is clicked, then 
        if (targetid.includes('fixed') || targetid.includes('fluid')) {
          getAttributes();
        }
        // !VA Determine which element is clicked -- imgType (fluid or fixed), makeTag button, makeCSSRule button or Inspector element and run getUserSelections, makeCSSRule or handleInspectorClicks respectively. If an imgType button is clicked, we need to rebuild the nodeList because changing to fluid from fixed might result in a change to the tdoptions, plus we  need to rebuilt the Attributes object because the attributes have changed, which requires a CCP update. Changing the selected td option if fluid is selected also has to be done in getUserSelections, because the fluid option will only work with tdbasic,  so let's call getUserSelections for 'tag', 'fluid' and 'fixed'.
        switch(true) {
        case targetid.includes('tag') || targetid.includes('fluid') || targetid.includes('fixed') :
          getUserSelections(targetid);
          break;
        case targetid.includes('css') :
          makeCssRule(targetid);
          break;
        case targetid.includes('ins') :
          handleInspectorClicks(targetid, modifierKey);
          break;
        default:
          console.log('ERROR in doClipboard: case not defined');
        } 
        return targetid;
      },
    };
  })();

  // GLOBAL APP MODULE
  var appController = (function(CBCtrl, UICtrl) {

    // !VA Initialize appObj
    // function Appobj( fileName, imgW, imgH, imgNW, imgNH, viewerW, viewerH, sPhonesW, sPhonesH, lPhonesW, lPhonesH, aspect, iptCcpImgClass, iptCcpImgAlt, rdoCcpImgFixed, rdoCcpImgFluid, selCcpImgAlign, iptCcpImgRelPath, spnCcpImgIncludeAnchorCheckmrk, iptCcpTdClass, selCcpTdAlign, selCcpTdValign, iptCcpTdHeight, iptCcpTdWidth, iptCcpTdBgColor, iptCcpTdFontColor, iptCcpTdBorderColor, iptCcpTdBorderRadius, rdoCcpTdBasic, rdoCcpTdExcludeimg, rdoCcpTdImgswap, rdoCcpTdPosswitch, rdoCcpTdBgimage, iptCcpTableClass, selCcpTableAlign, iptCcpTableWidth, iptCcpTableBgColor, spnCcpTableIncludeWrapperCheckmrk, iptCcpTableWrapperClass, iptCcpTableWrapperWidth, selCcpTableWrapperAlign, iptCcpTableWrapperBgColor ) {
    //   return { fileName, imgW, imgH, imgNW, imgNH, viewerW, viewerH, sPhonesW, sPhonesH, lPhonesW, lPhonesH, aspect, iptCcpImgClass, iptCcpImgAlt, rdoCcpImgFixed, rdoCcpImgFluid, selCcpImgAlign, iptCcpImgRelPath, spnCcpImgIncludeAnchorCheckmrk, iptCcpTdClass, selCcpTdAlign, selCcpTdValign, iptCcpTdHeight, iptCcpTdWidth, iptCcpTdBgColor, iptCcpTdFontColor, iptCcpTdBorderColor, iptCcpTdBorderRadius, rdoCcpTdBasic, rdoCcpTdExcludeimg, rdoCcpTdImgswap, rdoCcpTdPosswitch, rdoCcpTdBgimage, iptCcpTableClass, selCcpTableAlign, iptCcpTableWidth, iptCcpTableBgColor, spnCcpTableIncludeWrapperCheckmrk, iptCcpTableWrapperClass, iptCcpTableWrapperWidth, selCcpTableWrapperAlign, iptCcpTableWrapperBgColor };
    // }

    let Appobj = {};
    // console.log('init Appobj: ');
    // console.dir(Appobj);
    // !VA Getting DOM ID strings from UIController
    const inspectorElements = UICtrl.getInspectorElementIDs();
    const inspectorValues = UICtrl.getInspectorValuesIDs();
    const inspectorLabels = UICtrl.getInspectorLabelsIDs();
    const dynamicRegions = UICtrl.getDynamicRegionIDs();
    const staticRegions = UICtrl.getStaticRegionIDs();
    const toolbarElements = UICtrl.getToolButtonIDs();
    const ccpUserInput = UICtrl.getCcpUserInputIDs();
    // !VA Deprecated?
    // const ccpUserInputLabels = UICtrl.getCcpUserInputLabelIds();
    const btnCcpMakeClips =  UICtrl.getBtnCcpMakeClips();
    const appMessageElements =  UICtrl.getAppMessageElements();

    // !VA Branch: implementAppobj02 (060620)
    // !VA Get CCP DOM element values into Appobj. We need to initialize Appobj with the CCP defaults as set in the HTML file. Do this in populateAppobj in calcViewerSize for now.






    
    //EVENT HANDLING START 
    // !VA appController private
    // !VA Creating a separate EventListener setup function specifically for tooltips, because this function will be run on DOMContentLoaded in an iife every time the CTRL + ALT key combination is pressed. The onModifierKeypress function should live in appController, I think. The tooltips themselves can be displayed either through UIController.showAppMessages or a new, separate UIController public function.
    // !VA Process the tooltip triggers when the mouseenter event is fired on them, i.e. get the appMessCode, appMessContent and duration and pass to showTooltip
    // !VA IMPORTANT: addEventListeners and removeEventListeners require a NAMED function, not just a function definition. If you just use a function definition, you can create the eventListener but you can't remove it because Javascript doesn't know which one you want to remove. Worse, it fails silently. So always name your function calls into a var when adding/removing event listeners!
    // !VA NOTE: variable name can't be the same as the function name. Otherwise, you can add and remove the event listener only ONCE, but not multiple times.
    var tooltipTriggers = function tooltipTriggers(evt) { 
      // !VA Named function to include as function parameter in tooltip event handlers. IMPORTANT: anonymous functions can't be removed with removeEventListener. That's why it has to be named. This is just a pass-thru to get to appController.handleAppMessages.
      appController.handleAppMessages(evt);
    };

    // !VA ADD EVENT LISTENERS FOR TOOLTIP TRIGGERS
    // !VA NOTE: I'm sure the add and remove event listeners can be consolidated into one - but not today.
    function addTooltipEventListeners() {
      // !VA Event handler for initializing tooltip event listeners 
      function addEventHandler(oNode, evt, oFunc, bCaptures) {
        oNode.addEventListener(evt, oFunc, bCaptures);
      }
      // !VA initialize the toolbar tooltip triggers
      var toolbarIds = Object.values(toolbarElements);
      let el;
      for (let i = 0; i < toolbarIds.length; i++) {
        el = document.querySelector(toolbarIds[i]);
        addEventHandler(el, 'mouseenter', tooltipTriggers, true);
      }
      // !VA Add tooltip triggers for Inspector labels
      var inspectorLabelIds = Object.values(inspectorLabels);
      for (let i = 0; i < inspectorLabelIds.length; i++) {
        el = document.querySelector(inspectorLabelIds[i]);
        addEventHandler(el, 'mouseenter', tooltipTriggers, true);
      }
      // !VA Add tooltip triggers for Inspector Value  elements
      var inspectorValueIds = Object.values(inspectorValues);
      for (let i = 0; i < inspectorValueIds.length; i++) {
        el = document.querySelector(inspectorValueIds[i]);
        addEventHandler(el, 'mouseenter', tooltipTriggers, true);
      }
      // !VA Add tooltip triggers for CCP user input elements
      // !VA To get the tooltip targets, we need both the input element and its label because the user will probably click on the label. We might not even need the ccpUserInput element itself but rather only the label, but for now we'll use both. We could loop through the parent DIV of the input element and add the eventHandler that way, but then we can't remove the input element if we decide we don't need the tooltip on it, so we'll do them separately.
      var ccpUserInputIds = Object.values(ccpUserInput);
      for (let i = 0; i < ccpUserInputIds.length; i++) {
        el = document.querySelector(ccpUserInputIds[i]);
        addEventHandler(el, 'mouseenter', tooltipTriggers, true);
      }
      // !VA Add tooltip triggers for CCP user input label elements
      // !VA All the labels have the same id as the inputs with -label appended except the mock checkboxes, whose label has no text and only serves to style the mock checkbox. So for the mock checkboxes, transform the id into the id of the actual text label by removing the spn- prefix and replacing 'checkmrk' with 'label'.
      let labelid, labelel;
      // !VA Loop through the CCP user input element ids
      for (let i = 0; i < ccpUserInputIds.length; i++) {
        labelid = ccpUserInputIds[i];
        // !VA If the label contains 'checkmrk'...
        if (labelid.includes('checkmrk')) {
          // !VA Remove the spn prefix
          labelid = labelid.replace(/spn-/g, '');
          // !VA Replace checkmrk with label
          labelid = labelid.replace(/checkmrk/g, 'label');
        } else {
          // !VA If it's not a checkmark, just append -label to the id to get the label id
          labelid = labelid + '-label';
        }
        // !VA get the element with the labelid
        labelel = document.querySelector(labelid);
        // !VA Add the event listener to th label element
        addEventHandler(labelel, 'mouseenter', tooltipTriggers, true);
      }
      // !VA Add tooltip targets to the Make Clip buttons - both the Make HTML and Make CSS buttons
      var btnCcpMakeClipIds = Object.values(btnCcpMakeClips);
      for (let i = 0; i < btnCcpMakeClipIds.length; i++) {
        el = document.querySelector(btnCcpMakeClipIds[i]);
        addEventHandler(el, 'mouseenter', tooltipTriggers, true);
      }
    }

    function removeTooltipEventListeners() {
      // !VA Event handler for initializing tooltip event listeners 
      function removeEventHandler(oNode, evt, oFunc, bCaptures) {
        oNode.removeEventListener(evt, oFunc, bCaptures);
      }
      // !VA initialize the toolbar tooltip triggers
      var toolbarIds = Object.values(toolbarElements);
      let el;
      for (let i = 0; i < toolbarIds.length; i++) {
        el = document.querySelector(toolbarIds[i]);
        removeEventHandler(el, 'mouseenter', tooltipTriggers, true);
      }
      // !VA Add tooltip triggers for Inspector labels
      var inspectorLabelIds = Object.values(inspectorLabels);
      for (let i = 0; i < inspectorLabelIds.length; i++) {
        el = document.querySelector(inspectorLabelIds[i]);
        removeEventHandler(el, 'mouseenter', tooltipTriggers, true);
      }
      // !VA Add tooltip triggers for Inspector Value  elements
      var inspectorValueIds = Object.values(inspectorValues);
      for (let i = 0; i < inspectorValueIds.length; i++) {
        el = document.querySelector(inspectorValueIds[i]);
        removeEventHandler(el, 'mouseenter', tooltipTriggers, true);
      }
      // !VA Add tooltip triggers for CCP user input elements
      // !VA To get the tooltip targets, we need both the input element and its label because the user will probably click on the label. We might not even need the ccpUserInput element itself but rather only the label, but for now we'll use both. We could loop through the parent DIV of the input element and add the eventHandler that way, but then we can't remove the input element if we decide we don't need the tooltip on it, so we'll do them separately.
      var ccpUserInputIds = Object.values(ccpUserInput);
      for (let i = 0; i < ccpUserInputIds.length; i++) {
        el = document.querySelector(ccpUserInputIds[i]);
        removeEventHandler(el, 'mouseenter', tooltipTriggers, true);
      }
      // !VA Add tooltip triggers for CCP user input label elements
      // !VA All the labels have the same id as the inputs with -label appended except the mock checkboxes, whose label has no text and only serves to style the mock checkbox. So for the mock checkboxes, transform the id into the id of the actual text label by removing the spn- prefix and replacing 'checkmrk' with 'label'.
      let labelid, labelel;
      // !VA Loop through the CCP user input element ids
      for (let i = 0; i < ccpUserInputIds.length; i++) {
        labelid = ccpUserInputIds[i];
        // !VA If the label contains 'checkmrk'...
        if (labelid.includes('checkmrk')) {
          // !VA Remove the spn prefix
          labelid = labelid.replace(/spn-/g, '');
          // !VA Replace checkmrk with label
          labelid = labelid.replace(/checkmrk/g, 'label');
        } else {
          // !VA If it's not a checkmark, just append -label to the id to get the label id
          labelid = labelid + '-label';
        }
        // !VA get the element with the labelid
        labelel = document.querySelector(labelid);
        // !VA Add the event listener to th label element
        removeEventHandler(labelel, 'mouseenter', tooltipTriggers, true);
      }
      // !VA Add tooltip targets to the Make Clip buttons - both the Make HTML and Make CSS buttons
      var btnCcpMakeClipIds = Object.values(btnCcpMakeClips);
      for (let i = 0; i < btnCcpMakeClipIds.length; i++) {
        el = document.querySelector(btnCcpMakeClipIds[i]);
        removeEventHandler(el, 'mouseenter', tooltipTriggers, true);
      }
    }

    // !VA appController private
    var setupEventListeners = function() {

      //DRAG AND DROP PROCESSING START
      // Event Listeners for Drag and Drop
      // !VA dropArea is the screen region that will accept the drop event 
      var dropArea = document.querySelector(dynamicRegions.appContainer);
      dropArea.addEventListener('dragover', handleDragOver, false);
    
      // !VA Initiates the FileReader function to get the dropped image data
      dropArea.addEventListener('drop', handleFileSelect, false);
      // Drag and Drop Listener 
      //DRAG AND DROP PROCESSING END

      // !VA Add the click event listener for creating the isolate popup
      var runIsolateApp = document.querySelector(staticRegions.hdrIsolateApp);
      runIsolateApp.addEventListener('click', isolateApp, false);

      // !VA Event handler for initializing event listeners 
      function addEventHandler(oNode, evt, oFunc, bCaptures) {
        oNode.addEventListener(evt, oFunc, bCaptures);
      }



      // !VA Add click and blur event handlers for clickable toolbarElements 
      const tbClickables = [ toolbarElements.btnTbrIncr50, toolbarElements.btnTbrIncr10, toolbarElements.btnTbrIncr01, toolbarElements.btnTbrDecr50, toolbarElements.btnTbrDecr10, toolbarElements.btnTbrDecr01  ];
      for (let i = 0; i < tbClickables.length; i++) {
        // !VA convert the ID string to the object inside the loop
        tbClickables[i] = document.querySelector(tbClickables[i]);
        addEventHandler(tbClickables[i],'click',handleMouseEvents,false);
      }

      // !VA Add onfocus event handlers globally for input elements 
      const tbFocusInputs = [ toolbarElements.iptTbrViewerW, toolbarElements.iptTbrSPhonesWidth, toolbarElements.iptTbrLPhonesWidth  ];
      for (let i = 0; i < tbFocusInputs.length; i++) {
        // !VA convert the ID string to the object inside the loop
        tbFocusInputs[i] = document.querySelector(tbFocusInputs[i]);
        addEventHandler(tbFocusInputs[i],'click',handleOnfocus,false);
      }
      
      // !VA Add event handlers for input toolbarElements
      const tbKeypresses = [ toolbarElements.iptTbrViewerW, toolbarElements.iptTbrImgWidth, toolbarElements.iptTbrImgHeight, toolbarElements.iptTbrSPhonesWidth, toolbarElements.iptTbrLPhonesWidth ];
      for (let i = 0; i < tbKeypresses.length; i++) {
        // !VA convert the ID string to the object inside the loop
        tbKeypresses[i] = document.querySelector(tbKeypresses[i]);
        // !VA Handles all key events except TAB, which require keyDown to get the value of the current input rather than the input being tabbed to.
        addEventHandler((tbKeypresses[i]),'keydown',handleKeydown,false);
        addEventHandler((tbKeypresses[i]),'keyup',handleKeyup,false);
        addEventHandler((tbKeypresses[i]),'focus',handleFocus,false);
        addEventHandler((tbKeypresses[i]),'blur',handleBlur,false);
      }

      // !VA Add click event handlers for Inspector clickable elements: Display Size, Small Phones and Large Phones values in the programmatically created SPAN tags
      const inspectorClickables = [ inspectorLabels.insDisplaySizeLabel, inspectorLabels.insSmallPhonesLabel, inspectorLabels.insLargePhonesLabel, inspectorValues.insDisplaySizeWidthValue, inspectorValues.insDisplaySizeHeightValue, inspectorValues.insSmallPhonesWidthValue, inspectorValues.insSmallPhonesHeightValue, inspectorValues.insLargePhonesWidthValue, inspectorValues.insLargePhonesHeightValue ];
      for (let i = 0; i < inspectorClickables.length; i++) {
        // !VA convert the ID string to the object inside the loop
        inspectorClickables[i] = document.querySelector(inspectorClickables[i]);
        addEventHandler(inspectorClickables[i],'click',CBController.doClipboard,false);
      }

      // !VA Add mouseover event handlers for Inspector clickable elements: Display Size, Small Phones and Large Phones values in the programmatically created SPAN tags
      const inspectorHoverables = [ inspectorLabels.insDisplaySizeLabel, inspectorLabels.insSmallPhonesLabel, inspectorLabels.insLargePhonesLabel, inspectorValues.insDisplaySizeWidthValue, inspectorValues.insDisplaySizeHeightValue, inspectorValues.insSmallPhonesWidthValue, inspectorValues.insSmallPhonesHeightValue, inspectorValues.insLargePhonesWidthValue, inspectorValues.insLargePhonesHeightValue ];
      for (let i = 0; i < inspectorHoverables.length; i++) {
        // !VA convert the ID string to the object inside the loop
        inspectorHoverables[i] = document.querySelector(inspectorHoverables[i]);
        // !VA IMPORTANT: WTF is this?
        addEventHandler(inspectorHoverables[i],'mouseenter',CBController.enteredMe,false);
      }


      // !VA Add event handlers for the input elements that show mobile CSS clipboard buttons in the CCP when input is made. These are the class input elements for ccp Img, Td and Table options
      const ccpClassInputs = [ ccpUserInput.iptCcpImgClass, ccpUserInput.iptCcpTdClass, ccpUserInput.iptCcpTableClass ];
      for (let i = 0; i < ccpClassInputs.length; i++) {
        // !VA convert the ID string to the object inside the loop
        ccpClassInputs[i] = document.querySelector(ccpClassInputs[i]);
        addEventHandler((ccpClassInputs[i]),'input',showElementOnInput,false);
      }

      // !VA Add click handlers for Inspector - there's only the clipboard button now but there could be more. 
      var dvClickables = [ inspectorElements.btnToggleCcp ];
      for (let i = 0; i < dvClickables.length; i++) {
        // !VA convert the ID string to the object inside the loop
        dvClickables[i] = document.querySelector(dvClickables[i]);
        addEventHandler((dvClickables[i]),'click',appController.initCcp,false);
      }

      // !VA We need eventListeners for ALL the clipboard buttons so make an eventListener for each value in the btnCcpMakeClips object. We need a for in loop for objects
      for(let i in btnCcpMakeClips) {
        // !VA loop through the object that contain the id and func properties.
        let clipBut;
        if(btnCcpMakeClips.hasOwnProperty(i)){
          clipBut = document.querySelector(btnCcpMakeClips[i]);
          addEventHandler(clipBut,'click',CBController.doClipboard,false);
        }
      }

      // !VA eventListeners for the tdOptions radio buttons for showing/hiding options based on selectedTdOption
      // for(let i in ccpUserInput) {
      //   let selectedTdOption;
      //   // !VA Target only those ccpUserInput elements whose first 4 characters are #rdo-ccp-td. This identifies them as the radio button options.
      //   if (ccpUserInput[i].substring(0, 11) === '#rdo-ccp-td') {
      //     selectedTdOption = document.querySelector(ccpUserInput[i]);
      //     // !VA Add an event handler to trap clicks to the tdoptions radio button
      //     addEventHandler(selectedTdOption,'click',showTdOptions,false);
      //   }
      // }
      

      // !VA Add event handlers for input toolbarElements
      let ccpKeypresses;
      for(let i in ccpUserInput) {
        if (ccpUserInput[i].substring(0,4) === '#ipt') {

          ccpKeypresses = document.querySelector(ccpUserInput[i]);
          addEventHandler(ccpKeypresses,'keydown',handleKeydown,false);
          addEventHandler(ccpKeypresses,'keyup',handleKeyup,false);
          addEventHandler(ccpKeypresses,'focus',handleFocus,false);
          addEventHandler(ccpKeypresses,'blur',handleBlur,false);

        }
      }


      // !VA Branch: implementAppobj03 (060820) This was the catch-all event handler prior to this branch but it doesn't work because it doesn't trap keyboard input. 
      let ccpRadioClicks;
      for(let i in ccpUserInput) {
        if (ccpUserInput[i].substring(0,4) === '#rdo') {
          ccpRadioClicks = document.querySelector(ccpUserInput[i]);
          addEventHandler(ccpRadioClicks,'click',handleCcpRadioSelection,false);
        }
      }



      // // !VA eventListeners for the imgType radio buttons for showing/hiding options based on CCP fixed/fluid radio buttons
      // for(let i in ccpUserInput) {
      //   let selectedImgType;
      //   // !VA Target only those ccpUserInput elements whose first 12 characters are #rdo-ccp-img. This identifies them as the fluid/fixed radio button options.
      //   if (ccpUserInput[i].substring(0, 12) === '#rdo-ccp-img') {
      //     selectedImgType = document.querySelector(ccpUserInput[i]);
      //     // !VA Add an event handler to trap clicks to the tdoptions radio button
      //     addEventHandler(selectedImgType,'click',toggleImgType,false);
      //   }
      // }

      // // !VA eventListener for the Include Wrapper checkbox. Checkboxes need to have separate event handlers because their functions are too different to consolidate into a single one.
      // let includeWrapperCheckbox = document.querySelector(ccpUserInput.spnCcpTableIncludeWrapperCheckmrk);
      // addEventHandler(includeWrapperCheckbox,'click',toggleIncludeWrapper,false);

      // // !VA eventListener for the Include Anchor checkbox. Checkboxes need to have separate event handlers because their functions are too different to consolidate into a single one.
      // let includeAnchorCheckbox = document.querySelector(ccpUserInput.spnCcpImgIncludeAnchorCheckmrk);
      // addEventHandler(includeAnchorCheckbox,'click',toggleIncludeAnchor,false);


      // !VA Misc Unused Handlers for review
      // =============================
      // !VA This was moved to initCcp I think
      // addEventHandler(inspectorElements.btnToggleCcp,'click',toggleCCP,false);

      // Keypress handlers - showMobileImageButtons
      // ==================================
      
      // Keypress handlers - Misc
      // ==================================
      // addEventHandler(inspectorElements.btnToggleCcp,'keypress',toggleCCP,false);

      // Blur handlers - handleInputBlur
      // =================================
      // addEventHandler(ccpUserInput.iptCcpImgClass,'blur',showMobileImageButtons,false);
      // ccpUserInput.iptCcpImgAlt.addEventListener('blur', showMobileImageButtons);
      // ccpUserInput.iptCcpImgClass.addEventListener('blur', showMobileImageButtons);
      // ccpUserInput.iptCcpImgRelPath.addEventListener('blur', showMobileImageButtons);
      
      // Change handlers - handleOnChange
      // =================================
      // addEventHandler(ccpUserInput.iptTbrImgWidth,'change',handleOnChange,false);
      // addEventHandler(ccpUserInput.tableWidth,'change',handleOnChange,false);

      // !VA The closing bracket below belongs to initializeHandlers(), see the top of this function
      // }
      // addEventHandler(window, 'load', function(evt) {initializeHandlers(); } );
    };
    // !VA EVENT HANDLING END

    // !VA FILEREADER OBJECT PROCESSING
    // appController private: hfs - FILEREADER OBJECT PROCESSING
    //Get the user-selected image file object 
    function handleFileSelect(evt) {
      // If a file is already being displayed, i.e. Appdata.fname is true, then remove that image to make room for the next image being dropped
      // !VA Remove the current #cur-img from the DOM. This has to be done in a separate function call, I'm not sure why handleFileSelect doesn't see #cur-img even though it is in the DOM at this point
      // !VA Remove the current image if one exists so the user can drop another one over it and reboot the process rather than having to refresh the browser and drop another image. This way, all the current settings are maintained. If they want new settings they can refresh the browser.
      document.querySelector('#cur-img-container').parentNode.removeChild(document.querySelector('#cur-img-container'));
      //The drop event has been executed and handleFileSelect is running.
      // !VA Can't remember what this does running    
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
        // !VA TODO: try catch here
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
          // Read the insFilename of the FileReader object into a variable to pass to the getAppData function, otherwise the blob has no name
          fileName = theFile.name;
          // !VA Write the insFilename to the DOM so we can add it later to Appdata. It's not completely DRY because it's added to the DOM here and later to Appdata, and then queried in the CCP from Appdata, but it's better than having to query it from the DOM every time it's used in a separate function call. This way, we can loop through Appdata to get it if we need to.
          // !VA Branch: implementAppobj01 (060420)
          document.querySelector(inspectorElements.insFilename).textContent = Appobj.fileName = fileName;
          // console.log('handleFileSelect Appobj.fileName is: ' + Appobj.fileName);


          // !VA Hide the dropArea - not sure if this is the right place for this.
          // !VA TODO: Make function
          document.querySelector(staticRegions.dropArea).style.display = 'none';
          // !VA  Once the current image has loaded, initialize the dinViewers by querying the current image properties from UICtrl and passing them to writeInspectors.
          function initInspectors() { 
            // !VA  Initialize the variable that will contain the new image's height, width, naturalHeight and naturalWidth
            // !VA Set a short timeout while the blob loads, then run the onload function before displaying the image and getting its properties. This is probably overkill, but noone will notice the 250ms anyway and better safe then no-workie. But now that the image is loaded, we can display it and get its properties.
            setTimeout(() => {
              // Once the blob is loaded, show it and get its data
              curImg.onload = (function() {
              // !VA Hide the drop area.
              // !VA TODO: Make function
                document.querySelector(staticRegions.dropArea).style.display = 'none';
                // !VA  Show the toolbar
                // !VA TODO: Make function
                document.querySelector(staticRegions.tbrContainer).style.display = 'flex';
                // !VA Display the current image
                // !VA TODO: Make function
                curImg.style.display = 'block';
                // !VA Calculate the viewer size based on the loaded image
                // !VA TODO: Remove the false argument if it has no purpose
                calcViewerSize(false);
              })();
              
              // !VA Timeout of 250 ms while the blob loads.
            }, 250);
          }

          // !VA First, write the new curImg object to the DOM
          function initImgToDOM(curImg, callback) {

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
          initImgToDOM(curImg, initInspectors);
        };

      })(f);
      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
    //FILEREADER OBJECT PROCESSING END


    // !VA sdf MODIFIER KEYS FOR TOOLTIP DISPLAY
    document.addEventListener('DOMContentLoaded', function() {
      console.log('Running on DOM content load');

      // !VA Get the root (html) element 
      const rootElement = document.querySelector(':root');
      // !VA Add a keydown event listener to trap the Alt + Ctrl key combination
      document.addEventListener('keydown', function(event) {
        if (event.altKey && event.ctrlKey) {
          // !VA This is the class that changes the default cursor into a help cursor. While the key combo is pressed, add the modifier-pressed class to the root element which displays the help cursor on the cursor 
          rootElement.classList.add('modifier-pressed');
          // !VA Add eventListeners for all tooltip trigger elements. IMPORTANT: addEventListeners requires that the function argument be a NAMED function (i.e. var myName = function(myName) ...) , otherwise removeEventListeners can't remove it because it can't identify it. Interestingly, addTooltipEventListeners gives all the event listeners for all the triggers the same named function as argument, and it works. I was afraid there would be a name conflict, but there doesn't appear to be -- the eventListeners do get removed below when the modifier keys are released.
          addTooltipEventListeners();
        }
      });
      document.addEventListener('keyup', function(event) {
        // !VA On keyup if either the Alt or Ctrl key is released, remove the active class from the appBlocker, remove the modifier-pressed class on the root element to change back to the default cursor, reset the innerHTML of the tipContentContainer to '', then remove all the eventListeners from all the tooltip tarets. 
        // !VA NOTE: This should be revisited to make it DRYer, it shouldn't be necessary to have two separate functions that include all the tooltip targets to loop through to add/remove event listeners from all of them. 
        if (event.altKey || event.ctrlKey) {
          let tipContentContainer, appBlocker;
          appBlocker = document.querySelector(staticRegions.appBlocker);
          rootElement.classList.remove('modifier-pressed');
          tipContentContainer = document.querySelector(appMessageElements.tipContent);
          tipContentContainer.innerHTML = '';
          if (appBlocker.classList.contains('active')) { appBlocker.classList.remove('active'); }
          removeTooltipEventListeners();
        }
      });
    });



            
    // !VA INPUT HANDLING
    // !VA ============================================================

    // !VA Drag and Drop Handler 
    // !VA appController private function
    function handleDragOver(evt) {
      //prevent the bubbling of the event to the parent event handler
      evt.stopPropagation();
      //prevent the default action of the element from executing -- so in this case
      //I think since it is a div the default event would be for some browsers to 
      //open the file in the browser when dropped
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }

    // !VA appController private
    // !VA Handle behavior when an element gets the focus. Pertains only to keyboard input, actually, I'm not sure whether buttons or CCP elements need special handling.
    // !VA TODO: Why is the argument  unused, why are there unused elements and what is actually happening here?
    function handleFocus(evt) {
      // !VA Get the target element of the click
      // el = document.getElementById(this.id);
      // !VA Select the clicked element's value, or if there's no value, set it to empty with a cursor, which is the default select behavior for empty fields.
      this.select();
    }

    // !VA TODO: Why is the argument unused, why are there unused elements and what is actually happening here?
    // !VA appController private
    // !VA TODO: This could use some commenting
    function handleBlur(evt) {
      // !VA Handle blur
      // var Appdata = {};
      // Appdata = appController.initGetAppdata();
      let prop;
      prop = elementIdToAppobjProp(this.id);
      // !VA If blurring from imgW or imgH, clear the field to display the placeholders. Otherwise, restore the field value to the Appdata property.
      // !VA NOTE: This can probably replace the blur statements in handleKeydown
      if (prop === 'imgW' || prop === 'imgH') {
        this.value = '';
      } else {
        this.value = Appdata[prop];
      }
    }

    // !VA TODO: Needs to be commented or removed if it does nothing
    function handleOnfocus(evt) {
      let targ = evt.target;
      let val = targ.value;
    }

    // !VA appController private 
    // !VA Preprocess mouse events and route them to respective eval handler.
    function handleMouseEvents(evt) {
      // !VA Carryover from earlier handleUserAction
      // !VA Get the target element of the click
      var el = document.getElementById(this.id);
      var args = { };
      args.target = el.id;
      try {
        // console.log('handleMouseEvents try: ');
        var vals = [], msgElement;
        // vals = (Object.values(appMessageElements));
        for (let i = 0; i < vals.length; i++) {
          // console.log('vals[i] is: ' +  vals[i]);
          msgElement = document.querySelector(vals[i]);
          // console.log('msgElement is: ' + msgElement);
          // console.log('msgElement[i].id is: ' + msgElement[i].id);
          // // if (msgElement.classList.contains('active')) {
          // //   console.log('vals[i] is: ' + vals[i]) + ' is active';
          // // }
        }
      } catch (error) {
        // console.log('handleMouseEvents catch:');
      }
      // !VA Handle the increment toolbuttons
      if (event.type === 'click') {
        switch (true) {
        case ( el.id.includes('tbr')) :
          // !VA Variable to hold the name of the Appdata property the event corresponds to
          // !VA prop not defined
          //var prop, val, isErr; 
          var val, isErr;
          // !VA We need to query Appdata properties to get the current value of imgW so we can add the toolbutton increments to id
          var Appdata = {};
          // !VA Cancel any running appmessage timeouts and animations
          Appdata = appController.initGetAppdata();
          // !VA This is a click on one of the toolbutton increment buttons, so we're dealing with the Appdata.imgW property.
          args.prop = 'imgW';
          // !VA The last 2 chars of the id indicate the value by which the img dimension should be incremented,so get the last 2 chars and convert to integer
          val = parseInt(el.id.slice(-2));
          // !VA If the target ID includes 'incr' then the image dimension will be incremented, if 'decr' then it will be decremented
          (el.id.includes('incr')) ? val : val = -val;
          // !VA Add val to the current imgW to get the value to be passed to checkUserInput for error parsing.
          val = Appdata.imgW + val;
          args.val = val;
          isErr = checkUserInput(args);
          if (isErr) {
            // !VA If it returns an error, select the input and show the error message so the user can correct it or ESC out of the field.
            // !VA Post-error button handling?
          } else {
            // !VA If no error, pass the Appdata property name and the entered value for further processing.
            // !VA NOTE: We might have to include the target ID in the error handling because this button should trigger a different message than the keyboard message. Revisit.
            // !VA Passing arguments as object
            evalToolbarInput(args);
          } 
          break;
        }
        // !VA TODO: Revisit this
      }  else if ( event.type === 'drop') {
        evt.preventDefault;
        // !VA TODO: Revisit this
      } else if ( event.type === 'dragover') {
        evt.preventDefault;
      } 
    }
          
    // !VA appController private function
    /* !VA This is a bit complicated but it expresses non-default field behavior:
      --imgW and imgH fields should never show entereed values but rather only placeholders. This is because they actual values are reflected upon entering in the DISPLAY SIZE inspectorElements and because any value entered in one of the fields would require an aspect ratio calculation to display in the other one. So one of the field values would have to update automatically which is distracting and confusing IMO especially since the values are presented clearly elsewhere.
      --The other fields should show the current Appdata value, i.e. the actual DOM element dimensions or data property value, because these values are NOT reflected anywhere in a Inspector. So when they are changed, they need to be updated and when a user makes a bad entry, they have to be restored to what they were previously.
      --Default Tab behavior, i.e. cycling through the tab order, has to be maintained under consideration of the above 2 points.
    */
    // !VA Tab needs to be in a keyDown because keyup is too late to trap the value before the default behavior advances ot the next field.
    // !VA TODO: Why are there unused elements and what is actually happening here?
    function handleKeydown(evt) {

      try {
        // console.log('handleKeyDown try: ');
        var vals = [], msgElement;
        vals = (Object.values(appMessageElements));
        for (let i = 0; i < vals.length; i++) {
          // console.log('vals[i] is: ' +  vals[i]);
          msgElement = document.getElementById(vals[i]);
          if (msgElement.classList.contains('active')) {
            // console.log('is active');
          }
        }
      } catch (error) {

        // !VA TODO: Why is this firing on every keypress
        // console.log('handleKeydown catch:');
      }

      // !VA Get the keypress
      keydown = evt.which || evt.keyCode || evt.key;

      // !VA Only set vars and get values if Tab and Enter keys were pressed
      if (keydown == 9 || keydown == 13 ) {
        console.log('Tab or Enterr pressed');
        var isErr, isEnter, isTab;
        var inputArray = { };

        console.log('evt.target.id is: ' + evt.target.id);
        if (evt.target.id.substring(0,7) === 'ipt-ccp') {
          handleCcpUserInput(evt);
        }



        // !VA Get the target element
        // el = document.getElementById(this.id);
        // // !VA 
        // console.log('this.id is: ' + this.id);

        // !VA inputArray is the array containing the values needed to check input, evaluate the Toolbar input, and update Appdata prior to writing dynamicRegions to the DOM after user input in the Toolbar input fields.
        // !VA evtTargetId is the ID of the element into which the user entered a change
        inputArray.evtTargetId = this.id;
        // !VA evtTargetVal is the value the user entered into the input element as integer.
        inputArray.evtTargetVal = parseInt(this.value);

        // !VA Set a flag if the the Enter key was pressed, for readability
        (keydown == 13) ? isEnter = true : isEnter = false;
        // !VA Set a flag if the the Tab key was pressed, for readability
        (keydown == 9) ? isTab = true : isTab = false;
        // !VA elementIdToAppobjProp gets the Appobj key that corresponds to a given element ID. We need the Appobj key to get the Appobj value to compare to the user-entered value in the respective Toolbar input field. 
        inputArray.appObjProp = elementIdToAppobjProp(this.id);
        // !VA If Tab was pressed and this.value is either empty or equals the Appobj value, then there's been no change to the field, so let Tab just cycle through the fields as per its default.
        if ((isTab) && ((this.value === '' || this.value == Appobj[inputArray.appObjProp]))) {
          // !VA Only if imgW or imgH, delete the existing value to display the placeholders. Otherwise, tab through and leave the existing value from Appdata
          if (inputArray.prop === 'imgW' || inputArray.prop === 'imgH') {
            this.onblur = function() {
              this.value = '';
            };
          }
        } else {
          // !VA Field value was changed, so first, pass the args to checkUserInput for errors.
          isErr = checkUserInput(inputArray);
          if (isErr) {
            // !VA If it returns an error, select the input and show the error message so the user can correct it or ESC out of the field. If Tab, prevent advancing to the next field until the error is corrected or ESC is pressed.
            isEnter ? isEnter : evt.preventDefault(); 
            // !VA We have to leave the bad value in the field so the user can correct it or press Esc to blur without change, otherwise it will conflict with the default tab order behavior.
            this.select();
          } else {
            // !VA If the value was entered in the imgW or imgH field, show the value selected first so the user can view and change it before implementing. Only on Tab can the value be implemented and advance to the next field.
            if (inputArray.prop === 'imgW' || inputArray.prop === 'imgH') {
              if (isEnter) {
                this.select();
              } else {
                this.value = '';
                this.blur();
              }
            }
            // !VA Pass the inputArray to evalToolbarInput.
            evalToolbarInput(inputArray);
          }
        } 
      }
    }

    // !VA appController private
    // !VA TODO: Why are there unused elements and what is actually happening here?
    // !VA keyPress handler for the ESC key.  This has to be handled on keyup, so we need a separate handler for it.
    // !VA TODO: 
    function handleKeyup(evt) {
      let prop, curLocalStorage;
      // !VA We only need the property here, so no need to create an args object. We could actually just use the target but since we're standardizing on property names, let's stick with that. Get the property name from the id of this, i.e. the event target
      prop = elementIdToAppobjProp(this.id);
      // !VA Find out which key was struck
      keyup = evt.which || evt.keyCode || evt.key;
      // var Appdata = appController.initGetAppdata();
      // !VA  On ESC, we want imgW and imgH to exit the field and go back to showing the placeholders defined in the CSS. This is because these values are already provided in the inspectorElements and there's no need to recalc the W and H each time the user makes and entry - that would just be confusing. For viewerW, sSphonesW and lPhonesW, revert to the previously displayed value if the user escapes out of the input field. The previously displayed value will be either 1) the default in the HTML placeholder attribute or 2) the localStorage value. So, the localStorage value is false, get the placeholder, otherwise get the localStorage value.
      // !VA Esc key
      if (keyup == 27 ) {
        // !VA If the event target is the imgW or imgH input fields, on ESC exit the field and restore the placeholder set in the HTML file.
        if (prop === 'imgW' || prop === 'imgH') {
          this.value = ('');
          this.blur();
        // !VA If the event target is viewerW, iptTbrSmallPhonesW and iptTbrLargePhonesW, on ESC exit the field and restore the preexisting value localStorage if it exists, if not, restore the default stored in the HTML placeholder.
        } else {
          curLocalStorage = appController.getLocalStorage();
          if (prop === 'viewerW') {
            curLocalStorage[0] ? this.value = curLocalStorage[0] : this.value = document.querySelector(toolbarElements.iptTbrViewerW).placeholder;
          } else if (prop === 'sPhonesW') {
            curLocalStorage[1] ? this.value = curLocalStorage[1] : this.value = document.querySelector(toolbarElements.iptTbrSPhonesWidth).placeholder;
          } else if (prop === 'lPhonesW') {
            curLocalStorage[2] ? this.value = curLocalStorage[2] : this.value = document.querySelector(toolbarElements.iptTbrLPhonesWidth).placeholder;
          } else {
            console.log('ERROR in handleKeyup: localStorage value does not exist');
          }
        }
      }
    }

    // !VA  Parsing keyboard input based on Appdata property passed in from handleKeyup.
    // !VA TODO: rename to checkUserInput and include parsing of the toolbutton mouseclicks from handleToolbarClicks.
    // !VA TODO: Why are there unused variables and what is actually happening here?
    // !VA appController private
    function checkUserInput(inputArray) {
      // !VA Destructure inputArray
      // !VA TODO: I don't think evtTargetId is ever used...remove?
      const { evtTargetId, appObjProp, evtTargetVal } = inputArray;
      let appMessCode;
      var isErr;
      isErr = false;
      var Appdata= {};
      Appdata = appController.initGetAppdata();


      // !VA TODO: Setting maxViewerWidth just for now
      var maxViewerWidth = 800;
      // !VA First, check if there's a message running
      // !VA First, we validate that the user-entered value is an integer and if so, set the error variables.
      if (validateInteger(evtTargetVal)) {
        // !VA NOTE: This is where we could easily trap the negative button increment if it falls below 0 to send a different message than just the standard 'not_Integer' message. Revisit.
        appMessCode = 'err_not_Integer';
        isErr = true;
      } else {
        // !VA Now, we handle the error cases if user has entered a value in the imgViewer field 
        switch (true) {
        case (appObjProp === 'viewerW') :
          // !VA The user has selected a viewerW that's smaller than the currently displayed image. Undetermined how to deal with this but for now the current image is shrunk to the selected viewerW. But Appdata is not updated accordingly, needs to be fixed.
          if (evtTargetVal < Appdata.imgW ) {
            // !VA Do nothing for now, see above.
          } else if (evtTargetVal > maxViewerWidth ) {
            // !VA TODO: review the maxViewerWidth issue, but for now set it to 800px - and the user-entered value exceeds this, so error.
            isErr = true;
            appMessCode = 'err_viewerW_GT_maxViewerWidth';
          } else {
            // !VA first write val to the viewerW input's value
            // document.querySelector(dynamicRegions.imgViewer).value = val;
            // !VA  The viewerW is greater than the imgW so we can go ahead and widen the viewerW with no affecton the current image and without running calcViewerSize. So, return no error and continue in handleKeyup.
            isErr = false;
          }
          break;
          // !VA Handle the imagewidth toolButton input
        case (appObjProp === 'imgW') :
          // !VA If the new image width is greater than the viewer width, then show message. 
          if (evtTargetVal > Appdata.viewerW ) {
            // !VA errorHandler!
            isErr = true;
            appMessCode = 'err_imgW_GT_viewerW';
          }
          break;
        // !VA TODO: Handle the imageheight toolButton input
        case (appObjProp === 'imgH') :
          console.log('Error handling for imageheight input not implemented!');
          break;

          // !VA TODO: Handle the small phone input
        case (appObjProp === 'sPhoneW') :
          console.log('Error handling for iptTbrSmallPhonesW input not implemented!');
          break;
        
        // !VA Handle the large phone input
        case (appObjProp === 'lPhoneW') :
          console.log('Error handling for imagewidth input not implemented!');
          break;
        }
      } 

      if (isErr) {
        // !VA IF Error pass the code to errorHandler to get the error message
        appController.handleAppMessages( appMessCode );
      } else {
        // !VA If no error, pass false back to handleKeyup and continue.
        isErr = false;
      }
      return isErr;
    }

    // !VA appController private
    // !VA TODO: Why are there unused variables and what is actually happening here?
    // !VA args is the target, prop and val passed in from handleKeyUp and handleMouseEvents. 
    function evalToolbarInput(inputArray) {

      // !VA Here we get the toolbar input from handleKeyDown, determine which input field it was entered in, and pass the value to the updateAppobj. Note that until updateAppobj is called, Appdata still retains the values prior to the user input in the fields that initiated this action.
      // !VA Initialize vars for imgH and imgW since we need to calculate one based on the value of the other and Appdata.aspect. Also initialize arg1 and arg2 which will be passed to updateAppobj
      let imgH, imgW, arg1, arg2;

      // !VA TODO: Target isn't read in this function. Evaluate whether it needs to be passed in  from the caller (handleKeyDown, handleMouseEvents)
      // !VA ES6 Destructure args into constants.
      const { evtTargetId, appObjProp, evtTargetVal } = inputArray;

      switch(true) {
      // !VA If the value was entered in the imgViewer field, just pass appObjProp and evtTargetVal through to updateAppobj.
      case (appObjProp === 'viewerW') :
        arg1 = [ appObjProp, evtTargetVal ];
        arg2 = '';
        break;          
      case (appObjProp === 'imgW') :
        // !VA If the value was entered in imgwidth, calc imgH based on evtTargetVal and aspect. Then put appObjProp and evtTargetVal in arg1, and put the imgH property name and the calculated imgH into arg2. These will be passed on avia the spread operator to updateAppobj. 
        imgH =  evtTargetVal * (1 / Appobj.aspect[0]);
        // updateAppobj(prop, val); 
        arg1 = [ appObjProp, evtTargetVal ];
        arg2 = [ 'imgH', imgH ];
        // updateAppobj('imgH', imgH); 
        break;
      case (appObjProp === 'imgH') :
        // !VA If the value was entered in imgheight, calc imgW based on evtTargetVal and aspect. Then put appObjProp and evtTargetVal in arg1, and put the imgW property name and the calculated imgW into arg2. These will be passed on via the ES6 spread operator to updateAppobj.
        imgW =  evtTargetVal * (Appdata.aspect[0]);
        arg1 = [ appObjProp, evtTargetVal ];
        arg2 = [ 'imgW', imgW ];
        break;
      case (appObjProp === 'sPhonesW' || appObjProp === 'lPhonesW') :
        // sPhonesH =  val * (1 / Appdata.aspect[0]);
        arg1 = [appObjProp, evtTargetVal];
        arg2 = '';
        break;
      }
      
      // !VA Call updateAppobj to resize the DOM elements and data properties that correspond to the Appdata properties above.
      var isUpdate = updateAppobj( arg1, arg2 );
      // !VA Once those DOM properties and data properties have been updated, recalculate the image's containers.
      calcViewerSize(isUpdate);
    }

    // !VA appController private
    function updateAppobj( ...params ) {


      let prop, val;
      // !VA Each param pair is a property name prop and a value val. evalToolbarInput passes in one or more such pairs whose corresponding Appdata DOM element/data attribute has to be updated. So, loop through the argument arrays and update the corresponding DOM elements
      for (let i = 0; i < params.length; i++) {
        prop = params[i][0];
        val = params[i][1];
        switch(true) {
        case (!prop) :
          console.log('no prop');
          break;
        case prop === 'viewerW' :
          document.querySelector(dynamicRegions.imgViewer).style.width = val + 'px'; 
          // !VA Branch: implementAppobj03 (060820)
          Appobj.viewerW = val;
          // !VA Write the imgViewer value to localStorage. 
          localStorage.setItem('viewerW', val);
          break;
        case prop === 'imgW' :
          // document.querySelector(dynamicRegions.curImg).style.width = val + 'px';
          console.log('val is: ' + val);
          // !VA Branch: implementAppobj03 (060820)
          Appobj.imgW = val;
          break;
        case prop === 'imgH' :
          document.querySelector(dynamicRegions.curImg).style.height = val + 'px';
          Appobj.imgH = val;
          break;
        case prop === 'sPhonesW' :
          // !VA TODO: Get rid of the data attribute - using localStorage now.
          // document.querySelector(toolbarElements.iptTbrSPhonesWidth).setAttribute('data-sphonesw', val);
          Appobj.sPhonesW = val;
          // !VA Write the sPhonesW value to localStorage. 
          localStorage.setItem('sPhonesW', val);
          break;
        case prop === 'lPhonesW' :
          // !VA TODO: Get rid of the data attribute - using localStorage now.
          // document.querySelector(toolbarElements.iptTbrLPhonesWidth).setAttribute('data-lphonesw', val);
          Appobj.lPhonesW;
          // !VA Write the lPhonesW value to localStorage. 
          localStorage.setItem('lPhonesW', val);
          break;
        }
      }
      // !VA Return true to set flag to tell calcViewerSize not to run populateAppobj, otherwise calcViewerSize would initialize Appobj and overwrite these update values
      return true;
    }

    // !VA  appController private s
    // !VA This is only good for initializing because it calculates the viewer size based on NW and NH. On user input, it has to calculate based on imgW and imgH. I'm not sure what that means anymore 05.11.20
    function calcViewerSize(isUpdate) {
      // !VA Deprecated...
      // let  viewerW, viewerH, compStyles; 
      let  viewerW, viewerH; 
      let curLocalStorage;

      // !VA Branch: implementAppobj01 (060420)\
      // !VA Appobj has to be populated here, not in a private external function because calcViewerSize doesn't run until the setTimeOut callback is run and the image is loaded in handleFileSelect. If populateAppobj were a private function, it would be querying a DOM element that doesn't yet exists and would fail. 
      
      // !VA Using the current image dimensions in Appdata, calculate the current size of imgViewer so it adjusts to the current image size. 
      // !VA I think I was using the CSS value because I was looking for a way to persist that value as a default. Using localStorage now so it should be fine to set it as default in Appobj
      // !VA Deprecating...
      // compStyles = window.getComputedStyle(document.querySelector(dynamicRegions.imgViewer));
      
      // !VA Set the viewerW value based on localStorage  If the user has set this value in the toolbar before, then queried from localStorage. That value persists between sessions. If this is the initial use of the app, then viewerW is explitly set to 650. 
      curLocalStorage = appController.getLocalStorage();
      if (curLocalStorage[0]) {
        // !VA Set imgViewer and viewerW to the localStorage value
        // !VA TODO: See why localStorage is stored as string - it's requiring us to convert to integer here.
        Appobj.viewerW = viewerW = parseInt(curLocalStorage[0]); 
        // !VA Deprecating...
        // document.querySelector(dynamicRegions.imgViewer).style.width = Appobj.viewerW + 'px';
      } else {
        // !VA I think I was using the CSS value because I was looking for a way to persist that value as a default. Using localStorage now so it should be fine to set it as default in Appobj
        Appobj.viewerW = viewerW = 650;
        // !VA Deprecating...
        // viewerW = parseInt(compStyles.getPropertyValue('width'), 10);
      }
      // !VA Populate just the dynamic regions of Appobj. This is done after viewerW is retrieved from localStorage, otherwise Appobj.viewerW is explicitly set to 650.

      // !VA If isUpdate is not true, then initialize Appobj by running populateAppobj. Otherwise, use updated Appobj values from updateAppobj.
      if (isUpdate !== true ) {
        UIController.populateAppobj(Appobj, 'app');
      }
      // !VA I think I was using the CSS value because I was looking for a way to persist that value as a default. Using localStorage now so it should be fine to set it as default in Appobj
      Appobj.viewerH = viewerH = 450;
      // !VA Deprecating...
      // viewerH = parseInt(compStyles.getPropertyValue('height'), 10);
      // !VA If initializing a new image, use the naturalWidth and naturalHeight. If updating via user input, use the display image and height, imgW and imgH. If initializing, then Appobj.imgW and Appobj.imgH will be 0 or falsy because it hasn't been resized yet. So the _actual_ image width and height will be different for initializing and updating.

      // !VA REVIEW: I thought I fixed this...it appears to only apply to dev mode.
      // !VA TODO: See if the if condition below has any effect, if not, remove
      var actualW, actualH;
      if (Appobj.imgW === 0) {
        actualW = Appobj.imgNW;
        actualH = Appobj.imgNH;
      } else {
        actualW = Appobj.imgW;
        actualH = Appobj.imgH; 
      }

      switch(true) {
      // The image falls within the default viewer dimensions set in initApp, so do nothing.
      case (actualW <= viewerW) && (Appobj.imgNH < viewerH) :
        actualW = Appobj.imgNW;
        actualH = Appobj.imgNH;
        break;
      // The image is wider than the current viewer width but shorter than current viewer height, so resize the image based on the viewer width
      case (actualW > viewerW) && (actualH < viewerH) :
        // Set the image width to the current viewer
        Appobj.imgW = viewerW;
        // Get the image height from the aspect ration function
        Appobj.imgH = Math.round((1/Appobj.aspect[0]) * Appobj.imgW);
        // Set the viewerH to the imgH
        viewerH = Appobj.imgH;
        break;
      // The image is not as wide as the current viewer width, but is taller than the viewer height. Keep the image width but resize the viewer in order to display the full image height
      // !VA This might be a problem with consecutive images without page refresh
      case (actualW <= viewerW) && (actualH > viewerH) :
        // Set the viewer height and the image height to the image natural height
        viewerH = Appobj.imgH = Appobj.imgNH;
        // Set the image width to the natural image width
        Appobj.imgW = Appobj.imgNW;
        break;
      // The image is wider and taller than the current viewer height and width so we have to resize the image and the viewport based on the current viewport width
      case (actualW > viewerW) && (actualH > viewerH) :
        // Set the image Width to the current  viewer width 
        Appobj.imgW = viewerW;
        // Set the image height proportional to the new image width using the aspect ratio function
        Appobj.imgH = Math.round((1/Appobj.aspect[0]) * Appobj.imgW);
        // Set the viewer height to the image height
        viewerH = Appobj.imgH;
        // !VA TODO: Check this out, doesn't seem to be a problem anymore: BUG Problem with the 800X550, 800X600 -- no top/bottom gutter on viewport
        break;
      }
      resizeContainers(viewerW, viewerH );
    }

    // !VA appController private
    function resizeContainers( viewerW, viewerH )  {
      // !VA This calculates the imgViewer, imgViewport and appContainer height based on Appobj values which are passed in from resizeContainers.
      // !VA Initial height is 450, as explicitly defined in calcViewerSize. TOo much hassle to try and get the value as defined in the CSS programmatically.
      // !VA Note: This has dynamicRegion values that are not written back to Appobj after recalculation, this may be a problem at some point.
      const initViewerH = 450;
      let viewportH;
      let appH; 

      // !VA The viewport is 145px taller than the imgViewer. 
      if (Appobj.imgH <= initViewerH) {
        viewerH = initViewerH;
        viewportH = viewerH + 145;
      } else {
        // Need a little buffer in the viewport
        viewerH = Appobj.imgH;
        viewportH = Appobj.imgH + 145;
      } 
      appH = viewportH;
      Appobj.viewerH = viewerH;
      Appobj.viewerW = viewerW;

      // !VA DOM Access
      UIController.writeDynamicRegionsDOM(Appobj, viewportH, appH);

      // !VA Pick it up here in implementAppobj04
      // !VA Now update the CCP UI with the most recent changes to dynamicRegion values, then populateAppobj with CCP values last. writeCcpDOM takes rest parameters. Pass multiple arguments as arrays of key/value pairs with the element alias as key and the Appobj value as value. Elements to update here are: tableWidth and tableWrapperWidth.



      var tableWidth = [];
      var tableWrapperWidth = [];
      tableWidth = [ccpUserInput.iptCcpTableWidth, Appobj.imgW ];
      tableWrapperWidth = [ccpUserInput.iptCcpTableWrapperWidth, Appobj.viewerW];
      // !VA This works, but it shouldn't be done here because it overwrites fixed/fluid.
      UICtrl.writeCcpDOM(tableWidth, tableWrapperWidth);

      // !VA Write the inspectors based on Appobj values
      UICtrl.writeInspectors(Appobj);
    }

    function handleCcpUserInput(params) {
      console.log('handleCcpUserInput running');

    }

    // function initUI() {
    //   UIController.toggleCCP()
    // }

    // !VA appController private
    // !VA Branch: implementAppobj03 (060820)
    // !VA Handle CCP User Input
    function handleCcpRadioSelection(evt) {



      console.clear();
      console.log('handleCcpRadioSelection running');
      let Appobj = appController.getAppobj();
      let imgType;
      console.log('evt.target.id is: ' + evt.target.id);
      let alias;
      alias = '#' + evt.target.id;
      console.log('alias is: ' + alias);
      switch(true) {
      case alias === ccpUserInput.rdoCcpImgFixed:
        Appobj.rdoCcpImgFixed = true, Appobj.rdoCcpImgFluid = false;
        imgType = 'fixed';
        handleImgType(imgType);
        console.log('fixed clicked');
        break;
      case alias === ccpUserInput.rdoCcpImgFluid:
        imgType = 'fluid';
        Appobj.rdoCcpImgFixed = false, Appobj.rdoCcpImgFluid = true;
        handleImgType(imgType);
        console.log('fluid clicked');
        break;
      case alias.includes('rdo-ccp-td') :
        console.log('TDOptions alias is: ' + alias);
        handleTdOptions(alias);
        break;
      default:
        // code block
      } 
      console.log('Appobj is: ');
      console.dir(Appobj);
    }

    // !VA appController private
    // !VA Called in handleTdOptions
    function writeAppobjToDOM() {

      console.log('writeAppobjToDOM running');
      // !VA Branch: implementAppobj04 (060820)
      // !VA This is where we batch-update the DOM based on Appobj

      // !VA First, this should be handled in populateAppobj

      // !VA NOW Problem here is that at this point, we still don't have CCP properties in Appobj, and the Appobj generated in initCCP doesn't include the dynamicRegions. The event handler calls handleCcpRadioSelection or handleCcpUserInput, but these handlers don't populate Appobj with the current Ccp state, and populateAppobj call in initCcp doesn't carry over to appController.  I don't want to be calling populateAppobj every time I make a CCp selection, that defeats the whole purpose of having an Appobj. What I need to do is populate Appobj whenever the CCP is opened and have that Appobj be scoped to appController and persist for as long as the CCP is open. Then I can updateAppobj individually for any changed CCP element. So, what should happen is the clipboard button event should point to initCcp in appController, which makes a DOM call to get the active status of CCP so it can populateAppdata('ccp') in the appController scope. Then, it calls displayCcp in UIController public to toggle the CCP. That should expose Ccp properties Appobj in appController so they persist as long as the CCP is open. Let's try that.
      
      
      for (const [key, value] of Object.entries(Appobj)) {
        console.log('key is: ' + key);
        console.log('key.substring( 3, 6) is: ' + key.substring( 3, 6));
        if (key.substring( 3, 6) === 'Ccp') {
          console.log('key is: ' + key);
          console.log('HIT');
        }
      }
    }




    function handleTdOptions(alias) {
      console.log('handleTdOptions running');
      console.log('alias is: ' + alias);
      // !VA Loop through all Appobj entries whose first 8 chars is rdoCcpTd, i.e. all the tdOption entries.
      for (const [key, value] of Object.entries(Appobj)) {
        if (key.substring( 0, 8) === 'rdoCcpTd') {
          // !VA If the Appobj key string === the element alias of the click target, then set that Appobj property to true, otherwise set it to false. This mimics the behavior of a single-select radion button group.
          ccpUserInput[key] === alias ? Appobj[key] = true : Appobj[key] = false;
        }
      }

      switch(true) {
      case alias.includes('basic'):
        // !VA Branch: implementAppobj03 (060820)
        // !VA Add default 'basic' options to Appobj here.
        break;
      case alias.includes('excludeimg'):
        // !VA Add default 'excludeimg' options to Appobj here.
        break;
      case alias.includes('posswitch'):
        // code block
        break;
      case alias.includes('imgswap'):
        // code block
        break;
      case alias.includes('bgimage'):
        // code block
        break;
      case alias.includes('vmlbutton'):
        // code block
        break;
      default:
        // code block
      } 

      // writeAppobjToDOM();

    }

    // !VA Branch: implementAppobj04 (061020)
    function handleImgType(imgType) {
      console.log('handleImgType running');
      // !VA NOTE
      let disable;

      // !VA If the 'fixed' img option is selected
      if (imgType === 'fixed') {
        // !VA Set the disable flag for the handleCcpActions call
        disable = false;
        // !VA Branch: implementAppobj03 (060820)
        // !VA This should pass to handleTdOptions for default Appobj properties. 

        // !VA Set the default Appobj values for tableWidth, tableClass, tableWrapperWidth and tableWrapperClass. These are user-editable.
        Appobj.iptCcpTableWidth = Appobj.imgW;
        // !VA TODO: Write class to placeholder in order to keep the user-defined value here.
        Appobj.iptCcpTableClass = '';
        Appobj.iptCcpTableWrapperWidth = Appobj.viewerW;
        Appobj.iptCcpTableWrapperClass = 'devicewidth';

        // !VA TODO Integrate into handleCcpActions - doesn't work
        document.querySelector('#ccp-table-include-wrapper').classList.remove('disable-checkbox');
        document.querySelector('#ccp-table-include-wrapper-label').classList.remove('disabled');


      } else if (imgType === 'fluid') {
        // !VA Set the disable flag for the handleCcpActions call
        disable = true;
        // !VA Appboj properties - these will be batch-appied to both UI and Attributes based on the Appobj property. They are disabled and non-editable by the user and are based on CSS definitions in the template.
        Appobj.iptCcpTableWidth = '100%';
        Appobj.iptCcpTableWrapperWidth = '100%';
        Appobj.iptCcpTableClass = 'devicewidth';
        Appobj.iptCcpTableWrapperClass = 'devicewidth';

        Appobj.spnCcpTableIncludeWrapperCheckmrk = 'on';

        // !VA TODO Integrate into handleCcpActions - doesn't work
        document.querySelector('#ccp-table-include-wrapper').classList.add('disable-checkbox');
        document.querySelector('#ccp-table-include-wrapper-label').classList.add('disabled');







      } else {
        console.log('ERROR in handleImgType - unknown imgType');
      }

      // !VA Preselect the option 'basic' for the tdoptions radio group. The other td options won't work with or aren't applicable for fluid because fluid is only for images. 
      Appobj.rdoCcpTdBasic = true;
      // !VA Set all the other TD Option radio buttons to false
      Appobj.rdoCcpTdExcludeimg = Appobj.rdoCcpTdPosswitch = Appobj.rdoCcpTdImgswap = Appobj.rdoCcpTdBgimage = Appobj.rdoCcpTdVmlbutton = false;
      // !VA DOM Access via UIController.handleCcpActions

      // !VA Branch: implementAppobj03 (060820)







      // !VA Select the 'basic' Ccp radio button element
      const selectedTdOption = [ ccpUserInput.rdoCcpTdBasic ];
      UIController.handleCcpActions( 'selectradiobutton', selectedTdOption, true);
      // !VA Disable/Enable CCP Input Elements
      const inputElementsToDisable = [ ccpUserInput.iptCcpTableClass, ccpUserInput.iptCcpTableWidth,ccpUserInput.iptCcpTableWrapperClass, ccpUserInput.iptCcpTableWrapperWidth ];


      UIController.handleCcpActions( 'setdisabledtextinput', inputElementsToDisable, disable);


      // !VA Disable/Enable CCP Radio Select Elements
      const radioElementsDisable = [ ccpUserInput.rdoCcpTdExcludeimg, ccpUserInput.rdoCcpTdImgswap, ccpUserInput.rdoCcpTdImgswap, ccpUserInput.rdoCcpTdBgimage, ccpUserInput.rdoCcpTdPosswitch, ccpUserInput.rdoCcpTdVmlbutton ];
      UIController.handleCcpActions( 'setdisabledradio', radioElementsDisable, disable);
      toggleIncludeWrapper(true); 

    }

    function toggleIncludeAnchor(evt) {
      console.log('toggleIncludeAnchor running: ');
      let chkId, checkbox;
      chkId = '#' + evt.target.id;
      chkId = chkId.replace('mrk', 'box');
      chkId = chkId.replace('spn', 'chk');
      checkbox = document.querySelector(chkId);
      // !VA NOTE: This should be a try/catch
      if (checkbox) {
        // !VA If option is a click event, toggle the checkmark on click
        checkbox.checked ? checkbox.checked = false : checkbox.checked = true;
      // !VA Display/undisplay wrapper table options when checkbox is toggled
      } else {
        console.log('ERROR in toggleIncludeWrapper: unkknown argument');
      }
    }

    function toggleIncludeWrapper(option) {
      var chkId, checkbox;
      let wrapperItems = [];
      wrapperItems = [ ccpUserInput.iptCcpTableWrapperClass, ccpUserInput.iptCcpTableWrapperWidth, ccpUserInput.selCcpTableWrapperAlign,  ccpUserInput.iptCcpTableWrapperBgColor ];
      UIController.handleCcpActions( 'setactiveparent', wrapperItems, true);
      // !VA chkId will always be ccpUserInput.spnCcpTableIncludeWrapperCheckmrk here because that's what the event listener was defined on. But this is a mock checkbox, so convert the ccpUserInput alias to the id of the actual checkbox element in order to toggle it 
      chkId = ccpUserInput.spnCcpTableIncludeWrapperCheckmrk;
      chkId = chkId.replace('mrk', 'box');
      chkId = chkId.replace('spn', 'chk');
      checkbox = document.querySelector(chkId);
      // !VA There are four possible parameters for 'option': 1) 'init' = passed from initToggleIncludeWrapper, initialization on page reload 2) evt = click event passed from event handler when the checkbox is checked/unchecked 3) true, checks the checkbox programmatically and displays the options, called from toggleImgType and 4) false, currently no use case.
      if (option.target) {
        // !VA If option is a click event, toggle the checkmark on click
        checkbox.checked ? checkbox.checked = false : checkbox.checked = true;
        checkbox.checked ? UIController.handleCcpActions( 'setactiveparent', wrapperItems, true) : UIController.handleCcpActions( 'setactiveparent', wrapperItems, false);
      } else if (option === true ) {
        checkbox.checked = true;
        UIController.handleCcpActions( 'setactiveparent', wrapperItems, true);
      } else if (option === 'init') {
      // !VA Display/undisplay wrapper table options when checkbox is toggled
        checkbox.checked ? UIController.handleCcpActions( 'setactiveparent', wrapperItems, true) : UIController.handleCcpActions( 'setactiveparent', wrapperItems, false);
      } else {
        console.log('ERROR in toggleIncludeWrapper: unkknown option argument');
      }
    }

    // !VA appController private 
    // !VA Contains the logic for displaying/undisplaying, disabling/enabling, setting/deleting values from the tdoptions radio input group. 
    function showTdOptions(evt) {
      // !VA Array including all the defined options for each tdoption radio
      let allTdOptions = [], optionsToEnable = [], optionsToShow = [], valuesToSet = [], optionsToDisable = [], values = [], targetalias;
      let Appdata;
      let Attributes;
      Appdata = appController.initGetAppdata();
      Attributes = CBController.initGetAttributes();
      // !VA Add the hash to the target id to match it with the alias
      // !VA DEVMODE: If dev mode, then false is passed in instead of an event, so just put in a dummy id to get it running
      if (evt) { targetalias = '#' + evt.target.id; 
      } else {
        targetalias = ccpUserInput.rdoCcpTdBasic;
      }


      // !VA Stopped here: Now I have to assign all the attributes for each of these CCP elements? This is very convuluted but I'm not rewriting it now.
      // !VA Reset all CCP elements to the default CCP options, enabled state and value. This is the state the options all have with imgType = fixed; tdoptions = basic; includeWrapper = unchecked. 
      allTdOptions = [ ccpUserInput.iptCcpTdClass,  ccpUserInput.selCcpTdAlign, ccpUserInput.selCcpTdValign, ccpUserInput.iptCcpTdHeight,  ccpUserInput.iptCcpTdWidth,  ccpUserInput.iptCcpTdBgColor, ccpUserInput.iptCcpTdFontColor, ccpUserInput.iptCcpTdBorderColor, ccpUserInput.iptCcpTdBorderRadius  ];
      // !VA Cycle through all the parent divs of each of the TD options and remove the active class to hide them all. This needs to be done before showing the specific options for the selected TD option radio
      UIController.handleCcpActions( 'setactiveparent', allTdOptions, false);

      optionsToEnable = [ ccpUserInput.iptCcpTdClass,  ccpUserInput.iptCcpTdHeight,  ccpUserInput.iptCcpTdWidth,  ccpUserInput.iptCcpTdBgColor, ccpUserInput.iptCcpTdFontColor, ccpUserInput.iptCcpTdBorderColor, ccpUserInput.iptCcpTdBorderRadius, ccpUserInput.iptCcpTableClass, ccpUserInput.iptCcpTableWidth, ccpUserInput.iptCcpTableWrapperClass, ccpUserInput.iptCcpTableWrapperWidth];
      UIController.handleCcpActions( 'setdisabledtextinput', optionsToEnable, false);

      // !VA Reset the height, width and bgcolor fields to '', otherwise the vmlbutton defaults will persist if the user selects the vmlbutton radio button. Pass false for the option argument to set the value to ''.
      valuesToSet = [ ccpUserInput.iptCcpTdHeight, ccpUserInput.iptCcpTdWidth, ccpUserInput.iptCcpTdBgColor ];
      for (let i = 0; i < valuesToSet.length; i++) {
        UIController.handleCcpActions( 'setvalue', valuesToSet, false);
      }

      // !VA Determine which tdoptions radio button is selected based on the click event and run handleCcpActions for the selected TD radio option. If the action parameter contains the string 'parent' then the active class is applied to/removed from to/from the parent of the target rather than the target itself so that both the input and the label are included
      switch(true) {
      // !VA td options basic and excludeimg
      case targetalias === ccpUserInput.rdoCcpTdBasic || targetalias === ccpUserInput.rdoCcpTdExcludeimg:
        optionsToShow = [ ccpUserInput.iptCcpTdClass,  ccpUserInput.selCcpTdAlign, ccpUserInput.selCcpTdValign, ccpUserInput.iptCcpTdHeight,  ccpUserInput.iptCcpTdWidth,  ccpUserInput.iptCcpTdBgColor ];
        // !VA Run showOptions to get the 
        UIController.handleCcpActions( 'setactiveparent', optionsToShow, true);
        break;
        // !VA tdoption posswitch
      case targetalias === ccpUserInput.rdoCcpTdPosswitch:
        // !VA TODO: Cerebrus has NO td options except width: 100% - let's add 'class' andleave it like that for the time being and see if there's a case where any other options are useful. 
        optionsToShow = [ ccpUserInput.iptCcpTdClass, ccpUserInput.selCcpTdAlign, ccpUserInput.selCcpTdValign, ccpUserInput.iptCcpTdBgColor ];
        UIController.handleCcpActions( 'setactiveparent', optionsToShow, true);
        break;
        // !VA tdoption imgswap





      case targetalias === ccpUserInput.rdoCcpTdImgswap:
        /* !VA  
        Wrapper table: devicewidth, width = viewerW, align=Center
        Parent table has to be locked at devicewidth, width = imgW, td align = center, align = center,
        TD: Class = remove, align = center;
        Img: Class = mobileshow, disabled.
        
        */







        // !VA Show options
        optionsToShow = [ ccpUserInput.iptCcpImgClass, ccpUserInput.iptCcpTdClass, ccpUserInput.selCcpTdAlign, ccpUserInput.selCcpTdValign, ccpUserInput.iptCcpTableWrapperClass, ccpUserInput.iptCcpTableWrapperWidth, ccpUserInput.iptCcpTableWrapperBgColor, ccpUserInput.selCcpTableWrapperAlign ];
        UIController.handleCcpActions( 'setactiveparent', optionsToShow, true);

        toggleIncludeWrapper(true); 
        document.querySelector('#ccp-table-include-wrapper').classList.add('disable-checkbox');
        document.querySelector('#ccp-table-include-wrapper-label').classList.add('disabled');

        // !VA Disable options
        optionsToDisable = [ ccpUserInput.iptCcpImgClass, ccpUserInput.iptCcpTdClass, ccpUserInput.iptCcpTableClass, ccpUserInput.iptCcpTableWidth, ccpUserInput.iptCcpTableWrapperClass, ccpUserInput.iptCcpTableWrapperWidth ];
        UIController.handleCcpActions( 'setdisabledtextinput', optionsToDisable, true);
        break;





        // !VA tdoption bgimage
      case targetalias === ccpUserInput.rdoCcpTdBgimage:
        // !VA bgcolor, width, height, valign
        optionsToShow = [ ccpUserInput.iptCcpTdClass, ccpUserInput.iptCcpTdHeight,  ccpUserInput.iptCcpTdWidth,  ccpUserInput.iptCcpTdBgColor ];
        UIController.handleCcpActions( 'setactiveparent', optionsToShow, true);
        // !VA Get the default height and width from Appdata and apply
        valuesToSet = [ ccpUserInput.iptCcpTdHeight, ccpUserInput.iptCcpTdWidth, ccpUserInput.iptCcpTdBgColor ];
        // !VA Don't forget values is an array and has to be handled as such in 
        values = [ Appdata.imgH, Appdata.imgW, '#7bceeb' ];
        UIController.handleCcpActions( 'setvalue', valuesToSet, values);
        break;
        // !VA tdoption vmlbutton
      case targetalias === ccpUserInput.rdoCcpTdVmlbutton:
        optionsToShow = [ ccpUserInput.iptCcpTdClass, ccpUserInput.iptCcpTdHeight,  ccpUserInput.iptCcpTdWidth,  ccpUserInput.iptCcpTdBgColor, ccpUserInput.iptCcpTdFontColor, ccpUserInput.iptCcpTdBorderColor, ccpUserInput.iptCcpTdBorderRadius ];
        UIController.handleCcpActions( 'setactiveparent', optionsToShow, true);
        // !VA The height and width field require an entry otherwise the button can't be built, that's why Stig has default values of 40/200 in his code. So we include the defaults here when the inputs are displayed and include error handling if the user omits one
        // !VA Include the default bgcolor as per Stig
        valuesToSet = [ ccpUserInput.iptCcpTdHeight, ccpUserInput.iptCcpTdWidth, ccpUserInput.iptCcpTdBgColor, ccpUserInput.iptCcpTdFontColor, ccpUserInput.iptCcpTdBorderColor, ccpUserInput.iptCcpTdBorderRadius ];
        values = [ '40', '200', '#556270', '#FFFFFF', '#1e3650', '4' ];
        UIController.handleCcpActions( 'setvalue', valuesToSet, values);
        break;
      default:
        console.log('ERROR: UIController.showTdOptions public');
      } 
    }


    // !VA Handles the CCP displau logic for the imgType fixed/fluid buttons. The Clipboard output logic is handled in getAttributes - this routine handles primarily the conditions for manipulating the CCP elements based on the logic defined in Attributes.
    function toggleImgType() {
      // !VA Get Attributes so we can assign them to the Ccp elements 
      let Attributes;
      // !VA This is the other place where getAttributes is accessed besides buildOutputNodeList and maybe initCcp.
      Attributes = CBController.initGetAttributes();

      // !VA Loop through Attributes and assign values to corresponding elements. The logic is included in the Attribute, so just assign the values here.
      const sourceAttributes = [ Attributes.tableTagWrapperClass.str, Attributes.tableWidth.str, Attributes.tableTagWrapperWidth.str];
      const targetCcpElement = [ccpUserInput.iptCcpTableWrapperClass, ccpUserInput.iptCcpTableWidth, ccpUserInput.iptCcpTableWrapperWidth ];
      UIController.handleCcpActions( 'setvalue', targetCcpElement, sourceAttributes );
      // !VA For the fluid imgType options, make sure Include wrapper table is checked, disable all the tdoptions except 'basic' then disable the checkbox, table wrapper class and width and parent table width options.
      // !VA Array of radio input elements to disable
      const tdOptionsDisable = [ ccpUserInput.rdoCcpTdExcludeimg, ccpUserInput.rdoCcpTdImgswap, ccpUserInput.rdoCcpTdImgswap, ccpUserInput.rdoCcpTdBgimage, ccpUserInput.rdoCcpTdPosswitch, ccpUserInput.rdoCcpTdVmlbutton ];
      const fluidInputOptionsToDisable = [ ccpUserInput.iptCcpTableClass, ccpUserInput.iptCcpTableWidth,ccpUserInput.iptCcpTableWrapperClass, ccpUserInput.iptCcpTableWrapperWidth ];
      if (Attributes.imgType.str === 'fluid') { 
        // !VA Preselect the option 'basic'. The other td options won't work with or aren't applicable for fluid because fluid is only for images. 
        document.querySelector(ccpUserInput.rdoCcpTdBasic).checked = true;
        toggleIncludeWrapper(true); 
        UIController.handleCcpActions( 'setdisabledradio', tdOptionsDisable, true );
        UIController.handleCcpActions( 'setdisabledtextinput', fluidInputOptionsToDisable, true );
        document.querySelector('#ccp-table-include-wrapper').classList.add('disable-checkbox');
        document.querySelector('#ccp-table-include-wrapper-label').classList.add('disabled');
        document.querySelector(ccpUserInput.iptCcpTableWidth).classList.add('disabled');



      } else {
        UIController.handleCcpActions( 'setdisabledradio', tdOptionsDisable, false);
        UIController.handleCcpActions( 'setdisabledtextinput', fluidInputOptionsToDisable, false );
        document.querySelector('#ccp-table-include-wrapper').classList.remove('disable-checkbox');
        document.querySelector('#ccp-table-include-wrapper-label').classList.remove('disabled');
        document.querySelector(ccpUserInput.iptCcpTableWidth).classList.add('disabled');
      }
    }
    // !VA END CCP FUNCTIONS
      
    // !VA  appController private
    // !VA Show element when input in another element is made 
    // !VA appController private
    function showElementOnInput(event) {
      // !VA Here we catch the event handlers for the CCP class input fields and show the mobile clipboard buttons when an input is made. The input event fires whenever a input element's value changes.
      var elems = [];
      // !VA TODO: DRYify this. 
      elems[0] = document.querySelector(btnCcpMakeClips.btnCcpMakeImgDsktpCssRule);
      elems[1] = document.querySelector(btnCcpMakeClips.btnCcpMakeImgSmphnCssRule);
      elems[2] = document.querySelector(btnCcpMakeClips.btnCcpMakeImgLgphnCssRule);
      elems[3] = document.querySelector(btnCcpMakeClips.btnCcpMakeTdDsktpCssRule);
      elems[4] = document.querySelector(btnCcpMakeClips.btnCcpMakeTdSmphnCssRule);
      elems[5] = document.querySelector(btnCcpMakeClips.btnCcpMakeTdLgphnCssRule);
      elems[6] = document.querySelector(btnCcpMakeClips.btnCcpMakeTableDsktpCssRule);
      elems[7] = document.querySelector(btnCcpMakeClips.btnCcpMakeTableSmphnCssRule);
      elems[8] = document.querySelector(btnCcpMakeClips.btnCcpMakeTableLgphnCssRule);
      // !VA We only want to show the buttons in each respective fieldset
      // !VA If the input is in the img fieldset, only show the first three buttons in the array. Add the hash # to the target ID to find the match with the ID in ccpUserInput
      if (('#' + event.target.id) == ccpUserInput.iptCcpImgClass) {
        for (let i = 0; i <= 2; i++) {
          this.value ? elems[i].classList.add('active') : elems[i].classList.remove('active');
        }
      } else if (('#' + event.target.id) === ccpUserInput.iptCcpTdClass) { 
        // !VA If the input is in the td fieldset, only show the next three buttons in the array
        for (let i = 3; i <= 5 ; i++) {
          this.value ? elems[i].classList.add('active') : elems[i].classList.remove('active');
        }
      } else if (('#' + event.target.id) === ccpUserInput.iptCcpTableClass) {
        // !VA If the input is in the table fieldset, only show the next buttons in the array
        for (let i = 6; i <= 8 ; i++) {
          this.value ? elems[i].classList.add('active') : elems[i].classList.remove('active');
        }
      }
    }

 
    // !VA Message handling
    // !VA appController private
    // !VA Key/value pairs containing the unique tooltip ID generate from target ID of the mouseenter event and the corresponding tooltip content.
    function getAppMessageStrings( appMessCode) {
      let Appdata;
      Appdata = appController.initGetAppdata();
      let appMessContent;
      // !VA Set tooltipContent to ''. This overwrites tooltipContent being undefined if tooltipid is invalid
      appMessContent = '';
      // !VA Tooltip unique code/value pairs defined here
      const getAppMessageStrings = {
        // !VA STATUS
        msg_copied_2_CB: 'Code snippet copied to Clipboard!',
        // !VA ERRORS
        err_not_Integer: 'This value has to be a positive whole number - try again or press ESC.',
        err_imgW_GT_viewerW: `Image width must be less than the current parent table width of ${Appdata.viewerW}px. Make the parent table wider first.`,
        err_tbButton_LT_zero: 'Image dimension can\'t be less than 1.',
        err_tbButton_GT_viewerW: `Image can't be wider than its parent table. Parent table width is currently ${Appdata.viewerW}px`,
        // !VA maxViewerWidth issue here, see message below;
        err_viewerW_GT_maxViewerWidth: 'Parent table width can\'t exceed can\'t exceed app width: 800px.',
        err_not_an_integer: 'Not an integer: please enter a positive whole number for width.',
        err_vmlbutton_no_value: 'Height and width must be entered to create a VML button.',
        err_vmlbutton_height_mismatch: 'Is the correct image loaded? Img height should match entry. Check the code output. ',


        // !VA TOOLTIPS
        tip_ipt_tbr_viewerw: 'Set the width of the image\'s parent table for Clipboard output.<br /><span style="white-space: nowrap">Maximum width is 800px.</span>',
        tip_btn_tbr_incr50: 'Increase the image width by 50px and set the height proportionally. <span style="white-space: nowrap">The width can\'t exceed parent table width.</span>',
        tip_btn_tbr_incr10: 'Increase the image width by 10px and set the height proportionally. <span style="white-space: nowrap">The width can\'t exceed the width of the parent table.</span>',
        tip_btn_tbr_incr01: 'Increase the image width by 1px and set the height proportionally. <span style="white-space: nowrap">The width can\'t exceed the width of the parent table.</span>',
        tip_ipt_tbr_imgwidth: 'Set the image display width and resize height proportionally. <span style="white-space: nowrap">Image width can\'t exceed parent table width.</span>',
        tip_ipt_tbr_imgheight: 'Set the image display height and resize width proportionally. <span style="white-space: nowrap">Image width can\'t exceed parent table width.</span>',
        tip_btn_tbr_decr01: 'Decrease the image width by 1px and set the height proportionally.',
        tip_btn_tbr_decr10: 'Decrease the image width by 10px and set the height proportionally.',
        tip_btn_tbr_decr50: 'Decrease the image width by 50px and set the height proportionally.',
        tip_ipt_tbr_sphones_width: 'Set the width for small mobile devices to be used for CSS Clipboard output.',
        tip_ipt_tbr_lphones_width: 'Set the width for larger mobile devices to be used for CSS Clipboard output.',
        tip_ins_display_size_label: 'Displays the scaled image dimensions if smaller than Size On Disk. Set width or height in toolbar. Shift+Click to copy attributes. Ctrl+Click to copy style properties.',
        tip_ins_display_size_width_value: 'Click to copy the width, SHIFT+Click to copy width attribute, <span style="white-space: nowrap">CTRL+Click to copy width style property.</span>',
        tip_ins_display_size_height_value: 'Click to copy the height, SHIFT+Click to copy height attribute, <span style="white-space: nowrap">CTRL+Click to copy height style property.</span>',
        tip_ins_disk_size_label: 'Displays the actual resolution of the image as stored on disk. For retina devices, the file\'s actual resolution should be at least twice the display size.',
        tip_ins_aspect_label: 'Displays the aspect ratio (width: height) of the current image.',
        tip_ins_small_phones_label: 'Set the image width for small mobile devices. Image height is calculated proportionally. Shift+Click to copy attributes. Ctrl+Click to copy style properties.',
        tip_ins_small_phones_width_value: 'Click to copy the width, SHIFT+Click to copy width attribute, <span style="white-space: nowrap">CTRL+Click to copy width style property.</span>',
        tip_ins_small_phones_height_value: 'Click to copy the height, SHIFT+Click to copy height attribute, <span style="white-space: nowrap">CTRL+Click to copy height style property.</span>',
        tip_ins_large_phones_label: 'Set the image width for larger mobile devices. Image height is calculated proportionally. Shift+Click to copy attributes. Ctrl+Click to copy style properties.',
        tip_ins_large_phones_width_value: 'Click to copy the width, SHIFT+Click to copy width attribute, <span style="white-space: nowrap">CTRL+Click to copy width style property.</span>',
        tip_ins_large_phones_height_value: 'Click to copy the height, SHIFT+Click to copy height attribute, <span style="white-space: nowrap">CTRL+Click to copy height style property.</span>',
        tip_ins_retina_label: 'Displays the recommended image file resolution at the current display size. If this value is less than 2X the display, small phones or large phones values, those values are shown in red.',
        tip_btn_ccp_make_img_tag: 'Output an HTML IMG tag with the selected options to the Clipboard.',
        tip_btn_ccp_make_td_tag: 'Output an HTML TD tag with the selected options to the Clipboard.',
        tip_btn_ccp_make_table_tag: 'Output and HTML TABLE tag with the selected options to the Clipboard',
        tip_sel_ccp_img_align: 'Set the align attribute of the IMG tag.',
        tip_sel_ccp_img_align_label: 'Set the align attribute of the IMG tag.',
        tip_ipt_ccp_img_class: 'Add a class attribute to the IMG tag. If a class is entered, the Make Image CSS Rule buttons appear.',
        tip_ipt_ccp_img_class_label: 'Add a class attribute to the IMG tag. If a class is entered, the Make Image CSS Rule buttons appear.',
        tip_ipt_ccp_img_relpath: 'Enter the relative path to the image to include in the src attribute of the Clipboard output. The default is \'img\'',
        tip_ipt_ccp_img_relpath_label: 'Enter the relative path to the image to include in the src attribute of the Clipboard output. The default is \'img\'',
        tip_ipt_ccp_img_alt: 'Enter text for the ALT attribute of the Clipboard output. You can use placeholder text and replace it globally later.',
        tip_ipt_ccp_img_alt_label: 'Enter text for the ALT attribute of the Clipboard output. You can use placeholder text and replace it globally later.',
        tip_ccp_img_include_width_height: 'If checked, width and height will be added to the IMG tag\'s style attribute in the Clipboard output.',
        tip_ccp_img_include_width_height_label: 'If checked, width and height will be added to the IMG tag\'s style attribute in the Clipboard output.',
        tip_ccp_img_include_anchor: 'If checked, the IMG tag will be wrapped in an A tag with the HREF attribute set to # in the Clipboard output',
        tip_ccp_img_include_anchor_label: 'If checked, the IMG tag will be wrapped in an A tag with the HREF attribute set to # in the Clipboard output',
        tip_sel_ccp_td_align: 'Set the TD tag\'s align attribute. The default is \'left\'',
        tip_sel_ccp_td_align_label: 'Set the TD tag\'s align attribute. The default is \'left\'',
        tip_sel_ccp_td_valign: 'Set the TD tag\'s valign attribute. The default is \'top\'',
        tip_sel_ccp_td_valign_label: 'Set the TD tag\'s valign attribute. The default is \'top\'',
        tip_ipt_ccp_td_class: 'Add a class attribute to the TD tag. If a class is entered, the Make TD CSS Rule buttons appear.',
        tip_ipt_ccp_td_class_label: 'Add a class attribute to the IMG tag. If a class is entered, the Make TD CSS Rule buttons appear.',
        tip_ipt_ccp_td_bgcolor: 'Set the bgcolor attribute for the TD tag. You can use a hex value,a valid CSS color alias or any string. Hex values must be prepended with a # character.',
        tip_ipt_ccp_td_bgcolor_label: 'Set the bgcolor attribute for the TD tag. You can use a hex value, a CSS color alias or any string. Hex values must be prepended with a # character.',
        tip_rdo_ccp_td_basic: 'TBD',
        tip_rdo_ccp_td_basic_label: 'TBD',
        tip_rdo_ccp_td_excludeimg: 'TBD',
        tip_rdo_ccp_td_excludeimg_label: 'TBD',
        tip_rdo_ccp_td_posswitch: 'TBD',
        tip_rdo_ccp_td_poswitch_label: 'TBD',
        tip_rdo_ccp_td_bgimage: 'TBD',
        tip_rdo_ccp_td_bgimage_label: 'TBD',
        tip_rdo_ccp_td_vmlbutton: 'TBD',
        tip_rdo_ccp_td_vmlbutton_label: 'TBD',
        tip_ipt_ccp_table_class: 'Add a class attribute to the parent TABLE tag. If a class is entered, the Make TABLE CSS Rule buttons appear.',
        tip_ipt_ccp_table_class_label: 'Add a class attribute to the parent TABLE tag. If a class is entered, the Make TABLE CSS Rule buttons appear.',
        tip_ipt_ccp_table_width: 'TBD',
        tip_ipt_ccp_table_width_label: 'TBD',
        tip_sel_ccp_table_align: 'Set the parent TABLE tag\'s align attribute. The default is \'left\'',
        tip_sel_ccp_table_align_label: 'Set the parent TABLE tag\'s align attribute. The default is \'left\'',
        tip_ipt_ccp_table_bgcolor: 'Set the bgcolor attribute for the parent TABLE tag. You can use a hex value,a valid CSS color alias or any string. Hex values must be prepended with a # character.',
        tip_ipt_ccp_table_bgcolor_label: 'Set the bgcolor attribute for the parent TABLE tag. You can use a hex value, a CSS color alias or any string. Hex values must be prepended with a # character.',
        tip_ccp_table_include_wrapper: 'TBD',
        tip_ccp_table_include_wrapper_label: 'TBD',
        tip_ipt_ccp_table_wrapper_class: 'Add a class attribute to the wrapper TABLE tag or accept the default \'devicewidth\'. ',
        tip_ipt_ccp_table_wrapper_class_label: 'Add a class attribute to the wrapper TABLE tag or accept the default \'devicewidth\'.',
        tip_ipt_ccp_table_wrapper_width: 'TBD',
        tip_ipt_ccp_table_wrapper_width_label: 'TBD',
        tip_sel_ccp_table_wrapper_align: 'Set the wrapper TABLE tag\'s align attribute. The default is \'left\'',
        tip_sel_ccp_table_align_wrapper_label: 'Set the wrapper TABLE tag\'s align attribute. The default is \'left\'',
        tip_ipt_ccp_table_wrapper_bgcolor: 'Set the bgcolor attribute for the wrapper TABLE tag. You can use a hex value,a valid CSS color alias or any string. Hex values must be prepended with a # character.',
        tip_ipt_ccp_table_bgcolor_wrapper_bgcolor_label: 'Set the bgcolor attribute for the wrapper TABLE tag. You can use a hex value, a CSS color alias or any string. Hex values must be prepended with a # character.'
      };
      // !VA Loop through the tooltip unique ids and if one matches event's target id, return it as tooltipContent
      for (let [key, value] of Object.entries(getAppMessageStrings)) {
        if (key  === appMessCode) {
          appMessContent = value;
        }
      }
      return appMessContent;
    }
    // !VA END TOOLTIP HANDLING

    // !VA MISC FUNCTIONS

    // !VA appContoller private
    // !VA Create the isolate popup with no frills and a fixed window sized to the Witty app dimensions
    function isolateApp() {
      // !VA Put a query string in the URL to indicate that the child window is isolated
      let curURL = window.location.href + '?isolate=' + true;
      // !VA NOTE: win isn't accessed, but it might be later.  
      let win;
      // !VA Open a new fixed-size window with no browser elements except the URL bar
      // !VA Not currently using the window object that the open method creates, but leave it for reference
      win = window.open(curURL,'targetWindow',  
        `toolbar=no,
        location=yes,
        status=no,
        menubar=no,
        scrollbars=no,
        resizable=no,
        width=870,
        height=775`);
    }

    // appController private 
    function validateInteger(inputVal) {
      // !VA Since integer validation is used for all height/width input fields, including those not yet implemented
      let isErr;
      // let mess;
      if (!parseInt(inputVal, 10) || inputVal % 1 !== 0 || inputVal < 0) {
        isErr = true;
      } else { 
        // !VA Input fields return strings, so convert to integer
        inputVal = parseInt(inputVal);
        isErr = false;
      }
      // !VA Just returning true here, the error code is sent by the calling function in handleUserAction
      return isErr;
    }
    //  !VA END ERROR HANDLING

    // !VA appController private
    // !VA Need to get the Appdata property that corresponds to the ID of the DOM input element that sets it. It's easier to just create a list of these correspondences than to rename the whole UI elements and Appdata properties so they correspond, or to create functions that use string methods to extract them from each other.
    function elementIdToAppdataProp(str) {
      var IDtoProp = {
        viewerW:  'ipt-tbr-viewerw',
        imgW: 'ipt-tbr-imgwidth',
        imgH: 'ipt-tbr-imgheight',
        sPhonesW: 'ipt-tbr-sphones-width',
        lPhonesW: 'ipt-tbr-lphones-width'
      };
      // !VA This should return directly wihout a ret variable as tmp storage.
      var ret = Object.keys(IDtoProp).find(key => IDtoProp[key] === str);
      // alert(ret);
      return ret;
    }

    function elementIdToAppobjProp(str) {
      var IDtoProp = {
        viewerW:  'ipt-tbr-viewerw',
        imgW: 'ipt-tbr-imgwidth',
        imgH: 'ipt-tbr-imgheight',
        sPhonesW: 'ipt-tbr-sphones-width',
        lPhonesW: 'ipt-tbr-lphones-width'
      };
      // !VA This should return directly wihout a ret variable as tmp storage.
      var ret = Object.keys(IDtoProp).find(key => IDtoProp[key] === str);
      // alert(ret);
      return ret;
    }



    // !VA appController private
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

    // !VA appController private
    function getAppdata() {
      var Appdata = {};
      Appdata = UIController.queryDOMElements();

      // !VA Now compute the rest of Appdat
      Appdata.aspect = getAspectRatio(Appdata.imgNW,  Appdata.imgNH);
      Appdata.sPhonesH = Math.round(Appdata.sPhonesW * (1 / Appdata.aspect[0]));
      Appdata.lPhonesH = Math.round(Appdata.lPhonesW * (1 / Appdata.aspect[0]));
      return Appdata;
    }

    // !VA appController public functions
    return {


      getAppobj: function() {
        return Appobj;
      },

      initCcp: function () {
        let isActive;
        isActive = UIController.toggleCcp();
        // console.log('isActive is: ' + isActive);
        if (isActive) {
          UIController.populateAppobj(Appobj, 'ccp');
        }
        // console.log('initCCP Appobj is: ');
        // console.log(Appobj);
      },

      // !VA This is a pass-thru to access queryDOMElements (public UIController)  to get the current dimensions of the dynamic DOM elements and data attributes, and getAppdata (private appController) to calculate the non-DOM Appdata properties. We do this here because Appdata has to be queried in all three modules, so it has to be accessible in all of them, and because getAppdata needs getAspectRatio which belongs in appController.
      // !VA appController public
      initGetAppdata: function() {
        var Appdata = getAppdata();
        return Appdata;
      },

      // !VA Dev Mode pass-thru public functions to expose calcViewerSize and initCcp to UIController.initUI
      // !VA DEV MODE
      // !VA ------------------------------
      // !VA appController public: DEVMODE
      initCalcViewerSize: function() {
        calcViewerSize();
      },
      // !VA appController public: DEVMODE
      initToggleImgType: function () {
        toggleImgType(false);
      },
      // !VA appController public: DEVMODE
      initToggleIncludeWrapper: function () {
        toggleIncludeWrapper('init');
      },
      // !VA appController public: DEVMODE
      initShowTdOptions: function () {
        showTdOptions(false);
      },
      // !VA DEV MODE END
     


      // !VA appController public
      // !VA APP MESSAGES START
      // !VA This is the entry point where we sort the three types of messages. We have the target id for all three types. For tooltips, we have it in the event object passed in from the event handler. For msg and err, we can't get it because handleAppMessages only takes one parameter -- either the event for tooltips or the appMessCode for msg and err. 
      // !VA So now the problem is that tooltips require the caller id because the tooltip shows on mouseenter and has to hide on mouseleave, and we need the id for the mouseleave to create the eventListener for it. So:
      // !VA Call showAppMessages with two parameters: targetid, which is either a string for tooltips or false for msg and err, and the second parameter is the appMessContent.
      handleAppMessages: function ( evt ) {
        let appMessCode, appMessType, appMessContent, duration, appMessContainerId, tooltipTarget, timer;
        // !VA Duplicate evt into appMessCode - we could just receive the event as appMessCode but it's more transparent to do it explicitly
        appMessCode = evt;
        // !VA If appMessCode is an object, then it originated in an addEventListener, so it must be a tooltip because those are the only appMessages that originate there. Parse the target id from the event and convert it to a valid appMessCode, i.e. underscores instead of hyphens.
        if (typeof(appMessCode) === 'object') { 
          // evt = appMessCode;
          tooltipTarget = '#' + evt.target.id;
          appMessCode = 'tip_' + evt.target.id.replace(/-/gi, '_'); 
          appMessType = 'tip';
        }
        // !VA Get the id of the container in which the appMessage is displayed based on the first three chars of appMessCode.
        appMessContainerId = '#' + appMessCode.slice(0, 3) + '-content';
        // !VA Get the appMessContent from the passed appMessCode, which is now conformant to all three appMessage types
        appMessContent = getAppMessageStrings(appMessCode); 
        // !VA Get the first three characters of the appMessCode to determine the appMessType. If those chars are 'err' or 'msg', set the duration. Otherwise, it's a tooltip, and no duration is required since the user manually undisplays the message by releasing Ctrl + Alt.
        // !VA Set the duration of err and msg appMessages
        if ( appMessCode.slice(0, 3) === 'err' ) {
          duration = 2500;
          appMessType = 'err';
        } else if ( appMessCode.slice(0,3 ) === 'msg' ) {
          duration = 750;
          appMessType = 'msg';
        } else {
          console.log('Tooltip: no duration set');
        }
        // !VA Set the innerHTML of the appMessContainer to the current appMessContent
        document.querySelector(appMessContainerId).innerHTML = appMessContent;
        // !VA displayAppMessages with the isShow parameter = true to display the appMessage. 
        if (appMessType === 'tip') {
          // !VA Display the message -- if it's a tooltip include the target ID of the tooltip target, 
          UIController.displayAppMessages( true, appMessContainerId, tooltipTarget );
        } else {
          // !VA otherwise set that parameter to false - it's not needed
          UIController.displayAppMessages( true, appMessContainerId, false );
        }
        // !VA If appMessType is err or msg, call setTimeout to set the duration of the message, i.e. time delay before the message is undisplayed.
        if ( appMessType === 'err' || appMessType === 'msg') {
          timer = setTimeout(() => {
            // !VA Read the appMessContent into the tooltip content element
            // !VA Call displayAppMessages with the isTrue parameter = false to undisplay the message after the timeout. 
            UIController.displayAppMessages(false, appMessContainerId, false );
          }, duration);
        }
      },



      // !VA Query whether localStorage is currently set for viewerW, sPhonesW and lPhonesW
      // !VA appController public
      getLocalStorage: function() {
        // !VA Get localStorage for viewerW here. localStorage is set in updateAppobj after the user input has been parsed for errors. 
        let arr = [], curLocalStorage = [];
        // !VA Clear localStorage for testing only.
        // localStorage.clear();
        // !VA If localStorage is set for viewerW, sPhonesW or lgPhones, add the localStorage value to curLocalStorage and return it
        arr = [ 'viewerW', 'sPhonesW', 'lPhonesW' ];
        for (let i = 0; i < arr.length; i++) {
          localStorage.getItem(arr[i]) ? curLocalStorage.push(localStorage.getItem(arr[i])) : curLocalStorage.push(false);
        }
        return curLocalStorage;
      },

      // !VA appController public
      init: function(){
        console.log('App initialized.');
        // !VA Determine if the window is an isolate window, i.e. should be displayed with just the Witty app in window with fixed dimensions without header or tutorial content.
        let curUrl, initMode;
        // !VA If the value of the query string is true, then remove the header-container, isolate button and content from the DOM
        curUrl = window.location.href;

        if (curUrl.substring(curUrl.length - 4) === 'true')  {
          // !VA TODO: Make function
          document.querySelector('.header-container').style.display = 'none';
          document.querySelector('.header-isolate-app').style.display = 'none';
          document.querySelector('.content-section').style.display = 'none';
        } 

        // !VA Hide the CCP
        // !VA TODO: Make function
        document.querySelector(staticRegions.ccpContainer).classList.remove('active');
        setupEventListeners();
        
        // !VA  Test if there is currently #cur-img element with an image.If there is, it's hardcoded in the HTML and we're in DEV MODE. If there's not, the app is being initialized in USER MODE.
        document.querySelector(dynamicRegions.curImg) ? initMode = 'devmode' : initMode = 'prod';
        // !VA Initialize the UI
        UICtrl.initUI(initMode);
      }
    };

  })(CBController, UIController);

  appController.init();

//Namespace closure
})();