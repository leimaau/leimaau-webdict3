import ReactECharts from 'echarts-for-react'

export default function MixBarChart ({mixBarData, reqWord}) {
  const option = {
    title: {
      text: '混合柱狀圖【'+reqWord+'】'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: { show: true },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    xAxis: {
      type: 'category',
      data: mixBarData[0]
    },
    series: [
      {
        name: '白話資料數',
        type: 'bar',
        data: mixBarData[1]
      },
      {
        name: '白話資料權重幾何均值',
        type: 'bar',
        data: mixBarData[3]
      },
      {
        name: '平話資料數',
        type: 'bar',
        data: mixBarData[2]
      },
      {
        name: '平話資料權重幾何均值',
        type: 'bar',
        data: mixBarData[4]
      }
    ]
  }

  return <ReactECharts option={option} />
}