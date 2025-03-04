export type GuardRef = {
  enabled: boolean;
  callback?: NavigationGuardCallback;
};

export interface NavigationGuardParams {
  to: string;
  type: "push" | "replace" | "refresh" | "popstate" | "beforeunload";
}

export type NavigationGuardCallback = (
  params: NavigationGuardParams,
) => boolean | Promise<boolean>;
