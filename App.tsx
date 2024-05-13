import React from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import {Navigation} from "./src/navigation";
import {Redux} from "./src/redux";
import MainApp from "./MainApp.tsx";

const queryClient = new QueryClient();

function App(): React.JSX.Element {
    return (
        <QueryClientProvider client={queryClient}>
            <Redux>
                <Navigation/>
                <MainApp/>
            </Redux>
        </QueryClientProvider>
    );
}

export default App;
