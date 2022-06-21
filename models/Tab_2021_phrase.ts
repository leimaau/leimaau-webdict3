import mongoose from 'mongoose'

const Tab_2021_phrase_Schema = new mongoose.Schema({
  year: {
    type: String,
  },
  tab_id: {
    type: Number,
    required: [true, 'Please provide a tab_id for this tab'],
  },
  trad: {
    type: String,
  },
  simp: {
    type: String,
  },
  ipa_s: {
    type: String,
  },
  ipa_t: {
    type: String,
  },
  jyutping: {
    type: String,
  },
  sour: {
    type: String,
  },
  expl: {
    type: String,
  },
  note: {
    type: String,
  },
})

export default mongoose.models.Tab_2021_phrase || mongoose.model('Tab_2021_phrase', Tab_2021_phrase_Schema, 'tab_2021_phrase')
