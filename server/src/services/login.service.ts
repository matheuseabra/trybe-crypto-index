import * as Yup from 'yup';
import * as crypto from 'crypto';
import ApiError from '../errors/api.error';

interface IRequest {
  email: string;
  password: string;
}

class LoginService {
  async create({ email, password }: IRequest): Promise<any | ApiError> {
    const loginSchema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().matches(
        /^[0-9]{6}$/,
        'Deve ser no mínimo 6 digitos, todos números',
      ),
    });

    if (!(await loginSchema.isValid({ email, password }))) {
      throw new ApiError('Campos Inválidos');
    }

    const token = crypto.randomBytes(8).toString('hex');

    return token;
  }
}

export default new LoginService();
