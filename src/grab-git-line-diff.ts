import { exec } from "child_process";
import { dirname } from "path";

export function grabGitLineDiff(filename: string, lineNo: number) {
    return new Promise<string>((resolve, reject) => {
        try {
            exec(
                `git log -L${lineNo + 1},+1:${filename}`,
                {
                    cwd: dirname(filename)
                },
                (err, stdout, stderr) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (stderr) {
                        reject(stderr);
                        return;
                    }
                    resolve(stdout);
                }
            );
        } catch (e) {
            reject(e);
        }
    });
}
