import styles from '../../styles/Home.module.css'
import Layout from '../../components/layout'

export default function ToolsIndex() {

  return (
    <Layout home>
      
      <h1 className={styles.title}>
        常用工具
      </h1>

      <p className={styles.description}>
        Get started by editing{' '}
        <code className={styles.code}>pages/index.js</code>
      </p>
        
    </Layout>
  )
}
