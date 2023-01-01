const readMore = document.querySelector("p.read-more");
const moreEvents = document.querySelector("#more-events");

readMore.addEventListener("click", e => {
  e.target.style.display = 'none';
  moreEvents.style.display = 'block';
});