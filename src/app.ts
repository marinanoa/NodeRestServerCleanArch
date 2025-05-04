import { envs } from './config';
import { MongoDatabase } from './data/mongodb';
import { Server } from './presentation/server';
import { AppRoutes } from './routes';

// (() => {
//   main();
// })();

async function main() {
  new Server({ port: envs.PORT, routes: AppRoutes.routes }).start();
}

main();
