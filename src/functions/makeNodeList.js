    function makeNodeList( id, curNode ) {
      console.log('makeNodeList running');
      // console.log('curNode is: ');
      // console.log(curNode);
      // console.clear();
      let container, nl, imgNode, tdNode,tableNode, topNode;
      let indent, indentLevel;
      container = document.createElement('div');
      container.appendChild(curNode);
      nl = container.querySelectorAll('*');
      return nl;
    }