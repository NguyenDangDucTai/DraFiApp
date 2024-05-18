import {useMutation} from "@tanstack/react-query";
import {rejectQr} from "./qrApi.ts";

export const useRejectLoginQr = () => {
    const {mutate, data, error, isPending, isSuccess, isError} = useMutation({
        mutationFn: (token: string) => rejectQr(token),
        onSuccess: (res) => {
            const data = res.data;
        },
        onError: (error) => {
            console.error(error);
        },
    });
    return { mutate, data, error, isPending, isSuccess, isError};
};
