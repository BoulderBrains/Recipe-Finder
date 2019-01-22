DROP DATABASE IF EXISTS users_db; 

-- Create the database 
CREATE DATABASE users_db;
USE users_db;

-- Create the table 
CREATE TABLE users (
id INT NOT NULL AUTO_INCREMENT,
username VARCHAR(255) NOT NULL,
passW VARCHAR(255) NOT NULL,
favorited VARCHAR(500),
PRIMARY KEY (id)
);

INSERT INTO users (username, passW, favorited) VALUES ("ABC", "123", "https://www.seriouseats.com/recipes/2014/07/stir-fried-beef-skirt-steak-snap-peas-oyster-sauce-recipe.html");