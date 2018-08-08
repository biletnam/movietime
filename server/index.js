const express = require('express');
const app = express();

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
    let sql = `select * from  movie inner join screening on movie.id = screening.movie_id where movie_id = '${req.params.id}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.send(result);
    });
})

app.get('/seat/:id', (req, res) => {
    let sql = `select * from seat_reserved left join reservation on seat_reserved.reservation_id = reservation.id where screening_id = '${req.params.id}' and active = 1`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.send(result);
    });
})

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    console.log("Infooo:", info)
    console.log("User:", user)
    res.send({
        status: 'Berhasil'
    })
  })(req, res, next);
    
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    // let sql =  `select count(*) from user where email = '${req.body.email}' and password = '${req.body.password}'`
    // db.query(sql, (err, result) => {
        
    //     if (err) throw err;

    //     if (result == 1){
    //         res.send({
    //             status: 'Berhasil'
    //         })
    //         console.log(`Berhasil`)

    //     } else {
    //         res.send({
    //             status: 'Gagal'
    //         })
    //         console.log(`Gagal`)

    //     }
                        
    //     console.log(result)
    // })
    // res.redirect('/');
  });

passport.use(new LocalStrategy ({
    usernameField: 'email',
    passwordField: 'password'
},
    (email, password, done) => {
        console.log(email)
        console.log(password)

        let sql =  `select count(*) hitung from user where email = '${email}' and password = '${password}'`
        db.query(sql, (err, result) => {
        
        if (err) throw err;

        console.log(result)
        console.log(typeof(result))
        console.log(result.RowDataPacket)

        if (result[0].hitung == 1){
            // res.send({
            //     status: 'Berhasil'
            // })
            console.log(`Berhasil`)
            return done(null, { message: 'Berhasil' });

        } else {
            // res.send({
            //     status: 'Gagal'
            // })
            console.log(`Gagal`)
            return done(null, false, { message: 'Incorrect username or password.' });


        }
                        
    })

        // let sql =  `select count(*) from user where email = '${email}' and password = '${password}'`
        
        // db.query(sql, (err, result) => {

        //     if (err) { return done(err); }

        //     if (result == 1){
        //         res.send({
        //             status: 'Berhasil'
        //         })
        //         console.log(`Berhasil`)

        //     } else {
        //         res.send({
        //             status: 'Gagal'
        //         })
        //         console.log(`Gagal`)

        //     }
            
        //     if (err) throw err;
        //     console.log(result)
        // })  
    }
))

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/',
                                   failureFlash: true })
);

app.listen(5001, () => {
    console.log(`Listening to port 5001`)
});