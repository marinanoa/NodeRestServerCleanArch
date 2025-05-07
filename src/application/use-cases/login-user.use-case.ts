import { JwtAdapter } from '../../config';
import { LoginUserDto, AuthRepository, CustomError } from '../../domain';
import { UserToken } from '../../domain/interfaces/UserToken';
import { SignToken } from '../../domain/types/SignToken';

interface LoginUserUseCase {
  execute(loginUserdto: LoginUserDto): Promise<UserToken>;
}

export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateWebToken, // give default function
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<any> {
    // Login user
    const user = await this.authRepository.login(loginUserDto);

    // Generate token
    const token = await this.signToken({ id: user.id });

    if (!token) {
      throw CustomError.internalServerError('Error generating token');
    }

    return { token: token, user: { id: user.id, name: user.name, email: user.email } };
  }
}
