import { BaseApi } from "../BaseApi";

export type WithMutationApi<T extends BaseApi> = {
    [K in keyof T]: T[K] extends (...args: infer A) => infer R
        ? { (...args: A): R; mutation: (args: A) => R }
        : never;
};

export function withMutation<T extends BaseApi>(api: T): WithMutationApi<T> {
    return new Proxy(api, {
        get: (target, property, receiver) => {
            const obj = Reflect.get(target, property, receiver);

            if (typeof obj === "function") {
                return Object.assign((...args: any) => obj.call(api, ...args), {
                    mutation: (args: any) =>
                        (obj as Function).call(api, ...args),
                });
            }

            return obj;
        },
    }) as WithMutationApi<T>;
}
