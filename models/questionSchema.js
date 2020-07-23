const mongoose = require('mongoose');

const { Schema } = mongoose;

const questionSchema = new Schema({
  ID: String,
  title: String,
  postiveVotes: Number,
  negativeVotes: Number,
  views: Number,
  answers: [],
  body: String,
  tags: [],
  updatedAt: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: 'users' },
});

mongoose.model('questions', questionSchema);