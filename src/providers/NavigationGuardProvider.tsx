"use client";

import React, { createContext, PropsWithChildren, RefObject } from "react";
import { GuardedRefArray } from "../types";

export const NavigationGuardContext = createContext<{
  guardedRef: RefObject<GuardedRefArray> | null;
}>({
  guardedRef: null,
});

export const NavigationGuardProvider = (
  props: PropsWithChildren<{ guardedRef: RefObject<GuardedRefArray> | null }>,
) => {
  return (
    <NavigationGuardContext.Provider value={{ guardedRef: props.guardedRef }}>
      {props.children}
    </NavigationGuardContext.Provider>
  );
};
