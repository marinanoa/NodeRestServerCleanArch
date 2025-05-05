import jwt from 'jsonwebtoken';
import { envs } from './envs';

type JwtPayload = {
  id: string;
  iat: number;
  exp: number;
};

const JWT_SEED = envs.JWT_SEED;
export class JwtAdapter {
  static generateWebToken(payload: object, duration: string = '2h'): string {
    return jwt.sign(payload, JWT_SEED, {
      expiresIn: duration as jwt.SignOptions['expiresIn'],
    });
  }

  static validateWebToken(token: string): JwtPayload {
    return jwt.verify(token, JWT_SEED) as JwtPayload;
  }
}
