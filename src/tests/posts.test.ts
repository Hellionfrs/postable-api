import bcrypt from "bcrypt";
import { describe, beforeEach, it, expect } from "vitest";
import request from "supertest";
import { app } from "../app";
import { truncateTable } from "../db/utils";
import * as db from "../db";
import { currentDateFormated } from "../utils/currentDate";
import { costFactor } from "../utils/const.utils";

describe("Posts API", () => {
  let token: string;

  beforeEach(async () => {
    // Truncar la tabla de usuarios y posts antes de cada prueba
    await truncateTable("users");
    await truncateTable("posts");
    await truncateTable("likes")

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
    token = response.body.data.token;

    // Creacion de posts
    const firstPost = {
      userid: 1,
      content: "content 1",
      createdAt: currentDateFormated(),
      updatedAt: currentDateFormated(),
    };
    const secondPost = {
      userid: 1,
      content: "content 2",
      createdAt: currentDateFormated(),
      updatedAt: currentDateFormated(),
    };
    let query2 = `INSERT INTO posts (userid, content, createdat, updatedat) VALUES ($1, $2, $3, $4)  RETURNING *`;
    let createFirstPost = (await db.query(query2, Object.values(firstPost)))
      .rows[0];
    let createSecondPost = (await db.query(query2, Object.values(secondPost)))
      .rows[0];

    // likear post 2 y update post likescount (refactor a likear manualmente)
    await request(app)
      .post("/posts/2/like") // Reemplaza con el ID de un post existente
      .set("Authorization", `Bearer ${token}`);
  });

  it("should create a new post", async () => {
    const response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        content: "This is a test post.",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.ok).toBe(true);
    expect(response.body.message).toBe("Post creado exitosamente");
    expect(response.body.data).toHaveProperty(
      "content",
      "This is a test post."
    );
    // Agrega más aserciones según sea necesario
  });

  it("should edit an existing post", async () => {
    // Asegúrate de tener un post existente en la base de datos antes de la prueba

    const response = await request(app)
      .patch("/posts/1") // Reemplaza con el ID de un post existente
      .set("Authorization", `Bearer ${token}`)
      .send({
        content: "This is an edited post.",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.ok).toBe(true);
    expect(response.body.message).toBe("Post editado exitosamente");
    expect(response.body.data).toHaveProperty(
      "content",
      "This is an edited post."
    );
    // Agrega más aserciones según sea necesario
  });

  it("should like an existing post", async () => {
    // Asegúrate de tener un post existente en la base de datos antes de la prueba

    const response = await request(app)
      .post("/posts/1/like") // Reemplaza con el ID de un post existente
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(201);
    expect(response.body.ok).toBe(true);
    expect(response.body.message).toBe("Post likeado exitosamente");
    // Agrega más aserciones según sea necesario
  });

  it("should delete a like from an existing post", async () => {
    // Asegúrate de tener un post existente con al menos un like en la base de datos antes de la prueba

    const response = await request(app)
      .delete("/posts/2/like") // Reemplaza con el ID de un post existente
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(201);
    expect(response.body.ok).toBe(true);
    expect(response.body.message).toBe("Like eliminado exitosamente");
    // Agrega más aserciones según sea necesario
  });

  it("should get all posts", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.data).toBeInstanceOf(Array);
    // Agrega más aserciones según sea necesario
  });

  it("should get posts by username", async () => {
    // Asegúrate de tener un usuario existente con al menos un post en la base de datos antes de la prueba

    const response = await request(app).get("/testuser"); // Reemplaza con el nombre de usuario de un usuario existente
    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.data).toBeInstanceOf(Array);
    // Agrega más aserciones según sea necesario
  });
});
