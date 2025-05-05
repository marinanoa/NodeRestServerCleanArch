import { JwtAdapter } from '../../../config';
import { RegisterUserDto } from '../../dtos/auth/register-user.dto';
import { CustomError } from '../../errors/custom.error';
import { AuthRepository } from '../../repositories/auth.repository';

type SignToken = (payload: object, duration?: string) => string;

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

export class RegisterUser implements RegisterUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateWebToken, // give default function
  ) {}

  async execute(registerUserDto: RegisterUserDto): Promise<any> {
    // Create user
    const user = await this.authRepository.register(registerUserDto);

    // Generate token
    const token = await this.signToken({ id: user.id });

    if (!token) {
      throw CustomError.internalServerError('Error generating token');
    }

    return { token: token, user: { id: user.id, name: user.name, email: user.email } };
  }
}
