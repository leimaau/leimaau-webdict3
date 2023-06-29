import Tab_1008_d from '../models/Tab_1008_d'
import Tab_1039 from '../models/Tab_1039'
import Tab_1838 from '../models/Tab_1838'
import Tab_1856 from '../models/Tab_1856'
import Tab_1941 from '../models/Tab_1941'
import Tabs_n from '../models/Tabs_n'
import Tabs_t from '../models/Tabs_t'
import Tab_2021_phrase from '../models/Tab_2021_phrase'
import Tab_2021_bw_phrase from '../models/Tab_2021_bw_phrase'
import Tab_2021_grammar from '../models/Tab_2021_grammar'
import Tab_1937jz_proverb from '../models/Tab_1937jz_proverb'
import Tab_1937kk_proverb from '../models/Tab_1937kk_proverb'
import { jy_shengniu, jy_yunmu } from '../lib/tabConfig'

const toObj = (result: any[], year: string) => {
  const tabData = result.map((doc) => {
    const tabDoc = doc.toObject()
    tabDoc._id = tabDoc._id.toString()
    if (year!='') {
      tabDoc.year = year
    } else if (tabDoc.year == '1937jz') {
      tabDoc.simp = null
    } else if (tabDoc.year == '1937kk') {
      tabDoc.simp = null
    } else if (tabDoc.year == '1994') {
      tabDoc.sour = '1994年謝建猷《南寧白話同音字彙》' + tabDoc.sour
    } else if (tabDoc.year == '1997') {
      tabDoc.sour = '1997年楊煥典《南寧話音檔》' + tabDoc.sour
    } else if (tabDoc.year == '1998') {
      tabDoc.sour = '1998年楊煥典主編《廣西通誌·漢語方言誌》' + tabDoc.sour
    } else if (tabDoc.year == '2000') {
      tabDoc.sour = '2000年李連進《平話音韻研究》' + tabDoc.sour
    } else if (tabDoc.year == '2003') {
      tabDoc.sour = '2003年侯精一《現代漢語方言音庫(字庫)》' + tabDoc.sour
    } else if (tabDoc.year == '200706') {
      tabDoc.sour = '2007年李彬《左江土白話研究》' + tabDoc.sour
    } else if (tabDoc.year == '2007') {
      tabDoc.sour = '2007年謝建猷《廣西漢語方言研究》' + tabDoc.sour
    } else if (tabDoc.year == '2008') {
      tabDoc.sour = '2008年林亦、覃鳳餘《廣西南寧白話研究》' + tabDoc.sour
    } else if (tabDoc.year == '2009') {
      tabDoc.sour = '2009年陳海倫、林亦《粵語平話土話方音字彙》' + tabDoc.sour
    } else if (tabDoc.year == '200906') {
      tabDoc.sour = '2009年張菁雅《桂南平話語音比較研究》' + tabDoc.sour
    } else if (tabDoc.year == '201703') {
      tabDoc.sour = '2017年教育部《漢語方言用字規範》' + tabDoc.sour
    } else if (tabDoc.year == '201705') {
      tabDoc.sour = '2017年詹伯慧、張振興《漢語方言學大詞典》' + tabDoc.sour
    } else if (tabDoc.year == '201806') {
      tabDoc.sour = '2018年滕祖愛《南寧市與桂平市粵方言比較研究》' + tabDoc.sour
    } else if (tabDoc.year == '2018') {
      tabDoc.sour = '2018年Leimaau《南寧話審音表》(本站提供)'
    } else if (tabDoc.year == '2021') {
      tabDoc.year = '2021_' + tabDoc.sour.substr(0,4)
      tabDoc.sour = '〔2021年匯總〕' + tabDoc.sour
    }
    return tabDoc
  })
  return tabData
}


