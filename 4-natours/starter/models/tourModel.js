/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour mush have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less than 40 characters'],
      minlength: [10, 'A tour name must have more than 9 characters'],
      // validate: [validator.isAlpha, 'Tour name can only contain characters'],
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration '],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a duration '],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a duration '],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        messege: 'Difficulty is either: easy, medium, or difficult',
      },
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'A rating must be above 1.0'],
      max: [5, 'A rating must be below 5.0'],
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        messege: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    imageCover: {
      type: String,
      required: [true, 'A tour mush have a cover image'],
    },
    image: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});
tourSchema.post(/^find/, (docs, next) => {
  console.log(`Query took ${Date.now - this.start} miliseconds!`);
  next();
});

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
