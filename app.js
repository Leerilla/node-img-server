const express = require('express')
const app = express()
const multer = require("multer")
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'uploads');
    },
    filename: (req, file, cb) =>{
        cb(null, `${Date.now()}-${file.originalname}`);
    },
})

const upload = multer({storage:storage, limits:{fileSize: 10 * 1024 * 1024}});

app.post("/upload", upload.single('img'), (req, res, next) =>{
    res.status(200).send({
        message:"업로드 완료",
        fileInfo : req.file
    })
});


app.post("/uploads", upload.array('imgs', 5), (req, res, next) =>{
    res.status(200).send({
        message:"업로드 완료",
        fileInfo: req.files
    })
});


app.get('/', (req, res)=>{
    res.send('hello');
});


app.get("/image/:name",(req,res)=>{
    const {name} = req.params;
    res.sendFile(__dirname+"/uploads/"+ name)
});


app.listen(3000,()=>{
    const dir = './uploads';
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    console.log("고끼리 서버 on");
});

