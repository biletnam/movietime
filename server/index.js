const express = require('express');
const app = express();

const uuidv4 = require('uuid/v4');

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());

const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'charon',
    database: 'coba_movietime_01'
});
db.connect();

app.get('/movie/:id', (req, res) => {
    let sql = `select * from  movie inner join screening on movie.id = screening.movie_id where movie_id = (select id from movie where moviedb_id = ${req.params.id})`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

app.get('/seat/:id', (req, res) => {
    let sql = `select * from seat_reserved left join reservation on seat_reserved.reservation_id = reservation.id where screening_id = '${req.params.id}' and active = 1`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

app.get('/price/:id', (req, res) => {
    let sql = `select price from screening where id = '${req.params.id}';`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

app.post('/register', (req, res) => {
    let sql = 'INSERT INTO user SET ?';
    let data = {email: req.body.email, password: req.body.password, passwordConfirm: req.body.passwordConfirm}
    db.query(sql, data, (err, result) => {
        if(err) throw err;
        let sessionID = uuidv4()
        let sql = `INSERT INTO session(session_id, user_id) VALUES ('${sessionID}',(select id from user where email='${req.body.email}'))`;
        db.query(sql, (err, result) => {
            if(err) throw err;
            res.send({
                kode: '001',
                session_id : sessionID,
            })
        })
    })
})

app.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    
    if (user.kode == '001') {
        // nyimpen sessionID di server
        let sql = `INSERT INTO session(session_id, user_id) VALUES ('${user.session_id}',(select id from user where email='${user.email}'))`;
        db.query(sql, (err, result) => {
            if(err) throw err;
            res.send(user)
        })
    } else {
        res.send(user)
    }
    
  }) (req, res, next);
});

passport.use(new LocalStrategy ({
    usernameField: 'email',
    passwordField: 'password',
},
    (email, password, done) => {
        // console.log(email)
        // console.log(password)

        let sql =  `select count(*) hitung from user where email = '${email}' and password = '${password}'`
        db.query(sql, (err, result) => {
        
        if (err) throw err;

        if (result[0].hitung == 1){
            console.log(`Berhasil Login - Passport`)
            let sessionID = uuidv4()
            return done(null, { kode: '001', email: email, session_id: sessionID });

        } else {
            console.log(`Gagal Login - Passport`)
            return done(null, false, { message: 'Incorrect username or password.' });
        }                      
        })
    }
))

app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/', failureFlash: true }));

app.post('/createreservation', (req, res) => {
    // var sql1 = `insert into reservation values ( null, now(), '${req.body.screening}', (select id from user where email = '${req.body.email}' and password = '${req.body.password}'),1)`
    // var sql1 = `insert into reservation values ( null, now(), '${req.body.screening}', (select user_id from session where session_id = '${req.body.cookie}'), 0)`
    var sql1 = `insert into reservation values ( null, now(), '${req.body.screening}', (select user_id from session where session_id = '${req.body.cookie}'), ${req.body.total_seats}, ${req.body.price}, ${req.body.total_price}, 0)`
   
    db.query(sql1, (err, result) => {
        if (err) throw err;

        for (let i=0; i<req.body.seat.length; i++){
            var seat_id = `${req.body.theater}${req.body.seat[i]}`
            var sql3 = `insert into seat_reserved values (null, '${seat_id}', ${result.insertId})`
            db.query(sql3, (err, result) => {
                if (err) throw err;
            })
        }

        res.send({
            status: 'Dari backend: berhasil create reservation'
        })

    })
})

app.post('/cookie', (req, res) => {
    // console.log(`Ini req.body cookie: ${req.body.cookieMovietime}`)
    let sql =  `select count(*) hitung from session where session_id = '${req.body.cookieMovietime}'`    
    db.query(sql, (err, result) => {

        if (result[0].hitung == 1){
            console.log(`Ada session dengan cookie tersebut di server`)
            res.send({
                kode: '001',
                status: 'Ada session dengan cookie tersebut di server'
            });

        } else {
            console.log(`Tidak ada session dengan cookie tersebut di server`)
            res.send({
                kode: '002',
                status: 'Tidak ada session dengan cookie tersebut di server'
            });
        }    
    });
})

app.post('/signout', (req, res) => {
    let sql =  `delete from session where session_id = '${req.body.cookieMovietime}'`
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send({
            kode: '001',
            status: 'Berhasil hapus session',
	});
    })
})

app.post('/summary', (req, res) => {
    let sql = 
    `select max(reservation.id) as id, 
            movie.movie_name, 
            screening.day, 
            screening.date_time, 
            theater.theater_name, 
            reservation.total_seats, 
            reservation.seat, 
            reservation.total_price 
    from screening 
                    join reservation on reservation.screening_id = screening.id 
                    join movie on screening.movie_id = movie.id 
                    join theater on screening.theater_id = theater.id 
    where reservation.user_id = (select user_id from session where session_id = '${req.body.cookie}') and reservation.active = 0`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

app.post('/createfinalreservation', (req, res) => {
    let sql0 = `select r.* from reservation r  join ( select max(id) as id from reservation where active = 0 group by user_id ) x on x.id = r.id where user_id = (select user_id from session where session_id = '${req.body.cookie}')`;

    db.query(sql0, (err, result) => {
        if (err) throw err;

        var sql1 = `insert into reservation values ( null, now(), '${result[0].screening_id}', ${result[0].user_id}, '${result[0].seat}', ${result[0].total_seats}, ${result[0].price}, ${result[0].total_price}, 1)`
        db.query(sql1, (err, result) => {
            if (err) throw err;
        });

        res.send(result);
        console.log(sql1)
    });
})


app.listen(5001, () => {
    console.log(`Listening to port 5001`)
});