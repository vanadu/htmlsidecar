
    function configImgSwapIndents(uSels, nl, activeNodeStartIndex, counter, indentLevel) {
      // !VA Handle the node for the imgswap code block. First, save the indent level of the lowest TD in the tree to a variable. We need that when we apply the indents for the imgswap and bgimage code blocks which we will append to the lowest td in the tree. We loop here separately because trying to process the code block indents in the same loop as the node indents throws a NoModificationsToDocument error, probably because adding the comment node changes the index and screws up where insertAdjacentHTML puts the indent characters. 
      // !VA Get the indent level of the lowest TD in the tree
      let i, indent, imgSwapBlockIndent, commentNode;
      counter = -1;
      activeNodeStartIndex = (nl.length - indentLevel);
      for (i = activeNodeStartIndex; i < nl.length; i++) {
        counter = counter + 1;
        indent = getIndent(counter);
        // !VA If the TD is the lowermost TD in the tree, then it has a nodeList index of less than 3, so set the indent for the imgswapblock section to the counter + 1 to define the indent of the comment block
        if ( i > 3 &&  nl[i].nodeName === 'TD') {
          imgSwapBlockIndent = ( counter + 1 );
        } 
        else if (( uSels.hasAnchor && nl[i].nodeName === 'A') ||  (!uSels.hasAnchor && nl[i].nodeName === 'IMG')) {
          // !VA Hacks, but they work. Ideally I'd unwrap the img inside the anchor, but...maybe later.
          // !VA If the table button with or without wrapper was clicked then index is either 0 or 3
          if (activeNodeStartIndex === 0 || activeNodeStartIndex === 3) {
            // !VA Add an extra indent before the comment node
            nl[i].insertAdjacentHTML('afterend', getIndent(1));
          } else {
            // !VA Otherwise, add a complete indent cycle before the comment node.
            nl[i].insertAdjacentHTML('afterend', getIndent(imgSwapBlockIndent));
          }
        }
        applyIndents2( nl[i], indent, 'normal');
      }
      // !VA Create the comment node for appending to the TD. It doesn't work with innerHTML or textContent because those methods convert characters to HTML entities. NOTE: These indents work with td button but not yet for Table button. This has to come after the node indent handler above. 
      commentNode = document.createComment;
      for (i = activeNodeStartIndex; i < nl.length; i++) {
        // !VA If the child of the TD isn't a table, then the TD is the lowest descendant in the tree, so append the comment node to it.
        if ( nl[i].nodeName === 'TD' && nl[i+1].nodeName !== 'TABLE') {
          // !VA MAGIC HAPPENS: Get the indent using the saved indentLevel from the above function and apply it everywhere the getIndent function appears in the code block.
          commentNode = document.createComment(getImgSwapBlock( imgSwapBlockIndent ));
          // !VA Append the comment to the TD
          nl[i].appendChild(commentNode);
          // !VA Add the indent before the closing tag
          nl[i].insertAdjacentHTML('beforeend', '\n' + getIndent(imgSwapBlockIndent - 1));
        }
        // !VA If Include anchor is checked, apply the indent to the A, otherwise apply it to the IMG.
        if (( uSels.hasAnchor && nl[i].nodeName === 'A') ||  (!uSels.hasAnchor && nl[i].nodeName === 'IMG')) {
          // !VA This was supposed to ignore the A and IMG indenting but it does nothing, so delete it or make it an else if of the above clause.
          // nl[i].insertAdjacentHTML('afterend',   getIndent(imgSwapBlockIndent - 1));
        }
      }
    }