(() => {
 const lazyload = () => {
  // Test if image is in the viewport
  const isImageInViewport = (img) => {
   const rect = img.getBoundingClientRect();

   return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
   );
  }

  // Create custom fading effect for showing images
  const fadeInCustom = (element) => {
   let elementOpacity = 0.1;// initial opacity

   element.style.display = 'block';

   const timer = setInterval(() => {
    if (elementOpacity >= 1){
     clearInterval(timer);
    }

    element.style.opacity = elementOpacity;

    element.style.filter = 'alpha(opacity=' + elementOpacity * 100 + ")";

    elementOpacity += elementOpacity * 0.1;
   }, 15);
  };

  // lazyload function
  const lazyloadLoader = () => {
   const lazyImagesList = document.querySelectorAll('img[data-src]');

   lazyImagesList.forEach((image) => {
    if (isImageInViewport(image)) {
     if (image.getAttribute('data-src') !== null) {
      image.setAttribute('src', image.getAttribute('data-src'));

      image.removeAttribute('data-src');
     }

     if (image.getAttribute('data-srcset') !== null) {
      image.setAttribute('srcset', image.getAttribute('data-srcset'));

      image.removeAttribute('data-srcset');
     }

     image.setAttribute('data-loaded', true);

     fadeInCustom(image);
    }
   });

   // Remove event listeners if all images are loaded
   if (document.querySelectorAll('img[data-src]').length === 0 && document.querySelectorAll('img[data-srcset]')) {
    window.removeEventListener('DOMContentLoaded', lazyload);

    window.removeEventListener('load', lazyloadLoader);

    window.removeEventListener('resize', lazyloadLoader);

    window.removeEventListener('scroll', lazyloadLoader);
   }
  };

  // Add event listeners to images
  window.addEventListener('DOMContentLoaded', lazyloadLoader);

  window.addEventListener('load', lazyloadLoader);

  window.addEventListener('resize', lazyloadLoader);

  window.addEventListener('scroll', lazyloadLoader);
 }

 // Test if JavaScript is available and allowed
 if (document.querySelector('.no-js') !== null) {
  document.querySelector('.no-js').classList.remove('no-js');
 }

 // Initiate lazyload plugin
 return lazyload();
})();
