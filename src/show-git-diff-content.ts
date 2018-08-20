import * as vscode from "vscode";
import { file as tmpfile } from "tmp";
import { promisify } from "util";
import { writeFile } from "fs";

const fswrite = promisify(writeFile);

export async function showGitDiffContent(content: string) {
    const tempFile = await getTmpFile();
    await fswrite(tempFile.path, content, "utf-8");
    const text = await vscode.commands.executeCommand(
        "vscode.open",
        vscode.Uri.file(tempFile.path)
    );
}

async function getTmpFile(): Promise<{ path: string; cb: () => void }> {
    return new Promise<{ path: string; cb: () => void }>((resolve, reject) => {
        tmpfile(
            {
                postfix: ".patch"
            },
            (err: any, path: string, fd: number, cb: () => void) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({
                    path,
                    cb
                });
            }
        );
    });
}
