import express from 'express';
import { json } from 'body-parser';
import session from 'express-session';
import { resolvePtr } from 'dns';
import { ReimbursementDAO } from '../DAOs/reimbursementDAO';
import { ReimbursementStatusDAO } from '../DAOs/reimbursementestatusDAO';
import { Reimbursement } from '../model/reimbursement';
import {
  authFinancialManagerMiddleware, authAssociateMiddleware,
  authAdminAndFinancialManagerMiddleware
} from '../middleware/authentication-middleware';




let reimbursements = new ReimbursementDAO();
export const reimbursementRouter = express.Router();

//GETS ALL REIMBURSEMENTS -- ADMIN AND FINANCIAL MANAGER
reimbursementRouter.get('', (req, res) => {
  reimbursements.getAllReimbursements().then(function (result) {
    res.json(result);
  })
})

//FINDS REIMBURSEMENTS BY USER ID
reimbursementRouter.get('/author/:userId', [authFinancialManagerMiddleware, (req, res) => {
  const idParam = +req.params.userId;
  const promiseReimbursement = Promise.resolve(ReimbursementDAO.getReimbursementsByUserId(idParam));
  promiseReimbursement.then(function (value) {
    value.forEach(element => {
      console.log(element);
      if (element.author === idParam) {
        res.status(200).send(element);
      }
    })
    res.status(401).send("Oops! Something went wrong");

  })
}]);

//FINDS REIMBURSEMENTS BY STATUS
reimbursementRouter.get('/status/:statusId', [authFinancialManagerMiddleware, (req, res) => {
  const idParam = +req.params.statusId;
  const promiseReimbursementStatus = Promise.resolve(reimbursements.getReimbursementsByStatus(idParam));
  promiseReimbursementStatus.then(function (value) {
    value.forEach(elem => {
      if (elem.status === idParam) {
        res.status(200).send(elem);
      }
    })
    res.status(401).send("Oops! Something went wrong");

  })
}]);

//SUBMITS REIMBURSEMENTS BY ANY USER --- TESTED => WORKING JUST FINE
reimbursementRouter.post('', [authAssociateMiddleware, authAdminAndFinancialManagerMiddleware, (req, res) => {
  let reqBody = req.body;
  console.log(reqBody);
  const users = reimbursements.addReimbursements(
    reqBody.author,
    reqBody.amount,
    reqBody.dateSubmitted,
    reqBody.dateResolved,
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
