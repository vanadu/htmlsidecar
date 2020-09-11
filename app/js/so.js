var MyApp = (function () {
  var UIController = (function() {
    return {
      initUI: function() {
        appController.getAppobj();
        appController.initmyAppControllerFunction();
      },
      writeCurImgToDOM: function(Appobj) {
        document.querySelector('#cur-img').style.width = Appobj.imgNW + 'px';
        document.querySelector('#cur-img').style.height = Appobj.imgNH + 'px';
      }, 
      populateAppobj: function (Appobj) {
        let curImg;
        function populateAppProperties(Appobj) {
          // !VA Get the current image
          curImg = document.querySelector('#cur-img');
          Appobj.imgNW = curImg.naturalWidth;
          Appobj.imgNH = curImg.naturalHeight;
        }
        populateAppProperties(Appobj);
      },
    };
  })();

  var appController = (function(UICtrl) {
    let Appobj = {};
    function myAppControllerFunction() {
      UIController.populateAppobj(Appobj);
      UIController.writeCurImgToDOM(Appobj);
    }
    return {
      getAppobj: function() {
        // Uncomment the line below to make Appobj a 'normal' object
        // UIController.populateAppobj(Appobj); 
        console.log('Appobj is: ');
        console.dir(Appobj);
        Object.keys(Appobj).length === 0 ? console.log('getAppobj NO LENGTH') : console.log('getAppobj HAS LENGTH');
      },
      initmyAppControllerFunction: function() {
        myAppControllerFunction(true);
      },
      // !VA appController public
      init: function(){
        console.log('App initialized.');
        // !VA Initialize the UI
        UICtrl.initUI();
      }
    };
  })(UIController);
  appController.init();
})();