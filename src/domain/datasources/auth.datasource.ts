import { LoginUserDto, RegisterUserDto } from '..';
import { UserEntity } from '../entities/user.entity';

export abstract class AuthDataSource {
  // Abstract class because I do not want instances, only implement or expand

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;

  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
}
