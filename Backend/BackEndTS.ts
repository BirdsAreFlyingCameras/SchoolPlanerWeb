import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());

app.get('/data', (req, res) => {
    res.json({ message: "Hello from the server!" });
});


app.post('/Post', (req, res) => {

    console.log('Post Request Received');

    res.json({ status: 'success' });

    const Item = req.body;

    let ItemJSON = JSON.parse(Item.Item);


    let Day = ItemJSON[0].Day;
    let Assignment = ItemJSON[0].Assignment;
    let Done = ItemJSON[0].Done;

    open({
        filename: '../Backend/Assignments.db',
        driver: sqlite3.Database
    })
    .then(async (db) => {
        console.log('Database Opened');

        try {
            const searchTerm = `%${Assignment}%`;

            const query = `SELECT * FROM ${Day} WHERE ASSIGNMENT LIKE ${searchTerm}`;

            console.log(`SQL Query: ${query}`);

            const GetAssignment = await db.get(`SELECT * FROM ${Day} WHERE ASSIGNMENT LIKE ?`, [searchTerm]);
            if (GetAssignment) {
                console.log('Assignment Found');
            } else {
                console.log('No Assignment Found');
            }

            const UpdateAssignment = await db.run(`UPDATE ${Day} SET DONE = ? WHERE ASSIGNMENT LIKE ?`, [Done, searchTerm]);
            if (UpdateAssignment) {
            }
            else {
                console.log('Failed to Update Assignment');
            }

        } catch (err) {
            console.log(err);
        }
    })

})

app.get('/Info', (req, res) => {

    console.log('Get Request Received');

    open({
        filename: '../Backend/Assignments.db',
        driver: sqlite3.Database
    })

    .then(async (db) => {
        console.log('Database Opened');

        const NamesOfDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        let allRows = {};

        for (let Day of NamesOfDays) {

            const Rows = await db.all(`SELECT * FROM ${Day}`);

            allRows[Day] = Rows;

        }

        let RowsString = JSON.stringify(allRows);
        let ParsedRows = JSON.parse(RowsString);

        res.json(ParsedRows);
        console.log('Info Sent');
    })
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})




