import { UserModel } from '../../data/mongodb';
import { AuthDataSource, CustomError, RegisterUserDto, UserEntity } from '../../domain';

export class AuthMongoDataSourceImpl implements AuthDataSource {
  // async envuelve el valor que se devuelve en un Promise.resolve, y si hay un error, hace un reject
  // sin async hay que envolver todo manualmente en un new Promise((resolve, reject) => { … })
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      // Check mail, if already exists
      const emailExists = await UserModel.findOne({ email });
      if (emailExists) {
        throw CustomError.badRequest('User with that email is already registered');
      }

      const user = await UserModel.create({
        name, // name: name,
        email, // email: email,
        password, //password: password,
      });

      // Hash password

      await user.save();

      // Map response
      // create mapper
      return new UserEntity(user.id, user.name, user.email, user.password, user.roles);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServerError();
    }
  }
}
