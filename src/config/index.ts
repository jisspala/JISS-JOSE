import { config } from 'dotenv';
import constants from '../utils/constants';

config({ path: `.env.${process.env.NODE_ENV || constants.DEVELOPMENT}` });

export const { NODE_ENV, PORT, HOST_NAME, MAX_RETRIES, MAX_RESULTS } =
  process.env;
