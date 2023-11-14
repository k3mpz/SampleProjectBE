import express from 'express';

import { getAllPhones, deletePhone, updatePhone, addPhone } from '../controllers/phones';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
  router.get('/phones', isAuthenticated, getAllPhones);
  router.delete('/phones/:id', isAuthenticated, isOwner, deletePhone);
  router.patch('/phones/:id', isAuthenticated, isOwner, updatePhone);
  router.post('/phones/create', addPhone);
};
