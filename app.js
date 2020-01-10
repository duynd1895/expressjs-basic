const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();



//Connect tới Mongodb
mongoose.connect('mongodb://localhost:27017/node-shop', { useNewUrlParser: true }, (err, client) => {
     if (err) {
        return console.log('Unable to connect to database');  
     } 
     console.log('Ket Noi Thanh Cong Toi Database');
});

//Import các file cần thiết
const logger = require('./middleware/logger');

const productRoutes = require('./apix/routes/products');
const orderRoutes = require('./apix/routes/orders');



//Sử dụng các Middlware
app.use(logger);

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next) => {
     res.header("Access-Control-Allow-Origin", "*");
     res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept, Authorization"
     );
     if (req.method ==="OPTIONS") {
          res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
          return res.status(200).json({

          });
     }
     next();
})

//

//Định tuyến router
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use((req,res,next) => {
     const error = new Error('Not Found');
     err.status = 404;
     next(error);
});
app.use((error, req,res,next) => {
     res.status(error.status || 500);
     res.json({
          error: {
               message: error.message
          }
     });
});




//Export app.js để server có thể sử dụng
module.exports = app;