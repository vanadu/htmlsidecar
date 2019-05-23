var foo = new Clipboard('#copy-button');

foo.on('success', function(event) {
  event.clearSelection();
  event.trigger.textContent = 'Copied';
  window.setTimeout(function() {
    event.trigger.textContent = 'Copy';
  }, 2000);
});