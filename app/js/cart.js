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

    const storeItemsToLocal = (item) => {

        if (localStorage.getItem('cart')) {
         let itemsArr = JSON.parse(localStorage.getItem('cart'));
          itemsArr.push(item); 
          localStorage.setItem('cart', JSON.stringify(itemsArr));
        } else {
          localStorage.setItem('cart', JSON.stringify([item]));
        }
      }
      
      const getItemsFromLocal = () => {
        if (localStorage.getItem('cart')) {
             return JSON.parse(localStorage.getItem('cart'));
           } else {
             return 0;
           }

      }

      const buyItem = item_id => { 
        return new Promise((resolve, reject) => {
            return fetch(`/client/purchase/${item_id}/-1`, {
                method: 'post'
            })
              .then(res => res.json())
              .then(data => resolve(data));
          });

      }

    return {
      initialData: initialData,
      getCats: getCats,
      storeItemsToLocal: storeItemsToLocal, 
      getItemsFromLocal: getItemsFromLocal,
      buyItem: buyItem

    };
  })();
  
  const uiCTRL = (function($) {
  
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

    const cartItems = (data, itemsInCart) => {
        itemsInCart.forEach((item, i) => {
            data.forEach(items =>{
                if(item == items.item_id){
                    const markup = 
                    `
                    <tr>
                    <th scope="row">${i + 1}</th>
                    <td>${items.product_name}</td>
                    <td>${items.product_description.substr(0,100)}</td>
                    <td>1</td>
                    <td>$${items.price}</td>
                    <td>$${items.price}</td>
                  </tr>
                    `;
                    $('#here').append(markup);
                }
            });
        });

    }
  
    return {
      categories: categories,
      cartItems: cartItems
    };
  })(jQuery);
  
  const mainCTRL = (function(dataCTRL, uiCTRL) {
    dataCTRL.getCats().then(data => {
      data = JSON.parse(data);
      console.log(data);
      uiCTRL.categories(data);
    });
    
  
    dataCTRL.initialData().then(data => {
        try {
            data = JSON.parse(data);
            console.log(data);
            uiCTRL.cartItems(data, dataCTRL.getItemsFromLocal());
            const total = getTotal(data, dataCTRL.getItemsFromLocal());
            $('.total-wrapper').prepend(`<h4>Total for Purchase: $${total}</h4>`);
        } catch (err) {
            $('.container').append('<h1 class="alert alert-warning text-center w-100">Your Cart is empty!</h1>');
            $('.table-responsive-xs').hide();
            $('.buy-it').hide();
        }

    });

    $('.buy-it').on('click', (e) => {
        e.preventDefault();
        const item = $(e.target);
        console.log(item)
        $(e.target).prop('disabled', true).attr('class',' btn btn-success').text('Items purchased!'); 
        dataCTRL.getItemsFromLocal().forEach(item => {
            dataCTRL.buyItem(item).then(res => console.log(res));
        });
        localStorage.clear();

    });




    function getTotal(data, itemsInCart) {
        let total = 0; 
        itemsInCart.forEach((item, i) => {
            data.forEach(items =>{
                if(item == items.item_id){
                    total += items.price;
                }
            });
        });

        return total; 
    }
  })(dataCTRL, uiCTRL);
  