import app from './app'
import { env } from './config/env';
import { logger } from './utils/logger';

app.listen(env.PORT, () => logger.info(`SERVER IS ON PORT ${env.PORT}`));
