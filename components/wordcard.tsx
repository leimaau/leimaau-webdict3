import React from 'react'
import { Divider } from 'primereact/divider'
import { Card } from 'primereact/card'
import { pageSplit } from '../components/qtable'

export default function WordCard ({tabDataListArr,dividerName}) {
    const sourStr = (year,sour) => {
        if (year == '1937jz') {
            return <span>{'1937年邕寧縣修誌委員會《邕寧縣誌(第4冊)》'}{pageSplit(sour,'jpg','https://fastly.jsdelivr.net/gh/leimaau/CDN@latest/data-store/1937tj/jz_tj')}</span>
        } else if (year == '1937kk') {
            return <span>{'1937年廣西省政府總務處統計室《南寧社會概況》'}{pageSplit(sour,'jpg','https://fastly.jsdelivr.net/gh/leimaau/CDN@latest/data-store/1937tj/kk_tj')}</span>
        }
    }

    if (tabDataListArr.length!=0) {
        return  (
        <div>
            <Divider align="left" type="dashed">
                <span className="p-tag p-tag-info"><i className="pi pi-book"></i>{dividerName}</span>
            </Divider>
            {tabDataListArr.map(({ year,_id,trad,simp,ipa_s,ipa_t,jyutping,sour,expl,note }) => (
            <div key={_id}>
                <Divider align="left" type="dashed"/>
                <Card footer={<React.Fragment><p className={ipa_s==null ? "hidden" : "text-xs text-600"}>原文IPA：[{ipa_s}]</p><p className="text-xs text-600">來源：{(year!='1937jz'&&year!='1937kk') ? sour : sourStr(year,sour)}</p><p className={note==null ? "hidden" : "text-xs text-600"}>附註：{note}</p></React.Fragment>} title={trad+ (simp!=null? '('+simp+')' : '')} subTitle={(jyutping!=null? jyutping : '')+(ipa_t!=null? ' ['+ipa_t+']' : '')} >
                    <p className="m-0 text-cyan-500 hover:text-cyan-700" style={{lineHeight: '1.5'}}>{expl!=null ? expl : ''}</p>
                </Card>
            </div>
            ))}
        </div>
        )
    } else {
        return  (
        <div>
            <Divider align="left" type="dashed">
                <span className="p-tag p-tag-info"><i className="pi pi-book"></i>{dividerName}</span>
            </Divider>
            <Divider align="left" type="dashed"/>
            <Card  title="" subTitle="">
                <p className="m-0 text-orange-500" style={{lineHeight: '1.5'}}>未找到結果</p>
            </Card>
        </div>
        )
    }
  
}