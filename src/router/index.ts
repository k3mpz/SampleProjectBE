import express from 'express';

import authentication from './authentication';
import users from './users';
import phones from './phones';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  phones(router);

  return router;
};
