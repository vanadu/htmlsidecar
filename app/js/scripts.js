// !VA REBOOT 12/29/19
// ===================
// See C:\Users\VANA\OneDrive\WhittyReview_12.30.19.docx

// !VA GENERAL NOTES
/* !VA  - April Reboot Notes
=========================================================
// !VA 05.18.20
Status:
DONE: Implement ALT+CTRL+Hover tooltips.
DONE: AppMessage implementation mostly done, but the tooltip implementation sucks. Must revisit
DONE: Fix imgswap codeBlock output: alt tag has quotes following, alt doesn't work. THis was fixed in an earlier commit.
DONE: vmlbutton - add default 40/200 width and height as per Stig and add error handling if one of the values is omitted.
DONE: Populate inputs with defaults in vmlbutton and 
DONE: Fix viewer doesn't resize horizontally any more in PROD mode or show the Inspectors - but works in DEV mode.
DONE: rtl class attribute shows when nothing is entered: it should be hidden. FIXED in setPosSwitchNodeAttributes
DONE: Notate all functions with module and private/public
DONE: run queryDOMElements only on enter, not on every keypress - in order to do this, need to get the previous value of the input so the user can ESC out of the field without implementing changed value. Right  now we are getting this value from Appdata. FIXED - Now gets value from HTML element placeholder or from localStorage
DONE: CCP input fields should select all when clicked in like they do in the toolbar - no they shouldn't for now. User should be able to set the cursor in the field and change any value that way.
DONE: Make mrk => box function...not sure where thoutgh or whether it's necessary since it's just a one-liner. Leave it, it's just a one-liner
DONE: Changing Inspector element hover color based on whether the SHIFT or CTRL key is pressed: I tried a number of approaches to getting different hover colors for SHIFT and CTRL but it's not worth the hassle. The shiftKey event only fires when the key is pressed down or up. The mouseenter and mouseleave event only fires when you enter or leave the element. Trying to trap the SHIFT press either while SHIFT is pressed outside the element while the element is entered OR while the mouse is inside the element proved too much for me. All that is even worse because if the focus isn't in the Witty window, which it is not most of the time while the user switches back and forth to the editor, then the mouse events won't fire. Plus, the keypress events don't appear to fire on non-input elements, so you'd have to trap the keypress on the document and then I don't even know how you'd drill down to limit it to the Inspector element. In short - we're going with a single gold CSS hover which works even if Witty doesn't have the focus. The rest we'll have to do with tooltips. This item is closed.
DONE: Remove all bootstrap tooltips
DONE: Finish adding tooltip strings - some TBD strings remain
DONE: Add animation to tooltips
DONE: Fix tooltip cursor not changing to help cursor on Display Size and other elements with clipboard clicks. That is not going to happen since the clipboard clicks on the label are governed by the hover pseudoelement which overrides the mouseenter event, I think. Closed.
DONE: Cancel tooltips when error message is displayed.
DONE: FIx quirks with error messages - first one after refresh displays late, messages don't cancel when leaving the target element. Probably entains enabling the blocking element above the toolbar buttons for hte duration of the error/msg display.
DONE: Fix the CSS Rule buttons disappearing when hovered or clicked. It's because they get the class ttip for some reason. ttip class deleted, deprecated.
DONE: Comment and clean up appMessages.



DONE: Remove X from No Image strings
TODO: Change table options: if width = Appdata.viewerW then class = devicewidth else class = none
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
    foo = !foo;
    console.log('foo is: ' + foo);
    foo ?  testbut2.addEventListener('click', addMe, false) : testbut2.removeEventListener('click', addMe, false);
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
      // !VA Branch: inspectorClipboardOutput (051320)
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

    //!VA If we separate this out into UI objects that correspond to the objects we want to create, then we can just loop through them rather than define each property separately. So, dynamicElements are those that resize based on the current image... but I haven't figured out how to loop through them yet.
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
      spnCcpImgIncludeWidthHeightCheckmrk: '#spn-ccp-img-include-width-height-checkmrk',
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



    // !VA Run test function on page load
    // document.addEventListener('DOMContentLoaded', function() {
    //   setTimeout(function(){ 
    //     // var fug = document.querySelector(btnCcpMakeClips.btnCcpMakeTdTag);
    //     // fug.click();



    //   }, 500);
    // });


  


    // !VA UIController private
    // !VA Reboot: passing in Appdata from 
    function evalInspectorAlerts(Appdata) {
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
      if (Appdata.imgNW < (Appdata.imgW * 2) ) {
        flaggedInspectors.push(allInspectors.insDiskSizeLabel);
      } 
      // !VA Small phones isn't at least 2X size on Disk and Retina
      if (Appdata.imgNW < (Appdata.sPhonesW * 2) ) {
        flaggedInspectors.push(allInspectors.insSmallPhonesLabel);
      }
      // !VA Large phones isn't at least 2X Size on Disk and Retina
      if (Appdata.imgNW < (Appdata.lPhonesW * 2) ) {
        flaggedInspectors.push(allInspectors.insLargePhonesLabel);
      } 
      // !VA Reset all the dim viewer alerts by passing in the entire Inspector array. We're running this function twice here, each time with different parameters -- could be DRYer but it works and 
      // UIController.writeInspectorAlerts(allInspectors, false);
      // !VA Now set the individual dim viewer alerts for the current image.
      UIController.writeInspectorAlerts(flaggedInspectors);
    }


    function showAppMessages(appMessContainerId, tooltipTarget) {
      
      console.log('showAppMessages running');
      // !VA Branch: implementModifierTooltips (051820) DEPRECATED
      // !VA Show the current appMessage. If the current appMessage is a tooltip, then show the help cursor while the mouse is in the tooltip element.
      console.log('appMessContainer is: ' + appMessContainerId);
      console.log('tooltipTarget is: ' + tooltipTarget);


      document.querySelector(appMessContainerId).classList.add('active');
      if (!appMessContainerId.includes('tip')) {


        document.querySelector(staticRegions.appBlocker).classList.add('active');

      } 

    }


    function hideAppMessages(appMessContainerId, tooltipTarget) {
      console.log('hideAppMessages running');

      // !VA Hide current app message

      console.log('removing blocker');
      document.querySelector(staticRegions.appBlocker).classList.remove('active');

      document.querySelector(appMessContainerId).classList.remove('active');



    }

    // !VA UIController public functions
    return {

      // !VA UIController public
      // !VA This has to cancel the timeouts for the runmn
      displayAppMessages: function (isShow, appMessContainerId, tooltipTarget) {
        // !VA Pass-thur public function to pass display actions to the UIController. If isShow is true, call showAppMessages. If it's false, call hideAppMessages. NOTE: the tooltip appMessage is undisplayed in 
        isShow ? showAppMessages(appMessContainerId, tooltipTarget) : hideAppMessages(appMessContainerId, tooltipTarget);
      },


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
      initToolbarInputs: function() {
        // !VA This is called from init (? ) and initializes the values of the toolbar viewerW, sPhonesW and lPhonesW values from either a default value or the localStorage values. Check if there are localStorage values, if not, initialize viewerW = 650, sPhonesW = 320, lPhonesW = 414 and write those to the toolbarUI. 
        console.log('initToolbarInputs running');
      },

      // !VA UIController public getAppdata
      // !VA Moved getAppdata from appController to UIController because Appdata is derived from the DOM elements and data properties that reside in the DOM. 

      // !VA UIController public
      queryDOMElements: function() {
        // console.log('queryDOMElements running');
        // !VA NEW This needs to ONLY return the non-calculated DOM elements and data properties: curImg.imgW, curImg.imgW, curImg.imgNW, curImg.NH and viewerW. Aspect is calculated so we don't need to get that here, leave that to appController.
        // !VA NEW We will get the individual properties and return them as an ES6 array.
        // !VA Declare the local vars
        // !VA Reboot - should these vars be renamed according to the new scheme? I am going to use the convention fname - insFilename when used in variable name.
        var fname, viewerW, viewerH, imgW, imgH, imgNW, imgNH, sPhonesW, lPhonesW;
        var els = {fname, viewerW, viewerH, imgW, imgH, imgNW, imgNH, sPhonesW, lPhonesW};

        // !VA Get the insFilename from the Inspector
        els.fname = document.querySelector(inspectorElements.insFilename).textContent;
        // !VA Get the curImg and imgViewer
        var curImg = document.querySelector(dynamicRegions.curImg);
        var imgViewer = document.querySelector(dynamicRegions.imgViewer);
        // !VA Get the computed width and height of imgViewer
        var cStyles = window.getComputedStyle(imgViewer);
        els.viewerW = parseInt(cStyles.getPropertyValue('width'), 10);
        els.viewerH = parseInt(cStyles.getPropertyValue('height'), 10);
        // !VA Get the dimensions of curImg
        els.imgW = curImg.width;
        els.imgH = curImg.height;
        els.imgNW = curImg.naturalWidth;
        els.imgNH = curImg.naturalHeight;

        
        // !VA Get the data properties for iptTbrSmallPhonesW and sPhonesH
        // !VA This is no good. Can't query Appdata when it doesn't exist. Try this: if the current value doesn't equal the placeholder value...let's leave this for later and hope there's no catastrophe!

        els.sPhonesW = parseInt(document.querySelector(toolbarElements.iptTbrSPhonesWidth).getAttribute('data-sphonesw'), 10);
        els.lPhonesW = parseInt(document.querySelector(toolbarElements.iptTbrLPhonesWidth).getAttribute('data-lphonesw'), 10);
        els.iptTbrSPhonesWidth ? els.iptTbrSPhonesWidth : Appdata.iptTbrSPhonesWidth = parseInt(document.querySelector(toolbarElements.iptTbrSPhonesWidth).placeholder, 10);
        els.iptTbrLPhonesWidth ? els.iptTbrLPhonesWidth : Appdata.iptTbrLPhonesWidth = parseInt(document.querySelector(toolbarElements.iptTbrLPhonesWidth).placeholder, 10);
        // console.dir(els);
        return els;
      },

      // !VA UIController public
      initUI: function(initMode) {

        const delayInMilliseconds = 10;
        // console.log('initMode is: ' + initMode);
        // !VA Here we initialze DEV mode, i.e. reading a hardcoded image from the HTML file instead of loading one manually in production mode
        if (initMode === 'devmode') {
          // !VA Set a timeout to give the image time to load
          setTimeout(function() {
            // !VA Show the toolbar and curImg region
            document.querySelector(staticRegions.tbrContainer).style.display = 'block';
            document.querySelector(dynamicRegions.curImg).style.display = 'block';
            // !VA  Get the insFilename of the devImg in the HTML. This is the only time we'll have an actual source file -- in user mode all the images are blobs -- so we can do this as a one-off.
            var fname = document.querySelector(dynamicRegions.curImg).src;
            fname = fname.split('/');
            fname = fname[fname.length - 1];
            // !VA Write the insFilename to the DOM so we can add it later to Appdata. It's not completely DRY because it's added to the DOM here and later to Appdata, and then queried in the CCP from Appdata, but it's better than having to query it from the DOM every time it's used in a separate function call. This way, we can loop through Appdata to get it if we need to.
            document.querySelector(inspectorElements.insFilename).textContent = fname;
            // !VA Initialze calcViewerSize to size the image to the app container areas
            appController.initCalcViewerSize();
            // !VA Open the CCP by default in dev mode
            // !VA First, set it to the opposite of how you want to start it.
            document.querySelector(staticRegions.ccpContainer).classList.add('active');
            // !VA Then run initCCP to initialize - initInitCCP is the public appController function included just to access appcontroller private initCCP from the UIController module
            appController.initInitCCP();
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

        // !VA If there's a localStorage for viewerW, put that value into the viewerW field of the toolbar, otherwise use the default. NOTE: The default is set ONLY in the HTML element's placeholder. The advantage of this is that we can get it anytime without having to set a global variable or localStorage for the default.
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
        document.querySelector(staticRegions.dropArea).style.display = 'flex';
        document.querySelector(staticRegions.tbrContainer).style.display = 'none';
        document.querySelector(inspectorElements.btnToggleCcp).style.display = 'none';

        // !VA Inspector initialization comes now from the HTML file. The default 'No Image' is display: inline in CSS. When an image is loaded, inspectors are populated with values in UIController.writeInspectors.
      },

      // !VA UIController public
      writeInspectors: function() {
        // !VA Hide  the default 'No Image' value displayed when the app is opened with no image and display the Inspector values for the current image, show the Clipboard button and call evalInspectorAlerts to determine which Inspector labels should get dimension alerts (red font applied). 
        var Appdata = {};
        // !VA Get the current Appdata
        Appdata = appController.initGetAppdata();
        // !VA Hide the dropArea
        document.querySelector(staticRegions.dropArea).style.display = 'none';
        // Write the inspectorElements
        document.querySelector(inspectorElements.insFilename).innerHTML = `<span class='pop-font'>${Appdata.fname}</span>`;
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
        // !VA Display the respective Appdata value in the respective inspector value span 
        document.querySelector(inspectorValues.insDisplaySizeWidthValue).innerHTML = Appdata.imgW;
        document.querySelector(inspectorValues.insDisplaySizeHeightValue).innerHTML = Appdata.imgH;
        document.querySelector(inspectorValues.insDiskSizeWidthValue).innerHTML = Appdata.imgNW;
        document.querySelector(inspectorValues.insDiskSizeHeightValue).innerHTML = Appdata.imgNH;
        document.querySelector(inspectorValues.insSmallPhonesWidthValue).innerHTML = Appdata.sPhonesW;
        document.querySelector(inspectorValues.insSmallPhonesHeightValue).innerHTML = Appdata.sPhonesH;
        document.querySelector(inspectorValues.insLargePhonesWidthValue).innerHTML = Appdata.lPhonesW;
        document.querySelector(inspectorValues.insLargePhonesHeightValue).innerHTML = Appdata.lPhonesH;
        document.querySelector(inspectorValues.insAspectValue).innerHTML = Appdata.aspect[1];
        document.querySelector(inspectorValues.insRetinaWidthValue).innerHTML = (Appdata.imgW * 2);
        document.querySelector(inspectorValues.insRetinaHeightValue).innerHTML = (Appdata.imgH * 2);
        // // !VA  Display the clipboard button
        document.querySelector(inspectorElements.btnToggleCcp).style.display = 'block';
        // !VA Call evalInspectorAlerts to calculate which Inspector values don't meet HTML email specs.
        // !VA Reboot: nothing is passed here, although evalInspectorAlerts expects an argument. So lets' try to pass Appdata
        evalInspectorAlerts(Appdata);



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

      // !VA UIController public
      displayTdOptions: function(evt) {
        // console.log('displayTdOptions running');
        // !VA Array including all the defined options for each tdoption radio
        let allTdOptions = [], optionsToShow = [], targetalias, parentDivId;
        let Appdata;
        Appdata = appController.initGetAppdata();
        // !VA Add the hash to the target id to match it with the alias
        targetalias = '#' + evt.target.id;
        // !VA Populate allTdOptions with all the defined Td options
        allTdOptions = [ ccpUserInput.iptCcpTdClass,  ccpUserInput.selCcpTdAlign, ccpUserInput.selCcpTdValign, ccpUserInput.iptCcpTdHeight,  ccpUserInput.iptCcpTdWidth,  ccpUserInput.iptCcpTdBgColor, ccpUserInput.iptCcpTdFontColor, ccpUserInput.iptCcpTdBorderColor, ccpUserInput.iptCcpTdBorderRadius  ];
        // !VA This function gets the id of the parent div of the td option to be displayed/hidden. We need the parent div because it contains label and input of the element, not just the input field or dropdown list itself.
        function getParentDiv(parentDivId) {
          parentDivId = '#' + parentDivId.substring( 5 );
          return parentDivId;
        }
        // !VA Function to show the specific options available for the selected TD options radio
        function showOptions(optionsToShow) {
          for (let i = 0; i < optionsToShow.length; i++) {
            parentDivId = getParentDiv(optionsToShow[i]);
            document.querySelector(parentDivId).classList.add('active');
          }
        }
        // !VA Cycle through all the parent divs of each of the TD options and remove the active class to hide them all. This needs to be done before showing the specific options for the selected TD option radio
        for (let i = 0; i < allTdOptions.length; i++) {
          // !VA Get the parent Id of the options to be hidden
          parentDivId = getParentDiv(allTdOptions[i]);
          document.querySelector(parentDivId).classList.remove('active');
        }
        // !VA Reset the height, width and bgcolor fields to '', otherwise the vmlbutton defaults will persist if the user selects the vmlbutton radio button.
        document.querySelector(ccpUserInput.iptCcpTdHeight).value = '';
        document.querySelector(ccpUserInput.iptCcpTdWidth).value = '';
        document.querySelector(ccpUserInput.iptCcpTdBgColor).value = '';
        // !VA Determine which tdoptions radio button is selected based on the click event and run showOptions for the selected TD radio option.
        switch(true) {
        // !VA td options basic and excludeimg
        case targetalias === ccpUserInput.rdoCcpTdBasic || targetalias === ccpUserInput.rdoCcpTdExcludeimg:
          optionsToShow = [ ccpUserInput.iptCcpTdClass,  ccpUserInput.selCcpTdAlign, ccpUserInput.selCcpTdValign, ccpUserInput.iptCcpTdHeight,  ccpUserInput.iptCcpTdWidth,  ccpUserInput.iptCcpTdBgColor ];
          // !VA Run showOptions to get the parent div of the options to show for these tdoption radio selections and apply the active class to display them.
          showOptions(optionsToShow);
          break;
          // !VA tdoption posswitch
        case targetalias === ccpUserInput.rdoCcpTdPosswitch:
          // !VA TODO: Cerebrus has NO td options except width: 100% - let's add 'class' andleave it like that for the time being and see if there's a case where any other options are useful. 
          optionsToShow = [ ccpUserInput.iptCcpTdClass, ccpUserInput.selCcpTdAlign, ccpUserInput.selCcpTdValign, ccpUserInput.iptCcpTdBgColor ];
          showOptions(optionsToShow);
          break;
          // !VA tdoption imgswap
        case targetalias === ccpUserInput.rdoCcpTdImgswap:
          optionsToShow = [ ccpUserInput.iptCcpTdClass, ccpUserInput.selCcpTdAlign, ccpUserInput.selCcpTdValign ];
          showOptions(optionsToShow);
          break;
          // !VA tdoption bgimage
        case targetalias === ccpUserInput.rdoCcpTdBgimage:
          // !VA bgcolor, width, height, valign
          optionsToShow = [ ccpUserInput.iptCcpTdClass, ccpUserInput.iptCcpTdHeight,  ccpUserInput.iptCcpTdWidth,  ccpUserInput.iptCcpTdBgColor ];
          showOptions(optionsToShow);
          // !VA Get the default height and width from Appdata 
          document.querySelector(ccpUserInput.iptCcpTdHeight).value = Appdata.imgH;
          document.querySelector(ccpUserInput.iptCcpTdWidth).value = Appdata.imgW;
          // !VA Include the default bgcolor as per Stig
          document.querySelector(ccpUserInput.iptCcpTdBgColor).value = '#7bceeb';
          break;
          // !VA tdoption vmlbutton
        case targetalias === ccpUserInput.rdoCcpTdVmlbutton:
          optionsToShow = [ ccpUserInput.iptCcpTdClass, ccpUserInput.iptCcpTdHeight,  ccpUserInput.iptCcpTdWidth,  ccpUserInput.iptCcpTdBgColor, ccpUserInput.iptCcpTdFontColor, ccpUserInput.iptCcpTdBorderColor, ccpUserInput.iptCcpTdBorderRadius ];
          showOptions(optionsToShow);
          // !VA The height and width field require an entry otherwise the button can't be built, that's why Stig has default values of 40/200 in his code. So we include the defaults here when the inputs are displayed and include error handling if the user omits one
          document.querySelector(ccpUserInput.iptCcpTdHeight).value = '40';
          document.querySelector(ccpUserInput.iptCcpTdWidth).value = '200';
          // !VA Include the default bgcolor as per Stig
          document.querySelector(ccpUserInput.iptCcpTdBgColor).value = '#556270';
          document.querySelector(ccpUserInput.iptCcpTdFontColor).value = '#FFFFFF';
          document.querySelector(ccpUserInput.iptCcpTdBorderColor).value = '#1e3650';
          document.querySelector(ccpUserInput.iptCcpTdBorderRadius).value = '4';
          break;
        default:
          console.log('ERROR: UIController.displayTdOptions public');
        } 
      },




    };

  })();


  var CBController = (function() {

    // !VA CBController private functions
    // !VA NOTE: If we want to access any of the DOM IDs we have to call them from UIController where they're defined.
    var inspectorElements = UIController.getInspectorElementIDs();
    var inspectorValues = UIController.getInspectorValuesIDs();
    var inspectorLabels = UIController.getInspectorLabelsIDs();
    var ccpUserInput = UIController.getCcpUserInputIDs();
    var btnCcpMakeClips = UIController.getBtnCcpMakeClips();

    // !VA TODO: Appears to be deprecated, remove
    // !VA CBController private
    function getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
    }

    // !VA ATTRIBUTE FUNCTIONS
    // !VA CBController private
    function getAttributes() {
      var Appdata = appController.initGetAppdata();
      let target, checked, str, options, selectid;
      var Attributes = {
        // !VA IMG attributes
        imgClass: (function() {
          return ccpGetAttValue('class',document.querySelector(ccpUserInput.iptCcpImgClass).value);
        })(),
        imgWidth: (function() {
          return Appdata.imgW;
        })(),
        imgHeight: (function() {
          return Appdata.imgH;
        })(),
        imgAlt: (function() {
          return ccpGetAttValue('alt',document.querySelector(ccpUserInput.iptCcpImgAlt).value);
        })(),
        imgSrc: (function() {
          if (document.querySelector(ccpUserInput.iptCcpImgRelPath).value) {
            return document.querySelector(ccpUserInput.iptCcpImgRelPath).value + '/' + document.querySelector(inspectorElements.insFilename).textContent;
          }
        })(),
        imgStyle: (function() {
          let target, checked, str;
          target = ccpUserInput.spnCcpImgIncludeWidthHeightCheckmrk;
          checked = getCheckboxSelection(target);
          if (checked === true) {
            str = `display: block; width: ${Appdata.imgW}px; height: ${Appdata.imgH}px; font-family: Arial, sans-serif; font-size: 16px; line-height: 15px; text-decoration: none; border: none; outline: none;`;
          } else {
            str = 'display: block; font-family: Arial, sans-serif; font-size: 16px; line-height: 15px; text-decoration: none; border: none; outline: none;';
          }
          return str;
        })(),
        imgAlign: (function() {  
          str = '', options = [], selectid = '';
          selectid = ccpUserInput.selCcpImgAlign;
          options = [ '', 'left', 'center', 'right'];
          str = getAlignAttribute( selectid, options );
          return str;
        })(),
        imgIncludeAnchor: (function() {
          let target, checked;
          target = ccpUserInput.spnCcpImgIncludeAnchorCheckmrk;
          checked = getCheckboxSelection(target);
          return checked;
        })(),
        // !VA TD Attributes
        // !VA TD Width and height from Appdata = imgW and imgW -- only used for Stig's BG image 
        tdAppdataWidth: (function() {
          return Appdata.imgW;
        })(),
        tdAppdataHeight: (function() {
          return Appdata.imgH;
        })(),
        tdHeight: (function() {
          return ccpIfNoUserInput('height',document.querySelector(ccpUserInput.iptCcpTdHeight).value);
        })(),
        tdWidth: (function() {
          return ccpIfNoUserInput('width',document.querySelector(ccpUserInput.iptCcpTdWidth).value);
        })(),
        tdBasic: (function() {
          target = ccpUserInput.rdoCcpTdBasic;
          checked = getRadioSelection(target);
          return checked;
        })(),
        tdImgswap: (function() {
          target = ccpUserInput.rdoCcpTdBasic;
          checked = getRadioSelection(target);
          return checked;
        })(),
        tdBgimage: (function() {
          target = ccpUserInput.rdoCcpTdBgimage;
          return checked;
        })(),
        tdPosswitch: (function() {
          target = ccpUserInput.rdoCcpTdPosswitch;
          checked = getRadioSelection(target);
          return checked;
        })(),
        tdAlign: (function() {
          let str = '', options = [], selectid = '';
          selectid = ccpUserInput.selCcpTdAlign;
          options = [ '', 'left', 'center', 'right'];
          str = getAlignAttribute( selectid, options );
          return str;
        })(),
        tdValign: (function() {
          let str = '', options = [], selectid = '';
          selectid = ccpUserInput.selCcpTdValign;
          options = [ '', 'top', 'middle', 'bottom'];
          str = getAlignAttribute( selectid, options );
          return str;
        })(),
        tdClass: (function() {
          return ccpGetAttValue('class',document.querySelector(ccpUserInput.iptCcpTdClass).value);
        })(),
        tdBgcolor: (function() {
          return ccpGetAttValue('class',document.querySelector(ccpUserInput.iptCcpTdBgColor).value);
        })(),
        tdBackground: (function() {
          return document.querySelector(ccpUserInput.iptCcpImgRelPath).value + '/' + (Appdata.fname);
        })(),
        // !VA TABLE attributes
        tableClass: (function() {
          return ccpIfNoUserInput('class',document.querySelector(ccpUserInput.iptCcpTableClass).value);
        })(),
        tableWidth: (function() {
          return document.querySelector(ccpUserInput.iptCcpTableWidth).value;
        })(),
        tableBgcolor: (function() {
          return ccpIfNoUserInput('bgcolor',document.querySelector(ccpUserInput.iptCcpTableBgColor).value);
        })(),
        tableAlign: (function() {
          let str = '', options = [], selectid = '';
          selectid = ccpUserInput.selCcpTableAlign;
          
          options = [ '', 'left', 'center', 'right'];
          str = getAlignAttribute( selectid, options );
          
          return str;
        })(),
        tableIncludeWrapper: (function() {
          let target, checked;
          target = ccpUserInput.spnCcpTableIncludeWrapperCheckmrk;
          checked = getCheckboxSelection(target);
          return checked;
        })(),
        tableTagWrapperClass: (function() {
          return ccpIfNoUserInput('class',document.querySelector(ccpUserInput.iptCcpTableWrapperClass).value);
        })(),
        tableTagWrapperAlign: (function() {
          let str = '', options = [], selectid = '';
          selectid = ccpUserInput.selCcpTableWrapperAlign;
          options = [ '', 'left', 'center', 'right'];
          str = getAlignAttribute( selectid, options );
          return str;
        })(),
        tableTagWrapperWidth: (function() {
          return document.querySelector(ccpUserInput.iptCcpTableWrapperWidth).value;
        })(),
        tableTagWrapperBgcolor: (function() {
          return ccpIfNoUserInput('bgcolor',document.querySelector(ccpUserInput.iptCcpTableWrapperBgColor).value);
        })(),
      };
      return Attributes;
    }

    // !VA 02.17.20 This is the same as ccpIfNoUserInput except it returns ONLY the value, not the attribute name -- but we don't need this now, because if it has not value, then, well it has no value.
    // !VA CBController private
    function ccpGetAttValue(att, value) {
      // !VA We need get the insFilename from Appdata in case the user leaves 'path' empty
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

    // !VA CBController private
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
    function getCheckboxSelection(target) {
      
      let chkboxid, checked;
      chkboxid = document.querySelector(target).id;
      chkboxid = chkboxid.replace('mrk', 'box');
      chkboxid = chkboxid.replace('spn', 'chk');
      if (document.querySelector('#' + chkboxid).checked === false) {
        // !VA WRAPPER TABLE NOT CHECKED
        checked = false;
      } else {
      // !VA WRAPPER TABLE IS CHECKED
        checked = true;
      }
      return checked;
    }

    // !VA CBController private
    function getRadioSelection(target) {
      let radioid, checked;
      radioid = document.querySelector(target).id; 
      if (document.querySelector('#' + radioid).checked === false) {
        // !VA Radio button is NOT CHECKED
        checked = false;
      } else {
      // !VA Radio button IS CHECKED
        checked = true;
      }
      return checked;
    }

    // clipboardController: IF NO USER INPUT IN CCP OPTION ELEMENTS 
    // !VA TODO: This should be in handleUserInput
    // !VA CBController private
    function ccpIfNoUserInput(att, value) {
      // !VA We need get the insFilename from Appdata in case the user leaves 'path' empty
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
      // !VA Initialize the clipboard-building process by getting those user selections in the CCP that determine the structure of the clipboard output and put those selections into the uSels object.
      let uSels = {};
      uSels = {
        
        buttonClicked: '',
        hasAnchor: getCheckboxSelection(ccpUserInput.spnCcpImgIncludeAnchorCheckmrk),
        hasWrapper: getCheckboxSelection(ccpUserInput.spnCcpTableIncludeWrapperCheckmrk),
        selectedRadio: document.querySelector('input[name="tdoptions"]:checked').value
      };
      if (id === btnCcpMakeClips.btnCcpMakeImgTag.slice(1)) { 
        uSels.buttonClicked = 'imgbut';
        // !VA Override the selectedRadio value for the IMG button - the IMG button will ALWAYS output img/anchor tags to the clipboard no matter which tdoptions radio button is selected.
        uSels.selectedRadio = 'basic';
      } else if (id === btnCcpMakeClips.btnCcpMakeTdTag.slice(1)) { 
        uSels.buttonClicked = 'tdbut';
      } else {
        uSels.buttonClicked = 'tablebut';
      }
      // !VA Branch: reconfigureMessages (051620): id added to arguments
      buildOutputNodeList( id, uSels );
    }

    // !VA Build the subset of nodes that will be populated with indents and output to the Clipboard. NOTE: outputNL can't be a fragment because fragments don't support insertAdjacentHMTL). So we have to create a documentFragment that contains all the nodes to be output, then append them to a container div 'outputNL', then do further processing on the container div.
    // !VA CBController private
    // !VA Branch: reconfigureMessages (051620) id added to parameters
    function buildOutputNodeList( id, uSels ) {
      console.log('buildOutputNodeList id is: ' + id);
      let tableNodeFragment, nl, frag, outputNL, clipboardStr;
      // !VA Get the top node, i.e. tableNodeFragment. We need to pass uSels because makeTableNode calls makeTdNode, which uses uSels to get the current tdoptions radio button selection
      // !VA Branch: reconfigureMessages (051620) id added to arguments
      tableNodeFragment = makeTableNode( id, uSels );
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
      if (uSels.selectedRadio === 'basic' || uSels.selectedRadio === 'excludeimg' || uSels.selectedRadio === 'posswitch') {
        // !VA Deterimine which makeNode button was clicked and extract a nodeList fragment with only those nodes that correspond to the clicked button. The index position of the extracted fragments is determined by the length of the tableNodeFragment nodeList minus an integer to compensate for the 0-based nodeList indices.
        let rtlNodePos, extractPos;
        // !VA For the posswitch option: Get the position of the RTL node, if it exists. 
        for (let i = 0; i < nl.length; i++) {
          // console.log('nl[i] is: ' +  nl[i]);
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
          console.log('tdbut');
          // !VA basic option is selected 
          if ( uSels.selectedRadio === 'basic') { 
            // !VA We can hardcode this for now, but that will be a problem if any other options with other nodes are added.
            uSels.hasAnchor ? extractPos = nl.length - 3 : extractPos = nl.length - 2;
            // frag = nl[extractPos];
          } else if ( uSels.selectedRadio === 'excludeimg') {
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
      } else if (uSels.selectedRadio === 'imgswap' || uSels.selectedRadio  === 'bgimage' || uSels.selectedRadio === 'vmlbutton') {
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
        if ( uSels.selectedRadio === 'imgswap') {
          codeBlock = getImgSwapBlock( id, indentLevel);
        } else if (  uSels.selectedRadio === 'bgimage' ) {
          codeBlock = getBgimageBlock(id, indentLevel);
        } else if (uSels.selectedRadio === 'vmlbutton') {
          codeBlock = getVmlButtonBlock(id, indentLevel);
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
    function makePosSwitchNodes( id ) {
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
      container = setPosSwitchNodeAttributes(container);
      // !VA Copy the container to tdInner. This is for nomenclature, because all the other makeNode functions return the container under the name tdInner
      var tdInner = container.children[0]; 
      // !VA Return the container to makeTdNodes
      return tdInner;
    }

    // !VA Set the attributes for the nodes in the 'posswitch' option using the DIR attribute
    function setPosSwitchNodeAttributes(container) {
      // !VA Get the Td attributes, we need them for height and width
      var nodeList, index;
      let Attributes = getAttributes();
      let nodeAttributes = [];

      // !VA Initialize the objects that contain the attributes for the individual nodes
      let td_switchcontainerAttr, table_switchparentAttr, tr_switchparentAttr, td_switchsibling1Attr, table_switchchild1Attr, tr_switchchild1Attr, td_switchcontent1Attr, a_switchcontent1Attr, img_switchcontent1Attr, td_switchsibling2Attr, table_switchchild2Attr, tr_switchchild2Attr, td_switchcontent2Attr; 
      // !VA Make the nodeList from the container passed in from makePosSwitchNodes to apply the attributes to.
      nodeList = container.querySelectorAll( '*' );
      // !VA Build the objects that contain the attributes that will be set on the nodeList nodes.
      // !VA If the class input element under td options is empty, do nothing, otherwise add the class to the container TD and set the class attribute
      !Attributes.tdClass ? !Attributes.tdClass : nodeList[0].setAttribute('class', Attributes.tdClass);
      // !VA If the bkgrnd color input element under td options is empty, do nothing, otherwise add the bkgrnd color to the container TD and set the bgcolor attribute
      !Attributes.tdBgcolor ? !Attributes.tdBgcolor : nodeList[0].setAttribute('bgcolor', Attributes.tdBgcolor);
      // !VA Add the rest of the attributes to the nodes
      td_switchcontainerAttr = {
        dir: 'rtl',
        // !VA class: see above
        // !VA bgcolor: see above
        width: '100%',
        align: Attributes.tdAlign,
        valign: Attributes.tdValign,
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
        width: Attributes.imgWidth,
        height: Attributes.imgHeight,
        style: Attributes.imgStyle,
        src: Attributes.imgSrc,
        alt: Attributes.imgAlt
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
    function makeImgNode ( id ) {
      // !VA Id is passed but not used here,  because we're only building the node.
      let Attributes;
      Attributes = getAttributes();
      let imgNode, returnNodeFragment;
      // !VA Create the image node
      imgNode = document.createElement('img');
      // !VA Create the node fragment that will contain the IMG or A/IMG tags
      returnNodeFragment = document.createDocumentFragment();
      // !VA Set the img attributes. 
      // !VA Class attribute - Add to the node only if the attribute is set, i.e. the input has an entry
      // !VA Add to the node only if the attribute is set, i.e. the input has an entry
      if (Attributes.imgClass) { imgNode.className = Attributes.imgClass; }
      // !VA alt attribute - Add to the node only if the attribute is set, i.e. the input has an entry
      if (Attributes.imgAlt) { imgNode.alt = Attributes.imgAlt; }
      // !VA src attribute;
      imgNode.src = Attributes.imgSrc;
      // !VA width attribute
      imgNode.width = Attributes.imgWidth;
      // !VA height attribute
      imgNode.height = Attributes.imgHeight;
      // !VA style attribute
      imgNode.setAttribute('style', Attributes.imgStyle);
      // !VA NOTE: align attribute is deprecated in html5 so is it needed?
      // !VA alt attribute - Add to the node only if the attribute is set, i.e. the selected option isn't 'none'. i.e. falsy
      if (Attributes.imgAlign) { imgNode.align = Attributes.imgAlign; }
      // !VA border attribute
      imgNode.border = '0';
      
      // !VA If the include anchor option is checked, create the anchor element, add the attributes, append the imgNode to the nodeFragment, and return it.
      if(Attributes.imgIncludeAnchor === true) {
        let anchor = document.createElement('a');
        anchor.href = '#';
        anchor.setAttribute('style', 'color: #FF0000');
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
    function makeTdNode( id, uSels ) {
      // !VA Variables for error handling - need to include this in the return value so the Clipboard object can differentiate between alert and success messages. 
      let isErr;
      // !VA NOTE: No trapped errors here yet that would pass a code, but that will probably come.
      let errCode;
      // !VA Get the node attributes
      let Attributes;
      Attributes = getAttributes();
      let tdInner, imgNode;
      // !VA Create the TD node for the parent TD
      tdInner = document.createElement('td');
      // !VA Create the TD node fragment that will contain the parent TD without the code block for imgswap, bgimage or vmlbutton
      let tdNodeFragment;
      tdNodeFragment = document.createDocumentFragment();
      // !VA TODO: There are NO attributes that are included in ALL the tdoptions, but it's very repetitive to include these options individually. Think about how this can be made DRYer, like it was done in makePosSwitchNodes and setPosSwitchNodeAttributes
      // !VA bgcolor attribute. Pass the input value, don't prepend hex # character for now
      if (Attributes.tdBgcolor) { tdInner.bgColor = Attributes.tdBgcolor; }
      // !VA Now add the attributes included only with the default Td configuration
      switch(true) {
      // case (selectedRadio === 'basic'):
      case (uSels.selectedRadio === 'basic' || uSels.selectedRadio === 'excludeimg'):
        console.log('makeTdNode basic OR excludeimg');
        // !VA class attribute
        if (Attributes.tdClass) { tdInner.className = Attributes.tdClass; }
        // !VA valign attribute
        if (Attributes.tdAlign) { tdInner.align = Attributes.tdAlign; }
        if (Attributes.tdValign) { tdInner.vAlign = Attributes.tdValign; }
        if (Attributes.tdHeight) { tdInner.height = Attributes.imgWidth; }
        if (Attributes.tdWidth) { tdInner.width = Attributes.imgHeight; }
        // !VA If 'basic' is checked, create imgNode and append it, otherwise exclude the imgNode.
        if (uSels.selectedRadio === 'basic') {
          imgNode = makeImgNode( id );
          // !VA We need to include the imgNode here ONLY if Bgimage is unchecked
          tdInner.appendChild(imgNode);
        }
        break;
      // case (selectedRadio === 'imgswap'):
      case (uSels.selectedRadio === 'imgswap'):
        if (Attributes.tdClass) { tdInner.className = Attributes.tdClass; }
        if (Attributes.tdValign) { tdInner.vAlign = Attributes.tdValign; }
        if (Attributes.tdAlign) { tdInner.align = Attributes.tdAlign; }
        break;
      // case (selectedRadio === 'bgimage'):
      case (uSels.selectedRadio === 'bgimage'):
        console.log('makeTdNode bgimage');
        // !VA Create the parent node to which the bgimage code block will be appended after outputNL is converted to text in buildOutputNodeList.
        // !VA Include width, height and valign as per Stig's version
        tdInner.width = Attributes.tdAppdataWidth;
        tdInner.height = Attributes.tdAppdataHeight;
        tdInner.vAlign = Attributes.tdValign;
        // !VA Set the background attribute to the current path/filename
        tdInner.setAttribute('background', Attributes.tdBackground);
        // !VA Fallback bgcolor now set in UIController.displayTdOptions
        // !VA Include fallback color from the default set in displayTdOptions
        // Attributes.tdBgcolor ? tdInner.bgColor = Attributes.tdBgcolor : tdInner.bgColor = '#7bceeb';
        break;
      // case (selectedRadio === 'posswitch'):
      case (uSels.selectedRadio === 'posswitch'):
        tdInner  = makePosSwitchNodes( id );
        break;
      // case (selectedRadio === 'vmlbutton'):
      case (uSels.selectedRadio === 'vmlbutton'):
        // !VA Height and width fields have to be entered, otherwise the button can't be built. Button width and height are set here in makeTdNode, the rest of the options are set in getVmlCodeBlock in buildOutputNodeList. The defaults of 40/200 as per Stig are set in UIController.displayTdOptions. So if there's no value for td height and width, then the user has deleted the default and not replaced it with a valid entry. In this case, throw an ERROR and abort before it gets to the clipboard.
        if (!document.querySelector(ccpUserInput.iptCcpTdHeight).value || !document.querySelector(ccpUserInput.iptCcpTdWidth).value) {
          console.log('ERROR in makeTdNode vmlbutton: no value for either height or width');
          isErr = true;
        } else {
          // !VA Set the width and height in the TD node, not in the code block
          tdInner.width = Attributes.tdWidth;
          tdInner.height = Attributes.tdHeight;
        }
        // !VA TODO: If the height entered doesn't match the height of the loaded image, then the user probably has forgotten to load the image used for the button background, so the code output will probably not be what the user expects. Output the code, but show an alert in the message bar. This is going to require making a different clipboard message for alerts. It will also require somehow informing the Clipboard object that two different messages can be displayed onsuccess - one success message and one alert message. That will require passing an error status along with tdNodeFragment and tableNodeFragment, which will require returning an array rather than just the node fragment. 
        if (document.querySelector(ccpUserInput.iptCcpTdHeight).value !== Attributes.imgHeight) {
          appController.initMessage(id, true, 'vmlbutton_height_mismatch');
          console.log('ALERT vmlbutton: height value doesn\'t match height of loaded image');
        } 
        break;
      default:
        console.log('Some error has occurred in makeTdNode');
      } 
      // // !VA Set the node fragment to the TD node
      tdNodeFragment.appendChild(tdInner);
      // !VA TODO: This error handling is poor because it only allows for one possible error. But, it does return nothing, which is then passed on to the calling function and terminates in buildOutputNodeList
      // !VA Branch: reconfigureMessages (051620) Try catch this error belongs here
      if (isErr) { 
        console.log('makeTdNode: vml_button_no_value error: id is: ' + id);
        // !VA Branch: reconfigureMessages (051620) New appmessage handling
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
    function makeTableNode( id, uSels ) {
      let Attributes;
      Attributes = getAttributes();
      // !VA This isn't defined because there's not identified error condition as yet. See the return statement of makeTdNode for handling method.
      let isErr;
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
      if (Attributes.tableClass) { tableInner.className = Attributes.tableClass; }
      // table.className = Attributes.tableClass;
      // !VA table align attribute
      if (Attributes.tableAlign) { tableInner.align = Attributes.tableAlign; }
      // !VA width attribute -- the default is the current display size, so it gets the value from the toolbar viewerW input field.

      // !VA NOTE: That's not right. If the image width is equal to the container width, i.e. if imgW = viewerW, then the image is the same as the desktop display width. So 1) the input field should be locked because the parent table can't be smaller than the image it contains and 2) The parent table should get the class devicewidth by default because the image is the same size as the display width i.e. viewerW. 

      // !VA If the image width < viewerW, then 1) the input is unlocked, 2) the value defaults to the image width and 3) the class input is blanked out. The user can enter any value up to the viewerW. If val > viewerW, then error. 

      tableInner.width = Attributes.tableWidth;
      // !VA table bgcolor attribute. Pass the input value, don't prepend hex # character for now
      if (Attributes.tableBgcolor) { tableInner.bgColor = Attributes.tableBgcolor; }
      // !VA Add border, cellspacing and cellpadding
      tableInner.border = '0', tableInner.cellSpacing = '0', tableInner.cellPadding = '0';
      tableInner.setAttribute('role', 'presentation'); 
      
      // !VA Build the inner tr
      tableInner.appendChild(trInner);
      // !VA Get the inner TD from makeTdNode and append it to the nodeFragment
      tdNodeFragment = makeTdNode( id, uSels );
      // !VA If tdNodeFragment is null, then there was an error in makeTdNode, so console the error and return null to buildOutputNodeList to abort.
      try {
        trInner.appendChild(tdNodeFragment);
      } catch (e) {
        // !VA Branch: reconfigureMessages (051620) Add error message here, in the meantime console.log id
        console.log('Error in makeTableNode: tdNodeFragment is null: id is: ' + id);
        return;
      }
      // !VA If include table wrapper is checked, build the outer table and return it
      // !VA table wrapper class
      if (Attributes.tableTagWrapperAlign) { tableOuter.align = Attributes.tableTagWrapperAlign; }
      // !VA wrapper table align attribute
      if (Attributes.tableTagWrapperClass) { tableOuter.className = Attributes.tableTagWrapperClass; }
      // !VA the default wrapper table width is the current display size - so it gets the value from the toolbar's Content Width field.
      tableOuter.width = Attributes.tableTagWrapperWidth;
      // !VA table bgcolor attribute. Pass the input value, don't prepend hex # character for now. 
      if (Attributes.tableTagWrapperBgcolor) { tableOuter.bgColor = Attributes.tableTagWrapperBgcolor; }
      // !VA Add default border, cellspacing, cellpadding and role for accessiblity
      tableOuter.border = '0', tableOuter.cellSpacing = '0', tableOuter.cellPadding = '0';
      tableOuter.setAttribute('role', 'presentation'); 
      // !VA Append the outer tr to the wrapper
      tableOuter.appendChild(trOuter);
      // !VA Append the outer td to the outer tr
      trOuter.appendChild(tdOuter);
      // !VA Add the outer td attributes
      if (Attributes.tdAlign) { tdOuter.align = Attributes.tdAlign; }
      // !VA valign attribute
      if (Attributes.tdValign) { tdOuter.vAlign = Attributes.tdValign; }
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
    function getImgSwapBlock( id, indentLevel ) {
      let Appdata, Attributes, linebreak;
      Attributes = getAttributes();
      Appdata = appController.initGetAppdata();
      linebreak = '\n';
      let mobileFilename, mobileSwapStr;
      // !VA Create the mobile image filename: Get the current image file's filename and append the name with '-mob'.
      mobileFilename = Attributes.imgSrc;
      // !VA The regex for appending the filename with '-mob'.
      mobileFilename = mobileFilename.replace(/(.jpg|.png|.gif|.svg)/g, '_mob$1');
      // !VA Create the code for the mobile swap TD as a Comment node of the parent td. 
      mobileSwapStr = `${linebreak}${getIndent(indentLevel)}<a href="#"><img class="hide" alt="${Attributes.imgAlt}" width="${Attributes.imgWidth}" height="${Attributes.imgHeight}" src="${Attributes.imgSrc}" border="0" style="width: ${Attributes.imgWidth}px; height: ${Attributes.imgHeight}px; margin: 0; border: none; outline: none; text-decoration: none; display: block; "></a>${linebreak}${getIndent(indentLevel)}<!--[if !mso]><!-->${linebreak}${getIndent(indentLevel)}<span style="width:0; overflow:hidden; float:left; display:none; max-height:0; line-height:0;" class="mobileshow">${linebreak}${getIndent(indentLevel)}<a href="#"><img class="mobileshow" alt="${Attributes.imgAlt}" width="${Appdata.sPhonesW}" height="${Appdata.sPhonesH}" src="${mobileFilename}" border="0" style="width: ${Appdata.sPhonesW}px; height: ${Appdata.sPhonesH}px; margin: 0; border: none; outline: none; text-decoration: none; display: block;" /></a>${linebreak}${getIndent(indentLevel)}<!--</span>-->${linebreak}${getIndent(indentLevel)}<!--<![endif]-->`;
      // !VA Return the code block with indents and linebreaks
      return mobileSwapStr;
    }

    // !VA UIController private
    function getBgimageBlock( id, indentLevel) {
      console.log('getBgiamgeBlock running');
      let Attributes;
      Attributes = getAttributes();
      let bgimageStr, fallback, bgcolor;
      let linebreak;
      linebreak = '\n';
      // !VA 03.09.2020 Set the indentLevel to 1 for now
      fallback = '#7bceeb';
      // !VA The fallback color is written to the bgcolor input in displayTdOptions, so get it from there
      Attributes.tdBgcolor ? bgcolor = Attributes.tdBgcolor : bgcolor = document.querySelector(ccpUserInput.iptCcpTdBgColor).value;

      // !VA Define the innerHTML of the bgimage code
      bgimageStr = `${linebreak}${getIndent(indentLevel)}<!--[if gte mso 9]>${linebreak}${getIndent(indentLevel)}<v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:${Attributes.imgWidth}px;height:${Attributes.imgHeight}px;">${linebreak}${getIndent(indentLevel)}<v:fill type="tile" src="${Attributes.tdBackground}" color="${bgcolor}" />${linebreak}${getIndent(indentLevel)}<v:textbox inset="0,0,0,0">${linebreak}${getIndent(indentLevel)}<![endif]-->${linebreak}${getIndent(indentLevel)}<div>${linebreak}${getIndent(indentLevel)}<!-- Put Foreground Content Here -->${linebreak}${getIndent(indentLevel)}</div>${linebreak}${getIndent(indentLevel)}<!--[if gte mso 9]>${linebreak}${getIndent(indentLevel)}  </v:textbox>${linebreak}${getIndent(indentLevel)}</v:rect>${linebreak}${getIndent(indentLevel)}<![endif]-->`;
      // !VA Return the code block with line breaks and indents
      return bgimageStr;
    }

    // !VA CBController private
    function getVmlButtonBlock ( id, indentLevel) {
      let Attributes;
      Attributes = getAttributes();
      // console.dir(Attributes);
      let vmlButtonStr, linebreak, tdHeight, tdWidth;
      linebreak = '\n';
      // !VA Defaults for height and width are set in displayTdOptions, so get the values from the inputs
      tdHeight = document.querySelector(ccpUserInput.iptCcpTdHeight).value;
      tdWidth = document.querySelector(ccpUserInput.iptCcpTdWidth).value;
      // !VA Define the innerHTML of the vmlbutton code
      vmlButtonStr = `${linebreak}${getIndent(indentLevel)}<div><!--[if mso]>${linebreak}${getIndent(indentLevel)}<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:${tdHeight}px;v-text-anchor:middle;width:${tdWidth}px;" arcsize="10%" strokecolor="#1e3650" fill="t">${linebreak}${getIndent(indentLevel)}<v:fill type="tile" src="${Attributes.imgSrc}" color="#556270" />${linebreak}${getIndent(indentLevel)}${linebreak}${getIndent(indentLevel)}<w:anchorlock/>${linebreak}${getIndent(indentLevel)}<center style="color:#ffffff;font-family:sans-serif;font-size:13px;font-weight:bold;">Show me the button!</center>${linebreak}${getIndent(indentLevel)}</v:roundrect>${linebreak}${getIndent(indentLevel)}<![endif]--><a href="#"
style="background-color:#556270;background-image:url(${Attributes.imgSrc});border:1px solid #1e3650;border-radius:4px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:13px;font-weight:bold;line-height:${tdHeight}px;text-align:center;text-decoration:none;width:${tdWidth}px;-webkit-text-size-adjust:none;mso-hide:all;">Show me the button!</a></div>`;
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
      // console.log('applyIndents running');
      // !VA Create array to store indent strings
      let indents = [];
      // !VA Create array to store the positions of the stackable columns in the posswitch option.
      let stackColumnPos = [];
      // !VA Variable to hold the indentLevel of the second posswitch column that the first posswitch column will stack over.
      let stackColumnIndentLevel;
      // !VA Flag for whether to insert the tokens used to insert the MS conditional code blocks after converting the output node list to text.
      let hasMSConditional;
      if ( uSels.selectedRadio === 'imgswap' || uSels.selectedRadio === 'bgimage' || uSels.selectedRadio === 'vmlbutton') {
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
      console.log('str: ');
      console.log(str);
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
        // args[0] = Attributes.imgClass, args[1] = Attributes.imgWidth, args[2] = Attributes.imgHeight;
        clipboardStr = `img.${Attributes.imgClass} { width: ${Appdata.imgW}px !important; height: ${Appdata.imgH}px !important; }`;
        break;
      case (id.includes('img-smphn')):
        clipboardStr = `img.${Attributes.imgClass} { width: ${Appdata.sPhonesW}px !important; height: ${Appdata.sPhonesH}px !important; }`;
        break;
      case (id.includes('img-lgphn')):
        clipboardStr = `img.${Attributes.imgClass} { width: ${Appdata.lPhonesW}px !important; height: ${Appdata.lPhonesH}px !important; }`;
        break;
      case (id.includes('td-dsktp') || id.includes('td-smphn') || id.includes('td-lgphn')) :
        if ( Attributes.tdHeight) {
          clipboardStr = `td.${Attributes.tdClass} { height: ${Attributes.tdHeight}px !important; }`;
        } else {
          clipboardStr = `td.${Attributes.tdClass} {  }`;
        }
        break;
      case (id.includes('table-dsktp')):
        clipboardStr = `table.${Attributes.tableClass} { width: ${Attributes.tableWidth}px !important; align: ${Attributes.tableAlign} !important; }`;
        break;
      case (id.includes('table-smphn')):
        clipboardStr = `table.${Attributes.tableClass} { width: ${Appdata.sPhonesW}px !important; align: ${Attributes.tableAlign} !important; }`;
        break;
      case (id.includes('table-lgphn')):
        clipboardStr = `table.${Attributes.tableClass} { width: ${Appdata.lPhonesW}px !important; align: ${Attributes.tableAlign} !important; }`;
        break;
      default:
        console.log('ERROR in makeCssRule: case not');
      } 
      // !VA If the input includes a percent char, remove the hard-coded trailing px on the value and just output the value with the user-entered percent char.
      clipboardStr.includes('%')  ? clipboardStr = clipboardStr.replace('%px', '%') : clipboardStr;
      // !VA Write CSS code to clipboard
      writeClipboard(id, clipboardStr);
    }

    function handleInspectorClicks(targetid, modifierKey) {
      
      console.log('handleInspectorClicks running');
      console.log('targetid is: ' + targetid);
      let Appdata, clipboardStr, widthval, heightval;

      var el = document.querySelector('#' + targetid);
      el.onmouseover = isOver();
      console.log('el');
      console.log(el);
      
      function isOver() {
        console.log('isOver running');
      }

      widthval = heightval = '';
      // !VA Get Appdata
      Appdata = appController.initGetAppdata(false);
      // !VA Get the value to output to Clipboard based on whether shift or ctrl is pressed
      function getVal( widthval, heightval, modifierKey ) {
        console.log('modifierKey is: ' + modifierKey);
        let str1, str2, val;
        console.log('widthval  is: ' + widthval );
        console.log('heightval is: ' + heightval);
        if ( !widthval || !heightval ) {
          console.log('this is a value click');
          widthval ? str1 = 'width' : str1 = 'height';
          console.log('str1 is: ' + str1);
          
          widthval ? val = widthval : val = heightval; 
          console.log('val is: ' + val);
          if ( modifierKey === 'shift') {
            clipboardStr = str1 + '="' + val + '" ';
          } else if ( modifierKey === 'ctrl') {
            clipboardStr = str1 + ': ' + val + 'px; ';
          } else {
            clipboardStr = val;
          }


        } else {
          console.log('this is a label click');
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
        // !VA Determine which element is clicked -- makeTag button, makeCSSRule button or Inspector element and run getUserSelections, makeCSSRule or handleInspectorClicks respectively.
        switch(true) {
        case targetid.includes('tag') :
          getUserSelections(targetid);
          break;
        case targetid.includes('css') :
          makeCssRule(targetid);
          break;
        case targetid.includes('ins') :
          handleInspectorClicks(targetid, modifierKey);
          break;
        default:
          // code block
        } 
        return targetid;
      },

      // !VA Test function
      runTest: function() {
        console.log('runTest running');

      }
    };
  })();

  // GLOBAL APP MODULE
  var appController = (function(CBCtrl, UICtrl) {

    // !VA Getting DOM ID strings from UIController
    const inspectorElements = UICtrl.getInspectorElementIDs();
    const inspectorValues = UICtrl.getInspectorValuesIDs();
    const inspectorLabels = UICtrl.getInspectorLabelsIDs();
    const dynamicRegions = UICtrl.getDynamicRegionIDs();
    const staticRegions = UICtrl.getStaticRegionIDs();
    const toolbarElements = UICtrl.getToolButtonIDs();
    const ccpUserInput = UICtrl.getCcpUserInputIDs();
    const ccpUserInputLabels = UICtrl.getCcpUserInputLabelIds();
    const btnCcpMakeClips =  UICtrl.getBtnCcpMakeClips();
    const appMessageElements =  UICtrl.getAppMessageElements();
    
    //EVENT HANDLING START 
    // !VA appController private
    // !VA Branch: implementModifierTooltips (051820)
    // !VA Creating a separate EventListener setup function specifically for tooltips, because this function will be run on DOMContentLoaded in an iife every time the CTRL + ALT key combination is pressed. The onModifierKeypress function should live in appController, I think. The tooltips themselves can be displayed either through UIController.showAppMessages or a new, separate UIController public function.
    // !VA Process the tooltip triggers when the mouseenter event is fired on them, i.e. get the appMessCode, appMessContent and duration and pass to showTooltip

    // !VA IMPORTANT: addEventListeners and removeEventListeners require a NAMED function, not just a function definition. If you just use a function definition, you can create the eventListener but you can't remove it because Javascript doesn't know which one you want to remove. Worse, it fails silently. So always name your function calls into a var when adding/removing event listeners!
    // !VA NOTE: variable name can't be the same as the function name. Otherwise, you can add and remove the event listener only ONCE, but not multiple times.
    var tooltipTriggers = function tooltipTriggers(evt) { 
      // !VA Named function to include as function parameter in tooltip event handlers. IMPORTANT: anonymous functions can't be removed with removeEventListener. That's why it has to be named. This is just a pass-thru to get to appController.handleAppMessages.
      appController.handleAppMessages(evt);
    };






    // !VA ADD EVENT LISTENERS FOR TOOLTIP TRIGGERS
    function addTooltipEventListeners() {
      console.log('addTooltipEventListeners running');
      // !VA Event handler for initializing tooltip event listeners 
      function addEventHandler(oNode, evt, oFunc, bCaptures) {
        // console.log('oNode is:');
        // console.log(oNode);
        oNode.addEventListener(evt, oFunc, bCaptures);
      }
      // !VA initialize the toolbar tooltip triggers
      var toolbarIds = Object.values(toolbarElements);
      let el;
      for (let i = 0; i < toolbarIds.length; i++) {
        // console.log('toolbarIds[i] is: ' +  toolbarIds[i]);
        el = document.querySelector(toolbarIds[i]);
        // console.log(el);
        addEventHandler(el, 'mouseenter', tooltipTriggers, true);
      }
      // !VA Add tooltip triggers for Inspector labels
      var inspectorLabelIds = Object.values(inspectorLabels);
      for (let i = 0; i < inspectorLabelIds.length; i++) {
        // console.log('toolbarIds[i] is: ' +  toolbarIds[i]);
        el = document.querySelector(inspectorLabelIds[i]);
        // console.log(el);
        addEventHandler(el, 'mouseenter', tooltipTriggers, true);
      }
      // !VA Add tooltip triggers for Inspector Value  elements
      var inspectorValueIds = Object.values(inspectorValues);
      for (let i = 0; i < inspectorValueIds.length; i++) {
        // console.log('toolbarIds[i] is: ' +  toolbarIds[i]);
        el = document.querySelector(inspectorValueIds[i]);
        // console.log(el);
        addEventHandler(el, 'mouseenter', tooltipTriggers, true);
      }
      // !VA Add tooltip triggers for CCP user input elements
      // !VA To get the tooltip targets, we need both the input element and its label because the user will probably click on the label. We might not even need the ccpUserInput element itself but rather only the label, but for now we'll use both. We could loop through the parent DIV of the input element and add the eventHandler that way, but then we can't remove the input element if we decide we don't need the tooltip on it, so we'll do them separately.
      var ccpUserInputIds = Object.values(ccpUserInput);
      for (let i = 0; i < ccpUserInputIds.length; i++) {
        el = document.querySelector(ccpUserInputIds[i]);
        // console.log(el);
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
      console.log('removeTooltipEventListeners running');
      function removeEventHandler(oNode, evt, oFunc, bCaptures) {
        // console.log('oNode is:');
        // console.log(oNode);
        oNode.removeEventListener(evt, oFunc, bCaptures);
      }
      // !VA initialize the toolbar tooltip triggers
      var toolbarIds = Object.values(toolbarElements);
      let el;
      for (let i = 0; i < toolbarIds.length; i++) {
        // console.log('toolbarIds[i] is: ' +  toolbarIds[i]);
        el = document.querySelector(toolbarIds[i]);
        // console.log(el);

        removeEventHandler(el, 'mouseenter', tooltipTriggers, true);
      }
      // !VA Add tooltip triggers for Inspector labels
      var inspectorLabelIds = Object.values(inspectorLabels);
      for (let i = 0; i < inspectorLabelIds.length; i++) {
        // console.log('toolbarIds[i] is: ' +  toolbarIds[i]);
        el = document.querySelector(inspectorLabelIds[i]);
        // console.log(el);
        removeEventHandler(el, 'mouseenter', tooltipTriggers, true);
      }
      // !VA Add tooltip triggers for Inspector Value  elements
      var inspectorValueIds = Object.values(inspectorValues);
      for (let i = 0; i < inspectorValueIds.length; i++) {
        // console.log('toolbarIds[i] is: ' +  toolbarIds[i]);
        el = document.querySelector(inspectorValueIds[i]);
        // console.log(el);
        removeEventHandler(el, 'mouseenter', tooltipTriggers, true);
      }
      // !VA Add tooltip triggers for CCP user input elements
      // !VA To get the tooltip targets, we need both the input element and its label because the user will probably click on the label. We might not even need the ccpUserInput element itself but rather only the label, but for now we'll use both. We could loop through the parent DIV of the input element and add the eventHandler that way, but then we can't remove the input element if we decide we don't need the tooltip on it, so we'll do them separately.
      var ccpUserInputIds = Object.values(ccpUserInput);
      for (let i = 0; i < ccpUserInputIds.length; i++) {
        el = document.querySelector(ccpUserInputIds[i]);
        // console.log(el);
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
        // console.log('oNode is:');
        // console.log(oNode);
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
      // console.log('inspectorClickables is: ' + inspectorClickables);
      for (let i = 0; i < inspectorClickables.length; i++) {
        // !VA convert the ID string to the object inside the loop
        inspectorClickables[i] = document.querySelector(inspectorClickables[i]);
        // console.log('inspectorClickables[i].id is: ' + inspectorClickables[i].id);
        // addEventHandler(inspectorClickables[i],'mouseenter',CBController.enteredMe,false);
        addEventHandler(inspectorClickables[i],'click',CBController.doClipboard,false);
      }

      // !VA Add mouseover event handlers for Inspector clickable elements: Display Size, Small Phones and Large Phones values in the programmatically created SPAN tags
      const inspectorHoverables = [ inspectorLabels.insDisplaySizeLabel, inspectorLabels.insSmallPhonesLabel, inspectorLabels.insLargePhonesLabel, inspectorValues.insDisplaySizeWidthValue, inspectorValues.insDisplaySizeHeightValue, inspectorValues.insSmallPhonesWidthValue, inspectorValues.insSmallPhonesHeightValue, inspectorValues.insLargePhonesWidthValue, inspectorValues.insLargePhonesHeightValue ];
      // console.log('inspectorClickables is: ' + inspectorClickables);
      for (let i = 0; i < inspectorHoverables.length; i++) {
        // !VA convert the ID string to the object inside the loop
        inspectorHoverables[i] = document.querySelector(inspectorHoverables[i]);
        // console.log('inspectorHoverables[i].id is: ' + inspectorHoverables[i].id);
        addEventHandler(inspectorHoverables[i],'mouseenter',CBController.enteredMe,false);

      }

      // !VA Add event handlers for the input elements that show mobile CSS clipboard buttons in the CCP when input is made. These are the class input elements for ccp Img, Td and Table options
      const ccpKeypresses = [ ccpUserInput.iptCcpImgClass, ccpUserInput.iptCcpTdClass, ccpUserInput.iptCcpTableClass ];
      for (let i = 0; i < ccpKeypresses.length; i++) {
        // !VA convert the ID string to the object inside the loop
        ccpKeypresses[i] = document.querySelector(ccpKeypresses[i]);
        addEventHandler((ccpKeypresses[i]),'input',showElementOnInput,false);
      }

      // !VA Add click handlers for Inspector - there's only the clipboard button now but there could be more. 
      var dvClickables = [ inspectorElements.btnToggleCcp ];
      for (let i = 0; i < dvClickables.length; i++) {
        // !VA convert the ID string to the object inside the loop
        dvClickables[i] = document.querySelector(dvClickables[i]);
        addEventHandler((dvClickables[i]),'click',initCCP,false);
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

      // !VA eventListeners for the tdOptions radio buttons for showing/hiding options based on selectedRadio
      for(let i in ccpUserInput) {
        let selectedRadio;
        // !VA Target only those ccpUserInput elements whose first 4 characters are #rdo. This identifies them as the radio button options.
        if (ccpUserInput[i].substring(0, 4) === '#rdo') {
          selectedRadio = document.querySelector(ccpUserInput[i]);
          // !VA Add an event handler to trap clicks to the tdoptions radio button
          addEventHandler(selectedRadio,'click',UIController.displayTdOptions,false);
        }
      }

      // !VA Misc Unused Handlers for review
      // =============================
      // !VA This was moved to initCCP I think
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
          document.querySelector(inspectorElements.insFilename).textContent = fileName;
          
          // !VA Hide the dropArea - not sure if this is the right place for this.
          document.querySelector(staticRegions.dropArea).style.display = 'none';
          // !VA  Once the current image has loaded, initialize the dinViewers by querying the current image properties from UICtrl and passing them to writeInspectors.
          function initInspectors() { 
            // !VA  Initialize the variable that will contain the new image's height, width, naturalHeight and naturalWidth
            var curImgDimensions;
            // !VA Review
            // !VA Set a short timeout while the blob loads, then run the onload function before displaying the image and getting its properties. This is probably overkill, but noone will notice the 250ms anyway and better safe then no-workie. But now that the image is loaded, we can display it and get its properties.
            setTimeout(() => {
              // Once the blob is loaded, show it and get its data
              curImg.onload = (function() {
              // !VA Hide the drop area.
                document.querySelector(staticRegions.dropArea).style.display = 'none';
                // !VA  Show the toolbar
                // !VA Reboot: block => flex
                document.querySelector(staticRegions.tbrContainer).style.display = 'flex';

                // !VA Display the current image
                curImg.style.display = 'block';

                // !VA Calculate the viewer size based on the loaded image
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
          console.log('Modifier released');
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
      el = document.getElementById(this.id);
      // !VA Select the clicked element's value, or if there's no value, set it to empty with a cursor, which is the default select behavior for empty fields.
      this.select();
    }

    // !VA TODO: Why is the argument  unused, why are there unused elements and what is actually happening here?
    // !VA appController private
    function handleBlur(evt) {
      // !VA Handle blur
      var Appdata = {};
      Appdata = appController.initGetAppdata();
      prop = elementIdToAppdataProp(this.id);
      // !VA If blurring from imgW or imgH, clear the field to display the placeholders. Otherwise, restore the field value to the Appdata property.
      // !VA NOTE: This can probably replace the blur statements in handleKeydown
      if (prop === 'imgW' || prop === 'imgH') {
        this.value = '';
      } else {

        this.value = Appdata[prop];
      }
    }

    function handleOnfocus(evt) {
      // console.log('handleOnfocus running');
      // console.log('evt.target is: ' + evt.target);
      let targ = evt.target;
      // console.log('targ.id is: ' + targ.id);
      let val = targ.value;
      // console.log('val is: ' + val);
    }


    // !VA appController private 
    // !VA Preprocess mouse events and route them to respective eval handler.
    function handleMouseEvents(evt) {
      // console.log('handleMouseEvents running');
      
      // !VA Carryover from earlier handleUserAction
      // !VA Get the target element of the click
      var el = document.getElementById(this.id);
      var args = { };
      args.target = el.id;
      // !VA Branch: reconfigureMessages (051620) Check if any appMessages are running
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
          // !VA Branch: reconfigureMessages (051620)
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
      // console.log('handleKeydown running');
      try {
        console.log('handleKeyDown try: ');
        var vals = [], msgElement;
        vals = (Object.values(appMessageElements));
        for (let i = 0; i < vals.length; i++) {
          console.log('vals[i] is: ' +  vals[i]);
          msgElement = document.getElementById(vals[i]);
          if (msgElement.classList.contains('active')) {
            console.log('is active');
          }
        }
      } catch (error) {
        console.log('handleMouseEvents catch:');
      }
      // !VA Get the keypress
      keydown = evt.which || evt.keyCode || evt.key;
      // !VA Only set vars and get values if Tab and Enter keys were pressed
      if (keydown == 9 || keydown == 13 ) {
        var el, isErr, isEnter, isTab
        var args = { }, Appdata = { };
        // !VA We need Appdata to restore fields to previous values on error or tabbing through fields without changing their values.
        Appdata = appController.initGetAppdata();
        // !VA Get the target element
        el = document.getElementById(this.id);
        // !VA Args is target, prop, val
        args.target = el.id;
        args.val = this.value;
        args.prop = elementIdToAppdataProp(this.id);
        // !VA Set a flag if the the Enter key was pressed, for readability
        (keydown == 13) ? isEnter = true : isEnter = false;
        // !VA Set a flag if the the Tab key was pressed, for readability
        (keydown == 9) ? isTab = true : isTab = false;
        // !VA If Tab was pressed and this.value is either empty or equals the Appdata value, then there's been no change to the field, so let Tab just cycle through the fields as per its default.
        if ((isTab) && ((this.value === '' || this.value == Appdata[args.prop]))) {
          // !VA Only if imgW or imgH, delete the existing value to display the placeholders. Otherwise, tab through and leave the existing value from Appdata
          if (args.prop === 'imgW' || args.prop === 'imgH') {
            this.onblur = function() {
              this.value = '';
            };
          }
        } else {
          // !VA Field value was changed, so first, pass the args to checkUserInput for errors.
          isErr = checkUserInput(args);
          if (isErr) {
            // !VA If it returns an error, select the input and show the error message so the user can correct it or ESC out of the field. If Tab, prevent advancing to the next field until the error is corrected or ESC is pressed.
            isEnter ? isEnter : evt.preventDefault(); 
            // !VA We have to leave the bad value in the field so the user can correct it or press Esc to blur without change, otherwise it will conflict with the default tab order behavior.
            this.select();
          } else {
            // !VA If the value was entered in the imgW or imgH field, show the value selected first so the user can view and change it before implementing. Only on Tab can the value be implemented and advance to the next field.
            if (args.prop === 'imgW' || args.prop === 'imgH') {
              if (isEnter) {
                this.select();
              } else {
                this.value = '';
                this.blur();
              }
            }
            // !VA Pass the target, prop and value to evalToolbarInput.
            evalToolbarInput(args);
          }
        } 
      }
    }

    // !VA appController private
    // !VA TODO: Why are there unused elements and what is actually happening here?
    // !VA keyPress handler for the ESC key.  This has to be handled on keyup, so we need a separate handler for it.
    function handleKeyup(evt) {
      console.log('handleKeyUp running');
      let prop, curLocalStorage;
      // !VA We only need the property here, so no need to create an args object. We could actually just use the target but since we're standardizing on property names, let's stick with that. Get the property name from the id of this, i.e. the event target
      prop = elementIdToAppdataProp(this.id);
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
            // console.log('document.querySelector(\'#\' + prop).placeholder is: ' + document.querySelector(toolbarElements.iptTbrViewerW).placeholder);
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
    function checkUserInput(args) {
      // !VA Destructure args
      const { target, prop, val } = args;
      let appMessCode;
      var isErr;
      isErr = false;
      var Appdata= {};
      Appdata = appController.initGetAppdata();
      // !VA TODO: Setting maxViewerWidth just for now
      var maxViewerWidth = 800;
      // !VA Branch: reconfigureMessages (051620) 
      // !VA First, check if there's a message running
      // !VA First, we validate that the user-entered value is an integer and if so, set the error variables.
      if (validateInteger(val)) {
        // !VA NOTE: This is where we could easily trap the negative button increment if it falls below 0 to send a different message than just the standard 'not_Integer' message. Revisit.
        appMessCode = 'err_not_Integer';
        isErr = true;
      } else {
        // !VA Now, we handle the error cases if user has entered a value in the imgViewer field 
        switch (true) {
        case (prop === 'viewerW') :
          // !VA The user has selected a viewerW that's smaller than the currently displayed image. Undetermined how to deal with this but for now the current image is shrunk to the selected viewerW. But Appdata is not updated accordingly, needs to be fixed.
          if (val < Appdata.imgW ) {
            // !VA Do nothing for now, see above.
          } else if (val > maxViewerWidth ) {
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
        case (prop === 'imgW') :
          // !VA If the new image width is greater than the viewer width, then show message. 
          if (val > Appdata.viewerW ) {
            // !VA errorHandler!
            isErr = true;
            appMessCode = 'err_imgW_GT_viewerW';
          }
          break;
        // !VA TODO: Handle the imageheight toolButton input
        case (prop === 'imgH') :
          console.log('Error handling for imageheight input not implemented!');
          break;

          // !VA TODO: Handle the small phone input
        case (prop === 'sPhoneW') :
          console.log('Error handling for iptTbrSmallPhonesW input not implemented!');
          break;
        
        // !VA Handle the large phone input
        case (prop === 'lPhoneW') :
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
    function evalToolbarInput(args) {
      // !VA Here we get the toolbar input from handleKeyDown, determine which input field it was entered in, and pass the value to the updateAppdata. Note that until updateAppdata is called, Appdata still retains the values prior to the user input in the fields that initiated this action.
      // !VA Initialize vars for imgH and imgW since we need to calculate one based on the value of the other and Appdata.aspect. Also initialize arg1 and arg2 which will be passed to updateAppdata
      let imgH, imgW, arg1, arg2;
      // !VA Get Appdata properties. All we really need here is Appdata.aspect. Everything else is calculated based on the user's input.
      let Appdata = {};
      Appdata = appController.initGetAppdata();
      // !VA TODO: Target isn't read in this function. Evaluate whether it needs to be passed in  from the caller (handleKeyDown, handleMouseEvents)
      // !VA ES6 Destructure args into constants.
      const { target, prop, val } = args;

      switch(true) {
      // !VA If the value was entered in the imgViewer field, just pass prop and val through to updateAppdata.
      case (prop === 'viewerW') :
        arg1 = [ prop, val ];
        arg2 = '';
        break;          
      case (prop === 'imgW') :
        // !VA If the value was entered in imgwidth, calc imgH based on val and aspect. Then put prop and val in arg1, and put the imgH property name and the calculated imgH into arg2. These will be passed on avia the spread operator to updateAppdata. 
        imgH =  val * (1 / Appdata.aspect[0]);
        // updateAppdata(prop, val); 
        arg1 = [ prop, val ];
        arg2 = [ 'imgH', imgH ];
        // updateAppdata('imgH', imgH); 
        break;
      case (prop === 'imgH') :
        // !VA If the value was entered in imgheight, calc imgW based on val and aspect. Then put prop and val in arg1, and put the imgW property name and the calculated imgW into arg2. These will be passed on via the ES6 spread operator to updateAppdata.
        imgW =  val * (Appdata.aspect[0]);
        arg1 = [ prop, val ]
        arg2 = [ 'imgW', imgW ] 
        break;
      case (prop === 'sPhonesW' || prop === 'lPhonesW') :
        // sPhonesH =  val * (1 / Appdata.aspect[0]);
        arg1 = [prop, val];
        arg2 = '';
        break;
      }
      
      // !VA Call updateAppdata to resize the DOM elements and data properties that correspond to the Appdata properties above.
      // !VA IMPORTANT -- these args aren't used...???
      updateAppdata( arg1, arg2 );
      // !VA Once those DOM properties and data properties have been updated, recalculate the image's containers.
      calcViewerSize();
    }

    // !VA appController private
    function updateAppdata( ...params ) {
      console.log('updateAppdata running');
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
          // !VA Write the imgViewer value to localStorage. 
          console.log('writing LS');
          localStorage.setItem('viewerW', val);
          // console.log('Setting localStorage viewerW');
          // var foo = appController.getLocalStorage();
          // console.log('foo is: ' + foo);
          break;
        case prop === 'imgW' :
          document.querySelector(dynamicRegions.curImg).style.width = val + 'px';
          break;
        case prop === 'imgH' :
          document.querySelector(dynamicRegions.curImg).style.height = val + 'px';
          break;
        case prop === 'sPhonesW' :
          document.querySelector(toolbarElements.iptTbrSPhonesWidth).setAttribute('data-sphonesw', val);
          // !VA Write the sPhonesW value to localStorage. 
          localStorage.setItem('sPhonesW', val);
          break;
        case prop === 'lPhonesW' :
          document.querySelector(toolbarElements.iptTbrLPhonesWidth).setAttribute('data-lphonesw', val);
          // !VA Write the lPhonesW value to localStorage. 
          localStorage.setItem('lPhonesW', val);
          break;
        }
      }
      // let Appdata = appController.initGetAppdata(false);
      // console.dir(Appdata);
    }

    // !VA  appController private 
    // !VA PROBLEM: this is only good for initializing because it calculates the viewer size based on NW and NH. On user input, it has to calculate based on imgW and imgH. I'm not sure what that means anymore 05.11.20
    function calcViewerSize() {
      let Appdata = {};
      let viewerW, viewerH, compStyles; 
      let curLocalStorage;
      Appdata = appController.initGetAppdata(false);
      // !VA Using the current image dimensions in Appdata, calculate the current size of imgViewer so it adjusts to the current image size. 
      // !VA  Get the actual viewerW and viewerH CSS values from getComputedStyle
      compStyles = window.getComputedStyle(document.querySelector(dynamicRegions.imgViewer));

      // !VA Set the viewerW value based on localStorage  If the user has set this value in the toolbar before, then queried from localStorage. That value persists between sessions. If this is the initial use of the app, then viewerW is queried from the CSS value. 
      curLocalStorage = appController.getLocalStorage();
      if (curLocalStorage[0]) {
        // !VA Set imgViewer and viewerW to the localStorage value
        viewerW = curLocalStorage[0];
        document.querySelector(dynamicRegions.imgViewer).style.width = curLocalStorage[0] + 'px';
      } else {
        // !VA If no localStorage is set, use the CSS value.
        viewerW = parseInt(compStyles.getPropertyValue('width'), 10);
      }
      // !VA In either case, use the CSS value for height, unless the height of the loaded image is greater than the CSS value.
      viewerH = parseInt(compStyles.getPropertyValue('height'), 10);
      // !VA Branch: implementPhonesLocalStorage (050920) Don't even know if I have to do this here

      // !VA If we're initializing a new image, use the naturalWidth and naturalHeight. If we're updating via user input, we need to use the display image and height, imgW and imgH. If we're initializing, then Appdata.imgW and Appdata.imgH will be 0 or falsy because it hasn't been resized yet. So we need to make the following decision based on the _actual_ image width and height, which will be different based on whether we're initializing or updating.
      // !VA I thought I fixed this...it appears to only apply to dev mode.
      var actualW, actualH;
      if (Appdata.imgW === 0) {
        actualW = Appdata.imgNW;
        actualH = Appdata.imgNH;
      } else {
        actualW = Appdata.imgW;
        actualH = Appdata.imgH; 
      }

      switch(true) {
      // The image falls within the default viewer dimensions set in initApp, so do nothing.
      // !VA This case is irrelevant since we're now comparing everything to maxViewerWidth not the  init values. Change accordingly...
      // !VA  NOT SO...now we're trying to restore the previous functionality so...
      case (actualW <= viewerW) && (Appdata.imgNH < viewerH) :
        actualW = Appdata.imgNW;
        actualH = Appdata.imgNH;
        // !VA viewerH is set in initApp, so no change to it here
        // !VA viewerH is set in initapp, so no change to that here either.
        // !VA We don't need to adjust height...but maybe we do for consistency's sake
        // this.adjustContainerHeights(Appdata);
        break;

      // The image is wider than the current viewer width but shorter than current viewer height, so resize the image based on the viewer width
      
      case (actualW > viewerW) && (actualH < viewerH) :
        // Set the image width to the current viewer
        Appdata.imgW = viewerW;
        // Get the image height from the aspect ration function
        Appdata.imgH = Math.round((1/Appdata.aspect[0]) * Appdata.imgW);
        // Set the viewerH to the imgH
        viewerH = Appdata.imgH;
        // this.adjustContainerHeights(Appdata);
        break;

      // The image is not as wide as the current viewer width, but is taller than the viewer height. Keep the image width but resize the viewer in order to display the full image height
      // !VA This might be a problem with consecutive images without page refresh
      case (actualW <= viewerW) && (actualH > viewerH) :
        // Set the viewer height and the image height to the image natural height
        viewerH = Appdata.imgH = Appdata.imgNH;
        // Set the image width to the natural image width
        Appdata.imgW = Appdata.imgNW;

        // !VA  Use adjustContainerHeights to get the Appdata height
        // !VA  Note the dependency with initAppdata, see 'Dependency with adjustContainerHeights'
        // this.adjustContainerHeights(Appdata);
        break;

      // The image is wider and taller than the current viewer height and width so we have to resize the image and the viewport based on the current viewport width
      case (actualW > viewerW) && (actualH > viewerH) :
        // Set the image Width to the current  viewer width 
        Appdata.imgW = viewerW;
        // Set the image height proportional to the new image width using the aspect ratio function
        Appdata.imgH = Math.round((1/Appdata.aspect[0]) * Appdata.imgW);
        // Set the viewer height to the image height
        viewerH = Appdata.imgH;
        // Get the viewport and Appdata height from adjustContainerHeights

        // !VA TODO: Check this out, doesn't seem to be a problem anymore: BUG Problem with the 800X550, 800X600 -- no top/bottom gutter on viewport
        break;
      }
      // !VA Transfer control to UIController to print Inspector to the UI
      resizeContainers(viewerH, Appdata.imgW, Appdata.imgH );
    }

    // !VA appController private
    function resizeContainers(viewerH, imgW, imgH)  {
      // !VA This calculates the imgViewer, imgViewport and appContainer height based on Appdata values which are passed in from resizeContainers.
      // !VA Initial height is 450, as it is defined in the CSS. TOo much hassle to try and get the value as defined in the CSS programmatically.
      // const initViewerH= parseInt(document.querySelector(dynamicRegions.imgViewer).height, 10);
      const initViewerH = 450;
      let viewportH;
      let appH; 

      // !VA I'm not even sure this is necessary since we're getting the viewerW from maxViewerHeight now -- but we'll leave it in here for the time being. 
      // !VA The viewport is 145px taller than the imgViewer. 
      if (imgH <= initViewerH) {
        viewerH = initViewerH;
        viewportH = viewerH + 145;
      } else {
        // Need a little buffer in the viewport
        viewerH = imgH;
        viewportH = imgH + 145;
      } 
      appH = viewportH;
      document.querySelector(dynamicRegions.curImg).style.width = imgW + 'px';
      document.querySelector(dynamicRegions.curImg).style.height =imgH + 'px';
      document.querySelector(dynamicRegions.imgViewer).style.height = viewerH + 'px';
      document.querySelector(dynamicRegions.imgViewport).style.height = viewportH + 'px';
      document.querySelector(dynamicRegions.appContainer).style.height = appH + 'px';;
      // !VA Now that the image and its containers are written to the DOM, go ahead and write the Inspectors.
      UICtrl.writeInspectors();
    }

    // !VA NOTE:  So this was the concept - to have the image itself be the data store, not some object. Instead of updating the data store and writing the UI from that, you update the core UI element, then recalculate the data store each time it changes. Here, there are 5 mutable elements and 5 properties. Only one of the properties has changed. So we loop through them all, find the match for the prop argument, then update only the element/data property that matches. This is a mickey-mouse solution but it works for now. Ideally we will pass in a key/value pair including the property name and the ID alias so we can use properties... in case there are more than one. 
    // !VA That concept is bad because it requires constant DOM access 05.11.20


    // !VA CCP FUNCTIONS
    // !VA appController private 
    function initCCP() {
      // !VA Get Appdata
      var Appdata = appController.initGetAppdata();
      let ccpCheckmarks, ccpCheckboxes, wrapperItemsToHide, selectedRadio;
      // !VA The app initializes with the CCP closed, so toggle it on and off here.
      document.querySelector(staticRegions.ccpContainer).classList.toggle('active');
      // !VA If the CCP is open:
      if (document.querySelector(staticRegions.ccpContainer).classList.contains('active')) {
        // !VA We have to initialize CCP DOM elements here because they don't exist until the CCP is displayed.

        // !VA CCP Checkboxes - these are mock checkboxes with custom styling, so the ID names have to be converted to checkbox names in order to select or deselect them. We attach the event handler to the checkmark, not the checkbox. The checkmark is converted to checkbox for handling in toggleCheckbox.
        ccpCheckmarks = [ ccpUserInput.spnCcpImgIncludeWidthHeightCheckmrk, ccpUserInput.spnCcpImgIncludeAnchorCheckmrk, ccpUserInput.spnCcpTableIncludeWrapperCheckmrk ];
        ccpCheckboxes = [];
        for (let i = 0; i < ccpCheckmarks.length; i++) {
          document.querySelector(ccpCheckmarks[i]).addEventListener('click', handleCCPInput, false);
        }

        // !VA Initialize with all the 'Wrapper table' options undisplayed - uncomment this for DEV
        let wrapperItemsToHide = ['#ccp-table-wrapper-class', '#ccp-table-wrapper-width', '#ccp-table-wrapper-align', '#ccp-table-wrapper-bgcolor' ]; 
        for (let i = 0; i < wrapperItemsToHide.length; i++) {
          document.querySelector(wrapperItemsToHide[i]).style.display = 'none'; 
        }

        // !VA Find out which tdoption is selected and send a click to that option to run displayTdOptions and display the appropriate attributes for that option
        selectedRadio = document.querySelector('input[name="tdoptions"]:checked');
        selectedRadio.click();

        // !VA Default for table width
        document.querySelector(ccpUserInput.iptCcpTableWidth).value = `${Appdata.imgW}`;
        // !VA Defaults for wrapper width and class
        document.querySelector(ccpUserInput.iptCcpTableWrapperWidth).value = `${Appdata.viewerW}`;
        document.querySelector(ccpUserInput.iptCcpTableWrapperClass).value = 'devicewidth';

      }
    }
      
    // !VA  appController private
    // !VA Toggle checkboxes and run any associated actions
    // !VA TODO: This function is misnamed, it only pertains to mock checkbox processing
    function handleCCPInput(event) {
      // !VA Get the Appdata for the input default value
      var data = appController.initGetAppdata();
      var chkId, checkbox;
      // !VA Toggle CCP checkboxes and run associated operations. The CSS calls for hiding the actual checkbox element and showing a span with a 'proxy' checkbox. We call it 'checkmrk' to make it easier to replace it with 'checkbox' here. 
      // !VA Array of wrapper items to be displayed if 'Include wrapper table' is checked
      var wrapperItemsToShow = [];

      // !VA With this mock checkmark structure, the clicked element is the checkmark, so we have to convert that ID to the corresponding checkbox before we can toggle it. 
      // !VA Reboot: Also have to replace the 3-char element identifier.
      chkId = event.target.id;
      chkId = chkId.replace('mrk', 'box');
      chkId = chkId.replace('spn', 'chk');
      checkbox = document.getElementById(chkId);
      checkbox.checked ? checkbox.checked = false : checkbox.checked = true;

      // !VA Now run any actions associated with the checkbox
      // !VA TODO: This value needs to be refreshed when the CCP is opened. In fact, entering new values in any of the toolButton inputs has to call a refresh of Appdata and a closing-reopening of the CCP so the values can refresh.
      
      // !VA Defaults for wrapper width and class
      document.querySelector(ccpUserInput.iptCcpTableWrapperWidth).value = `${data.viewerW}`;
      document.querySelector(ccpUserInput.iptCcpTableWrapperClass).value = 'devicewidth';
      // !VA Show wrapper table options if the checked element is 'table-include-wrapper-checkbox'
      if (checkbox.id === 'chk-ccp-table-include-wrapper-checkbox') {
        wrapperItemsToShow = ['#ccp-table-wrapper-class', '#ccp-table-wrapper-width', '#ccp-table-wrapper-align', '#ccp-table-wrapper-bgcolor' ]; 
        if (checkbox.checked) {
          for (let i = 0; i < wrapperItemsToShow.length; i++) {
            document.querySelector(wrapperItemsToShow[i]).style.display = 'block'; 
          }
        } else {
          for (let i = 0; i < wrapperItemsToShow.length; i++) {
            document.querySelector(wrapperItemsToShow[i]).style.display = 'none'; 
          }
        }
      }
    }


    // !VA Show element when input in another element is made 
    // !VA appController private
    function showElementOnInput(event) {
      // !VA Here we catch the event handlers for the CCP class input fields and show the mobile clipboard buttons when an input is made. The input event fires whenever a input element's value changes.
      var elems = [];
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
      // console.log('tooltipStrings running');
      // console.log('tooltipid is: ' + tooltipid);
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
      console.log('isolateApp running');
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
      // console.log('getAppdata running');
      var Appdata = {};
      Appdata = UIController.queryDOMElements();

      // !VA Now compute the rest of Appdat
      Appdata.aspect = getAspectRatio(Appdata.imgNW,  Appdata.imgNH);
      Appdata.sPhonesH = Math.round(Appdata.sPhonesW * (1 / Appdata.aspect[0]));
      Appdata.lPhonesH = Math.round(Appdata.lPhonesW * (1 / Appdata.aspect[0]));
      return Appdata;
    }


    // !VA appController private
    // !VA Preprocess error messages before sending them to UIController.displayAppMessages. This is where the setTimeOut for err and msg messages lives.
    function processAppMessages(appMessType, appMessContent, duration ) {
      
      console.log('preprocessAppErrs running');
      console.log('appMessType is: ' + appMessType);
      console.log('appMessContent is: ' + appMessContent);
      let appMessContainerId, appMessContainer, timer;
      // !VA 
      appMessType === 'err' ? appMessContainerId = appMessageElements.errContent : appMessContainerId = appMessageElements.msgContent; 
      appMessContainer = document.querySelector(appMessContainerId);

      // !VA Set the innerHTML of the respective appMessContainer.
      appMessContainer.innerHTML = appMessContent;
      UIController.displayAppMessages( true, appMessContainerId, false );
      

        
        
      timer = setTimeout(() => {
        // console.log('NOW');

        // !VA Read the appMessContent into the tooltip content element
        // !VA Here we call UIController.showAppMess. It needs two parameters for tooltips - the targetElement that gets the help cursor and the appMessElement that gets the appMessContent. We put the targetid at the end because it will only have a value for tooltips - for the other two message types it will be undefined.
        console.log('appMessContainerId is: ' + appMessContainerId);
        UIController.displayAppMessages(false, appMessContainerId, false );
      }, duration);


    }

    // !VA appController public functions
    return {
      // !VA Dev Mode pass-thru public functions to expose calcViewerSize and initCCP to UIController.initUI
      // !VA appController public
      initCalcViewerSize: function() {
        calcViewerSize();
      },
      // !VA appController public
      // !VA NOTE: I'm not sure why this is public here - when would initCCP have to cross modules?
      initInitCCP: function() {
        initCCP();
      },

      // !VA appController public
      // !VA APP MESSAGES START
      // !VA This is the entry point where we sort the three types of messages. We have the target id for all three types. For tooltips, we have it in the event object passed in from the event handler. For msg and err, we can't get it because handleAppMessages only takes one parameter -- either the event for tooltips or the appMessCode for msg and err. 
      // !VA So now the problem is that tooltips require the caller id because the tooltip shows on mouseenter and has to hide on mouseleave, and we need the id for the mouseleave to create the eventListener for it. So:
      // !VA Call showAppMessages with two parameters: targetid, which is either a string for tooltips or false for msg and err, and the second parameter is the appMessContent.
      handleAppMessages: function ( evt ) {
        
        console.log('handleAppMessages running');
        // console.log('appController public handleAppMessages running');
        let appMessCode, appMessType, appMessContent, duration, appMessContainerId, tooltipTarget, timer;
        // !VA Duplicate evt into appMessCode - we could just receive the event as appMessCode but it's more transparent to do it explicitly
        appMessCode = evt;
        // !VA If appMessCode is an object, then it originated in an addEventListener, so it must be a tooltip because those are the only appMessages that originate there. Parse the target id from the event and convert it to a valid appMessCode, i.e. underscores instead of hyphens.
        if (typeof(appMessCode) === 'object') { 
          // evt = appMessCode;
          tooltipTarget = '#' + evt.target.id;
          // console.log('targetid is: ' + targetid);
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
            console.log('appMessContainerId is: ' + appMessContainerId);
            UIController.displayAppMessages(false, appMessContainerId, false );
          }, duration);
        }
      },





      // !VA This is a pass-thru to access queryDOMElements (public UIController)  to get the current dimensions of the dynamic DOM elements and data attributes, and getAppdata (private appController) to calculate the non-DOM Appdata properties. We do this here because Appdata has to be queried in all three modules, so it has to be accessible in all of them, and because getAppdata needs getAspectRatio which belongs in appController.
      // !VA appController public
      initGetAppdata: function() {
        var Appdata = getAppdata();
        return Appdata;
      },

      // !VA Query whether localStorage is currently set for viewerW, sPhonesW and lPhonesW
      // !VA appController public
      getLocalStorage: function() {
        // !VA Get localStorage for viewerW here. localStorage is set in updateAppdata after the user input has been parsed for errors. 
        let arr = [], curLocalStorage = [];
        // !VA Clear localStorage for testing only.
        // localStorage.clear();
        // !VA If localStorage is set for viewerW, sPhonesW or lgPhones, add the localStorage value to curLocalStorage and return it
        arr = [ 'viewerW', 'sPhonesW', 'lPhonesW' ];
        for (let i = 0; i < arr.length; i++) {
          localStorage.getItem(arr[i]) ? curLocalStorage.push(localStorage.getItem(arr[i])) : curLocalStorage.push(false);
        }
        // console.log('curLocalStorage:');
        // console.dir(curLocalStorage);
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
          document.querySelector('.header-container').style.display = 'none';
          document.querySelector('.header-isolate-app').style.display = 'none';
          document.querySelector('.content-section').style.display = 'none';
        } 

        // !VA Hide the CCP
        document.querySelector(staticRegions.ccpContainer).classList.remove('active');
        setupEventListeners();
        
        // !VA  Test if there is currently #cur-img element with an image.If there is, it's hardcoded in the HTML and we're in DEV MODE. If there's not, the app is being initialized in USER MODE.
        var curImgExists = document.querySelector(dynamicRegions.curImg);

        if (curImgExists) {
          initMode = 'devmode';
          UICtrl.initUI();
        } else {
          initMode = 'prdmode';
          // !VA  - Initialize the app UI and wait for input
        }

        UICtrl.initUI(initMode);
      }
    };

  })(CBController, UIController);

  appController.init();

//Namespace closure
})();