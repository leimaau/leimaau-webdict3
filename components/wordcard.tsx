import React from 'react'
import { Divider } from 'primereact/divider'
import { Card } from 'primereact/card'

export default function WordCard ({tabDataListArr,dividerName}) {
    if (tabDataListArr.length!=0) {
        return  (
        <div>
            <Divider align="left" type="dashed">
                <span className="p-tag p-tag-info"><i className="pi pi-book"></i>{dividerName}</span>
            </Divider>
            {tabDataListArr.map(({ _id,trad,simp,ipa_s,ipa_t,jyutping,sour,expl,note }) => (
            <div key={_id}>
                <Divider align="left" type="dashed"/>
                <Card footer={<React.Fragment><p className={ipa_s==null ? "hidden" : "text-xs text-600"}>原文IPA：[{ipa_s}]</p><p className="text-xs text-600">來源：{sour}</p><p className={note==null ? "hidden" : "text-xs text-600"}>附註：{note}</p></React.Fragment>} title={trad+'('+simp+')'} subTitle={jyutping+' ['+ipa_t+']'} >
                    <p className="m-0 text-cyan-500 hover:text-cyan-700" style={{lineHeight: '1.5'}}>{expl}</p>
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