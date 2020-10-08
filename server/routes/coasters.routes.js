const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Coaster = require('../models/Coaster.model')

// Endpoints
router.get('/getAllCoasters', (req, res) => {

    Coaster.find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.get('/getOneCoaster/:coaster_id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.coaster_id)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Coaster.findById(req.params.coaster_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.post('/newCoaster', (req, res, next) => {

    Coaster.create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editCoaster/:coaster_id', (req, res, next) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.coaster_id)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Coaster.findByIdAndUpdate(req.params.coaster_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router