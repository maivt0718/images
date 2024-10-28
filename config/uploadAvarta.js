import dotenv from "dotenv";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "image_repos_avarta",
    format: async (req, file) => {
      // validate the image type
      const validImgFormat = ["png", "jpeg", "gif"];

      // get the type of file
      // abc.jpg
      // mimetype: 'image/jpeg'
      const fileFormat = file.mimetype.split("/")[1];

      // validate the correction of file type
      if (validImgFormat.includes(fileFormat)) {
        return fileFormat;
      }
      return ".png";
    },
    public_id: (req, file) => file.originalname.split(".")[0], // define the name
  },
});

export const uploadCloud = multer({ storage: storage });

