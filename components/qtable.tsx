import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { ColumnGroup } from 'primereact/columngroup'
import { Row } from 'primereact/row'
import { Tooltip } from 'primereact/tooltip'
import { Divider } from 'primereact/divider'
import Link from 'next/link'
import styles from './qtable.module.css'

const dynamicColumnsFunc = (tabCol: any[], year: string) => {
    const dynamicColumns = tabCol.map((col,i) => {
        if(!col.rowspan) col.rowspan = 1
        if(!col.colspan) col.colspan = 1
        if (col.field=='word' || col.field=='trad') {
            return <Column key={year+col.field} field={col.field} header={col.header} rowSpan={col.rowspan} colSpan={col.colspan} align="center" body={wordBodyTemplate}/>
        } else if (col.field=='word' || col.field=='simp') {
            return <Column key={year+col.field} field={col.field} header={col.header} rowSpan={col.rowspan} colSpan={col.colspan} align="center" body={wordBodyTemplate2}/>
        } else if (col.field=='jyutping' || col.field=='jp') {
            return <Column key={year+col.field} field={col.field} header={col.header} rowSpan={col.rowspan} colSpan={col.colspan} align="center" body={jpBodyTemplate}/>
        } else if (col.field=='jyutping' || col.field=='bwjp') {
            return <Column key={year+col.field} field={col.field} header={col.header} rowSpan={col.rowspan} colSpan={col.colspan} align="center" body={jpBodyTemplate2}/>
        } else if (col.field=='fanqie' && year!='1838') {
            return <Column key={year+col.field} field={col.field} header={col.header} rowSpan={col.rowspan} colSpan={col.colspan} align="center" body={fanqieBodyTemplate}/>
        } else if (col.field=='sour') {
            return <Column key={year+col.field} field={col.field} header={col.header} rowSpan={col.rowspan} colSpan={col.colspan} align="center" body={sourBodyTemplate}/>
        } else if (col.field=='page') {
            return <Column key={year+col.field} field={col.field} header={col.header} rowSpan={col.rowspan} colSpan={col.colspan} align="center" body={pageBodyTemplate}/>
        } else if (col.field=='year') {
            return <Column key={year+col.field} field={col.field} header={col.header} rowSpan={col.rowspan} colSpan={col.colspan} align="center" body={yearBodyTemplate}/>
        } else if (col.field=='firstflag') {
            return <Column key={year+col.field} field={col.field} header={col.header} rowSpan={col.rowspan} colSpan={col.colspan} align="center" body={firstflagBodyTemplate}/>
        } else if (col.field=='expl') {
            return <Column key={year+col.field} field={col.field} header={col.header} rowSpan={col.rowspan} colSpan={col.colspan} align="center" body={explBodyTemplate}/>
        } else if (col.field=='note') {
            return <Column key={year+col.field} field={col.field} header={col.header} rowSpan={col.rowspan} colSpan={col.colspan} align="center" body={noteBodyTemplate}/>
        } else {
            return <Column key={year+col.field} field={col.field} header={col.header} rowSpan={col.rowspan} colSpan={col.colspan} align="center" />
        }
    })
    return dynamicColumns
}

const wordBodyTemplate = (rowData) => {
    let word = rowData.word || rowData.trad
    if ((word.indexOf('|') > -1) && (rowData.year == '1856' || rowData.year == '1941')) {
        let charStr = word.split('|'), aLink = []
        for (let i in charStr) {
            let hrefStr = '/search/' + charStr[i] + ((rowData.trad==undefined) ? '?queryType=A1' : '?queryType=E1')
            /*aLink.push(
            <Link key={'wordBodyTemplate'+hrefStr+i} href={hrefStr} scroll={false}>
                <a className='hover:underline' onClick={() => _getContent(charStr[i],(rowData.simp==undefined) ? 'A1' : 'E1', '??????')}>{charStr[i]}<span>{(i!=(charStr.length-1).toString())?'|':''}</span></a>
            </Link>)*/
            aLink.push(
            <Link key={'wordBodyTemplate'+hrefStr+i} href={hrefStr} scroll={false}>
                <a className='hover:underline'>{charStr[i]}<span>{(i!=(charStr.length-1).toString())?'|':''}</span></a>
            </Link>)
        }
        return <>{aLink}</>
    } else {
        let hrefStr = '/search/' + word + ((rowData.trad==undefined) ? '?queryType=A1' : '?queryType=E1')
        return (
            /*<Link key={'wordBodyTemplate'+hrefStr} href={hrefStr} scroll={false}>
              <a className='hover:underline' onClick={() => _getContent(word,(rowData.simp==undefined) ? 'A1' : 'E1', '??????')}>{word}</a>
            </Link>*/
            <Link key={'wordBodyTemplate'+hrefStr} href={hrefStr} scroll={false}>
              <a className='hover:underline'>{word}</a>
            </Link>
        )
    }
}

