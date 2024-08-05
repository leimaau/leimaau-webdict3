# 利用中古音自動推導南寧方言理論音

本文由 Leimaau 於 2021 年所作，利用中古切韻音系至現代方言的演化規律自動推導大致的理論參攷音，也是本站理論音的推導來源。演化規律從現實語言中總結得越完善，則推導出的理論音就越接近實際音，所以這是一個隨着研究深入不斷改善的系統。各文獻提供的演變規律祇是一個輪廓，實際的細化規律由筆者通過經驗補充。另外本站版本的《集韻》開合與《廣韻》不同，比如咸山攝幫組《集韻》合口而《廣韻》開口，宕攝三等來母《集韻》合口而《廣韻》開口，故而《集韻》有些字開合推導未必正確，需要對照反切。將來有更合適推導的《集韻》電子版本再更新。

## 中古切韻音系至南寧白話演化關係

### 類 js 代碼

類 js 代碼爲[切韻音系自動推導器](https://nk2028.shn.hk/qieyun-autoderiver/)使用的寫法，特點是簡明易懂。

```js
/* 推導南寧白話
 *
 * https://github.com/leimaau/naamning_jyutping
 *
 * version: 2024-08-04
 *
 * 【符號說明】
 * 心母字讀 sl[ɬ]（清齒齦邊擦音），效咸山攝二等字讀 -eu[-ɛu]、-em[-ɛm]/-ep[-ɛp]、-en[-ɛn]/-et[-ɛt]，但演變不平衡，以下只推導文讀音，同理，梗三四的演變不平衡，以下也只推導文讀音
 * 老派的師韻（止開三精莊組）字讀 zy[tsɿ]、cy[tsʰɿ]、sy[sɿ]，津韻（臻合三舌齒音、部份臻開三）字讀 -yun[-yn]/-yut[-yt]，推導以老派音爲準
 * 聲母韻母有些部分依靠經驗給出推導條例，莊組白讀j不涉及，比較零散
 *
 * @author LeiMaau
 */

if (!音韻地位) return [
  ['文白讀', [2, '白讀', '文讀']],
  ['新老派', [2, '新派', '老派']]
];

const is = (x) => 音韻地位.屬於(x);

function 聲母規則() {
  if (is('幫母')) {
    if (is('輕脣韻')) return 'f';
    return 'b';
  }
  if (is('滂母')) {
    if (is('輕脣韻')) return 'f';
    return 'p';
  }
  if (is('並母')) {
    if (is('輕脣韻')) return 'f';
    if (is('平聲')) return 'p';
    return 'b';
  }
  if (is('明母')) return 'm';

  if (is('端母')) return 'd';
  if (is('透母')) return 't';
  if (is('定母')) return is('平聲') ? 't' : 'd';
  if (is('泥母')) return 'n';
  if (is('來母')) return 'l';

  if (is('知母')) return 'z';
  if (is('徹母')) return 'c';
  if (is('澄母')) return is('平聲') ? 'c' : 'z';
  if (is('孃母')) return 'n';

  if (is('精母')) return 'z';
  if (is('清母')) return 'c';
  if (is('從母')) return is('平聲') ? 'c' : 'z';
  
  if (is('心母')) {
    if (is('支脂之微韻 開口')) return is('支韻 上聲') ? 'sl' : 's';  // 徙璽 絲斯
    if (is('支脂之微韻 合口 上聲 或 泰咍韻 開口 去聲 或 寒韻 開口 平聲')) return 's';  // 髓賽珊
    return 'sl';
  }
  
  if (is('邪母 平聲')) {
    if (is('山臻攝 三等')) {
      if (選項.新老派 === '老派') {
        return 'sl';
      } else {
        return is('臻攝 合口 三等') ? 'c' : 'sl';
      }
    }
    return 'c';
  }
  if (is('邪母 仄聲')) return 'z';

  if (is('莊母')) return 'z';
  if (is('初母')) return 'c';
  if (is('崇母')) return is('平聲') ? 'c' : 'z';
  if (is('生母')) return 's';
  if (is('俟母')) return 's';

  if (is('章母')) return 'z';
  if (is('昌母')) return 'c';
  if (is('常母')) return 's';
  if (is('書母')) return 's';
  if (is('船母')) return 's';
  if (is('日母')) return 'j';

  if (is('見母')) return 'g';
  
  if (is('溪母')) {
    if (is('模韻')) return 'f';
    if (is('開口')) {
      if (is('侯韻')) return is('上聲') ? 'h' : 'k';
      if (is('果假攝 或 鍾先仙陽江韻 入聲 或 佳皆齊宵支陽韻 舒聲 或 庚韻 三等 入聲 或 唐咍韻 去聲')) return 'k';
      if (is('尤韻 或 侵韻 入聲')) return 'j';
      return 'h';
    }
    if (is('合口')) {
      if (is('文韻 舒聲')) return 'kw';
      if (is('果遇止假梗宕攝 或 先仙元韻 入聲 或 皆佳祭齊魂眞韻 舒聲')) return 'k';
      if (is('登韻 舒聲')) return 'w';
      return 'h';
    }
    return 'h';
  }
  
  if (is('羣母')) return is('平聲') ? 'k' : 'g';
  if (is('疑母')) return 'ng';

  if (is('曉母')) {
    if (is('模韻')) return 'f';
    if (is('開口')) {
      if (is('侯韻 去聲')) return 'k';
      if (is('尤韻 或 鍾韻 入聲')) return 'j';
      return 'h';
    }
    if (is('合口')) {
      if (is('庚耕韻 二等 舒聲 或 登韻 舒聲 或 蒸青清韻 入聲')) return 'gw';
      if (is('止攝 或 寒韻 去聲 或 文魂祭齊廢佳皆夬韻 舒聲')) return 'w';
      if (is('陽韻 去聲 或 陽韻 入聲 或 唐韻 入聲')) return 'k'; // 宕攝 三等 去聲 或 宕攝 三等 入聲 或 宕攝 一等 入聲
      if (is('通遇梗曾攝 或 山元先仙韻 四等 或 三等')) return is('陽韻 上聲') ? 'f' : 'h';
      return 'f';
    }
    return 'h';
  }
  
  if (is('匣母')) {
    if (is('模韻')) return 'w';
    if (is('開口')) return 'h';
    if (is('合口')) {
      if (is('一二等')) return is('通攝') ? 'h' : 'w';
      if (is('三四等')) return is('通攝') ? 'j' : is('咸攝') ? 'h' : 'w';
    }
    return 'h';
  }
  if (is('影云以母')) {
    if (is('模韻')) return 'w';
    if (is('開口')) {
      if (is('三四等 非 (影母 蟹攝)')) return 'j';  
      if (is('云母 二等')) return 'w';
      if (is('一二等 以母')) return 'j';
      return '';
    }
    if (is('合口')) {
      if (is('一二等')) return is('通攝') ? '' : 'w';
      if (is('三四等')) {
        if (is('通果攝 或 以母 蟹攝 或 影云母 咸攝')) return 'j';
        return 'w';
      }
    }
    return is('三四等') ? 'j' : '';
  }

  throw new Error('無聲母規則');
}

function 韻母規則() {
  // 通攝
  if (is('東冬鍾韻')) return 'ung';

  // 江攝
  if (is('江韻')) return is('初生母 舒聲') ? 'oeng' : is('影母 入聲') ? 'ang' : 'ong'; // 雙囪握

  // 止攝
  if (is('支脂之微韻 幫組')) return 'i';
  if (is('支脂之微韻 開口') && !is('幫組')) {
    if (is('精莊組')) {
      if (選項.新老派 === '老派') {
        return is('心生母 支韻 上聲') ? 'ai' : 'y';
      } else {
        return is('心生母 支韻 上聲') ? 'ai' : 'i';
      }
    }
    return 'i';
  }
  if (is('支脂之微韻 合口 舌齒音')) return 'ui';
  if (is('支脂之微韻 合口 牙喉音')) return 'ai';

  // 遇攝
  if (is('魚虞韻')) {
    if (is('幫組')) return 'u';
    if (is('莊組')) return 'o';
    return 'yu';
  }
  if (is('模韻')) return is('疑母') ? '' : 'u';

  // 蟹攝
  if (is('齊韻')) return 'ai';
  if (is('祭韻')) {
    if (is('合口 以母')) return 'ui';
    if (is('合口') && !is('牙喉音')) return 'ui';
    return 'ai';
  }
  if (is('泰韻 幫組')) return 'ui';
  if (is('泰韻 開口') && !is('幫組')) {
    if (is('牙喉音 或 精組 或 泥孃母')) return 'oi';
    return 'aai';
  }
  if (is('泰韻 合口') && !is('幫組')) return is('疑母') ? 'oi' : 'ai';
  if (is('佳皆夬韻')) return 'aai';
  if (is('灰韻')) return is('疑母 或 見母') ? 'ai' : 'ui';
  if (is('咍韻')) return is('幫組 或 以母') ? 'ui' : 'oi';
  if (is('廢韻')) return 'ai';

  // 臻攝
  if (is('眞臻文欣魂痕韻')) {
    if (is('魂韻 精組')) return 'yun';
    if (is('魂韻 幫組')) return 'un';
    if (is('合口 三等 舌齒音')) {
      if (選項.新老派 === '老派') {
        return 'yun';
      } else {
        return 'an';
      }
    }
    return 'an';
  }
  if (is('元韻 幫組')) return 'aan';
  if (is('元韻 開口')) return 'in';
  if (is('元韻 合口')) return 'yun';

  // 山攝
  if (is('寒韻 幫組')) return 'un';
  if (is('寒韻 開口 舌齒音')) return 'aan';
  if (is('寒韻 開口 牙喉音')) return 'on';
  if (is('寒韻 合口 舌齒音')) return 'yun';
  if (is('寒韻 合口 牙喉音')) return 'un';
  if (is('刪山韻')) {
    if (選項.文白讀 === '文讀') {
      return 'aan'; 
    } else {
      return is('見溪疑曉匣母 或 山韻 幫母 入聲') ? 'en' : 'aan';
    }
  }
  if (is('仙先韻 幫組')) return 'in';
  if (is('仙先韻 開口')) return 'in';
  if (is('仙先韻 合口')) return 'yun';

  // 效攝
  if (is('蕭宵韻')) return 'iu';
  if (is('肴韻')) {
    if (選項.文白讀 === '文讀') {
      return 'aau';
    } else {
      return !is('曉母') ? 'eu' : 'aau';
    }
  }
  if (is('豪韻')) return is('溪母') ? 'aau' : 'u';

  // 果攝
  if (is('歌韻 一等')) return 'o';
  if (is('歌韻 三等')) return is('合口') ? 'oe' : 'e';

  // 假攝
  if (is('麻韻 二等')) return 'aa';
  if (is('麻韻 三等')) return 'e';

  // 宕攝
  if (is('陽韻 幫組')) return 'ong';
  if (is('陽韻 開口 莊組')) return 'ong';
  if (is('陽韻 開口')) return 'oeng';
  if (is('陽韻 合口')) return 'ong';
  if (is('唐韻')) return 'ong';

  // 梗攝
  if (is('庚韻 二等')) return is('影見曉母 或 溪匣母 上去聲') ? 'ang' : 'aang';
  if (is('庚韻 三等 莊組')) return 'aang';
  if (is('庚韻 三等')) return 'ing';
  if (is('耕韻')) return is('影見曉母 或 溪匣母 上去聲') ? 'ang' : 'aang';
  if (is('清青韻')) return 'ing';

  // 曾攝
  if (is('蒸韻')) return 'ing';
  if (is('登韻')) return 'ang';

  // 流攝
  if (is('尤侯幽韻')) return 'au';

  // 深攝
  if (is('侵韻')) return 'am';

  // 咸攝
  if (is('覃談韻 幫組')) return 'aam';
  if (is('覃談韻 舌齒音')) return 'aam';
  if (is('覃談韻 牙喉音')) return 'am';
  if (is('鹽添嚴韻')) return 'im';
  if (is('咸銜凡韻')) {
    if (選項.文白讀 === '文讀') {
      return 'aam';
    } else {
      return is('銜咸韻 舒聲 莊初崇見溪曉匣母') ? 'em' : is('銜咸韻 入聲 見莊初崇生知徹澄孃母') ? 'em' : 'aam';
    }
  }

  throw new Error('無韻母規則');
}

function 聲調規則() {
  if (is('全清 或 次清')) {
    if (is('平聲')) return '1'; // 陰平
    if (is('上聲')) return '2'; // 陰上
    if (is('去聲')) return '3'; // 陰去
    if (is('入聲')) {
      if (is('咸山江宕攝 或 梗攝 二等')){ // 清紐外轉字，影母特例
        if (is('(咸攝 一等 或 江梗攝) 影母')) return '1';
        return '3';
      }
      if (is('梗攝 三等 莊組')) return '3';
      return '1'; // 清紐內轉字
    }
  } else {
    if (is('平聲')) return '4'; // 陽平
    if (is('全濁 上聲')) return '6'; // 陽去，全濁上變去
    if (is('上聲')) return '5'; // 陽上
    if (is('去聲')) return '6'; // 陽去
    if (is('入聲')) return '6'; // 陽入
  }
  throw new Error('無聲調規則');
}

let 聲母 = 聲母規則();
let 韻母 = 韻母規則();
let 聲調 = 聲調規則();


if (is('合口') && !['u', 'o', 'yu'].some((x) => 韻母.startsWith(x))) { // 合口字
  if (聲母 === 'g' && !韻母.startsWith('im')) 聲母 = 'gw';
  else if (聲母 === 'k' && !韻母.startsWith('ing') && !韻母.startsWith('im')) 聲母 = 'kw';
  else if (聲母 === 'h' && !韻母.startsWith('i')) 聲母 = 'hw';
  else if (聲母 === 'w' && 韻母 === 'yu') 聲母 = 'j';
  else if (聲母 === 'h' && (韻母 === 'ui' || 韻母 === 'un')) 聲母 = 'f';
}


// 疑母拼細音時: i-類和oe-類 入聲n- 舒聲j-；yu類 舒入聲j-；u-類 ngung/k->jung/k，ngun/t->wun/t，ngu不變
if (聲母 === 'ng') {
  const is細音i和oe類 = ['i', 'oe'].some((x) => 韻母.startsWith(x));
  const is細音yu類 = ['yu'].some((x) => 韻母.startsWith(x));
  const is細音u類 = ['u'].some((x) => 韻母.startsWith(x));
  if (is細音i和oe類 && is('入聲')) 聲母 = 'n';
  if (is細音i和oe類 && is('舒聲')) 聲母 = 'j';
  if (is細音yu類) 聲母 = 'j';
  if (is細音u類 && 韻母 === 'ung') 聲母 = 'j';
  if (is細音u類 && 韻母 === 'un') 聲母 = 'w';
}

// 其他變換
if (聲母 === 'w' && 韻母 === 'yu') 聲母 = 'j'; // 保險起見再寫一遍
if (聲母 === 'h' && (韻母 === 'ui' || 韻母 === 'un')) 聲母 = 'f'; // 保險起見再寫一遍
if (聲母 === 'hw' && 韻母.startsWith('a')) 聲母 = 'f';


// 南寧的 詠泳咏 讀陽上
if (is('云匣母 庚韻 合口 去聲')) 聲調 = '5';


// m 韻尾在聲母為脣音時為 n
if (is('幫組') && 韻母.endsWith('m')) 韻母 = 韻母.slice(0, -1) + 'n';

if (is('入聲')) {
  if (韻母.endsWith('m')) 韻母 = 韻母.slice(0, -1) + 'p';
  else if (韻母.endsWith('n')) 韻母 = 韻母.slice(0, -1) + 't';
  else if (韻母.endsWith('ng')) 韻母 = 韻母.slice(0, -2) + 'k';
}

return 聲母 + 韻母 + 聲調;
```



### Oracle SQL 代碼

電子化檔案使用 Oracle SQL 代碼來表示，下文取自本站數據庫的源碼，she攝 hu呼 deng等 niu聲紐 yunbu韻部。


```sql
-- 中古切韻音系至南寧白話演化關係
create or replace view v_nbdict_202109_gy as
select tab_id,word trad,
case when niu='幫' then
  case when (she='通' and hu='合' and deng='三' and tone ='入') or (yunbu='東' and deng='三') or yunbu in('鍾','微','廢','虞','文','元','陽','尤','凡','燭','物','月','藥','乏') then 'f' else 'b' end
when niu='滂' then
  case when (she='通' and hu='合' and deng='三' and tone ='入') or (yunbu='東' and deng='三') or yunbu in('鍾','微','廢','虞','文','元','陽','尤','凡','燭','物','月','藥','乏') then 'f' else 'p' end
when niu='並' then
  case when (she='通' and hu='合' and deng='三' and tone ='入') or (yunbu='東' and deng='三') or yunbu in('鍾','微','廢','虞','文','元','陽','尤','凡','燭','物','月','藥','乏') then 'f'
  else case when tone='平' then 'p' else 'b' end end
when niu='明' then 'm'
when niu='端' then 'd'
when niu='透' then 't'
when niu='定' then case when tone='平' then 't' else 'd' end
when niu='泥' then 'n'
when niu='來' then 'l'
when niu in('知','精','莊','章') then 'z'
when niu in('徹','清','初','昌') then 'c'
when niu in('澄','從','崇') then case when tone='平' then 'c' else 'z' end
when niu='邪' then
  case when tone='平' and she in('山','臻') and deng='三' then 'sl'
  when tone in('上','去','入') then 'z'
  else 'c' end
when niu='娘' then 'n'
when niu='心' then
  case when (she='止' and hu='開' and deng='三' and not(yunbu='支' and tone='上')) --斯徙
  or (she='止' and hu='合' and deng='三' and tone='上') --髓
  or (she='蟹' and hu='開' and deng='一' and tone='去') --賽
  or (she='山' and hu='開' and deng='一' and tone='平') then 's' --珊
  else 'sl' end
when niu in('生','禪','書','船') then 's'
when niu='日' then 'j'
when niu='見' then 'g'
when niu='溪' then
  case when yunbu='模' then 'f'
  when hu='開' and yunbu<>'模' then
    case when she in('果','假') or (yunbu='侯' and tone<>'上') or yunbu in('燭','屑','薛','佳','皆','齊','宵','支','覺','陽','藥') or (deng='三' and yunbu='陌') or (yunbu in('唐','咍') and tone='去') then 'k'
    when yunbu in('尤','緝') then 'j'
    else 'h' end
  when hu='合' and yunbu<>'模' then
    case when she='臻' and deng='三' and yunbu='文' then 'kw'
    when she in('果','遇','止','假','梗','宕') or yunbu in('皆','佳','祭','齊','屑','薛','魂','月','真') then 'k'
    when she='曾' and deng='一' and yunbu='登' then 'w'
    else 'h' end
  end
when niu='群' then case when tone='平' then 'k' else 'g' end
when niu='疑' then 'ng'
when niu='曉' then
  case when yunbu='模' then 'f'
  when hu='開' and yunbu<>'模' then
    case when yunbu in('燭','尤') then 'j'
    when yunbu='侯' and tone='去' then 'k'
    else 'h' end
  when hu='合' and yunbu<>'模' then
    case when (she='梗' and deng='二' and yunbu in('庚','耕')) or (she='曾' and deng='一' and yunbu='登') or yunbu in('職','錫','昔') then 'gw'
    when she='止' or (yunbu='寒' and tone='去') or yunbu in('文','魂','祭','齊','廢') or (she='蟹' and deng='二') then 'w'
    when (she='宕' and deng='三' and (tone='去' or tone='入')) or (she='宕' and deng='一' and tone='入') then 'k'
    when she in('通','遇','梗','曾') or (she in('果','山') and deng in('三','四')) or (deng='三' and not(she='宕' and tone='上')) then 'h'
    else 'f' end
  end
when niu='匣' then
  case when yunbu='模' then 'w'
  when hu='開' and yunbu<>'模' then 'h'
    --case when (she='山' and deng='四' and tone<>'入') or (she='梗' and deng='四' and tone='平') then 'j' else 'h' end
  when hu='合' and yunbu<>'模' and deng in('一','二') then
    case when she='通' then 'h' else 'w' end
  when hu='合' and yunbu<>'模' and deng in('三','四') then
    case when she='通' then 'j'
    when she='咸' then 'h' else 'w' end
    --case when (she='山' and deng='四') or (she='梗' and deng='四' and tone='平') then 'j' else 'w' end
  end
when niu in('影','云','以') then
  case when yunbu='模' then 'w'
  when hu='開' and yunbu<>'模' then
    case when deng in('三','四') and not(niu='影' and she='蟹') then 'j'
    when deng='二' and niu='云' then 'w'
    when deng in('一','二') and niu='以' then 'j' else '' end
  when hu='合' and yunbu<>'模' and deng in('一','二') then
    case when she='通' then '' else 'w' end
  when hu='合' and yunbu<>'模' and deng in('三','四') then
    case when she in('通','果') or (niu='以' and she='蟹') or (niu in('影','云') and she='咸') then 'j' else 'w' end
  end
end shengmu,
case when she='通' then
  case when yunbu in('東','冬','鍾') then 'ung' else 'uk' end
when she='江' then
  case when yunbu='江' then
    case when niu in('初','生') and tone<>'入' then 'oeng' else 'ong' end
  else case when niu in('影') then 'ak' else 'ok' end end
when she='止' then
  case when niu in('幫','滂','並','明') then 'i'
  when hu='開' and niu not in('幫','滂','並','明') then
    case when niu in('精','清','從','心','邪','莊','初','崇','生') and deng='三' then
      case when yunbu='支' and tone='上' and niu in('心','生') then 'ai' else 'y' end
    else 'i' end
  when hu='合' and niu not in('幫','滂','並','明') then
    case when niu in('見','溪','群','疑','影','曉','匣','云','以') then 'ai' else 'ui' end
  end
when she='遇' then
  case when yunbu in('魚','虞') then
    case when niu in('幫','滂','並','明') then 'u'
    when niu in('莊','初','崇','生') then 'o'
    else 'yu' end
  else
    case when niu='疑' then '' else 'u' end
  end
when she='蟹' then
  case when yunbu='齊' then 'ai'
  when yunbu='祭' then
    case when hu='合' and niu='以' then 'ui'
    when hu='合' and niu not in('見','溪','群','疑','影','曉','匣','云','以') then 'ui'
    else 'ai' end
  when yunbu='泰' then
    case when niu in('幫','滂','並','明') then 'ui' else
      case when hu='開' then
        case when niu in('見','溪','群','疑','影','曉','匣','精','清','從','心','邪','泥','娘') then 'oi' else 'aai' end
      when hu='合' then
        case when niu='疑' then 'oi' else 'ai' end
      end
    end
  when yunbu in('佳','皆','夬') then 'aai'
  when yunbu='灰' then
    case when niu in('疑','見') then 'ai' else 'ui' end
  when yunbu='咍' then
    case when niu in('幫','滂','並','明','以') then 'ui' else 'oi' end
  when yunbu='廢' then 'ai' end
when she='臻' then
  case when yunbu in('真','臻','文','欣','魂','痕') then
    case when yunbu='魂' and niu in('精','清','從','心','邪') then 'yun'
    when yunbu='魂' and niu in('幫','滂','並','明') then 'un'
    when hu='合' and deng='三' and niu not in('幫','滂','並','明','見','溪','群','疑','影','曉','匣','云','以') then 'yun'
    else 'an' end
  else
    case when yunbu='沒' and niu in('精','清','從','心','邪') then 'yut'
    when yunbu='沒' and niu in('幫','滂','並','明') then 'ut'
    when hu='合' and deng='三' and niu not in('幫','滂','並','明','見','溪','群','疑','影','曉','匣','云','以') then 'yut'
    else 'at' end
  end
when she='山' then
  case when yunbu in('寒','刪','山','仙','先','元') then
    case when yunbu='元' and niu in('幫','滂','並','明') then 'aan'
    when yunbu='元' and niu not in('幫','滂','並','明') and hu='開' then 'in'
    when yunbu='元' and niu not in('幫','滂','並','明') and hu='合' then 'yun'
    when yunbu='寒' and niu in('幫','滂','並','明') then 'un'
    when yunbu='寒' and hu='開' and niu not in('幫','滂','並','明') then
      case when niu in('見','溪','群','疑','影','曉','匣') then 'on' else 'aan' end
    when yunbu='寒' and hu='合' and niu not in('幫','滂','並','明') then
      case when niu in('見','溪','群','疑','影','曉','匣') then 'un' else 'yun' end
    when yunbu in('刪','山') then 'aan'
      --case when deng='二' and niu in('見','溪','疑','曉','匣') then 'en' else 'aan' end
    when yunbu in('仙','先') and hu='開' then 'in'
    when yunbu in('仙','先') and hu='合' and niu in('幫','滂','並','明') then 'in'
    when yunbu in('仙','先') and hu='合' and niu not in('幫','滂','並','明') then 'yun' end
  else
    case when yunbu='月' and niu in('幫','滂','並','明') then 'aat'
    when yunbu='月' and niu not in('幫','滂','並','明') and hu='開' then 'it'
    when yunbu='月' and niu not in('幫','滂','並','明') and hu='合' then 'yut'
    when yunbu='曷' and niu in('幫','滂','並','明') then 'ut'
    when yunbu='曷' and hu='開' and niu not in('幫','滂','並','明') then
      case when niu in('見','溪','群','曉','匣') then 'ot' else 'aat' end
    when yunbu='曷' and hu='合' and niu not in('幫','滂','並','明') then
      case when niu in('溪','群','疑','曉','匣') then 'ut' when niu in('影','見') then 'aat' else 'yut' end
    when yunbu in('鎋','黠') then
      case when niu='匣' and hu='開' then 'at' else 'aat' end
      --case when (deng='二' and niu in('見','溪','疑','曉','匣')) or (yunbu='黠' and niu='幫') then 'et' else 'aat' end
    when yunbu in('屑','薛') and hu='開' then 'it'
    when yunbu in('屑','薛') and hu='合' and niu in('幫','滂','並','明') then 'it'
    when yunbu in('屑','薛') and hu='合' and niu not in('幫','滂','並','明') then 'yut' end
  end
when she='效' then
  case when yunbu in('蕭','宵') then 'iu'
  --when yunbu='肴' and niu<>'曉' then 'eu'
  when yunbu='肴' then 'aau'
  when yunbu='豪' and niu<>'溪' then 'u'
  when yunbu='豪' and niu='溪' then 'aau' end
when she='果' then
  case when deng='一' then 'o'
  when hu='合' and deng='三' then 'oe' else 'e' end
when she='假' then
  case when deng='二' then 'aa' else 'e' end
when she='宕' then
  case when yunbu in ('陽','唐') then
    case when hu='開' and deng='三' and niu not in('幫','滂','並','明','莊','初','崇','生') then 'oeng'
    when hu='合' and deng='三' and niu='來' and she='宕' then 'oeng' else 'ong' end
  else
    case when hu='開' and deng='三' and niu not in('幫','滂','並','明','莊','初','崇','生') then 'oek'
    when hu='合' and deng='三' and niu='來' and she='宕' then 'oek'
    when yunbu='鐸' and tone='去' then 'aau' -- 應歸入肴韻
    else 'ok' end
  end
when she='梗' then
  case when yunbu in ('清','青','庚','耕') then
    case when yunbu in ('清','青')  or (yunbu='庚' and deng='三' and niu not in('莊','初','崇','生')) then 'ing' else
      case when niu not in('影','見','曉') and deng='二' and not(niu in('匣','溪') and tone in('去','上')) then 'aang'
      when niu in('莊','初','崇','生') and deng='三' then 'aang'
      else 'ang' end
    end
  else
    case when yunbu in ('昔','錫')  or (yunbu='陌' and deng='三' and niu not in('莊','初','崇','生')) then 'ik' else
      case when niu not in('影','明','娘','孃') and deng='二' then 'aak'
      when niu in('莊','初','崇','生') and deng='三' then 'aak'
      else 'ak' end
    end
  end
when she='曾' then
  case when yunbu='登' then 'ang'
  when yunbu='蒸' then 'ing'
  when yunbu='德' then 'ak'
  when yunbu='職' then 'ik' end
when she='流' then 'au'
when she='深' then
  case when yunbu='侵' then 'am' else 'ap' end
when she='咸' then
  case when yunbu in('覃','談','鹽','添','嚴','咸','銜','凡') then
    case when yunbu in('覃','談') and niu in('見','溪','群','疑','影','曉','匣','云','以','日') then 'am'
    when (yunbu in('鹽','添','嚴') and deng<>'二') or (hu='開' and deng='三') or (niu not in('幫','滂','並','明') and hu='合' and deng='三') then 'im'
    --when yunbu in('銜','咸') and niu in('莊','初','崇','見','溪','曉','匣') then 'em'
    else 'aam' end
  else
    case when yunbu in('合','盍') and niu in('見','溪','群','疑','影','曉','匣','云','以','日') then 'ap'
    when yunbu in('葉','怗','業') or (hu='開' and deng='三') or (niu not in('幫','滂','並','明') and hu='合' and deng='三') then 'ip'
    --when yunbu in('狎','洽') and niu in('見','莊','初','崇','生','知','徹','澄','娘') then 'ep'
    else 'aap' end
  end
end yunmu,
case when niu in('並','奉','定','澄','從','邪','崇','船','禪','群','匣','明','泥','來','娘','日','疑','以','云') then
  case when tone ='平' then '4'
  when tone ='上' then
    case when niu in('並','奉','定','澄','從','邪','崇','船','禪','群','匣') then '6'
    when niu in('明','泥','來','娘','日','疑','以','云') then '5' end
  when tone in ('去','入') then '6' end
else
  case when tone ='平' then '1'
  when tone='上' then '2'
  when tone='去' then '3'
  when tone='入' then
    -- 清紐外轉字
    case when she in('咸','山','江','宕') or (she='梗' and deng='二') then
      case when she='咸' and deng='一' and niu='影' then '1'
      when she='江' and niu='影' then '1'
      when she='梗' and niu='影' then '1' else '3' end
    when niu in('莊','初','崇','生') and deng='三' and she='梗' then '3'
    else '1' end
  end
end shengdiao,
niu,yunbu,she,hu,deng,tone,expl,note
from tab_gy_jy_dong
WITH READ ONLY
;


create or replace view v_nbdict_infer as
select tab_id,trad,simp,ipa_t ipa_s,ipa_t,u1.jyutping,sour,expl,note from (
  select tab_id,trad,simp,replace(replace(replace(
  replace(replace(replace(replace(replace(replace(
  replace(replace(replace(replace(replace(replace(shengmu||yunmu||shengdiao,
  'ngik','nik'),'ngip','nip'),'ngit','nit'),'ngoek','noek'),
  --njik>nik  njip>nip  njit>nit  njoek>noek
  'wyu','jyu'),'ngi','ji'),'ngyu','jyu'),'ngoe','joe'),'nguk','juk'),'ngung','jung'),
  'ngut','wut'),'ngun','wun'),'hwa','fa'),'hui','fui'),'hut','fut') jyutping,sour,expl,note
  from (
    select tab_id,trad,trad simp,
    case when shengmu ='g' and hu='合' and yunmu not like 'u%' and yunmu not like 'o%' and yunmu not like 'yu%' and yunmu not like 'im%' then 'gw'
    when shengmu ='k' and hu='合' and yunmu not like 'u%' and yunmu not like 'o%' and yunmu not like 'yu%' and yunmu not like 'ing%' and yunmu not like 'im%' then 'kw'
    when shengmu ='h' and hu='合' and yunmu not like 'u%' and yunmu not like 'o%' and yunmu not like 'yu%' and yunmu not like 'i%' then 'hw'
    when shengmu ='h' and yunmu='un' then 'f'
    else shengmu end shengmu,
    case when shengmu in('b','p','m','f') and yunmu like '%m' then substr(yunmu,1,length(yunmu)-1)||'n'
    when shengmu in('b','p','m','f') and yunmu like '%p' then substr(yunmu,1,length(yunmu)-1)||'t'
    else yunmu end yunmu,
    --南寧 詠泳咏 讀陽上
    case when niu in('云','匣') and hu='合' and yunbu='庚' and tone='去' then '5' else shengdiao end shengdiao
    ,'' sour,expl,note
    from  v_nbdict_202109_gy
    order by tab_id)
)u1,tab_jyutping_ipa u2
where u1.jyutping=u2.jyutping(+)
WITH READ ONLY
;
```

## 中古切韻音系至南寧平話演化關係

### 類 js 代碼

類 js 代碼爲[切韻音系自動推導器](https://nk2028.shn.hk/qieyun-autoderiver/)使用的寫法，特點是簡明易懂。

```js
/* 推導南寧亭子平話
 *
 * https://github.com/leimaau/naamning_jyutping
 *
 * version: 2024-08-04
 *
 * 【符號說明】
 * 心母字讀 sl[ɬ]（清齒齦邊擦音），日母和疑母細音字讀 nj[ȵ]（齦齶音）
 * 老派的疑母模韻字讀 ngu[ŋu]，微母遇攝臻攝字讀 fu[fu]、fat[fɐt]、fan[fɐn]，遇合一讀o[o]，果合一讀u[u]，推導以老派音爲準
 * 聲母韻母有些部分依靠經驗給出推導條例，莊組白讀nj不涉及，比較零散
 *
 * @author LeiMaau
 */

if (!音韻地位) return [['新老派', [2, '新派', '老派']]];

const is = (x) => 音韻地位.屬於(x);

function 聲母規則() {
  if (is('幫母')) {
    if (is('輕脣韻')) return 'f';
    return 'b';
  }
  if (is('滂母')) {
    if (is('輕脣韻')) return 'f';
    return 'p';
  }
  if (is('並母')) {
    if (is('輕脣韻')) return 'f';
    return 'b';
  }
  if (is('明母')) {
    if (選項.新老派 === '老派') {
      return is('虞文韻') ? 'f' : 'm';
    } else {
      return 'm';
    }
  }

  if (is('端母')) return 'd';
  if (is('透母')) return 't';
  if (is('定母')) return 'd';
  if (is('泥母')) return 'n';
  if (is('來母')) return 'l';

  if (is('知母')) return 'z';
  if (is('徹母')) return 'c';
  if (is('澄母')) return 'z';
  if (is('孃母')) return 'n';

  if (is('精母')) return 'z';
  if (is('清母')) return 'c';
  if (is('從母')) return 'z';
  
  if (is('心母')) {
    if (is('支脂之微韻 合口 上聲 或 支脂之微韻 開口 去聲 或 寒韻 開口 平聲')) return 's';  // 髓賽珊
    return 'sl';
  }
  
  if (is('邪母 平聲')) {
    if (is('山臻攝 三等')) return 'sl';
    return 'z';
  }
  if (is('邪母 仄聲')) return 'z';

  if (is('莊母')) return 'z';
  if (is('初母')) return 'c';
  if (is('崇母')) return is('平聲') ? 'c' : 'z';
  if (is('生母')) return 's';
  if (is('俟母')) return 's';

  if (is('章母')) return 'z';
  if (is('昌母')) return 'c';
  if (is('常母')) return 's';
  if (is('書母')) return 's';
  if (is('船母')) return 's';
  if (is('日母')) return 'nj';

  if (is('見母')) return 'g';
  
  if (is('溪母')) {
    if (is('模韻')) return 'h';
    if (is('開口')) {
      if (is('侯韻')) return is('上聲') ? 'h' : 'k';
      if (is('果假攝 或 鍾先仙陽江韻 入聲 或 佳皆齊宵支陽韻 舒聲 或 庚韻 三等 入聲 或 唐咍韻 去聲')) return 'k';
      if (is('尤韻 或 侵韻 入聲')) return 'j';
      return 'h';
    }
    if (is('合口')) {
      if (is('文韻 舒聲')) return 'kw';
      if (is('果遇止假梗宕攝 或 先仙元韻 入聲 或 皆佳祭齊魂眞韻 舒聲')) return 'k';
      if (is('登韻 舒聲')) return 'w';
      return 'h';
    }
    return 'h';
  }
  
  if (is('羣母')) return is('平聲') ? 'k' : 'g';
  if (is('疑母')) return 'ng';

  if (is('曉母')) {
    if (is('模韻')) return 'h';
    if (is('開口')) {
      if (is('侯韻 去聲')) return 'k';
      if (is('尤韻 或 鍾韻 入聲')) return 'j';
      return 'h';
    }
    if (is('合口')) {
      if (is('庚耕韻 二等 舒聲 或 登韻 舒聲 或 蒸青清韻 入聲')) return 'gw';
      if (is('止攝 或 寒韻 去聲 或 文魂祭齊廢佳皆夬韻 舒聲')) return 'w';
      if (is('陽韻 去聲 或 陽韻 入聲 或 唐韻 入聲')) return 'k'; // 宕攝 三等 去聲 或 宕攝 三等 入聲 或 宕攝 一等 入聲
      return 'h';
    }
    return 'h';
  }
  
  if (is('匣母')) {
    if (is('模韻')) return 'h';
    if (is('開口')) return 'h';
    if (is('合口')) {
      if (is('一二等')) return is('通果宕攝') ? 'h' : 'w';
      if (is('三四等')) return is('通攝') ? 'j' : is('咸攝') ? 'h' : 'w';
    }
    return 'h';
  }
  if (is('影云以母')) {
    if (is('模韻')) return 'w';
    if (is('開口')) {
      if (is('三四等 非 (影母 蟹曾梗臻通攝)')) return 'j';  
      if (is('云母 二等')) return 'w';
      if (is('一二等 以母')) return 'j';
      return '';
    }
    if (is('合口')) {
      if (is('一二等')) return is('通果宕攝') ? '' : 'w';
      if (is('三四等')) {
        if (is('通果攝 或 以母 蟹攝 或 影云母 咸攝 或 青韻')) return is('影母 通果攝') ? '' : 'j';
        return 'w';
      }
    }
    return is('三四等') ? 'j' : '';
  }

  throw new Error('無聲母規則');
}

function 韻母規則() {
  // 通攝
  if (is('東冬鍾韻')) return 'oeng';

  // 江攝
  if (is('江韻')) return is('知莊組 或 明母') ? 'ung' : 'aang';

  // 止攝
  if (is('支脂之微韻 幫組')) return 'i';
  if (is('支脂之微韻 開口') && !is('幫組')) {
    if (is('精莊組 三等')) return is('心生母 支韻 上聲') ? 'ai' : 'i';
    return 'i';
  }
  if (is('支脂之微韻 合口 舌齒音')) return 'ui';
  if (is('支脂之微韻 合口 牙喉音')) return 'ai';

  // 遇攝
  if (is('魚虞韻')) return is('幫莊組') ? 'u' : 'yu';  // 莊組部分字o
  if (is('模韻')) {
    if (選項.新老派 === '老派') {
      return 'u';
    } else {
      return is('疑母') ? '' : 'u';
    }
  }

  // 蟹攝
  if (is('齊韻')) return 'ai';
  if (is('祭韻')) {
      if (is('合口 以母')) return 'ui';
      if (is('合口') && !is('牙喉音')) return 'ui';
      return 'ai';
  }
  if (is('泰韻 幫組')) return 'ui';
  if (is('泰韻 開口') && !is('幫組')) return 'aai';
  if (is('泰韻 合口') && !is('幫組')) return is('疑母') ? 'waai' : 'ai';
  if (is('佳皆夬韻')) return 'aai';
  if (is('灰韻')) return is('疑母') ? 'ai' : 'ui';
  if (is('咍韻')) return is('幫組 或 以母') ? 'ui' : 'aai';
  if (is('廢韻')) return is('幫組') ? 'i' : 'ai';

  // 臻攝
  if (is('眞臻文欣魂痕韻')) return is('魂韻 精幫組') ? 'un' : 'an';
  if (is('元韻 幫組')) return 'aan';
  if (is('元韻 開口')) return 'in';
  if (is('元韻 合口')) return 'yun';

  // 山攝
  if (is('寒韻 幫組')) return 'un';
  if (is('寒韻 開口')) return 'aan';
  if (is('寒韻 合口')) return 'un';
  if (is('刪山韻')) return 'aan';
  if (is('仙先韻 幫組')) return 'in';
  if (is('仙先韻 開口')) return 'in';
  if (is('仙先韻 合口')) return 'yun';

  // 效攝
  if (is('蕭宵韻')) return 'iu';
  if (is('肴豪韻')) return 'aau';

  // 果攝
  if (is('歌韻 一等 幫組')) return 'u';
  if (is('歌韻 開口 一等') && !is('幫組')) return 'o';
  if (is('歌韻 合口 一等')) return 'u';
  if (is('歌韻 三等')) return is('合口') ? 'oe' : 'e';

  // 假攝
  if (is('麻韻 二等')) return 'aa';
  if (is('麻韻 三等')) return 'e';

  // 宕攝
  if (is('陽韻 幫組')) return 'ung';
  if (is('陽韻 開口 莊組')) return 'aang';
  if (is('陽韻 開口')) return 'iang';
  if (is('陽韻 合口')) return 'ung';
  if (is('唐韻 幫組')) return 'aang';
  if (is('唐韻 開口')) return 'aang';
  if (is('唐韻 合口')) return 'ung';

  // 梗攝
  if (is('庚韻 二等')) return is('影見曉幫滂並母') ? 'ang' : (選項.新老派 === '老派') ? 'iang' : 'aang';
  if (is('庚韻 三等 莊組')) return 'iang';
  if (is('庚韻 三等')) return 'ing';
  if (is('耕韻')) return is('影見曉幫滂並母') ? 'ang' : (選項.新老派 === '老派') ? 'iang' : 'ang';
  if (is('清青韻')) return 'ing';

  // 曾攝
  if (is('蒸韻')) return 'ing';
  if (is('登韻')) return 'ang';

  // 流攝
  if (is('尤侯幽韻')) return 'au';

  // 深攝
  if (is('侵韻')) return 'am';

  // 咸攝
  if (is('覃談韻')) return 'aam';
  if (is('鹽添嚴韻')) return 'im';
  if (is('咸銜凡韻')) return 'aam';

  throw new Error('無韻母規則');
}

function 聲調規則() {
  if (is('全清 或 次清')) {
    if (is('平聲')) return '1'; // 陰平
    if (is('上聲')) return '2'; // 陰上
    if (is('去聲')) return '3'; // 陰去
    if (is('入聲')) return '2'; // 下陰入，上陰入屬外來層，不參與推導
  } else {
    if (is('平聲')) return '4'; // 陽平
    if (is('全濁 上聲')) return '6'; // 陽去，全濁上變去
    if (is('上聲')) return '5'; // 陽上
    if (is('去聲')) return '6'; // 陽去
    if (is('入聲')) return is('次濁') ? '5' : '6'; // 上陽入 下陽入
  }
  throw new Error('無聲調規則');
}

let 聲母 = 聲母規則();
let 韻母 = 韻母規則();
let 聲調 = 聲調規則();


if (is('合口') && !['u', 'o', 'yu'].some((x) => 韻母.startsWith(x))) { // 合口字
  if (聲母 === 'g' && !韻母.startsWith('im')) 聲母 = 'gw';
  else if (聲母 === 'k' && !韻母.startsWith('ing') && !韻母.startsWith('im')) 聲母 = 'kw';
  else if (聲母 === 'h' && !韻母.startsWith('i')) 聲母 = 'hw';
  else if (聲母 === 'w' && 韻母 === 'yu') 聲母 = 'j';
  else if (聲母 === 'w' && 韻母 === 'ung') 聲母 = '';
}


// 疑母拼細音時: i-類和oe-類 nj-；yu類 j-；u-類 ngung/k->njung/k，ngun/t->wun/t，ngu不變
if (聲母 === 'ng') {
  const is細音i和oe類 = ['i', 'oe'].some((x) => 韻母.startsWith(x));
  const is細音yu類 = ['yu'].some((x) => 韻母.startsWith(x));
  const is細音u類 = ['u'].some((x) => 韻母.startsWith(x));
  if (is細音i和oe類) 聲母 = 'nj';
  if (is細音yu類) 聲母 = 'j';
  if (is細音u類 && 韻母 === 'ung') 聲母 = 'nj';
  if (is細音u類 && 韻母 === 'un') 聲母 = 'w';
}

// 其他變換
if (聲母 === 'w' && 韻母 === 'yu') 聲母 = 'j'; // 保險起見再寫一遍
if (聲母 === 'w' && 韻母 === 'ung') 聲母 = ''; // 保險起見再寫一遍
if (聲母 === 'ng' && 韻母.startsWith('w')) 聲母 = '';  // 特殊字「外」
if (聲母 === 'hw' && 韻母.startsWith('a')) 聲母 = 'w';
if (聲母 === 'w' && 韻母.startsWith('ui')) 韻母 = 'ai';

// 進一步
if (聲母 === 'nj' && (韻母 === 'ing' || 韻母 === 'iang')) 聲母 = 'ng';
if (聲母 === 'nj' && 韻母.startsWith('i') && is('入聲')) 聲母 = 'n';


// 南寧的 詠泳咏 讀陽上
if (is('云匣母 庚韻 合口 去聲')) 聲調 = '5';


// m 韻尾在聲母為脣音時為 n
if (is('幫組') && 韻母.endsWith('m')) 韻母 = 韻母.slice(0, -1) + 'n';

if (is('入聲')) {
  if (韻母.endsWith('m')) 韻母 = 韻母.slice(0, -1) + 'p';
  else if (韻母.endsWith('n')) 韻母 = 韻母.slice(0, -1) + 't';
  else if (韻母.endsWith('ng')) 韻母 = 韻母.slice(0, -2) + 'k';
}

if (聲母 === 'w' && 韻母.startsWith('ut')) 韻母 = 'at';

return 聲母 + 韻母 + 聲調;
```


### Oracle SQL 代碼

電子化檔案使用 Oracle SQL 代碼來表示，下文取自本站數據庫的源碼，she攝 hu呼 deng等 niu聲紐 yunbu韻部。

```sql
-- 中古切韻音系至南寧平話演化關係
create or replace view v_nbdict_202109_gy_bw as
select tab_id,word trad,
case when niu='幫' then
  case when (she='通' and hu='合' and deng='三' and tone ='入') or (yunbu='東' and deng='三') or yunbu in('鍾','微','廢','虞','文','元','陽','尤','凡','燭','物','月','藥','乏') then 'f' else 'b' end
when niu='滂' then
  case when (she='通' and hu='合' and deng='三' and tone ='入') or (yunbu='東' and deng='三') or yunbu in('鍾','微','廢','虞','文','元','陽','尤','凡','燭','物','月','藥','乏') then 'f' else 'p' end
when niu='並' then
  case when (she='通' and hu='合' and deng='三' and tone ='入') or (yunbu='東' and deng='三') or yunbu in('鍾','微','廢','虞','文','元','陽','尤','凡','燭','物','月','藥','乏') then 'f' else 'b' end
when niu='明' then
  case when yunbu in('虞','文') then 'f' else 'm' end
when niu='端' then 'd'
when niu='透' then 't'
when niu='定' then 'd'
when niu='泥' then 'n'
when niu='來' then 'l'
when niu in('知','精','莊','章') then 'z'
when niu in('徹','清','初','昌') then 'c'
when niu in('澄','從','崇') then 'z'
when niu='邪' then
  case when tone='平' and she in('山','臻') and deng='三' then 'sl' else 'z' end
when niu='娘' then 'n'
when niu='心' then
  case when (she='止' and hu='合' and deng='三' and tone='上') --髓
  or (she='蟹' and hu='開' and deng='一' and tone='去') --賽
  or (she='山' and hu='開' and deng='一' and tone='平') then 's' --珊
  else 'sl' end
when niu in('生','禪','書','船') then 's'
when niu='日' then 'nj'
when niu='見' then 'g'
when niu='溪' then
  case when yunbu='模' then 'h'
  when hu='開' and yunbu<>'模' then
    case when she in('果','假') or (yunbu='侯' and tone<>'上') or yunbu in('燭','屑','薛','佳','皆','齊','宵','支','覺','陽','藥') or (deng='三' and yunbu='陌') or (yunbu in('唐','咍') and tone='去') or (she='果' and hu='開') then 'k'
    when yunbu in('尤','緝') then 'j'
    else 'h' end
  when hu='合' and yunbu<>'模' then
    case when she='臻' and deng='三' and yunbu='文' then 'kw'
    when she in('果','遇','止','假','梗','宕') or yunbu in('皆','佳','祭','齊','屑','薛','魂','月','真') then 'k'
    when she='曾' and deng='一' and yunbu='登' then 'w'
    else 'h' end
  end
when niu='群' then 'g'
when niu='疑' then 'ng'
when niu='曉' then
  case when yunbu='模' then 'h'
  when hu='開' and yunbu<>'模' then
    case when yunbu in('燭','尤') then 'j'
    when yunbu='侯' and tone='去' then 'k'
    else 'h' end
  when hu='合' and yunbu<>'模' then
    case when (she='梗' and deng='二' and yunbu in('庚','耕')) or (she='曾' and deng='一' and yunbu='登') or yunbu in('職','錫','昔') then 'gw'
    when she='止' or (yunbu='寒' and tone='去') or yunbu in('文','魂','祭','齊','廢') then 'w'
    when (she='宕' and deng='三' and (tone='去' or tone='入')) or (she='宕' and deng='一' and tone='入') then 'k'
    else 'h' end
  end
when niu='匣' then
  case when yunbu='模' then 'h'
  when hu='開' and yunbu<>'模' then 'h'
    --case when (she='山' and deng='四' and tone<>'入') or (she='梗' and deng='四' and tone='平') then 'j' else 'h' end
  when hu='合' and yunbu<>'模' and deng in('一','二') then
    case when she in('通','果','宕') then 'h' else 'w' end
  when hu='合' and yunbu<>'模' and deng in('三','四') then
    case when she='通' then 'j'
    when she='咸' then 'h' else 'w' end
    --case when (she='山' and deng='四') or (she='梗' and deng='四' and tone='平') then 'j' else 'w' end
  end
when niu in('影','云','以') then
  case when yunbu='模' then 'w'
  when hu='開' and yunbu<>'模' then
    case when deng in('三','四') and not(niu='影' and she in('蟹','曾','梗','臻','通')) then 'j'
    when deng='二' and niu='云' then 'w'
    when deng in('一','二') and niu='以' then 'j' else '' end
  when hu='合' and yunbu<>'模' and deng in('一','二') then
    case when she in('通','果','宕') then '' else 'w' end
  when hu='合' and yunbu<>'模' and deng in('三','四') then
    case when she in('通','果') or (niu='以' and she='蟹') or (niu in('影','云') and she='咸') or (she='梗' and deng='四') then
      case when niu='影' and she in('通','果') then '' else 'j' end
    else 'w' end
  end
end shengmu,
case when she='通' then
  case when yunbu in('東','冬','鍾') then 'oeng' else 'oek' end
when she='江' then
  case when yunbu='江' then
    case when niu in('知','徹','澄','娘','莊','初','崇','生','明') then 'ung' else 'aang' end
  else
    case when niu in('知','徹','澄','娘','莊','初','崇','生','明') then 'uk' else 'aak' end
  end
when she='止' then
  case when niu in('幫','滂','並','明') then 'i'
  when hu='開' and niu not in('幫','滂','並','明') then
    case when niu in('精','清','從','心','邪','莊','初','崇','生') and deng='三' then
      case when yunbu='支' and tone='上' and niu in('心','生') then 'ai' else 'i' end
    else 'i' end
  when hu='合' and niu not in('幫','滂','並','明') then
    case when niu in('見','溪','群','疑','影','曉','匣','云','以') then 'ai' else 'ui' end
  end
when she='遇' then
  case when yunbu in('魚','虞') then
    case when niu in('莊','初','崇','生','幫','滂','並','明') then 'u' else 'yu' end  --莊組部分字o
  else 'u' end
when she='蟹' then
  case when yunbu='齊' then 'ai'
  when yunbu='祭' then
    case when hu='合' and niu='以' then 'ui'
    when hu='合' and niu not in('見','溪','群','疑','影','曉','匣','云','以') then 'ui'
    else 'ai' end
  when yunbu='泰' then
    case when niu in('幫','滂','並','明') then 'ui' else
      case when hu='開' then 'aai'
      when hu='合' then
        case when niu='疑' then 'waai' else 'ui' end
      end
    end
  when yunbu in('佳','皆','夬') then 'aai'
  when yunbu='灰' then
    case when niu='疑' then 'ai' else 'ui' end
  when yunbu='咍' then
    case when niu in('幫','滂','並','明','以') then 'ui' else 'aai' end
  when yunbu='廢' and niu in('幫','滂','並','明') then 'i' else 'ai' end
when she='臻' then
  case when yunbu in('真','臻','文','欣','魂','痕') then
    case when yunbu='魂' and niu in('幫','滂','並','明','精','清','從','心','邪') then 'un' else 'an' end
  else
    case
      when yunbu='沒' and niu in('幫','滂','並','明') then 'ut' else 'at' end
  end
when she='山' then
  case when yunbu in('寒','刪','山','仙','先','元') then
    case when yunbu='元' and niu in('幫','滂','並','明') then 'aan'
    when yunbu='元' and niu not in('幫','滂','並','明') and hu='開' then 'in'
    when yunbu='元' and niu not in('幫','滂','並','明') and hu='合' then 'yun'
    when yunbu='寒' and niu in('幫','滂','並','明') then 'un'
    when yunbu='寒' and hu='開' and niu not in('幫','滂','並','明') then 'aan'
    when yunbu='寒' and hu='合' and niu not in('幫','滂','並','明') then 'un'
    when yunbu in('刪','山') then 'aan'
    when yunbu in('仙','先') and hu='開' then 'in'
    when yunbu in('仙','先') and hu='合' and niu in('幫','滂','並','明') then 'in'
    when yunbu in('仙','先') and hu='合' and niu not in('幫','滂','並','明') then 'yun' end
  else
    case when yunbu='月' and niu in('幫','滂','並','明') then 'aat'
    when yunbu='月' and niu not in('幫','滂','並','明') and hu='開' then 'it'
    when yunbu='月' and niu not in('幫','滂','並','明') and hu='合' then 'yut'
    when yunbu='曷' and niu in('幫','滂','並','明') then 'ut'
    when yunbu='曷' and hu='開' and niu not in('幫','滂','並','明') then 'aat'
    when yunbu='曷' and hu='合' and niu not in('幫','滂','並','明') then
      case when niu in('影','見') then 'aat' else 'ut' end
    when yunbu in('鎋','黠') then
      case when niu='匣' and hu='開' then 'at' else 'aat' end
    when yunbu in('屑','薛') and hu='開' then 'it'
    when yunbu in('屑','薛') and hu='合' and niu in('幫','滂','並','明') then 'it'
    when yunbu in('屑','薛') and hu='合' and niu not in('幫','滂','並','明') then 'yut' end
  end
when she='效' then
  case when yunbu in('蕭','宵') then 'iu'
  when yunbu in('肴','豪') then 'aau' end
when she='果' then
  case when deng='一' and hu='開' and niu not in('幫','滂','並','明') then 'o'
  when deng='一' and hu='開' and niu in('幫','滂','並','明') then 'u'
  when deng='一' and hu='合' then 'u'
  when deng='三' and hu='合' then 'oe' else 'e' end
when she='假' then
  case when deng='二' then 'aa' else 'e' end
when she='宕' then
  case when yunbu in ('陽','唐') then
    case when hu='開' and deng='三' and niu not in('幫','滂','並','明','莊','初','崇','生') then 'iang' else
      case when hu='開' and (deng<>'三' or niu in('幫','滂','並','明','莊','初','崇','生')) then 'aang'
      when hu='合' and niu in('幫','滂','並','明') and deng='一' then 'aang'
      when hu='合' and niu in('幫','滂','並','明') and deng='三' then 'ung'
      when hu='合' and deng='三' and niu='來' then 'iang' else 'ung' end
    end
  else
    case when hu='開' and deng='三' and niu not in('幫','滂','並','明') then 'iak' else
      case when yunbu='鐸' and tone='去' then 'aau' -- 應歸入肴韻
      when hu='開' and deng='一' and niu='明' then 'oek'
      when hu='開' and deng<>'三' and niu not in('幫','滂','並','明') then 'aak'
      when hu='合' and niu in('幫','滂','並','明') and deng='一' then 'aak'
      when hu='合' and niu in('幫','滂','並','明') and deng='三' then 'uk'
      when hu='合' and deng='三' and niu='來' then 'iak' else 'uk' end
    end
  end
when she='梗' then
  case when yunbu in ('清','青','庚','耕') then
    case when yunbu in ('清','青')  or (yunbu='庚' and deng='三' and niu not in('莊','初','崇','生')) then 'ing' else
      case when niu not in('影','見','曉','幫','滂','並') and deng='二' then 'iang'
      when niu in('莊','初','崇','生') and deng='三' then 'iang'
      else 'ang' end
    end
  else
    case when yunbu in ('昔','錫')  or (yunbu='陌' and deng='三' and niu not in('莊','初','崇','生')) then 'ik' else
      case when (niu in('莊','初','崇','生') and deng='三') or deng='二' then 'iak' else 'ak' end
    end
  end
when she='曾' then
  case when yunbu='登' then 'ang'
  when yunbu='蒸' then 'ing'
  when yunbu='德' then 'ak'
  when yunbu='職' then 'ik' end
when she='流' then 'au'
when she='深' then
  case when yunbu='侵' then 'am' else 'ap' end
when she='咸' then
  case when yunbu in('覃','談','鹽','添','嚴','咸','銜','凡') then
    case when (yunbu in('鹽','添','嚴') and deng<>'二') or (hu='開' and deng='三') or (niu not in('幫','滂','並','明') and hu='合' and deng='三') then 'im' else 'aam' end
  else
    case when yunbu in('葉','怗','業') or (hu='開' and deng='三') or (niu not in('幫','滂','並','明') and hu='合' and deng='三') then 'ip'
    when yunbu in('合','盍') and niu in('影','疑') then 'ap' else 'aap' end
  end
end yunmu,
case when niu in('並','奉','定','澄','從','邪','崇','船','禪','群','匣','明','泥','來','娘','日','疑','以','云') then
  case when tone ='平' then '4'
  when tone ='上' then
    case when niu in('並','奉','定','澄','從','邪','崇','船','禪','群','匣') then '6'
    when niu in('明','泥','來','娘','日','疑','以','云') then '5' end
  when tone='去' then '6'
  when tone='入' then
    case when niu in('明','泥','來','娘','日','疑','以','云') then '5' else '6' end
  end
else
  case when tone ='平' then '1'
  when tone='上' then '2'
  when tone='去' then '3'
  when tone='入' then '2' end
end shengdiao,niu,yunbu,she,hu,deng,tone,expl,note
from tab_gy_jy_dong
WITH READ ONLY
;


create or replace view v_nbdict_infer_bw as
select tab_id,trad,simp,ipa_t ipa_s,ipa_t,u1.jyutping,sour,expl,note from (
  select tab_id,trad,simp,replace(replace(replace(replace(
  replace(replace(replace(replace(replace(replace(replace(
  replace(replace(replace(replace(replace(replace(replace(shengmu||yunmu||shengdiao,
  'wyu','jyu'),'ngi','nji'),'ngyu','njyu'),'ngoe','njoe'),'nguk','njuk'),'ngung','njung'),
  'ngut','wut'),'ngun','wun'),'hwa','wa'),'ngw','w'),'wui','wai'),'wut','wat'),
  'njing','nging'),'njik','nik'),'njip','nip'),'njit','nit'),'njiang','ngiang'),'njiak','ngiak') jyutping,sour,expl,note
  --njing>nging  njik>nik  njip>nip  njit>nit  njiang>ngiang  njiak>ngiak
  from (
    select tab_id,trad,trad simp,
    case when shengmu ='g' and hu='合' and yunmu not like 'u%' and yunmu not like 'o%' and yunmu not like 'yu%' and yunmu not like 'im%' then 'gw'
    when shengmu ='k' and hu='合' and yunmu not like 'u%' and yunmu not like 'o%' and yunmu not like 'yu%' and yunmu not like 'ing%' and yunmu not like 'im%' then 'kw'
    when shengmu ='h' and hu='合' and yunmu not like 'u%' and yunmu not like 'o%' and yunmu not like 'yu%' and yunmu not like 'i%' then 'hw'
    when shengmu ='w' and (yunmu='ung' or yunmu='uk') then ''
    else shengmu end shengmu,
    case when shengmu in('b','p','m','f') and yunmu like '%m' then substr(yunmu,1,length(yunmu)-1)||'n'
    when shengmu in('b','p','m','f') and yunmu like '%p' then substr(yunmu,1,length(yunmu)-1)||'t'
    else yunmu end yunmu,
    --南寧 詠泳咏 讀陽上
    case when niu in('云','匣') and hu='合' and yunbu='庚' and tone='去' then '5' else shengdiao end shengdiao
    ,'' sour,expl,note
    from  v_nbdict_202109_gy_bw
    order by tab_id)
)u1,tab_jyutping_ipa_bw u2
where u1.jyutping=u2.jyutping(+)
WITH READ ONLY
;
```



