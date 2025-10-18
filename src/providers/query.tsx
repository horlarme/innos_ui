import type {PropsWithChildren} from "react";
import {queryClient} from "../utils";
import {QueryClientProvider} from "@tanstack/react-query";

export default function QueryProvider(props: PropsWithChildren) {
    return <QueryClientProvider client={queryClient}>
        {props.children}
    </QueryClientProvider>
}
