import {store} from "./store.ts";
import {Provider} from "react-redux";

const Redux = ({ children }: any) => {
    return (
        <Provider store={store}>{children}</Provider>
    )
}

export { Redux }
