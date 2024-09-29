import { describe, it, expect, assert, vi } from "vitest";

import Logger, { ILevel } from "../index";
import {alternateCase, listLevel} from "./utils/utils";

let output: any = null;

function captureLog(message: string){
    //@ts-ignore
    output = JSON.stringify(message).replaceAll("\"", "");
}

process.env.LOG_LEVEL = "debug";

describe("Test format", () => {
    for (const objectLevel of listLevel) {
        it(`check format ${objectLevel.level}`, () => {
            output = null;
            const logRegex = `\\\\u001b\\[\\d{1,3}m\\[\\d{2}-\\d{2}-\\d{4} \\d{2}:\\d{2}:\\d{2}\\+\\d{2}:\\d{2}\\] \\[${objectLevel.level.toUpperCase()}\\] \\[TEST] .+?\\\\u001b\\[\\d{1,3}m`;
            
            const logger = new Logger("test", captureLog);

            logger[objectLevel.level]("Hi!");
            
            assert.match(output, new RegExp(logRegex), `Format isn't correct for level --> ${objectLevel.level}`);
        });
    }
});

describe("Test colors", () => {
    for (const objectLevel of listLevel) {
        it(`check color ${objectLevel.level}`, () => {
            output = null;

            const logger = new Logger("test", captureLog);
            logger[objectLevel.level]("Hi!");
            expect(output.startsWith(objectLevel.color) && output.endsWith("\\u001b[39m")).eq(true);
        });
    }
});

describe("Test log level from ENV", () => {
    it("Log level: (empty)", () => {
        output = null;
        process.env.LOG_LEVEL = "";
        
        const logger = new Logger("test", captureLog);
        output = "";
        logger.debug("Hi! custom");
        
        return expect(output).empty;
    });
    
    it("Log level: null", () => {
        output = null;
        //@ts-ignore
        process.env.LOG_LEVEL = null;
        
        const logger = new Logger("test", captureLog);
        output = "";
        logger.debug("Hi! custom");
        
        return expect(output).empty;
    });
    
    it("Log level: undefined", () => {
        output = null;
        process.env.LOG_LEVEL = undefined;
        
        const logger = new Logger("test", captureLog);
        output = "";
        logger.debug("Hi! custom");
        
        return expect(output).empty;
    });
    
    for (const objectLevel of listLevel) {
        it(`Log level: ${objectLevel.level}`, () => {
            output = null;
            process.env.LOG_LEVEL = objectLevel.level;

            const logger = new Logger("test", captureLog);
            logger[objectLevel.level]("Hi!");
            return expect(output).not.null;
        });
    }
    
    for (const objectLevel of listLevel) {
        it(`Log level: ${objectLevel.level.toUpperCase()}`, () => {
            output = null;
            process.env.LOG_LEVEL = objectLevel.level.toUpperCase();

            const logger = new Logger("test", captureLog);
            logger[objectLevel.level]("Hi!");
            return expect(output).not.null;
        });
    }
    
    for (const objectLevel of listLevel) {
        it(`Log level: ${alternateCase(objectLevel.level)}`, () => {
            output = null;
            process.env.LOG_LEVEL = alternateCase(objectLevel.level);

            const logger = new Logger("test", captureLog);
            logger[objectLevel.level]("Hi!");
            return expect(output).not.null;
        });
    }

    it("Log level: debrn (not exist)", () => {
        process.env.LOG_LEVEL = "debrn";
        const exitCode = vi.spyOn(process, "exit");

        try {
            new Logger("test", captureLog);
        } catch {
            //ignore
        }

        return expect(exitCode).toHaveBeenCalledWith(1);
    });

    it("Log level: 1234 (not exist)", () => {
        //@ts-ignore
        process.env.LOG_LEVEL = 1234;
        const exitCode = vi.spyOn(process, "exit");

        try {
            new Logger("test", captureLog);
        } catch {
            //ignore
        }

        return expect(exitCode).toHaveBeenCalledWith(1);
    });
});


describe("Test print log level", () => {
    for (const objectLevel of listLevel) {
        it(`Log level: ${objectLevel.level}`, () => {
            for (const singleLevel of listLevel.map((singleObjectlevel) => singleObjectlevel.level)) {
                output = null;
                process.env.LOG_LEVEL = singleLevel;

                const logger = new Logger("test", captureLog);
                logger[singleLevel]("Hi!");

                if (objectLevel.level === "debug"){
                    //eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    expect(output).not.null;
                    continue;
                }
                
                if ((["debug", "info"] as Array<ILevel>)){
                    //eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    expect(output).not.null;
                    continue;
                }
                
                if ((["debug", "info", "warn"] as Array<ILevel>)){
                    //eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    expect(output).not.null;
                    continue;
                }
                
                if ((["debug", "info", "error"] as Array<ILevel>)){
                    //eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    expect(output).not.null;
                    continue;
                }
                
                if ((["debug", "info", "error", "fatal"] as Array<ILevel>)){
                    //eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    expect(output).not.null;
                    continue;
                }

                //eslint-disable-next-line @typescript-eslint/no-unused-expressions
                expect(output).null;
            }
        });
    }
});