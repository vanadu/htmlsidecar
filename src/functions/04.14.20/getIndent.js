    function getIndent(indentLevel) {
      // console.log('getIndent running');
      // console.log('indentLevel is: ' + indentLevel);
      let indentChar, indent;
      indentChar = 'HH';
      indent = indentChar.repeat([indentLevel]);
      // console.log('indent is: ' + indent);
      return indent;
    }