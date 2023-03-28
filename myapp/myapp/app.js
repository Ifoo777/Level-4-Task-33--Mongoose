var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const port = 3000
const cors = require('cors');
// Helmet & body parser
const helmet = require("helmet");
const bodyParser = require('body-parser');

let indexRouter = require('./routes/index');
let maintenanceRouter = require('./routes/maintenance');
let maintenanceJobRouter = require('./routes/maintenanceJob');
let maintenanceStatusRouter = require('./routes/maintenanceStatus');
let maintenanceArchiveRouter = require('./routes/maintenanceArchive');


let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// imported
app.use(helmet());
// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

let mongoose = require('mongoose');
const uri =
'mongodb+srv://ossygt3:Juvi%401997@hyperion-dev-1234.ndc9mqc.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri, {
  useNewUrlParser: true
})
.then((result) => app.listen(port, ()=>console.log('Listening engaged')))
.catch((err) => console.log(err));

app.use('/', indexRouter);
app.use('/maintenance', maintenanceRouter);
app.use('/maintenancejob', maintenanceJobRouter);
app.use('/maintenancestatus', maintenanceStatusRouter);
app.use('/maintenancearchive', maintenanceArchiveRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
