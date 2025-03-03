"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { NavigationGuardCallback } from "../types";
import { NavigationGuardContext } from "../providers/NavigationGuardProvider";
import { navigationGuardHandleBeforeUnload } from "../utils";

export const useNavigationGuard = (enabled?: boolean) => {
  const { guardedRef } = useContext(NavigationGuardContext);
  const [pendingState, setPendingState] = useState<{
    resolve: (accepted: boolean) => void;
  } | null>(null);

  useEffect(() => {
    if (enabled)
      window.addEventListener(
        "beforeunload",
        navigationGuardHandleBeforeUnload,
      );
    return () => {
      window.removeEventListener(
        "beforeunload",
        navigationGuardHandleBeforeUnload,
      );
    };
  }, [enabled]);

  useEffect(() => {
    if (pendingState) return;

    const callback: NavigationGuardCallback = () => {
      // if (options.confirm) {
      //     return options.confirm(params);
      // }

      return new Promise<boolean>((resolve) => {
        setPendingState({ resolve });
      });
    };

    if (!guardedRef?.current) return;

    guardedRef.current.enabled = !!enabled;
    guardedRef.current.callback = callback;

    return () => {
      guardedRef.current = {
        enabled: false,
        callback: undefined,
      };
    };
  }, [enabled]);

  const active = pendingState !== null;

  const accept = useCallback(() => {
    if (!pendingState) return;
    pendingState.resolve(true);
    setPendingState(null);
  }, [pendingState]);

  const reject = useCallback(() => {
    if (!pendingState) return;
    pendingState.resolve(false);
    setPendingState(null);
  }, [pendingState]);

  const disable = () => {
    if (guardedRef?.current) {
      guardedRef.current = {
        enabled: false,
        callback: undefined,
      };
      setPendingState(null);
    }
  };

  return { active, accept, reject, disable };
};
