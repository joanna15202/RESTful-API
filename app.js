// *****************
// Basic Setup
// *****************
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/wikiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model('Article', articleSchema);

// ********************************
// Request targeting all articles
// ********************************
app.route("/articles")
  .get(function(req, res) {
    // 1. Find all the documents in our collection "articles".
    //    We leave the first input (condition) empty here because we want to see all the documents.
    Article.find(function(err, foundArticles) {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    })
  })
  .post(function(req, res) {
    // 2. When a user post a new article, we will create a new object and save it into our mongoDB database.
    const newArticle = new Article({
      // 3. Because we don't have a frontend webpage for user to input data, we use postman to input contents.
      title: req.body.title,
      content: req.body.content
    })
    newArticle.save(function(err) {
      if (!err) {
        res.send("Successfully added a new article.")
      } else {
        res.send(err);
      }
    });
  })
  .delete(function(req, res) {
    Article.deleteMany(function(err) {
      if (!err) {
        res.send("Successfully deleted all articles.");
      } else {
        res.send(err);
      }
    });
  });

// ***********************************
// Request targeting specific article
// ***********************************
app.route("/articles/:articleTitle")
  .get(function(req, res) {
    Article.findOne({title: req.params.articleTitle}, function(err, foundArticle) {
      if (!err) {
        res.send(foundArticle);
      } else {
        res.send("No article was found");
      }
    });
  })
  // Update
  .put(function(req, res) {
    Article.update(
      // 1. query
      {title: req.params.articleTitle},
      // 2. Update details
      {title: req.body.title, content: req.body.content},
      // 3. Overwrite
      {overwrite: true},
      // 4. Callback
      function(err) {
        if (!err) {
          res.send("Successfully updated the article.");
        }
      }
    )
  })
  .patch(function(req, res) {
    Article.update(
      // 1. query
      {title: req.params.articleTitle},
      // 2. Use set to update only the field that we want to update
      {$set: req.body},
      // 3. No longer Overwrite
      // 4. Callback
      function(err) {
        if (!err) {
          res.send("Successfully updated the article.");
        } else {
          res.send(err);
        }
      }
    )
  })
  .delete(function(req, res) {
    Article.deleteOne(
      // 1. Condition
      {title: req.params.articleTitle},
      // 2. Callback
      function(err) {
        if (!err) {
          res.send("Successfully deleted article.")
        } else {
          res.send(err);
        }
      }
    )
  });

// *****************
// listen
// *****************
app.listen(process.env.PORT || 3000, function() {
  console.log("The server is running on port 3000");
});
