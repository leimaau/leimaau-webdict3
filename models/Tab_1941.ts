import mongoose from 'mongoose'

const Tab_1941_Schema = new mongoose.Schema({
  tab_id: {
    type: Number,
    required: [true, 'Please provide a tab_id for this tab'],
  },
  word: {
    type: String,
  },
  jyutping: {
    type: String,
  },
  ipa: {
    type: String,
  },
  page: {
    type: String,
  },
  expl: {
    type: String,
  },
  firstflag: {
    type: String,
  },
})

export default mongoose.models.Tab_1941 || mongoose.model('Tab_1941', Tab_1941_Schema, 'tab_1941')