const wordBodyTemplate2 = (rowData) => {
    let word = rowData.word || rowData.simp
    let hrefStr = '/search/' + word + ((rowData.simp==undefined) ? '?queryType=A1' : '?queryType=E2')
    return (
        /*<Link key={'wordBodyTemplate2'+hrefStr} href={hrefStr} scroll={false}>
          <a className='hover:underline' onClick={() => _getContent(word,(rowData.simp==undefined) ? 'A1' : 'E2', '??????')}>{word}</a>
        </Link>*/
        <Link key={'wordBodyTemplate2'+hrefStr} href={hrefStr} scroll={false}>
          <a className='hover:underline'>{word}</a>
        </Link>
    )
}

const jpBodyTemplate = (rowData) => {
    let jyutping = rowData.jyutping || rowData.jp
    let hrefStr = '/search/' + jyutping + '?queryType=A2'
    return (
        /*<Link key={'jpBodyTemplate'+hrefStr} href={hrefStr} scroll={false}>
          <a className='hover:underline' onClick={() => _getContent(jyutping,'A2', '??????')}>{jyutping}</a>
        </Link>*/
        <Link key={'jpBodyTemplate'+hrefStr} href={hrefStr} scroll={false}>
          <a className='hover:underline'>{jyutping}</a>
        </Link>
    )
}

const jpBodyTemplate2 = (rowData) => {
    let jyutping = rowData.jyutping || rowData.bwjp
    let hrefStr = '/search/' + jyutping + '?queryType=A2'
    return (
        /*<Link key={'jpBodyTemplate2'+hrefStr} href={hrefStr} scroll={false}>
          <a className='hover:underline' onClick={() => _getContent(jyutping,'A2', '??????')}>{jyutping}</a>
        </Link>*/
        <Link key={'jpBodyTemplate2'+hrefStr} href={hrefStr} scroll={false}>
          <a className='hover:underline'>{jyutping}</a>
        </Link>
    )
}

const fanqieBodyTemplate = (rowData) => {
    let fanqie = rowData.fanqie
    let hrefStr = '/search/' + fanqie + '?queryType=D'
    return (
        /*<Link key={'fanqieBodyTemplate'+hrefStr} href={hrefStr} scroll={false}>
          <a className='hover:underline' onClick={() => _getContent(fanqie,'D', '??????')}>{fanqie}</a>
        </Link>*/
        <Link key={'fanqieBodyTemplate'+hrefStr} href={hrefStr} scroll={false}>
          <a className='hover:underline'>{fanqie}</a>
        </Link>
    )
}

const firstflagBodyTemplate = (rowData) => {
    return (
        <span>{(rowData.firstflag=='1') ? '1?????????' : '2?????????'}</span>
    )
}

const yearBodyTemplate = (rowData) => {
    return (
        <strong>{rowData.year}</strong>
    )
}

const explBodyTemplate = (rowData) => {
    return (
        <p className="customClassName" data-pr-tooltip={rowData.expl} data-pr-position="left">{rowData.expl}</p>
    )
}

const noteBodyTemplate = (rowData) => {
    return (
        <p className="customClassName" data-pr-tooltip={rowData.note} data-pr-position="left">{rowData.note}</p>
    )
}

