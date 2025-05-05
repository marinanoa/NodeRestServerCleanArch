import { Request, Response } from 'express';
import { AuthRepository, CustomError, RegisterUserDto } from '../../domain';
import logger from '../../infrastructure/logger';
import { JwtAdapter } from '../../config';
import { UserModel } from '../../data/mongodb';

export class AuthController {
  // dependency injection
  constructor(private readonly authRepository: AuthRepository) {}

  // unknown because it can be a custome error, or from db, we don't know
  private handleError(error: unknown, res: Response) {
    logger.error(error);
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) {
      res.status(400).json({ error }); // con {error} se envía un objeto con propiedad "error" como una clave
    }

    this.authRepository
      .register(registerUserDto!)
      .then(async (user) => {
        res.json({ user, token: await JwtAdapter.generateWebToken({ id: user.id }) });
      })
      .catch((error) => this.handleError(error, res));
  };

  // async because this can be different
  // depending on the moment it is executed
  loginUser = (req: Request, res: Response) => {
    res.json('loginUser controller');
  };

  getUsers = (req: Request, res: Response) => {
    UserModel.find()
      .then((users) => res.json({ users, user: res.locals.user }))
      .catch((error) => {
        logger.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      });
  };
}
