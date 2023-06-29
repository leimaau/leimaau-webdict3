import { jy_shengniu, jy_yunmu } from '../lib/tabConfig'

// 計算資料權重的幾何平均值
export function calcYear (data) {
	let dataValue = 0
	for (let item of data.values()){
		if (item == '2018') {
			dataValue += Math.log(9)
		} else if (item == '1998' || item == '2008' || item == '2009') {
			dataValue += Math.log(7)
		} else if (item == '1997' || item == '2003' || item == '200706' || /2021/.test(item)){
			dataValue += Math.log(5)
		} else if (item == '1994' || item == '2000' || item == '2007' || item == '201703' || item == '201705' || item == '200906'){
			dataValue += Math.log(3)
		} else if (item == '201806' || item == '2022'){
			dataValue += Math.log(1.5)
		} else {
			dataValue += Math.log(1)
		}
	}
	return Math.exp(dataValue/data.size).toFixed(2)
}

// 轉換對象
const transObj = (inputData: any[], queryType: string, search: string) => {
	if (inputData==undefined || queryType=='B' || queryType=='C' || queryType=='D' || queryType=='F1' || queryType=='F2') return {}
	const searchPara = ((queryType=='A' || queryType=='A2') && /[a-z]/.test(search)) ? 'trad' : 'jyutping'
	const obj_data = {}  // 對象：{粵拼 -> [多份數據年份]}
	for (let line of inputData) { 
		let JYUTPING = line[searchPara], YEAR = line['year']
		if (typeof (obj_data[JYUTPING]) == "undefined") { obj_data[JYUTPING] = []; obj_data[JYUTPING].push(YEAR); } else { obj_data[JYUTPING].push(YEAR); };
	}
	for (let i in obj_data) { obj_data[i] = new Set(obj_data[i]) } //去重
	return obj_data
}

// 餅圖數據處理
export function dealData (inputData: any[], inputData2: any[], queryType: string, search: string) {
  	const pie_data = transObj(inputData, queryType, search)
  	const pie_data2 = transObj(inputData2, queryType, search)
	const show_data = [], show_data2 = [], show_dataWeight = [], show_dataWeight2 = []

	for (let i in pie_data) { show_data.push({ name: i, value: pie_data[i].size }) } //name 數據名 value 數據值
	for (let i in pie_data2) { show_data2.push({ name: i, value: pie_data2[i].size }) } //name 數據名 value 數據值
	for (let i in pie_data) { show_dataWeight.push({ name: i, value: calcYear(pie_data[i]) }) } //name 數據名 value 權重值
	for (let i in pie_data2) { show_dataWeight2.push({ name: i, value: calcYear(pie_data2[i]) }) } //name 數據名 value 權重值

	return [show_data, show_data2, show_dataWeight, show_dataWeight2]
}

// 柱狀圖數據處理
export function dealDataBar (inputData: any[],inputData2: any[], queryType: string, search: string) {
	const bar_data = transObj(inputData, queryType, search)
	const bar_data2 = transObj(inputData2, queryType, search)

	const xAxis_data = [], yAxis_data = [], zAxis_data = [], xAxis_data2 = [], yAxis_data2 = [], zAxis_data2 = []
	//let dataSum = 0
	for (let i in bar_data) { 
		//name 數據名 value 數據值 weight 權重值
		xAxis_data.push(i)
		yAxis_data.push(bar_data[i].size)
		zAxis_data.push(calcYear(bar_data[i]))
		//dataSum += bar_data[i].size
	}
	for (let i in bar_data2) { 
		//name 數據名 value 數據值 weight 權重值
		xAxis_data2.push(i)
		yAxis_data2.push(bar_data2[i].size)
		zAxis_data2.push(calcYear(bar_data2[i]))
		//dataSum += bar_data2[i].size
	}

	return [xAxis_data, yAxis_data, zAxis_data, xAxis_data2, yAxis_data2, zAxis_data2]
}

