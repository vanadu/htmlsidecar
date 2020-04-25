    function applyIndents2(node, indent, indentType ) {
      console.log('applyIndents2 running');
      // !VA Apply indents to nodes. Changes apply to the live DOM nodes, so no return is required.
      if (indentType === 'ignore') {
        // !VA Do nothing
      }
      else if (indentType == 'terminal') {
        node.insertAdjacentHTML('beforebegin', indent);
        node.insertAdjacentHTML('afterend', '\n');
      } 
      
      else if (indentType === 'normal') {
        // !VA 03.15.2020 the passed-in node from 
        node.insertAdjacentHTML('beforebegin', indent);
        node.insertAdjacentHTML('afterbegin', '\n');
        node.insertAdjacentHTML('beforeend', indent);
        node.insertAdjacentHTML('afterend', '\n');
      }
    }
