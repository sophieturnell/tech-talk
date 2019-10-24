const Event = require('../models/Event')

function index(req, res) {
  Event
    .find()
    .then(events => res.status(200).json(events))
    .catch(() => res.status(404).json({ message: 'Not Found' }))
}

function show(req, res) {
  Event
    .findById(req.params.id)
    .then(event => {
      if (!event) return res.status(404).json({ message: 'Not Found' })
      res.status(200).json(event)
        .catch(() => res.status(404).json({ message: 'Not Found' }))
    })
}

function create(req, res) {
  Event
    .create(req.body)
    .then(event => res.status(201).json(event))
    .catch(err => console.log(err))
}

function update(req, res) {
  Event
    .findById(req.params.id)
    .then(event => {
      if (!event) return res.status(404).json({ message: 'Not Found' })
      return event.set(req.body)
    })
    .then(event => event.save())
    .then(event => res.status(202).json(event))
    .catch(err => res.status(422).json(err))
}


module.exports = { create, index, show, update }