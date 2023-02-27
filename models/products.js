import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: [true, '缺少名稱']
  },
  price: {
    type: Number,
    min: [0, '價格錯誤'],
    required: [true, '缺少價格']
  },
  description: {
    type: String,
    required: [true, '缺少說明']
  },
  images: {
    type: [String],
    required: [true, '缺少圖片']
  },
  sell: {
    type: Boolean,
    required: [true, '缺少上下架狀態']
  },
  category: {
    type: String,
    required: [true, '缺少分類'],
    enum: {
      values: ['clothing', 'rechords', 'accessories'],
      message: '分類錯誤'
    }
  }
}, { versionKey: false })

export default model('products', schema)
