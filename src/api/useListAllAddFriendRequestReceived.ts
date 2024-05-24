import {useQuery} from "@tanstack/react-query";
import {LIST_ALL_ADD_FRIEND_REQUEST_RECEIVED} from "../constants/QueryKey";
import {listAllAddFriendRequestReceived} from "./chatApi";

const useListAllAddFriendRequestReceived = (userId: string) => {
    const { data: addFriendRequestReceivedList, isLoading, error} = useQuery({
        queryKey: [LIST_ALL_ADD_FRIEND_REQUEST_RECEIVED],
        queryFn: () => listAllAddFriendRequestReceived(userId),
    });

    if(error) {
        console.error('Error listing all received friend requests', error);
    }

    console.log("success get list received friend request")

    return { addFriendRequestReceivedList: addFriendRequestReceivedList?.data, isLoading }
}

export default useListAllAddFriendRequestReceived;