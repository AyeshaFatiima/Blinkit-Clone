function createProductSection(sectionData, sectionKey) {
  const section = document.createElement('section');
  section.className = 'productSection';
  section.id = sectionKey;
  // Product Container 
  section.innerHTML = `
    <div class="headingRow">
      <h2>${sectionData.title}</h2>
      <a href="${sectionData.link}">See all</a>
    </div>
    <div class="productRowWrapper">
      <a href="#" class="control_prev"><i class="fa-solid fa-angle-left"></i></a>
      <a href="#" class="control_next"><i class="fa-solid fa-angle-right"></i></a>
      <div class="productRow"></div>
    </div>
  `;
  
  return section;
}
// Products
function createProductCard(product) {
  return `
    <div class="productItems" data-product-id="${product.id}">
      <div class="productImg">
        <img width="70%" src="${product.image}" class="product-image" alt="${product.name}">
        <p>
          <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/assets/eta-icons/15-mins.png" width="15">
          ${product.deliveryTime}
        </p>
      </div>
      <div class="productContent">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-size">${product.size}</p>
        <div class="btn-price-outer">
          <b class="product-price">₹${product.price}</b>
          <button class="btn-add-cart" onclick="addToCartFromProduct(this)">Add</button>
        </div>
      </div>
    </div>
  `;
}

function displayProducts() {
  const container = document.getElementById('productsContainer') || document.querySelector('main');
   
  Object.keys(productsData).forEach(sectionKey => {
    const sectionData = productsData[sectionKey];
    
    
    const section = createProductSection(sectionData, sectionKey);
    const productRow = section.querySelector('.productRow');
    
    
    sectionData.products.forEach(product => {
      productRow.innerHTML += createProductCard(product);
    });
    

    container.appendChild(section);
  });
  
  
 prevNext();
}

function prevNext() {
  document.querySelectorAll(".productSection").forEach((section) => {
    document.querySelectorAll(".productSection").forEach((section) => {
  const prevBtn = section.querySelector(".control_prev");
  const nextBtn = section.querySelector(".control_next");
  const productRow = section.querySelector(".productRow");

  nextBtn.addEventListener("click", function (e) {
    e.preventDefault();
    productRow.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  });

  prevBtn.addEventListener("click", function (e) {
    e.preventDefault();
    productRow.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  });
}); 
  })
}


document.addEventListener('DOMContentLoaded', function() {
  displayProducts();
});