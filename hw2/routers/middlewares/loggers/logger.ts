import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.json(), winston.format.colorize()),
  transports: [new winston.transports.Console({ format: winston.format.simple() })]
});

export default logger;
