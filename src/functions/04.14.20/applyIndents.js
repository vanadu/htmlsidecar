    function applyIndents(id, nl, indentIndex,  indentType, indent) {
      // console.log('applyIndents running');
      // console.log('indentType is: ' + indentType);
      if (indentType == 'terminal') {
        // console.log('terminal');
        nl[indentIndex].insertAdjacentHTML('beforebegin', indent);
        nl[indentIndex].insertAdjacentHTML('afterend', '\n');
      } 
      else if (indentType == 'normal') {
        // console.log('normal');
        // console.log('nl[indentIndex] is: ');
        // console.log(nl[indentIndex]);
        // console.log('nl[indentIndex] is: ');
        // console.log(nl[indentIndex]);
        nl[indentIndex].insertAdjacentHTML('beforebegin', indent);
        nl[indentIndex].insertAdjacentHTML('afterbegin', '\n');
        nl[indentIndex].insertAdjacentHTML('beforeend', indent);
        nl[indentIndex].insertAdjacentHTML('afterend', '\n');
      } else if (indentType == 'none') {
        // !VA Do NOthing
        // nl[indentIndex].insertAdjacentHTML('afterend', '\n');
      }
      else {
        console.log('applyINdents case not recognized');
      }
    }