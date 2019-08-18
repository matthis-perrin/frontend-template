## Config

1. Install [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [TypeScript TSLint Plugin](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)  extensions in VSCode.

2. VSCode settings
```json
{
    "editor.formatOnSave": false,
    "[typescript]": {
        "editor.formatOnSave": true
    },
    "[typescriptreact]": {
        "editor.formatOnSave": true
    },
    "prettier.tslintIntegration": true,
    "prettier.eslintIntegration": true,
    "prettier.disableLanguages": [
        "html",
        "hbs"
    ],
}
```

3. Search for `TODO_UPDATE_THIS` and make the approriate changes