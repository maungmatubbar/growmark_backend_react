import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ContextProvider } from "./context/ContextProvider";

function App() {
    return (
        <>
            <ContextProvider>
                <RouterProvider router={router} />
            </ContextProvider>
        </>
    );
}

export default App;
