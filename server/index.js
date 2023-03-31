const path = require("path");
const express = require("express");
// const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");
var cors = require("cors");

// Load config
dotenv.config({ path: "./config/config.env" });

// Passport config
require("./config/passport")(passport);

connectDB();

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// // Handlebars Helpers
// const {
//   formatDate,
//   stripTags,
//   truncate,
//   editIcon,
//   select,
// } = require("./helpers/hbs");

// // Handlebars
// app.engine(
//   ".hbs",
//   exphbs({
//     helpers: {
//       formatDate,
//       stripTags,
//       truncate,
//       editIcon,
//       select,
//     },
//     defaultLayout: "main",
//     extname: ".hbs",
//   })
// );
// app.set("view engine", ".hbs");

// Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
// app.use("/", require("./routes/index"));
// app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 3000;


var QRCode = require('qrcode')

const Jimp = require("jimp");

// __ Importing filesystem = __ \\
const fs = require('fs')

// __ Importing qrcode-reader __ \\
const qrCodeReader = require('qrcode-reader');




app.get("/generateQR", (req, res, next) => {
  QRCode.toFile('./file.png', 'Encode this text in QR code', {
    errorCorrectionLevel: 'H'
  }, function(err) {
    if (err) throw err;
    console.log('QR code saved!');
 });
  QRCode.toDataURL("LMAOOOO", function (err, code) {
    if(err) return console.log("error occurred")
 
    // Printing the code
      console.log(code)
      
      res.send(code)
  })

});
// app.get("/url", (req, res, next) => {
//   res.json(["Tony","Lisa","Michael","Ginger","Food"]);
//  });
  
 

app.get("/scanQR", (req, res, next) => {
  const buffer = fs.readFileSync('./file.png');
 
// __ Parse the image using Jimp.read() __ \\
  Jimp.read(buffer, function(err, image) {
      if (err) {
          console.error(err);
      }
  // __ Creating an instance of qrcode-reader __ \\

      const qrCodeInstance = new qrCodeReader();

      qrCodeInstance.callback = function(err, value) {
          if (err) {
              console.error(err);
          }
  // __ Printing the decrypted value __ \\
          console.log(value.result);
          res.send(value.result);
      };

  // __ Decoding the QR code __ \\
      qrCodeInstance.decode(image.bitmap);
  });
  
});

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
