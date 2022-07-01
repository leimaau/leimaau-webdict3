import React, { useState, useRef, useEffect } from 'react'
import { InputTextarea } from 'primereact/inputtextarea'
import { RadioButton } from 'primereact/radiobutton'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { Toast } from 'primereact/toast'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import Layout from '../../components/layout'

export default function transform() {
  const [value1, setValue1] = useState('zing6 je6 si1/sy1 【 tong4 】 li5 baak6\n靜夜思 【唐】李白\ncong4 cin4 ming4 jyut6 gong1，ni4 ci5/cy5 di6 soeng6 sloeng1\n牀前明月光，疑似地上霜\ngyu2 tau4 mong6 ming4 jyut6，dai1 tau4 si1/sy1 gu3 hoeng1\n舉頭望明月，低頭思故鄉')
  const [value2, setValue2] = useState('')
  const [item, setItem] = useState('0')
  const [selectedItem1, setSelectedItem1] = useState<any>({ name: '南寧白話-林亦、覃鳳餘《廣西南寧白話研究》版', code: 'nIPA' })
  const [selectedItem2, setSelectedItem2] = useState<any>({ name: '調值不上標', code: 'noUp' })
  const [checked, setChecked] = useState<boolean>(false)
  const toast = useRef(null)
  const [copied, setCopied] = useState(false)

  const setInputTextarea = (e: string) => {
    if (e=='0') {
      setValue1('zing6 je6 si1/sy1 【 tong4 】 li5 baak6\n靜夜思 【唐】李白\ncong4 cin4 ming4 jyut6 gong1，ni4 ci5/cy5 di6 soeng6 sloeng1\n牀前明月光，疑似地上霜\ngyu2 tau4 mong6 ming4 jyut6，dai1 tau4 si1/sy1 gu3 hoeng1\n舉頭望明月，低頭思故鄉')
    } else {
      setValue1('tʃeŋ22 jɛ22 ʃi55/sɿ55 【 tʰɔŋ21 】 li24 pak2\n靜夜思 【唐】李白\ntʃʰɔŋ21 tʃʰin21 meŋ21 jyt2 kɔŋ55，ni21 tʃʰi24/tsʰɿ24 ti22 ʃœŋ22 ɬœŋ55\n牀前明月光，疑似地上霜\nky35 tʰɐu21 mɔŋ22 meŋ21 jyt2，tɐi55 tʰɐu21 ʃi55/sɿ55 ku33 hœŋ55\n舉頭望明月，低頭思故鄉')
    }
  }

  const items = [
    { name: '南寧白話-林亦、覃鳳餘《廣西南寧白話研究》版', code: 'nIPA' },
    { name: '南寧白話-楊煥典主編《廣西通誌·漢語方言誌》版', code: 'nIPA2' },
    { name: '南寧白話-梁振仕《〈切韻〉系統與南寧音系》版', code: 'nIPA3' },
    { name: '南寧白話-唐七元《廣西漢語方言概要》版', code: 'nIPA4' },
    { name: '南寧平話-楊煥典主編《廣西通誌·漢語方言誌》版', code: 'tIPA' },
    { name: '南寧平話-李榮主編《南寧平話詞典》版', code: 'tIPA2' },
    { name: '南寧平話-余瑾《廣西平話研究》版', code: 'tIPA3' },
    { name: '南寧平話-唐七元《廣西漢語方言概要》版', code: 'tIPA4' }
  ]

  const items2 = [
    { name: '調值不上標', code: 'noUp' },
    { name: '調值上標', code: 'Up' },
    { name: '調型豎線', code: 'toneLine' }
  ]

  const Func_JP_IPA = () => {
    if (value1.length > 10000) {
      toast.current.show({severity:'error', summary: 'Error Message', detail:'禁止超過一萬字！', life: 3000})
      return false
    }
    const outputText = []
    if (item == '0') {
      for (let lines of value1.split('\n')) {
        outputText.push(jyutping_to_ipa(lines, selectedItem1.code, selectedItem2.code, checked) + '\n')
      }
    } else {
      for (let lines of value1.split('\n')) {
        outputText.push(ipa_to_jyutping(lines, selectedItem1.code) + '\n')
      }
    }
    setValue2(outputText.join(''))
  }

  useEffect(() => {
    if (copied) toast.current.show({severity:'success', summary: 'Success Message', detail:'複製成功！', life: 3000})
  }, [copied])

  const handleCopy = () => {
    if (copied) toast.current.show({severity:'success', summary: 'Success Message', detail:'複製成功！', life: 3000})
  }

  const selectedItemsTemplate = (option, props) => {
    if (option) {
        return (
            <div>
                <div className="w-15rem md:w-max white-space-nowrap overflow-hidden text-overflow-ellipsis">{option.name}</div>
            </div>
        )
    }

    return (
        <span>
            {props.placeholder}
        </span>
    )
  }

  return (
    <Layout home>
      <div>
        <div className="card">
          <h2>音標轉換</h2>
          <div className="formgroup-inline">
            <div className="field-radiobutton">
              轉換方式：
              <RadioButton inputId="item1" name="item" value="0" onChange={(e) => {setItem(e.value);setInputTextarea('0')}} checked={item === '0'} />
              <label className="mr-0 ml-1 mr-2" htmlFor="item1">粵拼轉 IPA</label>
              <RadioButton inputId="item2" name="item" value="1" onChange={(e) => {setItem(e.value);setInputTextarea('1')}} checked={item === '1'} />
              <label className="mr-0 ml-1 mr-2" htmlFor="item2">IPA 轉粵拼</label>
            </div>
          </div>
          <InputTextarea value={value1} onChange={(e) => setValue1(e.target.value)} rows={12} style={{width: '-webkit-fill-available'}} />
        </div>
        <div className="card">
          <div className="formgroup-inline flex flex-column md:flex-row align-items-left">
            <span className="mt-3">{ item=='1' ? '輸入 IPA 版本：' : '輸出 IPA 版本：'}</span>
            <div className="field-checkbox m-1">
              <Dropdown value={selectedItem1} options={items} valueTemplate={selectedItemsTemplate} onChange={(e) => setSelectedItem1(e.value)} optionLabel="name" placeholder="Select a Item" />
            </div>
            <div className="field-checkbox m-1">
              <Dropdown className={ item=='1' ? 'hidden' : ''} value={selectedItem2} options={items2} onChange={(e) => setSelectedItem2(e.value)} optionLabel="name" placeholder="Select a Item" />
              <Checkbox className={ item=='1' ? 'hidden' : 'ml-2'} inputId="isSymbols" checked={checked} onChange={e => setChecked(e.checked)} />
              <label className={ item=='1' ? 'hidden' : ''} htmlFor="isSymbols">帶附加符</label>
            </div>
          </div>
          <InputTextarea className="mt-2" value={value2} onChange={(e) => {setValue2(e.target.value);setCopied(false)}} rows={12} style={{width: '-webkit-fill-available'}} />
        </div>
        <div className="card noteDiv">
          <span>※ 白(林 || 楊 || 梁 || 唐)： tʃ/tʃʰ/ʃ、ʊŋ/ʊk/eŋ/ek || ts/tsʰ/s、oŋ/ok/eŋ/ek || tɕ/tɕʰ/ɕ、uŋ/uk/iŋ/ik || tʃ/tʃʰ/ʃ、oŋ/ok/eŋ/ek、kʷ/kʷʰ{'->'}ku/kʰu</span><br/>
          <span>※ 平(楊 || 李 || 余 || 唐)： tʃ/tʃʰ/ʃ、ȵwɐœɛ(無韻尾用e)、(i)ɐŋ/(i)ɐk、j-、wu(int)、jy(nt)、kʷ/kʷʰ(紙面爲kʰw)、下陽入24 || ts/tsʰ/s、ɲβəøe、əŋ/ək/iɐŋ/iɐk、∅i-、∅u(int)、∅y(nt)、ku/kʰu、上陽入23 || 楊版基礎上：無韻尾用ɛ，ȵ{'->'}ɲ，oŋ/ok{'->'}uŋ/uk，o{'->'}ɔ，iɐŋ/iɐk{'->'}ɛŋ/ɛk || 楊版基礎上：kʷ/kʷʰ{'->'}ku/kʰu</span><br/>
          <span>※ 統一用kʷ/kʷʰ，其他 kw/kwh、kʷ/kʰʷ、kʷ/kwʰ、kw/khw、kw/kʰw、ku/kʰu、kᵘ/kʰᵘ 等可根據需要手工替換</span>
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
          <Button label="轉換" className="p-button-sm m-2" onClick={Func_JP_IPA}/>
        </div>
      </div>
      <Toast ref={toast} />
    </Layout>
  )
}

