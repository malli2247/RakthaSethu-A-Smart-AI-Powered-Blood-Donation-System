import { app } from './app';
import { env } from './config/env';
import { logInfo } from './config/logger';

app.listen(env.PORT, () => {
  logInfo('RakthaSethu backend started', { port: env.PORT, env: env.NODE_ENV });
});
