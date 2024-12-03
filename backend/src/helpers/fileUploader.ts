import {v2 as cloudinary} from "cloudinary"
import config from "../config"
import multer from "multer"
import path from "path"
import fs from "fs"
import { TCloudinaryResponse, TFile } from "../app/types/file"

cloudinary.config({
  cloud_name: config.cloudinary_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_secret
})

const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null, path.join(process.cwd(), 
  "uploads"))
  },
  filename: function(req, file, cb){
    cb(null, file.originalname)
  }
})

const upload = multer({storage: storage})

const uploadToCloudinary = async(file: TFile):Promise<TCloudinaryResponse | undefined> =>{
  return new Promise((resolve, reject ) => {
    cloudinary.uploader.upload(file.path, 
      (error: Error, result: TCloudinaryResponse) =>{
        fs.unlinkSync(file.path)
        if(error){
          reject(error)
        } else{
          resolve(result)
        }
      }
    )
  })
}


export const fileUploader = {
  upload, uploadToCloudinary
}