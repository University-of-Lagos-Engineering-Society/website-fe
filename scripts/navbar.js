navbar = document.querySelector('nav')
line1 = document.querySelector('.line1')
line3 = document.querySelector('.line3')

// When the user scrolls down 100px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    navbar.classList.add('page-scrolling');
    line1.classList.add('toggled')
    line3.classList.add('toggled')
  } else {
    navbar.classList.remove('page-scrolling');
    line1.classList.remove('toggled')
    line3.classList.remove('toggled')
  }
}