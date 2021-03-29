import fs from "fs"
import path from "path"
import React from "react"
import parse from "html-react-parser"

export namespace Component {
    export interface IComponent {
        app_root: string,
        template: string,
        style: string
    }

    export interface IEndComponent {
        app_root: string,
        parsedTemplate: string,
    }

    export function create_component<T extends new (...args: any[]) => IComponent>(Component: T, args: any[] = []): IEndComponent {
        class EndComponent extends Component implements IEndComponent {
            public parsedTemplate: string

            constructor(...args: any[]) {
                super(...args)
                this.parsedTemplate = this.parseTemplate()
            }

            // ------------------------------------------------------------------------------
            // PARSE NEURO JAVASCRIPT XML-like (.njsx) FILE ^^
            // ------------------------------------------------------------------------------

            private replaser(match: string, _p1: string, p2: string, p3: string, offset: string, _string: string) {
                return `React.createElement('div', null, window.HTMLReactParser(\`${p2
                    .trim()
                    .replace(/(\r\n|\n|\r)/gm,'')
                    .replace(/> *</gm, '><')
                    .replace(/(<Inject)(.*)(\/>)/gm, (_component: string, begin, tag: string, end): string => {
                        const params = tag.match(/({)(.*)(})/gm)
                        return `\${React.createElement(${tag.replace(params ? params[0] : '' , '').trim()}, ${params ? params[0] : null}}`
                    })}\`))`
            }

            private parseTemplate(): string {
                let template = this.template.substring(0, 4) === 'njsx' ? this.template.substring(4) : fs.readFileSync(this.template, 'utf-8')
                template = template.replace(/(@\()([^\@]*)(@)/gm, this.replaser)
                const app = template.substring(
                    template.lastIndexOf(`<App>`) + "App".length + 2,
                    template.lastIndexOf(`</App>`)
                ).trim()
                const script = template.split(
                    template.substring(
                        template.lastIndexOf(app),
                        template.lastIndexOf('</App>') + '</App>'.length
                    )
                ).pop()
                return `
<div id="neuro-${this.app_root}"></div>
<script>
{
${script}

const App = () => {
    ${app}
}

ReactDOM.render(App(), document.getElementById("neuro-${this.app_root}"))


}
</script>
                `
            }
        }

        return new EndComponent(...args)
    }
}

console.log(parse(`<button onClick={setState(state + 1)}>Click me!</button></div>`))