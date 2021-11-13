// set up server
const express = require("express")
const app = express()

// this is the one causing the index.html static serving
app.use(express.static("public"))
// this is for access info from forms (body)
// boiler plate code, else we'll get warning
app.use(express.urlencoded({ extended: true }))
// allow you to parse json information from the body
app.use(express.json())

// templating engine ejs
app.set("view engine", "ejs")



const userRouter = require("./routes/users")
// import the export from /routes/users.js
// linking route to particular path
app.use("/users", userRouter)





// ---------------------------------


// view engine boiler plate to activate
app.set("view engine", "ejs")

// BASIC ROUTING
app.get("/sending-data", (req, res) => {
  console.log("/sending-data")
  // can only send one response
  /* 
  res.status(500).send('Hi! This is route `/sending-data`').json({message: "error!"});
  res.send('Hi! This is route `/sending-data`').json({message: "error!"});
  res.download("route-download.png")
  */
  let obj = {
    text: "World",
    text2: "Word",
    text3: "no ragrets"

  }
  console.log('loading index.ejs at route `/sending-data`')
  res.render("index", obj)
})

// can put middelware functions in the middle too
// applying to individual routes
app.get("/", logger, logger, logger, (req, res) => {
  res.send(`"HOME PAGE and not index2.html"`)
})


// logger middleware
// always define at the top of your page
// app.use(logger)
function logger(req, res, next) {
  console.log("Logger: "+req.originalUrl)
  next()
}
// run server, but without routes setup
app.listen(3000)
