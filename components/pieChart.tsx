import ReactECharts from 'echarts-for-react'

export default function PieChart ({pieData, reqWord}) {
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
    series: [
      {
        name: '南寧白話',
        type: 'pie',
        radius: '55%',
        center: ['25%', '50%'],
        data: pieData[0],
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      },
      {
        name: '南寧平話',
        type: 'pie',
        radius: '55%',
        center: ['75%', '50%'],
        data: pieData[1],
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  return <ReactECharts option={option} />
}