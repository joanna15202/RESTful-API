## 👋 Introduction 

#### This wiki RESTful API supports CRUD (Create, Read, Update, Delete) operations simulates wiki functions. 



## 👀 Overview

Take a look at this project's `app.js` file for inplementing CRUD operations.  


## 💾 Example Documents

```
{
    "_id" : ObjectId("5c139771d79ac8eac11e754a"),
    "title" : "API",
    "content" : "API stands for Application Programming Interface. It is a set of subroutine definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer."
}


{
    "_id" : ObjectId("5c1398aad79ac8eac11e7561"),
    "title" : "Bootstrap",
    "content" : "This is a framework developed by Twitter that contains pre-made front-end templates for web design"
}


{
    "_id" : ObjectId("5c1398ecd79ac8eac11e7567"),
    "title" : "DOM",
    "content" : "The Document Object Model is like an API for interacting with our HTML"
}
```

## ⚙️ Attributes

The wiki API contains the following attributes: <br>
* `"title"` <br>
* `"content"` <br>


## 🛠 Functions

The following lists the RESTful routes:
```
Endpoint                   Methods  Rule                                Description
------------------------   -------  ----------------------------        -------------------------
localhost:3000/articles    GET      /                                   Get a all the saved articles in json format.
localhost:3000/articles    POST     /                                   Create a new article and add it to the database.
localhost:3000/articles    DELETE   /                                   Delete all the articles.
localhost:3000/articles    GET      /articles/<articleTitle>            Get an article with specific query in title.
localhost:3000/articles    PUT      /articles/<articleTitle>            Update a specific article completely.
localhost:3000/articles    PATCH    /articles/<articleTitle>            Update a specific article only on requested fields.
localhost:3000/articles    DELETE   /articles/<articleTitle>            Delete a specific article completely.

```
