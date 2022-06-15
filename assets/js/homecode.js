let slideNo = 1;
showSnippet(slideNo);

function nextSnippet(a) {
  showSnippet(slideNo += a);
}

function thisSlide(a) {
  showSnippet(slideNo = a);
}

function showSnippet(a) {
  let i;
  let snippet = document.getElementsByClassName("snippet-flex");
  let box = document.getElementsByClassName("box");
  if (a > snippet.length) {
    slideNo = 1;
  }
  if (a < 1) {
    slideNo = snippet.length;
  }
  for (i = 0; i < snippet.length; i++) {
    snippet[i].style.display = "none";
  }
  for (i = 0; i < box.length; i++) {
    box[i].className = box[i].className.replace(" show", "");
  }
  snippet[slideNo-1].style.display = "flex";
  box[slideNo-1].className += " show";
}

// let selected = document.getElementsByClassName("select-container");
// let toggleBox = document.getElementsByClassName("toggle-box");
// let toggleBox2 = document.getElementsByClassName("toggle-box2");
// let toggleBox3 = document.getElementsByClassName("toggle-box3");
// let selectContents = document.getElementsByClassName("select-section");
// toggleBox[0].classList.add('show');
// selectContents[0].style.display = 'block';
// selectContents[1].style.display = 'none';
// selectContents[2].style.display = 'none';

// selected[0].addEventListener("click", e => {
//   if (e.target.className === 'select-container selected') {
//     e.target.className = 'select-container selected';
//   } else if (e.target.className === 'select-container') {
//     e.target.classList.add('selected');
//     selectContents[0].style.display = 'block';
//     selectContents[1].style.display = 'none';
//     selectContents[2].style.display = 'none';
//     selected[1].classList.remove('selected');
//     selected[2].classList.remove('selected');
//     toggleBox[1].classList.remove('show');
//     toggleBox[2].classList.remove('show');
//     toggleBox[0].className = 'toggle-box show';
//   }
// });

// selected[1].addEventListener("click", e => {
//   if (e.target.className === 'select-container selected') {
//     e.target.className = 'select-container selected';
//   } else if (e.target.className === 'select-container') {
//     e.target.classList.add('selected');
//     selectContents[1].style.display = 'block';
//     selectContents[0].style.display = 'none';
//     selectContents[2].style.display = 'none';
//     selected[0].classList.remove('selected');
//     selected[2].classList.remove('selected');
//     toggleBox2[0].classList.remove('show');
//     toggleBox2[2].classList.remove('show');
//     toggleBox2[1].className = 'toggle-box2 show';
//   }
// });

// selected[2].addEventListener("click", e => {
//   if (e.target.className === 'select-container selected') {
//     e.target.className = 'select-container selected';
//   } else if (e.target.className === 'select-container') {
//     e.target.classList.add('selected');
//     selectContents[2].style.display = 'block';
//     selectContents[0].style.display = 'none';
//     selectContents[1].style.display = 'none';
//     selected[1].classList.remove('selected');
//     selected[0].classList.remove('selected');
//     toggleBox3[1].classList.remove('show');
//     toggleBox3[0].classList.remove('show');
//     toggleBox3[2].className = 'toggle-box3 show';
//   }
// });

window.addEventListener("scroll", () => {
    const scrollToa = document.querySelector("#goals-shit");
    const goalNo = document.querySelectorAll('.goal-number');
    if (scrollY >= 2400 && scrollY <= 2450) {
      let output = 0;
      let output2 = 0;
      let output3 = 0;
      let output4 = 0;
      const timer = setInterval(() => {
          goalNo[0].textContent = output;
          if (output === 112) {
              clearInterval(timer);
          } else {
              output++;
          }
      }, 10);
  
      const timer2 = setInterval(() => {
        goalNo[1].textContent = output2;
        if (output2 === 6500) {
            clearInterval(timer2);
        } else {
            output2+=50;
        }
      }, 10);
  
      const timer3 = setInterval(() => {
        goalNo[2].textContent = `${output3}%`;
        if (output3 === 97) {
            clearInterval(timer3);
        } else {
            output3++;
        }
      }, 10);
  
      const timer4 = setInterval(() => {
        goalNo[3].textContent = `${output4}%`;
        if (output4 === 100) {
            clearInterval(timer4);
        } else {
            output4++;
        }
      }, 10);
    }
  });