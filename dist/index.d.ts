declare module "HTMLHandler" {
    class HTMLHandler {
        static stripTags(html: string): string;
    }
    export default HTMLHandler;
}
declare module "Helper" {
    class Helper {
        static preventProp(event: Event): void;
        static isString(input: string): boolean;
        static isPlainObject(val: any): boolean;
        static isBrowser(): boolean;
        static isValidJSON(str: string): boolean;
        static isArray(val: any): boolean;
        static getClickPosition(event: any): {
            x: any;
            y: any;
        };
        static moveArray(arr: any, oldIndex: number, newIndex: number): any;
        static parentContainsClass(element: any, className: string): boolean;
        static getPosition(element: any): {
            x: number;
            y: number;
        };
        static entries(obj: any): any;
    }
    export default Helper;
}
declare module "config" {
    const config: object;
    export default config;
}
declare module "index" {
    class GoatCurry {
        settings: Object;
        helper: Object;
        options: any;
        editor: HTMLElement[];
        contentAreas: Object[];
        version: String;
        outputJSON: any;
        prettyOutput: String;
        modules: any;
        activeContextMenu: Boolean;
        buttonDown: Boolean;
        constructor(settings?: Object);
        static sizzle(selector: string): any;
        beautify(): void;
        bindEvents(): void;
        handleClick(event: Event): any;
        handleInput(event: Event): any;
        addEditableArea(): void;
        handleFocus(event: Event): false | this;
        handleBlur(event: Event): void;
        init(): void;
        garbageCollection(target: HTMLElement): void;
        update(...values: any): void;
        jsonUpdated(): void;
    }
    export default GoatCurry;
}
declare module "modules" {
    class Modules {
        options: Object;
        moduleTypes: any;
        goatcurry: any;
        parentElement: any;
        constructor(GoatCurry: any);
        addModuleType(options: any): any;
        handleMoveClick(event: Event, elem: HTMLElement, GoatCurry: any): void;
        handleOptionClick(event: Event, elem: HTMLElement): this;
        removeButton(e: Event): false | undefined;
        handleBlur(event: Event): void;
        recalculateBlockIndex(): void;
    }
    export default Modules;
}
declare module "ModuleTypes/Header" {
    class Header {
        static render(...args: any): false | undefined;
    }
    export default Header;
}
declare module "ModuleTypes/Image" {
    class Image {
        static render(): void;
    }
    export default Image;
}
declare module "ModuleTypes/Link" {
    export default class Link {
        static render(): void;
    }
}
declare module "ModuleTypes/List" {
    export default class List {
        static render(): void;
    }
}
declare module "ModuleTypes/Paragraph" {
    export default class Paragraph {
        static render(): void;
    }
}
declare module "ModuleTypes/Quote" {
    export default class Quote {
        static render(): void;
    }
}
declare module "ModuleTypes/index" {
    var Header: any;
    var Paragraph: any;
    var Image: any;
    var List: any;
    var Link: any;
    var Quote: any;
    export { Header, Paragraph, Image, List, Link, Quote, };
}
