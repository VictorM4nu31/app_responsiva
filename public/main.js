// Verificar soporte para Service Workers
if ('serviceWorker' in navigator) {
    console.log('Puedes usar el ServiceWorker del navegador.');

    navigator.serviceWorker.register('./sw.js')
        .then(res => console.log('ServiceWorker cargado correctamente', res))
        .catch(err => console.log('ServiceWorker no se ha podido cargar correctamente', err))
} else {
    console.log('No puedes usar los ServiceWorkers del navegador.');
}

// Scrollbar con jQuery
$(document).ready(function () {
    // Agregar scroll suavizado al hacer clic en los enlaces del menú
    $('#menu a').on('click', function (event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del enlace
        var target = $(this).attr('href'); // Obtener el destino del enlace
        $('html, body').animate({
            scrollTop: $(target).offset().top // Desplazarse suavemente al destino
        }, 800); // Duración de la animación en milisegundos
    });
});
