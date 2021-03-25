export namespace Injectable {
    export interface IInjectable {
        inject():  Object
    }

    interface IInjectOptions {
        app_root: string
    }

    export class EndInject {
        constructor(private inject: IInjectable, private options: IInjectOptions) {
            
        }

        public toString(): string {
            return "window.neuro_inject_" + this.options.app_root
        }

        public createInlineInjection(): string {
            let inject: any = this.inject.inject()
            for (const prop in inject) inject[prop] = inject[prop].toString()
            return `${this.toString()} = ${JSON.stringify(inject)}`
        }
    }

    export function create_inject<T extends IInjectable>(inject: T, options: IInjectOptions) {
        return new EndInject(inject, options)
    }
}