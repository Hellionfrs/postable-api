import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  params.context.query(`CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    role VARCHAR(5) NOT NULL DEFAULT 'user',
    createdAt VARCHAR(22) NOT NULL,
    updatedAt VARCHAR(22) NOT NULL,
    CONSTRAINT chk_role CHECK (role IN ('user', 'admin'))
);`);
};
export const down: Migration = async (params) => {
  params.context.query(`DROP TABLE users;`);
};
