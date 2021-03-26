import { Injectable } from "./injectable"

export namespace Components {
    export interface INeuroReactComponent {
        template: string,
        style: string,

    }

    interface IReactComponentSettings {
        app_root: string,
        injectables?: Array<Injectable.IInjectable>
    }

    export class EndComponent {
        constructor(public app_root: string, public content: string, public injectable?: Array<Injectable.IInjectable>) {}
    }

    export function create_component<T extends INeuroReactComponent>(component: T, settings: IReactComponentSettings): EndComponent {
        return new EndComponent(settings.app_root, component.App(), settings.injectables)
    }
}