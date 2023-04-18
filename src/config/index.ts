import { config } from 'dotenv';
import constants from '../utils/constants';
process.env.NODE_ENV = process.env.NODE_ENV
  ? process.env.NODE_ENV
  : constants.DEVELOPMENT;
config({ path: `.env.${process.env.NODE_ENV}` });

export const { NODE_ENV, PORT, HOST_NAME, API_TIMEOUT, MAX_RESULTS } =
  process.env;
