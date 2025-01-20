// COPIADO PORTAPAPELES

function copiarAlPortapapeles() {
  const input = document.getElementById('aliasInput');
  navigator.clipboard
    .writeText(input.value) // Copia al portapapeles
    .then(() => {
      alert('¡Alias/CVU copiado al portapapeles!');
    })
    .catch((err) => {
      console.error('Error al copiar:', err);
      alert('Hubo un problema al copiar el texto.');
    });
}

// NOTIFICACION COPIADO EN PORTAPAPELES

function copiarAlPortapapeles() {
  const input = document.getElementById('aliasInput');
  navigator.clipboard
    .writeText(input.value)
    .then(() => {
      mostrarNotificacion();
    })
    .catch((err) => {
      console.error('Error al copiar:', err);
    });
}

function mostrarNotificacion() {
  const notification = document.getElementById('notification');
  notification.classList.remove('hidden'); // Muestra la notificación
  setTimeout(() => {
    notification.classList.add('hidden'); // Oculta la notificación después de 3 segundos
  }, 3000);
}

// menu superior
document.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const mainMenu = document.getElementById('mainMenu');
  const menuLogo = document.getElementById('menuLogo');

  if (scrollPosition > 100) {
    // Reducir tamaño del logo al mostrar el nav
    mainMenu.classList.remove('-translate-y-full');
    menuLogo.classList.remove('text-3xl');
    menuLogo.classList.add('text-xl');
  } else {
    // Restaurar tamaño del logo al ocultar el nav
    mainMenu.classList.add('-translate-y-full');
    menuLogo.classList.remove('text-xl');
    menuLogo.classList.add('text-3xl');
  }
});

// Script para mostrar/ocultar el menú desplegable
// Script para mostrar/ocultar el menú desplegable
const btnMore = document.getElementById('btn-more');
const moreMenu = document.getElementById('more-menu');

// Variable para el temporizador
let closeMenuTimeout;

btnMore.addEventListener('click', () => {
  // Cancela cualquier temporizador previo
  clearTimeout(closeMenuTimeout);

  if (moreMenu.classList.contains('hidden')) {
    moreMenu.classList.remove('hidden');
    setTimeout(() => {
      moreMenu.classList.remove('opacity-0', 'translate-y-4');
      moreMenu.classList.add('opacity-100', 'translate-y-0');
    }, 10); // Tiempo mínimo para permitir que la transición ocurra
  } else {
    closeMenu();
  }
});

// Cerrar el menú
function closeMenu() {
  moreMenu.classList.remove('opacity-100', 'translate-y-0');
  moreMenu.classList.add('opacity-0', 'translate-y-4');
  setTimeout(() => {
    moreMenu.classList.add('hidden');
  }, 300); // Duración de la animación
}

// Cerrar el menú si se hace clic fuera de él
document.addEventListener('click', (event) => {
  if (!btnMore.contains(event.target) && !moreMenu.contains(event.target)) {
    closeMenu();
  }
});

// Detectar selección en las opciones del menú
moreMenu.addEventListener('click', (event) => {
  // Solo actúa si el clic fue en un elemento del menú (no en el contenedor)
  if (event.target && event.target.tagName === 'A') {
    // Inicia el temporizador para cerrar el menú después de 2 segundos
    closeMenuTimeout = setTimeout(closeMenu, 500);
  }
});

// ----------

// Selected iconos menu inferior
document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      // Elimina la selección de todos los elementos
      navItems.forEach((el) => {
        el.classList.remove('selected');
        el.style.setProperty('--selected-src', ''); // Limpia el fondo
      });

      // Selecciona el ítem actual y establece su SVG de fondo
      item.classList.add('selected');
      const selectedSrc = item.dataset.selectedSrc;
      if (selectedSrc) {
        item.style.setProperty('--selected-src', `url(${selectedSrc})`);
      }
    });
  });
});

// DETECTA EL DIV SELECCIONADO

