import mongoose from 'mongoose';
import logger from '../../infrastructure/logger';

interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: Options) {
    const { mongoUrl, dbName } = options;

    try {
      mongoose.connect(mongoUrl, { dbName: dbName });

      logger.info('Mongo connected');
      return true;
    } catch (error) {
      logger.error('Mongo connection error');
      throw error;
    }
  }
}
