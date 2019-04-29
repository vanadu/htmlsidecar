  //Testing clipboard functionality -- no way to get the filename here unless I get it from initPage or from a global object


//BUILD TD CLIPBOARDS


//TODO: This doesn't work yet
function closeCCP() {
  var cc = document.getElementById('ccp');
  //Grow class defined style.css -- add it with a space if there already is a class defined
  removeClass(cc, "active");
}

//TEST STUFF
//event handler for Logo button





function addClass(elem, c) {
  if (elem.classList === "") {
    elem.classList += c;
    
  } else {
    elem.classList += " " + c;
  }
}

function removeClass(elem, c) {
  if (elem.classList)
    elem.classList.remove(c)
  else if (hasClass(elem, c)) {
    var reg = new RegExp('(\\s|^)' + c + '(\\s|$)')
    el.c=el.c.replace(reg, ' ')
  }
}














