import ReactECharts from 'echarts-for-react'

export default function BarChart ({pieData, reqWord}) {
  const option = {
    title: [{
      text: '南寧白話【'+reqWord+'】',
      //subtext: '市區',
      left: '25%',
      top: 'top',
      textAlign: 'center',
      textStyle: {
        fontSize: 20
      }
    },
    {
      text: '南寧平話【'+reqWord+'】',
      //subtext: '亭子',
      left: '75%',
      top: 'top',
      textAlign: 'center',
      textStyle: {
        fontSize: 20
      }
    }],
    legend: { show: true },
    tooltip: { trigger: 'item' },
    yAxis: [
      { type: 'category', gridIndex: 0, data: pieData[3]},
      { type: 'category', gridIndex: 1, data: pieData[0]}
    ],
    xAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
    grid: [{ left: '55%' }, { right: '55%' }],
    series: [
      { name: '資料數', type: 'bar', seriesLayoutBy: 'row', data: pieData[4], label: { position: 'right', show: true }},
      { name: '資料權重的幾何平均值',type: 'bar', seriesLayoutBy: 'row', data: pieData[5], label: { position: 'right', show: true }},
      { name: '資料數',type: 'bar', seriesLayoutBy: 'row', xAxisIndex: 1, yAxisIndex: 1, data: pieData[1], label: { position: 'right', show: true }},
      { name: '資料權重的幾何平均值',type: 'bar', seriesLayoutBy: 'row', xAxisIndex: 1, yAxisIndex: 1, data: pieData[2], label: { position: 'right', show: true }}
    ]
  }

  return <ReactECharts option={option} />
}