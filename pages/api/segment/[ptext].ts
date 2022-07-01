import { NextApiRequest, NextApiResponse } from 'next'
import { jyutping_to_ipa } from '../../tools/jyutping_ipa'
import { nnDict } from '../../../lib/markdata/nnDict'
import { nntDict } from '../../../lib/markdata/nntDict'
import path from 'path'

export default function segment(req: NextApiRequest, res: NextApiResponse) {
  const { ptext, signResult_format, signText_type, signResult_type, signResult_way, signResult_IPA, signIPA_version, checkedStr, checkedStr2, checkedStr3 } = req.query
  const checked = JSON.parse(checkedStr.toString())
  const checked2 = JSON.parse(checkedStr2.toString())
  const checked3 = JSON.parse(checkedStr3.toString())

  const segDirectory = path.join(process.cwd(), 'pages/api/segment/segDict.txt')

  const Segment = require('segment')
  const segment = new Segment()
  segment.useDefault()
  segment.loadDict(segDirectory)

  // 【單字】查詢粵拼或IPA函數
  const queryJyutping = (txtStr, trad_simp, tabName, jyutping_ipa, signResult_IPA, signIPA_version, keep_symbol = true) => {
    let res = [];
    if (checked3) {
      res = (tabName=='nnDict') ? nnDict.filter(item => item[trad_simp] == txtStr && item['flag'] == '0') : nntDict.filter(item => item[trad_simp] == txtStr && item['flag'] == '0');
    } else {
      res = (tabName=='nnDict') ? nnDict.filter(item => item[trad_simp] == txtStr) : nntDict.filter(item => item[trad_simp] == txtStr);
    }
    if ( !(/[^\u4e00-\u9fa5]/.test(txtStr)) || (res.length > 0) ) { // 判斷是否中文或字典有數據
      if(res.length != 0){
        if (res.length == 1){ // 只有一種讀音
          return (jyutping_ipa == 'jyutping') ? res[0]['jyutping'] : jyutping_to_ipa(res[0]['jyutping'], signIPA_version, signResult_IPA, checked);
        } else {
          let char_jyutping = [], char_ipa = [];
          for (let i of res){
            char_jyutping.push(i.jyutping);
            char_ipa.push(jyutping_to_ipa(i.jyutping, signIPA_version, signResult_IPA, checked));
          }
          return (jyutping_ipa == 'jyutping') ? [...new Set(char_jyutping)].join('/') : [...new Set(char_ipa)].join('/');
        }
      } else { // 無讀音
        return '　'; // 全角空格，會被當成一個中文
      }
    } else { // 非中文字符
      if(keep_symbol) {
        return txtStr;
      } else {
        return '';
      }
    }
  }

  // 【詞彙】查詢粵拼或IPA函數
  const queryJyutpingPhrase = (txtStr, trad_simp, tabName, jyutping_ipa, signResult_format, signResult_IPA, signIPA_version, keep_symbol = true) => {
    let res = (tabName=='nnDict') ? nnDict.filter(item => item[trad_simp] == txtStr) : nntDict.filter(item => item[trad_simp] == txtStr);
    let resJ =[];
    if (res.length == 1 && txtStr.length > 1 && checked2) { // 詞典有一個數據並且爲詞彙
      for(let i in txtStr.split('')){
        let charJp = res[0]['jyutping'].split(' ')[i];
        if (signResult_format == 'updown') { // 按字內嵌時 中文字後帶 '</rt><rp>)</rp>'，拼音或ipa後帶 '</rt><rp>)</rp>'，return時合併起來
          resJ.push(txtStr.split('')[i] + '<rp>(</rp><rt>');
          resJ.push((jyutping_ipa == 'jyutping') ? charJp + '</rt><rp>)</rp>' : jyutping_to_ipa(charJp, signIPA_version, signResult_IPA, checked) + '</rt><rp>)</rp>');
        } else {
          resJ.push((jyutping_ipa == 'jyutping') ? charJp : jyutping_to_ipa(charJp, signIPA_version, signResult_IPA, checked));
        }
      }
    } else if (res.length > 1 && txtStr.length > 1 && checked2) { // 詞典有多個數據並且爲詞彙
      for(let i in txtStr.split('')){
        let tempJp = [], tempIPA = [];
        for (let j of res) {
          tempJp.push(j.jyutping.split(' ')[i]);
          tempIPA.push(jyutping_to_ipa(j.jyutping, signIPA_version, signResult_IPA, checked).split(' ')[i]);
        }
        if (signResult_format == 'updown') { // 按字內嵌時 中文字後帶 '</rt><rp>)</rp>'，拼音或ipa後帶 '</rt><rp>)</rp>'，return時合併起來
          resJ.push(txtStr.split('')[i] + '<rp>(</rp><rt>');
          resJ.push((jyutping_ipa == 'jyutping') ? [...new Set(tempJp)].join('/') + '</rt><rp>)</rp>' : [...new Set(tempIPA)].join('/') + '</rt><rp>)</rp>');
        } else {
          resJ.push((jyutping_ipa == 'jyutping') ? [...new Set(tempJp)].join('/') : [...new Set(tempIPA)].join('/'));
        }
      }
    } else { // 詞典無數據或有多個讀音或爲單字
      for(let i of txtStr.split('')){
        if (signResult_format == 'updown') {
          resJ.push(i + '<rp>(</rp><rt>');
          resJ.push(queryJyutping(i, trad_simp, tabName, jyutping_ipa, signResult_IPA, signIPA_version, keep_symbol) + '</rt><rp>)</rp>');
        } else {
          resJ.push(queryJyutping(i, trad_simp, tabName, jyutping_ipa, signResult_IPA, signIPA_version, keep_symbol));
        }
      }
    }
    return resJ.join((signResult_format == 'updown') ? '' : ',');
  }

  // 【句子】查詢粵拼或IPA函數
  const queryJyutpingSentence = () => {
    const outputText = []
    for (let lines of ptext.toString().split('_newline')) {
      if (signResult_format == 'updown') { // 按字內嵌
        let outputLine = [];
        for (let txtStr of segment.doSegment(lines,{simple: true})) {
          outputLine.push(`<ruby>${queryJyutpingPhrase(txtStr, signText_type, signResult_type, (signResult_way == 'jyutping' || signResult_way == 'jyutping_ipa') ? 'jyutping' : 'ipa', signResult_format, signResult_IPA, signIPA_version, false)}</ruby>`);
        }
        outputText.push(`${outputLine.join('')}<br>`);
      } else if (signResult_format == 'lineupdown') { // 按行內嵌
        let outputLine1 = [], outputLine3 = [];
        for (let txtStr of segment.doSegment(lines,{simple: true})) {
          outputLine1.push(queryJyutpingPhrase(txtStr, signText_type, signResult_type, (signResult_way == 'jyutping' || signResult_way == 'jyutping_ipa') ? 'jyutping' : 'ipa', signResult_format, signResult_IPA, signIPA_version).split(',').join(' '));
          outputLine3.push(txtStr);
        }
        outputText.push(`<ruby>${outputLine3.join('')}<rp>(</rp><rt>${outputLine1.join(' ')}</rt><rp>)</rp></ruby><br>`);
      } else if (signResult_format == 'twolines' || signResult_format == 'parallel') { // 分行或平行
        let outputLine1 = [], outputLine2 = [], outputLine3 = [];
        for (let txtStr of segment.doSegment(lines,{simple: true})) {
          if (signResult_way == 'jyutping') {
            outputLine1.push(queryJyutpingPhrase(txtStr, signText_type, signResult_type, 'jyutping', signResult_format, signResult_IPA, signIPA_version).split(',').join(' '));
            outputLine3.push(txtStr);
          } else if (signResult_way == 'ipa') {
            outputLine1.push(queryJyutpingPhrase(txtStr, signText_type, signResult_type, 'ipa', signResult_format, signResult_IPA, signIPA_version).split(',').join(' '));
            outputLine3.push(txtStr);
          } else if (signResult_way == 'jyutping_ipa') {
            outputLine1.push(queryJyutpingPhrase(txtStr, signText_type, signResult_type, 'jyutping', signResult_format, signResult_IPA, signIPA_version).split(',').join(' '));
            outputLine2.push(queryJyutpingPhrase(txtStr, signText_type, signResult_type, 'ipa', signResult_format, signResult_IPA, signIPA_version).split(',').join(' '));
            outputLine3.push(txtStr);
          } else if (signResult_way == 'ipa_jyutping') {
            outputLine1.push(queryJyutpingPhrase(txtStr, signText_type, signResult_type, 'ipa', signResult_format, signResult_IPA, signIPA_version).split(',').join(' '));
            outputLine2.push(queryJyutpingPhrase(txtStr, signText_type, signResult_type, 'jyutping', signResult_format, signResult_IPA, signIPA_version).split(',').join(' '));
            outputLine3.push(txtStr);
          }
        }
        if (signResult_way == 'jyutping' || signResult_way == 'ipa'){
          if (signResult_format == 'twolines') {  // 分行
            outputText.push(`${outputLine1.join(' ')}<br>${outputLine3.join('')}<br>`);
          } else {  // 平行
            outputText.push(`${outputLine3.join('')} || ${outputLine1.join(' ')}<br>`);
          }
        } else {
          if (signResult_format == 'twolines') {  // 分行
            outputText.push(`${outputLine1.join(' ')}<br>${outputLine2.join(' ')}<br>${outputLine3.join('')}<br>`);
          } else {  // 平行
            outputText.push(`${outputLine3.join('')} || ${outputLine1.join(' ')} || ${outputLine2.join(' ')}<br>`);
          }
        }
      } else if (signResult_format == 'replace') { // 直接替換
        let outputLine = [];
        for (let txtStr of segment.doSegment(lines,{simple: true})) {
          outputLine.push(queryJyutpingPhrase(txtStr, signText_type, signResult_type, (signResult_way == 'jyutping' || signResult_way == 'jyutping_ipa') ? 'jyutping' : 'ipa', signResult_format, signResult_IPA, signIPA_version).split(',').join(' '));
        }
        outputText.push(`${outputLine.join(' ')}<br>`);
      }
    }
    return outputText.join('');
  }

  // 【句子】分詞
  const querySegment = () => {
    const outputText = []
    for (let lines of ptext.toString().split('_newline')) {
      let outputLine = [];
      for (let txtStr of segment.doSegment(lines,{simple: true, stripPunctuation: checked2, stripStopword: checked3})) {
        outputLine.push(txtStr);
      }
      outputText.push(`${outputLine.join(' ')}<br>`);
    }
    return outputText.join('');
  }

  const querySegment2 = () => {
    const outputText = []
    for (let lines of ptext.toString().split('_newline')) {
      let outputLine = [];
      for (let txtStr of segment.doSegment(lines,{simple: checked, stripPunctuation: checked2, stripStopword: checked3})) {
        outputLine.push(JSON.stringify(txtStr));
      }
      outputText.push(outputLine.join(',\n'));
    }
    return "["+outputText.join(',\n')+"]";
  }

  try {
    res.status(200).json({ text: signText_type=='trad_simp' ? querySegment() : signText_type=='Array' ? querySegment2() : queryJyutpingSentence() })
  } catch {
    res.status(500).json({ error: 'failed to load data' })
  }
}

