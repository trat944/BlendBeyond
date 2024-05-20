import {v2 as cloudinary} from 'cloudinary';
import config from '../config/config'
          
cloudinary.config({ 
  cloud_name: config.cloudinary.CLOUD_NAME, 
  api_key: config.cloudinary.API_KEY, 
  api_secret: config.cloudinary.API_SECRET
});

export const uploadCoverImg = async (filePath: string) => {
  return await cloudinary.uploader.upload(filePath, {folder: 'selfimages'})
}