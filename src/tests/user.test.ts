import bcrypt from "bcrypt";
import { describe, beforeEach, it, expect } from "vitest";
import request from "supertest";
import { app } from "../app";
import { truncateTable } from "../db/utils";
import * as db from "../db";
import { currentDateFormated } from "../utils/currentDate";
import { costFactor } from "../utils/const.utils";

describe("User Profile API", () => {
  let token: string;

  beforeEach(async () => {
    // Truncar la tabla de usuarios antes de cada prueba
    await truncateTable("users");

    // Crear un usuario de prueba y obtener el token de autenticación
    // Crear un usuario de prueba y obtener el token de autenticación
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

    const { username, email } = (await db.query(query, Object.values(testUser)))
      .rows[0];

    // Autenticar el usuario y obtener el token
    const response = await request(app).post("/login").send({
      username,
      password: "testpassword",
      email,
    });
    token = response.body.data.token;;

  });

  it("should get user profile", async () => {
    const response = await request(app)
      .get("/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.data).toHaveProperty("username", "testuser");
    // Agrega más aserciones según sea necesario
  });

  it("should edit user profile", async () => {
    const response = await request(app)
      .patch("/me")
      .set("Authorization", `Bearer ${token}`)
      .send({
        "firstname": "UpdatedFirstName",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.data).toHaveProperty("firstname", "UpdatedFirstName");
    // Agrega más aserciones según sea necesario
  });

  it("should delete user profile", async () => {
    const response = await request(app)
      .delete("/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.data).toHaveProperty("username", "testuser");
    // Agrega más aserciones según sea necesario
  });
});