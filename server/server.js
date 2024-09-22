const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use('/', express.static('public'));

const budget = require("./budget.json");

app.use(cors());

// const budget = {
//     myBudget: [
//     {
//         title:'Eat out',
//         budget: 25
//     },
//     {
//         title: 'Rent',
//         budget: 375
//     },
//     {
//         title: 'Groceries',
//         budget: 110
//     },
//     {
//         title: 'Personal',
//         budget: 50
//     },
//     {
//         title: 'Loan',
//         budget: 500
//     },
//     {
//         title: 'Pets',
//         budget: 40
//     },
//     ]  
// };



app.get('/hello', (req, res)=> {
    res.send('Hello World from Gaurav Bharatkumar Patel');
});

app.get('/budget', (req, res)=> {
    res.json(budget);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});