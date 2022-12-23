import * as dotenv from 'dotenv';
import PinoLogger from '../__infrastructure/_core/PinoLogger';
dotenv.config();

const logger = new PinoLogger();
const infrastructure: {
  infra: {
    logger: PinoLogger;
  };
} = {
  infra: {
    logger,
  },
};

export default infrastructure;
