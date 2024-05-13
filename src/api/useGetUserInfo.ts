import {useQuery} from "@tanstack/react-query";
import {GET_USER_INFO} from "../constants/QueryKey";
import {getUserInfo} from "./userApi";

const useGetUserInfo = (id: string) => {
    const { data: userInfo, isLoading, error} = useQuery({
        queryKey: [GET_USER_INFO],
        queryFn: () => getUserInfo(id)
    });

    if(error) {
        console.error('Error getting user info', error);
    }

    return { userInfo: userInfo?.data, isLoading }
}

export default useGetUserInfo;
