# GraphGate

## 基于 graphql 的 API 框架


- 技术栈
  - Socket.io 连接管理系统
  - 管理系统 Cycle.js(避免使用 Webpack)
  - 实例 GraphQL

### 目标
- 类似小幺鸡的 API 管理功能
把后端接口重整为 GraphQL 接口
- 管理系统
  - 使用 Websocket
  - 监控实例运行状态
  - 自带相关编辑器
- 项目管理系统
  - 看板管理
  - 甘特图
  - 维基
  - Bug 追踪
  - 问题 分类
  - ?使用数据库
- 生成 GraphQL 接口定义，然后通过网关实例运行
- 有管理实例的能力
- 扩展的文档功能 markdown
- 生成的 GraphQL 定义有独立运行的能力
- 方便的数据交换(GraphQL定义)

### 数据存储

- GraphQL实例有关的定义使用文件存储，方便独立部署
  - 数据以 JSON 格式保存，默认为文件方式： 集合作为文件夹，文档作为`yml`文件，文件名作为标识
    - 全部以 yml 格式存储
  - 需要定义增删改查的帮助方法
  - 可以独立出来做为开发框架，直接编写定义文件
  - 可以使用版本控制系统
  - 独立部署只需要很少人维护，用户管理系统尽量简化

- 数据定义
  - Node
    - GraphQL 类型
  - Arrow
    - 根据API接口的参数和返回值定义，生成对应的 GraphQL resolver
    - 自定义服务器端(Node.js)函数，类似常规意义上的`web框架`
  - 管理员集合 admin
    - 身份认证： 用户名 密码
    - 访问控制

- 目录结构
  - package.json
  - server/
  - client/
  - admin/
    - userName.yml
  - instance/ (独立部署时拷贝可用)
    - instance_name/

- 延迟加载，例如 function目录:
  - 实现为对象(函数即对象模式)
  - 实例中初始化存储路径
  - 读取目录中的 yml 文件列表，获取文件名作为标识符
  - 维护标识符->加载路径的列表
  - load 方法实际加载
    - reload 机制
  - update 方法更新文件

### 编辑器
各面板之间拖拽对象
##### 全局视图
生成的GraphQL树，可缩放/编辑
##### GraphQL 查询子树 面板
##### 类型面板
##### 函数面板
##### 连接面板

### 实例管理
- 单一 GraphQL 实例
  - GraphQL 实例端口
    - 管理系统端口 +1
  - 多个 GraphQL 实例部署多个服务器
  - 后端地址 host port path
  - 函数

### 用户管理
- 先有 root 用户
- root 用户创建其它用户

## 故事
- 管理员
  - 登录
  - 创建用户
  - 收授权限
- 用户
  - 用户输入用户名/密码完成登录
  - 创建实例
  - 自动选择刚创建的实例
  - 添加类型
  - 将两个节点(出入)使用箭头连接起来
  - 编辑箭头(连接或者函数)
  - 将箭头连接起来(级联查询)
    - 级联的箭头以第一级为标识
  - 将箭头放入 query 或者 mutation
  - 指定端口(有默认端口，多实例依次+1)运行实例
