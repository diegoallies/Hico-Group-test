const express = require('express');
const { createDB, createTable, createList, showpayrolls, singlepayroll, updatepayroll, deleteSinglepayroll } = require('../controllers/payrollController');
const router = express.Router();


//user routes

// /api/user/create
router.get('/create/database', createDB);
router.get('/create/table', createTable);
router.post('/create/list', createList);
router.get('/show/payrolls', showpayrolls);
router.get('/payroll/:id', singlepayroll);
router.put('/update/payroll/:id', updatepayroll);
router.delete('/delete/payroll/:id', deleteSinglepayroll);



module.exports = router;