export async function getTabAll(searchValue: string, searchType: string, reqFanqie: string = '', reqExpl: string = '') {
  let query = {$and: []}, query2 = {$and: []}, query3 = {$and: []}, query4 = {$and: []}
  const judgeValue = judgeFunc(searchValue, searchType)
  
  if (judgeValue=='A1') { //單字
    query['$and'] = [{word: searchValue}]
    query2['$and'] = [{word: {$regex: searchValue}}]
    query3['$and'] = [{$or: [{trad: searchValue},{simp: searchValue}]}]
  } else if (judgeValue=='A2') { //帶調拼音
    query['$and'] = [{$or: [{jp: searchValue},{bwjp: searchValue}]}]
    query2['$and'] = [{$or: [{jyutping: searchValue},{jyutping: searchValue+'°'},{jyutping: searchValue.replace('1','7').replace('3','7°').replace('6','8')}]}]
    query3['$and'] = [{jyutping: searchValue}]
  } else if (judgeValue=='A3') { //無調拼音
    query['$and'] = [{$or: [{jp: {$regex: searchValue+'[1-6]'}},{bwjp: {$regex: searchValue+'[1-6]'}}]}]
    query2['$and'] = [{$or: [{jyutping: {$regex: searchValue+'[1-8]'}},{jyutping: {$regex: searchValue+'7°'}}]}]
    query3['$and'] = [{jyutping: {$regex: searchValue+'[1-6]'}}]
  } else if (judgeValue=='B') { //釋義
    query['$and'] = [{expl: {$regex: searchValue}}]
    query2['$and'] = [{expl: {$regex: searchValue}}]
    query3['$and'] = [{expl: {$regex: searchValue}}]
  } else if (judgeValue=='C') { //附註
    query['$and'] = [{_id: {$in: []}}]
    query2['$and'] = [{_id: {$in: []}}]
    query3['$and'] = [{note: {$regex: searchValue}}]
  } else if (judgeValue=='D') { //反切
    query['$and'] = [{fanqie: {$regex: searchValue}}]
    query2['$and'] = [{_id: {$in: []}}]
    query3['$and'] = [{_id: {$in: []}}]
  } else if (judgeValue=='E1') { //繁體
    query['$and'] = [{word: searchValue}]
    query2['$and'] = [{word: {$regex: searchValue}}]
    query3['$and'] = [{trad: searchValue}]
  } else if (judgeValue=='E2') { //簡體
    query['$and'] = [{word: searchValue}]
    query2['$and'] = [{word: {$regex: searchValue}}]
    query3['$and'] = [{simp: searchValue}]
  } else if (judgeValue=='F1') { //中古音查詢
    let searchArr = searchValue.split('_')
    let niu = [], yunbu = [], hu= [], deng = [], tone = [], chong = []
    for (let row of searchArr) {
      if (/聲/.test(row)) {
        if(jy_shengniu[row.replace('聲','')]!==undefined) niu.push(jy_shengniu[row.replace('聲','')].join('_'))
      }
      if (/韻/.test(row)) {
        if(jy_yunmu[row.replace('韻','')]!==undefined) yunbu.push(jy_yunmu[row.replace('韻','')].join('_'))
      }
      if (/呼/.test(row)) hu.push(row.replace('呼','').replace('口',''))
      if (/等/.test(row)) deng.push(row.replaceAll('等',''))
      if (/調/.test(row)) tone.push(row.replace('調','').replace('聲',''))
      if (/重紐/.test(row)) chong.push(row.replace('重紐',''))
    }
    let regObj = (reqFanqie=='' && reqExpl!=='') ? {expl: {$regex: reqExpl}} : (reqFanqie!=='' && reqExpl=='') ? {fanqie: {$regex: reqFanqie}} : (reqFanqie!=='' && reqExpl!=='') ? {$and:[{fanqie: {$regex: reqFanqie}},{expl: {$regex: reqExpl}}]} : {}
    query['$and'] = [{niu: {$in: niu.join('_').split('_')}},{yunbu: {$in: yunbu.join('_').split('_')}},{hu: {$in: hu}},{deng: {$in: deng}},{tone: {$in: tone}},{chong: {$in: chong}},{fanqie: {$regex: reqFanqie}},{expl: {$regex: reqExpl}},regObj]
    query2['$and'] = [{_id: {$in: []}}]
    query3['$and'] = [{_id: {$in: []}}]
  } else if (judgeValue=='F2') { //早期粵音查詢
    let searchArr = searchValue.split('_')
    let niu = [], yunbu = [], tone = []
    for (let row of searchArr) {
      if (/聲/.test(row)) niu.push(row.replace('聲',''))
      if (/韻/.test(row)) yunbu.push(row.replace('韻',''))
      if (/調/.test(row)) tone.push(row.replace('調',''))
    }
    query['$and'] = [{_id: {$in: []}}]
    query2['$and'] = [{_id: {$in: []}}]
    query3['$and'] = [{_id: {$in: []}}]
    let regObj = (reqFanqie=='' && reqExpl!=='') ? {expl: {$regex: reqExpl}} : (reqFanqie!=='' && reqExpl=='') ? {fanqie: {$regex: reqFanqie}} : (reqFanqie!=='' && reqExpl!=='') ? {$and:[{fanqie: {$regex: reqFanqie}},{expl: {$regex: reqExpl}}]} : {}
    query4['$and'] = [{first_old: {$in: niu.join('_').split('_')}},{final_old: {$in: yunbu.join('_').split('_')}},{tone: {$in: tone}},regObj]
  }

  const result = await Tab_1008_d.find(query)
  const result2 = await Tab_1039.find(query)
  const result3 = await Tab_1838.find((judgeValue=='F2') ? query4 : query2)
  const result4 = await Tab_1856.find(query2)
  const result5 = await Tab_1941.find(query2)
  const result6 = await Tabs_n.find(query3)
  const result7 = await Tabs_t.find(query3)

  const tabData = toObj(result, '1008')
  const tabData2 = toObj(result2, '1039')
  const tabData3 = toObj(result3, '1782-1838')
  const tabData4 = toObj(result4, '1856')
  const tabData5 = toObj(result5, '1941')
  const tabData6 = toObj(result6, '')
  const tabData7 = toObj(result7, '')

  return [tabData,tabData2,tabData3,tabData4,tabData5,tabData6,tabData7]
}

