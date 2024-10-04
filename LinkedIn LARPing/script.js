function smoothScroll(target) {
    const element = document.getElementById(target);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  }

document.getElementById("arrow-down").addEventListener("click", function(){
    smoothScroll("mini-container");
    smoothScroll("info-cont");
});
  