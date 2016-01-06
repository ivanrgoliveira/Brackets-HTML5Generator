/*
The MIT License (MIT)

Copyright (c) 2016 Ivan Oliveira

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, brackets, window, $, Mustache, navigator */

define(function (require, exports, module) {
    "use strict";
    
    //Define Brackets modules
    var DocumentManager     = brackets.getModule("document/DocumentManager"),
        Commands            = brackets.getModule("command/Commands"),
        CommandManager      = brackets.getModule("command/CommandManager"),
        KeyBindingManager   = brackets.getModule("command/KeyBindingManager"),
        EditorManager       = brackets.getModule("editor/EditorManager"),
        MainViewManager     = brackets.getModule("view/MainViewManager"),
        Menus               = brackets.getModule("command/Menus");
    
    
    //Commands and Menu
    var file       = "ivanrgoliveira.newhtml5";
    var fileLabel  = "New HTML5 File";
    var menu       = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    
    
    //Internal control
    var fileCounter = 1; //To create a numbered untitled file like Untitled-1
    var fileExtension = ".html"; //needs to have the dot
    
    
    //Read the template file
    var template   = require("text!template/template.html");
        
    
    //Create new file
    function NewFile() {
        
        var newFile = DocumentManager.createUntitledDocument(fileCounter++, fileExtension);
        MainViewManager._edit(MainViewManager.ACTIVE_PANE, newFile);
        
        //Set the template to the file
        EditorManager.getCurrentFullEditor()._codeMirror.setValue(template);
        
        return new $.Deferred().resolve(newFile).promise();
        
    }

    
    //Register the command
    CommandManager.register(fileLabel, file, NewFile);
    
    
    //Insert the menu item
    menu.addMenuItem(file, [{ "key": "Ctrl-Alt-N", "platform": "win" }, { "key": "Ctrl-Alt-N", "platform": "mac" }], Menus.AFTER, Commands.FILE_NEW_UNTITLED);
    
});