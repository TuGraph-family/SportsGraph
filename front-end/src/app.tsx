import type { RequestConfig } from "@umijs/max";
import "proxy-polyfill/proxy.min.js";
import React from "react";
import ErrorBoundary from "./components/error-boundary";
import { login } from "./services";
import { resetClientHeight } from "./utils/resizeClientHeight";

export const request: RequestConfig = {
  timeout: 30000,
  // other axios options you want
  errorConfig: {
    errorHandler() {},
    errorThrower() {}
  },
  requestInterceptors: [],
  responseInterceptors: [
    (response: any) => {
      try {
        const { data } = response;
        if (data && data.success && (data.data === null || data.data === "")) {
          return { ...response, data: { ...data, data: {} } };
        }
        if (data && !data.success) {
        }
      } catch (e) {
        console.warn("解析错误", e);
        return response;
      }
      return response;
    }
  ]
};

export async function getInitialState() {
  const initialData = await login();
  return initialData;
}

resetClientHeight();

export function rootContainer(container: JSX.Element) {
  return React.createElement(ErrorBoundary, null, container);
}
