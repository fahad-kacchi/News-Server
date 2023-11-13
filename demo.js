publisher.create = async (req, res, next) => {
    try {
    
    const {
    pname,
    email,
    company,
    contact,
    location
    } = req.body;
    if (contact.length !== 10) {
    return res.json({
    status: false,
    message: 'contact should be of 10 digits',
    })
    
    }
    
    let resp = await Publisher.find().lean();
    //console.log("resp : ", resp)
    if (Object.keys(resp).length === 0) {
    // console.log("Inside if")
    let id = 101;
    let obj = {
    id,
    pname,
    email,
    company,
    contact,
    location
    
    };
    console.log("obj : ", obj)
    let publisherToSave = new Publisher(
    obj
    )
    let newPublisher = await publisherToSave.save()
    var folderName = req.body.pname + '/'
    var params = {
    Bucket: 'sqrstreaming',
    Key: 'Adv-Project/publishers/' + folderName,
    ACL: 'public-read',
    Body: 'body does not matter'
    };
    console.log("params=>", params);
    // console.log("data", data);
    s3.upload(params, async function (err, data) {
    if (err) {
    console.log("Error creating the folder: ", err);
    } else {
    console.log(`Successfully created a folder on S3 ${data.Location}`);
    var url = `${data.Location}`
    
    console.log("url of folder=> ", url);
    var file_key = await Publisher.findOneAndUpdate({ pname },
    {
    $set: {
    folderKey: url
    }
    }, { new: true }
    )
    console.log("filekey", file_key)
    
    }
    });
    return res.json({
    status: true,
    message: 'publisher created',
    result: newPublisher
    })
    
    } else {
    let query = {
    pname
    };
    let resp1 = await Publisher.findOne(query, {
    _id: 0
    }).lean()
    if (resp1) {
    return res.json({
    status: false,
    message: 'Publisher with same name exist'
    
    })
    
    } else {
    let query1 = {
    contact
    };
    let resp2 = await Publisher.findOne(query1, {
    _id: 0
    }).lean()
    
    if (resp2) {
    return res.json({
    status: false,
    message: 'Publisher with same contact exist '
    
    })
    } else {
    let query2 = {
    email
    };
    let resp3 = await Publisher.findOne(query2, {
    _id: 0
    }).lean()
    
    if (resp3) {
    return res.json({
    status: false,
    message: 'Publisher with same email exist '
    
    })
    } else {
    let last_id = (await Publisher.find().sort({
    _id: -1
    }).limit(1))[0].id;
    let id = last_id + 1;
    let obj = {
    id,
    pname,
    email,
    company,
    contact,
    location
    };
    let publisherToSave = new Publisher(
    obj
    )
    let newPublisher = await publisherToSave.save()
    // console.log("publisher Saved:", newPublisher);
    var folderName = req.body.pname + '/'
    
    var params = {
    Bucket: 'sqrstreaming',
    Key: 'Adv-Project/publishers/' + folderName,
    ACL: 'public-read',
    Body: 'body does not matter'
    };
    console.log("after params");
    s3.upload(params, async function (err, data) {
    if (err) {
    console.log("Error creating the folder: ", err);
    } else {
    
    console.log(`Successfully created a folder on S3 ${data.Location}`);
    var url = `${data.Location}`
    
    console.log("url of folder=> ", url);
    var file_key = await Publisher.findOneAndUpdate({ pname },
    {
    $set: {
    folderKey: url
    }
    }, { new: true }
    )
    console.log("filekey", file_key)
    
    }
    });
    
    return res.json({
    status: true,
    message: 'publisher created',
    result: newPublisher
    })
    }
    
    }
    }
    }
    } catch (error) {
    console.log('catched error:', error);
    res.json({
    status: false,
    message: error,
    result: []
    })
    // return next(error);
    }
    };