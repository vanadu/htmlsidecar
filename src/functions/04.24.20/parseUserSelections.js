    function parseUserSelections(uSels) {
      // !VA Here we determine the indentDepth for node indices based on the user selection configuration in uSels
      let indentDepth;
      // !VA If the tdoptions radio button selection is Basic td with options, determine the indent level of the possible node output configurations.
      if (uSels.selectedRadio === 'basic') {
        switch (true) {
        case (uSels.buttonClicked === 'imgbut' && !uSels.hasAnchor ):
          indentDepth = 1;
          break;
        case (uSels.buttonClicked === 'imgbut' && uSels.hasAnchor):
          indentDepth = 2;
          break;
        case (uSels.buttonClicked === 'tdbut' && !uSels.hasAnchor):
          indentDepth = 2;
          break;
        case (uSels.buttonClicked === 'tdbut' && uSels.hasAnchor):
          indentDepth = 3;
          break;
        case (uSels.buttonClicked === 'tablebut' && !uSels.hasWrapper && !uSels.hasAnchor):
          indentDepth = 4;
          break;
        case (uSels.buttonClicked === 'tablebut' && !uSels.hasWrapper && uSels.hasAnchor):
          indentDepth = 5;
          break;
        case (uSels.buttonClicked === 'tablebut' && uSels.hasWrapper && !uSels.hasAnchor ):
          indentDepth = 7;
          break;
        case (uSels.buttonClicked === 'tablebut' && uSels.hasWrapper && uSels.hasAnchor):
          indentDepth = 8;
          break;
        default:
          // code block
        } 
      }
      else if (uSels.selectedRadio === 'imgswap') {
        switch(true) {
          
        case (uSels.buttonClicked === 'imgbut' && !uSels.hasAnchor ):
          indentDepth = 1;
          break;
        case (uSels.buttonClicked === 'imgbut' && uSels.hasAnchor):
          indentDepth = 2;
          break;
        case (uSels.buttonClicked === 'tdbut' && !uSels.hasAnchor):
          indentDepth = 2;
          break;
        case (uSels.buttonClicked === 'tdbut' && uSels.hasAnchor):
          indentDepth = 3;
          break;
        case (uSels.buttonClicked === 'tablebut' && !uSels.hasWrapper && !uSels.hasAnchor):
          indentDepth = 4;
          break;
        case (uSels.buttonClicked === 'tablebut' && !uSels.hasWrapper && uSels.hasAnchor):
          indentDepth = 5;
          break;
        case (uSels.buttonClicked === 'tablebut' && uSels.hasWrapper && !uSels.hasAnchor ):
          indentDepth = 7;
          break;
        case (uSels.buttonClicked === 'tablebut' && uSels.hasWrapper && uSels.hasAnchor):
          indentDepth = 8;
          break;
        default:
          // code block
        } 
      }
      else if (uSels.selectedRadio === 'posswitch') {
        switch(true) {
        // !VA Not accessed, overridden in getUserSelections
        case (uSels.buttonClicked === 'imgbut' && !uSels.hasAnchor ):
          indentDepth = 12;
          break;
          // !VA Not accessed, overridden in getUserSelections
        case (uSels.buttonClicked === 'imgbut' && uSels.hasAnchor):
          indentDepth = 13;
          break;



        case (uSels.buttonClicked === 'tdbut' && !uSels.hasAnchor):
          indentDepth = 5;
          break;
        case (uSels.buttonClicked === 'tdbut' && uSels.hasAnchor):
          indentDepth = 6;
          break;
        case (uSels.buttonClicked === 'tablebut' && !uSels.hasWrapper && !uSels.hasAnchor):
          indentDepth = 7;
          break;
        case (uSels.buttonClicked === 'tablebut' && !uSels.hasWrapper && uSels.hasAnchor):
          indentDepth = 8;
          break;
        case (uSels.buttonClicked === 'tablebut' && uSels.hasWrapper && !uSels.hasAnchor ):
          indentDepth = 10;
          break;
        case (uSels.buttonClicked === 'tablebut' && uSels.hasWrapper && uSels.hasAnchor):
          indentDepth = 11;
          break;
        default:
          // code block
        } 
        
      }
      else if (uSels.selectedRadio === 'bgimage') {
        console.log('bgimage...');
        // !VA There is no A or IMG in the nodeList for this option, so set indentDepth to 1 for both options otherwise indentDepth will be undefined and no commentNode will be built.
        switch(true) {
        case (uSels.buttonClicked === 'tdbut' && !uSels.hasAnchor):
          indentDepth = 1;
          break;
        case (uSels.buttonClicked === 'tdbut' && uSels.hasAnchor):
          indentDepth = 1;
          break;
        case (uSels.buttonClicked === 'tablebut' && !uSels.hasWrapper && uSels.hasAnchor):
          indentDepth = 3;
          break;
        case (uSels.buttonClicked === 'tablebut' && uSels.hasWrapper && uSels.hasAnchor):
          indentDepth = 6;
          break;
        default:
          // code block
        } 
      }
      console.log('parseUserSelections: uSels.selectedRadio: ' +  uSels.selectedRadio + '; uSels.buttonClicked: ' + uSels.buttonClicked + '; hasAnchor: ' + uSels.hasAnchor + '; hasWrapper: '  + uSels.hasWrapper + '; indentDepth: ' + indentDepth);
      parseTopNode(uSels, indentDepth);
    }