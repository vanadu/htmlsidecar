// !VA REBOOT 12/29/19
// ===================
// See C:\Users\VANA\OneDrive\WhittyReview_12.30.19.docx

// !VA GENERAL NOTES
/* !VA  - June Reboot Notes
=========================================================
// !VA Branch: implementCcpInput01 (062220)

DONE: Inspector values need to be rounded to two digits -- they show the entire floating point value and overflow the container.


DONE: Add options to anchor tag: color, target="_blank" -
TODO: Change checkbox name from Wrap img... to Include anchor
TODO: BUG! Load 625X525 with viewerW set to 600 - loads without resizing to container size
TODO: Change the default parent class on 
TODO: Have a bit problem with td options height and width fields. Currently these fields are available when the 'rdoCcpTdBasic' option is selected, but there is no case when they would ever write the values the user might enter here to the clipboard. Beccause, what happens when the user enters values that are smaller than the current image resolution. That can't be possible. The TD can't be smaller than its child. The height should never be available when the child is an image and the width should either be preset to the image width or unavailable. Or it should be allowed to be larger than the child, for instance if padding is desired, but never smaller. And if you add padding, you'd add it to the img, not to the TD, right? Have to check that out before resolving this. 
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
TODO: CCP numeric input fiels need an input validator
TODO: Fix being able to resize viewerW smaller than imgW - current behavior is imgw resizes with viewerW. If that's the desired behavior, imgW still doesn't write the udpated width to Appobj, that needs to be fixed.
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
  // var testbut2 = document.querySelector('#testme2');
  var addMe = function() {
    console.log('event listener');
  };

  // var foo;
  // foo = true;

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
    function evalInspectorAlerts(Appobj) {
      // !VA init inspector and flagged inspector lists
      let allInspectors = [];
      // !VA Array to hold the flagged inspector labels
      let flaggedInspectors = [];
      // !VA Get all the Inspector labels
      allInspectors = UIController.getInspectorLabelsIDs();
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
    // !VA Not sure why I removed the tooltipTarget argument, but keeping it for reference
    // function showAppMessages(appMessContainerId, tooltipTarget) {
    function showAppMessages(appMessContainerId ) {
      // !VA Show the current appMessage. If the current appMessage is a tooltip, then show the help cursor while the mouse is in the tooltip element.
      document.querySelector(appMessContainerId).classList.add('active');
      if (!appMessContainerId.includes('tip')) {
        document.querySelector(staticRegions.appBlocker).classList.add('active');
      } 
    }

    // !VA UIController private
    // !VA Not sure why the tooltipTarget was included, but it's not referenced, so removing for now.
    // function hideAppMessages(appMessContainerId, tooltipTarget) {
    function hideAppMessages(appMessContainerId) {
      // !VA Hide current app message
      document.querySelector(staticRegions.appBlocker).classList.remove('active');
      document.querySelector(appMessContainerId).classList.remove('active');
    }

    // !VA UIController private
    // !VA TODO: Determine final location for getAspectRatio
    // !VA Calc the apsect ratio - putting this here for now until it's decided where it needs to live. It's currently needed in appController for Appd... but can live in UIController private once Appd... is deprecated.
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

    // !VA CCP FUNCTIONS
    // !VA --------------------
    // !VA UIController private
    // !VA Apply/remove disabled-radio and disabled style to radio button element and its label. Called from UIController public handleCcpActions. Flag is the boolean indicating whether to apply or remove the styles. Called from handleCcpActions (UIController public).
    function setCcpDisabledRadio(flag, elementAlias ) {
      // console.log('setCcpDisabledRadio running');
      let elementLabel;
      // !VA The element label must have a disabled style too, so append -label to the alias to select it.
      elementLabel = ccpUserInput[elementAlias] +  '-label';
      // !VA If the Appobj property rdoCcpImgFluid is true, then the rdoCcpImgFluid radio is selected, so apply the disabled styles and disabled attribute
      if (flag ) {
        // !VA Apply the disabled styles to the elements
        document.querySelector(ccpUserInput[elementAlias]).disabled = true;
        document.querySelector(elementLabel).classList.add('disabled');
        document.querySelector(ccpUserInput[elementAlias]).classList.add('disabled-radio');
      } else {
        // !VA The fluid radio button is not selected, so remove the disabled styles and the disabled attribute
        document.querySelector(ccpUserInput[elementAlias]).disabled = false;
        document.querySelector(elementLabel).classList.remove('disabled');
        document.querySelector(ccpUserInput[elementAlias]).classList.remove('disabled-radio');
      }
    }

    // !VA UIController private
    // !VA Apply the active class to the parent element of the element with the passed identifier. The identifier corresponds to the Appobj property name. Called from handleCcpActions (UIController public).
    function setCcpActiveParentClass(flag, elementAlias) {
      // console.log('setActiveParentClass running');
      // console.log('flag is: ' + flag);
      // console.log('elementAlias is: ' + elementAlias);
      // !VA Build the parent div id from the elementAlias
      let parentDivId;
      // !VA Get the ID of the parent div of the target element.
      function getParentDiv(elementAlias) {
        parentDivId = '#' + ccpUserInput[elementAlias].substring( 5 );
        // !VA Not necessary to return it since it's scoped to the parent function.
        // return parentDivId;
      }
      getParentDiv(elementAlias);
      // !VA Add or remove the active class based on the flag value
      if (flag === true ) {
        document.querySelector(parentDivId).classList.add('active');
      }   else if (flag === false ) {
        document.querySelector(parentDivId).classList.remove('active');
      } else {
        console.log('ERROR in setCcpActiveParentClass: unknown condition');
      }
    }

    // !VA UIController private
    // !VA Apply the active class to an element. elementAlias is the identifier corresponding to Appobj/ccpUserInput property name. Called from handleCcpActions (UIController public).
    function setCcpActiveClass(elementAlias) {
      // console.log('setCcpActiveClass running');
      // console.log('ccpUserInput[elementAlias] is: ' + ccpUserInput[elementAlias]);
      // !VA NOTE: Not sure why I removed this if condition and not sure if I should restore it
      // if (!document.querySelector(ccpUserInput[elementAlias]).classList.contains('active')) {
      document.querySelector(ccpUserInput[elementAlias]).classList.add('active');
      // } else {
      //   document.querySelector(ccpUserInput[elementAlias]).classList.remove('active');
      // }
    }

    // !VA UIController private
    // !VA Add/remove the disabled class to a text input element and its label, and set/unset the disabled attribute of the input element. elementAlias is the identifier corresponding to Appobj/ccpUserInput property name. Called from handleCcpActions (UIController public).
    function setDisabledTextInput( flag, elementAlias ) {
      // console.log('setDisabledTextInput running');
      // console.log('elementAlias is: ' + elementAlias);
      // console.log('flag is: ' + flag );
      let elementLabel;
      elementLabel = ccpUserInput[elementAlias] + '-label';
      // console.log('elementLabel is: ' + elementLabel);
      // !VA Add/remove the disabled class and set/unset the disabled attribute based on the flag value
      if (flag) {
        document.querySelector(elementLabel).classList.add('disabled');
        document.querySelector(ccpUserInput[elementAlias]).disabled = true;
        document.querySelector(ccpUserInput[elementAlias]).classList.add('disabled');
      } else {
        document.querySelector(elementLabel).classList.remove('disabled');
        document.querySelector(ccpUserInput[elementAlias]).disabled = false;
        document.querySelector(ccpUserInput[elementAlias]).classList.remove('disabled');
      }
    }


    // !VA UIController private
    // !VA Check/uncheck a checkbox based on the true/false flag argument.  elementAlias is the identifier corresponding to Appobj/ccpUserInput property name. Called from handleCcpActions (UIController public). IMPORTANT: This function applies/removes the checked property to the actual DOM HTML input checkbox element. The corresponding Appobj property is set in appController handleTdOptions, and handleImgType
    function setCcpCheckbox( flag, elementAlias ) {
      // console.log('setCcpCheckbox running');
      // console.log('elementAlias is: ' + elementAlias);
      // console.log('flag is: ' + flag);
      let chkId, checkbox;
      chkId = ccpUserInput[elementAlias];
      chkId = chkId.replace('mrk', 'box');
      chkId = chkId.replace('spn', 'chk');
      checkbox = document.querySelector(chkId);
      flag === true ? checkbox.checked = true : checkbox.checked = false;
    }

    // !VA UIController private
    // !VA Disable/enable a mock checkbox based on the true/false flag argument. elementAlias is the identifier corresponding to Appobj/ccpUserInput property name. Called from handleCcpActions. IMPORTANT: This function applies/removes the disabled and disable-checkbox class to the SPAN mock checkbox only based on the flag switch. The actual DOM HTML checkbox input element never receives the disabled attribute. Instead, the mock checkbox is enabled/disabled by applying/removing the pointer-events CSS style. Since the actual HTML input element is hidden, applying the disabled attribute to it is irrelevant. However, the the pointer-events might not affect keyboard input, so it might still be possible to enable/disable the mock checkbox via the keyboard, that needs to be tested.
    function setCcpDisabledCheckbox( flag, elementAlias ) {
      // console.log('setCcpDisabledCheckbox running');
      // console.log('elementAlias is: ' + elementAlias);
      // console.log('flag is: ' + flag);
      let chkId, chkIdLabel, checkbox, checkboxLabel;
      // !VA Convert the mrk identifier string in the span element to chk
      chkId = ccpUserInput[elementAlias];
      chkId = chkId.replace('mrk', 'box');
      chkId = chkId.replace('spn', 'chk');
      // !VA Add the -label suffix to the converted id string to get the id of the label element
      chkIdLabel = chkId + '-label';
      // console.log('chkIdLabel is: ' + chkIdLabel);
      // !VA checkbox is the mock checkbox - the actual HTML checkbox is hidden.
      checkbox = document.querySelector(ccpUserInput[elementAlias]);
      checkboxLabel = document.querySelector(chkIdLabel);
      if (flag) {
        // !VA Add the disabled class to the checkbox label and turn off pointer-events for the mock checkbox. Pointer-events is set in the CSS
        checkboxLabel.classList.add('disabled');
        checkbox.classList.add('disable-checkbox');
      } else {
        // !VA Remove the disabled class from the checkbox label and turn on pointer-events for the mock checkbox. Pointer-events is set in the CSS
        checkboxLabel.classList.remove('disabled');
        checkbox.classList.remove('disable-checkbox');
      }
    }

    // !VA UIController private
    // !VA Select a radio button based on the true/false flag argument. elementAlias is the identifier corresponding to Appobj/ccpUserInput property name. Called from handleCcpActions. 
    function selectCcpRadio(flag, elementAlias) {
      // console.log('selectCcpRadio running');
      // console.log('flag is: ' + flag);
      // console.log('elementAlias is: ' + elementAlias);
      let radio;
      radio = document.querySelector(ccpUserInput[elementAlias]);
      flag === true ? radio.checked = true : radio.checked = false;
    }
    // !VA END CCP FUNCTIONS

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
        if (initMode === 'devmode') {
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
            // !VA For devmode, we need to write fname to the DOM now and then add it to Appobj at the top of writeInspectors. 
            document.querySelector(inspectorElements.insFilename).textContent = fname;
            // !VA Initialze calcViewerSize to size the image to the app container areas
            // !VA Branch: implementCcpInput01 (062120)
            // !VA The true flag indicates that this is an image initialization action, not a user-initiated Toolbar input
            appController.initCalcViewerSize();

            // !VA Open the CCP by default in dev mode
            // !VA First, set it to the opposite of how you want to start it.
            // !VA Branch: implementCcpInput05 (062720)
            document.querySelector(staticRegions.ccpContainer).classList.add('active');
            // !VA The return variable isn't used, but keeping it for reference
            // var ccpState = UIController.toggleCcp();'
            // !VA Branch: implementCcpInput05 (062720)
            // UIController.toggleCcp();
            // appController.initCcp();
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


        // !VA Inspector initialization comes now from the HTML file. The default 'No Image' is display: inline in CSS. When an image is loaded, inspectors are populated with values in UIController.writeInspectors.
        // !VA Branch: implementCcpInput05 (062720)
        // !VA INitialize the CCP
        // appController.initCcp();
      },


      // !VA UIController public
      // !VA This is where the DOM write in evalToolbarInputs and updateAppObj used to happen
      // !VA Write dimensions of dynamicRegions.curImg, dynamicRegions.imgViewer and the height of dynamicRegions.imgViewport and dynamicRegions.appContainer. Width of dynamicRegions.imgViewport and dynamicRegions.appContainer is static and is sized to the actual application area width.
      writeDynamicRegionsDOM: function(Appobj, viewportH, appH) {
        // console.log('writeDynamicRegionsDOM running');
        // console.log('writeDynamicRegionsDOM Appobj is: ');
        // console.log(Appobj);

        // !VA TODO: Make function
        document.querySelector(dynamicRegions.imgViewer).style.width = Appobj.viewerW + 'px';
        document.querySelector(dynamicRegions.curImg).style.width = Appobj.imgW + 'px';
        document.querySelector(dynamicRegions.curImg).style.height = Appobj.imgH + 'px';
        document.querySelector(dynamicRegions.imgViewer).style.height = Appobj.viewerH + 'px';
        document.querySelector(dynamicRegions.imgViewport).style.height = viewportH + 'px';
        document.querySelector(dynamicRegions.appContainer).style.height = appH + 'px';

      }, 

      // !VA UIController public 
      // !VA Writes Appobj values to the CCP DOM based on parameters: Appobj, and an array of rest parameters from the appController Appobj handler. The rest parameter arrays contain key/value arrays with the identifier corresponding to the appObj/ccpUserInput key and a string identifying the action to perform. This facilitates making multiple DOM accesses based on only one cross-module call to Appobj.
      // !VA NOTE: I don't like that AppobjMap is passed as a parameter with every loop iteration. I need to think about whether that is fixable, but it works and is pretty fast for now.
      handleCcpActions: function (flag, ...args) {
        // console.log('handleCcpActions running');
        // console.log('handleCcpActions Appobj: ');
        // console.dir(Appobj);
        // console.log('args is: ');
        // console.log(args);
        // console.log('flag is: ' + flag);
        // !VA Loop through all the rest parameter arrays. [1] is the string identifying the action to perform. [0] is the appObj/ccpUserInput key. Based on the condition defined by the action identifier, executed the appropriate function for each of the items in the rest parameter array. 
        for (let i = 0; i < args.length; i++) {
          // console.log('args[i] is: ' +  args[i]);
          switch(true) {
          // !VA Route the arguments to the function indicated in the action identifier, i.e. the second item in the args array.
          case args[i][1] === 'selectradio':
            selectCcpRadio(flag, args[i][0]);
            break;
          case args[i][1] === 'setdisabledradio':
            setCcpDisabledRadio(flag, args[i][0] );
            break;
          case args[i][1] === 'setactiveparent':
            setCcpActiveParentClass(flag, args[i][0]);
            break;
          case args[i][1] === 'setactiveclass':
            setCcpActiveClass(args[i][0]);
            break;
          case args[i][1] === 'setcheckbox':
            setCcpCheckbox( flag, args[i][0] );
            break;
          case args[i][1] === 'setdisabledtextinput':
            setDisabledTextInput( flag, args[i][0] );
            break;
          case args[i][1] === 'setdisabledcheckbox':
            // !VA The flag here relates to the fluid/fixed Appobj property, not the property of the element in args[i][1], so get the state of the fluid radio button from the DOM
            flag = document.querySelector(ccpUserInput.rdoCcpImgFluid).checked;
            setCcpDisabledCheckbox( flag, args[i][0] );
            break;
          default:
            // code block
            console.log('ERROR in handleCcpActions - case not defined');
          } 
        }
      },

      // !VA UIController public 
      // !VA This function writes individual values directly to the DOM. Called by resizeContainers to set dynamicRegions DOM values on initialization and toolbar input. Called by resetTdOptions, handleTdOptions, handleImgType to set CCP DOM element values. args is a rest parameter list of key/value arrays, whereby the key is the alias of the element to write to and value value to write. 
      // !VA TODO: Find a more descriptive name for this.
      writeAppobjToDOM: function (...args) {
        console.log('writeAppobjToDOM');
        // !VA Loop throught the list of args, determine what type of element it is from the three-character element prefix and perform the appropriate action.    
        for (let i = 0; i < args.length; i++) {
          if (args[i][0].substring( 0 , 3) === 'ipt') {
            // !VA Write the values for the input elements. [0] is the element ID and [1] is the element value. 
            // !VA NOTE: Separate conditions for different element types here - need to prune the ones that aren't necessary
            document.querySelector(ccpUserInput[args[i][0]]).value = args[i][1];
          } else if (args[i][0].substring( 0 , 3) === 'rdo') {
            console.log('ERROR in writeAppobjToDOM - radio button not handled ');
          } else if (args[i][0].substring( 0 , 3) === 'sel') {
            // !VA NOTE: THis is the same as the 'ipt' condition
            document.querySelector(ccpUserInput[args[i][0]]).value = args[i][1];
          } else if (args[i][0].substring( 0 , 3) === 'spn') {
            console.log('ERROR in writeAppobjToDOM - span mock checkbox not handled');
          }
        }

      },




      // !VA UIController public
      // !VA Stash arrays of key/value pairs.
      // !VA TODO: This is not yet implemented and may never be, but leaving it here for now.
      stashAppobjProperties: function(flag, ...args) {
        console.log('stashAppobjProperties');
        console.log('flag is: ' + flag);
        for (let i = 0; i < args.length; i++) {
          console.log('args[i][0] is: ');
          console.log(args[i][0]);
          console.log('args[i][1] is: ');
          console.log(args[i][1]);
          document.querySelector(args[i][0]).placeholder = args[i][1];
        }
      },

      // !VA UIController public
      // !VA Takes one of three parameters: 'app', 'ccp' and 'all'. Called from calcViewerSize and initCcp. When called from calcViewerSize, the isUpdate condition determines whether populateAppobj is run - if isUpdate is not true, then there are no existing Appobj values for dynamicRegions, so populateAppobj with the app parameter initializes Appobj values by running populateAppProperties. When the CCP is opened, populateAppobj reads CCP DOM values into Appobj so that Appobj always reflects the current state of the CCP DOM when the CCP is opened. 
      populateAppobj: function (Appobj, access) {
        // !VA IIFE for populating 
        // let Appobj = {};
        // !VA cStyles is deprecated because we're using literal values instead of getting the computed CSS values stored in CSS, but keeping for reference. Using localStorage now, so don't need to get hard values from CSS.
        // let curImg, imgViewer, cStyles;
        let curImg, curLocalStorage;
        // !VA Get the values for the dynamicRegions
        // !VA Get the curImg and imgViewer
        // !VA Branch: implementAppobj02 (060620)
        // console.log('access is: ' + access);
        // !VA TODO: Move to external if appropriate or delete if unneeded 
        function chkmrkToChkbox(val) {
          val = val.replace('mrk', 'box');
          val = val.replace('spn', 'chk');
          return val;
        }
        function populateAppProperties(Appobj) {
          // !VA Get the current image
          curImg = document.querySelector(dynamicRegions.curImg);
          // !VA Branch: implementCcpInput01 (062120)
          // !VA Set the viewerW value based on localStorage  If the user has set this value in the toolbar before, then queried from localStorage. That value persists between sessions. If this is the initial use of the app, then viewerW is explitly set to 650. 
          curLocalStorage = appController.getLocalStorage();
          if (curLocalStorage[0]) {
            // !VA Set Appobj.viewerW to the localStorage value
            // !VA TODO: See why localStorage is stored as string - it's requiring us to convert to integer here.
            Appobj.viewerW = parseInt(curLocalStorage[0]); 
          } else {
            // !VA If no localStorage for viewerW exists, use this default
            // !VA NOTE: Isn't this supposed to be set in the placeholder value toolbarElements.iptTbrViewerW?
            Appobj.viewerW = 650;
          }

          // !VA Get the dimensions of curImg and write them to Appobj
          Appobj.imgW = curImg.width;
          Appobj.imgH = curImg.height;
          Appobj.imgNW = curImg.naturalWidth;
          Appobj.imgNH = curImg.naturalHeight;
          
          // !VA Get the Appobj properties for iptTbrSmallPhonesW and sPhonesH
          // !VA TODO: The default here is still coming from the data- attribute. It should be either the default, which comes from the placeholder in the HTML DOM element, or from localStorage. This needs to be addressed - there's no need to get the default from the data attribute, and I'm It appears the default is coming from the placeholder now rather than the data attribute - so there's probably no point in writing data attributes at all. Get rid of it completely in the next implementation. It appears here that Appobj.sPhonesW still accesses the data-attribute when it should be accessing the placeholder. This is actually a problem in initUI: there the viewerW, sPhoneW and lPhoneW values are writting from localStorage of from the placeholder default to the data-... attributes, which is not necessary. Data attributes were only used because I didn't have a localStorage solution, but now that I do, the data-... attributes are unnecessary. They all need to be deprecated. For later...
          Appobj.sPhonesW = parseInt(document.querySelector(toolbarElements.iptTbrSPhonesWidth).getAttribute('data-sphonesw'), 10);
          Appobj.lPhonesW = parseInt(document.querySelector(toolbarElements.iptTbrLPhonesWidth).getAttribute('data-lphonesw'), 10);
          Appobj.iptTbrSPhonesWidth ? Appobj.iptTbrSPhonesWidth : Appobj.iptTbrSPhonesWidth = parseInt(document.querySelector(toolbarElements.iptTbrSPhonesWidth).placeholder, 10);
          Appobj.iptTbrLPhonesWidth ? Appobj.iptTbrLPhonesWidth : Appobj.iptTbrLPhonesWidth = parseInt(document.querySelector(toolbarElements.iptTbrLPhonesWidth).placeholder, 10);
          // !VA Now compute the rest of Appobj
          // !VA TODO: Determine the final location of getAspectRatio - it is now duplicated here and in appController.
          Appobj.aspect = getAspectRatio(Appobj.imgNW,  Appobj.imgNH);
          Appobj.sPhonesH = Math.round(Appobj.sPhonesW * (1 / Appobj.aspect[0]));
          Appobj.lPhonesH = Math.round(Appobj.lPhonesW * (1 / Appobj.aspect[0]));

        }
        function populateCcpProperties(Appobj) {
          // !VA Now initialize Appobj with the CCP element values. This includes ALL CCP elements, including those that are displayed/undisplayed depending on which TDOption or imgType radio is selected. 
          // !VA Don't forget to use bracket notation to add properties to an object: https://stackoverflow.com/questions/1184123/is-it-possible-to-add-dynamically-named-properties-to-javascript-object
          // !VA  for loop: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries

          let checkboxId;
          // !VA TODO:  Created an styCcpTableWrapperStyle property with the value ''. This is a placeholder for the max-width style property which is only used in handleImgType if the image type is fluid. There is no correspondent for this in the CCP DOM - need to determine if this extra Appobj property is necessary.
          Appobj.styCcpTableWrapperStyle = '';
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
              // !VA For mock checkboxes, first get the actual HTML checkbox into checkboxId. 'value' is the mock checkbox span id
              checkboxId = chkmrkToChkbox(value);
              // !VA The actual HTML checkbox input will return a checked attribute of true or false. Convert that to 'on' or 'off' for the Appobj mock checkbox span property.
              document.querySelector(checkboxId).checked ? Appobj[key] = 'on' : Appobj[key] = 'off';
            }
          }
        }

        if ( access === 'app') {
        // !VA Write only dynamic region values 
          populateAppProperties(Appobj);
        } else if ( access === 'ccp') {
        // !VA Write only CCP values 
          populateCcpProperties(Appobj);
          // !VA Write all values
        } else if ( access === 'all' ) {
          populateAppProperties(Appobj);
          populateCcpProperties(Appobj);
        } else {
          console.log('Error in populateAppobj: unknown argument - access');
        }
        return Appobj;
      },

      // !VA UIController public
      // !VA The toggle argument is a boolean flag to indicate whether to actually toggle the CCP on and off or just to return the state. Don't forget that Appobj doesn't exist here, so don't try to log it. True means toggle it, false means just return the state
      toggleCcp: function(toggle) {
        // !VA NOTE: All this does now is toggle the CCP on and off or return the toggle state
        let ccpState;
        // !VA If the toggle argument is true, toggle the CCP on and off
        if (toggle) {
          document.querySelector(staticRegions.ccpContainer).classList.toggle('active');
        }
        // !VA If the CCP is displayed, return true, otherwise false
        document.querySelector(staticRegions.ccpContainer).classList.contains('active') ? ccpState = true : ccpState = false;
        return ccpState;
      },

      // !VA UIController public
      // !VA This has to cancel the timeouts for the runmn
      displayAppMessages: function (isShow, appMessContainerId, tooltipTarget) {
        // !VA Pass-thur public function to pass display actions to the UIController. If isShow is true, call showAppMessages. If it's false, call hideAppMessages. NOTE: the tooltip appMessage is undisplayed in 
        isShow ? showAppMessages(appMessContainerId, tooltipTarget) : hideAppMessages(appMessContainerId, tooltipTarget);
      },


      // !VA UIController public
      writeInspectors: function(Appobj) {
        // !VA Hide  the default 'No Image' value displayed when the app is opened with no image and display the Inspector values for the current image, show the Clipboard button and call evalInspectorAlerts to determine which Inspector labels should get dimension alerts (red font applied). 

        // !VA IMPORTANT - this is a devmode hack. The fileName has already been written to inspectorElements.insFilename in initUI devmode. So now we have to write it to Appobj, otherwise it will be undefined it gets written to the innerHTML below. This should probably be dependent on whether we're in devmode or not, but this works in any case and can be deleted for production. 
        Appobj.fileName = document.querySelector(inspectorElements.insFilename).textContent;


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

        // !VA Branch: implementAppobj08 (062020)
        // !VA NOTE: This can all be moved to a UIController public function like handleCcpActions
        // !VA Display the respective Appobj value in the respective inspector element 
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
        // !VA Call evalInspectorAlerts with the Appobj argument to calculate which Inspector values don't meet HTML email specs.
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
      var Appobj = {};
      // !VA Branch: implementCcpInput02 (062420)
      // !VA We don't need the entire Appobj here. What we should do is call rest parameters on what we need and then destructure the return array into separate variables. This needs to be done when getAttributes is reevaluated since there appears to be a lot of unnecessary DOM access here.
      Appobj = appController.getAppobj();
      console.log('getAttributes Appobj: ');
      console.log(Appobj);
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
        // !VA Branch: implementAppobj08 (062020)
        // !VA imgType is now integrated into Appobj, so this logic is deprecated here. Leaving it for the time being but pretty sure this entire Attribute is no longer pertinent.
        imgType:  (function() {
          // !VA This value is written to CCP so we can pre-select the tdoption 'rdoCcpTdBasic' if the imgType 'fluid' is selected. 
          // !VA If the fixed radio button is checked, set ccpElementId to the fixed element id. Otherwise, set ccpEcurvcurlementId to the fluid element id. 
          document.querySelector(ccpUserInput.rdoCcpImgFixed).checked ? ccpElementId = ccpUserInput.rdoCcpImgFixed : ccpElementId = ccpUserInput.rdoCcpImgFluid;
          // !VA Now get the str based on the above
          ccpElementId === ccpUserInput.rdoCcpImgFixed ? str = 'fixed' : str = 'fluid';
          // !VA Locally, we need a variable for the imgType, so create one.
          imgType = str;
          retObj = returnObject(ccpElementId, str);
          console.log('imgType retObj: ');
          console.dir(retObj);
          return retObj;
        })(),
        imgClass: (function() {
          // !VA For fixed images, if there's a class name entered into the class input: return the input value, or if the class input is empty, don't include the class attribute. For fluid images, return the class name 'img-fluid'.


          
          // !VA This value is written to CCP so use ccpElementId
          ccpElementId = ccpUserInput.iptCcpImgClass;
          // !VA Branch: implementAppobj08 (062020)
          // !VA Just get the Appobj value here now.
          // imgType === 'fixed' ? str = ccpGetAttValue('class',document.querySelector(ccpElementId).value) : str = 'img-fluid';
          str = Appobj.iptCcpImgClass;
          retObj = returnObject(ccpElementId, str);
          return retObj;
        })(),
        imgWidth: (function() {
          // !VA This value is get-only
          ccpElementId = false;
          retObj = returnObject(ccpElementId, Appobj.imgW);
          return retObj;
        })(),
        imgHeight: (function() {
          // !VA This value is get-only
          ccpElementId = false;
          retObj = returnObject(ccpElementId, Appobj.imgH);
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
          imgType === 'fixed' ? str = `display: block; width: ${Appobj.imgW}px; height: ${Appobj.imgH}px; font-family: Arial, sans-serif; font-size: 16px; line-height: 15px; text-decoration: none; border: none; outline: none;` : str = 'display: block; font-family: Arial, sans-serif; font-size: 16px; line-height: 15px; text-decoration: none; border: none; outline: none;';
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
        // !VA TD Width and height from Appobj = imgW and imgW -- only used for Stig's BG image
        tdAppobjWidth: (function() {
          // !VA This value is get-only.
          ccpElementId = false;
          retObj = returnObject( ccpElementId, Appobj.imgW );
          return retObj;
        })(),
        tdAppobjHeight: (function() {
          // !VA This value is get-only.
          ccpElementId = false;
          retObj = returnObject( ccpElementId, Appobj.imgH );
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
            document.querySelector(ccpUserInput.iptCcpTableWidth).value = Appobj.imgW;
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
          retObj = returnObject( ccpElementId, document.querySelector(ccpUserInput.iptCcpImgRelPath).value + '/' + (Appobj.fname) );
          return retObj;
        })(),
        // !VA TABLE attributes
        tableClass: (function() {
          // !VA This value depends on the status of the Fixed/Fluid image radio button, so use ccpElementId
          ccpElementId = ccpUserInput.iptCcpTableClass;
          if (imgType === 'fixed') {
            // !VA If imgType is fixed, then set tableClass to 'devicewidth' if the imgW equals the viewerW. Otherwise, set it to the user input.
            document.querySelector(ccpElementId).value === Appobj.viewerW ? str = 'devicewidth' : 
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
          imgType === 'fixed' ? str = Appobj.imgW : str = '100%';
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
          imgType === 'fixed' ? str = Appobj.viewerW : str = '100%';
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
          imgType === 'fixed' ? str = '' : str = `max-width: ${Appobj.imgW}`;
          retObj = returnObject( ccpElementId, str );
          return retObj;
        })(),
      };
      // console.log('getAttributes Attributes: ');
      // console.dir(Attributes);
      // !VA Return the Attributes defined above. 
      return Attributes;
    }

    // !VA CBController private
    // !VA Branch: implementCcpInput05 (062720)
    // !VA Called multiple times from getAttributes
    function ccpGetAttValue(att, value) {
      console.log('ccpGetAttValue running');
      // !VA Branch: implementCcpInput02 (062420)

      // !VA Gets the insFilename from Appobj in case the user leaves 'path' empty
      // var Appobj = appController.getAppobj();
      // !VA Branch: implementCcpInput02 (062420)

      let fileName;
      // !VA Branch: implementCcpInput05 (062720)
      // !VA Not sure this call to Appobj is necessary
      fileName = appController.getAppobj('fileName');
      // fileName = appController.getAppobj2('fileName');

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
          str = `${att}="${fileName}" `;
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
      // !VA We need get the insFilename from Appobj in case the user leaves 'path' empty
      let fileName;
      // !VA Branch: implementCcpInput05 (062720)
      // !VA Called multiple times from getAttributes because if the filename...why?
      console.log('ccpIfNoUserInput calling getAppobj');
      fileName = appController.getAppobj('fileName');
      var str;
      // !VA If there is an entry in the user entry field element, include the attribute string in the clipboard output. 
      if (value && att) {
        // !VA I might want to change this to include the # in the string itself.
        value === '#' ? str = '' : str = value;

      } else {
        // !VA If the path field is empty, we need to return the insFilename without the path.
        if (att === 'src' && value === '' ) {
          str = `${att}="${fileName}" `;
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

    // !VA CBController private
    // !VA Getting the selected TD option from Appobj should be an external function, since this logic is repeated in batchAppobjToDOM and possibly elsewhere. No, because 1) batchAppobjToDOM is in appController and would require crossing modules and 2) batchAppobjToDOM returns the ccpUserInput property name corresponding to the selected Td option, not the td option itself.
    // !VA Branch: implementCcpInput02 (062420)
    // !VA Returns the selected TD option from Appobj as a element alias string, i.e. rdoCcpTdBasic. 
    function getSelectedTdOptionFromAppobj() {
      let arr, selectedTdOption;
      let Appobj;
      Appobj = appController.getAppobj();
      // !VA arr is array of Appobj keys
      arr = Object.keys(Appobj);
      // !VA If the first 8 characters of the Appobj property name is rdoCcpTd, then loop through the property names and find the one whose value is true. That is the selected tdoptions radio button, so return it.
      for (let i = 0; i < arr.length; i++) {
        // !VA TODO: Make this an arrow function with find, like below
        // var ret = Object.keys(IDtoProp).find(key => IDtoProp[key] === str);
        if (arr[i].substring( 0, 8) === 'rdoCcpTd') {
          // !VA If the Appobj key string === true, then that is the selected radio button
          if ( Appobj[arr[i]] === true) { selectedTdOption = arr[i]; }
        }
      }
      return selectedTdOption;
    }


    // !VA Get a checkbox state from the Appobj property for the mock checkbox.
    function getCheckboxState(identifier) {
      let bool;
      // !VA If the Appobj property for the mock checkbox span specified in 'identifier' is 'on', return true, otherwise false
      appController.getAppobj(identifier) === 'on' ? bool = true : bool = false;
      return bool;
    }

    // !VA Build the subset of nodes that will be populated with indents and output to the Clipboard. NOTE: outputNL can't be a fragment because fragments don't support insertAdjacentHMTL). So we have to create a documentFragment that contains all the nodes to be output, then append them to a container div 'outputNL', then do further processing on the container div.
    // !VA CBController private
    function buildOutputNodeList( id ) {
      console.log('buildOutputNodeList id is: ' + id);
      // !VA Branch: implementCcpInput03 (062520)
      let selectedTdOption, hasAnchor, hasWrapper, Attributes, tableNodeFragment, nl, frag, outputNL, clipboardStr;
      // !VA Get the selected TD option
      selectedTdOption = getSelectedTdOptionFromAppobj();
      // !VA Query Appobj for the Include anchor checkbox state: true = checked, false = unchecked
      hasAnchor = getCheckboxState('spnCcpImgIncludeAnchorCheckmrk');
      // !VA Query Appobj for the Include wrapper checkbox state: true = checked, false = unchecked
      hasWrapper = getCheckboxState('spnCcpTableIncludeWrapperCheckmrk');
      // !VA Get the Attributes from which Clipboard strings are built
      Attributes = getAttributes();
      // !VA Get the top node, i.e. tableNodeFragment. 
      tableNodeFragment = makeTableNode( id, Attributes );
      // !VA Create the full nodeList from the tableNodeFragment. If tableNodeFragment is null, return to abort without creating Clipboard object.
      try {
        nl = tableNodeFragment.querySelectorAll('*');
      } catch (e) {
        console.log('Error in buildOutputNodeList: tableNodeFragment is null. Aborting...');
        return;
      }
      // !VA Create the div container to which the extracted nodeList fragment will be appended
      var container = document.createElement('div');
      // !VA Handle the active tdoptions radio selection for the options that do NOT include an MS conditional code block. These options don't require special indent handling or post-processing of the clipboard output string, so extract the outputNL accordingly
      if (selectedTdOption === 'rdoCcpTdBasic' || selectedTdOption === 'rdoCcpTdExcludeimg' || selectedTdOption === 'rdoCcpTdPosswitch') {
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
        // !VA btnCcpMakeImgTag is clicked. We can hardcode the index where the extraction begins because the imgNode is created in makeTdNode and the btnCcpMakeImgTag button click overrides any other makeNode button actions. 
        case ( '#' + id === btnCcpMakeClips.btnCcpMakeImgTag):
          // !VA If hasAnchor === true then the checkbox is checked, so take the last two (i.e. A and IMG) nodes, otherwise just take the last (i.e. IMG) node.
          hasAnchor ? frag = nl[nl.length - 2] : frag = nl[nl.length - 1]; 
          break;
        // !VA btnCcpMakeTdTag is clicked. Here we handle the 'rdoCcpTdBasic', 'rdoCcpTdExcludeimg' and 'rdoCcpTdPosswitch' options because they process indents with no modifications. 'rdoCcpTdImgswap', 'rdoCcpTdBgimage' and 'rdoCcpTdVmlbutton' options are handled separately because they import comment nodes with MS conditional code
        case ( '#' + id === btnCcpMakeClips.btnCcpMakeTdTag):
          // !VA basic option is selected 
          if ( selectedTdOption === 'rdoCcpTdBasic') { 
            // !VA We can hardcode this for now, but that will be a problem if any other options with other nodes are added.
            hasAnchor ? extractPos = nl.length - 3 : extractPos = nl.length - 2;
            // frag = nl[extractPos];
          } else if ( selectedTdOption === 'rdoCcpTdExcludeimg') {
            extractPos = 5;
            // !VA posswitch option is selected
          } else {
            // !VA The fragment is extracted starting at the position of the RTL node
            extractPos = rtlNodePos;
          }
          frag = nl[extractPos];
          break;
        // !VA Target id is MakeTableTag button
        case ( '#' + id === btnCcpMakeClips.btnCcpMakeTableTag):
          // !VA basic or excludeimg option is selected 
          // !VA We can hardcode the 'rdoCcpTdBasic' and 'rdoCcpTdPosswitch' positions for now, but these will have to be revisited if any new options are added that change the outputNL indices. 
          if (hasWrapper) {
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
        applyIndents( id, outputNL );
        clipboardStr = outputNL[0].outerHTML;

      // !VA These options include MS conditional code retrieved by getImgSwapBlock, getBgimageBlock, getVMLBlock which includes getIndent functions. First, run applyIndents on outputNL. applyIndents also inserts tokens at the position where the codeBlock is to be inserted. The parent nodelist is converted to a string, the code blocks are retrieved, indents are inserted, and finally the codeblocks are inserted into the string between the tags of the last node in the outputNL.outerHTML string. 

      } else if (selectedTdOption === 'rdoCcpTdImgswap' || selectedTdOption  === 'rdoCcpTdBgimage' || selectedTdOption === 'rdoCcpTdVmlbutton') {
        // !VA Start with the btnCcpMakeTdTag makeNode button because the img makeNode button isn't referenced in the imgswap option. The A/IMG tags are hard-coded into the MS Conditional code in getImgSwapBlock. Also, there's a switch to include/exclude the A/IMG node in makeTdNode.
        // !VA extractNodeIndex is the nl index position at which the nodes are extracted to build outputNL. It equals the nodeList length minus the indentLevel.
        let extractNodeIndex;
        // !VA indentLevel is the number of indents passed to getIndent.
        let indentLevel;
        // !VA codeBlock is the MS conditional code block returned as string
        let codeBlock;
        // !VA If the makeTD button is clicked, then only the last node in nl is extracted and the MS conditional comments get one indent level
        // !VA NOTE: This code is repeated above in the if clause and again here in the else

        if ( '#' + id === btnCcpMakeClips.btnCcpMakeTdTag) {
          indentLevel = 1;
          extractNodeIndex = nl.length - indentLevel;
        } else {
          if (hasWrapper) {
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

        applyIndents(id, outputNL);
        // !VA Convert outputNL to a string (including tokens for inserting MS conditional code) for output to Clipboard object.
        clipboardStr = outputNL[0].outerHTML;
        // !VA Get the codeBlock corresponding to the selected TD option
        if ( selectedTdOption === 'rdoCcpTdImgswap') {
          codeBlock = getImgSwapBlock( id, indentLevel, Attributes);
        } else if (  selectedTdOption === 'rdoCcpTdBgimage' ) {
          codeBlock = getBgimageBlock(id, indentLevel, Attributes);
        } else if (selectedTdOption === 'rdoCcpTdVmlbutton') {
          codeBlock = getVmlButtonBlock(id, indentLevel, Attributes);
        }
        // !VA Replace the tokens in clipboardStr that were added in applyIndents with the respective codeBlock
        clipboardStr = clipboardStr.replace('/replacestart//replaceend/', codeBlock + '\n');
      } 
      // !VA Convert the alias of the clicked button to an ID the Clipboard object recognizes and write clipboardStr to the clipboard.
      writeClipboard( id, clipboardStr );
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

    // !VA Set the attributes for the nodes in the 'rdoCcpTdPosswitch' option using the DIR attribute
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
    function makeTdNode( id, Attributes ) {

      console.log('makeTdNode running');
      // !VA Variables for error handling - need to include this in the return value so the Clipboard object can differentiate between alert and success messages. 
      // console.log('id is: ' + id);
      // console.log('Attributes: ');
      // console.dir(Attributes);
      let isErr;
      // !VA Query Appobj to get the selected TD option
      let selectedTdOption;
      selectedTdOption = getSelectedTdOptionFromAppobj();

      // !VA Branch: implementCcpInput03 (062520)
      // !VA Get the selected TD option from Appobj

      // !VA NOTE: No trapped errors here yet that would pass a code, but that will probably come.
      // let errCode;
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
      case (selectedTdOption === 'rdoCcpTdBasic' || selectedTdOption === 'rdoCcpTdExcludeimg'):
        // !VA class attribute
        if (Attributes.tdClass.str) { tdInner.className = Attributes.tdClass.str; }
        // !VA valign attribute
        if (Attributes.tdAlign.str) { tdInner.align = Attributes.tdAlign.str; }
        if (Attributes.tdValign.str) { tdInner.vAlign = Attributes.tdValign.str; }
        if (Attributes.tdHeight.str) { tdInner.height = Attributes.imgWidth.str; }
        if (Attributes.tdWidth.str) { tdInner.width = Attributes.imgHeight.str; }
        // !VA If 'rdoCcpTdBasic' is checked, create imgNode and append it, otherwise exclude the imgNode.
        if (selectedTdOption === 'rdoCcpTdBasic') {
          imgNode = makeImgNode( id, Attributes );
          tdInner.appendChild(imgNode);
        }
        break;
      // !VA (selectedTdOption === 'rdoCcpTdImgswap'):
      case (selectedTdOption === 'rdoCcpTdImgswap'):
        if (Attributes.tdClass.str) { tdInner.className = Attributes.tdClass.str; }
        if (Attributes.tdValign.str) { tdInner.vAlign = Attributes.tdValign.str; }
        if (Attributes.tdAlign.str) { tdInner.align = Attributes.tdAlign.str; }
        break;
      // !VA (selectedTdOption === 'rdoCcpTdBgimage'):
      case (selectedTdOption === 'rdoCcpTdBgimage'):
        // !VA Create the parent node to which the bgimage code block will be appended after outputNL is converted to text in buildOutputNodeList.
        // !VA Include width, height and valign as per Stig's version
        tdInner.width = Attributes.tdAppobjWidth.str;
        tdInner.height = Attributes.tdAppobjHeight.str;
        tdInner.vAlign = Attributes.tdValign.str;
        // !VA Set the background attribute to the current path/filename
        tdInner.setAttribute('background', Attributes.tdBackground.str);
        // !VA Fallback bgcolor now set in UIController.showTdOptions
        // !VA Include fallback color from the default set in showTdOptions
        break;
      // !VA  (selectedTdOption === 'rdoCcpTdPosswitch'):
      case (selectedTdOption === 'rdoCcpTdPosswitch'):
        tdInner  = makePosSwitchNodes( id, Attributes );
        break;
      // !VA  (selectedTdOption === 'rdoCcpTdVmlbutton'):
      case (selectedTdOption === 'rdoCcpTdVmlbutton'):
        // !VA IMPORTANT: Height and width fields have to be entered, otherwise the button can't be built. Button width and height are set here in makeTdNode, the rest of the options are set in getVmlCodeBlock in buildOutputNodeList. The defaults of 40/200 as per Stig are set in UIController.showTdOptions. So if there's no value for td height and width, then the user has deleted the default and not replaced it with a valid entry. In this case, throw an ERROR and abort before it gets to the clipboard.
        if (!document.querySelector(ccpUserInput.iptCcpTdHeight).value || !document.querySelector(ccpUserInput.iptCcpTdWidth).value) {
          console.log('ERROR in makeTdNode rdoCcpTdVmlbutton: no value for either height or width');
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
    function makeTableNode( id, Attributes ) {
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
      tdNodeFragment = makeTdNode( id, Attributes );
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
      let Appobj, linebreak;
      // !VA Branch: implementCcpInput02 (062420)
      // !VA We don't need the entire Appobj here. What we should do is call rest parameters on what we need and then destructure the return array into separate variables. But for now, this is good enough.
      Appobj = appController.getAppobj();
      linebreak = '\n';
      let mobileFilename, mobileSwapStr;
      // !VA Create the mobile image filename: Get the current image file's filename and append the name with '-mob'.
      mobileFilename = Attributes.imgSrc.str;
      // !VA The regex for appending the filename with '-mob'.
      mobileFilename = mobileFilename.replace(/(.jpg|.png|.gif|.svg)/g, '_mob$1');
      // !VA Create the code for the mobile swap TD as a Comment node of the parent td. 
      mobileSwapStr = `${linebreak}${getIndent(indentLevel)}<a href="#"><img class="hide" alt="${Attributes.imgAlt.str}" width="${Attributes.imgWidth.str}" height="${Attributes.imgHeight.str}" src="${Attributes.imgSrc.str}" border="0" style="width: ${Attributes.imgWidth.str}px; height: ${Attributes.imgHeight.str}px; margin: 0; border: none; outline: none; text-decoration: none; display: block; "></a>${linebreak}${getIndent(indentLevel)}<!--[if !mso]><!-->${linebreak}${getIndent(indentLevel)}<span style="width:0; overflow:hidden; float:left; display:none; max-height:0; line-height:0;" class="mobileshow">${linebreak}${getIndent(indentLevel)}<a href="#"><img class="mobileshow" alt="${Attributes.imgAlt.str}" width="${Appobj.sPhonesW}" height="${Appobj.sPhonesH}" src="${mobileFilename}" border="0" style="width: ${Appobj.sPhonesW}px; height: ${Appobj.sPhonesH}px; margin: 0; border: none; outline: none; text-decoration: none; display: block;" /></a>${linebreak}${getIndent(indentLevel)}<!--</span>-->${linebreak}${getIndent(indentLevel)}<!--<![endif]-->`;
      // !VA Return the code block with indents and linebreaks
      return mobileSwapStr;
    }

    // !VA UIController private
    function getBgimageBlock( id, indentLevel, Attributes ) {
      // !VA Keeping the original reference to fallback for posterity for now
      // let bgimageStr, fallback, bgcolor;
      let bgimageStr, bgcolor;
      let linebreak;
      linebreak = '\n';
      // !VA 03.09.2020 Set the indentLevel to 1 for now
      // !VA The fallback color is written to the bgcolor input in showTdOptions, so get it from there
      // fallback = '#7bceeb';
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
    function applyIndents( id, outputNL ) {
      console.log('applyIndents id is: ' + id);

      // !VA Query Appobj to get the selected TD option
      let selectedTdOption;
      selectedTdOption = getSelectedTdOptionFromAppobj();

      // !VA Create array to store indent strings
      let indents = [];
      // !VA Create array to store the positions of the stackable columns in the posswitch option.
      let stackColumnPos = [];
      // !VA Variable to hold the indentLevel of the second posswitch column that the first posswitch column will stack over.
      let stackColumnIndentLevel;
      // !VA Flag for whether to insert the tokens used to insert the MS conditional code blocks after converting the output node list to text.
      let hasMSConditional;


      if ( selectedTdOption === 'rdoCcpTdImgswap' || selectedTdOption === 'rdoCcpTdBgimage' || selectedTdOption === 'rdoCcpTdVmlbutton') {
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
          // !VA If stackColumnPos is empty, then the 'rdoCcpTdBasic' or 'excludetd' td option is selected. Apply regular indents to all nodes.
          if (stackColumnPos.length === 0) {
            // !VA If the node is the last index in outputNL AND the option 'rdoCcpTdImgswap', 'rdoCcpTdBgimage' or 'rdoCcpTdVmlbutton' is selected, then modify the indent to include the token for inserting the MS conditional code after outputNL is converted to text.
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
      // console.clear();
      console.log('clipboardStr is: ');
      console.log(clipboardStr);
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
    // !VA NOTE: Originally, this function took classname, wval and hval as arguments, so keeping that here for reference
    // function  makeCssRule( id, classname, wval, hval ) {
    function  makeCssRule( id ) {

      let Attributes = [];
      // !VA Branch: implementAppobj08 (062020)
      Attributes = getAttributes();
      // !VA Branch: implementCcpInput02 (062420)
      // !VA Call getAppobj with rest parameters and destructure the return array into separate variables.
      // !VA props is the array of rest parameters returned from getAppobj
      let props;
      props = appController.getAppobj2('imgW', 'imgH', 'sPhonesW', 'sPhonesH', 'lPhonesW', 'lPhonesH');
      const { imgW, imgH, sPhonesW, sPhonesH, lPhonesW, lPhonesH } = props;
      let clipboardStr;
      // !VA TODO: isErr is passed to Clipboard object to indicate whether to flash the success message or an alert message
      // let isErr;
      // isErr = false;
      switch(true) {
      case (id.includes('img-dsktp')):
        clipboardStr = `img.${Attributes.imgClass.str} { width: ${imgW}px !important; height: ${imgH}px !important; }`;
        break;
      case (id.includes('img-smphn')):
        clipboardStr = `img.${Attributes.imgClass.str} { width: ${sPhonesW}px !important; height: ${sPhonesH}px !important; }`;
        break;
      case (id.includes('img-lgphn')):
        clipboardStr = `img.${Attributes.imgClass.str} { width: ${lPhonesW}px !important; height: ${lPhonesH}px !important; }`;
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
        clipboardStr = `table.${Attributes.tableClass.str} { width: ${sPhonesW}px !important; align: ${Attributes.tableAlign.str} !important; }`;
        break;
      case (id.includes('table-lgphn')):
        clipboardStr = `table.${Attributes.tableClass.str} { width: ${lPhonesW}px !important; align: ${Attributes.tableAlign.str} !important; }`;
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
      let Appobj = {};
      let clipboardStr, widthval, heightval;
      var el = document.querySelector('#' + targetid);
      el.onmouseover = isOver();
      function isOver() {
        console.log('isOver running');
      }
      widthval = heightval = '';
      // !VA Call getAppobj with rest parameters and destructure the return array into separate variables.
      // !VA props is the array of rest parameters returned from getAppobj
      let props;
      props = appController.getAppobj2('imgW', 'imgH', 'sPhonesW', 'sPhonesH', 'lPhonesW', 'lPhonesH');
      const { imgW, imgH, sPhonesW, sPhonesH, lPhonesW, lPhonesH } = props;
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
      // !VA Get the Appobj value for the clicked Inspector element and get the Clipboard string based on whether shif or ctrl is pressed 
      switch(true) {
      // !VA Inspector Label clicked
      // !VA NOTE: This could probably be DRYified but would sacrifice readability - leave as is for now.
      case targetid === 'ins-display-size-label':
        widthval = imgW;
        heightval = imgH;
        clipboardStr = getVal( widthval, heightval, modifierKey);
        break;
      case targetid === 'ins-small-phones-label':
        widthval = sPhonesW;
        heightval = sPhonesH;
        clipboardStr = getVal( widthval, heightval, modifierKey);
        break;
      case targetid === 'ins-large-phones-label':
        widthval = lPhonesW;
        heightval = lPhonesH;
        clipboardStr = getVal( widthval, heightval, modifierKey);
        break;
      // !VA Inspector Value clicked
      case targetid === 'ins-display-size-width-value':
        widthval = imgW;
        clipboardStr = getVal( widthval, heightval, modifierKey);
        break;
      case targetid === 'ins-display-size-height-value':
        heightval = imgH;
        clipboardStr = getVal( widthval, heightval, modifierKey);
        break;
      case targetid === 'ins-small-phones-width-value':
        widthval = sPhonesW;
        clipboardStr = getVal( widthval, heightval, modifierKey);
        break;
      case targetid === 'ins-small-phones-height-value':
        heightval = sPhonesH;
        clipboardStr = getVal( widthval, heightval, modifierKey);
        break;
      case targetid === 'ins-large-phones-width-value':
        widthval = lPhonesW;
        clipboardStr = getVal( widthval, heightval, modifierKey);
        break;
      case targetid === 'ins-large-phones-height-value':
        heightval = lPhonesH;
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
        // !VA IMPORTANT: Is this still necessary? Attributes don't appear to be passed anywhere here, I think this might be deprecated.
        // !VA If the CCP image fluid/fixed radio button is clicked, then 
        if (targetid.includes('fixed') || targetid.includes('fluid')) {
          getAttributes();
        }
        // !VA Run the Clipboard building routine based on the click target. 
        // !VA Branch: implementCcpInput03 (062520)
        // !VA The fluid/fixed condition is probably deprecated but needs to be tested in the next branch
        switch(true) {
        case targetid.includes('tag') || targetid.includes('fluid') || targetid.includes('fixed') :
          buildOutputNodeList (targetid);
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

        // !VA Branch: implementAppobj04 (061020)
        // !VA This throws and error I think since I changed the checkbox configuration
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
      // !VA NOTE: This doesn't appear to do anything, so deprecating...
      // const tbFocusInputs = [ toolbarElements.iptTbrViewerW, toolbarElements.iptTbrSPhonesWidth, toolbarElements.iptTbrLPhonesWidth  ];
      // for (let i = 0; i < tbFocusInputs.length; i++) {
      //   // !VA convert the ID string to the object inside the loop
      //   tbFocusInputs[i] = document.querySelector(tbFocusInputs[i]);
      //   addEventHandler(tbFocusInputs[i],'click',handleOnfocus,false);
      // }
      
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


      // !VA Branch: implementAppobj08 (062020)
      // !VA Commenting out these event handlers for now until I deal with getting the values
      // !VA Add event handlers for the input elements that show mobile CSS clipboard buttons in the CCP when input is made. These are the class input elements for ccp Img, Td and Table options
      // const ccpClassInputs = [ ccpUserInput.iptCcpImgClass, ccpUserInput.iptCcpTdClass, ccpUserInput.iptCcpTableClass ];
      // for (let i = 0; i < ccpClassInputs.length; i++) {
      //   // !VA convert the ID string to the object inside the loop
      //   ccpClassInputs[i] = document.querySelector(ccpClassInputs[i]);
      //   addEventHandler((ccpClassInputs[i]),'input',showElementOnInput,false);
      // }

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

      // !VA Branch: implementAppobj05 (061320)
      // !VA What did I mean by the comment below?
      // !VA Branch: implementAppobj03 (060820) This was the catch-all event handler prior to this branch but it doesn't work because it doesn't trap keyboard input. 
      let ccpRadioClicks;
      for(let i in ccpUserInput) {
        if (ccpUserInput[i].substring(0,4) === '#rdo') {
          ccpRadioClicks = document.querySelector(ccpUserInput[i]);
          addEventHandler(ccpRadioClicks,'click',handleCcpRadioSelection,false);
        }
      }

      // !VA eventListener for the Include Wrapper checkbox. Checkboxes need to have separate event handlers because their functions are too different to consolidate into a single one.
      // !VA Branch: implementCcpInput01 (062120)
      // !VA Then why are they both driving to the same function i.e. toggleCheckbox?
      let includeWrapperCheckbox = document.querySelector(ccpUserInput.spnCcpTableIncludeWrapperCheckmrk);
      addEventHandler(includeWrapperCheckbox,'click',toggleCheckbox,false);

      // !VA eventListener for the Include Anchor checkbox. Checkboxes need to have separate event handlers because their functions are too different to consolidate into a single one.
      let includeAnchorCheckbox = document.querySelector(ccpUserInput.spnCcpImgIncludeAnchorCheckmrk);
      addEventHandler(includeAnchorCheckbox,'click',toggleCheckbox,false);


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
      // If a file is already being displayed, i.e. Appobj.fname is true, then remove that image to make room for the next image being dropped
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
          // Read the insFilename of the FileReader object into a variable to pass to Appobj function, otherwise the blob has no name
          fileName = theFile.name;

          // !VA Branch: implementAppobj08 (062020)
          // !VA NOTE: Review this. I'm not sure this has to be writting to the DOM now.
          document.querySelector(inspectorElements.insFilename).textContent = Appobj.fileName = fileName;

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
                // !VA Branch: implementCcpInput01 (062120)
                // !VA The true parameter indicates that a new image is being initialized
                calcViewerSize(true);
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
    // !VA Handle behavior when an element gets the focus. Pertains only to keyboard input, actually, I'm not sure whether buttons or CCP elements need special handling. Takes no argument because this is used instead of the passed event.
    function handleFocus() {
      // !VA Get the target element of the click
      // el = document.getElementById(this.id);
      // !VA Select the clicked element's value, or if there's no value, set it to empty with a cursor, which is the default select behavior for empty fields.
      this.select();
    }

    // !VA appController private function
    function handleCcpInput(prop, value) {
      console.log('handleCcpInput');
      console.log('prop is: ' + prop);
      console.log('value is: ' + value);
      let arr = [];
      arr[0] = prop;
      arr[1] = value;
      Appobj[prop] = value;
      UIController.writeAppobjToDOM( arr );
      console.log('handleCcpInput Appobj: ');
      console.dir(Appobj);
      
    }

    // !VA TODO: Why is the argument unused, why are there unused elements and what is actually happening here?
    // !VA appController private
    // !VA If blurring from imgW or imgH, clear the field to display the placeholders. Otherwise, restore the field value to the Appobj property. Takes no argument because we're using this instead of the event.
    function handleBlur() {
      // !VA Handle blur
      console.clear();
      console.log('handleBlur running');
      let prop;
      // !VA Get the Appobj property name that corresponds to the ID of the event target
      prop = elementIdToAppobjProp(this.id);
      console.log('prop is: ' + prop);
      // !VA Branch: implementCcpInput05 (062720)
      if (prop.substr( 3, 3 ) === 'Ccp') { 
        console.log('HIT');
        handleCcpInput( prop, this.value);
      }




      // !VA If blurring from imgW or imgH, clear the field to display the placeholders. Otherwise, restore the field value to the Appobj property.

      // !VA NOTE: This can probably replace the blur statements in handleKeydown
      if (prop === 'imgW' || prop === 'imgH') {
        this.value = '';
      } else {
        this.value = Appobj[prop];
      }



    }

    // !VA Branch: implementAppobj05 (061320)
    // !VA TODO: Doesn't appear to do anything, so deprecating...
    // function handleOnfocus(evt) {
    //   let targ = evt.target;
    //   let val = targ.value;
    // }

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
          if (msgElement.classList.contains('active')) {
            console.log('vals[i] is: ' + vals[i]) + ' is active';
          }
        }
      } catch (error) {
        // console.log('handleMouseEvents catch:');
      }
      // !VA Handle the increment toolbuttons
      if (event.type === 'click') {
        switch (true) {
        case ( el.id.includes('tbr')) :
          // !VA Variable to hold the name of the Appobj property the event corresponds to
          // !VA prop not defined
          //var prop, val, isErr; 
          var val, isErr;
          // !VA We need to query Appobj properties to get the current value of imgW so we can add the toolbutton increments to id
          // !VA Appobj is already accessible, it's global in appController
          // console.log('handleMouseEvents Appobj: ');
          // console.dir(Appobj);

          // !VA This is a click on one of the toolbutton increment buttons, so we're dealing with the Appobj.imgW property.
          args.prop = 'imgW';
          // !VA The last 2 chars of the id indicate the value by which the img dimension should be incremented,so get the last 2 chars and convert to integer
          val = parseInt(el.id.slice(-2));
          // !VA If the target ID includes 'incr' then the image dimension will be incremented, if 'decr' then it will be decremented
          (el.id.includes('incr')) ? val : val = -val;
          // !VA Add val to the current imgW to get the value to be passed to checkUserInput for error parsing.
          val = Appobj.imgW + val;
          args.val = val;
          isErr = checkUserInput(args);
          if (isErr) {
            // !VA If it returns an error, select the input and show the error message so the user can correct it or ESC out of the field.
            // !VA Post-error button handling?
          } else {
            // !VA If no error, pass the Appobj property name and the entered value for further processing.
            // !VA NOTE: We might have to include the target ID in the error handling because this button should trigger a different message than the keyboard message. Revisit.
            // !VA Passing arguments as object
            // !VA Branch: implementCcpInput01 (062120)
            // !VA Deprecating...
            // evalToolbarInput(args);
            writeToolbarInputToAppobj(args);
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


    // !VA Branch: implementAppobj08 (062020)
    // !VA NOTE: There is NO REFERENCE to Appd... here although it is referenced in the comments below. It looks like I already replaced Appd... with Appobj. But we do have an 'undefined' error when CCP inputs are made, this might be the cause of it.
    // !VA It's because this calls evalToolbarInput - there's no handler yet for CCP input, so any text triggers an error condition. 

    /* !VA This is a bit complicated but it expresses non-default field behavior:
      --imgW and imgH fields should never show entereed values but rather only placeholders. This is because they actual values are reflected upon entering in the DISPLAY SIZE inspectorElements and because any value entered in one of the fields would require an aspect ratio calculation to display in the other one. So one of the field values would have to update automatically which is distracting and confusing IMO especially since the values are presented clearly elsewhere.
      --The other fields should show the current Appd... value, i.e. the actual DOM element dimensions or data property value, because these values are NOT reflected anywhere in a Inspector. So when they are changed, they need to be updated and when a user makes a bad entry, they have to be restored to what they were previously.
      --Default Tab behavior, i.e. cycling through the tab order, has to be maintained under consideration of the above 2 points.
    */
    // !VA Tab needs to be in a keyDown because keyup is too late to trap the value before the default behavior advances ot the next field.
    // !VA TODO: Why are there unused elements and what is actually happening here?
    function handleKeydown(evt) {
      // console.log('handleKeydown running');
      try {
        // console.log('handleKeyDown try: ');
        var vals = [], msgElement, keydown;
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
        // console.log('Tab or Enterr pressed');
        let isErr, isEnter, isTab;
        // !VA Initialize the object to store the user input data: evtTargetId, evtTargetVal and appObjProp. appObjProp is returned from elementIdToAppobjPropm which I really need to get rid of.
        const userInputObj = { };

        // !VA Branch: implementAppobj05 (061320)
        // !VA NOTE: I think this did something at some point but I'm not sure why this call to a handler would be useful. Commenting out for now.
        // console.log('evt.target.id is: ' + evt.target.id);
        // if (evt.target.id.substring(0,7) === 'ipt-ccp') {
        //   handleCcpUserInput(evt);
        // }

        // !VA Branch: implementAppobj08 (062020)
        // !VA NOTE: Does the below make any sense at all?
        // !VA userInputObj is the array containing the values needed to check input, evaluate the Toolbar input, and update Appobj prior to writing dynamicRegions to the DOM after user input in the Toolbar input fields.
        // !VA evtTargetId is the ID of the element into which the user entered a change
        userInputObj.evtTargetId = this.id;
        // !VA evtTargetVal is the value the user entered into the input element as integer.
        userInputObj.evtTargetVal = parseInt(this.value);

        // !VA Set a flag if the the Enter key was pressed, for readability
        (keydown == 13) ? isEnter = true : isEnter = false;
        // !VA Set a flag if the the Tab key was pressed, for readability
        (keydown == 9) ? isTab = true : isTab = false;
        // !VA elementIdToAppobjProp gets the Appobj key that corresponds to a given element ID. We need the Appobj key to get the Appobj value to compare to the user-entered value in the respective Toolbar input field. 
        userInputObj.appObjProp = elementIdToAppobjProp(this.id);

        // !VA Branch: implementAppobj08 (062020)
        // !VA This is where we need to fork the logic for CCP inputs vs Toolbar inputs. Also need to consider an alternative to elementIdToAppobjProp, since elementIdToAppobjProp so far only contains a list of Toolbar input IDs that doesn't incude CCP. Why can't I get it from the element alias? 
        // console.log('handleKeydown userInputObj: ');
        // console.dir(userInputObj);


        // !VA If Tab was pressed and this.value is either empty or equals the Appobj value, then there's been no change to the field, so let Tab just cycle through the fields as per its default.
        if ((isTab) && ((this.value === '' || this.value == Appobj[userInputObj.appObjProp]))) {
          // !VA Only if imgW or imgH, delete the existing value to display the placeholders. Otherwise, tab through and leave the existing value from Appobj
          if (userInputObj.prop === 'imgW' || userInputObj.prop === 'imgH') {
            this.onblur = function() {
              this.value = '';
            };
          }
        } else {
          // !VA Field value was changed, so first, pass the args to checkUserInput for errors.
          isErr = checkUserInput(userInputObj);
          if (isErr) {
            // !VA If it returns an error, select the input and show the error message so the user can correct it or ESC out of the field. If Tab, prevent advancing to the next field until the error is corrected or ESC is pressed.
            isEnter ? isEnter : evt.preventDefault(); 
            // !VA We have to leave the bad value in the field so the user can correct it or press Esc to blur without change, otherwise it will conflict with the default tab order behavior.
            this.select();
          } else {
            // !VA If the value was entered in the imgW or imgH field, show the value selected first so the user can view and change it before implementing. Only on Tab can the value be implemented and advance to the next field.
            if (userInputObj.prop === 'imgW' || userInputObj.prop === 'imgH') {
              if (isEnter) {
                this.select();
              } else {
                this.value = '';
                this.blur();
              }
            }
            // !VA Pass the userInputObj to evalToolbarInput.
            // !VA Branch: implementCcpInput01 (062120)
            // !VA Deprecating...
            // evalToolbarInput(userInputObj);
            writeToolbarInputToAppobj(userInputObj);
          }
        } 
      }
    }

    // !VA appController private
    // !VA TODO: Why are there unused elements and what is actually happening here?
    // !VA keyPress handler for the ESC key.  This has to be handled on keyup, so we need a separate handler for it.
    // !VA Branch: implementAppobj08 (062020)
    // !VA NOTE: Appd... already replaced with Appobj here. Could be a source of error.
    function handleKeyup(evt) {
      let prop, curLocalStorage, keyup;
      // !VA We only need the property here, so no need to create an args object. We could actually just use the target but since we're standardizing on property names, let's stick with that. Get the property name from the id of this, i.e. the event target
      prop = elementIdToAppobjProp(this.id);
      // !VA Find out which key was struck
      keyup = evt.which || evt.keyCode || evt.key;
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

    // !VA  Parsing keyboard input based on Appobj property passed in from handleKeyup.
    // !VA TODO: rename to checkUserInput and include parsing of the toolbutton mouseclicks from handleToolbarClicks.
    // !VA TODO: Why are there unused variables and what is actually happening here?
    // !VA appController private
    function checkUserInput(userInputObj) {
      // !VA Destructure userInputObj
      // !VA TODO: I don't think evtTargetId is ever used...remove?
      // const { evtTargetId, appObjProp, evtTargetVal } = userInputObj;
      const { appObjProp, evtTargetVal } = userInputObj;
      let appMessCode;
      var isErr;
      isErr = false;

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
          // !VA The user has selected a viewerW that's smaller than the currently displayed image. Undetermined how to deal with this but for now the current image is shrunk to the selected viewerW. But Appobj is not updated accordingly, needs to be fixed.
          if (evtTargetVal < Appobj.imgW ) {
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
          if (evtTargetVal > Appobj.viewerW ) {
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

    // !VA Branch: implementCcpInput01 (062120)
    // !VA NEW, derived from evalToolbarInput
    function writeToolbarInputToAppobj(userInputObj) {
      // console.log('writeToolbarInputToAppobj');
      // !VA Initialize vars for imgH and imgW in order to calculate one based on the value of the other * Appobj.aspect.
      let imgH, imgW;
      // !VA ES6 Destructure args into constants. userInputObj is passed in from the mouse/keyboard event handlers.
      const { appObjProp, evtTargetVal } = userInputObj;
      // console.log('appObjProp is: ' + appObjProp);
      // console.log('evtTargetVal is: ' + evtTargetVal);
      // !VA Handle the two cases: 1) appObjProp and evtTargetVal are used to write to Appobj, localStorage and the DOM. This applies to viewerW, sPhonesW and lPhonesH. 2) appObjProp and evtTargetVal are used to calculate the img's adacent dimension, then both the images' dimensions are written to Appobj. This applies to imgW and imgH. NOTE: For some reason, updateAppobj wrote imgH to the DOM here - I'm not sure why that was done, but it shouldn't be. 
      // !VA appObjProp = viewerW, sPhonesW or lPhonesW
      if ( appObjProp === 'viewerW' || appObjProp === 'sPhonesW' || appObjProp === 'sPhonesW') {
        // !VA Set the Appobj property corresponding to the appObjProp identifier to its respective value
        Appobj[appObjProp] = evtTargetVal;
        // !VA Set the localStorage for the respective Appobj property to the respective value
        localStorage.setItem(appObjProp, evtTargetVal);
      // !VA appObjProp is imgW or imgH
      } else if ( appObjProp === 'imgW' || appObjProp === 'imgH') {
        // !VA Calculate the adjacent dimension of appObjProp based on the aspect ratio, then set the Appobj property of the dimension and its adjacent dimension
        if ( appObjProp === 'imgW') {
          Appobj.imgH = imgH =  Math.round(evtTargetVal * (1 / Appobj.aspect[0]));
          Appobj.imgW = imgW = evtTargetVal;
        } else if ( appObjProp === 'imgH') {
          Appobj.imgW  = imgW =  Math.round(evtTargetVal * (Appobj.aspect[0]));
          Appobj.imgH = imgH = evtTargetVal;
        }
      }
      // !VA Branch: implementCcpInput01 (062120)
      // !VA The false flag indicates that this is a user-initiated Toolbar input action, not an image initialization action.
      console.log('calcViewerSize Appobj: ');
      console.dir(Appobj);


      calcViewerSize(false);

    }



    // !VA  appController private
    // !VA calcViewerSize is called 1) in initUI (devmode) after the devimg is loaded from the HTML file 2) in handleFileSelect after setTimeOut callback is run and the image is loaded 3) in evalToolbarInput/ after a user-initiated Toolbar input. calcViewerSize calculates the current size of dynamicRegions.imgViewer based on Appobj values. 
    function calcViewerSize(flag) {
      // console.log('calcViewerSize running');
      // !VA Branch: implementCcpInput01 (062120)
      // !VA Replaced evalToolbarInput with writeToolbarInputToAppobj so there is currently no call to calcViewerSize after user-initiated Toolbar input.
      
      // !VA Branch: implementCcpInput01 (062120)
      // !VA Populate just the dynamic regions of Appobj. If flag is true, then calcViewerSize was called writeToolbarInputToAppobj, so this is a user-initiated Toolbar input action. If false, it's an image initialization action called from initUI (devmode) or handleFileSelect.
      if (flag === true ) {
        // !VA Populate the dynamicRegions properties in Appobj on new image initialization and get localStorage values if set.
        UIController.populateAppobj(Appobj, 'app');
      }
      // !VA If initializing a new image, use the naturalWidth and naturalHeight. If updating via user input, use the display image and height, imgW and imgH. 
      // !VA TODO: See if the if condition below has any effect, if not, remove
      // !VA Branch: implementCcpInput01 (062120)
      // !VA TODO: actualW and actualH should be replaced globally with imgW and imgH - the actualW/actualH condition isn't relevant anymore. Test first.
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
      case (actualW <= Appobj.viewerW) && (Appobj.imgNH < Appobj.viewerW) :
        actualW = Appobj.imgNW;
        actualH = Appobj.imgNH;
        break;
      // The image is wider than the current viewer width but shorter than current viewer height, so resize the image based on the viewer width
      case (actualW > Appobj.viewerW) && (actualH < Appobj.viewerW) :
        // Set the image width to the current viewer
        Appobj.imgW = Appobj.viewerW;
        // Get the image height from the aspect ration function
        Appobj.imgH = Math.round((1/Appobj.aspect[0]) * Appobj.imgW);
        // Set the viewerH to the imgH
        Appobj.viewerH = Appobj.imgH;
        break;
      // The image is not as wide as the current viewer width, but is taller than the viewer height. Keep the image width but resize the viewer in order to display the full image height
      // !VA This might be a problem with consecutive images without page refresh
      case (actualW <= Appobj.viewerW) && (actualH > Appobj.viewerW) :
        // Set the viewer height and the image height to the image natural height
        Appobj.viewerH = Appobj.imgH = Appobj.imgNH;
        // Set the image width to the natural image width
        Appobj.imgW = Appobj.imgNW;
        break;
      // The image is wider and taller than the current viewer height and width so we have to resize the image and the viewport based on the current viewport width
      case (actualW > Appobj.viewerW) && (actualH > Appobj.viewerW) :
        // Set the image Width to the current  viewer width 
        Appobj.imgW = Appobj.viewerW;
        // Set the image height proportional to the new image width using the aspect ratio function
        Appobj.imgH = Math.round((1/Appobj.aspect[0]) * Appobj.imgW);
        // Set the viewer height to the image height
        Appobj.viewerH = Appobj.imgH;
        // !VA TODO: Check this out, doesn't seem to be a problem anymore: BUG Problem with the 800X550, 800X600 -- no top/bottom gutter on viewport
        break;
      }
      // !VA Branch: implementCcpInput01 (062120)
      // !VA There should be no reason to pass values any more, Appobj is global in appController
      resizeContainers();
    }

    // !VA appController private
    function resizeContainers( )  {
      // !VA This calculates the imgViewer, imgViewport and appContainer height based on Appobj values which are passed in from calcViewerSize.
      // !VA Initial height is 450, as explicitly defined in calcViewerSize. TOo much hassle to try and get the value as defined in the CSS programmatically.
      // !VA Note: This has dynamicRegion values that are not written back to Appobj after recalculation, this may be a problem at some point.
      // !VA initViewerH is the same default value set in populateAppobj. That needs to be reset as default here since Appobj values at this point no longer correspond to the initialization defaults, but may also have changed due to user-initiated Toolbar input. 
      // !VA TODO:That's why this value should be pulled from the placeholder value of dynamicRegions.iptTbrViewerW, not set as a literal here.
      const initViewerH = 450;
      let viewportH;
      let appH; 

      // !VA Branch: implementCcpInput01 (062120)
      // !VA If Appobj.imgH is less than the default viewer height as set in populateAppobj (450) then make the viewport 145px taller than the current viewer height, i.e. Appobj.viewerH.
      // !VA The viewport is 145px taller than the imgViewer. 
      if (Appobj.imgH <= initViewerH) {
        Appobj.viewerH = initViewerH;
        viewportH = Appobj.viewerH + 145;
      } else {
        // !VA NOTE: Not sure why this is needed
        // Need a little buffer in the viewport
        Appobj.viewerH = Appobj.imgH;
        viewportH = Appobj.imgH + 145;
      } 
      appH = viewportH;

      // !VA DOM Access to apply dimensions for the dynamicRegions elements, i.e. the current image and its containers. 
      // !VA Branch: implementCcpInput01 (062120)
      // !VA This is where the DOM write in evalToolbarInputs and updateAppObj used to happen
      // !VA Write dimensions of dynamicRegions.curImg, dynamicRegions.imgViewer and the height of dynamicRegions.imgViewport and dynamicRegions.appContainer. Width of dynamicRegions.imgViewport and dynamicRegions.appContainer is static and is sized to the actual application area width.
      // !VA NOTE: This function only exists because Appobj has no property for viewportH or appH. This is a one-off call, so having a separate function for it is kind of wasteful. See if it can be done another way.
      UIController.writeDynamicRegionsDOM(Appobj, viewportH, appH);



      // !VA Set Appobj table width and wrapper table width now.
      Appobj.iptCcpTableWidth = Appobj.imgW;
      Appobj.iptCcpTableWrapperWidth = Appobj.viewerW;
      var tableWidth = [];
      var tableWrapperWidth = [];
      // !VA Use the cross-object identifier instead of the ccp element alias here, that's what writeAppobjToDOM expects.
      tableWidth = ['iptCcpTableWidth', Appobj.imgW ];
      tableWrapperWidth = ['iptCcpTableWrapperWidth', Appobj.viewerW];

      
      // !VA True is the flag to stash instead of retrieve, tableWidth and tableWrapper are the rest parameters containing the key/value pairs to stash.;
      // !VA Branch: implementAppobj05 (061320)
      // !VA Not implementing this yet
      // UIController.stashAppobjProperties(true, tableWidth, tableWrapperWidth);
      
      // !VA Called in resizeContainers after writeDynamicRegions, takes parameter list of CCP ID/value pairs, and updates the DOM with the passed parameters. It is the CCP DOM counterpart to updateAppobj, I think, since it only updates those DOM elements whose ID/Value passed in, rather than a blanket DOM update of all DOM. Renamed from writeDOMElementValues. writeCcpDOM takes rest parameters. Pass multiple arguments as arrays of key/value pairs with the cross-object identifier (the value in the ccpUserInput object) as key and the Appobj value as value. 
      // !VA NOTE: This needs to bypass handleCcpActions, since it's not a result of any ccpAction but rather a direct write through the user input in the dynamicRegions. It also has to happen before initCCP, othewise Appobj won't initialize with values for table width and table wrapper width. 
      UICtrl.writeAppobjToDOM( tableWidth, tableWrapperWidth);

      console.log('here');
      console.log('Appobj is: ');
      console.log(Appobj);
      // !VA Branch: implementCcpInput01 (062120)
      // !VA Why does this condition have no actions? Shouldn't write AppbojToDOM be called conditionally below?
      // !VA If CCP is open, write tableWidth and tableWrapperWidth to the DOM elements. 
      var ccpState = UICtrl.toggleCcp(false);
      if (ccpState) { 

        // !VA Dont forget that this is the result of a dynamicRegions update which can happen at any time, whether the CCP is open or closed. If it is open, it can happen regardless of whether fluid or fixed or whatever other tdoption is checked. That means that this can't overwrite the Appobj values that are active when fluid is checked but it does have to replace the values that are active when fixed is checked and has to revert back to those values if fluid is checked and then fixed is checked again. This is where things get VERY confusing. 

        // !VA If the CCP is open, update the CCP UI with the most recent changes to dynamicRegion values, then populateAppobj with CCP values last. writeAppobjToDOM takes rest parameters. Pass multiple arguments as arrays of key/value pairs with the element alias as key and the Appobj value as value. Elements to update here are: tableWidth and tableWrapperWidth. If the CCP is not open, don't update its values.
      }

      // !VA Write the inspectors based on Appobj values
      UICtrl.writeInspectors(Appobj);
    }

    // !VA appController private
    // !VA Branch: implementAppobj03 (060820)
    // !VA Handle the tdoptions and imgType radio buttons. I'm not sure why there is a separate handler for this that doesn't encompass all the CCP UI elements. 
    function handleCcpRadioSelection(evt) {
      // console.log('handleCcpRadioSelection running');
      // console.log('evt.target.id is: ' + evt.target.id);
      let id;
      id = '#' + evt.target.id;
      // console.log('alias is: ' + alias);
      switch(true) {
      // !VA handle the fixed/fluid imgType radion buttons
      case id === ccpUserInput.rdoCcpImgFixed || id === ccpUserInput.rdoCcpImgFluid:
        // console.log('evt.target.id is: ' + evt.target.id);
        // console.log('id is: ' + id);
        handleImgType(id);
        break;
      // !VA Handle the tdoptions radio button group in TD Options
      case id.includes('rdo-ccp-td') :
        // console.log('TDOptions id is: ' + id);
        handleTdOptions(id);
        break;
      default:
        console.log('ERROR in handleCcpRadioSelection - unknown condition');
      } 
      // console.log('Appobj is: ');
      // console.dir(Appobj);
    }

    function batchDOMToAppobj() {
      console.log('batchDOMToAppobj running');
      let arr = [];
      arr = Object.entries(Appobj);
      console.log('batchDOMToAppobj arr: ');
      console.dir(arr);




    }


    // !VA appController private
    // !VA Called in handleTdOptions
    // !VA TODO: Needs to be commented
    // !VA Reads Appobj every time the CCP is opened and writes CCP options to the CCP DOM based on Appobj presets: 1) If the Include wrapper checkbox is checked/unchecked, runs showIncludeWrapperOptions to display/undisplay the Include wrapper-dependent options. 2) Determines which rdoCcpTd option is selected and runs handleTdOptions with the selected ID. 3) Determines the fluid/fixed option and runs handleImgType with the selected option.  
    function batchAppobjToDOM() {
      console.log('batchAppobjToDOM running');
      // console.log(Appobj);

      // !VA Flag is set based on Include wrapper checkbox status below.
      let flag, arr;
      // !VA keyval is the Appobj key/value pair that is passed to writeAppobjToDOM to update the CCP DOM
      let keyval = [];
      // !VA Set the checkmarks as per the current Appobj properties 
      if (Appobj.spnCcpTableIncludeWrapperCheckmrk === 'on') {
        flag === true;
      } else if (Appobj.spnCcpTableIncludeWrapperCheckmrk === 'off'){
        flag === false;
      }
      // !VA Show the Include wrapper options if the Include wrapper checkbox is checked.
      showIncludeWrapperOptions(flag);
      // !VA Loop through all Appobj entries whose first 8 chars is rdoCcpTd, i.e. all the tdOption radio buttons, and get the selected radio button. Then pass the ID of that button to handleTdOptions to show the appropriate Td options for the selected radio button.


      // !VA Branch: implementCcpInput05 (062720)
      // !VA This is where we need to write the rest of the Appobj properties to the DOM...


      // !VA Determine which TD options radio is selected in Appobj and pass that element alias to handleTdOptions
      // !VA arr is array of Appobj keys
      arr = Object.keys(Appobj);
      for (let i = 0; i < arr.length; i++) {
        // !VA If the first 8 characters of the Appobj property name is rdoCcpTd, then loop through the property names and find the one whose value is true. That is the selected tdoptions radio button. Then loop though the ccpUserInput element alias list and get the element ID of the selected tdoptions radio button, and call handleTdOptions with that ID as parameter.
        // !VA TODO: Make this an arrow function with find, like below
        // var ret = Object.keys(IDtoProp).find(key => IDtoProp[key] === str);

        if (arr[i].substring( 0, 6) === 'iptCcp' || (arr[i].substring( 0, 6) === 'selCcp')) {
          // console.log('arr[i] is: ' + arr[i]);
          // console.log('Appobj[arr[i]] is: ' + Appobj[arr[i]]);
          keyval = [ arr[i], Appobj[arr[i]] ];
          UIController.writeAppobjToDOM( keyval );
          // console.log('document.querySelector(ccpUserInput[arr[i]]).value is: ' + document.querySelector(ccpUserInput[arr[i]].value));

        }

        // !VA Branch: implementCcpInput05 (062720)
        // !VA Here we need to ONLY run handleTdOptions if tdoption is imgswap. 
        if (arr[i] === 'rdoCcpTdImgswap') {
          // !VA If the Appobj key string === true, then that is the selected radio button
          if ( Appobj[arr[i]] === true) { 
            handleTdOptions(ccpUserInput[arr[i]]); 
          }
        }
      }
      // !VA Query Appobj to determine which imgType option if the fluid option is selected, and run the handler for it. If fixed is selected then no handler is run because that's the default behavior 
      if (Appobj.rdoCcpImgFluid === true ) {
        handleImgType(ccpUserInput.rdoCcpImgFluid);
      } 
      // else if (Appobj.rdoCcpImgFluid === true ) {
      //   handleImgType(ccpUserInput.rdoCcpImgFluid);
      // }

      console.log('batchAppobjToDOM Appobj is: ');
      console.log(Appobj);

    }

    // !VA appController private 
    // !VA Resets the display/disabling of the tdoptions radio button group. Turns off the active class for rhw parent elements of all CCP elements so the elements and their labels are undisplayed. Turns off the disable class and attribute for all text and select input elements and radio buttons (including the fixed/fluix buttons) 
    function resetTdOptions() {
      // console.log('resetTdOptions running');
      // !VA Loop through all the CCP Td options, undisplay them, remove any disablingto prepare for displaying them per radio button selection
      var arr = [];
      // !VA Get ccpUserInput aliases into an array
      var aliasArray = Object.entries(ccpUserInput);
      // console.log('aliasArray is: ');
      // console.log(aliasArray);
      // !VA Reset values to defaults

      // !VA Branch: implementCcpInput05 (062720)
      // !VA Why are we resetting values here? This is a huge problem because once they are reset, they are lost every timne you close the CCP. This is called from batchAppobjToDOM, which is run whenever the CCP is closed.

      Appobj.iptCcpImgClass = Appobj.iptCcpTdClass = Appobj.iptCcpTdHeight = Appobj.iptCcpTdWidth = Appobj.iptCcpTableClass = Appobj.iptCcpTdBgColor = '';
      Appobj.iptCcpTableWidth = Appobj.imgW;
      Appobj.iptCcpTableWrapperWidth = Appobj.viewerW;
      Appobj.iptCcpTableWrapperClass = 'devicewidth';
      // !VA Write the defaults to the CCP DOM elements.

      // !VA Branch: implementAppobj07 (061920)
      // !VA changing setvalue from handleCcpActions to writeAppobjToDOM
      // !VA Branch: implementCcpInput05 (062720)
      // !VA Why is this happening here? 
      // debugger;

      UIController.writeAppobjToDOM( 
        [ 'iptCcpImgClass', Appobj.iptCcpImgClass ], 
        [ 'iptCcpTableClass', Appobj.iptCcpTableClass ],  
        [ 'iptCcpTableWrapperClass', Appobj.iptCcpTableWrapperClass ], 
        ['iptCcpTdWidth', Appobj.iptCcpTdWidth ], 
        [ 'iptCcpTdHeight', Appobj.iptCcpTdHeight ], 
        ['iptCcpTableWidth', Appobj.iptCcpTableWidth ], 
        ['iptCcpTableWrapperWidth', Appobj.iptCcpTableWrapperWidth ], 
        ['iptCcpTdBgColor', Appobj.iptCcpTdBgColor ] );

      // !VA Loop through the ccpUserInput elements and undisplay/un-disable them
      for (let i = 0; i < aliasArray.length; i++) {
        // !VA For ONLY the TD OPTIONS input and select dropdown elements, remove the active class of the parent element to undisplay them.
        if (aliasArray[i][1].substring( 0 , 11 ) === '#ipt-ccp-td' || aliasArray[i][1].substring( 0 , 11 ) === '#sel-ccp-td'  ) {
          // !VA Create an array of the alias and the action to send to handleCcpActions to apply the active class to the parent of the respective element.
          arr = [ aliasArray[i][0], 'setactiveparent'];
          // !VA False is the flag to remove the active class
          UIController.handleCcpActions( false, arr);
        }
        // !VA Remove the disabled class and disabled attribute from all text input elements and select dropdown input elements.
        if (aliasArray[i][1].substring( 0 ,8) === '#ipt-ccp' || aliasArray[i][1].substring( 0 ,8) === '#sel-ccp') {
          arr = [ aliasArray[i][0], 'setdisabledtextinput'];
          // !VA False is the flag to remove the active class
          UIController.handleCcpActions( false, arr);
        }
        // !VA Branch: implementAppobj05 (061320)
        // !VA FOR FLUID IMGTYPE: Remove the disabled class and disabled attribute from all radio button elements. 
        if (aliasArray[i][1].substring( 0 ,11) === '#rdo-ccp-td') {
          arr = [ aliasArray[i][0], 'setdisabledradio'];
          // !VA False is the flag to remove the active class
          UIController.handleCcpActions( false, arr);
        }
      }
    }

    // !VA appController private 
    // !VA The id argument selects the corresponding radio button element.
    function handleTdOptions(id) {
      // console.log('handleTdOptions running');
      // console.log('id is: ' + id);


      // !VA Loop through all Appobj entries whose first 8 chars is rdoCcpTd, i.e. all the tdOption entries and select the option identified in the id argument. NOTE: This could be separated out into a new function.
      // !VA NOTE: Value isn't accessed, but when I tried to just use Object.keys, something broke. Fix it, no for loop necessary with Object.keys.
      for (const [key, value] of Object.entries(Appobj)) {
        if (key.substring( 0, 8) === 'rdoCcpTd') {
          // !VA If the Appobj key string === the element id of the click target, then set that Appobj property to true, otherwise set it to false. This replicates the behavior of a single-select radion button group for the Appobj properties of the radio buttons. If true, set that radio button's checked property to true;
          if (ccpUserInput[key] === id) {
            Appobj[key] = true;
            UIController.handleCcpActions( true, [ key, 'selectradio' ]);
          } else {
            Appobj[key] = false;
          }
        }
      }
      // !VA Reset all Ccp element i.e. undisplay them and remove any disabled styles and attributes. The elements need to be reset before new options can be applied.
      resetTdOptions();


      // !VA Handle the option states for the respective radio button.
      switch(true) {
      case id === (ccpUserInput.rdoCcpTdBasic) || id === (ccpUserInput.rdoCcpTdExcludeimg):
        // !VA Handle the td options for the 'rdoCcpTdBasic' and 'rdoCcpTdExcludeimg' options: class, height, width, bgcolor, align, valign
        UIController.handleCcpActions( true, 
          [ 'iptCcpTdClass', 'setactiveparent'], 
          [ 'selCcpTdAlign', 'setactiveparent'], 
          [ 'iptCcpTdWidth', 'setactiveparent'], 
          [ 'iptCcpTdBgColor', 'setactiveparent'], 
          [ 'selCcpTdValign', 'setactiveparent'], 
          [ 'iptCcpTdHeight', 'setactiveparent']);
        break;
      case id === (ccpUserInput.rdoCcpTdPosswitch):
        // !VA Handle the 'rdoCcpTdPosswitch' option
        UIController.handleCcpActions( true, 
          [ 'iptCcpTdClass', 'setactiveparent'], 
          [ 'selCcpTdValign', 'setactiveparent'], 
          [ 'selCcpTdAlign', 'setactiveparent'], 
          [ 'iptCcpTdBgColor', 'setactiveparent']);
        break;
      // !VA Handle the 'rdoCcpTdImgswap' option
      case id === (ccpUserInput.rdoCcpTdImgswap):
        // !VA Make sure the Include wrapper checkbox is on and the options are displayed.
        Appobj.spnCcpTableIncludeWrapperCheckmrk = 'on';
        showIncludeWrapperOptions(true);
        UIController.handleCcpActions( true, [ 'spnCcpTableIncludeWrapperCheckmrk', 'setcheckbox']);
        // !VA NOTE: These options can be merged with the above function call
        // !VA Display the appropriate TD options
        UIController.handleCcpActions( true,  
          [ 'selCcpTdValign', 'setactiveparent'], 
          [ 'selCcpTdAlign', 'setactiveparent'], 
          [ 'iptCcpTdBgColor', 'setactiveparent']);
        // !VA Preset the options:
        // !VA img class presets
        Appobj.iptCcpImgClass =  'mobileshow', 
        // !VA Parent table presets: class = devicewidth, width = imgW, td align = center, align = center,
        Appobj.iptCcpTableClass = 'devicewidth', Appobj.iptCcpTableWidth = Appobj.imgW, Appobj.selCcpTableAlign = 'center',
        // !VA Wrapper table presets: class='devicewidth', width = viewerW, align=Center
        Appobj.iptCcpTableWrapperClass = 'devicewidth', Appobj.iptCcpTableWrapperWidth = Appobj.viewerW, Appobj.selCcpTableWrapperAlign = 'center';
        // !VA Write the preset values to CCP DOM

        // !VA Branch: implementAppobj07 (061920)
        // !VA Replacing setvalue action in handleCcpActions with writeAppobjToDOM

        UIController.writeAppobjToDOM( 
          [ 'iptCcpImgClass', Appobj.iptCcpImgClass ], 
          [ 'iptCcpTableClass', Appobj.iptCcpTableClass ], 
          [ 'iptCcpTableWidth', Appobj.iptCcpTableWidth ], 
          [ 'selCcpTableAlign', Appobj.selCcpTableAlign ], 
          [ 'iptCcpTableWrapperClass', Appobj.iptCcpTableWrapperClass ], 
          [ 'iptCcpTableWrapperWidth', Appobj.iptCcpTableWrapperWidth ], 
          [ 'selCcpTableWrapperAlign', Appobj.selCcpTableWrapperAlign] );

        // !VA Disable the appropriate presets
        // !VA NOTE: These options can be merged with the above function call
        UIController.handleCcpActions( true,  
          [ 'iptCcpImgClass', 'setdisabledtextinput'], 
          [ 'iptCcpTableClass', 'setdisabledtextinput'], 
          [ 'iptCcpTableWidth', 'setdisabledtextinput'], 
          [ 'selCcpTableAlign', 'setdisabledtextinput'], 
          [ 'iptCcpTableWrapperClass', 'setdisabledtextinput'], 
          [ 'iptCcpTableWrapperWidth', 'setdisabledtextinput'], 
          [ 'selCcpTableWrapperAlign', 'setdisabledtextinput'] );
        break;
      case id === (ccpUserInput.rdoCcpTdBgimage):
        // !VA Bgimage presets
        Appobj.iptCcpTdHeight = Appobj.imgH, Appobj.iptCcpTdWidth = Appobj.imgW, Appobj.iptCcpTdBgColor = '#7bceeb';
        // !VA Display applicable elements and preset values
        UIController.handleCcpActions( true,  
          [ 'iptCcpTdClass', 'setactiveparent'], 
          [ 'iptCcpTdHeight', 'setactiveparent'], 
          [ 'iptCcpTdWidth', 'setactiveparent'], 
          [ 'iptCcpTdWidth', 'setactiveparent'], 
          [ 'iptCcpTdBgColor', 'setactiveparent']) ;

        // !VA Branch: implementAppobj07 (061920)
        // !VA Replacing setvalue with writeAppobjToDOM
        UIController.writeAppobjToDOM( 
          [ 'iptCcpTdHeight', Appobj.iptCcpTdHeight ], 
          [ 'iptCcpTdWidth', Appobj.iptCcpTdWidth ], 
          [ 'iptCcpTdBgColor', Appobj.iptCcpTdBgColor ],
          [ 'iptCcpTdWidth', Appobj.iptCcpTdWidth ]) ;

        // !VA NOTE: These options can be merged with the above function call
        // UIController.handleCcpActions(Appobj, true,  [ 'iptCcpTdHeight', 'setvalue'], [ 'iptCcpTdWidth', 'setvalue'], [ 'iptCcpTdBgColor', 'setvalue'], [ 'iptCcpTdWidth', 'setactiveparent']) ;
        break;
      case id === (ccpUserInput.rdoCcpTdVmlbutton):
        // !VA VML button presets
        // !VA Appobj presets:
        Appobj.iptCcpTdHeight = Appobj.imgH;
        Appobj.iptCcpTdWidth = Appobj.imgW;
        Appobj.iptCcpTdBgColor = '#556270';
        Appobj.iptCcpTdBorderRadius = '4';
        Appobj.iptCcpTdBorderColor= '#1e3650';
        Appobj.iptCcpTdFontColor= '#FFFFFF';

        // !VA Branch: implementAppobj07 (061920)
        // !VA Replacing setvalue with writeAppobjToDOM
        UIController.writeAppobjToDOM( 
          [ 'iptCcpTdClass', Appobj.iptCcpTdClass ], 
          [ 'iptCcpTdHeight', Appobj.iptCcpTdHeight ], 
          [ 'iptCcpTdWidth', Appobj.iptCcpTdWidth], 
          [ 'iptCcpTdBgColor', Appobj.iptCcpTdBgColor], 
          [ 'iptCcpTdFontColor', Appobj.iptCcpTdFontColor], 
          [ 'iptCcpTdBorderColor', Appobj.iptCcpTdBorderColor ], 
          ['iptCcpTdBorderRadius', Appobj.iptCcpTdBorderRadius ], 
          [ 'iptCcpTdFontColor', Appobj.iptCcpTdFontColor ]);

        UIController.handleCcpActions( true,  
          [ 'iptCcpTdClass', 'setactiveparent'], 
          [ 'iptCcpTdHeight', 'setactiveparent'], 
          [ 'iptCcpTdWidth', 'setactiveparent'], 
          [ 'iptCcpTdBgColor', 'setactiveparent'],
          [ 'iptCcpTdFontColor', 'setactiveparent'], 
          [ 'iptCcpTdBorderColor', 'setactiveparent'], 
          ['iptCcpTdBorderRadius', 'setactiveparent'], 
          [ 'iptCcpTdFontColor', 'setactiveparent']) ;

        break;
      default:
        console.log('Error in handleTdOptions: unknown condition');
      } 
      // !VA Branch: implementAppobj05 (061320)
      // !VA The below doesn't appear to be necessary
      // batchAppobjToDOM();
    }

    // !VA appController private
    function handleImgType(id) {
      // !VA Reset all the td options to prepare for processing
      resetTdOptions();
      // !VA Set the fixed options, or reset them after switching back from fluid
      if (id === ccpUserInput.rdoCcpImgFixed) {
        Appobj.rdoCcpImgFixed = true, Appobj.rdoCcpImgFluid = false;
        // !VA Run handleTdOptions with the 'rdoCcpTdBasic' option as argument to preselect the basic option
        handleTdOptions(ccpUserInput.rdoCcpTdBasic);
        // !VA NOTE: This is where the placeholder value would be swapped. But for now, use these presets - any existing user selections will be lost until saving them to the placeholder is implemented.
        Appobj.iptCcpImgClass = '';
        Appobj.iptCcpTableWidth = Appobj.imgW;
        Appobj.iptCcpTableClass = '';
        Appobj.iptCcpTableWrapperWidth = Appobj.viewerW;
        Appobj.iptTableWrapperClass = 'devicewidth';
        Appobj.iptCcpTdClass = '';
        Appobj.iptCcpTdBgColor = '';
        // !VA Branch: implementAppobj06 (061820)
        // !VA IMPORTANT: Not sure if it's best to put this here or only in Attributes, since it only affects the Clipboard output. Leaving it here for now since it doesn't hurt anything
        Appobj.styCcpTableWrapperStyle = '';
        // !VA These options will be set whenever the user clicks the fixed option, even if they weren't selected before choosing the fluid option. That is a minor annoyance for the user probably.
        // !VA Write the presets in Appobj to the CCP DOM
        UIController.writeAppobjToDOM( 
          [ 'iptCcpImgClass', Appobj.iptCcpImgClass ], 
          [ 'iptCcpTableWidth', Appobj.iptCcpTableWidth ], 
          ['iptCcpTableClass', Appobj.iptCcpTableClass ], 
          ['iptCcpTableWrapperWidth', Appobj.iptCcpTableWrapperWidth ],
          ['iptCcpTableWrapperClass', Appobj.iptCcpTableWrapperClass ],  
          [ 'iptCcpTdClass', Appobj.iptCcpTdClass ],
          [ 'iptCcpTdBgColor', Appobj.iptCcpTdBgColor ]
        );
        // !VA Set the checkbox and applicable display parent elements 
        UIController.handleCcpActions( true, 
          [ 'spnCcpTableIncludeWrapperCheckmrk', 'setcheckbox'], 
          ['iptCcpTableWrapperWidth', 'setactiveparent'], 
          ['iptCcpTableWrapperClass', 'setactiveparent'], 
          ['selCcpTableWrapperAlign', 'setactiveparent'], 
          ['iptCcpTableWrapperBgColor', 'setactiveparent'],
          [ 'iptCcpTdClass', 'setactiveparent'],
          [ 'iptCcpTdBgColor', 'setactiveparent']
        );
        // !VA Reset the disabling and fluid options to the fixed defaults.
        UIController.handleCcpActions( false, 
          // !VA NOTE: The false flag is ignored for setvalue but the AppobjMap is passed repeatedly here. That's not very DRY, look at it again.
          // !VA Remove the disabled class from the radio buttons
          ['rdoCcpTdExcludeimg', 'setdisabledradio'], 
          ['rdoCcpTdPosswitch', 'setdisabledradio'],
          ['rdoCcpTdImgswap', 'setdisabledradio'], 
          ['rdoCcpTdBgimage', 'setdisabledradio'], 
          ['rdoCcpTdVmlbutton', 'setdisabledradio'], 
          // !VA Remove the pointer-events property from the mock checkbox and remove the disabled class from the label element
          [ 'spnCcpTableIncludeWrapperCheckmrk', 'setdisabledcheckbox'], 
          // !VA Remove the disabled class from the text input elements.
          ['iptCcpImgClass', 'setdisabledtextinput'], 
          ['iptCcpTableWidth', 'setdisabledtextinput'], 
          ['iptCcpTableClass', 'setdisabledtextinput'], 
          ['iptCcpTableWrapperWidth', 'setdisabledtextinput'], 
          ['iptCcpTableWrapperClass', 'setdisabledtextinput']
        );
        
        
      } else if ( id === ccpUserInput.rdoCcpImgFluid) {
        Appobj.rdoCcpImgFixed = false, Appobj.rdoCcpImgFluid = true;
        // !VA Fluid-specific properties
        // !VA This is where the existing values would be copied to the element placeholder attribute
        Appobj.spnCcpTableIncludeWrapperCheckmrk = 'on';
        Appobj.iptCcpImgClass = 'img-fluid';
        Appobj.iptCcpTableWidth = '100%';
        Appobj.iptCcpTableClass = 'devicewidth';
        Appobj.iptCcpTableWrapperWidth = '100%';
        Appobj.iptCcpTableWrapperClass = 'responsive-table';
        Appobj.iptCcpTdClass = '';
        Appobj.iptCcpTdBgColor = '';
        // !VA Branch: implementAppobj06 (061820)
        // !VA IMPORTANT: Not sure if it's best to put this here or only in Attributes, since it only affects the Clipboard output. Leaving it here for now since it doesn't hurt anything
        Appobj.styCcpTableWrapperStyle = 'style = "max-width: ' + Appobj.imgW + ';"';
        
        // !VA Write the Appobj presets to the CCP DOM. Some of these existing values should be copied to the element's placeholder attribute
        UIController.writeAppobjToDOM(
          // !VA Preset values for the fluid imgType option
          [ 'iptCcpImgClass', Appobj.iptCcpImgClass ], 
          [ 'iptCcpTableWidth', Appobj.iptCcpTableWidth ], 
          ['iptCcpTableClass', Appobj.iptCcpTableClass ], 
          ['iptCcpTableWrapperWidth', Appobj.iptCcpTableWrapperWidth ],
          ['iptCcpTableWrapperClass', Appobj.iptCcpTableWrapperClass ],  
          [ 'iptCcpTdClass', Appobj.iptCcpTdClass ],
          [ 'iptCcpTdBgColor', Appobj.iptCcpTdClass ]
        );

        // !VA Some of these existing values should be copied to the element's placeholder attribute
        UIController.handleCcpActions( true, 
          // !VA Set the 'rdoCcpTdBasic' td option
          [ 'rdoCcpTdBasic', 'selectradio'],
          // !VA Make sure the Include wrapper checkbox is selected 
          [ 'spnCcpTableIncludeWrapperCheckmrk', 'setcheckbox'], 
          // !VA Disable all td radio buttons except the 'rdoCcpTdBasic' option
          ['rdoCcpTdExcludeimg', 'setdisabledradio'], 
          ['rdoCcpTdPosswitch', 'setdisabledradio'],
          ['rdoCcpTdImgswap', 'setdisabledradio'], 
          ['rdoCcpTdBgimage', 'setdisabledradio'], 
          ['rdoCcpTdVmlbutton', 'setdisabledradio'], 
          // !VA Make sure the Include wrapper table options are displayed
          ['iptCcpTableWrapperWidth', 'setactiveparent'], 
          ['iptCcpTableWrapperClass', 'setactiveparent'], 
          ['selCcpTableWrapperAlign', 'setactiveparent'], 
          ['iptCcpTableWrapperBgColor', 'setactiveparent'],
          // !VA Display the allowable TD options for the fluid imgtype
          [ 'iptCcpTdClass', 'setactiveparent'],
          [ 'iptCcpTdBgColor', 'setactiveparent'],
          // !VA Turn off pointer-events (set in CSS) and apply the disabled class to the label
          [ 'spnCcpTableIncludeWrapperCheckmrk', 'setdisabledcheckbox'], 
          // !VA Disable all the fluid-specific options so the user cannot change them
          ['iptCcpImgClass', 'setdisabledtextinput'], 
          ['iptCcpTableWidth', 'setdisabledtextinput'], 
          ['iptCcpTableClass', 'setdisabledtextinput'], 
          ['iptCcpTableWrapperWidth', 'setdisabledtextinput'], 
          ['iptCcpTableWrapperClass', 'setdisabledtextinput']
        );
      } else {
        console.log('ERROR in handleImgType - unknown condition');
      }
      // console.log('handleImgType Appobj: ');
      // console.dir(Appobj);
    }

    // !VA appController private 
    // !VA Function to display/undisplay the CCP wrapper table options if the checkbox is checked. If Appobj.spnCcpTableIncludeWrapperCheckmrk === 'off', run this to turn it on.
    function showIncludeWrapperOptions(flag) {
      // console.log('showIncludeWrapperOptions running');
      // !VA If the Include wrapper checkbox is checked, show the dependent options. Otherwise, undislay them.
      if (Appobj.spnCcpTableIncludeWrapperCheckmrk === 'on') {
        flag = true;
      } else if (Appobj.spnCcpTableIncludeWrapperCheckmrk === 'off') {
        flag = false;
      } else {
        console.log('ERROR in showIncludeWrapperOptions: unknown condition');
      }
      UIController.handleCcpActions( flag, 
        [ 'iptCcpTableWrapperClass', 'setactiveparent' ], 
        [ 'iptCcpTableWrapperWidth', 'setactiveparent' ], 
        [ 'selCcpTableWrapperAlign', 'setactiveparent' ], 
        [ 'iptCcpTableWrapperBgColor', 'setactiveparent' ]);

    }

    // !VA appController private 
    // !VA Toggles a mock checkbox. This is only for toggling triggered by an event handler. Switching the checkboxes on and off programatically can be done by calling handleCcpActions.
    function toggleCheckbox(evt) {
      console.log('toggleCheckbox running: ');
      let chkId, checkbox;
      chkId = '#' + evt.target.id;
      // !VA Convert the 'mock' checkbox, which is the event target, to the actual HTML checkbox input so it can be processed by replacing  the mock checkbox indicator strings checkmark ID with the strings indicating the actual HTML checkbox element.
      chkId = chkId.replace('mrk', 'box');
      chkId = chkId.replace('spn', 'chk');
      // !VA Select the actual HTML checkbox element
      checkbox = document.querySelector(chkId);
      console.log('chkId is: ' + chkId);
      // !VA Toggling the checkbox entails switching the checked state of the checkbox element on and of AND setting the corresponding Appobj property and, for Include wrapper checkbox, showing/hiding the dependent Include wrapper options.
      if (checkbox) {
        // !VA If option is a click event, toggle the checkmark on click and write the checked value to Appobj
        if (checkbox.checked) {
          checkbox.checked = false;
          console.log('checkbox.checked is: ' + checkbox.checked);
          if ( '#' + evt.target.id   === ccpUserInput.spnCcpImgIncludeAnchorCheckmrk) {
            Appobj.spnCcpImgIncludeAnchorCheckmrk = 'off';
          } else if ( '#' + evt.target.id   === ccpUserInput.spnCcpTableIncludeWrapperCheckmrk) {
            Appobj.spnCcpTableIncludeWrapperCheckmrk = 'off';
            showIncludeWrapperOptions(false);
          }
          
        } else {
          checkbox.checked = true;
          console.log('checkbox.checked is: ' + checkbox.checked);
          if ( '#' + evt.target.id   === ccpUserInput.spnCcpImgIncludeAnchorCheckmrk) {
            Appobj.spnCcpImgIncludeAnchorCheckmrk = 'on';
          } else if ( '#' + evt.target.id   === ccpUserInput.spnCcpTableIncludeWrapperCheckmrk) {
            Appobj.spnCcpTableIncludeWrapperCheckmrk = 'on';
            showIncludeWrapperOptions(true);
          }
        }
      } else {
        console.log('ERROR in toggleCheckbox: unkknown checkbox state');
      }

    }

    // !VA END CCP FUNCTIONS
      
    // !VA Show element when input in another element is made 
    // !VA appController private
    // !VA Branch: implementAppobj08 (062020)
    // !VA This needs to be integrated into one of the keyboard event handlers. Can't have two event handlers for the same event. Right now, let's focus on getting values from the keyboard input and deal with this later. - commenting out the event handler in setupEventListeners
    function showElementOnInput(event) {
      console.log('showElementOnInput running');
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
      // console.log('getAppMessageStrings Appobj: ');
      // console.dir(Appobj);
      let appMessContent;
      // !VA Set tooltipContent to ''. This overwrites tooltipContent being undefined if tooltipid is invalid
      appMessContent = '';
      // !VA Tooltip unique code/value pairs defined here
      const getAppMessageStrings = {
        // !VA STATUS
        msg_copied_2_CB: 'Code snippet copied to Clipboard!',
        // !VA ERRORS
        err_not_Integer: 'This value has to be a positive whole number - try again or press ESC.',
        err_imgW_GT_viewerW: `Image width must be less than the current parent table width of ${Appobj.viewerW}px. Make the parent table wider first.`,
        err_tbButton_LT_zero: 'Image dimension can\'t be less than 1.',
        err_tbButton_GT_viewerW: `Image can't be wider than its parent table. Parent table width is currently ${Appobj.viewerW}px`,
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
      // let win;
      // !VA Open a new fixed-size window with no browser elements except the URL bar
      // !VA Not currently using the window object that the open method creates, but leave it for reference
      // win = window.open(curURL,'targetWindow',  
      window.open(curURL,'targetWindow',  
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
    // !VA Get the Appobj property that corresponds to the ID of the DOM input element that sets it. 1) Removes the hypens in the ID string, converts the identifier string (the Appobj/ccpUserInput property name string) to lowercase, finds the match, and returns the aforementioned Appobj/ccpUserInput property name string.
    function elementIdToAppobjProp(id) {
      // console.log('elementIdToAppobjProp running');
      let idStr, appobjProp;
      idStr = id;
      // !VA Strip all the hypens out of the ID (str)
      idStr = idStr.replace(/-/g,'');
      // !VA Loop through the Object.keys array and 
      var appobjArray = Object.keys(Appobj);
      for (let i = 0; i < appobjArray.length; i++) {
        // !VA If the lowercase Appobj property name is contained in the id, then put the original Appobj property name match into appobjProp.
        // !VA TODO: Make this an arrow function with find, like below
        // var ret = Object.keys(IDtoProp).find(key => IDtoProp[key] === str);
        if (idStr.includes(appobjArray[i].toLowerCase())) {
          appobjProp = appobjArray[i];
        }
      }
      // !VA This should return directly wihout a ret variable as tmp storage.
      // var ret = Object.keys(IDtoProp).find(key => IDtoProp[key] === str);
      return appobjProp;
    }



    // !VA appController public functions
    return {

      // !VA Access Appobj from outside appController. If identifier is 'undefined' i.e. not specified in the function call, then return the entire Appobj. If it is specified and is a property identifier, i.e. an Appobj property name, return the corresponding property value. 
      // !VA Branch: implementCcpInput04 (062520)
      // !VA getAppobj won't work here. The call comes before Appobj is populated. See https://stackoverflow.com/questions/62585279/javascript-object-both-has-properties-and-is-empty - which cost me about a day.
      getAppobj2: function(...identifiers) {
        console.log('getAppobj2 running');
        let retval, arr;
        Appobj = UIController.populateAppobj(Appobj, 'all');

        // for (const property in Appobj) {
        //   console.log(`for/in ${property}: ${Appobj[property]}`);
        // }



        // console.log('getAppobj2 Appobj is: ');
        // console.dir(Appobj);
        // if (Object.keys(Appobj).length == 0) { 
        //   console.log('getAppobj2 NO LENGTH');
        // } else {
        //   console.log('getAppobj2 HAS LENGTH');
        // }


        if (typeof identifiers === 'undefined') {
          console.log('UNDEFINED2');
          retval = Appobj;
        } else {
          console.log('identifiers: ');
          console.dir(identifiers);
          // retarr = identifiers;

          arr = Object.keys(Appobj);
          for (let i = 0; i < arr.length; i++) {
            // !VA If the first 8 characters of the Appobj property name is rdoCcpTd, then loop through the property names and find the one whose value is true. That is the selected tdoptions radio button. Then loop though the ccpUserInput element alias list and get the element ID of the selected tdoptions radio button, and call handleTdOptions with that ID as parameter.
            // !VA TODO: Make this an arrow function with find, like below
            // var ret = Object.keys(IDtoProp).find(key => IDtoProp[key] === str);
            if (key === identifiers[i]) {
              console.log('HIT');
              retval = value;
              // console.log('retval is: ' + retval);
            }
          }


          for (let i = 0; i < identifiers.length; i++) {
            console.log('identifiers[i] is: ' +  identifiers[i]);
            for (const [key, value] of Object.entries(Appobj)) {
              if (key === identifiers[i]) {
                console.log('HIT');
                retval = value;
                // console.log('retval is: ' + retval);
              }
            }
          }
        }
        console.log('retval is: ' + retval );

        return retval;
      },



      // !VA Access Appobj from outside appController. If identifier is 'undefined' i.e. not specified in the function call, then return the entire Appobj. If it is specified and is a property identifier, i.e. an Appobj property name, return the corresponding property value. If it is neither of the above, erro
      getAppobj: function(identifier) {



        console.log('getAppobj running');
        // console.log('identifier is: ' + identifier);
        // console.log('getAppobj Appobj: ');
        // console.dir(Appobj);
        let retval;
        if (typeof identifier === 'undefined') {
          // console.log('UNDEFINED');
          retval = Appobj;
        } else {
          // console.log('identifier is: ' + identifier);
          retval = identifier;
          for (const [key, value] of Object.entries(Appobj)) {
            // console.log('key is: ' + key);
            if (key === identifier) {
              console.log('HIT');
              retval = value;
              console.log('getAppobj retval is: ' + retval);
            }
          }
        }
        return retval;
      },

      // !VA appController public 
      // !VA Called from UIController.toggleCcp in initUI devMode where you can init with CCP open or closed. Otherwise, UIController.toggleCcp is called from the click handler. 
      // !VA Branch: implementCcpInput05 (062720)
      // !VA Create sister function to batchAppobjToDOM - batchDOMToAppobj
      initCcp: function () {
        let ccpState;
        // !VA Get the current open/closed state of the CCP
        ccpState = UIController.toggleCcp(true);
        console.log('ccpState is: ' + ccpState);
        if (ccpState) {
          // !VA Branch: implementCcpInput05 (062720)
          // UIController.populateAppobj(Appobj, 'ccp');

          // !VA Do logic for opening the CCP with the current state of the selected options reflected. batchAppobjToDOM only runs handleTdOptions for the rdoCcpTdImgswap option. Everything else carries over when the CCP is open and closed.
          batchAppobjToDOM();

        } else if (!ccpState) {
          // !VA Branch: implementCcpInput05 (062720)
          // !VA On closing the CCP, this is where we need to save all the DOM settings so they can be restored by batchAppobjToDOM. Not even sure this is necessary now since the problem with the input fields resetting has been dealt with.
          batchDOMToAppobj();
        } else {
          console.log('ERROR in initCCP - unknown ccpState');
        }
      },


      // !VA Dev Mode pass-thru public functions to expose calcViewerSize and initCcp to UIController.initUI
      // !VA DEV MODE
      // !VA ------------------------------
      // !VA appController public: DEVMODE
      initCalcViewerSize: function() {
        calcViewerSize(true);
      },
      // !VA appController public: DEVMODE
      // initToggleImgType: function () {
      //   toggleImgType(false);
      // },
      // !VA appController public: DEVMODE
      // initToggleIncludeWrapper: function () {
      //   toggleIncludeWrapper('init');
      // },
      // !VA appController public: DEVMODE
      // initShowTdOptions: function () {
      //   showTdOptions(false);
      // },
      // !VA DEV MODE END
     


      // !VA appController public
      // !VA APP MESSAGES START
      // !VA This is the entry point where we sort the three types of messages. We have the target id for all three types. For tooltips, we have it in the event object passed in from the event handler. For msg and err, we can't get it because handleAppMessages only takes one parameter -- either the event for tooltips or the appMessCode for msg and err. 
      // !VA So now the problem is that tooltips require the caller id because the tooltip shows on mouseenter and has to hide on mouseleave, and we need the id for the mouseleave to create the eventListener for it. So:
      // !VA Call showAppMessages with two parameters: targetid, which is either a string for tooltips or false for msg and err, and the second parameter is the appMessContent.
      handleAppMessages: function ( evt ) {
        let appMessCode, appMessType, appMessContent, duration, appMessContainerId, tooltipTarget;
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

        // !VA Branch: implementCcpInput05 (062720)
        // !VA initialize/populate the CCP. tableWidth and tableWrapperWidth are undefined, they don't get written until resizeContainers.
        UIController.populateAppobj(Appobj, 'ccp');
        // !VA Initialize the 'basic' tdoption
        handleTdOptions(ccpUserInput.rdoCcpTdBasic); 
        // !VA Set up event listeners
        setupEventListeners();
        
        // !VA  Test if there is currently #cur-img element with an image.If there is, it's hardcoded in the HTML and we're in DEV MODE. If there's not, the app is being initialized in USER MODE.
        document.querySelector(dynamicRegions.curImg) ? initMode = 'devmode' : initMode = 'prod';
        // !VA Initialize the UI
        UICtrl.initUI(initMode);

        console.log('init Appobj is: ');
        console.log(Appobj);

      }
    };

  })(CBController, UIController);

  appController.init();

//Namespace closure
})();