import express, { Router } from 'express';
import logger from '../infrastructure/logger';
import morgan from 'morgan';
import Cors from 'cors';

interface Options {
  port?: number;
  routes: Router;
}

const corsOptions = Cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port = 3100, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {
    // Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlenconded
    this.app.use(
      morgan('tiny', {
        stream: { write: (msg) => logger.http(msg.trim()) },
      }),
    );
    this.app.use(corsOptions);

    // Use defined routes
    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      logger.info(`Server running on port ${this.port}`);
    });
  }
}
