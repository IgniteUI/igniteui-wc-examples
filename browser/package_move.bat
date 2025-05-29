@echo off
ECHO moving IG development packages...
CD node_modules

IF EXIST @infragistics\igniteui-webcomponents-charts\ES5 (
 MOVE /y @infragistics\igniteui-webcomponents-charts\ES5 igniteui-webcomponents-charts\ES5
 MOVE /y @infragistics\igniteui-webcomponents-charts\ES2015 igniteui-webcomponents-charts\ES2015
 MOVE /y @infragistics\igniteui-webcomponents-charts\License igniteui-webcomponents-charts\License
 MOVE /y @infragistics\igniteui-webcomponents-charts\package.json igniteui-webcomponents-charts\package.json
 MOVE /y @infragistics\igniteui-webcomponents-charts\README.md igniteui-webcomponents-charts\README.md
)

IF EXIST @infragistics\igniteui-webcomponents-core\ES5 (
 MOVE /y @infragistics\igniteui-webcomponents-core\ES5 igniteui-webcomponents-core\ES5
 MOVE /y @infragistics\igniteui-webcomponents-core\ES2015 igniteui-webcomponents-core\ES2015
 MOVE /y @infragistics\igniteui-webcomponents-core\License igniteui-webcomponents-core\License
 MOVE /y @infragistics\igniteui-webcomponents-core\package.json igniteui-webcomponents-core\package.json
 MOVE /y @infragistics\igniteui-webcomponents-core\README.md igniteui-webcomponents-core\README.md
)

IF EXIST @infragistics\igniteui-webcomponents-gauges (
 MOVE /y @infragistics\igniteui-webcomponents-gauges igniteui-webcomponents-gauges
)

IF EXIST @infragistics\igniteui-webcomponents-grids (
 MOVE /y @infragistics\igniteui-webcomponents-grids igniteui-webcomponents-grids
)

IF EXIST @infragistics\igniteui-webcomponents-data-grids (
 MOVE /y @infragistics\igniteui-webcomponents-data-grids igniteui-webcomponents-data-grids
)

IF EXIST @infragistics\igniteui-webcomponents-excel (
 MOVE /y @infragistics\igniteui-webcomponents-excel igniteui-webcomponents-excel
)

ECHO moving IG development packages... completed



