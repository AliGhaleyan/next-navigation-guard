"use client";

import { PropsWithChildren, useRef } from "react";
import { GuardedRefArray } from "../types";
import { NavigationGuardProvider } from "./NavigationGuardProvider";
import AppRouterProviderWrapper from "./AppRouterProviderWrapper";

const AppRouterProvider = (props: PropsWithChildren) => {
    const guardedRef = useRef<GuardedRefArray>({
        enabled: false,
        callback: undefined,
    });

    return (
        <NavigationGuardProvider guardedRef={guardedRef}>
            <AppRouterProviderWrapper>{props.children}</AppRouterProviderWrapper>
            </NavigationGuardProvider>
    );
};

export default AppRouterProvider;
