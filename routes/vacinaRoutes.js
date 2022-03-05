// importing the express library but destructuring just the Router logic
const { Router } = require("express");

// create a new router
const router = new Router();
const Vacina = require("../models/vacinaModels");
const verifyToken = require("../middlewares/verifyToken");

// vacina/create
  router.post("/create", async  (req, res) => {

    try {

      var vacina = new Vacina(req.body);
      if (!vacina) return res.status(409).send('Os dados já existem.');
      vacina.save();
      return res.status(200).send(vacina);

    } catch (err) {
      res.status(500).send('Internal Server Error');
    }

  });

// vacina/list
  router.get("/list", async (req, res) => {
      try {
        // check if any vacina exists 
        const vacina = await Vacina.find();
        //console.log(vacina);
        if (!vacina) return res.status(409).send('No vacina exists.');
        return res.status(200).send(vacina);
      } catch (err) {
        res.status(500).send('Internal Server Error');
      }
  });
 

  router.get("/media",  (req, res) => {
    Vacina.aggregate([
      {$group: {"_id":"", media: {$avg: '$nVacinados'}}}
    ], function (err, result) {
      if (err) { throw  err; }

      //console.log('Media: ' + result[0].media);
      res.send(result[0].media.toFixed(0));
    })	
  });

  router.get("/soma",  function (req, res) {
    
    Vacina.get(function(err, result) {
      if(err){ throw err; }
      var calcSomaN = result.reduce((sum, cn) => {
        return sum + cn.nVacinados;
      }, 0);
      //console.log('CalcSomaN: ' + calcSomaN);
      res.json(calcSomaN);
    });
  });

  router.get("/list_vacinados", function(req, res) {

    Vacina.get(function(err, result) {
      if(err){ throw err; }
      var casosLista = [];

      for(var i = 0; i< result.length; i++){
         casosLista.push(result[i].nVacinados);
      }
      res.send(casosLista);
    })
  })

  router.get("/max",  (req, res) =>{
    Vacina.get(function(err, result){
      //if(err){ return res.send(err)}
      var max = Number.NEGATIVE_INFINITY;
      var data;
      for(var i = 0; i < result.length; i++){
        if(max < result[i].nVacinados){
          max = result[i].nVacinados;
          data = result[i].data;
        }
      }
      res.json(max);
    })
  });

  router.get("/min",  (req, res) => {
    Vacina.get(function(err, result){
      //if(err){ return res.send(err)}
      var min = Infinity;
      var data;

      for(var i = 0; i < result.length; i++){
        if(min > result[i].nVacinados){
          min = result[i].nVacinados;
          data = result[i].data; 
        }
      }
      res.json(min);
    })
  });

  router.get("/search/data",async (req, res) => {
    try {
      const query = req.query;
      // check if any total exists 
      const vacina = await Vacina.find(query);
      if (!vacina) return res.status(409).send('No vacinas exists.');
      return res.status(200).send(vacina);
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  });

  router.get("/search/vacina",async (req, res) => {
    try {
      const query = req.query;
      // check if any total exists 
      const vacina = await Vacina.find(query);
      if (!vacina) return res.status(409).send('No vacinas exists.');
      return res.status(200).send(vacina);
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  });

  router.get("/search/vacina",async (req, res) => {
    try {
      const query = req.query;
      // check if any total exists 
      const vacina = await Vacina.find(query);
      if (!vacina) return res.status(409).send('No vacinas exists.');
      return res.status(200).send(vacina);
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  });

  router.put("/update/:_id", async (req, res) => {

    Vacina.findById(req.params._id, function (err, data) {
      if (!data) {
        res.send({ "Error": "Data not found" });
        return false;
      }
  
      if (err) {
        res.send(err);
      }
  
  
      data.data = req.body.data || data.data;
      data.nomeVaina = req.body.nomeVaina || data.nomeVaina;
      data.nVacinados = req.body.nVacinados || data.nVacinados;
      data.localVacinacao = req.body.localVacinacao || data.localVacinacao;
      
  
      data.save(function (err) {
        if (err)
          res.json(err)
        console.log(`Vacina ${data.nomeVaina} Updated Successfully!`);
        res.send(data);
      });
    });
  });

  router.delete("/delete/:_id", async (req, res) => {

    Vacina.deleteOne({
      _id: req.params._id
    }, function (err, data) {
      if (data.deletedCount < 1) {
        res.send({ "Error": "Data not found" });
        return false;
      }
  
      if (err) {
        res.send(err)
      }
      res.json({
        message: ` Deleted Successfully!`,
        row: data.deletedCount
      })
    })
  
  });




module.exports = router;