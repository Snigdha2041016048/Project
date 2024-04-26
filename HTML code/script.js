// Fetch product data from the provided API
fetch('https://cdn.shopify.com/s/files/1/0564/36 85/0790/files/singleProduct.json')
  .then(response => response.json())
  .then(data => {
    // Populate product details
    document.getElementById('main-image').src = data.image;
    document.getElementById('product-vendor').textContent = data.vendor;
    document.getElementById('product-title').textContent = data.title;
    document.getElementById('actual-price').textContent = `$${data.price}`;
    document.getElementById('compare-price').textContent = `Compare at $${data.compareAtPrice}`;

    // Calculate percentage off
    const actualPrice = parseFloat(data.price.replace('$', ''));
    const comparePrice = parseFloat(data.compareAtPrice.replace('$', ''));
    const percentageOff = Math.round(((comparePrice - actualPrice) / comparePrice) * 100);
    document.getElementById('percentage-off').textContent = `(${percentageOff}% off)`;

    // Populate description
    document.getElementById('description').textContent = data.description;

    // Populate color variants
    const colorSelect = document.getElementById('color-select');
    data.colors.forEach(color => {
      const option = document.createElement('option');
      option.text = color;
      colorSelect.add(option);
    });

    // Populate size variants
    const sizeSelect = document.getElementById('size-select');
    data.sizes.forEach(size => {
      const option = document.createElement('option');
      option.text = size;
      sizeSelect.add(option);
    });

    // Populate thumbnails
    const thumbnailsContainer = document.querySelector('.thumbnails');
    data.thumbnails.forEach(thumbnail => {
      const img = document.createElement('img');
      img.src = thumbnail;
      img.alt = 'Thumbnail';
      img.addEventListener('click', () => {
        document.getElementById('main-image').src = thumbnail;
      });
      thumbnailsContainer.appendChild(img);
    });

    // Add to cart functionality
    const addToCartBtn = document.getElementById('add-to-cart');
    addToCartBtn.addEventListener('click', () => {
      const selectedColor = colorSelect.value;
      const selectedSize = sizeSelect.value;
      const quantity = document.getElementById('quantity-select').value;
      const message = `Added ${quantity} ${selectedColor} ${selectedSize} ${data.title} to cart!`;
      document.getElementById('add-to-cart-message').textContent = message;
      document.getElementById('add-to-cart-message').style.display = 'block';
    });
  })
  .catch(error => console.error('Error fetching product data:', error));
