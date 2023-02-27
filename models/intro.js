import { Schema, model } from 'mongoose'

const schema = new Schema({
  intro: {
    type: String,
    required: [true, '請輸入介紹']
  },
  banners: {
    type: [String],
    required: [true, '缺少圖片']
  }
}, { versionKey: false })

export default model('intro', schema)
