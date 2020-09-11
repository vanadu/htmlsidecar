// !VA OVERHAUL 08/24/20
// ===================
// See WittyAugustOverhaulLog_08.24.20A.docx
// See WittyStructure_08.24.20.docx
/* !VA  



*/
//SCRIPT START
//PAGE SETUP START

// Namespace
var Witty = (function () {

  // // !VA Run on page load
  // document.addEventListener("DOMContentLoaded", function() {
  //   setTimeout(function(){ 

  //   }, 100);
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
      ccpImgClassTfd: '#ccp-img-class-tfd',
      ccpImgAltxtTfd: '#ccp-img-altxt-tfd',
      ccpImgLoctnTfd: '#ccp-img-loctn-tfd',
      ccpImgAnchrTfd: '#ccp-img-anchr-tfd',
      ccpImgTxclrTfd: '#ccp-img-txclr-tfd',
      ccpImgTargtChk: '#ccp-img-targt-chk',
      ccpImgAlignRdo: '#ccp-img-align-rdo',
      ccpImgExcldRdo: '#ccp-img-excld-rdo',
      ccpImgItypeRdo: '#ccp-img-itype-rdo',
      // !VA Conceal/reveal on class input
      ccpImgMkcssGrp: '#ccp-img-mkcss-grp',
      // !VA Conceal/reveal on IMG Exclude checked
      ccpImgCbhtmBtn: '#ccp-img-cbhtm-btn',
      ccpTdaClassTfd: '#ccp-tda-class-tfd',
      ccpTdaWidthTfd: '#ccp-tda-width-tfd',
      ccpTdaHeigtTfd: '#ccp-tda-heigt-tfd',
      ccpTdaBgclrTfd: '#ccp-tda-bgclr-tfd',
      ccpTdaTxclrTfd: '#ccp-tda-txclr-tfd',
      ccpTdaBdradTfd: '#ccp-tda-bdrad-tfd',
      ccpTdaBdclrTfd: '#ccp-tda-bdclr-tfd',
      ccpTdaAlignRdo: '#ccp-tda-align-rdo',
      ccpTdaValgnRdo: '#ccp-tda-valgn-rdo',
      ccpTdaPadngGrp:  '#ccp-tda-padng-grp',
      ccpTdaOptnsRdo: '#ccp-tda-optns-rdo',
      ccpTdaBasicPar: '#ccp-tda-basic-par',
      ccpTdaIswapPar: '#ccp-tda-iswap-par',
      ccpTdaSwtchPar: '#ccp-tda-swtch-par',
      ccpTdaBgimgPar: '#ccp-tda-bgimg-par',
      ccpTdaVmlbtPar: '#ccp-tda-vmlbt-par',
      ccpTdaMkcssGrp: '#ccp-tda-mkcss-grp',
      ccpTblAlignRdo: '#ccp-tbl-align-rdo',
      ccpTblClassTfd: '#ccp-tbl-class-tfd',
      ccpTblWidthTfd: '#ccp-tbl-width-tfd',
      ccpTblMaxwdTfd: '#ccp-tbl-maxwd-tfd',
      ccpTblBgclrTfd: '#ccp-tbl-bgclr-tfd',
      ccpTblGhostChk: '#ccp-tbl-ghost-chk',
      ccpTblMsdpiChk: '#ccp-tbl-msdpi-chk',
      ccpTblWraprChk: '#ccp-tbl-wrapr-chk',
      ccpTblMkcssGrp: '#ccp-tbl-mkcss-grp',
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
    const btnCcpMakeClips = {
      // !VA Make HTML Tag Buttons
      ccpImgCbhtmBtn: '#ccp-img-cbhtm-ipt',
      ccpTdaCbhtmBtn: '#ccp-tda-cbhtm-ipt',
      ccpTblCbhtmBtn: '#ccp-tbl-cbhtm-ipt',
      // !VA Make Image CSS Rule Buttons
      ccpImgCbdtpBtn: '#ccp-img-cbdtp-ipt',
      ccpImgCbsphBtn: '#ccp-img-cbsph-ipt',
      ccpImgCblphBtn: '#ccp-img-cblph-ipt',
      // !VA Make Td CSS Rule Buttons
      ccpTdaCbdtpBtn: '#ccp-tda-cbdtp-ipt',
      ccpTdaCbsphBtn: '#ccp-tda-cbsph-ipt',
      ccpTdaCblphBtn: '#ccp-tda-cblph-ipt',
      // !VA Make Table CSS Rule  Buttons
      ccpTblCbdtpBtn: '#ccp-tbl-cbdtp-ipt',
      ccpTblCbsphBtn: '#ccp-tbl-cbsph-ipt',
      ccpTblCblphBtn: '#ccp-tbl-cblph-ipt',
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

    // !VA CCP FUNCTIONS
    // !VA --------------------
    // !VA UIController   
    // !VA Apply/remove disabled-radio and disabled style to radio button element and its label. Called from UIController public handleCcpActions. Flag is the boolean indicating whether to apply or remove the styles. Called from handleCcpActions (UIController public).
    function setCcpDisabledRadio(flag, elementAlias ) {
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

    // !VA UIController   
    // !VA Apply the active class to the parent element of the element with the passed identifier. The identifier corresponds to the Appobj property name. Called from handleCcpActions (UIController public).
    function setCcpActiveParentClass(flag, elementAlias) {
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

    // !VA UIController   
    // !VA Apply the active class to an element. elementAlias is the identifier corresponding to Appobj/ccpUserInput property name. Called from handleCcpActions (UIController public).
    function setCcpActiveClass(elementAlias) {
      // !VA NOTE: Not sure why I removed this if condition and not sure if I should restore it
      // if (!document.querySelector(ccpUserInput[elementAlias]).classList.contains('active')) {
      document.querySelector(ccpUserInput[elementAlias]).classList.add('active');
      // } else {
      //   document.querySelector(ccpUserInput[elementAlias]).classList.remove('active');
      // }
    }

    // !VA UIController   
    // !VA Add/remove the disabled class to a text input element and its label, and set/unset the disabled attribute of the input element. elementAlias is the identifier corresponding to Appobj/ccpUserInput property name. Called from handleCcpActions (UIController public).
    function setDisabledTextInput( flag, elementAlias ) {
      let elementLabel;
      elementLabel = ccpUserInput[elementAlias] + '-label';
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

    // !VA Branch: OVERHAUL0824A
    // !VA UIController private
    // !VA Gets the value of a text input field in a text input field container based on the alias/Appobj property of the parent text input field container
    function fetchTextInput( alias ) {
      // console.log('fetchTextInput running');
      let selectedOption;
      // !VA Replace the parent's id code with the input element's id code, get the input element and add its value to Appobj 
      selectedOption = document.querySelector(ccpUserInput[alias].replace('tfd', 'ipt')).value;
      return selectedOption;
    }



    // !VA Branch: OVERHAUL0902A
    // !VA Sets the value of an array of text input fields to their respective Appobj property value. 
    function reflectAppobj( aliasArray) { 
      let el;
      for (const alias of aliasArray){
        el = document.querySelector(ccpUserInput[alias].replace('tfd', 'ipt'));
        el.value = appController.getAppobj( alias );
      }
    }
    
    // !VA UIController private
    // !VA Gets the value of a parent checkbox input element in a checkbox container based on the alias/Appobj property of the parent checkbox container 
    // !VA Branch: OVERHAUL0824A
    // !VA Deprecated... merged with checkboxState
    // function fetchCheckboxState( alias ) {
    //   let checkedState;
    //   // !VA Replace the parent's id code with the input element's id code, get the input element and add its value to Appobj 
    //   checkedState = document.querySelector(ccpUserInput[alias].replace('chk', 'ipt')).checked;
    //   // console.log('selectedOption is: ' + selectedOption);
    //   return checkedState;
    // }

    // !VA Branch: OVERHAUL0901A
    // !VA Gets or sets the state of the checked attribute of the input element in a checkbox container based on the alias/Appobj property of the parent checkbox container. This only handles the UI element, the Appobj property is set in the calling function in appController.
    function checkboxState( isChecked, alias ) {
      let el, retVal;
      // !VA Replace the 'chk' suffix in the alias with 'ipt' to target the checkbox input
      el = document.querySelector(ccpUserInput[alias].replace('chk', 'ipt'));
      // !VA If set programmatically, true is checked and false is unchecked.
      if ( isChecked === true || isChecked === false) {
        // !VA Check the checkbox of the passed-in alias
        el.checked = isChecked;
        // !VA Set the APpobj property of the passed-in alias
        // !VA If called with isChecked set to 'query', then return the existing state without setting it
      } else if ( isChecked === 'query') {
        retVal = el.checked;
      } else {
        console.log('ERROR in checkboxState - unknown parameter isChecked');
      }
      return retVal;
    }
    

    // !VA UIController private
    // !VA Branch: OVERHAUL0901A
    // !VA Deprecated...
    // !VA Gets the value of the selected radio element as set in the value attribute of the HTML. 
    // function fetchRadioSelection( alias ) {
    //   console.log('fetchRadioSelection running');
    //   let iptElements, selectedOption;
    //   // !VA iptElements is the collection of child INPUT elements of the element with the id ccpUserInput[alias]
    //   iptElements = document.querySelector(ccpUserInput[alias]).getElementsByTagName('INPUT');
    //   // !VA Loop through the child elements and get the checked element's value as specified in the element's value attribute in the HTML. That is the string to write to Appobj.
    //   for (const el of iptElements) {
    //     if (el.checked) { 
    //       console.log('el.id is: ' + el.id);
    //       selectedOption = el.value;
    //     }
    //   }
    //   // !VA Return the string.
    //   // console.log('fetchRadioSelection selectedOption is: ' + selectedOption);
    //   return selectedOption;
    // }

    // !VA UIController private
    // !VA Branch: OVERHAUL0901A
    // !VA Replaces fetchRadioSelection
    // !VA Gets or sets the state, i.e. selected option, of a radio element. The option strings are set in the value attribute of the radio element's child input element.
    function radioState( option, alias ) {
      let iptElements, selectedOption;
      // !VA Branch: OVERHAUL0901A
      // !VA iptElements is the collection of child INPUT elements of the element with the id ccpUserInput[alias]. Value is the value attribute set in the HTML, which is used as the 'option' string.
      iptElements = document.querySelector(ccpUserInput[alias]).getElementsByTagName('INPUT');
      // !VA Loop through the iptElements collection
      for (const el of iptElements) {
        // !VA If option === 'query' then query only and return the currently selected option in selectedOption
        if ( option === 'query') {
          if (el.checked) { 
            // !VA If the current element is checked, set its value to the selectionOption for return.
            selectedOption = el.value;
          }
        } else { 
          // !VA If the element ID contains the passed-in 'option' string, then set that element to checked and return that option in selectedOption.
          if (el.id.includes(option))  {
            el.checked = true;
            selectedOption = option;
          }
        }
      }
      return selectedOption;
    }

    function revealReset(alias) {
      let elArray = [], imgResetArray = [], tdaResetArray = [], resetArray = [];
      // !VA Get the list of elements in each UI group
      // !VA IMG UI Group - get all container elements into imgResetArray except:
      elArray = document.getElementsByClassName('ccp-ctn');
      for (let i = 0; i < elArray.length; i++) {
        if (elArray[i].id.substring( 4, 7  ) === ('img')) {
          imgResetArray.push(elArray[i]);
        }
      }
      // !VA TDA UI Group - get only the text input field and align container elements into tdaResetArray
      for (let i = 0; i < elArray.length; i++) {
        if (elArray[i].id.substring( 4, 7  ) === ('tda')) {
          if ( elArray[i].classList.contains('ccp-txfld-ctn') || elArray[i].classList.contains('ccp-align-ctn')) {
            tdaResetArray.push(elArray[i]);
          }
        }
      }
      if (alias === 'ccpImgExcldRdo') {
        // !VA If the target is IMG Excld or IMG Incld then include both IMG options and TDA options in the reset group because IMG EXCLD affects both of these option groups. That is because IMG EXCLD activates the TDA OPTNS 'basic' option and disables all the other options. So concatenate the imgResetArray and tdaResetArray to build the resetArray for the EXCLD option.
        resetArray = imgResetArray.concat(tdaResetArray);
      } else if ( alias === 'ccpTdaOptnsRdo') {
        // !VA If the target is one of the TDA OPTNS radio buttons, then only reset the options in the TDA option group
        resetArray = tdaResetArray; 
      } else if ( alias === 'ccpTblWraprChk') {
        // !VA If the target is the table wrapper icon, then only reset the elements in the table wrapper group
        console.log('ERROR in revealReset - alias not handled');
      } else {
        console.log('ERROR in revealReset - unknown alias');
      }
      
      for (let i = 0; i < resetArray.length; i++) {
        resetArray[i].classList.add('ccp-conceal-ctn');
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
            }, 50 * i);
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

    // !VA Reveal and conceal individual CCP container elements with sequential animation. flag specifies if the reveal class cpp-hide-ctn is to be added or removed: true = add, false = remove. aliasArray is the array of elements to reveal/conceal. Called from UIController.configCcpUI. 
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
            }, 35 * i);
          })(i);
        }
      }
      // !VA Loop through the passed-in aliasArray and for each array item:
      for (let i = 0; i < aliasArray.length; i++) {
        // !VA Run the callback function with the elArray array as parameter. This runs revealElements to reveal/conceal each of the array elements.
        revealCcpElements(elArray);
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
      getBtnCcpMakeClips: function() {
        return btnCcpMakeClips;
      },
      getAppMessageElements: function() {
        return appMessageElements;
      },

      // !VA UIController public
      // !VA Called from init(). Set dev mode options: Display toolbar, curImg, filename, display/undisplay CCP. Then initialize the UI: get localStorage and show dynamic containers and toolbar.
      initUI: function(initMode) {

        const delayInMilliseconds = 10;
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
        if ( configObj.radioState ) {
          radioState( configObj.radioState.option, configObj.radioState.alias );
        }
        if ( configObj.checkboxState ) {
          retVal = checkboxState( configObj.checkboxState.checked, configObj.checkboxState.alias );
        }
        if ( configObj.revealParent ) {
          retVal = revealParent( configObj.revealParent.flag, configObj.revealParent.reveal );
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

          // !VA Loop through all the ccpUserInput elements and add their values to Appobj. The last three characters ( 11 - last ) are the alias code that identify the input type
          // !VA Branch: OVERHAUL0828C
          // !VA  This should be done with Object.keys - value is unused here.
          for (const [key, value] of Object.entries(ccpUserInput)) {
            // !VA Write the text input element values to Appobj
            if (key.substring( 11 ) === 'Tfd') {
              Appobj[ key ] = fetchTextInput( key );
            }
            // !VA Write the Align/Valgn radio input element values to Appobj
            if (key.substring( 11 ).includes('Rdo')) {
              // !VA fetchRadioSelection gets the selected option for the align, valign, TD optns, IMG excld and IMG itype radio elements, which are then written to Appobj
              // !VA Branch: OVERHAUL0901A
              // !VA Replacing with radioState
              // Appobj[ key ] = fetchRadioSelection(key);
              // !VA Branch: OVERHAUL0901A
              Appobj[ key ] = radioState('query', key);
            }
            if ( key.substring( 11 ).includes('Chk')) {
              // !VA Write the checkbox element values to Appboj
              // debugger;
              Appobj[ key ] = checkboxState( 'query', key );
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
      },

      // !VA Branch: OVERHAUL0826A
      // !VA Added for cross-module access to get... functions
      // !VA UIController public
      // !VA Branch: OVERHAUL0901A
      // !VA What does this do now?
      getInputSelection: function( alias ) {
        let selectedOption;
        if (alias.includes('Rdo')) {
          selectedOption = radioState( 'query', alias );
        } else if ( alias.includes('Tfd')) {
          selectedOption = fetchTextInput( alias );
        } else if (alias.includes('Chk')) {
          selectedOption = checkboxState( 'query', alias );
        }
        return selectedOption;
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
    var btnCcpMakeClips = UIController.getBtnCcpMakeClips();

    // !VA ATTRIBUTE FUNCTIONS
    // !VA CBController   
    // !VA Branch: review0720C (071520)
    // !VA NOTE: All these attributes are set here prior to building the individual nodes. It is first called in buildOutputNodeList, and is passed to each make node function in succesion after that. So, it would make sense that getAttributes includes ALL the logic for rendering each attribute before it is passed to the respective make node function. 
    // !VA Set values for all the Attributes of the individual ccpUserInput elements. Each attribute is either get-only or settable. If it is get-only, then the user-defined value is accessed directly from the DOM element. If it is a preset, then the value is defined programmatically based on a condition. For instance, the class name 'img-fluid' is a preset that becomes active when the user selects the Fluid image option. In this case, the CCP element ID corresponding to the attribute is written to the ccpElementId variable. Otherwise, ccpElement takes the false flag.
    // !VA NOTE: Could probably make all the retObject arguments ccpElementId, str and consolidate this function somehow -- think about it.
    function getAttributes() {
      var Appobj = {};
      // !VA Branch: implementCcpInput02 (062420)
      // !VA We don't need the entire Appobj here. What we should do is call rest parameters on what we need and then destructure the return array into separate variables. This needs to be done when getAttributes is reevaluated since there appears to be a lot of unnecessary DOM access here.
      Appobj = appController.getAppobj();
      
      let checked, str, ccpElementId, imgType, Attributes, retObj;
      // !VA Branch: OVERHAUL0826A
      let appObjProp, selectedOption, inputVal;
      // !VA Create the array to return. First value is the id of the CCP element, second value is the string to write to the CCP element. If the first value is false, then the str isn't queried from a Ccp element, but rather is generated in the Attribute based on other conditions. For instance, the img style attribute is conditioned on the fluid/fixed option, but writes to the style attribute of the img tag.
      // !VA Branch: implementCcpInput06 (062820)
      // !VA I'm not sure I need to return the elementID at all. Wouldn't the identifier suffice? For later.
      function returnObject(ccpElementId, str ) {
        let obj = {};
        obj.id = ccpElementId;
        obj.str = str;
        return obj;
      }
      // !VA Branch: OVERHAUL0826A
      /* !VA  Notes: 
        *** ccpElementId was only used in getRadioState, which is now deprecated. So there's no need for ccpElementId - the description above about inluding the ID if the attribute doesn't ALWAYS get the value from Appobj doesn't make much sense . Replace it with alias, and if we need the ID we can get it from that.
      
      
      
      
      */
      Attributes = {
        imgClass: (function() {
          appObjProp = 'ccpImgClassTfd';
          var foo = Appobj['ccpImgItypeRdo'];
          foo === 'fixed' ? str = Appobj[appObjProp] : str = 'img-fluid';
          // str = Appobj[appObjProp];
          retObj = returnObject(appObjProp, str);
          return retObj;
        })(),
        imgWidth: (function() {
          // !VA Branch: implementCcpInput06 (062820)
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
          // !VA If the path input element is not empty, include the Appobj.ccpImgLoctnTfd, otherwise just use the filename without the path
          // !VA Branch: OVERHAUL0826A
          // !VA Removing the slash. From now, the path must be included, otherwise the inclusion of it here could corrupt img tokens or URLs.
          Appobj.ccpImgLoctnTfd !== '' ? str = Appobj.ccpImgLoctnTfd  + Appobj.fileName : str = Appobj.fileName;
          retObj = returnObject( appObjProp, str);
          return retObj;
        })(),
        imgExcld: (function() {
          // !VA Branch: OVERHAUL0827A
          // !VA Functionality for the IMG excld radio button. 
          // !VA First, get the selected option.
          appObjProp = 'ccpImgExcldRdo';
          selectedOption = Appobj[appObjProp];


        })(),
        imgStyle: (function() {
          // !VA Branch: implementCcpInput06 (062820)
          // !VA Set imgType according to radio button selection. This determines the style attribute that is output to the Clipboard. All the other imgType logic is in appController.
          // !VA Branch: OVERHAUL0826A
          // !VA This works now, but I'm not sure H and W attributes are supposed to be inluded in HTML for fluid option
          appObjProp = 'ccpImgItypeTfd';
          Appobj.ccpImgItypeRdo === 'fixed' ? imgType = 'fixed' : imgType = 'fluid';
          imgType === 'fixed' ? str = `display: block; width: ${Appobj.curImgW}px; height: ${Appobj.curImgH}px; font-family: Arial, sans-serif; font-size: 16px; line-height: 15px; text-decoration: none; border: none; outline: none;` : str = 'display: block; font-family: Arial, sans-serif; font-size: 16px; line-height: 15px; text-decoration: none; border: none; outline: none;';
          retObj = returnObject(ccpElementId , str);
          return retObj;
        })(),
        imgAlign: (function() {  
          appObjProp = 'ccpImgAlignRdo';
          str = Appobj[appObjProp];
          retObj = returnObject(appObjProp, str);
          return retObj;
        })(),
        imgIncludeAnchor: (function() {
          appObjProp = 'ccpImgAnchrTfd';
          str = Appobj[appObjProp];
          retObj = returnObject( appObjProp, str );
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
          selectedOption = Appobj[appObjProp];
          //   // !VA !VA  If the imgswap radio is selected, overwrite whatever is in the imgClass input with 'hide', set parent table class to 'devicewidth' and display it, set wrapper table class to 'devicewidth' and display it. Displaying/undisplaying and disabling/enabling is handled in handleCcpActions. 




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
          // !VA This value is get-only
          ccpElementId = false;
          // !VA 
          retObj = returnObject( ccpElementId, Appobj.ccpImgLoctnTfd + '/' + (Appobj.fileName) );
          return retObj;
        })(),
        // !VA TABLE attributes
        tableClass: (function() {
          // !VA This value depends on the status of the Fixed/Fluid image radio button, so use ccpElementId
          ccpElementId = ccpUserInput.ccpTblClassTfd;
          // !VA Branch: review0720F (071720)
          // !VA This is wonky
          if (imgType === 'fixed') {
            // !VA If imgType is fixed, then set tableClass to 'devicewidth' if the curImgW equals the imgViewerW. Otherwise, set it to the user input. 
            // !VA Branch: review0720F (071720)
            // !VA The default is set in the UI, so just set ccpTblClassTfd to the Appobj property.
            str = Appobj.ccpTblClassTfd;
          } else {
            // !VA If the imgType is fluid, set the class input value to the user input, even though that might have unforseen consequences for the user.
            str = '';
          }
          retObj = returnObject( ccpElementId, str );
          return retObj;
        })(),
        tableWidth: (function() {
          // !VA The value is written to the table width field - use ccpElementId
          // !VA Branch: review0720C (071520)
          // !VA Need handler for the empty input field here.
          ccpElementId = ccpUserInput.ccpTblWidthTfd;
          // !VA Branch: review0720F (071720)
          // !VA Add the condition that if tdoptions = excludeimg, str is the value of the input element, otherwise it is Appobj.curImgW
          // !VA Branch: review0720F (071720)
          // !VA And the other problem is that we have a different str output for fixed than fluid. If the tdoption is excludeImg, the output will ALWAYS be the fixed option because fixed is the default for the excludeimg tdoption. So first get the string if excludeimg is selected: 
          var fixedStr;
          // !VA Branch: review0720F (071720)
          // !VA I don't think this should be contingent on excludeimg - it should always show Appobj property. The default is set in the UI, I think. 
          fixedStr = Appobj.ccpTblWidthTfd;
          // !VA Now, set str based on whether fixed or fluid
          imgType === 'fixed' ? str = fixedStr : str = '100%';
          // !VA Then, if the tdoption is excludeimg, modify the imgTypeStr accordingly
          // !VA Include handling for imgType -- if fixed the input preset is Appobj.curImgW, if fluid then it is 100%
          // imgType === 'fixed' ? str = Appobj.curImgW : str = '100%';
          // imgType === 'fixed' ? str = Appobj.curImgW : str = '100%';
          retObj = returnObject( ccpElementId, str );
          return retObj;
        })(),
        tableBgcolor: (function() {
          // !VA This value is get-only
          ccpElementId = false;
          retObj = returnObject( ccpElementId, Appobj.ccpTblBgclrTfd);
          return retObj;
        })(),
        tableAlign: (function() {
          // !VA This value is get-only.
          ccpElementId = false;
          let str, selectid, options = [];
          selectid = ccpUserInput.ccpTblAlignRdo;
          options = [ '', 'left', 'center', 'right'];
          // !VA Get the string corresponding to the selectid index in the options array
          // !VA Branch: review0720F (071720)
          // !VA If imgType is fluid, then override the selection and pass 0 so the attribute will not be output to the clipboard
          str = options[getAlignAttribute(selectid)];
          // !VA Branch: review0720F (071720)
          // str = options[getAlignAttribute(selectid)];
          retObj = returnObject( ccpElementId, str );
          return retObj;
        })(),
        tableStyle: (function() {
          // !VA This value is get-only
          ccpElementId = false;
          // !VA Only include a style attribute for the wrapper for fluid images.  The conditional for this is in makeTableNode and there's no case where a style attribute is included for fixed images, so just provide the style attribute string to return
          // !VA Branch: review0720F (071720)
          // imgType === 'fixed' ? str = '' : str = `max-width: ${Appobj.curImgW } `;
          imgType === 'fixed' ? str = '' : str = '';
          retObj = returnObject( ccpElementId, str );
          return retObj;
        })(),
        // !VA Branch: OVERHAUL0826A
        // !VA Deprecating this now, will need to replace it with an attribute 
        // tableIncludeWrapper: (function() {
        //   ccpElementId = ccpUserInput.ccpTblWraprChk;
        //   checked = fetchCheckboxState(ccpElementId);
        //   retObj = returnObject( ccpElementId, checked );
        //   return retObj;
        // })(),
        tableWrapperClass: (function() {
          // !VA This value writes to the CCP in the class input so populate ccpElementId
          // !VA If imgType is fixed, set the default class to 'devicewidth'. If it's fluid, set it to 'responsive-table' as per the Litmus newsletter template.
          // !VA Branch: review0720F (071720)
          // !VA This is all wrong for imgType = responsive. 
          // !VA This should be disabled since it can't be changed, or it should be changeable.
          ccpElementId = ccpUserInput.ccpTbwClassTfd;
          // !VA Branch: review0720F (071720)
          // !VA The defaults are set in the UI. We don't need to handle them here. We need to handle the cases where the user overrides them with user input. Str should therefor always correspond to the Appobj property. This doesn't need to be contingent on excludeimg - unlike the tdoptions, the wrapper table options should be settable in any environment.
          str = Appobj.ccpTbwClassTfd;
          retObj = returnObject( ccpElementId, str );
          return retObj;
        })(),
        tableWrapperAlign: (function() {
          // !VA This value is get-only.
          ccpElementId = false;
          let str, selectid, options = [];
          selectid = ccpUserInput.ccpTbwAlignRdo;
          options = [ '', 'left', 'center', 'right'];
          // !VA Get the string corresponding to the selectid index in the options array
          str = options[getAlignAttribute(selectid)];
          retObj = returnObject( ccpElementId, str );
          return retObj;
        })(),
        tableWrapperWidth: (function() {
          // !VA This value depends on the selection under Fixed image. 
          ccpElementId = ccpUserInput.ccpTbwWidthTfd;
          // !VA If the imgTyp is fixed, set the wrapper width to the value of the input field, which for the most part will be imgViewerW. If it's fluid, set it to 100%
          // !VA Branch: review0720F (071720)
          // !VA The defaults are set in the UI. We don't need to handle them here. We need to handle the cases where the user overrides them with user input. Str should therefore always correspond to the Appobj property. This doesn't need to be contingent on excludeimg - unlike the tdoptions, the wrapper table options should be settable in any environment.
          imgType === 'fixed' ? str = Appobj.ccpTbwWidthTfd : str = '100%';
          retObj = returnObject( ccpElementId, str );
          return retObj;
        })(),
        tableWrapperBgcolor: (function() {
          // !VA This value is get-only.
          ccpElementId = false;
          retObj = returnObject( ccpElementId, Appobj.ccpTbwBgclrTfd);
          return retObj;
        })(),
        tableWrapperStyle: (function() {
          // !VA This value is get-only
          ccpElementId = false;
          // !VA Only include a style attribute for the wrapper for fluid images.  The conditional for this is in makeTableNode and there's no case where a style attribute is included for fixed images, so just provide the style attribute string to return
          // !VA Branch: review0720F (071720)
          // !VA This may be deprecated - max-width moved to tableStyle
          imgType === 'fixed' ? str = '' : str = `max-width: ${Appobj.curImgW }px; `;
          retObj = returnObject( ccpElementId, str );
          return retObj;
        })(),
      };
      // !VA Return the Attributes defined above. 
      return Attributes;
    }

    // !VA CBController   
    // !VA Branch: implementCcpInput05 (062720)
    // !VA Called multiple times from getAttributes
    // !VA Branch: OVERHAUL0828A
    // !VA Deprecating...
    function ccpGetAttValue(att, value) {
      // !VA Gets the insFilename from Appobj in case the user leaves 'path' empty
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
          // !VA Get the filename from Appobj.fileName
          str = `${att}="${appController.getAppobj('fileName')}" `;
        } else if ( att === '#' || att === '') {
          str = '';
        } else {
          // !VA If there is no input, exclude the attribute entry.
          str = '';
        }
      }
      return str;
    }

    // !VA CBController   
    // !VA The call to this is repetitive in getAttributes, could be DRYified. All this really needs to return is the selected. The options don't need to be passed in, they're local to each getAttributes property.
    // !VA Branch: OVERHAUL0828A
    // !VA This will be gone from getAttributes soon. Deprecating...
    function getAlignAttribute(selectid) {
      return document.querySelector(selectid).selectedIndex;
    }

    // !VA CBController   
    // !VA Omit a node attribute if the corresponding getAttributes Attribute is empty, i.e. the corresponding Appobj property/CCP element has no value. str is the Attribute object property. myNode is the current node, i.e. imgNode, tdNode, or tableNode. attr is the current attribute, i.e. className, alt, align etc. 
    function omitIfEmpty(str, myNode, attr) {
      // !VA If the Attribute is not empty, set the node attribute to the Attribute property. Otherwise, false for eventual error checking.
      str ? myNode[attr] = str : false;
      // return myNode[attr];
    }

    // !VA END ATTRIBUTE FUNCTIONS


    function getGhostTable() {
      let ghostopen, ghostclose;
      let ghosttable = [];
      ghostopen = 
`<!--[if (gte mso 9)|(IE)]>
<table align="center" border="0" cellspacing="0" cellpadding="0" width="${appController.getAppobj('curImgW')}">
<tr>
<td align="center" valign="top" width="${appController.getAppobj('curImgW')}">
<![endif]-->\n`;

      ghostclose = 
`\n<!--[if (gte mso 9)|(IE)]>
</td>
</tr>
</table>
<![endif]-->`;

      ghosttable = [ ghostopen, ghostclose ];
      return ghosttable;

    }

    // !VA CBController   
    // !VA Build the subset of nodes that will be populated with indents and output to the Clipboard. NOTE: outputNL can't be a fragment because fragments don't support insertAdjacentHMTL). So we have to create a documentFragment that contains all the nodes to be output, then append them to a container div 'outputNL', then do further processing on the container div.
    function buildOutputNodeList( id ) {
      let selectedTdOption, hasAnchor, hasWrapper, Attributes, tableNodeFragment, nl, frag, outputNL, clipboardStr;
      // !VA Get the selected TD option
      selectedTdOption = UIController.getInputSelection('ccpTdaOptnsRdo');
      // !VA Query Appobj for the Include anchor checkbox state: true = checked, false = unchecked

      // !VA Branch: OVERHAUL0826A
      // !VA Get the Attributes from which Clipboard strings are built
      Attributes = getAttributes();
      console.log(Attributes);
      
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
        // !VA ccpImgCbhtmBtn is clicked. We can hardcode the index where the extraction begins because the imgNode is created in makeTdNode and the ccpImgCbhtmBtn button click overrides any other makeNode button actions. 
        case ( '#' + id === btnCcpMakeClips.ccpImgCbhtmBtn):
          
          // !VA If hasAnchor === true then the checkbox is checked, so take the last two (i.e. A and IMG) nodes, otherwise just take the last (i.e. IMG) node.
          hasAnchor ? frag = nl[nl.length - 2] : frag = nl[nl.length - 1]; 
          break;
        // !VA ccpTdaCbhtmBtn is clicked. Here we handle the 'rdoCcpTdBasic', 'rdoCcpTdExcludeimg' and 'rdoCcpTdPosswitch' options because they process indents with no modifications. 'rdoCcpTdImgswap', 'rdoCcpTdBgimage' and 'rdoCcpTdVmlbutton' options are handled separately because they import comment nodes with MS conditional code
        case ( '#' + id === btnCcpMakeClips.ccpTdaCbhtmBtn):
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
        case ( '#' + id === btnCcpMakeClips.ccpTblCbhtmBtn):
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
        console.log('outputNL is: ');
        console.dir(outputNL);
        applyIndents( id, outputNL );
        // !VA Convert the nodeList to text for output to the clipboard.
        clipboardStr = outputNL[0].outerHTML;

        // !VA Branch: ghost01 (072820)
        // !VA If the fluid imgType option is selected, wrap the clipboardStr in the ghost table code.
        // !VA Branch: OVERHAUL0826A
        // !VA Disabling...
        // if ( appController.getAppobj('rdoCcpImgFluid')) {
        //   clipboardStr = getGhostTable()[0] + clipboardStr + getGhostTable()[1];
        // }






      // !VA These options include MS conditional code retrieved by getImgSwapBlock, getBgimageBlock, getVMLBlock which includes getIndent functions. First, run applyIndents on outputNL. applyIndents also inserts tokens at the position where the codeBlock is to be inserted. The parent nodelist is converted to a string, the code blocks are retrieved, indents are inserted, and finally the codeblocks are inserted into the string between the tags of the last node in the outputNL.outerHTML string. 

      } else if (selectedTdOption === 'iswap' || selectedTdOption  === 'bgimg' || selectedTdOption === 'vmlbtn') {
        
        // !VA Start with the ccpTdaCbhtmBtn makeNode button because the img makeNode button isn't referenced in the imgswap option. The A/IMG tags are hard-coded into the MS Conditional code in getImgSwapBlock. Also, there's a switch to include/exclude the A/IMG node in makeTdNode.
        // !VA extractNodeIndex is the nl index position at which the nodes are extracted to build outputNL. It equals the nodeList length minus the indentLevel.
        let extractNodeIndex;
        // !VA indentLevel is the number of indents passed to getIndent.
        let indentLevel;
        // !VA codeBlock is the MS conditional code block returned as string
        let codeBlock;
        // !VA If the makeTD button is clicked, then only the last node in nl is extracted and the MS conditional comments get one indent level
        // !VA NOTE: This code is repeated above in the if clause and again here in the else
        
        if ( '#' + id === btnCcpMakeClips.ccpTdaCbhtmBtn) {
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

        console.log('outputNL is: ');
        console.log(outputNL);

        applyIndents(id, outputNL);
        // !VA Convert outputNL to a string (including tokens for inserting MS conditional code) for output to Clipboard object.
        clipboardStr = outputNL[0].outerHTML;
        console.log('outputNL[0] is: ');
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
        console.log('clipboardStr is: ');
        console.log(clipboardStr);
      } 
      console.log('clipboardStr is:');
      console.log(clipboardStr);
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
      // if (!fetchCheckboxState(target) ) {
      //   index = 5;
      //   sibling1Ids.splice(index, 1);
      //   sibling1Elements.splice(index, 1);
      // } 
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
      // var target = ccpUserInput.ccpImgAnchrTfd;
      // if (!fetchCheckboxState(target)) {
      //   index = 7;
      //   nodeAttributes.splice(index, 1);
      // } 
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
      let imgNode, returnNodeFragment;
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
      // if(Attributes.imgIncludeAnchor.str === true) {
      //   let anchor = document.createElement('a');
      //   anchor.href = '#';
      //   // !VA Branch: implementClipboard01 (071020)
      //   // !VA Commenting color and target out for now
      //   // anchor.setAttribute('style', 'color: #FF0000');
      //   // anchor.setAttribute('target', '_blank');
      //   anchor.appendChild(imgNode);
      //   returnNodeFragment.appendChild(anchor);
      // } else {
      //   // !VA Otherwise, set returnNodeFragment to imgNode without the anchor.
      //   returnNodeFragment.appendChild(imgNode);
      // }
      // !VA Branch: OVERHAUL0826A
      // !VA Instead of the disabled instruction above...

      // !VA Branch: OVERHAUL0826A
      // !VA returnNodeFragment tested and OK
      returnNodeFragment.appendChild(imgNode);
      // !VA return the imgNode as node fragment;
      return returnNodeFragment;
    }

    // !VA Make the TD node
    // !VA CBController   
    function makeTdNode( id, Attributes ) {
      // !VA Variables for error handling - need to include this in the return value so the Clipboard object can differentiate between alert and success messages. 
      let isErr;
      // !VA Query Appobj to get the selected TD option
      let selectedTdOption;
      // !VA Branch: OVERHAUL0826A
      // !VA PRIORITY 1: replace this with UIController.fetchRadioSelection
      selectedTdOption = UIController.getInputSelection( 'ccpTdaOptnsRdo');
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
      var foo = tdNodeFragment.querySelectorAll('*');
      console.log(foo);
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

      // !VA Branch: review0720F (071720)
      // !VA 082520
      // !VA This element no longer exists -- replace with Overhaul version, in the meantime, disabling...
      // if (getRadioState(ccpUserInput.rdoCcpImgFluid)) {
      //   tableOuter.setAttribute('style', Attributes.tableStyle.str); 
      // }

      tableInner.border = '0', tableInner.cellSpacing = '0', tableInner.cellPadding = '0';
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
      // !VA tableOuter.className
      omitIfEmpty( Attributes.tableWrapperClass.str, tableOuter, 'className');
      // !VA tableOuter.align
      omitIfEmpty( Attributes.tableWrapperAlign.str, tableOuter, 'align');
      // !VA the default wrapper table width is the current display size - so it gets the value from the toolbar's Content Width field.
      // !VA Branch: review0720F (071720)
      // tableOuter.width = Attributes.tableWrapperWidth.str;
      omitIfEmpty( Attributes.tableWrapperWidth.str, tableOuter, 'width');
      // !VA tableOuter.bgColor - Pass the input value, don't prepend hex # character for now. 
      omitIfEmpty( Attributes.tableWrapperBgcolor.str, tableOuter, 'bgColor');
      // !VA Style attribute - only included for fluid images

      // !VA Branch: OVERHAUL0826A
      // !VA Element no longer exists, disabling
      // !VA This may be deprecated
      // if (getRadioState(ccpUserInput.rdoCcpImgFluid)) {
      //   tableOuter.setAttribute('style', Attributes.tableWrapperStyle.str); 
      // }
      // !VA Add default border, cellspacing, cellpadding and role for accessiblity
      tableOuter.border = '0', tableOuter.cellSpacing = '0', tableOuter.cellPadding = '0';
      tableOuter.setAttribute('role', 'presentation'); 
      // !VA Append the outer tr to the wrapper
      tableOuter.appendChild(trOuter);
      // !VA Append the outer td to the outer tr
      trOuter.appendChild(tdOuter);


      // !VA Branch: ghost01 (072820)


      // !VA Add the outer td attributes
      // !VA Add to the node only if the option 'none' is not selected
      if (Attributes.tdAlign.str) { tdOuter.align = Attributes.tdAlign.str; }
      // !VA valign attribute
      // !VA Add to the node only if the option 'none' is not selected
      if (Attributes.tdValign.str) { tdOuter.vAlign = Attributes.tdValign.str; }
      // !VA Append the inner table to the outer table's td
      tdOuter.appendChild(tableInner);
      // !VA Pass the outer table to the tableNodeFragment.
      // tableNode = tableOuter;
      // !VA Append the wrapper table to the node fragment and return it

      // !VA Branch: OVERHAUL0826A
      // !VA TableNodeFragment tested and OK
      tableNodeFragment.appendChild(tableOuter);
      var foo;
      foo = tableNodeFragment.querySelectorAll('*');
      console.log('foo is: ');
      console.log(foo);

      return tableNodeFragment;
    }
    // !VA  END NODE FUNCTIONS

    // !VA START TD OPTIONS MS-CONDITIONAL CODE BLOCKS
    // !VA These are the code blocks that contain MS conditionals in comment nodes or text nodes, i.e. mobile swap, background image, and vmlbutton
    // !VA UIController   
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
      // !VA Deprecating...
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
      console.log('makeCssRule Appobj is: ');
      console.log(Appobj);
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
    const btnCcpMakeClips =  UICtrl.getBtnCcpMakeClips();
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
      var btnCcpMakeClipIds = Object.values(btnCcpMakeClips);
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
      var btnCcpMakeClipIds = Object.values(btnCcpMakeClips);
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
      
      // !VA We need eventListeners for ALL the clipboard buttons so make an eventListener for each value in the btnCcpMakeClips object. We need a for in loop for objects
      for(let i in btnCcpMakeClips) {
        // !VA loop through the object that contain the id and func properties.
        let clipBut;
        if(btnCcpMakeClips.hasOwnProperty(i)){
          clipBut = document.querySelector(btnCcpMakeClips[i]);
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

      // !VA Branch: OVERHAUL0825C
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
 

      // !VA Branch: OVERHAUL0825B
      // !VA Deprecating...
      // let ccpDropdowns;
      // for(let i in ccpUserInput) {
      //   if (ccpUserInput[i].substring(0,4) === '#sel') {
      //     ccpDropdowns = document.querySelector(ccpUserInput[i]);
      //     addEventHandler(ccpDropdowns,'change',handleCcpDropdowns,false);
      //   }
      // }

      // !VA Branch: OVERHAUL0825B
      // !VA Deprecating...
      // let includeWrapperCheckbox = document.querySelector(ccpUserInput.cccpTblWraprChk);
      // addEventHandler(includeWrapperCheckbox,'click',toggleCheckbox,false);

      // !VA Branch: OVERHAUL0825B
      // !VA Deprecating...
      // let includeAnchorCheckbox = document.querySelector(ccpUserInput.ccpImgAnchrTfd);
      // addEventHandler(includeAnchorCheckbox,'click',toggleCheckbox,false);

      // !VA KEYBOARD HANDLERS
      // -----------------------
      // !VA Branch: implementClipboard01 (071020)
      // !VA Handle the Toolbar input elements separately from the Toolbar increment/decrement buttons because the buttons are handled by mouseclick or by default as mouseclicks when ENTER is pressed, so none of these handlers apply to those buttons.
      // !VA Add event handlers for input toolbarElements. This could be merged with ccpInputs below but leave it for now.
      const toolbarInputs = [ toolbarElements.iptTbrImgViewerW, toolbarElements.iptTbrCurImgW, toolbarElements.iptTbrCurImgH, toolbarElements.iptTbrSPhonesW, toolbarElements.iptTbrLPhonesW ];
      for (let i = 0; i < toolbarInputs.length; i++) {
        // !VA convert the ID string to the object inside the loop
        toolbarInputs[i] = document.querySelector(toolbarInputs[i]);
        addEventHandler((toolbarInputs[i]),'keydown',handleKeydown,false);
        addEventHandler((toolbarInputs[i]),'keyup',handleKeyup,false);
        addEventHandler((toolbarInputs[i]),'focus',handleFocus,false);
        // !VA Handle the mouse-initiated blurring of inputs in the blur handler of handleMouseEvents
        addEventHandler((toolbarInputs[i]),'blur',handleMouseEvents,false);
      }

      // !VA Branch: OVERHAUL0825C
      // !VA Add input event listeners to run showElementOnInput for all labelled text input elements, i.e. elements whose alias ends in Tfd, and unlabelled child input elements of the padding group container. 
      // !VA Loop through all the properties of ccpUserInput
      for (const property in ccpUserInput) {
        var el, iptId, firstChld, nextSibling;
        // !VA Add event listeners for all labelled text input elements, i.e. those whose alias ends in Tfd. 
        if (property.includes('Tfd')) {
          iptId = ccpUserInput[property].replace('tfd', 'ipt');
          el = document.querySelector(iptId);
          addEventHandler(el,'input',handleTextInputEvent,false);
          addEventHandler(el,'keydown',handleKeydown,false);
          addEventHandler(el,'keyup',handleKeyup,false);
          addEventHandler(el,'focus',handleFocus,false);
          // !VA Handle the mouse-initiated blurring of inputs in the blur handler of handleMouseEvents
          addEventHandler(el,'blur',handleMouseEvents,false);
        }
        // !VA Add event listeners for the unlabelled child input elements of the padding input container.
        if (property.includes('Padng')) {
          // !VA The first child of the padding container is the icon. 
          // !VA 082520
          // !VA There should be an alias for this - it gets used in at least two places
          firstChld = document.querySelector('#ccp-tda-padng-icn');
          // !VA The next sibling of the icon is the first text input element.
          nextSibling = firstChld.nextElementSibling;
          // !VA Loop through the text input elements until there are no more.
          while(nextSibling) {
            // Add an input event listener for each of the child input element of the parent container
            addEventHandler(nextSibling,'input',handleTextInputEvent,false);
            addEventHandler(nextSibling,'keydown',handleKeydown,false);
            addEventHandler(nextSibling,'keyup',handleKeyup,false);
            addEventHandler(nextSibling,'focus',handleFocus,false);
            addEventHandler(nextSibling,'blur',handleMouseEvents,false);
            nextSibling = nextSibling.nextElementSibling;
          }
        }
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
    // !VA Handle behavior when an element gets the focus. Pertains only to keyboard input, actually, I'm not sure whether buttons or CCP elements need special handling. Takes no argument because this is used instead of the passed event.
    function handleFocus(evt) {
      // !VA Don't forget that it was the CSS user-select property that was causing the non-default input behavior in the Toolbar elements. That CSS property is disabled now, so all we have to do is this.select on focus for all alements
      this.select();
    }

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
    // !VA Called from handleKeydown. Applies the user-entered input value in the Toolbar or CCP, i.e. writes the value to Appobj and, if Toolbar, runs writeToolbarInputToAppobj which then runs calcViewerSize to update the dynamicElements with the new value.
    // !VA NOTE: This is probably a functional dupe of writeToolbarInputToAppobj
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
      // !VA 3) For toolbarElements, create a new obj with evtTargetVal and appObjProp to pass to writeToolbarInputToAppobj. writeToolbarInputToAppobj writes new values to localStorage and resizes the dynamicElements based on the user input. writeToolbarInputToAppobj contains the aspect ratio logic to get the adjacent dimension from a curImg value. 
      // !VA IMPORTANT: This works but it sucks. We're only running this now to set the localStorage and to get the adjacent side curImg dimensions. writeToolbarInputToAppobj doesn't reflect what's being done in that function, and it should be reevaluated in any case. Also, the below condition with all the OR conditions isn't good - but for now, need to move on.
      if (appObjProp === 'curImgW' || appObjProp === 'curImgH' || appObjProp === 'imgViewerW' || appObjProp === 'sPhonesW' || appObjProp === 'lPhonesW' ) {
        inputObj.evtTargetVal = Appobj[appObjProp];
        inputObj.appObjProp = appObjProp;
        writeToolbarInputToAppobj(inputObj);
      }
    }

    // !VA appController   
    // !VA Called from tbClickables event handler. Handles clicks on the Toolbar increment/decrement buttons and handles blur for Toolbar and ccpUserInput input elements, which facilitates error-checking and applying values on blur with the mouse, allowing users to mouse through inputs, entering values as they go without having to press TAB or ENTER. To do this, it dispatches a keydown keyboardEvent for the TAB key to the current input element to simulate the keypress. Also handles drop and dragover events, applying preventDefault.
    function handleMouseEvents(evt) {
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
      if (event.type === 'click') {
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
          // !VA If checkNumericInput is not false, pass the curImgW property name and evtTargetVal to writeToolbarInputToAppobj to update Appobj.curImgW and resize the dynamicElements accordingly. If it returns false, then an error message is displayed, so return without updating any values or dynamicElements.
          if (retVal !== false ) {
            writeToolbarInputToAppobj(userInputObj);
          } else {
            return;
          }
        }
      // !VA Handle mouse-initiated blur events. This is called from the event handler for the respective input field. This facilitates error-checking and applying values on blur with the mouse, and allows users to mouse through inputs, entering values as they go without having to press TAB or ENTER.
      }  else if ( event.type === 'blur') {
        // !VA First, select all the input elements - their mouse-initiated blur action will be handled here.
        if (evt.target.id.substring( 14 ) === 'ipt') {
          // !VA On blur with the mouse from input fields, dispatch a TAB keypress from the respective input to simulate a TAB keypress. 
          userInputObj.appObjProp = evtTargetIdToAppobjProp(evt.target.id);
          userInputObj.evtTargetVal = evt.target.value;
          // !VA The userInputObj values have to be error-checked here to ensure that the TAB keypress isn't dispatched with invalid values in userInputObj. 
          retVal = checkUserInput( userInputObj );
          // !VA These are the cases where the TAB key is dispatched - error conditions and user-initiated changes. For these cases, handleKeydown and the respective input handler appears to run twice, but it doesn't appear to cause any errors because the second time the input value hasn't changed - and there doesn't appear to be any way to avoid it. For the other cases, handleKeydown only runs once.  
          if ( retVal === false  || Appobj[userInputObj.appObjProp] !== userInputObj.evtTargetVal) {
            // !VA Get the element to which the TAB keypress should be dispatched, i.e. the current element.
            document.querySelector( '#' + evt.target.id).dispatchEvent(
              new KeyboardEvent('keydown', {
                key: 'Tab',
                keyCode: 9, // example values.
                code: 'Tab', // put everything you need in this object.
                which: 9,
                shiftKey: false, // you don't need to include values
                ctrlKey: false,  // if you aren't going to use them.
                metaKey: false   // these are here for example's sake.
              })
            );
          }
        // !VA The element was not an input element and so is not handled by the blur handler yet.
        } else {
          console.log('ERROR in handleMouseEvents - not an INPUT element');
        }
      // !VA Handle drop events
      } else if ( event.type === 'drop') {
        evt.preventDefault;
        // !VA TODO: Revisit this
      } else if ( event.type === 'dragover') {
        evt.preventDefault;
      } else {
        console.log('ERROR in handleMouseEvents - unknown event type');
      }
    }

    // !VA Called from handleKeydown to handle CCP element user input. Runs checkUserInput to check for error conditions. If checkUserInput returns a value, further actions (i.e. writing to Appobj) are handled in the blur handler of handleMouseEvents. If error checking fails, writes an error message to the console and returns control to handleKeydown to handle the input elements on error.
    function handleCcpInput(keydown, userInputObj) {
      // !VA priorVal is the Appobj property value that was replaced by the new evtTargetVal
      let retVal, priorVal, configObj;
      // !VA Destructure userInputObj.
      let { appObjProp, evtTargetVal } = userInputObj;
      // !VA Save the existing Appobj property value to priorVal
      priorVal = Appobj[appObjProp];
      // !VA Save the current evtTargetVal to Appobj pending error checking. 
      Appobj[appObjProp] = evtTargetVal;
      // !VA Error check the userInputObj, which contains the current Appobj property. If it passes error-checking, then retVal returns the value as type number

      // !VA Branch: review0720F (071720)
      // !VA If evtTargetVal is '', then it is falsy and checkUserInput will return false, even though the empty value is required to populate the Appobj property. So if evtTargetVal is empty, set retVal, appObjProp, userInputObj.evtTargetVal and the Appobj property to evtTargetVal, i.e. ''. 
      if (evtTargetVal === '') {
        userInputObj.evtTargetVal = Appobj[appObjProp] = retVal = evtTargetVal;
        console.log('handleCcpInput evtTargetVal is EMPTY ');
      }
      else {
        retVal = checkUserInput( userInputObj);
        // !VA If evtTargetVal is not empty, run the error-check
        if (retVal !== false) {
          // !VA If checkUserInput returns truthy, evtTargetVal and userInputObj.evtTargetVal to the error-checked retVal, which now has the type number, and also set the Appobj property to this, overwriting the prior value if there is one
          // !VA If no error, set 
          evtTargetVal = userInputObj.evtTargetVal = Appobj[appObjProp] = retVal;
        } else {
          // !VA If error-checking failed, restore the prior value from priorVal and write that value back to the current input element.
          evtTargetVal = userInputObj.evtTargetVal = Appobj[appObjProp] = priorVal;
          console.log('evtTargetVal is RESTORED: ' + evtTargetVal);
          // !VA Branch: OVERHAUL0902A
          // !VA This is a problem -- writeAppobjToDom is no more.
          // UIController.writeAppobjToDOM( [ appObjProp, priorVal ] );
          // !VA Write the priorVal back to Appobj
          Appobj[appObjProp] = priorVal;
          configObj = { 
            reflectAppobj: { reflect: [ appObjProp] } 
          };
          UIController.configCCP( configObj );
        }
      }
      // !VA Return retVal: either '', an integer or false
      return retVal;
    }

    // !VA appController  
    // !VA Called from handleKeydown to handle Toolbar element user input. Runs checkUserInput to check for error conditions. If checkUserInput returns a value, runs applyInputValue to write the value to the corresponding Appobj property and update the dynamicElements dimensions. If error checking fails, writes an error message to the console and returns control to handleKeydown to handle the input elements on error.
    function handleTbrInput(keydown, userInputObj) {
      console.log('handleTbrInput running');
      let retVal;
      // !VA Destructure userInputObj.
      let { appObjProp, evtTargetVal } = userInputObj;
      // !VA Exception: For curImgW and curImgH, if user tabs out of the input field without entering a value, skip to the end of the function and override all input handling and error checking. This is only possible because these fields are empty by default. Any field that already has a value has to be error checked. 
      if (  userInputObj.appObjProp !== 'curImgW' && userInputObj.evtTargetVal !== ''  ||   userInputObj.appObjProp !== 'curImgH' && userInputObj.evtTargetVal !== '' ) {
        // !VA Now do the error checking and return an integer if no error. Number type is required to compare evtTargetVal and the Appobj property, which is stored as type number.
        retVal = checkUserInput( userInputObj );
        // !VA NOTE: does changing the variable also change the destructured object property?
        // !VA Set evtTargetVal and userInputObj.evtTargetVal to retVal - userInputObj must also pass an integer of type number
        evtTargetVal = userInputObj.evtTargetVal = retVal;
        // !VA If checkUserInput returned a value instead of false, there was no error, so process the input
        if (retVal !== false ) {
          // !VA If the user changed the value, i.e. evtTargetVal !== Appobj[appObjProp], run applyInput to copy the value to Appobj[appObjProp] and update the dynamicRegions if applicable.
          if (evtTargetVal !== Appobj[appObjProp] ) {
            if (keydown == 9 ) {
              // !VA No change to the default TAB behavior for changed values
              applyInputValue(userInputObj);
              // !VA Set the value of the input to null for curImgW and curImgH so the placeholder shows
              if (appObjProp === 'curImgW' || appObjProp === 'curImgH') {
                document.querySelector(toolbarElements[appObjPropToAlias(appObjProp)]).value = '';
              }
            } else if (keydown == 13) {
              // !VA We have to run applyInputValue here otherwise no action will occur. This results in applyInputValue being run again on blur, not ideal but acceptable.
              applyInputValue(userInputObj);
            } else {
              console.log('ERROR in handleKeydown - unknown key code ');
            }
          } else {
            console.log('INPUT VALUE UNCHANGED');
            if (keydown == 9 || keydown == 13 ) {
              // console.log('TAB or ENTER - UNCHANGED');
              if (appObjProp === 'curImgW' || appObjProp === 'curImgH') {
                document.querySelector(toolbarElements[appObjPropToAlias(appObjProp)]).value = '';
              }
            } else {
              console.log('ERROR in handleKeydown - unknown key code ');
            } 
          }
        }  else if ( retVal === false ) {
          if (keydown == 9 || keydown == 13) {
            // debugger;
            // !VA Set the value of the input to null for curImgW and curImgH so the placeholder shows
            if (appObjProp === 'curImgW' || appObjProp === 'curImgH') {
              document.querySelector(toolbarElements[appObjPropToAlias(appObjProp)]).value = '';
            }
          }
          // !VA ERROR condition
 
        } else {
          console.log('ERROR in handleKeydown - unknown condition ');
        }
      }
      return retVal;
    }

    function handleKeydown(evt) {
      let retVal;
      // !VA Get the keypress
      let keydown = evt.which || evt.keyCode || evt.key;
      // !VA userInputObj is the array containing the values needed to check input, evaluate the Toolbar input, and update Appobj prior to writing dynamicElements to the DOM after user input in the Toolbar input fields.
      const userInputObj = { };
      // !VA Add the event target ID to userInputObj. We will need this later to select toolbarElements since their property names don't correspond to the toolbarElements aliases. This is a structural issue that I'm not going to deal with now, if ever.
      // !VA Branch: implementCcpInput09 (070220)
      // !VA I don't think I need the ID...test it.
      // userInputObj.evtTargetId = evt.target.id;
      // !VA If TAB or ENTER
      if (keydown == 9 || keydown == 13) {
        // console.log('TAB or ENTER');
        // !VA evtTargetIdToAppobjProp gets the Appobj key that corresponds to a given element ID. We need the Appobj key to get the Appobj value to compare to the user-entered value in the respective Toolbar input field. 
        userInputObj.appObjProp = evtTargetIdToAppobjProp(evt.target.id);
        // !VA evtTargetVal is the value the user entered into the input element as integer.
        userInputObj.evtTargetVal = evt.target.value;
        // console.log('handleKeydown userInputObj is: ');
        // console.log(userInputObj);
        // !VA Now that userInputObj is created for passing as argument, destructure it to use appObjProp locally.  
        let { appObjProp } = userInputObj;
        console.log('appObjProp is: ' + appObjProp);
        // !VA CCP-specific keydown handling. CCP input elements, unlike Toolbar elements, have no existing values and can be empty. So in order to error-check the current evtTargetVal and restore it to its prior value if the current evtTargetVal fails error-checking: 1) the prior Appobj property has to be temporarily stored and 2) the current evtTargetVal has to be error-checked and then written to Appobj. 
        // !VA 082520
        // !VA Change to the Overhaul substring code
        if ( evt.target.id.substr( 0, 3 ) === 'ccp') {
          if ( keydown === 9) {
            retVal = handleCcpInput(keydown, userInputObj);
            if (retVal === false ) {
              this.value = Appobj[appObjProp];
              this.select();
              evt.preventDefault();
            }
          } else if ( keydown === 13) {
            retVal = handleCcpInput(keydown, userInputObj);
            if (retVal === false) { 
              this.value = Appobj[appObjProp];
              this.select();
            }
          } else {
            console.log('ERROR in handleKeydown - unknown keypress');
          }

        // !VA 082520
        // !VA Demonstrates that Toolbar element nomenclature needs an overhaul too.
        } else if ( evt.target.id.substr( 3, 4 ) === '-tbr') {
          // !VA Branch: review0720H (072020)
          // !VA Comment this
          if ( keydown === 9) {
            retVal = handleTbrInput(keydown, userInputObj);
            // !VA Handle error conditions
            if (retVal === false ) {
              // !VA The value of curImgW and curImgH has to be empty in order for the placeholder values to show, so stay in the input element and leave the cursor so the user can enter another value or TAB/ESC out. 
              if (appObjProp === 'curImgW' || appObjProp === 'curImgH'  ) {
                evt.preventDefault();
              } else {
                this.value = Appobj[appObjProp];
                this.select();
                evt.preventDefault();
              }
            }
          } else if ( keydown === 13) {
            retVal = handleTbrInput(keydown, userInputObj);
            if (retVal === false ) {
              this.value = Appobj[appObjProp];
              this.select();
            }
          } else {
            console.log('ERROR in handleKeydown - unknown keypress');
          }
        }
      }
    }




          
    // !VA appController function
    // !VA NOTE: Tab needs to be in a keyDown because keyup is too late to trap the value before the default behavior advances ot the next field.
    // !VA Handles keyboard input for all UI elements. Called from event listeners for tbKeypresses and ccpKeypresses. Sorts keypresses by data types number and string based on the target input element. Calls checkUserInput which validates the input and returns either an integer or a string and passes the value to applyInputValue to write to Appobj and the DOM. Then, for curImgW/curImgH, sets the input value to '' so the placeholder shows through. For all other input elements, sets the input value to the respective Appobj property.
    function handleKeydownOLD(evt) {
      let retVal;
      let target;
      target = evt.target;
      // !VA Get the keypress
      let keydown = evt.which || evt.keyCode || evt.key;
      // !VA userInputObj is the array containing the values needed to check input, evaluate the Toolbar input, and update Appobj prior to writing dynamicElements to the DOM after user input in the Toolbar input fields.
      const userInputObj = { };
      // !VA Add the event target ID to userInputObj. We will need this later to select toolbarElements since their property names don't correspond to the toolbarElements aliases. This is a structural issue that I'm not going to deal with now, if ever.
      // !VA Branch: implementCcpInput09 (070220)
      // !VA I don't think I need the ID...test it.
      userInputObj.evtTargetId = evt.target.id;
      // !VA If TAB or ENTER
      if (keydown == 9 || keydown == 13) {
        console.log('TAB or ENTER');
        // !VA evtTargetIdToAppobjProp gets the Appobj key that corresponds to a given element ID. We need the Appobj key to get the Appobj value to compare to the user-entered value in the respective Toolbar input field. 
        userInputObj.appObjProp = evtTargetIdToAppobjProp(evt.target.id);
        // !VA evtTargetVal is the value the user entered into the input element as integer.
        userInputObj.evtTargetVal = evt.target.value;
        // !VA Now that userInputObj is created for passing as argument, destructure it to use locally.
        let { appObjProp, evtTargetVal } = userInputObj;

        // !VA Branch: review0720D (071620)
        // !VA There needs to be an escape handler if either curImgW/curImgH is empty OR userInputObj.evtTargetVal = userInputObj.appObjProp, i.e. the user has tabbed out of the input without making a change. But first, we have to validate the input in order to convert the 


        // !VA Exception: For curImgW and curImgH, if user tabs out of the input field without entering a value, skip to the end of the function and override all input handling and error checking. This is only possible because these fields are empty by default. Any field that already has a value has to be error checked. 
        if (  userInputObj.appObjProp !== 'curImgW' && userInputObj.evtTargetVal !== ''  ||   userInputObj.appObjProp !== 'curImgH' && userInputObj.evtTargetVal !== '' ) {
          // !VA Now do the error checking and return an integer if no error. Number type is required to compare evtTargetVal and the Appobj property, which is stored as type number.
          retVal = checkUserInput( userInputObj );
          // !VA NOTE: does changing the variable also change the destructured object property?
          // !VA Set evtTargetVal and userInputObj.evtTargetVal to retVal - userInputObj must also pass an integer of type number
          evtTargetVal = userInputObj.evtTargetVal = retVal;
          console.log('handleKeydown evtTargetVal is: ' + typeof(evtTargetVal)); 
          console.log('handleKeydown appObjProp is: ' + appObjProp); 
          console.log('handleKeydown Appobj[appObjProp] is: ' + Appobj[appObjProp]); 
          // !VA If checkUserInput returned a value instead of false, there was no error
          if (retVal !== false ) {
            // !VA If the user changed the value, i.e. evtTargetVal !== Appobj[appObjProp], run applyInput to copy the value to Appobj[appObjProp] and update the dynamicRegions if applicable.
            if (evtTargetVal !== Appobj[appObjProp] ) {
              console.log('CHANGED');
              // applyInputValue( userInputObj );
              if (keydown == 9 ) {
                // !VA No change to the default TAB behavior for changed values
                console.log('TAB - CHANGED');

              } else if (keydown == 13) {
                // !VA We have to run applyInputValue here otherwise no action will occur. This results in applyInputValue being run again on blur, not ideal but acceptable.
                applyInputValue(userInputObj);
                console.log('ENTER - CHANGED');
                // !VA No change to the default ENTER behavior for changed values
              } else {
                console.log('ERROR in handleKeydown - unknown key code ');
              }
            } else {
              console.log('INPUT VALUE UNCHANGED');
              if (keydown == 9 ) {
                console.log('TAB - UNCHANGED');
                // !VA Do nothing
              } else if (keydown == 13 ) {
                console.log('ENTER - UNCHANGED');
                // !VA Do nothing
              } else {
                console.log('ERROR in handleKeydown - unknown key code ');
              }
            }
          }
        } 
      }
    }


    // !VA appController  
    // !VA TODO: Why are there unused elements and what is actually happening here?
    // !VA keyPress handler for the ESC key.  This has to be handled on keyup, so we need a separate handler for it.
    function handleKeyup(evt) {
      let keyup;
      // !VA Find out which key was struck
      keyup = evt.which || evt.keyCode || evt.key;
      // !VA  On ESC, we want curImgW and curImgH to exit the field and go back to showing the placeholders defined in the CSS. This is because these values are already provided in the inspectorElements and there's no need to recalc the W and H each time the user makes and entry - that would just be confusing. For imgViewerW, sSphonesW and lPhonesW, revert to the previously displayed value if the user escapes out of the input field. The previously displayed value will be either 1) the default in the HTML placeholder attribute or 2) the localStorage value. So, the localStorage value is false, get the placeholder, otherwise get the localStorage value.
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
      // !VA Distinguish between elements that allow percent input, elements that allow string input and elements that allow numeric input. Percent inputs validate the percent value and return it with no further error checking. Numeric input elements have validation with error codes that display error messages. String inputs have no validation currently, but validation for hex color codes might be an option.
      let numericInputs, stringInputs, retVal, val, percentVal;
      percentInputs = [ 'ccpTdaWidthTfd', 'ccpTblWidthTfd', 'ccpTbwWidthTfd']
      numericInputs = [ 'imgViewerW', 'curImgW', 'curImgH',  'sPhonesW', 'lPhonesW', 'ccpTdaHeigtTfd', 'ccpTdaWidthTfd', 'ccpTblWidthTfd', 'ccpTblMaxwdTfd', 'ccpTbwWidthTfd', 'ccpTbwMaxwdTfd', 'ccpTdaBdradTfd' ];
      stringInputs = ['ccpImgClassTfd', 'ccpImgAltxtTfd', 'ccpImgAnchrTfd', 'ccpImgTxclrTfd', 'ccpImgLoctnTfd', 'ccpTdaClassTfd', 'ccpTdaBgclrTfd', 'ccpTdaTxclrTfd', 'ccpTdaBdclrTfd', 'ccpTblClassTfd', 'ccpTblBgclrTfd', 'ccpTbwClassTfd', 'ccpTbwBgclrTfd' ];

      // !VA Determine if the numeric portion of evtTargetVal; is a valid percent value 
      function checkPercent(val) {
        // !VA Slice the percent sign off of evtTargetVal to test the rest of the value for valid percent
        var val = evtTargetVal.slice( 0, -1 );
        // !VA Test val for valid percent
        var x = parseFloat(val);
        // !VA Test if the value is in percentage range
        if (isNaN(x) || x < 0 || x > 100) {
          // !VA If it is out of range, return false
          console.log('Out of range');
          percentVal = false;
        } else {
          // !VA If it is within the valid percentage range, add the percent character back at the end and return it - it now has the type 'string'
          console.log('valid percent');
          var percentVal = x + '%';
        }
        return percentVal
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
        if ( userInputObj.appObjProp.substring( 3 , 6 ) === 'Ccp' && userInputObj.evtTargetVal === '' ) {
          // !VA The CCP input field is empty - do nothing.
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
      // !VA Destructure userInputObj
      const { appObjProp, evtTargetVal } = userInputObj;
      // !VA The code that will be passed to getAppMessageStrings
      let appMessCode, isErr, retVal;
      // !VA The flag indicating an error condition,
      isErr = false;
      // !VA TODO: Setting maxViewerWidth just for now
      var maxViewerWidth = 800;
      // !VA If appObjProp refers to one of the CCP elements that require numeric input
      // !VA First, validate that the user-entered value is an integer. validateInteger returns false if the input is either not an integer or is not a string that can be converted to an integer. Otherwise, it returns the evtTargetVal as a number.

      retVal = validateInteger(evtTargetVal);

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
          if (evtTargetVal > Appobj.imgViewerW ) {
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
          if (evtTargetVal < Appobj.curImgH ) {
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
            else if ( evtTargetVal > Appobj.ccpTblWidthTfd ) {
              isErr = true;
              appMessCode = 'err_table_cell_wider_than_parent_table';
            }
          } 
          if ( evtTargetVal > Appobj.imgViewerW ) {
            isErr = true;
            appMessCode = 'err_cell_wider_than_parent_table';
          }
          break;
        case (appObjProp === 'ccpTblWidthTfd') :
          if (Appobj.rdoCcpTdExcludeimg) {
            if (evtTargetVal > Appobj.imgViewerW) {
              isErr = true;
              console.log('larger than imgViewerW');
              appMessCode = 'err_table_wider_than_wrapper';
            } else if ( evtTargetVal < Appobj.ccpTdaWidthTfd ) {
              console.log('err_table_cell_wider_than_parent_table');
              isErr = true;
              appMessCode = 'err_table_cell_wider_than_parent_table';
            }
          } else {
            if (evtTargetVal < Appobj.curImgW ) {
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
            if (evtTargetVal > Appobj.imgViewerW) {
              isErr = true;
              console.log('');
              appMessCode = 'err_wrapper_table_wider_than_devicewidth';
            } else if ( evtTargetVal < Appobj.ccpTblWidthTfd ) {
              console.log('err_parent_table_greater_than_wrapper');
              isErr = true;
              appMessCode = 'err_parent_table_greater_than_wrapper';
            }
          } else {
            if (evtTargetVal < Appobj.curImgW ) {
              // !VA errorHandler!
              isErr = true;
              appMessCode = 'err_img_wider_than_parent_table';
            } 
          }
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
      return retVal;
    }

    // !VA appController  
    // !VA Called by checkUserInput. Includes any validation or error checking on input elements that take values of type string. Only applies to CCP input elements that take text input, as defined in handleKeydown. i.e. class, alt, relpath, bgcolor, etc input elements. 
    function checkTextInput(userInputObj) {
      let retVal;
      // !VA Destructure userInputObj
      // !VA TODO: I don't think evtTargetId is ever used...remove?
      // const { evtTargetId, appObjProp, evtTargetVal } = userInputObj;
      const { appObjProp, evtTargetVal } = userInputObj;
      // !VA Add string validation here if required
      retVal = evtTargetVal;
      return retVal;
    }

    // !VA appController  
    // !VA Called from applyInputValue and handleMouseEvents. This function name is a misnomer here. More importantly than writing to Appobj, this function writes imgViewerW, sPhonesW and lPhonesW to localStorage and calculates the adjacent side of the curImgW/curImgH input, then runs calcViewerSize to resize the dynamicElements containers. NOTE: This function does things that are done elsewhere and does other things that it shouldn't do. Revisit this at some point but for now it works.
    function writeToolbarInputToAppobj(userInputObj) {
      // !VA Initialize vars for curImgH and curImgW in order to calculate one based on the value of the other * Appobj.aspect.
      let curImgH, curImgW;
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
          Appobj.curImgH = curImgH =  Math.round(evtTargetVal * (1 / Appobj.aspect[0]));
          Appobj.curImgW = curImgW = evtTargetVal;
        } else if ( appObjProp === 'curImgH') {
          Appobj.curImgW  = curImgW =  Math.round(evtTargetVal * (Appobj.aspect[0]));
          Appobj.curImgH = curImgH = evtTargetVal;
        }
      }

      // !VA The false flag indicates that this is a user-initiated Toolbar input action, not an image initialization action.
      calcViewerSize(false);
      return;
    }



    // !VA  appController   
    // !VA Called 1) in initUI (devmode) after the devimg is loaded from the HTML file 2) in handleFileSelect after setTimeOut callback is run and the image is loaded 3) in writeToolbarInputToAppobj after a user-initiated Toolbar input. calcViewerSize calculates the current size of DynamicElements.imgViewer based on Appobj values. The flag parameter indicates whether call was made at initialization (true) or after a user-initiated Toolbar input (false). This doesn’t access the DOM or make changes to existing Appobj values. All it does is resize the viewer to fit the image based on aspect ratio and Appobj.viewerW, then calls resizeContainers to write these recalculated element values to the DOM; writeAppobjToDOM ( tableWidth, tableWrapperWidth) writes the current Appobj.imgW and Appobj.viewerW to the CCP ccpUserInput.ccpTblWidthTfd and ccpUserInput.ccpTbwWidthTfd; and writeInspectors(Appobj) to write all the current Appobj values to the corresponding Inspector DOM elements.
    function calcViewerSize(flag) {
      // !VA Here, just populate the dynamicElements of Appobj. If flag is true, then calcViewerSize was called from writeToolbarInputToAppobj, so this is a user-initiated Toolbar input action. If false, it's an image initialization action called from initUI (devmode) or handleFileSelect.
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

    // !VA appController private
    // !VA Branch: OVERHAUL0831A
    // !VA Reveal configurations for each CCP UI element. These need to be in appController because they access Appobj.
    function fetchRevealConfig(alias, option) {
      let revealArray = [];
      switch(true) {
      case alias === 'ccpImgExcldRdo' :
        if ( option === 'excld') {
          revealArray  = [ 'ccpImgExcldRdo', 'ccpTdaClassTfd', 'ccpTdaWidthTfd', 'ccpTdaHeigtTfd', 'ccpTdaBgclrTfd', 'ccpTdaAlignRdo', 'ccpTdaValgnRdo' ];
        } else {
          revealArray = [ 'ccpImgClassTfd', 'ccpImgAltxtTfd', 'ccpImgLoctnTfd', 'ccpImgAnchrTfd', 'ccpImgAlignRdo', 'ccpImgExcldRdo', 'ccpImgItypeRdo', 'ccpImgCbhtmBtn', 'ccpTdaClassTfd', 'ccpTdaBgclrTfd', 'ccpTdaAlignRdo', 'ccpTdaValgnRdo', 'ccpTdaOptnsRdo'  ];
        }
        break;
      case alias === 'ccpTdaOptnsRdo':
        switch(true) {
        case option === 'basic':
          // !VA Branch: OVERHAUL0830A
          // !VA Still not too sure if width and height should be included in TD basic.
          revealArray = [  'ccpTdaClassTfd', 'ccpTdaBgclrTfd', 'ccpTdaAlignRdo', 'ccpTdaValgnRdo' ];
          break;
        case option === 'iswap':
          revealArray = [ 'ccpTdaBgclrTfd', 'ccpTdaAlignRdo', 'ccpTdaValgnRdo' ];
          break;
        case option === 'swtch':
          revealArray = [ 'ccpTdaClassTfd', 'ccpTdaBgclrTfd', 'ccpTdaAlignRdo', 'ccpTdaValgnRdo' ];
          break;
        case option === 'bgimg':
          revealArray = [ 'ccpTdaClassTfd', 'ccpTdaWidthTfd', 'ccpTdaHeigtTfd', 'ccpTdaBgclrTfd' ];
          break;
        case option === 'vmlbt':
          revealArray = [ 'ccpTdaClassTfd', 'ccpTdaWidthTfd', 'ccpTdaHeigtTfd', 'ccpTdaBgclrTfd', 'ccpTdaTxclrTfd', 'ccpTdaBdclrTfd', 'ccpTdaBdradTfd' ];
          break;
        default:
          console.log('ERROR in revealConfigs - Appobj property not recognized');
        } 
        break;
      case alias === 'ccpTblWraprChk':
        revealArray = [ 'ccpTbwAlignRdo', 'ccpTbwClassTfd', 'ccpTbwWidthTfd',  'ccpTbwMaxwdTfd', 'ccpTbwBgclrTfd', 'ccpTbwGhostChk', 'ccpTbwMsdpiChk' ];
        break;
      default:
        console.log('ERROR in fetchRevealConfig = Alias not recognized');
      } 
      return revealArray;
    }

    // !VA 

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
      }
    }

    // !VA appController private
    // !VA Branch: OVERHAUL0901B
    // !VA Accepts the current Appobj property as alias, which is overwritten by the currently selectioin
    function selectImgItype( option) {
      let alias, configObj, str, aliasArray;
      // !VA Set Appobj to the selected Itype option
      alias = 'ccpImgItypeRdo';
      Appobj[alias] = option;
      // !VA Set the string to write to the ccpImgClassTfd text input depending on the selected option
      option === 'fluid' ? str = 'img-fluid' : str = '';
      // !VA Set the Appobj property of the IMG Class text field to the above str 
      Appobj['ccpImgClassTfd'] = str;
      // !VA Write the ccpImgClassTfd string to the CCP ccpImgClassTfd text input field
      // !VA Create the array of aliases, in this case there's only one alias in the array
      aliasArray = [ 'ccpImgClassTfd' ]; 
      // !VA Set the config object: write the Appobj property to the CCP UI and set the radio state of the Itype radio to the selected option
      configObj = {
        reflectAppobj: { reflect: aliasArray },
        radioState: { option: option, alias: alias }
      };
      // !VA Run the CCP UI config
      UIController.configCCP( configObj );

    }


    // !VA appController private
    // !VA Branch: OVERHAUL0901A
    // !VA IMPORTANT: This sets the UI config but doesn't actually set the option programatically. True of selectTdaOptions as well. That needs to be fixed now, since the default option is set on init
    // !VA Execute the actions associated with selecting one of the binary Exclude Image options in the IMG section: excld or incld. The selection triggers setting the reveal configuation of the IMG options as well as the associated TD Options for the IMG EXCLD/INCLD icons. This function is called from the event listener for EXCLD and INCLD icons and can be run programmatically by passing in the option value or Appobj[alias]. Note: This option to be separate from selectTdaOptions because it calls selectTdaOptions to set the reveal configuration for the 'basic' option.  
    function selectImgExclude( option )  {
      // !VA option is the selected option: excld or incld
      // console.log('selectImgExclude running');
      let alias, revealArray = [ ], configObj = [ ];
      // !VA Hard-code alias for this handler
      alias = 'ccpImgExcldRdo';
      // !VA Set Appobj property to the passed-in option value 
      Appobj[alias] = option;
      if ( option === 'excld') {
        // !VA Set the TDA Options to 'basic'. This is necessary so that when the user exits EXCLD mode, the 'basic' TD options are always restored. This makes more sense than trying to restore the currently selected TD option which result in unnecessary complexity.
        selectTdaOptions( 'basic');
        // !VA Branch: OVERHAUL0902A
        // !VA Get the elements to reveal for the IMG EXCLD 'excld' option
        revealArray = fetchRevealConfig('ccpImgExcldRdo', 'excld');
        // !VA Set the CCP config
        configObj = {
          // !VA The alias determines which elements to reset prior to revealing them. For IMG EXCLD, all the IMG and TDA options are reset
          revealReset: { alias: 'ccpImgExcldRdo'},
          // !VA Reveal the elements in revealArray. This only reveals the IMG options. The TDA options are revealed below.
          revealElements: { flag: false, reveal: revealArray }
        };
        // !VA Run the IMG options group configuration
        UIController.configCCP(configObj);
        // !VA Set the TDA options to be revealed, i.e. the TDA OPTNS radio group. The other pertinent TDA options were set in selectTdaOptions above
        configObj = {
          revealElements: { flag: true, reveal: ['ccpTdaOptnsRdo'] }
        };
        // !VA Run the TDA options group configuration
        UIController.configCCP(configObj);

      } else if ( option === 'incld') {
        // !VA Get the elements to reset and reveal for the IMG EXCLD 'incld' option and run the config
        revealArray = fetchRevealConfig( 'ccpImgExcldRdo', option );
        configObj = {
          revealReset: { alias: 'ccpImgExcldRdo'},
          revealElements: { flag: false, reveal: revealArray }
        };
        UIController.configCCP(configObj);
      }
      // !VA Branch: OVERHAUL0901A
      // !VA Set the state of the radio element here once rather than once in each condition above.
      configObj = {
        radioState: { option: option, alias: 'ccpImgExcldRdo' }
      };
      UIController.configCCP(configObj);
    }

    // !VA appController private
    // !VA Branch: OVERHAUL0831A
    // !VA Execute the actions associated with selecting one of the TD OPTIONS (OPTNS) in the TD section: basic, iswap, swtch, bgimg, or vmlbt. The selection triggers setting the reveal configuation of the TD OPTNS. .
    function selectTdaOptions( option ) {
      // console.log('selectTdaOptions running');
      // !VA option is: basic, iswap, swtch, bgimg, or vmlbt
      let alias, flag, inputEls;
      let revealArray = [ ], configObj = {};
      // !VA alias is hardcoded because this function is specific to this element.
      alias = 'ccpTdaOptnsRdo';
      // !VA False = remove the conceal class, i.e. reveal elements.
      flag = false;
      // !VA Set Appobj property to the passed-in option value 
      Appobj[alias] = option;
      // !VA inputEls is the collection of input elements whose name attribute is 'ccp-tda-optns' i.e. all the input elements associated with this RDO element.
      inputEls = document.getElementsByName('ccp-tda-optns');
      // !VA Loop through inputEls IDs and check the one whose 8 - 13 characters match the option token string. 
      for (let i = 0; i < inputEls.length; i++) {
        if (inputEls[i].id.substring( 8, 13 ) === option ) {
          inputEls[i].checked = true;
        }
      }
      // !VA Get the reveal elements corresponding to the respective TD OPTNS option.
      revealArray = fetchRevealConfig( alias, option);
      // !VA Set the CCP UI configuration to pass to UIController
      configObj = {
        revealReset: { alias: alias },
        revealElements: { flag: flag, reveal: revealArray },
        radioState: { option: option, alias: alias }
      };
      // !VA Run the CCP UI configuration
      UIController.configCCP( configObj );
    }


    // !VA appController private
    // !VA Branch: OVERHAUL0825C
    // !VA Write the selected checkbox status to its corresponding Appobj property; is called from event listeners on the checkbox elements. 
    function handleCheckboxEvent(evt) {
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
      // console.log('selectCheckbox running');
      let flag;
      let revealArray = [], configObj = {};
      // !VA Set Appobj[alias] property to isChecked
      Appobj[alias] = isChecked;
      switch(true) {
      // !VA Table wrapper checkbox
      case alias === 'ccpTblWraprChk':
        // !VA Get the reveal array for the table wrapper checkbox
        revealArray = fetchRevealConfig( alias );
        // !VA Set the flag for configObj: false = reveal, true = conceal
        isChecked ? flag = false : flag = true;
        configObj = {
          checkboxState: { checked: isChecked, alias: alias },
          revealElements: { flag: flag, reveal: revealArray }
        };
        UIController.configCCP( configObj);
        break;
      default:
        console.log('ERROR in selectCheckbox - unknown condition');
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
    // // !VA Function to get a rest parameter list and return an array. Used for configCCP
    function makeAliasArray(...args) {
      var arr;
      arr = args;
      return arr;
    }


    // !VA appController private
    // !VA 082520
    // !VA Handle actions to execute when an input is made in a CCP text input element. 1) If the element has an icon associated, highlight the icon on user input 2) If the text element is a padding input, highlight the padding icon if any of the padding text input elements have user input 3) If the text input element is a class input, show the Make CSS buttons. 4) If the text input element is the IMG anchor input, show the IMG text color and IMG targt parent elements. NOTE: There are a lot of references to IDs here: consider adding aliases for the elements whose IDs are referenced literally.
    // !VA Branch: OVERHAUL0827A
    // !VA Important: These input actions are separate from the actions in configCCP. Those controls pertain to specific option configurations that functionally depend on a selected option. These options below only make other options available if a text input is entered. Perhaps an insignificant distinction, but a valid one - all the configCCP react to checkbox state changes, not input values.
    // !VA Branch: OVERHAUL0902A
    // !VA This logic belongs in appController. It looks more complicated than it is.
    function handleTextInputEvent(evt) {
      let tar, firstChld, nextSibling, hasValue, alias, flag;
      let configObj = {};
      let revealArray = [];
      hasValue = false;
      tar = evt.target;
      alias = evtTargetIdToAppobjProp(evt.target.id);
      // !VA Branch: OVERHAUL0902A
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
        // !VA firstChld is the icon element, which is the first child of the container
        // !VA NOTE: Add an alias for this? This is an element that is used to target other elements.
        firstChld = document.querySelector('#ccp-tda-padng-icn');
        // !VA nextSibling is the first padding input, i.e. top.
        nextSibling = firstChld.nextElementSibling;
        while(nextSibling) {
          // !VA If there's a value in the input, set the flag to true
          if (nextSibling.value !== '') { hasValue = true; }
          nextSibling = nextSibling.nextElementSibling;
        }
        // !VA If any of the padding inputs have a value, then the hasValue flag is true. If none of the padding inputs have value, the flag is false. If true, add the active class, otherwise, remove it.
        hasValue ? firstChld.classList.add('active') : firstChld.classList.remove('active');
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
    function validateInteger(inputVal) {
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

    // !VA appController public functions
    return {
      // !VA Branch: OVERHAUL0831A
      // !VA Called from selectCcpRadio, deprecating...
      // setAppobjProperty: function (alias, val) {
      //   Appobj[alias] = val;
      // },

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
      // !VA Access Appobj from outside appController. Called from getAttributes, ccpGetAttValue, reflectAppobj, getGhostTable, makeTdNode, ccpIfNoUserInput, getCheckboxState, getImgSwapBlock, makePosSwitchNodes, applyIndents, makeCssRule. If alias is 'undefined' i.e. not specified in the function call, then return the entire Appobj. If it is specified and is an Appobj property/ccpUserInput property, return the corresponding property value. If it is neither of the above, error condition
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

        // !VA Branch: OVERHAUL0825B
        // let el;
        // if (ccpState) {
        //   console.log('ccpState is: ' + ccpState);
        //   console.log('on click it...closes');
        // } else {
        //   console.log('ccpState is: ' + ccpState);
        //   console.log('on click it...opens');
        // !VA Branch: OVERHAUL0828C
        // !VA This is where we need to set presets based on Appobj properties: ccpTblWraprChk
        // !VA Screw this - the CCP opens and closes with the selected option unless you refresh. That's good enough for now. 
        // console.log('Appobj.ccpTblWraprChk is: ' + Appobj.ccpTblWraprChk);
        // document.querySelector('#ccp-tbw-ghost-chk').style.opacity = 1;
        // }



        // !VA What does the below do? Looks like both clauses run batchAPpobjToDom exactly the same. Let's deprecate this and just run batchAppobjToDOM
        // if (ccpState) {
        // !VA Do logic for opening the CCP with the current state of the selected options reflected. batchAppobjToDOM only runs handleTdOptions for the rdoCcpTdImgswap option. Everything else carries over when the CCP is open and closed.
        // batchAppobjToDOM();

        // } else if (!ccpState) {
        // !VA On closing the CCP, need to save all the DOM settings so they can be restored by batchAppobjToDOM. 
        // !VA NOTE: Not even sure this is necessary now since the problem with the input fields resetting has been dealt with.
        // batchDOMToAppobj();
        // } else {
        //   console.log('ERROR in initCCP - unknown ccpState');
        // }


        // !VA Branch: OVERHAUL0825B
        // !VA This isn't called anywhere else and doesn't do anything
        // !VA Disabling...
        // batchDOMToAppobj();
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



        function disableTfd( alias ) {
          console.log('disableTfd running ');
          alias = 'ccpImgClassTfd';
          el;
          var el = document.querySelector(ccpUserInput[alias]);
          el.children[0] = 'disabled';
          el.children[1].classList.add('ccp-disable-lbl');
        }
        // disableTfd();
        function disableUnselectedRdo( alias ) {
          console.log('disableUnselectedRdo running ');
          alias = 'ccpTdaOptnsRdo';
          let selectedRadio;
          // !VA Branch: OVERHAUL0902A
          // !VA Convert this to configCCP
          // selectedRadio = UIController.configCcpUI( 'query', 'radiostate', 'ccpTdaOptnsRdo', '');
          console.log('selectedRadio is: ' + selectedRadio);

          var foo = document.querySelector(ccpUserInput[alias]);
          var faa = foo.children;
          for (let i = 0; i < faa.length; i++) {
            console.log('faa[i].id is: ' +  faa[i].id);
            faa[i].children[0].disabled = true;
            faa[i].children[1].classList.add('ccp-disable-lbl');
          }
        }
        // disableUnselectedRdo();

        // !VA Branch: OVERHAUL0901B
        // !VA Pre-select the IMG EXCLD, TDA OPTNS and TBW WRAPR options so they open as selected by default on page load.
        selectImgExclude('incld');
        selectTdaOptions('basic');
        selectCheckbox( false, 'ccpTblWraprChk' );
        selectImgItype( 'fixed' );

        // !VA Populate the CCP with HTML defaults. tableWidth and tableWrapperWidth are undefined, they don't get written until resizeContainers.
        UIController.populateAppobj(Appobj, 'ccp');

        console.log('init: Appobj is: ');
        console.log(Appobj);
        // !VA Initialize the 'basic' tdoption
        // !VA Branch: OVERHAUL0825B
        // !VA Disabling...
        // handleTdOptions(ccpUserInput.rdoCcpTdBasic); 
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