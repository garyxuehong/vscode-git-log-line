"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import { grabGitLineDiff } from "./grab-git-line-diff";
import { showGitDiffContent } from "./show-git-diff-content";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log(
        'Congratulations, your extension "vscode-git-log-line" is now active!'
    );

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand(
        "vscode-git-log-line.showLineLog",
        showLineGitHistory
    );

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

async function showLineGitHistory() {
    const activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor) {
        const filename = activeTextEditor.document.fileName;
        const lineNo = activeTextEditor.selection.start.line;
        console.log(
            `getting git history for file ${filename} at line ${lineNo}`
        );
        try {
            const content: string = await grabGitLineDiff(filename, lineNo);
            await showGitDiffContent(content);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}
