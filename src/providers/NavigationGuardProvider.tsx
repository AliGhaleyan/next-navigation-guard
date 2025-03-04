"use client";

import React, {createContext, PropsWithChildren, RefObject} from "react";
import {GuardRef} from "../types";

export const NavigationGuardContext = createContext<{
  guardRef: RefObject<GuardRef> | null;
}>({
  guardRef: null,
});

export const NavigationGuardProvider = (
  props: PropsWithChildren<{ guardRef: RefObject<GuardRef> | null }>,
) => {
  return (
    <NavigationGuardContext.Provider value={{ guardRef: props.guardRef }}>
      {props.children}
    </NavigationGuardContext.Provider>
  );
};
