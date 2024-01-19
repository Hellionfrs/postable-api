-- Crear la tabla Users
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    role VARCHAR(5) NOT NULL DEFAULT 'user',
    createdAt TIMESTAMPTZ DEFAULT current_timestamp,
    updatedAt TIMESTAMPTZ DEFAULT current_timestamp,
    CONSTRAINT chk_role CHECK (role IN ('user', 'admin'))
);

-- Crear la tabla Posts
CREATE TABLE Posts (
    id SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES Users(id) NOT NULL,
    content TEXT NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT current_timestamp,
    updatedAt TIMESTAMPTZ DEFAULT current_timestamp
);

-- Crear la tabla Likes
CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    postId INTEGER REFERENCES Posts(id) NOT NULL,
    userId INTEGER REFERENCES Users(id) NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT current_timestamp,
    likesCount INTEGER NOT NULL DEFAULT 0,
    UNIQUE (postId, userId) -- Restricción de unicidad para evitar likes duplicados
);