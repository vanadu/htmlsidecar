
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


for(let i in baz) {
  el = document.querySelector(ccpUserInput[baz[i]]);
  // console.log('el.id is: ' + el.id);
  // console.log('el.children[1].id is: ' + el.children[1].id);
  var blib = document.querySelector('#' + el.children[1].id);

  addEventHandler(blib,'input',changeIconColor,false);
}

//   addEventHandler((baz[i]),'click',clickMe,false);

// console.log('baz is: ');
// console.log(baz);

var inputEl;
inputEl = document.querySelector(ccpUserInput.ccpImgClassTfd);
inputEl.classList.add('active');

// if (key.includes('Tfd')) {
//   el = document.querySelector(ccpUserInput[key]);
//   console.log('el is: ');
//   console.log(el);
//   addEventHandler(el,'click',clickMe,false);
// }


