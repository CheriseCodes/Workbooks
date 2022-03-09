import path from 'path';
import express,
    { Express, NextFunction, request, Request, Response } from 'express';
import { serverInfo } from './ServerInfo';
import * as IMAP from './IMAP';
import * as SMTP from './SMTP';
import * as Contacts from './Contacts';
import { IContCT } from './Contacts';

const app: Express = express();

app.use(express.json());

/*
express.static is used to serve static resources. Just need to tell express
where those resources are.
*/
app.use("/",
    express.static(path.join(__dirname, "../../client/dist"))
);

/*
Enables API endpoints to be accessed from any domain
Middlewares
- is defined by supplying a function to app.use()
- function must take in incoming request, generated response, a reference to the next function
- form a chain when Express handles a request
*/
app.use(function(inRequest: Request, inResponse: Response, inNext: NextFunction){
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
    inResponse.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    inNext();
});

/*
- Retrieving a resource should use the GET method
- callback will be executed when the request is received
*/
app.get("/mailboxes",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
            const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();
            inResponse.json(mailboxes);
        } catch (inError) {
            inResponse.send("error");
        }
    }
);

app.get("/mailboxes/:mailbox",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
            const messages: IMAP.IMessage[] = await imapWorker.listMessages({ mailbox: inRequest.params.mailbox});
            inResponse.json(messages);
        } catch (inError) {
            inResponse.send("error");
        }
    }
);

/*
- messageBody is sent as plain text with Response.send method
- client is responsible for HTML message bodies
*/
app.get("/messages/:mailbox/:id",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
            const messageBody: string = await imapWorker.getMessageBody({
                mailbox: inRequest.params.mailbox,
                id: parseInt(inRequest.params.id, 10)
            });
            inResponse.send(messageBody);
        } catch (inError) {
            inResponse.send("error");
        }
    }
);

app.delete("/messages/:mailbox/:id",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
            imapWorker.deleteMessage({
                mailbox: inRequest.params.mailbox,
                id: parseInt(inRequest.params.id, 10)
            });
            inResponse.send("ok");
        } catch (inError) {
            inResponse.send("error");
        }
    }
);

app.post("/message",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo);
            // inRequest.body includes dest. address, subject, message body
            await smtpWorker.sendMessage(inRequest.body);
            inResponse.send("ok");
        } catch (inError) {
            inResponse.send("error");
        }
    }
);

app.get("/contacts",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const contactsWorker: Contacts.Worker = new Contacts.Worker();
            const contacts: IContact[] = await contactsWorker.listContacts();
            inResponse.json(contacts);
        } catch (inError) {
            inResponse.send("error");
        }
    }
);

app.post("/contacts",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const contactsWorker: Contacts.Worker = new Contacts.Worker();
            const contact: IContact = await contactsWorker.addContact(inRequest.body);
            // Resturning contact to allow contact to save generated ID. This ID can be used later
            // for deleting or updating the contact. This is a common REST API pattern
            inResponse.json(contact);
        } catch (inError) {
            inResponse.send("error");
        }
    }
);

app.delete("/contacts/:id",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const contactsWorker: Contacts.Worker = new Contacts.Worker();
            await contactsWorker.deleteContact(inRequest.params.id);
            inResponse.send("ok");
        } catch (inError) {
            inResponse.send("error");
        }
    }
);
