import { AppProps } from 'next/app'
import NextNProgress from "nextjs-progressbar"
import { ScrollTop } from 'primereact/scrolltop'
import PrimeReact from 'primereact/api'
import '../styles/globals.css'
import "primereact/resources/themes/lara-light-indigo/theme.css"  //theme
//import "primereact/resources/themes/md-light-deeppurple/theme.css"
import "primereact/resources/primereact.min.css"                  //core css
import "primeicons/primeicons.css"                                //icons
import 'primeflex/primeflex.css'

function MyApp({ Component, pageProps }: AppProps) {
  PrimeReact.ripple = true
  return (
    <>
      <NextNProgress />
      <Component {...pageProps} />
      <ScrollTop threshold={200} className="custom-scrolltop" icon="pi pi-angle-up"/>
    </>
  )
}

export default MyApp
