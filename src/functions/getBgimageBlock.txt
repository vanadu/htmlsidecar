    function getBgimageBlock( indentLevel) {
      let Attributes;
      Attributes = getAttributes();
      let bgimageStr, fallback, bgcolor;
      let linebreak;
      linebreak = '\n';
      // !VA 03.09.2020 Set the indentLevel to 1 for now
      fallback = '#7bceeb';
      Attributes.tdBgcolor ? bgcolor = Attributes.tdBgcolor : bgcolor = fallback;

      // !VA Define the innerHTML of the bgimage code
      bgimageStr = `[if gte mso 9]>${linebreak}${getIndent(indentLevel)}<v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:${Attributes.imgWidth}px;height:${Attributes.imgHeight}px;">${linebreak}${getIndent(indentLevel)}<v:fill type="tile" src="${Attributes.tdBackground}" color="${bgcolor}" />${linebreak}${getIndent(indentLevel)}<v:textbox inset="0,0,0,0">${linebreak}${getIndent(indentLevel)}<![endif]-->${linebreak}${getIndent(indentLevel)}<div>${linebreak}${getIndent(indentLevel)}<!-- Put Foreground Content Here -->${linebreak}${getIndent(indentLevel)}</div><!--[if gte mso 9]>${linebreak}${getIndent(indentLevel)}</v:textbox>${linebreak}${getIndent(indentLevel)}</v:rect><![endif]`;

      return bgimageStr;
    }