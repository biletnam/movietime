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

//Untuk mendapatkan 3 film terakhir (untuk dipasang di slider)
app.get('/latestmovies', (req, res) => {
    let sql = `SELECT * FROM ( SELECT * FROM movie ORDER BY id DESC LIMIT 3 ) as latest_movie ORDER BY id`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

//Untuk mendapatkan semua daftar film
app.get('/allmovies', (req, res) => {
    let sql = `SELECT * FROM movie`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

//Untuk memperbaharui data film (poster & backdrop)
app.post('/updatemovies', (req, res) => {
    let sql = `update movie set poster = '${req.body.poster}', backdrop = '${req.body.backdrop}' where moviedb_id = ${req.body.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send({
            status: 'Berhasil memperbaharui movie',
            moviedb_id: req.body.id,
            poster: req.body.poster,
            backdrop: req.body.backdrop,
        })
    })
})

//Untuk memperbaharui data film (tagline & overview)
app.post('/updatetagline', (req, res) => {
    let sql = `update movie set tagline = "${req.body.tagline}", overview = "${req.body.overview}" where moviedb_id = ${req.body.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send({
            status: 'Berhasil memperbaharui movie',
            tagline: req.body.tagline,
            overview: req.body.overview,
        })
    })
})

//HOME FILTER - Untuk mendapatkan daftar KOTA yang ada
app.get('/city', (req, res) => {
    let sql = `select distinct city from cinema`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

//HOME FILTER - Untuk mendapatkan daftar PROVIDER berdasarkan kota yang diplih
app.post('/provider', (req, res) => {
    let sql = `select distinct provider from cinema where city = '${req.body.city}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

//HOME FILTER - Untuk mendapatkan daftar CINEMA berdasarkan kota & provider yang diplih
app.post('/cinema', (req, res) => {
    let sql = `select name from cinema where city = '${req.body.city}' and provider = '${req.body.provider}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

//HOME FILTER - Untuk mendapatkan daftar MOVIES berdasarkan cinema yang diplih
app.post('/movies', (req, res) => {
    let sql = `select distinct movie.* from movie join screening on movie.id = screening.movie_id where screening.cinema_id = (select id from cinema where name = '${req.body.cinema}')`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

//HOME SEARCH - Untuk mendapatkan daftar MOVIES berdasarkan kata kunci
app.post('/search', (req, res) => {
    let sql = `select * from movie where movie_name like '%${req.body.keyword}%'`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

//MOVIE DETAILS FILTER - Untuk mendapatkan daftar KOTA yang ada
app.post('/citymd', (req, res) => {
    let sql = `select distinct cinema.city from screening
                    join movie on screening.movie_id = movie.id
                    join cinema on screening.cinema_id = cinema.id
                    where movie.moviedb_id = ${req.body.moviedb_id}`
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

//MOVIE DETAILS FILTER - Untuk mendapatkan daftar PROVIDER berdasarkan kota yang diplih
app.post('/providermd', (req, res) => {
    let sql = `select distinct cinema.provider from screening
                    join movie on screening.movie_id = movie.id
                    join cinema on screening.cinema_id = cinema.id
                    where movie.moviedb_id = ${req.body.moviedb_id}
                    and
                    cinema.city = '${req.body.city}'`
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

//MOVIE DETAILS FILTER - Untuk mendapatkan daftar CINEMA berdasarkan kota & provider yang diplih
app.post('/cinemamd', (req, res) => {
    let sql = `select distinct cinema.name from screening
                    join movie on screening.movie_id = movie.id
                    join cinema on screening.cinema_id = cinema.id
                    where movie.moviedb_id = ${req.body.moviedb_id}
                    and
                    cinema.city = '${req.body.city}'
                    and cinema.provider = '${req.body.provider}'`
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

//Untuk mengambil daftar screening
app.post('/screening', (req, res) => {
    let sql = `select screening.* from screening 
                    join movie on screening.movie_id = movie.id 
                    join cinema on screening.cinema_id = cinema.id 
                    where screening.movie_id = (select movie.id from movie where movie.moviedb_id = ${req.body.moviedb_id}) 
                    and screening.cinema_id = (select cinema.id from cinema where cinema.name = '${req.body.cinema}')`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

//Untuk mendapatkan kursi yang sudah direservasi
app.get('/seat/:id', (req, res) => {
    let sql = `select * from seat_reserved left join reservation on seat_reserved.reservation_id = reservation.id where screening_id = '${req.params.id}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

//Untuk mendapatkan kode theater & harga tiket dari screening yang dipilih
app.get('/price/:id', (req, res) => {
    let sql = `select theater_id, price from screening where id = '${req.params.id}';`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

//Untuk membuat reservasi awal (sebelum membayar, maka status active = 0)
app.post('/createreservation', (req, res) => {
    //Buat data di tabel reservation
    var sql1 = `insert into reservation values ( null, now(), '${req.body.screening}', (select user_id from session where session_id = '${req.body.cookie}'), '${req.body.theater}', '${req.body.seat}', ${req.body.total_seats}, ${req.body.price}, ${req.body.total_price}, 0)`
   
    db.query(sql1, (err, result) => {
        if (err) throw err;
        res.send(result)

        //Buat data di tabel seat_reserved
        for (let i=0; i<req.body.seat.length; i++){
            var seat_id = `${req.body.theater}${req.body.seat[i]}`
            var sql2 = `insert into seat_reserved values (null, '${seat_id}', now(), ${result.insertId}, 0)`
            db.query(sql2, (err, result) => {
                if (err) throw err;
            })
        }

    })

    //Buat data di tabel reservation_history
    var sql3 = `insert into reservation_history values ( null, now(), '${req.body.screening}', (select user_id from session where session_id = '${req.body.cookie}'), '${req.body.theater}', '${req.body.seat}', ${req.body.total_seats}, ${req.body.price}, ${req.body.total_price}, 0)`
   
    db.query(sql3, (err, result) => {
        if (err) throw err;

        //Buat data di tabel seat_reserved_history
        for (let i=0; i<req.body.seat.length; i++){
            var seat_id = `${req.body.theater}${req.body.seat[i]}`
            var sql4 = `insert into seat_reserved_history values (null, '${seat_id}', now(), ${result.insertId}, 0)`
            db.query(sql4, (err, result) => {
                if (err) throw err;
            })
        }

    })
})

//Untuk memperbaharui tiket yang sudah dibayar (active = 1)
app.post('/createfinalreservation', (req, res) => {
    //Cari reservasi terakhir dari user dengan status active 0
    let sql0 = `select r.* from reservation r  join ( select max(id) as id from reservation where active = 0 group by user_id ) x on x.id = r.id where user_id = (select user_id from session where session_id = '${req.body.cookie}')`;

    db.query(sql0, (err, result) => {
        if (err) throw err;

        //ubah status active menjadi 1 di tabel reservation
        var sql1 = `update reservation set active = 1 where id = ${result[0].id}`
        db.query(sql1, (err, result) => {
            if (err) throw err;
        });

        //ubah status active menjadi 1 di tabel seat_reserved 
        var sql2 = `update seat_reserved set active = 1 where reservation_id = '${result[0].id}'`
        db.query(sql2, (err, result) => {
            if (err) throw err;
        });


        //Masukkan data ke tabel reservation_history
        let seatString = result[0].seat;
        let seatArray = seatString.split(",");
        let theater_id = result[0].theater_id;
        var sql3 = `insert into reservation_history values ( null, now(), '${result[0].screening_id}', ${result[0].user_id}, '${result[0].theater_id}', '${result[0].seat}', ${result[0].total_seats}, ${result[0].price}, ${result[0].total_price}, 1)`
        
        db.query(sql3, (err, result) => {
            if (err) throw err;
            console.log(`Ini result 330: ${result}`);
            for (let i=0; i<seatArray.length; i++){
                var seat_id = `${theater_id}${seatArray[i]}`
                var sql4 = `insert into seat_reserved_history values (null, '${seat_id}', now(), ${result.insertId}, 1)`
                db.query(sql4, (err, result) => {
                    if (err) throw err;
                    // res.send(result);
                })
            }
        });
    });

})

//Untuk mengeluarkan data summary
app.post('/summary', (req, res) => {
    let sql = 
    `select max(reservation.id) as id, 
            movie.movie_name, 
            screening.day, 
            screening.date_time, 
            theater.theater_name, 
            reservation.total_seats, 
            reservation.seat, 
            reservation.total_price,
            reservation.reserve_date,
            cinema.provider,
            cinema.name,
            cinema.city 
    from screening 
                    join reservation on reservation.screening_id = screening.id 
                    join movie on screening.movie_id = movie.id 
                    join theater on screening.theater_id = theater.id 
                    join cinema on screening.cinema_id = cinema.id
    where reservation.user_id = (select user_id from session where session_id = '${req.body.cookie}') and reservation.active = 0`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

//Register
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

//Login
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

//Untuk cek apakah ada session dengan cookie yang diminta
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

//Untuk logout
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

//Untuk halaman payment success
app.post('/paymentsuccess', (req, res) => {
    let sql = `select email from user where id = (select user_id from session where session_id = '${req.body.cookie}');`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

//Untuk halaman my profile
app.post('/myprofile', (req, res) => {
    let sql = `select email from user where id = (select user_id from session where session_id = '${req.body.cookie}');`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

//Untuk mengubah email
app.post('/changeemail', (req, res) => {
    let sql = `update user set email='${req.body.email}' where id=(select user_id from session where session_id='${req.body.cookie}')`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

//Untuk mengubah password
app.post('/changepassword', (req, res) => {
    let sql = `update user set password='${req.body.password}', passwordConfirm='${req.body.passwordConfirm}' where id=(select user_id from session where session_id='${req.body.cookie}')`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

//Untuk halaman my reservation
app.post('/myreservation', (req, res) => {
    let sql = 
    `select 
            movie.movie_name, 
            movie.poster,

            screening.day, 
            screening.date_time, 
            
            theater.theater_name, 
            
            reservation.total_seats, 
            reservation.seat, 
            reservation.total_price,
            reservation.active,
            reservation.reserve_date,
            
            cinema.provider,
            cinema.name,
            cinema.city 
    from screening 
                    join reservation on reservation.screening_id = screening.id 
                    join movie on screening.movie_id = movie.id 
                    join theater on screening.theater_id = theater.id 
                    join cinema on screening.cinema_id = cinema.id
    where reservation.user_id = (select user_id from session where session_id = '${req.body.cookie}')`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

app.listen(5001, () => {
    console.log(`Listening to port 5001`)
});