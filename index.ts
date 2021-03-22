import { ReactElement } from "react"
import { Injectable } from "./lib/injectable"
import reactElelmentToString from "react-element-to-jsx-string"

export namespace NeuroServer {
    export interface INeuroReactComponent {
        App(): ReactElement
    }

    interface IReactComponentSettings {
        app_root: string,
        injectables?: Array<Injectable.IInjectable>
    }

    class EndComponent {
        constructor(public app_root: string, public content: ReactElement, public injectable?: Array<Injectable.IInjectable>) {}

        generate(): string {
            return `
                ${reactElelmentToString(this.content)}
            `
        }
    }

    export function create_component<T extends INeuroReactComponent>(component: T, settings: IReactComponentSettings) {
        return new EndComponent(settings.app_root, component.App(), settings.injectables)
    }
}