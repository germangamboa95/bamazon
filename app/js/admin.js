const dataCTRL = (function() {
    const initialData = () => {
      return new Promise((resolve, reject) => {
        return fetch("/manager/inventory")
          .then(res => res.json())
          .then(data => resolve(data));
      });
    };
  


      
      


    return {
      initialData: initialData,

    };
  })();
  
  const uiCTRL = (function($) {
    const inventoryTable = (data) => { 
        $('#current-stock').append('<div class= "card card-body"></div>');
        $('#current-stock .card-body').append('<h2 class ="text-center">Orders</h2');
        $('#current-stock .card-body').append('<table class= "table current-stock"></table>'); 
        $('.current-stock').append(`
        <thead>
        <tr>
          <th scope="col">Item ID</th>
          <th scope="col">Product</th>
          <th scope="col">Stock</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
        `);
        $('.current-stock').append('<tbody class="current-stock-tbody"></tbody>');

        data.forEach(element => {
            const markup = 
            `  
            <tr>
            <th scope="row">${element.item_id}</th>
            <td>${element.product_name}</td>
            <td>${element.stock_quantity}</td>
            <td>${element.price}</td>
          </tr>
            

            `;
            $('.current-stock-tbody').append(markup);
        });
    }

    const inventoryTableLow = (data) => { 
        $('#current-stock-low').append('<div class= "card card-body"></div>');
        $('#current-stock-low .card-body').append('<h2 class ="text-center">Stock Less Than 5</h2');
        $('#current-stock-low .card-body').append('<table class= "table current-stock-low"></table>'); 
        $('.current-stock-low').append(`
        <thead>
        <tr>
          <th scope="col">Item ID</th>
          <th scope="col">Product</th>
          <th scope="col">Stock</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
        `);
        $('.current-stock-low').append('<tbody class="current-stock-low-tbody"></tbody>');

        data.forEach(element => {
            if(element.stock_quantity < 5) {
                const markup = 
                `  
                <tr>
                <th scope="row">${element.item_id}</th>
                <td>${element.product_name}</td>
                <td>${element.stock_quantity}</td>
                <td>${element.price}</td>
              </tr>
                `;
                $('.current-stock-low-tbody').append(markup);
                
            }

        });
    }

    const addNew = ()=> {
        $('#current-add-new').hide();
    }


  
    return {
        inventoryTable: inventoryTable,
        inventoryTableLow: inventoryTableLow
    };
  })(jQuery);
  
  const mainCTRL = (function(dataCTRL, uiCTRL) {
    dataCTRL.initialData().then(data => {
      data = JSON.parse(data);
      console.log(data);
      uiCTRL.inventoryTable(data);
      uiCTRL.inventoryTableLow(data);
    });
    
    $('#add-product').on('click', (e) => {
        e.preventDefault();
        const item = {}; 
        item.name = $('#product-name').val(); 
        $('#product-name').val(''); 
        item.stock = $('#product-init').val();
        $('#product-init').val('');
        item.department = $('#product-department').val();
        $('#product-department').val('');
        item.price =  $('#product-price').val();
        $('#product-price').val('');
        item.url = $('#product-img').val();
        $('#product-img').val('')

        console.log(item);
    })
 

 
    
  })(dataCTRL, uiCTRL);
  