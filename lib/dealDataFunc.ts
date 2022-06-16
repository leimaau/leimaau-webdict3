// 計算資料權重的幾何平均值
export function calcYear (data) {
	let dataValue = 0
	for (let item of data.values()){
		if (item == '2018') {
			dataValue += Math.log(9)
		} else if (item == '1998' || item == '2008' || item == '2009') {
			dataValue += Math.log(7)
		} else if (item == '1997' || item == '2003' || /2021/.test(item)){
			dataValue += Math.log(5)
		} else if (item == '1994' || item == '2000' || item == '2007' || item == '201703' || item == '201705'){
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
const transObj = (inputData: any[], queryType: string, search: string) =>{
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