# 南寧話輸入方案

本文選自本站作者狸貓的[《南寧白話小冊子》](https://leimaau.github.io/book/appendix1/appendix4.2.html)，更多詳細內容可前往參閱。

## RIME輸入法引擎

推薦**RIME輸入法引擎**，pc上的名稱叫「小狼毫輸入法」，安卓上的名稱叫「同文輸入法」，IOS系統上的名稱叫「iRime輸入法」，官方地址：[RIME輸入法](https://rime.im/)（[視頻演示粵拼輸入](https://v.youku.com/v_show/id_XNjM0MzY5MTYw.html?spm=a2h0k.11417342.soresults.dtitle)）。下面演示用南寧白話輸入方案來打孟浩然《春曉》。

![演示gif](https://s2.ax1x.com/2019/05/14/Eo2Ll9.gif)

![演示gif](https://s2.ax1x.com/2019/05/14/Eo2OyR.gif)

南寧話輸入方案：[**下載地址**](https://github.com/leimaau/naamning_jyutping)

**註：** 舊版爲「南寧白話輸入方案」，新的改版稱爲「南寧話輸入方案」，新的版本包括了南寧平話輸入方案，統一至一起稱「南寧話」。

## 打字技巧

### 聲調輸入

q 陰平 v 陰上 x 陰去 qq 陽平 vv 陽上 xx 陽去

### 拼音反查

按下`` ` ``鍵，以普通話拼音反查南寧粵拼

### 五筆畫反查

按下`` x ``鍵，以五筆畫反查南寧粵拼，h,s,p,n,z 分別代表橫、豎、撇、捺、折

### 倉頡反查

按下`` v ``鍵，以倉頡反查南寧粵拼

### 五筆86反查

按下`` r ``鍵，以五筆86版反查南寧粵拼

### 普拼反查中古音

按下`` xx ``鍵，以普拼反查中古音

### 粵拼反查中古音

按下`` xj ``鍵，以南寧粵拼反查中古音

## 本碼錶使用技巧

### 本文演示的小狼毫配色

```yaml
# weasel.custom.yaml

patch:
  "style/color_scheme": leimaau
  "style/horizontal": false
  "preset_color_schemes/leimaau":
    name: 貍貓配色／LeiMaau
    author: LeiMaau <leimaau@qq.com>, original artwork by LeiMaau
    text_color: 0xe8f3f6
    back_color: 0xbc941a  # 鈷藍
    border_color: 0x222548  # 大山棕
    hilited_text_color: 0xf2f7ee  # 月白
    hilited_back_color: 0x323348  # 海報灰
    hilited_candidate_text_color: 0x000000
    hilited_candidate_back_color: 0xd5ecdf  # 艾背綠
```

### 開啟多字形和emoji表情

本方案有兩個版本，非IPA版和IPA版，IPA版中提供多種字形轉換和emoji表情，要保證opencc有對應的json

```yaml
switches:
  - options: [simplification, noop, zh_hk, zh_tw, zh_jp]
    reset: 0
    states:
      - 字形 → 大陸
      - 字形 → 傳統〔不轉換〕
      - 字形 → 香港
      - 字形 → 臺灣
      - 字形 → 日本
  - name: emoji_cn
    reset: 0
    states: [ 〇, 😊 ]
  - name: ascii_mode
    reset: 0
    states: [ 中文, 西文 ]
  - name: full_shape
    states: [ 半角, 全角 ]
  - name: ascii_punct
    states: [ 。，, ．， ]
```

多字形對應的json

```yaml
zh_hk:
  option_name: zh_hk
  opencc_config: t2hk.json

zh_tw:
  option_name: zh_tw
  opencc_config: t2tw.json

zh_jp:
  option_name: zh_jp
  opencc_config: t2jp.json
```

emoji表情對應的json

```yaml
emoji_cn:
  opencc_config: emoji.json
  option_name: emoji_cn
  tips: all
```


效果

![多字形和emoji](https://s2.ax1x.com/2019/05/14/Eo2XO1.gif)

### 提示音顯示爲IPA


效果

![顯示IPA](https://s2.ax1x.com/2019/05/14/EoYtns.gif)

### 豎排打字時顯示釋義

```yaml
reverse_lookup:
  tags:  [luna_pinyin, stroke, cangjie5, wubi86]  # 需要打字時顯示釋義則註釋這行，建議豎排顯示時使用【很有用的功能，建議PC上使用！】
```

改爲

```yaml
reverse_lookup:
#  tags:  [luna_pinyin, stroke, cangjie5, wubi86]  # 需要打字時顯示釋義則註釋這行，建議豎排顯示時使用【很有用的功能，建議PC上使用！】
```

效果

![顯示釋義](https://s2.ax1x.com/2019/05/14/Eoa3an.gif)

### 橫排打字時只標註單字音

```yaml
translator:
  dictionary: naamning_baakwaa
  prism: naamning_baakwaa
  spelling_hints: 5  # 標註拼音的字數，建議橫排顯示時設置爲1
```

改爲

```yaml
translator:
  dictionary: naamning_baakwaa
  prism: naamning_baakwaa
  spelling_hints: 1  # 標註拼音的字數，建議橫排顯示時設置爲1
```

不需要顯示釋義時

```yaml
reverse_lookup:
#  tags:  [luna_pinyin, stroke, cangjie5, wubi86]  # 需要打字時顯示釋義則註釋這行，建議豎排顯示時使用【很有用的功能，建議PC上使用！】
```

改回

```yaml
reverse_lookup:
  tags:  [luna_pinyin, stroke, cangjie5, wubi86]  # 需要打字時顯示釋義則註釋這行，建議豎排顯示時使用【很有用的功能，建議PC上使用！】
```

weasel.custom.yaml文件

```yaml
# weasel.custom.yaml

patch:
  "style/color_scheme": lost_temple
  "style/horizontal": false
```

改爲

```yaml
# weasel.custom.yaml

patch:
  "style/color_scheme": lost_temple
  "style/horizontal": true
```

效果

![橫排打字](https://s2.ax1x.com/2019/05/14/EoNfSO.gif)
