export default () => ({
  port: process.env.PORT,
  deta: {
    get projectKey() {
      const projectKey = process.env.DETA_PROJECT_KEY;
      if (!projectKey) throw new Error('DETA_PROJECT_KEY is not set');
      return projectKey;
    },
    get drive() {
      const drive = process.env.DETA_DRIVE;
      if (!drive) throw new Error('DETA_DRIVE is not set');
      return drive;
    },
  },
  backup: {
    get path() {
      // const path = process.env.BACKUP_PATH;
      // if (!path) throw new Error('BACKUP_PATH is not set');
      // return path;
      return '/data';
    },
    get cron() {
      const cron = process.env.BACKUP_CRON;
      if (!cron) throw new Error('BACKUP_CRON is not set');
      return cron;
    },
  },
  bull: {
    get username() {
      const username = process.env.BULL_USERNAME;
      if (!username) throw new Error('BULL_USERNAME is not set');
      return username;
    },
    get password() {
      const password = process.env.BULL_PASSWORD;
      if (!password) throw new Error('BULL_PASSWORD is not set');
      return password;
    },
  },
  redis: {
    get host() {
      const host = process.env.REDIS_HOST;
      if (!host) throw new Error('REDIS_HOST is not set');
      return host;
    },
    get port() {
      const port = process.env.REDIS_PORT;
      if (!port) throw new Error('REDIS_PORT is not set');
      return port;
    },
    password: process.env.REDIS_PASSWORD,
  },
});
