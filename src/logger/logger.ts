import create from './loggerFactory';

const loggerTransports = [
  {
    type: 'console',
    options: {},
  },
];

export default create(loggerTransports);