// 粵拼轉IPA
export function jyutping_to_ipa(inputstr: string, IPA_version: string, output_IPAformat: string, judgeVal: boolean){
	let outputstr = inputstr;
	outputstr = outputstr.replace(/(\b)(m)(\d)/g, "$1m̩$3");
	outputstr = outputstr.replace(/(\b)(ng)(\d)/g, "$1ŋ̍$3");
    outputstr = outputstr.replace(/sl/g,"ɬ");
    outputstr = outputstr.replace(/nj/g,"ȵ");
	
    outputstr = outputstr.replace(/yu/g,"yː");
    outputstr = outputstr.replace(/eoi/g,"ɵy");
    outputstr = outputstr.replace(/eo([tn])/g,"ɵ$1");
    outputstr = outputstr.replace(/eo/g,"ɵ");
	
    outputstr = outputstr.replace(/oe([tk])/g,"œː$1");
    outputstr = outputstr.replace(/oeng/g,"œːŋ");
    outputstr = outputstr.replace(/oe/g,"œː");
	
    outputstr = outputstr.replace(/uk/g,"ʊk");  // uk[ok]
    outputstr = outputstr.replace(/ung/g,"ʊŋ"); // ung[oŋ]
    outputstr = outputstr.replace(/u([in])/g,"uː$1"); // ui[uːy]
    outputstr = outputstr.replace(/ut/g,"uːt");
    outputstr = outputstr.replace(/([^aeio])u(\d)/g,"$1uː$2");
	
    outputstr = outputstr.replace(/eng/g,"ɛːŋ");
    outputstr = outputstr.replace(/e([umnptk])/g,"ɛː$1");
    outputstr = outputstr.replace(/e(\d)/g,"ɛː$1");

    outputstr = outputstr.replace(/ing/g,"ɪŋ"); // ing[eŋ]
    outputstr = outputstr.replace(/ik/g,"ɪk");  // ik[ek]
    outputstr = outputstr.replace(/i([umnpt])/g,"iː$1");
    outputstr = outputstr.replace(/([^aeuoː])i(\d)/g,"$1iː$2");
	
    outputstr = outputstr.replace(/ong/g,"ɔːŋ");
    outputstr = outputstr.replace(/o([imnptk])/g,"ɔː$1"); // oi[ɔːy]
    outputstr = outputstr.replace(/o(\d)/g,"ɔː$1");

    outputstr = outputstr.replace(/aa/g,"Aː");
    outputstr = outputstr.replace(/a/g,"ɐ");

	if (IPA_version == 'tIPA2' || IPA_version == 'nIPA4' || IPA_version == 'tIPA4') {
		outputstr = outputstr.replace(/gw/g,"Ku");
		outputstr = outputstr.replace(/kw/g,"Kʰu");
	} else {
		outputstr = outputstr.replace(/gw/g,"Kʷ");
		outputstr = outputstr.replace(/kw/g,"Kʷʰ");
	}
	
    outputstr = outputstr.replace(/(\b)([ptk])(\D\S)/g,"$1$2ʰ$3");
    outputstr = outputstr.replace(/(\b)b/g,"$1p");
    outputstr = outputstr.replace(/(\b)d/g,"$1t");
    outputstr = outputstr.replace(/(\b)g/g,"$1k");
	
    outputstr = outputstr.replace(/zy(\d)/g,"t͡Sɿ$1");
    outputstr = outputstr.replace(/cy(\d)/g,"t͡Sʰɿ$1");
    outputstr = outputstr.replace(/sy(\d)/g,"Sɿ$1");
    outputstr = outputstr.replace(/ng/g,"ŋ");
	
  if (IPA_version == 'nIPA' || IPA_version == 'tIPA' || IPA_version == 'tIPA3' || IPA_version == 'nIPA4' || IPA_version == 'tIPA4'){
        outputstr = outputstr.replace(/s/g,"ʃ");
        outputstr = outputstr.replace(/z/g,"t͡ʃ");
        outputstr = outputstr.replace(/c/g,"t͡ʃʰ");
	} else if(IPA_version == 'nIPA2' || IPA_version == 'tIPA2' || IPA_version == 'gIPA') {
        outputstr = outputstr.replace(/s/g,"s");
        outputstr = outputstr.replace(/z/g,"t͡s");
        outputstr = outputstr.replace(/c/g,"t͡sʰ");
	} else if(IPA_version == 'nIPA3'){
        outputstr = outputstr.replace(/s/g,"ɕ");
        outputstr = outputstr.replace(/z/g,"t͡ɕ");
        outputstr = outputstr.replace(/c/g,"t͡ɕʰ");
	}
	
  if (IPA_version == 'tIPA' || IPA_version == 'tIPA4'){
        outputstr = outputstr.replace(/ɔː|ɔ/g,"o");
        outputstr = outputstr.replace(/ʊ(k|ŋ)/g,"o$1");
        outputstr = outputstr.replace(/(ɛ|ɛː)(\d|i)/g,"e$2");
        outputstr = outputstr.replace(/ɪ/g,"e");
	} else if (IPA_version == 'tIPA2'){
        outputstr = outputstr.replace(/ȵ/g,"ɲ");
        outputstr = outputstr.replace(/w/g,"β");
        outputstr = outputstr.replace(/ɐ/g,"ə");
        outputstr = outputstr.replace(/œ/g,"ø");
        outputstr = outputstr.replace(/ɛː|ɛ/g,"e");
        outputstr = outputstr.replace(/ɔː|ɔ/g,"o");
        outputstr = outputstr.replace(/ʊ(k|ŋ)/g,"o$1");
        outputstr = outputstr.replace(/iə([ŋk])/g,"iɐ$1");
        outputstr = outputstr.replace(/ɪ/g,"e");
        outputstr = outputstr.replace(/βu/g,"∅u");
        outputstr = outputstr.replace(/jy/g,"∅y");
        outputstr = outputstr.replace(/^ji/g,"∅i");
        outputstr = outputstr.replace(/^j/g,"∅i");
	} else if (IPA_version == 'tIPA3'){
        outputstr = outputstr.replace(/ȵ/g,"ɲ");
        outputstr = outputstr.replace(/ʊ(k|ŋ)/g,"u$1");
        outputstr = outputstr.replace(/ɪ/g,"e");
        outputstr = outputstr.replace(/iɐ([ŋk])/g,"ɛː$1");
	} else if(IPA_version == 'nIPA') {
		    outputstr = outputstr.replace(/ɪ/g,"e");
	} else if(IPA_version == 'nIPA2' || IPA_version == 'nIPA4') {
        outputstr = outputstr.replace(/ʊ(k|ŋ)/g,"o$1");
		    outputstr = outputstr.replace(/ɪ/g,"e");
	} else if(IPA_version == 'nIPA3')  {
		    outputstr = outputstr.replace(/ʊ(k|ŋ)/g,"u$1");
		    outputstr = outputstr.replace(/ɪ(k|ŋ)/g,"i$1");
	}

  if (IPA_version == 'nIPA' || IPA_version == 'nIPA2' || IPA_version == 'nIPA3' || IPA_version == 'nIPA4' || IPA_version == 'gIPA'){
        outputstr = outputstr.replace(/([ptk])6/g,"$1̚˨");
        outputstr = outputstr.replace(/([ptk])3/g,"$1̚˧");
        outputstr = outputstr.replace(/([ptk])1/g,"$1̚˥");	
	} else if(IPA_version == 'tIPA' || IPA_version == 'tIPA3' || IPA_version == 'tIPA4') {
        outputstr = outputstr.replace(/([ptk])3/g,"$1̚˥");
        outputstr = outputstr.replace(/([ptk])2/g,"$1̚˧");
        outputstr = outputstr.replace(/([ptk])5/g,"$1̚˨˦");
        outputstr = outputstr.replace(/([ptk])6/g,"$1̚˨");
	} else if(IPA_version == 'tIPA2') {
        outputstr = outputstr.replace(/([ptk])3/g,"$1̚˥");
        outputstr = outputstr.replace(/([ptk])2/g,"$1̚˧");
        outputstr = outputstr.replace(/([ptk])5/g,"$1̚˨˧");
        outputstr = outputstr.replace(/([ptk])6/g,"$1̚˨");
	}
	
    if (IPA_version == 'nIPA' || IPA_version == 'nIPA2' || IPA_version == 'nIPA3' || IPA_version == 'nIPA4'){
        outputstr = outputstr.replace(/1/g,"˥˥");
        outputstr = outputstr.replace(/2/g,"˧˥");
        outputstr = outputstr.replace(/3/g,"˧˧");
        outputstr = outputstr.replace(/4/g,"˨˩");
        outputstr = outputstr.replace(/5/g,"˨˦");
        outputstr = outputstr.replace(/6/g,"˨˨");
	} else if(IPA_version == 'gIPA') {
        outputstr = outputstr.replace(/1/g,"˥˥");
        outputstr = outputstr.replace(/2/g,"˧˥");
        outputstr = outputstr.replace(/3/g,"˧˧");
        outputstr = outputstr.replace(/4/g,"˨˩");
        outputstr = outputstr.replace(/5/g,"˩˧");
        outputstr = outputstr.replace(/6/g,"˨˨");
	} else {
        outputstr = outputstr.replace(/1/g,"˥˧");
        outputstr = outputstr.replace(/2/g,"˧˧");
        outputstr = outputstr.replace(/3/g,"˥˥");
        outputstr = outputstr.replace(/4/g,"˨˩");
        outputstr = outputstr.replace(/5/g,"˨˦");
        outputstr = outputstr.replace(/6/g,"˨˨");
	}
	
    outputstr = outputstr.toLowerCase();
	
	if(!judgeVal){
		outputstr = outputstr.replace(/ː/g,"").replace(/͡/g,"").replace(/̚/g,"");
	}
	
    if(output_IPAformat == 'noUp'){
        outputstr = outputstr.replace(/˥/g,"5").replace(/˦/g,"4").replace(/˧/g,"3").replace(/˨/g,"2").replace(/˩/g,"1");
	} else if(output_IPAformat == 'Up') {
        outputstr = outputstr.replace(/˥/g,"⁵").replace(/˦/g,"⁴").replace(/˧/g,"³").replace(/˨/g,"²").replace(/˩/g,"¹");
	} else {
        outputstr = outputstr.replace(/˥˥/g,'˥').replace(/˧˧/g,'˧').replace(/˨˨/g,'˨');
	}
	
    outputstr = outputstr.replace(/^([aeiouœʊɐɛɪɔə])/g,"∅$1");
	
	return outputstr;
}


