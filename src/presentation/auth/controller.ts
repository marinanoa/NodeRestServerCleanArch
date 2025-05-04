import { Request, Response } from 'express';
import { AuthRepository, RegisterUserDto } from '../../domain';

export class AuthController {
  // dependency injection
  constructor(private readonly authRepository: AuthRepository) {}

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
      .catch((error) => res.status(500).json(error));
  };
}
