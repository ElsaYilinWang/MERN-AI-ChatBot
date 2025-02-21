import request from 'supertest';
import { app } from '../app.js'; // Your Express app
import { connect, disconnect } from '../config/database.js';
import User from '../models/User.js';

describe('User API Integration Tests', () => {
  // Connect to test database before tests
  beforeAll(async () => {
    await connect();
  });

  // Clean up database after each test
  afterEach(async () => {
    await User.deleteMany({});
  });

  // Disconnect after all tests
  afterAll(async () => {
    await disconnect();
  });

  describe('POST /api/users/signup', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/api/users/signup')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Test User');
      expect(response.body.email).toBe('test@example.com');
    });

    it('should not create user with existing email', async () => {
      // First create a user
      await request(app)
        .post('/api/users/signup')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });

      // Try to create another user with same email
      const response = await request(app)
        .post('/api/users/signup')
        .send({
          name: 'Another User',
          email: 'test@example.com',
          password: 'password456'
        });

      expect(response.status).toBe(401);
      expect(response.text).toBe('User already exists');
    });
  });

  describe('POST /api/users/login', () => {
    beforeEach(async () => {
      // Create a test user before each login test
      await request(app)
        .post('/api/users/signup')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });
    });

    it('should login successfully with correct credentials', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Login successful');
      expect(response.headers['set-cookie']).toBeDefined();
    });

    it('should fail with incorrect password', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(403);
      expect(response.text).toBe('Incorrect password');
    });
  });
}); 