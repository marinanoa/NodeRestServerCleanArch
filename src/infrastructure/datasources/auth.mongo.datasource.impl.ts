import { UserModel } from '../../data/mongodb';
import { AuthDataSource, CustomError, LoginUserDto, RegisterUserDto, UserEntity } from '../../domain';
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
      // Check with the email, if the user already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
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

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    try {
      // Check if user already exists
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw CustomError.badRequest('Invalid credentials');
      }

      // Check if password is correct
      const validPassword = this.comparePassword(password, user.password);
      if (!validPassword) {
        throw CustomError.badRequest('Invalid credentials');
      }

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
