const mongoose = require("mongoose")

const Person = mongoose.model("Person", {
    name : String,
    salary : Number,
    age : Number,
    approved : Boolean,

})



module.exports = Person