const judgeFunc = (searchValue: string, searchType: string) => {
  if (searchType=='A') {
    if (/[a-z]/.test(searchValue) || /[0-9]/.test(searchValue)) {
      if (/[0-9]/.test(searchValue)) return 'A2'
      return 'A3'
    } else {
      return 'A1'
    }
  } else {
    return searchType
  }
}


export async function getTabPhrase(searchValue: string, searchType: string) {
  let query = {$and: []}
  const judgeValue = judgeFunc(searchValue, searchType)
  
  if (judgeValue=='A1') { //詞彙
    query['$and'] = [{$or: [{trad: {$regex: searchValue}},{simp: {$regex: searchValue}}]}]
  } else if (judgeValue=='A2'||judgeValue=='A3') { //帶調拼音或無調拼音
    query['$and'] = [{jyutping: {$regex: searchValue}}]
  } else if (judgeValue=='B') { //釋義
    query['$and'] = [{expl: {$regex: searchValue}}]
  } else if (judgeValue=='C') { //附註
    query['$and'] = [{note: {$regex: searchValue}}]
  }

  const result1 = await Tab_2021_phrase.find(query)
  const result2 = await Tab_2021_bw_phrase.find(query)
  
  const tabData1 = toObj(result1, '')
  const tabData2 = toObj(result2, '')

  return [tabData1,tabData2]
}

export async function getTabGrammar(searchValue: string, searchType: string) {
  let query = {$and: []}
  const judgeValue = judgeFunc(searchValue, searchType)
  
  if (judgeValue=='A1') { //句子
    query['$and'] = [{trad: {$regex: searchValue}}]
  } else if (judgeValue=='A2'||judgeValue=='A3') { //帶調拼音或無調拼音
    query['$and'] = [{jyutping: {$regex: searchValue}}]
  } else if (judgeValue=='B') { //釋義
    query['$and'] = [{expl: {$regex: searchValue}}]
  } else if (judgeValue=='C') { //附註
    query['$and'] = [{note: {$regex: searchValue}}]
  }

  const result1 = await Tab_2021_grammar.find(query)
  const result2 = []
  const result3 = await Tab_1937jz_proverb.find(query)
  const result4 = await Tab_1937kk_proverb.find(query)

  const tabData1 = toObj(result1, '')
  const tabData2 = toObj(result2, '')
  const tabData3 = toObj(result3, '')
  const tabData4 = toObj(result4, '')

  return [tabData1,tabData2,tabData3,tabData4]
}