// 混合柱狀圖數據處理
export function dealDataMixBar (inputData: any[], inputData2: any[], queryType: string, search: string) {
	const mixbar_data = transObj(inputData, queryType, search)
	const mixbar_data2 = transObj(inputData2, queryType, search)

	const nnName = [], tzName = []
	const xAxis_data = [], yAxis_data = [], zAxis_data = [], uAxis_data = [], vAxis_data = []
	
	for (let i in mixbar_data) { 
		nnName.push(i)
	}
	for (let i in mixbar_data2) { 
		tzName.push(i)
	}

	const comName =nnName.filter(item1 => tzName.includes(item1))
	const _nnName =nnName.filter(item1 => !tzName.includes(item1))
	const _tzName =tzName.filter(item2 => !nnName.includes(item2))

	for (let i of comName) {
		//name 數據名 value 數據值 weight 權重值
		xAxis_data.push(i)
		yAxis_data.push(mixbar_data[i].size)
		zAxis_data.push(mixbar_data2[i].size)
		uAxis_data.push(calcYear(mixbar_data[i]))
		vAxis_data.push(calcYear(mixbar_data2[i]))
	}

	for (let i of _nnName) {
		//name 數據名 value 數據值 weight 權重值
		xAxis_data.push(i)
		yAxis_data.push(mixbar_data[i].size)
		zAxis_data.push('')
		uAxis_data.push(calcYear(mixbar_data[i]))
		vAxis_data.push('')
	}

	for (let i of _tzName) {
		//name 數據名 value 數據值 weight 權重值
		xAxis_data.push(i)
		yAxis_data.push('')
		zAxis_data.push(mixbar_data2[i].size)
		uAxis_data.push('')
		vAxis_data.push(calcYear(mixbar_data2[i]))
	}

	return [xAxis_data, yAxis_data, zAxis_data, uAxis_data, vAxis_data]
}

