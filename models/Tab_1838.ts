import mongoose from 'mongoose'

const Tab_1838_Schema = new mongoose.Schema({
  tab_id: {
    type: Number,
    required: [true, 'Please provide a tab_id for this tab'],
  },
  word: {
    type: String,
  },
  expl: {
    type: String,
  },
  final_part: {
    type: String,
  },
  first_old: {
    type: String,
  },
  final_old: {
    type: String,
  },
  tone: {
    type: String,
  },
  jyutping: {
    type: String,
  },
  ipa: {
    type: String,
  },
  volume: {
    type: String,
  },
  page: {
    type: String,
  },
  first_type: {
    type: String,
  },
  fanqie: {
    type: String,
  },
})

export default mongoose.model('Tab_1838', Tab_1838_Schema, 'tab_1838')
