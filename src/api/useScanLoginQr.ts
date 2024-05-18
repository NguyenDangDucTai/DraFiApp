import {useMutation} from "@tanstack/react-query";
import {scanQr} from "./qrApi.ts";

export const useScanLoginQr = () => {
    const {mutate, data, error, isPending, isSuccess} = useMutation({
        mutationFn: ({ uid, token }: {uid: string, token: string}) => scanQr(uid, token),
        onSuccess: (res) => {
            const data = res.data;
        },
        onError: (error) => {
            console.error(error);
        },
    });
    return { mutate, data, error, isPending, isSuccess };
};
