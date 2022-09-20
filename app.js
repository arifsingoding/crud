/* Memanggil dan menerapkan paket NodeJs ke projek kita */
const express = require('express');
const app = express();
const mysql = require('mysql');
const port = 3000;

/* Agar dokumen di dalamnya bisa diakses oleh user */
app.use(express.static('public'))

app.use(express.urlencoded({extended: false}));
app.set('view engine', './views');

/* Menghubungkan projek nodejs ke database mysql */
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'siswa'
})

/* Memberi pesan berhasil/ tidak, jika kita melakukan sesuatu di database */
con.connect(function(err) {
    if(err){
        console.log('Database Berhasil');
        return;
    }
})

/* Routing */
app.get('/index', (req, res) => {
    res.render('index.ejs')
})

app.get('/form', (req, res) => {
    res.render('form.ejs')
})

/* Routing Database */
app.post('/create', (req, res) => {
    con.query('INSERT INTO Siswa (nis) VALUES(?)',
     [req.body.nama],[req.body.kelas],
     (error, results) => {
        res.redirect('index.ejs', {Siswa: results})
     }
    )
})

/* Melihat hasil di browser */
app.listen(port, () => {
    console.log('Server Running...')
});