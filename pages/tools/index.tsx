import styles from '../../styles/Home.module.css'
import Layout from '../../components/layout'

export default function ToolsIndex() {

  return (
    <Layout home>
      
      <h1 className={styles.title}>
        常用工具
      </h1>

      <p className={styles.description}>
        常用工具快速鏈接
      </p>
        
      <div className={styles.grid}>
          <a href={'/tools/jyutping_ipa'} className={styles.card}>
          <h2>音標轉換 &rarr;</h2>
          <p>粵拼與IPA相互轉換，提供多種IPA版本</p>
          </a>
      </div>

      <div className={styles.grid}>
          <a href={'/tools/signarticle'} className={styles.card}>
          <h2>在線標註 &rarr;</h2>
          <p>對文章在線標註粵拼或IPA，提供多種IPA版本</p>
          </a>
      </div>

      <div className={styles.grid}>
          <a href={'/posts/infer'} className={styles.card}>
          <h2>理論音推導 &rarr;</h2>
          <p>利用《廣韻》《集韻》推導理論音的數據庫源碼展示</p>
          </a>
      </div>

      <div className={styles.grid}>
          <a href={'/posts/appendix4.2'} className={styles.card}>
          <h2>南寧話輸入方案 &rarr;</h2>
          <p>RIME輸入法製作的南寧話輸入方案</p>
          </a>
      </div>

    </Layout>
  )
}
