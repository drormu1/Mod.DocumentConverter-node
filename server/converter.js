import libre from 'libreoffice-convert';
import { promisify } from 'util';
import fs from 'fs';
import {exec} from 'child_process';
import dateFormat from 'dateformat';

libre.convertAsync = promisify(libre.convert);

export async function convert(buffer,fileName, ext = 'pdf'){
    

    //console.log('proccsing:' , fileName, ext);
      ext = ext.toLowerCase();
   //   const fromBuff  =  await fs.promises.readFile('./uploads/' + fileId).then((data) => {
   //      console.log('data.lengh', data.length );
   //      return data;
   //   });

     //libreOfficePortable.exe --headless --convert-to png "C:\Users\adm_user\Desktop\ggg.pptx" --outdir D:\PortableApps\LibreOfficePortable
     let resBuffer = await libre.convertAsync(buffer, "." +ext, undefined);
    
     //await fs.promises.unlink('./uploads/' + fileId).then(() => {
       // console.log('deleting:',fileId);
     //   return;
    // });



    //await execShellCommand(`"C:\\Program Files\\LibreOffice\\program\\soffice.exe" --headless --convert-to ${ext} .\\uploads\\${fileId}  --outdir .\\uploads\\${fileId}.pdf`)
     return resBuffer;
}

function execShellCommand(cmd) {
    // const exec = require('child_process').exec;
    return new Promise((resolve, reject) => {
     exec(cmd, (error, stdout, stderr) => {
      if (error) {
       console.warn(error);
      }
      resolve(stdout? stdout : stderr);
     });
    });
}