var express = require('express');
const t = require("../helper/telguarder");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message: 'Tel Guarder'});
});

router.get('/telguarder', async function(req, res, next) {
  const telguarderResp =await  t.telguarder(req.query.number ? req.query.number : "");
  res.json({message: telguarderResp});
});

module.exports = router;
