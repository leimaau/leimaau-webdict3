import styles from '../../styles/Home.module.css'
import Layout from '../../components/layout'

export default function PostIndex() {

  return (
    <Layout home>
      
      <h1 className={styles.title}>
        入門文章
      </h1>

      <p className={styles.description}>
        Get started by editing{' '}
        <code className={styles.code}>pages/index.js</code>
      </p>
        
    </Layout>
  )
}
