import jwt from 'jsonwebtoken';

type JwtPayload = {
  id: string;
  iat: number;
  exp: number;
};

export class JwtAdapter {
  static generateWebToken(payload: object, duration: string = '2h'): string {
    return jwt.sign(payload, 'SEED', {
      expiresIn: duration as jwt.SignOptions['expiresIn'],
    });
  }

  static validateWebToken(token: string): JwtPayload {
    return jwt.verify(token, 'SEED') as JwtPayload;
  }
}
