/* 

TODO: Build appObj with current CCP


!VA TO FIX
  * FIXED: hover area cut off on td option icons
  * FIXED: Hover on td options
  * FIXED: Swap img-anchor and img-location inputs
  * FIXED: Toggle buttons don't toggle yet
  * DONE: Add img text color and img target elements
  * FIXED: Hover on clipboard buttons - still uses old method, I think
  * MAYBE: Click on padding arrows should copy value to all fields, maybe - low priority
  * FIXED: All align elements should have ipt prefix
*/

console.log('new.js running');


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
  ccpTblAlignRdo: '#ccp-tbl-align-rdo',
  ccpTblClassTfd: '#ccp-tbl-class-tfd',
  ccpTblWidthTfd: '#ccp-tbl-width-tfd',
  ccpTblMaxwdTfd: '#ccp-tbl-maxwd-tfd',
  ccpTblBgclrTfd: '#ccp-tbl-bgclr-tfd',
  ccpTblGhostChk: '#ccp-tbl-ghost-chk',
  ccpTblMsdpiChk: '#ccp-tbl-msdpi-chk',
  ccpTblWraprChk: '#ccp-tbl-wrapr-chk',
  ccpTbwAlignRdo: '#ccp-tbw-align-rdo',
  ccpTbwClassTfd: '#ccp-tbw-class-tfd',
  ccpTbwWidthTfd: '#ccp-tbw-width-tfd',
  ccpTbwMaxwdTfd: '#ccp-tbw-maxwd-tfd',
  ccpTbwBgclrTfd: '#ccp-tbw-bgclr-tfd',
  ccpTbwGhostChk: '#ccp-tbw-ghost-chk',
  ccpTbwMsdpiChk: '#ccp-tbw-msdpi-chk'

};




// !VA setupEventListeners
function addEventHandler(oNode, evt, oFunc, bCaptures) {
  oNode.addEventListener(evt, oFunc, bCaptures);
}

// !VA changeIconColor
// !VA ===============
// !VA Add an event handler for the input element of all text field elements in ccpUserInput
// !VA This approach creates two elements - the parent and the child element. Not so good, only want to create one elemen, so commenting out.
// var keysArr, elem, inputEl;
// !VA Get array of aliases in ccpUserInput
// keysArr = Object.keys(ccpUserInput);
// for (let i = 0; i < keysArr.length; i++) {
//   // !VA If the current key includes the code for text field
//   if (keysArr[i].includes('Tfd')) {
//     // Create the element
//     elem = document.querySelector(ccpUserInput[keysArr[i]]);
//     // !VA Get the first element child, which is always the text input field
//     inputEl = elem.firstElementChild;
//     // !VA Listen for changes to the input field and run changeIconColor
//     addEventHandler(inputEl,'input',changeIconColor,false);
//   }
// }

// !VA Much better way without having to create two elements, but it doesn't include the padding input elements. Still - I designed this UI so that each element is targetable based on its class, so let's use that!
// var inputId, inputEl;
// for (const [key, value] of Object.entries(ccpUserInput)) {
//   // !VA Event Handler for 
//   if (key.includes('Tfd')) {
//     inputId = value.replace('tfd', 'ipt');
//     inputEl = document.querySelector(inputId);
//     addEventHandler(inputEl,'input',changeIconColor,false);
//   }
// }

// !VA Best way - includes all text input elements.
// !VA Add an event handler for the input element of all text field elements in ccpUserInput
var iptEls;
iptEls = document.getElementsByClassName('ccp-ipt');
for (let i = 0; i < iptEls.length; i++) {
  el = document.querySelector('#' + iptEls[i].id);
  addEventHandler(el,'input',changeIconColor,false);
}

// !VA Change the color of the element icon if there is an input in the associated text input element.
function changeIconColor(evt) {
  console.log('changeIconColor running');
  let tar, firstChld, nextSibling, hasValue;
  hasValue = false;
  tar = evt.target;
  // !VA If tar is an input element with an associated label, i.e. not a padding input. Target padding inputs with the string tda-pd.
  if (!tar.id.includes('tda-pd')) {
    // !VA If the input has a value, add the active class, otherwise remove it. The active class on the input applies the properties to the adjacent sibling, i.e. the label, as defined in the CSS.
    tar.value !== '' ? tar.classList.add('active') : tar.classList.remove('active');
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

// !VA changeIconColor END
// !VA ======================

// var alignDiv, inputNodes, inputEl;

// var alignAliases;
// alignAliases = [ 'selCcpImgAlign', 'selCcpTdAlign', 'selCcpTdValign', 'selCcpTableAlign', 'selCcpTableWrapperAlign' ];

// for (let i = 0; i < alignAliases.length; i++) {
//   alignDiv = document.querySelector(ccpUserInput[alignAliases[i]]);
//   inputNodes = alignDiv.getElementsByTagName('INPUT');
//   for (let i = 0; i < inputNodes.length; i++) {
//     addEventHandler(inputNodes[i],'click',setRadioChecked,false);
//   }
// }

function setRadioChecked(evt) {
  console.log(evt.target.id + ' clicked');
  evt.target.checked = true;
}

function clickMe(evt) {
  console.log('Clicked:' + evt.target.id);
}

var el, baz = [];
for (const [key, value] of Object.entries(ccpUserInput)) {
  if (key.includes('Tfd')) {
    baz.push(key);
  }
}

var keysArr, elem, inputEl;
keysArr = Object.keys(ccpUserInput);
// console.log('keysArr is: ');
// console.log(keysArr);
for (let i = 0; i < keysArr.length; i++) {
  if (keysArr[i].includes('Tfd')) {
    elem = document.querySelector(ccpUserInput[keysArr[i]]);
    inputEl = elem.firstElementChild;
    addEventHandler(inputEl,'input',changeIconColor,false);
  }
  if (keysArr[i].includes('Tfd')) {
    elem = document.querySelector(ccpUserInput[keysArr[i]]);
    inputEl = elem.firstElementChild;
    addEventHandler(inputEl,'input',changeIconColor,false);
  }
}


