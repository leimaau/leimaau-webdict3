import React, { useEffect, useRef } from 'react'
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
  /*
  const [isShort, setIsShort] = useState(_isShort)
  const [tabDataList, setTabDataList] = useState(_tabDataList)
  const [reqWord, setReqWord] = useState(_reqWord)
  const [reqType, setReqType] = useState(_reqType)*/
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
      //tradLink.push(<span key={'charlink' + i}><Link key={'charlink' + i} href={'/phrase/' + tradRes[0].trad[i] + '?queryType=' + reqType}><a onClick={() => getTabContent(tradRes[0].trad[i], reqType, 'čŠĺ˝')}>{tradRes[0].trad[i]}</a></Link>{(i != (tradRes[0].trad.length - 1).toString()) ? 'ă,ă' : ''}</span>)
      tradLink.push(<span key={'charlink' + i}><Link key={'charlink' + i} href={'/phrase/' + tradRes[0].trad[i] + '?queryType=' + reqType}><a>{tradRes[0].trad[i]}</a></Link>{(i != (tradRes[0].trad.length - 1).toString()) ? 'ă,ă' : ''}</span>)
    }
  }

  useEffect(() => {
    if (!isConnected) msgs_db.current.show({ severity: 'error', summary: '', detail: 'ć¸ćĺşŤéŁćĽĺ¤ąćďźčŤĺˇć°ćčŻçšŤçŤéˇ', sticky: true })
    if (!isShort) msgs_islong.current.show({ severity: 'error', summary: '', detail: 'ć¸ćéčśé1000ć˘ďźčŤç¸Žĺ°ćĽčŠ˘çŻĺ', sticky: true })
    if (tradRes.length != 0) msgs_trad.current.show({ severity: 'success', summary: '', content: (<React.Fragment><span className="flex flex-wrap">ĺŻč˝čäšç¸éççšéŤĺ­ďźă{tradLink} ă</span></React.Fragment>), sticky: true })
  }, [isConnected, isShort, tradRes])

  const getTabContent = async (valueFind, radioFind, type) => {
    clearFunc()
    /*
    const dev = process.env.NODE_ENV !== 'production'

    const server = dev ? 'http://localhost:3000' : 'https://leimaau-webdict3.vercel.app'

    const res = await fetch('/api/tabcontent/' + valueFind + '?reqType=' + radioFind + '&type=' + type, {
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

      <QButton search={reqWord} isConnected={isConnected} radioName={reqType} getContent={getTabContent} type="čŠĺ˝" />

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
          <TabPanel header="čŠé˛ĺ(ĺĺŻ§ç˝čŠą)">
            <WordCloud dataList={[tabDataList[0]]} />
          </TabPanel>
          <TabPanel header="čŠé˛ĺ(ĺĺŻ§ĺšłčŠą)">
            <WordCloud dataList={[tabDataList[1]]} />
          </TabPanel>
        </TabView>
      )}

      {(reqType == 'D' || reqType == 'F1' || reqType == 'F2') ? (
        <span></span>
      ) : (
        <TabView className="wordTabView overflow-auto">
          <TabPanel header="ĺĺŻ§ç˝čŠą(ĺ¸ĺ)">
            <WordCard tabDataListArr={tabDataList[0]} dividerName="2021ĺš´LeimaauăčŠĺ˝éśćŁčłćĺŻç¸˝ă(ćŹçŤćäž)" />
          </TabPanel>
          <TabPanel header="ĺĺŻ§ĺšłčŠą(äş­ĺ­)">
            <WordCard tabDataListArr={tabDataList[1]} dividerName="2021ĺš´LeimaauăčŠĺ˝éśćŁčłćĺŻç¸˝ă(ćŹçŤćäž)" />
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