const toObj = (result: any[], year: string) => {
  const tabData = result.map((tabDoc) => {
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

const inStruct = (val,structure) => {
  for(let a in structure) {
       if(structure[a] == val && structure.hasOwnProperty(a)) {
          return true
        }
  }
  return false
}

export async function getTabAll2(searchValue: string, searchType: string, reqFanqie: string = '', reqExpl: string = '') {
  let query = item => false, query2 = item => false, query3 = item => false, query4 = item => false
  const judgeValue = judgeFunc(searchValue, searchType)
  
  if (judgeValue=='A1') { //單字
    query = item => item.word == searchValue
    query2 = item => (new RegExp(searchValue,'gi')).test(item.word)
    query3 = item => item.trad == searchValue || item.simp == searchValue
  } else if (judgeValue=='A2') { //帶調拼音
    query = item => item.jp == searchValue || item.bwjp == searchValue
    query2 = item => item.jyutping == searchValue || item.jyutping == searchValue+'°' || item.jyutping == searchValue.replace('1','7').replace('3','7°').replace('6','8')
    query3 = item => item.jyutping == searchValue
  } else if (judgeValue=='A3') { //無調拼音
    query = item => (new RegExp(searchValue+'[1-6]','gi')).test(item.jp) || (new RegExp(searchValue+'[1-6]','gi')).test(item.bwjp)
    query2 = item => (new RegExp(searchValue+'[1-8]','gi')).test(item.jyutping) || (new RegExp(searchValue+'7°','gi')).test(item.jyutping)
    query3 = item => (new RegExp(searchValue+'[1-6]','gi')).test(item.jyutping)
  } else if (judgeValue=='B') { //釋義
    query = item => (new RegExp(searchValue,'gi')).test(item.expl)
    query2 = item => (new RegExp(searchValue,'gi')).test(item.expl)
    query3 = item => (new RegExp(searchValue,'gi')).test(item.expl)
  } else if (judgeValue=='C') { //附註
    query = item => false
    query2 = item => false
    query3 = item => (new RegExp(searchValue,'gi')).test(item.note)
  } else if (judgeValue=='D') { //反切
    query = item => (new RegExp(searchValue,'gi')).test(item.fanqie)
    query2 = item => false
    query3 = item => false
  } else if (judgeValue=='E1') { //繁體
    query = item => item.word == searchValue
    query2 = item => (new RegExp(searchValue,'gi')).test(item.word)
    query3 = item => item.trad == searchValue
  } else if (judgeValue=='E2') { //簡體
    query = item => item.word == searchValue
    query2 = item => (new RegExp(searchValue,'gi')).test(item.word)
    query3 = item => item.simp == searchValue
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
    //let regObj = (reqFanqie=='' && reqExpl!=='') ? {expl: {$regex: reqExpl}} : (reqFanqie!=='' && reqExpl=='') ? {fanqie: {$regex: reqFanqie}} : (reqFanqie!=='' && reqExpl!=='') ? {$and:[{fanqie: {$regex: reqFanqie}},{expl: {$regex: reqExpl}}]} : {}
    //query['$and'] = [{niu: {$in: niu.join('_').split('_')}},{yunbu: {$in: yunbu.join('_').split('_')}},{hu: {$in: hu}},{deng: {$in: deng}},{tone: {$in: tone}},{chong: {$in: chong}},{fanqie: {$regex: reqFanqie}},{expl: {$regex: reqExpl}},regObj]
    
    query = item => inStruct(item.niu, niu.join('_').split('_')) && inStruct(item.yunbu, yunbu.join('_').split('_')) && inStruct(item.hu, hu) && inStruct(item.deng, deng) && inStruct(item.tone, tone) && (item.chong===undefined ? true : inStruct(item.chong, chong)) && (new RegExp(reqFanqie,'gi')).test(item.fanqie) && (new RegExp(reqExpl,'gi')).test(item.expl)
    query2 = item => false
    query3 = item => false
  } else if (judgeValue=='F2') { //早期粵音查詢
    let searchArr = searchValue.split('_')
    let niu = [], yunbu = [], tone = []
    for (let row of searchArr) {
      if (/聲/.test(row)) niu.push(row.replace('聲',''))
      if (/韻/.test(row)) yunbu.push(row.replace('韻',''))
      if (/調/.test(row)) tone.push(row.replace('調',''))
    }
    query = item => false
    query2 = item => false
    query3 = item => false
    //let regObj = (reqFanqie=='' && reqExpl!=='') ? {expl: {$regex: reqExpl}} : (reqFanqie!=='' && reqExpl=='') ? {fanqie: {$regex: reqFanqie}} : (reqFanqie!=='' && reqExpl!=='') ? {$and:[{fanqie: {$regex: reqFanqie}},{expl: {$regex: reqExpl}}]} : {}
    //query4['$and'] = [{first_old: {$in: niu.join('_').split('_')}},{final_old: {$in: yunbu.join('_').split('_')}},{tone: {$in: tone}},regObj]
    query4 = item => inStruct(item.first_old, niu.join('_').split('_')) && inStruct(item.final_old, yunbu.join('_').split('_')) && inStruct(item.tone, tone) && (new RegExp(reqFanqie,'gi')).test(item.fanqie) && (new RegExp(reqExpl,'gi')).test(item.expl)
  }

  const urlList = [
    '/json/tab_1008_d.json',
    '/json/tab_1039.json',
    '/json/tab_1838.json',
    '/json/tab_1856.json',
    '/json/tab_1941.json',
    '/json/tabs_n.json',
    '/json/tabs_t.json'
  ]

  const tempfun = (res,f) => {
    let templist = []
    for (let item of res) {
      if (f(item)) templist.push(item)
    }
    return templist
  }
  
  const promiseList = urlList.map(async (url) => {
    return await fetch(url).then(response => response.json())
    .then(res => {
      if (url=='/json/tab_1008_d.json'||url=='/json/tab_1039.json') {
		    return tempfun(res,query)
		    //return res.filter(query)
	    }
      if (url=='/json/tab_1838.json') {
		    return tempfun(res,(judgeValue=='F2') ? query4 : query2)
		    //return res.filter((judgeValue=='F2') ? query4 : query2)
	    }
      if (url=='/json/tab_1856.json'||url=='/json/tab_1941.json') {
		    return tempfun(res,query2)
		    //return res.filter(query2)
	    }
      if (url=='/json/tabs_n.json'||url=='/json/tabs_t.json') {
		    return tempfun(res,query3)
		    //return res.filter(query3)
	    }
    })
    .then(res => res == undefined ? null : res)
  })
  /*
  const promiseList = [
	await fetch(urlList[0]).then(res => res.json()).then(res => tempfun(res,query)),
	await fetch(urlList[1]).then(res => res.json()).then(res => tempfun(res,query)),
	await fetch(urlList[2]).then(res => res.json()).then(res => tempfun(res,(judgeValue=='F2') ? query4 : query2)),
	await fetch(urlList[3]).then(res => res.json()).then(res => tempfun(res,query2)),
	await fetch(urlList[4]).then(res => res.json()).then(res => tempfun(res,query2)),
	await fetch(urlList[5]).then(res => res.json()).then(res => tempfun(res,query3)),
	await fetch(urlList[6]).then(res => res.json()).then(res => tempfun(res,query3))
  ]*/
  
  const jsonBaseList = await Promise.all(promiseList)

  const tabData = toObj(jsonBaseList[0], '1008')
  const tabData2 = toObj(jsonBaseList[1], '1039')
  const tabData3 = toObj(jsonBaseList[2], '1782-1838')
  const tabData4 = toObj(jsonBaseList[3], '1856')
  const tabData5 = toObj(jsonBaseList[4], '1941')
  const tabData6 = toObj(jsonBaseList[5], '')
  const tabData7 = toObj(jsonBaseList[6], '')

  return [tabData,tabData2,tabData3,tabData4,tabData5,tabData6,tabData7]
}

export async function getTabPhrase2(searchValue: string, searchType: string) {
  let query = item => false
  const judgeValue = judgeFunc(searchValue, searchType)
  
  if (judgeValue=='A1') { //詞彙
    //query['$and'] = [{$or: [{trad: {$regex: searchValue}},{simp: {$regex: searchValue}}]}]
    query = item => (new RegExp(searchValue,'gi')).test(item.trad) || (new RegExp(searchValue,'gi')).test(item.simp)
  } else if (judgeValue=='A2'||judgeValue=='A3') { //帶調拼音或無調拼音
    //query['$and'] = [{jyutping: {$regex: searchValue}}]
    query = item => (new RegExp(searchValue,'gi')).test(item.jyutping)
  } else if (judgeValue=='B') { //釋義
    //query['$and'] = [{expl: {$regex: searchValue}}]
    query = item => (new RegExp(searchValue,'gi')).test(item.expl)
  } else if (judgeValue=='C') { //附註
    //query['$and'] = [{note: {$regex: searchValue}}]
    query = item => (new RegExp(searchValue,'gi')).test(item.note)
  }

  const urlList = [
    '/json/tab_2021_phrase.json',
    '/json/tab_2021_bw_phrase.json'
  ]

  const tempfun = (res,f) => {
    let templist = []
    for (let item of res) {
      if (f(item)) templist.push(item)
    }
    return templist
  }

  const promiseList = urlList.map(async (url) => {
    return await fetch(url).then(response => response.json())
    .then(res => {
		    return tempfun(res,query)
    })
    .then(res => res == undefined ? null : res)
  })

  const jsonBaseList = await Promise.all(promiseList)
  
  const tabData1 = toObj(jsonBaseList[0], '')
  const tabData2 = toObj(jsonBaseList[1], '')

  return [tabData1,tabData2]
}

export async function getTabGrammar2(searchValue: string, searchType: string) {
  let query = item => false
  const judgeValue = judgeFunc(searchValue, searchType)
  
  if (judgeValue=='A1') { //句子
    //query['$and'] = [{trad: {$regex: searchValue}}]
    query = item => (new RegExp(searchValue,'gi')).test(item.trad)
  } else if (judgeValue=='A2'||judgeValue=='A3') { //帶調拼音或無調拼音
    //query['$and'] = [{jyutping: {$regex: searchValue}}]
    query = item => (new RegExp(searchValue,'gi')).test(item.jyutping)
  } else if (judgeValue=='B') { //釋義
    //query['$and'] = [{expl: {$regex: searchValue}}]
    query = item => (new RegExp(searchValue,'gi')).test(item.expl)
  } else if (judgeValue=='C') { //附註
    //query['$and'] = [{note: {$regex: searchValue}}]
    query = item => (new RegExp(searchValue,'gi')).test(item.note)
  }

  const urlList = [
    '/json/tab_2021_grammar.json',
    '/json/tab_1937jz_proverb.json',
    '/json/tab_1937kk_proverb.json'
  ]

  const tempfun = (res,f) => {
    let templist = []
    for (let item of res) {
      if (f(item)) templist.push(item)
    }
    return templist
  }

  const promiseList = urlList.map(async (url) => {
    return await fetch(url).then(response => response.json())
    .then(res => {
		    return tempfun(res,query)
    })
    .then(res => res == undefined ? null : res)
  })

  const jsonBaseList = await Promise.all(promiseList)

  const tabData1 = toObj(jsonBaseList[0], '')
  const tabData2 = toObj([], '')
  const tabData3 = toObj(jsonBaseList[1], '')
  const tabData4 = toObj(jsonBaseList[2], '')

  return [tabData1,tabData2,tabData3,tabData4]
}