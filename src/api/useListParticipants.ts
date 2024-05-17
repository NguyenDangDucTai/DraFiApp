import {useQuery} from "@tanstack/react-query";
import {LIST_ALL_PARTICIPANTS} from "../constants/QueryKey.ts";
import {listAllParticipants} from "./participantsApi.ts";

const useListParticipants = (id: string) => {
    const { data: participants, isLoading, error} = useQuery({
        queryKey: [LIST_ALL_PARTICIPANTS],
        queryFn: () => listAllParticipants(id),
    });
    if (error){
        console.error("Error listing all participants",error)
    }

    return { participants: participants?.data, isLoading }
}

export {useListParticipants};