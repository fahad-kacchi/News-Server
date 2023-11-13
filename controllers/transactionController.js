var _ = require('lodash');
const CustDetail = require('../models/transaction');
const FType=require('../models/transaction')
var config = require('../config');
const express = require('express');
const app = express();
var transDetail = {};


transDetail.index = function (req, res, next) {
    var query = {};
    var sort = {};
    if (req.query.sort) {
      req.query.sort =
        typeof req.query.sort === "string" ? [req.query.sort] : req.query.sort;
      sort = {};
      _.each(req.query.sort, function (key) {
        var temp = key.split(";");
        if (!temp[1]) {
          sort[temp[0]] = "desc";
        } else {
          var tempVal =
            temp[1].indexOf("asc") > -1 || temp[1].indexOf("-1") > -1
              ? "desc"
              : "asc";
          sort[temp[0]] = tempVal;
        }
      });
    } else {
      sort = {
        date: "desc",
      };
    }
    query = req.query;
    console.log(query);
    CustDetail.find(query)
      .sort(sort)
      .lean()
      .exec(async function (err, results) {
        if (err) return next(err);
        return res.json({
          status: true,
          message: "Transaction list",
          results,
        });
      });
};


transDetail.create = async function (req, res, next) {
    try {
        console.log("config file : ",require('../config'))
        const {custId,otp,publisherId,amount,transStatus,discount} = req.body;
        var query = {custId,otp,publisherId,amount,transStatus,discount};
        console.log("Cons : ",query)
        let obj = req.body;
        let FileToSave = new CustDetail(obj)
        var resp = await FileToSave.save()
        console.log("Resp : ",resp)
        if (!resp) {
           return res.json({
                status: false,
                message: 'Unable to create Transaction',
                result: {}
            })
            
        }
         else {
            
            console.log("file Saved:",resp);
           return res.json({
                status: true,
                message: 'Transaction In Process',
                result: resp
            })
        }
    } catch (error) {
        console.log("Error : ",error)
        res.json({
            status: false,
            message: 'Transaction existed , try with another Details',
            result: {}
        })
        //return next(error);
    }
};


transDetail.getUsers = async function(req, res, next) {
    if (!req.params.id && _.isEmpty(req.params.id)) {
        console.log(" file type is missing")
      res.json({
        success: 'false',
        message: 'Contact Number is missing'
      });
    }
    FType.find(
      {
        id: req.params.id,
        deletedUser: false
      }
    )
      .exec(function(err, List) {
        if (err) {
          return res.send(err);
        }
        if (Array.from(List).length) {
            console.log("Users found")
          res.json(List);
        } else {
            console.log('Users are empty')
          res.json({
            message: 'Users are empty'
          });
        }
      });
  };


transDetail.removeOne=async function(req,res,next){
    try{
        if (!req.params.id && _.isEmpty(req.params.id)) {
            console.log("id is missing")
          res.json({
            success: 'false',
            message: 'id is missing'
          });
        }
        let obj=req.params.id
        console.log("PARAMS : ",{obj})
        let resp=await FType.findOneAndDelete({_id:obj},{deletedUser:false})
        .exec(async function (err, rest) {
            if (err) return next(err);
            return res.json({
                status: true,
                message: 'Type deleted',
                results:{obj}
            });
        });
    }
    catch(err)
    {
        console.log("Error : ",err)
    }
}


transDetail.update = async function (req, res, next) {
  try {
      console.log("ID : ", req.params.id);
      // if (!req.body) {
      //     return res.status().send({
      //         message: "Customer Details to be updated can not be empty",
      //     });
      // }
      let resp = await CustDetail.findByIdAndUpdate(req.params.id, req.body, {
          new: true
      });
      console.log("RESPONSE : ", resp);
      if (!resp) {
          console.log("Unable to update Customer");
          return res.json({
              status: false,
              message: "Failed to update Customer",
              result: {},
          });
      } else {
          console.log("Customer updated...");
          return res.json({
              status: false,
              message: "Customer updated successfully",
              result: resp,
          });
      }
  } catch (err) {
    console.log("Error=> ",err)
      return res.status().send({
          message: "Error updating file with id " + req.params.id,
      });
  }
}



  transDetail.getInitate = async function(req, res, next) {
    try{
      CustDetail.find(
       {
        transStatus:'Completed'
     })
       .exec(function(err, userList) {
         if (err) {
           return res.send(err);
         }
         if (Array.from(userList).length) {
             console.log("Transaction found")
           res.json(userList);
         } 
         else {
             console.log('Transaction are ',userList)
           res.json({
             message: 'Transaction are',
             result:userList
           });
         }
       });}
       catch(err){
         console.log("Error : ",err)
         res.json({status:false,message:'Error occured',result:err})
   
       }
   };



  transDetail.showOne = async function (req, res, next) {
    try {
    const {
    custID
    } = req.body;
    var query = {
    custID
    };
    let resp = await CustDetail.find(query).lean()
    console.log("resp=> ", resp);
    if (!resp) {
    return res.json({
    status: false,
    message: "tranDetail Not found ",
    result: {}
    });
    } else {
    // console.log('resp:', resp);
    return res.json({
    status: true,
    message: "tranDetail found successfully",
    result: resp,
    });
    }
    
    } catch (error) {
    console.log("catched error: ", error)
    }
    }

    transDetail.showInitiated = async function (req, res, next) {
      try {
      const {
      custID,transStatus
      } = req.body;
      var query = {
      custID,transStatus
      };
      let resp = await CustDetail.find(query).lean()
      console.log("resp=> ", resp);
      if (!resp) {
      return res.json({
      status: false,
      message: "tranDetail Not found ",
      result: {}
      });
      } else {
      // console.log('resp:', resp);
      return res.json({
      status: true,
      message: "tranDetail found successfully",
      result: resp,
      });
      }
      
      } catch (error) {
      console.log("catched error: ", error)
      }
      }

      transDetail.showComplete = async function (req, res, next) {
        try {
        const {
        transStatus
        } = req.body;
        var query = {
        transStatus
        };
        let resp = await CustDetail.find(query).lean()
        console.log("resp=> ", resp);
        if (!resp) {
        return res.json({
        status: false,
        message: "tranDetail Not found ",
        result: {}
        });
        } else {
        // console.log('resp:', resp);
        return res.json({
        status: true,
        message: "tranDetail found successfully",
        result: resp,
        });
        }
        
        } catch (error) {
        console.log("catched error: ", error)
        }
        }






module.exports = transDetail;