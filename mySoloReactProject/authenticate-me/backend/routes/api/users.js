const express = require('express')
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Image, Booking } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];



// Sign up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);



////////////////// EBEN FIRST TEST ROUTE; FIND ALL IMAGES
router.get('/eben', asyncHandler( async (req, res) => {
  const spots = await Image.findAll();
  res.json(spots);
}));



////////////////// EBEN FIND A SPECIFIC USER'S BOOKINGS
router.get('/bookings/:personId', asyncHandler( async (req, res) => {
  const bookings = await User.findOne({
    where: parseInt(req.params.personId),
    include: {
      model: Booking,
      include: {
        model: Spot,
        include: [Image]
      }
    }
  });
  res.json(bookings);
}));


////////////////// EBEN CREATE A NEW BOOKING
router.post('/bookings/new', asyncHandler( async (req, res) => {
  console.log("Mickey Mouse");
  const { spotId, userId, startDate, endDate } = req.body;
  const newBooking = await Booking.create({
    spotId,
    userId,
    startDate,
    endDate
  });
  const testData = await Booking.findOne({
    where: {id: newBooking.id},
    include: {
      model: Spot,
      include: [Image]
    }
  })
  // const testData = await Booking.findByPk(1);
  console.log('####################################', testData);
  console.log(testData.Spot);
  // console.log(newBooking);
  // const results = await fetch(`http://localhost:3000/api/users/bookings/${userId}`);
  // const data = await results.json();
  res.json(testData);
}));




module.exports = router;
