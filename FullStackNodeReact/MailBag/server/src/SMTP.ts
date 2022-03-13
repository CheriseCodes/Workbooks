import Mail from "nodemailer/lib/mailer";
import * as nodemailer from "nodemailer";
import { SendMailOptions, SentMessageInfo } from "nodemailer";
import { IServerInfo } from "./ServerInfo";
import { MongoAPIError } from "mongodb";
const nodemailer = require("nodemailer");

/**
 * Notes from this chapter
 * - `any` keyword is not the name as generic <T>
 * - <T> allows type safety and IDI auto-completion while `any` doesn't
 * - Can apply generics to interfaces as well
 * - Two types of JS apis: Async/Await and Promise
 * - Non-async/await apis must be wrapped in a promise. Caller than then use the returned 
 *   promise and regulr async/await fashion
 * - 
 */

export class Worker {
    private static serverInfo: IServerInfo;
    constructor(inServerInfo: IServerInfo) {
        Worker.serverInfo = inServerInfo;
    }
    public sendMessage(inOptions: SendMailOptions):
    Promise<string> {
        return new Promise((inResolve, inReject) => {
            const transport: Mail = nodemailer.createTransport(Worker.serverInfo.smtp);
            transport.sendMail(inOptions,
                (inError: Error | null, inInfo: SentMessageInfo) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve("resolved");
                    }
                });
        });
    }
}