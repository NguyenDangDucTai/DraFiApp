import {ReactionType} from "./ReactionType.ts";


export class Reaction {

    reactionId: string;
    chatId: string;
    messageId: string;
    senderId: string;
    type: ReactionType;
    timestamp: any;

    constructor(item: any) {
        this.reactionId: item.reactionId;
        this.chatId: item.chatId;
        this.messageId: item.messageId;
        this.senderId: item.senderId
        this.type: item.type;
        this.timestamp: item.timestamp;
    }



}
