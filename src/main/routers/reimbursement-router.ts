import express from 'express';
import { json } from 'body-parser';
import session from 'express-session';
import { resolvePtr } from 'dns';
import { ReimbursementDAO } from '../DAOs/reimbursementDAO';
import { ReimbursementStatusDAO } from '../DAOs/reimbursementestatusDAO';
import { Reimbursement } from '../model/reimbursement';
import { authMiddleWare } from '../middleware/authentication-middleware';




let reimbursements = new ReimbursementDAO();
export const reimbursementRouter = express.Router();

//GETS ALL REIMBURSEMENTS ==> ADMIN AND FINANCIAL MANAGER
reimbursementRouter.get('', [authMiddleWare('finance-manager'), (req, res) => {
  ReimbursementDAO.getAllReimbursements().then(function (result) {
    
    res.json(result);
  })
}])

//FINDS REIMBURSEMENTS BY USER ID
reimbursementRouter.get('/author/:userId', [authMiddleWare('finance-manager'), async (req, res) => {
  const idParam = +req.params.userId;
  try {
    const reimbursements = await ReimbursementDAO.getReimbursementsByUserId(idParam)
    res.json(reimbursements);
  }
  catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}])


//FINDS REIMBURSEMENTS BY STATUS
reimbursementRouter.get('/status/:statusId', [authMiddleWare('finance-manager'), async (req, res) => {
  try {
    const idParam = +req.params.statusId;
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
  const reimb = await ReimbursementDAO.submitReimbursement(reqBody);
  res.status(201);
  res.json(reimb);
});


//UPDATES REIMBURSEMENTS BY FINANCIAL MANAGER --- TESTED =>=> WORKING JUST FINE
reimbursementRouter.patch('/', [authMiddleWare('finance-manager'), async (req, res) => {
  let reimbursement = await ReimbursementDAO.updateReimbursement(req.body);
  res.status(201).send(reimbursement);
}]);