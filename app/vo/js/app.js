window.onload = function() {

  // length

  var length     = document.querySelector('.length');
  var lengthCont = document.querySelector('.length__cont');
  var lengthList = document.querySelector('.length__list');
  var lengthLink = document.querySelectorAll('.length__link');

  if (length !== null) {
    lengthCont.onclick = function () {
      lengthList.classList.toggle('active');
    };

    lengthLink.forEach(del => del.onclick = function (){
      for(let i = 0;i<lengthLink.length;i++){
        lengthLink[i].classList.remove('close');
      }
      var lengthText = this.innerText;
      lengthCont.innerText = lengthText;
      lengthList.classList.remove('active');
      this.classList.add('close');
    });
  };

  // menu

  var menu       = document.querySelector('.menu');
  var menuButton = document.querySelector('.menu__button');

  menuButton.onclick = function () {
    menu.classList.toggle('active');
  };

}
