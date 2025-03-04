"use client";

import { useContext, useMemo } from "react";
import {
  AppRouterContext,
  AppRouterInstance,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import { NavigationGuardContext } from "../providers/NavigationGuardProvider";

export const useAppRouterContext = () => {
  const origRouter = useContext(AppRouterContext);
  const { guardRef } = useContext(NavigationGuardContext);

  return useMemo((): AppRouterInstance | null => {
    if (!origRouter) return null;

    const guarded = async (
      type: "push" | "replace" | "refresh",
      to: string,
      accepted: () => void,
    ) => {
      if (!guardRef?.current) return accepted();

      if (guardRef.current.enabled) {
        const confirm = await guardRef.current.callback?.({ to, type });
        if (!confirm) return;
      }

      accepted();
    };

    return {
      ...origRouter,
      push: (href, ...args) => {
        guarded("push", href, () => origRouter.push(href, ...args));
      },
      replace: (href, ...args) => {
        guarded("replace", href, () => origRouter.replace(href, ...args));
      },
      refresh: (...args) => {
        guarded("refresh", location.href, () => origRouter.refresh(...args));
      },
    };
  }, [origRouter, guardRef?.current]);
};
