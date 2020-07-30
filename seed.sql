DROP DATABASE IF EXISTS cookmaster;
CREATE DATABASE cookmaster;
USE cookmaster;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL,
  role VARCHAR(10) DEFAULT 'user'
);

CREATE TABLE recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  ingredients TEXT,
  preparation TEXT,
  image_url VARCHAR(1000),
  author_id INT NOT NULL,
  FOREIGN KEY (author_id) REFERENCES users(id)
);

INSERT INTO users (name, email, password, role)
  VALUES
    ('Primeiro Usuário Admin', 'root@email.com', 'admin', 'admin'),
    ('Miguel Miranda', 'miguel@gmail.com', '123', 'user');

INSERT INTO recipes (name, ingredients, preparation, author_id)
  VALUES
    (
      'Ovo frito',
      '1 ovo, óleo, sal a gosto',
      'Frite o ovo com óleo numa frigideira. Adicione sal a gosto.',
      1
    ),
    (
      'Miojo',
      '1 miojo, água',
      'Cozinhe o miojo em água numa panela por 3 minutos. Adicione o sachê de tempero.',
      2
    ),
    (
      'Ovo cozido',
      '1 ovo, água, sal a gosto',
      'Cozinhe o ovo em água numa panela por 7 minutos. Adicione sal a gosto.',
      1
    );
