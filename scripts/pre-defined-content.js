import rootPkg from "../package.json" with { type: "json" };

const COMPONENT_VERSION = rootPkg.dependencies["igniteui-webcomponents"];
const TYPESCRIPT_VERSION = rootPkg.devDependencies["typescript"];

const INDEX_HTML_CONTENT = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ sampleName }}</title>

    <link rel="dns-prefetch" href="https://fonts.googleapis.com/" crossorigin />

    <link rel="shortcut icon" href="https://dl.infragistics.com/x/img/browsers/wc.png" >
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Kanit&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Titillium Web" />
    <link rel="stylesheet" href="https://dl.infragistics.com/x/css/samples/shared.v8.css" type="text/css" />
</head>
<body>
    <div id="root">
        <div class="container sample center">
            {{ sampleContent }}
        </div>
    </div>
    <script type="module" src="src/index.ts"></script>
</body>
</html>
`;

const TYPESCRIPT_INDEX_CONTENT = `
import { defineComponents } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
`;

const CSS_INDEX_CONTENT = `
/* shared styles are loaded from: */
/* https://dl.infragistics.com/x/css/samples/shared.v8.css */
`;

const TSCONFIG_CONTENT = `
{
  "compilerOptions": {
    "target": "ES2023",
    "module": "esnext",
    "lib": ["DOM", "ES2023"],
    "types": ["vite/client"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    "strict": true,
  },
  "include": ["src"]
}
`;

const PRETTIER_CONFIG_CONTENT = `
{
  "printWidth": 250,
  "tabWidth": 4,
  "useTabs": false,
  "semi": true,
  "singleQuote": false,
  "trailingComma": "none",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "fluid": false
}
`;

const PACKAGE_JSON_CONTENT = `
{
    "name": "{{ sampleName }}",
    "version": "1.0.0",
    "description": "{{ sampleDescription }}",
    "main": "index.js",
    "author": "Infragistics",
    "scripts": {
        "dev": "vite",
        "build": "tsc && vite build",
        "preview": "vite preview"
    },
    "dependencies": {
        "igniteui-webcomponents": "${COMPONENT_VERSION}"
    },
    "devDependencies": {
        "typescript": "${TYPESCRIPT_VERSION}",
        "vite": "^8.2.0"
    }
}
`;

export default {
  INDEX_HTML_CONTENT,
  TYPESCRIPT_INDEX_CONTENT,
  CSS_INDEX_CONTENT,
  TSCONFIG_CONTENT,
  PRETTIER_CONFIG_CONTENT,
  PACKAGE_JSON_CONTENT,
};
