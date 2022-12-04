import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import IndexGrid from '../components/indexGrid'
import QButton from '../components/qbutton'
import dbConnect from '../lib/dbConnect'
import { Messages } from 'primereact/messages'
import { getTabAll2 } from '../lib/dealDataFunc'

export default function Home({ isConnected }) {

  const msgs_db = useRef(null)
  const msgs_loding = useRef(null)
  const [loding, setLoding] = useState<boolean>(false)

  const clearFunc = () => {
    if (msgs_db.current!==null) msgs_db.current.clear()
    if (msgs_loding.current!==null) msgs_loding.current.clear()
  }

  useEffect(() => {
    if(!isConnected) msgs_db.current.show({ severity: 'error', summary: 'Error', detail: '數據庫連接失敗，請刷新或聯繫站長', sticky: true })
    getTabContent2('旬', 'A', '')
    if(!loding) msgs_loding.current.show({ severity: 'info', summary: 'Info', detail: '數據正在加載中，請稍等......', sticky: true })
  }, [isConnected, loding])

  const getTabContent = async (valueFind, radioFind, type) => {
    clearFunc()
  }

  const getTabContent2 = async (valueFind, radioFind, type) => {
    const newList = await getTabAll2(valueFind, radioFind, '', '')
    clearFunc()
    if(newList[5]!==undefined && newList[5].length!==0) setLoding(true)
  }

  return (
    <Layout home>
      
      <h1 className={styles.title}>
        Leimaau's Webdict 3
      </h1>

      <p className={styles.description}>
        狸貓的在線辭典{' '}
        <code className={styles.code}> v3.0.8 </code>
      </p>

      <QButton search="" isConnected={isConnected && loding} radioName="A" getContent={getTabContent} type="單字"/>

      {isConnected ? (
        <span></span>
      ) : (
        <Messages ref={msgs_db}></Messages>
      )}

      {loding ? (
        <span></span>
      ) : (
        <Messages ref={msgs_loding}></Messages>
      )}

      <IndexGrid/>
        
    </Layout>
  )
}

export async function getServerSideProps(context) {
  try {
    await dbConnect()
    return {
      props: { isConnected: true },
    }
  } catch (e) {
      console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}