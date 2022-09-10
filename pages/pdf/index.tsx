import * as React from 'react'
import { useRouter } from 'next/router'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'


export default function PDFViewer() {
    const defaultLayoutPluginInstance = defaultLayoutPlugin()
    const router = useRouter()

    let pdfname = ''
    if (router.query.counter == '1')  pdfname = '/南寧白話單字音表(總表).pdf'
    if (router.query.counter == '2')  pdfname = '/南寧白話同音字表(總表).pdf'
    if (router.query.counter == '3')  pdfname = '/南寧亭子平話單字音表(總表).pdf'
    if (router.query.counter == '4')  pdfname = '/南寧亭子平話同音字表(總表).pdf'
    if (router.query.counter == '5')  pdfname = '/南寧白話、南寧亭子平話與廣州話三語對照字表.pdf'

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
            <div
                style={{
                    height: '900px',
                    width: '900px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: '15px',
                    marginBottom: 'auto',
                }}
            >
                <Viewer fileUrl={pdfname || '/南寧白話單字音表(總表).pdf'} plugins={[defaultLayoutPluginInstance]} />
            </div>
        </Worker>
    )
}
