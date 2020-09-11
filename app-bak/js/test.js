window.onclick = function(event) {
  var popups;
  if (event.target.className === "btn btn-link") {
    // Get a collection of all the popups with the class name 'overlay'
    popups  = document.getElementsByClassName('overlay');
    // Loop through each popup and apply the display property 'block'. You don't have to get each one individually by the id.
    for (let i = 0; i < popups.length; i++) {
      popups[i].style.display = "block";
    }
  }
  if (event.target.className === "overlay") {
    event.target.style.display = "none";
  }
};


