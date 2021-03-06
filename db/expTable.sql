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
select '1994'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||replace(sour,'1994??????????????????????????????????????????','')||'	'||expl||'	'||note from v_nbdict_1994
union all
select '1997'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||replace(sour,'1997?????????????????????????????????','')||'	'||expl||'	'||note from v_nbdict_1997
union all
select '1998'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||replace(sour,'1998?????????????????????????????????????????????????????','')||'	'||expl||'	'||note from v_nbdict_1998
union all
select '2003'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||replace(sour,'2003???????????????????????????????????????(??????)???','')||'	'||expl||'	'||note from v_nbdict_2003
union all
select '2007'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||replace(sour,'2007??????????????????????????????????????????','')||'	'||expl||'	'||note from v_nbdict_2007
union all
select '2008'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||replace(sour,'2008???????????????????????????????????????????????????','')||'	'||expl||'	'||note from v_nbdict_2008
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
select '1998'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||replace(sour,'1998?????????????????????????????????????????????????????','')||'	'||expl||'	'||note from v_nbdict_1998_bw
union all
select '2000'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||sour||'	'||expl||'	'||note from tab_nbdict_2000_bw
union all
select '201703'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||sour||'	'||expl||'	'||note from v_nbdict_201703_bw
union all
select '201705'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||replace(sour,'2017??????????????????????????????????????????????????????','')||'	'||expl||'	'||note from v_nbdict_201705_bw
union all
select '2018'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||sour||'	'||expl||'	'||note from v_nb_zingjam_bw_all
union all
select '2021'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||sour||'	'||expl||'	'||note from tab_nbdict_2021_bw
);

spool E:\LocalRepository\github\leimaau-webdict3\db\tab_2021_phrase.csv
select to_nchar('year	tab_id	trad	simp	ipa_s	ipa_t	jyutping	sour	expl	note') w from dual
union all
select * from (
select '2021'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||sour||'	'||expl||'	'||note from tab_nbdict_2021_phrase order by tab_id
);

spool E:\LocalRepository\github\leimaau-webdict3\db\tab_2021_bw_phrase.csv
select to_nchar('year	tab_id	trad	simp	ipa_s	ipa_t	jyutping	sour	expl	note') w from dual
union all
select * from (
select '2021'||'	'||tab_id||'	'||trad||'	'||simp||'	'||ipa_s||'	'||ipa_t||'	'||jyutping||'	'||sour||'	'||expl||'	'||note from tab_nbdict_2021_bw_phrase order by tab_id
);

spool E:\LocalRepository\github\leimaau-webdict3\db\tab_1937jz_proverb.csv
select to_nchar('year	tab_id	trad	simp	sour	expl	note') w from dual
union all
select * from (
select '1937jz'||'	'||tab_id||'	'||trad||'	'||simp||'	'||sour||'	'||expl||'	'||note from tab_1937jz_proverb order by tab_id
);

spool E:\LocalRepository\github\leimaau-webdict3\db\tab_1937kk_proverb.csv
select to_nchar('year	tab_id	trad	simp	sour	expl	note') w from dual
union all
select * from (
select '1937kk'||'	'||tab_id||'	'||trad||'	'||simp||'	'||sour||'	'||expl||'	'||note from tab_1937kk_proverb order by tab_id
);

spool E:\LocalRepository\github\leimaau-webdict3\db\tab_2021_grammar.csv
select to_nchar('year	tab_id	trad	jyutping	sour	expl	note') w from dual
union all
select * from (
select '2021'||'	'||tab_id||'	'||trad||'	'||jyutping||'	'||sour||'	'||expl||'	'||note from tab_nbdict_2021_grammar order by tab_id
);

spool off