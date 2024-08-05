#!/usr/bin/python
# coding: utf-8

import os

input_path = 'E:\\LocalRepository\\gitee\\leimaau-webdict2\\js\\jieba-js\\'
output_path = 'E:\\LocalRepository\\github\\leimaau-webdict3\\lib\\markdata\\'

def read_file(file_path, skip_lines=0):
    lines = []
    with open(file_path, 'r', encoding='utf-8') as f:
        for line in f.readlines()[skip_lines:]:
            lines.append(line)
    return lines

def write_file(file_path, content):
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

# 确保输出目录存在
os.makedirs(output_path, exist_ok=True)

# 处理 simp_trad.txt 文件
lines = read_file(os.path.join(input_path, 'simp_trad.txt'), skip_lines=6)
s = 'export const tradData = [' + ''.join(lines) + '];'
write_file(os.path.join(output_path, 'gzDict.ts'), s)

# 处理 v_nb_zingjam_all_json.txt 文件
lines = read_file(os.path.join(input_path, 'v_nb_zingjam_all_json.txt'))
s = 'export const nnDict = [' + ''.join(lines) + '];'
write_file(os.path.join(output_path, 'nnDict.ts'), s)

# 处理 v_nb_zingjam_bw_all_json.txt 文件
lines = read_file(os.path.join(input_path, 'v_nb_zingjam_bw_all_json.txt'))
s = 'export const nntDict = [' + ''.join(lines) + '];'
write_file(os.path.join(output_path, 'nntDict.ts'), s)