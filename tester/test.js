import  express  from 'express';
import axios from 'axios';
import path  from 'path';
import  https from 'https';
import fs from 'fs';
import dateFormat from 'dateformat';
import   {promisify} from 'util';


const test = () => {  
  axios.get('http:///localhost:3000/test')
  .then(function (response) {
    
    console.log(response.data);
    console.log('success from test');
  })
  .catch(function (error) {
    console.log(error);
  });
}


  async function callBase64 () {  
    const url = 'http:///localhost:3000/convert64';     

    const readFileAsync = promisify(fs.readFile);    
    fs.readdirSync(path.join(path.resolve(), './samples')).forEach(async file => {    
    const filePath = path.join(path.resolve(), './samples',file);
    const fileContent64 = await readFileAsync(filePath, 'base64');
     console.log('fileContent64.length',filePath, fileContent64.length );
     
      let toTypes = ["pdf","png"];
      toTypes.forEach(type => {
         let data = {
           contentAs64:fileContent64,
           fileName:path.basename(file),
           ext:type
         }      
         axios.post(url,data)
         .then(async function (response) {
           console.log('response.data on client:' +response.data.length);       
           const resBuffer = Buffer.from(response.data, 'base64');                
           let  timeStamp=dateFormat(new Date(), "dd_mm_yyyy_HH_MM_ss");
           const fileNameExt = `${data.fileName}_${timeStamp}.${data.ext}`;
           fs.promises.writeFile('./uploads/' + fileNameExt, resBuffer);        
           //console.log('success from api callBase64');
         })
         .catch(function (error) {
           console.log(error);
         });
       });


      });
    
    }
  


  


 // callConvert();
//test();


callBase64();


//  async function callConvert () {  
//   const url = 'http:///localhost:3000/convert';
//   const formData = new FormData();
//   const fileToSend = path.join(path.resolve(), '../server/samples/test.docx');  
  
//   const fromBuff  =  await fs.promises.readFile(fileToSend).then((data) => {
//       console.log('data.lengh', data.length );
//       return data;
//     });


//   formData.append('file',fromBuff)
//   formData.append('fileName','filxx.docx');
//   formData.append('ext','pdf');

//   const config = {
//       headers: {
//           'content-type': 'multipart/form-data'
//       }
//   }
//   //return  post(url, formData,config)

//     axios.post(url,formData,config)
//     .then(function (response) {
//       console.log(response.data);
//     console.log('success from callConvert');
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//   }
