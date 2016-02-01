---
layout: post
title:  "Shell CMD Notes (1)"
date:  2016-02-01
categories: Shell
featured_image: /images/shell.jpg
---

Shell 命令笔记 [ 帮助命令 / 压缩与解压缩命令 ]

### 帮助命令

#### `man` 获取指定命令的帮助
- `man ls` 查看 ls 的帮助
- `man -f` 相当于 `whatis`，查看命令拥有哪些级别的帮助
- `man -k` 相当于 `apropos`，查看命令相关的所有帮助

#### `info cmd` 获取详细命令帮助
- 回车 进入子帮助页面
- u 进入上层页面
- n 进入下一个帮助小节
- p 进入上一个帮助小节
- q 退出

### 压缩与解压缩命令

#### 常见压缩文件格式

`.zip` / `.gz` / `.tar.gz`

#### 不同压缩格式命令

`.zip` 格式命令

- 压缩文件

        zip 压缩文件名 源文件
        
        // 压缩目录
        zip -r 压缩文件名 源目录
        
- 解压缩

        unzip 压缩文件
        
`.gz` 格式命令

- 压缩文件 

        // 源文件会消失
        gzip 源文件
        
        // 源文件保留
        gzip -c 源文件 > 压缩文件
        
        // 压缩目录下所有子文件 但不压缩目录
        gzip -r 目录

- 解压缩

        gzip -d 压缩文件
        
        gunzip 压缩文件
        
`tar` 格式命令

- 打包文件

        /* 
         *  -c 压缩
         *  -v 显示过程
         *  -f 指定打包后的文件名
         */

        tar -cvf 打包文件名 源文件
        
- 解打包文件

        // -x 解打包
        tar -xvf 打包文件名
                
`.tar.gz` 压缩格式 
    
    先打包为 `.tar` 格式，再压缩为 `.gz` 格式
    
    // -z 压缩为 .tar.gz 格式
    tar -zcvf 压缩名.tar.gz 源文件
    
    // -x 解压缩 .tar.gz 格式
    tar -zxvf 压缩包名.tar.gz
    
    // -C 指定解压缩目录
    tar -zxvf 压缩包名.tar.gz -C 解压缩目录
    
    // -t 查看压缩文件内容 但不解压
    tar -ztvf 压缩包名.tar.gz


