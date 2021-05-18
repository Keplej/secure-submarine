const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
  // what is the value of req.user????
  // res.send(req.user);
  // console.log('/secrects GET route');
  // console.log('is authenticated', req.isAuthenticated);
  console.log('req.user:', req.user);
  
  pool
    .query(`SELECT * FROM "secret" WHERE $1 >= "secrecy_level";`, [req.user.clearance_level])
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
