import bcrypt from "bcrypt";
import { describe, beforeEach, it, expect } from "vitest";
import request from "supertest";
import { app } from "../app";
import { truncateTable } from "../db/utils";
import * as db from "../db";
import { currentDateFormated } from "../utils/currentDate";
import { costFactor } from "../utils/const.utils";

describe("Auth API", () => {
  beforeEach(async () => {
    // Truncar la tabla de usuarios antes de cada prueba
    await truncateTable("users");
    const testUser = {
      username: "testuser",
      password: await bcrypt.hash("testpassword", costFactor),
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
      role: "user",
      createat: currentDateFormated(),
      updateat: currentDateFormated(),
    };

    let query = `INSERT INTO users (username, password, email, firstName,lastName, role, createdat, updatedat ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

    const fistUser = (await db.query(query, Object.values(testUser))).rows[0];
  });

  it("should sign up a new user", async () => {
    const response = await request(app).post("/signup").send({
      username: "karen",
      password: "supersecret",
      email: "karen@email.pe",
      firstname: "hellion",
      lastname: "rodriguez",
      role: "admin",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.ok).toBe(true);
    expect(response.body.message).toBe("Register exitoso");
    expect(response.body.data).toHaveProperty("username", "karen");
  });

  it("should log in an existing user", async () => {
    // Asegúrate de tener un usuario existente en la base de datos antes de la prueba

    const response = await request(app).post("/login").send({
      username: "testuser",
      password: "testpassword",
      email: "test@example.com",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.message).toBe("Login exitoso");
    expect(response.body.data).toHaveProperty("token");
  });
});
