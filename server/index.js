'use strict';
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import dateFormat from 'dateformat';
import { convert } from './converter.js';

const upload = multer({ dest: 'uploads/' });
const app = express();
//app.use(bodyParser.json());


const port = 3000;


app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));
app.use(bodyParser.text({ limit: '200mb' }));

// app.use(express.json({ limit: '200mb' }));
// app.use(express.urlencoded({ limit: '200mb', extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/test', (req, res) => {
  console.log('test');
  res.send('Hello test!')
})


app.post('/convert64',  async (req, res) => {
  const body = req.body;
  console.log('process : ',body.fileName, body.ext); 
  const buffer = Buffer.from(body.contentAs64, 'base64');  
  const buffConverted = await convert(buffer, body.fileName, body.ext || 'pdf');
  console.log('buffConverted length: ',buffConverted.length);
  var u8 = new Uint8Array(buffConverted);
  var b64 = Buffer.from(u8).toString('base64');  
  console.log('b64 length: ',b64.length);  
  res.status(200).json(b64);    
})

// app.post('/convert', upload.single('file'), async (req, res) => {
//     // The req.file will contain your file data
//     // The req.body will contain your text data
//     console.log(req.file, req.body,req.body.ext );
    
//     res.status(200);//.json(buff.length);
//     const buff = await convert(req.file.filename, req.body.fileName, req.body.ext || 'pdf');
//     // console.log(req.file, req.body.fileName);
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
