const readMore = document.querySelector("p.read-more");
const moreNews = document.querySelector("#more-news");

readMore.addEventListener("click", e => {
  e.target.style.display = 'none';
  moreNews.style.display = 'block';
});


// document.querySelector('#about-link').addEventListener("click", e => {
//   const aboutPop = document.querySelector('#pop1');
//   if (aboutPop.style.display === 'none') {
//     aboutPop.style.display = 'block';
//   } else {
//     aboutPop.style.display = 'none';
//   }
// });

// const showAbout = () => {
//   const aboutPop = document.querySelector('#pop1');
//   if (aboutPop.style.display === 'none') {
//     aboutPop.style.display = 'block';
//   } else {
//     aboutPop.style.display = 'none';
//   }
// }

// const showNews = () => {
//   const aboutPop = document.querySelector('#pop2');
//   if (aboutPop.style.display === 'none') {
//     aboutPop.style.display = 'block';
//   } else {
//     aboutPop.style.display = 'none';
//   }
// }