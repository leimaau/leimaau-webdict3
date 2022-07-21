import React, { useEffect, useRef } from 'react'
import dbConnect from '../../lib/dbConnect'
import Layout from '../../components/layout'
import QButton from '../../components/qbutton'
import { Messages } from 'primereact/messages'
import styles from '../../styles/Home.module.css'

export default function PhraseIndex({ isConnected }) {
  
  const msgs_db = useRef(null)
  
  const clearFunc = () => {
    if (msgs_db.current!==null) msgs_db.current.clear()
  }

  useEffect(() => {
    if(!isConnected) msgs_db.current.show({ severity: 'error', summary: '', detail: '數據庫連接失敗，請刷新或聯繫站長', sticky: true })
  }, [isConnected])

  const getTabContent = async (valueFind, radioFind, type) => {
    clearFunc()
  }

  return (
    <Layout home>

      <h1 className={styles.title}>
        詞彙查詢
      </h1>
      
      <QButton search="" isConnected={isConnected} radioName="A" getContent={getTabContent} type="詞彙"/>

      {isConnected ? (
        <span></span>
      ) : (
        <Messages ref={msgs_db}></Messages>
      )}
        
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
