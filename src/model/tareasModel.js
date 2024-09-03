const mongoose = require('mongoose');

// Crear esquema de tareas
const tareaSchema = new mongoose.Schema({
    title: {type: String, required: true},
    done: {type: Boolean, default: false},    
},
{timestamps: true}
);

module.exports = mongoose.model('todo_elms', tareaSchema);