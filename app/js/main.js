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
  function test(data) {
    data.forEach(element => {
      $(".container").after("<p>" + element + "</p>");
    });
  }

  function categories(data) {
    data.forEach(item => {
      const markup = `
            <a class="dropdown-item" href="/category.html?category=${item.department_name}">${item.department_name}</a>
            `;
      $("#cats").append(markup);

      const card_markup = `
            <div class="card col-md-3 m-1 p-0 text-center">
                <img class="card-img-top" src="https://images.pexels.com/photos/246327/pexels-photo-246327.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Card image cap">
                <div class="card-body">
  
                    <h5 class="card-title">${item.department_name}</h5>
                    <a href="/category.html?category=${item.department_name}" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
            `;
      $("#cat-cards").append(card_markup);
    });
  }

  return {
    test: test,
    categories: categories
  };
})(jQuery);

const mainCTRL = (function(dataCTRL, uiCTRL) {
  dataCTRL.getCats().then(data => {
    data = JSON.parse(data);
    console.log(data);
    uiCTRL.categories(data);
  });

  // dataCTRL.initialData().then(data => {
  //     data = JSON.parse(data);
  //     console.log(data);
  //     uiCTRL.test(data);
  // });
})(dataCTRL, uiCTRL);