document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = ['#portada', '#sec2', '#sec3', '#sec4'];

  // Función para deseleccionar todos los <a>
  const deselectAll = () => {
    navItems.forEach((el) => {
      el.classList.remove('selected');
      el.style.setProperty('--selected-src', '');
    });
  };

  // Función para seleccionar el <a> correspondiente
  const selectNavItem = (id) => {
    deselectAll();
    const navItem = [...navItems].find(
      (item) => item.getAttribute('href') === `#${id}`
    );
    if (navItem) {
      navItem.classList.add('selected');
      const selectedSrc = navItem.dataset.selectedSrc;
      if (selectedSrc) {
        navItem.style.setProperty('--selected-src', `url(${selectedSrc})`);
      }
    }
  };

  // Intersection Observer para detectar secciones visibles
  const observerOptions = {
    root: null, // Observa dentro del viewport
    threshold: 0.6, // 60% de la sección debe estar visible
  };

  let activeSection = null; // Almacena la sección actualmente visible

  const observer = new IntersectionObserver((entries) => {
    let anySectionVisible = false;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        anySectionVisible = true;
        const id = entry.target.getAttribute('id');
        activeSection = id; // Actualiza la sección activa
        selectNavItem(id);
      }
    });

    // Si ninguna sección está visible, deseleccionar todo
    if (!anySectionVisible) {
      activeSection = null;
      deselectAll();
    }
  }, observerOptions);

  // Observa cada sección
  sections.forEach((selector) => {
    const section = document.querySelector(selector);
    if (section) {
      observer.observe(section);
    }
  });

  // Permite seleccionar manualmente al hacer clic
  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      deselectAll();
      const selectedSrc = item.dataset.selectedSrc;
      if (selectedSrc) {
        item.classList.add('selected');
        item.style.setProperty('--selected-src', `url(${selectedSrc})`);
      }
    });
  });
});

// Función para abrir el modal--------------------------------------
let currentImageIndex = 0;
let images = [];

// Función para abrir el modal
function openModal(imageElement) {
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');

  // Obtener todas las imágenes con la clase 'modal-image'
  images = Array.from(document.querySelectorAll('.modal-image')).map(
    (img) => img.src
  );

  // Establecer el índice de la imagen actual
  currentImageIndex = images.indexOf(imageElement.src);

  // Establecer la imagen inicial en el modal
  modalImage.src = images[currentImageIndex];

  // Mostrar el modal
  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.add('show'), 10);

  // Deshabilitar el scroll del fondo
  document.body.classList.add('overflow-hidden');

  // Disparar evento 'show' para activar el teclado
  modal.dispatchEvent(new Event('show'));
}

// Función para cerrar el modal
function closeModal() {
  const modal = document.getElementById('imageModal');

  // Ocultar el modal
  modal.classList.remove('show');
  modal.classList.add('hidden');

  // Habilitar el scroll del fondo
  document.body.classList.remove('overflow-hidden');

  // Disparar evento 'hide' para desactivar el teclado
  modal.dispatchEvent(new Event('hide'));
}

// Función para mostrar la imagen anterior
function prevImage() {
  if (images.length === 0) return;

  // Mover al índice anterior
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  document.getElementById('modalImage').src = images[currentImageIndex];
}

// Función para mostrar la imagen siguiente
function nextImage() {
  if (images.length === 0) return;

  // Mover al siguiente índice
  currentImageIndex = (currentImageIndex + 1) % images.length;
  document.getElementById('modalImage').src = images[currentImageIndex];
}

// Función para manejar las teclas
function handleKeyPress(event) {
  switch (event.key) {
    case 'Escape': // Cerrar modal con Esc
      closeModal();
      break;
    case 'ArrowLeft': // Imagen anterior con flecha izquierda
      prevImage();
      break;
    case 'ArrowRight': // Imagen siguiente con flecha derecha
      nextImage();
      break;
    default:
      break;
  }
}

// Agregar evento al abrir el modal
document.getElementById('imageModal').addEventListener('show', () => {
  document.addEventListener('keydown', handleKeyPress);
});

// Remover evento al cerrar el modal
document.getElementById('imageModal').addEventListener('hide', () => {
  document.removeEventListener('keydown', handleKeyPress);
});

// --------------------------------------

//button ver mas

document.getElementById('showMoreBtn').addEventListener('click', function () {
  // Encuentra el próximo contenido oculto
  const hiddenContent = document.querySelector('#sec6 [data-content].hidden');

  if (hiddenContent) {
    // Muestra el contenido
    hiddenContent.classList.remove('hidden');
    setTimeout(() => {
      hiddenContent.classList.remove('opacity-0', 'transform', 'scale-95');
    }, 50);

    console.log('Contenido mostrado:', hiddenContent);
  }

  // Verifica cuántos elementos ocultos quedan
  const remainingHidden = document.querySelectorAll(
    '#sec6 [data-content].hidden'
  );

  console.log('Elementos ocultos restantes:', remainingHidden.length);

  // Si no quedan elementos ocultos, oculta el botón
  if (remainingHidden.length === 0) {
    this.classList.add('hidden'); // Oculta el botón
    console.log('Botón ocultado');
  }
});

