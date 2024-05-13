import {io, io as socketIO} from "socket.io-client";

export const chatSocket = socketIO("https://chat.ntt1102.xyz");
export const notificationSocket = io("https://notification.ntt1102.xyz");
