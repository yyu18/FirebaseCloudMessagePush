var express = require('express');
var assert = require('assert');
var router = express.Router();

    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://user1:1234@cluster0-9eyjr.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });

    client.connect(err => {
        assert.equal(null,err);
        const collection = client.db("test").collection("users");
        router.post('/insert',function(req,res){
            collection.insertOne({'name':'yihu yu','email':'hunt.yuyh@gmail.com','description':'this is a insert one test'})
                .then(result => res.send(result))
                .catch(err=>console.error('insert field'));
        })

        router.post('/findAll',function(req,res){
            collection.find({}).toArray(function(err, docs) {
                res.send(docs);
              });
        })

        router.post('/findByQuery',function(req,res){
            collection.find({'email':'hunt.yuyh@gmail'}).toArray(function(err, docs) {
                assert.equal(err,null);
                console.log(docs);
                res.send(docs);
            });
        })

        router.post('/update',function(req,res){
            collection.update({'email':'hunt.yuyh@gmail'}, {$set: {'email':'yyu18@lakeheadu.ca'}}, function(err,result) {
                assert.equal(err,null);
                console.log('Updated the document with the field email equal to hunt.yuyh@gmail.com');
                console.log(result);
            })
        })
        
        router.post('/delete',function(req,res){
            collection.deleteMany({'email':'hunt.yuyh@gmail.com'},function(err,obj){
                assert.equal(err,null);
                console.log('deleted');
            })
        })
    });

module.exports = router;