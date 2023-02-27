import intro from '../models/intro.js'

// export const createIntro = async (req, res) => {
//   try {
//     const banners = []
//     if (req.files.banners) {
//       req.files.banners.forEach((item) => {
//         banners.push(item.path)
//       })
//     }
//     if (typeof req.body.banners === 'string') {
//       banners.push(req.body.banners)
//     }
//     if (typeof req.body.banners === 'object') {
//       req.body.banners.forEach((item) => {
//         if (item !== '' && item !== undefined && item !== null) { banners.push(item) }
//       })
//     }
//     const result = await intro.create({
//       intro: req.body.intro,
//       banners
//     })
//     res.status(200).json({ success: true, message: '', result })
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
//     } else {
//       res.status(500).json({ success: false, message: '未知錯誤' })
//     }
//   }
// }

export const getIntro = async (req, res) => {
  try {
    const result = await intro.find()
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const editIntro = async (req, res) => {
  try {
    const banners = []
    if (req.files.banners) {
      req.files.banners.forEach((item) => {
        banners.push(item.path)
      })
    }
    if (typeof req.body.banners === 'string') {
      banners.push(req.body.banners)
    }
    if (typeof req.body.banners === 'object') {
      req.body.banners.forEach((item) => {
        if (item !== '' && item !== undefined && item !== null) { banners.push(item) }
      })
    }

    const result = await intro.findOneAndUpdate({}, {
      intro: req.body.intro,
      banners
    }, { new: true })
    if (!result) {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(200).json({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else if (error.name === 'CastError') {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}
