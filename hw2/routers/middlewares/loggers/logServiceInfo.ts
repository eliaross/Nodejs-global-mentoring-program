import logger from './logger';

export const logServiceInfo = (serviceName: string, params = {}) => {
  const args = Object.entries(params).reduce(
    (prev, curr: [string, string]) => `${prev} ${curr[0]}: ${curr[1]},`,
    ''
  );
  const message = `Service ${serviceName} has been invoked with: ${args}`;

  logger.info(message);
};
