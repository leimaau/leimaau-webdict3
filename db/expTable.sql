set echo off
set trimspool on
set feedback off
set wrap off
set linesize 20000
set pagesize 20000
set newpage none
set heading off
set term off


spool E:\LocalRepository\github\leimaau-webdict3\db\tab_jyutping_ipa.csv
select distinct jyutping from v_nb_zingjam_all where jyutping not in(select jyutping from tab_jyutping_ipa);

spool E:\LocalRepository\github\leimaau-webdict3\db\tab_jyutping_ipa_bw.csv
select distinct jyutping from v_nb_zingjam_bw_all where jyutping not in(select jyutping from tab_jyutping_ipa_bw);


spool E:\LocalRepository\github\leimaau-webdict3\db\tab_1008_d.csv
select to_nchar('tab_id	word	niu	yunbu	she	hu	deng	tone	chong	fanqie	flag	expl	ipa	jp	bwipa	bwjp') w from dual
union all
select * from (
select tab_id||'	'||word||'	'||niu||'	'||yunbu||'	'||she||'	'||hu||'	'||deng||'	'||tone||'	'||chong||'	'||fanqie||'	'||flag||'	'||expl||'	'||ipa||'	'||jp||'	'||bwipa||'	'||bwjp from v_gy_dong order by tab_id
);

spool E:\LocalRepository\github\leimaau-webdict3\db\tab_1039.csv
select to_nchar('tab_id	word	niu	yunbu	she	hu	deng	tone	fanqie	expl	ipa	jp	bwipa	bwjp') w from dual
union all
select * from (
select tab_id||'	'||word||'	'||niu||'	'||yunbu||'	'||she||'	'||hu||'	'||deng||'	'||tone||'	'||fanqie||'	'||expl||'	'||ipa||'	'||jp||'	'||bwipa||'	'||bwjp from v_jy_dong order by tab_id
);

spool E:\LocalRepository\github\leimaau-webdict3\db\tab_1941.csv
select to_nchar('tab_id	word	jyutping	ipa	page	expl	firstflag') w from dual
union all
select * from (
select tab_id||'	'||word||'	'||jyutping||'	'||ipa||'	'||page||'	'||expl||'	'||firstflag from tab_1941 order by tab_id
);


spool E:\LocalRepository\github\leimaau-webdict3\db\tab_1838.csv
select to_nchar('tab_id	word	expl	final_part	first_old	final_old	tone	jyutping	ipa	volume	page	first_type	fanqie') w from dual
union all
select * from (
select tab_id||'	'||word||'	'||expl||'	'||final_part||'	'||first_old||'	'||final_old||'	'||tone||'	'||jyutping||'	'||ipa||'	'||volume||'	'||page||'	'||first_type||'	'||fanqie from v_1782fy order by tab_id
);

spool E:\LocalRepository\github\leimaau-webdict3\db\tab_1856.csv
select to_nchar('tab_id	word	word_note	page	old_jp	old_jp_type	old_jp_note	expl	ipa	jyutping') w from dual
union all
select * from (
select tab_id||'	'||word||'	'||word_note||'	'||page||'	'||old_jp||'	'||old_jp_type||'	'||old_jp_note||'	'||expl||'	'||ipa||'	'||jyutping from v_1856yh order by tab_id
);


spool E:\LocalRepository\github\leimaau-webdict3\db\tabs_n.csv
select to_nchar('year	tab_id	trad	simp	ipa_s	ipa_t	jyutping	sour	expl	note') w from dual
union all
select * from (
select '1994'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||replace(sour,'1994年謝建猷《南寧白話同音字彙》','')||'	'||expl||'	'||note from v_nbdict_1994
union all
select '1997'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||replace(sour,'1997年楊煥典《南寧話音檔》','')||'	'||expl||'	'||note from v_nbdict_1997
union all
select '1998'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||replace(sour,'1998年楊煥典主編《廣西通誌·漢語方言誌》','')||'	'||expl||'	'||note from v_nbdict_1998
union all
select '2003'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||replace(sour,'2003年侯精一《現代漢語方言音庫(字庫)》','')||'	'||expl||'	'||note from v_nbdict_2003
union all
select '2007'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||replace(sour,'2007年謝建猷《廣西漢語方言研究》','')||'	'||expl||'	'||note from v_nbdict_2007
union all
select '2008'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||replace(sour,'2008年林亦、覃鳳餘《廣西南寧白話研究》','')||'	'||expl||'	'||note from v_nbdict_2008
union all
select '201806'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||sour||'	'||expl||'	'||note from tab_nbdict_201806
union all
select '2018'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||sour||'	'||expl||'	'||note from v_nb_zingjam_all
union all
select '2021'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||sour||'	'||expl||'	'||note from tab_nbdict_2021
);

spool E:\LocalRepository\github\leimaau-webdict3\db\tabs_t.csv
select to_nchar('year	tab_id	trad	simp	ipa_s	ipa_t	jyutping	sour	expl	note') w from dual
union all
select * from (
select '1998'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||replace(sour,'1998年楊煥典主編《廣西通誌·漢語方言誌》','')||'	'||expl||'	'||note from v_nbdict_1998_bw
union all
select '2000'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||sour||'	'||expl||'	'||note from tab_nbdict_2000_bw
union all
select '201703'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||sour||'	'||expl||'	'||note from v_nbdict_201703_bw
union all
select '201705'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||replace(sour,'2017年詹伯慧、張振興《漢語方言學大詞典》','')||'	'||expl||'	'||note from v_nbdict_201705_bw
union all
select '2018'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||sour||'	'||expl||'	'||note from v_nb_zingjam_bw_all
union all
select '2021'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||sour||'	'||expl||'	'||note from tab_nbdict_2021_bw
);


spool off