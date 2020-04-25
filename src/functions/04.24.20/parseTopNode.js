    // !VA parseTopNode gets the tableNodeFragment from makeTableNode and runs the indent configuration routine based on the selected tdoptions radio button, after which applyIndents2 is run to loop through the nodes and apply indents to the non-comment nodes. IMPORTANT: Indents are NOT applied to the entire node tree, but rather ONLY to those nodes that correspond to the clipboard button click. Example: if the MakeIMG button is clicked and basic TD is selected, no indent is applied (indentDepth = 1) and only positions 12 and 13 for the A and IMG tag get a line break, the positions above that in the node tree are ignored. If makeTD button is clicked and basic TD is selected, then only positions 12 or 13 for IMG or A respectively get an indent (indentDepth = 2) and all the parental nodes in the tree are ignored. If the makeTable button is clicked, then all the descendants of that table node get indents starting at position 4 or 5 (hasWrapper or !hasWrapper). 
    // !VA Branch: fixPosSwitch: The indentLevel variable is a confusing misnomer. It should be called 'indentDepth' because it refers to the position in the tree at which indenting begins, not the actual level of the indent. Let's try to fix that now.
    // !VA Branch: fixPosSwitch
    // function parseTopNode( uSels, indentLevel ) {
    function parseTopNode( uSels, indentDepth ) {
      console.log('parseTopNode running');
      // !VA curpos
      let container, activeNodeStartIndex, counter, nl, tableNodeFragment;
      let commentNode;
      
      // !VA Get the top node, i.e. tableNodeFragment. We need to pass uSels because makeTableNode calls makeTdNode, which uses uSels to get the current tdoptions radio button selection
      tableNodeFragment = makeTableNode( uSels );
      // console.log('parseTopNode tableNodeFragment: ');
      // console.log(tableNodeFragment);
      nl = tableNodeFragment.querySelectorAll('*');
      console.log('parseTopNode nl: ');
      console.log(nl);
      console.log('parseTopNode indentDepth is: ' + indentDepth);
      
      // !VA Create the container for the nodes to be output to the clipboard. The original node tree fragment returned from makeTableNodes is still the primary storehouse for the DOM changes even after the container with the active nodes is created.
      container = document.createElement('div');
      

      // !VA Loop through the nodes and apply the indents to the nodes without MS conditionals.
      // !VA BASIC 
      if ( uSels.selectedRadio === 'basic') {
        // !VA No need to return anything since the container node updates live to the DOM which is accessible via container.outerHTML.
        // !VA Find out which index position in the nodeList corresponds to the user CCP selection  based on the conditions defined in parseUserSelections. For instance, if the IMG button is clicked with Include anchor checked, i will start incrementing at 6, the position of the anchor tag in the list.
        // !VA The counter determines the indentLevel. It initializes at -1 so it starts incrementing at 0, giving the top node in the list no indent. Subsequent nodes get an indent level of 1 and so on.
        // !VA Branch: fixPosSwitch: to clarify the above...
        // !VA activeNodeStartIndex is the position in the nodeList that defines the start of the ACTIVE nodes, i.e. the nodes in the node tree that are to receive indents based on the user CCP selection. activeNodeStartIndex equals the nodeList count of the complete node tree, minus the indentDepth passed in from parseUserSelections, so it will be different for all flavors of indenting. IT NEEDS TO BE SET AT THE TOP OF EACH FLAVOR.
        // !VA IMPORTANT: Note the difference between activeNodeStartIndex and indentDepth. 
        // !VA Branch: fixPosSwitch
        // index = (nl.length - indentLevel);
        console.log('activeNodeStartIndex = (nl.length - indentDepth');
        console.log(activeNodeStartIndex + ' = (' + nl.length + ' - ' + indentDepth + ')');
        activeNodeStartIndex = (nl.length - indentDepth);
        console.log('activeNodeStartIndex is: ' + activeNodeStartIndex);
        // !VA Configure the basic indenting 'flavor'
        // !VA Counter needs to start incrementing at 0 so we initialize it at -1. It needs to be reset at the top of each indenting 'flavor'.
        counter = -1;

        // !VA Here we 'extract' those nodes from the full nodeList correspond to the user CCP selections. IMPORTANT: this container has to be rebuilt for all 'flavors' of indenting, i.e. basic and posswitch. It does NOT apply to bgimage and imgswap since these are built directly from code blocks embedded in comment nodes.
        // !VA Branch: fixPosSwitchIndents - IMPORTANT! The CONTAINER is the subset of nodes to which indents will be applied. It is NOT the full nodeList of the complete node tree. What we pass is the full nodeList the complete node tree and we apply the indents to the nodes in the complete tree. The extracted nodes that live in the CONTAINER are updated live in the DOM. Finally, the outer HTML of the nodes in the CONTAINER (i.e. the extracted nodes) is passed to the Clipboard object for output.   
        container = nl[activeNodeStartIndex];
        console.log('basic container is: ');
        configNodeIndents(uSels, nl, activeNodeStartIndex, counter);
      }
      // !VA BASIC End

      // !VA IMGSWAP Start
      if ( uSels.selectedRadio === 'imgswap') {
        // configBgimageIndents( uSels, nl, index, counter, indentLevel);
        activeNodeStartIndex = (nl.length - indentDepth);
        // !VA 03.21.2020 We really don't have to pass activeNodeIndex or counter or indentDepth, do we?
        // !VA Get the comment node that includes the MS conditional comments
        // configImgSwapIndents(uSels, nl, index, counter, indentLevel);
        commentNode = configImgSwapIndents(uSels, nl, activeNodeStartIndex, counter, indentDepth);
        // !VA Append the commentNode to the lowest descendent in the node tree.
        // nl[5].appendChild(commentNode);
        // !VA 'Extract' the active nodes, i.e. the nodes that correspond to the user's CCP selection, in the container.
        container = nl[activeNodeStartIndex];
      } // IMGSWAP End

      // !VA BGIMAGE Start
      if ( uSels.selectedRadio === 'bgimage') {
        // !VA 03.21.2020 This works for TD button, but not TABLE button.
        activeNodeStartIndex = (nl.length - indentDepth);
        // !VA 03.21.2020 We really don't have to pass activeNodeIndex or counter or indentDepth, do we?
        // !VA Get the comment node that includes the MS conditional comments
        commentNode = configBgimageIndents( uSels, nl, activeNodeStartIndex, counter, indentDepth);
        // !VA Append the commentNode to the lowest descendent in the node tree.
        nl[5].appendChild(commentNode);
        // !VA 'Extract' the active nodes, i.e. the nodes that correspond to the user's CCP selection, in the container.
        container = nl[activeNodeStartIndex];
      }
      // !VA BGIMAGE End


      // !VA POSSWITCH Start
      if (uSels.selectedRadio === 'posswitch') {
        // console.clear();
        // !VA Find out which index position in the nodeList corresponds to the user CCP selection  based on the conditions defined in parseUserSelections. For instance, if the IMG button is clicked with Include anchor checked, i will start incrementing at 6, the position of the anchor tag in the list.
        // !VA The counter determines the indentLevel. It initializes at -1 so it starts incrementing at 0, giving the top node in the list no indent. Subsequent nodes get an indent level of 1 and so on.
        // !VA Branch: fixPosSwitch: to clarify the above...
        // !VA activeNodeStartIndex is the position in the nodeList that defines the start of the ACTIVE nodes, i.e. the nodes in the node tree that are to receive indents based on the user CCP selection. activeNodeStartIndex equals the nodeList count of the complete node tree, minus the indentDepth passed in from parseUserSelections, so it will be different for all flavors of indenting. IT NEEDS TO BE SET AT THE TOP OF EACH FLAVOR.
        // !VA IMPORTANT: Note the difference between activeNodeStartIndex and indentDepth, and note that we have to subtract a value from this for posswitch because it has extra sibling nodes and seven extra nodes between parent td of the anchor/image and the top TD returned by makePosSwitchNodes. Very complicated, but suffice it to say that the magic number is 7, see below.
        console.log('activeNodeStartIndex = (nl.length - indentDepth)');
        console.log('activeNodeStartIndex = (' + nl.length + ' - (' + indentDepth + ' + 7)');
        activeNodeStartIndex = (nl.length - (indentDepth + 7));
        console.log('870 activeNodeStartIndex is: ' + activeNodeStartIndex);

        // !VA Configure the posswitch indenting 'flavor'
        // !VA Counter needs to start incrementing at 0 so we initialize it at -1. It needs to be reset at the top of each indenting 'flavor'.
        counter = -1;
        // !VA Create the container that contains the nodes to be output to the clipboard. But we continue to process the and assign indents based on the original nodeList -- those changes stay live in the outputted nodes.
        // container = document.createElement('div');
        // !VA Here we 'extract' those nodes from the full nodeList correspond to the user CCP selections. IMPORTANT: this container has to be rebuilt for all 'flavors' of indenting, i.e. basic and posswitch. It does NOT apply to bgimage and imgswap since these are built directly from code blocks embedded in comment nodes.

        // !VA Branch: fixPosSwitch: AND THE PROBLEM IS...That activeNodeStartIndex is 12 rather than 5, because the nodeList count (nl.length) includes 5 nodes that come AFTER the initial TD that is defined in makePosSwitchNodes. So let's try to hack this...
        // !VA Branch: fixPosSwitch: We are building the container, but not passing it here? What's the point in building it here then if it's gong to be built again in configNodeINdents? And why is the clipboard being written to now?
        // container = nl[activeNodeStartIndex];
        // !VA Branch: fixPosSwitch PROBLEM: If we delete the below container assignment, which we actually shouldn't need, then the container output div has no children. Also, it appears that bgimage and imgswap now have no output to the container div.

        // !VA Branch: fixPosSwitchIndents: The number 5 below is a hack I put in here just to get the TD button to work. Now I have to get the correct nodelist to be extracted when the table button configurations are selected. 
        // !VA Branch: fixPosSwitchIndents Don't forget - THIS is what gets sent to the clipboard object.
        // container = nl[5];
        container = nl[activeNodeStartIndex];

        // !VA Branch: fixPosSwitch: THere we go! But now we're not getting indents starting at position 5, but rather at position
        configNodeIndents( uSels, nl, activeNodeStartIndex, counter);
      }
      var clipboardStr = container.outerHTML;
      writeClipboard( aliasToId(uSels.buttonClicked), clipboardStr);
    }
    