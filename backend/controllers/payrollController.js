const db = require("../db/database.js");


//CREATE DATABASE
exports.createDB = (req, res) => {
    let q = 'CREATE DATABASE payroll';
    db.query(q, (err, result) => {
        if (err) throw err;
        return res.status(201).json("DB created");
    })
}

//CREATE TABLE
exports.createTable = (req, res) => {
    let q = 'CREATE TABLE payrolllist1(id int AUTO_INCREMENT, firstName VARCHAR(255), lastName VARCHAR(255), PRIMARY KEY(id))';
    db.query(q, (err, result) => {
        if (err) throw err;
        return res.status(201).json("TABLE CREATED");
    });
}


//CREATE LIST
exports.createList = (req, res) => {
    const q = "INSERT INTO payrolllist1 SET ?";

    const { firstName, lastName } = req.body;

    db.query(q, { firstName, lastName }, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });
}


//SHOW payrollS
exports.showpayrolls = (req, res) => {
    const q = "SELECT * FROM payrolllist1";

    db.query(q, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });
};

//SHOW SINGLE payroll
exports.singlepayroll = (req, res) => {
    const q = `SELECT * FROM payrolllist1 where id=${req.params.id}`;

    db.query(q, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result[0]);
    });
}


//UPDATE payroll
exports.updatepayroll = (req, res) => {
    const { firstName, lastName } = req.body;
    // const q = `UPDATE payrolllist1 SET firstName ='${firstName}' lastName ='${lastName}' where id=${req.params.id}`;
    const q = `UPDATE payrolllist1 SET ? where id=${req.params.id}`;

    db.query(q, { firstName, lastName }, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });
}


//DELETE SINGLE payroll
exports.deleteSinglepayroll = (req, res) => {

    const q = `DELETE FROM payrolllist1  WHERE id=${req.params.id}`;

    db.query(q, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json({ data: "payroll deleted" });
    });
}







