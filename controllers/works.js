import works from '../models/works.js'

export const createWork = async (req, res) => {
  try {
    const links = []
    if (typeof req.body.linksType === 'string') {
      links.push({
        linkType: req.body.linksType,
        link: req.body.linksValue
      })
    } else {
      for (const i in req.body.linksType) {
        links.push({
          linkType: req.body.linksType[i],
          link: req.body.linksValue[i]
        })
      }
    }

    const result = await works.create({
      image: req.file?.path || req.body.image,
      title: req.body.title,
      date: req.body.date,
      description: req.body.description,
      display: req.body.display,
      artist: req.body.artist,
      links
    })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const getFrontWorks = async (req, res) => {
  try {
    const result = await works.find({ display: true })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getAllWorks = async (req, res) => {
  try {
    const result = await works.find()
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
    console.log(error)
  }
}

export const editWork = async (req, res) => {
  try {
    const links = []
    if (typeof req.body.linksType === 'string') {
      links.push({
        linkType: req.body.linksType,
        link: req.body.linksValue
      })
    } else {
      for (const i in req.body.linksType) {
        links.push({
          linkType: req.body.linksType[i],
          link: req.body.linksValue[i]
        })
      }
    }
    const result = await works.findByIdAndUpdate(req.params.id, {
      image: req.file?.path || req.body.image,
      title: req.body.title,
      date: req.body.date,
      description: req.body.description,
      display: req.body.display,
      artist: req.body.artist,
      links
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
