"use client";

import React, {PropsWithChildren, useRef} from "react";
import {GuardRef} from "../types";
import {NavigationGuardProvider} from "./NavigationGuardProvider";
import AppRouterProviderWrapper from "./AppRouterProviderWrapper";

const NextNavigationGuardProvider = (props: PropsWithChildren) => {
    const guardRef = useRef<GuardRef>({
        enabled: false,
        callback: undefined,
    });

    return (
        <NavigationGuardProvider guardRef={guardRef}>
            <AppRouterProviderWrapper>{props.children}</AppRouterProviderWrapper>
        </NavigationGuardProvider>
    );
};

export default NextNavigationGuardProvider;
