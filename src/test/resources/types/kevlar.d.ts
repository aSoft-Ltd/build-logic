import { kollections } from './kollections'

export declare namespace kevlar {
    interface Action<H> {
        readonly name: string;
        readonly key: string;
        readonly asInvoker?: Nullable<kevlar.ActionInvoker<H>>;
        readonly asContainer?: Nullable<kevlar.ActionContainer<H>>;
    }

    interface Action0<R> extends kevlar.Action<() => R> {
        readonly asInvoker?: Nullable<kevlar.Action0Invoker<R>>;
        readonly asContainer?: Nullable<kevlar.Action0Container<R>>;
        readonly name: string;
        readonly key: string;
    }

    function action0<T>(name: string, key: string | undefined, handler: () => T): kevlar.Action0Invoker<T>;
    function action0Container<T>(name: string, key: string | undefined, actions: kollections.List<kevlar.Action0<T>>): kevlar.Action0Container<T>;

    interface Action0Container<R> extends kevlar.Action0<R>, kevlar.ActionContainer<() => R> {
        readonly asInvoker?: Nullable<kevlar.Action0Invoker<R>>;
        readonly asContainer?: Nullable<kevlar.Action0Container<R>>;
        readonly name: string;
        readonly key: string;
        readonly actions: kollections.List<kevlar.Action<() => R>>;
    }

    interface Action0Invoker<R> extends kevlar.Action0<R>, kevlar.ActionInvoker<() => R> {
        invoke(): R;
        readonly asInvoker?: Nullable<kevlar.Action0Invoker<R>>;
        readonly asContainer?: Nullable<kevlar.Action0Container<R>>;
        readonly name: string;
        readonly key: string;
        readonly handler: () => R;
    }

    interface Action1<I, R> extends kevlar.Action<(p0: I) => R> {
        readonly asInvoker?: Nullable<kevlar.Action1Invoker<I, R>>;
        readonly asContainer?: Nullable<kevlar.Action1Container<I, R>>;
        readonly name: string;
        readonly key: string;
    }

    function action1<I, O>(name: string, key: string | undefined, handler: (p0: I) => O): kevlar.Action1Invoker<I, O>;
    function action1Container<I, O>(name: string, key: string | undefined, actions: kollections.List<kevlar.Action1<I, O>>): kevlar.Action1Container<I, O>;

    interface Action1Container<I, R> extends kevlar.Action1<I, R>, kevlar.ActionContainer<(p0: I) => R> {
        readonly asInvoker?: Nullable<kevlar.Action1Invoker<I, R>>;
        readonly asContainer?: Nullable<kevlar.Action1Container<I, R>>;
        readonly name: string;
        readonly key: string;
        readonly actions: kollections.List<kevlar.Action<(p0: I) => R>>;
    }

    interface Action1Invoker<I, R> extends kevlar.Action1<I, R>, kevlar.ActionInvoker<(p0: I) => R> {
        invoke(arg: I): R;
        readonly asInvoker?: Nullable<kevlar.Action1Invoker<I, R>>;
        readonly asContainer?: Nullable<kevlar.Action1Container<I, R>>;
        readonly name: string;
        readonly key: string;
        readonly handler: (p0: I) => R;
    }

    interface ActionContainer<H> extends kevlar.Action<H> {
        readonly actions: kollections.List<kevlar.Action<H>>;
        readonly name: string;
        readonly key: string;
        readonly asInvoker?: Nullable<kevlar.ActionInvoker<H>>;
        readonly asContainer?: Nullable<kevlar.ActionContainer<H>>;
    }

    interface ActionInvoker<H> extends kevlar.Action<H> {
        readonly handler: H;
        readonly name: string;
        readonly key: string;
        readonly asInvoker?: Nullable<kevlar.ActionInvoker<H>>;
        readonly asContainer?: Nullable<kevlar.ActionContainer<H>>;
    }

    abstract class ActionsBuilder<A, H> {
        on(name: string, key: string | undefined, handler: H): A;
        sub(name: string, key: string | undefined, builder: (p0: kevlar.ActionsBuilder<A, H>) => void): void;
        subActions(name: string, key: string | undefined, actions: kollections.List<A>): void;
        onAdd(handler: H): A;
        onCreate(handler: H): A;
        onEdit(handler: H): A;
        onUpdate(handler: H): A;
        onDuplicate(handler: H): A;
        onAddAll(handler: H): A;
        onAddAllItems(col: any/* kotlin.collections.Collection<Nullable<any>> */, handler: H): A;
        onView(handler: H): A;
        onDelete(handler: H): A;
        onDeleteAll(handler: H): A;
        onDeleteAllItems(col: any/* kotlin.collections.Collection<Nullable<any>> */, handler: H): A;
        onCancel(handler: H): A;
        onOk(handler: H): A;
        onYes(handler: H): A;
        onNo(handler: H): A;
        onRetry(handler: H): A;
        onGoBack(handler: H): A;
    }
}