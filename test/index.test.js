const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index")

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.URL_DB);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

describe("test endpoints", () => {
    let id;
    test("test get user", async () => {
        const res = await request(app).get("/api/user");
        expect(res.statusCode).toBe(200);
        expect(typeof res.body).toBe("object")
        //expect(res.body.length).toBeGreaterThan(0);
    })
    test("test save user", async () => {
        const res = await request(app).post("/api/user").send({
            email: "test@test.com",
            password: "testpass123"
        });
        id = res.body.savedU._id
        console.log(id)
        expect(res.statusCode).toBe(200);
        expect(res.body.savedU.email).toBe("test@test.com")
    })
    test("test delete user", async () => {
        const res = await request(app).delete("/api/user/" + id);
        expect(res.statusCode).toBe(200);
    })
    test("test get collaborators", async () => {
        const res = await request(app).get("/api/collaborator");
        expect(res.statusCode).toBe(200);
        expect(typeof res.body).toBe("object")
    })
})
