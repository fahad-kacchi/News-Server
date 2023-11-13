var _ = require('lodash');
const CustDetail = require('../models/customer');
const FType=require('../models/customer')
var config = require('../config');
const express = require('express');
const app = express();
var custDetail = {};


custDetail.index = function (req, res, next) {
    var query = {};
    var sort = {};
    if (req.query.sort) {
        req.query.sort =
            typeof req.query.sort === 'string' ? [req.query.sort] : req.query.sort;
        sort = {};
        _.each(req.query.sort, function (key) {
            var temp = key.split(';');
            if (!temp[1]) {
                sort[temp[0]] = 'asc';
            } else {
                var tempVal =
                    temp[1].indexOf('desc') > -1 || temp[1].indexOf('-1') > -1 ?
                    'desc' :
                    'asc';
                sort[temp[0]] = tempVal;
            }
        });
    } else {
        sort = {
            'date': 'asc'
        };
    }
    query = req.query
    console.log(query);
    FType.find(query)
        .sort(sort)
        .lean()
        .exec(async function (err, results) {
            if (err) return next(err);
            return res.json({
                status: true,
                message: 'Customer list',
                result:results
            });
        });
};


custDetail.create = async function (req, res, next) {
    try {
        console.log("config file : ",require('../config'))
        const {custName,number,email,rewardPoints} = req.body;
        var query = {number,email};
        console.log("Cons : ",query)
        let resp = await CustDetail.findOne(query).lean();
        console.log("Resp : ",resp)

        if (!resp) {
          
            let obj = req.body;
            let FileToSave = new FType(obj)
            var newFile = await FileToSave.save()
            console.log("file Saved:", newFile);
            res.json({
                status: true,
                message: 'Customer Registered Successfully',
                result: newFile
            })
        }
         else {
            res.json({
                status: false,
                message: 'Email or Contact Number is already registered',
                result: {}
            })
        }
    } catch (error) {
        console.log("Error : ",error)
        res.json({
            status: false,
            message: 'Email or Contact Number is already registered',
            result: {}
        })
        //return next(error);
    }
};


custDetail.getUsers = async function(req, res, next) {
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


custDetail.removeOne=async function(req,res,next){
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


custDetail.update = async function (req, res, next) {
    try {
      console.log("ID : ", req.params.id);
      // Validate Request
      if (!req.body) {
        return res.status(400).send({
          message: "Customer Details to be updated can not be empty",
        });
      }
  
      // Find note and update it with the request body
      let resp = await CustDetail.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      console.log("RESPONSE : ", resp);
      if (!resp) {
        console.log("Unable to update Customer");
        res.json({
          status: false,
          message: "Failed to update Customer",
          result: {},
        });
      } else {
        console.log("Customer updated...");
        res.json({
          status: false,
          message: "Customer updated successfully",
          result: resp,
        });
      }
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "File not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error updating file with id " + req.params.id,
      });
    }
  }


  custDetail.weblogin = async function (req, res, next) {
    try {
    const {
      custName,
    number
    } = req.body;
    var query = {
      custName,
      number
    };  
    console.log("QUERY : ",query)
    let resp = await CustDetail.findOne(query).lean();
    if (!resp) {
    console.log('Customer Found empty, demo doc for: ', number);
    return res.json({
    status: false,
    message: 'Customer not found or Invalid credentials',
    result: {}
    })
    }
    console.log('webloginresp:', resp);
    
    return res.json({
    status: true,
    message: 'Login Successfull',
    result: resp,
    })
    } catch (error) {
    console.log('catched errors:', error);
    next(error)
    }
    }


   


module.exports = custDetail;