import winston, {Logger, LoggerOptions} from 'winston';

function createConsoleTransport(options: LoggerOptions) {
  return new winston.transports.Console(options);
}

function getLoggerTransports(transports: any[]): any[] {
  return transports.map((transport) => {
    const {type, options} = transport;

    switch (type) {
      case 'console':
        return createConsoleTransport(options);
    }
  });
}

export default function create(transports: any[]): Logger {
  return winston.createLogger({
    transports: getLoggerTransports(transports),
  });
}
