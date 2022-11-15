//CRUD : crear,read,update,delete
const express = require("express")
const mongoose = require ("mongoose")
const Person = require("./models/Person")

const app = express()

const DB_USER = "test"
const DB_PASS = "test"
//encondeURIComponent(process.env.DB_PASSWORD)
/* app.use(
    express.urlencoded ({
        extende: true
    }) */
app.use(express.json())

/* app.get("/", (req,res) => {     // "/" es un ENDPOINT
    res.json({message : "hello express"})
}) */
app.get("/", async (req,res) => {     // "/" es un ENDPOINT
  try {const people = await Person.find()
    res.status(200).json(people)
    
  } catch (error) {
    res.status(500).json({error:error})
    
  }
  
// res.json({message : "hello express"})
})
app.get("/person/:id", async (req,res)=>{
  console.log(req);
  const id =req.params.id // permite extraer el "id" del dato
  const person = await Person.findOne({id: id})
  if (!person) { res.status(422).json({ message : "Usuario no encontrado"})    
    return
  }
  res.status(200).json(person)

})
app.post("/Person", async (req, res) => {
  const {name,salary,age,approved} = req.body
  if(!name) {
    res.status(422).json({error: "Name is mandatory"})
    return
  }
  const person = {
    name,
    salary,
    age,
    approved,
  }
  try {
    await Person.create(person)
    res.status(201).json({message:"Person is defined!"})
  } catch (error) {res.status(500).json({error: error}) // la mejor alternativa es crear u nlog de errores.
    
  }
/*   Person.create(Person) */
})
// UPDATE
app.patch("/person/:id", async (req,res) => { const id = req.params.id
  const {name, salary, age, approved } = req.body
  const person = {
      name,
      salary,
      age,
      approved, 
  }
  const updatePerson = Person.updateOne({_id: id}, person)
  console.log(updatePerson)
  res.status(200).json(person)
})

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@miapi.fpc1uqe.mongodb.net/?retryWrites=true&w=majority`).then(() => {
      console.log("Conectado al MONGODB");
      app.listen(5000)

    })
    .catch((err) => {
      console.log(err);
    })



/* app.listen(5000, () => {
  console.log("Servidor en puerto 5000");
})
 */
//mongodb+srv://test:test@miapi.fpc1uqe.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://<username>:<password>@miapi.fpc1uqe.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://<username>:test@miapi.fpc1uqe.mongodb.net/?retryWrites=true&w=majority

