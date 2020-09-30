# GIT常用命令

- 克隆项目

```
git clone https://github.com/udacity/cn-wechat-weather.git
```

> clone只能拷贝主分支（一般为master分支）

- 查看文件列表

```
Mac: ls
Window: dir
```

> 使用ls -a  (dir /a) 可以查看隐藏文件

- 切换目录
```
cd cn-wechat-weather
```

> git clone完后是一个文件夹，真正的项目在文件夹内，需要切入文件夹内
> 在输入时，使用tab可以快速自动填充命令
> 含有.git文件的项目说明是git托管的

- 查看分支

```
git branch
```

- 查看所有分支（包括远程分支）

```
git branch -a
```

> 如最后出现`:`，可以输入`q`退出
> `remotes`开始表示的是与远程仓库相关的

- 切换分支

```
git checkout [branch-name]
```

> 本地没有但远程有的分支，会复制下来并切换至该分支
> 本地有的会切换至本地分支
> 本地没有远程也没有的会报错

- 查看状态

```
git status
```

- 添加修改内容

```
git add -A
```

- 本地提交修改

```
git commit -m "删除了两个文件"
```

- 修改提交到远程仓库

```
git push origin [branch-name]
```

- 版本回退

```
git reset --hard
```

- 初始化git项目

```
git init
```

- 新建分支

```
git checkout -b [branch-name]
```

- 删除分支

```
git branch -D [branch-name]
```

### 从创建项目到提交项目

1. 申请github账号
2. git init
3. 每次提交代码
   1. git add -A
   2. git commit -m "message"
   3. git push origin masters


