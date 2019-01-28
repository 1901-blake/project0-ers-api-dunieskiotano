import express from 'express';
import { json } from 'body-parser';
import session from 'express-session';
import { resolvePtr } from 'dns';
import { ReimbursementDAO } from '../DAOs/reimbursementDAO';
import { ReimbursementStatusDAO } from '../DAOs/reimbursementestatusDAO';
import { Reimbursement } from '../model/reimbursement';
//import * as Objects from '../data';
//import { users, reimbursements, reimbursementStatus } from '../data';



let reimbursements = new ReimbursementDAO();
export const reimbursementRouter = express.Router();

/**
 * Gets all reimbursements
 */
reimbursementRouter.get('', (req, res) => {
  reimbursements.getAllReimbursements().then(function (result) {
    res.json(result);
  })
})

/**
 * Reimbursement by User
 *It's working*/
reimbursementRouter.get('/author/:userId', (req, res) => {
  const idParam = +req.params.userId;
  const promiseReimbursement = Promise.resolve(reimbursements.getReimbursementsByUserId(idParam));
  promiseReimbursement.then(function (value) {
    value.forEach(element => {
      console.log(element);
      if (element.author === idParam) {
        res.status(200).send(element);
      }
    })
    res.status(401).send("Oops! Something went wrong");

  }
  )
}
)


/**
 * Find Reimbursement by Status
 */

reimbursementRouter.get('/status/:statusId', (req, res) => {
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
})








/**
 * Submit reimbursement
 */
reimbursementRouter.post('', (req, res) => {
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

    
    
    

});



