import styles from '../styles/Home.module.css'

export default function IndexGrid() {

  return (
    <div className={styles.grid}>
      <a href={"/posts/PHONETICIZE"} className={styles.card}>
        <h2>南寧白話拼音方案 &rarr;</h2>
        <p>通過學習南寧白話拼音方案快速入門南寧白話!</p>
      </a>

      <a href={"/posts/PHONETICIZE_bingwaa"} className={styles.card}>
        <h2>南寧平話拼音方案 &rarr;</h2>
        <p>通過學習南寧亭子平話拼音方案快速入門亭子平話!</p>
      </a>

      <a href={"https://github.com/leimaau/naamning_jyutping"} target="_blank" className={styles.card}>
        <h2>南寧話輸入方案 &rarr;</h2>
        <p>提供了白話和平話的RIME輸入法碼表，通過輸入法可快速打出書面字和口語字。</p>
      </a>

      <a href={"https://github.com/leimaau/Nanning-Dialect-Manual"} target="_blank" className={styles.card}>
        <h2>南寧話快速查詢手冊 &rarr;</h2>
        <p>下載南寧話單字音快速查詢手冊PDF可快速查詢常用字的單字音。</p>
      </a>

      <a href={"https://github.com/osfans/MCPDict"} target="_blank" className={styles.card}>
        <h2>漢字音典APP下載 &rarr;</h2>
        <p>下載漢字音典APP快速查詢包括南寧話在內漢語方言的單字音。</p>
      </a>
    </div>
  )
}
