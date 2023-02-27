import { Schema, model } from 'mongoose'

const schema = new Schema({
  image: {
    type: String,
    required: [true, '缺少圖片']
  },
  title: {
    type: String,
    required: [true, '缺少標題']
  },
  date: {
    type: String,
    required: [true, '缺少日期']
  },
  description: {
    type: String,
    required: [true, '缺少描述']
  },
  display: {
    type: Boolean,
    required: [true, '缺少顯示狀態']
  },
  artist: {
    type: String,
    enum: {
      values: ['Sabrina Band', 'Coastal Kanpai', 'Yellow Flower', 'Faye Hong'],
      message: '分類錯誤'
    },
    required: [true, '缺少演出者']
  },
  links: {
    type: [
      {
        linkType: {
          type: String,
          enum: {
            values: ['yt', 'sv', 'st', 'else'],
            message: '分類錯誤'
          },
          required: [true, '缺少連結分類']
        },
        link: {
          type: String,
          required: function () {
            return !!this.links && this.links.length > 0
          },
          message: '缺少連結網址'

        }
      }
    ],
    default: []
  }
}, { versionKey: false })

export default model('works', schema)
