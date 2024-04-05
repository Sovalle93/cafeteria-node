const request = require("supertest");
const server = require("../index");

describe("Leer data", () => {
    test("Obteniendo un 200 y un array con al menos 1 objeto", async () => {
        const response = await request(server)
            .get("/cafes")
            .send();
        const status = response.statusCode;
        const responseData = response.body;
        expect(status).toBe(200);
        expect(Array.isArray(responseData)).toBe(true);
        expect(responseData.length).toBeGreaterThan(0);
    });
});

describe("ID no existente", () => {
    test("Obteniendo un 404", async () => {
        const jwt = "token";
        const nonExistingId = 999;
        const response = await request(server)
            .delete(`/cafes/${nonExistingId}`)
            .set("Authorization", jwt)
            .send();
        const status = response.statusCode;
        expect(status).toBe(404);
    });
});

describe("Agregar cafe", () => {
    test("Obteniendo un 201", async () => {
        const id = Math.floor(Math.random() * 999);
        const cafe = { id, nombre: "Nuevo cafe" };
        const response = await request(server)
            .post("/cafes")
            .send(cafe);
        expect(response.status).toBe(201);
        const { body: cafes } = response;
        expect(cafes).toContainEqual(cafe);
    });
});

describe("Actualizar cafes", () => {
    test("Obteniendo un 400", async () => {
        const cafeIdsToTest = [1, 2, 3, 4];
        cafeIdsToTest.forEach(async existingCafeId => {
            const requestPayload = { id: existingCafeId, nombre: "Cafe actualizado" };
            const updatedCafeId = existingCafeId + 1;
            const response = await request(server)
                .put(`/cafes/${updatedCafeId}`)
                .send(requestPayload);
            expect(response.status).toBe(400);
        });
    });
});