const pageBodyTemplate = (rowData) => {
    let formatSOUR = <></>
    if (/P/.test(rowData.page)||rowData.page!=undefined){
        let index = rowData.page.lastIndexOf('P')
        if(rowData.year=='1782-1838') formatSOUR = <span>{rowData.page.substring(0, index)}{pageSplit(rowData.page.replace('-','???'), 'jpg', (rowData.volume=='??????') ? 'http://ytenx.org/static/img/KrungGhoTchiekDukPyonYonhTsuatQjeuhGhopDzip/volume1/' : 'http://ytenx.org/static/img/KrungGhoTchiekDukPyonYonhTsuatQjeuhGhopDzip/volume2/')}</span>
        if(rowData.year=='1856') formatSOUR = <span>{rowData.page.substring(0, index)}{pageSplit(rowData.page.replace('*','s'), 'jpg', 'https://fastly.jsdelivr.net/gh/leimaau/CDN@latest/data-store/1856fy/fy')}</span>
        if(rowData.year=='1941') formatSOUR = <span>{rowData.page.substring(0, index)}{pageSplit(rowData.page, 'jpg', 'https://fastly.jsdelivr.net/gh/leimaau/CDN@latest/data-store/1941yy/yy')}</span>
    } else {
        formatSOUR = <span><span>P</span>{rowData.page}</span>
    }

    return (
        formatSOUR
    )
}

const sourBodyTemplate = (rowData) => {
    let linkaddr = 'https://fastly.jsdelivr.net/gh/leimaau/CDN@latest/data-store/' + rowData.year
	if (rowData.year == '1994') linkaddr += 'zh/zh'
	else if (rowData.year == '1997') linkaddr += 'yd/yd'
	else if (rowData.year == '1998') linkaddr += 'dfz/dfz'
	else if (rowData.year == '2003') linkaddr += 'zk/zk'
	else if (rowData.year == '2007') linkaddr = ''
	else if (rowData.year == '2008') linkaddr += 'yj/yj'
	else if (rowData.year == '2009') linkaddr += 'yy/yy'
	else if (rowData.year == '201703') linkaddr = linkaddr.replace('201703','2017') + 'gj/gj'
	else if (rowData.year == '201705') linkaddr =  linkaddr.replace('201705','2017') + 'hy/hy0'
	else if (rowData.year == '2018') linkaddr = ''
	else if (rowData.year == '201806') linkaddr = linkaddr.replace('201806','2018') + 'yj/yj'
	else if (/2021/.test(rowData.sour)) {
		if (/1997?????????????????????????????????????????????/.test(rowData.sour)){
			linkaddr = linkaddr.replace('2021_','') + 'cd/cd'
		} else if (/1998???????????????????????????????????????????????/.test(rowData.sour)){
			linkaddr = linkaddr.replace('2021_','') + 'sz/sz'
		} else {
			linkaddr = ''
		}
	}

    let formatSOUR = <></>
    if (/P/.test(rowData.sour) && linkaddr!=''){
        let index = rowData.sour.lastIndexOf('P')
        formatSOUR = <span>{rowData.sour.substring(0, index)}{pageSplit(rowData.sour, 'png', linkaddr)}</span>
    } else {
        formatSOUR = <span>{rowData.sour}</span>
    }

    return (
        formatSOUR
    )
}

// ??????????????????
export const pageSplit = (sour, picType, linkaddr) => {
    let index = sour.lastIndexOf('P')
    let value = sour.substring(index+1,sour.length)
	let pageLink = []
	let pages = value.replace('P', '').split('???')
	for (let i in pages) {
        pageLink.push(<span key={'BodyTemplate'+i}>P<Link key={'BodyTemplate'+i} href={`${linkaddr + pages[i]}.${picType}`}><a target="_Blank">{pages[i].replace('s','*')}</a></Link><span>{(i!=(pages.length-1).toString())?'???':''}</span></span>)
	}
    return <>{pageLink}</>
}

//let _getContent = (valueFind, radioFind, type) => {}

