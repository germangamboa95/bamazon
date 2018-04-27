CREATE DATABASE bamazon; 

USE bamazon; 

CREATE TABLE products (
    item_id INT(20) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) DEFAULT "unlisted",
    price FLOAT NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 1,
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
FROM products
VALUES 
    ('Cookie Box', 'Food', 5.10, 2 ),
    ('Marshmellow Box', 'Food', .99, 5 ),
    ('Cereal Box', 'Food', 9.99, 20 ),
    ('Titanic Movie', 'Technology', 5.10, 2 ),
    ('Xbox', 'Technology', 235.99, 13 ),
    ('PS4', 'Technology', 350.56, 30 ),
    ('T-shirt', 'Clothes', 5.10, 2 ); 

