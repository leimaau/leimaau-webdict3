import { Divider } from 'primereact/divider'
import { Panel } from 'primereact/panel'
import styles from './qtable.module.css'

export default function FastLink({textChar, reqType}) {

    return (
        <div className={`${styles.grid} ${((reqType=='A' && /^[A-Za-z0-9]*$/.test(textChar))||reqType=='A2'||reqType=='A3'||reqType=='B'||reqType=='C'||reqType=='D'||reqType=='F1'||reqType=='F2') ? 'hidden': ''}`}>
            <Divider align="right">
                <span className="p-tag">快速鏈接參攷</span>
            </Divider>
            <Panel header="快速鏈接">
                <div className="card">
                    <div className="flex flex-column md:flex-row align-items-left">
                        <p>
                        漢典網：<a className='hover:underline' href={"http://www.zdic.net/hans/"+textChar} target="_blank">{textChar}</a> | <a className='hover:underline' href={"https://www.zdic.net/zd/yy/ys/"+textChar} target="_blank">韻書</a> | <a className='hover:underline' href={"http://www.zdic.net/zd/yy/yy/"+textChar} target="_blank">粵語</a> | <a className='hover:underline' href={"http://www.zdic.net/zd/yy/ph/"+textChar} target="_blank">平話</a><br/>
                        韻典網：<a className='hover:underline' href={"https://ytenx.org/zim?dzih="+textChar+"&dzyen=1&jtkb=1&jtkd=1&jtdt=1&jtgt=1"} target="_blank">{textChar}</a><br/>
                        國學大師：<a className='hover:underline' href={"http://www.guoxuedashi.net/zidian/"+encodeUnicode(textChar).replace('\\u','')+".html"} target="_blank">{textChar}</a><br/>
                        古今文字集成：<a className='hover:underline' href={"http://www.ccamc.co/cjkv.php?cjkv="+textChar} target="_blank">{textChar}</a><br/>
                        粵音資料集叢：<a className='hover:underline' href={"https://jyut.net/query?q="+textChar} target="_blank">{textChar}</a><br/>
                        漢語多功能字庫：<a className='hover:underline' href={"http://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word="+textChar} target="_blank">{textChar}</a> | <a className='hover:underline' href={"http://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/dialect.php?word="+textChar} target="_blank">其他方言讀音</a><br/>
                        漢字音典：<a className='hover:underline' href="https://mcpdict.sourceforge.io/cgi-bin/index.py" target="_blank">前往</a><br/>
                        粵典：<a className='hover:underline' href={"https://words.hk/zidin/wan/?q="+textChar} target="_blank">{textChar}</a><br/>
                        CC-Canto：<a className='hover:underline' href={"https://www.cccanto.org/search.php?q="+textChar} target="_blank">{textChar}</a><br/>
                        開放粵語詞典：<a className='hover:underline' href={"https://kaifangcidian.com/han/yue/?"+textChar} target="_blank">{textChar}</a><br/>
                        縱橫在線中文字典：<a className='hover:underline' href={"https://ckc.eduhk.hk/ckc2/dictionary.php?jiinput="+textChar+"&lang=b5&form1=1"} target="_blank">{textChar}</a><br/>
                        HKIED 繁簡辨識（1.0版）：<a className='hover:underline' href={"https://ckc.eduhk.hk/ckc2/translate.php?word="+textChar+"&lang="} target="_blank">{textChar}</a><br/>
                        英華字典資料庫：<a className='hover:underline' href={"http://mhdb.mh.sinica.edu.tw/dictionary/search.php?titleOnlyBtn=true&searchStr="+textChar+"&lang=b5"} target="_blank">{textChar}</a><br/>
                        粵拼歌詞網：<a className='hover:underline' href={"https://jyut6.com/search.php?keyword="+textChar} target="_blank">{textChar}</a><br/>
                        翡翠粵語歌詞：<a className='hover:underline' href={"https://www.feitsui.com/zh-hans/search/?query="+textChar} target="_blank">{textChar}</a><br/>
                        中國大百科全書數據庫：<a className='hover:underline' href={"https://h.bkzx.cn/search?query="+textChar+"&sublibId="} target="_blank">{textChar}</a><br/>
                        國學寶典：<a className='hover:underline' href={"http://www.gxbd.com/"} target="_blank">前往</a><br/>
                        大學數字圖書館合作計劃：<a className='hover:underline' href={"https://cadal.edu.cn/index/home"} target="_blank">前往</a><br/>
                        萬方方誌數據庫：<a className='hover:underline' href={"http://fz.wanfangdata.com.cn/index.do"} target="_blank">前往</a><br/>
                        </p>

                        <Divider layout="vertical" />

                        <p>
                        字海|葉典：<a className='hover:underline' href={"http://zisea.com/zscontent.asp?uni="+encodeUnicode(textChar).replace('\\u','')} target="_blank">{textChar}</a><br/>
                        字統网：<a className='hover:underline' href={"https://zi.tools/zi/"+textChar} target="_blank">{textChar}</a><br/>
                        漢字全息資源應用系統：<a className='hover:underline' href={"http://qxk.bnu.edu.cn/#/danziDetail/42c2d834-fa1d-47e9-9f90-972a687183f7/"+textChar+"/22d3af76-1ffe-46da-8c28-40e7dfe6b8d2/0"} target="_blank">{textChar}</a><br/>
                        中國哲學書電子化計劃：<a className='hover:underline' href={"https://ctext.org/dictionary.pl?if=gb&char="+textChar} target="_blank">{textChar}</a><br/>
                        Forvo：<a className='hover:underline' href={"https://zh.forvo.com/search/"+textChar+"/"} target="_blank">{textChar}</a><br/>
                        Unihan：<a className='hover:underline' href={"https://www.unicode.org/cgi-bin/GetUnihanData.pl?codepoint="+textChar} target="_blank">{textChar}</a><br/>
                        萌典：<a className='hover:underline' href={"https://www.moedict.tw/"+textChar} target="_blank">{textChar}</a><br/>
                        辭海：<a className='hover:underline' href={"https://www.cihai.com.cn/search/words?q="+textChar} target="_blank">{textChar}</a><br/>
                        活用中文大辭典：<a className='hover:underline' href={"https://lib.ctcn.edu.tw/chtdict/result.aspx?keyword="+textChar} target="_blank">{textChar}</a><br/>
                        漢字ペディア：<a className='hover:underline' href={"https://www.kanjipedia.jp/search?k="+textChar+"&kt=1&sk=leftHand"} target="_blank">{textChar}</a><br/>
                        CHISE IDS 漢字検索：<a className='hover:underline' href={"http://www.chise.org/ids-find?components="+textChar} target="_blank">{textChar}</a><br/>
                        GlyphWiki：<a className='hover:underline' href={"http://glyphwiki.org/wiki/"+encodeUnicode(textChar).replace('\\','')+"?tdsourcetag=s_pctim_aiomsg"} target="_blank">{textChar}</a><br/>
                        Chinese Etymology 字源：<a className='hover:underline' href={"https://hanziyuan.net/#"+textChar} target="_blank">{textChar}</a><br/>
                        ChuNom：<a className='hover:underline' href={"https://chunom.org/pages/?search="+textChar} target="_blank">{textChar}</a><br/>
                        小雞詞典：<a className='hover:underline' href={"https://jikipedia.com/search?phrase="+textChar+"&kt=1&sk=leftHand"} target="_blank">{textChar}</a><br/>
                        CantoDict：<a className='hover:underline' href={"http://www.cantonese.sheik.co.uk/scripts/masterlist.htm"} target="_blank">前往</a><br/>
                        中國數字方誌庫：<a className='hover:underline' href={"http://x.wenjinguan.com/"} target="_blank">前往</a><br/>
                        中國歷史文獻總庫：<a className='hover:underline' href={"http://mg.nlcpress.com/library/publish/default/Login.jsp"} target="_blank">前往</a><br/>
                        廣西師範大學圖書館：<a className='hover:underline' href={"http://www.library.gxnu.edu.cn/main.htm"} target="_blank">前往</a><br/>
                        </p>

                        <Divider layout="vertical" />

                        <p>
                        東方語言學：<a className='hover:underline' href={"http://www.eastling.org/"} target="_blank">前往</a><br/>
                        漢語方言學大詞典：<a className='hover:underline' href={"http://www.fangyanxue.com/pages/index/index.html"} target="_blank">前往</a><br/>
                        古音小鏡：<a className='hover:underline' href={"http://www.kaom.net/"} target="_blank">前往</a><br/>
                        小學堂：<a className='hover:underline' href={"http://xiaoxue.iis.sinica.edu.tw/"} target="_blank">前往</a><br/>
                        早期漢語方言文獻資料庫：<a className='hover:underline' href={"http://database.shss.ust.hk/5dialects/"} target="_blank">前往</a><br/>
                        香港小學學習字詞表：<a className='hover:underline' href={"https://www.edbchinese.hk/lexlist_ch/"} target="_blank">前往</a><br/>
                        壯漢在線詞典：<a className='hover:underline' href={"http://www.jiu60.com/hoiz/"} target="_blank">前往</a><br/>
                        廣東省情網：<a className='hover:underline' href={"http://dfz.gd.gov.cn/"} target="_blank">前往</a><br/>
                        中共廣州市委黨史文獻研究室：<a className='hover:underline' href={"http://www.gzsqw.org.cn/"} target="_blank">前往</a><br/>
                        廣西地情資料庫：<a className='hover:underline' href={"http://www.gxdfz.org.cn/gdtz/"} target="_blank">前往</a><br/>
                        開放康熙字典：<a className='hover:underline' href={"http://kangxi.adcs.org.tw/kangxizidian/"} target="_blank">前往</a><br/>
                        漢語大字典檢索：<a className='hover:underline' href={"http://www.homeinmists.com/hd/search.html"} target="_blank">前往</a><br/>
                        說文解字圖像查閱：<a className='hover:underline' href={"http://www.homeinmists.com/shuowen/find.html"} target="_blank">前往</a><br/>
                        說文解字在線查詢：<a className='hover:underline' href={"http://www.shuowen.org/"} target="_blank">前往</a><br/>
                        現代標準漢語與粵語對照資料庫：<a className='hover:underline' href={"http://apps.itsc.cuhk.edu.hk/hanyu/Page/Cover.aspx"} target="_blank">前往</a><br/>
                        ISO漢字查詢系統：<a className='hover:underline' href={"http://glyph.iso10646hk.net/chinese/icharacters.jsp"} target="_blank">前往</a><br/>
                        早期粵語口語文獻資料庫：<a className='hover:underline' href={"http://143.89.108.109/Candbase/"} target="_blank">前往</a><br/>
                        香港二十世紀中期粵語語料庫：<a className='hover:underline' href={"https://hkcc.eduhk.hk/v1/introduction.html"} target="_blank">前往</a><br/>
                        語保工程採錄展示平臺：<a className='hover:underline' href={"https://zhongguoyuyan.cn/"} target="_blank">前往</a><br/>
                        </p>
                    </div>
                </div>
            </Panel>
        </div>
    )
}


// 漢字轉 Unicode
const encodeUnicode = (str: string) => {
    let res = [];
    for (let i = 0; i < str.length; i++) {
        res[i] = ( "00" + str.charCodeAt(i).toString(16) ).slice(-4)
    }
    return "\\u" + res.join("\\u").toUpperCase()
}
    