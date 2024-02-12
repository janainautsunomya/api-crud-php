-- Create database
CREATE DATABASE kabumtest;

-- Create users table
CREATE TABLE `kabumtest`.`users`
(
    `id` int NOT NULL auto_increment,
    `name` varchar(50),
    `phone` varchar(13),
    `cpf` varchar(12),
    `rg` varchar(11),
    `birth_date` date,
    `created_at` timestamp,
    `updated_at` timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE `kabumtest`.`addresses`
(
    `id` int NOT NULL auto_increment,
    `address` varchar(250),
    `user_id` int,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES `users`(`id`) ON DELETE CASCADE
);