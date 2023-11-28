DROP DATABASE IF EXISTS moviesdb;

CREATE DATABASE moviesdb;

USE moviesdb;

CREATE TABLE movie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255), 
    `year` INT NOT NULL, 
    director VARCHAR(255) NOT NULL, 
    duration INT NOT NULL,
    poster TEXT, 
    genre VARCHAR(255), 
    rate DECIMAL(2,1) UNSIGNED NOT NULL
);

CREATE TABLE genre (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE movie_genres (
    movie_id INT,
    genre_id INT,
    PRIMARY KEY (movie_id, genre_id),
    FOREIGN KEY (movie_id) REFERENCES movie(id),
    FOREIGN KEY (genre_id) REFERENCES genre(id)
);

INSERT INTO genre (name) 
VALUES
    ('Drama'),
    ('Action'),
    ('Crime'),
    ('Adventure'),
    ('Sci-Fi'),
    ('Romance')
;

INSERT INTO movie (title, `year`, director, duration, poster, genre, rate) 
VALUES 
    ('Interstellar', 1994, 'Christopher Nolan', 180, 'https://m.media-amazon.com/images/I/91obuWzA3XL._AC_UF1000,1000_QL80_.jpg', 'Sci-Fi', 8.8),
    ('Gladiator', 2000, 'Ridley Scott', 155, 'https://img.fruugo.com/product/0/60/14417600_max.jpg', 'Action', 8.5),
    ('The Lord of the Rings: The Return of the King', 2003, 'Peter Jackson', 180, 'https://i.ebayimg.com/images/g/0hoAAOSwe7peaMLW/s-l1600.jpg', 'Adventure', 8.9),
    ('Pulp Fiction', 1994, 'Quentin Tarantino', 180, 'https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg', 'Crime', 8.9)
;

INSERT INTO movie_genres (movie_id, genre_id) 
VALUES
    (1, (SELECT id FROM genre WHERE name = 'Sci-Fi')),
    (1, (SELECT id FROM genre WHERE name = 'Drama')),
    (1, (SELECT id FROM genre WHERE name = 'Adventure')),
    (2, (SELECT id FROM genre WHERE name = 'Action')),
    (2, (SELECT id FROM genre WHERE name = 'Adventure')),
    (2, (SELECT id FROM genre WHERE name = 'Drama')),
    (3, (SELECT id FROM genre WHERE name = 'Action')),
    (3, (SELECT id FROM genre WHERE name = 'Adventure')),
    (3, (SELECT id FROM genre WHERE name = 'Drama')),
    (4, (SELECT id FROM genre WHERE name = 'Crime')),
    (4, (SELECT id FROM genre WHERE name = 'Drama'))   
;


SELECT * FROM movie;
SELECT * FROM movie_genres;
