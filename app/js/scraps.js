function revealElements( flag, aliasArray) {
  // console.clear();
  console.log('revealElements aliasArray :>> ');
  console.log(aliasArray);
  let chldrn;
  let el,  elArray = [];
  let defaultArr;

  // !VA For Make CSS buttons, handle the children of the aliased element in ccpUserInput;
  if (aliasArray.toString().includes('Mkcss')){
    console.log('Parents');
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
      // !VA Run the callback function with the chldrn collection as parameter. This runs revealChildren to reveal/conceal each of the child elements in the collection.
      revealChildren(chldrn);
    }

  // !VA For all other elements, reset the CCP to the defaultArr, merge the array of elements to reveal into the default config array and then do the reveal
  } else {
    console.log('Elements');

    ccpArr = [ 'ccpImgClassTfd', 'ccpImgAltxtTfd', 'ccpImgLoctnTfd',  'ccpImgAnchrTfd','ccpImgAlignRdo', 'ccpImgExcldRdo', 'ccpImgItypeRdo', 'ccpImgTxclrTfd', 'ccpImgTargtChk', 'ccpImgCbhtmBtn', 'ccpTdaClassTfd', 'ccpTdaBgclrTfd', 'ccpTdaTxclrTfd', 'ccpTdaBdradTfd', 'ccpTdaBdclrTfd', 'ccpTdaAlignRdo', 'ccpTdaValgnRdo', 'ccpTdaWidthTfd', 'ccpTdaHeigtTfd', 'ccpTdaPdtopTfd', 'ccpTdaPdrgtTfd', 'ccpTdaPdbtmTfd', 'ccpTdaPdlftTfd', 'ccpTdaOptnsRdo', 'ccpTdaBasicPar', 'ccpTdaIswapPar', 'ccpTdaSwtchPar', 'ccpTdaBgimgPar', 'ccpTdaVmlbtPar', 'ccpTdaCbhtmBtn', 'ccpTblAlignRdo', 'ccpTblClassTfd', 'ccpTblWidthTfd', 'ccpTblMaxwdTfd', 'ccpTdaBdclrTfd', 'ccpTblGhostChk', 'ccpTblWraprChk', 'ccpTblHybrdChk', 'ccpTblMsdpiChk', 'ccpTblCbhtmBtn', 'ccpTbwAlignRdo', 'ccpTbwClassTfd', 'ccpTbwWidthTfd', 'ccpTbwMaxwdTfd', 'ccpTbwBgclrTfd', 'ccpTbwGhostChk', 'ccpTbwMsdpiChk' ];



    // !VA First, create the default reset array
    defaultArr = [ 'ccpImgClassTfd', 'ccpImgAltxtTfd', 'ccpImgLoctnTfd',  'ccpImgAnchrTfd','ccpImgAlignRdo', 'ccpImgExcldRdo', 'ccpImgItypeRdo', 'ccpImgTxclrTfd', 'ccpImgTargtChk', 'ccpImgMkcssGrp', 'ccpImgCbhtmBtn', 'ccpTdaClassTfd', 'ccpTdaBgclrTfd', 'ccpTdaAlignRdo', 'ccpTdaValgnRdo', 'ccpTdaWidthTfd', 'ccpTdaHeigtTfd', 'ccpTdaPdtopTfd', 'ccpTdaPdrgtTfd', 'ccpTdaPdbtmTfd', 'ccpTdaPdlftTfd', 'ccpTdaOptnsRdo', 'ccpTdaBasicPar', 'ccpTdaIswapPar', 'ccpTdaSwtchPar', 'ccpTdaBgimgPar', 'ccpTdaVmlbtPar', 'ccpTdaCbhtmBtn', 'ccpTblAlignRdo', 'ccpTblClassTfd', 'ccpTblWidthTfd', 'ccpTblMaxwdTfd', 'ccpTblBgclrTfd', 'ccpTblGhostChk', 'ccpTblWraprChk', 'ccpTblHybrdChk', 'ccpTblMsdpiChk', 'ccpTblCbhtmBtn' ];
    // !VA Array of default elements to reset
    
    // !VA If the aliasArray elements are not in the defaultArr, then add them to the defaultArr. Otherwise, remove them from the defaultArr. Then, loop through the updated defaultArr and update the status of ccp-conceal-ctn for each element. 
    
    // !VA Loop through ALL the CCP elements.



    // !VA Loop through ALL the CCP elements, check each CCP element against the defaultArr array and if the defaultArr represents a change, implement the change. Does that make sense?
    let revealArray = [];
    revealArray = defaultArr;
    console.log('defaultArr :>> ');
    console.log(defaultArr);
    var foo;

    for (const alias of aliasArray) {
      console.log('alias in aliasArray :>> ' + alias);
      if (revealArray.includes(alias)) {
        revealArray = revealArray.filter(item => item !== alias);
      } else {
        revealArray.push(alias);
      }
    }
    console.log('revealArray :>> ');
    console.log(revealArray);
    for (const alias of ccpArr) {
      el = document.querySelector(ccpUserInput[alias]);
      if (revealArray.includes(alias)) {
        console.log('el.id revealed :>> ' + el.id);
        el.classList.remove('ccp-conceal-ctn');
        console.log('el.classList :>> ' + el.classList);
        
        
      } else {
        
        console.log('el.id concealed :>> ' + el.id);
        el.classList.add('ccp-conceal-ctn');
        console.log('el.classList :>> ' + el.classList);

        // console.log('NO HIT');
        // el = document.querySelector(ccpUserInput[alias]);
        // console.log('el.id :>> ' + el.id);
        // el.classList.add('ccp-conceal-ctn');

      }
    }
    debugger;





  }

}