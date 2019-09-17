#### 项目介绍
网站是以各种鞋类网络零售移动端网站，移动端页面使用 Mui 和zepto.js 开发，数据的渲染模板使用artTemplate,基于（淘宝，京东）风格，后台管理系统（响应式页面）使用的是 bootstarp 和 jquery，数据的渲染模板使用artTemplate，移动端和后台管理系统都是采用前后端分离的开发模式。后端语言是NodeJs，数据库是MYSQL。

#### 功能介绍
| 平台 | 模块 | 功能 |
|:------:|:-----:|:-----:|
|移动端web端|首页|静态展示页面模块|
|移动端web端|分类|一级分类、二级分类|
|移动端web端|商品|搜索中心、商品列表、商品详情|
|移动端web端|购物车|购物车管理|
|移动端web端|用户|登录、注册、账户管理|
|移动端web端|收货地址|展示、添加、编辑、删除|

| 平台 | 模块 | 功能 |
|pc端后台管理|登录|管理员登录|
|pc端后台管理|用户管理|用户权限管理|
|pc端后台管理|分类管理|一级分类、二级分类管理|
|pc端后台管理|商品管理|商品录入、删除、修改、展示|

#### 项目架构
| 系统分层 | 使用技术 |
|------:|:----|
|数据层：|MYSQL|
|服务层：|NodeJs(express)|
|前端展示：|mobile web application,pc management system| 
 
### 移动端

#### 首页模块
1. 轮播图
2. 导航栏
3. 商品区

#### 分类浏览
1. 分类页面
2. 菜单区域滚动
3. 一级菜单渲染
4. 二级分类联动渲染

#### 搜索中心
1. 搜索中心页面
2. 搜索查询功能
3. 搜索记录管理

#### 商品列表
1. 商品列表页面
2. 搜索查询功能
3. 商品列表渲染
4. 列表排序功能
5. 上拉刷新功能
6. 下拉加载功能

#### 商品详情
1. 商品详情页面
2. 商品数据展示
3. 商品尺码选择
4. 商品数量选中
5. 加入购物车

#### 购物车
1. 购物车商品展示
2. 购物车商品删除
3. 购物车商品编辑
4. 购物车下拉刷新
5. 购物车总额计算

#### 用户模块
1. 用户登录  
    1.1 用户登录页面  
    1.2 异步登录  
    1.3 登录回跳    
         
2. 个人中心
    2.1 个人中心页面  
    2.2 个人信息展示  
    2.3 退出功能 
        
3. 用户注册
    3.1 用户注册页面  
    3.2 获取短信验证  
    3.3 用户注册功能

 
### 后台管理

#### 管理员登录
1. 管理员登录页面
2. 异步登录交互

#### 首页模块
1. 首页快速搭建
2. 菜单功能
3. 退出功能
4. 数据可视化

#### 用户管理
1.用户分页展示
2.用户禁用启用

#### 分类管理

1. 一级分类管理

        1.1 商品分类分页展示 
        1.2 商品分类添加
        1.3 商品分类删除 (接口不能用)

2. 二级分类管理  

        2.1 品牌分类分页展示 
        2.2 品牌分类添加  (接口不能用)
        2.3 品牌分类删除 (接口不能用)

#### 商品管理
1. 商品分页展示
2. 商品添加(接口不能用)
3. 商品修改(接口不能用)
4. 商品删除(接口不能用)
 
 
 

