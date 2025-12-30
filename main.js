// Número de WhatsApp (solo dígitos, sin +, espacios ni guiones)
const WHATSAPP_NUMBER = "573015174786"; // <-- cámbialo por el tuyo

// Obtener botón
const floatingWhatsApp = document.getElementById("floatingWhatsApp");

// --- Floating WhatsApp button ---
if (floatingWhatsApp) {
  floatingWhatsApp.addEventListener("click", () => {
    const message = "Hola, me gustaría obtener más información sobre sus auditorías y servicios de SST.";
    openWhatsAppChat(message);
  });
}

// --- Helper Functions ---
function openWhatsAppChat(message) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");
}

// Selecciona todas las letras
    const letras = document.querySelectorAll('.letra');

    // Función para animar el texto
    function animarTexto() {
        letras.forEach((letra, index) => {
            // Aplica la animación con un retraso basado en el índice
            setTimeout(() => {
                // Sube la letra
                letra.style.transform = 'translateY(-15px)';

                // Después de un breve retraso, bájala
                setTimeout(() => {
                    letra.style.transform = 'translateY(0)';
                }, 200); // Duración de la subida
            }, index * 100); // Retraso entre cada letra
        });
    }

    // Llama a la función de animación cada 3 segundos
    setInterval(animarTexto, 3000);

  //document.getElementById("menuToggle").addEventListener("click", () => {
  document.querySelector(".nav-menu").classList.toggle("show");
//});