// !VA REBOOT 12/29/19
// ===================
// See C:\Users\VANA\OneDrive\WhittyReview_12.30.19.docx

// !VA GENERAL NOTES
/* !VA  - April Reboot Notes
=========================================================
// !VA 05.07.20
Status:
Rewrote the basic indent routine. It works now for basic TD options and should be relatively easy to modify for a no-img TD option by tweaking the output of makeTdNode to not append imgNode if selected.
TODO: Add tag name to CSS selector output
TODO: Include JSON file settings for content width, small phone width and large phone width
TODO: Determine whether the parent table class or wrapper table class is output to CSS. It should be the parent table class, or even both.
TODO: Add bulletproof button td option


NOTES from first tutorial attempts:
	Why is Wrapper table and parent table being output as two clips in ClipClip?
	Why is CSS table buttons outputting duplicate clips in ClipClip?
	Why is td css button not including the element name in the selector? This is now a TODO.
	Wh are  table css buttons not showing when class is entered? Sometimes they don't...
	When wrapper table is selected and a class is entered in both, which one use output with the CSS buttons?



05.02.20
--------
I've been dinking with these indents for 3 months now, and I have to face the fact that there's no way to do this using the DOM. The comment nodes are too irregular, and Javascript keeps 'correcting' them thus rendering them 'incorrect'. I'm going to try one last approach, which is to add the indents to the comment nodes as strings after outputNL[x].outerHTML. Here are some of the takeaways from the odyssey of creating regular indents with irregular HTML:
- Accessing textContent through outputNL.childNodes[i] doesn't work because the textContent doesn't include the comment characters <!--, which is what we want to replace.
- Accessing the comment characters through outputNL.innerHMTL doesn't appear to work because once you update the DOM by replacing any content in innerHTML, the browser parses the code and tries to 'fix' it.
- Accessing the nodeValue of the individual childNode that contains the ms conditional flag doesn't work because as soon as you do that, JS adds the missing closing span tag, which 1) adds a node and causes the indent character to go before the new closing span instead of the closing TD like it should.
CONCLUSION: The only place to do add indents before the comment character is AFTER outputNL has been converted to string via outerHTML. 

05.07.20
-----------
DONE: Include routine to isolate and open Witty app in a new browser window.
DONE: Reconfigure and repositon msg-container
DONE: Put align options under MakeHTML buttons for IMG and TD options
DONE: Move the CCP interface around to make more room for td and table options.
DONE: Add the Exclude <img> checkbox under Basic <td> with options
DONE: Add Exclude <img> functionality
DONE: FIX CHROME CSS! - see comments at custom.scss .ccp-options-container. For some reason the top: 3px instruction was breaking webkit display. Apparently Firefox handles position: absolute incorrectly, see https://brianscodingexamples.wordpress.com/2013/06/20/absolute-position-elements-in-firefox-vs-chrome/
DONE: Fix table align, doesn't work, shows 'left' when 'center' is seleced. AND 'center' should be preselected. Issue: takes the value from the TD, not the TABLE align option. Plus, the TD Valign option is also taking that value.
TODO: Resize MakeCSS buttons 

TODO: The CSS output will need to be revisited for td and table.
TODO: Figure out why queryDOMElements is running mutliple times per CB build.
TODO: There's an issue with what to do if the user grows the image past the viewer height, but not past the viewer width. Currently, the image height CAN grow past the viewer height; the only limitation is that it can't grow past the viewer width. That's no good.
TODO: Add some kind of fluid option to the img options. Cerberus hard codes it into the img tag. That needs to be tested. Litmus overrides the width and height style properties in the CSS media queries. Need to test before that is implemented - but there's no reason to include a fluid option if that's settable in CSS.
TODO: Fix table width: doesn't reflect what's in toolbar viewer width field.

TODO: Change msg-table to flex div


/* !VA  - 06.23.19
=========================================================

TODO: Fix Include wrapper table options don't appear if the CCP is closed and re-opened 
TODO: rewrite getAppdata to only query specific items in the array, or at least use destructuring to only make a const out of which ever Appdata property is needed in the respective function.
TOD0: Think about making getAppdata only query a specific property if possible.
TODO: CCP numeric input fiels need an input validator
TODO: Fix being able to resize viewerW smaller than imgW - current behavior is imgw resizes with viewerW. If that's the desired behavior, imgW still doesn't write the udpated width to Appdata, that needs to be fixed.
TODO: Make mrk => box function...not sure where though or whether it's necessary since it's just a one-liner.
TODO: Fix bug - load 400X1000, multiple click on +50, Display Size shows 450 but the img doesn't grow...
TODO: Parent table class att only shows in CB output if Wrapper is selected, not in just the Partent table output.
TODO: Make bgcolor add the hash if it's not in the value
TODO: Fix, when imgNW is greater than imgW the imgNW size flashes before resizing to the viewer size. This is probably because of the settimeout, which might not be necesssary if the onload function is running.
TODO: THe CCP should store all the currently selected options and restore them whenever the ccp is opened -- I think. Not sure if this is the right behavior...think bout it. Probably not.YOUTBV
TODO: Assign keyboard  shortcuts
TODO: Assign tab order




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

  // !VA Run on page load
  // document.addEventListener("DOMContentLoaded", function() {
    // console.log('DOMContentLoaded');


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
  // testbut.addEventListener('click', runMe, false);
  // // testBut.addEventListener('click', runMe, false);

  // function runMe(evt) {

  //   var str = 'btn-ccp-make-table-dsktp-css-rule'
  //   var str1 = str.slice(-4);

  



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


  // !VA GLOBAL
  let myObject = {};
  myObject.variable = 'This is a string';


  



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
      ccpBlocker: '#ccp-blocker',
      hdrIsolateApp: '.header-isolate-app'
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
      spnCcpImgIncludeAnchorCheckmrk: '#spn-ccp-img-include-anchor-checkmrk',
      iptCcpTdClass: '#ipt-ccp-td-class',
      selCcpTdAlign: '#sel-ccp-td-align',
      selCcpTdValign: '#sel-ccp-td-valign',
      iptCcpTdHeight: '#ipt-ccp-td-height',
      iptCcpTdWidth: '#ipt-ccp-td-width',
      iptCcpTdBgColor: '#ipt-ccp-td-bgcolor',
      // !VA spn-ccp-td-bgimage-checkmrk
      // !VA This is deprecated as of today
      // spnCcpTdBgimageCheckmrk: '#spn-ccp-td-bgimage-checkmrk',
      rdoCcpTdBasic: '#rdo-ccp-td-basic',
      rdoCcpTdImgswap: '#rdo-ccp-td-imgswap',
      rdoCcpTdPosswitch: '#rdo-ccp-td-posswitch',
      rdoCcpTdBgimage: '#rdo-ccp-td-bgimage',
      rdoCcpTdVmlButton: '#rdo-ccp-td-vmlbutton',


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
    //     var fug = document.querySelector(btnCcpMakeClips.btnCcpMakeTdTag);
    //     fug.click();

    //   }, 500);
    // });


    // !VA UIController private evalInspectorAlerts
    // !VA Reboot: passing in Appdata...it was iInspectors, but writeInspectors doesn't pass iInspectors. So let's see if there's a difference between the passed Appdata and the queried Appdata. Not relevant at this point since Appdata has no data...
    function evalInspectorAlerts(passedAppdata) {
      var allInspectors;
      allInspectors = UIController.getInspectorIDs();
      // !VA Query Appdata
      var Appdata = {};
      Appdata = appController.initGetAppdata(false);
      // console.dir(Appdata);
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
      getBtnCcpMakeClips: function() {
        return btnCcpMakeClips;
      },

      // !VA UIController public getAppdata
      // !VA Moving getAppdata from appController to UIController because Appdata is derived from the DOM elements and data properties that reside in the DOM. 

      queryDOMElements: function() {
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
        // !VA  Initialize the ImgViewer to accomodate the dragArea. This should be the same as the CSS definition: currently 650x450
        // !VA DEV Write the computed styles to console to make sure they are as expected: 650x450
        // var cStyles = window.getComputedStyle(document.querySelector(dynamicRegions.imgViewer));
        // viewerW = cStyles.getPropertyValue('width');
        // viewerH = cStyles.getPropertyValue('height');

        // !VA Make sure the tbrContainer is off and the dropArea is on.
        document.querySelector(staticRegions.dropArea).style.display = 'flex';
        document.querySelector(staticRegions.tbrContainer).style.display = 'none';
        document.querySelector(iInspectors.btnToggleCcp).style.display = 'none';

        const iArray = Object.values(iInspectors);
        for ( let i = 0; i < iArray.length; i++ ) {
          if ( iArray[i] !== '#btn-toggle-ccp' &&  iArray[i] !== '#i-filename' ) {
            document.querySelector(iArray[i]).innerHTML = '<span class="pop-font">&nbsp;&nbsp;No Image</span>';
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

    var iInspectors = UIController.getInspectorIDs();
    var ccpUserInput = UIController.getCcpUserInputIDs();
    var btnCcpMakeClips = UIController.getBtnCcpMakeClips();


    function getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
    }



    // !VA New CSS RUle output functionality 02.20.20
    function  makeCssRule( id, classname, wval, hval ) {
      let Attributes = [];
      Attributes = getAttributes();
      let Appdata = [];
      Appdata = appController.initGetAppdata();
      let clipboardStr;
      let args = [];
      switch(true) {
      case (id.includes('img-dsktp')):
        // args[0] = Attributes.imgClass, args[1] = Attributes.imgWidth, args[2] = Attributes.imgHeight;
        clipboardStr = `.${Attributes.imgClass} { width: ${Appdata.imgW}px !important; height: ${Appdata.imgH}px !important; }`;
        break;
      case (id.includes('img-smphn')):
        clipboardStr = `.${Attributes.imgClass} { width: ${Appdata.sPhonesW}px !important; height: ${Appdata.sPhonesH}px !important; }`;
        break;
      case (id.includes('img-lgphn')):
        clipboardStr = `.${Attributes.imgClass} { width: ${Appdata.lPhonesW}px !important; height: ${Appdata.lPhonesH}px !important; }`;
        break;
      case (id.includes('td-dsktp') || id.includes('td-smphn') || id.includes('td-lgphn')) :
        if ( Attributes.tdHeight) {
          clipboardStr = `.${Attributes.tdClass} { height: ${Attributes.tdHeight}px !important; }`;
        } else {
          clipboardStr = `.${Attributes.tdClass} {  }`;
        }
        break;
      case (id.includes('table-dsktp')):
        clipboardStr = `.${Attributes.tableClass} { width: ${Attributes.tableWidth}px !important; align: ${Attributes.tableAlign} !important; }`;
        break;
      case (id.includes('table-smphn')):
        clipboardStr = `.${Attributes.tableClass} { width: ${Appdata.sPhonesW}px !important; align: ${Attributes.tableAlign} !important; }`;
        break;
      case (id.includes('table-lgphn')):
        clipboardStr = `.${Attributes.tableClass} { width: ${Appdata.lPhonesW}px !important; align: ${Attributes.tableAlign} !important; }`;
        break;
      default:
        // code block
      } 
      // !VA If the input includes a percent char, remove the hard-coded trailing px on the value and just output the value with the user-entered percent char.
      clipboardStr.includes('%')  ? clipboardStr = clipboardStr.replace('%px', '%') : clipboardStr;

      writeClipboard(id, clipboardStr);

    }


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
      // console.clear();
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

    // !VA INDENT FUNCTIONS
    // !VA Get the user selections that define the clipboard output configuration- the clicked Options button, the Include anchor checkbox and the Include wrapper table checkbox. The nodeList used for the indents as well as the indent implementation will depend on these options -- only the basic TD radio button option generates a simple nodeList structure whose indents can be processed with a simple for loop. The other options generate nodeLists with text nodes and comments that require a custom indent scheme.
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
      buildOutputNodeList( uSels );
    }

    // !VA Build the subset of nodes that will be populated with indents and output to the Clipboard. NOTE: outputNL can't be a fragment because fragments don't support insertAdjacentHMTL). So we have to create a documentFragment that contains all the nodes to be output, then append them to a container div 'outputNL', then do further processing on the container div.
    function buildOutputNodeList( uSels ) {
      console.log('buildOutputNodeList running');
      let tableNodeFragment, nl, frag, outputNL, clipboardStr;
      // !VA Get the top node, i.e. tableNodeFragment. We need to pass uSels because makeTableNode calls makeTdNode, which uses uSels to get the current tdoptions radio button selection
      tableNodeFragment = makeTableNode( uSels );
      nl = tableNodeFragment.querySelectorAll('*');
      console.log('nl 667:');
      console.log(nl);
      
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
        // !VA tdbut is clicked. Here we handle the 'basic' and 'posswitch' options because they process indents with no modifications. 'imgswap' and 'bgimage' options are handled separately because they import comment nodes with MS conditional code
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
          // !VA basic option is selected 
          // !VA We can hardcode the 'basic' and 'posswitch' positions for now, but these will have to be revisited if any new options are added that change the outputNL indices. 
          if (uSels.hasWrapper) {
            // !VA The Include wrapper table option is selected, so the entire nodeList is extracted
            extractPos = 0;
            // frag = nl[extractPos];
          } else {
            // !VA The Include wrapper table option is not selected, so all nodes starting at index 3 are extracted
            extractPos = 3;
          }
          frag = nl[extractPos];
          break;
        default:
          // Default code block, this should be an error code
        }
        // !VA Append the fragment to the container
        container.appendChild(frag);
        // !VA Create the outputNL nodeList to pass to the Clipboard object
        outputNL = container.querySelectorAll('*');
        applyIndents( uSels, outputNL );
        clipboardStr = outputNL[0].outerHTML;

      // !VA imgSwap and bgimage option - includes MS conditional code retrieved by getImgSwapBlock and getBgimageBlock which includes getIndent functions. First, run applyIndents on outputNL. applyIndents also inserts tokens at the position where the codeBlock is to be inserted. The parent nodelist is converted to a string, the code blocks are retrieved, indents are inserted, and finally the codeblocks are inserted into the string between the tags of the last node in the outputNL.outerHTML string. 
      } else if (uSels.selectedRadio === 'imgswap' || uSels.selectedRadio  === 'bgimage' || uSels.selectedRadio === 'vmlbutton') {
        // !VA We start with the tdbut makeNode button because the img makeNode button isn't referenced in the imgswap option. The A/IMG tags are hard-coded into the MS Conditional code in getImgSwapBlock. Also, there's a switch to include/exclude the A/IMG node in makeTdNode.

        // !VA extractNodeIndex is the nl index position at which the nodes are extracted to build outputNL. It equals the nodeList length minus the indentLevel.
        let extractNodeIndex;
        // !VA indentLevel is the number of indents passed to getIndent.
        let indentLevel;
        // !VA codeBlock is the MS conditional code block returned as string
        let codeBlock;
        // !VA If the makeTD button is clicked, then only the last node in nl is extracted and the MS conditional comments get one indent level
        if ( uSels.buttonClicked === 'tdbut') {
          console.log('tdbut');
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
        frag = nl[extractNodeIndex];
        // !VA Append the nodeList fragment to the container div
        container.appendChild(frag);
        // !VA Create the nodeList to pass to the Clipboard object. 
        outputNL = container.querySelectorAll('*');
        // !VA Apply the indents and insert the tokens marking the position for inserting the MS conditional code.
        applyIndents(uSels, outputNL);
        // !VA Convert outputNL to a string (including tokens for inserting MS conditional code) for output to Clipboard object.
        clipboardStr = outputNL[0].outerHTML;
        console.log(outputNL[0]);
        
        console.log('mark 1 clipboardStr:');
        console.log(clipboardStr);
        // !VA Get the codeBlock corresponding to the selected TD option
        if ( uSels.selectedRadio === 'imgswap') {
          codeBlock = getImgSwapBlock(indentLevel);
        } else if (  uSels.selectedRadio === 'bgimage' ) {
          codeBlock = getBgimageBlock(indentLevel);
        } else if (uSels.selectedRadio === 'vmlbutton') {
          console.log('mark1');
          codeBlock = getVmlButtonBlock(indentLevel);
          console.log('codeBlock is: ' + codeBlock);
        }
        // !VA Replace the tokens in clipboardStr with the codeBlock
        clipboardStr = clipboardStr.replace('/replacestart//replaceend/', codeBlock + '\n');
        console.log('mark 2 clipboardStr:');
        console.log(clipboardStr);
        
      } 
      // !VA Convert the alias of the clicked button to an ID the Clipboard object recognizes and write clipboardStr to the clipboard.
      writeClipboard( aliasToId(uSels.buttonClicked), clipboardStr);
    }



    function aliasToId( alias ) {
      // !VA Convert uSels.buttonClicked back to an id before passing to Clipboard object.
      let id;
      if (alias === 'imgbut') {id = btnCcpMakeClips.btnCcpMakeImgTag.slice(1); }
      if (alias === 'tdbut') {id = btnCcpMakeClips.btnCcpMakeTdTag.slice(1); }
      if (alias === 'tablebut') {id = btnCcpMakeClips.btnCcpMakeTableTag.slice(1); }
      return id;
    }

    // !VA END INDENT FUNCTIONS

    // !VA START TD OPTIONS MS-CONDITIONAL CODE BLOCKS
    // !VA These are the code blocks that contain MS conditionals in comment nodes or text nodes, i.e. mobile swap and background image.
    // !VA Branch: implementImgSwap (042720)    
    // function getImgSwapBlock( indentLevel ) {

    function getImgSwapBlock( indentLevel ) {
      let Appdata, Attributes, linebreak;
      Attributes = getAttributes();
      Appdata = appController.initGetAppdata();
      linebreak = '\n';
      let mobileFilename, mobileSwapStr;
      // !VA Create the mobile image filename: Get the current image file's filename and append the name with '-mob'.
      mobileFilename = Appdata.fname;
      // !VA The regex for appending the filename with '-mob'.
      mobileFilename = mobileFilename.replace(/(.jpg|.png|.gif|.svg)/g, "-mob$1");
      // !VA Set the indentLevel to 1 for now
      // !VA Create the code for the mobile swap TD as a Comment node of the parent td. 
      mobileSwapStr = `${linebreak}${getIndent(indentLevel)}<!--[if !mso]><!-->${linebreak}${getIndent(indentLevel)}<span style="width:0; overflow:hidden; float:left; display:none; max-height:0; line-height:0;" class="mobileshow">${linebreak}${getIndent(indentLevel)}<a href="#"><img class="mobileshow" alt=${Attributes.imgAlt} width="${Appdata.sPhonesW}" height="${Appdata.sPhonesH}" src="${mobileFilename}" border="0" style="width: ${Appdata.sPhonesW}px; height: ${Appdata.sPhonesH}px; margin: 0; border: none; outline: none; text-decoration: none; display: block;" /></a>${linebreak}${getIndent(indentLevel)}<!--</span>-->${linebreak}${getIndent(indentLevel)}<!--<![endif]-->`;
      // !VA Append the mobileSwapStr code to tdInner
      // tdInner.appendChild(mobileSwapStr);
      return mobileSwapStr;
    }

    function getBgimageBlock( indentLevel) {
      console.log('getBgiamgeBlock running');
      let Attributes;
      Attributes = getAttributes();
      let bgimageStr, fallback, bgcolor;
      let linebreak;
      linebreak = '\n';
      // !VA 03.09.2020 Set the indentLevel to 1 for now
      fallback = '#7bceeb';
      Attributes.tdBgcolor ? bgcolor = Attributes.tdBgcolor : bgcolor = fallback;

      // !VA Define the innerHTML of the bgimage code
      bgimageStr = `${linebreak}${getIndent(indentLevel)}<!--[if gte mso 9]>${linebreak}${getIndent(indentLevel)}<v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:${Attributes.imgWidth}px;height:${Attributes.imgHeight}px;">${linebreak}${getIndent(indentLevel)}<v:fill type="tile" src="${Attributes.tdBackground}" color="${bgcolor}" />${linebreak}${getIndent(indentLevel)}<v:textbox inset="0,0,0,0">${linebreak}${getIndent(indentLevel)}<![endif]-->${linebreak}${getIndent(indentLevel)}<div>${linebreak}${getIndent(indentLevel)}<!-- Put Foreground Content Here -->${linebreak}${getIndent(indentLevel)}</div>${linebreak}${getIndent(indentLevel)}<!--[if gte mso 9]>${linebreak}${getIndent(indentLevel)}  </v:textbox>${linebreak}${getIndent(indentLevel)}</v:rect>${linebreak}${getIndent(indentLevel)}<![endif]-->`;
      // console.log('bgimageStr is: ');
      // console.log(bgimageStr);
      return bgimageStr;
    }

    function getVmlButtonBlock (indentLevel) {
      // console.clear();
      let Attributes;
      Attributes = getAttributes();
      console.dir(Attributes);
      let vmlButtonStr;
      let linebreak;
      linebreak = '\n';
      // !VA Branch: implementVMLButton (050720)
      /* !VA  
      Should be:  width = tdoptions.height.input.value
                  height = tdoptions.height.input.value
                  if either of the above's value is falsy, trigger an error


      
      
      */
      var tdHeight, tdWidth;
      console.clear();
      tdHeight = document.querySelector(ccpUserInput.iptCcpTdHeight).value;
      tdWidth = document.querySelector(ccpUserInput.iptCcpTdWidth).value;



      vmlButtonStr = `${linebreak}${getIndent(indentLevel)}<div><!--[if mso]>${linebreak}${getIndent(indentLevel)}<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:${tdHeight}px;v-text-anchor:middle;width:${tdWidth}px;" arcsize="10%" strokecolor="#1e3650" fill="t">${linebreak}${getIndent(indentLevel)}<v:fill type="tile" src="${Attributes.imgSrc}" color="#556270" />${linebreak}${getIndent(indentLevel)}${linebreak}${getIndent(indentLevel)}<w:anchorlock/>${linebreak}${getIndent(indentLevel)}<center style="color:#ffffff;font-family:sans-serif;font-size:13px;font-weight:bold;">Show me the button!</center>${linebreak}${getIndent(indentLevel)}</v:roundrect>${linebreak}${getIndent(indentLevel)}<![endif]--><a href="#"
style="background-color:#556270;background-image:url(${Attributes.imgSrc});border:1px solid #1e3650;border-radius:4px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:13px;font-weight:bold;line-height:${tdHeight}px;text-align:center;text-decoration:none;width:${tdWidth}px;-webkit-text-size-adjust:none;mso-hide:all;">Show me the button!</a></div>`;
      return vmlButtonStr;
    }
    // !VA END TD OPTIONS MS-CONDITIONAL CODE BLOCKS
    // function makeImgNode ( id ) {
    function makeImgNode ( ) {
      // !VA Id is passed but not used here,  because we're only building the node.
      let Attributes;
      Attributes = getAttributes();
      let imgNode, returnNode;
      // !VA Branch: 031320A Let's try to use fragments again for this.
      let returnNodeFragment;
      imgNode = document.createElement('img');
      returnNodeFragment = document.createDocumentFragment();

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
      
      // !VA If the include anchor option is checked, create the anchor element, add the attributes, append the imgNode to it, and return it.
      if(Attributes.imgIncludeAnchor === true) {
        let anchor = document.createElement('a');
        anchor.href = '#';
        anchor.setAttribute('style', 'color: #FF0000');
        anchor.appendChild(imgNode);
        returnNodeFragment.appendChild(anchor);
      } else {
        // !VA Otherwise, set returnNode to imgNode without the anchor.
        // !VA Branch: 031320A
        returnNodeFragment.appendChild(imgNode);
      }
      // !VA Branch: 031320A
      // return returnNode;
      return returnNodeFragment;
    }



    // !VA 03.10.2020 Need to find out whether the table button was clicked and if so just add 3 or 6 to the indentLevel of the getIndent function.
    // !VA Branch: 031320A
    // function makeTdNode( id, selectedRadio ) {
    function makeTdNode( uSels ) {
      console.log('makeTdNode running');
      console.log('makeTdNode uSels is: ');
      console.dir(uSels);
      let Attributes;
      Attributes = getAttributes();
      let tdInner, imgNode;
      tdInner = document.createElement('td');
      // !VA Branch: 031320A
      let tdNodeFragment;
      tdNodeFragment = document.createDocumentFragment();
      // !VA Add the attributes that are included in both the default and background image td
      if (Attributes.tdValign) { tdInner.vAlign = Attributes.tdValign; }
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
        // !VA height attribute
        // !VA Branch: implementVMLButton (050720) The below is wrong. 
        /* !VA  Problems:
        1) ClipClip isnt' working as it should - it repopulates the list after you delete it.
        2) If you add height and width to TD options, it stays in there even if you delete it from the input fields.
        
        
        
        
        */



        if (Attributes.tdHeight) { tdInner.height = Attributes.tdHeight; }
        if (Attributes.tdWidth) { tdInner.width = Attributes.tdWidth; }
        // !VA Branch: implementExcludeImg (050420)
        // !VA If 'basic' is checked, create imgNode and append it, otherwise exclude the imgNode.
        if (uSels.selectedRadio === 'basic') {
          imgNode = makeImgNode();
          // !VA We need to include the imgNode here ONLY if Bgimage is unchecked
          tdInner.appendChild(imgNode);
        }
        break;
        // !VA Branch: 031320A
      // case (selectedRadio === 'imgswap'):
      case (uSels.selectedRadio === 'imgswap'):
        console.log('makeTdNode imgswap');
        tdInner.width = Attributes.tdAppdataWidth;
        tdInner.height = Attributes.tdAppdataHeight;
        // !VA valign attribute
        tdInner.align = Attributes.tdAlign;
        // !VA get the current img
        // !VA Branch: implementImgSwap (042720) Don't include the imgNode
        // imgNode = makeImgNode();
        // tdInner.appendChild(imgNode);
        break;
      // !VA Branch: 031320A
      // case (selectedRadio === 'bgimage'):
      case (uSels.selectedRadio === 'bgimage'):
        console.log('makeTdNode bgimage');
        // !VA First we create the node
        tdInner.width = Attributes.tdAppdataWidth;
        tdInner.height = Attributes.tdAppdataHeight;
        // !VA valign attribute
        tdInner.vAlign = Attributes.tdValign;
        // !VA Set the background attribute to the current path/filename
        tdInner.setAttribute('background', Attributes.tdBackground);
        // !VA Include fallback color if no bgColor is selected. Use Stig's fallback: #7bceeb
        break;
        // !VA Branch: 031320A
      // case (selectedRadio === 'posswitch'):
      case (uSels.selectedRadio === 'posswitch'):
        tdInner  = makePosSwitchNodes();
        break;
      default:
      } 
      // !VA Branch: 031320A
      // return tdInner;
      // console.log('tdInner is: ');
      // console.log(tdInner);
      tdNodeFragment.appendChild(tdInner);
      return tdNodeFragment;

    }

    // !VA Branch: 031320A
    // function makeTableNode( id ) {
    function makeTableNode( uSels) {
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
      // !VA Branch: 031320A
      // tdInner = makeTdNode( id );
      // trInner.appendChild(tdInner);
      let tdNodeFragment = makeTdNode( uSels );
      trInner.appendChild(tdNodeFragment);
      
      // !VA 03.06.20A We are ALWAYS outputting EVERYTHING this time...
      // if (!Attributes.tableIncludeWrapper) {
      //   // !VA If Include table wrapper is unchecked, just return this inner table
      tableNode = tableInner;
      // } else {
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
      // !VA Branch: 031320A
      // tableNode = tableOuter;
      let tableNodeFragment;
      tableNodeFragment = document.createDocumentFragment();
      tableNodeFragment.appendChild(tableOuter);
      // }
      console.log('tableNodeFragment:');
      console.log(tableNodeFragment);
      
      return tableNodeFragment;
    }

    function applyIndents( uSels, outputNL ) {
      console.log('applyIndents running');
      // !VA Create array to store indent strings
      let indents = [];
      // !VA Create array to store the positions of the stackable columns in the posswitch option.
      let stackColumnPos = [];
      // !VA Variable to hold the indentLevel of the second posswitch column that the first posswitch column will stack over.
      let stackColumnIndentLevel;

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
          // !VA If stackColumnPos is empty, then the 'basic' td option is selected. Apply regular indents to all nodes.
          if (stackColumnPos.length === 0) {
            // !VA If the node is the last index in outputNL AND the option 'imgswap' or 'bgimage' is selected, then modify the indent to include the token for inserting the MS conditional code after outputNL is converted to text.
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
          }
        }
      }
      
      return outputNL;
    }

    // !VA Return the indent string based on the indent level passed in
    function getIndent(indentLevel) {
      let indentChar, indent;
      indentChar = '  ';
      // !VA Repeat the indent character indentLevel number of times
      indent = indentChar.repeat([indentLevel]);
      return indent;
    }

    function writeClipboard(id, str) {
      console.log('writeClipboard running');
      console.log('str: ');
      console.log(str);
      
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
          console.log('selectid send:');
          console.log(selectid);
          
          options = [ '', 'left', 'center', 'right'];
          str = getAlignAttribute( selectid, options );
          console.log('str:');
          console.log(str);
          
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

    function makePosSwitchNodes() {
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
      td_switchcontainerAttr = {
        dir: 'rtl',
        width: '100%',
        align: 'left',
        bgcolor: '#FFFFFF'
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

      };
      td_switchcontent2Attr = {
        dir: 'ltr',
        align: 'left',
        vAlign: 'top'
      };
      // p_switchcontent2Attr = {
      //   style: 'margin: 10px',
      // };

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

    // !VA CBController public functions 
    return {


      // !VA Called from eventHandler to handle clipboard button clicks
      doClipboard: function(evt) {
        let id = evt.target.id;
        // !VA If the clicked element id is a Make Tag button, run makeNodeList, otherwise run makeCSSRule.
        // !VA getUserSelection
        // id.includes('tag') ? makeNodeList(id) : makeCssRule(id);
        // id.includes('tag') ? makeNodeList(id) : makeCssRule(id);
        // !VA 03.13.2020 Initiating script at getUserSelections for branch 031320A instead of getUserSelection
        id.includes('tag') ? getUserSelections(id) : makeCssRule(id);

       
      },
      runTest: function() {
        console.log('runTest running');
        // makeNodes();
        makePosSwitchNodes();
      }
    
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
    var btnCcpMakeClips =  UICtrl.getBtnCcpMakeClips();
    

    // !VA appController private setupEventListeners
    var setupEventListeners = function() {

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

      var isolateAppBlob = document.querySelector(staticRegions.hdrIsolateApp);
      isolateAppBlob.addEventListener('click', isolateApp, false);

      function isolateApp() {
        console.log('isolateApp running');
        // !VA Put a query string in the URL to indicate that the child window is isolated
        var curURL = window.location.href + '?isolate=' + true;
        var win;
        // !VA Open a new fixed-size window with no browser elements except the URL bar
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

      // !VA This was in the old version but it doesn't look necessary
      // function initializeHandlers() {

      //EVENT HANDLING START 
      function addEventHandler(oNode, evt, oFunc, bCaptures) {
        //Removing this -- apparently IE 9 and 10 support addEventListener
        // if (typeof(window.event) != "undefined")
        // 	oNode.attachEvent("on"+evt, oFunc);
        // else
        oNode.addEventListener(evt, oFunc, bCaptures);
      }
      // addEventHandler(document.getElementById(toolbarElements.btnTbrIncr01),'click',doit,false);
      
      // !VA Add click and blur event handlers for clickable toolbarElements: 
      var tbClickables = [ toolbarElements.btnTbrIncr50, toolbarElements.btnTbrIncr10, toolbarElements.btnTbrIncr01, toolbarElements.btnTbrDecr50, toolbarElements.btnTbrDecr10, toolbarElements.btnTbrDecr01  ];
      for (let i = 0; i < tbClickables.length; i++) {
        // !VA convert the ID string to the object inside the loop
        tbClickables[i] = document.querySelector(tbClickables[i]);
        addEventHandler(tbClickables[i],'click',handleMouseEvents,false);

      }
      
      // !VA Add event handlers for input toolbarElements
      var tbKeypresses = [ toolbarElements.iptTbrViewerW, toolbarElements.iptTbrImgWidth, toolbarElements.iptTbrImgHeight, toolbarElements.iptTbrSPhonesWidth, toolbarElements.iptTbrLPhonesWidth ];
      for (let i = 0; i < tbKeypresses.length; i++) {
        // !VA convert the ID string to the object inside the loop
        tbKeypresses[i] = document.querySelector(tbKeypresses[i]);
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


    function updateAppdata( ...params ) {
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
        var ccpCheckmarks = [ ccpUserInput.spnCcpImgIncludeWidthHeightCheckmrk, ccpUserInput.spnCcpImgIncludeAnchorCheckmrk, ccpUserInput.spnCcpTableIncludeWrapperCheckmrk ];
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
    }

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
  
        calcViewerSize();
        // !VA Open the CCP by default in dev mode
        // !VA First, set it to the opposite of how you want to start it.
        document.querySelector(staticRegions.ccpContainer).classList.remove('active');
        // !VA Then run initCCP to initialize
        initCCP();
      }, delayInMilliseconds);
    };


    function getAppdata() {
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


        // !VA Determine if the window is an isolate window, i.e. should be displayed with just the Witty app in window with fixed dimensions without header or tutorial content.
        let curUrl;
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