    function configBgimageIndents(uSels, nl, activeNodeStartIndex, counter, indentDepth) {
      console.log('configBgimageIndents running');
      // !VA We only have 6 nodes in the nodeList because the A and IMG aren't included as nodes, but rather are only referenced as attributes of the TD node passed in from makeTdNode. That's why we need to handle the IMG button here - if the bgimage radio button is selected, references to IMG will return undefined.
      console.clear();
      console.log('uSels is: ');
      console.log(uSels);
      console.log('nl is: ');
      console.log(nl);
      console.log('activeNodeStartIndex is: ' + activeNodeStartIndex);
      console.log('counter is: ' + counter);
      console.log('indentDepth is: ' + indentDepth);


      let commentNode, indent, i, bgimageBlockIndent; 
      counter = -1;
      activeNodeStartIndex = (nl.length - indentDepth);
      console.log('nl.length is: ' + nl.length);




      for (i = activeNodeStartIndex; i < nl.length; i++) {
        counter = counter + 1;
        indent = getIndent(counter);
        // !VA If i = 5, then this is the lowermost descendant TD in the tree, so we set the indent level of the comment block to 1. We get the comment block in the next function.
        bgimageBlockIndent = ( counter + 1 );
        if ( activeNodeStartIndex === 5) {
          nl[i].insertAdjacentHTML('afterbegin', getIndent(bgimageBlockIndent));
        } 
        else {
          if ( i === 5) {
            // !VA If the table button is clicked, add an extra indent before the comment node -- applyIndents2 doesn't handle that properly.
            nl[i].insertAdjacentHTML('afterbegin', 'ZZ');
          }
        }
        applyIndents2( nl[i], indent, 'normal');
      }
      // !VA Create the comment node for appending to the TD. This doesn't work with innerHTML or textContent because those methods convert characters to HTML entities. 
      commentNode = document.createComment;
      for (i = activeNodeStartIndex; i < nl.length; i++) {
        // !VA If the current TD has no child, then it's the lowest descendant in the tree, so append the comment node to it.
        if ( nl[i].nodeName === 'TD' && !nl[i+1]) {
          // !VA MAGIC HAPPENS: Get the indent using the saved indentLevel from the above function and apply it everywhere the getIndent function appears in the code block.
          commentNode = document.createComment(getBgimageBlock( bgimageBlockIndent ));

          // !VA Append the comment to the TD
          nl[i].appendChild(commentNode);
          // !VA Add the indent before the closing tag
          nl[i].insertAdjacentHTML('beforeend', '\n' + getIndent(bgimageBlockIndent - 1));
        }
        // !VA If Include anchor is checked, apply the indent to the A, otherwise apply it to the IMG.
        if (( uSels.hasAnchor && nl[i].nodeName === 'A') ||  (!uSels.hasAnchor && nl[i].nodeName === 'IMG')) {
          // !VA TODO: Delete this, it's probably useless.
          // nl[i].insertAdjacentHTML('afterend',   getIndent(imgSwapBlockIndent - 1));
        }
      }
      return commentNode;
    }
    