import mongoose from 'mongoose'

const Tab_1008_d_Schema = new mongoose.Schema({
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
  chong: {
    type: String,
  },
  fanqie: {
    type: String,
  },
  flag: {
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

export default mongoose.models.Tab_1008_d || mongoose.model('Tab_1008_d', Tab_1008_d_Schema, 'tab_1008_d')
