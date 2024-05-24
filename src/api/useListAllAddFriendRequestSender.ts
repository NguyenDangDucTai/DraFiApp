import {useQuery} from "@tanstack/react-query";
import {LIST_ALL_ADD_FRIEND_REQUEST_RECEIVED, LIST_ALL_ADD_FRIEND_REQUEST_SENDER} from "../constants/QueryKey";
import {listAllAddFriendRequestReceived, listAllAddFriendRequestSender} from "./chatApi";

const useListAllAddFriendRequestSender = (userId: string) => {
    const { data: addFriendRequestSenderList, isLoading, error} = useQuery({
        queryKey: [LIST_ALL_ADD_FRIEND_REQUEST_SENDER],
        queryFn: () => listAllAddFriendRequestSender(userId),
    });

    if(error) {
        console.error('Error listing all sender friend requests', error);
    }

    console.log("success get list sender friend request")

    return { addFriendRequestSenderList: addFriendRequestSenderList?.data, isLoading }
}

export default useListAllAddFriendRequestSender;