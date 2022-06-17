import styles from '../styles/Home.module.css'

export default function Footer() {

  return (
      <footer className={styles.footer}>
        <span className="flex flex-wrap align-items-center justify-content-center">Copyright © 2020-{new Date().getFullYear()}&nbsp;<a target="_blank" href="https://leimaau-webdict3.vercel.app/" rel="noopener noreferrer">Leimaau's Webdict 3</a>&nbsp;All Rights Reserved.</span>
      </footer>
  )
  }
  