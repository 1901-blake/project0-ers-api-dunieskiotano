import express from 'express';
import { json } from 'body-parser';
import session from 'express-session';
import { resolvePtr } from 'dns';
import { ReimbursementDAO } from '../DAOs/reimbursementDAO';
import { ReimbursementStatusDAO } from '../DAOs/reimbursementestatusDAO';
import { Reimbursement } from '../model/reimbursement';
import {
  authFinancialManagerMiddleware, authAssociateMiddleware,
  authAdminAndFinancialManagerAssociateMiddleware
} from '../middleware/authentication-middleware';




let reimbursements = new ReimbursementDAO();
export const reimbursementRouter = express.Router();

//GETS ALL REIMBURSEMENTS ==> ADMIN AND FINANCIAL MANAGER
reimbursementRouter.get('', (req, res) => {
  reimbursements.getAllReimbursements().then(function (result) {
    res.json(result);
  })
})

//FINDS REIMBURSEMENTS BY USER ID
reimbursementRouter.get('/author/:userId', [authFinancialManagerMiddleware, async (req, res) => {
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
reimbursementRouter.get('/status/:statusId', [authFinancialManagerMiddleware, (req, res) => {
  const idParam = +req.params.statusId;
  const promiseReimbursementStatus = Promise.resolve(reimbursements.getReimbursementsByStatus(idParam));
  promiseReimbursementStatus.then(function (value) {
    res.json(value);
  })
}]);




//SUBMITS REIMBURSEMENTS BY ANY USER --- TESTED => WORKING JUST FINE
reimbursementRouter.post('', [authAdminAndFinancialManagerAssociateMiddleware, (req, res) => {
  let reqBody = req.body;
  reimbursements.addReimbursements(
    reqBody.author,
    reqBody.amount,
    reqBody.datesubmitted,
    reqBody.dateresolved,
    reqBody.description,
    reqBody.resolver,
    reqBody.status,
    reqBody.type)
  res.status(200).send("Your reimbursement has been created!!! Good job!");
}]);


//UPDATES REIMBURSEMENTS BY FINANCIAL MANAGER --- TESTED =>=> WORKING JUST FINE
reimbursementRouter.patch('/', [authFinancialManagerMiddleware, async (req, res) => {
  let reimbursement = await ReimbursementDAO.updateReimbursement(req.body);
  res.status(201).send(reimbursement);
}]);
