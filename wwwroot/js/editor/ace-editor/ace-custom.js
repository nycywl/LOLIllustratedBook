"use strict";

var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");

editor.getSession().setMode("ace/mode/javascript");

var html_editor = ace.edit("html-editor");
html_editor.setTheme("ace/theme/monokai");
html_editor.getSession().setMode("ace/mode/html");
html_editor.setShowPrintMargin(false);


var css_editor = ace.edit("css-editor");
css_editor.setTheme("ace/theme/monokai");
css_editor.getSession().setMode("ace/mode/css");
css_editor.setShowPrintMargin(false);

var php_editor = ace.edit("php-editor");
php_editor.setTheme("ace/theme/monokai");
php_editor.getSession().setMode("ace/mode/php");
php_editor.setShowPrintMargin(false);