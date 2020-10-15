// !VA 10 2020
// ===================
// See WittyDevelopmentLog_09.09.20A.docx
// See WittyFunctions_09.09.20.xlsx

/* !VA  
TODO: Get the installed color theme in W10.
TODO: FIX BUG wher entering TD Height write TD WIdth to Appobj.

// !VA Branch: 100920A
Need to update Appobj and the UI after padding changes. Need a function for that since I don't think there currently is one. For the UI, there's reflectAppobj. So what we need is a function that recalculates Appobj based on padding changes and then uses reflectAppobj to update the UI with those changes. Where are padding changes written to Appobj?






ERROR CHECKING
==============
Need a plan of action for error checking at this point since padding has been implemented and appears to work.
In checkNumericInput:
-Need a hasPadding function to use for conditionals in switch statements. This will be similar to the hasPadding routine in getAttributes.tdStyle. 









*/


//SCRIPT START
//PAGE SETUP START

// Namespace
var Witty = (function () {

  // // !VA Run on page load
  // document.addEventListener("DOMContentLoaded", function() {
  //   // setTimeout(function(){ 
  //   // }, 100);
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

  // !VA Branch: OVERHAUL0907A
  // !VA MUTATIONOBSERVER
  // !VA https://www.seanmcp.com/articles/event-listener-for-class-change/
  // Select the node that will be observed for mutations

  // const mainNode = document.getElementById('ccp-tbl-wrapr-lbl');

  // function callback(mutationsList, observer) {
  //   console.log('Mutations:', mutationsList);
  //   console.log('Observer:', observer);
  //   mutationsList.forEach(mutation => {
  //     if (mutation.attributeName === 'class') {
  //       console.log('Class change = set debugger to determine where...');
  //     }
  //   });
  // }
  // const mutationObserver = new MutationObserver(callback);
  // mutationObserver.observe(mainNode, { attributes: true });


  //   var tbl = 
  // `<table role="presentation" data-ghost-tbl="true" width="200" cellspacing="0" cellpadding="0" border="0">
  //   <tr>
  //     <td valign="top" align="left">
  //       <a href="#" style="color: #0000FF; " target="_blank"><img src="img/_200X150.png" style="display: block; width: 200px; height: 150px; font-family: Arial, sans-serif; font-size: 16px; line-height: 15px; text-decoration: none; border: none; outline: none;" width="200" height="150" border="0"></a>
  //     </td>
  //   </tr>
  // </table>`;
    
  //   var ghostOpen = 
  // `<!--[if (gte mso 9)|(IE)]>
  // <table align="center" border="0" cellspacing="0" cellpadding="0" width="200">
  // <tr>
  // <td align="center" valign="top" width="200">
  // <![endif]-->\n`;

  //   var ghostClose = 
  // `\n<!--[if (gte mso 9)|(IE)]>
  // </td>
  // </tr>
  // </table>
  // <![endif]-->`;

  // // !VA Get the full data property string including boolean
  // var index, dataAtt, dataAttLength, boolPos, bool, boolLength, replStr;
  // dataAtt = 'data-ghost-tbl';
  // // !VA Get the index of the data attribute
  // index = tbl.indexOf(dataAtt);
  // // !VA Get the length of the data attribute
  // dataAttLength = dataAtt.length;
  // // !VA Get the index of the data attribute's value, which is a boolean
  // boolPos = index + dataAttLength + 2;
  // // !VA If the 4 chars following boolpos equals 'true' then the bool is true, else it is false
  // tbl.substr( boolPos, 4) === 'true' ? bool = true : bool = false;
  // // !VA Length of the data attribute value, i.e. the boolean
  // bool ? boolLength = 4 : boolLength = 5;
  // // !VA Length of the data attribute including value, including equal sign, two quotes and a space
  // dataAttLength = dataAttLength + boolLength + 4;
  // // !VA The full data attribute string, including value and closing space
  // dataAtt = tbl.substr( index, dataAttLength);
  // console.log('dataAtt is: ' + dataAtt, '; bool is: ' + bool);
  // // !VA The string to add the opening ghost tag to. The string length is the index of the data attribute, i.e. index, plus the length of the data attribute, i.e. dataAttLength.
  // replStr = tbl.substr( 0, index + dataAttLength);
  // // !VA If the Ghost checkbox icon is checked, i.e. bool is true, then prepend the ghost table to the table, and add the closing ghost tag after the closing table tag
  // if (bool) { 
  //   tbl = tbl.replace( replStr, `${ghostOpen}${replStr}`); 
  //   tbl = tbl.replace( '</table>', `</table>${ghostClose}`)

  // }
  // // !VA Remove the data attribute string
  // tbl = tbl.replace( dataAtt, '');
  // // console.log('tbl is: ');
  // // console.log(tbl);






  var testbut = document.querySelector('#testme');
  // var testbut2 = document.querySelector('#testme2');
  var addMe = function() {
    console.log('event listener');
  };

  testbut.onclick = function() {
    // console.log('someVar is: ' + someVar);
    // someVar ?  testbut2.addEventListener('click', addMe, false) : testbut2.removeEventListener('click', addMe, false);
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
      iptTbrImgViewerW: '#ipt-tbr-imgviewerw',
      btnTbrIncr50: '#btn-tbr-incr50',
      btnTbrIncr10: '#btn-tbr-incr10',
      btnTbrIncr01: '#btn-tbr-incr01',
      iptTbrCurImgW: '#ipt-tbr-curimgw',
      iptTbrCurImgH: '#ipt-tbr-curimgh',
      btnTbrDecr01:'#btn-tbr-decr01',
      btnTbrDecr10: '#btn-tbr-decr10',
      btnTbrDecr50: '#btn-tbr-decr50',
      iptTbrSPhonesW: '#ipt-tbr-sphonesw',
      iptTbrLPhonesW: '#ipt-tbr-lphonesw',
    };

    // !VA UIController: dynamicElements
    const dynamicElements = {
      curImg: '#cur-img',
      imgViewer: '#main-image-viewer',
      imgViewport: '#image-viewport',
      appContainer: '#app-container',
    };

    // !VA UIController: staticContainers
    const staticContainers = {
      dropArea: '#drop-area',
      tbrContainer: '#toolbar-container',
      ccpContainer: '#ccp',
      msgContainer: '#msg-container',
      appBlocker: '#app-blocker',
      hdrIsolateApp: '.header-isolate-app'
    };
    
    // !VA  OVERHAUL NEW: UIController: ccpUserInput ID Strings
    // !VA imgAnchor is just a flag for the status of the checkbox. The actual propStrings have to have an Open and Close property.
    const ccpUserInput = {
      ccpImgMkcssGrp: '#ccp-img-mkcss-grp',
      ccpImgCbhtmBtn: '#ccp-img-cbhtm-btn',
      ccpImgCbdtpBtn: '#ccp-img-cbdtp-btn',
      ccpImgCbsphBtn: '#ccp-img-cbsph-btn',
      ccpImgCblphBtn: '#ccp-img-cblph-btn',
      ccpImgClassTfd: '#ccp-img-class-tfd',
      ccpImgAltxtTfd: '#ccp-img-altxt-tfd',
      ccpImgLoctnTfd: '#ccp-img-loctn-tfd',
      ccpImgAnchrTfd: '#ccp-img-anchr-tfd',
      ccpImgTxclrTfd: '#ccp-img-txclr-tfd',
      ccpImgTargtChk: '#ccp-img-targt-chk',
      ccpImgAlignRdo: '#ccp-img-align-rdo',
      ccpImgExcldRdo: '#ccp-img-excld-rdo',
      ccpImgItypeRdo: '#ccp-img-itype-rdo',
      ccpTdaCbhtmBtn: '#ccp-tda-cbhtm-btn',
      ccpTdaMkcssGrp: '#ccp-tda-mkcss-grp',
      ccpTdaCbdtpBtn: '#ccp-tda-cbdtp-btn',
      ccpTdaCbsphBtn: '#ccp-tda-cbsph-btn',
      ccpTdaCblphBtn: '#ccp-tda-cblph-btn',
      ccpTdaClassTfd: '#ccp-tda-class-tfd',
      ccpTdaWidthTfd: '#ccp-tda-width-tfd',
      ccpTdaHeigtTfd: '#ccp-tda-heigt-tfd',
      ccpTdaBgclrTfd: '#ccp-tda-bgclr-tfd',
      ccpTdaTxclrTfd: '#ccp-tda-txclr-tfd',
      ccpTdaBdradTfd: '#ccp-tda-bdrad-tfd',
      ccpTdaBdclrTfd: '#ccp-tda-bdclr-tfd',
      ccpTdaAlignRdo: '#ccp-tda-align-rdo',
      ccpTdaValgnRdo: '#ccp-tda-valgn-rdo',
      // ccpTdaPadngGrp: '#ccp-tda-padng-grp',
      ccpTdaPdtopTfd: '#ccp-tda-pdtop-tfd',
      ccpTdaPdrgtTfd: '#ccp-tda-pdrgt-tfd',
      ccpTdaPdbtmTfd: '#ccp-tda-pdbtm-tfd',
      ccpTdaPdlftTfd: '#ccp-tda-pdlft-tfd',
      ccpTdaOptnsRdo: '#ccp-tda-optns-rdo',
      ccpTdaBasicPar: '#ccp-tda-basic-par',
      ccpTdaIswapPar: '#ccp-tda-iswap-par',
      ccpTdaSwtchPar: '#ccp-tda-swtch-par',
      ccpTdaBgimgPar: '#ccp-tda-bgimg-par',
      ccpTdaVmlbtPar: '#ccp-tda-vmlbt-par',
      ccpTblMkcssGrp: '#ccp-tbl-mkcss-grp',
      ccpTblCbhtmBtn: '#ccp-tbl-cbhtm-btn',
      ccpTblCbdtpBtn: '#ccp-tbl-cbdtp-btn',
      ccpTblCbsphBtn: '#ccp-tbl-cbsph-btn',
      ccpTblCblphBtn: '#ccp-tbl-cblph-btn',
      ccpTblAlignRdo: '#ccp-tbl-align-rdo',
      ccpTblClassTfd: '#ccp-tbl-class-tfd',
      ccpTblWidthTfd: '#ccp-tbl-width-tfd',
      ccpTblMaxwdTfd: '#ccp-tbl-maxwd-tfd',
      ccpTblBgclrTfd: '#ccp-tbl-bgclr-tfd',
      ccpTblGhostChk: '#ccp-tbl-ghost-chk',
      ccpTblMsdpiChk: '#ccp-tbl-msdpi-chk',
      ccpTblWraprChk: '#ccp-tbl-wrapr-chk',
      ccpTblHybrdChk: '#ccp-tbl-hybrd-chk',
      ccpTbwAlignRdo: '#ccp-tbw-align-rdo',
      ccpTbwClassTfd: '#ccp-tbw-class-tfd',
      ccpTbwWidthTfd: '#ccp-tbw-width-tfd',
      ccpTbwMaxwdTfd: '#ccp-tbw-maxwd-tfd',
      ccpTbwBgclrTfd: '#ccp-tbw-bgclr-tfd',
      ccpTbwGhostChk: '#ccp-tbw-ghost-chk',
      ccpTbwMsdpiChk: '#ccp-tbw-msdpi-chk'
    
    };

    // !VA CCP Elements used for tooltips. This is a different list than the CCPUserInput elements although some are duplicated. The element that triggers the tooltip has to be the parent element of the input or checkbox element, otherwise if the user hovers over a label instead of the actual input element, nothing happens.
    const ccpUserInputLabels = {
      ccpImgAlignRdoLabel: '#sel-ccp-img-align-label',
      ccpImgClassTfdLabel: '#ipt-ccp-img-class-label',
      ccpImgLoctnTfdLabel: '#ipt-ccp-img-relpath-label',
      ccpImgAltxtTfdLabel: '#ipt-ccp-img-alt-label',
      iptCcpImgIncludeWidthHeightLabel: '#ccp-img-include-width-height-label',
    };
      
    // !VA OVERHAUL NEW: Build HTML Clipboard Buttons. 
    // !VA NOTE: The suffix on the alias is Btn and the suffix on the element ID is ipt. Consider fixing this at some point
    const iptCcpMakeClips = {
      // !VA Make HTML Tag Buttons
      ccpTdaCbhtmIpt: '#ccp-tda-cbhtm-ipt',
      ccpImgCbhtmIpt: '#ccp-img-cbhtm-ipt',
      ccpTblCbhtmIpt: '#ccp-tbl-cbhtm-ipt',
      // !VA Make Image CSS Rule Buttons
      ccpImgCbdtpIpt: '#ccp-img-cbdtp-ipt',
      ccpImgCbsphIpt: '#ccp-img-cbsph-ipt',
      ccpImgCblphIpt: '#ccp-img-cblph-ipt',
      // !VA Make Td CSS Rule Buttons
      ccpTdaCbdtpIpt: '#ccp-tda-cbdtp-ipt',
      ccpTdaCbsphIpt: '#ccp-tda-cbsph-ipt',
      ccpTdaCblphIpt: '#ccp-tda-cblph-ipt',
      // !VA Make Table CSS Rule  Buttons
      ccpTblCbdtpIpt: '#ccp-tbl-cbdtp-ipt',
      ccpTblCbsphIpt: '#ccp-tbl-cbsph-ipt',
      ccpTblCblphIpt: '#ccp-tbl-cblph-ipt',
    };

    
    // !VA Appmessage elements
    const appMessageElements = {
      tipContent: '#tip-content',
      msgContent: '#msg-content',
      errContent: '#err-content'
    };

    // !VA UIController   
    // !VA Called from writeInspectors. Evaluate which Inspectors should be flagged with alerts for having too low a resolution for retina devices
    function evalInspectorAlerts(Appobj) {
      // !VA init inspector and flagged inspector lists
      let allInspectors = [];
      // !VA Array to hold the flagged inspector labels
      let flaggedInspectors = [];
      // !VA Get all the Inspector labels
      allInspectors = UIController.getInspectorLabelsIDs();
      // !VA Size On Disk is NOT 2X the Display Size: flag Size on Disk and Retina
      if (Appobj.curImgNW < (Appobj.curImgW * 2) ) {
        flaggedInspectors.push(allInspectors.insDiskSizeLabel);
      } 
      // !VA Small phones isn't at least 2X size on Disk and Retina
      if (Appobj.curImgNW < (Appobj.sPhonesW * 2) ) {
        flaggedInspectors.push(allInspectors.insSmallPhonesLabel);
      }
      // !VA Large phones isn't at least 2X Size on Disk and Retina
      if (Appobj.curImgNW < (Appobj.lPhonesW * 2) ) {
        flaggedInspectors.push(allInspectors.insLargePhonesLabel);
      } 
      // !VA Reset all the dim viewer alerts by passing in the entire Inspector array. We're running this function twice here, each time with different parameters -- could be DRYer but it works and 
      // UIController.writeInspectorAlerts(allInspectors, false);
      // !VA Now set the individual dim viewer alerts for the current image.
      UIController.writeInspectorAlerts(flaggedInspectors);
    }

    // !VA UIController   
    // !VA Not sure why I removed the tooltipTarget argument, but keeping it for reference
    // function showAppMessages(appMessContainerId, tooltipTarget) {
    function showAppMessages(appMessContainerId ) {
      // !VA Show the current appMessage. If the current appMessage is a tooltip, then show the help cursor while the mouse is in the tooltip element.
      document.querySelector(appMessContainerId).classList.add('active');
      if (!appMessContainerId.includes('tip')) {
        document.querySelector(staticContainers.appBlocker).classList.add('active');
      } 
    }

    // !VA UIController   
    // !VA Not sure why the tooltipTarget was included, but it's not referenced, so removing for now.
    // function hideAppMessages(appMessContainerId, tooltipTarget) {
    function hideAppMessages(appMessContainerId) {
      // !VA Hide current app message
      document.querySelector(staticContainers.appBlocker).classList.remove('active');
      document.querySelector(appMessContainerId).classList.remove('active');
    }

    // !VA UIController   
    // !VA TODO: Determine final location for getAspectRatio
    // !VA Calc the apsect ratio - putting this here for now until it's decided where it needs to live. It's currently needed in appController for Appd... but can live in UIController    once Appd... is deprecated.
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
    // !VA Branch: OVERHAUL0903A
    // !VA This is only called from populateAppobj?
    // !VA Gets the value of a text input field in a text input field container based on the alias/Appobj property of the parent text input field container. Called from populateAppobj, could probably be deprecated.
    // !VA Branch: OVERHAUL0904A
    // !VA Deprecating...
    // function fetchTextInput( alias ) {
    //   let selectedOption;
    //   // !VA Replace the parent's id code with the input element's id code, get the input element and add its value to Appobj 
    //   selectedOption = document.querySelector(ccpUserInput[alias].replace('tfd', 'ipt')).value;
    //   return selectedOption;
    // }

    // !VA Branch: OVERHAUL0902A
    // !VA UIController private
    // !VA If called from populateAppobj, returns the value of text input fields as hard-coded in the HTML. Otherwise, called by configCCP, which receives an array of aliases whose corresponding CCP element value is set to its corresponding Appobj value. 
    function reflectAppobj( reflectArray) { 

      // !VA Branch: 100920A
      // !VA TEST: Check the data type of an array element
      // if (reflectArray[0] === 'ccpTdaHeigtTfd') {
      //   console.log('HIT');
      //   console.log('reflectAppobj: typeof(reflectArray[0]) :>> ' + typeof(reflectArray[0]));
      // }

      let el, isInit, retVal;
      for (const alias of reflectArray) {
        typeof(appController.getAppobj(alias)) === 'undefined' ? isInit = true : isInit = false;
        // console.log('alias is: ' + alias);
        el = document.querySelector(ccpUserInput[alias].replace('tfd', 'ipt'));
        if (isInit) {
          // !VA Branch: 0914B
          // !VA Deleting the value on init should reset all input fields to empty strings, thereby exposing whatever preset value attributes in the HTML. This should actually make resetting input elements to empty in configDefault redundant. For later...
          el.value = '';
          retVal = el.value;
          // console.log('isInit is: ' + isInit + '; retVal is: ' + retVal);
          return retVal;
        } else {
          el.value = appController.getAppobj( alias );
        }
      }
    }

    // !VA Branch: OVERHAUL0901A
    // !VA UIController private
    // !VA If called from populateAppobj, returns the value of checkbox input elements as hard-coded in the HTML. Otherwise, called by configCCP, which receives an array of aliases whose corresponding CCP element value is set to its corresponding Appobj value. 
    function checkboxState( checkedArray ) {
      // console.log('checkboxState running'); 
      let el, isChecked, isInit;
      for (let i = 0; i < checkedArray.length; i++) {
        isChecked = appController.getAppobj( checkedArray[i]);
        // !VA Replace the 'chk' suffix in the alias with 'ipt' to target the checkbox input
        el = document.querySelector(ccpUserInput[checkedArray[i]].replace('chk', 'ipt'));
        // console.log('el.id is: ' + el.id);
        // console.log('isChecked is: ' + isChecked);
        // !VA If the Appobj property of the alias is 'undefined', then the call comes from populateCcpProperties and the Appobj property hasn't been in itialized yet. Set the isInit flag to true to get the value of the element corresponding to the alias and write it to Appobj to initialize
        typeof(appController.getAppobj(checkedArray[i])) === 'undefined' ? isInit = true : isInit = false;
        // !VA If isInit is true, then get the hard-coded checkbox state from the HTML DOM and return it to populate Appobj with it.  
        if (isInit) {
          isChecked = el.checked;
          return isChecked;
        } else  {
          // !VA If isInit is false, then Appobj is already populated, so get the checked state from Appobj and set the current elements' checked state to it.
          // !VA Branch: OVERHAUL0905A
          // !VA Fixing... 
          // isChecked = appController.getAppobj(checkedArray[i]);

          el.checked = isChecked;

          

          // !VA Check the checkbox of the passed-in alias
        }
        // console.log('checkboxState Appobj is: ');
        // console.dir(appController.getAppobj());
      }
    }
    
    // !VA UIController private
    // !VA Branch: OVERHAUL0901A
    // !VA  If called from populateAppobj, returns the selected (checked) value of radio input elements as hard-coded in the HTML. Otherwise, called by configCCP, which receives an array of aliases whose corresponding radio element selection is set to its corresponding Appobj value. Handles both align radio elements and binary/multi-select radio option groups.
    function radioState( radioArray ) {
      let retVal, iptElements, option,  parent, chldrn, isInit;
      for (let i = 0; i < radioArray.length; i++) {
        // !VA This is called directly in populateAppobj to initialize Appobj with the CCP UI values as defined in the HTML file. So the getAppobj call for initialization will return 'undefined'. In that case, get the element's option value from the DOM and set Appobj to that value. 

        // !VA Branch: OVERHAUL0904A
        // !VA Added handling for Align/Valign Rdo elements
        // !VA Branch: OVERHAUL0904A
        // !VA If the Appobj property of the alias is 'undefined', then the call comes from populateCcpProperties and the Appobj property hasn't been initialized yet. Set the isInit flag to true to get the value of the element corresponding to the alias and write it to Appobj to initialize
        typeof(appController.getAppobj(radioArray[i])) === 'undefined' ? isInit = true : isInit = false;
        // !VA If not isInit, then get the selected option from Appobj. 
        if (!isInit) { option = appController.getAppobj(radioArray[i]); }

        // !VA If the element is an align radio group
        if ( radioArray[i].includes('Align') || radioArray[i].includes('Valgn')) {
          // !VA Get the parent container of the individual child input elements
          parent = document.querySelector(ccpUserInput[radioArray[i]]);
          // !VA Get a collection of the children
          chldrn = parent.children;
          // !VA Loop through the children
          for (const chld of chldrn) {
            // !VA If the child is an INPUT element and Appobj needs to be initialized
            if (isInit) { 
              // !VA set the return value to the value attribute of the checked align element
              if (chld.checked === true) { retVal = chld.value; }
            // !VA Otherwise, if the Appobj property matches the attribute value of the element, check that element
            } else {
              if ( chld.value === option ) {
                chld.checked = true;
              } 
            }
          }
        } else {
          // !VA iptElements is the collection of child INPUT elements of the element with the id ccpUserInput[alias]. Value is the value attribute set in the HTML, which is used as the 'option' string.
          iptElements = document.querySelector(ccpUserInput[radioArray[i]]).getElementsByTagName('INPUT');
          // !VA Loop through the iptElements collection
          for (const el of iptElements) {
            // !VA If isInit is true, then the caller is populateAppobj and Appobj needs to be initialized, so return the value attribute of the element indicated by the alias.
            if (isInit) { 
              if (el.checked === true ) { retVal = el.value; }
            // !VA Otherwise...
            } else  { 
              // !VA If the element ID contains the passed-in 'option' string, then set that element to checked
              if  (el.id.includes(option)) {
                el.checked = true; 
              } 
            }
          }
        }
      }
      return retVal;
    }





    // !VA UIController private
    // !VA Branch: OVERHAUL0901A
    // !VA Resets (i.e. adds the ccp-conceal-ctn class) to the container elements for the CPP option section affected by the CCP control associated with the alias. 
    function revealReset( alias ) {
      let el, mkcssReset = [], defaultArr, defaultReset = [], wraprArr,  wraprReset = [], resetArray;
      // !VA Only log if not init
      // if (alias !== 'default' ) { console.log('revealReset running'); }
       


      // !VA There are three reset element matrices: mkcssReset includes all the Make CSS Button containers. That is obtained by getting the elements with classname 'ccp-mkcss-ctn' - it includes the Make CSS buttons and the curly braces that surround them. defaultReset includes the containers corresponding to the TD Options 'basic' configuration, and wraprReset includes the Wrapper Option elements.
      defaultArr = [ 'ccpImgClassTfd', 'ccpImgAltxtTfd', 'ccpImgLoctnTfd',  'ccpImgAnchrTfd','ccpImgAlignRdo', 'ccpImgExcldRdo', 'ccpImgItypeRdo', 'ccpImgMkcssGrp', 'ccpImgCbhtmBtn', 'ccpTdaClassTfd', 'ccpTdaBgclrTfd', 'ccpTdaAlignRdo', 'ccpTdaValgnRdo', 'ccpTdaPdtopTfd', 'ccpTdaPdrgtTfd', 'ccpTdaPdbtmTfd', 'ccpTdaPdlftTfd', 'ccpTdaOptnsRdo', 'ccpTdaBasicPar', 'ccpTdaIswapPar', 'ccpTdaSwtchPar', 'ccpTdaBgimgPar', 'ccpTdaVmlbtPar', 'ccpTdaCbhtmBtn', 'ccpTblAlignRdo', 'ccpTblClassTfd', 'ccpTblWidthTfd', 'ccpTblMaxwdTfd', 'ccpTblBgclrTfd', 'ccpTblGhostChk', 'ccpTblWraprChk', 'ccpTblHybrdChk', 'ccpTblMsdpiChk', 'ccpTblCbhtmBtn' ];
      wraprArr = ['ccpTbwAlignRdo', 'ccpTbwClassTfd', 'ccpTbwWidthTfd', 'ccpTbwMaxwdTfd', 'ccpTbwBgclrTfd', 'ccpTbwGhostChk', 'ccpTbwMsdpiChk', ];


      // !VA Array of Make CSS buttons to reset
      for (const el of document.getElementsByClassName('ccp-mkcss-ctn')) {
        mkcssReset.push(el);
      }
      // !VA Array of default elements to reset
      for (const alias of defaultArr) {
        el = document.querySelector(ccpUserInput[alias]);
        defaultReset.push(el);
      }
      // !VA Array of Table Wrapper elements to reset
      for (const alias of wraprArr) {
        el = document.querySelector(ccpUserInput[alias]);
        wraprReset.push(el);
      }


      switch(true) {
      case alias === 'default':
        // !VA For init, revea; the default configuration
      // !VA Conceal all elements to reset them
        // console.log('default reset running');
        for (const el of document.getElementsByClassName('ccp-ctn')) {
          el.classList.add('ccp-conceal-ctn');
        }
        resetArray = defaultReset;
        for (const el of resetArray) {
          el.classList.add('ccp-conceal-ctn');
          el.classList.remove('ccp-conceal-ctn');
        }
        break;
      case alias === 'ccpImgExcldRdo':
        resetArray =  [ 'ccpImgClassTfd', 'ccpImgAltxtTfd', 'ccpImgLoctnTfd', 'ccpImgAnchrTfd', 'ccpImgAlignRdo', 'ccpImgItypeRdo', 'ccpTdaOptnsRdo', 'ccpTdaWidthTfd', 'ccpTdaHeigtTfd', 'ccpImgCbhtmBtn'  ];
        for (const alias of resetArray ) {
          el = document.querySelector(ccpUserInput[alias]);
          el.classList.add('ccp-conceal-ctn');
        }
        break;
      case alias === 'ccpTblWraprChk':
        // !VA For init, reveal the default configuration
        resetArray = wraprReset;
        break;
      case alias === 'ccpTblHybrdChk':
        // !VA For init, reveal the default configuration
        resetArray = wraprReset;
        break;
      default:
        console.log('revealReset: case not handled');
        // !VA Reveal the table wrapper config

        console.log('revealReset: condition not handled');
      } 
    }





    // !VA UIController private  
    // !VA Branch: OVERHAUL0827B
    // !VA Reveal and conceal CCP parent containers with sequential animation. flag specifies if the reveal class cpp-hide-ctn is to be added or removed: true = add, false = remove. aliasArray is the array of elements to reveal/conceal. Called from UIController.configCCP. 
    // !VA Note: The only reason so far that this exists is to target the CSS Make buttons via their parent element. They can't be targeted directly because they're not in the ccpElementInput object and it would complicate things unduly to add them to that object when they're already in their own alias object.
    // !VA Note: the setTimeout loop could probably be done better with a for-in on the chldrn collection, but this works fine.
    function revealParent( flag, aliasArray) {
      let chldrn;
      // !VA revealChildren isThe function that will be run sequentially with a 50ms delay
      function revealChildren(chldrn) {
        // !VA Iterate through the child element array of the current aliasArray item
        for (var i = 0; i < chldrn.length; i++) {
          // !VA Pause between each iteration 
          (function (i) {
            setTimeout(function () {
              // !VA If flag is false, remove the class
              if (!flag) {
                chldrn[i].classList.remove('ccp-conceal-ctn');
              // !VA If flag is true, add the class
              } else if (flag) {
                chldrn[i].classList.add('ccp-conceal-ctn');
              } else {
              // !VA If the action isn't recognized, log an error
                console.log('ERROR in revealParent - unknown action');
              }
            // !VA Pause 25 milliseconds between iterations
            }, 25 * i);
          })(i);
        }
      }
      // !VA Loop through the passed-in aliasArray and for each array item:
      for (let i = 0; i < aliasArray.length; i++) {
        // !VA Get collection of child elements of the element corresponding to the current alias
        chldrn = document.querySelector(ccpUserInput[aliasArray[i]]).children;
        // console.log('chldrn is: ');
        // console.log(chldrn);
        // !VA Run the callback function with the chldrn collection as parameter. This runs revealChildren to reveal/conceal each of the child elements in the collection.
        revealChildren(chldrn);
      }
    }

    // !VA UIController private  
    // !VA Reveal and conceal individual CCP container elements with sequential animation. flag specifies if the reveal class cpp-hide-ctn is to be added or removed: true = add, false = remove. aliasArray is the array of elements to reveal/conceal. Called from UIController.configCCP. 
    function revealElements( flag, aliasArray) {
      let el,  elArray = [];
      // !VA Create the array of elements to reveal/conceal. 
      for (let i = 0; i < aliasArray.length; i++) {
        el = document.querySelector(ccpUserInput[aliasArray[i]]);
        elArray.push(el);
      }
      // !VA revealElements isThe function that will be run sequentially with a 50ms delay
      function revealCcpElements(elArray) {
        // !VA Iterate through the child element array of the current aliasArray item
        for (var i = 0; i < elArray.length; i++) {
          // !VA Pause between each iteration 
          (function (i) {
            setTimeout(function () {
              // !VA If flag is false, remove the class
              if (!flag) {
                elArray[i].classList.remove('ccp-conceal-ctn');
              // !VA If flag is true, add the class
              } else if (flag) {
                // console.log('chldrn[i] is: ' + chldrn[i]);
                elArray[i].classList.add('ccp-conceal-ctn');
              } else {
              // !VA If the action isn't recognized, log an error
                console.log('ERROR in revealParent - unknown action');
              }
            // !VA Pause 25 milliseconds between iterations
            }, 25 * i);
          })(i);
        }
      }
      // !VA Loop through the passed-in aliasArray and for each array item:
      for (let i = 0; i < aliasArray.length; i++) {
        // !VA Run the callback function with the elArray array as parameter. This runs revealElements to reveal/conceal each of the array elements.
        revealCcpElements(elArray);
      }
    }
    // !VA UIController private

    // !VA UIController private. Resets the disabled attribute or ccp-disable-ctn class based on the alias of the elements whose selection triggers the disabling. Currently, the only parameter passed is 'default' and the alias parameter isn't accessed. This function actually loops through all the ccp-ctn elements in the document and resets the disable state/class for them. There's probably a better way to do this - that is a lot of elements to loop through to only catch a few of them.
    function disableReset( alias ) {
      // console.log('disableReset running');
      // console.log('alias is: ' + alias); 
      let disableArray;
      document.querySelector('#ccp-tbl-wrapr-ipt').disabled = false;
      document.querySelector('#ccp-tbl-wrapr-lbl').classList.remove('ccp-disable-lbl');

      disableArray = document.getElementsByClassName('ccp-ctn');
      // !VA Loop through all the aliases in disableArray
      for (const el of disableArray) {
        // !VA When the target element is selected, the flag for each alias element in disableArray is set to true. When the target element is deselected, the flag is set to false.
        // !VA If the element is a text input field but NOT a padding input field (because padding input fields have no icon/label)
        if ( el.id.includes('tfd') && !el.id.includes('pd')) {
          el.children[0].disabled = false;
          el.children[0].style.color = '#FFFFFF';
          el.children[0].style.fontStyle = 'normal';
          el.children[1].classList.remove('ccp-disable-lbl');
        // !VA If the element is an align radio group...
        } else if (el.id.includes('rdo') && el.classList.contains('ccp-align-ctn')) {
          // !VA Loop through the child elements of the -rdo element
          for (const chld of el.children) {
            // !VA If the child element is an INPUT element, disable/enable it.
            if (chld.tagName === 'INPUT') {
              chld.disabled = false ;
            // !VA If the child element is a LABEL element, add/remove the ccp-disable-lbl class to gray/ungray the icon.
            } else if (chld.tagName === 'LABEL') {
              chld.classList.remove('ccp-disable-lbl') ;
            }
          }
        } else if ( el.id.includes('chk')) {
          // console.log('disableReset el.id is: ' + el.id);
          el.children[0].disabled = false;
          el.children[1].classList.remove('ccp-disable-lbl');
        } 
      } 
    }

    // !VA UIController private
    // !VA Toggles the disable/enable states of elements in the disabledArray based on their tfd, rdo or chk element type code. 
    function disableElements(  flag, disableArray ) {
      let el;
      // !VA Loop through all the aliases in disableArray

      for (const alias of disableArray) {
        el = document.querySelector(ccpUserInput[alias]);
        // !VA When the target element is selected, the flag for each alias element in disableArray is set to true. When the target element is deselected, the flag is set to false.
        // !VA If the element is a text input field...
        if ( el.id.includes('tfd')) {
          if ( flag ) {
            el.children[0].disabled = true;
            el.children[0].style.color = '#959595';
            el.children[0].style.fontStyle = 'italic';
            el.children[1].classList.add('ccp-disable-lbl');
          } else {
            // !VA When the target element is deselected, the flag for each alias element in disableArray is set to false
            el.children[0].disabled = false;
            el.children[0].style.color = '#FFFFFF';
            el.children[0].style.fontStyle = 'normal';
            el.children[1].classList.remove('ccp-disable-lbl');
          }
        // !VA If the element is an align radio group...
        } else if (el.id.includes('rdo') && el.classList.contains('ccp-align-ctn')) {
          
          // !VA Loop through the child elements of the -rdo element
          for (const chld of el.children) {
            // !VA If the child element is an INPUT element, disable/enable it.
            if (chld.tagName === 'INPUT') {
              flag ? chld.disabled = true : chld.disabled = false ;
            // !VA If the child element is a LABEL element, add/remove the ccp-disable-lbl class to gray/ungray the icon.
            } else if (chld.tagName === 'LABEL') {
              flag ? chld.classList.add('ccp-disable-lbl') : chld.classList.remove('ccp-disable-lbl') ;
            }
          }
        } else if ( el.id.includes('chk')) {
          // console.log('el.children[1].tagName is: ' + el.children[1].tagName);
          flag ? el.children[0].disabled = true : el.children[0].disabled = false;
          // debugger;
          flag ? el.children[1].classList.add('ccp-disable-lbl') : el.children[1].classList.remove('ccp-disable-lbl');
        } else {
          console.log('el is: ' + el);
          console.log('ERROR in disableElements - unknown element type');
        }
      } 
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
        return dynamicElements;
      },
      getStaticRegionIDs: function() {
        return staticContainers;
      },
      getCcpUserInputIDs: function() {
        return ccpUserInput;
      },
      getCcpUserInputLabelIds: function() {
        return ccpUserInputLabels;
      },
      getiptCcpMakeClips: function() {
        return iptCcpMakeClips;
      },
      getAppMessageElements: function() {
        return appMessageElements;
      },


      // !VA UIController public
      // !VA Called from init(). Set dev mode options: Display toolbar, curImg, filename, display/undisplay CCP. Then initialize the UI: get localStorage and show dynamic containers and toolbar.
      initUI: function(initMode) {

        const delayInMilliseconds = 500;
        // !VA Here we initialize DEV mode, i.e. reading a hardcoded image from the HTML file instead of loading one manually in production mode
        if (initMode === 'devmode') {
          // !VA Set a timeout to give the image time to load
          setTimeout(function() {
            // !VA Show the toolbar and curImg region
            // !VA TODO: Make function
            document.querySelector(staticContainers.tbrContainer).style.display = 'block';
            document.querySelector(dynamicElements.curImg).style.display = 'block';
            // !VA  Get the insFilename of the devImg in the HTML. This is the only time we'll have an actual source file -- in user mode all the images are blobs -- so we can do this as a one-off.
            var fname = document.querySelector(dynamicElements.curImg).src;
            fname = fname.split('/');
            fname = fname[fname.length - 1];
            // !VA For devmode, we need to write fname to the DOM now and then add it to Appobj at the top of writeInspectors. 
            document.querySelector(inspectorElements.insFilename).textContent = fname;
            // !VA Initialze calcViewerSize to size the image to the app container areas
            // !VA The true flag indicates that this is an image initialization action, not a user-initiated Toolbar input
            appController.initCalcViewerSize();

            // !VA Open the CCP by default in dev mode 
            // !VA First, set it to how you want to start it. devmodeccp
            document.querySelector(staticContainers.ccpContainer).classList.add('active');
            document.querySelector('#btn-toggle-ccp').classList.add('active');
            // !VA The return variable isn't used, but keeping it for reference
            // var ccpState = UIController.toggleCcp();
            // !VA NOW: The toggle Ccp element functions are all in appController either I have to replicated them here or find another solution or live with the fact that they don't initialize. Or run initUI from here...

          }, delayInMilliseconds);
        }
        // !VA The rest of the routine applies to DEV and PROD modes
        // !VA Initialize the input fields for the pertinent device widths: imgViewerW, sPhonesW and lPhonesW. Also initialize the data attributes for sphonesw and lphonesw - we only want to access the localStorage once and the rest we do using data-attributes
        let arr = [], curDeviceWidths = [];
        // !VA Clear localStorage for testing only.
        // localStorage.clear();
        // !VA If localStorage is set for imgViewerW, sPhonesW or lgPhones, add the localStorage value to curDeviceWidths, otherwise set the defaults used when the app is used for the first time or no user-values are entered.
        arr = [ 'imgViewerW', 'sPhonesW', 'lPhonesW' ];
        // !VA If there's localStorage, push it to the curDeviceWidths array. Otherwise, push false.
        for (let i = 0; i < arr.length; i++) {
          // !VA Branch: review0720A (071320)
          // !VA This should call getLocalStorage making individual calls to localStorage.getItem.
          localStorage.getItem(arr[i]) ? curDeviceWidths.push(localStorage.getItem(arr[i])) : curDeviceWidths.push(false);
        }
        // !VA TODO: Shouldn't all localStorage operations be in one place?
        // !VA If there's a localStorage for imgViewerW, put that value into the imgViewerW field of the toolbar, otherwise use the default. NOTE: The default is set ONLY in the HTML element's placeholder. The advantage of this is that we can get it anytime without having to set a global variable or localStorage for the default.
        curDeviceWidths[0] ?  document.querySelector(toolbarElements.iptTbrImgViewerW).value = curDeviceWidths[0] : document.querySelector(toolbarElements.iptTbrImgViewerW).value = document.querySelector(toolbarElements.iptTbrImgViewerW).placeholder;
        // !VA If there's a localStorage for sPhonesW, get it, otherwise set the default to the placeholder in the HTML element on index.html. Then set the toolbar input field AND the sphonesw data attribute to this value. NOTE: The default is set ONLY in the HTML element's placeholder!
        curDeviceWidths[1] ? curDeviceWidths[1] : curDeviceWidths[1] = document.querySelector(toolbarElements.iptTbrSPhonesW).placeholder;
        document.querySelector(toolbarElements.iptTbrSPhonesW).value = curDeviceWidths[1];
        document.querySelector(toolbarElements.iptTbrSPhonesW).setAttribute('data-sphonesw', curDeviceWidths[1]);
        // !VA If there's a localStorage for lPhonesW, get it, otherwise set the default to the placeholdere in the HTML element in index.html. Then set the toolbar input field AND the lphonesw data attribute to this value. NOTE: The default is set ONLY in the HTML element's placeholder!
        curDeviceWidths[2] ? curDeviceWidths[2] : curDeviceWidths[2] = document.querySelector(toolbarElements.iptTbrLPhonesW).placeholder;
        document.querySelector(toolbarElements.iptTbrLPhonesW).value = curDeviceWidths[2];
        document.querySelector(toolbarElements.iptTbrLPhonesW).setAttribute('data-lphonesw', curDeviceWidths[2]);

        // !VA Make sure the tbrContainer is off and the dropArea is on.
        // !VA TODO: Make function
        document.querySelector(staticContainers.dropArea).style.display = 'flex';
        document.querySelector(staticContainers.tbrContainer).style.display = 'none';
        document.querySelector(inspectorElements.btnToggleCcp).style.display = 'none';

      },


      // !VA UIController public
      // !VA  This is where the DOM write in evalToolbarInputs and updateAppObj used to happen
      // !VA Called from resizeContainers. Write dimensions of dynamicElements.curImg, dynamicElements.imgViewer and the height of dynamicElements.imgViewport and dynamicElements.appContainer. Width of dynamicElements.imgViewport and dynamicElements.appContainer is static and is sized to the actual application area width.
      writedynamicElementsDOM: function(Appobj, viewportH, appH) {

        // !VA TODO: Make function
        document.querySelector(dynamicElements.imgViewer).style.width = Appobj.imgViewerW + 'px';
        document.querySelector(dynamicElements.curImg).style.width = Appobj.curImgW + 'px';
        document.querySelector(dynamicElements.curImg).style.height = Appobj.curImgH + 'px';
        document.querySelector(dynamicElements.imgViewer).style.height = Appobj.imgViewerH + 'px';
        document.querySelector(dynamicElements.imgViewport).style.height = viewportH + 'px';
        document.querySelector(dynamicElements.appContainer).style.height = appH + 'px';
        
      }, 

      // !VA UIController public
      // !VA Branch: OVERHAUL0903A
      // !VA Implement configuration settings/options for CCP UI DOM elements. This is basically a public router to private UIController functions to catch cross-module calls, whereby all arguments are passed in a single multidimensional configObj object.
      configCCP: function (configObj) {
        let retVal;
        // !VA 
        if ( configObj.reflectAppobj ) {
          reflectAppobj( configObj.reflectAppobj.reflect );
        }
        if ( configObj.revealReset) {
          revealReset( configObj.revealReset.alias );
        }
        if ( configObj.revealElements ) {
          revealElements( configObj.revealElements.flag, configObj.revealElements.reveal );
        }
        if ( configObj.concealElements ) {
          revealElements( configObj.concealElements.flag, configObj.concealElements.conceal );
        }
        if ( configObj.radioState ) {
          radioState( configObj.radioState.radio );
        }
        if ( configObj.checkboxState ) {
          checkboxState( configObj.checkboxState.checked );
        }
        if ( configObj.revealParent ) {
          retVal = revealParent( configObj.revealParent.flag, configObj.revealParent.reveal );
        }
        if ( configObj.disableReset) {
          disableReset( configObj.disableReset.alias );
        }
        if ( configObj.disableElements ) {
          disableElements( configObj.disableElements.flag, configObj.disableElements.disable );
        }

        return retVal;
      },

      // !VA UIController public
      // !VA Stash arrays of key/value pairs.
      // !VA TODO: This is not yet implemented and may never be, but leaving it here for now.
      stashAppobjProperties: function(flag, ...args) {
        for (let i = 0; i < args.length; i++) {
          document.querySelector(args[i][0]).placeholder = args[i][1];
        }
      },

      // !VA UIController public
      // !VA Takes one of three parameters: 'app', 'ccp' and 'all'. Called from calcViewerSize and initCcp. When called from calcViewerSize, the isUpdate condition determines whether populateAppobj is run - if isUpdate is not true, then there are no existing Appobj values for dynamicElements, so populateAppobj with the app parameter initializes Appobj values by running populateAppProperties. When the CCP is opened, populateAppobj reads CCP DOM values into Appobj so that Appobj always reflects the current state of the CCP DOM when the CCP is opened. 
      populateAppobj: function (Appobj, access) {
        // !VA IIFE for populating 
        // let Appobj = {};
        // !VA cStyles is deprecated because we're using literal values instead of getting the computed CSS values stored in CSS, but keeping for reference. Using localStorage now, so don't need to get hard values from CSS.
        // let curImg, imgViewer, cStyles;
        let curImg, curLocalStorage;
        // !VA Get the values for the dynamicElements
        // !VA Get the curImg and imgViewer

        // !VA TODO: Move to external if appropriate or delete if unneeded 
        // !VA Branch: OVERHAUL0825B
        function populateAppProperties(Appobj) {
          // !VA Get the current image
          curImg = document.querySelector(dynamicElements.curImg);
          // !VA Set the imgViewerW value based on localStorage  If the user has set this value in the toolbar before, then queried from localStorage. That value persists between sessions. If this is the initial use of the app, then imgViewerW is explitly set to 650. 
          curLocalStorage = appController.getLocalStorage();
          if (curLocalStorage[0]) {
            // !VA Set Appobj.imgViewerW to the localStorage value
            // !VA TODO: See why localStorage is stored as string - it's requiring us to convert to integer here.
            Appobj.imgViewerW = parseInt(curLocalStorage[0]); 
          } else {
            // !VA If no localStorage for imgViewerW exists, use this default
            // !VA NOTE: Isn't this supposed to be set in the placeholder value toolbarElements.iptTbrViewerW?
            Appobj.imgViewerW = 650;
          }

          // !VA Get the dimensions of curImg and write them to Appobj
          Appobj.curImgW = curImg.width;
          Appobj.curImgH = curImg.height;
          Appobj.curImgNW = curImg.naturalWidth;
          Appobj.curImgNH = curImg.naturalHeight;

          
          // !VA Get the Appobj properties for iptTbrSmallPhonesW and sPhonesH
          // !VA TODO: The default here is still coming from the data- attribute. It should be either the default, which comes from the placeholder in the HTML DOM element, or from localStorage. This needs to be addressed - there's no need to get the default from the data attribute, and I'm It appears the default is coming from the placeholder now rather than the data attribute - so there's probably no point in writing data attributes at all. Get rid of it completely in the next implementation. It appears here that Appobj.sPhonesW still accesses the data-attribute when it should be accessing the placeholder. This is actually a problem in initUI: there the imgViewerW, sPhoneW and lPhoneW values are writting from localStorage of from the placeholder default to the data-... attributes, which is not necessary. Data attributes were only used because I didn't have a localStorage solution, but now that I do, the data-... attributes are unnecessary. They all need to be deprecated. For later...
          Appobj.sPhonesW = parseInt(document.querySelector(toolbarElements.iptTbrSPhonesW).getAttribute('data-sphonesw'), 10);
          Appobj.lPhonesW = parseInt(document.querySelector(toolbarElements.iptTbrLPhonesW).getAttribute('data-lphonesw'), 10);
          Appobj.sPhonesW ? Appobj.sPhonesW : Appobj.sPhonesW = parseInt(document.querySelector(toolbarElements.iptTbrSPhonesW).placeholder, 10);
          Appobj.lPhonesW ? Appobj.lPhonesW : Appobj.lPhonesW = parseInt(document.querySelector(toolbarElements.iptTbrLPhonesW).placeholder, 10);
          // !VA Now compute the rest of Appobj
          // !VA TODO: Determine the final location of getAspectRatio - it is now duplicated here and in appController.
          Appobj.aspect = getAspectRatio(Appobj.curImgNW,  Appobj.curImgNH);
          Appobj.sPhonesH = Math.round(Appobj.sPhonesW * (1 / Appobj.aspect[0]));
          Appobj.lPhonesH = Math.round(Appobj.lPhonesW * (1 / Appobj.aspect[0]));

        }
        function populateCcpProperties(Appobj) {
          // !VA Now initialize Appobj with the CCP element values. This includes ALL CCP elements, including those that are displayed/undisplayed depending on which TDOption or imgType radio is selected. 
          // !VA Don't forget to use bracket notation to add properties to an object: https://stackoverflow.com/questions/1184123/is-it-possible-to-add-dynamically-named-properties-to-javascript-object
          // !VA  for loop: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
          // !VA Branch: OVERHAUL0904A
          // !VA Convert this to Object.keys - ccpUserInput properties aren't used here.
          // !VA Loop through all the ccpUserInput elements and add their values to Appobj. The last three characters ( 11 - last ) are the alias code that identify the input type
          // !VA Branch: OVERHAUL0828C
          // !VA  radioState and checkboxState are called here before Appobj has been initialized, so the key argument is 'undefined'. This causes checkboxState and radioState to return the attribute value of the queried element as hard-coded in the HTML, thus initializing Appobj. 


          for (const [key, value] of Object.entries(ccpUserInput)) {
            // !VA Write the text input element values to Appobj
            if (key.substring( 11 ) === 'Tfd') {
              // !VA Branch: OVERHAUL0904A
              // !VA Appobj[ key ] is undefined, causing reflectAppobj to return the hard-coded values in the HTML file. These are the Appobj initialization values. These values are currently all empty strings but that could change so the best place to get them is value attribute of the the HTML file, just like the other Appobj init functions below.
              // !VA Branch: 0914B
              // !VA This is not what's happening at all. reflectAppobj isn't returning the HTML default, it's returning whatever happens to be in the input field at the time, so it's actually resetting nothing. The reset has to happen in configDefault. This should be reviewed - seems like it might be a waste or need to be rethought. One option is to first clear existing values, then get the value. That would leave us with the HTML presets. In the meantime, all the presets are in configDefault. 
              Appobj[ key ] = reflectAppobj( [ key ] );
              // console.log('key is: ' + key);
              // console.log('Appobj[key] is: ' + Appobj[key]);
              // console.log('reflectAppobj( [ key ] is: ' + reflectAppobj( [ key ])); 

            }
            // !VA Write the Align/Valgn radio input element values to Appobj.
            if (key.substring( 11 ).includes('Rdo')) {
              // !VA Branch: OVERHAUL0904A
              // !VA Appobj[ key ] is undefined, causing radioState to return the hard-coded values in the HTML file. These are the Appobj initialization values. 
              Appobj[ key ] = radioState( [ key ]);
            }
            if ( key.substring( 11 ).includes('Chk')) {

              // !VA Branch: OVERHAUL0904A
              // !VA Appobj[ key ] is undefined, causing checkboxState to return the hard-coded values in the HTML file. These are the Appobj initialization values. 
              Appobj[ key ] = checkboxState( [ key ] );
            }
          }
          
          console.log('populateCcpPropertiesAppobj is: ');
          console.log(Appobj); 
   
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
        } else {
          console.log('Error in populateAppobj: unknown argument - access');
        }
      },


      // !VA UIController public
      // !VA The toggle argument is a boolean flag to indicate whether to actually toggle the CCP on and off or just to return the state. Don't forget that Appobj doesn't exist here, so don't try to log it. True means toggle it, false means just return the state
      toggleCcp: function(toggle) {
        // !VA NOTE: All this does now is toggle the CCP on and off or return the toggle state
        let ccpState;
        // !VA If the toggle argument is true, toggle the CCP on and off
        if (toggle) {
          document.querySelector(staticContainers.ccpContainer).classList.toggle('active');
          // !VA Branch: OVERHAUL0825B
          // !VA Adding the clipboard button active class to this - it should have an alias 
          document.querySelector('#btn-toggle-ccp').classList.toggle('active');
        }
        // !VA If the CCP is displayed, return true, otherwise false
        document.querySelector(staticContainers.ccpContainer).classList.contains('active') ? ccpState = true : ccpState = false;
        return ccpState;
      },

      // !VA UIController public
      // !VA Pass-thru public function to pass display actions to the UIController. If isShow is true, call showAppMessages. If it's false, call hideAppMessages. 
      displayAppMessages: function (isShow, appMessContainerId, tooltipTarget) {
        isShow ? showAppMessages(appMessContainerId, tooltipTarget) : hideAppMessages(appMessContainerId, tooltipTarget);
      },


      // !VA UIController public
      // !VA Hide  the default 'No Image' value displayed when the app is opened with no image and display the Inspector values for the current image, show the Clipboard button and call evalInspectorAlerts to determine which Inspector labels should get dimension alerts (red font applied). 
      writeInspectors: function(Appobj) {

        // !VA IMPORTANT - this is a devmode hack. The fileName has already been written to inspectorElements.insFilename in initUI devmode. So now we have to write it to Appobj, otherwise it will be undefined it gets written to the innerHTML below. This should probably be dependent on whether we're in devmode or not, but this works in any case and can be deleted for production. 
        Appobj.fileName = document.querySelector(inspectorElements.insFilename).textContent;


        // !VA Hide the dropArea
        // !VA TODO: Make function
        document.querySelector(staticContainers.dropArea).style.display = 'none';
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

        // !VA NOTE: This can all be moved to a UIController public function like handleCcpActions
        // !VA Display the respective Appobj value in the respective inspector element 
        // !VA TODO: DRYify this.
        document.querySelector(inspectorValues.insDisplaySizeWidthValue).innerHTML = Appobj.curImgW;
        document.querySelector(inspectorValues.insDisplaySizeHeightValue).innerHTML = Appobj.curImgH;
        document.querySelector(inspectorValues.insDiskSizeWidthValue).innerHTML = Appobj.curImgNW;
        document.querySelector(inspectorValues.insDiskSizeHeightValue).innerHTML = Appobj.curImgNH;
        document.querySelector(inspectorValues.insSmallPhonesWidthValue).innerHTML = Appobj.sPhonesW;
        document.querySelector(inspectorValues.insSmallPhonesHeightValue).innerHTML = Appobj.sPhonesH;
        document.querySelector(inspectorValues.insLargePhonesWidthValue).innerHTML = Appobj.lPhonesW;
        document.querySelector(inspectorValues.insLargePhonesHeightValue).innerHTML = Appobj.lPhonesH;
        document.querySelector(inspectorValues.insAspectValue).innerHTML = Appobj.aspect[1];
        document.querySelector(inspectorValues.insRetinaWidthValue).innerHTML = (Appobj.curImgW * 2);
        document.querySelector(inspectorValues.insRetinaHeightValue).innerHTML = (Appobj.curImgH * 2);
        // // !VA  Display the clipboard button
        document.querySelector(inspectorElements.btnToggleCcp).style.display = 'block';
        // !VA Call evalInspectorAlerts with the Appobj argument to calculate which Inspector values don't meet HTML email specs.
        evalInspectorAlerts(Appobj);
      },

      //UIController public
      // !VA Displays flaggedInspectors in red font 
      writeInspectorAlerts: function(flaggedInspectors) {
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

    // !VA CBController    functions
    // !VA NOTE: If we want to access any of the DOM IDs we have to call them from UIController where they're defined.
    var inspectorElements = UIController.getInspectorElementIDs();
    var ccpUserInput = UIController.getCcpUserInputIDs();
    var iptCcpMakeClips = UIController.getiptCcpMakeClips();

    // !VA ATTRIBUTE FUNCTIONS
    // !VA CBController   
    // !VA NOTE: All these attributes are set here prior to building the individual nodes. It is first called in buildOutputNodeList, and is passed to each make node function in succesion after that. So, it would make sense that getAttributes includes ALL the logic for rendering each attribute before it is passed to the respective make node function. 
    // !VA Branch: 0918A
    // !VA This could be DRYified, since most of the Attributes return the Appobj property value. 
    function getAttributes() {
      var Appobj = {};
      // !VA Branch: implementCcpInput02 (062420)
      // !VA We don't need the entire Appobj here. What we should do is call rest parameters on what we need and then destructure the return array into separate variables. This needs to be done when getAttributes is reevaluated since there appears to be a lot of unnecessary DOM access here. But I don't know if it's faster to get all of Appobj or just target a specific Appobj property -- for later.
      Appobj = appController.getAppobj();
      let str, appObjProp, imgType, pdngWidth, Attributes, retObj;
      // !VA Create the array to return. First value is the id of the CCP element, second value is the string to write to the CCP element. If the first value is false, then the str isn't queried from a Ccp element, but rather is generated in the Attribute based on other conditions. For instance, the img style attribute is conditioned on the fluid/fixed option, but writes to the style attribute of the img tag.
      function returnObject(appObjProp, str ) {
        let obj = {};
        obj.id = appObjProp;
        obj.str = str;
        return obj;
      }
      // !VA Return the defined Attributes based on the Appobj property alias.
      Attributes = {
        imgClass: (function() {
          appObjProp = 'ccpImgClassTfd';
          Appobj['ccpImgItypeRdo'] === 'fixed' ? str = Appobj[appObjProp] : str = 'img-fluid';
          retObj = returnObject(appObjProp, str);
          return retObj;
        })(),
        imgWidth: (function() {
          appObjProp = 'curImgW';
          str = Appobj[appObjProp];
          retObj = returnObject(appObjProp, str);
          return retObj;
        })(),
        imgHeight: (function() {
          appObjProp = 'curImgH';
          str = Appobj[appObjProp];
          retObj = returnObject(appObjProp, str);
          return retObj;
        })(),
        imgAlt: (function() {
          appObjProp = 'ccpImgAltxtTfd';
          str = Appobj[appObjProp];
          retObj = returnObject(appObjProp, str);
          return retObj;
        })(),
        imgSrc: (function() {
          // !VA This value is get-only
          appObjProp = 'ccpImgLoctnTfd';
          // !VA Branch: implementCcpInput06 (062820)
          // !VA If the path input element is not empty, include Appobj.ccpImgLoctnTfd, otherwise just use the filename without the path
          Appobj.ccpImgLoctnTfd !== '' ? str = Appobj.ccpImgLoctnTfd  + Appobj.fileName : str = Appobj.fileName;
          retObj = returnObject( appObjProp, str);
          return retObj;
        })(),
        // !VA Branch: 0909A
        // !VA Deprecating...
        // imgExcld: (function() {
        //   appObjProp = 'ccpImgExcldRdo';
        //   selectedOption = Appobj[appObjProp];
        // })(),
        imgStyle: (function() {
          // !VA Branch: implementCcpInput06 (062820)
          // !VA Set imgType according to radio button selection. This determines the style attribute that is output to the Clipboard. All the other imgType logic is in appController.
          // !VA Branch: OVERHAUL0826A
          // !VA This works now, but I'm not sure H and W attributes are supposed to be inluded in HTML for fluid option
          appObjProp = 'ccpImgItypeTfd';
          Appobj.ccpImgItypeRdo === 'fixed' ? imgType = 'fixed' : imgType = 'fluid';
          imgType === 'fixed' ? str = `display: block; width: ${Appobj.curImgW}px; height: ${Appobj.curImgH}px; font-family: Arial, sans-serif; font-size: 16px; line-height: 15px; text-decoration: none; border: none; outline: none;` : str = 'display: block; font-family: Arial, sans-serif; font-size: 16px; line-height: 15px; text-decoration: none; border: none; outline: none;';
          retObj = returnObject(appObjProp , str);
          return retObj;
        })(),
        imgAlign: (function() {  
          appObjProp = 'ccpImgAlignRdo';
          str = Appobj[appObjProp];
          retObj = returnObject(appObjProp, str);
          return retObj;
        })(),
        imgAnchor: (function() {
          appObjProp = 'ccpImgAnchrTfd';
          str = Appobj[appObjProp];
          retObj = returnObject( appObjProp, str );
          return retObj;
        })(),
        // !VA Branch: 0909A
        imgAnchorTxtclr: (function() {
          appObjProp = 'ccpImgTxclrTfd';
          str = Appobj[appObjProp];
          retObj = returnObject( appObjProp, str );
          return retObj;
        })(),
        // !VA Branch: 0909A
        imgAnchorTargt: (function() {
          appObjProp = 'ccpImgTargtChk';
          str = Appobj[appObjProp];
          retObj = returnObject(appObjProp , str);
          return retObj;
        })(),
        // !VA TD Attributes
        // !VA Branch: implementCcpInput06 (062820)
        // !VA Why can't I just access Appobj directly in getBgimageBlock?
        // !VA TD Width and height from Appobj = curImgW and curImgW -- only used for Stig's BG image
        tdAppobjWidth: (function() {
          // !VA Branch: OVERHAUL0826A
          // !VA There is no Appobj property or alias for this, so why can't I just access Appobj directly in getBgimageBlock?
          // !VA Branch: OVERHAUL0827A
          // !VA Setting retObj here to false because there's no appObjProp for this, pending check attempt to set this directly in getBgimgBlock
          retObj = returnObject( false, Appobj.curImgW );
          return retObj;
        })(),
        tdAppobjHeight: (function() {
          // !VA Branch: OVERHAUL0826A
          // !VA There is no Appobj property or alias for this, so why can't I just access Appobj directly in getBgimageBlock?
          // !VA Setting retObj here to false because there's no appObjProp for this, pending check attempt to set this directly in getBgimgBlock
          retObj = returnObject( false, Appobj.curImgH );
          return retObj;
        })(),
        tdHeight: (function() {
          appObjProp = 'ccpTdaHeigtTfd';
          str = Appobj[appObjProp];
          retObj = returnObject(appObjProp, str);
          return retObj;
        })(),
        tdWidth: (function() {
          appObjProp = 'ccpTdaWidthTfd';
          str = Appobj[appObjProp];
          retObj = returnObject(appObjProp, str);
          return retObj;
        })(),

        // !VA Branch: OVERHAUL0826A
        // !VA STOPPED HERE>
        // !VA Branch: OVERHAUL0826A
        // !VA Implement later...
        tdOptions: (function() {
          appObjProp = 'ccpTdaOptnsRdo';
          // !VA Branch: 0918A
          // !VA I don't know what the below comment means. I think all the displaying/undisplaying is now done with configCcp, so this is no longer pertinent. Deprecating...
          // !VA  If the imgswap radio is selected, overwrite whatever is in the imgClass input with 'hide', set parent table class to 'devicewidth' and display it, set wrapper table class to 'devicewidth' and display it. Displaying/undisplaying and disabling/enabling is handled in handleCcpActions. 
          retObj = returnObject(appObjProp, Appobj.ccpTdaOptnsRdo);
          return retObj;
        })(),
        tdAlign: (function() {
          appObjProp = 'ccpTdaAlignRdo';
          str = Appobj[appObjProp];
          retObj = returnObject(appObjProp, str);
          return retObj;
        })(),
        tdValign: (function() {
          appObjProp = 'ccpTdaValgnRdo';
          str = Appobj[appObjProp];
          retObj = returnObject(appObjProp, str);
          return retObj;
        })(),
        tdClass: (function() {
          appObjProp = 'ccpTdaClassTfd';
          str = Appobj[appObjProp];
          retObj = returnObject(appObjProp, str);
          return retObj;
        })(),
        tdBgcolor: (function() {
          appObjProp = 'ccpTdaBgclrTfd';
          str = Appobj[appObjProp];
          retObj = returnObject(appObjProp, str);
          return retObj;
        })(),
        tdBackground: (function() {
          // !VA Branch: 0918A
          // !VA Update this to support tokens
          appObjProp = false;
          // !VA 
          retObj = returnObject( appObjProp, Appobj.ccpImgLoctnTfd + '/' + (Appobj.fileName) );
          return retObj;
        })(),
        tdStyle: (function() {
          // !VA This handles both the padding attribute and the MSDPI option. When the MSDPI option is checked, the width attribute has to be included in BOTH the inner TD and the inner TABLE style property and both of them have to be set to Appobj.curImgW.
          let msdpi, val, pdng, hasPadding;
          // !VA Determine if any of the padding inputs have a value and set a boolean hasPadding
          let arr = [];
          // !VA Make array of the 4 padding aliases
          let aliasArray = ['ccpTdaPdtopTfd', 'ccpTdaPdrgtTfd', 'ccpTdaPdbtmTfd', 'ccpTdaPdlftTfd' ];
          // !VA Loop through the padding aliases
          for (const alias of aliasArray ) {
            // !VA Write the Appobj property value. i.e. the current input value, to val
            val = Appobj[alias];
            // !VA If the input value is '', i.e. empty, then replace the value with 0 for the clipboard output
            // !VA Branch: 101320A
            // !VA Use Number(val) to ensure empty strings are converted to 0
            // if (val === '') { val = 0;}
            val = Number(val);
            // !VA If the value is not 0, then add the units suffix
            if (val !== 0 ) { val = val + 'px'; }
            // !VA Push the value onto an array for further processing
            arr.push(val);
          }
          // !VA Set the hasPadding flag to false
          hasPadding = false;
          // !VA Loop thru array until one of the items is not equal to 0. If that occurs, then the user has entered a value into one of the padding input fields, so set the hasPadding flag to true
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== 0) {
              hasPadding = true;
              break;
            }
          }
          // !VA Create the padding property. Join the array items, separating them with a space. These are the shorthand CSS values for the 4 padding properties. 
          pdng = 'padding: ' + arr.join(' ');
          // !VA Create the width property for the MSDPI option
          msdpi = `width: ${Appobj['ccpTblWidthTfd']}px; `;
          // !VA If the user has entered a percentage value for the TBL width attribute, strip the 'px' units off the value and include the percent char
          msdpi.includes('%')  ? msdpi = msdpi.replace('%px', '%') : msdpi;
          str = msdpi;
          // !VA If TBL Msdip checkbox is checked, set the return string to msdpi
          Appobj['ccpTblMsdpiChk'] ? str = msdpi : str = '';
          // !VA if hasPadding is true, then the user has entered at least one value in the padding input fields, so append str with the pdng property.
          if (hasPadding) { str = str + pdng ;}
          // !VA There is no corrsponding appObj property for this so return false for the first parameter where the alias would normally go. The str parameter includes the msdpi/padding style attribute properties.
          retObj = returnObject( false, str );
          return retObj;
        })(),
        // !VA TABLE attributes
        tableClass: (function() {
          appObjProp = 'ccpTblClassTfd';
          str = Appobj[appObjProp];
          retObj = returnObject(appObjProp, str);
          return retObj;
        })(),
        tableWidth: (function() {
          // !VA Branch: 0918A
          // !VA Updating this to use the alias
          appObjProp = 'ccpTblWidthTfd';
          // !VA Branch: 0918A
          // !VA I am unclear on the dependency between maxwidth and width. If there is a maxwidth, then width has to be a percent value. That's no yet implemented.
          // !VA imgType is fixed or fluid, depending on IMG itype, i.e. TBL width or 100%. 
          // !VA Not sure whether this should be Appobj[appObjProp] or Appobj['curImgW'] - keep an eye on it.
          imgType === 'fixed' ? str = Appobj[appObjProp] : str = '100%';
          retObj = returnObject( appObjProp, str );
          return retObj;
        })(),
        tableBgcolor: (function() {
          appObjProp = 'ccpTblBgclrTfd';
          str = Appobj[appObjProp];
          retObj = returnObject(appObjProp, str);
          return retObj;
        })(),
        tableAlign: (function() {
          appObjProp = 'ccpTblAlignRdo';
          str = Appobj[appObjProp];
          retObj = returnObject( appObjProp, str );
          return retObj;
        })(),
        tableGhost: (function() {
          appObjProp = 'ccpTblGhostChk';
          str = Appobj[appObjProp];
          retObj = returnObject( appObjProp, str );
          return retObj;
        })(),
        tableStyle: (function() {
          appObjProp = false;
          // !VA If the TBL msdpi checkbox is checked, add style attribute with the width property set to the curImgW. To this for TdStyle as well.
          let msdpi, maxwd;
          // !VA Set the msdpi string to the TBL width field value 
          msdpi = `width: ${Appobj['ccpTblWidthTfd']}px; `;
          // !VA If the TBL width field value was a percent, remove the px on the units suffix
          msdpi.includes('%')  ? msdpi = msdpi.replace('%px', '%') : msdpi;
          maxwd = `max-width: ${Appobj['ccpTblMaxwdTfd']}px; `;
          if ( Appobj['ccpTblMsdpiChk']) {
            str = msdpi;
          } 
          if ( Appobj['ccpTblMaxwdTfd']) {
            str = msdpi + maxwd;
          }
          // !VA There is no corrsponding appObj property for this so return false for the first parameter where the alias would normally go
          retObj = returnObject( false, str );
          return retObj;
        })(),
        tdWrapperStyle: (function() {
          // !VA If the TBL msdpi checkbox is checked, add style attribute with the width property set to the curImgW. To this for tableStyle as well and set that to imgViewerW.
          let msdpi;
          msdpi = `width: ${Appobj['ccpTbwWidthTfd']}px; `;
          msdpi.includes('%')  ? msdpi = msdpi.replace('%px', '%') : msdpi;
          str = msdpi;
          // !VA Use an if condition 
          Appobj['ccpTbwMsdpiChk'] ? str = msdpi : str = '';
          // !VA There is no corrsponding appObj property for this so return false for the first parameter where the alias would normally go
          retObj = returnObject( false, str );
          return retObj;
        })(),
        tableWrapperClass: (function() {
          appObjProp = 'ccpTbwClassTfd';
          str = Appobj[appObjProp];
          retObj = returnObject(appObjProp, str);
          return retObj;
        })(),
        tableWrapperAlign: (function() {
          appObjProp = 'ccpTbwAlignRdo';
          str = Appobj[appObjProp];
          retObj = returnObject( appObjProp, str );
          return retObj;
        })(),
        tableWrapperWidth: (function() {
          appObjProp = 'ccpTbwWidthTfd';
          // !VA Branch: 0918A
          // !VA I am unclear on the dependency between maxwidth and width. If there is a maxwidth, then width has to be a percent value. That's no yet implemented.
          // !VA If the imgTyp is fixed, set the wrapper width to the value of the input field, which for the most part will be imgViewerW. If it's fluid, set it to 100%
          imgType === 'fixed' ? str = Appobj[appObjProp] : str = '100%';
          retObj = returnObject( appObjProp, str );
          return retObj;
        })(),
        tableWrapperMaxwd: (function() {
          // !VA This value depends on the selection under Fixed image. 
          // !VA Branch: 0918A
          // !VA I am unclear on the dependency between maxwidth and width. If there is a maxwidth, then width has to be a percent value. That's no yet implemented.
          appObjProp = 'ccpTbwMaxwdTfd';
          str = Appobj[appObjProp];
          retObj = returnObject(appObjProp, str);
          return retObj;
        })(),
        tableWrapperBgcolor: (function() {
          // !VA This value depends on the selection under Fixed image. 
          appObjProp = 'ccpTbwBgclrTfd';
          str = Appobj[appObjProp];
          retObj = returnObject(appObjProp, str);
          return retObj;
        })(),
        tableWrapperGhost: (function() {
          appObjProp = 'ccpTbwGhostChk';
          str = Appobj[appObjProp];
          retObj = returnObject( appObjProp, str );
          return retObj;
        })(),
        // !VA Branch: 0912B
        // !VA This is handled in the style attribute now, deprecating...
        // tableWrapperMsdpi: (function() {
        //   appObjProp = 'ccpTbwMsdpiChk';
        //   str = Appobj[appObjProp];
        //   retObj = returnObject( appObjProp, str );
        //   return retObj;
        // })(),
        tableWrapperStyle: (function() {
          appObjProp = false;
          // !VA If the TBW msdpi checkbox is checked, add style attribute with the width property set to the curImgW. To this for TdStyle as well.
          var msdpi, maxwd;
          // !VA Set the msdpi string to the TBW width field value 
          msdpi = `width: ${Appobj['ccpTbwWidthTfd']}px; `;
          // !VA If the TBW width field value was a percent, remove the px on the units suffix
          msdpi.includes('%')  ? msdpi = msdpi.replace('%px', '%') : msdpi;
          maxwd = `max-width: ${Appobj['ccpTbwMaxwdTfd']}px; `;
          if ( Appobj['ccpTbwMsdpiChk']) {
            str = msdpi;
          } 
          if ( Appobj['ccpTbwMaxwdTfd']) {
            str = msdpi + maxwd;
          }
          // !VA There is no corrsponding appObj property for this so return false for the first parameter where the alias would normally go
          retObj = returnObject( false, str );
          return retObj;
        })(),
      };
      // !VA Return the Attributes defined above. 
      return Attributes;
    }

    // !VA CBController public
    // !VA Omit a node attribute if the corresponding getAttributes Attribute is empty, i.e. the corresponding Appobj property/CCP element has no value. str is the Attribute object property. myNode is the current node, i.e. imgNode, tdNode, or tableNode. attr is the current attribute, i.e. className, alt, align etc. 
    function omitIfEmpty(str, myNode, attr) {
      // !VA If the Attribute is not empty, set the node attribute to the Attribute property. Otherwise, false for eventual error checking.
      str ? myNode[attr] = str : false;
      // return myNode[attr];
    }

    // !VA END ATTRIBUTE FUNCTIONS

    // !VA DOM NODE FUNCTIONS

    // !VA CBController   
    // !VA Build the subset of nodes that will be populated with indents and output to the Clipboard. NOTE: outputNL can't be a fragment because fragments don't support insertAdjacentHMTL). So we have to create a documentFragment that contains all the nodes to be output, then append them to a container div 'outputNL', then do further processing on the container div.
    function buildOutputNodeList( id ) {
      console.log('buildOutputNodeList running'); 
      console.log('id is: ' + id);
      // debugger;
      let selectedTdOption, hasAnchor, hasWrapper, Attributes, tableNodeFragment, nl, frag, outputNL, clipboardStr;
      // !VA Branch: OVERHAUL0908D
      // !VA Set hasAnchor if ccpImgAnchrTfd has a value
      appController.getAppobj('ccpImgAnchrTfd')  ? hasAnchor = true : hasAnchor = false;
      // !VA Set hasWrapper if ccpTblWraprChk is selected
      appController.getAppobj('ccpTblWraprChk')  ? hasWrapper = true : hasWrapper = false;
      // !VA Get the selected TD option
      // !VA Branch: OVERHAUL0903A
      // !VA Is there a reason to call a function like below instead of accessing Appobj?
      // selectedTdOption = UIController.fetchInputSelection('ccpTdaOptnsRdo');
      selectedTdOption = appController.getAppobj('ccpTdaOptnsRdo');
      // !VA Query Appobj for the Include anchor checkbox state: true = checked, false = unchecked

      // !VA Branch: OVERHAUL0826A
      // !VA Get the Attributes from which Clipboard strings are built
      Attributes = getAttributes();
      
      // !VA Get the top node, i.e. tableNodeFragment. 
      tableNodeFragment = makeTableNode( id, Attributes );

      // !VA Branch: OVERHAUL0826A
      // !VA tableNodeFragment tested and OK

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
      if (selectedTdOption === 'basic' || selectedTdOption === 'excld' || selectedTdOption === 'swtch') {
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
        // !VA ccpImgCbhtmIpt is clicked. We can hardcode the index where the extraction begins because the imgNode is created in makeTdNode and the ccpImgCbhtmIpt button click overrides any other makeNode button actions. 
        case ( '#' + id === iptCcpMakeClips.ccpImgCbhtmIpt):
          
          // !VA If hasAnchor === true then the checkbox is checked, so take the last two (i.e. A and IMG) nodes, otherwise just take the last (i.e. IMG) node.
          hasAnchor === true ? frag = nl[nl.length - 2] : frag = nl[nl.length - 1]; 

          break;
        // !VA ccpTdaCbhtmIpt is clicked. Here we handle the 'rdoCcpTdBasic', 'rdoCcpTdExcludeimg' and 'rdoCcpTdPosswitch' options because they process indents with no modifications. 'rdoCcpTdImgswap', 'rdoCcpTdBgimage' and 'rdoCcpTdVmlbutton' options are handled separately because they import comment nodes with MS conditional code
        case ( '#' + id === iptCcpMakeClips.ccpTdaCbhtmIpt):
          // !VA basic option is selected 
          if ( selectedTdOption === 'basic') { 
            // !VA We can hardcode this for now, but that will be a problem if any other options with other nodes are added.
            hasAnchor ? extractPos = nl.length - 3 : extractPos = nl.length - 2;
            // frag = nl[extractPos];
          } else if ( selectedTdOption === 'excld') {
            extractPos = 5;
            // !VA posswitch option is selected
          } else {
            // !VA The fragment is extracted starting at the position of the RTL node
            extractPos = rtlNodePos;
          }
          frag = nl[extractPos];
          break;
        // !VA Target id is MakeTableTag button
        case ( '#' + id === iptCcpMakeClips.ccpTblCbhtmIpt):
          // !VA basic or excludeimg option is selected 
          // !VA We can hardcode the 'rdoCcpTdBasic' and 'rdoCcpTdPosswitch' positions for now, but these will have to be revisited if any new options are added that change the outputNL indices. 

          // !VA Branch: OVERHAUL0903A
          // !VA What is this supposed to do?
          // selectedTdOption = appController.getAppobj('ccpTdaOptnsRdo');


          // !VA Branch: OVERHAUL0903A
          // !VA If the Appobj property for the Include table wrapper icon is true
          if (appController.getAppobj('ccpTblWraprChk')) {
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
        // !VA Run applyIndents to apply indents to outputNL
        applyIndents( id, outputNL );
        // !VA Convert the nodeList to text for output to the clipboard.
        clipboardStr = outputNL[0].outerHTML;

      // !VA These options include MS conditional code retrieved by getImgSwapBlock, getBgimageBlock, getVMLBlock which includes getIndent functions. First, run applyIndents on outputNL. applyIndents also inserts tokens at the position where the codeBlock is to be inserted. The parent nodelist is converted to a string, the code blocks are retrieved, indents are inserted, and finally the codeblocks are inserted into the string between the tags of the last node in the outputNL.outerHTML string.
      

      } else if (selectedTdOption === 'iswap' || selectedTdOption  === 'bgimg' || selectedTdOption === 'vmlbt') {
        // !VA Start with the ccpTdaCbhtmIpt makeNode button because the img makeNode button isn't referenced in the imgswap option. The A/IMG tags are hard-coded into the MS Conditional code in getImgSwapBlock. Also, there's a switch to include/exclude the A/IMG node in makeTdNode.
        // !VA extractNodeIndex is the nl index position at which the nodes are extracted to build outputNL. It equals the nodeList length minus the indentLevel.
        let extractNodeIndex;
        // !VA indentLevel is the number of indents passed to getIndent.
        let indentLevel;
        // !VA codeBlock is the MS conditional code block returned as string
        let codeBlock;
        // !VA If the makeTD button is clicked, then only the last node in nl is extracted and the MS conditional comments get one indent level
        // !VA NOTE: This code is repeated above in the if clause and again here in the else
        
        if ( '#' + id === iptCcpMakeClips.ccpTdaCbhtmIpt) {
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
        // !VA Apply the indentffs and insert the tokens marking the position for inserting the MS conditional code.
        applyIndents(id, outputNL);
        // !VA Convert outputNL to a string (including tokens for inserting MS conditional code) for output to Clipboard object.
        clipboardStr = outputNL[0].outerHTML;
        console.log('outputNL[0] is: ');
        console.log(outputNL[0]);
        
        console.log(clipboardStr);
        // !VA Get the codeBlock corresponding to the selected TD option
        if ( selectedTdOption === 'iswap') {
          codeBlock = getImgSwapBlock( id, indentLevel, Attributes);
          console.log('codeBlock is: ');
          console.log(codeBlock);
        } else if (  selectedTdOption === 'bgimg' ) {
          codeBlock = getBgimageBlock(id, indentLevel, Attributes);
        } else if (selectedTdOption === 'vmlbt') {
          codeBlock = getVmlButtonBlock(id, indentLevel, Attributes);
        } 
        // !VA Replace the tokens in clipboardStr that were added in applyIndents with the respective codeBlock
        clipboardStr = clipboardStr.replace('/replacestart//replaceend/', codeBlock + '\n');
      } 
      // !VA Branch: 0911A
      // !VA If clipboardStr contains the data-ghost attribute, then call configGhostTable to add the ghost tags. Otherwise, don't since the ghost tokens screw up the IMG and TD clipboard output.
      if (clipboardStr.includes('data-ghost')) {
        clipboardStr = configGhostTable(clipboardStr, Attributes.tableGhost.str, Attributes.tableWrapperGhost.str);
      }
      // !VA Branch: 0911B
      console.log('buildOutputNodeList clipboardStr is: ');
      console.log(clipboardStr);
      // !VA Write clipboardStr to the Clipboard
      writeClipboard( id, clipboardStr );
    }

    // !VA Make the nodes for the 'posswitch option' using the DIR attribute
    // !VA CBController   
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
      // !VA Branch: OVERHAUL0827A
      // !VA Deprecated...don't need the checkbox target anymore
      // var target = ccpUserInput.ccpImgAnchrTfd;
      // !VA If Include anchor is NOT checked, remove the anchor item from both sibling1 arrays.
      // !VA Branch: OVERHAUL0827A
      // !VA Replace with query Appobj for ccpImgAnchr property. If the property value === '', then there is no entry, so do not include the anchor node in the sibling1 arrays.
      if ( appController.getAppobj('ccpImgAnchrTfd') === '') {
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

      // !VA Remove the anchor attributes from the array if the Include anchor checkbox is not checked. The a tag is at position 7 in the attributes array.
      // !VA Branch: OVERHAUL0827A
      // !VA Replacing with Appobj query
      if ( appController.getAppobj('ccpImgAnchrTfd') === '') {
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
    // !VA CBController   
    // !VA Builds the imgNode that is appended to the tdNode, that is in turn appended to the tableNode to generate the clipboard output. The individual attributes of the node (i.e. class, alt, etc) are received in the Attributes argument, which is originally created in getAttributes and called in buildOutputNodeList. Each property of the Attributes object contains any logic required to create the Attribute, but the logic of WHETHER the Attribute is to be included in the imgNode is 
    function makeImgNode ( id, Attributes ) {
      // !VA Id is passed but not used here,  because we're only building the node.
      let imgNode, returnNodeFragment, textColorProp;
      // !VA Create the image node
      imgNode = document.createElement('img');
      // !VA Create the node fragment that will contain the IMG or A/IMG tags
      returnNodeFragment = document.createDocumentFragment();

      // !VA Branch: review0720C (071520)
      // !VA If the Attributes property is empty, i.e. there is no input in the CCP input element, do not include the attribute in the node. attr is the string containing the node name to populate. NOTE: The dropdown value of the 'none' option is an empty string, so omitIfEmpty works for align attributes as well.
      // !VA imgNode.className
      omitIfEmpty( Attributes.imgClass.str, imgNode, 'className');
      // !VA imgNode.alt
      omitIfEmpty( Attributes.imgAlt.str, imgNode, 'alt' );
      // !VA imgNode.src;
      imgNode.src = Attributes.imgSrc.str;
      // !VA width attribute
      imgNode.width = Attributes.imgWidth.str;
      // !VA height attribute
      imgNode.height = Attributes.imgHeight.str;
      // !VA Style attribute - The logic for outputting different style attributes for fixed/fluid imgTypes to the Clipboard is in the imgStyle attribute of the Attributes object in getAttributes. 
      imgNode.setAttribute('style', Attributes.imgStyle.str);
      // !VA imgNode.align
      omitIfEmpty( Attributes.imgAlign.str, imgNode, 'align' );
      // !VA border attribute - always set to 0
      imgNode.border = '0';
      // !VA If the include anchor option is checked, create the anchor element, add the attributes, append the imgNode to the nodeFragment, and return it.
      // !VA Branch: OVERHAUL0826A
      // !VA Overhaul, disabling...
      if (Attributes.imgAnchor.str !== '') {
        let anchor = document.createElement('a');
        anchor.href = Attributes.imgAnchor.str;
        // !VA Create the style property for the user-entered string for the anchor element's text color as a text string within the style attribute - using the color property would either convert a hex value to RGB or fail if an invalid color value is entered.
        // !VA If the Attribute exists, write the style property as text string to textColorProp, if not, leave textColorprop empty.
        Attributes.imgAnchorTxtclr.str ? textColorProp =  `color: ${Attributes.imgAnchorTxtclr.str}; ` : textColorProp = '';  
        // !VA If textColorProp is not empty, create the style attribute and set it to textColorProp
        if (textColorProp) { anchor.setAttribute('style', textColorProp); }
        // !VA If the target Attribute for the anchor is set (i.e. the Target icon is checked, create the target attribute of the anchor element and append it to the imgNode
        if ( Attributes.imgAnchorTargt.str ) { anchor.target = '_blank'; }
        anchor.appendChild(imgNode);
        // !VA Append the anchor node to the node fragment.
        returnNodeFragment.appendChild(anchor);
      } else {
        // !VA Otherwise, set returnNodeFragment to imgNode without the anchor.
        returnNodeFragment.appendChild(imgNode);
      }
      // !VA return the imgNode as node fragment
      return returnNodeFragment;
    }

    // !VA Make the TD node
    // !VA CBController   
    function makeTdNode( id, Attributes ) {
      // !VA Variables for error handling - need to include this in the return value so the Clipboard object can differentiate between alert and success messages. 
      let isErr;
      // !VA Query Appobj to get the selected TD option
      let selectedTdOption;
      // !VA Branch: OVERHAUL0903A
      // !VA Reason for this function instead of Appobj query?
      // selectedTdOption = UIController.fetchInputSelection( 'ccpTdaOptnsRdo');
      selectedTdOption = appController.getAppobj('ccpTdaOptnsRdo');
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
      case (selectedTdOption === 'basic'):
        // !VA tdInner.className
        omitIfEmpty( Attributes.tdClass.str, tdInner, 'className');
        // !VA tdInner.align
        omitIfEmpty( Attributes.tdAlign.str, tdInner, 'align');
        // if (Attributes.tdClass.str) { tdInner.className = Attributes.tdClass.str; }
        // !VA tdInner.vAlign
        omitIfEmpty( Attributes.tdValign.str, tdInner, 'vAlign');
        // !VA tdInner.height - if tdoption is basic, don't show. if tdoption is excludeimg, show.
        // !VA CAUTION here...
        // !VA Branch: review0720C (071520)
        // !VA This is where we do the excludeimg logic
        // !VA The below is what it was before - tdHeight was set to the current image height
        // omitIfEmpty( Attributes.tdHeight.str, tdInner, Attributes.imgHeight.str);
        // !VA Now it's set to the current value of the input element, i.e. the Appobj property
        omitIfEmpty( Attributes.tdHeight.str, tdInner, 'height');
        // !VA tdInner.width - if tdoption is basic, don't show. if tdoption is excludeimg, show.
        // !VA Branch: review0720C (071520)
        // !VA This is where we do the excludeimg logic
        // !VA The below is what it was before - tdWidth was set to the current image width
        omitIfEmpty( Attributes.tdWidth.str, tdInner, Attributes.imgWidth.str);
        // !VA Now it's set to the current value of the input element, i.e. the Appobj property
        omitIfEmpty( Attributes.tdWidth.str, tdInner, 'width');

        // !VA Branch: 0913B
        // !VA For TBL Msdpi
        if (Attributes.tdStyle.str) { tdInner.setAttribute('style', Attributes.tdStyle.str ); }

        // !VA Branch: OVERHAUL0827A
        // !VA Determine whether to include or exclude the img node. Query Appobj for the incld/excld option. If 'incld', include the img, else exclude it.

        if (appController.getAppobj('ccpImgExcldRdo') === 'incld') {

          imgNode = makeImgNode( id, Attributes );


          // !VA Branch: OVERHAUL0826A
          // !VA tdInner tested and OK
          tdInner.appendChild(imgNode);


        } else if (appController.getAppobj('ccpImgExcldRdo') === 'excld') {
          console.log('makeTdNode - img excluded from tdNode');
        } else {
          console.log('ERROR in makeTdNode - unrecognized itype option');
        }
        break;
      // !VA (selectedTdOption === 'rdoCcpTdImgswap'):
      case (selectedTdOption === 'iswap'):
        // !VA tdInner.className
        omitIfEmpty( Attributes.tdClass.str, tdInner, 'className');
        // !VA tdInner.align
        omitIfEmpty( Attributes.tdAlign.str, tdInner, 'align');
        // if (Attributes.tdClass.str) { tdInner.className = Attributes.tdClass.str; }
        // !VA tdInner.vAlign
        omitIfEmpty( Attributes.tdValign.str, tdInner, 'vAlign');
        break;
      // !VA (selectedTdOption === 'rdoCcpTdBgimage'):
      case (selectedTdOption === 'bgimg'):
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
      case (selectedTdOption === 'swtch'):
        tdInner  = makePosSwitchNodes( id, Attributes );
        break;
      // !VA  (selectedTdOption === 'rdoCcpTdVmlbutton'):
      case (selectedTdOption === 'vmlbt'):

        // !VA IMPORTANT: Height and width fields have to be entered, otherwise the button can't be built. Button width and height are set here in makeTdNode, the rest of the options are set in getVmlCodeBlock in buildOutputNodeList. The defaults of 40/200 as per Stig are set in UIController.showTdOptions. So if there's no value for td height and width, then the user has deleted the default and not replaced it with a valid entry. In this case, throw an ERROR and abort before it gets to the clipboard.
        // !VA Branch: OVERHAUL0827A
        // !VA Replaced both these DOM accesses with Appobj queries.
        if (!appController.getAppobj('ccpTdaHeigtTfd') || !appController.getAppobj('ccpTdaWidthTfd')) {
          console.log('ERROR in makeTdNode rdoCcpTdVmlbutton: no value for either height or width');
          isErr = true;
        } else {
          // !VA Set the width and height in the TD node, not in the code block
          tdInner.width = Attributes.tdWidth.str;
          tdInner.height = Attributes.tdHeight.str;
        }
        // !VA TODO: If the height entered doesn't match the height of the loaded image, then the user probably has forgotten to load the image used for the button background, so the code output will probably not be what the user expects. Output the code, but show an alert in the message bar. This is going to require making a different clipboard message for alerts. It will also require somehow informing the Clipboard object that two different messages can be displayed onsuccess - one success message and one alert message. That will require passing an error status along with tdNodeFragment and tableNodeFragment, which will require returning an array rather than just the node fragment. 
        if (document.querySelector(ccpUserInput.ccpTdaHeigtTfd).value !== Attributes.imgHeight.str) {
          // !VA TODO: This error message throws an error...
          // appController.handleAppMessages('vmlbutton_height_mismatch');
          console.log('ALERT vmlbutton: height value doesn\'t match height of loaded image');
        } 
        break;
      default:
        console.log('Some error has occurred in makeTdNode');
      } 
      // !VA Set the node fragment to the TD node
      // !VA Branch: OVERHAUL0826A
      // !VA tdNodeFragment tested and OK
      tdNodeFragment.appendChild(tdInner);

      // !VA TODO: This error handling is poor because it only allows for one possible error. But, it does return nothing, which is then passed on to the calling function and terminates in buildOutputNodeList
      if (isErr) { 
        console.log('makeTdNode: vml_button_no_value error: id is: ' + id);
        appController.handleAppMessages('vml_button_no_value');
        // appController.initMessage(id, true, 'vmlbutton_no_value');
        return;
      } else {

        return tdNodeFragment;
      }
    }

    // !VA Make the table node, including parent and wrapper table if selected
    // !VA CBController   
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
      // !VA Add to the node only if the attribute is set, i.e. the input has an entry

      // !VA tableInner.className
      omitIfEmpty( Attributes.tableClass.str, tableInner, 'className');
      // !VA tableInner.align
      omitIfEmpty( Attributes.tableAlign.str, tableInner, 'align');
      // !VA Branch: review0720C (071520)
      // !VA Making this contingent on user input now, it was static before. But logic for how to handle the empty input element has to be in Attributes.tableWidth - currently there's no provision for it. 
      // !VA tableInner.width
      omitIfEmpty( Attributes.tableWidth.str, tableInner, 'width');
      // !VA table bgcolor attribute. Pass the input value, don't prepend hex # character for now
      // !VA Branch: review0720C (071520)
      // !VA Check the attribute string - I don't know why it's camelCase
      // !VA tableInner.bgColor
      omitIfEmpty( Attributes.tableBgcolor.str, tableInner, 'bgColor');
      // !VA Add border, cellspacing and cellpadding
      tableInner.border = '0', tableInner.cellSpacing = '0', tableInner.cellPadding = '0';
      // !VA Branch: 0911A
      // !VA If ccpTblGhostChk is checked, set the data-ghost attribute
      if (Attributes.tableGhost.str) { tableInner.setAttribute('data-ghost', 'tbl'); }

      // !VA Branch: 0913B
      if (Attributes.tableStyle.str) { tableInner.setAttribute('style', Attributes.tableStyle.str ); }


      // !VA Set the role=presentation attribute
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
      // !VA Only output the table class name attribute if Appobj has a value for it.
      omitIfEmpty( Attributes.tableWrapperClass.str, tableOuter, 'className');
      // !VA Only output the the table align attribute if Appobj has a value for it, i.e. an icon other than the none symbol is selected.
      omitIfEmpty( Attributes.tableWrapperAlign.str, tableOuter, 'align');
      // !VA the default wrapper table width is the current display size - so it gets the value from the toolbar's Content Width field.
      // !VA Only output the table width attribute if Appobj has a value for it.
      omitIfEmpty( Attributes.tableWrapperWidth.str, tableOuter, 'width');
      // !VA Only output the bgcolor attribute if Appobj has a value for it. Pass the input value, don't prepend hex # character for now - the user might want to use a text token or scss variable
      omitIfEmpty( Attributes.tableWrapperBgcolor.str, tableOuter, 'bgColor');
      // !VA Branch: 0910A
      // !VA Not sure whether the style attribute is used now, for review.
      omitIfEmpty( Attributes.tableWrapperStyle.str, tableOuter, 'style');
      // !VA Add default border, cellspacing, cellpadding and role for accessiblity
      tableOuter.border = '0', tableOuter.cellSpacing = '0', tableOuter.cellPadding = '0';
      tableOuter.setAttribute('role', 'presentation'); 
      // !VA Branch: 0913B
      if (Attributes.tableStyle.str) { tableInner.setAttribute('style', Attributes.tableStyle.str ); }
      // !VA Branch: 0911A
      // !VA If ccpTbwGhostChk is checked, set the data-ghost attribute
      // !VA Branch: 0911B
      if (Attributes.tableWrapperGhost.str) { tableOuter.setAttribute('data-ghost', 'tbw'); }
      // !VA Append the outer tr to the wrapper
      tableOuter.appendChild(trOuter);
      // !VA Append the outer td to the outer tr
      trOuter.appendChild(tdOuter);
      // !VA Branch: 0913B
      // !VA Hard-coding the outer td align and valign attributes to left and top here - if the user wants to change it they can delete it from their code. 
      // if (Attributes.tdAlign.str) { tdOuter.align = Attributes.tdAlign.str; }
      tdOuter.align = 'left';
      // if (Attributes.tdValign.str) { tdOuter.vAlign = Attributes.tdValign.str; }
      tdOuter.vAlign = 'top';

      // !VA Branch: 0913B
      // !VA Add the Attributes.tdStyle attribute if TBW msdpi is checked.
      if (Attributes.tdWrapperStyle.str) { tdOuter.setAttribute('style', Attributes.tdWrapperStyle.str ); }

      // !VA Append the inner table to the outer table's td
      tdOuter.appendChild(tableInner);
      // !VA Pass the outer table to the tableNodeFragment and return it.
      tableNodeFragment.appendChild(tableOuter);
      return tableNodeFragment;
    }
    // !VA  END NODE FUNCTIONS

    // !VA START TD OPTIONS MS-CONDITIONAL CODE BLOCKS
    // !VA These are the code blocks that contain MS conditionals in comment nodes or text nodes, i.e. mobile swap, background image, and vmlbutton
    // !VA UIController private
    // !VA Called from buildOutputNodeList. Gets the clipboardStr that comprises the MS Conditional code for the iswap, i.e. TD OPTNS image swap option.
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

    // !VA UIController   
    // !VA Called from buildOutputNodeList. Gets the clipboardStr that comprises the MS Conditional code for the Bgimage.
    function getBgimageBlock( id, indentLevel, Attributes ) {
      console.log('getBgimageBlock running');
      // !VA Keeping the original reference to fallback for posterity for now
      // let bgimageStr, fallback, bgcolor;
      console.log('Attributes is: ');
      console.log(Attributes);
      console.log('Attributes.tdBackground.str is: ' + Attributes.tdBackground.str);
      let bgimageStr, bgcolor;
      let linebreak;
      linebreak = '\n';
      // !VA 03.09.2020 Set the indentLevel to 1 for now
      // !VA The fallback color is written to the bgcolor input in showTdOptions, so get it from there
      // fallback = '#7bceeb';
      Attributes.tdBgcolor.str ? bgcolor = Attributes.tdBgcolor.str : bgcolor = document.querySelector(ccpUserInput.ccpTdaBgclrTfd).value;
      // !VA Define the innerHTML of the bgimage code
      bgimageStr = `${linebreak}${getIndent(indentLevel)}<!--[if gte mso 9]>${linebreak}${getIndent(indentLevel)}<v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:${Attributes.imgWidth.str}px;height:${Attributes.imgHeight.str}px;">${linebreak}${getIndent(indentLevel)}<v:fill type="tile" src="${Attributes.imgSrc.str}" color="${Attributes.tdBgcolor.str}" />${linebreak}${getIndent(indentLevel)}<v:textbox inset="0,0,0,0">${linebreak}${getIndent(indentLevel)}<![endif]-->${linebreak}${getIndent(indentLevel)}<div>${linebreak}${getIndent(indentLevel)}<!-- Put Foreground Content Here -->${linebreak}${getIndent(indentLevel)}</div>${linebreak}${getIndent(indentLevel)}<!--[if gte mso 9]>${linebreak}${getIndent(indentLevel)}  </v:textbox>${linebreak}${getIndent(indentLevel)}</v:rect>${linebreak}${getIndent(indentLevel)}<![endif]-->`;
      // !VA Return the code block with line breaks and indents
      return bgimageStr;
    }

    // !VA CBController   
    function getVmlButtonBlock ( id, indentLevel, Attributes) {
      let vmlButtonStr, linebreak, tdHeight, tdWidth;
      linebreak = '\n';
      // !VA Defaults for height and width are set in showTdOptions, so get the values from the inputs
      tdHeight = document.querySelector(ccpUserInput.ccpTdaHeigtTfd).value;
      tdWidth = document.querySelector(ccpUserInput.ccpTdaWidthTfd).value;
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
    // !VA CBController   
    // !VA NOTE: This routine identifies if the nodes 1) contain the id 'stack-column-center' 2) contain MS conditional code and 2) contain an A tag. It applies indents accordingly to the nodes using insertAdjacentHTML. 1) Is problematic because if that class name is not present in the HTML file, the indent will break. I couldn't figure out a way to do this without the id by looking for sibling nodes, so trying to create options for three or even two column tables will be ridiculous time-consuming - not an option for now.
    function applyIndents( id, outputNL ) {
      let selectedTdOption;
      // !VA Branch: OVERHAUL0827A
      // !VA Query Appobj to get the selected TD option
      selectedTdOption = appController.getAppobj('ccpTdaOptnsRdo');

      // !VA Create array to store indent strings
      let indents = [];
      // !VA Create array to store the positions of the stackable columns in the posswitch option.
      let stackColumnPos = [];
      // !VA Variable to hold the indentLevel of the second posswitch column that the first posswitch column will stack over.
      let stackColumnIndentLevel;
      // !VA Flag for whether to insert the tokens used to insert the MS conditional code blocks after converting the output node list to text.
      let hasMSConditional;
      if ( selectedTdOption === 'iswap' || selectedTdOption === 'bgimg' || selectedTdOption === 'vmlbt') {
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
            // !VA Branch: 0909C
            // !VA Deprecating...
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

    // !VA CBController   
    // !VA Return the indent string based on the indent level passed in
    function getIndent(indentLevel) {
      let indentChar, indent;
      indentChar = '  ';
      // !VA Repeat the indent character indentLevel number of times
      indent = indentChar.repeat([indentLevel]);
      return indent;
    }
    // !VA END INDENT FUNCTTIONS

    // !VA GHOST FUNCTIONS

    document.addEventListener("DOMContentLoaded", function() {

      var tbl = `
<table class="devicewidth" role="presentation" data-ghost="tbw" width="600" cellspacing="0" cellpadding="0" border="0">
  <tr>
    <td valign="top" align="left">
      <table data-ghost="tbl" role="presentation" width="200" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td valign="top" align="left">
            <a href="#" style="color: #0000FF; " target="_blank"><img src="img/_200X150.png" style="display: block; width: 200px; height: 150px; font-family: Arial, sans-serif; font-size: 16px; line-height: 15px; text-decoration: none; border: none; outline: none;" width="200" height="150" border="0"></a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
      `;

      // testit(tbl, true, true);

    });

    function testit(tbl, bool1, bool2) {
      

      console.log('testit running...');
      let openTag, closeTag, ghostOpen1, ghostClose1, ghostOpen2, ghostClose2;
      let indexPos, ghostTags = [], hasWrapper;
      // !VA Define the tokens to use as placeholders before the replace operation
      ghostOpen1 = '/ghostOpen1/', ghostClose1 = '/ghostClose1/', ghostOpen2 = '/ghostOpen2/', ghostClose2 = '/ghostClose2/';
      // !VA Define the opening and closing table tags
      openTag = '<table', closeTag = '</table>';
      // !VA Get the ghost tags and their indents
      ghostTags = getGhostTags();
      // !VA Get the state of the Table Wrapper checkbox icon
      hasWrapper = true;
      console.log('hasWrapper is: ' + hasWrapper);
      // !VA If the Table wrapper checkbox is unchecked, then this is the outer table and any inner tables belong to the TD options' code block. Assign the tokens for ghostTag1 before/after the opening/closing table tag respectively.
      if (!hasWrapper) {
        // !VA Add the token for ghostOpen1 tag before the opening table tag
        indexPos = tbl.indexOf( openTag,  0 );
        tbl = ghostOpen1 + tbl.substring( indexPos, openTag.length) +  tbl.substring( openTag.length, tbl.length);
        // !VA Add the token for ghostClose1 tag - it goes at the end of the tbl string.
        tbl = tbl + ghostClose1;


      // !VA If the Table wrapper checkbox is checked, then ghostOpen2 and ghostClose2 apply to the outer table and ghostOpen1 and ghostClose1 apply to the inner table, i.e. the child table of the outer table. Note that any indexOf searches for inner table tags have to go in reverse direction, i.e. from the end of the string towards the beginning, otherwise they will end up in any tables existing in the TD Options code blocks.
      } else {
        // !VA Add the token for ghostOpen2 tag
        indexPos = tbl.indexOf( openTag,  0 );
        tbl = ghostOpen2 + tbl.substring( indexPos, openTag.length) +  tbl.substring( openTag.length, tbl.length);
        // !VA Add the token for ghostClose2 tag. It goes at the end of the tbl string.
        // !VA Branch: 0911B
        tbl = tbl + ghostClose2;
        // !VA Add the token for ghostOpen1 tag
        // !VA Branch: 0911B 
        // !VA Find the data-ghost string
        var dataAttIndex = tbl.indexOf('data-ghost="tbl"');
        console.log('dataAttIndex is: ' + dataAttIndex);
        // !VA Get the index of tableTag1
        var tableOpen1Index;
        tableOpen1Index = tbl.lastIndexOf( openTag, dataAttIndex );
        
        // console.log('tableOpen1Index is: ' + tableOpen1Index);
        // console.log('tbl.substring( tableOpen1Index, tableOpen1Index + 6 ) is: ' + tbl.substring( tableOpen1Index, tableOpen1Index + 6 ));
        tbl = tbl.substring( 0, tableOpen1Index ) + ghostOpen1 +  tbl.substring( tableOpen1Index, tbl.length);
        // console.log('foo is: ' + foo);
        
        var foo;


        var tableClose1Index, tableClose2Index;
        console.log('closeTag is: ' + closeTag);
        tableClose2Index = tbl.lastIndexOf( closeTag , tbl.length );
        console.log('tableClose2Index is: ' + tableClose2Index);

        tableClose1Index = tbl.lastIndexOf( closeTag , tableClose2Index - closeTag.length );
        console.log('tableClose1Index is: ' + tableClose1Index);
        tbl = tbl.substring( 0, tableClose1Index) + ghostClose1 + tbl.substring( tableClose1Index, tbl.length);



        // console.log('tbl.substring( tableClose1Index - closeTag.length) is: ' + tbl.substring( tableClose1Index, tableClose1Index + closeTag.length));
        // console.log('tbl.substring( tableClose1Index, tableClose1Index + 6 ) is: ' + tbl.substring( tableClose1Index, tableClose1Index + 6 ));






        
        // indexPos = tbl.indexOf( openTag, ghostOpen1.length + openTag.length );
        // tbl = tbl.substring( 0, indexPos) + ghostOpen1 + tbl.substring( indexPos, tbl.length);
        // // !VA Add the token for ghostClose1 tag
        // indexPos = tbl.indexOf( closeTag, 0);
        // console.log('indexPos is: ' + indexPos);
        // tbl = tbl.substring( 0, indexPos + closeTag.length) + ghostClose1 + tbl.substring( indexPos + closeTag.length, tbl.length);
      }
      // !VA Now that the tokens are in place, replace them with the ghost tags or strip them out based on the bool values.
      // if (bool1) {
      //   tbl = tbl.replace(ghostOpen1,  ghostTags[0]);
      //   tbl = tbl.replace(ghostClose1, ghostTags[1]);
      // } else {
      //   tbl = tbl.replace(ghostOpen1,'');
      //   tbl = tbl.replace(ghostClose1, '');
      // }
      // if (bool2) {
      //   tbl = tbl.replace(ghostOpen2, ghostTags[2]);
      //   tbl = tbl.replace(ghostClose2, ghostTags[3]);
      // } else {
      //   tbl = tbl.replace(ghostOpen2,'');
      //   tbl = tbl.replace('/ghostClose2/', '');
      // }

      // console.log('tbl is: ');
      // console.log(tbl);
    }


    // !VA CBController private
    // !VA handle the buildNodeList clipboardStr output, define and place the tokens in the clipboardStr output and replace the tokens with the ghost tabs from getGhostTags or strip them out depending on the checked status of the Ghost checkbox icons passed in as bool parameters from the caller.
    function configGhostTable(tbl, bool1, bool2) {
      // console.log('configGhostTable running - bool1: ' + bool1 + '; bool2: ' + bool2); 
      //   console.log('tbl is: ');
      //   console.log(tbl);
      let openTag, closeTag, ghostOpen1, ghostClose1, ghostOpen2, ghostClose2, openTBLPos,  closeTBLPos, closeTBWPos;
      let indexPos, ghostTags = [], hasWrapper;
      // !VA Define the tokens to use as placeholders before the replace operation
      ghostOpen1 = '/ghostOpen1/', ghostClose1 = '/ghostClose1/', ghostOpen2 = '/ghostOpen2/', ghostClose2 = '/ghostClose2/';
      // !VA Define the opening and closing table tags
      openTag = '<table', closeTag = '</table>';
      // !VA Get the ghost tags and their indents
      ghostTags = getGhostTags();
      // !VA Get the state of the Table Wrapper checkbox icon
      hasWrapper = appController.getAppobj('ccpTblWraprChk');
      // !VA If the Table wrapper checkbox is unchecked, then this is the outer table and any inner tables belong to the TD options' code block. Assign the tokens for ghostTag1 before/after the opening/closing table tag respectively.
      if (!hasWrapper) {
        // !VA Add the token for ghostOpen1 tag before the opening table tag
        indexPos = tbl.indexOf( openTag,  0 );
        tbl = ghostOpen1 + tbl.substring( indexPos, openTag.length) +  tbl.substring( openTag.length, tbl.length);
        // !VA Add the token for ghostClose1 tag - it goes at the end of the tbl string.
        tbl = tbl + ghostClose1;

      // !VA If the Table wrapper checkbox is checked, then ghostOpen2 and ghostClose2 apply to the outer table and ghostOpen1 and ghostClose1 apply to the inner table, i.e. the child table of the outer table. Note that any indexOf searches for inner table tags have to go in reverse direction, i.e. from the end of the string towards the beginning, otherwise they will end up in any tables existing in the TD Options code blocks.
      } else {
        // !VA If the TBL ghost checkbox is checked, add the ghostOpen1 and ghostClose1 tokens
        if ( bool1 ) {
          // !VA Search for the opening TBL tag starting from the position of the data-ghost attribute in reverse direction
          openTBLPos = tbl.lastIndexOf( openTag, tbl.indexOf('data-ghost="tbl"'));
          // !VA Insert the ghostOpen1 token at the position of the opening TBL tag.
          tbl = tbl.substring( 0, openTBLPos ) + ghostOpen1 +  tbl.substring( openTBLPos, tbl.length);
          // !VA Search for the last closing tag in the table starting backwards for the end of the table. That is the TBW closing tag.
          closeTBWPos = tbl.lastIndexOf( closeTag, tbl.length );
          // !VA Search for the closing TBL tag starting backwards from the start position of the last closing tag, i.e. the TBW closing tag position minus the length of the closing tag.
          closeTBLPos = tbl.lastIndexOf( closeTag , closeTBWPos - closeTag.length );
          // !VA Add the ghostClose1 token a at the end position of the TBL closing tag.
          tbl = tbl.substring( 0, closeTBLPos + closeTag.length) + ghostClose1 + tbl.substring( closeTBLPos + closeTag.length, tbl.length);
        }
        // !VA If the TBL ghost checkbox is checked, add the ghostOpen2 and ghostClose2 tokens
        if ( bool2 ) {
          // !VA Add the token for ghostOpen2 tag before the opening table tag
          indexPos = tbl.indexOf( openTag,  0 );
          tbl = ghostOpen2 + tbl.substring( indexPos, openTag.length) +  tbl.substring( openTag.length, tbl.length);
          // !VA Add the token for ghostClose2 tag - it goes at the end of the tbl string.
          tbl = tbl + ghostClose2;
        }
      }
      // !VA Now that the tokens are in place, replace them with the ghost tags or strip them out based on the bool values.
      if (bool1) {
        tbl = tbl.replace(ghostOpen1,  ghostTags[0]);
        tbl = tbl.replace(ghostClose1, ghostTags[1]);
      } else {
        tbl = tbl.replace(ghostOpen1,'');
        tbl = tbl.replace(ghostClose1, '');
      }
      if (bool2) {
        tbl = tbl.replace(ghostOpen2, ghostTags[2]);
        tbl = tbl.replace(ghostClose2, ghostTags[3]);
      } else {
        tbl = tbl.replace(ghostOpen2,'');
        tbl = tbl.replace('/ghostClose2/', '');
      }
      // !VA Now strip out the data-ghost attributes.
      tbl = tbl.replace(' data-ghost="tbl"', '');
      tbl = tbl.replace(' data-ghost="tbw"', '');
      // !VA Return this to buildOutputNodeList clipboardStr
      return tbl;
    }

    // !VA CBController private
    // !VA Returns the strings for opening and closing ghost table tag as a two-item array with indents on the inner table based on the status of the Table Wrapper checkbox icon.
    function getGhostTags() {
      let ghostOpen1, ghostClose1, ghostOpen2, ghostClose2, hasWrapper, indent;
      let ghosttags = [];
      // !VA Get the status of the Table Wrapper checkbox - it determines whether indents are applied to the inner table or not.
      hasWrapper = appController.getAppobj('ccpTblWraprChk');
      hasWrapper ? indent = '      ' : indent = '';
      // !VA Define the opening and closing ghost tags for the inner table
      ghostOpen1 = 
      // !VA The first opening inner table tag gets no indent
`<!--[if (gte mso 9)|(IE)]>
${indent}<table align="center" border="0" cellspacing="0" cellpadding="0" width="${appController.getAppobj('curImgW')}">
${indent}<tr>
${indent}<td align="center" valign="top" width="${appController.getAppobj('curImgW')}">
${indent}<![endif]-->`;

      ghostClose1 = 
`\n${indent}<!--[if (gte mso 9)|(IE)]>
${indent}</td>
${indent}</tr>
${indent}</table>
${indent}<![endif]-->`;

      // !VA Define the opening and closing ghost tags for the outer table.
      ghostOpen2 = 
`<!--[if (gte mso 9)|(IE)]>
<table align="center" border="0" cellspacing="0" cellpadding="0" width="${appController.getAppobj('imgViewerW')}">
<tr>
<td align="center" valign="top" width="${appController.getAppobj('imgViewerW')}">
<![endif]-->\n`;

      ghostClose2 = 
`\n<!--[if (gte mso 9)|(IE)]>
</td>
</tr>
</table>
<![endif]-->`;

      // !VA Build the array of ghost tags to return to configGhostTags
      ghosttags = [ ghostOpen1, ghostClose1, ghostOpen2, ghostClose2 ];
      return ghosttags;
    }

    // !VA GHOST FUNCTIONS

    // !VA CLIPBOARD FUNCTIONS
    // !VA CBController   
    // !VA Write the clipboardStr to the clipboard. 
    function writeClipboard(id, str) {
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
    // !VA CBController   
    // !VA NOTE: Originally, this function took classname, wval and hval as arguments, so keeping that here for reference
    // function  makeCssRule( id, classname, wval, hval ) {
    // !VA Called from doClipboard. Generate clipboard strings for CSS output
    function makeCssRule( id ) {

      let Attributes = [];
      Attributes = getAttributes();
      console.log('makeCssRule Attributes is: ');
      console.log(Attributes);
      // !VA Branch: implementCcpInput02 (062420)
      // !VA Call getAppobj with rest parameters and destructure the return array into separate variables.
      // !VA props is the array of rest parameters returned from getAppobj
      // !VA Branch: review0720D (071620)
      // !VA NOTE: This never happened, getAppobj still returns the entire Appobj object.
      let Appobj = {};
      Appobj = appController.getAppobj();
      // !VA Destructure Appobj to variables
      let { curImgW, curImgH, sPhonesW, sPhonesH, lPhonesW, lPhonesH } = Appobj;
      let clipboardStr;

      function getTdOutput() {
        console.log('buildOutputString running');
        // !VA Branch: OVERHAUL0827A
        // !VA This could be explained better because I'm not understanding right now why rdoCcpTdExcludeimg was called below. 
        // !VA For img, assumed is always a fixed image that includes width and height. For td, either width or height or both can be provided, so the clipboard output must include either, or, or both.
        let wProp, hProp, outputStr;
        // !VA Branch: OVERHAUL0827A
        // !VA Query Appobj for the IMG excld option
        if (appController.getAppobj('ccpImgExcldRdo') === 'excld') {
          console.log('Exclude image');
          Attributes.tdWidth.str ? wProp = `width: ${Attributes.tdWidth.str}px !important;` : wProp = '';
          Attributes.tdHeight.str ? hProp = `height: ${Attributes.tdHeight.str}px !important;` : hProp = '';
          outputStr = wProp + ' ' + hProp;
        } else {
          outputStr = `width: ${Appobj.curImgW}px !important; height: ${Appobj.curImgH}px !important;`;
        }
        console.log('outputStr is: ' + outputStr);
        return outputStr;
      }

      switch(true) {
      // !VA Build the CSS clipboard output strings
      case (id.includes('img-cbdtp')):
        clipboardStr = `img.${Attributes.imgClass.str} { width: ${curImgW}px !important; height: ${curImgH}px !important; }`;
        break;
      case (id.includes('img-cbsph')):
        clipboardStr = `img.${Attributes.imgClass.str} { width: ${sPhonesW}px !important; height: ${sPhonesH}px !important; }`;
        break;
      case (id.includes('img-cblph')):
        clipboardStr = `img.${Attributes.imgClass.str} { width: ${lPhonesW}px !important; height: ${lPhonesH}px !important; }`;
        break;
      // !VA Branch: review0720D (071620)
      // !VA Output depends on tdoptions, so use getTdOutput. 
      case (id.includes('tda-cbdtp')) :
        clipboardStr = `td.${Attributes.tdClass.str} { ${getTdOutput()} }`;
        break;
      // !VA Branch: review0720D (071620)
      // !VA It's conceivable that one could want to set the TD width/height to the curImg sPhones/lPhones value, so we'll include that even though it is a stretch that anyone would want it.
      case ( id.includes('tda-cbsph')) :
        clipboardStr = `td.${Attributes.tdClass.str} { width: ${sPhonesW}px !important; height: ${sPhonesH}px !important; }`;
        break;
      case ( id.includes('tda-cblph')) :
        clipboardStr = `td.${Attributes.tdClass.str} { width: ${lPhonesW}px !important; height: ${lPhonesH}px !important; }`;
        break;
      case (id.includes('tbl-cbdtp')):
        clipboardStr = `table.${Attributes.tableClass.str} { width: ${Attributes.tableWidth.str}px !important; align: ${Attributes.tableAlign.str} !important; }`;
        break;
      case (id.includes('tbl-cbsph')):
        clipboardStr = `table.${Attributes.tableClass.str} { width: ${sPhonesW}px !important; align: ${Attributes.tableAlign.str} !important; }`;
        break;
      case (id.includes('tbl-cblph')):
        clipboardStr = `table.${Attributes.tableClass.str} { width: ${lPhonesW}px !important; align: ${Attributes.tableAlign.str} !important; }`;
        break;
      default:
        console.log('ERROR in makeCssRule: case not');
      } 
      // !VA If the input includes a percent char, remove the hard-coded trailing px on the value and just output the value with the user-entered percent char.
      clipboardStr.includes('%')  ? clipboardStr = clipboardStr.replace('%px', '%') : clipboardStr;
      // !VA Write CSS code to clipboard
      console.log('clipboardStr is: ');
      console.log(clipboardStr);
      
      writeClipboard(id, clipboardStr);
    }

    // !VA CBController   
    // !VA Gets the values of the Inspector elements and formats them for the clipboard output.
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
      props = appController.getAppobj2('curImgW', 'curImgH', 'sPhonesW', 'sPhonesH', 'lPhonesW', 'lPhonesH');
      const { curImgW, curImgH, sPhonesW, sPhonesH, lPhonesW, lPhonesH } = props;
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
        widthval = curImgW;
        heightval = curImgH;
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
        widthval = curImgW;
        clipboardStr = getVal( widthval, heightval, modifierKey);
        break;
      case targetid === 'ins-display-size-height-value':
        heightval = curImgH;
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

        case targetid.includes('cbhtm') :
        // case targetid.includes('tag') || targetid.includes('fluid') || targetid.includes('fixed') :
          buildOutputNodeList (targetid);
          break;
        // !VA cbdtp, cbsph and cblph are the 5-char element codes for the Make CSS buttons
        case targetid.includes('cbdtp') || targetid.includes('cbsph') || targetid.includes('cblph'):
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

    // !VA Run on page load
    // document.addEventListener("DOMContentLoaded", function() {
    //   setTimeout(function(){ 


    //   }, 100);
    // });


    // !VA Initialize appObj
    let Appobj = {};
    // !VA Getting DOM ID strings from UIController
    const inspectorElements = UICtrl.getInspectorElementIDs();
    const inspectorValues = UICtrl.getInspectorValuesIDs();
    const inspectorLabels = UICtrl.getInspectorLabelsIDs();
    const dynamicElements = UICtrl.getDynamicRegionIDs();
    const staticContainers = UICtrl.getStaticRegionIDs();
    const toolbarElements = UICtrl.getToolButtonIDs();
    const ccpUserInput = UICtrl.getCcpUserInputIDs();
    // !VA Deprecated?
    // const ccpUserInputLabels = UICtrl.getCcpUserInputLabelIds();
    const iptCcpMakeClips =  UICtrl.getiptCcpMakeClips();
    const appMessageElements =  UICtrl.getAppMessageElements();


    
    //EVENT HANDLING START 
    // !VA appController  
    // !VA Creating a separate EventListener setup function specifically for tooltips, because this function will be run on DOMContentLoaded in an iife every time the CTRL + ALT key combination is pressed. The onModifierKeypress function should live in appController, I think. The tooltips themselves can be displayed either through UIController.showAppMessages or a new, separate UIController public function.
    // !VA Process the tooltip triggers when the mouseenter event is fired on them, i.e. get the appMessCode, appMessContent and duration and pass to showTooltip
    // !VA IMPORTANT: addEventListeners and removeEventListeners require a NAMED function, not just a function definition. If you just use a function definition, you can create the eventListener but you can't remove it because Javascript doesn't know which one you want to remove. Worse, it fails silently. So always name your function calls into a var when adding/removing event listeners!
    // !VA NOTE: variable name can't be the same as the function name. Otherwise, you can add and remove the event listener only ONCE, but not multiple times.
    var tooltipTriggers = function tooltipTriggers(evt) { 
      // !VA Named function to include as function parameter in tooltip event handlers. IMPORTANT: anonymous functions can't be removed with removeEventListener. That's why it has to be named. This is just a pass-thru to get to appController.handleAppMessages.
      appController.handleAppMessages(evt);
    };

    // !VA ADD EVENT LISTENERS FOR TOOLTIP TRIGGERS
    // !VA NOTE: Separate event listener setup for Tooltips. Managed separately from the main Toolbar and CCP element event handlers just for manageability's sake. 
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
      var btnCcpMakeClipIds = Object.values(iptCcpMakeClips);
      for (let i = 0; i < btnCcpMakeClipIds.length; i++) {
        el = document.querySelector(btnCcpMakeClipIds[i]);
        addEventHandler(el, 'mouseenter', tooltipTriggers, true);
      }
    }

    // !VA appController  
    // !VA Separate event listener setup for Tooltips. Managed separately from the main Toolbar and CCP element event handlers just for manageability's sake. NOTE: This should probably be merged with its sister handler, addTooltipEventListeners, somehow
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
      var btnCcpMakeClipIds = Object.values(iptCcpMakeClips);
      for (let i = 0; i < btnCcpMakeClipIds.length; i++) {
        el = document.querySelector(btnCcpMakeClipIds[i]);
        removeEventHandler(el, 'mouseenter', tooltipTriggers, true);
      }
    }

    // !VA appController  
    var setupEventListeners = function() {

      //DRAG AND DROP PROCESSING START
      // Event Listeners for Drag and Drop
      // !VA dropArea is the screen region that will accept the drop event 
      var dropArea = document.querySelector(dynamicElements.appContainer);
      dropArea.addEventListener('dragover', handleDragOver, false);
    
      // !VA Initiates the FileReader function to get the dropped image data
      dropArea.addEventListener('drop', handleFileSelect, false);
      // Drag and Drop Listener 
      //DRAG AND DROP PROCESSING END

      // !VA Add the click event listener for creating the isolate popup
      var runIsolateApp = document.querySelector(staticContainers.hdrIsolateApp);
      runIsolateApp.addEventListener('click', isolateApp, false);

      // !VA Event handler for initializing event listeners 
      function addEventHandler(oNode, evt, oFunc, bCaptures) {
        // console.log('oNode is: ' + oNode);
        // console.log('oNode.id is: ' + oNode.id);
        oNode.addEventListener(evt, oFunc, bCaptures);
      }

      // !VA CLICK HANDLERS
      // ------------------
      // !VA Add click and blur event handlers for clickable toolbarElements 
      const tbClickables = [ toolbarElements.btnTbrIncr50, toolbarElements.btnTbrIncr10, toolbarElements.btnTbrIncr01, toolbarElements.btnTbrDecr50, toolbarElements.btnTbrDecr10, toolbarElements.btnTbrDecr01  ];
      for (let i = 0; i < tbClickables.length; i++) {
        // !VA convert the ID string to the object inside the loop
        tbClickables[i] = document.querySelector(tbClickables[i]);
        addEventHandler(tbClickables[i],'click',handleMouseEvents,false);
      }
      
      // !VA Add click event handlers for Inspector clickable elements: Display Size, Small Phones and Large Phones values in the programmatically created SPAN tags
      const inspectorClickables = [ inspectorLabels.insDisplaySizeLabel, inspectorLabels.insSmallPhonesLabel, inspectorLabels.insLargePhonesLabel, inspectorValues.insDisplaySizeWidthValue, inspectorValues.insDisplaySizeHeightValue, inspectorValues.insSmallPhonesWidthValue, inspectorValues.insSmallPhonesHeightValue, inspectorValues.insLargePhonesWidthValue, inspectorValues.insLargePhonesHeightValue ];
      for (let i = 0; i < inspectorClickables.length; i++) {
        // !VA convert the ID string to the object inside the loop
        inspectorClickables[i] = document.querySelector(inspectorClickables[i]);
        addEventHandler(inspectorClickables[i],'click',CBController.doClipboard,false);
      }
      
      // !VA Add click handlers for Inspector - there's only the clipboard button now but there could be more. 
      var dvClickables = [ inspectorElements.btnToggleCcp ];
      for (let i = 0; i < dvClickables.length; i++) {
        // !VA convert the ID string to the object inside the loop
        dvClickables[i] = document.querySelector(dvClickables[i]);
        addEventHandler((dvClickables[i]),'click',appController.initCcp,false);
      }
      
      // !VA We need eventListeners for ALL the clipboard buttons so make an eventListener for each value in the iptCcpMakeClips object. We need a for in loop for objects
      for(let i in iptCcpMakeClips) {
        // !VA loop through the object that contain the id and func properties.
        let clipBut;
        if(iptCcpMakeClips.hasOwnProperty(i)){
          clipBut = document.querySelector(iptCcpMakeClips[i]);
          addEventHandler(clipBut,'click',CBController.doClipboard,false);
        }
      }
      
      // !VA Branch: OVERHAUL0825C
      // !VA Add event handlers for ALL individual radio input elements. Note that Toolbar clicks and blur events on text input elements are handled separately in handleMouseEvents. Radio elements have a separate handler because they need to be sorted by radio group and calling it from handleMouseEvents would just add another clause and more complexity to handleMouseEvents unnecessarity.  
      let rdoElements;
      for(let i in ccpUserInput) {
        if (ccpUserInput[i].substring( 15 ) === 'rdo') {
          rdoElements = document.querySelector(ccpUserInput[i]).getElementsByTagName('INPUT');
          for (const el of rdoElements) {
            addEventHandler(el,'click',handleRadioEvent,false);
          }
        }
      }

      // !VA Add event handlers for ALL individual checkbox input elements. They are sorted out in handleCheckboxEvent called here. Note that Toolbar clicks and blur events on text input elements are handled separately in handleMouseEvents. Checkbox elements have a separate handler because calling it from handleMouseEvents would just add another clause and more complexity to handleMouseEvents.  
      let chkElements;
      for(let i in ccpUserInput) {
        if (ccpUserInput[i].substring( 15 ) === 'chk') {
          chkElements = document.querySelector(ccpUserInput[i]).getElementsByTagName('INPUT');
          for (const el of chkElements) {
            addEventHandler(el,'click',handleCheckboxEvent,false);
          }
        }
      }

      // -----------------------
      // !VA Branch: implementClipboard01 (071020)
      // !VA Handle the Toolbar input elements separately from the Toolbar increment/decrement buttons because the buttons are handled by mouseclick or by default as mouseclicks when ENTER is pressed, so none of these handlers apply to those buttons. Includes eventListener handlers for keyboard and mouse blur events.
      const toolbarInputs = [ toolbarElements.iptTbrImgViewerW, toolbarElements.iptTbrCurImgW, toolbarElements.iptTbrCurImgH, toolbarElements.iptTbrSPhonesW, toolbarElements.iptTbrLPhonesW ];
      for (let i = 0; i < toolbarInputs.length; i++) {
        // !VA convert the ID string to the object inside the loop
        toolbarInputs[i] = document.querySelector(toolbarInputs[i]);
        // !VA KEYBOARD HANDLERS
        addEventHandler((toolbarInputs[i]),'keydown',handleKeydown,false);
        addEventHandler((toolbarInputs[i]),'keyup',handleKeyup,false);
        // addEventHandler((toolbarInputs[i]),'focus',handleFocus,false);
        // !VA MOUSE HANDLERS
        // !VA Handle the mouse-initiated blurring of inputs in the blur handler of handleMouseEvents
        addEventHandler((toolbarInputs[i]),'blur',handleBlur,false);
      }

      // !VA Add input event listeners to run showElementOnInput for all labelled text input elements, i.e. elements whose alias ends in Tfd, and unlabelled child input elements of the padding group container. Includes keyboard and mouse blur event listeners
      // !VA Loop through all the properties of ccpUserInput
      for (const property in ccpUserInput) {
        var el, iptId;
        // !VA Add event listeners for all labelled text input elements, i.e. those whose alias ends in Tfd. 
        if (property.includes('Tfd')) {
          iptId = ccpUserInput[property].replace('tfd', 'ipt');
          el = document.querySelector(iptId);
          // !VA KEYBOARD HANDLERS
          addEventHandler(el,'input',handleTextInputEvent,false);
          addEventHandler(el,'keydown',handleKeydown,false);
          addEventHandler(el,'keyup',handleKeyup,false);
          // addEventHandler(el,'focus',handleFocus,false);
          // !VA MOUSE HANDLERS
          addEventHandler(el,'blur',handleBlur,false);
        }
        // !VA Branch: 101520A
        // !VA This isn't where the padding icon handler is - it's above
        // !VA Add handler for the padding icon - turn it blue if a padding input has a value
        // addEventHandler(document.querySelector('#ccp-tda-padng-icn'),'blur',handleTextInputEvent,false);
      }

      
      // !VA Focus event handler to reset padding values.
      const pdngInputs = [ ccpUserInput.ccpTdaPdtopTfd, ccpUserInput.ccpTdaPdbtmTfd,ccpUserInput.ccpTdaPdlftTfd, ccpUserInput.ccpTdaPdrgtTfd ];
      for (let i = 0; i < pdngInputs.length; i++) {
      // console.log('pdngInputs[i] :>> ' + pdngInputs[i]);
        pdngInputs[i] = pdngInputs[i].replace('tfd', 'ipt');
        pdngInputs[i] = document.querySelector(pdngInputs[i]);
        // addEventHandler((pdngInputs[i]),'input',handlePaddingInput,false);
        addEventHandler((pdngInputs[i]),'focus',handlePaddingFocus,false);

      }


      // !VA HOVER HANDLERS
      // ------------------
      // !VA Add mouseover event handlers for Inspector clickable elements: Display Size, Small Phones and Large Phones values in the programmatically created SPAN tags
      const inspectorHoverables = [ inspectorLabels.insDisplaySizeLabel, inspectorLabels.insSmallPhonesLabel, inspectorLabels.insLargePhonesLabel, inspectorValues.insDisplaySizeWidthValue, inspectorValues.insDisplaySizeHeightValue, inspectorValues.insSmallPhonesWidthValue, inspectorValues.insSmallPhonesHeightValue, inspectorValues.insLargePhonesWidthValue, inspectorValues.insLargePhonesHeightValue ];
      for (let i = 0; i < inspectorHoverables.length; i++) {
        // !VA convert the ID string to the object inside the loop
        inspectorHoverables[i] = document.querySelector(inspectorHoverables[i]);
        // !VA IMPORTANT: WTF is this?
        addEventHandler(inspectorHoverables[i],'mouseenter',CBController.enteredMe,false);
      }

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
      // addEventHandler(ccpUserInput.ccpImgClassTfd,'blur',showMobileImageButtons,false);
      // ccpUserInput.ccpImgAltxtTfd.addEventListener('blur', showMobileImageButtons);
      // ccpUserInput.ccpImgClassTfd.addEventListener('blur', showMobileImageButtons);
      // ccpUserInput.ccpImgLoctnTfd.addEventListener('blur', showMobileImageButtons);
      
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
    // !VA appController  : hfs - FILEREADER OBJECT PROCESSING
    // !VA Includes all the FileReader processing for loading the image the user has dropped in the dropZone as blob, and initializing the image in the DOM.  
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
          // !VA NOTE: Review this. I'm not sure this has to be writing to the DOM now.
          document.querySelector(inspectorElements.insFilename).textContent = Appobj.fileName = fileName;

          // !VA Hide the dropArea - not sure if this is the right place for this.
          // !VA TODO: Make function
          document.querySelector(staticContainers.dropArea).style.display = 'none';
          // !VA  Once the current image has loaded, initialize the dinViewers by querying the current image properties from UICtrl and passing them to writeInspectors.
          function initInspectors() { 
            // !VA  Initialize the variable that will contain the new image's height, width, naturalHeight and naturalWidth
            // !VA Set a short timeout while the blob loads, then run the onload function before displaying the image and getting its properties. This is probably overkill, but noone will notice the 250ms anyway and better safe then no-workie. But now that the image is loaded, we can display it and get its properties.
            setTimeout(() => {
              // Once the blob is loaded, show it and get its data
              curImg.onload = (function() {
              // !VA Hide the drop area.
              // !VA TODO: Make function
                document.querySelector(staticContainers.dropArea).style.display = 'none';
                // !VA  Show the toolbar
                // !VA TODO: Make function
                document.querySelector(staticContainers.tbrContainer).style.display = 'flex';
                // !VA Display the current image
                // !VA TODO: Make function
                curImg.style.display = 'block';
                // !VA Calculate the viewer size based on the loaded image. Thetrue parameter indicates that a new image is being initialized
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
            document.querySelector(dynamicElements.curImg).style.display = 'none';
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
    // !VA appController  
    // !VA NOTE: This all should be enclosed in a function or at least an IIFE.
    document.addEventListener('DOMContentLoaded', function() {
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
          appBlocker = document.querySelector(staticContainers.appBlocker);
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
    // !VA appController   function
    function handleDragOver(evt) {
      //prevent the bubbling of the event to the parent event handler
      evt.stopPropagation();
      //prevent the default action of the element from executing -- so in this case
      //I think since it is a div the default event would be for some browsers to 
      //open the file in the browser when dropped
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }

    // !VA appController  
    // !VA Handle behavior when an element gets the focus. For all inputs except padding, this just selects the input. For padding, it cancels growing the current image by the left/right padding value. Otherwise, every time a left/right padding input is blurred, the current image would cumulatively grow by that amount. This resets the current image to its original size before any padding was applied.
    // !VA Branch: 0930A
    // !VA Appears to be deprecated - all this happens in handleBlur now.
    // function handleFocus(evt) {
    //   // console.log('handleFocus running'); 
    //   let imgInputObj = { };
    //   let propVal;
    //   // !VA Don't forget that it was the CSS user-select property that was causing the non-default input behavior in the Toolbar elements. That CSS property is disabled now, so all we have to do is this.select on focus for all alements
    //   this.select();
    //   if (evt.target.id.substring( 8, 13 ) === 'pdlft' || evt.target.id.substring( 8, 13 ) === 'pdrgt') {
    //     // !VA parseInt will return NaN if the string is empty, so skip padding handling unless there is a value in the left/right padding input element.
    //     if (evt.target.value !== '') {
    //       // !VA Set appObjProp value of the imgInputObj to curImgW - this is the current image whose width needs to be reset to the pre-padding value
    //       imgInputObj.appObjProp = 'curImgW';
    //       // !VA Set a temporary value to the current Appobj property for curImgW. This is the value that includes the padding value to subtract.
    //       propVal = Appobj.curImgW;
    //       // !VA Subtract the current padding value, i.e. evt.target.value from Appobj.curImgW. This returns Appobj.curImgW to the value it had before padding was added to it.
    //       Appobj.curImgW = propVal + parseInt(evt.target.value);
    //       // !VA Set the evtTargetVal property to the current Appobj.curImgW value
    //       imgInputObj.evtTargetVal = Appobj.curImgW;
    //       // !VA Update the current image width
    //       appController.initupdateCurrentImage(imgInputObj);
    //       // console.log('handleFocus - current image updated');
    //       // !VA Set the padding input value to empty - this is the value that will be handled by handleBlur or handleKeydown
    //       evt.target.value = '';
    //     }
    //   }
    // }

    // !VA appController   
    // !VA Called from handleKeyup. Runs when the user presses ESC to get outof an input element. If the user has made an entry in the input element, this cancels that entry and restores the input value to what it was prior to that entry based on the localStorage, placeholder or Appobj value. 
    function resetInputValue(evt) {
      console.log('resetInputValue');
      let target, appObjProp, curLocalStorage;
      target = evt.target;
      appObjProp = evtTargetIdToAppobjProp(evt.target.id );
      // !VA If the event target is the curImgW or curImgH input fields, on ESC exit the field and restore the placeholder set in the HTML file.
      if (appObjProp === 'curImgW' || appObjProp === 'curImgH') {
        target.value = ('');
        target.blur();
      } else if ( appObjProp.substr( 0, 6) === 'iptCcp' ) {
        // !VA IMPORTANT: DON'T FORGET THIS!!!!!! 
        // !VA If the event target is a CCP input field, set the input value to the last Appobj value for that property and blur
        target.value = (Appobj[appObjProp]);
        target.blur();
      } else {
        // !VA If the event target is imgViewerW, iptTbrSmallPhonesW and iptTbrLargePhonesW, on ESC exit the field and restore the preexisting value localStorage if it exists, if not, restore the default stored in the HTML placeholder. In any case, blur on ESC.
        curLocalStorage = appController.getLocalStorage();
        if (appObjProp === 'imgViewerW') {
          curLocalStorage[0] ? target.value = curLocalStorage[0] : target.value = document.querySelector(toolbarElements.iptTbrViewerW).placeholder;
        } else if (appObjProp === 'sPhonesW') {
          curLocalStorage[1] ? target.value = curLocalStorage[1] : target.value = document.querySelector(toolbarElements.iptTbrSPhonesWidth).placeholder;
        } else if (appObjProp === 'lPhonesW') {
          curLocalStorage[2] ? target.value = curLocalStorage[2] : target.value = document.querySelector(toolbarElements.iptTbrLPhonesWidth).placeholder;
        } else {
          console.log('ERROR in handleKeyup: localStorage value does not exist');
        }
        target.blur();
      }
    }

    // !VA appController  
    // !VA Called from handleKeydown. Applies the user-entered input value in the Toolbar or CCP, i.e. writes the value to Appobj and, if Toolbar, runs updateCurrentImage which then runs calcViewerSize to update the dynamicElements with the new value.
    // !VA NOTE: This is probably a functional dupe of updateCurrentImage
    function applyInputValue(userInputObj) {
      // !VA Destructure userInputObj into variables
      let { evtTargetVal, appObjProp } = userInputObj;
      let inputObj = {};
      // !VA If the target element value doesn't equal the existing Appobj value, then a new value was user-entered into the input element, so update Appobj with the new value. This is done in ALL cases, including curImgW and curImgH. Otherwise, evtTargetValue is unchanged, so do nothing, i.e. blur and leave the input value unchanged. An else clause is not necessary here, but it's included for possible error checking and console logging. 
      if ( evtTargetVal !== Appobj[appObjProp]) {
        Appobj[appObjProp] = evtTargetVal;
      } else {
        console.log('ERROR in applyInputValue - evtTargetValue !== Appobj[appObjProp]. applyInputValue probably running successively');
      }
      // !VA 3) For toolbarElements, create a new obj with evtTargetVal and appObjProp to pass to updateCurrentImage. updateCurrentImage writes new values to localStorage and resizes the dynamicElements based on the user input. updateCurrentImage contains the aspect ratio logic to get the adjacent dimension from a curImg value. 
      // !VA IMPORTANT: This works but it sucks. We're only running this now to set the localStorage and to get the adjacent side curImg dimensions. updateCurrentImage doesn't reflect what's being done in that function, and it should be reevaluated in any case. Also, the below condition with all the OR conditions isn't good - but for now, need to move on.
      if (appObjProp === 'curImgW' || appObjProp === 'curImgH' || appObjProp === 'imgViewerW' || appObjProp === 'sPhonesW' || appObjProp === 'lPhonesW' ) {
        inputObj.evtTargetVal = Appobj[appObjProp];
        inputObj.appObjProp = appObjProp;
        updateCurrentImage(inputObj);
      }
    }

    // !VA appController private
    // !VA Branch: 101420A
    // !VA Called from eventHandlers. This function is necessary because the input event does not register input changes resulting from the focus event. On focus, the value of the input resets to '', i.e. empty. Consequently, all dependent inputs, i.e. the TD height and width and TBL width, as well as the curImg dimensions, have to recalc based on the on-focus empty value of the target input. 
    function handlePaddingFocus(evt) {
      console.log('handlePaddingFocus running'); 
      let userInputObj = {};
      // !VA Get the Appobj/ccpUserInput alias from the target id
      userInputObj.appObjProp = evtTargetIdToAppobjProp(evt.target.id);


      if  ( userInputObj.appObjProp.substring( 6 , 11 ) === 'Pdrgt' || userInputObj.appObjProp.substring( 6 , 11 ) === 'Pdlft') {
        console.log('Mark1 userInputObj.appObjProp :>> ' + userInputObj.appObjProp);
        // !VA evtTargetVal is the value the user entered into the input element.
        var foo = Number(-evt.target.value);
        console.log('foo :>> ' + foo);
        userInputObj.evtTargetVal = foo;
      } else {
        console.log('Mark2 userInputObj.appObjProp :>> ' + userInputObj.appObjProp);
        userInputObj.evtTargetVal = Number(evt.target.value);
      }
      handlePadding( 'handlePaddingFocus', userInputObj);

      // console.log('handlePaddingFocus running'); 
      // console.log('handlePaddingFocus Appobj.ccpTdaPdtopTfd :>> ' + Appobj.ccpTdaPdtopTfd);
      // console.log('handlePaddingFocus Appobj.ccpTdaPdbtmTfd :>> ' + Appobj.ccpTdaPdbtmTfd);
      // console.log('handlePaddingFocus Appobj.ccpTdaPdrgtTfd :>> ' + Appobj.ccpTdaPdrgtTfd);
      // console.log('handlePaddingFocus Appobj.ccpTdaPdlftTfd :>> ' + Appobj.ccpTdaPdlftTfd);
      this.select();
    }

    // !VA appController private
    function handlePaddingInput(userInputObj) {
      console.log('handlePaddingInput running');
      let { appObjProp, evtTargetVal } = userInputObj;
      // !VA Here we do nothing except pass userInputObj from the input event. The input event handles padding height inputs.
      // !VA evtTargetVal has already been converted to type 'number', so if it is not a number, then it is NaN. If it is NaN, exit the handler and let the error-check proceed on blur.
      if (isNaN( evtTargetVal )) {
        return;
      } else {
        // !VA If evtTargetVal is a number and the target element is a height padding input, then pass userInputObj to handlePadding for padding processing.
        if  ( appObjProp.substring( 6 , 11 ) === 'Pdtop' || appObjProp.substring( 6 , 11 ) === 'Pdbtm') {
          // !VA Set the Appobj property of appObjProp. For padding width inputs, this is done in handleUserInput.
          Appobj[appObjProp] = evtTargetVal;
          handlePadding('handlePaddingInput', userInputObj);
        }
      }
      // console.log('handlePaddingInput Appobj.ccpTdaPdtopTfd :>> ' + Appobj.ccpTdaPdtopTfd);
      // console.log('handlePaddingInput Appobj.ccpTdaPdbtmTfd :>> ' + Appobj.ccpTdaPdbtmTfd);
      // console.log('handlePaddingInput Appobj.ccpTdaPdrgtTfd :>> ' + Appobj.ccpTdaPdrgtTfd);
      // console.log('handlePaddingInput Appobj.ccpTdaPdlftTfd :>> ' + Appobj.ccpTdaPdlftTfd);
    }

    // !VA appController  
    // !VA Branch: 101520A
    function handlePaddingBlur(userInputObj) {
      console.log('handlePaddingBlur running'); 
      // console.log('handlePaddingBlur userInputObj :>> ');
      // console.log(userInputObj);
      // !VA Here we do nothing except pass userInputObj from the blur event. The blur event handles padding width inputs.
      handlePadding('handlePaddingBlur', userInputObj);
      

      // console.log('handlePaddingBlur Appobj.ccpTdaPdtopTfd :>> ' + Appobj.ccpTdaPdtopTfd);
      // console.log('handlePaddingBlur Appobj.ccpTdaPdbtmTfd :>> ' + Appobj.ccpTdaPdbtmTfd);
      // console.log('handlePaddingBlur Appobj.ccpTdaPdrgtTfd :>> ' + Appobj.ccpTdaPdrgtTfd);
      // console.log('handlePaddingBlur Appobj.ccpTdaPdlftTfd :>> ' + Appobj.ccpTdaPdlftTfd);

    }

    function handlePadding( caller, userInputObj ) {
      // console.clear();
      console.log(`handlePadding called by ${caller} running`);
      console.log('handlePadding Appobj.ccpTdaPdtopTfd :>> ' + Appobj.ccpTdaPdtopTfd);
      console.log('handlePadding Appobj.ccpTdaPdbtmTfd :>> ' + Appobj.ccpTdaPdbtmTfd);
      console.log('handlePadding Appobj.ccpTdaPdrgtTfd :>> ' + Appobj.ccpTdaPdrgtTfd);
      console.log('handlePadding Appobj.ccpTdaPdlftTfd :>> ' + Appobj.ccpTdaPdlftTfd);
      let tmp, reflectArray;
      let imgInputObj = {}, configObj = {};
      // !VA Destructure userInputObj
      let { appObjProp, evtTargetVal } = userInputObj;
      evtTargetVal = Number(evtTargetVal);
      // !VA If appObjProp is lft/rgt, then userInputObj comes from handlePaddingBlur and curImgW is modified. Note: evtTargetVal is error-checked in handleBlur.
      if  ( appObjProp.substring( 6 , 11 ) === 'Pdrgt' || appObjProp.substring( 6 , 11 ) === 'Pdlft') {
        console.log('appObjProp :>> ' + appObjProp);
        // !VA Update curImg by the current event target's Appobj property value
        // !VA Branch: 101520B
        // !VA No, update it by the evtTargetVal, the Appobj propery is always positive. To reset curImgW to the prior state, the negative value from handlePaddingFocus needs to be used. 
        imgInputObj.evtTargetVal = Appobj.curImgW - ( evtTargetValga);
        // !VA Set Appobj.curImgW to imgInputObj to the shrunk image's width
        Appobj.curImgW = imgInputObj.evtTargetVal;
        // !VA Now set the Appobj property of the current image element to be shrunk, i.e. curImgW.
        imgInputObj.appObjProp = 'curImgW';
        // !VA Shrink the image
        // !VA Branch: 101420A
        // !VA updateCurrentImage sets Appobj.ccpTblWidthTfd to curImgW. Override that here to display the padding-dependent value for TBL width.
        console.log('imgInputObj :>> ');
        console.log(imgInputObj);
        tmp = Appobj.ccpTblWidthTfd;
        appController.initupdateCurrentImage(imgInputObj);
        console.log('tmp :>> ' + tmp);
        Appobj.ccpTdaWidthTfd = Appobj.ccpTblWidthTfd = tmp;
        console.log('Appobj.curImgW is modified :>> ' + Appobj.curImgW);
        reflectArray = [ 'ccpTdaWidthTfd', 'ccpTblWidthTfd' ];
      // !VA If appObjProp is top/btm, then userInputObj comes from handlePaddingInput and curImgW is NOT modified. Note: evtTargetVal is NaN-checked in handlePaddingInput, complete error-checking doesn't happen until the input is blurred.
      } else {
        console.log('appObjProp :>> ' + appObjProp);
        console.log('Appobj.curImgW is NOT Modified :>> ' + Appobj.curImgW);
        Appobj.ccpTdaHeigtTfd = Appobj.curImgH + Number(Appobj.ccpTdaPdtopTfd) + Number(Appobj.ccpTdaPdbtmTfd);
        console.log('Appobj.ccpTdaHeigtTfd :>> ' + Appobj.ccpTdaHeigtTfd);

        reflectArray = [ 'ccpTdaHeigtTfd' ];
      }
      configObj = {
        reflectAppobj: { reflect: reflectArray }
      };

      if (Appobj[appObjProp] !== '') {

        UIController.configCCP( configObj );
      }

    }

    // !VA appController  Branch 101520B
    // !VA Called from input event handler in setupEventListeners. This replicates handleKeydown in that it calls handleUserInput to do error checking, then handles how the input elements respond to the return values. The IIFE emulates how preventDefault works on the TAB key if handleUserInput returns false, i.e. highlight the input value and keep the focus in the field so the user can accept the value or blur out of the input with mouse click or TAB.
    function handleBlur(evt) {
      console.log('Appobj.ccpTdaPdrgtTfd :>> ' + Appobj.ccpTdaPdrgtTfd);
      // console.log('handleBlur running'); 
      // !VA Create the object to store the Appobj property and current input value
      let userInputObj = {};
      let retVal;
      // !VA Get the Appobj/ccpUserInput alias from the target id
      userInputObj.appObjProp = evtTargetIdToAppobjProp(evt.target.id);
      // !VA evtTargetVal is the value the user entered into the input element.
      userInputObj.evtTargetVal = evt.target.value;
      // !VA Now that userInputObj is created for passing as argument, destructure it to use appObjProp  locally.
      let { appObjProp } = userInputObj;
      // !VA Get the return val from handlerUserInput - empty string, valid input or FALSE for error. Note; handleUserInput also sets the Appobj property of appObjProp if the input is valid.
      retVal = handleUserInput(userInputObj);
      // !VA Branch: 100920A
      // !VA Make sure evtTargetVal is a number before handling the padding blur.
      if (typeof(retVal) === 'number') {
        console.log('handleBlur retVal is Number...');
        userInputObj.evtTargetVal = retVal;
        if ( evt.target.id.substring( 8 , 10 ) === 'pd') {
          // !VA If the blurred input is empty, do nothing. Otherwise, handle padding.
          handlePaddingBlur( userInputObj );
        }
      } else {
        console.log('handleBlur retVal is Not a Number...');
        // console.log('Appobj.ccpTdaPdtopTfd :>> ' + Appobj.ccpTdaPdtopTfd);
        // console.log('Appobj.ccpTdaPdbtmTfd :>> ' + Appobj.ccpTdaPdbtmTfd);
        // console.log('Appobj.ccpTdaPdrgtTfd :>> ' + Appobj.ccpTdaPdrgtTfd);
        // console.log('Appobj.ccpTdaPdlftTfd :>> ' + Appobj.ccpTdaPdlftTfd);

      }

      // !VA Branch: 0930A
      // !VA TMP Utility function to determine if CCP or Toolbar element
      // if (appObjProp.length === 14) {
      //   console.log('CCP element');
      // } else {
      //   console.log('Toolbar element');
      // }

      // !VA If error, emulate preventDefault on the blur event. Blur does not support preventDefault. Select the target's value. Select doesn't work with blur because the focus is already out of the field before the select() method can be invoked on the input element. To fix, set timeout 10ms, then shift it back to run the rest of the handler. The focus() method selects the input value by default. Alternatively, it should be possible to use focusout instead of blur, which does support preventDefault, but this works just as well for now.
      if (retVal === false) {
        // !VA Shift the focus back to the target element.
        setTimeout(() => {
          this.focus();
          this.select();
        }, 10);


        // !VA Now run the rest of the error handler
        if ( appObjProp === 'curImgW' || appObjProp === 'curImgH') {
          this.value = '';
        } else {
          this.value = Appobj[ appObjProp ];
          this.select();
        }
        // !VA If retVal is a valid value, set the value of the curImgW and curImgH inputs to empty so the placeholder text displays.
      } else {
        if ( appObjProp === 'curImgW' || appObjProp === 'curImgH') {
          this.value = '';
        }
      }
    }

    // !VA appController   
    // !VA Called from tbClickables event handler. Handles clicks on the Toolbar increment/decrement buttons and handles blur for Toolbar and ccpUserInput input elements, which facilitates error-checking and applying values on blur with the mouse, allowing users to mouse through inputs, entering values as they go without having to press TAB or ENTER. To do this, it dispatches a keydown keyboardEvent for the TAB key to the current input element to simulate the keypress. Also handles drop and dragover events, applying preventDefault.
    function handleMouseEvents(evt) {
      // console.log('handleMouseEvents running'); 
      // !VA elId adds the hash to evt.target.id
      let elId = '#' + evt.target.id;
      // !VA val is a temporary variable to mutate evt.target.value into Appobj.curImgW. retVal is the value returned by checkNumericInput, i.e. either an integer or false if validation fails. 
      let val, retVal;
      // !VA Branch: implementClipboard01 (071020)
      // !VA userInputObj is required by checkNumericInput
      let userInputObj = { };
      // !VA Branch: implementCcpInput09 (070220)
      // !VA There was a try/catch here but I don't know what it was supposed to catch - see earlier versions
      // !VA Handle the click event
      if (evt.type === 'click') {
        // !VA Set userInputObj.appObjProp to curImgW because that is the Appobj property that the increment/decrement buttons modify
        userInputObj.appObjProp = 'curImgW';
        // !VA Get the 8 char identifier for Toolbar buttons. These are the increment/decrement buttons
        if ( elId.substr( 0, 8 ) === '#btn-tbr') {
          // !VA Get the last two chars of the id and convert to integer -- this is the value to be incremented/decremented
          val = parseInt(elId.slice(-2));
          // !VA If the target ID includes 'incr' then the image dimension will be incremented, if 'decr' then it will be decremented
          (elId.includes('incr')) ? val : val = -val;
          // !VA Add val to the current imgW to get the value to be passed to checkNumericInput for error parsing.
          val = Appobj.curImgW + val;
          // !VA Now set userInput.evtTargetVal to the updated val pass userInputObj to checkNumericInput for validation.
          userInputObj.evtTargetVal = val;
          retVal = checkNumericInput(userInputObj);
          // !VA If checkNumericInput is not false, pass the curImgW property name and evtTargetVal to updateCurrentImage to update Appobj.curImgW and resize the dynamicElements accordingly. If it returns false, then an error message is displayed, so return without updating any values or dynamicElements.
          if (retVal !== false ) {
            updateCurrentImage(userInputObj);
          } else {
            return;
          }
        }

      } else if ( event.type === 'drop') {
        evt.preventDefault;
        // !VA TODO: Revisit this
      } else if ( event.type === 'dragover') {
        evt.preventDefault;
      } else {
        console.log('ERROR in handleMouseEvents - unknown event type');
      }
    }

    // !VA appController  
    // !VA Called from handleKeydown to handle CCP element user input. Runs checkUserInput to check for error conditions and returns either an empty string, a valid value or FALSE to handleKeydown.
    // !VA NOTE: There was a priorVal variable earlier that stored evt.target.val for use with CCP inputs because at that time CCP inputs weren't immediately stored in Appobj. Keep an eye on that - currently all CCP values are stored to Appobj.
    function handleUserInput( userInputObj ) {
      // console.log('handleUserInput running'); 
      let retVal;
      let tbrIptAliases = [], imgIptAliases = [], ccpIptAliases = [];
      // let configObj = {};
      let { appObjProp, evtTargetVal } = userInputObj;
      // console.log('handleUserInput userInputObj is: ');
      // console.log(userInputObj);
      // !VA Array of Toolbar input element aliases
      tbrIptAliases = [ 'imgViewerW', 'curImgW', 'curImgH', 'sPhonesW', 'lPhonesW'];
      // !VA Array of 'irregular' Toolbar input element aliases, i.e. curImgW and curImgH. These have different input processing than the other Toolbar input elements.
      imgIptAliases = [ 'curImgW', 'curImgH'];
      // !VA Create an array of the CCP input element aliases
      for (const key of Object.keys(ccpUserInput)) {
        if ( key.substring( 11, 14)  === 'Tfd') {
          ccpIptAliases.push(key);
        }
      }
      // !VA If evtTargetVal is empty, process it first so empty strings won't be passed to checkUserInput for error checking. This prevents checkUserInput from flagging empty strings as errors and returning false on them. 
      if ( evtTargetVal === '') {
        // !VA If the target is curImgW or curImgH or a Ccp input, then the user has exited the field without entering a value, or has deleted the default value and exited the field. In this case, return the empty value without further action.
        if ( imgIptAliases.includes( appObjProp) || (ccpIptAliases.includes( appObjProp ))) {
          // console.log('EMPTY VALUE IN curImgW, curImgH or a CCP Input');
          // !VA If the target is a CCP input, set its Appobj property to empty, because CCP inputs are optional, that is, if they are empty will not be written to the Clipboard output. In contrast, Toolbar inputs, including curImgW and curImgH always require a value because they represent containers and the current image, which can't have a null width. 
          if ( ccpIptAliases.includes( appObjProp)) {
            // console.log('EMPTY VALUE IN CCP Input: Appobj[appObjProp = EMPTY');
            evtTargetVal = userInputObj.evtTargetVal = Appobj[appObjProp] = '';
          }
        }
        // !VA Set retVal to an empty string for returning to handleKeydown
        retVal = '';
      // !VA If the target does have a value other than an empty string, it needs to be error-checked.
      } else {



        // !VA First, check the input and get the return value - it will either be a valid value or FALSE if the error check detected an input error.
        retVal = checkUserInput( userInputObj );

        // !VA If the value is valid, i.e. checkUserInput did not return false
        if (retVal !== false) {
          // !VA Branch: 0930A

          

          // !VA If the target is a toolbar element, apply the input value, i.e. write to Appobj and update the Inspector panel.
          if ( tbrIptAliases.includes( appObjProp )) {
            // console.log('TOOLBAR INPUT: VALUE APPIED');
            // !VA Replace userInputObj.evtTargetVal with retVal here, otherwise userInputObj.evtTargetVal will be passed to applyInputValue as type 'string'
            userInputObj.evtTargetVal = retVal;
            applyInputValue(userInputObj);
          // !VA If the target is a CCP element, set the Appobj property value to the value returned from checkUserInput
          } else if ( ccpIptAliases.includes( appObjProp )) {
            console.log('handleUserInput CCP INPUT: VALUE APPLIED');
            evtTargetVal = userInputObj.evtTargetVal = Appobj[appObjProp] = retVal;
          }
        // !VA Otherwise, checkUserInput returned false so the target value is invalid. Return FALSE to handleKeydown for TAB and ENTER key handling.
        } else {
          // !VA Conditions: 1) if the target is a toolbar input other than curImgW or curImgH, then restore the input value to its Appobj property. 2) If the target is curImgW or curImgH, restore the value to its Appobj property. Further handling will be done in handleKeydown. 3) If the target is a CCP input, restore it to priorVal. This is because CCP don't always reflect the Appobj value - at leas they didn't in earlier versions. I will have to keep an eye on that. 
          console.log('handleUserInput: checkUserInput returned false; the user input was invalid');
        }
      }
      // !VA Return either the valid value or FALSE to handleKeyDown
      return retVal;
    }

    // !VA appController function
    // !VA NOTE: Tab needs to be in a keyDown because keyup is too late to trap the value before the default behavior advances ot the next field.
    // !VA Handles keyboard input for all UI elements. Called from event listeners for tbKeypresses and ccpKeypresses. Calls checkUserInput which validates the input and returns either an integer or a string and passes the value to applyInputValue to write to Appobj and the DOM. Then, for curImgW/curImgH, sets the input value to '' so the placeholder shows through. For all other input elements, sets the input value to the respective Appobj property.
    function handleKeydown(evt) {
      // console.log('handleKeydown running'); 
      let retVal;
      // !VA Get the keypress
      let keydown = evt.which || evt.keyCode || evt.key;
      // !VA userInputObj is the array containing the values needed to evaluate input based on whether the target is a Toolbar element or a CCP element. userInputObj includes the target's value and Appobj property/ccpUserInput alias.
      const userInputObj = { };
      // !VA If TAB or ENTER
      if (keydown == 9 || keydown == 13) {
        // !VA evtTargetIdToAppobjProp gets the Appobj key that corresponds to a given element ID. Write that Appobj property/ccpUserInput alias to the appObjProp property of the userInputObj object.
        userInputObj.appObjProp = evtTargetIdToAppobjProp(evt.target.id);
        // !VA evtTargetVal is the value the user entered into the input element.
        userInputObj.evtTargetVal = evt.target.value;
        // !VA Now that userInputObj is created for passing as argument, destructure it to use appObjProp locally.  
        let { appObjProp } = userInputObj;
        // !VA Branch: 0922A
        // !VA Call handleUserInput to validate the user input and process it based on the input type (i.e. Toolbar or CCP input). retVal will return either an empty string, a valid value, or FALSE if checkUserInput detects an input error.
        if (keydown === 13) {
          console.log('ENTER key');
          retVal = handleUserInput(userInputObj);
          if ( retVal === false) { 

            if ( appObjProp === 'curImgW' || appObjProp === 'curImgH') {
              // console.log('HIT');
              this.select();
              this.value = '';
            } else {
              this.value = Appobj[appObjProp];
              this.select();
            }
          } 
        } else if ( keydown === 9) {
          // console.log('TAB key');
          // handleBlur( 'TAB', userInputObj );

        }
      }
    }


    

    // !VA appController  
    // !VA TODO: Why are there unused elements and what is actually happening here?
    // !VA keyPress handler for the ESC key.  This has to be` handled on keyup, so we need a separate handler for it.
    function handleKeyup(evt) {
      let keyup;
      // !VA Find out which key was struck
      keyup = evt.which || evt.keyCode || evt.key;
      // !VA  On ESC, we want curImgW and curImgH to exit the field and go back to showing the placeholders defined in the CSS. This is because these values are already provided in the inspectorElements and there's no need to recalc the W and H each time the user makes an entry - that would just be confusing. For imgViewerW, sSphonesW and lPhonesW, revert to the previously displayed value if the user escapes out of the input field. The previously displayed value will be either 1) the default in the HTML placeholder attribute or 2) the localStorage value. So, the localStorage value is false, get the placeholder, otherwise get the localStorage value. This is handled in resetInputValue.
      // !VA Esc key
      if (keyup == 27 ) {
        // !VA We only need the property here, so no need to create an args object. We could actually just use the target but since we're standardizing on property names, let's stick with that. Get the property name from the id of this, i.e. the event target
        resetInputValue(evt);
      }
    }

    // !VA appController  
    // !VA Called from handleKeydown and handleMouseEvents. Separates numeric input from string input based on the Appobj property name included in two arrays. Numeric input is routed to checkNumericInput where values of type string are converted to integers. String inputs are routed to checkTextInput for valiation and error checking. 
    function checkUserInput(userInputObj) {
      // !VA Destructure userInputObj, making variables instead of constants
      let { appObjProp, evtTargetVal } = userInputObj;
      // console.log('checkUserInput appObjProp is: ' + appObjProp);
      // console.log('userInputObj.appObjProp.substring( 0 , 3 ) is: ' + userInputObj.appObjProp.substring( 0, 3 ));
      // !VA Distinguish between elements that allow percent input, elements that allow string input and elements that allow numeric input. Percent inputs validate the percent value and return it with no further error checking. Numeric input elements have validation with error codes that display error messages. String inputs have no validation currently, but validation for hex color codes might be an option.
      let numericInputs, stringInputs, retVal, percentVal, percentInputs;
      percentInputs = [ 'ccpTdaWidthTfd', 'ccpTblWidthTfd', 'ccpTbwWidthTfd']
      numericInputs = [ 'imgViewerW', 'curImgW', 'curImgH',  'sPhonesW', 'lPhonesW', 'ccpTdaHeigtTfd', 'ccpTdaWidthTfd', 'ccpTdaPdtopTfd', 'ccpTdaPdrgtTfd', 'ccpTdaPdbtmTfd', 'ccpTdaPdlftTfd', 'ccpTblWidthTfd', 'ccpTblMaxwdTfd', 'ccpTbwWidthTfd', 'ccpTbwMaxwdTfd' ];
      stringInputs = ['ccpImgClassTfd', 'ccpImgAltxtTfd', 'ccpImgAnchrTfd', 'ccpImgTxclrTfd', 'ccpImgLoctnTfd', 'ccpTdaClassTfd', 'ccpTdaBgclrTfd', 'ccpTdaTxclrTfd', 'ccpTdaBdclrTfd', 'ccpTblClassTfd', 'ccpTblBgclrTfd', 'ccpTbwClassTfd', 'ccpTbwBgclrTfd' ];

      // !VA Determine if the numeric portion of evtTargetVal; is a valid percent value 
      function checkPercent(val) {
        console.log('checkPercent running'); 
        let x, percentVal;
        // !VA Slice the percent sign off of evtTargetVal to test the rest of the value for valid percent
        val = evtTargetVal.slice( 0, -1 );
        // !VA Test val for valid percent
        x = parseFloat(val);
        // !VA Test if the value is in percentage range
        if (isNaN(x) || x < 0 || x > 100) {
          // !VA If it is out of range, return false
          console.log('Out of range');
          percentVal = false;
        } else {
          // !VA If it is within the valid percentage range, add the percent character back at the end and return it - it now has the type 'string'
          console.log('valid percent');
          percentVal = x + '%';
        }
        return percentVal;
      }
      // !VA If the last char of evtTargetVal is a percent char, test if it is a valid percent value
      if ( evtTargetVal.substr(-1) === '%') {
        percentVal = checkPercent(evtTargetVal);
      }
      // !VA If evtTargetVal ended in a percent char and the target element is in the list of elements that accept percentage values, set retVal to percentVal and return it
      if (percentInputs.includes(appObjProp) && evtTargetVal.substr(-1) === '%' ) {
        console.log('percentVal');
        retVal = percentVal;
      // !VA If appObjProp is included in the numericInputs array (which includes all of the UI elements that require numeric input), then run checkNumericInput on the contents of userInputObj. Check numeric input returns false if the integer validation fails, otherwise it converts the numeric string to number where appropriate returns userInputObj.evtTargetVal as integer
      } else if (numericInputs.includes( appObjProp )) { 
        // !VA If the target is a CCP input and it is empty, don't do the validation. For CCP inputs, if the field is empty, the respective property won't get written to the clipboard, so an empty value has functional value. This is in contrast to the Toolbar inputs, where a value is required.
        if ( userInputObj.appObjProp.substring( 0, 3 ) === 'ccp' && userInputObj.evtTargetVal === '' ) {
          // !VA The CCP input field is empty - do nothing.
          // !VA Branch: 0917A
          // console.log('Do nothing');
        }
        else if ( appObjProp === 'curImgW' && evtTargetVal === '' || appObjProp === 'curImgH' && evtTargetVal === '' ) {
          console.log('The CCP input field is empty - do nothing.');
        // !VA If curImgW or curImgH is empty, do nothing.
        } else {
          // !VA Error check the numeric input
          retVal = checkNumericInput( {appObjProp, evtTargetVal } ); 
        }
      }           
      // !VA Currently no string validation implemented, so the function just returns the argument unchanged
      else if (stringInputs.includes( userInputObj.appObjProp )) {
        console.log('String...');
        retVal = checkTextInput(userInputObj);
      }
      else {
        console.log('ERROR in checkUserInput - unknown data type');
      }
      return retVal;
    }

    // !VA  Parsing keyboard input based on Appobj property passed in from handleKeyup/checkUserInput.
    // !VA TODO: Why are there unused variables and what is actually happening here?
    // !VA appController private
    // !VA Called from checkUserInput. Runs validateInteger to return a value of type Number, then evaluates any error conditions on the input and passes any error codes generated to appController.handleAppMessages and returns false if there was an error, or the integer value of no error was detected.
    function checkNumericInput(userInputObj) {
      // console.clear();
      console.log(userInputObj);

      // !VA Destructure userInputObj
      // !VA The code that will be passed to getAppMessageStrings
      let appMessCode, isErr, retVal;
      // !VA Temporary variables
      let foo, faa, baz;
      // !VA The flag indicating an error condition,
      isErr = false;
      // !VA TODO: Setting maxViewerWidth just for now
      var maxViewerWidth = 800;
      // !VA If appObjProp refers to one of the CCP elements that require numeric input
      // !VA First, validate that the user-entered value is an integer. validateInteger returns false if the input is either not an integer or is not a string that can be converted to an integer. Otherwise, it returns the evtTargetVal as a number.


      retVal = validateInteger(userInputObj.evtTargetVal);
      // !VA Branch: 100720
      // !VA userInputObj.evtTargetVal was passed in as string. Replace it with the validated integer in case it needs to be consoled or passed. Continue to use retVal as the current evt.target value.
      userInputObj.evtTargetVal = retVal;
      // !VA Now destructure to get appObjProp. For the value, continue to use retVal.
      const { appObjProp } = userInputObj;

      // !VA If validateInteger returned false to retVal, then there is an error condition with the input value.
      if (!retVal) {
        // !VA NOTE: This is where we could easily trap the negative button increment if it falls below 0 to send a different message than just the standard 'not_Integer' message. Revisit.
        appMessCode = 'err_not_Integer';
        isErr = true;
      // !VA If retVal is not false then it contains an integer value, so begin the error checking on the numeric input
      } else {
        // !VA The input is an integer, so handle the error cases for the user input
        switch (true) {
        case (appObjProp === 'imgViewerW') :
          // !VA The user has selected a imgViewerW that's smaller than the currently displayed image. Undetermined how to deal with this but for now the current image is shrunk to the selected imgViewerW. But Appobj is not updated accordingly, needs to be fixed.
          // !VA Branch: 100720
          // !VA The above is incorrect, Appobj is in fact updated when shrinking image to new imgViewerW 
          if (evtTargetVal < Appobj.curImgW ) {
            // !VA Do nothing for now, see above.
          } else if (evtTargetVal > maxViewerWidth ) {
            // !VA TODO: review the maxViewerWidth issue, but for now set it to 800px - and the user-entered value exceeds this, so error.
            isErr = true;
            appMessCode = 'err_viewerW_GT_maxViewerWidth';
          } else {
            // !VA first write val to the imgViewerW input's value
            // document.querySelector(dynamicElements.imgViewer).value = val;
            // !VA  The imgViewerW is greater than the curImgW so we can go ahead and widen the imgViewerW with no affecton the current image and without running calcViewerSize. So, return no error and continue in handleKeyup.
            isErr = false;
          }
          break;
          // !VA Handle the imagewidth toolButton input
        case (appObjProp === 'curImgW') :
          // !VA If the new image width is greater than the viewer width, then show message. 
          if (retVal > Appobj.imgViewerW ) {
            // !VA errorHandler!
            isErr = true;
            appMessCode = 'err_imgW_GT_viewerW';
          }
          break;
        // !VA TODO: Handle the imageheight toolButton input
        case (appObjProp === 'curImgH') :
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
        // !VA Doesn't apply to the excludeimg option because that functionally doesn't have an img in the cell, so the error doesn't apply - exclude rdoCcpTdExcludeimg from the error condition
        case (appObjProp === 'ccpTdaHeigtTfd' && !Appobj.rdoCcpTdExcludeimg ) :
          if (retVal < Appobj.curImgH ) {
            // !VA errorHandler!
            isErr = true;
            appMessCode = 'err_cell_smaller_than_image';
          }
          break;
        // !VA Doesn't apply to the excludeimg option because that functionally doesn't have an img in the cell, so the error doesn't apply - exclude rdoCcpTdExcludeimg from the error condition
        case (appObjProp === 'ccpTdaWidthTfd') :
          if (Appobj.rdoCcpTdExcludeimg) { 
            if ( Appobj.ccpTblWidthTfd === '' ) {
              console.log('Appobj.ccpTblWidthTfd is EMPTY');
            }
            else if ( retVal > Appobj.ccpTblWidthTfd ) {
              isErr = true;
              appMessCode = 'err_table_cell_wider_than_parent_table';
            }
          } 
          if ( retVal > Appobj.imgViewerW ) {
            isErr = true;
            appMessCode = 'err_cell_wider_than_parent_table';
          }
          break;
        case (appObjProp === 'ccpTblWidthTfd') :
          if (Appobj.rdoCcpTdExcludeimg) {
            if (retVal > Appobj.imgViewerW) {
              isErr = true;
              console.log('larger than imgViewerW');
              appMessCode = 'err_table_wider_than_wrapper';
            } else if ( evtTargetVal < Appobj.ccpTdaWidthTfd ) {
              console.log('err_table_cell_wider_than_parent_table');
              isErr = true;
              appMessCode = 'err_table_cell_wider_than_parent_table';
            }
          } else {
            if (retVal < Appobj.curImgW ) {
              // !VA errorHandler!
              isErr = true;
              appMessCode = 'err_img_wider_than_parent_table';
            } else if ( evtTargetVal > Appobj.imgViewerW ) {
              isErr = true;
              appMessCode = 'err_parent_table_wider_than_wrapper_table';
            }
          }
          break;
        case (appObjProp === 'ccpTbwWidthTfd') :
          if (Appobj.rdoCcpTdExcludeimg) {
            if (retVal > Appobj.imgViewerW) {
              isErr = true;
              console.log('');
              appMessCode = 'err_wrapper_table_wider_than_devicewidth';
            } else if ( evtTargetVal < Appobj.ccpTblWidthTfd ) {
              console.log('err_parent_table_greater_than_wrapper');
              isErr = true;
              appMessCode = 'err_parent_table_greater_than_wrapper';
            }
          } else {
            if (retVal < Appobj.curImgW ) {
              // !VA errorHandler!
              isErr = true;
              appMessCode = 'err_img_wider_than_parent_table';
            } 
          }
          break;
        case (appObjProp.substring( 6, 8) === 'Pd') :
   

          // !VA See paddingErrorHandling_100720A.txt



          break;
        default:
          console.log('ERROR in checkNumericInput - unknown condition in case/select');
        }
      } 
      // !VA Error condition - pass the appMessCode to handleAppMessages
      if (isErr) {
        // !VA IF Error pass the code to errorHandler to get the error message
        appController.handleAppMessages( appMessCode );
      } else {
        // !VA If no error, pass false back to handleKeyup and continue.
        isErr = false;
      }
      // !VA If an error was detected, return false to the event handler to determine how the error will be displayed in the input field
      if (isErr) { retVal = false; }
      console.log('retVal :>> ' + retVal);
      return retVal;
    }

    // !VA appController  
    // !VA Called by checkUserInput. Includes any validation or error checking on input elements that take values of type string. Only applies to CCP input elements that take text input, as defined in handleKeydown. i.e. class, alt, relpath, bgcolor, etc input elements. 
    function checkTextInput(userInputObj) {
      let retVal;
      // !VA Destructure userInputObj
      // !VA TODO: I don't think evtTargetId is ever used...remove?
      // const { evtTargetId, appObjProp, evtTargetVal } = userInputObj;
      const { evtTargetVal } = userInputObj;
      // !VA Add string validation here if required
      retVal = evtTargetVal;
      return retVal;
    }

    // !VA appController  
    // !VA Called from applyInputValue and handleMouseEvents. This function name is a misnomer here. More importantly than writing to Appobj, this function writes imgViewerW, sPhonesW and lPhonesW to localStorage and calculates the adjacent side of the curImgW/curImgH input, then runs calcViewerSize to resize the dynamicElements containers. NOTE: This function does things that are done elsewhere and does other things that it shouldn't do. Revisit this at some point but for now it works.
    function updateCurrentImage(userInputObj) {
      // console.log('updateCurrentImage running'); 
      // !VA Initialize vars for curImgH and curImgW in order to calculate one based on the value of the other * Appobj.aspect.
      // let curImgH, curImgW;
      // !VA ES6 Destructure args into constants. userInputObj is passed in from the mouse/keyboard event handlers.
      const { appObjProp, evtTargetVal } = userInputObj;
      // !VA Handle the two cases: 1) appObjProp and evtTargetVal are used to write to Appobj, localStorage and the DOM. This applies to imgViewerW, sPhonesW and lPhonesH. 2) appObjProp and evtTargetVal are used to calculate the img's adacent dimension, then both the images' dimensions are written to Appobj. This applies to curImgW and curImgH. NOTE: For some reason, updateAppobj wrote curImgH to the DOM here - I'm not sure why that was done, but it shouldn't be. 
      // !VA appObjProp = imgViewerW, sPhonesW or lPhonesW
      if ( appObjProp === 'imgViewerW' || appObjProp === 'sPhonesW' || appObjProp === 'lPhonesW') {
        // !VA Set the Appobj property corresponding to the appObjProp identifier to its respective value
        Appobj[appObjProp] = evtTargetVal;
        // !VA Set the localStorage for the respective Appobj property to the respective value
        localStorage.setItem(appObjProp, evtTargetVal);

      // !VA appObjProp is curImgW or curImgH
      } else if ( appObjProp === 'curImgW' || appObjProp === 'curImgH') {
        // !VA Calculate the adjacent dimension of appObjProp based on the aspect ratio, then set the Appobj property of the dimension and its adjacent dimension
        if ( appObjProp === 'curImgW') {
          Appobj.curImgH = Math.round(evtTargetVal * (1 / Appobj.aspect[0]));
          Appobj.curImgW = evtTargetVal;
        } else if ( appObjProp === 'curImgH') {
          Appobj.curImgW  = Math.round(evtTargetVal * (Appobj.aspect[0]));
          Appobj.curImgH = evtTargetVal;
        }
      }

      // !VA The false flag indicates that this is a user-initiated Toolbar input action, not an image initialization action.
      calcViewerSize(false);
      return;
    }



    // !VA  appController   
    // !VA Called 1) in initUI (devmode) after the devimg is loaded from the HTML file 2) in handleFileSelect after setTimeOut callback is run and the image is loaded 3) in updateCurrentImage after a user-initiated Toolbar input. calcViewerSize calculates the current size of DynamicElements.imgViewer based on Appobj values. The flag parameter indicates whether call was made at initialization (true) or after a user-initiated Toolbar input (false). This doesn’t access the DOM or make changes to existing Appobj values. All it does is resize the viewer to fit the image based on aspect ratio and Appobj.viewerW, then calls resizeContainers to write these recalculated element values to the DOM; writeAppobjToDOM ( tableWidth, tableWrapperWidth) writes the current Appobj.imgW and Appobj.viewerW to the CCP ccpUserInput.ccpTblWidthTfd and ccpUserInput.ccpTbwWidthTfd; and writeInspectors(Appobj) to write all the current Appobj values to the corresponding Inspector DOM elements.
    function calcViewerSize(flag) {
      // !VA Here, just populate the dynamicElements of Appobj. If flag is true, then calcViewerSize was called from updateCurrentImage, so this is a user-initiated Toolbar input action. If false, it's an image initialization action called from initUI (devmode) or handleFileSelect.
      if (flag === true ) {
        // !VA Populate the dynamicElements properties in Appobj on new image initialization and get localStorage values if set.
        UIController.populateAppobj(Appobj, 'app');
      }
      // !VA If initializing a new image, use the naturalWidth and naturalHeight. If updating via user input, use the display image and height, curImgW and curImgH. 
      // !VA TODO: See if the if condition below has any effect, if not, remove
      // !VA TODO: actualW and actualH should be replaced globally with curImgW and curImgH - the actualW/actualH condition isn't relevant anymore. Test first.
      var actualW, actualH;
      if (Appobj.curImgW === 0) {
        actualW = Appobj.curImgNW;
        actualH = Appobj.curImgNH;
      } else {
        actualW = Appobj.curImgW;
        actualH = Appobj.curImgH; 
      }

      switch(true) {
      // The image falls within the default viewer dimensions set in initApp, so do nothing.
      case (actualW <= Appobj.imgViewerW) && (Appobj.curImgNH < Appobj.imgViewerW) :
        actualW = Appobj.curImgNW;
        actualH = Appobj.curImgNH;
        break;
      // The image is wider than the current viewer width but shorter than current viewer height, so resize the image based on the viewer width
      case (actualW > Appobj.imgViewerW) && (actualH < Appobj.imgViewerW) :
        // Set the image width to the current viewer
        Appobj.curImgW = Appobj.imgViewerW;
        // Get the image height from the aspect ration function
        Appobj.curImgH = Math.round((1/Appobj.aspect[0]) * Appobj.curImgW);
        // Set the imgViewerH to the curImgH
        Appobj.imgViewerH = Appobj.curImgH;
        break;
      // The image is not as wide as the current viewer width, but is taller than the viewer height. Keep the image width but resize the viewer in order to display the full image height
      // !VA This might be a problem with consecutive images without page refresh
      case (actualW <= Appobj.imgViewerW) && (actualH > Appobj.imgViewerW) :
        // Set the viewer height and the image height to the image natural height
        Appobj.imgViewerH = Appobj.curImgH = Appobj.curImgNH;
        // Set the image width to the natural image width
        Appobj.curImgW = Appobj.curImgNW;
        break;
      // The image is wider and taller than the current viewer height and width so we have to resize the image and the viewport based on the current viewport width
      case (actualW > Appobj.imgViewerW) && (actualH > Appobj.imgViewerW) :
        // Set the image Width to the current  viewer width 
        Appobj.curImgW = Appobj.imgViewerW;
        // Set the image height proportional to the new image width using the aspect ratio function
        Appobj.curImgH = Math.round((1/Appobj.aspect[0]) * Appobj.curImgW);
        // Set the viewer height to the image height
        Appobj.imgViewerH = Appobj.curImgH;
        // !VA TODO: Check this out, doesn't seem to be a problem anymore: BUG Problem with the 800X550, 800X600 -- no top/bottom gutter on viewport
        break;
      }
      resizeContainers();
    }

    // !VA appController  
    // !VA This calculates the imgViewer, imgViewport and appContainer height based on Appobj values which are passed in from calcViewerSize, then runs writedynamicElementsDOM(Appobj, viewportH, appH) to size the containers. NOTE: The complete Appobj is passed here although only imgViewer and curImg values are needed to resize the dynamicElements. 
    function resizeContainers()  {
      // !VA This calculates the imgViewer, imgViewport and appContainer height based on Appobj values which are passed in from calcViewerSize.
      // !VA Initial height is 450, as explicitly defined in calcViewerSize. TOo much hassle to try and get the value as defined in the CSS programmatically.
      // !VA Note: This has dynamicRegion values that are not written back to Appobj after recalculation, this may be a problem at some point.
      // !VA initViewerH is the same default value set in populateAppobj. That needs to be reset as default here since Appobj values at this point no longer correspond to the initialization defaults, but may also have changed due to user-initiated Toolbar input. 
      // !VA TODO:That's why this value should be pulled from the placeholder value of dynamicElements.iptTbrViewerW, not set as a literal here.
      let aliasArray, configObj;
      const initViewerH = 450;
      let viewportH;
      let appH; 

      // !VA If Appobj.curImgH is less than the default viewer height as set in populateAppobj (450) then make the viewport 145px taller than the current viewer height, i.e. Appobj.imgViewerH.
      // !VA The viewport is 145px taller than the imgViewer. 
      if (Appobj.curImgH <= initViewerH) {
        Appobj.imgViewerH = initViewerH;
        viewportH = Appobj.imgViewerH + 145;
      } else {
        // !VA NOTE: Not sure why this is needed
        // Need a little buffer in the viewport
        Appobj.imgViewerH = Appobj.curImgH;
        viewportH = Appobj.curImgH + 145;
      } 
      appH = viewportH;

      // !VA DOM Access to apply dimensions for the dynamicElements elements, i.e. the current image and its containers. Write dimensions of dynamicElements.curImg, dynamicElements.imgViewer and the height of dynamicElements.imgViewport and dynamicElements.appContainer. Width of dynamicElements.imgViewport and dynamicElements.appContainer is static and is sized to the actual application area width.
      // !VA NOTE: This function only exists because Appobj has no property for viewportH or appH. This is a one-off call, so having a separate function for it is kind of wasteful. See if it can be done another way.
      UIController.writedynamicElementsDOM(Appobj, viewportH, appH);

      // !VA Set Appobj table width and wrapper table width now.
      Appobj.ccpTblWidthTfd = Appobj.curImgW;
      Appobj.ccpTbwWidthTfd = Appobj.imgViewerW;

      
      // !VA True is the flag to stash instead of retrieve, tableWidth and tableWrapper are the rest parameters containing the key/value pairs to stash.;
      // !VA Branch: implementAppobj05 (061320)
      // !VA Not implementing this yet
      // UIController.stashAppobjProperties(true, tableWidth, tableWrapperWidth);
      
      // !VA Called in resizeContainers after writedynamicElements, takes parameter list of CCP ID/value pairs, and updates the DOM with the passed parameters. It is the CCP DOM counterpart to updateAppobj, I think, since it only updates those DOM elements whose ID/Value passed in, rather than a blanket DOM update of all DOM. Renamed from writeDOMElementValues. writeCcpDOM takes rest parameters. Pass multiple arguments as arrays of key/value pairs with the cross-object identifier (the value in the ccpUserInput object) as key and the Appobj value as value. 
      // !VA NOTE: This needs to bypass handleCcpActions, since it's not a result of any ccpAction but rather a direct write through the user input in the dynamicElements. It also has to happen before initCCP, othewise Appobj won't initialize with values for table width and table wrapper width. 
      // !VA Create the aliasArray to pass to configCCP
      aliasArray = [ 'ccpTblWidthTfd', 'ccpTbwWidthTfd'];
      // !VA reflectAppobj implements the Appobj properties in CCP elements so that the CCP reflects the current state of Appobj
      configObj = {
        reflectAppobj: { reflect: aliasArray }
      };
      UIController.configCCP( configObj );

      // !VA Branch: implementCcpInput01 (062120)
      // !VA Why does this condition have no actions? Shouldn't write AppbojToDOM be called conditionally below?
      // !VA If CCP is open, write tableWidth and tableWrapperWidth to the DOM elements. 
      var ccpState = UICtrl.toggleCcp(false);
      if (ccpState) { 
        // !VA Branch: implementCcpInput09 (070220)
        // !VA CAUTION: This doesn't seem to make sense - tableWidth and tableWrapperWidth aren't updated here. This clause has no content
        // !VA If the CCP is open, update the CCP UI with the most recent changes to dynamicRegion values, then populateAppobj with CCP values last. writeAppobjToDOM takes rest parameters. Pass multiple arguments as arrays of key/value pairs with the element alias as key and the Appobj value as value. Elements to update here are: tableWidth and tableWrapperWidth. If the CCP is not open, don't update its values.
      }
      // !VA Write the inspectors based on Appobj values
      UICtrl.writeInspectors(Appobj);
    }

    // !VA appController  
    // !VA Branch: 0909A
    // !VA Returns the CCP configurations for each CCP UI element, i.e. the properties for configCCP methods.
    function fetchConfigObj( alias, option ) {
      let configObj = [], flag;
      // !VA Set the CCP configuration for specific user selections
      switch(true) {
      case alias === 'default' :
        // !VA For initialization, resetArray includes aliases in mkcssReset, defaultReset and wraprReset 
        configObj = configDefault( alias, option);
        break;
      case alias === 'ccpImgExcldRdo' :
        // !VA Branch: 0909A
        // !VA Deprecating... Appobj is set in handleRadioEvent
        // Appobj[alias] = option;
        // !VA Get the CCP configuration for the IMG Exclude Image radio switch
        configObj = configExcld( alias, option );
        break;
      case alias === 'ccpImgItypeRdo' :
        // !VA Branch: 0909A
        // !VA Deprecating... Appobj is set in handleRadioEvent
        // Appobj[alias] = option;
        // !VA Get the CCP configuration for the IMG Itype (fixed/fluid) radio switch
        configObj = configItype( alias, option );
        break;
      case alias === 'ccpTdaOptnsRdo' :
        // !VA Get the configuration for the selected TD Option
        // !VA Branch: 0909A
        // !VA Deprecating...
        // if ( option === 'basic' || option === 'swtch') {
        //   configObj = configDefault( alias, option);
        // } else {
        //   configObj = configOptns( alias, option );
        // }
        configObj = configOptns( alias, option );
        break;
      case alias === 'ccpTblWraprChk' :
        // !VA Get the CCP configuration for the Include Wrapper checkbox icon
        configObj = configWrapr( alias, option );
        break;
      case alias === 'ccpTblHybrdChk' :
        // !VA Get the configObj, i.e. the methods and properties to pass to configCCP for configuring the CCP for the Hybrid option.
        configObj = configHybrd( alias, option );
        break;
      
      default:
        console.log('ERROR in fetchConfigObj = Alias not recognized');
      } 
      return configObj;
    }


    // !VA appController private
    // !VA Branch: OVERHAUL0825C
    // !VA 1) Converts the event ID to an Appobj alias and routes the alias to the appropriate handler for the selected element for setting the corresponding CCP UI configuration.
    function handleRadioEvent(evt) {
      // console.log('handleRadioEvent running');
      let hash, radioGroup, alias;
      // !VA hash is required to create the element ID from the radio group name
      hash = '#';
      // !VA Get event target's alias: get the element's name attribute set in the HTML and add the hash to the name attribute string, and add the -rdo suffix, resulting in the full ID string of the element's parent, i.e. the ccpUserInput alias.
      radioGroup = hash.concat(evt.target.getAttribute('name')).concat('-rdo');
      // !VA  Use the ID above to get the ccpUserInput alias/Appobj property name.
      alias = elementIdToAppobjProp(radioGroup);
      // !VA Set the Appobj property to the target of the click event
      Appobj[alias] = evt.target.value;
      // !VA Route the alias to the respective function for selection. Appobj[alias] is the Appobj property corresponding to the clicked element. When called from here, the user-initiated event determines the selection. Elsewhere, the options can be set programatically.
      if (alias === 'ccpImgExcldRdo') {
        selectImgExclude( Appobj[alias] );
      } else if ( alias === 'ccpTdaOptnsRdo') {
        selectTdaOptions( Appobj[alias] );
      } else if ( alias === 'ccpImgItypeRdo') {
        selectImgItype( Appobj[alias] );
      } else if ( alias.includes('Align') || alias.includes('Valign')) {
        // !VA Align/Valign element not handled in handleRadioEvent - including the condition in case they need to be
      } else {
        console.log('ERROR in handleRadioEvent - alias not handled');
      }
    }

    // !VA appController private
    // !VA Branch: OVERHAUL0901B
    // !VA Called from handleRadioEvent and init to set the current IMG Itype selection options, write the selection to Appobj, set the dependent text in the IMG Class text input field, reflect the Appobj property in the CCP and set the radio state of the binary radio group. 
    function selectImgItype( option) {
      let alias, configObj, validOptions;
      validOptions = [ 'fixed', 'fluid'];
      // !VA Hard-code alias for this routine
      alias = 'ccpImgItypeRdo';
      // !VA Error handling
      if (!validOptions.includes( option )) {
        console.log('ERROR in selectImgType - unknown option');
      }
      // !VA Get the config
      configObj = fetchConfigObj( alias, option);
      // !VA Run the CCP UI config
      UIController.configCCP( configObj );
    }


    // !VA appController private
    // !VA Execute the actions associated with selecting one of the binary Exclude Image options in the IMG section: excld or incld. Gets the configObj configuration to pass to UIController to configure the CCP UI. This function is called from the event listener for EXCLD and INCLD icons and can be run programmatically by passing in the option value or Appobj[alias]. 
    function selectImgExclude( option )  {
      // !VA option is the selected option: excld or incld
      let alias, configObj = [ ];
      // !VA Hard-code alias for this handler
      alias = 'ccpImgExcldRdo';
      // !VA Set the error condition if option passes an unexpected parameter
      if (option !== 'incld' && option !== 'excld') {console.log('ERROR in selectImgExclude - unknown option'); }
      // !VA Get the configObj configuration to pass to UIController to set the CCP
      configObj = fetchConfigObj( alias, option );
      // !VA Run the config
      UIController.configCCP(configObj);
    }

    // !VA appController private
    // !VA Branch: OVERHAUL0831A
    // !VA Called from handleRadioEvent and init to select one of the TD OPTIONS (OPTNS) in the TD section: basic, iswap, swtch, bgimg, or vmlbt. Sets the reveal configuation of the TD OPTNS and the option in configObj and runs configCCP to apply the configuration. 
    function selectTdaOptions( option ) {
      let alias, validOptions;
      let configObj = {};
      // !VA alias is hardcoded because this function is specific to this element.
      alias = 'ccpTdaOptnsRdo';
      // !VA Error condition - if the option parameter isn't one of the valid options
      validOptions = [ 'basic', 'iswap', 'swtch', 'bgimg', 'vmlbt' ];
      if (!validOptions.includes(option)) {
        console.log('ERROR in selectTdaOptions - unknown option');
      }
      // !VA Get the config
      configObj = fetchConfigObj( alias, option );
      // !VA Run the CCP UI configuration
      UIController.configCCP( configObj );
    }


    // !VA appController private
    // !VA Branch: OVERHAUL0825C
    // !VA Write the selected checkbox status to its corresponding Appobj property; is called from event listeners on the checkbox elements. 
    function handleCheckboxEvent(evt) {
      // console.log('handleCheckboxEvent running'); 
      let id, isChecked, alias;
      id = '#' + evt.target.id;
      evt.target.checked ? isChecked = true : isChecked = false;
      // !VA Replace the element's suffix with the suffix of its parent
      id = id.replace('ipt', 'chk');
      // !VA Convert the ID to the corresponding ccpUserInput alias/Appobj property and set it to isChecked
      alias = elementIdToAppobjProp(id);
      Appobj[alias] = isChecked;
      selectCheckbox( isChecked, alias );
    }


    // !VA appController private
    // !VA Branch: OVERHAUL0831A
    // !VA Execute the actions associated with checkbox selection: ccpTblWraprChk, ccpTblGhostChk, ccpTblMsdpiChk, ccpTblGhostChk, ccpTblMsdpiChk. Calls UIController.configCCP => checkboxState
    function selectCheckbox( isChecked, alias ) {
      // console.log('selectCheckbox running - isChecked is: ' + isChecked + '; alias: ' + alias); 
      let configObj = {};
      // !VA Error handling

      switch(true) {
      // !VA Handle the selected checkbox
      case alias === 'ccpTblWraprChk':
        // !VA Set the flag based on the isChecked parameter. This will be the 'option' parameter in fetchConfigObj
        // !VA Branch: OVERHAUL0908
        // !VA Removing this backwardsy thing
        configObj = fetchConfigObj(  alias, isChecked );
        UIController.configCCP( configObj);
        break;
      case alias === 'ccpTblHybrdChk':
        // !VA Branch: OVERHAUL0908A
        // !VA Set the flag based on the isChecked parameter. The flag parameter determines what action is executed by the methods of configObj. It's counterintuitive and confusing that it's set to false now even though the checkbox is checked. For later...
        // flag = isChecked; 
        Appobj['ccpTblHybrdChk'] = isChecked;
        // console.log('selectCheckbox - isChecked is: ' + isChecked + ';  flag is: ' +  flag); 
        configObj = fetchConfigObj(  alias, isChecked );
        UIController.configCCP( configObj);
        break;
      case alias === 'ccpTblGhostChk':
        // !VA This alias is handled in CBController getAttributes and UIController makeImgNode. If checked, this element writes the target attribute to the img clipboard output. If unchecked, it does nothing - so it has no effect on the DOM.
        console.log('selectCheckbox - Appobj ccpTblGhostChk is:' + Appobj['ccpTblGhostChk']);
        break;
      case alias === 'ccpImgTargtChk':
        // !VA This alias is handled in CBController getAttributes and UIController makeImgNode. If checked, this element writes the target attribute to the img clipboard output. If unchecked, it does nothing - so it has no effect on the DOM.
        // console.log('selectCheckbox - ccpImgTargtChk');
        break;
      default:
        console.log('Alias not yet handled in selectCheckbox');
      }    
    }






    // !VA appController private
    // !VA Branch: OVERHAUL0825C
    // !VA Convert an element ID (i.e. with the # prefix ) to its corresponding ccpUserInput/Appobj property. Only works for IDs that have a corresponding ccpUserInput property. For IDs that don't have a ccpUserInput property, try evtTargetIdToAppobjProperty. 
    function elementIdToAppobjProp(id) {
      let appObjProp, val;
      val = id;
      // !VA Branch: OVERHAUL0827A
      // !VA Better than the below - get the correspnding key in ccpUserInput from its property value, i.e. the id
      appObjProp = Object.keys(ccpUserInput).find(key => ccpUserInput[key] === val);
      // !VA Branch: OVERHAUL0826A
      // !VA This isn't as good as the above
      // for (const [key, value] of Object.entries(ccpUserInput)) {
      //   if ( id === value ) {
      //     retVal = key;
      //   }
      // }
      return appObjProp;
    }

    // !VA appController 
    // !VA Branch: OVERHAUL0828A
    // !VA This doesn't do anything because there's no reason to write DOM values to Appobj when the CCP is closed - the current values are preserved. So we are commenting out but not deprecating for now.
    // function batchDOMToAppobj() {
    //   let arr = [];
    //   arr = Object.entries(Appobj);
    // }

    // // !VA appController  
    // // !VA Branch: OVERHAUL0828A
    // // !VA Function to get a rest parameter list and return an array. Called from handleTextInputEvent. 
    function makeAliasArray(...args) {
      var arr;
      arr = args;
      return arr;
    }


    // !VA appController private
    // !VA Handle the logic associated with user-initiated text input.  1) If the element has an icon associated, highlight the icon on user input 2) If the text element is a padding input, highlight the padding icon if any of the padding text input elements have user input 3) If the text input element is a class input, show the Make CSS buttons. 4) If the text input element is the IMG anchor input, show the IMG text color and IMG targt parent elements. NOTE: There are a lot of references to IDs here: consider adding aliases for the elements whose IDs are referenced literally.
    // !VA Branch: OVERHAUL0827A
    // !VA NOTE: This function is in appController the actions are distinct from the actions in configCCP. Those controls pertain to specific option configurations that functionally depend on a selected option. These options below only make other options available if a text input is entered. Perhaps an insignificant distinction, but a valid one - all the configCCP react to checkbox state changes, not input values.
    function handleTextInputEvent(evt) {
      let tar, icn, pdgElements, hasValue, flag;
      let configObj = {};
      let revealArray = [];
      hasValue = false;
      tar = evt.target;
      // !VA If the event was NOT triggered by a padding element...
      tar.value ? flag = true : flag = false;
      if (!tar.id.includes('tda-pd')) {
        // !VA If the input has a value, add the active class, otherwise remove it. The active class on the input applies the properties to the adjacent sibling, i.e. the label, as defined in the CSS.
        // !VA Reveal/conceal the IMG Make CSS buttons when an input is made in the IMG class field
        // !VA The 3 Make CSS buttons routines could be squeezed into a separate function but why bother?
        if (tar.id === 'ccp-img-class-ipt') {
          // !VA The 3 Make CSS buttons in the IMG group
          revealArray = makeAliasArray('ccpImgMkcssGrp');
          // !VA If there's a value in the field, then flag is true, so highlight the icon
          flag ? tar.classList.add('active') : tar.classList.remove('active');
          // !VA If there's a value in the field and flag is true, then set the revealParent flag to false to remove the conceal class and reveal the elements.
          configObj = {
            revealParent: { flag: !flag, reveal: revealArray }
          };
          UIController.configCCP( configObj );
        // !VA TD class input shows Make CSS buttons
        } else if (tar.id === 'ccp-tda-class-ipt') {
          // !VA The 3 Make CSS buttons in the TDA group
          revealArray = makeAliasArray('ccpTdaMkcssGrp');
          // !VA If there's a value in the field, then flag is true, so highlight the icon
          flag ? tar.classList.add('active') : tar.classList.remove('active');
          // !VA If there's a value in the field and flag is true, then set the revealParent flag to false to remove the conceal class and reveal the elements.
          configObj = {
            revealParent: { flag: !flag, reveal: revealArray }
          };
          UIController.configCCP( configObj );
          // !VA TBL class input shows Make CSS buttons
        } else if (tar.id === 'ccp-tbl-class-ipt') {
          // !VA The 3 Make CSS buttons in the TBL group
          revealArray = makeAliasArray('ccpTblMkcssGrp');
          // !VA If there's a value in the field, then flag is true, so highlight the icon
          flag ? tar.classList.add('active') : tar.classList.remove('active');
          // !VA If there's a value in the field and flag is true, then set the revealParent flag to false to remove the conceal class and reveal the elements.
          configObj = {
            revealParent: { flag: !flag, reveal: revealArray }
          };
          UIController.configCCP( configObj );
        // !VA Show the options for the IMG anchor text input field
        } else if (tar.id === 'ccp-img-anchr-ipt') {
          // !VA The 2 elements that are dependent on the anchor input value
          revealArray = makeAliasArray('ccpImgTxclrTfd', 'ccpImgTargtChk');
          // !VA If there's a value in the field, then flag is true, so highlight the icon
          flag ? tar.classList.add('active') : tar.classList.remove('active');
          // !VA If there's a value in the field and flag is true, then set the revealParent flag to false to remove the conceal class and reveal the elements.
          configObj = {
            revealElements: { flag: !flag, reveal: revealArray }
          };
          UIController.configCCP( configObj );
        } else {
          // !VA Add/remove active class on all the other labelled text input elements
          tar.value !== '' ? tar.classList.add('active') : tar.classList.remove('active');
        }
      // !VA Now handle the unlabelled padding text input elements
      } else {
        // !VA Branch: 101520B
        // !VA Call handlePaddingInput with userInputObj. 
        let userInputObj = {};
        // !VA Get the Appobj/ccpUserInput alias from the target id
        userInputObj.appObjProp = evtTargetIdToAppobjProp(evt.target.id);
        // !VA evtTargetVal is the value the user entered into the input element.
        userInputObj.evtTargetVal = Number(evt.target.value);
        handlePaddingInput( userInputObj);

      }
    }

 
    // !VA Message handling
    // !VA appController  
    // !VA Key/value pairs containing the unique tooltip ID generate from target ID of the mouseenter event and the corresponding tooltip content.
    function getAppMessageStrings( appMessCode) {
      let appMessContent;
      // !VA Set tooltipContent to ''. This overwrites tooltipContent being undefined if tooltipid is invalid
      appMessContent = '';
      // !VA Tooltip unique code/value pairs defined here
      const getAppMessageStrings = {
        // !VA STATUS
        msg_copied_2_CB: 'Code snippet copied to Clipboard!',
        // !VA ERRORS
        err_not_Integer: 'Invalid input - the value has to be a positive whole number.',
        err_imgW_GT_viewerW: `Image width must be less than the current parent table width of ${Appobj.imgViewerW}px. Make the parent table wider first.`,
        err_tbButton_LT_zero: 'Image dimension can\'t be less than 1.',
        err_tbButton_GT_viewerW: `Image can't be wider than its parent table. Parent table width is currently ${Appobj.imgViewerW}px`,
        // !VA maxViewerWidth issue here, see message below;
        err_viewerW_GT_maxViewerWidth: 'Parent table width can\'t exceed can\'t exceed app width: 800px.',
        err_not_an_integer: 'Not an integer: please enter a positive whole number for width.',

        // !VA CCP INPUT ERRORS
        err_vmlbutton_no_value: 'Height and width must be entered to create a VML button.',
        err_vmlbutton_height_mismatch: 'Is the correct image loaded? Img height should match entry. Check the code output. ',
        err_cell_smaller_than_image: 'Table cell cannot be smaller than the image it contains',
        err_cell_wider_than_parent_table: 'Table cell cannot be wider than its parent table',
        err_table_wider_than_wrapper: 'Table cannot be wider than the table wrapper',
        err_table_cell_wider_than_parent_table: 'Table cell cannot be wider than parent table',
        err_img_wider_than_parent_table: 'Table must be at least as wide as the image it contains',
        err_parent_table_wider_than_wrapper_table: 'Parent table cannot be wider than its own container',
        err_wrapper_table_wider_than_devicewidth: 'Wrapper table cannot exceed devicewidth',
        err_parent_table_greater_than_wrapper: 'Parent table width cannot be greater than wrapper table width',


        // !VA ERROR MESSAGE NOT YET IMPLEMENTED
        err_not_yet_implemented: 'This error code is not yet implemented',


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

    // !VA appContoller   
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

    // appController   
    // !VA Integer validation is used for all height/width input fields, including those in CCP. If the input value is not of type number, converts it and returns an integer.
    function validateInteger(inputVal, callback) {
      let retVal;
      // !VA Handle the CCP input from the fields that should be returning integers. i.e. the numeric inputs in handleKeydown. If they are type string, then convert them to number. If the conversion fails, then throw an error - that means that the user didn't enter a valid numeric string. This returns false if parseInt fails, i.e. returns NaN. Otherwise, it returns the inputVal as integer.
      if (!parseInt(inputVal, 10) || inputVal % 1 !== 0 || inputVal < 0) {
        retVal = false;
      } else { 
        // !VA Input fields return strings, so convert to integer
        if (typeof(inputVal) == 'string' ) { inputVal = parseInt(inputVal); }
        retVal = inputVal;
      }
      // !VA Just returning true here, the error code is sent by the calling function in handleUserAction
      return retVal;
    }
    //  !VA END ERROR HANDLING

    // !VA appController  
    // !VA Get the Appobj property that corresponds to the ID of the DOM input element that sets it. 1) Removes the hypens in the ID string, converts the identifier string (the Appobj/ccpUserInput property name string) to lowercase, finds the match, and returns the aforementioned Appobj/ccpUserInput property name string.
    // !VA Branch: OVERHAUL0825B
    // !VA This one is more comprehenive than elementIdToAppobjProp. The latter  
    function evtTargetIdToAppobjProp(id) {
      let idStr, appObjProp;
      idStr = id;
      // !VA Replace the ipt with tfd, which is the code for the parent div, which is the element represented in Appobj
      idStr = idStr.replace('ipt', 'tfd');
      // !VA Strip all the hypens out of the ID (str)
      idStr = idStr.replace(/-/g,'');
      // !VA Loop through the Object.keys array 
      var appobjArray = Object.keys(Appobj);
      // AppObjProp = Object.keys(Appobj).find(key => Appobj[key] === id);
      // console.log('AppObjProp is: ');
      // console.log(AppObjProp);

      for (let i = 0; i < appobjArray.length; i++) {
        // !VA If the lowercase Appobj property name is contained in the id, then put the original Appobj property name match into appobjProp.
        // !VA TODO: Make this an arrow function with find, like below
        // var ret = Object.keys(IDtoProp).find(key => IDtoProp[key] === str);
        if (idStr.includes(appobjArray[i].toLowerCase())) {
          appObjProp = appobjArray[i];
        }
      }
      return appObjProp;
    }

    // !VA appController  
    // !VA Returns the toolbarElements element alias of a corresponding Appobj property name. IMPORTANT - only works with or is necessary for Appobj properties for toolbarElements aliases. ccpUserInput element aliases are identical to their Appobj property name counterparts.
    function appObjPropToAlias(propName) {
      // !VA Get an array of toolbarElements aliases
      let toolbarElemArr = Object.keys(toolbarElements);
      let alias;
      for (let i = 0; i < toolbarElemArr.length; i++) {
        // !VA Need to initial cap the Appobj property name in order to find a match in the toolbarElements alias, so capitalize the first letter, then concatenate it the remainder of the characters
        if (toolbarElemArr[i].includes( propName[0].toUpperCase()+propName.slice(1))) {
          alias = toolbarElemArr[i];
        }
      }
      return alias;
    }

    // !VA Branch: OVERHAUL0906B
    // !VA configs
    function configDefault( alias, option ) {
      let configObj, reflectArray, radioArray, revealArray, checkedArray;


      // !VA APPOBJ PROPERTIES
      // !VA Branch: 0914B
      // !VA NOTE: It might be redundant to set input elements to empty strings on init, since that is handled in reflectObject when called from populateCcpProperties. For later...
      Appobj['ccpTblWraprChk'] = false;
      Appobj['ccpTblHybrdChk'] = false;
      Appobj['ccpImgClassTfd'] = '';
      Appobj['ccpImgLoctnTfd'] = 'img/';
      Appobj['ccpImgAnchrTfd'] = '#';
      Appobj['ccpImgTxclrTfd'] = '#0000FF';
      Appobj['ccpImgTargtChk'] = false;
      Appobj['ccpTblClassTfd'] = '';
      Appobj['ccpTdaBgclrTfd'] = '';
      // Appobj['ccpTdaPdtopTfd'] = '';
      // Appobj['ccpTdaPdrgtTfd'] = '';
      // Appobj['ccpTdaPdlftTfd'] = '';
      // Appobj['ccpTdaPdbtmTfd'] = '';
      Appobj['ccpTblWidthTfd'] = Appobj['curImgW'];
      Appobj['ccpTbwWidthTfd'] = Appobj['imgViewerW'];
      Appobj['ccpTblMaxwdTfd'] = '';
      Appobj['ccpTbwMaxwdTfd'] = '';
      Appobj['ccpTbwClassTfd'] = 'devicewidth';
      Appobj['ccpTdaAlignRdo'] = 'left';
      Appobj['ccpTdaValgnRdo'] = 'top';
      Appobj['ccpTblAlignRdo'] = 'center';
      Appobj['ccpTbwAlignRdo'] = 'center';

      // !VA reflectAppobj METHOD: set the array of elements whose Appobj properties above are to be written to the CCP DOM
      // !VA Branch: 0930A
      // !VA Why are there two of these? Commenting out the lower one for now.
      reflectArray = ['ccpImgClassTfd', 'ccpImgLoctnTfd', 'ccpImgAnchrTfd', 'ccpImgTxclrTfd',  'ccpTblClassTfd', 'ccpTdaBgclrTfd', 'ccpTdaPdtopTfd', 'ccpTdaPdrgtTfd', 'ccpTdaPdlftTfd', 'ccpTdaPdbtmTfd', 'ccpTblWidthTfd', 'ccpTbwWidthTfd', 'ccpTblMaxwdTfd', 'ccpTbwMaxwdTfd', 'ccpTbwClassTfd' ];
      // reflectArray = ['ccpImgClassTfd', 'ccpImgLoctnTfd', 'ccpImgAnchrTfd', 'ccpImgTxclrTfd',  'ccpTblClassTfd', 'ccpTdaBgclrTfd', 'ccpTblWidthTfd', 'ccpTbwWidthTfd', 'ccpTblMaxwdTfd', 'ccpTbwMaxwdTfd', 'ccpTbwClassTfd' ];

      // !VA revealElements METHOD:
      // !VA Since ccpImgAnchrTfd is configured here to have the value '#', set ccpImgTxclrTfd and ccpImgTargtChk to reveal
      revealArray = ['ccpImgTxclrTfd', 'ccpImgTargtChk', 'ccpTdaWidthTfd', 'ccpTdaHeigtTfd'];

      // !VA radioState METHOD: set the elements whose selected value is to be set to the Appobj properties above.
      radioArray = [ 'ccpTdaAlignRdo' , 'ccpTdaValgnRdo', 'ccpTblAlignRdo', 'ccpTbwAlignRdo' ];
      // !VA checkboxState METHOD: set the checkboxes whose checked value is to be set to the Appobj properties above.
      checkedArray = [ 'ccpTblWraprChk', 'ccpTblHybrdChk', 'ccpImgTargtChk'];
      // !VA Make the configuration object to pass to configCCP
      configObj = {
        revealReset: { alias: 'default'},
        revealElements: { flag: false, reveal: revealArray }, 
        disableReset: { alias: 'default' },
        reflectAppobj: { reflect: reflectArray },
        checkboxState: { checked: checkedArray },
        radioState: { radio: radioArray }
      };
      return configObj;
    }

    // !VA appController private
    function configExcld( alias, option) {
      let configObj, revealArray, revealFlag, radioArray;
      selectTdaOptions('basic');
      // !VA Branch: 0909A
      // !VA Note: Appobj for ccpImgExcldRdo is set in handleRadioEvent
      // !VA revealFlag is false because elements are revealed by REMOVING the ccp-conceal-ctn class
      revealFlag = false;

      // !VA radioState METHOD
      // !VA Set the array of radio element states to set, i.e. the current element - do this for both incld and excld
      radioArray = [ 'ccpImgExcldRdo' ];
      // !VA Toggleable config properties
      if ( option === 'excld') {
        // !VA revealElements METHOD
        // !VA Set the array of elements to reveal
        revealArray  = [ 'ccpImgExcldRdo', 'ccpTdaClassTfd', 'ccpTdaWidthTfd', 'ccpTdaHeigtTfd', 'ccpTdaBgclrTfd', 'ccpTdaAlignRdo', 'ccpTdaValgnRdo' ];
        // revealArray = [ 'ccpImgClassTfd', 'ccpImgAltxtTfd', 'ccpImgLoctnTfd', 'ccpImgAnchrTfd', 'ccpImgAlignRdo', 'ccpImgItypeRdo', ];
      } else {
        revealArray = [ 'ccpImgClassTfd', 'ccpImgAltxtTfd', 'ccpImgLoctnTfd', 'ccpImgAnchrTfd', 'ccpImgAlignRdo', 'ccpImgExcldRdo', 'ccpImgItypeRdo', 'ccpImgCbhtmBtn', 'ccpTdaClassTfd', 'ccpTdaBgclrTfd', 'ccpTdaAlignRdo', 'ccpTdaValgnRdo', 'ccpTdaOptnsRdo'  ];
      }
      configObj = {
        // !VA revealReset conceals all the elements, i.e. hides the ones that aren't explicitly revealed with revealElements.
        radioState: { radio: radioArray },
        revealReset: { alias: alias },
        revealElements: { flag: revealFlag, reveal: revealArray }
      };
      return configObj;
    }
    // !VA appController private
    function configItype( alias, option) {
      let configObj, reflectArray, radioArray;
      // !VA REFLECT APPOBJ to TEXT INPUT FIELDS
      option === 'fluid' ?  Appobj['ccpImgClassTfd'] = 'img-fluid' : Appobj['ccpImgClassTfd'] = '';
      reflectArray = ['ccpImgClassTfd' ];
      radioArray = [ alias ];
      configObj = {
        reflectAppobj: { reflect: reflectArray },
        radioState: { radio: radioArray } 
      };
      return configObj;
    }

    // !VA appController private
    function configOptns( alias, option ) {
      let revealFlag, revealArray, disableFlag, disableArray, radioArray, reflectArray, checkedArray;
      let configObj = {};
      // !VA Branch: OVERHAUL0908
      // !VA Appobj is set in handleRadioEvent
      // Appobj[alias] = option;
      // !VA Branch: OVERHAUL0908C
      // !VA Option will never be basic or swtch here - they get their config from configDefault. That's not ideal, the call to configDefault should be made from here, not fetchConfigObj
      if ( option === 'basic' || option === 'swtch') {
        // !VA Branch: 0909A
        // !VA For the TD Options basic and swtch, use the default CCP configuration
        configObj = configDefault( alias, option );
      } else {
        // !VA Now handle the other TD Options
        switch(true) {
        case option === 'iswap':
          // !VA SET APPOBJ PROPERTIES FOR ISWAP
          // !VA Show the table wrapper options
          Appobj['ccpTblWraprChk'] = true;
          Appobj['ccpTblHybrdChk'] = false;
          // !VA APPOBJ PROPERTIES
          Appobj['ccpImgClassTfd'] = 'mobileshow';
          Appobj['ccpTblClassTfd'] = Appobj['ccpTbwClassTfd'] = 'devicewidth';
          Appobj['ccpTblAlignRdo'] = 'center';
          Appobj['ccpTbwAlignRdo'] = 'center';
          Appobj['ccpTdaBgclrTfd'] = '';
          // !VA NEW
          Appobj['ccpTblWidthTfd'] = Appobj['curImgW'];
          Appobj['ccpTbwWidthTfd'] = Appobj['imgViewerW'];
          Appobj['ccpTblMaxwdTfd'] = '';
          Appobj['ccpTbwMaxwdTfd'] = '';

          // !VA reflectAppobj METHOD
          // !VA Array of elements whose values are set to the Appobj properties above
          reflectArray = ['ccpImgClassTfd','ccpTdaBgclrTfd', 'ccpTblClassTfd', 'ccpTbwClassTfd', 'ccpTblWidthTfd', 'ccpTbwWidthTfd', 'ccpTblMaxwdTfd', 'ccpTbwMaxwdTfd' ];
          
          // !VA checkboxState METHOD
          // !VA Array of checkboxes whose checked state is to be set based on the Appobj property setting above.
          checkedArray = [ 'ccpTblWraprChk', 'ccpTblHybrdChk'];

          // !VA radioState METHOD
          // !VA Array of radio groups whose selection state is set based on the Appobj property above. The reveal
          radioArray = [ 'ccpTblAlignRdo' , 'ccpTbwAlignRdo' ];

          // !VA revealElements METHOD
          // !VA revealFlag will always be false. This method only reveals elements - it's not a toggle. Elements aren't unrevealed, rather the entire config is reset and replaced with a different config when a different selection is made.
          revealFlag = false;
          // !VA Array of elements to be revealed. 
          revealArray = [ 'ccpTdaBgclrTfd', 'ccpTdaAlignRdo', 'ccpTdaValgnRdo', 'ccpTdaOptnsRdo', 'ccpTblAlignRdo', 'ccpTblClassTfd', 'ccpTblWidthTfd', 'ccpTblBgclrTfd', 'ccpTblGhostChk', 'ccpTblMsdpiChk', 'ccpTbwAlignRdo', 'ccpTbwClassTfd', 'ccpTbwWidthTfd', 'ccpTbwMaxwdTfd','ccpTbwBgclrTfd', 'ccpTbwGhostChk', 'ccpTbwMsdpiChk' ];
          
          selectCheckbox( true, 'ccpTblWraprChk');

          // !VA disableElements METHOD
          // !VA disableFlag is always true. This isn't a toggle. Elements stay disabled until a different option with a different config is selected.
          // !VA Branch: 0913B
          // !VA Only disabling IMG class for now.
          disableFlag = true;
          // disableArray =  [ 'ccpImgClassTfd', 'ccpTblClassTfd','ccpTblWidthTfd', 'ccpTblMaxwdTfd', 'ccpTblAlignRdo' ];
          disableArray =  [ 'ccpImgClassTfd' ];

          // !VA Set the configObj with the methods and properties to configure
          configObj = {
            checkboxState: { checked: checkedArray },
            reflectAppobj: { reflect: reflectArray },
            radioState: { radio: radioArray },
            disableElements: { flag: disableFlag, disable: disableArray },
            revealReset: { alias: 'default'},
            revealElements:  { flag: revealFlag, reveal: revealArray }
          };
          break;
        case option === 'bgimg':
          // !VA APPOBJ PROPERTIES
          // !VA Table wrapper options not show by default
          Appobj['ccpTblWraprChk'] = false;
          Appobj['ccpTblHybrdChk'] = false;
          Appobj['ccpImgClassTfd'] = '';
          Appobj['ccpTblClassTfd'] = '';
          Appobj['ccpTdaWidthTfd'] = Appobj['curImgW'];
          Appobj['ccpTdaHeigtTfd'] = Appobj['curImgH'];
          Appobj['ccpTdaBgclrTfd'] = '#7bceeb';
          Appobj['ccpTbwClassTfd'] = 'devicewidth';
          // !VA NEW
          Appobj['ccpTblWidthTfd'] = Appobj['curImgW'];
          Appobj['ccpTbwWidthTfd'] = Appobj['imgViewerW'];
          Appobj['ccpTblMaxwdTfd'] = '';
          Appobj['ccpTbwMaxwdTfd'] = '';

          // !VA reflectAppobj METHOD
          // !VA Array of elements whose values are set to the Appobj properties above
          reflectArray = ['ccpImgClassTfd', 'ccpTblClassTfd', 'ccpTdaWidthTfd', 'ccpTdaHeigtTfd', 'ccpTdaBgclrTfd', 'ccpTbwClassTfd', 'ccpTblWidthTfd', 'ccpTbwWidthTfd', 'ccpTblMaxwdTfd', 'ccpTbwMaxwdTfd' ];

          // !VA revealElements METHOD
          // !VA revealFlag will always be false. This method only reveals elements - it's not a toggle. Elements aren't unrevealed, rather the entire config is reset and replaced with a different config when a different selection is made.
          revealFlag = false;
          // !VA Array of elements to be revealed.
          revealArray = [ 'ccpTdaClassTfd', 'ccpTdaWidthTfd', 'ccpTdaHeigtTfd', 'ccpTdaBgclrTfd', 'ccpTdaOptnsRdo', 'ccpTblMaxwdTfd' ];
          // !VA If the Include Wrapper icon is unchecked, use arr for revealArray. If it is checked, merge arr with the Table Wrapper options to create revealArray

          // !VA checkboxState METHOD
          // !VA Array of checkbox elements whose checked state to set
          checkedArray = [ 'ccpTblWraprChk', 'ccpTblHybrdChk' ];

          // !VA Set the configObj with the methods and properties to configure
          configObj = {
            checkboxState:  { checked: checkedArray },
            disableReset: { alias: 'default' },
            reflectAppobj: { reflect: reflectArray },
            revealReset: { alias: 'default'},
            revealElements: { flag: revealFlag, reveal: revealArray }
          };
          break;
        case option === 'vmlbt':
          // !VA APPOBJ PROPERTIES
          // !VA Table wrapper options not show by default
          Appobj['ccpTblWraprChk'] = false;
          Appobj['ccpTblHybrdChk'] = false;
          Appobj['ccpImgClassTfd'] = '';
          Appobj['ccpTblClassTfd'] = '';
          Appobj['ccpTdaWidthTfd'] = Appobj['curImgW'];
          Appobj['ccpTdaHeigtTfd'] = Appobj['curImgH'];
          Appobj['ccpTdaBgclrTfd'] = '#556270';
          Appobj['ccpTdaTxclrTfd'] = '#FFFFFF';
          Appobj['ccpTdaBdclrTfd'] = '#1e3650';
          Appobj['ccpTdaBdradTfd'] = 4;
          // !VA NEW
          Appobj['ccpTblWidthTfd'] = Appobj['curImgW'];
          Appobj['ccpTbwWidthTfd'] = Appobj['imgViewerW'];
          Appobj['ccpTblMaxwdTfd'] = '';
          Appobj['ccpTbwMaxwdTfd'] = '';


          // !VA reflectAppobj METHOD
          // !VA Array of elements whose values are set to the Appobj properties above
          reflectArray = ['ccpImgClassTfd', 'ccpTblClassTfd', 'ccpTdaWidthTfd', 'ccpTdaHeigtTfd',  'ccpTdaBgclrTfd', 'ccpTdaTxclrTfd', 'ccpTdaBdclrTfd', 'ccpTdaBdradTfd', 'ccpTbwClassTfd', 'ccpTblWidthTfd', 'ccpTbwWidthTfd', 'ccpTblMaxwdTfd', 'ccpTbwMaxwdTfd' ];
          
          // !VA checkboxState METHOD
          // !VA Array of checkbox elements whose checked state to set
          checkedArray = [ 'ccpTblWraprChk', 'ccpTblHybrdChk' ];

          // !VA revealElements METHOD
          // !VA revealFlag will always be false. This method only reveals elements - it's not a toggle. Elements aren't unrevealed, rather the entire config is reset and replaced with a different config when a different selection is made.
          revealFlag = false;
          // !VA Array of elements to be revealed.
          revealArray = [ 'ccpTdaClassTfd', 'ccpTdaWidthTfd', 'ccpTdaHeigtTfd', 'ccpTdaBgclrTfd', 'ccpTdaTxclrTfd', 'ccpTdaBdclrTfd', 'ccpTdaBdradTfd' ];

          // !VA Set the configObj with the methods and properties to configure
          configObj = {
            checkboxState:  { checked: checkedArray },
            disableReset: { alias: 'default' },
            reflectAppobj: { reflect: reflectArray },
            revealReset: { alias: 'default'},
            revealElements: { flag: revealFlag, reveal: revealArray }
          };
          break;
        default:
          console.log('ERROR in revealConfigs - Appobj property not recognized');
        } 
      }
      return configObj;
    }

    // !VA appController private
    function configWrapr( alias, isChecked ) {
      // console.log('configWrapr running - isChecked is: ' + isChecked + '; alias: ' + alias); 
      // !VA Branch: OVERHAUL0908
      let configObj, revealFlag, revealArray;
      
      // !VA Branch: OVERHAUL0908
      // !VA revealElements METHOD
      // !VA revealFlag is the opposite of isChecked because the revealElements method REMOVES the ccp-conceal-ctn class to reveal elements
      revealFlag = !isChecked;
      // !VA Set the array of elements to reveal when Table Wrapper is checked. These correspond to the Table Wrapper option group.
      revealArray = [ 'ccpTbwAlignRdo', 'ccpTbwClassTfd', 'ccpTbwWidthTfd',  'ccpTbwMaxwdTfd', 'ccpTbwBgclrTfd', 'ccpTbwGhostChk', 'ccpTbwMsdpiChk' ];

      // !VA Create the configObj with the methods and properties to pass to configCCP to configure the CCP when Table Wrapper is checked/unchecked.
      configObj = {
        revealReset: { alias: alias },
        revealElements: { flag: revealFlag, reveal: revealArray }
      };
      return configObj;
    }

    // !VA appController private
    function configHybrd( alias, isChecked ) {
      // console.log('configHybrd running'); 
      let checkedArray, radioArray, reflectArray, revealFlag, revealArray, disableFlag, disableArray;
      let configObj = {};

      // !VA APPOBJ PROPERTIES FOR CONFIGURING THE HYBRID OPTION
      // !VA If Hybrid is checked, set these options
      if (isChecked) {
        // !VA Set the Wrapper checkbox Appobj property to true if the Hybrid checkbox is checked
        Appobj['ccpTblWraprChk'] = true;
        Appobj['ccpImgClassTfd'] = 'img-fluid';
        Appobj['ccpTdaOptnsRdo'] = 'basic';
        Appobj['ccpTdaBgclrTfd'] = '';
        Appobj['ccpTblClassTfd'] = '';
        Appobj['ccpTbwClassTfd'] = 'responsive-table';
        Appobj['ccpTblAlignRdo'] = '';
        Appobj['ccpTbwAlignRdo'] = 'center';
        Appobj['ccpTblWidthTfd'] = '100%';
        Appobj['ccpTbwWidthTfd'] = '100%';
        Appobj['ccpTblMaxwdTfd'] = Appobj['curImgW'];
        console.log('Appobj[curImgW] is: ');
        console.log(Appobj['curImgW']);
        Appobj['ccpTbwMaxwdTfd'] = Appobj['imgViewerW'];
        
      // !VA If Hybrid is unchecked, reset to default options
      } else {
        // !VA Set the Wrapper checkbox Appobj property to false if the Hybrid checkbox is unchecked
        Appobj['ccpTblWraprChk'] = false;
        // !VA APPOBJ PROPERTIES
        // !VA REFLECT APPOBJ to TEXT INPUT FIELDS
        Appobj['ccpImgClassTfd'] = '';
        Appobj['ccpTdaOptnsRdo'] = 'basic';
        Appobj['ccpTdaBgclrTfd'] = '';
        Appobj['ccpTblClassTfd'] = '';
        Appobj['ccpTbwClassTfd'] = 'devicewidth';
        Appobj['ccpTblAlignRdo'] = '';
        Appobj['ccpTbwAlignRdo'] = 'center';
        Appobj['ccpTblWidthTfd'] = Appobj['curImgW'];
        Appobj['ccpTbwWidthTfd'] = Appobj['imgViewerW'];
        Appobj['ccpTblMaxwdTfd'] = '';
        Appobj['ccpTbwMaxwdTfd'] = '';
        // Appobj['ccpTblWidthTfd'] = Appobj['curImgW'];
        // Appobj['ccpTbwWidthTfd'] = Appobj['viewerW'];
      }

      // !VA checkboxState METHOD
      // !VA Set the Wrapper and Hybrid checkbox as properties of the checkboxState method. These two checkboxes will have checked state set by the Appobj property set above.
      checkedArray = ['ccpTblWraprChk', 'ccpTblHybrdChk'];

      // !VA reflectElements METHOD
      // !VA Set the array of the elements whose CCP value should be set according to the REFLECT PROPERTIES set above
      reflectArray = ['ccpImgClassTfd', 'ccpTdaBgclrTfd', 'ccpTblClassTfd', 'ccpTbwClassTfd', 'ccpTblWidthTfd', 'ccpTbwWidthTfd', 'ccpTblMaxwdTfd', 'ccpTbwMaxwdTfd' ];

      // !VA radioState METHOD
      // !VA Set the properties of the radioState method whose selected option is set according to its Appobj properties set in the APPOBJ PROPERTIES section above
      radioArray = [ 'ccpTblAlignRdo' , 'ccpTbwAlignRdo', 'ccpTdaOptnsRdo' ];

      // !VA revealElements METHOD
      // !VA Set the reveal flag. The reveal flag is the opposite of the isChecked property because the ccp-conceal-ctn class is REMOVED in order to reveal the elements.
      revealFlag = !isChecked;
      // !VA Set the array of the elements to be revealed  according to the APPOBJ PROPERTIES set above. IMPORTANT: These correspond to the Table Wrapper options. They are being set manually here instead of calling configWrapr to set the configuration for transparency and simplicity's sake. 
      revealArray = [  'ccpTbwAlignRdo', 'ccpTbwClassTfd', 'ccpTbwWidthTfd', 'ccpTblMaxwdTfd', 'ccpTbwMaxwdTfd','ccpTbwBgclrTfd', 'ccpTbwGhostChk', 'ccpTbwMsdpiChk' ];

      // !VA disableElements METHOD
      // !VA Set the flag to disable/enable elements. disableFlag is equal to isChecked - it has a different name here only for transparency's sake. 
      disableFlag = isChecked;
      // !VA Set the array of the elements to be disabled. 
      // !VA Branch: 0913B
      // !VA Leaving disabling out for now
      // disableArray =  [ 'ccpImgClassTfd', 'ccpTblClassTfd','ccpTblWidthTfd', 'ccpTblMaxwdTfd', 'ccpTblAlignRdo', 'ccpTblWraprChk', 'ccpTbwClassTfd','ccpTbwWidthTfd', 'ccpTbwMaxwdTfd', 'ccpTbwAlignRdo' ];

      // !VA Create the configObj methods with the properties defined above.
      configObj = {
        checkboxState: { checked: checkedArray },
        reflectAppobj: { reflect: reflectArray },
        radioState: { radio: radioArray },
        revealReset: { alias: 'default'},
        revealElements: { flag: revealFlag, reveal: revealArray },
        // !VA Branch: 0913B
        // !VA Leaving disabling out for now.
        // disableElements: { flag: disableFlag, disable: disableArray },
        // disableReset: { alias: 'default'}
      };

      return configObj;
    }

    // !VA appController public functions
    return {


      // !VA Access Appobj from outside appController. If identifier is 'undefined' i.e. not specified in the function call, then return the entire Appobj. If it is specified and is a property identifier, i.e. an Appobj property name, return the corresponding property value. 
      // !VA Branch: implementCcpInput04 (062520)
      // !VA getAppobj won't work here. The call comes before Appobj is populated. See https://stackoverflow.com/questions/62585279/javascript-object-both-has-properties-and-is-empty - which cost me about a day.
      // !VA Branch: OVERHAUL0901A
      // !VA This is still used in handleInspectorClicks
      getAppobj2: function(...identifiers) {
        console.log('getAppobj2 running');
        let retval, arr;
        Appobj = UIController.populateAppobj(Appobj, 'all');

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
              retval = value;
              // console.log('retval is: ' + retval);
            }
          }


          for (let i = 0; i < identifiers.length; i++) {
            console.log('identifiers[i] is: ' +  identifiers[i]);
            for (const [key, value] of Object.entries(Appobj)) {
              if (key === identifiers[i]) {
                retval = value;
                // console.log('retval is: ' + retval);
              }
            }
          }
        }
        console.log('retval is: ' + retval );

        return retval;
      },


      // !VA appController public
      // !VA Branch: OVERHAUL0829A
      // !VA Outdated description
      // !VA Access Appobj from outside appController. Called from getAttributes, ccpGetAttValue, ccpIfNoUserInput, getSelectedTdOptionFromAppobj, getImgSwapBlock. If alias is 'undefined' i.e. not specified in the function call, then return the entire Appobj. If it is specified and is an Appobj property/ccpUserInput property, return the corresponding property value. If it is neither of the above, error condition
      getAppobj: function(alias) {
        let retval;
        if (typeof alias === 'undefined') {
          // console.log('UNDEFINED');
          retval = Appobj;
        } else {
          // retval = alias;
          for (const [key, value] of Object.entries(Appobj)) {
            // console.log(`key is: ${key}, value is: ${value}`);
            if (key === alias) {
              retval = value;
            } 
          }
        }
        return retval;
      },

      // !VA appController public 
      // !VA Calls UIController.toggleCCP, which returns ccpState, a flag indicating if the CCP is open or closed. If it is open, runs batchAppobjToDOM(), which contains the logic for opening the CCP with the current state of the selected options reflected. batchAppobjToDOM only runs handleTdOptions for the rdoCcpTdImgswap option. All other element states and values carry over when the CCP is open and closed. NOTE: Need to confirm that the above statement is correct. If the flag is false, batchDOMToAppobj is run to save all the DOM settings to Appobj so they can be restored by batchAppobjToDOM. NOTE: I’m not sure this is required, at least there is no logic in batchDOMToAppobj currently
      // !VA Branch: OVERHAUL0825B
      // !VA Still no idea what ccpState is supposed to achieve.
      initCcp: function () {
        let ccpState;
        // !VA Get the current open/closed state of the CCP
        ccpState = UIController.toggleCcp(true);
      },


      // !VA Dev Mode pass-thru public functions to expose calcViewerSize and initCcp to UIController.initUI
      // !VA DEV MODE
      // !VA ------------------------------
      // !VA appController public: DEVMODE
      initCalcViewerSize: function() {
        calcViewerSize(true);
      },
      // !VA DEV MODE END
     
      initupdateCurrentImage: function(userInputObj) {
        updateCurrentImage(userInputObj);
      },

      // !VA appController public
      // !VA APP MESSAGES START
      // !VA Entry point for sorting the three types of messages. Target id is used for all three types. For tooltips, target id is in the event object passed in from the event handler. For msg and err, target id isn't passed because handleAppMessages only takes one parameter -- either the event for tooltips or the appMessCode for msg and err. Problem: Tooltips require the calling element's id because the tooltip shows on mouseenter and has to hide on mouseleave, and the id is required for the mouseleave eventListener. Solution: call showAppMessages with two parameters: targetid, which is either a string for tooltips or false for msg and err, and the second parameter is the appMessContent.
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



      // !VA Query whether localStorage is currently set for imgViewerW, sPhonesW and lPhonesW
      // !VA appController public
      getLocalStorage: function() {
        // !VA Branch: implementCcpInput09 (070220)
        // !VA Update comment with where localStorage is set - updateAppobj doesn't exist anymore
        // !VA Get localStorage for imgViewerW here. localStorage is set in updateAppobj after the user input has been parsed for errors. 
        let arr = [], curLocalStorage = [];
        // !VA Clear localStorage for testing only.
        // localStorage.clear();
        // !VA If localStorage is set for imgViewerW, sPhonesW or lgPhones, add the localStorage value to curLocalStorage and return it
        arr = [ 'imgViewerW', 'sPhonesW', 'lPhonesW' ];
        for (let i = 0; i < arr.length; i++) {
          localStorage.getItem(arr[i]) ? curLocalStorage.push(localStorage.getItem(arr[i])) : curLocalStorage.push(false);
        }
        return curLocalStorage;
      },

      // !VA appController public
      // !VA Initialize the app. Display the app in full window mode or in isolate mode. Run populateAppobj to populate Appobj with initial default CCP values. Initialize the 'basic' td option. Run setupEventListeners. Determine if running in dev or prod mode based on whether there's a devimg in the HTML file. Finally, run initUI.
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



        // !VA Populate the CCP with HTML defaults. tableWidth and tableWrapperWidth are undefined, they don't get written until resizeContainers.
        UIController.populateAppobj(Appobj, 'ccp');

        // !VA Branch: OVERHAUL0906B
        // !VA On init, run the default config
        var configObj = fetchConfigObj('default');
        UIController.configCCP( configObj);


        // !VA Pre-select the IMG EXCLD, TDA OPTNS and TBW WRAPR options so they open as selected by default on page load.
        // !VA IMPORTANT! You cannot programattically run selectCheckbox more than once. The second run will also run revealReset again, thus cancelling reveal settings you made the first time. If you need to set checkbox-dependent reveals, do it manually, not through selectCheckbox.
        // selectImgExclude('incld');
        // selectTdaOptions('basic');
        // Appobj['ccpTblWraprChk'] = true;
        // selectCheckbox( true, 'ccpTblWraprChk' );
        // // selectCheckbox( false, 'ccpTblHybrdChk' );
        // selectImgItype( 'fixed' );
        // // // !VA for ghost table dev, check the ghost table option
        // Appobj['ccpTblMsdpiChk'] = true;
        // Appobj['ccpTbwMsdpiChk'] = true;
        // // Appobj['ccpTbwGhostChk'] = false;
        // var checkedArray = ['ccpTblWraprChk', 'ccpTblMsdpiChk', 'ccpTbwMsdpiChk' ];
        // configObj = {
        //   checkboxState: { checked: checkedArray },
        // };
        // UIController.configCCP(configObj);

        // !VA Set the default config on init
        configObj = configDefault('default', true );
        UIController.configCCP(configObj);
          


        // !VA Set up event listeners
        setupEventListeners();
        
        // !VA  Test if there is currently #cur-img element with an image.If there is, it's hardcoded in the HTML and we're in DEV MODE. If there's not, the app is being initialized in USER MODE.
        document.querySelector(dynamicElements.curImg) ? initMode = 'devmode' : initMode = 'prod';
        // !VA Initialize the UI
        UICtrl.initUI(initMode);
      }
    };

  })(CBController, UIController);

  appController.init();

//Namespace closure
})();