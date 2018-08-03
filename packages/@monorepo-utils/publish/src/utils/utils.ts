"use strict";
const chalk = require("chalk");
const { dots } = require("cli-spinners");
const logUpdate = require("log-update");
const { exec, spawn } = require("child-process-promise");

const execRead = async (command: string, options?: string[]) => {
    const { stdout } = await exec(command, options);

    return stdout.trim();
};

const unexecutedCommands: string[] = [];

/**
 * execute if needed
 * if dry is true, it does not execute and log it
 */
const execUnlessDry = async (command: string, { cwd, dry }: { cwd: string; dry: boolean }): Promise<void> => {
    if (dry) {
        unexecutedCommands.push(`${command} # {cwd: ${cwd}}`);
    } else {
        await exec(command, { cwd });
    }
};

/**
 * spawn if needed
 * if dry is true, it does not spawn and log it
 */
const spawnUnlessDry = async (
    command: string,
    args: string[],
    { cwd, dry }: { cwd: string; dry: boolean }
): Promise<void> => {
    if (dry) {
        unexecutedCommands.push(`${command} # {cwd: ${cwd}}`);
    } else {
        const promise = spawn(command, args, { cwd });
        const childProcess = promise.childProcess;
        process.stdin.pipe(childProcess.stdin);
        childProcess.stdout.pipe(process.stdout);
        childProcess.stderr.pipe(process.stderr);
        await promise;
    }
};

const getUnexecutedCommands = () => {
    if (unexecutedCommands.length > 0) {
        return chalk`
      The following commands were not executed because of the {bold --dry} flag:
      {gray ${unexecutedCommands.join("\n")}}
    `;
    } else {
        return "";
    }
};

/**
 * @param {string} text
 */
const log = (text: string) => {
    console.log(`${chalk.green("✓")} ${text}`);
};

/**
 * @param {Promise<string>}promise
 * @param {string} title
 * @param {{isLongRunningTask: boolean, ciMode: boolean }} [options]
 * @returns {Promise<*>}
 */
const logPromise = async (
    promise: Promise<any>,
    title: string,
    options: { isLongRunningTask?: boolean; ciMode?: boolean } = {}
): Promise<any> => {
    const { frames, interval } = dots;
    const ciMode = options.ciMode !== undefined ? options.ciMode : false;
    const isLongRunningTask = options.isLongRunningTask !== undefined ? options.isLongRunningTask : false;
    if (ciMode) {
        return promise.then(() => {
            log(title);
        });
    }

    let index = 0;

    const inProgressMessage = `- this may take a few ${isLongRunningTask ? "minutes" : "seconds"}`;

    const id = setInterval(() => {
        index = ++index % frames.length;
        logUpdate(`${chalk.yellow(frames[index])} ${title} ${chalk.gray(inProgressMessage)}`);
    }, interval);

    try {
        const returnValue = await promise;

        clearInterval(id);

        logUpdate(`${chalk.green("✓")} ${title}`);
        logUpdate.done();

        return returnValue;
    } catch (error) {
        logUpdate.clear();

        throw error;
    }
};

const runYarnTask = async (args: string[], { cwd, dry }: { cwd: string; dry: boolean }) => {
    return spawnUnlessDry(`yarn`, args, { cwd, dry });
};

export { execRead, execUnlessDry, getUnexecutedCommands, runYarnTask, log, logPromise };
