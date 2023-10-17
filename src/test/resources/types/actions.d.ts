export declare namespace actions {
    /** @deprecated use kevlar instead */
    interface Action<H> {
        readonly name: string;
        readonly key: string;
        readonly handler: H;
    }

    /** @deprecated use kevlar instead */
    interface Action0<R> extends actions.Action<() => R> {
        invoke(): R;
        readonly name: string;
        readonly key: string;
        readonly handler: () => R;
    }

    /** @deprecated use kevlar instead */
    function action0<T>(name: string, key: string | undefined, handler: () => T): actions.Action0<T>;
    /** @deprecated use kevlar instead */
    function mutableAction0<T>(name: string, key: string | undefined, handler: () => T): actions.MutableAction0<T>;

    /** @deprecated use kevlar instead */
    interface Action1<I, R> extends actions.Action<(p0: I) => R> {
        invoke(arg: I): R;
        readonly name: string;
        readonly key: string;
        readonly handler: (p0: I) => R;
    }

    /** @deprecated use kevlar instead */
    function action1<I, O>(name: string, key: string | undefined, handler: (p0: I) => O): actions.Action1<I, O>;
    /** @deprecated use kevlar instead */
    function mutableAction1I0R<I, O>(name: string, key: string | undefined, handler: (p0: I) => O): actions.MutableAction1<I, O>;

    /** @deprecated use kevlar instead */
    abstract class ActionsBuilder<A, H> {
        on(name: string, key: string | undefined, handler: H): A;
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

    /** @deprecated use kevlar instead */
    interface MutableAction<H> extends actions.Action<H> {
        handler: H;
        readonly name: string;
        readonly key: string;
    }

    /** @deprecated use kevlar instead */
    interface MutableAction0<R> extends actions.Action0<R>, actions.MutableAction<() => R> {
        handler: () => R;
        onInvoked(h: () => R): void;
        invoke(): R;
        readonly name: string;
        readonly key: string;
    }

    /** @deprecated use kevlar instead */
    interface MutableAction1<I, R> extends actions.Action1<I, R>, actions.MutableAction<(p0: I) => R> {
        handler: (p0: I) => R;
        onInvoked(h: (p0: I) => R): void;
        invoke(arg: I): R;
        readonly name: string;
        readonly key: string;
    }
}