// Animacion CHEVRON SCROLL

// function scrollAndAnimate(event, sectionId) {
//   event.preventDefault();
//   const targetElement = document.getElementById(sectionId);
//   targetElement.scrollIntoView({
//     behavior: 'smooth',
//     block: 'start',
//   });
// }

// chevron pulse

function scrollAndAnimate(event, sectionId) {
  event.preventDefault();
  const targetElement = document.getElementById(sectionId);

  // Agregar animación o retraso para asegurarse que la animación sea visible
  targetElement.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });

  // Desactivar la animación para la siguiente vez si es necesario
  setTimeout(() => {
    // Aquí podrías agregar lógica adicional si es necesario
  }, 500);
}

// animacion card ubicacion

document.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('cardUbicacion'); // El card que queremos animar
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          target.classList.add('show');
        } else {
          target.classList.remove('show');
        }
      });
    },
    { threshold: 0.5 } // El 50% del elemento debe ser visible para activarse
  );

  // Observa la sección que contiene el div
  const sec3 = document.getElementById('sec3');
  observer.observe(sec3);
});

// LUPA MOVIL

document.addEventListener('DOMContentLoaded', () => {
  // Selecciona contenedores con las imágenes a observar
  const images = document.querySelectorAll('.row-span-3'); // Ajusta el selector según tu HTML

  const options = {
    root: null, // Usa el viewport completo
    threshold: 0.5, // Activar cuando el 50% del elemento esté visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const lupa = entry.target.querySelector("img[alt='lupa']");
      if (entry.isIntersecting) {
        // Si está en foco, mostrar la lupa
        lupa.classList.add('img-visible');
      } else {
        // Si no está en foco, ocultar la lupa
        lupa.classList.remove('img-visible');
      }
    });
  }, options);

  // Observar cada contenedor
  images.forEach((image) => observer.observe(image));
});

// animacion encabezado

// Seleccionamos el encabezado y el div con id 'sec6'
const header = document.getElementById('header');
const sec6 = document.getElementById('sec6');

// Función para detectar el scroll y agregar la clase 'visible' al div 'sec6' cuando entra en el viewport
function checkScroll() {
  const rect = sec6.getBoundingClientRect();
  if (rect.top <= window.innerHeight && rect.bottom >= 0) {
    sec6.classList.add('visible');
  } else {
    sec6.classList.remove('visible');
  }
}

// Detectamos el evento de scroll
window.addEventListener('scroll', checkScroll);

// Llamamos a la función de inmediato por si el usuario ya ha hecho scroll
checkScroll();

// ANIMACION <P>

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  },
  { threshold: 0.5 } // Activa cuando el 50% del elemento está visible
);

const heading = document.querySelector('#animatedHeading');
observer.observe(heading);

// probandin scroll sec

function scrollAndAnimate(event, sectionId) {
  event.preventDefault();

  const targetElement = document.getElementById(sectionId);
  if (!targetElement) return;

  const startPosition = window.pageYOffset;
  const targetPosition =
    targetElement.getBoundingClientRect().top + startPosition;
  const duration = 1200; // Duración en milisegundos (ajústalo a tu preferencia)
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;

    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1); // Limitar el progreso a 1
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startPosition + (targetPosition - startPosition) * ease);

    if (elapsedTime < duration) {
      requestAnimationFrame(animation);
    } else {
      // Opcional: Agregar un efecto visual al llegar a la sección
      targetElement.classList.add('highlight');
      setTimeout(() => {
        targetElement.classList.remove('highlight');
      }, 1000); // Duración del efecto de resaltado
    }
  }

  // Función de easing para un desplazamiento suave
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  requestAnimationFrame(animation);
}

// Agregar manejadores de eventos a los enlaces
document.querySelectorAll('.scroll-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    const sectionId = link.getAttribute('data-section');
    scrollAndAnimate(event, sectionId);
  });
});
