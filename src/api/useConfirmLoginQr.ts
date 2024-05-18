import {useMutation} from "@tanstack/react-query";
import {confirmQr, scanQr} from "./qrApi.ts";

export const useConfirmLoginQr = () => {
    const {mutate, data, error, isPending, isError, isSuccess} = useMutation({
        mutationFn: (token: string) => confirmQr(token),
        onSuccess: (res) => {
            const data = res.data;
        },
        onError: (error) => {
            console.error(error);
        },
    });
    return { mutate, data, error, isPending, isSuccess, isError };
};
