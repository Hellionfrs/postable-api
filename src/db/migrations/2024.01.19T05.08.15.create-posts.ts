import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  params.context.query(`CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES users(id) NOT NULL,
    content TEXT NOT NULL,
    createdAt VARCHAR(25) NOT NULL,
    updatedAt VARCHAR(25) NOT NULL,
    likesCount INTEGER NOT NULL DEFAULT 0
);`);
};
export const down: Migration = async (params) => {
  params.context.query(`DROP TABLE posts;`);
};
