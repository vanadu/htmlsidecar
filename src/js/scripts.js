// !VA REBOOT 12/29/19
// ===================
// See C:\Users\VANA\OneDrive\WhittyReview_12.30.19.docx

// !VA GENERAL NOTES
/* !VA  - February Reboot Notes
=========================================================
// !VA 02.23.20
In progress:
TODO: Deal with the indents and embedded tag issue.

For later:
TODO: The CSS output will need to be revisited. You'd never need to output the width AND height in CSS for tables and for td it probably has no effect for height. That means...ugh.
TODO: It's bad that writeClipboard is called even when that clipboard isn't being output. ccpMakeTdTag calls ccpMakeImgTag which calls writeClipboard -- that makes no sense. 

DONE: All tables must have cellspacing border and cellpadding attributes!
DONE: Is including the id in the make element functions necessary? YES, clipboardJS requires it!
DONE: Renaming clipboard buttons and elements...
DONE: Fix type error in ccpMakeTdTag -- Done, ccpMakeImgTag now returns the img object but passes img.outerHTML to writeClipboard. writeClipboard doesn't parse anything now, only takes the string and outputs it.
DONE: Make clipboard CSS bvuttons work.
DONE: Td large phone width css is wrong. Somehow that got fixed but I don't know when.
DONE: Toolbar small and large phones don'g retain value on tab out -- fixed.
DONE: Fix the toolbar sm phone and lg phone buttons and set to iPhone width of 414pxl


// !VA Long-term TODO
----------------------
TODO: Figure out why queryDOMElements is running mutliple times per CB build.
TODO: There's an issue with what to do if the user grows the image past the viewer height, but not past the viewer width. Currently, the image height CAN grow past the viewer height; the only limitation is that it can't grow past the viewer WIDTH. That's no good.


/*


/* !VA  - 06.23.19
=========================================================


TODO: rewrite getAppdata to only query specific items in the array, or at least use destructuring to only make a const out of which ever Appdata property is needed in the respective function.
TOD0: Think about making getAppdata only query a specific property if possible.
TODO: Fix being able to resize viewerW smaller than imgW - current behavior is imgw resizes with viewerW. If that's the desired behavior, imgW still doesn't write the udpated width to Appdata, that needs to be fixed.
TODO: Make mrk => box function...not sure where though or whether it's necessary since it's just a one-liner.
TODO: Fix bug - load 400X1000, multiple click on +50, Display Size shows 450 but the img doesn't grow...
TODO: Implement image swap 
TODO: Parent table class att only shows in CB output if Wrapper is selected, not in just the Partent table output.
TODO: Make bgcolor add the hash if it's not in the value
TODO: Fix, when imgNW is greater than imgW the imgNW size flashes before resizing to the viewer size. This is probably because of the settimeout, which might not be necesssary if the onload function is running.
TODO: THe CCP should store all the currently selected options and restore them whenever the ccp is opened -- I think. Not sure if this is the right behavior...think bout it. Probably not.YOUTBV
TODO: Assign keyboard  shortcuts
TODO: Assign tab order

DONE: Reduce timeout on clicking clipboard buttons...too slow. There has to be two implementations of messages - one for status messages that only last a half a second and use the blocker, and one for error messages that last two seconds and don't use the blocker.
DONE: Fixed error messages - they didn't fade out. Loop that in with flashAppMessage
DONE: Implement Td and table copy to clipboard buttons.
DONE: Uncheck and Hide Wrapper table options when CCP is opened.
DONE: Fix flashAppMessage to include status messages and cleanup
DONE: Fix showElementOnInput in CCP
Merge Branch 0619FixPhonesInput
DONE: fixed sPhonesw and iptTbrLPhonesW user input.
Merge fixAppMessages
DONE: Fixed, imgW field on tab doesn't reset to placeholders. 
DONE: Rewrite updateAppdata to be parameters... with key/value pairs as parameter.
DONE: Fold handleToolbarClicks into checkUserInput and rename to checkUserInput
Branch checkUserInput
DONE: Branch rewriteHandleUserAction061119
DONE: Fix that iSmallPhones and iLargePhones input fields show undefined and show in Appdata as pixel values.
DONE: Fix default value in viewerW field - Fixed, added to calcViewerSize
DONE: resize viewerW doesn't work Fixed, reconfigured updateAppdata to include viewerW
DONE: - imgheight and imgwidth don't work Fixed, added evalToolbarInput to follow checkUserInput
DONE: Rename UI.
DONE: Show/Hide CCP, make checkboxes functional.
*/
//SCRIPT START
//PAGE SETUP START

