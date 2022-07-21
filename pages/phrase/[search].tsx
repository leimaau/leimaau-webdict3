import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { getTabPhrase } from '../../lib/dao'
import { tradData } from '../../lib/markdata/gzDict'
import 'default-passive-events'
import { TabView, TabPanel } from 'primereact/tabview'
import { Messages } from 'primereact/messages'
import Layout from '../../components/layout'
import QButton from '../../components/qbutton'
import FastLink from '../../components/fastLink'
import WordCloud from '../../components/wordcloud'
import WordCard from '../../components/wordcard'

export default function Phrase({ _isShort, isConnected, _tabDataList, _reqWord, _reqType }) {

  const msgs_db = useRef(null)
  const msgs_islong = useRef(null)
  const msgs_trad = useRef(null)
  const [isShort, setIsShort] = useState(_isShort)
  const [tabDataList, setTabDataList] = useState(_tabDataList)
  const [reqWord, setReqWord] = useState(_reqWord)
  const [reqType, setReqType] = useState(_reqType)

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
      tradLink.push(<span key={'charlink' + i}><Link key={'charlink' + i} href={'/phrase/' + tradRes[0].trad[i] + '?queryType=' + reqType}><a onClick={() => getTabContent(tradRes[0].trad[i], reqType, '詞彙')}>{tradRes[0].trad[i]}</a></Link>{(i != (tradRes[0].trad.length - 1).toString()) ? '」,「' : ''}</span>)
    }
  }

  useEffect(() => {
    if (!isConnected) msgs_db.current.show({ severity: 'error', summary: '', detail: '數據庫連接失敗，請刷新或聯繫站長', sticky: true })
    if (!isShort) msgs_islong.current.show({ severity: 'error', summary: '', detail: '數據量超過1000條，請縮小查詢範圍', sticky: true })
    if (tradRes.length != 0) msgs_trad.current.show({ severity: 'success', summary: '', content: (<React.Fragment><span className="flex flex-wrap">可能與之相關的繁體字：「{tradLink} 」</span></React.Fragment>), sticky: true })
  }, [isConnected, isShort, tradRes])

  const getTabContent = async (valueFind, radioFind, type) => {
    clearFunc()

    const res = await fetch('/api/tabcontent/' + valueFind + '?reqType=' + radioFind + '&type=' + type)
      .then(res => res.json())

    let dataLenght = 0
    for (let i in res.text) {
      dataLenght += res.text[i].length
    }

    if (dataLenght < 1000) {
      setIsShort(true)
      setTabDataList(res.text)
      setReqWord(valueFind)
      setReqType(radioFind)
    } else {
      setIsShort(false)
    }

  }


  return (
    <Layout home>

      <QButton search={reqWord} isConnected={isConnected} radioName={reqType} getContent={getTabContent} type="詞彙" />

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

      {(reqType == 'D' || reqType == 'F1' || reqType == 'F2') ? (
        <span></span>
      ) : (
        <TabView className="wordTabView overflow-auto">
          <TabPanel header="詞雲圖(南寧白話)">
            <WordCloud dataList={[tabDataList[0]]} />
          </TabPanel>
          <TabPanel header="詞雲圖(南寧平話)">
            <WordCloud dataList={[tabDataList[1]]} />
          </TabPanel>
        </TabView>
      )}

      {(reqType == 'D' || reqType == 'F1' || reqType == 'F2') ? (
        <span></span>
      ) : (
        <TabView className="wordTabView overflow-auto">
          <TabPanel header="南寧白話(市區)">
            <WordCard tabDataListArr={tabDataList[0]} dividerName="2021年Leimaau《詞彙零散資料匯總》(本站提供)" />
          </TabPanel>
          <TabPanel header="南寧平話(亭子)">
            <WordCard tabDataListArr={tabDataList[1]} dividerName="2021年Leimaau《詞彙零散資料匯總》(本站提供)" />
          </TabPanel>
        </TabView>
      )}

      <FastLink textChar={reqWord} reqType={reqType} />

    </Layout>
  )
}


export async function getServerSideProps(context) {
  const reqWord = context.params.search
  const reqType = context.query.queryType

  try {
    const tabDataList = await getTabPhrase(reqWord, reqType)

    let dataLenght = 0
    for (let i in tabDataList) {
      dataLenght += tabDataList[i].length
    }

    if (dataLenght < 1000) {
      return {
        props: { _isShort: true, isConnected: true, _tabDataList: tabDataList, _reqWord: reqWord, _reqType: reqType },
      }
    } else {
      return {
        props: { _isShort: false, isConnected: true, _tabDataList: [], _reqWord: reqWord, _reqType: reqType },
      }
    }
  } catch (e) {
    console.error(e)
    return {
      props: { _isShort: true, isConnected: false, _tabDataList: [], _reqWord: reqWord, _reqType: reqType },
    }
  }
}

