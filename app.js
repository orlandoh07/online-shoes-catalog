(function () {
  const pageContent = document.querySelector('.page-content');
  const productsGrid = document.getElementById('products-grid');
  const modalOverlay = document.getElementById('product-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalImage = document.getElementById('modal-image');
  const modalPrice = document.getElementById('modal-price');
  const modalSize = document.getElementById('modal-size');
  const modalWhatsappLink = document.getElementById('modal-whatsapp-link');
  const modalError = document.getElementById('modal-error');
  const modalClose = document.getElementById('modal-close');
  let currentModalProduct = null;

  if (!productsGrid || !window.SNKRS_PRODUCTS || !modalOverlay) return;

  function updateModalWhatsapp(product) {
    if (!product || !modalWhatsappLink || !modalSize) return;

    const talla = modalSize.value;
    const message = `Hola, quiero consultar disponibilidad del ${product.title}, en talla ${talla}`;
    const encodedMessage = encodeURIComponent(message);
    modalWhatsappLink.href = `https://wa.me/?text=${encodedMessage}`;
  }

  function openModal(product) {
    if (!product) return;

    currentModalProduct = product;

    if (modalTitle) modalTitle.textContent = product.title;
    if (modalImage) {
      modalImage.src = product.image;
      modalImage.alt = product.alt;
    }
    if (modalPrice) modalPrice.textContent = `$${product.price}`;
    if (modalError) {
      modalError.style.display = 'none';
      modalError.textContent = '';
    }

    if (modalSize) {
      modalSize.value = '7 US';
    }

    updateModalWhatsapp(product);
    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (pageContent) pageContent.classList.add('dimmed');
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (pageContent) pageContent.classList.remove('dimmed');
  }

  function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product';
    if (product.id.includes('yeezy-foam-runner')) {
      card.classList.add('yeezy');
    }

    const imgContainer = document.createElement('div');
    imgContainer.className = 'img-container';

    const link = document.createElement('a');
    link.href = '#';
    link.addEventListener('click', (event) => {
      event.preventDefault();
      openModal(product);
    });

    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.alt;

    link.appendChild(image);
    imgContainer.appendChild(link);
    card.appendChild(imgContainer);

    const label = document.createElement('span');
    label.textContent = product.label;
    card.appendChild(label);

    return card;
  }

  window.SNKRS_PRODUCTS.forEach((product) => {
    productsGrid.appendChild(createProductCard(product));
  });

  if (modalSize) {
    modalSize.addEventListener('change', () => {
      updateModalWhatsapp(currentModalProduct);
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });
})();
