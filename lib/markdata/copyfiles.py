#!/usr/bin/python
# coding: utf-8 

path = 'E:\\LocalRepository\\gitee\\leimaau-webdict2\\js\\jieba-js\\'

lines = []
f = open(path + 'simp_trad.txt','r',encoding='utf-8')
for line in f.readlines()[6:]:
    lines.append(line)
f.close()

s = 'export const tradData = [' + ''.join(lines) + '];'

f = open('gzDict.ts','w',encoding='utf-8')
f.write(s)
f.close()

del lines[:]


f = open(path + 'v_nb_zingjam_all_json.txt','r',encoding='utf-8')
for line in f.readlines():
    lines.append(line)
f.close()

s = 'export const nnDict = [' + ''.join(lines) + '];'

f = open('nnDict.ts','w',encoding='utf-8')
f.write(s)
f.close()

del lines[:]


f = open(path + 'v_nb_zingjam_bw_all_json.txt','r',encoding='utf-8')
for line in f.readlines():
    lines.append(line)
f.close()

s = 'export const nntDict = [' + ''.join(lines) + '];'

f = open('nntDict.ts','w',encoding='utf-8')
f.write(s)
f.close()

del lines[:]
