import { Request, Response } from 'express';
import { AuthRepository, CustomError, RegisterUserDto } from '../../domain';
import logger from '../../infrastructure/logger';

export class AuthController {
  // dependency injection
  constructor(private readonly authRepository: AuthRepository) {}

  // unknown because it can be a custome error, or from db, we don't know
  private handleError(error: unknown, res: Response) {
    logger.error(error);
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return CustomError.internalServerError();
  }

  // async because this can be different
  // depending on the moment it is executed
  loginUser = (req: Request, res: Response) => {
    res.json('loginUser controller');
  };

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) {
      res.status(400).json({ error }); // con {error} se envía un objeto con propiedad "error" como una clave
    }

    this.authRepository
      .register(registerUserDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };
}
