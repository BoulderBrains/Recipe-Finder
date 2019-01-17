DROP DATABASE IF EXISTS users_db; 

-- Create the database 
CREATE DATABASE users_db;
USE users_db;

-- Create the table 
CREATE TABLE users (
id INT NOT NULL AUTO_INCREMENT,
username VARCHAR(255) NOT NULL,
passW VARCHAR(255) NOT NULL, 
PRIMARY KEY (id)
);

INSERT INTO users (username, passW) VALUES ("ABC", "123");