import chalk from "chalk";
import {DateTime} from "luxon";
import _ from "lodash";

class Logger {
    nameService: string | null = null;
    instanceLogger: Function = console.log;

    constructor(nameService: string, instanceLogger?: Function){
        this.nameService = nameService.toUpperCase();

        if (!_.isNil(instanceLogger)){
            this.instanceLogger = instanceLogger;
        }
    }

    debug(...args: Array<any>){
        this.#baseLog("debug", ...args);
    }

    info(...args: Array<any>){
        this.#baseLog("info", ...args);
    }

    warn(...args: Array<any>){
        this.#baseLog("warning", ...args);
    }

    error(...args: Array<any>){
        this.#baseLog("error", ...args);
    }

    fatal(...args: Array<any>){
        this.#baseLog("fatal", ...args);
    }

    #baseLog(type: "debug" | "info" | "warning" | "error" | "fatal", ...args: Array<any>){
        let message = `[${DateTime.now().toFormat("dd-MM-yyyy hh:mm:ssZZ")}] [${type.toUpperCase()}] [${this.nameService}]`;
        
        args = args.map((message) => {
            if (message instanceof Error){
                return message.stack;
            } else {
                return message;
            }
        });
        
        switch (type){
            case "debug":
                message = chalk.gray(message, ...args);
                break;
            case "info":
                message = chalk.blue(message, ...args);
                break;
            case "warning":
                message = chalk.yellow(message, ...args);
                break;
            case "error":
                message = chalk.red(message, ...args);
                break;
            case "fatal":
                message = chalk.redBright(message, ...args);
                break;
        }

        this.instanceLogger(message);
    }
}

export default Logger;