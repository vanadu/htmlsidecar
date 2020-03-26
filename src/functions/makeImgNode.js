    function makeImgNode ( id ) {
      // console.log('makeImgNode running');
      // !VA Id is passed but not used here,  because we're only building the node.
      let Attributes;
      Attributes = getAttributes();
      let imgNode, returnNode;
      imgNode = document.createElement('img');
      // !VA class attribute
      if (Attributes.imgClass) { imgNode.className = Attributes.imgClass; }
      // !VA alt attribute
      if (Attributes.imgAlt) { imgNode.alt = Attributes.imgAlt; }
      // src attribute;
      imgNode.src = Attributes.imgSrc;
      // !VA width attribute
      imgNode.width = Attributes.imgWidth;
      // !VA height attribute
      imgNode.height = Attributes.imgHeight;
      // !VA style attribute
      imgNode.setAttribute('style', Attributes.imgStyle);
      // !VA align attribute is deprecated in html5, so we need this hack if we want to include it, which we don't for now.
      if (Attributes.imgAlign) { imgNode.align = Attributes.imgAlign; }
      // !VA border attribute
      imgNode.border = '0';
      
      // !VA If the include anchor option is checked, create the anchor element, add the attributes, append the imgNode to it, and return it.
      if(Attributes.imgIncludeAnchor === true) {
        let anchor = document.createElement('a');
        anchor.href = '#';
        anchor.setAttribute('style', 'color: #FF0000');
        // console.log(anchor.outerHTML);
        anchor.appendChild(imgNode);
        // console.log(anchor.outerHTML);
        returnNode = anchor;
      } else {
        // !VA Otherwise, set returnNode to imgNode without the anchor.
        returnNode = imgNode;
      }
      return returnNode;
    }