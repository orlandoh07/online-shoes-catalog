(function () {
  const query = new URLSearchParams(window.location.search);
  const productId = query.get('product');
  const product = window.SNKRS_PRODUCTS && window.SNKRS_PRODUCTS.find((item) => item.id === productId);

  const titleElement = document.getElementById('detail-title');
  const imageElement = document.getElementById('detail-image');
  const priceElement = document.getElementById('detail-price');
  const whatsappLink = document.getElementById('whatsapp-link');
  const sizeSelect = document.getElementById('size');
  const errorMessage = document.getElementById('detail-error');

  function updateWhatsappLink() {
    if (!product || !whatsappLink || !sizeSelect) return;
    const talla = sizeSelect.value;
    const message = `Hola, quiero consultar disponibilidad del ${product.title}, en talla ${talla}`;
    const encodedMessage = encodeURIComponent(message);
    whatsappLink.href = `https://wa.me/584121564976?text=${encodedMessage}`;
  }

  function showError() {
    if (errorMessage) {
      errorMessage.style.display = 'block';
      errorMessage.textContent = 'Producto no encontrado. Regresa al catálogo para ver todos los modelos.';
    }
    if (titleElement) {
      titleElement.textContent = 'Producto no encontrado';
    }
    if (imageElement) {
      imageElement.src = '';
      imageElement.alt = 'Producto no encontrado';
    }
    if (priceElement) {
      priceElement.textContent = '';
    }
    if (whatsappLink) {
      whatsappLink.style.display = 'none';
    }
  }

  if (!product) {
    showError();
    return;
  }

  if (titleElement) {
    titleElement.textContent = product.title;
  }
  if (imageElement) {
    imageElement.src = product.image;
    imageElement.alt = product.alt;
  }
  if (priceElement) {
    priceElement.textContent = `$${product.price}`;
  }
  if (sizeSelect) {
    sizeSelect.addEventListener('change', updateWhatsappLink);
  }

  updateWhatsappLink();
})();
