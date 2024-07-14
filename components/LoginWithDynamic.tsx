"use client";
import { getCurrentUserWithDynamic } from "@/lib/dynamic-api";
import {
  DynamicWidget,
  useRefreshUser,
  useReinitialize,
} from "@dynamic-labs/sdk-react-core";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

let didSaveToken = false;

export default function LoginWithDynamic() {
  const searchParams = useSearchParams();
  const refresh = useReinitialize();
  const jwt = searchParams.get("jwt");
  const minJwt = searchParams.get("minJwt");
  useEffect(() => {
    if (jwt && !didSaveToken) {
      didSaveToken = true;
      localStorage.setItem("dynamic_authentication_token", `"${jwt}"`);
      localStorage.setItem("dynamic_min_authentication_token", `"${minJwt}"`);
      getCurrentUserWithDynamic(jwt).then((user) => {
        const dynamicStore = localStorage.getItem("dynamic_store");
        if (dynamicStore) {
          const parsedStore = JSON.parse(dynamicStore);
          const state = {
            ...parsedStore.state,
            user,
          };
          localStorage.setItem(
            "dynamic_store",
            JSON.stringify({ state, version: 0 })
          );
        } else {
          localStorage.setItem(
            "dynamic_store",
            JSON.stringify({ state: { user } })
          );
        }
        refresh();
      });
    }
  }, []);
  return <DynamicWidget />;
}
