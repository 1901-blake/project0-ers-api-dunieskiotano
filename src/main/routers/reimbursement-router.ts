import express from 'express';
import { json } from 'body-parser';
import session from 'express-session';
import { resolvePtr } from 'dns';
import * as Objects from '../data';
import { users, reimbursements, reimbursementStatus } from '../data';




export const reimbursementRouter = express.Router();
/**
 * Reimbursement by User
 */
reimbursementRouter.get('/author/:userId', (req, res) => {
  const reimbursements = Objects.reimbursements.filter(elem => {
     return elem.author === +req.params.userId;
    
  });

  if (reimbursements) {
    res.status(200).send(reimbursements);
  }
  
    res.sendStatus(401);
  
})

/**
 * Find Reimbursement by Status
 */

reimbursementRouter.get('/status/:statusId', (req, res) => {
  const reimbursements = Objects.reimbursements.filter(stat => {
    return stat.status === parseInt(req.params.statusId);
  });

  if (reimbursements) {
    res.status(200).json(reimbursements);
  }
  else {
    res.status(401);
  }
});

/**
 * Submit reimbursement
 */
reimbursementRouter.post('', (req, res) => {
  if (req.body.reimbursementId === 0) {
     Objects.reimbursements.push(req.body);
    res.status(201).send(req.body);
  }
});