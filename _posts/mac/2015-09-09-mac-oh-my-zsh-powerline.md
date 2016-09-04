---
layout: post
title:  Mac OS Oh-My-Zsh Powerline 安装
categories: mac
key: 20160909
---




# 0x00 安装 iTerm2 #

点击这里：[iTerm https://www.iterm2.com]，然后现在 iTerm2，并且进行安装。

# 0x01 切换并配置 ZSH #

## 查看 SHELL ##

```shell
$ cat /etc/shell
/bin/bash
/bin/csh
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh
```

Mac OS 的 shell 有很多种，其中包括sh，bash，csh，zsh等等。其中zsh被称为```终极 shell```。而，zsh的配置过于复杂，起初无人问津。自从 Oh-My-Zsh 的出现，真正解放了 zsh 的配置，所以让强大的 zsh 真正流行起来。

## 切换 SHELL ##

```shell
$ chsh -s /bin/zsh
```

## 安装 Oh-My-Zsh ##

```shell
$ wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh
```

## 配置 Oh-My-Zsh ##

编辑 ```.zshrc```。比如里面有个 plugin 参数，看看范例，把自己需要的 plugin 加入进去。再看看 .oh-my-zsh 目录下面的 plugins，有哪些扩展你需要的，加进去尝试尝试。比如：我现在用的最爽的 git, autojump 等等。

# 0x02 安装并配置 Powerline #

Powerline 是个好东西，因为加上之后命令行的目录显示更有层次感。


## 安装 Powerline ##

```shell
# 下载
$ git clone https://github.com/milkbikis/powerline-shell
# 安装
$ cd powerline--shell
$ python install.py
```

## 配置 Powerline ##

修改	```~/.zshrc``` 文件，把 Powerline 引入进来。

```
function powerline_precmd() {
  export PS1="$(/path/to/powerline-shell.py $? --shell zsh 2> /dev/null)"
}

function install_powerline_precmd() {
  for s in "${precmd_functions[@]}"; do
    if [ "$s" = "powerline_precmd" ]; then
      return
    fi
  done
  precmd_functions+=(powerline_precmd)
}

install_powerline_precmd
```

使配置文件生效。

```
$ source .zshrc
```

## 解决乱码问题 ##

这个时候是不是看到『漂亮』的显示条了？为什么漂亮两个字用引号引起来了，因为有乱码，万恶的乱码。下面解决乱码问题。

下载字体

```
$ git clone https://github.com/Lokaltog/powerline-fonts
```

安装字体

```shell
$ cd powerline-font
$ ./install.sh
```

将 iTerm 的默认字体是设置为 Powerline-fonts 的一种。


# 0x03 参考链接 #

[MacTalk http://macshuo.com/]

[iTerm https://www.iterm2.com]

[Oh-My-Zsh https://github.com/robbyrussell/oh-my-zsh]


{% if site.model == 'pub' %}
[terminal-wel]:   {{ site.pub.image }}mac-iterm-zsh.png "展示图片"
{% else %}
[terminal-wel]:   {{ site.dev.image }}mac-iterm-zsh.png "展示图片"
{% endif %}


[iTerm https://www.iterm2.com]:https://www.iterm2.com/downloads.html
[Oh-My-Zsh https://github.com/robbyrussell/oh-my-zsh]:https://github.com/robbyrussell/oh-my-zsh
[MacTalk http://macshuo.com/]:http://macshuo.com/?p=676





