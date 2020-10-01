document.querySelector('.but1').addEventListener('click', doit, false );
document.querySelector('.ipt').addEventListener('keydown', kevent, false );
document.querySelector('.ipt').addEventListener('blur', mevent, false );


function doit() {
  console.log('click');
}

function kevent(evt) {
  let keydown = evt.which || evt.keyCode || evt.key;
  if (keydown == 9 ) {
    // console.log('kevent running'); 
    // console.log('kevent evt.type is: ' + evt.type);
    console.log('TAB pressed');
    hblur(evt.target);
  }
  
}

function mevent(evt) {
  // console.log('mevent running');
  // console.log('mevent evt.type is: ' + evt.type);
  hblur(evt.target);
}

function hblur(el) {
  console.log('hblur running');
  let input = el;
  // console.log('input.id is: ' + input.id);
  // console.log('input.value is: ' + input.value);
  // console.log('this is: ' + this);
  // console.log('hblur evt is: ' + evt);
  // console.log('hblur evt.type is: ' + evt.type);
  // !VA if it's a keyboard event, process it and skip the focus event
  // !VA If it's a focus event process it
  // if (evt.type === 'keydown') {
  //   console.log('keydown event fired');
  //   return;
  // } else if ( evt.type === 'blur') {
  //   console.log('blur event fired');

  // }
  // else {
  //   console.log('unknown event');
  // }

  if (!input.value.includes('@')) { // not email
    // show the error
    input.classList.add('error');
    // ...and put the focus back
    setTimeout(() => {
      console.log('returning focus to ipt1');
      input.focus();
      input.select();
    }, 10);
    // input.focus();
    // input.select();
  } else {
    input.classList.remove('error');
  }



}