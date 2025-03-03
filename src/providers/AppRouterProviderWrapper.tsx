import { PropsWithChildren } from "react";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useAppRouterContext } from "../hooks/useAppRouterContext";

const AppRouterProviderWrapper = (props: PropsWithChildren) => {
  const context = useAppRouterContext();

  return (
    <AppRouterContext.Provider value={context}>
      {props.children}
    </AppRouterContext.Provider>
  );
};

export default AppRouterProviderWrapper;
