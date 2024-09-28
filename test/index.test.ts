import Logger from "../index";
import { describe, it, expect, assert } from "vitest";
let output = "";

function captureLog(message: any){
    output = JSON.stringify(message).replaceAll("\"", "");
}

describe("Test format", () => {
    const logRegex = /\\u001b\[\d{1,3}m\[\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}\+\d{2}:\d{2}\] \[(DEBUG|INFO|WARNING|ERROR|FATAL)\] \[TEST] .+?\\u001b\[\d{1,3}m/;
    const logger = new Logger("test", captureLog);

    it("check format debug", () => {
        logger.debug("Hi!");
        console.log(output);
        assert.match(output, logRegex, "Format isn't correct");
    });
    it("check format error", () => {

        logger.error("Hi!");
        assert.match(output, logRegex, "Format isn't correct");
    });
    it("check format fatal", () => {
        logger.fatal("Hi!");
        assert.match(output, logRegex, "Format isn't correct");
    });
    it("check format info", () => {
        logger.info("Hi!");
        assert.match(output, logRegex, "Format isn't correct");
    });
    it("check format warning", () => {
        logger.warn("Hi!");
        assert.match(output, logRegex, "Format isn't correct");
    });
});

describe("Test colors", () => {
    const logger = new Logger("test", captureLog);
    it("check color debug", () => {
        logger.debug("Hi!");
        expect(output.startsWith("\\u001b[90m") && output.endsWith("\\u001b[39m")).eq(true);
    });
    it("check color error", () => {
        logger.error("Hi!");
        expect(output.startsWith("\\u001b[31m") && output.endsWith("\\u001b[39m")).eq(true);
    });
    it("check color fatal", () => {
        logger.fatal("Hi!");
        expect(output.startsWith("\\u001b[91m") && output.endsWith("\\u001b[39m")).eq(true);
    });
    it("check color info", () => {
        logger.info("Hi!");
        expect(output.startsWith("\\u001b[34m") && output.endsWith("\\u001b[39m")).eq(true);
    });
    it("check color warning", () => {
        logger.warn("Hi!");
        expect(output.startsWith("\\u001b[33m") && output.endsWith("\\u001b[39m")).eq(true);
    });
});