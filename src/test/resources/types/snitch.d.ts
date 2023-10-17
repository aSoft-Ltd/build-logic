import { kollections } from './kollections'
import { cinematic } from './cinematic'

export declare namespace snitch {
    class Bubble<I, B> {
        get title(): string;
        get icon(): I;
        get body(): B;
        get timeoutSeconds(): number;
        get type(): snitch.Type;
        get actions(): kollections.List<kevlar.Action0<void>>;
    }

    abstract class BubbleBuilder<I, B> extends kevlar.ActionsBuilder<snitch.BubbleBuilder<I, B>, () => void> {
        show(): void;
        withIcon(i: I): snitch.BubbleBuilder<I, B>;
        withBody(b: B): snitch.BubbleBuilder<I, B>;
        withTimeoutSeconds(value: number): snitch.BubbleBuilder<I, B>;
    }

    interface Snitch {
        readonly bubbles: cinematic.Live<kollections.List<snitch.Bubble<Nullable<any>, Nullable<any>>>>;
        makeNewSuccess(title: string): snitch.BubbleBuilder<Nullable<any>, Nullable<any>>;
        makeNewInfo(title: string): snitch.BubbleBuilder<Nullable<any>, Nullable<any>>;
        makeNewWarning(title: string): snitch.BubbleBuilder<Nullable<any>, Nullable<any>>;
        makeNewError(title: string): snitch.BubbleBuilder<Nullable<any>, Nullable<any>>;
        close(title: string): void;
    }

    function makeSnitch(): snitch.Snitch;

    abstract class Type {
        static get Success(): snitch.Type & {
            get name(): "Success";
            get ordinal(): 0;
        };
        static get Info(): snitch.Type & {
            get name(): "Info";
            get ordinal(): 1;
        };
        static get Warning(): snitch.Type & {
            get name(): "Warning";
            get ordinal(): 2;
        };
        static get Error(): snitch.Type & {
            get name(): "Error";
            get ordinal(): 3;
        };
        static values(): Array<snitch.Type>;
        static valueOf(value: string): snitch.Type;
        get name(): "Success" | "Info" | "Warning" | "Error";
        get ordinal(): 0 | 1 | 2 | 3;
    }
}