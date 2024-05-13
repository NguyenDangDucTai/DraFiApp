import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useQueryClient} from "@tanstack/react-query";
import useListAllChats from "./src/api/useListAllChat";
import {firestore} from "./src/configs/FirebaseConfig";
import {LIST_ALL_CHATS, LIST_ALL_MESSAGES} from "./src/constants/QueryKey.ts";

const MainApp = () => {
    const queryClient = useQueryClient();
    const user = useSelector((state: any) => state.userData);
    const userId = user?.id;

    const { data: chats } = useListAllChats();


    useEffect(() => {
        if(userId && chats) {
            const myChats = chats.filter((chat: any) => chat.participants.includes(userId));

            console.log('myChats', myChats);

            myChats.forEach((chat: any) => {
                firestore.collection("Chats")
                    .doc(chat.chatId)
                    .onSnapshot((snapshot: any) => {
                        const docId = snapshot.id;
                        const docData = snapshot.data();
                        const chatId = docData.chatId;
                        console.log('docId', docId, 'docData', docData);

                        queryClient.invalidateQueries({ queryKey: [LIST_ALL_CHATS] });
                        queryClient.invalidateQueries({ queryKey: [`${LIST_ALL_MESSAGES}_${chatId}`] });
                    })
            })
        }

        // if (socket) {
        //     socket.emit("add-user", userId);
        //     notificationSocket.emit("add-user", userId);
        //
        //     socket.on("msg-recieve-private", (data) => {
        //         console.log('SOCKET PRIVATE MESSAGE RECEIVED', data)
        //
        //         const chatId = data.from;
        //         queryClient.invalidateQueries({ queryKey: [QueryKey.LIST_ALL_PARTICIPANTS] });
        //         queryClient.invalidateQueries({ queryKey: [`${QueryKey.LIST_ALL_MESSAGES}_${chatId}`] });
        //     });
        //
        //     socket.on("msg-recieve-public", (data) => {
        //         console.log('SOCKET PUBLIC MESSAGE RECEIVED', data);
        //
        //         const chatId = data.from;
        //         queryClient.invalidateQueries({ queryKey: [QueryKey.LIST_ALL_PARTICIPANTS] });
        //         queryClient.invalidateQueries({ queryKey: [`${QueryKey.LIST_ALL_MESSAGES}_${chatId}`] });
        //     });
        //
        //     notificationSocket.on("friendRequest", (data) => {
        //         console.log('FRIEND REQUEST', data);
        //         queryClient.invalidateQueries({ queryKey: [QueryKey.LIST_ALL_ADD_FRIEND_REQUEST_RECEIVED] });
        //     });
        //
        //     notificationSocket.on("acceptFriend", (data) => {
        //         console.log('ACCEPT FRIEND', data);
        //     });
        // }
    }, [user]);

    return <></>
}

export default MainApp;
