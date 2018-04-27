const dataCTRL = (function() {
  const initialData = () => {
    return new Promise((resolve, reject) => {
      return fetch("/client/inventory")
        .then(res => res.json())
        .then(data => resolve(data));
    });
  };

  const getCats = () => {
    return new Promise((resolve, reject) => {
      return fetch("/client/inventory/categories")
        .then(res => res.json())
        .then(data => resolve(data));
    });
  };

  return {
    initialData: initialData,
    getCats: getCats
  };
})();

const uiCTRL = (function($) {
  function categories(data) {
    data.forEach(item => {
      const markup = `
              <a class="dropdown-item" href="/category.html?category=${
                item.department_name
              }">${item.department_name}</a>
              `;
      $("#cats").append(markup);
    });
  }
  function itemsForSale(data, cat) {
    data.forEach(item => {
      if (item.department_name == cat) {
        console.log(item);
        const markup = `
            <li class="list-group-item">
                <div class="row text-center">
                    <div class="img-wrapper col-md-4">
                        <img class="img-fluid" src="imgs/slideOne.svg" alt="">
                    </div>
                    <div class="col-md-6 desc-wrapper">
                        <h3>${item.product_name}</h3>
                        <p class="text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio similique eum animi ratione possimus, doloremque commodi dignissimos quis, aliquam nesciunt culpa impedit error vel temporibus.</p>
                    </div>
                    <div class="price-buy-wrapper col-md-2">
                        <h4>Price</h4>
                        <p>$${item.price}</p>
                        <button class="btn btn-outline-success">Add To Cart</button>
                    </div>   
                </div>
            </li>
            
            `;
            $('#here').append(markup);
      }
    });
  }

  return {
    categories: categories,
    itemsForSale: itemsForSale
  };
})(jQuery);

const mainCTRL = (function(dataCTRL, uiCTRL) {
  dataCTRL.getCats().then(data => {
    data = JSON.parse(data);
    console.log(data);
    uiCTRL.categories(data);
  });

  const url_string = window.location.href;
  const url = new URL(url_string);
  const currentCategory = url.searchParams.get("category");

  dataCTRL.initialData().then(data => {
    data = JSON.parse(data);
    console.log(data);
    uiCTRL.itemsForSale(data, currentCategory);
  });
})(dataCTRL, uiCTRL);
