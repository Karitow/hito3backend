import 'dotenv/config';
import request from 'supertest';
import app from '../src/server/app.js';
import { describe, it, expect, beforeAll } from 'vitest';

const USER_VALID_LOGIN = { email: 'juanito@test.com', password: '1234' };
const NEW_USER = { nombre: 'Test User', email: 'test@user.com', contraseña: '1234' };
const NEW_ORDER = { userId: 1, items: [{ productId: 1, quantity: 2 }], totalAmount: 100 };
const INVALID_ORDER = { userId: 1, items: [], totalAmount: 0 };
const UPDATED_ORDER = { status: 'completed' };
let ORDER_ID; 

describe('API Tests', () => {
  let token;

  beforeAll(async () => {
    const registerResponse = await request(app).post('/restobuApi/users/register').send(NEW_USER);
    expect(registerResponse.status).toBe(201);

    const loginResponse = await request(app).post('/restobuApi/users/login').send(USER_VALID_LOGIN);
    expect(loginResponse.status).toBe(200);
    token = loginResponse.body.message.token;
  });

  it('should create a new order and return 201', async () => {
    const response = await request(app)
      .post('/restobuApi/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(NEW_ORDER);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe(true);

    ORDER_ID = response.body.message.id;
  });

  it('should return 400 for invalid order data', async () => {
    const response = await request(app)
      .post('/restobuApi/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(INVALID_ORDER);

    expect(response.status).toBe(400);
    expect(response.body.status).toBe(false);
  });

  it('should get an order and return 200', async () => {
    const response = await request(app)
      .get(`/restobuApi/orders/${ORDER_ID}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });

  it('should update an order and return 200', async () => {
    const response = await request(app)
      .put(`/restobuApi/orders/${ORDER_ID}`)
      .set('Authorization', `Bearer ${token}`)
      .send(UPDATED_ORDER);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });

  it('should delete an order and return 200', async () => {
    const response = await request(app)
      .delete(`/restobuApi/orders/${ORDER_ID}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });

  it('should return 404 for a non-existent order', async () => {
    const response = await request(app)
      .delete('/restobuApi/orders/999999') // ID no existente
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.status).toBe(false);
  });
});
