const Person = require("./models/Person")

//Delete
app.delete('/person/:id', async (req,res) => {
    const id = req.params.id
    //const person = await Person.findOne( {_id:id})
    await Person.deleteOne({_id: id})
    if(!person) {
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