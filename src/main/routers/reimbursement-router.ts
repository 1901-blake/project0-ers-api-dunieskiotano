import express from 'express';
import { json } from 'body-parser';
import session from 'express-session';
import { resolvePtr } from 'dns';
import { ReimbursementDAO } from '../DAOs/reimbursementDAO';
import { authMiddleWare } from '../security/authentication-middleware';
import { Reimbursement } from '../models/reimbursement';
import { ReimbursementStatus } from '../models/reimbursement-status';
import { ReimbursementType } from '../models/reimbursement-type';




let reimbursements = new ReimbursementDAO();
export const reimbursementRouter = express.Router();

//GETS ALL REIMBURSEMENTS ==> ADMIN AND FINANCIAL MANAGER
reimbursementRouter.get('', [authMiddleWare('admin', 'finance-manager'), async (req, res) => {
  try {
    const reimbursement = await ReimbursementDAO.getAllReimbursements()
    if (reimbursement && reimbursement.length) {
      res.json(reimbursement);
    }
    else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.sendStatus(500);
  }
}])

//FINDS REIMBURSEMENTS BY USER ID
reimbursementRouter.get('/author/:userId', async (req, res) => {
  const user_id = req.session.user.userid;
  const role = req.session.user.role.role;
  const idParam = +req.params.userId;
  try {
    const reimbursements = await ReimbursementDAO.getReimbursementsByUserId(idParam)
    if (user_id === +idParam || role !== 'associate') {
      if (reimbursements && reimbursements.length) {
        res.json(reimbursements);
      }
      else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(401);

    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
})


//FINDS REIMBURSEMENTS BY STATUS
reimbursementRouter.get('/status/:statusId', [authMiddleWare('admin', 'finance-manager'), async (req, res) => {
  const idParam = +req.params.statusId;
  try {
    const reimbursement = await ReimbursementDAO.getReimbursementsByStatus(idParam);
    if (reimbursement && reimbursement.length) {
      res.json(reimbursement);
    }
    else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}]);

//SUBMITS REIMBURSEMENTS BY ANY USER --- TESTED => WORKING JUST FINE
reimbursementRouter.post('', async (req, res) => {
  let reqBody = req.body;
  try {
    const reimb = await ReimbursementDAO.submitReimbursement(reqBody);
    res.status(201);
    res.json(reimb);
  } catch (err) {
    console.log(err)
    res.sendStatus(500);
  }
});


//UPDATES REIMBURSEMENTS BY FINANCIAL MANAGER --- TESTED =>=> WORKING JUST FINE
reimbursementRouter.patch('/', [authMiddleWare('finance-manager'), async (req, res) => {
  console.log('I am just entered patch function');

  try {
    console.log(req.body);
    console.log('in try')
    let reimbursement = await ReimbursementDAO.updateReimbursement(req.body);
    
    res.sendStatus(201).send(reimbursement);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}]);