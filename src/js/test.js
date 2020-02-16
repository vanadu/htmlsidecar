document.addEventListener('DOMContentLoaded', function() {
  console.log('ready...');
});

var code1 = null;

code1 = `
<table border="0" cellpadding="0" cellspacing="0">
<tr>
<td>
<img src="img/blob.jpg"/>
</td>
</tr>
</table>
`

// Parameters:
// code 								- (string) code you wish to format
// stripWhiteSpaces			- (boolean) do you wish to remove multiple whitespaces coming after each other?
// stripEmptyLines 			- (boolean) do you wish to remove empty lines?
var formatCode = function(code, stripWhiteSpaces, stripEmptyLines) {
  'use strict';
  var whitespace          = ' '.repeat(2);             // Default indenting 4 whitespaces
  var currentIndent       = 0;
  var char                = null;
  var nextChar            = null;


  var result = '';
  for(var pos=0; pos <= code.length; pos++) {
    char            = code.substr(pos, 1);
    nextChar        = code.substr(pos+1, 1);

    // If img tag, add newline character and indention
    // if(char === '/' && nextChar === '>') {
    //   // result += (char + 2);
    //   console.log('pos is: ' + pos);
    //   console.log('char is: ' + char);
    //   console.log('result is: ' + result);

    //   result += '\n' + whitespace.repeat(currentIndent);
    //   currentIndent++;
    // }


    // If opening tag, add newline character and indention
    if(char === '<' && nextChar !== '/') {
      console.log('result1 is: ' + result); 
      console.log('char is: ' + char);
      result += '\n' + whitespace.repeat(currentIndent);
      console.log('result2 is: ' + result); 
      currentIndent++;
    }
    // if Closing tag, add newline and indention
    else if(char === '<' && nextChar === '/') {
      // If there're more closing tags than opening
      if(--currentIndent < 0) currentIndent = 0;
      result += '\n' + whitespace.repeat(currentIndent);
    }

    // remove multiple whitespaces
    else if(stripWhiteSpaces === true && char === ' ' && nextChar === ' ') char = '';
    // remove empty lines
    else if(stripEmptyLines === true && char === '\n' ) {
      //debugger;
      if(code.substr(pos, code.substr(pos).indexOf('<')).trim() === '' ) char = '';
    }

    result += char;
    console.log('result3 is: ' + result); 
  }
  return result;
};

console.log(formatCode(code1, true, true));