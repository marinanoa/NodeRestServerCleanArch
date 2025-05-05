import jwt from 'jsonwebtoken';

export class JwtAdapter {
  static generateWebToken(payload: object, duration: string = '2h'): string {
    return jwt.sign(payload, 'SEED', {
      expiresIn: duration as jwt.SignOptions['expiresIn'],
    });
  }

  static validateWebToken(token: string) {
    return jwt.verify(token, 'SEED');
  }
}
