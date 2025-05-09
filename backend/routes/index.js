'use strict';

var express = require('express');
var router = express.Router();
var data = [];

router.get('/', function(req, res) {
  console.log('[GET] /car:', data)
  res.json(data);
});

router.post('/', function(req, res) {
  data.push({
    imageLink: req.body.imageLink,
    marca: req.body.marca,
    ano: req.body.ano,
    placa: req.body.placa,
    cor: req.body.cor
  });
  console.log('[POST] /car:', JSON.stringify({
    body: req.body,
    data
  }, null, 2))
  res.json({ message: 'success' });
});

router.delete('/', function(req, res) {
  data = data.filter(function(car) {
    return car.placa !== req.body.placa;
  });
  console.log('[DELETE] /car:', JSON.stringify({
    body: req.body,
    data
  }, null, 2))
  res.json({ body: data, message: 'Car(s) deleted by plate number successfully.' });
});

module.exports = router;