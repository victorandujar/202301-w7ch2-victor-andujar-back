import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectDataBase from "../../database/connectDataBase";
import User from "../../database/models/UserLogin";
import { type UserCredentials } from "../../types";
import app from "../../server/index.js";
import request from "supertest";

let server: MongoMemoryServer;
const url = "/users/login";

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDataBase(server.getUri());
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

describe("Given a POST '/users/login'", () => {
  const mockUser: UserCredentials = {
    username: "victor",
    password: "victor1234",
    email: "ddjfhjk@gmail.com",
  };

  describe("When it receives a request with the username 'victor'", () => {
    beforeAll(async () => {
      await User.create(mockUser);
    });
    test("Then it should respond with status 200 and an object with the property 'token'", async () => {
      const expectedStatus = 200;

      const response = await request(app)
        .post(url)
        .send(mockUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("token");
    });
  });
});
