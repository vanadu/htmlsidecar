    // !VA Configure the node-level indents for basic and RTL position switch options. Options that include comment nodes have to be configured separately prior to applying the indents to the entire node tree

    // !VA Branch: fixPosSwitchIndents Issue: For TABLE, the posswitch node appears to be inserted at the wrong position in the nodeTree - actually looks like the active nodes are extracted at the wrong position.



    function configNodeIndents(uSels, nl, activeNodeStartIndex, counter) {
      console.log('configNodeIndents - activeNodeStartIndex: ' + activeNodeStartIndex + '; counter: ' + counter);
      
      let i, indent, container;
      // !VA Vars for the sibling nodes of RTL switch position
      let nextSiblingNodeIndex, previousSiblingNodeIndex, previousSiblingPosition;
      // !VA Loop through nodes and process exceptions
      // !VA Create the container that receives the active nodes, i.e. the nodes that correspond to the clicked CCP button. Reminder: index = (nl.length - indentDepth), where indentDepth is the position in the complete-tree nodeList at which the indenting should start based on the user's CCP selections. 
      container = document.createElement('div');
      // !VA Extract the 'active' nodes to container
      container = nl[activeNodeStartIndex];

      console.log('911 container is: ');
      console.log(container);




      // !VA Get the positions of the relevant child nodes for indents. nextSiblingIndex should always be 8. If Include anchor is checked (usSels.hasAnchor) previousSiblingIndex should be 14. If !uSels.hasAnchor, previous SiblingIndex should be 13. 
      for (let i = 0; i < nl.length; i++) {
        // !VA Get the positions of the relevant child nodes for indents
        if (nl[i].nextSibling) {nextSiblingNodeIndex = i; } 
        if (nl[i].previousSibling) {previousSiblingNodeIndex = i; } 
      }
      // !VA 
      // !VA Start the indent loop beginning at the nodeList position corresponding to user's CCP selections. Counter initializes at -1 to begin loop at 0. 
      for (i = activeNodeStartIndex; i < nl.length; i++) {
        counter = counter + 1;
        indent = getIndent(counter);
        // !VA Ignore any indents for the IMG tag if its parent node is the A tag. The IMG tag should be nested within the anchor on the same line. 
        if (nl[i].nodeName === 'IMG' && nl[i].parentNode.nodeName === 'A') {
          applyIndents2(nl[i], indent, 'ignore');
        }
        else if ( nl[i].nodeName === 'A') {
          // !VA If nodeList item 1 is the anchor, then Include anchor is checked. Apply the 'terminal' indent scheme and don't apply any indent to the img element.
          applyIndents2(nl[i], indent, 'terminal');
        } 
        else {
          // !VA Else, handle all the other indents. That includes standard indents without exceptions AND the indent of sibling nodes for the posswitch option.
          // !VA If there's a next sibling, then there are child nodes to the parent node, so we do the IF clause. AND if so, then if the loop counter is greater than the node index of the second child, run the if clause.
          if (nextSiblingNodeIndex && i >= previousSiblingNodeIndex) {
            // !VA Set the sibling's indent to be the same as that of the first sibling of the parent TR. The indent level passed to getIndent is the counter value minus the number of nodes between the top node and the previousSibling. If Include anchor (uSels.hasAnchor) is checked, that number is 11. If !usels.hasAnchor, that number is 10.

            // !VA Branch: fixPosSwitchIndents
            // !VA Branch: fixPosSwitchIndents: The above is only true if TD button is clicked. previousSiblingPosition can't be hard-coded, it has to be derived from indentDepth or activeNodeStartIndex. No, previousSiblingPosition is always either 11 or 10. 
            console.log('activeNodeStartIndex is: ' + activeNodeStartIndex);
            console.log('previousSiblingPosition is: ' + previousSiblingPosition);
            uSels.hasAnchor ? previousSiblingPosition = 11 : previousSiblingPosition = 10;
            var indentLevel;
            indentLevel = activeNodeStartIndex;

            // !VA Get the indent string for the current node
            console.log('i is: ' + i);
            console.log('i - previousSiblingPosition + 0 is: ' + (i - previousSiblingPosition + 0));
            console.log('i - previousSiblingPosition + activeNodeStartIndex =: ' + (i - previousSiblingPosition + activeNodeStartIndex));
            indent = '' + getIndent(i - previousSiblingPosition + 0);
            // !VA We still need to add some indicator content to the terminating TD in this nodeList -- putting it in the makePosSwitchNode function itself would make it impossible to indent properly without some creative coding that's beyond my ability. So. we'll put it here, after the indent has been shrunk to be equal to the nextSibling's indent. It will always be added to the last node in the tree, i.e. the nodeList length - 1.
            if ( i === nl.length - 1) {
              nl[i].innerHTML = indent + '  <!-- ADD YOUR CONTENT HERE --> \n';
            }
            // !VA Insert the indent strings to the node
            nl[i].insertAdjacentHTML('beforebegin', indent);
            nl[i].insertAdjacentHTML('afterbegin', '\n');
            nl[i].insertAdjacentHTML('beforeend', indent);
            nl[i].insertAdjacentHTML('afterend', '\n');
          } else {
            // Otherwise, apply the normal indent scheme.
            applyIndents2( nl[i], indent, 'normal');
          }
        }
      }
      console.log('container.outerHTML 941 is: ');
      console.log(container.outerHTML);
      return container.outerHTML;
    }
