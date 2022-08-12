import mongoose from 'mongoose'

const Tab_1856_Schema = new mongoose.Schema({
  tab_id: {
    type: Number,
    required: [true, 'Please provide a tab_id for this tab'],
  },
  word: {
    type: String,
  },
  word_note: {
    type: String,
  },
  page: {
    type: String,
  },
  old_jp: {
    type: String,
  },
  old_jp_type: {
    type: String,
  },
  old_jp_note: {
    type: String,
  },
  expl: {
    type: String,
  },
  ipa: {
    type: String,
  },
  jyutping: {
    type: String,
  },
})

export default mongoose.model('Tab_1856', Tab_1856_Schema, 'tab_1856')
