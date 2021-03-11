var express = require("express");
var app = express();
var port = 4000;
var mongoose = require("mongoose");
var url = "mongodb://localhost:27017/todo";

var Tasks = require("./schema/taskSchema");

app.use(express.json());

mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err);

    var Task = new Tasks();
    console.log("conected to db");

    app.post("/create", (req, res) => {
      Task.title = req.body.title;
      if (req.body.subtask.length > 0) {
        Task.subtask = req.body.subtask;
      } else {
        res.send("Subtask Array not found");
      }
      Task.status = req.body.status;
      Task.save((err, resp) => {
        if (err) {
          res.send(err);
        }
        res.send(resp);
      });
    });

    app.get("/read", (req, res) => {
      Tasks.find({}).exec((err, resp) => {
        if (err) {
          res.send(err);
        }

        res.send(resp);
      });
    });

    app.post("/update", (req, res) => {
      if (req.body.admin == true) {
        Tasks.findOneAndUpdate(
          { _id: req.query.id },
          { new: true },
          {
            $set: {
              title: req.body.title,
              subtask: req.body.subtask,
              status: req.body.status,
            },
          },
          (err, resp) => {
            if (err) {
              console.log(err);
              res.send(err);
            }

            res.send(resp);
          }
        );
      } else {
        res.send("Admin or ID is missing");
      }
    });
  }
);

app.get("/", (req, res) => {
  res.send("Connected");
  console.log("connected");
});

app.listen(port, () => {
  console.log("hosted at", port);
});
