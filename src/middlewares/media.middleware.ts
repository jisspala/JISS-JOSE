import { Request, NextFunction, Response } from 'express';
import Joi from 'joi';
import constants from '../utils/constants';

class MediaMiddleware {
  private searchSchema = Joi.object({
    q: Joi.string()
      .regex(/^[a-zA-Z0-9 ]+$/)
      .max(200)
      .required(),
  });

  public validate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    console.log('req.query>>>>>>', req.query);
    const { error: validationError } = this.searchSchema.validate(req.query);
    if (validationError) {
      res.status(400).json({ error: constants.INVALID_TERM });
    } else {
      next();
    }
  };
}

export default MediaMiddleware;
