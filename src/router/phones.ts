import express from 'express';

import { getAllPhones, getPhone, deletePhone, updatePhone, addPhone } from '../controllers/phones';

export default (router: express.Router) => {
  router.get('/phones', getAllPhones);
  router.get('/phones/:id', getPhone);
  router.delete('/phones/:id', deletePhone);
  router.patch('/phones/:id', updatePhone);
  router.post('/phones/create', addPhone);
};
