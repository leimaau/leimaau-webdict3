import styles from '../../styles/Home.module.css'
import Layout from '../../components/layout'
import { getSortedPostsData } from '../../lib/posts'

export default function PostIndex({ allPostsData }) {

  return (
    <Layout home>
      
      <h1 className={styles.title}>
        快速查詢文章
      </h1>

      <p className={styles.description}>
        快速查詢本站所有文章
      </p>

      <div className={styles.grid}>
          {allPostsData.map(({ id }) => (
            <a key={id} href={`/posts/${id}`} className={styles.card}>
            <h2>{getArticleName(id)} &rarr;</h2>
            <p>點擊快速查詢文章《{getArticleName(id)}》</p>
            </a>
          ))}
      </div>

    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

const getArticleName = (id: string) => {
  if (id=='about') return '關於'
  if (id=='appendix4.2') return '南寧話輸入方案'
  if (id=='infer') return '理論音推導'
  if (id=='PHONETICIZE') return '南寧白話拼音方案'
  if (id=='PHONETICIZE_bingwaa') return '南寧平話拼音方案'
  if (id=='REFERENCES') return '參攷資料'
  if (id=='section2.2') return '與廣州話的區別'
  if (id=='allbook') return '本站所用參攷資料'
  return id
}