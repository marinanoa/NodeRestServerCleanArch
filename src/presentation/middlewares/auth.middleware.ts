import { RequestHandler } from 'express';
import logger from '../../infrastructure/logger';
import { JwtAdapter } from '../../config';
import { UserModel } from '../../data/mongodb';

export class AuthMiddleware {
  static validateJWT: RequestHandler = async (req, res, next) => {
    const authorization = req.header('Authorization');

    if (!authorization) {
      res.status(400).json({ error: 'Missing JWT token' });
      return;
    }

    const [, token = ''] = authorization.split(' ');

    try {
      const payload = await JwtAdapter.validateWebToken(token);

      if (!payload) {
        res.status(403).json({ error: 'Invalid token' });
        return;
      }

      const user = UserModel.findById(payload.id);
      if (!user) {
        // would be strange because our backend signed a token but then no user was found - deleted? id changed?
        res.status(401).json({ error: 'Invalid token' }); // do not say user not found, in case of hackers
      }

      // req.body is undefined in GET requests because
      // express.json() only processes bodies with Application/json and a body in req
      // req.body.token = payload;
      res.locals.user = payload;
    } catch (error: any) {
      logger.error(error);
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        res.status(403).json({ error: 'Invalid token' });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    next(); // if not called, the request is blocked
  };
}