export default function QTable({tabDataList, tabColList, reqType, getContent}) {
    //_getContent = getContent
    const showtabData = tabDataList[0]
    const showtabData2 = tabDataList[1]
    const showtabData3 = tabDataList[2]
    const showtabData4 = tabDataList[3]
    const showtabData5 = tabDataList[4]
    const showtabData6 = tabDataList[5]
    const showtabData7 = tabDataList[6]
    
    const dynamicColumns = dynamicColumnsFunc(tabColList[0],'1008')
    const dynamicColumns2 = dynamicColumnsFunc(tabColList[1],'1039')
    const dynamicColumns3 = dynamicColumnsFunc(tabColList[2],'1838')
    const dynamicColumns4 = dynamicColumnsFunc(tabColList[3],'1856')
    const dynamicColumns5 = dynamicColumnsFunc(tabColList[4],'1941')
    const dynamicColumns6 = dynamicColumnsFunc(tabColList[5],'All')

    const headerGroup1008 = <ColumnGroup>
                            <Row>
                                <Column header="??????" rowSpan={2} align="center" />
                                <Column header="??????" rowSpan={2} align="center" />
                                <Column header="???" rowSpan={2} align="center" />
                                <Column header="???" rowSpan={2} align="center" />
                                <Column header="???" rowSpan={2} align="center" />
                                <Column header="???" rowSpan={2} align="center" />
                                <Column header="???" rowSpan={2} align="center" />
                                <Column header="???" rowSpan={2} align="center" />
                                <Column header="??????" rowSpan={2} align="center" />
                                <Column header="??????" rowSpan={2} align="center" />
                                <Column header="??????" rowSpan={2} align="center" />
                                <Column header="??????" rowSpan={2} align="center" />
                                <Column header="?????????????????????" rowSpan={1} colSpan={2} align="center" />
                                <Column header="?????????????????????" rowSpan={1} colSpan={2} align="center" />
                            </Row>
                            <Row>
                                <Column header="ipa" align="center" field="ipa"/>
                                <Column header="??????" align="center" field="jp"/>
                                <Column header="ipa" align="center" field="bwipa"/>
                                <Column header="??????" align="center" field="bwjp"/>
                            </Row>
                        </ColumnGroup>

    const headerGroup1039 = <ColumnGroup>
                            <Row>
                                <Column header="??????" rowSpan={2} align="center" />
                                <Column header="??????" rowSpan={2} align="center" />
                                <Column header="???" rowSpan={2} align="center" />
                                <Column header="???" rowSpan={2} align="center" />
                                <Column header="???(??????)" rowSpan={2} align="center" />
                                <Column header="???" rowSpan={2} align="center" />
                                <Column header="???" rowSpan={2} align="center" />
                                <Column header="???" rowSpan={2} align="center" />
                                <Column header="??????" rowSpan={2} align="center" />
                                <Column header="??????" rowSpan={2} align="center" />
                                <Column header="?????????????????????" rowSpan={1} colSpan={2} align="center" />
                                <Column header="?????????????????????" rowSpan={1} colSpan={2} align="center" />
                            </Row>
                            <Row>
                                <Column header="ipa" align="center" field="ipa"/>
                                <Column header="??????" align="center" field="jp"/>
                                <Column header="ipa" align="center" field="bwipa"/>
                                <Column header="??????" align="center" field="bwjp"/>
                            </Row>
                        </ColumnGroup>

    const headerGroup1838 = <ColumnGroup>
                            <Row>
                                <Column header="??????" rowSpan={2} align="center" />
                                <Column header="??????" rowSpan={2} align="center" />
                                <Column header="??????" rowSpan={2} align="center" />
                                <Column header="??????" rowSpan={2} align="center" />
                                <Column header="??????" rowSpan={2} align="center" />
                                <Column header="??????" rowSpan={2} align="center" />
                                <Column header="??????" rowSpan={2} align="center" />
                                <Column header="??????" rowSpan={2} align="center" />
                                <Column header="???" rowSpan={2} align="center" />
                                <Column header="???" rowSpan={2} align="center" />
                                <Column header="??????" rowSpan={1} colSpan={2} align="center" />
                            </Row>
                            <Row>
                                <Column header="ipa" align="center" field="ipa"/>
                                <Column header="??????" align="center" field="jp"/>
                            </Row>
                        </ColumnGroup>

    const headerGroup1856 = <ColumnGroup>
                            <Row>
                                <Column header="??????" rowSpan={2} align="center" />
                                <Column header="??????" rowSpan={2} align="center" />
                                <Column header="???????????????" rowSpan={2} align="center" />
                                <Column header="??????" rowSpan={2} align="center" />
                                <Column header="??????" rowSpan={2} align="center" />
                                <Column header="????????????" rowSpan={2} align="center" />
                                <Column header="????????????" rowSpan={2} align="center" />
                                <Column header="???" rowSpan={2} align="center" />
                                <Column header="??????" rowSpan={1} colSpan={2} align="center" />
                            </Row>
                            <Row>
                                <Column header="ipa" align="center" field="ipa"/>
                                <Column header="??????" align="center" field="jp"/>
                            </Row>
                        </ColumnGroup>

    const headerGroup = <ColumnGroup>
                            <Row>
                                <Column header="??????" rowSpan={2} align="center" />
                                <Column header="??????" rowSpan={1} colSpan={2} align="center" />
                                <Column header="IPA" rowSpan={1} colSpan={2} align="center" />
                                <Column header="??????" rowSpan={2} align="center" />
                                <Column header="??????" rowSpan={2} align="center" />
                                <Column header="??????" rowSpan={2} align="center" />
                                <Column header="??????????????????" rowSpan={2} align="center" />
                            </Row>
                            <Row>
                                <Column header="??????" align="center" field="trad"/>
                                <Column header="??????" align="center" field="simp"/>
                                <Column header="??????IPA" align="center" field="ipa_s"/>
                                <Column header="??????IPA" align="center" field="ipa_t"/>
                            </Row>
                        </ColumnGroup>


    return (
        <div className={`${styles.grid} ${styles.table}`}>
            <span className={(reqType=='D'||reqType=='F1'||reqType=='F2') ? 'hidden': ''}>
                <Divider align="right" type="dashed">
                    <span className="p-tag"><i className="pi pi-bookmark"></i>?????????????????????</span>
                </Divider>

                <h2>????????????<small>??????</small></h2>
                <div className="card">
                    <DataTable emptyMessage="???????????????" value={showtabData6} headerColumnGroup={headerGroup} stripedRows showGridlines responsiveLayout="scroll">
                        {dynamicColumns6}
                    </DataTable>
                </div>

                <h2>????????????<small>??????</small></h2>
                <div className="card">
                    <DataTable emptyMessage="???????????????" value={showtabData7} headerColumnGroup={headerGroup} stripedRows showGridlines responsiveLayout="scroll">
                        {dynamicColumns6}
                    </DataTable>
                </div>
            </span>

            <Divider align="right" type="dashed">
                <span className="p-tag"><i className="pi pi-bookmark"></i>?????????????????????</span>
            </Divider>

            <span className={(reqType=='F2') ? 'hidden': ''}>
                <h2>????????????</h2>
                <div className="card">
                    <DataTable emptyMessage="???????????????" value={showtabData} headerColumnGroup={headerGroup1008} stripedRows showGridlines responsiveLayout="scroll">
                        {dynamicColumns}
                    </DataTable>
                </div>
                <h2>????????????</h2>
                <div className="card">
                    <DataTable emptyMessage="???????????????" value={showtabData2} headerColumnGroup={headerGroup1039} stripedRows showGridlines responsiveLayout="scroll">
                        {dynamicColumns2}
                    </DataTable>
                </div>
            </span>

            <span className={(reqType=='D'||reqType=='F1') ? 'hidden': ''}>
                <h2>????????????????????????????????????</h2>
                <div className="card">
                    <DataTable emptyMessage="???????????????" value={showtabData3} headerColumnGroup={headerGroup1838} stripedRows showGridlines responsiveLayout="scroll">
                        {dynamicColumns3}
                    </DataTable>
                </div>

                <span className={(reqType=='F2') ? 'hidden': ''}>
                    <h2>????????????????????????</h2>
                    <div className="card">
                        <DataTable emptyMessage="???????????????" value={showtabData4} headerColumnGroup={headerGroup1856} stripedRows showGridlines responsiveLayout="scroll">
                            {dynamicColumns4}
                        </DataTable>
                    </div>
                    <h2>??????????????????</h2>
                    <div className="card">
                        <DataTable emptyMessage="???????????????" value={showtabData5} stripedRows showGridlines responsiveLayout="scroll">
                            {dynamicColumns5}
                        </DataTable>
                    </div>
                </span>
            </span>
            <Tooltip target=".customClassName" mouseTrack mouseTrackLeft={10} style={{ maxWidth: '20rem' }} />
        </div>
    )
}
