import { ReactElement } from "react"
import { Injectable } from "./injectable"
import reactElelmentToString from "react-element-to-jsx-string"

export namespace Components {
    export interface INeuroReactComponent {
        App(): ReactElement
    }

    interface IReactComponentSettings {
        app_root: string,
        injectables?: Array<Injectable.IInjectable>
    }

    export class EndComponent {
        constructor(public app_root: string, public content: ReactElement, public injectable?: Array<Injectable.IInjectable>) {}

        ContentToString(): string {
            return reactElelmentToString(this.content)
        }
    }

    export function create_component<T extends INeuroReactComponent>(component: T, settings: IReactComponentSettings) {
        return new EndComponent(settings.app_root, component.App(), settings.injectables)
    }
}