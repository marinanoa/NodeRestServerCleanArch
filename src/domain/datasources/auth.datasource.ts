import { RegisterUserDto } from '../dtos/auth/register-user.dto';
import { UserEntity } from '../entities/user.entity';

export abstract class AuthDataSource {
  // clase abstracta porque no quiero que haya instancias, solo implementar o expandir

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;

  // abstract login(loginUserDto: LoginUserDto):Promise<UserEntity>
}
