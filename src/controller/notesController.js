const tareasModel = require("../model/tareasModel");


// obtener todas las tareas
const getAllTask = async (req, res) => {
    try {
        const tareas = await tareasModel.find();

        if(tareas) {

            return res.status(200).send(tareas);

        } else {
            return res.status(404).send({message: error});
        }

    } catch (error) {
        return res.status(404).send({message: error});
    }
}

// Obtener una tarea
const getOneTask = async (req, res) => {

    try {
        const {id} = req.params;
        const oneTask = await tareasModel.findById(id);

        if ( !oneTask ) {
            return res.status(404).send({message: "Tarea no encontrada."});
        }
        res.status(200).send(oneTask);

    } catch (error) {
        return res.status(500).json({message: error.message});
    }

}

// ingresar una tarea
const createNote = async(req, res) => {
    const title = req.body.title;

    if(!title) {
        return res.status(300).send('Todos los campos son obligatorios.');
    }

    const saveInfo = new tareasModel({
        title
    });

    try {

        await saveInfo.save();
        res.status(201).send(saveInfo);

    } catch (err) {
        return res.status(501).send({message: err});
    }

}

// editar una terea
const editNote = async (req, res) => {

    try {
        const {id} = req.params;

        const note = await tareasModel.findByIdAndUpdate(id, req.body);

        if(!note) {
            return res.status(404).send({message: "Tarea no encontrada"});
        }

        const updateNote = await tareasModel.findById(id);
        res.status(200).send({updateNote});
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

 
// eliminar una tarea
const deleteNote = async (req, res) => {

    try {
        const {id} = req.params;

        const note = await tareasModel.findByIdAndDelete(id);

        if(!note) {
            return res.status(404).send({message: "Tarea no encontrada"});
        }

        const deletedNote = await tareasModel.findById(id);
        res.status(200).send({deletedNote});
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}


module.exports = { getAllTask, createNote, editNote, deleteNote, getOneTask };