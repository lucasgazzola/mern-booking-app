import { Router, Request, Response } from 'express'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import Hotel from '../models/hotel'
import { HotelType } from '../../shared/types'
import verifyToken from '../middlewares/auth'
import { body } from 'express-validator'

const MB_FILE_SIZE = 5

const router = Router()

const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: { fileSize: MB_FILE_SIZE * 1024 * 1024 },
}) // 5MB
// api/my-hotels
router.post(
  '/',
  verifyToken,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('type').notEmpty().withMessage('Hotel type is required'),
    body('pricePerNight')
      .notEmpty()
      .isNumeric()
      .withMessage('Price per night is required and must be a number'),
    body('facilities')
      .notEmpty()
      .isArray()
      .withMessage('Facilities are required'),
  ],
  upload.array('imageFiles', 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[]
      const newHotel: HotelType = req.body

      // upload to cloudinary
      const uploadPromises = imageFiles.map(async image => {
        const b64 = Buffer.from(image.buffer).toString('base64')
        let dataURI = 'data:' + image.mimetype + ';base64,' + b64
        const res = await cloudinary.uploader.upload(dataURI)
        return res.url
      })

      const imageUrls = await Promise.all(uploadPromises)

      // add url to newHotel
      newHotel.imageUrls = imageUrls
      newHotel.lastUpdated = new Date()
      newHotel.userId = req.userId

      // save hotel
      const hotel = new Hotel(newHotel)
      await hotel.save()

      // return 201 created
      res.status(201).send(hotel)
    } catch (error) {
      console.log('Error creating hotel: ', error)
      res.status(500).json({ message: 'Error creating hotel' })
    }
  }
)

router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId })
    res.json(hotels)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotels' })
  }
})

export default router
