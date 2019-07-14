var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  const collection = req.db.get('notes');
  collection.find({}, {}, (e, docs) => {
    res.render('notes', {
      title: 'Add a note',
      noteList: docs
    })
  })
});

router.post('/add', (req, res) => {
  const db = req.db;

  const noteTitle = req.body.noteTitle;
  const noteBody = req.body.noteBody;

  const collection = db.get('notes');

  collection.insert({
    "noteTitle": noteTitle,
    "noteBody": noteBody
  }, (err, doc) => {
    if (err) {
      res.send('Something went wrong');
    } else {
      res.redirect('/notes');
    }
  });
});

module.exports = router;
