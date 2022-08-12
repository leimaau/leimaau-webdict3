import mongoose from 'mongoose'

const Tab_2021_grammar_Schema = new mongoose.Schema({
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

export default mongoose.model('Tab_2021_grammar', Tab_2021_grammar_Schema, 'tab_2021_grammar')
