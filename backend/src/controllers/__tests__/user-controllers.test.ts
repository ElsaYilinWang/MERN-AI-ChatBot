import { Request, Response } from 'express';
import { userSignup, userLogin } from '../user-controllers.js';
import User from '../../models/User.js';
import * as bcrypt from 'bcrypt';

// Mock dependencies
jest.mock('../../models/User.js');
jest.mock('bcrypt');
jest.mock('../../utils/token-manager');

describe('User Controllers', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('userSignup', () => {
    it('should create a new user successfully', async () => {
      // Mock request and response
      const req = {
        body: {
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        }
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response;

      // Mock User.findOne to return null (no existing user)
      (User.findOne as jest.Mock).mockResolvedValue(null);

      // Mock hash function
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

      // Mock User.create
      (User.create as jest.Mock).mockResolvedValue({
        _id: 'mockId',
        name: 'Test User',
        email: 'test@example.com'
      });

      await userSignup(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User created successfully',
        id: 'mockId',
        name: 'Test User',
        email: 'test@example.com'
      });
    });

    it('should return error if user already exists', async () => {
      const req = {
        body: {
          name: 'Test User',
          email: 'existing@example.com',
          password: 'password123'
        }
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      } as unknown as Response;

      (User.findOne as jest.Mock).mockResolvedValue({ email: 'existing@example.com' });

      await userSignup(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith('User already exists');
    });
  });
}); 