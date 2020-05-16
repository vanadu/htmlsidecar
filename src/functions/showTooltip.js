      // !VA UIController public
      showTooltip: function(targetid, tooltipContent) {
        // console.log('handleTooltips running');
        let el, tipEl, timer, delay;
        // !VA Get the element that is the target of the mouseenter event, i.e. the element for which the tooltip is to be displayed
        el = document.querySelector(targetid);
        // !VA Get the element in which the tooltip is to be displayed. This is the P element that lives in ttip-content-container.
        delay = 2000;
        el.addEventListener('mouseleave', leaveMe, false);
        tipEl = document.getElementById('tip-content');
        
        function setDelay() {
          timer = setTimeout(() => {
            console.log('NOW');
            el.classList.add('active');
            el.classList.remove('ttip');
            tipEl.innerHTML = tooltipContent;
            // !VA If an error message is being displayed now, then do not show the tooltip. The user has to exit the element and reenter it once the error message is done displaying if they want to see the tooltip. This is a funky tertiary but I tried it with an if ! clause and it didn't work, so leave it for now.
            document.getElementById('msg-content').classList.contains('show-err') ? document.getElementById('msg-content').classList.contains('show-err') :  tipEl.classList.add('active');
          }, delay);
        }
        setDelay();

        function cancelDelay() {
          clearTimeout(timer);
        }

        function leaveMe() {
          cancelDelay();
          el.classList.add('ttip');
          el.classList.remove('active');
          tipEl.classList.remove('active');
          // !VA This not the place to reset the innerHTML
          // document.getElementById('ttip-content').innerHTML = '';
        }
      },
