//Open Call Express
const bodyParser = require('body-parser');
const express = require('express')

const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5000;

app.use(bodyParser.json())

//MySQL Connect phpMyadmin
const pool = mysql.createPool({
    connectTimeLimit : 10,
    connectTimeout : 20,
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'loterry_db'
})

var obj = {} //Global Var to table

//------Views-------
app.set('view engine','ejs')

app.get('',(req,res) => {
    res.render('index')
})

app.get('/lot_1',(req,res) => {
    res.render('lot_1')
})

app.get('/lot_2',(req,res) => {
    res.render('lot_2')
})

app.get('/lot_3',(req,res) => {
    res.render('lot_3')
})

app.get('/lot_reward_1',(req,res) => {
    res.render('lot_reward_1')
})

app.get('/lot_reward_2',(req,res) => {
    res.render('lot_reward_2')
})

app.get('/lot_reward_3',(req,res) => {
    res.render('lot_reward_3')
})

app.get('/lot_reward_choice',(req,res) => {
    res.render('lot_reward_choice')
})

//POST เพิ่มข้อมูลรางวัลวันที่ 16 มีนาคม
app.use(bodyParser.urlencoded({extended: false})) 
//สร้าง Path ของเว็บไซต์ additem
app.post('/lot_reward_1',(req, res) => {
    pool.getConnection((err, connection) => { //pool.getConnection สำหรับใช้เชื่อมต่อกับ Database 
        if(err) throw err
            const params = req.body
                connection.query('INSERT INTO lottery_reward_1 SET ?', params, (err, rows) => {
                    connection.release()
                    if(!err){
                        obj = {Error:err , mesg: `Success adding data`}
                        res.render('lot_reward_1',obj)
                    }else {
                        console.log(err)
                        }
                    })           
                })
            })

//POST เพิ้มรางวัลวันที่ 1 เมษายน
app.use(bodyParser.urlencoded({extended: false})) 
//สร้าง Path ของเว็บไซต์ additem
app.post('/lot_reward_2',(req, res) => {
    pool.getConnection((err, connection) => { //pool.getConnection สำหรับใช้เชื่อมต่อกับ Database 
        if(err) throw err
            const params = req.body
                connection.query('INSERT INTO lottery_reward_2 SET ?', params, (err, rows) => {
                    connection.release()
                    if(!err){
                        obj = {Error:err , mesg: `Success adding data`}
                        res.render('lot_reward_2',obj)
                    }else {
                        console.log(err)
                        }
                    })           
                })
            })

//POST เพิ่มข้อมูลรางวัลวันที่ 16 เมษายน
app.use(bodyParser.urlencoded({extended: false})) 
//สร้าง Path ของเว็บไซต์ additem
app.post('/lot_reward_3',(req, res) => {
    pool.getConnection((err, connection) => { //pool.getConnection สำหรับใช้เชื่อมต่อกับ Database 
        if(err) throw err
            const params = req.body
                connection.query('INSERT INTO lottery_reward_3 SET ?', params, (err, rows) => {
                    connection.release()
                    if(!err){
                        obj = {Error:err , mesg: `Success adding data`}
                        res.render('lot_reward_3',obj)
                    }else {
                        console.log(err)
                        }
                    })           
                })
            })

//GET ข้อมูลรางวัล 16 มีนาคม
app.get('/show_reward_1',(req, res) => {
 
    pool.getConnection((err, connection) => {  //err คือ connect ไม่ได้ or connection คือ connect ได้ บรรทัดที่ 13-20
        if(err) throw err
        console.log("connected id : ?" ,connection.threadId) //ให้ print บอกว่า Connect ได้ไหม
         
        connection.query('SELECT * FROM lottery_reward_1', (err, rows) => { 
            connection.release();
            if(!err){ //ถ้าไม่ error จะใส่ในตัวแปร rows
                console.log(rows)
                obj = {lots : rows, Error : err}

                res.render('show_reward_1',obj)
            } else {
                console.log(err)
            }
         }) 
    })
})

//GET ข้อมูลรางวัล 1 เมาษายน
app.get('/show_reward_2',(req, res) => {
 
    pool.getConnection((err, connection) => {  //err คือ connect ไม่ได้ or connection คือ connect ได้ บรรทัดที่ 13-20
        if(err) throw err
        console.log("connected id : ?" ,connection.threadId) //ให้ print บอกว่า Connect ได้ไหม
         
        connection.query('SELECT * FROM lottery_reward_2', (err, rows) => { 
            connection.release();
            if(!err){ //ถ้าไม่ error จะใส่ในตัวแปร rows
                console.log(rows)
                obj = {lots : rows, Error : err}

                res.render('show_reward_2',obj)
            } else {
                console.log(err)
            }
         }) 
    })
})

//GET ข้อมูลรางวัล 16 เมษายน
app.get('/show_reward_3',(req, res) => {
 
    pool.getConnection((err, connection) => {  //err คือ connect ไม่ได้ or connection คือ connect ได้ บรรทัดที่ 13-20
        if(err) throw err
        console.log("connected id : ?" ,connection.threadId) //ให้ print บอกว่า Connect ได้ไหม
         
        connection.query('SELECT * FROM lottery_reward_3', (err, rows) => { 
            connection.release();
            if(!err){ //ถ้าไม่ error จะใส่ในตัวแปร rows
                console.log(rows)
                obj = {lots : rows, Error : err}

                res.render('show_reward_3',obj)
            } else {
                console.log(err)
            }
         }) 
    })
})

app.get('lot_show_1',(req,res) => {
    pool.connection((err, connection) => {
        if(err) throw err
        console.log("connected id : ?", connection.threadId)

        connection.query('SELECT * FORM lottery_1_march WHERE `user_id` = ?',[req.params.user_id], (err, rows) => {
            
        })
    })
})

//----Server_port-----
app.listen(port,() => {
    console.log("listen on port : ?",port)
})
