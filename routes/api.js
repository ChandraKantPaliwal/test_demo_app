var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res) {
//  res.render('index', { title: 'Express', name:'yoyoyo' });
//});

router.get('/roles', function(req, res) {
      var permission_collection = db.collection("permissions");
      permission_collection.find(function(err, permission_list){
        if(err){
          req.jsonp(500, {"sucess":false, message: "internal error"});
        }
        else{
          res.jsonp(200, {"sucess":true, message:"", "permission_list":permission_list});
        }
      });
});

router.get('/user', function(req, res) {
  var user_collection = db.collection("users");
  user_collection.find(function(err, users){
    if(err){
      req.jsonp(500, {"sucess":false, message: "internal error"});
    }
    else{
      var permission_collection = db.collection("permissions");
      permission_collection.find(function(err, permission_list){
        if(err){
          req.jsonp(500, {"sucess":false, message: "internal error"});
        }
        else{
          res.jsonp(200, {"sucess":true, message:"", "user_details":users, "permission_list":permission_list});
        }
      });
    }
  });
});

router.get('/user/:id', function(req, res){
  var user_collection = db.collection("users");
  user_collection.findOne({_id:mongojs.ObjectId(req.params.id)}, function(err, users){
    if(err){
      req.jsonp(500, {"sucess":false, message: "internal error"});
    }
    else{
      var permission_collection = db.collection("permissions");
      permission_collection.find(function(err, permission_list){
        if(err){
          req.jsonp(500, {"sucess":false, message: "internal error"});
        }
        else{
          res.jsonp(200, {"sucess":true, message:"", "user_details":users, "permission_list":permission_list});
        }
      });
    }
  });
});

router.post('/user', function(req, res) {
  var user_collection = db.collection("users");
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var age = req.body.age;
  var sex = req.body.sex;
  var email = req.body.email;
  var password = req.body.password;
  var permission_id = req.body.permission_id;

  password = crypto.createHash('md5').update(password).digest('hex');

  user_collection.save({first_name:first_name, last_name:last_name, age:age, sex: sex, email:email, password:password, permission_id:permission_id}, function(err, docs){
    if(err){
      req.jsonp(500, {"sucess":false, message: "internal error"});
    }
    else{
      res.jsonp(200, {"sucess":true, message:"user registered sucess !"});
    }
  });
});

router.put('/user', function(req, res) {
  console.log(req.body);
  var user_collection = db.collection("users");
  var id = req.body.id;
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var age = req.body.age;
  var sex = req.body.sex;
  var email = req.body.email;
  var password = req.body.password;
  var permission_id = req.body.permission_id;

  password = crypto.createHash('md5').update(password).digest('hex');

  user_collection.update({_id:mongojs.ObjectId(id)}, {$set: {first_name:first_name, last_name:last_name, age:age, sex: sex, email:email, password:password, permission_id:permission_id}}, function(err, docs){
    if(err){
      req.jsonp(500, {"sucess":false, message: "internal error"});
    }
    else{
      console.log(docs);
      res.jsonp(200, {"sucess":true, message:"user updated sucessfull"});
    }
  });
});


router.delete('/user/:id', function(req, res){
  var user_collection = db.collection("users");
  user_collection.remove({_id:mongojs.ObjectId(req.params.id)}, function(err, users){
    if(err){
      req.jsonp(500, {"sucess":false, message: "internal error"});
    }
    else{
      console.log(users);
      res.jsonp(200, {"sucess":true, message:"user removed successfully"});
    }
  });
});

router.post('/login', function(req, res) {
  var colc_ref = db.collection("users");
  console.log(req.body);
  colc_ref.find({email:req.body.email, password:req.body.password}, function(err, docs){
    if(err){
      req.jsonp(500, {"sucess":false, message: "internal error"});
    }
    else{
      if(docs.length>0){
        res.jsonp(200, {"sucess":true, "message":"login sucessfull", "result":docs});
      }
      else{
        res.jsonp(404, {"sucess":false, "message":"invalid access"});
      }
    }
  });
});

module.exports = router;