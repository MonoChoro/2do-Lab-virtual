//CRUD : crear,read,update,delete
const express = require("express")
const mongoose = require ("mongoose")
const Person = require("./models/Person")

const app = express()

const DB_USER = "test"
const DB_PASS = "test"

app.use(express.json())

app.get("/", async (req,res) => {       // "/" es un ENDPOINT
  res.json({message:"Hello express"})
})     
//Create
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
})
//Read global
app.get('/person', async (req,res) => {
  try{
      const people = await Person.find()
      res.status(200).json(people)
  }  catch(error) {
      res.status(500).json({error:error})
  }
})
//Read individual
app.get("/person/:id", async (req,res)=>{
  const id =req.params.id // permite extraer el "id" del dato
  try{
    const person = await Person.findOne({_id: id})
    if (!person) { res.status(422).json({ message : "Usuario no encontrado"})    
      return
    }
    res.status(200).json(person)
  } catch(error) {
    res.status(500).json({error:error}) 
  }
})
// UPDATE
app.patch("/person/:id", async (req,res) => { 
  const id = req.params.id
  const {name, salary, age, approved } = req.body
  const person = {
      name,
      salary,
      age,
      approved, 
  }

  try{
    const updatePerson = await Person.updateOne({_id: id}, person)
    //console.log(updatePerson)
    if(updatePerson.matchedCount ===0){
        res.status(422).json({message:"Usuario no encontrado"})
        return
    }
    res.status(200).json(person)
}  catch (error) {
    res.status(500).json({error:error})
}
})
// User delete
app.delete('/person/:id', async (req,res) => {
  const id = req.params.id
  const person = await Person.findOne({_id:id})
  //const person = await Person.findOne( {_id:id})
  //await Person.deleteOne({_id: id})
  if(!person) { //validación antes de eliminar
      res.status(422).json({message:"Usuario no encontrado"})
      return
  }
  try {
      await Person.deleteOne({_id:id})
      res.status(200).json({message:"Usuario removido"})
  }  catch (error) {
      res.status(500).json({error:error})
  }
})
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@miapi.fpc1uqe.mongodb.net/?retryWrites=true&w=majority`).then(() => {
      console.log("Conectado al MONGODB");
      app.listen(5000)

    })
    .catch((err) => {
      console.log(err);
    })

