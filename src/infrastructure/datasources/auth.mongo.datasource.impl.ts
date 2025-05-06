import { UserModel } from '../../data/mongodb';
import { AuthDataSource, CustomError, RegisterUserDto, UserEntity } from '../../domain';
import { UserMapper } from '../mappers/user.mapper';

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;
export class AuthMongoDataSourceImpl implements AuthDataSource {
  constructor(
    private readonly hashPassword: HashFunction,
    private readonly comparePassword: CompareFunction,
  ) {}

  // async envuelve el valor que se devuelve en un Promise.resolve, y si hay un error, hace un reject
  // sin async hay que envolver todo manualmente en un new Promise((resolve, reject) => { … })
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      // Check mail, if already exists
      const emailExists = await UserModel.findOne({ email });
      if (emailExists) {
        throw CustomError.badRequest('Invalid credentials'); // better than saying that it exists, could be useful for hackers
      }

      // Create user model and hash password
      const user = await UserModel.create({
        name, // name: name,
        email, // email: email,
        password: this.hashPassword(password),
      });

      // Save in database
      await user.save();

      // Map response
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServerError();
    }
  }
}
