import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const CommentSchema = new Schema({
  body: { type: String, required: true },
  isAttending: { type: Boolean, default: false },
  creatorId: { type: ObjectId, required: true, ref: 'Account' },
  eventId: { type: ObjectId, required: true, ref: 'TowerEvent' },

},
  { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

CommentSchema.virtual('tevent', {
  localField: 'eventId',
  ref: 'TowerEvent',
  foreignField: '_id',
  justOne: true
})