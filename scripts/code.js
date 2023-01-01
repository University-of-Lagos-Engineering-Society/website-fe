const ham = document.querySelector('.hamburger');
const nav = document.querySelector('.navbar-list');
line1 = document.querySelector('.line1')
line3 = document.querySelector('.line3')

ham.addEventListener('click', () => {
  if (ham.className === 'hamburger') {
    ham.classList.add('close');
    line1.classList.add('toggledBySidebar')
    line3.classList.add('toggledBySidebar')
  } else if (ham.className === 'hamburger close') {
      ham.classList.remove('close');
      ham.classList.add('hamburgerback');

      line1.classList.remove('toggledBySidebar')
      line3.classList.remove('toggledBySidebar')
  } else if (ham.className === 'hamburger hamburgerback') {
      ham.classList.add('close');
      ham.classList.remove('hamburgerback');
      
      line1.classList.add('toggledBySidebar')
      line3.classList.add('toggledBySidebar')
  } else {
    ham.className = 'hamburger';
  }

  if (nav.className === 'navbar-list') {
    nav.classList.add('responsive');
  } else if (nav.className === 'navbar-list responsive') {
    nav.classList.add('responsiveReturn');
  } else if (nav.className === 'navbar-list responsive responsiveReturn') {
    nav.classList.remove('responsiveReturn');
  } else {
    nav.className = 'navbar-list';
  }
});

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("card-flex");
//   let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "flex";
}



let execClass = document.querySelector(".exec_div.one");
let whiteClass = document.querySelector(".white_div.one")
let greenClass = document.querySelector(".white_div.green.one")



execClass.addEventListener("mouseenter", () => {
  whiteClass.style.display = 'none';
  greenClass.style.display = 'block';
})

execClass.addEventListener("mouseleave", () => {
  whiteClass.style.display = 'block';
  greenClass.style.display = 'none';
}) 

let execClass2 = document.querySelector(".exec_div.two");
let whiteClass2 = document.querySelector(".white_div.two")
let greenClass2 = document.querySelector(".white_div.green.two")



execClass2.addEventListener("mouseenter", () => {
  whiteClass2.style.display = 'none';
  greenClass2.style.display = 'block';
})

execClass2.addEventListener("mouseleave", () => {
  whiteClass2.style.display = 'block';
  greenClass2.style.display = 'none';
}) 


let execClass3 = document.querySelector(".exec_div.three");
let whiteClass3 = document.querySelector(".white_div.three")
let greenClass3 = document.querySelector(".white_div.green.three")



execClass3.addEventListener("mouseenter", () => {
  whiteClass3.style.display = 'none';
  greenClass3.style.display = 'block';
})

execClass3.addEventListener("mouseleave", () => {
  whiteClass3.style.display = 'block';
  greenClass3.style.display = 'none';
}) 



let execClass4 = document.querySelector(".exec_div.four");
let whiteClass4 = document.querySelector(".white_div.four")
let greenClass4 = document.querySelector(".white_div.green.four")



execClass4.addEventListener("mouseenter", () => {
  whiteClass4.style.display = 'none';
  greenClass4.style.display = 'block';
})

execClass4.addEventListener("mouseleave", () => {
  whiteClass4.style.display = 'block';
  greenClass4.style.display = 'none';
}) 



let execClass5 = document.querySelector(".exec_div.five");
let whiteClass5 = document.querySelector(".white_div.five")
let greenClass5 = document.querySelector(".white_div.green.five")



execClass5.addEventListener("mouseenter", () => {
  whiteClass5.style.display = 'none';
  greenClass5.style.display = 'block';
})

execClass5.addEventListener("mouseleave", () => {
  whiteClass5.style.display = 'block';
  greenClass5.style.display = 'none';
}) 


let execClass6 = document.querySelector(".exec_div.six");
let whiteClass6 = document.querySelector(".white_div.six")
let greenClass6 = document.querySelector(".white_div.green.six")



execClass6.addEventListener("mouseenter", () => {
  whiteClass6.style.display = 'none';
  greenClass6.style.display = 'block';
})

execClass6.addEventListener("mouseleave", () => {
  whiteClass6.style.display = 'block';
  greenClass6.style.display = 'none';
}) 



let execClass7= document.querySelector(".exec_div.seven");
let whiteClass7 = document.querySelector(".white_div.seven")
let greenClass7 = document.querySelector(".white_div.green.seven")



execClass7.addEventListener("mouseenter", () => {
  whiteClass7.style.display = 'none';
  greenClass7.style.display = 'block';
})

execClass7.addEventListener("mouseleave", () => {
  whiteClass7.style.display = 'block';
  greenClass7.style.display = 'none';
}) 

let execClass8= document.querySelector(".exec_div.eight");
let whiteClass8 = document.querySelector(".white_div.eight")
let greenClass8 = document.querySelector(".white_div.green.eight")



execClass8.addEventListener("mouseenter", () => {
  whiteClass8.style.display = 'none';
  greenClass8.style.display = 'block';
})

execClass8.addEventListener("mouseleave", () => {
  whiteClass8.style.display = 'block';
  greenClass8.style.display = 'none';
}) 


let execClass9= document.querySelector(".exec_div.nine");
let whiteClass9 = document.querySelector(".white_div.nine")
let greenClass9 = document.querySelector(".white_div.green.nine")



execClass9.addEventListener("mouseenter", () => {
  whiteClass9.style.display = 'none';
  greenClass9.style.display = 'block';
})

execClass9.addEventListener("mouseleave", () => {
  whiteClass9.style.display = 'block';
  greenClass9.style.display = 'none';
}) 


let execClass0= document.querySelector(".exec_div.ten");
let whiteClass0 = document.querySelector(".white_div.ten")
let greenClass0 = document.querySelector(".white_div.green.ten")



execClass0.addEventListener("mouseenter", () => {
  whiteClass0.style.display = 'none';
  greenClass0.style.display = 'block';
})

execClass0.addEventListener("mouseleave", () => {
  whiteClass0.style.display = 'block';
  greenClass0.style.display = 'none';
}) 






let slideCount = 1;
showSlide(slideCount);

function plusSlide(n) {
  showSlide(slideIndex += n);
}



function showSlide(n) {
  let i;
  let slides = document.getElementsByClassName("faq_box");
//   let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}
