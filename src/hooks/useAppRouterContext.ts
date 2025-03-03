import { useContext, useMemo } from "react";
import {
  AppRouterContext,
  AppRouterInstance,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import { NavigationGuardContext } from "../providers/NavigationGuardProvider";

export const useAppRouterContext = () => {
  const origRouter = useContext(AppRouterContext);
  const { guardedRef } = useContext(NavigationGuardContext);

  return useMemo((): AppRouterInstance | null => {
    if (!origRouter) return null;

    const guarded = async (
      type: "push" | "replace" | "refresh",
      to: string,
      accepted: () => void,
    ) => {
      if (!guardedRef?.current) return accepted();

      if (guardedRef.current.enabled) {
        const confirm = await guardedRef.current.callback?.({ to, type });
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
  }, [origRouter, guardedRef?.current]);
};
