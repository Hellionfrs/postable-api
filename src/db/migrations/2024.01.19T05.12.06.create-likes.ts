import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  params.context.query(`CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    postId INTEGER REFERENCES posts(id) NOT NULL,
    userId INTEGER REFERENCES users(id) NOT NULL,
    createdAt VARCHAR(25) NOT NULL,
    UNIQUE (postId, userId) -- Restricción de unicidad para evitar likes duplicados
);`);
};
export const down: Migration = async (params) => {
  params.context.query(`DROP TABLE likes`);
};
