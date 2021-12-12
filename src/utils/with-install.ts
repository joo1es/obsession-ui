import { App } from 'vue'

type EventShim = {
  new (...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void;
    };
  };
};

export type WithInstall<T> = T & {
  install(app: App, alias?: string[]): void;
} & EventShim;

export function withInstall<T>(options: any, alias?: string[]): WithInstall<T> {
    (options as Record<string, unknown>).install = (app: App) => {
        const { name } = options as any
        app.component(name, options)
        alias?.forEach((everyAlias) => app.component(everyAlias, options))
    }

    return options
}

export const withInstallFunction = <T>(fn: T, name: string) => {
    (fn as Record<string, unknown>).install = (app: any) => {
        app.config.globalProperties[name] = fn
    }

    return fn
}
