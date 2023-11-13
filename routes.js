
var express = require("express");
var router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});
console.log(" Storage ", storage);
const upload = multer({ storage }).single("music");
// console.log('Upload  ',upload);



var custDetailController = require("./controllers/custDetailController"); 
var transDetailController = require("./controllers/transactionController"); 
var notifyServiceController = require("./controllers/notifyServiceController");  
var newsController = require("./controllers/newsController");
var newsEventController = require("./controllers/newsEventController");
var userController = require("./controllers/userController");
var feedbackController = require("./controllers/feedbackController");

router.get("/newList", newsController.index);//List Employee
router.post("/newCreate", newsController.create); // Employee Creation 
router.put("/updateNewsById/:id", newsController.update); //Update Employee By Id
router.delete("/removeNews/:id", newsController.removeOne);//Remove Employee
router.post("/Login", newsController.weblogin);//Login 
router.post("/getEmployee", newsController.showOne);//Search Employee by email

router.get("/eventList", newsEventController.index);//List News
router.post("/eventCreate", newsEventController.create);//News Create
router.put("/updateEventById/:id", newsEventController.update); //Update News By Id 
router.delete("/removeEvent/:id", newsEventController.removeOne);//Remove news ny id
router.post("/eventLogin", newsEventController.weblogin);//Ignore
router.post("/getEvent", newsEventController.showOne);//Search by Location
router.post("/getNewsType", newsEventController.showNews);//Search by Type
router.post("/getEventById", newsEventController.showById);//comment

router.get("/userList", userController.index);//List User
router.post("/userCreate", userController.create);//News User
router.put("/updateUserById/:id", userController.update); //Update User By Id 
router.delete("/removeUser/:id", userController.removeOne);//Remove User ny id
router.post("/getUser", userController.showOne);//

router.get("/userList", userController.index);//List User
router.post("/userCreate", userController.create);//News User
router.put("/updateUserById/:id", userController.update); //Update User By Id 
router.delete("/removeUser/:id", userController.removeOne);//Remove User ny id
router.post("/getUser", userController.showOne);//
router.post("/userLogin", userController.weblogin);//Ignore

router.get("/feedbackList", feedbackController.index);//List User
router.post("/feedbackCreate", feedbackController.create);//News User
router.put("/updateUserfeedbackById/:id", feedbackController.update); //Update User By Id 
router.delete("/removeUserfeedback/:id", feedbackController.removeOne);//Remove User ny id
router.post("/getUserfeedback", feedbackController.showOne);//


// Not In Use
// router.get("/custDetails", custDetailController.index);
// router.get("/custDetails/:id", custDetailController.getUsers);
// router.post("/custDetails", custDetailController.create);
// router.delete("/removeCustomer/:id", custDetailController.removeOne);
// router.put("/updateCustomerById/:id", custDetailController.update); 
// router.post("/custLogin", custDetailController.weblogin);

// router.get("/notify", notifyServiceController.index);
// router.post("/notify", notifyServiceController.create);
// router.put("/updateNotifyById/:id", notifyServiceController.update); 
// router.get("/notifyById/:id", notifyServiceController.getUsers);
// router.post("/showNotify", notifyServiceController.showOne);

// router.get("/transDetails", transDetailController.index);
// router.get("/transDetails/:id", transDetailController.getUsers);
// router.post("/transDetails", transDetailController.create);    
// router.delete("/removeTrans/:id", transDetailController.removeOne);
// router.put("/transDetailsUpdate/:id", transDetailController.update);
// router.get("/transDetails/Completed", transDetailController.getInitate); 
// router.post("/showtrans", transDetailController.showOne); 
// router.post("/showInit", transDetailController.showInitiated);
// router.post("/showCom", transDetailController.showComplete);  



module.exports = router;   
