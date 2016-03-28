---
layout: post
title: "Fix hexo deploy"
date: 2016-03-28
categories: Hexo
featured_image: /images/cover.jpg
---

### 解决 Hexo 发布问题

Hexo Deploy 命令一直是我的心头痛 每次都会出现以下问题：

    $ sudo hexo d
    INFO  Deploying: git
    INFO  Clearing .deploy folder...
    INFO  Copying files from public folder...
    On branch master
    nothing to commit, working directory clean
    Permission denied (publickey).
    fatal: Could not read from remote repository.

    Please make sure you have the correct access rights
    and the repository exists.
    FATAL Something's wrong. Maybe you can find the solution here: http://hexo.io/docs/troubleshooting.html
    Error: Permission denied (publickey).
    fatal: Could not read from remote repository.

总的来说就是权限错误 被拒绝了 (＞﹏＜)

然而 验证 ssh-key 的时候又成功了 如下：

    $ ssh -T git@github.com
    Hi username! You've successfully authenticated, but GitHub does not provide shell access.

我之前的配置是这样的：

    deploy: 
      type: git 
      repo: git@github.com:username/yourreponame.git
      branch: gh-pages 

我一直以为是 ssh key 的设置问题 每次更新一次 key 才能保证能够 deploy 成功 但是时间一久又会失效

之后我尝试在项目中设置 deploy key

设置多个 key 的方法其实很简单

    // key_name 是你希望设置的 ssh-key 的名字
    $ ssh-keygen -t rsa -C "youremail@email.com" -f ~/.ssh/{key_name}

然后按照 [[ 官方步骤 ]](https://help.github.com/articles/generating-an-ssh-key/) 将 `id_rsa` 的地方 替换成你设置的 `key_name` 这样就生成了新的 ssh-key

如果是需要区分不同品牌的 git 管理 比如 gitlab / gitcafe 等等 

那么就需要参考 [[解决git本地多ssh key的问题 ]](http://www.tuicool.com/articles/rmmeayb)

不过这样的办法依旧是短时间内才有效 长时间就没有权限了 无奈之下 我只好把配置改成 https

    deploy: 
      type: git 
      repo: https://github.com/username/yourreponame.git
      branch: gh-pages 

但新的问题是我之前设置了 [[ 双向验证 ]](https://github.com/settings/security) 每次 github 登录或者使用https的时候都要求在手机端接收验证码

这个时候就遇到了新坑 因为在 shell 模式下输入用户名和密码 是根本没有输入验证码这个回合的

所以会直接报错 验证失败... 然后我试着取消了双向验证 

使用 https 每次 deploy 之后 输入用户名和密码 等待一会就会出现以下信息：

    INFO  Deploy done: git

最后看到这个消息就代表发布成功啦！


PS: 

但貌似设置 ssh 的坑并没有解决啊... 我尝试搜索过 N 多解决方法 不是很古老就是没有用

貌似官方也没有给出好的建议 难道这个问题只有我才有吗[白眼]

好在使用 https 完美避开坑 不足的就是需要解除验证码这一环节 ╮(╯▽╰)╭
