import Head from 'next/head'
import styles from '../styles/Home.module.css'
import layoutStyles from './layout.module.css'
import Navbar from '../components/nav'
import Footer from '../components/footer'

export default function Layout({ children, home }) {
  return (
    <div>
        <Navbar/>
        <div className={ home ? styles.container : layoutStyles.container}>
            <Head>
                <title>Leimaau's Webdict 3.0</title>
                <meta charSet="utf-8" name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={ home ? styles.header : layoutStyles.header}></header>
            <main className={ home ? styles.main : layoutStyles.main}>{children}</main>
        </div>
        <Footer/>
    </div>
  )
}
