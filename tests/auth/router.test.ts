import express from 'express';
import request from 'supertest';
import authRouter from '../../src/features/auth/router';

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

describe('AuthRouter Integration Tests', () => {
  it('should register a user', async () => {
    const response = await request(app).post('/auth/register').send({username: "User2", password: "", email: "user2@examlpe.com"});
    expect(response.status).toBe(200);
    expect(response.text).toBe('Register');
  });

  // Add tests for other routes
});
