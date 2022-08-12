import mongoose from 'mongoose'

const Tab_1039_Schema = new mongoose.Schema({
  tab_id: {
    type: Number,
    required: [true, 'Please provide a tab_id for this tab'],
  },
  word: {
    type: String,
  },
  niu: {
    type: String,
  },
  yunbu: {
    type: String,
  },
  she: {
    type: String,
  },
  hu: {
    type: String,
  },
  deng: {
    type: String,
  },
  tone: {
    type: String,
  },
  fanqie: {
    type: String,
  },
  expl: {
    type: String,
  },
  ipa: {
    type: String,
  },
  jp: {
    type: String,
  },
  bwipa: {
    type: String,
  },
  bwjp: {
    type: String,
  },
})

export default mongoose.model('Tab_1039', Tab_1039_Schema, 'tab_1039')
