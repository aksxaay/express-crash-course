const express = require("express")
// like an application
// but mini app: lives inside the main application
// still independent from the main app
const router = express.Router()


// replace app with router
// even tho it starts with /users
// sorta like relative routing
router.use(logger)

// STATIC ROUTES
router.get("/", (req, res) => {
  // this logs queries
  // http://localhost:3000/users?name=Kyle
  console.log(req.query.name)
  res.send("User List")
})

// placeholder
// and has default value default sample
router.get("/new", (req, res) => {
  res.render("users/new", {firstName: ""})
})

// create new user
router.post("/", (req, res) => {
  console.log("Form Post: "+req.body.firstName)
  // this is the bool to clip accepting entry
  const isValid = false
  if (isValid) {
    users.push({ firstName: req.body.firstName })
    // redirect to the brand new user.
    res.redirect(`/users/${users.length - 1}`)
  } else {
    console.log("Error")
    // re-render out that form
    res.render("users/new", { firstName: req.body.firstName })
  }
})
// DYNAMIC ROUTES
// access individual user
// always have static routes above
// dynamic routes below

// you can chain together all the requests
router
  .route('/:id(\\d+)/')
  .get((req, res) => {
    console.log(req.httpVersion)
    res.send(`Get User With ID ${req.params.id}`)
  })
  .put((req, res) => {
    res.send(`Update User With ID ${req.params.id}`)
  })
  .delete((req, res) => {
    res.send(`Delete User With ID ${req.params.id}`)
  })

// ../users/response
// faced Converting circular structure to JSON Error
router
  .route("/response")
  .get((req,res) => {
    res.send({res_json: 'response'});
  })



const users = [{ name: "Kyle" }, { name: "Sally" }, {name: "jua"}]
// param is middleware
// whenever you go to route that has id 
// if the next()_function is commented out it is infinitely loading 
router.param("id", (req, res, next, id) => {
  req.user = users[id]
  
  // it takes 2 seconds to load into the user id 
  // setTimeout + callback
  console.log("2 seconds : fetching sumn")
  setTimeout( () => {
    console.log("fetched!")
    // if present in the users object then print
    if (req.user) {console.log(req.user)}
    
    next()

  }, 2000)
  
})

function logger(req, res, next) {
  console.log(req.originalUrl)
  next()
}

// export router as file
module.exports = router
