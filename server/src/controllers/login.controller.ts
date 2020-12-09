import { Request, Response } from 'express';
import LoginService from '../services/login.service';

class LoginController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    try {
      const result = await LoginService.create({ email, password });
      return response.status(200).json({ token: result });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export default new LoginController();
