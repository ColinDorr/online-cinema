// types/nuxt.d.ts
import "vue";
import { NuxtApp } from "#app";

declare module "#app" {
  interface NuxtApp {
    $trackEvent: (payload: {
      event: string;
      message: string;
      data?: object;
    }) => void;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $trackEvent: (payload: {
      event: string;
      message: string;
      data?: object;
    }) => void;
  }
}
