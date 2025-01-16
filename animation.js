document.addEventListener('DOMContentLoaded', () => {
  const heartButtons = document.querySelectorAll('.heartButton');

  heartButtons.forEach((heartButton) => {
    const lottieContainer = heartButton.nextElementSibling; // Asumiendo que lottieHeartContainer es el siguiente hermano

    if (lottieContainer) {
      const heartAnimation = lottie.loadAnimation({
        container: lottieContainer,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'assets/animations/heart.json',
      });

      heartButton.addEventListener('click', () => {
        const isLiked =
          heartButton.getAttribute('src') === heartButton.dataset.liked;

        if (isLiked) {
          // Cambiar a "unliked" sin animación
          heartButton.setAttribute('src', heartButton.dataset.unliked);
          lottieContainer.classList.add('hidden');
        } else {
          // Cambiar a "liked" y mostrar la animación
          heartButton.setAttribute('src', heartButton.dataset.liked);

          // Mostrar y reproducir la animación
          lottieContainer.classList.remove('hidden');
          heartAnimation.goToAndStop(0, true);
          heartAnimation.play();

          // Ocultar la animación después de completar
          heartAnimation.addEventListener('complete', () => {
            lottieContainer.classList.add('hidden');
          });
        }
      });
    } else {
      console.error('No se encontró el contenedor Lottie para este botón.');
    }
  });
});
