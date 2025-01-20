// document.addEventListener('DOMContentLoaded', () => {
//   const heartButtons = document.querySelectorAll('.heartButton');

//   heartButtons.forEach((heartButton) => {
//     const lottieContainer = heartButton.nextElementSibling; // Asumiendo que lottieHeartContainer es el siguiente hermano

//     if (lottieContainer) {
//       const heartAnimation = lottie.loadAnimation({
//         container: lottieContainer,
//         renderer: 'svg',
//         loop: false,
//         autoplay: false,
//         path: 'assets/animations/heart.json',
//       });

//       heartButton.addEventListener('click', () => {
//         const isLiked =
//           heartButton.getAttribute('src') === heartButton.dataset.liked;

//         if (isLiked) {
//           // Cambiar a "unliked" sin animación
//           heartButton.setAttribute('src', heartButton.dataset.unliked);
//           lottieContainer.classList.add('hidden');
//         } else {
//           // Cambiar a "liked" y mostrar la animación
//           heartButton.setAttribute('src', heartButton.dataset.liked);

//           // Mostrar y reproducir la animación
//           lottieContainer.classList.remove('hidden');
//           heartAnimation.goToAndStop(0, true);
//           heartAnimation.play();

//           // Ocultar la animación después de completar
//           heartAnimation.addEventListener('complete', () => {
//             lottieContainer.classList.add('hidden');
//           });
//         }
//       });
//     } else {
//       console.error('No se encontró el contenedor Lottie para este botón.');
//     }
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  const heartButtons = document.querySelectorAll('.heartButton');
  const likeCounterElement = document.getElementById('likeCounter'); // Contenedor del contador
  const likeIcon = document.getElementById('likeIcon'); // Ícono del corazón
  const likeIndicator = document.getElementById('likeIndicator'); // Contenedor del indicador
  let likeCount = 0; // Contador inicial

  // Función para comprobar si el contenedor #sec6 está visible en la pantalla
  function checkVisibility() {
    const sec6 = document.getElementById('sec6');
    const rect = sec6.getBoundingClientRect();
    const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;

    if (isVisible) {
      likeIndicator.classList.remove('opacity-0'); // Hacerlo visible
      likeIndicator.classList.add('opacity-100'); // Aparece completamente
    } else {
      likeIndicator.classList.remove('opacity-100'); // Ocultar
      likeIndicator.classList.add('opacity-0'); // Totalmente oculto
    }
  }

  // Llamar a la función checkVisibility en el evento de scroll
  window.addEventListener('scroll', checkVisibility);
  checkVisibility(); // Llamada inicial en caso de que ya esté en la vista

  heartButtons.forEach((heartButton) => {
    const lottieContainer = heartButton.nextElementSibling;

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
          heartButton.setAttribute('src', heartButton.dataset.unliked);
          lottieContainer.classList.add('hidden');
          likeCount--; // Decrementar contador
        } else {
          heartButton.setAttribute('src', heartButton.dataset.liked);
          lottieContainer.classList.remove('hidden');
          heartAnimation.goToAndStop(0, true);
          heartAnimation.play();
          likeCount++; // Incrementar contador
          heartAnimation.addEventListener('complete', () => {
            lottieContainer.classList.add('hidden');
          });
        }

        // Actualizar el contador
        likeCounterElement.textContent = likeCount;

        // Agregar animación al ícono
        likeIcon.classList.add('scale-125'); // Agrandar ícono
        setTimeout(() => {
          likeIcon.classList.remove('scale-125'); // Volver al tamaño original
        }, 300); // Duración de la animación (300ms)

        console.log('Total likes:', likeCount);
      });
    } else {
      console.error('No se encontró el contenedor Lottie para este botón.');
    }
  });
});

// // Seleccionamos el elemento del contador
// const counterElement = document.getElementById('counter');

// // Variable para llevar el conteo
// let counter = 0;

// // Función para incrementar el contador
// function incrementCounter() {
//   counter++;
//   counterElement.textContent = counter; // Actualiza el contenido del div
// }

// // Incrementar cada 1 segundo como ejemplo
// setInterval(incrementCounter, 1000);
