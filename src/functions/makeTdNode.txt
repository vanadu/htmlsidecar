    function makeTdNode( id, selectedRadio ) {
      // console.log('makeTdNode running');
      let Attributes;
      Attributes = getAttributes();
      let tdInner, imgNode;
      tdInner = document.createElement('td');
      // !VA Add the attributes that are included in both the default and background image td
      if (Attributes.tdValign) { tdInner.vAlign = Attributes.tdValign; }
      // !VA bgcolor attribute. Pass the input value, don't prepend hex # character for now
      if (Attributes.tdBgcolor) { tdInner.bgColor = Attributes.tdBgcolor; }
      // !VA Now add the attributes included only with the default Td configuration
      switch(true) {
      case (selectedRadio === 'basic'):
        // !VA class attribute
        if (Attributes.tdClass) { tdInner.className = Attributes.tdClass; }
        // !VA valign attribute
        if (Attributes.tdAlign) { tdInner.align = Attributes.tdAlign; }
        // !VA height attribute
        if (Attributes.tdHeight) { tdInner.height = Attributes.tdHeight; }
        // !VA The id is wrong here -- we're passing the td's id but that shouldn't matter
        imgNode = makeImgNode();
        // !VA We need to include the imgNode here ONLY if Bgimage is unchecked
        tdInner.appendChild(imgNode);
        break;
      case (selectedRadio === 'imgswap'):
        tdInner.width = Attributes.tdAppdataWidth;
        tdInner.height = Attributes.tdAppdataHeight;
        // !VA valign attribute
        tdInner.align = Attributes.tdAlign;
        // !VA get the current img
        imgNode = makeImgNode();
        tdInner.appendChild(imgNode);
        break;
      case (selectedRadio === 'bgimage'):
        // !VA First we create the node
        tdInner.width = Attributes.tdAppdataWidth;
        tdInner.height = Attributes.tdAppdataHeight;
        // !VA valign attribute
        tdInner.vAlign = Attributes.tdValign;
        // !VA Set the background attribute to the current path/filename
        tdInner.setAttribute('background', Attributes.tdBackground);
        // !VA Include fallback color if no bgColor is selected. Use Stig's fallback: #7bceeb
        break;
      case (selectedRadio === 'posswitch'):

        break;
      default:
      } 
      return tdInner;
    }