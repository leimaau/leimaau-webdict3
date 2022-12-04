import React, { useState, useRef, useEffect } from 'react'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import Layout from '../../components/layout'

export default function soundSplit() {
  const [value1, setValue1] = useState('cot6')
  const [value2, setValue2] = useState('')
  const toast = useRef(null)
  const [copied, setCopied] = useState(false)

  const syllable = ['a','aa','aai','aak','aan','aang','aap','aat','aau','ai','ak','am','an','ang','ap','at','au','baa','baai','baak','baan','baang','baap','baat','baau','bai','bak','bam','ban','bang','bap','bat','bau','be','bek','ben','beng','bet','beu','bi','bik','bin','bing','bit','biu','bo','bok','bong','bot','bu','bui','buk','bun','bung','but','caa','caai','caak','caam','caan','caang','caap','caat','caau','cai','cak','cam','can','cang','cap','cat','cau','ce','cek','cem','cen','ceng','cep','cet','ceu','ci','cik','cim','cin','cing','cip','cit','ciu','co','coek','coeng','coi','cok','cong','cot','cu','cui','cuk','cung','cy','cyu','cyun','cyut','daa','daai','daak','daam','daan','daang','daap','daat','dai','dak','dam','dan','dang','dap','dat','dau','de','dek','dem','deng','dep','det','deu','di','dik','dim','din','ding','dip','dit','diu','do','doe','doek','doeng','doet','doi','dok','dong','du','dui','duk','dung','dut','dyun','dyut','e','ek','en','et','eu','faa','faai','faak','faan','faat','fai','fak','fan','fang','fat','fau','fe','fen','fet','fi','fik','fing','fit','fiu','fo','fok','fong','fot','fu','fui','fuk','fun','fung','fut','gaa','gaai','gaak','gaam','gaan','gaang','gaap','gaat','gaau','gai','gak','gam','gan','gang','gap','gat','gau','ge','gem','gen','geng','gep','geu','gi','gik','gim','gin','ging','gip','git','giu','go','goe','goek','goeng','goi','gok','gon','gong','got','gu','gui','guk','gun','gung','gut','gwaa','gwaai','gwaak','gwaan','gwaang','gwaat','gwai','gwak','gwan','gwang','gwat','gwe','gwen','gwet','gwik','gwing','gwo','gwok','gwong','gyu','gyun','gyut','haa','haai','haak','haam','haan','haang','haap','haat','haau','hai','hak','ham','han','hang','hap','hat','hau','he','hek','hem','hen','heng','het','heu','hi','hik','him','hin','hing','hip','hit','hiu','hm','hng','ho','hoe','hoeng','hoet','hoi','hok','hon','hong','hot','hu','huk','hung','hyu','hyun','hyut','ik','jaa','jaai','jaak','jaam','jaang','jaap','jaau','jai','jak','jam','jan','jang','jap','jat','jau','je','jek','jem','jen','jeng','jep','jet','jeu','ji','jik','jim','jin','jing','jip','jit','jiu','jo','joek','joeng','jot','ju','jui','juk','jung','jyu','jyun','jyut','kaa','kaai','kaak','kaam','kaat','kaau','kai','kak','kam','kan','kang','kap','kat','kau','ke','kek','kem','ken','keng','ket','keu','ki','kik','kim','kin','king','kip','kit','kiu','ko','koek','koeng','koi','kok','kong','ku','kui','kuk','kung','kwaa','kwaai','kwaak','kwaang','kwai','kwak','kwan','kwang','kwe','kwik','kwok','kwong','kyu','kyun','kyut','la','laa','laai','laak','laam','laan','laang','laap','laat','laau','lai','lak','lam','lan','lang','lap','lat','lau','le','lek','lem','len','leng','lep','let','leu','li','lik','lim','lin','ling','lip','lit','liu','lo','loe','loek','loeng','loi','lok','long','lot','lu','lui','luk','lung','lyu','lyun','lyut','m','maa','maai','maak','maan','maang','maat','maau','mai','mak','mam','man','mang','map','mat','mau','me','mek','men','meng','met','meu','mi','mik','min','ming','mit','miu','mo','mok','mong','mu','mui','muk','mun','mung','mut','naa','naai','naak','naam','naan','naang','naap','naat','naau','nai','nak','nam','nan','nang','nap','nat','nau','ne','nem','nen','neng','nep','net','neu','ng','ngaa','ngaai','ngaak','ngaam','ngaan','ngaang','ngaap','ngaat','ngaau','ngai','ngak','ngam','ngan','ngang','ngap','ngat','ngau','nge','ngen','ngep','nget','ngeu','ngi','ngik','nging','ngo','ngoe','ngoi','ngok','ngon','ngong','ngu','nguk','ni','nik','nim','nin','ning','nip','nit','niu','no','noek','noeng','noi','nok','nong','not','nu','nui','nuk','nung','nyu','nyun','o','oet','oi','ok','on','ong','paa','paai','paak','paan','paang','paap','paat','paau','pai','pam','pan','pang','pap','pat','pau','pe','pek','pen','peng','pet','peu','pi','pik','pin','ping','pit','piu','po','pok','pong','pu','pui','puk','pun','pung','put','saa','saai','saak','saam','saan','saang','saap','saat','saau','sai','sam','san','sap','sat','sau','se','sek','sen','seng','sep','set','seu','si','sik','sim','sin','sing','sip','sit','siu','slaa','slaai','slaak','slaam','slaan','slaap','slaat','slaau','slai','slak','slam','slan','slang','slap','slat','slau','sle','slek','slem','slen','sleng','slep','slet','sleu','sli','slik','slin','sling','slip','slit','sliu','slo','sloe','sloek','sloeng','sloi','slok','slong','slot','slu','slui','sluk','slung','slyu','slyun','slyut','so','soe','soek','soeng','soi','sok','song','su','sui','suk','sung','sy','syu','syun','syut','taa','taai','taam','taan','taap','taat','tai','tak','tam','tan','tang','tap','tau','tek','ten','teng','tep','tet','teu','tik','tim','tin','ting','tip','tit','tiu','to','toe','toi','tok','tong','tu','tui','tuk','tung','tyun','tyut','u','ui','uk','ung','waa','waai','waak','waan','waang','waat','wai','wak','wan','wang','wat','wau','we','wen','wet','wik','wing','wo','wok','wong','wu','wui','wun','wung','wut','zaa','zaai','zaak','zaam','zaan','zaang','zaap','zaat','zaau','zai','zak','zam','zan','zang','zap','zat','zau','ze','zek','zem','zen','zeng','zep','zet','zeu','zi','zik','zim','zin','zing','zip','zit','ziu','zo','zoe','zoek','zoeng','zoet','zoi','zok','zong','zu','zui','zuk','zung','zy','zyu','zyun','zyut']
  const syllable_bw = ['aa','aai','aak','aam','aan','aang','aap','aat','aau','ai','ak','am','an','ang','ap','at','au','baa','baai','baak','baam','baan','baang','baap','baat','baau','bai','bak','bam','ban','bang','bap','bat','bau','be','bem','ben','bet','beu','bi','biak','biang','bik','bin','bing','bit','biu','bo','boek','boeng','bot','bu','bui','buk','bun','bung','but','byu','caa','caai','caak','caam','caan','caang','caap','caat','caau','cai','cak','cam','can','cang','cap','cat','cau','ce','cem','cen','cet','ci','ciak','ciang','cik','cim','cin','cing','cip','cit','ciu','co','coek','coeng','con','cot','cu','cui','cuk','cun','cut','cyu','cyun','cyut','daa','daai','daak','daam','daan','daang','daap','daat','daau','dai','dak','dam','dan','dang','dap','dat','dau','de','dem','den','dep','det','deu','di','diak','diang','dik','dim','din','ding','dip','dit','diu','do','doek','doeng','dot','du','dui','duk','dun','dung','dut','dyu','e','em','en','et','eu','faak','faam','faan','faat','fai','fak','fam','fan','fang','fat','fau','fe','fet','fi','fik','fing','fit','fiu','fo','foek','foeng','fot','fu','fuk','fung','ga','gaa','gaai','gaak','gaam','gaan','gaang','gaap','gaat','gaau','gai','gak','gam','gan','gang','gap','gat','gau','ge','gem','gen','gep','get','geu','gi','giak','giang','gik','gim','gin','ging','gip','git','giu','go','goek','goeng','got','gu','gui','guk','gun','gung','gut','gwaa','gwaai','gwaak','gwaan','gwaang','gwaat','gwai','gwan','gwang','gwat','gwe','gwet','gwik','gwing','gyu','gyun','gyut','haa','haai','haak','haam','haan','haang','haap','haat','haau','hai','hak','ham','han','hang','hap','hat','hau','he','hem','hen','hep','het','heu','hi','hiak','hiang','hik','him','hin','hing','hip','hit','hiu','hm','hng','ho','hoe','hoek','hoeng','hon','hu','hui','huk','hun','hung','hut','hyu','hyun','hyut','i','iak','ik','ing','jaa','jaak','jaam','jaap','jaat','jaau','jai','jak','jam','jan','jap','jat','jau','je','jet','ji','jiak','jiang','jik','jim','jin','jing','jip','jit','jiu','jo','joek','joeng','jot','ju','jui','jyu','jyun','jyut','kaa','kaai','kaak','kaam','kaang','kaat','kaau','kai','kak','kam','kang','kap','kat','kau','ke','ket','keu','ki','kiak','kiang','kik','kin','king','kit','kiu','ko','koek','koeng','kon','ku','kui','kuk','kung','kwaa','kwaai','kwaak','kwaang','kwai','kwak','kwan','kwang','kwat','kwe','kwik','kyu','kyut','laa','laai','laak','laam','laan','laang','laap','laat','laau','lai','lak','lam','lan','lang','lap','lat','lau','le','lem','lep','let','leu','li','liak','liang','lik','lim','lin','ling','lip','lit','liu','lo','loe','loek','loeng','lon','lot','lu','lui','luk','lun','lung','lut','lyu','lyun','lyut','m','maa','maai','maak','maan','maang','maap','maat','maau','mai','mak','mam','man','mang','map','mat','mau','me','men','met','meu','mi','miak','miang','mik','min','ming','mit','miu','mo','moek','moeng','mon','mot','mu','mui','muk','mun','mung','mut','naa','naai','naak','naam','naan','naang','naap','naat','naau','nai','nak','nam','nan','nang','nap','nat','nau','ne','nem','nen','nep','net','neu','ng','ngaa','ngaai','ngaak','ngaam','ngaan','ngaang','ngaap','ngaat','ngaau','ngai','ngak','ngam','ngan','ngap','ngat','ngau','nge','ngen','ngep','nget','ngeu','ngiak','ngiang','nging','ngo','ngu','nguk','ni','niak','niang','nik','nim','nin','ning','nip','nit','niu','njaa','njaai','njaak','njaam','njaan','njaap','njaau','njak','njam','njan','njang','njap','njat','njau','nje','njen','nji','njim','njin','njit','njoek','njoeng','njon','njui','njuk','njung','njyu','njyun','njyut','no','noek','noeng','not','nu','nui','nuk','nun','nung','nyu','o','oe','oek','oeng','oet','paa','paai','paak','paan','paang','paap','paat','paau','pai','pam','pan','pang','pap','pat','pau','pe','pem','pen','pet','peu','pi','piak','piang','pik','pin','ping','pit','piu','po','poek','poeng','pu','pui','puk','pun','put','saa','saai','saak','saam','saan','saang','saap','saat','saau','sai','sam','san','sang','sap','sat','sau','se','sen','set','si','siak','siang','sik','sim','sin','sing','sip','sit','siu','slaa','slaai','slaak','slaam','slaan','slaang','slaap','slaat','slaau','slai','slak','slam','slan','slang','slap','slat','slau','sle','slek','slen','slep','slet','sli','sliak','sliang','slik','slin','sling','slip','slit','sliu','slo','sloek','sloeng','slon','slu','slui','slun','slyu','slyun','slyut','so','soek','soeng','sok','su','sui','suk','sung','syu','syun','syut','taa','taai','taak','taam','taan','taang','taap','taat','taau','tai','tak','tam','tan','tang','tap','tat','tau','tet','teu','tik','tim','tin','ting','tip','tit','tiu','to','toek','toeng','tu','tui','tuk','tun','tut','u','ui','uk','ung','waa','waai','waak','waan','waang','waat','waau','wai','wan','wang','wat','wau','we','wet','wiak','wiang','wik','wing','wo','woeng','wu','wui','wuk','wun','zaa','zaai','zaak','zaam','zaan','zaang','zaap','zaat','zaau','zai','zak','zam','zan','zang','zap','zat','zau','ze','zen','zep','zet','zeu','zi','ziak','ziang','zik','zim','zin','zing','zip','zit','ziu','zo','zoek','zoeng','zon','zot','zu','zui','zuk','zun','zung','zut','zyu','zyun','zyut']

  const soundSplitFun = () => {
    if (value1.length === 0) {
      toast.current.show({severity:'error', summary: 'Error Message', detail:'請輸入需要拆分的讀音！', life: 3000})
      return false
    } else if (value1.length > 10) {
      toast.current.show({severity:'error', summary: 'Error Message', detail:'請輸入一個正確音節！', life: 3000})
      return false
    }

    const outputText = [], outputText2 = [], resultText = [], resultText2 = []

    const wordArr = value1.replace(/[0-9]+/g,'').split('')
	
    for (let i=0;i<wordArr.length;i++) {
      let tempArr = [], tempArr2 = []
      for (let j=0;j<i;j++) {
        tempArr.push(wordArr[j])
      }
      for (let j=i+1;j<wordArr.length;j++) {
        tempArr2.push(wordArr[j])
      }
      outputText.push(tempArr.join().replaceAll(',',''))
      outputText2.push(tempArr2.join().replaceAll(',',''))
    }
    
    const outputText_new = outputText.filter(item=>item)
    const outputText2_new = outputText2.filter(item=>item)
    
    for (let i in outputText_new) {
      let patt1 = new RegExp('^'+outputText_new[i]), patt2 = new RegExp(outputText2_new[i]+'$')
      resultText.push('以' + outputText_new[i] + '開頭的音節：' + syllable.filter(item=>patt1.test(item)).join(', ') + '\n以' + outputText2_new[i] + '結尾的音節：' + syllable.filter(item=>patt2.test(item)).join(', '))
      resultText2.push('以' + outputText_new[i] + '開頭的音節：' + syllable_bw.filter(item=>patt1.test(item)).join(', ') + '\n以' + outputText2_new[i] + '結尾的音節：' + syllable_bw.filter(item=>patt2.test(item)).join(', '))
    }

    setValue2('白話：\n\n'+Array.from(new Set(resultText)).join('\n\n') + '\n\n平話：\n\n'+Array.from(new Set(resultText2)).join('\n\n'))
  }

  useEffect(() => {
    if (copied) toast.current.show({severity:'success', summary: 'Success Message', detail:'複製成功！', life: 3000})
  }, [copied])

  const handleCopy = () => {
    if (copied) toast.current.show({severity:'success', summary: 'Success Message', detail:'複製成功！', life: 3000})
  }

  return (
    <Layout home>
      <div>
        <div className="card">
          <h2>合音拆分</h2>
          <div className="formgroup-inline">
            <div className="field-radiobutton">
              輸入讀音：
            </div>
          </div>
          <InputText value={value1} onChange={(e) => setValue1(e.target.value)} style={{width: '-webkit-fill-available'}} />
        </div>
        <div className="card">
          <InputTextarea className="mt-2" value={value2} onChange={(e) => {setValue2(e.target.value);setCopied(false)}} rows={12} style={{width: '-webkit-fill-available'}} />
        </div>
        <div className="card noteDiv">
          <span>※ 合音拆分器用於在攷究有音無字的音節時，爲猜想其可能的合音提供方便</span><br/>
          <span>※ 拆分原則：拆分的音節爲合理音節，爲了方便忽略聲調</span>
        </div>
        <style jsx>{`
          div .noteDiv {
            max-width: 820px
          }
        `}</style>
        <div className="card flex justify-content-end">
          <Button label="清空" className="p-button-raised p-button-info p-button-text p-button-sm m-2" onClick={() => {setValue1('');setValue2('')}} />
          <CopyToClipboard text={value2} onCopy={() => setCopied(true)}>
            <Button label="複製" className="p-button-info p-button-sm m-2" onClick={() => {setCopied(true);handleCopy()}} />
          </CopyToClipboard>
          <Button label="拆分" className="p-button-sm m-2" onClick={soundSplitFun}/>
        </div>
      </div>
      <Toast ref={toast} />
    </Layout>
  )
}

