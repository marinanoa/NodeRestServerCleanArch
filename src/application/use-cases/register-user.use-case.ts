import { JwtAdapter } from '../../config';
import { RegisterUserDto, AuthRepository, CustomError } from '../../domain';
import { UserToken } from '../../domain/interfaces/UserToken';
import { SignToken } from '../../domain/types/SignToken';

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
