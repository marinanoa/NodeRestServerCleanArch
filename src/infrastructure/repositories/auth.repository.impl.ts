import { AuthDataSource, AuthRepository, RegisterUserDto, UserEntity } from '../../domain';

// Usamos el repositorio como capa, para desacoplar el datasource.
// Podemos usar diferente origen de datos (mongo, oracle...).
// Interactuamos con el repositorio y le enviamos el datasource que queramos

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDataSource: AuthDataSource) {}

  register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDataSource.register(registerUserDto);
  }
}
