import ReactECharts from 'echarts-for-react'

export default function NightingaleChart ({pieData, reqWord}) {
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
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        return `${params.marker}<b>${params.name}</b><br/>資料數：<b>${params.value}</b><br/>佔比：<b>${params.percent}%</b>`
      }
    },
    legend: {
      show: false
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: false, readOnly: true },
        restore: { show: false },
        saveAsImage: { show: false }
      }
    },
    series: [
      {
        name: '南寧白話',
        type: 'pie',
        radius: ['30%', '55%'],
        center: ['25%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5
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
        radius: ['30%', '55%'],
        center: ['75%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5
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
  };

  return <ReactECharts option={option} />
}