// Namespace
var Whitty = (function () {

  // !VA Run on page load
  // document.addEventListener("DOMContentLoaded", function() {
  //   setTimeout(function(){ 
  //     console.log('timeout'); 
  //     document.querySelector(btnCcpMakeClips.btnCcpMakeImgTag).click();

  //   }, 3000);


  // });

  // !VA DEV Test function to get the clicked element to the console
  // (function () {
  //   document.addEventListener('click', function(e) {
  //     e = e || window.event;
  //     var target = e.target || e.srcElement,
  //       text = target.textContent || target.innerText;   
  //   }, false);
  // })();



  // !VA Click on Witty logo to run test function
  // var testbut = document.querySelector('#testme');
  // console.log('testbut is: ' + testbut);
  // testbut.addEventListener('click', runMe, false);
  // // testBut.addEventListener('click', runMe, false);

  // function runMe(evt) {
  //   console.log('evt.target.id is: ' + evt.target.id);

  //   var str = 'btn-ccp-make-table-dsktp-css-rule'
  //   var str1 = str.slice(-4);
  //   console.log('str1 is: ' + str1);

  



  //   console.log('running me');
  //   let output;
  //   let classname = 'alsdfadf';
  //   let val = 848;
  //   let id = 'runMe';
  //   output = `${classname} { width: ${val}px !important}`;

  //   var currentCB = new ClipboardJS('#' + id, {
  //     text: function(trigger) {

  //       // var clipboardStr = ccpImgBuildHtmlClip();
  //       // !VA Write success message to app message area on success
  //       currentCB.on('success', function(event) {
  //         appController.initMessage(false, 'copied_2_CB');
  //         // debugger;
  //       });

  //       currentCB.on('error', function(e) {
  //         console.error('Action:', e.action);
  //         console.error('Trigger:', e.trigger);
  //       });
  //       // !VA Return the clipboard string to clipboard.js to paste it to the clipboard
  //       return output;
  //     }
  //   });
  // }






  var UIController = (function() {

    // !VA This is where Appdata should be initialized
    var Appdata = {};

    // !VA UIController: Inspector ID strings
    var iInspectors = {
      iFilename: '#i-filename',
      iDisplay: '#i-display-size',
      iDisksize: '#i-disk-size',
      iAspect: '#i-aspect',
      iSmallPhones: '#i-small-phones',
      iLargePhones: '#i-large-phones',
      iRetina: '#i-retina',
      btnToggleCcp: '#btn-toggle-ccp'
    };

    // !VA UIController: toolButton ID Strings
    var toolbarElements = {
      iptTbrViewerW: '#ipt-tbr-viewerw',
      btnTbrIncr50: '#btn-tbr-incr50',
      btnTbrIncr10: '#btn-tbr-incr10',
      btnTbrIncr01: '#btn-tbr-incr01',
      iptTbrImgWidth: '#ipt-tbr-imgwidth',
      toggleImgSize: '#toggle-image-size',
      iptTbrImgHeight: '#ipt-tbr-imgheight',
      btnTbrDecr01:'#btn-tbr-decr01',
      btnTbrDecr10: '#btn-tbr-decr10',
      btnTbrDecr50: '#btn-tbr-decr50',
      iptTbrSPhonesWidth: '#ipt-tbr-sphones-width',
      iptTbrLPhonesWidth: '#ipt-tbr-lphones-width',
    };

    //!VA If we separate this out into UI objects that correspond to the objects we want to create, then we can just loop through them rather than define each property separately. So, dynamicElements are those that resize based on the current image... but I haven't figured out how to loop through them yet.
    // !VA UIController: dynamicRegions
    var dynamicRegions = {
      curImg: '#cur-img',
      imgViewer: '#main-image-viewer',
      imgViewport: '#image-viewport',
      appContainer: '#app-container',
    };

    // !VA UIController: staticRegions
    var staticRegions = {
      dropArea: '#drop-area',
      tbrContainer: '#toolbar-container',
      ccpContainer: '#ccp',
      msgContainer: '#msg-container',
      msgDisplay: '#msg-content',
      ccpBlocker: '#ccp-blocker'
    };

    // !VA  UIController: ccpUserInput ID Strings
    // !VA imgAnchor is just a flag for the status of the checkbox. The actual propStrings have to have an Open and Close property.
    var ccpUserInput = {
      iptCcpImgClass: '#ipt-ccp-img-class',
      // imgAnchor: '#chk-ccp-img-anchor',
      // !VA iptCcpImgAlt
      iptCcpImgAlt: '#ipt-ccp-img-alt',
      // !VA This isn't even a thing... probably delete it 04.28.19
      // !VA Not renaming the checkbox/checkmarks for now because they already have code that queries the last three characters to determine if mrk or box...
      spnCcpImgIncludeWidthHeightCheckmrk: '#spn-ccp-img-include-width-height-checkmrk',
      selCcpImgAlign: '#sel-ccp-img-align',
      iptCcpImgRelPath: '#ipt-ccp-img-relpath',
      iptCcpTdClass: '#ipt-ccp-td-class',
      selCcpTdAlign: '#sel-ccp-td-align',
      selCcpTdValign: '#sel-ccp-td-valign',
      iptCcpTdBgColor: '#ipt-ccp-td-bgcolor',
      // !VA spn-ccp-td-bgimage-checkmrk
      // !VA This is deprecated as of today
      // spnCcpTdBgimageCheckmrk: '#spn-ccp-td-bgimage-checkmrk',
      rdoCcpTdBasic: '#rdo-ccp-td-basic',
      rdoCcpTdPosswitch: '#rdo-ccp-td-posswitch',
      rdoCcpTdBgimage: '#rdo-ccp-td-bgimage',


      iptCcpTableClass: '#ipt-ccp-table-class',
      selCcpTableAlign: '#sel-ccp-table-align',
      // !VA iptCcpTableWidth
      iptCcpTableWidth: '#ipt-ccp-table-width',
      // !VA Not in use yet
      // tableMaxWidth: '#ipt-ccp-table-max-width',
      iptCcpTableBgColor: '#ipt-ccp-table-bgcolor',
      spnCcpTableIncludeWrapperCheckmrk: '#spn-ccp-table-include-wrapper-checkmrk',
      // !VA spn-ccp-table-include-wrapper-checkmrk
      iptCcpTableWrapperClass: '#ipt-ccp-table-wrapper-class',
      iptCcpTableWrapperWidth: '#ipt-ccp-table-wrapper-width',
      selCcpTableWrapperAlign: '#sel-ccp-table-wrapper-align',
      iptCcpTableWrapperBgColor: '#ipt-ccp-table-wrapper-bgcolor',
    };

    //iInspectors.btnToggleCcp
    //iInspectors.btnToggleCcp for assembling the clipboard create tag buttons. We also store the functions that are run in the CBController module to build the clipboard snippets when each of these elements is clicked so that we can just loop through the properties, get the current event target and run the associated function without an extra switch statement or other conditional at that stage.

    var btnCcpMakeClips = {
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
      // !VA Make Table CSS Rule Buttons
      btnCcpMakeTableDsktpCssRule:  '#btn-ccp-make-table-dsktp-css-rule',
      btnCcpMakeTableSmphnCssRule: '#btn-ccp-make-table-smphn-css-rule',
      btnCcpMakeTableLgphnCssRule: '#btn-ccp-make-table-lgphn-css-rule',
      
    };

    // !VA Run test function on page load
    // document.addEventListener('DOMContentLoaded', function() {
    //   setTimeout(function(){ 
    //     CBController.runTest();
        
    //   }, 500);
    // });




    // !VA UIController private evalInspectorAlerts
    // !VA Reboot: passing in Appdata...it was iInspectors, but writeInspectors doesn't pass iInspectors. So let's see if there's a difference between the passed Appdata and the queried Appdata. Not relevant at this point since Appdata has no data...
    function evalInspectorAlerts(passedAppdata) {
      // console.log('Appdata passed from WriteInspectors is:');
      // console.dir(passedAppdata);
      var allInspectors;
      allInspectors = UIController.getInspectorIDs();
      // !VA Query Appdata
      var Appdata = {};
      Appdata = appController.initGetAppdata(false);
      // console.dir(Appdata);
      // console.log('Appdata queried here is:');
      // console.log('iInspectors is: ' + iInspectors);
      // console.dir(iInspectors);
      // !VA Size On Disk is NOT 2X the Display Size: flag Size on Disk and Retina
      var curInspector = [];
      if (Appdata.imgNW <= (Appdata.imgW * 2) ) {
        curInspector.push(allInspectors.iDisksize);
      } 
      // !VA Small phones isn't at least 2X size on Disk and Retina
      if (Appdata.imgNW < (Appdata.sPhonesW * 2) ) {
        curInspector.push(allInspectors.iSmallPhones);
      } 
      // !VA Large phones isn't at least 2X Size on Disk and Retina
      if (Appdata.imgNW < (Appdata.lPhonesW * 2) ) {
        curInspector.push(allInspectors.iLargePhones);
      } 

      // !VA Reset all the dim viewer alerts by passing in the entire Inspector array
      UIController.writeInspectorAlerts(iInspectors, false);
      // !VA Now set the individual dim viewer alerts for the current image.
      UIController.writeInspectorAlerts(curInspector, true);
    }


    // !VA UIController public functions
    return {
      // !VA V2 Return all the strings for the UI element's IDs
      getInspectorIDs: function() {
        return iInspectors;
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
      // getCcpPropStringsIDs: function() {
      //   return ccpPropStrings;
      // },
      getCcpUserInputIDs: function() {
        return ccpUserInput;
      },
      getCcpBuildTagIDs: function() {
        return ccpMakeClip;
      },
      getCcpMakeClipButIDs: function() {
        return btnCcpMakeClips;
      },

      // !VA UIController public getAppdata
      // !VA Moving getAppdata from appController to UIController because Appdata is derived from the DOM elements and data properties that reside in the DOM. 

      queryDOMElements: function() {
        // console.log('queryDOMElements running...');
        // !VA NEW This needs to ONLY return the non-calculated DOM elements and data properties: curImg.imgW, curImg.imgW, curImg.imgNW, curImg.NH and viewerW. Aspect is calculated so we don't need to get that here, leave that to appController.
        // !VA NEW We will get the individual properties and return them as an ES6 array.
        // !VA Declare the local vars
        // !VA Reboot - should these vars be renamed according to the new scheme? I am going to use the convention fname - iFilename when used in variable name.
        var fname, viewerW, viewerH, imgW, imgH, imgNW, imgNH, sPhonesW, lPhonesW;
        var els = {fname, viewerW, viewerH, imgW, imgH, imgNW, imgNH, sPhonesW, lPhonesW};

        // !VA Get the iFilename from the Inspector
        els.fname = document.querySelector(iInspectors.iFilename).textContent;
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



      // !VA UIController public initUI
      initUI: function() {
        console.log('initUI');
        // !VA  Initialize the ImgViewer to accomodate the dragArea. This should be the same as the CSS definition: currently 650x450
        // !VA DEV Write the computed styles to console to make sure they are as expected: 650x450
        // var cStyles = window.getComputedStyle(document.querySelector(dynamicRegions.imgViewer));
        // viewerW = cStyles.getPropertyValue('width');
        // viewerH = cStyles.getPropertyValue('height');
        // console.log('viewerW is: ' + viewerW); 
        // console.log('viewerH is: ' + viewerH); 

        // !VA Make sure the tbrContainer is off and the dropArea is on.
        document.querySelector(staticRegions.dropArea).style.display = 'flex';
        document.querySelector(staticRegions.tbrContainer).style.display = 'none';
        document.querySelector(iInspectors.btnToggleCcp).style.display = 'none';

        const dimarray = Object.values(iInspectors);
        console.log('dimarray is: ' + dimarray);
        for ( let i = 0; i < dimarray.length; i++ ) {
          if ( dimarray[i] !== '#btn-toggle-ccp' &&  dimarray[i] !== '#i-filename' ) {
            document.querySelector(dimarray[i]).innerHTML = '<span class="pop-font">&nbsp;&nbsp;No Image</span>';
          } 
        } 
      },

      // !VA UIController public writeInspectors
      writeInspectors: function() {
        // !VA We need the current value in iInspectors.iSmallPhones and iInspectors.iLargePhones to display all the iInspectors. So, if it's not explicitly user-defined, then use the default placeholder value from the HTML, then get the height from getAspectRatio
        var Appdata = {};
        // !VA Get the current Appdata
        Appdata = appController.initGetAppdata();
        // !VA Hide the dropArea
        document.querySelector(staticRegions.dropArea).style.display = 'none';
        // Write the iInspectors
        document.querySelector(iInspectors.iFilename).innerHTML = `<span class='pop-font'>${Appdata.fname}</span>`;
        document.querySelector(iInspectors.iDisplay).innerHTML = `<span class='pop-font'><span id="display-size-width">${Appdata.imgW}</span> X <span id="display-size-height">${Appdata.imgH}</span></span>`;
        document.querySelector(iInspectors.iDisksize).innerHTML = `<span class='pop-font'>${Appdata.imgNW} X ${Appdata.imgNH}</span>`;
        document.querySelector(iInspectors.iAspect).innerHTML = `<span class='pop-font'>${Appdata.aspect[1]}</span>` ;
        document.querySelector(iInspectors.iSmallPhones).innerHTML = `<span class='pop-font'><span id='small-phones-width'>${Appdata.sPhonesW}</span> X <span id='small-phones-height'>${Appdata.sPhonesH}</span></span>` ;
        document.querySelector(iInspectors.iLargePhones).innerHTML = `<span class='pop-font'><span id='large-phones-width'>${Appdata.lPhonesW}</span> X <span id='large-phones-height'>${Appdata.lPhonesH}</span></span>` ;
        document.querySelector(iInspectors.iRetina).innerHTML = `<span class='pop-font'>${2 * Appdata.imgW}</span> X <span class='pop-font'>${2 * Appdata.imgH}`;
        // !VA  Display the clipboard button
        document.querySelector(iInspectors.btnToggleCcp).style.display = 'block';
        // !VA Call evalInspectorAlerts to calculate which Inspector values don't meet HTML email specs.
        // !VA Reboot: nothing is passed here, although evalInspectorAlerts expects an argument. So lets' try to pass Appdata
        evalInspectorAlerts(Appdata);
      },

      // !VA  I had this as private but moved to public, not sure why.
      //UIController public writeInspectorAlerts
      writeInspectorAlerts: function(curInspectors, bool) {
        // !VA if evalInspectorAlerts returns true, then the Inspector should be displayed in red. To reset the dim alert, set to style color to 'auto'.
        var att = bool;
        bool ? att = 'red': att = 'inherit';
        // !VA We want to use this same function to reset the dim alerts when a new image is loaded. For that, we need to pass in an array of all the Inspector IDs, not just an array of the ones that are already red. So, first test if the argument is an object, and if it is convert it into a list of values so the loop will accept it.
        if (Array.isArray(curInspectors) === false) {
          curInspectors = Object.values(curInspectors);
        }
        // !VA For each Inspector passed from evalInspectorAlerts, set the font color style based on the bool argument passed in.
        for (let i = 0; i < curInspectors.length; i++) {
          document.querySelector(curInspectors[i]).style.color = att;
        }
      },

      // UIController: Flash a status message in the app message area
      // !VA  - review this. We could probably fold this into the error handler but that's going to be complicated enough as it is and this is just for status messages
      flashAppMessage: function(messArray) {
        // !VA Receives an array of a boolean error flag and the message to be displayed.
        // !VA Init error flag, message string and timeout delay
        var isErr, mess, del;
        isErr = messArray[0];
        mess = messArray[1];
        var del;

        // !VA Get the message container and display text into variables
        var msgContainer = document.querySelector(staticRegions.msgContainer);
        var msgDisplay = document.querySelector(staticRegions.msgDisplay);
        var ccpBlocker = document.querySelector(staticRegions.ccpBlocker);
        var messType;
        // !VA If it's an error, show class show-err, otherwise it's a status message so show-mess
        isErr ? messType = 'show-err' : messType = 'show-mess';

        // !VA If isErr is false, then it's a status message, overlay the CCP blocker to prevent user input while the CSS transitions run and the status message is displayed. Cheap, but effective solution.
        isErr ? isErr : ccpBlocker.style.display = 'block';
        // !VA Add the class that displays the message
        msgContainer.classList.add(messType);
        // !VA Write the message to the message display area
        msgDisplay.innerHTML = mess;
        // !VA Add the class to show the message
        msgContainer.classList.add(messType);
        // !VA If it's an error, let it display for 2.5 seconds. If it's a status, just flash it because while it's onscreen the CCP blocker is active and we want that to be short.
        isErr ? del = 2500 : del = 500;



        // !VA Show the message for two seconds
        window.setTimeout(function() {
        // !VA After two seconds, hide the message and remove the blocker
          msgContainer.classList.add('hide-mess');
          ccpBlocker.style.display = 'none';
          setTimeout(function(){
            // !VA Once the opacity transition for the message has completed, remove the show-mess class from the element and set the innerHTML back to empty
            msgContainer.classList.remove(messType);
            msgContainer.classList.remove('hide-mess');
            msgDisplay.innerHTML = '';

          },250);
        }, 
        del);
      },
    };

    
  })();


  var CBController = (function() {


    // !VA CBController private functions
    // !VA If we want to access any of the DOM IDs we have to call them from UIController where they're defined.
    var dynamicRegions = UIController.getDynamicRegionIDs();
    var staticRegions = UIController.getStaticRegionIDs();
    var toolbarElements = UIController.getToolButtonIDs();
    var iInspectors = UIController.getInspectorIDs();
    var ccpUserInput = UIController.getCcpUserInputIDs();
    var btnCcpMakeClips = UIController.getCcpMakeClipButIDs();


    function getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
    }


    function getCssProperties(id) {
      console.log('getCssProperties running');
      let Appdata = {};
      Appdata = appController.initGetAppdata();
      var Attributes = getAttributes();
      console.dir(Appdata); 
      var str;
      let classname, wval, hval;

      switch (true) {
      case ( id === document.querySelector(btnCcpMakeClips.btnCcpMakeImgDsktpCssRule).id) :
        classname = Attributes.imgClass;
        wval = Appdata.imgW, hval = Appdata.imgH;
        break;
      case ( id === document.querySelector(btnCcpMakeClips.btnCcpMakeImgLgphnCssRule).id) :
        classname = Attributes.imgClass;
        wval = Appdata.lPhonesW, hval = Appdata.lPhonesH;
        break;
      case ( id === document.querySelector(btnCcpMakeClips.btnCcpMakeImgSmphnCssRule).id) :
        classname = Attributes.imgClass;
        wval = Appdata.sPhonesW, hval = Appdata.sPhonesH;
        break;
      case ( id === document.querySelector(btnCcpMakeClips.btnCcpMakeTdDsktpCssRule).id) :
        classname = Attributes.tdClass;
        wval = Appdata.imgW, hval = Appdata.imgH;
        break;
      case ( id === document.querySelector(btnCcpMakeClips.btnCcpMakeTdLgphnCssRule).id) :
        classname = Attributes.tdClass;
        wval = Appdata.lPhonesW, hval = Appdata.lPhonesH;
        break;
      case ( id === document.querySelector(btnCcpMakeClips.btnCcpMakeTdSmphnCssRule).id) :
        classname = Attributes.tdClass;
        wval = Appdata.sPhonesW, hval = Appdata.sPhonesH;
        break;
      case ( id === document.querySelector(btnCcpMakeClips.btnCcpMakeTableDsktpCssRule).id) :
        classname = Attributes.tableClass;
        wval = Appdata.imgW, hval = Appdata.imgH;
        break;
      case ( id === document.querySelector(btnCcpMakeClips.btnCcpMakeTableLgphnCssRule).id) :
        classname = Attributes.tableClass;
        wval = Appdata.lPhonesW, hval = Appdata.lPhonesH;
        break;
      case ( id === document.querySelector(btnCcpMakeClips.btnCcpMakeTableSmphnCssRule).id) :
        classname = Attributes.tableClass;
        wval = Appdata.sPhonesW, hval = Appdata.sPhonesH;
        break;
      default:
        break;
      }
      makeCssRule(id, classname, wval, hval);
    }



    // !VA Constructor for the clipboard output objects. These are all the properties all the clipboard output objects (img, td and table) will have. We store these key/value pairs in instances of the ClipboardOutput  because they're easier to manage. Then we write the output into an HTML string.
    function ClipboardOutput(classAtt, alignAtt ) {
      this.classAtt = classAtt;
      this.alignAtt = alignAtt;
    }

    // !VA function ccpTdBuildHtmlClip deprecated 02/19/20
    // !VA function ccpTableBuildHtmlClip deprecated 02/19/20
    // !VA function ccpImgBuildHtmlClip deprecated 02/19/20

    // !VA New CSS RUle output functionality 02.20.20
    function  makeCssRule( id, classname, wval, hval ) {
      let clipboardStr;
      clipboardStr = `.${classname} { width: ${wval}px !important; height: ${hval}px !important; }`;
      writeClipboard(id, clipboardStr);

    }



    function ccpImgDsktpBuildCssClip(Appdata)  {
      console.log('ccpImgDsktpBuildCssClip...');
      // !VA The string to pass the CSS declaration to the clipboard object
      var clipboardStr;
      // !VA Clipboard output object 
      var imgDisplayCSSTag = new ClipboardOutput('imgDisplayCSSTag');
      // !VA Put the user-entered class into this property
      imgDisplayCSSTag.classAtt = document.querySelector(ccpUserInput.iptCcpImgClass).value;

      // !VA Build the css class declaration with width and height properties
      clipboardStr = `img.${imgDisplayCSSTag.classAtt} { width: ${Appdata.imgW}px !important; height: ${Appdata.imgH}px !important }`;
      // !VA Return the css string to the clipboard object.
      return clipboardStr;

    }

    function ccpImgSmphnBuildCssClip(Appdata)  {
      console.log('ccpImgSmphnBuildCssClip running');
      // !VA The string to pass the CSS declaration to the clipboard object
      var clipboardStr;
      // !VA Clipboard output object 
      var imgSmallPhonesCSSTag = new ClipboardOutput('imgSmallPhonesTag');
      // !VA Put the user-entered class into this property
      imgSmallPhonesCSSTag.classAtt = document.querySelector(ccpUserInput.iptCcpImgClass).value;
      // !VA Build the css class declaration with and Appdata large phone width and height properties
      clipboardStr = `img.${imgSmallPhonesCSSTag.classAtt} { width: ${Appdata.sPhonesW}px !important; height: ${Appdata.sPhonesH}px !important }`;
      // !VA Return the css string to the clipboard object.
      return clipboardStr;
    }

    function ccpImgLgphnBuildCssClip(Appdata) {
      console.log('ccpImgLgphnBuildCssClip running');
      // !VA The string to pass the CSS declaration to the clipboard object
      console.dir(Appdata);
      var clipboardStr;
      // !VA Clipboard output object 
      var imgLargePhonesCSSTag = new ClipboardOutput('imgLargePhonesCSSTag');
      // !VA Put the user-entered class into this property
      imgLargePhonesCSSTag.classAtt = document.querySelector(ccpUserInput.iptCcpImgClass).value;
      // !VA Build the css class declaration with and Appdata large phone width and height properties
      clipboardStr = `img.${imgLargePhonesCSSTag.classAtt} { width: ${Appdata.lPhonesW}px !important; height: ${Appdata.lPhonesH}px !important }`;
      // !VA Return the css string to the clipboard object.
      console.log('clipboardStr is: ' + clipboardStr);
      return clipboardStr;
    }

    function ccpTdDsktpBuildCssClip(Appdata)  {
      console.log('ccpTdDsktpBuildCssClip running');
      // !VA The string to pass the CSS declaration to the clipboard object
      var clipboardStr;
      // !VA Clipboard output object 
      var tdDisplayCSSTag = new ClipboardOutput('tdLargePhonesCSSTag');
      // !VA Put the user-entered class into this property
      tdDisplayCSSTag.classAtt = document.querySelector(ccpUserInput.iptCcpTdClass).value;
      // !VA Build the css class declaration with and Appdata large phone width and height properties
      clipboardStr = `td.${tdDisplayCSSTag.classAtt} { width: ${Appdata.imgW}px !important; height: ${Appdata.imgH}px !important }`;
      // !VA Return the css string to the clipboard object.
      return clipboardStr;
    }

    function ccpTdSmphnBuildCssClip(Appdata) {
      console.log('ccpTdSmphnBuildCssClip running');
      var clipboardStr;
      // !VA Clipboard output object 
      var tdSmallPhonesCSSTag = new ClipboardOutput('tdSmallPhonesCSSTag');
      // !VA Put the user-entered class into this property
      tdSmallPhonesCSSTag.classAtt = document.querySelector(ccpUserInput.iptCcpTdClass).value;
      // !VA Build the css class declaration with and Appdata large phone width and height properties
      clipboardStr = `td.${tdSmallPhonesCSSTag.classAtt} { width: ${Appdata.sPhonesW}px !important; height: ${Appdata.sPhonesH}px !important }`;
      // !VA Return the css string to the clipboard object.
      return clipboardStr;
    }

    function ccpTdLgphnBuildCssClip(Appdata)  {
      console.log('ccpTdLgphnBuildCssClip running');
      var clipboardStr;
      // !VA Clipboard output object 
      var tdLargePhonesCSSTag = new ClipboardOutput('tdLargePhonesCSSTag');
      // !VA Put the user-entered class into this property
      tdLargePhonesCSSTag.classAtt = document.querySelector(ccpUserInput.iptCcpTdClass).value;
      // !VA Build the css class declaration with and Appdata large phone width and height properties
      clipboardStr = `td.${tdLargePhonesCSSTag.classAtt} { width: ${Appdata.sPhonesW}px !important; height: ${Appdata.lPhonesH}px !important }`;
      // !VA Return the css string to the clipboard object.
      console.log('clipboardStr is: ' + clipboardStr);
      return clipboardStr;
    }

    function ccpTableDsktpBuildCssClip(Appdata) {
      console.log('ccpTableDsktpBuildCssClip running');
      // !VA The string to pass the CSS declaration to the clipboard object
      var clipboardStr;
      // !VA Clipboard output object 
      var tableDisplayCSSTag = new ClipboardOutput('tableLargePhonesCSSTag');
      // !VA Put the user-entered class into this property
      tableDisplayCSSTag.classAtt = document.querySelector(ccpUserInput.iptCcpTableClass).value;
      // !VA Build the css class declaration with and Appdata large phone width and height properties
      clipboardStr = `table.${tableDisplayCSSTag.classAtt} { width: ${Appdata.imgW}px !important; height: ${Appdata.imgH}px !important }`;
      // !VA Return the css string to the clipboard object.
      return clipboardStr;
    }

    function ccpTableSmphnBuildCssClip(Appdata) {
      console.log('ccpTableSmphnBuildCssClip running');
      var clipboardStr;
      // !VA Clipboard output object 
      var tableSmallPhonesCSSTag = new ClipboardOutput('tableSmallPhonesCSSTag');
      // !VA Put the user-entered class into this property
      tableSmallPhonesCSSTag.classAtt = document.querySelector(ccpUserInput.iptCcpTableClass).value;
      // !VA Build the css class declaration with and Appdata large phone width and height properties
      clipboardStr = `table.${tableSmallPhonesCSSTag.classAtt} { width: ${Appdata.sPhonesW}px !important; height: ${Appdata.sPhonesH}px !important }`;
      // !VA Return the css string to the clipboard object.
      return clipboardStr;
    }

    function ccpTableLgphnBuildCssClip(Appdata) {
      console.log('ccpTableLgphnBuildCssClip running');
      var clipboardStr;
      // !VA Clipboard output object 
      var tableLargePhonesCSSTag = new ClipboardOutput('tableLargePhonesCSSTag');
      // !VA Put the user-entered class into this property
      tableLargePhonesCSSTag.classAtt = document.querySelector(ccpUserInput.iptCcpTableClass).value;
      // !VA Build the css class declaration with and Appdata large phone width and height properties
      clipboardStr = `table.${tableLargePhonesCSSTag.classAtt} { width: ${Appdata.sPhonesW}px !important; height: ${Appdata.lPhonesH}px !important }`;
      // !VA Return the css string to the clipboard object.
      return clipboardStr;
    }

    // !VA Working 062119_CBMods2

    // !VA 02.17.20 This is the same as ccpIfNoUserInput except it returns ONLY the value, not the attribute name -- but we don't need this now, because if it has not value, then, well it has no value.
    function ccpGetAttValue(att, value) {
      // !VA We need get the iFilename from Appdata in case the user leaves 'path' empty
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
        // !VA If the path field is empty, we need to return the iFilename without the path.
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

    function getAlignAttribute(selectid, options) {
      var str, selInd;
      selectid = ccpUserInput.selCcpTdAlign;
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
    // !VA TODO: THis should be in handleUserInput
    function ccpIfNoUserInput(att, value) {
      // !VA We need get the iFilename from Appdata in case the user leaves 'path' empty
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
        // !VA If the path field is empty, we need to return the iFilename without the path.
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

    function makePosswitchNode() {
      console.clear();
      console.log('makePosswitchNode running');
      let container, str, nodes, node;
      let td1, table1, tr1, td2, table2, tr2, td3, img;
      let Attributes;
      Attributes = getAttributes();

      td1 = document.createElement( 'td');
      table1 = document.createElement( 'table');
      td1.appendChild(table1);
      tr1 = document.createElement( 'tr');
      table1.appendChild(tr1);
      td2 = document.createElement( 'td');
      tr1.appendChild(td2);
      table2 = document.createElement( 'table');
      td2.appendChild(table2);
      tr2 = document.createElement( 'tr');
      table2.appendChild(tr2);
      td3 = document.createElement('td');
      tr2.appendChild(td3);
      img = document.createElement( 'img');
      td3.appendChild(img);

      td1.setAttribute('dir', 'rtl'),
      td1.width='100%';
      td1.align='left';
      td1.bgcolor='#FFFFFF';
      td1.valign='top';
      table1.setAttribute( 'role', 'presentation');
      table1.border='0';
      table1.width='100%';
      table1.cellPadding='0';
      table1.cellSpacing='0';
      td2.width='50%';
      td2.setAttribute( 'class', 'stack-column-center');
      table2.setAttribute( 'role', 'presentation');
      table2.width='100%';
      table2.cellPadding='0';
      table2.cellSpacing='0';
      td3.setAttribute('dir', 'ltr'),
      td3.align='left';
      td3.vAlign='top';
      img.width = Attributes.imgWidth;
      img.height = Attributes.imgHeight;
      img.style = Attributes.imgStyle;
      img.src = Attributes.imgSrc;
      img.alt = Attributes.imgAlt;
      console.log('td1.outerHTML is: \n ' + td1.outerHTML);
      console.log('td1 is: ' + td1);
      return td1;

    }

    function makeImgNode () {
      // console.log('makeImgNode running');
      // !VA Id is passed but not used here,  because we're only building the node.
      let Attributes;
      Attributes = getAttributes();
      let imgNode;
      imgNode = document.createElement('img');
      // !VA class attribute
      if (Attributes.imgClass) { imgNode.className = Attributes.imgClass; }
      // !VA alt attribute
      if (Attributes.imgAlt) { imgNode.alt = Attributes.imgAlt; }
      // src attribute;
      imgNode.src = Attributes.imgSrc;
      // !VA width attribute
      imgNode.width = Attributes.imgWidth;
      // !VA height attribute
      imgNode.height = Attributes.imgHeight;
      // !VA style attribute
      imgNode.setAttribute('style', Attributes.imgStyle);
      // !VA align attribute is deprecated in html5, so we need this hack if we want to include it, which we don't for now.
      if (Attributes.imgAlign) { imgNode.align = Attributes.imgAlign; }
      // !VA border attribute
      imgNode.border = '0';
      return imgNode;
    }
    
    function makeTdNode() {
      // console.log('makeTdNode running');
      let Attributes;
      Attributes = getAttributes();
      let tdInner, imgNode;
      tdInner = document.createElement('td');
      // !VA Add the attributes that are included in both the default and background image td

      if (Attributes.tdValign) { tdInner.vAlign = Attributes.tdValign; }
      // !VA bgcolor attribute. Pass the input value, don't prepend hex # character for now
      if (Attributes.tdBgcolor) { tdInner.bgColor = Attributes.tdBgcolor; }
      // !VA Now add the attributes included only with the default Td configuration


      let fallback;
      let bgcolor;
      let indent;
      let radioSelected;
      radioSelected = document.querySelector('input[name=tdoptions]:checked').value;
      switch(true) {
      case (radioSelected === 'basic'):
        // !VA class attribute
        if (Attributes.tdClass) { tdInner.className = Attributes.tdClass; }
        // !VA valign attribute
        if (Attributes.tdAlign) { tdInner.align = Attributes.tdAlign; }
        // !VA The id is wrong here -- we're passing the td's id but that shouldn't matter
        imgNode = makeImgNode();
        // !VA We need to include the imgNode here ONLY if Bgimage is unchecked
        tdInner.appendChild(imgNode);
        break;
      case (radioSelected === 'bgimage'):
        tdInner.width = Attributes.tdWidth;
        tdInner.height = Attributes.tdHeight;
        // !VA valign attribute
        tdInner.vAlign = Attributes.tdValign;
        // !VA Set the background attribute to the current path/filename
        tdInner.setAttribute('background', Attributes.tdBackground);
        // !VA Include fallback color if no bgColor is selected. Use Stig's fallback: #7bceeb
        fallback = '#7bceeb';
        Attributes.tdBgcolor ? bgcolor = Attributes.tdBgcolor : bgcolor = fallback;
        tdInner.bgColor = bgcolor;
        // !VA Dummy indent for  now
        indent = '\n  ';

        tdInner.innerHTML = `${indent}<!--[if gte mso 9]>${indent}<v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:${Attributes.imgWidth}px;height:${Attributes.imgHeight}px;">${indent}<v:fill type="tile" src="${Attributes.tdBackground}" color="${bgcolor}" />${indent}<v:textbox inset="0,0,0,0">${indent}<![endif]-->${indent}<div>${indent}<!-- Put Foreground Content Here -->${indent}</div>${indent}<!--[if gte mso 9]>${indent}</v:textbox>${indent}</v:rect><![endif]-->\n`;
        break;
      case (radioSelected === 'posswitch'):
        console.log('radioSelected === posswitch running');
        tdInner = makePosswitchNode();

        console.log('tdInner.outerHTML is: ' + tdInner.outerHTML);


        break;
      default:
        // code block
      } 

      console.log('tdInner.outerHTML here is: ' + tdInner.outerHTML);
      return tdInner;
    }

    function makeTableNode() {
      // console.log('makeTdNode running');
      let Attributes;
      Attributes = getAttributes();
      let tableNode, tableInner, tableOuter, tdInner, tdOuter, trInner, trOuter;
      tableOuter = document.createElement('table');
      tableInner = document.createElement('table');
      tdInner = document.createElement('td');
      tdOuter = document.createElement('td');
      trInner = document.createElement('tr');
      trOuter = document.createElement('tr');

      // !VA Make the inner table. If Include wrapper table is unchecked, we return just the inner table. If it's checked, we return the inner table and the outer table 
      // !VA Add inner table attributes
      // !VA table class attribute
      if (Attributes.tableClass) { tableInner.className = Attributes.tableClass; }
      // table.className = Attributes.tableClass;
      // !VA table align attribute
      if (Attributes.tableAlign) { tableInner.align = Attributes.tableAlign; }
      // !VA width attribute -- the default is the current display size, so it gets the value from the toolbar viewerW input field.
      tableInner.width = Attributes.tableWidth;
      // !VA table bgcolor attribute. Pass the input value, don't prepend hex # character for now
      if (Attributes.tableBgcolor) { tableInner.bgColor = Attributes.tableBgcolor; }
      // !VA Add border, cellspacing and cellpadding
      tableInner.border = '0', tableInner.cellSpacing = '0', tableInner.cellPadding = '0';
      tableInner.setAttribute('role', 'presentation'); 
      
      // !VA Build the inner tr
      tableInner.appendChild(trInner);
      // !VA Get the inner TD and append it - id is not for the inner TD but that's not relevent here.
      tdInner = makeTdNode();
      trInner.appendChild(tdInner);
      
      if (!Attributes.tableIncludeWrapper) {
        // !VA If Include table wrapper is unchecked, just return this inner table
        tableNode = tableInner;
      } else {
        // !VA If include table wrapper is checked, build the outer table and return it
        // !VA table wrapper class
        if (Attributes.tableTagWrapperAlign) { tableOuter.align = Attributes.tableTagWrapperAlign; }
        // !VA wrapper table align attribute
        if (Attributes.tableTagWrapperClass) { tableOuter.className = Attributes.tableTagWrapperClass; }

        // !VA width attribute
        // !VA the default is the current display size, so it gets the value from the field.
        tableOuter.width = Attributes.tableTagWrapperWidth;

        // !VA table bgcolor attribute. Pass the input value, don't prepend hex # character for nowtableTagWrapperBgcolor);
        if (Attributes.tableTagWrapperBgcolor) { tableOuter.bgColor = Attributes.tableTagWrapperBgcolor; }

        // !VA Add border, cellspacing and cellpadding
        tableOuter.border = '0', tableOuter.cellSpacing = '0', tableOuter.cellPadding = '0';
        tableOuter.setAttribute('role', 'presentation'); 

        // !VA Append the outer tr
        tableOuter.appendChild(trOuter);
        trOuter.appendChild(tdOuter);
        // !VA Append the outer td
        trOuter.appendChild(tdOuter);
        // !VA Add the outer td attributes
        if (Attributes.tdAlign) { tdOuter.align = Attributes.tdAlign; }
        // !VA valign attribute
        if (Attributes.tdValign) { tdOuter.vAlign = Attributes.tdValign; }
        // !VA Append the inner table to the outer table's td
        tdOuter.appendChild(tableInner);
        // !VA Pass the outer table to the tableNode.
        tableNode = tableOuter;
      }
      // console.log(tableNode.outerHTML);
      return tableNode;
    }

    function makeNodeList( id ) {
      // console.log('makeNodeList running');
      let container, imgNode, tdNode, tableNode, topNode;
      // !VA Create the container div - we need this to access the descendant elements as children, including the parent table of all the descendent table elements.
      container = document.createElement('div');
      // !VA make the node for the img tag
      // !VA If the CCP make img tag button was clicked, return imgNode as the nodeList and send to doIndents for code indents
      if (id == document.querySelector(btnCcpMakeClips.btnCcpMakeImgTag).id) {
        imgNode = makeImgNode( id );
        topNode = imgNode;
      } 


      // !VA If the CCP make td tag button was clicked, return tdNode as the nodeList and send to doIndents for code indents
      if (id == document.querySelector(btnCcpMakeClips.btnCcpMakeTdTag).id) {
        tdNode = makeTdNode( id );
        console.log('tdNode is: ' + tdNode);
        topNode = tdNode;
        // !VA We do NOT append imgNode here...that has to be done in makeTdNode because if Bgimage is checked, no imgNode is included. If we do it here then we have to include the conditional if Bgimage = checked here too. That belongs in the makeTdNode function.
      }
      // !VA If the CCP make table tag button was clicked, return tableNode as the nodeList and send to doIndents for code indents
      if ( id == document.querySelector(btnCcpMakeClips.btnCcpMakeTableTag).id )  {
        tableNode = makeTableNode( id );
        topNode = tableNode;
      }
      // !VA Put the table and its descendents into the parent container
      container.appendChild(topNode);
      // !VA Pass the clicked button id and parent container element to process the code indents

      // !VA Should I choose to use HTML Beautify, it's here
      // const str = html_beautify(tableNode.outerHTML, { indent_size: 2});
      // console.log('str is:');
      // console.log(str);
      // writeClipboard( id, str);
      console.log('doing indents');
      doIndents( id, container );
    }

    // !VA This is totally hacked but it works and structurally it can be improved upon at some later date
    function doIndents( id, container, nodeList, indentbefore, indentafter, moreIndent, str1, str2 ) {
      // console.log('doIndents running');
      // console.log('id is: ' + id);
      // console.log('container.children[0].outerHTML is: ' + container.children[0].outerHTML);
      nodeList = container.querySelectorAll('*');
      // console.log('nodeList is: ');
      console.dir(nodeList);
      // console.log('nodeList.length is: ' + nodeList.length);


      indentbefore = '\n  ';
      indentafter = '\n';
      moreIndent = '  ';

      let output;
      switch(true) {
      case ( nodeList.length === 1 ):
        // !VA This is the singleton image tag, no indent required
        output = nodeList[0].outerHTML;
        break;
      case ( nodeList.length === 2 ):
        // !VA td Tag - nodeList[1] = img, nodeList[0] = td. Put indents around the img
        // !VA Only the background image code references the MS VML schema, so we'll search for that to apply the indent scheme
        // !VA If the VML schema is NOT present, then it's an img or other element node. Else, it's the background image code and the line breaks/indent is set in the makeTdNode function for now, so no else is necessary.
        if (!nodeList[0].innerHTML.includes('urn:schemas-microsoft-com:vml')) {
          nodeList[1].insertAdjacentHTML('beforebegin', indentbefore);
          nodeList[1].insertAdjacentHTML('afterend', indentafter);
          // console.log('nodeList[0].childNodes is: ');
          // console.log(nodeList[0].childNodes);
        } 
        output = nodeList[0].outerHTML;

        break;
      case ( nodeList.length === 4 ):
        // !VA Parent table, without the wrapper table. 
        // !VA nodeList[0] is the parent table
        for (let i = 0; i < nodeList.length; i++) {
          if (i === 1 )  {
            // !VA nodeList[1] is the tr
            nodeList[i].insertAdjacentHTML('beforebegin', indentbefore);
            nodeList[i].insertAdjacentHTML('afterend', indentafter);
          }
          if (i === 2 )  {
            // !VA nodeList[2] is the td. Trying to deal with the background image indents by processing the childNodes of the td would be hell, so we'll just add moreindents to the existing indents we set when we build the background image code block in tdMakeNode. This is not DRY, but it is clear and easily modifiable.
            if (!nodeList[2].innerHTML.includes('urn:schemas-microsoft-com:vml')) {
              nodeList[i].insertAdjacentHTML('beforebegin', indentbefore + moreIndent);
              nodeList[i].insertAdjacentHTML('afterend', indentafter + moreIndent);
              // console.log('nodeList[0].childNodes is: ');
              // console.log(nodeList[0].childNodes);
            } else {

              nodeList[i].insertAdjacentHTML('beforebegin', indentbefore + moreIndent);
              nodeList[i].insertAdjacentHTML('afterend', indentafter + moreIndent);
              // !VA Replace all occurrences of '/n  ' with '/n     '  in the td.innerHTML to add space to the code indent and add a break and space before the closing /td.
              str1 = nodeList[2].innerHTML;
              str1 = str1.replace( /\n  /g, '\n      ' );
              nodeList[2].innerHTML = str1;
              nodeList[i].insertAdjacentHTML('beforeend', moreIndent + moreIndent);
            }

          }
          if (i === 3 )  {
            if (!nodeList[2].innerHTML.includes('urn:schemas-microsoft-com:vml')) {
              // !VA nodeList[3] is the img which is only added if the td doesn't contain the background image code.
              nodeList[i].insertAdjacentHTML('beforebegin', indentbefore + moreIndent  + moreIndent);
              nodeList[i].insertAdjacentHTML('afterend', indentafter + moreIndent  + moreIndent);
            }
          }
        }
        output = nodeList[0].outerHTML;
        break;
      case ( nodeList.length === 7 || nodeList.length === 8 ):
        for (let i = 0; i < nodeList.length; i++) {
          if (i === 1 )  {
            nodeList[i].insertAdjacentHTML('beforebegin', indentbefore);
            nodeList[i].insertAdjacentHTML('afterend', indentafter);
          }
          if (i === 2 )  {
            nodeList[i].insertAdjacentHTML('beforebegin', indentbefore + moreIndent);
            nodeList[i].insertAdjacentHTML('afterend', indentafter + moreIndent);
          }
          if (i === 3 )  {
            nodeList[i].insertAdjacentHTML('beforebegin', indentbefore + moreIndent + moreIndent );
            nodeList[i].insertAdjacentHTML('afterend', indentafter + moreIndent + moreIndent );
          }
          if (i === 4 )  {
            nodeList[i].insertAdjacentHTML('beforebegin', indentbefore + moreIndent + moreIndent + moreIndent);
            nodeList[i].insertAdjacentHTML('afterend', indentafter + moreIndent + moreIndent + moreIndent );
          }
          if (i === 5 )  {

            if (!nodeList[2].innerHTML.includes('urn:schemas-microsoft-com:vml')) {
              nodeList[i].insertAdjacentHTML('beforebegin', indentbefore + moreIndent + moreIndent + moreIndent + moreIndent);
              nodeList[i].insertAdjacentHTML('afterend', indentafter + moreIndent + moreIndent + moreIndent + moreIndent);
            } 
            else 
            {
              console.log('working--');
              // !VA nodeList[5] is the innerTd
              // !VA Replace all occurrences of '/n  ' with '\n            '  in the td.innerHTML to add space to the code indent and add a break and space before the closing /td.
              var faa = nodeList[5].innerHTML;
              faa = faa.replace( /\n  /g, '\n            ' );
              console.log('faa is: ' + faa);
              nodeList[5].innerHTML = faa;
              nodeList[i].insertAdjacentHTML('beforebegin', indentbefore + moreIndent + moreIndent + moreIndent + moreIndent);
              nodeList[i].insertAdjacentHTML('afterend', indentafter + moreIndent + moreIndent + moreIndent + moreIndent); 
              nodeList[i].insertAdjacentHTML('beforeend', moreIndent + moreIndent + moreIndent + moreIndent + moreIndent);          
            }
          }
          if (i === 6 )  {
            if (!nodeList[2].innerHTML.includes('urn:schemas-microsoft-com:vml')) {
              // !VA nodeList[3] is the img which is only added if the td doesn't contain the background image code.
              nodeList[i].insertAdjacentHTML('beforebegin', indentbefore + moreIndent + moreIndent + moreIndent + moreIndent + moreIndent);
              nodeList[i].insertAdjacentHTML('afterend', indentafter + moreIndent + moreIndent + moreIndent + moreIndent + moreIndent);
            }
          }
          output = nodeList[0].outerHTML;
        }
        break;
      default:
      } 
      // !VA In case I want to use the beautifier, it's here:
      // var beautified = html_beautify( output, {indent_size: 2 });
      // console.log('beautified is: \n' + beautified);
      // console.log('output is: \n' + output);
      writeClipboard( id, output);
    }



    function writeClipboard(id, str) {
      // console.log('writeClipboard running');
      
      var clipboardStr;
      clipboardStr = str;
      // clipboardStr = tag.outerHTML;
      var currentCB = new ClipboardJS('#' + id, {
        text: function(trigger) {

          // var clipboardStr = ccpImgBuildHtmlClip();
          // !VA Write success message to app message area on success
          currentCB.on('success', function(event) {
            appController.initMessage(false, 'copied_2_CB');
            // debugger;
          });
  
          currentCB.on('error', function(e) {
            console.error('Action:', e.action);
            console.error('Trigger:', e.trigger);
          });
          // !VA Return the clipboard string to clipboard.js to paste it to the clipboard
          return clipboardStr;
        }
      });
    }

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
            return document.querySelector(ccpUserInput.iptCcpImgRelPath).value + '/' + document.querySelector(iInspectors.iFilename).textContent;
          }
        })(),
        imgStyle: (function() {
          let target, checked, str;
          target = ccpUserInput.spnCcpImgIncludeWidthHeightCheckmrk;
          checked = getCheckboxSelection(target);
          if (checked === true) {
            str = `display: block; width: ${Appdata.imgW}px; height: ${Appdata.imgH}px; font-family: Arial, sans-serif; font-size: 16px; line-height: 15px; text-decoration: none;border: none; outline: none;" `;
          } else {
            str = 'display: block; font-family: Arial, sans-serif; font-size: 16px; line-height: 15px; text-decoration: none;border: none; outline: none;';
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
        // !VA TD Attributes
        // !VA TD Width and height = imgW and imgW -- only used for Stig's BG image 
        tdWidth: (function() {
          return Appdata.imgW;
        })(),
        tdHeight: (function() {
          return Appdata.imgH;
        })(),
        tdBasic: (function() {
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



    // !VA CBController public functions 
    return {


      // !VA Called from eventHandler to handle clipboard button clicks
      doClipboard: function(evt) {
        console.log('doingClipboard');
        let id = evt.target.id;
        makeNodeList( id );
       
      }
      // runTest: function() {
      //   makePosswitchNode();
      // }


    
      // !VA queryAllCcpOptions was a test function, deleted 02.20.20
    };

  })();




  // GLOBAL APP MODULE
  var appController = (function(CBCtrl, UICtrl) {

    
    // !VA Getting DOM ID strings from UIController
    var iInspectors = UICtrl.getInspectorIDs();
    var dynamicRegions = UICtrl.getDynamicRegionIDs();
    var staticRegions = UICtrl.getStaticRegionIDs();
    var toolbarElements = UICtrl.getToolButtonIDs();
    var ccpUserInput = UICtrl.getCcpUserInputIDs();
    var btnCcpMakeClips =  UICtrl.getCcpMakeClipButIDs();
    

    // !VA appController private setupEventListeners
    var setupEventListeners = function() {



      // document.addEventListener('click', function(e) {
      //   e = e || window.event;
      //   var target = e.target || e.srcElement,
      //     text = target.textContent || target.innerText;  
      //     console.log('target is: ' + target);
      //   console.log('text is: ' + text); 
      // }, false);



      //DRAG AND DROP PROCESSING START


      // Event Listeners for Drag and Drop
      // !VA dropArea is the screen region that will accept the drop event 
      var dropArea = document.querySelector(dynamicRegions.appContainer);
      dropArea.addEventListener('dragover', handleDragOver, false);
    
      // !VA Initiates the FileReader function to get the dropped image data
      dropArea.addEventListener('drop', handleFileSelect, false);
      // dropArea.addEventListener('drop', startNewDrop, false);
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
        // console.log('oNode.id is: ' + oNode.id);
        oNode.addEventListener(evt, oFunc, bCaptures);
      }
      // addEventHandler(document.getElementById(toolbarElements.btnTbrIncr01),'click',doit,false);
      
      // !VA Add click and blur event handlers for clickable toolbarElements: 
      var tbClickables = [ toolbarElements.btnTbrIncr50, toolbarElements.btnTbrIncr10, toolbarElements.btnTbrIncr01, toolbarElements.btnTbrDecr50, toolbarElements.btnTbrDecr10, toolbarElements.btnTbrDecr01  ];
      for (let i = 0; i < tbClickables.length; i++) {
        // !VA convert the ID string to the object inside the loop
        // console.log('i is: ' + i);
        // console.log('tbClickables[i] is: ' + tbClickables[i]);
        tbClickables[i] = document.querySelector(tbClickables[i]);
        addEventHandler(tbClickables[i],'click',handleMouseEvents,false);

      }
      
      // !VA Add event handlers for input toolbarElements
      var tbKeypresses = [ toolbarElements.iptTbrViewerW, toolbarElements.iptTbrImgWidth, toolbarElements.iptTbrImgHeight, toolbarElements.iptTbrSPhonesWidth, toolbarElements.iptTbrLPhonesWidth ];
      for (let i = 0; i < tbKeypresses.length; i++) {
        // !VA convert the ID string to the object inside the loop
        tbKeypresses[i] = document.querySelector(tbKeypresses[i]);
        // console.log('i is: ' + i);
        // console.log('tbKeypresses[i].id is: ' + tbKeypresses[i].id);
        // !VA Handles all key events except TAB, which require keyDown to get the value of the current input rather than the input being tabbed to.
        addEventHandler((tbKeypresses[i]),'keydown',handleKeydown,false);
        addEventHandler((tbKeypresses[i]),'keyup',handleKeyup,false);
        addEventHandler((tbKeypresses[i]),'focus',handleFocus,false);
        addEventHandler((tbKeypresses[i]),'blur',handleBlur,false);
        // !VA Deprecated
        // addEventHandler(tbKeypresses[i],'blur',handleUserAction,false);
        // !VA TODO
        // addEventHandler(tbKeypresses[i],'dragover',handleUserAction,false);
        // addEventHandler(tbKeypresses[i],'drop',handleUserAction,false);
      }


      // !VA Add event handlers for the input elements that show mobile CSS clipboard buttons in the CCP when input is made. Currently only the img class input does that.
      var ccpKeypresses = [ ccpUserInput.iptCcpImgClass, ccpUserInput.iptCcpTdClass, ccpUserInput.iptCcpTableClass ];
      for (let i = 0; i < ccpKeypresses.length; i++) {
        // console.log('i is: ' + i);
        // console.log('ccpKeypresses[i] is: ' + ccpKeypresses[i]);
        // !VA convert the ID string to the object inside the loop
        ccpKeypresses[i] = document.querySelector(ccpKeypresses[i]);
        addEventHandler((ccpKeypresses[i]),'input',showElementOnInput,false);
      }

      // !VA Add click handlers for Inspector - there's only the clipboard button now but there could be more. 
      var dvClickables = [ iInspectors.btnToggleCcp ];
      for (let i = 0; i < dvClickables.length; i++) {
        // !VA convert the ID string to the object inside the loop
        dvClickables[i] = document.querySelector(dvClickables[i]);
        addEventHandler((dvClickables[i]),'click',initCCP,false);
      }


      // !VA We need eventListeners for ALL the clipboard buttons so make an eventListener for each value in the btnCcpMakeClips object. We need a for in loop for objects
      for(var i in btnCcpMakeClips) {
        // !VA loop through the object that contain the id and func properties.
        var clipBut;
        if(btnCcpMakeClips.hasOwnProperty(i)){
          clipBut = document.querySelector(btnCcpMakeClips[i]);
          // console.log('clipBut.id is: ' + clipBut.id);
          addEventHandler(clipBut,'click',CBController.doClipboard,false);
        }
      }



      // Click handlers - Misc
      // =============================
      // !VA This was moved to initCCP I think
      // addEventHandler(iInspectors.btnToggleCcp,'click',toggleCCP,false);

      // Keypress handlers - showMobileImageButtons
      // ==================================
      
      // Keypress handlers - Misc
      // ==================================
      // addEventHandler(iInspectors.btnToggleCcp,'keypress',toggleCCP,false);

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


    // !VA appController private functions
    //  ==============================



    // appController private: hfs - FILEREADER OBJECT PROCESSING
    //Get the user-selected image file object 
    function handleFileSelect(evt) {
      console.log('hFS running');
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
          // Read the iFilename of the FileReader object into a variable to pass to the getAppData function, otherwise the blob has no name
          fileName = theFile.name;
          // !VA Write the iFilename to the DOM so we can add it later to Appdata. It's not completely DRY because it's added to the DOM here and later to Appdata, and then queried in the CCP from Appdata, but it's better than having to query it from the DOM every time it's used in a separate function call. This way, we can loop through Appdata to get it if we need to.
          document.querySelector(iInspectors.iFilename).textContent = fileName;
          
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
                // !VA NOW the image is in the DOM and we can call functions to get its properties.
                // !VA Pass Appdata on to evalViewerSizes in order to resize the image containers dynamically based on the dimensions of the image.
                // !VA Create and array of the Appdata properties to update
                // !VA Instead of managing Appdata based on some huge object with four HTML elements and all those unneeded properties thereof, we will just update Appdata by creating a local copy with just the properties we want to add.
                // !VA Review this - it might be an older comment 
                // !VA The problem is that Appdata is a global object in the public functions, as it is now in master. I don't want to put all that stuff in the appController's public functions, so I have to either leave it in UIController or pass it between private functions, which will get very complicated.   I think it will be much cleaner if I only use updateAppData to loop through the items to update and don't use the klunky getAppData. Also, the refreshAppUI function refreshes all the values when it's called - it should only refresh the changed values.
                // !VA  Now that the blob image has been displayed and has DOM properties that can be queried, query them and write them to Appdata.
                // !VA Now that we have a current image in the DOM, Get Appdata so we can store the iFilename in it.

                // !VA Initialize the value in the toolbar viewerW input field to its initial CSS value.
                // !VA Commenting this out since I changed it to hard-coded in the HTML file along with iptTbrSmallPhonesW and sPhonesH.
                // console.log('document.querySelector(dynamicRegions.imgViewer) is: ' + document.querySelector(dynamicRegions.imgViewer));
                // console.dir(document.querySelector(dynamicRegions.imgViewer));
                // document.querySelector(toolbarElements.viewerW).value = document.querySelector(dynamicRegions.imgViewer).style.width;
                
                // !VA Set the data attribute for small phone and large phone width. We need this because there is not actual HTML element that corresponds to these properties, and thus no way to persist them globally. So the data attribute sphonew and sphoneh will be written to the toolbar input field as surrogate for an actual DOM element that Appdata can query.
                var sphonesw, lphonesw;
                sphonesw = document.querySelector(toolbarElements.iptTbrSPhonesWidth);
                lphonesw = document.querySelector(toolbarElements.iptTbrLPhonesWidth);              
                sphonesw.setAttribute('data-sphonesw', '320');
                lphonesw.setAttribute('data-lphonesw', '414');
                sphonesw.value = sphonesw.getAttribute('data-sphonesw');
                lphonesw.value = lphonesw.getAttribute('data-lphonesw');

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
            
    // !VA INPUT HANDLING
    // !VA ============================================================

    // !VA Drag and Drop Handler 
    // !VA appController public function
    function handleDragOver(evt) {
      //prevent the bubbling of the event to the parent event handler
      evt.stopPropagation();
      //prevent the default action of the element from executing -- so in this case
      //I think since it is a div the default event would be for some browsers to 
      //open the file in the browser when dropped
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }


    // !VA appController private function
    // !VA Handle behavior when an element gets the focus. Pertains only to keyboard input, actually, I'm not sure whether buttons or CCP elements need special handling.
    function handleFocus(evt) {
      // !VA Get the target element of the click
      el = document.getElementById(this.id);
      // !VA Select the clicked element's value, or if there's no value, set it to empty with a cursor, which is the default select behavior for empty fields.
      this.select();
    }

    // !VA appController private function
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

    // !VA Branch rewriteHandleUserAction061119 
    // !VA appController private handleMouseEvents. Preprocess mouse events and route them to respective eval handler.
    function handleMouseEvents(evt) {
      console.log('handleMouseEvents');
      // !VA Carryover from earlier handleUserAction
      // !VA Get the target element of the click
      var el = document.getElementById(this.id);
      var args = { };
      args.target = el.id;
      
      
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
          Appdata = appController.initGetAppdata();
          // !VA This is a click on one of the toolbutton increment buttons, so we're dealing with the Appdata.imgW property.
          args.prop = 'imgW';
          // !VA The last 2 chars of the id indicate the value by which the img dimension should be incremented,so get the last 2 chars and convert to integer
          val = parseInt(el.id.slice(-2));
          // !VA If the target ID includes 'grow' then the image dimension will be incremented, if 'shrink' then it will be decremented
          (el.id.includes('incr')) ? val : val = -val;
          // !VA Add val to the current imgW to get the value to be passed to checkUserInput for error parsing.
          val = Appdata.imgW + val;
          args.val = val;
          isErr = checkUserInput(args);
          if (isErr) {
            // !VA If it returns an error, select the input and show the error message so the user can correct it or ESC out of the field.
            console.log('handleMouseEvents: ERROR MESSAGE SHOULD BE SHOWN NOW!');
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
      --imgW and imgH fields should never show entereed values but rather only placeholders. This is because they actual values are reflected upon entering in the DISPLAY SIZE iInspectors and because any value entered in one of the fields would require an aspect ratio calculation to display in the other one. So one of the field values would have to update automatically which is distracting and confusing IMO especially since the values are presented clearly elsewhere.
      --The other fields should show the current Appdata value, i.e. the actual DOM element dimensions or data property value, because these values are NOT reflected anywhere in a Inspector. So when they are changed, they need to be updated and when a user makes a bad entry, they have to be restored to what they were previously.
      --Default Tab behavior, i.e. cycling through the tab order, has to be maintained under consideration of the above 2 points.
    */
    // !VA Tab needs to be in a keyDown because keyup is too late to trap the value before the default behavior advances ot the next field.
    function handleKeydown(evt) {
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
                console.log('tab pressed');
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

    // !VA appController private handleKeyup
    // !VA keyPress handler for the ESC key.  This has to be handled on keyup, so we need a separate handler for it.
    function handleKeyup(evt) {
      var el, prop;
      // !VA Get the target input element
      el = document.getElementById(this.id);
      // !VA We only need the property here, so no need to create an args object. We could actually just use the target but since we're standardizing on property names, let's stick with that.
      prop = elementIdToAppdataProp(this.id);
      // !VA Find out which key was struck
      keyup = evt.which || evt.keyCode || evt.key;
      // !VA Get the current Appdata object because we need the previous Appdata value to restore when the ESC key is pressed
      var Appdata = appController.initGetAppdata();
      // !VA  On ESC, we want imgW and imgH to exit the field and go back to showing the placeholders defined in the CSS. This is because these values are already provided in the iInspectors and there's no need to recalc the W and H each time the user makes and entry - that would just be confusing. 
      if (keyup == 27 ) {
        // !VA If the value was entered into the W or H field, escape out of the field and reset the values to the placeholders
        if (prop === 'imgW' || prop === 'imgH') {
          this.value = ('');
          this.blur();
        // !VA For viewerW, iptTbrSmallPhonesW and iptTbrLargePhonesW we want to exit the field and restore the preexisting value from Appdata.
        } else {
          this.value = Appdata[prop];
          this.blur();
        }
      }
    }

    // !VA  Parsing keyboard input based on Appdata property passed in from handleKeyup.
    // !VA TODO: rename to checkUserInput and include parsing of the toolbutton mouseclicks from handleToolbarClicks.
    function checkUserInput(args) {
      // !VA Destructure args
      console.dir(args);
      const { target, prop, val } = args;
      var errCode;
      var isErr;
      isErr = false;
      var Appdata= {};
      Appdata = appController.initGetAppdata();
      // !VA TODO: Setting maxViewerWidth just for now
      var maxViewerWidth = 800;

      // !VA First, we validate that the user-entered value is an integer and if so, set the error variables.
      if (validateInteger(val)) {
        // !VA NOTE: This is where we could easily trap the negative button increment if it falls below 0 to send a different message than just the standard 'not_Integer' message. Revisit.
        errCode = 'not_Integer';
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
            errCode = 'viewerW_GT_maxViewerWidth';
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
            errCode = 'imgW_GT_viewerW';
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
        appController.initMessage(isErr, errCode);
      } else {
        // !VA If no error, pass false back to handleKeyup and continue.
        isErr = false;
      }
      return isErr;

    }

    // !VA appController private evalToolbarInput
    // !VA args is the target, prop and val passed in from handleKeyUp and handleMouseEvents. 
    function evalToolbarInput(args) {
      // console.log('evalToolbarInput running');
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
        console.log('evalToolbarInput handling imgW ');      
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
      console.log('args is:');
      console.dir(args);
      updateAppdata( arg1, arg2 );
      // !VA Once those DOM properties and data properties have been updated, recalculate the image's containers.
      calcViewerSize();
    }


    function updateAppdata( ...params ) {
      let prop, val;
      console.log('updateAppData running...');
      // !VA Each param pair is a property name prop and a value val. evalToolbarInput passes in one or more such pairs whose corresponding Appdata DOM element/data attribute has to be updated. So, loop through the argument arrays and update the corresponding DOM elements
      for (let i = 0; i < params.length; i++) {
        prop = params[i][0];
        val = params[i][1];
        console.log('params[i][0] is: ' + params[i][0]);
        console.log('params[i][1] is: ' + params[i][1]);
        switch(true) {
        case (!prop) :
          console.log('no prop');
          break;
        case prop === 'viewerW' :
          document.querySelector(dynamicRegions.imgViewer).style.width = val + 'px';  
          break;
        case prop === 'imgW' :
          document.querySelector(dynamicRegions.curImg).style.width = val + 'px';
          break;
        case prop === 'imgH' :
          document.querySelector(dynamicRegions.curImg).style.height = val + 'px';
          break;
        case prop === 'sPhonesW' :
          document.querySelector(toolbarElements.iptTbrSPhonesWidth).setAttribute('data-sphonesw', val);
          break;
        case prop === 'lPhonesW' :
          document.querySelector(toolbarElements.iptTbrLPhonesWidth).setAttribute('data-lphonesw', val);
          break;
        }
      }
      // let Appdata = appController.initGetAppdata(false);
      // console.dir(Appdata);
    }

    // !VA  appController private calcViewerSize
    // !VA PROBLEM: this is only good for initializing because it calculates the viewer size based on NW and NH. On user input, it has to calculate based on imgW and imgH
    function calcViewerSize() {
      var Appdata = {};
      Appdata = appController.initGetAppdata(false);
      // !VA Using the current image dimensions in Appdata, calculate the current size of imgViewer so it adjusts to the current image size. 
      // !VA  Get the actual viewerW from getComputedStyle
      var viewerW;
      var viewerH;
      var compStyles = window.getComputedStyle(document.querySelector(dynamicRegions.imgViewer));
      viewerW = parseInt(compStyles.getPropertyValue('width'), 10);
      viewerH = parseInt(compStyles.getPropertyValue('height'), 10);
      // !VA Write the viewerW to the toolbar input field
      document.querySelector(toolbarElements.iptTbrViewerW).value = viewerW;

      // !VA If we're initializing a new image, use the naturalWidth and naturalHeight. If we're updating via user input, we need to use the display image and height, imgW and imgH. If we're initializing, then Appdata.imgW and Appdata.imgH will be 0 or falsy because it hasn't been resized yet. So we need to make the following decision based on the _actual_ image width and height, which will be different based on whether we're initializing or updating.
      // !VA I thought I fixed this...it appears to only apply to dev mode.
      var actualW, actualH
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

    // !VA appController private doContainerHeights
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

    // !VA So this was the concept - to have the image itself be the data store, not some object. Instead of updating the data store and writing the UI from that, you update the core UI element, then recalculate the data store each time it changes. Here, there are 5 mutable elements and 5 properties. Only one of the properties has changed. So we loop through them all, find the match for the prop argument, then update only the element/data property that matches. This is a mickey-mouse solution but it works for now. Ideally we will pass in a key/value pair including the property name and the ID alias so we can use properties... in case there are more than one.


    // !VA CCP Functions
    // !VA appController private initCCP
    function initCCP() {
      // !VA Get Appdata
      var Appdata = appController.initGetAppdata();
      // !VA The app initializes with the CCP closed, so toggle it on and off here.
      document.querySelector(staticRegions.ccpContainer).classList.toggle('active');
      // !VA If the CCP is open:
      if (document.querySelector(staticRegions.ccpContainer).classList.contains('active')) {
        // !VA We have to initialize CCP DOM elements here because they don't exist until the CCP is displayed.




        // !VA CCP Checkboxes - these are mock checkboxes with custom styling, so the ID names have to be converted to checkbox names in order to select or deselect them. We attach the event handler to the checkmark, not the checkbox. The checkmark is converted to checkbox for handling in toggleCheckbox.
        var ccpCheckmarks = [ ccpUserInput.spnCcpImgIncludeWidthHeightCheckmrk, ccpUserInput.spnCcpTableIncludeWrapperCheckmrk ];
        var ccpCheckboxes = [];
        for (let i = 0; i < ccpCheckmarks.length; i++) {
          document.querySelector(ccpCheckmarks[i]).addEventListener('click', handleCCPInput, false);
        }

        // !VA Initialize with all the 'Wrapper table' options undisplayed - uncomment this for DEV
        var wrapperItemsToHide = ['#ccp-table-wrapper-class', '#ccp-table-wrapper-width', '#ccp-table-wrapper-align', '#ccp-table-wrapper-bgcolor' ]; 
        for (let i = 0; i < wrapperItemsToHide.length; i++) {
          document.querySelector(wrapperItemsToHide[i]).style.display = 'none'; 
        }

        // !VA Initialize with 'include wrapper table' unchecked, or true for DEV
        // !VA Reboot: Commenting out for now
        // var includeWrapperTable = document.querySelector((ccpUserInput.spnCcpTableIncludeWrapperCheckmrk.replace('mrk', 'box')));
        // includeWrapperTable.checked = true;


        // !VA Default for table width
        document.querySelector(ccpUserInput.iptCcpTableWidth).value = `${Appdata.imgW}`;
        // !VA Defaults for wrapper width and class
        document.querySelector(ccpUserInput.iptCcpTableWrapperWidth).value = `${Appdata.viewerW}`;
        document.querySelector(ccpUserInput.iptCcpTableWrapperClass).value = 'devicewidth';

      }
    }
      
    // !VA  appController: Toggle checkboxes and run any associated actions
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


    // UIController Show element when input in another element is made 
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


      console.log('event is: ' + event.target.id);

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

    //  !VA ERROR HANDLING
    // ==============================
    // !VA Stores for all app error and status messages
    function appMessages(isErr, messCode) {
      var Appdata = appController.initGetAppdata();
      var messages = {
        // !VA Error messages
        not_Integer: 'This value has to be a positive whole number - try again or press ESC.',
        imgW_GT_viewerW: `The image width has to be less than the width of its container table, which is now&nbsp;set&nbsp;to&nbsp;${Appdata.viewerW}px.`,
        tbButton_LT_zero: 'Sorry, that would make one of the image dimensions less than 0.',
        tbButton_GT_viewerW: `Sorry, that would make the image wider than its container, which is currently set at ${Appdata.viewerW}px`,
        // !VA maxViewerWidth issue here, see message below;
        viewerW_GT_maxViewerWidth: `The container table width can't be greater than the width of the app itself &mdash; 800px.`,
        not_an_integer: 'Not an integer: please enter a positive whole number for width.',

        // !VA Status messages
        copied_2_CB: 'Code snippet copied to Clipboard!',
        // !VA TODO: Status messages 
        // 'btn-ccp-make-img-tag': '<img> HTML element copied to Clipboard',
        // 'btn-ccp-td-build-html-clip': '<td> HTML element copied to Clipboard',
        // 'btn-ccp-table-build-html-clip': '<table> HTML element copied to Clipboard',
        // 'btn-ccp-make-img-dsktp-css-rule-but': 'CSS class delaration copied to the Clipboard',
        // 'btn-ccp-img-lgphn-build-css-clip-but': 'CSS class delaration for tablets copied to the Clipboard',
        // 'btn-ccp-img-smphn-build-css-clip-but': 'CSS class delaration for phones copied to the Clipboard',
        // 'btn-ccp-make-td-dsktp-css-rule-but': 'CSS class delaration copied to the Clipboard!',
        // 'btn-ccp-td-lgphn-build-css-clip-but': 'CSS class delaration for tablets copied to the Clipboard',
        // 'btn-ccp-td-smphn-build-css-clip-but': 'CSS class delaration for phones copied to the Clipboard',
        // 'btn-ccp-table-dsktp-build-css-clip-but': 'CSS class delaration copied to the Clipboard',
        // 'btn-ccp-table-lgphn-build-css-clip-but': 'CSS class delaration for tablets copied to the Clipboard',
        // 'btn-ccp-make-table-smphn-css-rule-but': 'CSS class delaration for phones copied to the Clipboard',
      };
      // !VA Loop through the error ID/message pairs and find the match
      for (const [key, value] of Object.entries(messages)) { 
        if (key === messCode ) {
          mess = value;
        }
      }
      return [isErr, mess];
    }

    // !VA appController private function
    function messageHandler(isErr, messCode) {
      // !VA This doesn't really do anything but pass the code to appMessages, return the message and convert the isErr/message pair to an array so it can be passed as array to flashAppMessage which then breaks it down again into strings...pretty useless. 
      var retArray = [];
      // !VA Call appMessages to get the message for the messCode provided, returned as array with a bool and a string.
      retArray = appMessages(isErr, messCode);
      UIController.flashAppMessage(retArray);
    };

    // !VA Might be good to fold this into error handling
    // appController private validateInteger
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

    // !VA Misc Functions
    // !VA ================================================================
    // !VA Need to get the Appdata property that corresponds to the ID of the DOM input element that sets it. It's easier to just create a list of these correspondences than to rename the whole UI elements and Appdata properties so they correspond, or to create functions that use string methods to extract them from each other.
    //  clipboardController: GET APPDATA PROPERTY NAME FROM AN HTML ELEMENT ID
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

    // !VAS appController private function getAspectRatio
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

    // !VA  appController private
    var initDev = function() {
      // !VA This is where we initialize Dev mode, which is where we can start the app with a hard-coded img element in the HTML file. THis is very useful, otherwise we'd have to drop files to initialize or dink with the FileReader object to hard-code a test file.
      // !VA Get Appdata so we can store the iFilename
      // var Appdata = appController.initGetAppdata();
      // !VA Get the current (devimg) image dimensions and write the Inspectors
      // !VA Turn on the toolbars
      // !VA Reboot 

      // !VA Putting the init in a setTimeout otherwise the script will run before the image loads if using browsersync
      var delayInMilliseconds = 10; //1 second

      setTimeout(function() {
        document.querySelector(staticRegions.tbrContainer).style.display = 'block';
        document.querySelector(dynamicRegions.curImg).style.display = 'block';
  
        // !VA  Get the iFilename of the devImg in the HTML. This is the only time we'll have an actual source file -- in user mode all the images are blobs -- so we can do this as a one-off.
        
        var fname = document.querySelector(dynamicRegions.curImg).src;
        fname = fname.split('/');
        fname = fname[fname.length - 1];
        // !VA Write the iFilename to the DOM so we can add it later to Appdata. It's not completely DRY because it's added to the DOM here and later to Appdata, and then queried in the CCP from Appdata, but it's better than having to query it from the DOM every time it's used in a separate function call. This way, we can loop through Appdata to get it if we need to.
        document.querySelector(iInspectors.iFilename).textContent = fname;
  
        
        // !VA Get the dev image's NW and NH from the DOM. We do NOT write this to Appdata now because 
        // imgW = document.querySelector(dynamicRegions.curImg).naturalWidth;
        // imgH = document.querySelector(dynamicRegions.curImg).naturalHeight;
  
  
  
        // !VA Initialize the value in the toolbar viewerW input field to its initial CSS value.
        // !VA Commenting this out since I changed it to hard-coded in the HTML file along with iptTbrSmallPhonesW and sPhonesH.
        // console.log('document.querySelector(dynamicRegions.imgViewer) is: ' + document.querySelector(dynamicRegions.imgViewer));
        // console.dir(document.querySelector(dynamicRegions.imgViewer));
        // document.querySelector(toolbarElements.viewerW).value = document.querySelector(dynamicRegions.imgViewer).style.width;
        
        // !VA THis is duplicated in handleFileSelect, only included here to initialize dev mode.
        // !VA Set the data attribute for small phone and large phone width. We need this because there is not actual HTML element that corresponds to these properties, and thus no way to persist them globally. So the data attribute sphonew and lphonew will be written to the toolbar input field as surrogate for an actual DOM element that Appdata can query.
        var sphonesw, lphonesw;
        sphonesw = document.querySelector(toolbarElements.iptTbrSPhonesWidth);
        lphonesw = document.querySelector(toolbarElements.iptTbrLPhonesWidth);              
        sphonesw.setAttribute('data-sphonesw', '320');
        lphonesw.setAttribute('data-lphonesw', '414');
        sphonesw.value = sphonesw.getAttribute('data-sphonesw');
        lphonesw.value = lphonesw.getAttribute('data-lphonesw');
        console.log('initDev');
  
        calcViewerSize();
        // !VA Open the CCP by default in dev mode
        // !VA First, set it to the opposite of how you want to start it.
        document.querySelector(staticRegions.ccpContainer).classList.remove('active');
        // !VA Then run initCCP to initialize
  
        initCCP();
      }, delayInMilliseconds);


     
    };


    function getAppdata() {
      // console.log('getAppdata running');
      var arr = [];
      var Appdata = {};
      Appdata = UIController.queryDOMElements();

      // !VA Now compute the rest of Appdat
      Appdata.aspect = getAspectRatio(Appdata.imgNW,  Appdata.imgNH);
      Appdata.sPhonesH = Math.round(Appdata.sPhonesW * (1 / Appdata.aspect[0]));
      Appdata.lPhonesH = Math.round(Appdata.lPhonesW * (1 / Appdata.aspect[0]));
      return Appdata;
    }

    // !VA appController public
    return {
      // !VA Were putting this here so it can be accessed from either other module -- all it does it get the code and pass it on to the private appController function that finds the error code from the string and passes that on to UIController for display.
      initMessage: function(isErr, errCode) {
        messageHandler(isErr, errCode);
      },
      // !VA appController public getAppdata
      // !VA This needs to be just a pass-on function so we can get this junk out of the appController public functions.
      
      // !VA NEW
      initGetAppdata: function() {
        // !VA This is a pass-thru to access queryDOMElements (public UIController)  to get the current dimensions of the dynamic DOM elements and data attributes, and getAppdata (private appController) to calculate the non-DOM Appdata properties. We do this here because Appdata has to be queried in all three modules, so it has to be accessible in all of them, and because getAppdata needs getAspectRatio which belongs in appController.
        var Appdata = getAppdata();
        return Appdata;
      },

      init: function(){
        console.log('App initialized.');
        // !VA  Make sure the CCP is off
        document.querySelector(staticRegions.ccpContainer).classList.remove('active');
        setupEventListeners();
        // !VA  Test if there is currently #cur-img element with an image.If there is, it's hardcoded in the HTML and we're in DEV MODE. If there's not, the app is being initialized in USER MODE.
        var curImgExists = document.querySelector(dynamicRegions.curImg);
        if (curImgExists) {
          initDev();
        } else {
          // !VA  - Initialize the app UI and wait for input
          UICtrl.initUI();
        }
      }
    };

  })(CBController, UIController);

  appController.init();

//Namespace closure
})();