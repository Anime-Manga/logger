import chalk from "chalk";
import {DateTime} from "luxon";
import _ from "lodash";
import {config} from "dotenv";
config();

type ILevel = "debug" | "info" | "warn" | "error" | "fatal";

class Logger {
    nameService: string | null = null;
    instanceLogger: Function = console.log;
    level: ILevel = "info";

    constructor(nameService: string, instanceLogger?: Function){
        this.nameService = nameService.toUpperCase();

        if (!_.isNil(instanceLogger)){
            this.instanceLogger = instanceLogger;
        }

        const level = (process.env.LOG_LEVEL).toLowerCase() as ILevel;
        switch(level){
            case "debug":
            case "error":
            case "info":
            case "warn":
            case "fatal":
                this.level = level;
                break;
            default:
                if(!_.isNil(level) && level !== "null" && level !== "undefined" && level !== ""){
                    this.#baseLog("fatal", "Not exist current level:", `"${level}"`, "select one of this: [debug|error|info|warn|fatal]")
                    process.exit(1);
                }
        }
    }

    debug(...args: Array<any>){
        if(this.level === "debug"){
            this.#baseLog("debug", ...args);
        }
    }

    info(...args: Array<any>){
        if((["info", "debug"] as Array<ILevel>).includes(this.level)){
            this.#baseLog("info", ...args);
        }
    }

    warn(...args: Array<any>){
        if((["info", "debug", "warn"] as Array<ILevel>).includes(this.level)){
            this.#baseLog("warn", ...args);
        }
    }

    error(...args: Array<any>){
        if((["info", "debug", "warn", "error"] as Array<ILevel>).includes(this.level)){
            this.#baseLog("error", ...args);
        }
    }

    fatal(...args: Array<any>){
        if((["info", "debug", "warn", "error", "fatal"] as Array<ILevel>).includes(this.level)){
            this.#baseLog("fatal", ...args);
        }
    }

    #baseLog(type: ILevel, ...args: Array<any>){
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
            case "warn":
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

export {
    ILevel
}