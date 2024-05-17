import {RoomType} from "./RoomType.ts";

export class RoomChat {

    chatId: string;
    name: string;
    picture?: string;
    managerId?: string;
    messages?: any[];
    participants: string[];
    type: RoomType;

    constructor(item: any) {
        this.chatId = item.chatId;
        this.name = item.name;
        this.picture = item.picture;
        this.managerId = item.managerId;
        this.messages = item.messages;
        this.participants = item.participants;
        this.type = item.type;
    }

    getDisplayName(userId: string) {
        if(this.type === RoomType.SINGLE) {
            const index = this.participants.indexOf(userId);
            return index >= 0 ? this.name.split('/')[index] : '';
        }
        return this.name;
    }

    getLatestMessage() {
        return this.messages && this.messages.length > 0 ? this.messages[this.messages.length - 1] : null;
    }

    getReceiverId(userId: string) {
        if(this.type === RoomType.SINGLE) {
            const index = this.participants.indexOf(userId);
            return index >= 0 ? this.participants[index === 0 ? 1 : 0] : '';
        }
        return '';
    }

}