// IPA轉粵拼
function ipa_to_jyutping(inputstr: string, IPA_version: string){
	let outputstr = inputstr;
	
	outputstr = outputstr.replace(/ː/g,"").replace(/͡/g,"").replace(/̚/g,"");
	
    if (IPA_version == 'nIPA' || IPA_version == 'nIPA2' || IPA_version == 'nIPA3' || IPA_version == 'nIPA4' || IPA_version == 'gIPA'){
        outputstr = outputstr.replace(/˨˩|21|²¹|˩˩|11|¹¹/g,"_4");
        outputstr = outputstr.replace(/˥˥|55|⁵⁵/g,"_1");
        outputstr = outputstr.replace(/˨˦|24|²⁴|˩˧|13|¹³/g,"_5");
        outputstr = outputstr.replace(/˧˥|35|³⁵/g,"_2");
        outputstr = outputstr.replace(/˨˨|22|²²/g,"_6");
        outputstr = outputstr.replace(/˧˧|33|³³/g,"_3");
        outputstr = outputstr.replace(/(?<n1>[ptk])˨|(?<n2>[ptk])2|(?<n3>[ptk])²/g,"$<n1>$<n2>$<n3>6");
        outputstr = outputstr.replace(/(?<n1>[ptk])˧|(?<n2>[ptk])3|(?<n3>[ptk])³/g,"$<n1>$<n2>$<n3>3");
        outputstr = outputstr.replace(/(?<n1>[ptk])˥|(?<n2>[ptk])5|(?<n3>[ptk])⁵/g,"$<n1>$<n2>$<n3>1");
        outputstr = outputstr.replace(/˥/g,"_1");
        outputstr = outputstr.replace(/˧/g,"_3");
        outputstr = outputstr.replace(/˨/g,"_6");
	} else {
        outputstr = outputstr.replace(/˨˩|21|²¹/g,"_4");
        outputstr = outputstr.replace(/˥˧|53|⁵³|˦˩|41|⁴¹/g,"_1");
        outputstr = outputstr.replace(/˨˦|24|²⁴|˨˧|23|²³/g,"_5");
        outputstr = outputstr.replace(/˧˧|33|³³/g,"_2");
        outputstr = outputstr.replace(/˨˨|22|²²|˨˨˧|223|²²³/g,"_6");
        outputstr = outputstr.replace(/˥˥|55|⁵⁵/g,"_3");
        outputstr = outputstr.replace(/(?<n1>[ptk])˨|(?<n2>[ptk])2|(?<n3>[ptk])²/g,"$<n1>$<n2>$<n3>6");
        outputstr = outputstr.replace(/(?<n1>[ptk])˧|(?<n2>[ptk])3|(?<n3>[ptk])³/g,"$<n1>$<n2>$<n3>2");
        outputstr = outputstr.replace(/(?<n1>[ptk])˥|(?<n2>[ptk])5|(?<n3>[ptk])⁵/g,"$<n1>$<n2>$<n3>3");
        outputstr = outputstr.replace(/˥/g,"_3");
        outputstr = outputstr.replace(/˧/g,"_2");
        outputstr = outputstr.replace(/˨/g,"_6");
	}
    
    outputstr = outputstr.replace(/_/g,"");
    outputstr = outputstr.replace(/tʃʰ|tsʰ|tɕʰ|tʃh|tsh|tɕh|ʧʰ|ʦʰ|ʨʰ|ʧh|ʦh|ʨh/g,"c");
    outputstr = outputstr.replace(/tʃ|ts|tɕ|ʧ|ʦ|ʨ/g,"z");
    outputstr = outputstr.replace(/ʃ|s|ɕ/g,"s");
	
	outputstr = outputstr.replace(/ʊk|ok|uk/g,"uk");
	outputstr = outputstr.replace(/ʊŋ|oŋ|uŋ/g,"ung");
	
	outputstr = outputstr.replace(/^([∅]|)([yi])([aeiouœʊɐɛɪɔə]|)([ŋmnptk]|)(\d|)/g,"∅$2$3$4$5");
	outputstr = outputstr.replace(/^([∅]|)([yi])(\d|)/g,"∅$2$3");

    outputstr = outputstr.replace(/kʷʰ|kʰʷ|kwh|khw|kʰu|khu/g,"Kw");
    outputstr = outputstr.replace(/kʷ|kw|ku/g,"gw");
    outputstr = outputstr.replace(/(Kw)([inktg]*)(\d)/g,"Ku$2$3");
    outputstr = outputstr.replace(/(gw)([inktg]*)(\d)/g,"gu$2$3");

    outputstr = outputstr.replace(/(\b)p([^hʰ\s\d])/g,"$1b$2");
    outputstr = outputstr.replace(/(\b)t([^hʰ\s\d])/g,"$1d$2");
    outputstr = outputstr.replace(/(\b)k([^hʰ\s\d])/g,"$1g$2");
    outputstr = outputstr.replace(/(\b)(ph|pʰ)/g,"$1p");
    outputstr = outputstr.replace(/(\b)(th|tʰ)/g,"$1t");
    outputstr = outputstr.replace(/(\b)(kh|kʰ)/g,"$1k");

    outputstr = outputstr.replace(/a/g,"aa");
    outputstr = outputstr.replace(/ɐ|ə/g,"a");

    outputstr = outputstr.replace(/ɔ/g,"o");

    outputstr = outputstr.replace(/eŋ|ɪŋ/g,"ing");
    outputstr = outputstr.replace(/ek|ɪk/g,"ik");
    outputstr = outputstr.replace(/ɛ/g,"e");
    outputstr = outputstr.replace(/œ|ø/g,"oe");

    outputstr = outputstr.replace(/ɵy/g,"eoi");
    outputstr = outputstr.replace(/ɵ/g,"eo");

    outputstr = outputstr.replace(/ɬ/g,"sl");
    outputstr = outputstr.replace(/ȵ|ɲ/g,"nj");
    outputstr = outputstr.replace(/v|β/g,"w");

    outputstr = outputstr.replace(/m̩|m̍/g,"m");
    outputstr = outputstr.replace(/ŋ̩|ŋ̍|ŋ|ŋ̇/g,"ng");
    outputstr = outputstr.replace(/y/g,"yu");
    outputstr = outputstr.replace(/ɿ/g,"y");
	
	if (IPA_version == 'tIPA2' || IPA_version == 'tIPA4') {
		outputstr = outputstr.replace(/∅u/g,"wu");
		outputstr = outputstr.replace(/^([∅]|)([u])([int]|)(\d|)/g,"w$2$3$4");
		outputstr = outputstr.replace(/∅y/g,"jy");
	}
    outputstr = outputstr.replace(/^[ʔ∅0Ø]/g,"");

    outputstr = outputstr.toLowerCase();
	
	return outputstr;
}
