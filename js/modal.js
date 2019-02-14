function openModal() {
    document.getElementById('myModal').style.display = "block";
  }
  
  function closeModal() {
    document.getElementById('myModal').style.display = "none";
  }
  function openAngelModal() {
    document.getElementById('myAngelModal').style.display = "block";
  }
  
  function closeAngelModal() {
    document.getElementById('myAngelModal').style.display = "none";
  }
  var angelSlideIndex = 1;
  showAngelSlides(angelSlideIndex);
  
  function plusAngelSlides(n) {
    showAngelSlides(angelSlideIndex += n);
  }
  
  function currentAngelSlide(n) {
    showAngelSlides(angelSlideIndex = n);
  }

  var slideIndex = 1;
  showSlides(slideIndex);
  
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  
  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    captionText.innerHTML = dots[slideIndex-1].alt;
  }
  function showAngelSlides(n) {
    var i;
    var slides = document.getElementsByClassName("myAngelSlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > slides.length) {angelSlideIndex = 1}
    if (n < 1) {angelSlideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[angelSlideIndex-1].style.display = "block";
    dots[angelSlideIndex-1].className += " active";
    captionText.innerHTML = dots[angelSlideIndex-1].alt;
  }