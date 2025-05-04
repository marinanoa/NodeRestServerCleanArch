import { envs } from './config';
import { MongoDatabase } from './data/mongodb';
import { Server } from './presentation';
import { AppRoutes } from './routes';

// (() => {
//   main();
// })();

async function main() {
  // hasta que no se levante la base de datos no levantamos el servidor
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  new Server({ port: envs.PORT, routes: AppRoutes.routes }).start();
}

main();
