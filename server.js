// set up server
const express = require("express")
const app = express()


app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("view engine", "ejs")

const userRouter = require("./routes/users")

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



// run server, but without routes setup
app.listen(3000)
