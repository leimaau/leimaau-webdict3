import React, { useEffect, useRef } from 'react'
import { getTabAll } from '../../lib/dao'
import { colDataList } from '../../lib/tabConfig'
import { dealData, dealDataBar, dealDataMixBar } from '../../lib/dealDataFunc'
import { tradData } from '../../lib/markdata/gzDict'
import 'default-passive-events'
import { TabView, TabPanel } from 'primereact/tabview'
import { Messages } from 'primereact/messages'
import Link from 'next/link'
import Layout from '../../components/layout'
import QButton from '../../components/qbutton'
import QTable from '../../components/qtable'
import DoughnutChart from '../../components/doughnutChart'
import BarChart from '../../components/barChart'
import NightingaleChart from '../../components/nightingaleChart'
import WeightedPieChart from '../../components/weightedPieChart'
import PieChart from '../../components/pieChart'
import MixBarChart from '../../components/mixBarChart'
import FastLink from '../../components/fastLink'

export default function Search({ _isShort, isConnected, _tabDataList, tabColList, _reqWord, _reqType }) {

  const msgs_db = useRef(null)
  const msgs_islong = useRef(null)
  const msgs_trad = useRef(null)
  /*
  const [isShort, setIsShort] = useState(_isShort)
  const [tabDataList, setTabDataList] = useState(_tabDataList)
  const [reqWord, setReqWord] = useState(_reqWord)
  const [reqType, setReqType] = useState(_reqType)
  */
  const isShort = _isShort
  const tabDataList = _tabDataList
  const reqWord = _reqWord
  const reqType = _reqType

  const clearFunc = () => {
    if (msgs_db.current !== null) msgs_db.current.clear()
    if (msgs_islong.current !== null) msgs_islong.current.clear()
    if (msgs_trad.current !== null) msgs_trad.current.clear()
  }

  useEffect(() => {
    if (msgs_trad.current !== null) msgs_trad.current.clear()
  }, [msgs_trad.current])

  let tradRes = tradData.filter(item => item['simp'] == reqWord), tradLink = []
  if (tradRes.length != 0) {
    for (let i in tradRes[0].trad) {
      //tradLink.push(<span key={'charlink' + i}><Link key={'charlink' + i} href={'/search/' + tradRes[0].trad[i] + '?queryType=' + reqType}><a onClick={() => getTabContent(tradRes[0].trad[i], reqType, '??????')}>{tradRes[0].trad[i]}</a></Link>{(i != (tradRes[0].trad.length - 1).toString()) ? '???,???' : ''}</span>)
      tradLink.push(<span key={'charlink' + i}><Link key={'charlink' + i} href={'/search/' + tradRes[0].trad[i] + '?queryType=' + reqType}><a>{tradRes[0].trad[i]}</a></Link>{(i != (tradRes[0].trad.length - 1).toString()) ? '???,???' : ''}</span>)
    }
  }

  useEffect(() => {
    if (!isConnected) msgs_db.current.show({ severity: 'error', summary: '', detail: '????????????????????????????????????????????????', sticky: true })
    if (!isShort) msgs_islong.current.show({ severity: 'error', summary: '', detail: '???????????????1000???????????????????????????', sticky: true })
    if (tradRes.length != 0) msgs_trad.current.show({ severity: 'success', summary: '', content: (<React.Fragment><span className="flex flex-wrap">????????????????????????????????????{tradLink} ???</span></React.Fragment>), sticky: true })
  }, [isConnected, isShort, tradRes])

  const getTabContent = async (valueFind, radioFind, type, fanqieValue = '', explValue = '') => {
    clearFunc()
    /*
    const dev = process.env.NODE_ENV !== 'production'

    const server = dev ? 'http://localhost:3000' : 'https://leimaau-webdict3.vercel.app'

    const res = await fetch('/api/tabcontent/' + valueFind + '?reqType=' + radioFind + '&type=' + type + '&reqFanqie=' + fanqieValue + '&reqExpl=' + explValue, {
      method: 'GET',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }).then(res => res.json())

    let dataLenght = 0
    for (let i in res.text) {
      dataLenght += res.text[i].length
    }

    if (dataLenght < 1000) {
      setIsShort(true)
      setTabDataList(await res.text)
      setReqWord(valueFind)
      setReqType(radioFind)
    } else {
      setIsShort(false)
    }*/

  }


  return (
    <Layout home>

      <QButton search={reqWord} isConnected={isConnected} radioName={reqType} getContent={getTabContent} type="??????" />

      {(tradRes.length == 0) ? (
        <span></span>
      ) : (
        <Messages ref={msgs_trad}></Messages>
      )}

      {isConnected ? (
        <span></span>
      ) : (
        <Messages ref={msgs_db}></Messages>
      )}

      {isShort ? (
        <span></span>
      ) : (
        <Messages ref={msgs_islong}></Messages>
      )}

      {(reqType == 'B' || reqType == 'C' || reqType == 'D' || reqType == 'F1' || reqType == 'F2') ? (
        <span></span>
      ) : (
        <TabView className="picTabView overflow-auto">
          <TabPanel header="??????">
            <PieChart pieData={dealData(tabDataList[5], tabDataList[6], reqType, reqWord)} reqWord={reqWord} />
          </TabPanel>
          <TabPanel header="???????????????">
            <DoughnutChart pieData={dealData(tabDataList[5], tabDataList[6], reqType, reqWord)} reqWord={reqWord} />
          </TabPanel>
          <TabPanel header="?????????????????????">
            <NightingaleChart pieData={dealData(tabDataList[5], tabDataList[6], reqType, reqWord)} reqWord={reqWord} />
          </TabPanel>
          <TabPanel header="???????????????">
            <WeightedPieChart pieData={dealData(tabDataList[5], tabDataList[6], reqType, reqWord)} reqWord={reqWord} />
          </TabPanel>
          <TabPanel header="?????????">
            <BarChart pieData={dealDataBar(tabDataList[5], tabDataList[6], reqType, reqWord)} reqWord={reqWord} />
          </TabPanel>
          <TabPanel header="???????????????">
            <MixBarChart mixBarData={dealDataMixBar(tabDataList[5], tabDataList[6], reqType, reqWord)} reqWord={reqWord} />
          </TabPanel>
        </TabView>
      )}

      <QTable tabDataList={tabDataList} tabColList={tabColList} reqType={reqType} getContent={getTabContent} />

      <FastLink textChar={reqWord} reqType={reqType} />

    </Layout>
  )
}


export async function getServerSideProps(context) {
  const reqWord = context.params.search
  const reqType = context.query.queryType
  const reqFanqie = context.query.reqFanqie
  const reqExpl = context.query.reqExpl

  try {
    const tabDataList = await getTabAll(reqWord, reqType, reqFanqie, reqExpl)

    let dataLenght = 0
    for (let i in tabDataList) {
      dataLenght += tabDataList[i].length
    }

    if (dataLenght < 1000) {
      return {
        props: { _isShort: true, isConnected: true, _tabDataList: tabDataList, tabColList: colDataList, _reqWord: reqWord, _reqType: reqType },
      }
    } else {
      return {
        props: { _isShort: false, isConnected: true, _tabDataList: [], tabColList: colDataList, _reqWord: reqWord, _reqType: reqType },
      }
    }
  } catch (e) {
    console.error(e)
    return {
      props: { _isShort: true, isConnected: false, _tabDataList: [], tabColList: colDataList, _reqWord: reqWord, _reqType: reqType },
    }
  }
}

