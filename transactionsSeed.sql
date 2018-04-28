
USE bamazon; 

CREATE TABLE transactions (
    transaction_id INT(20) NOT NULL AUTO_INCREMENT,
    transaction_time TIMESTAMP,
    buyer_name VARCHAR(50) NOT NULL,
    item_id INT(20)
    PRIMARY KEY (item_id),
    FOREIGN KEY (item_id) REFERENCES products(item_id)
);

INSERT INTO transactions (transaction_time, buyer_name, item_id)
VALUES 
    (TIMESTAMP, 'Paco Smith', 5)