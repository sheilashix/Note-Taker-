var db = require("../db/db.json")
var fs = require("fs")

// route
module.exports = function (app) {
  //  GET Request
  app.get("/api/notes", function (req, res) {
    // Read the db.json file and return all saved notes as JSON
    res.json(db);
  });

  // API POST Request
  app.post("/api/notes", function (req, res) {
    // Receive a new note to save on db.json file
    db.push(req.body);
    // Add unique id to each note
    db.forEach((obj, i) => {
      obj.id = i + 1;
    });
    // Return the new note to the client
    fs.writeFile("./db/db.json", JSON.stringify(db), function () {
      res.json(db);
    });
  });

  // // API DELETE Request
  app.delete("/api/notes/:id", function (req, res) {
    var id = req.params.id;
    //  splice is used to  delete the selected note from the db array
    db.splice(id - 1, 1);
    // Reassign id for each note object
    db.forEach((obj, i) => {
      obj.id = i + 1;
    });
    // Return the remaining notes to the client
    fs.writeFile("./db/db.json", JSON.stringify(db), function () {
      res.json(db);
    });
  });
};