const express = require('express');

const router = express.Router();

const Model = require('../models/model');

module.exports = router;

//post
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try{
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }catch(error){
        res.status(400).json({message: error.message})
    }
})

//get all
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find({});
        res.json(data);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//get by id
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//update by id
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const options = { new: true };
        const result = await Model.findByIdAndUpdate(id, req.body, options);
        res.send(result);
    }catch(error){
        res.status(400).json({message: error.message})
    }
})

//delete by id
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.send(`Document with ${data.name} has been deleted..`)
    }catch(error){
        res.status(400).json({message: error.message})
    }
})