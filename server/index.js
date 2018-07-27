const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'charon',
    database: 'coba_movietime_01'
});
db.connect();

app.get('/api', (req, res) => {
    res.json({
        "nama":"Andi"
    })
});

app.get('/movie/:id', (req, res) => {
    let sql = `select * from  movie inner join screening on movie.id = screening.movie_id where movie_id = '${req.params.id}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
})

app.get('/seat/:id', (req, res) => {
    let sql = `select * from seat_reserved left join reservation on seat_reserved.reservation_id = reservation.id where screening_id = '${req.params.id}' and active = 1`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
})

app.listen(5001, () => {
    console.log(`Listening to port 5001`)
});