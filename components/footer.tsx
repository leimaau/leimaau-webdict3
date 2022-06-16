import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Footer() {

  return (
      <footer className={styles.footer}>
        <span>Copyright © 2020-{new Date().getFullYear()} <a target="_blank" href="https://leimaau-webdict3.vercel.app/" rel="noopener noreferrer">Leimaau's Webdict 3</a> All Rights Reserved.</span>
      </footer>
  )
  }
  