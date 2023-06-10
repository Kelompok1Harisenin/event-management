# EVENT MANAGEMENT 📆

## Features

* _Express_ & MVC + Service pattern


## Contents
* [Getting started](#1)
* [Project structure](#2)


## <a name="1"></a>Getting started

### Installation
_Node.js_ 16 or higher is required.

```Shell
npm install
```

### Start Development Server
```Shell
npm run dev
```


## <a name="2"></a>Project structure

- App
    - **src/** source code folder
        - **src/server.js** Express server entry point
        - **src/models/** models folder
        - **src/routes/** routes folder
        - **src/controllers/** controllers folder
        - **src/services/** controllers folder
        - **src/database/** database folder
        - **src/middlewares/** middlewares folder
        - **src/config.js** app configuration

- Scripts & configuration files
    - **package.json** _npm_ options & scripts
    - **env-example.txt** example of _.env_ (require to be updated regularly when there are changes on _.env_)
    - **editorconfig** contain editorconfig for _node.js_ (require to install EditorConfig for VS Code extension)
