const mongoose = require("mongoose")

const Person = mongoose.model("Person", {
    dni : Number,
    apellidos : String,
    nombres : String,
    edad : Number,

})



module.exports = Person