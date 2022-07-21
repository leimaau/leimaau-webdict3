import { NextApiRequest, NextApiResponse } from 'next'
import { getTabAll, getTabPhrase, getTabGrammar } from '../../../lib/dao'

export default async function tabcontent(req: NextApiRequest, res: NextApiResponse) {
  const { psearch, reqType, type, reqFanqie, reqExpl } = req.query
  
  let tabDataList = []

  if (type=='單字') {
    tabDataList = await getTabAll(psearch.toString(), reqType.toString(), reqFanqie.toString(), reqExpl.toString())
  } else if (type=='詞彙') {
    tabDataList = await getTabPhrase(psearch.toString(), reqType.toString())
  } else {
    tabDataList =  await getTabGrammar(psearch.toString(), reqType.toString())
  }
  

  try {
    res.status(200).json({ text: tabDataList })
  } catch {
    res.status(500).json({ error: 'failed to load data' })
  }
}

