// !VA Handle the exception cases, i.e. imgNode doesn't get any indent if wrapped in an anchor, and separate handling of the terminal node vs parent nodes. Don't need indentIndex or indexType parameters  - they are generated here and passed from here.
function preprocessIndents( id, curNode ) {
  // console.clear();
  console.log('PreprocessIndents running');
  let nl, block, i, indent, clipboardStr, nextSiblingNodeIndex,  previousSiblingNodeIndex, previousSiblingIndent;
  // !VA If the makeImg button was clicked, just get the nodeList of the imgNode
  if (id === btnCcpMakeClips.btnCcpMakeImgTag.slice(1)) {
    // !VA getUserSelection Don't apply ANY indents at ALL!
    nl = makeNodeList( id, curNode);
  } 
  // !VA If the makeTd button was clicked find out which tdoptions was selected
  if (id === btnCcpMakeClips.btnCcpMakeTdTag.slice(1)) {
    // !VA getUserSelection Rather than pass the parameter, we can just get the selectedRadio here.
    var selectedRadio = document.querySelector('input[name="tdoptions"]:checked').value;
    switch(true) {
    // !VA If td with options was selected 
    case ( selectedRadio === 'basic'):
      // !VA Get the nodeList for tdNode
      nl = makeNodeList(id, curNode);
      // !VA Determine whether an anchor exists and if so apply the appropriate indents. The img tag never gets indents.
      for (i = 0; i < nl.length; i++) {
        indent = getIndent(i);
        if ( i === 1 && nl[i].nodeName === 'A') {
          // !VA If nodeList item 1 is the anchor, then Include anchor is checked. Apply the 'terminal' indent scheme and don't apply any indent to the img element.
          applyIndents(id, nl, i, 'terminal', indent);
        } else if (i === 2 && nl[i].nodeName === 'IMG') {
          // !VA If there are 3 nodes, then Include anchor is checked and the anchor gets the indent, so ignore indents for the img element. This clause is unnecessary, is only included for clarity.
        } else {
          // !VA Apply normal indents to the parent td
          applyIndents(id, nl, i, 'normal', indent);
        }
      }
      break;
    case ( selectedRadio === 'imgswap'):
      // !VA Hacked indents for now.
      block = getImgSwapBlock( 1 );
      // !VA Create a comment node
      var com = document.createComment(block);
      // !VA Append comment node to parent node
      curNode.appendChild(com);
      // !VA Make the nodeList
      nl = makeNodeList(id, curNode);
      // !VA Hack in these indents to the child of the parent td - I haven't been able to figure out how to use insertAdjacentHTML with text or comment nodes.
      nl[1].insertAdjacentHTML('afterend', '\nHH');
      nl[0].insertAdjacentHTML('beforeend', '\n');
      break;
    case ( selectedRadio === 'posswitch'):
      // !VA Get the PosSwitch node
      curNode = makePosSwitchNodes();
      // !VA Make the nodeList of the posSwitch node
      nl = makeNodeList(id, curNode);
      for (let i = 0; i < nl.length; i++) {
        // !VA Get the positions of the relevant child nodes for indents
        if (nl[i].nextSibling) {nextSiblingNodeIndex = i; } 
        if (nl[i].previousSibling) {previousSiblingNodeIndex = i; } 
      }
      // !VA The indent index of the second child is the second child's node index plus 5 -- that gives us the indent index of the first child node 
      previousSiblingIndent = (nl.length - (nextSiblingNodeIndex + 5));
      for (let i = 0; i < nl.length; i++) {
        // !VA Get the indent based on the loop count
        indent  = getIndent(i);
        // !VA If there's a next sibling, then there are child nodes to the parent node, so we do the IF clause. AND if so, then if the loop counter is greater than the node index of the second child, run the if clause.
        if (nextSiblingNodeIndex && i >= previousSiblingNodeIndex) {
          // !VA Set the sibling's indent to be the same as that of the first sibling of the parent TR
          indent = '' + getIndent(i - previousSiblingIndent);
          // !VA We still need to add some indicator content to the terminating TD in this nodeList -- putting it in the makePosSwitchNode function itself would make it impossible to indent properly without some creative coding that's beyond my ability. So. we'll put it here, after the indent has been shrunk to be equal to the nextSibling's indent.
          if ( i === 12) {
            nl[i].innerHTML = indent + '  <!-- ADD YOUR CONTENT HERE --> \n';
          }
          nl[i].insertAdjacentHTML('beforebegin', indent);
          nl[i].insertAdjacentHTML('afterbegin', '\n');
          nl[i].insertAdjacentHTML('beforeend', indent);
          nl[i].insertAdjacentHTML('afterend', '\n');
        } 
        // !VA Otherwise, there is either no sibling or the sibling is the first child element and so gets the normal indent scheme.
        else {
          applyIndents(id, nl, i, 'normal', indent);
        }
      }
      break;
    // !VA Get the bgimage code block and apply indent hacks to the parent td.
    case ( selectedRadio === 'bgimage'):
      // !VA Hacked indents for now.
      block = getBgimageBlock( 1 );
      nl = makeNodeList(id, curNode);
      nl[0].innerHTML = block;
      nl[0].insertAdjacentHTML('afterbegin', '\nHH');
      nl[0].insertAdjacentHTML('beforeend', '\n');
      break;
    default:
    } 
  }
  // !VA Make the clipboard string
  clipboardStr = nl[0].outerHTML;
  // !VA And write to clipboard
  writeClipboard( id, clipboardStr);
}