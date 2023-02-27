import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const upload = multer({
  storage: new CloudinaryStorage({ cloudinary }),
  fileFilter (req, file, cb) {
    if (!file.mimetype.startsWith('image')) {
      cb(new multer.MulterError('LIMIT_FILE_FORMAT'), false)
    } else {
      cb(null, true)
    }
  },
  limits: {
    fileSize: 10485760
  }
})

export const imageUpload = async (req, res, next) => {
  upload.single('image')(req, res, error => {
    if (error instanceof multer.MulterError) {
      console.log(error)
      let message = '上傳錯誤'
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else if (error.code === 'LIMIT_FILE_FORMAT') {
        message = '檔案格式錯誤'
      }
      res.status(400).json({ success: false, message })
    } else if (error) {
      res.status(500).json({ success: false, message: '未知錯誤' })
    } else {
      next()
    }
  })
}

export const productUpload = async (req, res, next) => {
  upload.fields([
    { name: 'images', maxCount: 12 }
  ])(req, res, error => {
    if (error instanceof multer.MulterError) {
      let message = '上傳錯誤'
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else if (error.code === 'LIMIT_FILE_FORMAT') {
        console.log(error)
        message = '檔案格式錯誤'
      }
      res.status(400).json({ success: false, message })
    } else if (error) {
      res.status(500).json({ success: false, message: '未知錯誤' })
    } else {
      next()
    }
  })
}

export const bannerUpload = async (req, res, next) => {
  upload.fields([
    { name: 'banners', maxCount: 5 }
  ])(req, res, error => {
    if (error instanceof multer.MulterError) {
      let message = '上傳錯誤'
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else if (error.code === 'LIMIT_FILE_FORMAT') {
        message = '檔案格式錯誤'
      }
      res.status(400).json({ success: false, message })
    } else if (error) {
      console.log(error)
      res.status(500).json({ success: false, message: '未知錯誤' })
    } else {
      next()
    }
  })
}