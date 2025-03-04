"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { NavigationGuardCallback } from "../types";
import { NavigationGuardContext } from "../providers/NavigationGuardProvider";
import { navigationGuardHandleBeforeUnload } from "../utils";

export const useNavigationGuard = (enabled?: boolean) => {
  const { guardRef } = useContext(NavigationGuardContext);
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
      return new Promise<boolean>((resolve) => {
        setPendingState({ resolve });
      });
    };

    if (!guardRef?.current) return;

    guardRef.current.enabled = !!enabled;
    guardRef.current.callback = callback;

    return () => {
      guardRef.current = {
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
    if (guardRef?.current) {
      guardRef.current = {
        enabled: false,
        callback: undefined,
      };
      setPendingState(null);
    }
  };

  return { active, accept, reject, disable };
};
