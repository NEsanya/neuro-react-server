export namespace Injectable {
    export interface IInjectable {
        inject(): string
    }

    interface IInjectOptions {
        app_root: string
    }

    export class EndInject {
        constructor(private inject: IInjectable, private options: IInjectOptions) {}

        public toString(): string {
            return "window.neuro_inject_" + this.options.app_root
        }

        public createInlineInjection(): string {
            return (this.toString() + " = " + "{" + this.inject.inject().trim() + "};").trim()
        }
    }

    export function create_inject<T extends IInjectable>(inject: T, options: IInjectOptions) {
        return new EndInject(inject, options)
    }
}