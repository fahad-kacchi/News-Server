const fs = require('fs');
const AWS = require('aws-sdk');
const ID = 'AKIA34REM35IOUCUFRPX';
const SECRET = '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'
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const uploadFile = (fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = { 
        Bucket: 'sqrstreaming',
        Prefix: 'Adv-Project/',
        Key: 'videoplay', // File name you want to save as in S3 
        Body: fileContent,
        ContentType: 'mp4'
    };

    // Uploading files to the bucket
    s3.upload(params, function (err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

uploadFile('videoplayback.mp4')