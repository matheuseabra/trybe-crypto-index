import supertest from 'supertest';
import api from '../api';

const mockToken = 'Bearer 584e24deb52761ba';

describe('GET /api/health ', () => {
  it('returns a API health check', async () => {
    const response = await supertest(api).get("/api/health");
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      message: 'The API is up'
    });
  });
});

describe('POST /api/login ', () => {
  it('returns a token', async () => {
    const response = await supertest(api).post("/api/login").send({
      email: "test@email.com",
      password: "123456"
    });
    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).not.toBeNull();
  });

  it('returns a validation error', async () => {
    const response = await supertest(api).post("/api/login").send({
      email: "test@email.com",
      password: "123"
    });
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      message: 'Campos Inválidos'
    });
  });
});

describe('GET /api/crypto/btc ', () => {
  it('returns a object with BTC and currency-pair prices', async () => {
    const response = await supertest(api).get("/api/crypto/btc").set(
      'Authorization',
      mockToken
    );
    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).not.toBeNull();
  });
});

describe('POST /api/crypto/btc ', () => {
  it('returns a sucessful currency price updated message', async () => {
    const response = await supertest(api).post("/api/crypto/btc").set(
      'Authorization',
      mockToken
    ).send({
      currency: 'EUR',
      value: 540
    });
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      message: 'Valor alterado com sucesso!'
    });
  });
});

describe("GET /xxxx 404 Not Found status", () => {
  it("returns a 404 Not Found status", async () => {
    const response = await supertest(api).get("/xxxx");
    expect(response.status).toBe(404);
  });
});