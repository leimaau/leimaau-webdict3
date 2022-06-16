import mongoose from 'mongoose'

const Tabs_n_Schema = new mongoose.Schema({
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

export default mongoose.models.Tabs_n || mongoose.model('Tabs_n', Tabs_n_Schema, 'tabs_n')
