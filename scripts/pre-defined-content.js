// Placeholder files for a new sample. A sample holds only its own files;
// tsconfig.json, webpack.config.js and package.json come from
// scripts/sample-template/ when the code-viewer JSON is generated.

// webpack's HtmlWebpackPlugin injects the bundle, so there is no <script> tag.
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

export default {
  INDEX_HTML_CONTENT,
  TYPESCRIPT_INDEX_CONTENT,
  CSS_INDEX_CONTENT,
};
