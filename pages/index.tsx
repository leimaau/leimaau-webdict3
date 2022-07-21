import React, { useEffect, useRef } from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import IndexGrid from '../components/indexGrid'
import QButton from '../components/qbutton'
import dbConnect from '../lib/dbConnect'
import { Messages } from 'primereact/messages'

export default function Home({ isConnected }) {

  const msgs_db = useRef(null)

  const clearFunc = () => {
    if (msgs_db.current!==null) msgs_db.current.clear()
  }

  useEffect(() => {
    if(!isConnected) msgs_db.current.show({ severity: 'error', summary: 'Error', detail: '數據庫連接失敗，請刷新或聯繫站長', sticky: true })
  }, [isConnected])

  const getTabContent = async (valueFind, radioFind, type) => {
    clearFunc()
  }

  return (
    <Layout home>
      
      <h1 className={styles.title}>
        Leimaau's Webdict 3
      </h1>

      <p className={styles.description}>
        狸貓的在線辭典{' '}
        <code className={styles.code}> v3.1.0 </code>
      </p>

      <QButton search="" isConnected={isConnected} radioName="A" getContent={getTabContent} type="單字"/>

      {isConnected ? (
        <span></span>
      ) : (
        <Messages ref={msgs_db}></Messages>
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