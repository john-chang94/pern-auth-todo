CREATE DATABASE authtodolist;

-- uuid generates a long unique id
-- must install extension in terminal inside db to run function
-- 'create extension if not exists "uuid-ossp";'
CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE todos (
  todo_id SERIAL PRIMARY KEY,
  user_id UUID,
  description VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO users (user_name, user_email, user_password)
VALUES ('John', 'john@email.com', 'password');
VALUES ('Sam', 'sam@email.com', '1234');
VALUES ('Jane', 'jane@email.com', '1234');

INSERT INTO todos (user_id, description)
VALUES ('a71a39b0-7401-403a-a400-c7553d380cad', 'hello world');
VALUES ('a71a39b0-7401-403a-a400-c7553d380cad', 'clean room');
VALUES ('e53bf943-3058-410e-be99-88ad1d68d8fe', 'sam says hello');