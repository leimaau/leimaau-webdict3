import ReactECharts from 'echarts-for-react'

export default function WeightedPieChart ({pieData, reqWord}) {
  const option = {
    title: [{
      text: '南寧白話【'+reqWord+'】',
      subtext: '外環圖統計資料數，內餅圖統計資料權重的幾何平均值',
      left: '25%',
      top: 'top',
      textAlign: 'center',
      textStyle: {
        fontSize: 20
      }
    },
    {
      text: '南寧平話【'+reqWord+'】',
      subtext: '外環圖統計資料數，內餅圖統計資料權重的幾何平均值',
      left: '75%',
      top: 'top',
      textAlign: 'center',
      textStyle: {
        fontSize: 20
      }
    }],
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        return `${params.marker}<b>${params.name}</b><br/>(外)資料數/(內)權重幾何均值：<b>${params.value}</b><br/>佔比：<b>${params.percent}%</b>`
      }
    },
    legend: {
      show: false
    },
    series: [
      {
        name: '南寧白話',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '30%'],
        center: ['25%', '50%'],
        label: {
          position: 'inner',
          fontSize: 10
        },
        labelLine: {
          show: false
        },
        data: pieData[2]
      },
      {
        name: '南寧白話',
        type: 'pie',
        radius: ['45%', '60%'],
        center: ['25%', '50%'],
        label: {
          formatter: '{b}',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        data: pieData[0]
      },
      {
        name: '南寧平話',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '30%'],
        center: ['75%', '50%'],
        label: {
          position: 'inner',
          fontSize: 10
        },
        labelLine: {
          show: false
        },
        data: pieData[3]
      },
      {
        name: '南寧平話',
        type: 'pie',
        radius: ['45%', '60%'],
        center: ['75%', '50%'],
        label: {
          formatter: '{b}',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        data: pieData[1]
      }
    ]
  }

  return <ReactECharts option={option} />
}