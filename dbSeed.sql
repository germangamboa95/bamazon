CREATE DATABASE bamazon; 

USE bamazon; 

CREATE TABLE products (
    item_id INT(20) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) DEFAULT "unlisted",
    price DECIMAL NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 1,
    product_description VARCHAR(255), 
    product_img_url VARCHAR(255)
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_description, product_img_url)
FROM products
VALUES 
    ('Cookie Box', 'Food', 5.10, 2, 'A yummy box of cookies','https://images.pexels.com/photos/890577/pexels-photo-890577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' ),
    ('Marshmellow Box', 'Food', 0.99, 5, 'Only the most fluffy!', 'https://images.pexels.com/photos/325526/pexels-photo-325526.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350' ),
    ('Cereal Box', 'Food', 9.99, 20, 'A yummy box of cereal', 'https://images.pexels.com/photos/216951/pexels-photo-216951.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' ),
    ('Titanic Movie', 'Technology', 5.10, 2,'The most romantic movie ever!', 'https://images.pexels.com/photos/173910/pexels-photo-173910.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' ),
    ('Xbox', 'Technology', 235.99, 13, 'Only the best console ever!', 'https://images.pexels.com/photos/415008/pexels-photo-415008.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' ),
    ('PS4', 'Technology', 350.56, 30, 'The second best console.', 'https://images.pexels.com/photos/18174/reflection-pad-gaming-gamepad.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' ),
    ('T-shirt', 'Clothes', 5.10, 2, 'A T-shirt (or t shirt, or tee) is a style of unisex fabric shirt named after the T shape of its body and sleeves. It normally has short sleeves and a round neckline, known as a crew neck, which lacks a collar.','https://images.pexels.com/photos/3476/italian-italy-t-shirts.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' ); 

