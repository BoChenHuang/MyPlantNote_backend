# MyPlantNote_backend
backend of MyPlantNote

# Description
MyPlantNote 是一管理植物的網頁應用程式，後端使用express.js框架開發。
提供使用者註冊/登入、植物管理等 api。

# 目錄結構
```
.
├── README.md
├── apiary.apib // blueprint api文件
├── dist
├── index.js // 城市進入點
├── node_modules
├── package-lock.json
├── package.json
├── src
│   ├── config
│   │   ├── config.js
│   │   └── express.js // express 設定
│   ├── controller // api 服務實作
│   │   ├── plant.js
│   │   ├── type.js
│   │   └── user.js
│   ├── database
│   │   └── database.js
│   ├── middleware // 中介層
│   │   └── index.js
│   ├── models // 資料庫 schema
│   │   ├── plant.js
│   │   ├── type.js
│   │   └── user.js
│   ├── routes // api路由設定
│   │   └── api
│   │       ├── api.route.js
│   │       ├── plant
│   │       ├── type
│   │       └── user
│   └── service // 其他 funcion
│       ├── plant.service.js
│       ├── user.service.js
│       └── utils.js
├── swagger.js
├── swagger_output.json // swagger api文件
└── webpack.config.js
```
