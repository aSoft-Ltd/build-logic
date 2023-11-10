import { FC, PropsWithChildren, ReactNode } from 'react'
interface Props { }


type Nullable<T> = T | null | undefined
export declare namespace kollections {
    interface Collection<E> extends kollections.CollectionLike<E>, kollections.FunctionalCollection<E> {
        isEmpty(): boolean;
        readonly size: number;
        contains(element: E): boolean;
        first(): E;
        firstOrNull(): Nullable<E>;
        joinToString(separator: string, transformer: (p0: E) => string): string;
        iterator(): any/* kotlin.collections.Iterator<E> */;
        toArray(): Array<E>;
        count(): number;
        filter(predicate: (p0: E) => boolean): kollections.List<E>;
        forEach(lambda: (p0: E) => void): void;
        forEachWithIndex(lambda: (p0: E, p1: number) => void): void;
        map<R>(transform: (p0: E) => R): kollections.List<R>;
        mapToArray<R>(transform: (p0: E) => R): Array<R>;
        mapToArrayWithIndex<R>(transform: (p0: E, p1: number) => R): Array<R>;
        mapWithIndex<R>(transform: (p0: E, p1: number) => R): kollections.List<R>;
        associate<K2, V2>(transformer: (p0: E) => kollections.MapEntry<K2, V2>): kollections.Map<K2, V2>;
    }
}
export declare namespace kollections {
    interface CollectionLike<E> extends kollections.Iterable<E>/*, kotlin.collections.Collection<E> */ {
        first(): E;
        firstOrNull(): Nullable<E>;
        joinToString(separator?: string, transformer?: (p0: E) => string): string;
        toArray(): Array<E>;
        count(): number;
    }
}
export declare namespace kollections {
    interface FunctionalCollection<E> extends kollections.Iterable<E>/*, kotlin.collections.Collection<E> */ {
        filter(predicate: (p0: E) => boolean): kollections.List<E>;
        forEach(lambda: (p0: E) => void): void;
        forEachWithIndex(lambda: (p0: E, p1: number) => void): void;
        map<R>(transform: (p0: E) => R): kollections.List<R>;
        mapToArray<R>(transform: (p0: E) => R): Array<R>;
        mapToArrayWithIndex<R>(transform: (p0: E, p1: number) => R): Array<R>;
        mapWithIndex<R>(transform: (p0: E, p1: number) => R): kollections.List<R>;
        associate<K2, V2>(transformer: (p0: E) => kollections.MapEntry<K2, V2>): kollections.Map<K2, V2>;
        toArray(): Array<E>;
        count(): number;
    }
}
export declare namespace kollections {
    interface Graph<N, E> extends kollections.Collection<N> {
        isConnected(node1: N, node2: N): boolean;
        edge(from: N, to: N): Nullable<E>;
        loops(): kollections.List<kollections.Set<N>>;
        uniqueLoops(): kollections.List<kollections.Set<N>>;
        paths(from: N, to: N): kollections.List<kollections.Set<N>>;
        hasPath(from: N, to: N): boolean;
        isEmpty(): boolean;
        readonly size: number;
        contains(element: N): boolean;
        first(): N;
        firstOrNull(): Nullable<N>;
        joinToString(separator: string, transformer: (p0: N) => string): string;
        iterator(): any/* kotlin.collections.Iterator<N> */;
        toArray(): Array<N>;
        count(): number;
        filter(predicate: (p0: N) => boolean): kollections.List<N>;
        forEach(lambda: (p0: N) => void): void;
        forEachWithIndex(lambda: (p0: N, p1: number) => void): void;
        map<R>(transform: (p0: N) => R): kollections.List<R>;
        mapToArray<R>(transform: (p0: N) => R): Array<R>;
        mapToArrayWithIndex<R>(transform: (p0: N, p1: number) => R): Array<R>;
        mapWithIndex<R>(transform: (p0: N, p1: number) => R): kollections.List<R>;
        associate<K2, V2>(transformer: (p0: N) => kollections.MapEntry<K2, V2>): kollections.Map<K2, V2>;
    }
}
export declare namespace kollections {
    function undirectedGraph<N, E>(nodes: Array<N>): kollections.MutableGraph<N, E>;
    function directedGraphOf<N, E>(nodes: Array<N>): kollections.MutableGraph<N, E>;
    function buildDirectedGraph<N, E>(nodes: Array<N>, builder: (p0: kollections.MutableGraph<N, E>) => void): kollections.MutableGraph<N, E>;
    function graphOf<N, E>(nodes: Array<N>): kollections.Graph<N, E>;
}
export declare namespace kollections {
    interface LinearlyTraversable<E> {
        current(): Nullable<E>;
        forward(): Nullable<E>;
        backward(): Nullable<E>;
        canGoForward(): boolean;
        canGoBackward(): boolean;
        canGo(steps: number): boolean;
        go(steps: number): Nullable<E>;
    }
}
export declare namespace kollections {
    interface LinearlyTraversableStack<E> extends kollections.Stack<E>, kollections.LinearlyTraversable<E> {
        insertTrimmingTop(element: E): void;
        insertTrimmingBottom(element: E): void;
        insert(element: E): void;
        top(): Nullable<E>;
        push(element: E): void;
        pop(): Nullable<E>;
        canPop(): boolean;
        toList(): kollections.List<E>;
        isEmpty(): boolean;
        readonly size: number;
        contains(element: E): boolean;
        first(): E;
        firstOrNull(): Nullable<E>;
        joinToString(separator: string, transformer: (p0: E) => string): string;
        iterator(): any/* kotlin.collections.Iterator<E> */;
        toArray(): Array<E>;
        count(): number;
        filter(predicate: (p0: E) => boolean): kollections.List<E>;
        forEach(lambda: (p0: E) => void): void;
        forEachWithIndex(lambda: (p0: E, p1: number) => void): void;
        map<R>(transform: (p0: E) => R): kollections.List<R>;
        mapToArray<R>(transform: (p0: E) => R): Array<R>;
        mapToArrayWithIndex<R>(transform: (p0: E, p1: number) => R): Array<R>;
        mapWithIndex<R>(transform: (p0: E, p1: number) => R): kollections.List<R>;
        associate<K2, V2>(transformer: (p0: E) => kollections.MapEntry<K2, V2>): kollections.Map<K2, V2>;
        current(): Nullable<E>;
        forward(): Nullable<E>;
        backward(): Nullable<E>;
        canGoForward(): boolean;
        canGoBackward(): boolean;
        canGo(steps: number): boolean;
        go(steps: number): Nullable<E>;
    }
}
export declare namespace kollections {
    function traversableStackOf<E>(): kollections.LinearlyTraversableStack<E>;
}
export declare namespace kollections {
    interface List<E> extends kollections.Collection<E>/*, kotlin.collections.List<E> */ {
        isEmpty(): boolean;
        readonly size: number;
        contains(element: E): boolean;
        first(): E;
        firstOrNull(): Nullable<E>;
        joinToString(separator: string, transformer: (p0: E) => string): string;
        iterator(): any/* kotlin.collections.Iterator<E> */;
        toArray(): Array<E>;
        count(): number;
        filter(predicate: (p0: E) => boolean): kollections.List<E>;
        forEach(lambda: (p0: E) => void): void;
        forEachWithIndex(lambda: (p0: E, p1: number) => void): void;
        map<R>(transform: (p0: E) => R): kollections.List<R>;
        mapToArray<R>(transform: (p0: E) => R): Array<R>;
        mapToArrayWithIndex<R>(transform: (p0: E, p1: number) => R): Array<R>;
        mapWithIndex<R>(transform: (p0: E, p1: number) => R): kollections.List<R>;
        associate<K2, V2>(transformer: (p0: E) => kollections.MapEntry<K2, V2>): kollections.Map<K2, V2>;
    }
}
export declare namespace kollections {
    function emptyMutableList<E>(): kollections.MutableList<E>;
    function mutableListOf<E>(elements: Array<E>): kollections.MutableList<E>;
    function emptyListOf<E>(): kollections.List<E>;
    function emptyList<E>(): kollections.List<E>;
    function listOf<E>(elements: Array<E>): kollections.List<E>;
}
export declare namespace kollections {
    interface Map<K, V> extends kollections.MapLike<K, V>, kollections.Collection<kollections.MapEntry<K, V>> {
        readonly size: number;
        readonly keys: kollections.Set<K>;
        readonly values: kollections.Collection<V>;
        readonly pairs: kollections.Set<kollections.MapEntry<K, V>>;
        containsKey(key: K): boolean;
        containsValue(value: V): boolean;
        get(key: K): Nullable<V>;
        getValue(key: K): V;
        isEmpty(): boolean;
        contains(element: kollections.MapEntry<K, V>): boolean;
        first(): kollections.MapEntry<K, V>;
        firstOrNull(): Nullable<kollections.MapEntry<K, V>>;
        joinToString(separator: string, transformer: (p0: kollections.MapEntry<K, V>) => string): string;
        iterator(): any/* kotlin.collections.Iterator<kollections.MapEntry<K, V>> */;
        toArray(): Array<kollections.MapEntry<K, V>>;
        count(): number;
        filter(predicate: (p0: kollections.MapEntry<K, V>) => boolean): kollections.List<kollections.MapEntry<K, V>>;
        forEach(lambda: (p0: kollections.MapEntry<K, V>) => void): void;
        forEachWithIndex(lambda: (p0: kollections.MapEntry<K, V>, p1: number) => void): void;
        map<R>(transform: (p0: kollections.MapEntry<K, V>) => R): kollections.List<R>;
        mapToArray<R>(transform: (p0: kollections.MapEntry<K, V>) => R): Array<R>;
        mapToArrayWithIndex<R>(transform: (p0: kollections.MapEntry<K, V>, p1: number) => R): Array<R>;
        mapWithIndex<R>(transform: (p0: kollections.MapEntry<K, V>, p1: number) => R): kollections.List<R>;
        associate<K2, V2>(transformer: (p0: kollections.MapEntry<K, V>) => kollections.MapEntry<K2, V2>): kollections.Map<K2, V2>;
    }
}
export declare namespace kollections {
    function pairOf<K, V>(key: K, value: V): kollections.MapEntry<K, V>;
    function to<K, V>(_this_: K, value: V): kollections.MapEntry<K, V>;
    function mutableMapOf<K, V>(pairs: Array<kollections.MapEntry<K, V>>): kollections.MutableMap<K, V>;
    function emptyMapOf<K, V>(): kollections.Map<K, V>;
    function emptyMap<K, V>(): kollections.Map<K, V>;
    function mapOf<K, V>(pairs: Array<kollections.MapEntry<K, V>>): kollections.Map<K, V>;
}
export declare namespace kollections {
    interface MapEntry<K, V> /* extends kotlin.collections.Map.Entry<K, V> */ {
        readonly k: K;
        readonly v: V;
    }
}
export declare namespace kollections {
    interface MapLike<K, V> extends kollections.CollectionLike<kollections.MapEntry<K, V>>/*, kotlin.collections.Map<K, V> */ {
        readonly pairs: kollections.Set<kollections.MapEntry<K, V>>;
        getValue(key: K): V;
        isEmpty(): boolean;
        contains(element: kollections.MapEntry<K, V>): boolean;
        first(): kollections.MapEntry<K, V>;
        firstOrNull(): Nullable<kollections.MapEntry<K, V>>;
        joinToString(separator: string, transformer: (p0: kollections.MapEntry<K, V>) => string): string;
        iterator(): any/* kotlin.collections.Iterator<kollections.MapEntry<K, V>> */;
        toArray(): Array<kollections.MapEntry<K, V>>;
        count(): number;
    }
}
export declare namespace kollections {
    interface MutableCollection<E> extends kollections.MutableCollectionLike<E>, kollections.Collection<E> {
        add(element: E): boolean;
        remove(element: E): boolean;
        clear(): void;
        iterator(): any/* kotlin.collections.MutableIterator<E> */;
        readonly size: number;
        isEmpty(): boolean;
        contains(element: E): boolean;
        first(): E;
        firstOrNull(): Nullable<E>;
        joinToString(separator: string, transformer: (p0: E) => string): string;
        toArray(): Array<E>;
        count(): number;
        filter(predicate: (p0: E) => boolean): kollections.List<E>;
        forEach(lambda: (p0: E) => void): void;
        forEachWithIndex(lambda: (p0: E, p1: number) => void): void;
        map<R>(transform: (p0: E) => R): kollections.List<R>;
        mapToArray<R>(transform: (p0: E) => R): Array<R>;
        mapToArrayWithIndex<R>(transform: (p0: E, p1: number) => R): Array<R>;
        mapWithIndex<R>(transform: (p0: E, p1: number) => R): kollections.List<R>;
        associate<K2, V2>(transformer: (p0: E) => kollections.MapEntry<K2, V2>): kollections.Map<K2, V2>;
    }
}
export declare namespace kollections {
    interface MutableCollectionLike<E> extends kollections.CollectionLike<E>/*, kotlin.collections.MutableCollection<E> */ {
        iterator(): any/* kotlin.collections.MutableIterator<E> */;
        readonly size: number;
        isEmpty(): boolean;
        contains(element: E): boolean;
        first(): E;
        firstOrNull(): Nullable<E>;
        joinToString(separator: string, transformer: (p0: E) => string): string;
        toArray(): Array<E>;
        count(): number;
    }
}
export declare namespace kollections {
    interface MutableGraph<N, E> extends kollections.MutableCollection<N>, kollections.Graph<N, E> {
        connect(from: N, to: N, _with: E): void;
        add(element: N): boolean;
        remove(element: N): boolean;
        clear(): void;
        iterator(): any/* kotlin.collections.MutableIterator<N> */;
        readonly size: number;
        isEmpty(): boolean;
        contains(element: N): boolean;
        first(): N;
        firstOrNull(): Nullable<N>;
        joinToString(separator: string, transformer: (p0: N) => string): string;
        toArray(): Array<N>;
        count(): number;
        filter(predicate: (p0: N) => boolean): kollections.List<N>;
        forEach(lambda: (p0: N) => void): void;
        forEachWithIndex(lambda: (p0: N, p1: number) => void): void;
        map<R>(transform: (p0: N) => R): kollections.List<R>;
        mapToArray<R>(transform: (p0: N) => R): Array<R>;
        mapToArrayWithIndex<R>(transform: (p0: N, p1: number) => R): Array<R>;
        mapWithIndex<R>(transform: (p0: N, p1: number) => R): kollections.List<R>;
        associate<K2, V2>(transformer: (p0: N) => kollections.MapEntry<K2, V2>): kollections.Map<K2, V2>;
        isConnected(node1: N, node2: N): boolean;
        edge(from: N, to: N): Nullable<E>;
        loops(): kollections.List<kollections.Set<N>>;
        uniqueLoops(): kollections.List<kollections.Set<N>>;
        paths(from: N, to: N): kollections.List<kollections.Set<N>>;
        hasPath(from: N, to: N): boolean;
    }
}
export declare namespace kollections {
    interface MutableList<E> extends kollections.List<E>, kollections.MutableCollection<E>/*, kotlin.collections.MutableList<E> */ {
        get(index: number): E;
        indexOf(element: E): number;
        lastIndexOf(element: E): number;
        isEmpty(): boolean;
        readonly size: number;
        contains(element: E): boolean;
        first(): E;
        firstOrNull(): Nullable<E>;
        joinToString(separator: string, transformer: (p0: E) => string): string;
        iterator(): any/* kotlin.collections.MutableIterator<E> */;
        toArray(): Array<E>;
        count(): number;
        filter(predicate: (p0: E) => boolean): kollections.List<E>;
        forEach(lambda: (p0: E) => void): void;
        forEachWithIndex(lambda: (p0: E, p1: number) => void): void;
        map<R>(transform: (p0: E) => R): kollections.List<R>;
        mapToArray<R>(transform: (p0: E) => R): Array<R>;
        mapToArrayWithIndex<R>(transform: (p0: E, p1: number) => R): Array<R>;
        mapWithIndex<R>(transform: (p0: E, p1: number) => R): kollections.List<R>;
        associate<K2, V2>(transformer: (p0: E) => kollections.MapEntry<K2, V2>): kollections.Map<K2, V2>;
        add(element: E): boolean;
        remove(element: E): boolean;
        clear(): void;
    }
}
export declare namespace kollections {
    interface MutableMap<K, V> extends kollections.MutableMapLike<K, V>, kollections.Map<K, V> {
        readonly size: number;
        readonly keys: kollections.MutableSet<K>;
        readonly values: kollections.MutableCollection<V>;
        put(key: K, value: V): Nullable<V>;
        clear(): void;
        remove(key: K): Nullable<V>;
        set(key: K, value: V): void;
        readonly pairs: kollections.Set<kollections.MapEntry<K, V>>;
        containsKey(key: K): boolean;
        containsValue(value: V): boolean;
        get(key: K): Nullable<V>;
        getValue(key: K): V;
        isEmpty(): boolean;
        contains(element: kollections.MapEntry<K, V>): boolean;
        first(): kollections.MapEntry<K, V>;
        firstOrNull(): Nullable<kollections.MapEntry<K, V>>;
        joinToString(separator: string, transformer: (p0: kollections.MapEntry<K, V>) => string): string;
        iterator(): any/* kotlin.collections.Iterator<kollections.MapEntry<K, V>> */;
        toArray(): Array<kollections.MapEntry<K, V>>;
        count(): number;
        filter(predicate: (p0: kollections.MapEntry<K, V>) => boolean): kollections.List<kollections.MapEntry<K, V>>;
        forEach(lambda: (p0: kollections.MapEntry<K, V>) => void): void;
        forEachWithIndex(lambda: (p0: kollections.MapEntry<K, V>, p1: number) => void): void;
        map<R>(transform: (p0: kollections.MapEntry<K, V>) => R): kollections.List<R>;
        mapToArray<R>(transform: (p0: kollections.MapEntry<K, V>) => R): Array<R>;
        mapToArrayWithIndex<R>(transform: (p0: kollections.MapEntry<K, V>, p1: number) => R): Array<R>;
        mapWithIndex<R>(transform: (p0: kollections.MapEntry<K, V>, p1: number) => R): kollections.List<R>;
        associate<K2, V2>(transformer: (p0: kollections.MapEntry<K, V>) => kollections.MapEntry<K2, V2>): kollections.Map<K2, V2>;
    }
}
export declare namespace kollections {
    interface MutableMapLike<K, V> extends kollections.MapLike<K, V>/*, kotlin.collections.MutableMap<K, V> */ {
        set(key: K, value: V): void;
        readonly pairs: kollections.Set<kollections.MapEntry<K, V>>;
        containsKey(key: K): boolean;
        containsValue(value: V): boolean;
        get(key: K): Nullable<V>;
        getValue(key: K): V;
        isEmpty(): boolean;
        contains(element: kollections.MapEntry<K, V>): boolean;
        first(): kollections.MapEntry<K, V>;
        firstOrNull(): Nullable<kollections.MapEntry<K, V>>;
        joinToString(separator: string, transformer: (p0: kollections.MapEntry<K, V>) => string): string;
        iterator(): any/* kotlin.collections.Iterator<kollections.MapEntry<K, V>> */;
        toArray(): Array<kollections.MapEntry<K, V>>;
        count(): number;
    }
}
export declare namespace kollections {
    interface MutableSet<E> extends kollections.Set<E>, kollections.MutableCollection<E>/*, kotlin.collections.MutableSet<E> */ {
        isEmpty(): boolean;
        readonly size: number;
        contains(element: E): boolean;
        first(): E;
        firstOrNull(): Nullable<E>;
        joinToString(separator: string, transformer: (p0: E) => string): string;
        iterator(): any/* kotlin.collections.MutableIterator<E> */;
        toArray(): Array<E>;
        count(): number;
        filter(predicate: (p0: E) => boolean): kollections.List<E>;
        forEach(lambda: (p0: E) => void): void;
        forEachWithIndex(lambda: (p0: E, p1: number) => void): void;
        map<R>(transform: (p0: E) => R): kollections.List<R>;
        mapToArray<R>(transform: (p0: E) => R): Array<R>;
        mapToArrayWithIndex<R>(transform: (p0: E, p1: number) => R): Array<R>;
        mapWithIndex<R>(transform: (p0: E, p1: number) => R): kollections.List<R>;
        associate<K2, V2>(transformer: (p0: E) => kollections.MapEntry<K2, V2>): kollections.Map<K2, V2>;
        add(element: E): boolean;
        remove(element: E): boolean;
        clear(): void;
    }
}
export declare namespace kollections {
    interface Set<E> extends kollections.Collection<E>/*, kotlin.collections.Set<E> */ {
        isEmpty(): boolean;
        readonly size: number;
        contains(element: E): boolean;
        first(): E;
        firstOrNull(): Nullable<E>;
        joinToString(separator: string, transformer: (p0: E) => string): string;
        iterator(): any/* kotlin.collections.Iterator<E> */;
        toArray(): Array<E>;
        count(): number;
        filter(predicate: (p0: E) => boolean): kollections.List<E>;
        forEach(lambda: (p0: E) => void): void;
        forEachWithIndex(lambda: (p0: E, p1: number) => void): void;
        map<R>(transform: (p0: E) => R): kollections.List<R>;
        mapToArray<R>(transform: (p0: E) => R): Array<R>;
        mapToArrayWithIndex<R>(transform: (p0: E, p1: number) => R): Array<R>;
        mapWithIndex<R>(transform: (p0: E, p1: number) => R): kollections.List<R>;
        associate<K2, V2>(transformer: (p0: E) => kollections.MapEntry<K2, V2>): kollections.Map<K2, V2>;
    }
}
export declare namespace kollections {
    function emptyMutableSet<E>(): kollections.MutableSet<E>;
    function mutableSetOf<E>(elements: Array<E>): kollections.MutableSet<E>;
    function emptySetOf<E>(): kollections.Set<E>;
    function emptySet<E>(): kollections.Set<never>;
    function setOf<E>(elements: Array<E>): kollections.Set<E>;
}
export declare namespace kollections {
    interface Stack<E> extends kollections.Collection<E> {
        top(): Nullable<E>;
        push(element: E): void;
        pop(): Nullable<E>;
        canPop(): boolean;
        toList(): kollections.List<E>;
        isEmpty(): boolean;
        readonly size: number;
        contains(element: E): boolean;
        first(): E;
        firstOrNull(): Nullable<E>;
        joinToString(separator: string, transformer: (p0: E) => string): string;
        iterator(): any/* kotlin.collections.Iterator<E> */;
        toArray(): Array<E>;
        count(): number;
        filter(predicate: (p0: E) => boolean): kollections.List<E>;
        forEach(lambda: (p0: E) => void): void;
        forEachWithIndex(lambda: (p0: E, p1: number) => void): void;
        map<R>(transform: (p0: E) => R): kollections.List<R>;
        mapToArray<R>(transform: (p0: E) => R): Array<R>;
        mapToArrayWithIndex<R>(transform: (p0: E, p1: number) => R): Array<R>;
        mapWithIndex<R>(transform: (p0: E, p1: number) => R): kollections.List<R>;
        associate<K2, V2>(transformer: (p0: E) => kollections.MapEntry<K2, V2>): kollections.Map<K2, V2>;
    }
}
export declare namespace kollections {
    interface Iterable<E> /* extends kotlin.collections.Iterable<E> */ {
        toArray(): Array<E>;
        count(): number;
    }
}
export declare namespace sentinel.params {
    class UserAccountParams {
        get loginId(): string;
        get password(): string;
        get registrationToken(): string;
    }
}
export declare namespace sentinel.params {
    class VerificationParams {
        get email(): string;
        get token(): string;
    }
}
export declare namespace identifier {
    interface Deletable {
        readonly deleted: boolean;
    }
}
export declare namespace identifier {
    class Name /* implements kotlin.CharSequence */ {
        get value(): string;
        get full(): string;
        get first(): string;
        get middle(): string;
        get last(): string;
        get firstLast(): string;
        randomized(): identifier.Name;
    }
}
export declare namespace identifier {
    interface Named {
        readonly name: string;
    }
}
export declare namespace identifier {
    class Password /* implements kotlin.CharSequence */ {
        get value(): string;
        static from(value: any): identifier.Password;
        get clearText(): string;
    }
}
export declare namespace identifier {
    const UNSET: string;
}
export declare namespace identifier {
    interface Unique {
        readonly uid: string;
    }
}
export declare namespace identifier {
    interface Comm {
        readonly verified: boolean;
        readonly userId: string;
        readonly value: string;
    }
}
export declare namespace identifier {
    interface Email extends identifier.Comm {
        readonly parts: Array<string>;
        readonly identity: string;
        readonly domain: string;
        readonly verified: boolean;
        readonly userId: string;
        readonly value: string;
    }
}
export declare namespace identifier {
    interface Phone extends identifier.Comm {
        readonly verified: boolean;
        readonly userId: string;
        readonly value: string;
    }
}
export declare namespace identifier {
    class UserEmail implements identifier.Comm {
        get value(): string;
        get userId(): string;
        get verified(): boolean;
        asPrimitiveEmail(): identifier.Email;
    }
}
export declare namespace identifier {
    class UserPhone implements identifier.Comm {
        get value(): string;
        get userId(): string;
        get verified(): boolean;
        get whatsapp(): boolean;
        asPrimitivePhone(): identifier.Phone;
    }
}
export declare namespace koncurrent {
    const Executors: {
        default(): any/* koncurrent.Executor */;
    };
}
export declare namespace koncurrent {
    const SetTimeoutExecutor: {
    } & any/* koncurrent.Executor */;
}
export declare namespace kase {
    interface Possible<T> {
        valueOrThrowException(exp: Error): T;
        getOrThrowException(exp: Error): T;
        valueOrThrowMessage(msg: string): T;
        getOrThrowMessage(msg: string): T;
        valueOrThrow(): T;
        getOrThrow(): T;
        valueOr(_default: T): T;
        getOr(_default: T): T;
        valueOrNull(): Nullable<T>;
        getOrNull(): Nullable<T>;
        exists(): boolean;
    }
}
export declare namespace actions {
    /** @deprecated use kevlar instead */
    interface Action<H> {
        readonly name: string;
        readonly key: string;
        readonly handler: H;
    }
}
export declare namespace actions {
    /** @deprecated use kevlar instead */
    interface Action0<R> extends actions.Action<() => R> {
        invoke(): R;
        readonly name: string;
        readonly key: string;
        readonly handler: () => R;
    }
}
export declare namespace actions {
    /** @deprecated use kevlar instead */
    function action0<T>(name: string, key: string | undefined, handler: () => T): actions.Action0<T>;
    /** @deprecated use kevlar instead */
    function mutableAction0<T>(name: string, key: string | undefined, handler: () => T): actions.MutableAction0<T>;
}
export declare namespace actions {
    /** @deprecated use kevlar instead */
    interface Action1<I, R> extends actions.Action<(p0: I) => R> {
        invoke(arg: I): R;
        readonly name: string;
        readonly key: string;
        readonly handler: (p0: I) => R;
    }
}
export declare namespace actions {
    /** @deprecated use kevlar instead */
    function action1<I, O>(name: string, key: string | undefined, handler: (p0: I) => O): actions.Action1<I, O>;
    /** @deprecated use kevlar instead */
    function mutableAction1I0R<I, O>(name: string, key: string | undefined, handler: (p0: I) => O): actions.MutableAction1<I, O>;
}
export declare namespace actions {
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
}
export declare namespace actions {
    /** @deprecated use kevlar instead */
    interface MutableAction<H> extends actions.Action<H> {
        handler: H;
        readonly name: string;
        readonly key: string;
    }
}
export declare namespace actions {
    /** @deprecated use kevlar instead */
    interface MutableAction0<R> extends actions.Action0<R>, actions.MutableAction<() => R> {
        handler: () => R;
        onInvoked(h: () => R): void;
        invoke(): R;
        readonly name: string;
        readonly key: string;
    }
}
export declare namespace actions {
    /** @deprecated use kevlar instead */
    interface MutableAction1<I, R> extends actions.Action1<I, R>, actions.MutableAction<(p0: I) => R> {
        handler: (p0: I) => R;
        onInvoked(h: (p0: I) => R): void;
        invoke(arg: I): R;
        readonly name: string;
        readonly key: string;
    }
}
export declare namespace kevlar {
    interface Action<H> {
        readonly name: string;
        readonly key: string;
        readonly asInvoker?: Nullable<kevlar.ActionInvoker<H>>;
        readonly asContainer?: Nullable<kevlar.ActionContainer<H>>;
    }
}
export declare namespace kevlar {
    interface Action0<R> extends kevlar.Action<() => R> {
        readonly asInvoker?: Nullable<kevlar.Action0Invoker<R>>;
        readonly asContainer?: Nullable<kevlar.Action0Container<R>>;
        readonly name: string;
        readonly key: string;
    }
}
export declare namespace kevlar {
    function action0<T>(name: string, key: string | undefined, handler: () => T): kevlar.Action0Invoker<T>;
    function action0Container<T>(name: string, key: string | undefined, actions: kollections.List<kevlar.Action0<T>>): kevlar.Action0Container<T>;
}
export declare namespace kevlar {
    interface Action0Container<R> extends kevlar.Action0<R>, kevlar.ActionContainer<() => R> {
        readonly asInvoker?: Nullable<kevlar.Action0Invoker<R>>;
        readonly asContainer?: Nullable<kevlar.Action0Container<R>>;
        readonly name: string;
        readonly key: string;
        readonly actions: kollections.List<kevlar.Action<() => R>>;
    }
}
export declare namespace kevlar {
    interface Action0Invoker<R> extends kevlar.Action0<R>, kevlar.ActionInvoker<() => R> {
        invoke(): R;
        readonly asInvoker?: Nullable<kevlar.Action0Invoker<R>>;
        readonly asContainer?: Nullable<kevlar.Action0Container<R>>;
        readonly name: string;
        readonly key: string;
        readonly handler: () => R;
    }
}
export declare namespace kevlar {
    interface Action1<I, R> extends kevlar.Action<(p0: I) => R> {
        readonly asInvoker?: Nullable<kevlar.Action1Invoker<I, R>>;
        readonly asContainer?: Nullable<kevlar.Action1Container<I, R>>;
        readonly name: string;
        readonly key: string;
    }
}
export declare namespace kevlar {
    function action1<I, O>(name: string, key: string | undefined, handler: (p0: I) => O): kevlar.Action1Invoker<I, O>;
    function action1Container<I, O>(name: string, key: string | undefined, actions: kollections.List<kevlar.Action1<I, O>>): kevlar.Action1Container<I, O>;
}
export declare namespace kevlar {
    interface Action1Container<I, R> extends kevlar.Action1<I, R>, kevlar.ActionContainer<(p0: I) => R> {
        readonly asInvoker?: Nullable<kevlar.Action1Invoker<I, R>>;
        readonly asContainer?: Nullable<kevlar.Action1Container<I, R>>;
        readonly name: string;
        readonly key: string;
        readonly actions: kollections.List<kevlar.Action<(p0: I) => R>>;
    }
}
export declare namespace kevlar {
    interface Action1Invoker<I, R> extends kevlar.Action1<I, R>, kevlar.ActionInvoker<(p0: I) => R> {
        invoke(arg: I): R;
        readonly asInvoker?: Nullable<kevlar.Action1Invoker<I, R>>;
        readonly asContainer?: Nullable<kevlar.Action1Container<I, R>>;
        readonly name: string;
        readonly key: string;
        readonly handler: (p0: I) => R;
    }
}
export declare namespace kevlar {
    interface ActionContainer<H> extends kevlar.Action<H> {
        readonly actions: kollections.List<kevlar.Action<H>>;
        readonly name: string;
        readonly key: string;
        readonly asInvoker?: Nullable<kevlar.ActionInvoker<H>>;
        readonly asContainer?: Nullable<kevlar.ActionContainer<H>>;
    }
}
export declare namespace kevlar {
    interface ActionInvoker<H> extends kevlar.Action<H> {
        readonly handler: H;
        readonly name: string;
        readonly key: string;
        readonly asInvoker?: Nullable<kevlar.ActionInvoker<H>>;
        readonly asContainer?: Nullable<kevlar.ActionContainer<H>>;
    }
}
export declare namespace kevlar {
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
export declare namespace kase {
    class Executing implements kase.ExecutorState<never> {
        get message(): string;
        get progress(): kase.progress.ProgressState;
        get data(): Nullable<never>;
        get asPending(): Nullable<never>;
        get asExecuting(): kase.Executing;
        get asSuccess(): Nullable<never>;
        get asFailure(): Nullable<never>;
    }
}
export declare namespace kase {
    interface ExecutorState<D> extends kase.State<D>, kase.CanPend, kase.CanExecute, kase.CanSucceed<D>, kase.CanFail<D> {
        readonly data?: Nullable<D>;
        readonly asPending?: Nullable<typeof kase.Pending>;
        readonly asExecuting?: Nullable<kase.Executing>;
        readonly asSuccess?: Nullable<kase.Success<D>>;
        readonly asFailure?: Nullable<kase.Failure<D>>;
    }
}
export declare namespace kase {
    class Failure<D> /* extends kase.internal.AbstractPossible<D> */ implements kase.Possible<D>, kase.LazyState<D>, kase.Result<D>, kase.ExecutorState<D> {
        get cause(): Error;
        get message(): string;
        get data(): Nullable<D>;
        get actions(): any/* kotlin.collections.List<kevlar.Action0<void>> */;
        get asPending(): Nullable<never>;
        get asLoading(): Nullable<never>;
        get asExecuting(): Nullable<never>;
        get asSuccess(): Nullable<never>;
        get asFailure(): kase.Failure<D>;
        map<R>(transform: (p0: D) => R): kase.Failure<R>;
        catch(resolver: (p0: Error) => D): kase.Result<D>;
        andCatch(resolver: (p0: Error) => kase.Result<D>): kase.Result<D>;
        exists(): boolean;
        valueOr(_default: D): D;
        valueOrThrow(): D;
        valueOrThrowException(exp: Error): D;
        valueOrNull(): Nullable<D>;
        valueOrThrowMessage(msg: string): D;
        onSuccess(callback: (p0: D) => void): kase.Failure<D>;
        onFailure(callback: (p0: Error) => void): kase.Failure<D>;
        getOrThrowException(exp: Error): D;
        getOrThrowMessage(msg: string): D;
        getOrThrow(): D;
        getOr(_default: D): D;
        getOrNull(): Nullable<D>;
    }
}
export declare namespace kase {
    interface LazyState<D> extends kase.State<D>, kase.CanPend, kase.CanLoad<D>, kase.CanSucceed<D>, kase.CanFail<D> {
        readonly data?: Nullable<D>;
        readonly asPending?: Nullable<typeof kase.Pending>;
        readonly asLoading?: Nullable<kase.Loading<D>>;
        readonly asSuccess?: Nullable<kase.Success<D>>;
        readonly asFailure?: Nullable<kase.Failure<D>>;
    }
}
export declare namespace kase {
    class Loading<D> implements kase.LazyState<D> {
        get message(): string;
        get data(): Nullable<D>;
        get progress(): kase.progress.ProgressState;
        get asPending(): Nullable<never>;
        get asLoading(): kase.Loading<D>;
        get asSuccess(): Nullable<never>;
        get asFailure(): Nullable<never>;
    }
}
export declare namespace kase {
    const Pending: {
        get data(): Nullable<never>;
        get asPending(): typeof kase.Pending;
        get asLoading(): Nullable<never>;
        get asExecuting(): Nullable<never>;
        get asSuccess(): Nullable<never>;
        get asFailure(): Nullable<never>;
    } & kase.LazyState<never> & kase.ExecutorState<never>;
}
export declare namespace kase {
    interface CanPend {
        readonly asPending?: Nullable<typeof kase.Pending>;
    }
    interface CanLoad<D> {
        readonly asLoading?: Nullable<kase.Loading<D>>;
    }
    interface CanExecute {
        readonly asExecuting?: Nullable<kase.Executing>;
    }
    interface CanSucceed<D> {
        readonly asSuccess?: Nullable<kase.Success<D>>;
    }
    interface CanFail<D> {
        readonly asFailure?: Nullable<kase.Failure<D>>;
    }
}
export declare namespace kase {
    interface Result<D> extends kase.Possible<D>, kase.State<D>, kase.CanSucceed<D>, kase.CanFail<D> {
        map<R>(transform: (p0: D) => R): kase.Result<R>;
        catch(resolver: (p0: Error) => D): kase.Result<D>;
        andCatch(resolver: (p0: Error) => kase.Result<D>): kase.Result<D>;
        onSuccess(callback: (p0: D) => void): kase.Result<D>;
        onFailure(callback: (p0: Error) => void): kase.Result<D>;
        valueOrThrowException(exp: Error): D;
        valueOrThrowMessage(msg: string): D;
        valueOrThrow(): D;
        getOrThrowException(exp: Error): D;
        getOrThrowMessage(msg: string): D;
        getOrThrow(): D;
        valueOr(_default: D): D;
        getOr(_default: D): D;
        valueOrNull(): Nullable<D>;
        getOrNull(): Nullable<D>;
        exists(): boolean;
        readonly data?: Nullable<D>;
        readonly asSuccess?: Nullable<kase.Success<D>>;
        readonly asFailure?: Nullable<kase.Failure<D>>;
    }
}
export declare namespace kase {
    interface State<D> {
        readonly data?: Nullable<D>;
    }
}
export declare namespace kase {
    class Success<D> /* extends kase.internal.AbstractPossible<D> */ implements kase.Possible<D>, kase.LazyState<D>, kase.Result<D>, kase.ExecutorState<D> {
        get data(): D;
        get asPending(): Nullable<never>;
        get asLoading(): Nullable<never>;
        get asExecuting(): Nullable<never>;
        get asSuccess(): kase.Success<D>;
        get asFailure(): Nullable<never>;
        map<R>(transform: (p0: D) => R): kase.Result<R>;
        catch(resolver: (p0: Error) => D): kase.Result<D>;
        andCatch(resolver: (p0: Error) => kase.Result<D>): kase.Result<D>;
        exists(): boolean;
        onSuccess(callback: (p0: D) => void): kase.Success<D>;
        onFailure(callback: (p0: Error) => void): kase.Success<D>;
        valueOr(_default: D): D;
        valueOrNull(): D;
        valueOrThrow(): D;
        valueOrThrowException(exp: Error): D;
        valueOrThrowMessage(msg: string): D;
        getOrThrowException(exp: Error): D;
        getOrThrowMessage(msg: string): D;
        getOrThrow(): D;
        getOr(_default: D): D;
        getOrNull(): Nullable<D>;
    }
}
export declare namespace kase.progress {
    interface Progress {
        readonly done: any/* kotlin.Long */;
        readonly total: any/* kotlin.Long */;
        readonly doneAmountAsDouble: number;
        readonly totalAmountAsDouble: number;
        readonly doneFraction: number;
        readonly remainingFraction: number;
        readonly donePercentage: number;
        readonly remainingPercentage: number;
    }
}
export declare namespace kase.progress {
    interface ProgressPublisher {
        setStages(stageNames: Array<string>): kollections.List<kase.progress.Stage>;
        updateProgress(p: kase.progress.StageProgress): kase.progress.ProgressState;
    }
}
export declare namespace kase.progress {
    class ProgressState implements kase.progress.Progress {
        get current(): kase.progress.StageProgress;
        get stages(): kollections.List<kase.progress.StageProgress>;
        get done(): any/* kotlin.Long */;
        get doneAmountAsDouble(): number;
        get doneFraction(): number;
        get donePercentage(): number;
        get remainingFraction(): number;
        get remainingPercentage(): number;
        get total(): any/* kotlin.Long */;
        get totalAmountAsDouble(): number;
    }
}
export declare namespace kase.progress {
    interface Stage {
        readonly name: string;
        readonly number: number;
        readonly outOf: number;
    }
}
export declare namespace kase.progress {
    interface StageProgress extends kase.progress.Stage, kase.progress.Progress {
        readonly name: string;
        readonly number: number;
        readonly outOf: number;
        readonly done: any/* kotlin.Long */;
        readonly total: any/* kotlin.Long */;
        readonly doneAmountAsDouble: number;
        readonly totalAmountAsDouble: number;
        readonly doneFraction: number;
        readonly remainingFraction: number;
        readonly donePercentage: number;
        readonly remainingPercentage: number;
    }
}
export declare namespace koncurrent {
    interface Later<T> {
        readonly state: kase.ExecutorState<T>;
        then<R>(onResolved: (p0: T) => R): koncurrent.Later<R>;
        andThen<R>(onResolved: (p0: T) => koncurrent.Later<R>): koncurrent.Later<R>;
        error(handler: (p0: Error) => T): koncurrent.Later<T>;
        catch(handler: (p0: Error) => T): koncurrent.Later<T>;
        complete(cleaner: (p0: kase.Result<T>) => Nullable<any>): koncurrent.Later<T>;
        toPromise(): Promise<T>;
        onUpdate(callback: (p0: kase.ExecutorState<T>) => void): koncurrent.Later<T>;
    }
}
export declare namespace koncurrent {
    function pendingLater<T>(executor?: any/* koncurrent.Executor */): koncurrent.PendingLater<T>;
    function laterOf<T>(value: T, executor?: any/* koncurrent.Executor */): koncurrent.Later<T>;
    function FailedLaterWithMessage(message: string, executor?: any/* koncurrent.Executor */): koncurrent.Later<never>;
    function FailedLater(error: Error, executor?: any/* koncurrent.Executor */): koncurrent.Later<never>;
    function TODOLater(message?: string, executor?: any/* koncurrent.Executor */): koncurrent.Later<never>;
}
export declare namespace koncurrent {
    interface PendingLater<T> extends koncurrent.Later<T>, kase.progress.ProgressPublisher {
        resolveWith(value: T): boolean;
        rejectWith(error: Error): boolean;
        readonly state: kase.ExecutorState<T>;
        then<R>(onResolved: (p0: T) => R): koncurrent.Later<R>;
        andThen<R>(onResolved: (p0: T) => koncurrent.Later<R>): koncurrent.Later<R>;
        error(handler: (p0: Error) => T): koncurrent.Later<T>;
        catch(handler: (p0: Error) => T): koncurrent.Later<T>;
        complete(cleaner: (p0: kase.Result<T>) => Nullable<any>): koncurrent.Later<T>;
        toPromise(): Promise<T>;
        onUpdate(callback: (p0: kase.ExecutorState<T>) => void): koncurrent.Later<T>;
        setStages(stageNames: Array<string>): kollections.List<kase.progress.Stage>;
        updateProgress(p: kase.progress.StageProgress): kase.progress.ProgressState;
    }
}
export declare namespace krono {
    interface Clock {
        currentMicrosAsLong(): any/* kotlin.Long */;
        currentMicrosAsDouble(): number;
        currentMillisAsLong(): any/* kotlin.Long */;
        currentMillisAsDouble(): number;
        currentSecondsAsLong(): any/* kotlin.Long */;
        currentSecondsAsDouble(): number;
    }
}
export declare namespace krono {
    interface DateLike extends krono.TemporalFormattable {
        readonly year: number;
        readonly monthNumber: number;
        readonly month: krono.Month;
        readonly dayOfMonth: number;
        readonly dayOfWeek: krono.DayOfWeek;
        readonly dayOfYear: number;
        format(pattern: string): string;
        toIsoString(): string;
    }
}
export declare namespace krono {
    class DateTimePresenter /* extends krono.internal.AbstractZonedDateTime */ implements krono.DateLike, krono.ZonedDateTime, krono.TimeLike {
        get date(): krono.LocalDate;
        get time(): krono.LocalTime;
        get zone(): krono.TimeZone;
        get pattern(): krono.PresenterPattern;
        atDate(date: number): krono.DateTimePresenter;
        atEndOfMonth(): krono.DateTimePresenter;
        get formatter(): krono.PresenterFormatter;
        toDateString(): string;
        toTimeString(): string;
        toDateTimeString(): string;
        get hour(): number;
        get minute(): number;
        get nanosecond(): number;
        get second(): number;
        get year(): number;
        get monthNumber(): number;
        get month(): krono.Month;
        get dayOfMonth(): number;
        get dayOfWeek(): krono.DayOfWeek;
        get dayOfYear(): number;
        format(pattern: string): string;
        toIsoString(): string;
        isBefore(other: krono.ZonedDateTime): boolean;
        isAfter(other: krono.ZonedDateTime): boolean;
    }
}
export declare namespace krono {
    interface Dateable<D extends krono.Dateable<D>> {
        atDate(date: number): D;
        atEndOfMonth(): D;
    }
}
export declare namespace krono {
    abstract class DayOfWeek {
        static get SUNDAY(): krono.DayOfWeek & {
            get name(): "SUNDAY";
            get ordinal(): 0;
        };
        static get MONDAY(): krono.DayOfWeek & {
            get name(): "MONDAY";
            get ordinal(): 1;
        };
        static get TUESDAY(): krono.DayOfWeek & {
            get name(): "TUESDAY";
            get ordinal(): 2;
        };
        static get WEDNESDAY(): krono.DayOfWeek & {
            get name(): "WEDNESDAY";
            get ordinal(): 3;
        };
        static get THURSDAY(): krono.DayOfWeek & {
            get name(): "THURSDAY";
            get ordinal(): 4;
        };
        static get FRIDAY(): krono.DayOfWeek & {
            get name(): "FRIDAY";
            get ordinal(): 5;
        };
        static get SATURDAY(): krono.DayOfWeek & {
            get name(): "SATURDAY";
            get ordinal(): 6;
        };
        get number(): number;
        static values(): Array<krono.DayOfWeek>;
        static valueOf(value: string): krono.DayOfWeek;
        get name(): "SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";
        get ordinal(): 0 | 1 | 2 | 3 | 4 | 5 | 6;
    }
}
export declare namespace krono {
    class Duration /* implements kotlin.Comparable<krono.Duration> */ {
        get value(): number;
        get unit(): krono.DurationUnit;
        get inNanoSeconds(): number;
        get inMicroSeconds(): number;
        get inMilliSeconds(): number;
        get inSeconds(): number;
        get inMinutes(): number;
        get inHours(): number;
        get inWeeks(): number;
        get inDays(): number;
        get inMonths(): number;
        get inYears(): number;
        plus(other: krono.Duration): krono.Duration;
        minus(other: krono.Duration): krono.Duration;
        toRelativeString(): string;
    }
}
export declare namespace krono {
    abstract class DurationUnit {
        static get NanoSeconds(): krono.DurationUnit & {
            get name(): "NanoSeconds";
            get ordinal(): 0;
        };
        static get MicroSeconds(): krono.DurationUnit & {
            get name(): "MicroSeconds";
            get ordinal(): 1;
        };
        static get MilliSeconds(): krono.DurationUnit & {
            get name(): "MilliSeconds";
            get ordinal(): 2;
        };
        static get Seconds(): krono.DurationUnit & {
            get name(): "Seconds";
            get ordinal(): 3;
        };
        static get Minutes(): krono.DurationUnit & {
            get name(): "Minutes";
            get ordinal(): 4;
        };
        static get Hours(): krono.DurationUnit & {
            get name(): "Hours";
            get ordinal(): 5;
        };
        static get Days(): krono.DurationUnit & {
            get name(): "Days";
            get ordinal(): 6;
        };
        static get Weeks(): krono.DurationUnit & {
            get name(): "Weeks";
            get ordinal(): 7;
        };
        static get Months(): krono.DurationUnit & {
            get name(): "Months";
            get ordinal(): 8;
        };
        static get Years(): krono.DurationUnit & {
            get name(): "Years";
            get ordinal(): 9;
        };
        static values(): Array<krono.DurationUnit>;
        static valueOf(value: string): krono.DurationUnit;
        get name(): "NanoSeconds" | "MicroSeconds" | "MilliSeconds" | "Seconds" | "Minutes" | "Hours" | "Days" | "Weeks" | "Months" | "Years";
        get ordinal(): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    }
}
export declare namespace krono {
    interface LocalDate extends krono.DateLike, krono.Dateable<krono.LocalDate>, krono.TemporalComparable<krono.LocalDate> {
        toEpochMillisAsLong(): any/* kotlin.Long */;
        toEpochMillisAsDouble(): number;
        toEpochMillisAsInt(): number;
        minusDate(other: krono.LocalDate): krono.Duration;
        minusDuration(duration: krono.Duration): krono.LocalDate;
        plus(duration: krono.Duration): krono.LocalDate;
        readonly year: number;
        readonly monthNumber: number;
        readonly month: krono.Month;
        readonly dayOfMonth: number;
        readonly dayOfWeek: krono.DayOfWeek;
        readonly dayOfYear: number;
        format(pattern: string): string;
        toIsoString(): string;
        atDate(date: number): krono.LocalDate;
        atEndOfMonth(): krono.LocalDate;
        isBefore(other: krono.LocalDate): boolean;
        isAfter(other: krono.LocalDate): boolean;
    }
}
export declare namespace krono {
    function localDateAt(year?: number, month?: number, dayOfMonth?: number): kase.Result<krono.LocalDate>;
    function localDateEpoch(): krono.LocalDate;
    function parseLocalDate(isoString?: Nullable<string>): kase.Result<krono.LocalDate>;
    function parseLocalDateOrNUll(isoString?: Nullable<string>): Nullable<krono.LocalDate>;
}
export declare namespace krono {
    interface LocalDateTime extends krono.DateLike, krono.TimeLike, krono.Dateable<krono.LocalDateTime>, krono.TemporalComparable<krono.LocalDateTime> {
        readonly date: krono.LocalDate;
        readonly time: krono.LocalTime;
        readonly year: number;
        readonly monthNumber: number;
        readonly month: krono.Month;
        readonly dayOfMonth: number;
        readonly dayOfWeek: krono.DayOfWeek;
        readonly dayOfYear: number;
        format(pattern: string): string;
        toIsoString(): string;
        readonly hour: number;
        readonly minute: number;
        readonly second: number;
        readonly nanosecond: number;
        atDate(date: number): krono.LocalDateTime;
        atEndOfMonth(): krono.LocalDateTime;
        isBefore(other: krono.LocalDateTime): boolean;
        isAfter(other: krono.LocalDateTime): boolean;
    }
}
export declare namespace krono {
    function localDateTimeFromDateAndTime(date: krono.LocalDate, time: krono.LocalTime): kase.Result<krono.LocalDateTime>;
    function localDateTime(year?: number, month?: number, dayOfMonth?: number, hour?: number, minutes?: number, seconds?: number, nanoseconds?: number): kase.Result<krono.LocalDateTime>;
    function localDateTimeEpoch(): krono.LocalDateTime;
    function parseLocalDateTime(isoString?: Nullable<string>): kase.Result<krono.LocalDateTime>;
}
export declare namespace krono {
    interface LocalTime extends krono.TimeLike, krono.TemporalComparable<krono.LocalTime> {
        readonly hour: number;
        readonly minute: number;
        readonly second: number;
        readonly nanosecond: number;
        format(pattern: string): string;
        toIsoString(): string;
        isBefore(other: krono.LocalTime): boolean;
        isAfter(other: krono.LocalTime): boolean;
    }
}
export declare namespace krono {
    function localTime(hour?: number, minutes?: number, seconds?: number, nanoseconds?: number): kase.Result<krono.LocalTime>;
    function parseLocalTime(isoString?: Nullable<string>): kase.Result<krono.LocalTime>;
    function Midnight(): krono.LocalTime;
    function parseLocalTimeOrMidnight(isoString: string): krono.LocalTime;
}
export declare namespace krono {
    abstract class Month {
        static get JANUARY(): krono.Month & {
            get name(): "JANUARY";
            get ordinal(): 0;
        };
        static get FEBRUARY(): krono.Month & {
            get name(): "FEBRUARY";
            get ordinal(): 1;
        };
        static get MARCH(): krono.Month & {
            get name(): "MARCH";
            get ordinal(): 2;
        };
        static get APRIL(): krono.Month & {
            get name(): "APRIL";
            get ordinal(): 3;
        };
        static get MAY(): krono.Month & {
            get name(): "MAY";
            get ordinal(): 4;
        };
        static get JUNE(): krono.Month & {
            get name(): "JUNE";
            get ordinal(): 5;
        };
        static get JULY(): krono.Month & {
            get name(): "JULY";
            get ordinal(): 6;
        };
        static get AUGUST(): krono.Month & {
            get name(): "AUGUST";
            get ordinal(): 7;
        };
        static get SEPTEMBER(): krono.Month & {
            get name(): "SEPTEMBER";
            get ordinal(): 8;
        };
        static get OCTOBER(): krono.Month & {
            get name(): "OCTOBER";
            get ordinal(): 9;
        };
        static get NOVEMBER(): krono.Month & {
            get name(): "NOVEMBER";
            get ordinal(): 10;
        };
        static get DECEMBER(): krono.Month & {
            get name(): "DECEMBER";
            get ordinal(): 11;
        };
        get number(): number;
        static values(): Array<krono.Month>;
        static valueOf(value: string): krono.Month;
        get name(): "JANUARY" | "FEBRUARY" | "MARCH" | "APRIL" | "MAY" | "JUNE" | "JULY" | "AUGUST" | "SEPTEMBER" | "OCTOBER" | "NOVEMBER" | "DECEMBER";
        get ordinal(): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
    }
}
export declare namespace krono {
    function numberOfDays(_this_: krono.Month, year: number): number;
}
export declare namespace krono {
    const Patterns: {
        get ISO_DATE(): string;
        get ISO_TIME(): string;
        get ISO_DATE_TIME(): string;
    };
}
export declare namespace krono {
    class PresenterFormatter {
        get pattern(): krono.PresenterPattern;
        get date(): krono.PureDateFormatter;
        get time(): krono.PureTimeFormatter;
        get dateTime(): krono.PureDateTimeFormatter;
    }
}
export declare namespace krono {
    class PresenterPattern {
        get date(): string;
        get time(): string;
        get dateTime(): string;
        get formatter(): krono.PresenterFormatter;
    }
}
export declare namespace krono {
    interface PureDateFormatter {
        formatDate(year: number, month: number, day: number): string;
    }
}
export declare namespace krono {
    interface PureDateTimeFormatter extends krono.PureDateFormatter, krono.PureTimeFormatter {
        formatDateTime(year: number, month: number, day: number, hour: number, minutes: number, seconds: number): string;
        formatDate(year: number, month: number, day: number): string;
        formatTime(hour: number, minutes: number, seconds: number): string;
    }
}
export declare namespace krono {
    function pureDateFormatter(pattern: string): krono.PureDateFormatter;
    function pureTimeFormatter(pattern: string): krono.PureTimeFormatter;
    function pureDateTimeFormatter(pattern: string): krono.PureDateTimeFormatter;
}
export declare namespace krono {
    interface PureTimeFormatter {
        formatTime(hour: number, minutes: number, seconds: number): string;
    }
}
export declare namespace krono {
    interface TemporalComparable<E> /* extends kotlin.Comparable<E> */ {
        isBefore(other: E): boolean;
        isAfter(other: E): boolean;
    }
}
export declare namespace krono {
    interface TemporalFormattable {
        format(pattern: string): string;
        toIsoString(): string;
    }
}
export declare namespace krono {
    interface TimeLike extends krono.TemporalFormattable {
        readonly hour: number;
        readonly minute: number;
        readonly second: number;
        readonly nanosecond: number;
        format(pattern: string): string;
        toIsoString(): string;
    }
}
export declare namespace krono {
    interface TimeZone {
        readonly id: string;
    }
}
export declare namespace krono {
    function timeZoneOf(id: string): krono.TimeZone;
}
export declare namespace krono {
    interface ZonedDateTime extends krono.DateLike, krono.TimeLike, krono.Dateable<krono.ZonedDateTime>, krono.TemporalComparable<krono.ZonedDateTime> {
        readonly zone: krono.TimeZone;
        readonly date: krono.LocalDate;
        readonly time: krono.LocalTime;
        readonly year: number;
        readonly monthNumber: number;
        readonly month: krono.Month;
        readonly dayOfMonth: number;
        readonly dayOfWeek: krono.DayOfWeek;
        readonly dayOfYear: number;
        format(pattern: string): string;
        toIsoString(): string;
        readonly hour: number;
        readonly minute: number;
        readonly second: number;
        readonly nanosecond: number;
        atDate(date: number): krono.ZonedDateTime;
        atEndOfMonth(): krono.ZonedDateTime;
        isBefore(other: krono.ZonedDateTime): boolean;
        isAfter(other: krono.ZonedDateTime): boolean;
    }
}
export declare namespace krono.utils {
    function centuryOf(year: number): number;
}
export declare namespace krono.utils {
    function dayOfWeekOf(year: number, month: number, day: number): krono.DayOfWeek;
}
export declare namespace krono.utils {
    function dayOfYear(year: number, month: number, day: number): number;
}
export declare namespace krono.utils {
    function daysOfMonth(year: number, month: number): number;
}
export declare namespace krono.utils {
    function isLeapYear(year: number): boolean;
}
export declare namespace krono {
    function dateOf(ld: krono.LocalDate): Date;
    function dateOrNullOf(ld?: Nullable<krono.LocalDate>): Nullable<Date>;
    function localDateOf(d: Date): Date;
}
export declare namespace krono {
    interface Instant extends krono.TemporalComparable<krono.Instant> {
        readonly epochMicroSecondsAsLong: any/* kotlin.Long */;
        readonly epochMicroSecondsAsDouble: number;
        readonly epochMilliSecondsAsLong: any/* kotlin.Long */;
        readonly epochMilliSecondsAsDouble: number;
        readonly epochSeconds: number;
        atZone(tz: krono.TimeZone): krono.ZonedDateTime;
        atSystemZone(): krono.ZonedDateTime;
        plus(duration: krono.Duration): krono.Instant;
        minus(other: krono.Instant): krono.Duration;
        atZoneWithId(id: string): krono.ZonedDateTime;
        isBefore(other: krono.Instant): boolean;
        isAfter(other: krono.Instant): boolean;
    }
}
export declare namespace krono {
    function toInstant(_this_: krono.DateTimePresenter): krono.Instant;
    function currentInstant(_this_: krono.Clock): krono.Instant;
}
export declare namespace krono {
    const TimeZones: {
        get UTC(): krono.TimeZone;
        get System(): krono.TimeZone;
    };
}
export declare namespace hormone {
    class ActionDateDto {
        get created(): krono.Instant;
        get updated(): krono.Instant;
    }
}
export declare namespace hormone {
    interface BulkVoid<R> {
        void(uid: string): koncurrent.Later<R>;
        voidBulk(ids: kollections.List<string>): koncurrent.Later<kollections.List<R>>;
    }
}
export declare namespace hormone {
    interface Creator<P, R> {
        create(params: P): koncurrent.Later<R>;
    }
}
export declare namespace hormone {
    interface Crud<T> {
        readonly asCreate?: Nullable<typeof hormone.Create>;
        readonly asUpdate?: Nullable<hormone.Update<T>>;
        readonly asDelete?: Nullable<hormone.Delete<T>>;
        readonly asView?: Nullable<hormone.View<T>>;
    }
    const Create: {
        get asCreate(): Nullable<typeof hormone.Create>;
        get asUpdate(): Nullable<hormone.Update<never>>;
        get asDelete(): Nullable<hormone.Delete<never>>;
        get asView(): Nullable<hormone.View<never>>;
    } & hormone.Crud<never>;
    class Update<T> implements hormone.Crud<T> {
        get data(): T;
        get asCreate(): Nullable<typeof hormone.Create>;
        get asUpdate(): Nullable<hormone.Update<T>>;
        get asDelete(): Nullable<hormone.Delete<T>>;
        get asView(): Nullable<hormone.View<T>>;
    }
    interface Delete<T> extends hormone.Crud<T> {
        readonly asSingle?: Nullable<hormone.Single<T>>;
        readonly asMany?: Nullable<hormone.Many<T>>;
        readonly asCreate?: Nullable<typeof hormone.Create>;
        readonly asUpdate?: Nullable<hormone.Update<T>>;
        readonly asDelete?: Nullable<hormone.Delete<T>>;
        readonly asView?: Nullable<hormone.View<T>>;
    }
    function deleteSingle<T>(data: T): hormone.Single<T>;
    function deleteMany<T>(data: any/* kotlin.collections.List<T> */): hormone.Many<T>;
    class Single<T> implements hormone.Delete<T> {
        get data(): T;
        get asSingle(): Nullable<hormone.Single<T>>;
        get asMany(): Nullable<hormone.Many<T>>;
        get asCreate(): Nullable<typeof hormone.Create>;
        get asUpdate(): Nullable<hormone.Update<T>>;
        get asDelete(): Nullable<hormone.Delete<T>>;
        get asView(): Nullable<hormone.View<T>>;
    }
    class Many<T> implements hormone.Delete<T> {
        get data(): any/* kotlin.collections.List<T> */;
        get asSingle(): Nullable<hormone.Single<T>>;
        get asMany(): Nullable<hormone.Many<T>>;
        get asCreate(): Nullable<typeof hormone.Create>;
        get asUpdate(): Nullable<hormone.Update<T>>;
        get asDelete(): Nullable<hormone.Delete<T>>;
        get asView(): Nullable<hormone.View<T>>;
    }
    class View<T> implements hormone.Crud<T> {
        get data(): T;
        get asCreate(): Nullable<typeof hormone.Create>;
        get asUpdate(): Nullable<hormone.Update<T>>;
        get asDelete(): Nullable<hormone.Delete<T>>;
        get asView(): Nullable<hormone.View<T>>;
    }
}
export declare namespace hormone {
    interface Deleter<R extends any> {
        delete(uid: string): koncurrent.Later<Nullable<R>>;
        deleteBulk(ids: kollections.List<string>): koncurrent.Later<kollections.List<Nullable<R>>>;
    }
}
export declare namespace hormone {
    interface Loader<R> {
        load(options?: any/* kronecker.LoadOptions */): koncurrent.Later<kollections.List<R>>;
        loadById(uid: string): koncurrent.Later<R>;
    }
}
export declare namespace hormone {
    interface Updater<P, R> {
        update(params: any/* hormone.Identified<string, P> */): koncurrent.Later<R>;
    }
}
export declare namespace kash {
    abstract class Currency {
        get name(): string;
        get globalSymbol(): string;
        get localSymbol(): string;
        get details(): string;
        get lowestDenomination(): number;
        static get AED(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get AFN(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get ALL(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get AMD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get ANG(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get AOA(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get ARS(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get AUD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get AWG(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get AZN(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get BAM(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get BBD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get BDT(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get BGN(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get BHD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get BIF(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get BMD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get BND(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get BOB(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get BRL(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get BSD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get BTN(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get BWP(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get BYR(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get BZD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get CAD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get CDF(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get CHF(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get CLP(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get CNY(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get COP(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get CRC(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get CUC(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get CVE(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get CZK(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get DJF(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get DKK(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get DOP(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get DZD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get EEK(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get EGP(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get ERN(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get ETB(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get EUR(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get FJD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get FKP(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get GBP(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get GEL(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get GHS(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get GIP(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get GMD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get GNF(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get GQE(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get GTQ(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get GYD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get HKD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get HNL(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get HRK(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get HTG(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get HUF(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get IDR(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get ILS(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get INR(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get IQD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get IRR(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get ISK(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get JMD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get JOD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get JPY(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get KES(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get KGS(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get KHR(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get KMF(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get KPW(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get KRW(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get KWD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get KYD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get KZT(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get LAK(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get LBP(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get LKR(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get LRD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get LSL(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get LTL(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get LVL(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get LYD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get MAD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get MDL(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get MGA(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get MKD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get MMK(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get MNT(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get MOP(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get MRO(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get MUR(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get MVR(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get MWK(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get MXN(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get MYR(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get MZM(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get NAD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get NGN(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get NIO(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get NOK(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get NPR(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get NZD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get OMR(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get PAB(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get PEN(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get PGK(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get PHP(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get PKR(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get PLN(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get PYG(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get QAR(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get RON(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get RSD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get RUB(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get RWF(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get SAR(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get SBD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get SCR(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get SDG(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get SEK(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get SGD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get SHP(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get SLL(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get SOS(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get SRD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get SYP(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get SZL(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get THB(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get TJS(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get TMT(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get TND(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get TRY(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get TTD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get TWD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get TZS(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get UAH(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get UGX(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get USD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get UYU(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get UZS(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get VEB(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get VND(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get VUV(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get WST(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get XAF(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get XCD(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get XDR(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get XOF(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get XPF(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get YER(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get ZAR(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get ZMK(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get ZWR(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
        static get UXX(): {
        } & kash.Currency & any/* kotlinx.serialization.internal.SerializerFactory */;
    }
}
export declare namespace geo {
    abstract class Country {
        get code(): string;
        get label(): string;
        get currency(): kash.Currency;
        get isoCode(): string;
        get dialingCode(): string;
        static get AF(): geo.Country & {
            get name(): "AF";
            get ordinal(): 0;
        };
        static get AL(): geo.Country & {
            get name(): "AL";
            get ordinal(): 1;
        };
        static get DZ(): geo.Country & {
            get name(): "DZ";
            get ordinal(): 2;
        };
        static get AS(): geo.Country & {
            get name(): "AS";
            get ordinal(): 3;
        };
        static get AD(): geo.Country & {
            get name(): "AD";
            get ordinal(): 4;
        };
        static get AO(): geo.Country & {
            get name(): "AO";
            get ordinal(): 5;
        };
        static get AI(): geo.Country & {
            get name(): "AI";
            get ordinal(): 6;
        };
        static get AG(): geo.Country & {
            get name(): "AG";
            get ordinal(): 7;
        };
        static get AR(): geo.Country & {
            get name(): "AR";
            get ordinal(): 8;
        };
        static get AM(): geo.Country & {
            get name(): "AM";
            get ordinal(): 9;
        };
        static get AW(): geo.Country & {
            get name(): "AW";
            get ordinal(): 10;
        };
        static get AU(): geo.Country & {
            get name(): "AU";
            get ordinal(): 11;
        };
        static get AZ(): geo.Country & {
            get name(): "AZ";
            get ordinal(): 12;
        };
        static get BS(): geo.Country & {
            get name(): "BS";
            get ordinal(): 13;
        };
        static get BH(): geo.Country & {
            get name(): "BH";
            get ordinal(): 14;
        };
        static get BD(): geo.Country & {
            get name(): "BD";
            get ordinal(): 15;
        };
        static get BB(): geo.Country & {
            get name(): "BB";
            get ordinal(): 16;
        };
        static get BY(): geo.Country & {
            get name(): "BY";
            get ordinal(): 17;
        };
        static get BE(): geo.Country & {
            get name(): "BE";
            get ordinal(): 18;
        };
        static get BZ(): geo.Country & {
            get name(): "BZ";
            get ordinal(): 19;
        };
        static get BJ(): geo.Country & {
            get name(): "BJ";
            get ordinal(): 20;
        };
        static get BM(): geo.Country & {
            get name(): "BM";
            get ordinal(): 21;
        };
        static get BT(): geo.Country & {
            get name(): "BT";
            get ordinal(): 22;
        };
        static get BO(): geo.Country & {
            get name(): "BO";
            get ordinal(): 23;
        };
        static get BA(): geo.Country & {
            get name(): "BA";
            get ordinal(): 24;
        };
        static get BW(): geo.Country & {
            get name(): "BW";
            get ordinal(): 25;
        };
        static get BR(): geo.Country & {
            get name(): "BR";
            get ordinal(): 26;
        };
        static get IO(): geo.Country & {
            get name(): "IO";
            get ordinal(): 27;
        };
        static get VG(): geo.Country & {
            get name(): "VG";
            get ordinal(): 28;
        };
        static get VI(): geo.Country & {
            get name(): "VI";
            get ordinal(): 29;
        };
        static get BN(): geo.Country & {
            get name(): "BN";
            get ordinal(): 30;
        };
        static get BG(): geo.Country & {
            get name(): "BG";
            get ordinal(): 31;
        };
        static get BF(): geo.Country & {
            get name(): "BF";
            get ordinal(): 32;
        };
        static get BI(): geo.Country & {
            get name(): "BI";
            get ordinal(): 33;
        };
        static get KH(): geo.Country & {
            get name(): "KH";
            get ordinal(): 34;
        };
        static get CM(): geo.Country & {
            get name(): "CM";
            get ordinal(): 35;
        };
        static get CA(): geo.Country & {
            get name(): "CA";
            get ordinal(): 36;
        };
        static get CV(): geo.Country & {
            get name(): "CV";
            get ordinal(): 37;
        };
        static get KY(): geo.Country & {
            get name(): "KY";
            get ordinal(): 38;
        };
        static get CF(): geo.Country & {
            get name(): "CF";
            get ordinal(): 39;
        };
        static get CL(): geo.Country & {
            get name(): "CL";
            get ordinal(): 40;
        };
        static get CN(): geo.Country & {
            get name(): "CN";
            get ordinal(): 41;
        };
        static get CO(): geo.Country & {
            get name(): "CO";
            get ordinal(): 42;
        };
        static get KM(): geo.Country & {
            get name(): "KM";
            get ordinal(): 43;
        };
        static get CG(): geo.Country & {
            get name(): "CG";
            get ordinal(): 44;
        };
        static get CD(): geo.Country & {
            get name(): "CD";
            get ordinal(): 45;
        };
        static get CK(): geo.Country & {
            get name(): "CK";
            get ordinal(): 46;
        };
        static get CR(): geo.Country & {
            get name(): "CR";
            get ordinal(): 47;
        };
        static get HR(): geo.Country & {
            get name(): "HR";
            get ordinal(): 48;
        };
        static get CU(): geo.Country & {
            get name(): "CU";
            get ordinal(): 49;
        };
        static get CY(): geo.Country & {
            get name(): "CY";
            get ordinal(): 50;
        };
        static get CZ(): geo.Country & {
            get name(): "CZ";
            get ordinal(): 51;
        };
        static get DK(): geo.Country & {
            get name(): "DK";
            get ordinal(): 52;
        };
        static get DJ(): geo.Country & {
            get name(): "DJ";
            get ordinal(): 53;
        };
        static get DM(): geo.Country & {
            get name(): "DM";
            get ordinal(): 54;
        };
        static get DO(): geo.Country & {
            get name(): "DO";
            get ordinal(): 55;
        };
        static get EC(): geo.Country & {
            get name(): "EC";
            get ordinal(): 56;
        };
        static get EG(): geo.Country & {
            get name(): "EG";
            get ordinal(): 57;
        };
        static get SV(): geo.Country & {
            get name(): "SV";
            get ordinal(): 58;
        };
        static get GQ(): geo.Country & {
            get name(): "GQ";
            get ordinal(): 59;
        };
        static get ER(): geo.Country & {
            get name(): "ER";
            get ordinal(): 60;
        };
        static get EE(): geo.Country & {
            get name(): "EE";
            get ordinal(): 61;
        };
        static get ET(): geo.Country & {
            get name(): "ET";
            get ordinal(): 62;
        };
        static get FK(): geo.Country & {
            get name(): "FK";
            get ordinal(): 63;
        };
        static get FO(): geo.Country & {
            get name(): "FO";
            get ordinal(): 64;
        };
        static get FJ(): geo.Country & {
            get name(): "FJ";
            get ordinal(): 65;
        };
        static get FI(): geo.Country & {
            get name(): "FI";
            get ordinal(): 66;
        };
        static get FR(): geo.Country & {
            get name(): "FR";
            get ordinal(): 67;
        };
        static get GF(): geo.Country & {
            get name(): "GF";
            get ordinal(): 68;
        };
        static get PF(): geo.Country & {
            get name(): "PF";
            get ordinal(): 69;
        };
        static get GA(): geo.Country & {
            get name(): "GA";
            get ordinal(): 70;
        };
        static get GM(): geo.Country & {
            get name(): "GM";
            get ordinal(): 71;
        };
        static get GE(): geo.Country & {
            get name(): "GE";
            get ordinal(): 72;
        };
        static get DE(): geo.Country & {
            get name(): "DE";
            get ordinal(): 73;
        };
        static get GH(): geo.Country & {
            get name(): "GH";
            get ordinal(): 74;
        };
        static get GI(): geo.Country & {
            get name(): "GI";
            get ordinal(): 75;
        };
        static get GR(): geo.Country & {
            get name(): "GR";
            get ordinal(): 76;
        };
        static get GL(): geo.Country & {
            get name(): "GL";
            get ordinal(): 77;
        };
        static get GD(): geo.Country & {
            get name(): "GD";
            get ordinal(): 78;
        };
        static get GP(): geo.Country & {
            get name(): "GP";
            get ordinal(): 79;
        };
        static get GU(): geo.Country & {
            get name(): "GU";
            get ordinal(): 80;
        };
        static get GT(): geo.Country & {
            get name(): "GT";
            get ordinal(): 81;
        };
        static get GN(): geo.Country & {
            get name(): "GN";
            get ordinal(): 82;
        };
        static get GW(): geo.Country & {
            get name(): "GW";
            get ordinal(): 83;
        };
        static get GY(): geo.Country & {
            get name(): "GY";
            get ordinal(): 84;
        };
        static get HT(): geo.Country & {
            get name(): "HT";
            get ordinal(): 85;
        };
        static get VA(): geo.Country & {
            get name(): "VA";
            get ordinal(): 86;
        };
        static get HN(): geo.Country & {
            get name(): "HN";
            get ordinal(): 87;
        };
        static get HK(): geo.Country & {
            get name(): "HK";
            get ordinal(): 88;
        };
        static get HU(): geo.Country & {
            get name(): "HU";
            get ordinal(): 89;
        };
        static get IS(): geo.Country & {
            get name(): "IS";
            get ordinal(): 90;
        };
        static get IN(): geo.Country & {
            get name(): "IN";
            get ordinal(): 91;
        };
        static get ID(): geo.Country & {
            get name(): "ID";
            get ordinal(): 92;
        };
        static get CI(): geo.Country & {
            get name(): "CI";
            get ordinal(): 93;
        };
        static get IR(): geo.Country & {
            get name(): "IR";
            get ordinal(): 94;
        };
        static get IQ(): geo.Country & {
            get name(): "IQ";
            get ordinal(): 95;
        };
        static get IE(): geo.Country & {
            get name(): "IE";
            get ordinal(): 96;
        };
        static get IL(): geo.Country & {
            get name(): "IL";
            get ordinal(): 97;
        };
        static get IT(): geo.Country & {
            get name(): "IT";
            get ordinal(): 98;
        };
        static get JM(): geo.Country & {
            get name(): "JM";
            get ordinal(): 99;
        };
        static get JP(): geo.Country & {
            get name(): "JP";
            get ordinal(): 100;
        };
        static get JO(): geo.Country & {
            get name(): "JO";
            get ordinal(): 101;
        };
        static get KZ(): geo.Country & {
            get name(): "KZ";
            get ordinal(): 102;
        };
        static get KE(): geo.Country & {
            get name(): "KE";
            get ordinal(): 103;
        };
        static get KI(): geo.Country & {
            get name(): "KI";
            get ordinal(): 104;
        };
        static get KW(): geo.Country & {
            get name(): "KW";
            get ordinal(): 105;
        };
        static get KG(): geo.Country & {
            get name(): "KG";
            get ordinal(): 106;
        };
        static get LA(): geo.Country & {
            get name(): "LA";
            get ordinal(): 107;
        };
        static get LV(): geo.Country & {
            get name(): "LV";
            get ordinal(): 108;
        };
        static get LB(): geo.Country & {
            get name(): "LB";
            get ordinal(): 109;
        };
        static get LS(): geo.Country & {
            get name(): "LS";
            get ordinal(): 110;
        };
        static get LR(): geo.Country & {
            get name(): "LR";
            get ordinal(): 111;
        };
        static get LY(): geo.Country & {
            get name(): "LY";
            get ordinal(): 112;
        };
        static get LI(): geo.Country & {
            get name(): "LI";
            get ordinal(): 113;
        };
        static get LT(): geo.Country & {
            get name(): "LT";
            get ordinal(): 114;
        };
        static get LU(): geo.Country & {
            get name(): "LU";
            get ordinal(): 115;
        };
        static get MO(): geo.Country & {
            get name(): "MO";
            get ordinal(): 116;
        };
        static get MK(): geo.Country & {
            get name(): "MK";
            get ordinal(): 117;
        };
        static get MG(): geo.Country & {
            get name(): "MG";
            get ordinal(): 118;
        };
        static get MW(): geo.Country & {
            get name(): "MW";
            get ordinal(): 119;
        };
        static get MY(): geo.Country & {
            get name(): "MY";
            get ordinal(): 120;
        };
        static get MV(): geo.Country & {
            get name(): "MV";
            get ordinal(): 121;
        };
        static get ML(): geo.Country & {
            get name(): "ML";
            get ordinal(): 122;
        };
        static get MT(): geo.Country & {
            get name(): "MT";
            get ordinal(): 123;
        };
        static get MH(): geo.Country & {
            get name(): "MH";
            get ordinal(): 124;
        };
        static get MQ(): geo.Country & {
            get name(): "MQ";
            get ordinal(): 125;
        };
        static get MR(): geo.Country & {
            get name(): "MR";
            get ordinal(): 126;
        };
        static get MU(): geo.Country & {
            get name(): "MU";
            get ordinal(): 127;
        };
        static get YT(): geo.Country & {
            get name(): "YT";
            get ordinal(): 128;
        };
        static get MX(): geo.Country & {
            get name(): "MX";
            get ordinal(): 129;
        };
        static get FM(): geo.Country & {
            get name(): "FM";
            get ordinal(): 130;
        };
        static get MD(): geo.Country & {
            get name(): "MD";
            get ordinal(): 131;
        };
        static get MC(): geo.Country & {
            get name(): "MC";
            get ordinal(): 132;
        };
        static get MN(): geo.Country & {
            get name(): "MN";
            get ordinal(): 133;
        };
        static get ME(): geo.Country & {
            get name(): "ME";
            get ordinal(): 134;
        };
        static get MS(): geo.Country & {
            get name(): "MS";
            get ordinal(): 135;
        };
        static get MA(): geo.Country & {
            get name(): "MA";
            get ordinal(): 136;
        };
        static get MZ(): geo.Country & {
            get name(): "MZ";
            get ordinal(): 137;
        };
        static get MM(): geo.Country & {
            get name(): "MM";
            get ordinal(): 138;
        };
        static get NA(): geo.Country & {
            get name(): "NA";
            get ordinal(): 139;
        };
        static get NR(): geo.Country & {
            get name(): "NR";
            get ordinal(): 140;
        };
        static get NP(): geo.Country & {
            get name(): "NP";
            get ordinal(): 141;
        };
        static get NL(): geo.Country & {
            get name(): "NL";
            get ordinal(): 142;
        };
        static get NC(): geo.Country & {
            get name(): "NC";
            get ordinal(): 143;
        };
        static get NZ(): geo.Country & {
            get name(): "NZ";
            get ordinal(): 144;
        };
        static get NI(): geo.Country & {
            get name(): "NI";
            get ordinal(): 145;
        };
        static get NE(): geo.Country & {
            get name(): "NE";
            get ordinal(): 146;
        };
        static get NG(): geo.Country & {
            get name(): "NG";
            get ordinal(): 147;
        };
        static get NU(): geo.Country & {
            get name(): "NU";
            get ordinal(): 148;
        };
        static get NF(): geo.Country & {
            get name(): "NF";
            get ordinal(): 149;
        };
        static get KP(): geo.Country & {
            get name(): "KP";
            get ordinal(): 150;
        };
        static get MP(): geo.Country & {
            get name(): "MP";
            get ordinal(): 151;
        };
        static get NO(): geo.Country & {
            get name(): "NO";
            get ordinal(): 152;
        };
        static get OM(): geo.Country & {
            get name(): "OM";
            get ordinal(): 153;
        };
        static get PK(): geo.Country & {
            get name(): "PK";
            get ordinal(): 154;
        };
        static get PW(): geo.Country & {
            get name(): "PW";
            get ordinal(): 155;
        };
        static get PS(): geo.Country & {
            get name(): "PS";
            get ordinal(): 156;
        };
        static get PA(): geo.Country & {
            get name(): "PA";
            get ordinal(): 157;
        };
        static get PG(): geo.Country & {
            get name(): "PG";
            get ordinal(): 158;
        };
        static get PY(): geo.Country & {
            get name(): "PY";
            get ordinal(): 159;
        };
        static get PE(): geo.Country & {
            get name(): "PE";
            get ordinal(): 160;
        };
        static get PH(): geo.Country & {
            get name(): "PH";
            get ordinal(): 161;
        };
        static get PL(): geo.Country & {
            get name(): "PL";
            get ordinal(): 162;
        };
        static get PT(): geo.Country & {
            get name(): "PT";
            get ordinal(): 163;
        };
        static get PR(): geo.Country & {
            get name(): "PR";
            get ordinal(): 164;
        };
        static get QA(): geo.Country & {
            get name(): "QA";
            get ordinal(): 165;
        };
        static get XK(): geo.Country & {
            get name(): "XK";
            get ordinal(): 166;
        };
        static get RE(): geo.Country & {
            get name(): "RE";
            get ordinal(): 167;
        };
        static get RO(): geo.Country & {
            get name(): "RO";
            get ordinal(): 168;
        };
        static get RU(): geo.Country & {
            get name(): "RU";
            get ordinal(): 169;
        };
        static get RW(): geo.Country & {
            get name(): "RW";
            get ordinal(): 170;
        };
        static get BL(): geo.Country & {
            get name(): "BL";
            get ordinal(): 171;
        };
        static get SH(): geo.Country & {
            get name(): "SH";
            get ordinal(): 172;
        };
        static get KN(): geo.Country & {
            get name(): "KN";
            get ordinal(): 173;
        };
        static get LC(): geo.Country & {
            get name(): "LC";
            get ordinal(): 174;
        };
        static get MF(): geo.Country & {
            get name(): "MF";
            get ordinal(): 175;
        };
        static get PM(): geo.Country & {
            get name(): "PM";
            get ordinal(): 176;
        };
        static get VC(): geo.Country & {
            get name(): "VC";
            get ordinal(): 177;
        };
        static get WS(): geo.Country & {
            get name(): "WS";
            get ordinal(): 178;
        };
        static get SM(): geo.Country & {
            get name(): "SM";
            get ordinal(): 179;
        };
        static get SA(): geo.Country & {
            get name(): "SA";
            get ordinal(): 180;
        };
        static get SN(): geo.Country & {
            get name(): "SN";
            get ordinal(): 181;
        };
        static get RS(): geo.Country & {
            get name(): "RS";
            get ordinal(): 182;
        };
        static get SC(): geo.Country & {
            get name(): "SC";
            get ordinal(): 183;
        };
        static get SL(): geo.Country & {
            get name(): "SL";
            get ordinal(): 184;
        };
        static get SG(): geo.Country & {
            get name(): "SG";
            get ordinal(): 185;
        };
        static get SK(): geo.Country & {
            get name(): "SK";
            get ordinal(): 186;
        };
        static get SI(): geo.Country & {
            get name(): "SI";
            get ordinal(): 187;
        };
        static get SB(): geo.Country & {
            get name(): "SB";
            get ordinal(): 188;
        };
        static get SO(): geo.Country & {
            get name(): "SO";
            get ordinal(): 189;
        };
        static get ZA(): geo.Country & {
            get name(): "ZA";
            get ordinal(): 190;
        };
        static get KR(): geo.Country & {
            get name(): "KR";
            get ordinal(): 191;
        };
        static get ES(): geo.Country & {
            get name(): "ES";
            get ordinal(): 192;
        };
        static get LK(): geo.Country & {
            get name(): "LK";
            get ordinal(): 193;
        };
        static get SD(): geo.Country & {
            get name(): "SD";
            get ordinal(): 194;
        };
        static get SR(): geo.Country & {
            get name(): "SR";
            get ordinal(): 195;
        };
        static get SZ(): geo.Country & {
            get name(): "SZ";
            get ordinal(): 196;
        };
        static get SE(): geo.Country & {
            get name(): "SE";
            get ordinal(): 197;
        };
        static get CH(): geo.Country & {
            get name(): "CH";
            get ordinal(): 198;
        };
        static get SY(): geo.Country & {
            get name(): "SY";
            get ordinal(): 199;
        };
        static get TW(): geo.Country & {
            get name(): "TW";
            get ordinal(): 200;
        };
        static get TJ(): geo.Country & {
            get name(): "TJ";
            get ordinal(): 201;
        };
        static get TZ(): geo.Country & {
            get name(): "TZ";
            get ordinal(): 202;
        };
        static get TH(): geo.Country & {
            get name(): "TH";
            get ordinal(): 203;
        };
        static get TL(): geo.Country & {
            get name(): "TL";
            get ordinal(): 204;
        };
        static get TG(): geo.Country & {
            get name(): "TG";
            get ordinal(): 205;
        };
        static get TK(): geo.Country & {
            get name(): "TK";
            get ordinal(): 206;
        };
        static get TT(): geo.Country & {
            get name(): "TT";
            get ordinal(): 207;
        };
        static get TN(): geo.Country & {
            get name(): "TN";
            get ordinal(): 208;
        };
        static get TR(): geo.Country & {
            get name(): "TR";
            get ordinal(): 209;
        };
        static get TM(): geo.Country & {
            get name(): "TM";
            get ordinal(): 210;
        };
        static get TC(): geo.Country & {
            get name(): "TC";
            get ordinal(): 211;
        };
        static get TV(): geo.Country & {
            get name(): "TV";
            get ordinal(): 212;
        };
        static get UG(): geo.Country & {
            get name(): "UG";
            get ordinal(): 213;
        };
        static get UA(): geo.Country & {
            get name(): "UA";
            get ordinal(): 214;
        };
        static get AE(): geo.Country & {
            get name(): "AE";
            get ordinal(): 215;
        };
        static get GB(): geo.Country & {
            get name(): "GB";
            get ordinal(): 216;
        };
        static get US(): geo.Country & {
            get name(): "US";
            get ordinal(): 217;
        };
        static get UY(): geo.Country & {
            get name(): "UY";
            get ordinal(): 218;
        };
        static get UZ(): geo.Country & {
            get name(): "UZ";
            get ordinal(): 219;
        };
        static get VU(): geo.Country & {
            get name(): "VU";
            get ordinal(): 220;
        };
        static get VE(): geo.Country & {
            get name(): "VE";
            get ordinal(): 221;
        };
        static get VN(): geo.Country & {
            get name(): "VN";
            get ordinal(): 222;
        };
        static get WF(): geo.Country & {
            get name(): "WF";
            get ordinal(): 223;
        };
        static get YE(): geo.Country & {
            get name(): "YE";
            get ordinal(): 224;
        };
        static get ZM(): geo.Country & {
            get name(): "ZM";
            get ordinal(): 225;
        };
        static get ZW(): geo.Country & {
            get name(): "ZW";
            get ordinal(): 226;
        };
        static values(): Array<geo.Country>;
        static valueOf(value: string): geo.Country;
        get name(): "AF" | "AL" | "DZ" | "AS" | "AD" | "AO" | "AI" | "AG" | "AR" | "AM" | "AW" | "AU" | "AZ" | "BS" | "BH" | "BD" | "BB" | "BY" | "BE" | "BZ" | "BJ" | "BM" | "BT" | "BO" | "BA" | "BW" | "BR" | "IO" | "VG" | "VI" | "BN" | "BG" | "BF" | "BI" | "KH" | "CM" | "CA" | "CV" | "KY" | "CF" | "CL" | "CN" | "CO" | "KM" | "CG" | "CD" | "CK" | "CR" | "HR" | "CU" | "CY" | "CZ" | "DK" | "DJ" | "DM" | "DO" | "EC" | "EG" | "SV" | "GQ" | "ER" | "EE" | "ET" | "FK" | "FO" | "FJ" | "FI" | "FR" | "GF" | "PF" | "GA" | "GM" | "GE" | "DE" | "GH" | "GI" | "GR" | "GL" | "GD" | "GP" | "GU" | "GT" | "GN" | "GW" | "GY" | "HT" | "VA" | "HN" | "HK" | "HU" | "IS" | "IN" | "ID" | "CI" | "IR" | "IQ" | "IE" | "IL" | "IT" | "JM" | "JP" | "JO" | "KZ" | "KE" | "KI" | "KW" | "KG" | "LA" | "LV" | "LB" | "LS" | "LR" | "LY" | "LI" | "LT" | "LU" | "MO" | "MK" | "MG" | "MW" | "MY" | "MV" | "ML" | "MT" | "MH" | "MQ" | "MR" | "MU" | "YT" | "MX" | "FM" | "MD" | "MC" | "MN" | "ME" | "MS" | "MA" | "MZ" | "MM" | "NA" | "NR" | "NP" | "NL" | "NC" | "NZ" | "NI" | "NE" | "NG" | "NU" | "NF" | "KP" | "MP" | "NO" | "OM" | "PK" | "PW" | "PS" | "PA" | "PG" | "PY" | "PE" | "PH" | "PL" | "PT" | "PR" | "QA" | "XK" | "RE" | "RO" | "RU" | "RW" | "BL" | "SH" | "KN" | "LC" | "MF" | "PM" | "VC" | "WS" | "SM" | "SA" | "SN" | "RS" | "SC" | "SL" | "SG" | "SK" | "SI" | "SB" | "SO" | "ZA" | "KR" | "ES" | "LK" | "SD" | "SR" | "SZ" | "SE" | "CH" | "SY" | "TW" | "TJ" | "TZ" | "TH" | "TL" | "TG" | "TK" | "TT" | "TN" | "TR" | "TM" | "TC" | "TV" | "UG" | "UA" | "AE" | "GB" | "US" | "UY" | "UZ" | "VU" | "VE" | "VN" | "WF" | "YE" | "ZM" | "ZW";
        get ordinal(): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 132 | 133 | 134 | 135 | 136 | 137 | 138 | 139 | 140 | 141 | 142 | 143 | 144 | 145 | 146 | 147 | 148 | 149 | 150 | 151 | 152 | 153 | 154 | 155 | 156 | 157 | 158 | 159 | 160 | 161 | 162 | 163 | 164 | 165 | 166 | 167 | 168 | 169 | 170 | 171 | 172 | 173 | 174 | 175 | 176 | 177 | 178 | 179 | 180 | 181 | 182 | 183 | 184 | 185 | 186 | 187 | 188 | 189 | 190 | 191 | 192 | 193 | 194 | 195 | 196 | 197 | 198 | 199 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 209 | 210 | 211 | 212 | 213 | 214 | 215 | 216 | 217 | 218 | 219 | 220 | 221 | 222 | 223 | 224 | 225 | 226;
    }
}
export declare namespace geo {
    class GeoLocation {
        get lines(): kollections.List<string>;
        get country(): geo.Country;
        get cords(): Nullable<geo.LatLng>;
        get code(): Nullable<string>;
        get address(): string;
        get addressMultiline(): string;
    }
}
export declare namespace geo {
    interface LatLng {
        readonly lat: number;
        readonly lng: number;
    }
}
export declare namespace geo {
    interface LatLngAlt extends geo.LatLng {
        readonly alt: number;
        readonly lat: number;
        readonly lng: number;
    }
}
export declare namespace geo {
    function latLng(lat: number, lng: number): geo.LatLng;
    function latLngAlt(lat: number, lng: number, alt: number): geo.LatLngAlt;
}
export declare namespace geo {
    class AddressDto {
        get country(): geo.Country;
        get entries(): kollections.List<geo.Entry>;
        toLines(): kollections.List<string>;
    }
}
export declare namespace geo {
    class Entry {
        get label(): string;
        get value(): Nullable<string>;
    }
}
export declare namespace epsilon {
    interface Blob {
        readBytes(executor?: any/* koncurrent.Executor */): koncurrent.Later<Int8Array>;
    }
}
export declare namespace identifier {
    class ContactDto {
        get uid(): string;
        get name(): string;
        get comms(): any/* kotlin.collections.List<identifier.Comm> */;
        get role(): Nullable<string>;
        get isPrimary(): boolean;
        get emails(): kollections.List<identifier.UserEmail>;
        get phones(): kollections.List<identifier.UserPhone>;
    }
}
export declare namespace identifier {
    class CorporateBranchDto {
        get name(): string;
        get contacts(): any/* kotlin.collections.List<identifier.ContactDto> */;
        get location(): Nullable<geo.GeoLocation>;
        get address(): Nullable<string>;
    }
}
export declare namespace identifier {
    class CorporateDto extends identifier.LegalEntityDto {
        get uid(): string;
        get name(): string;
        get image(): Nullable<string>;
        get headQuarters(): identifier.CorporateBranchDto;
        get branches(): any/* kotlin.collections.List<identifier.CorporateBranchDto> */;
        get registrationNo(): Nullable<string>;
        get registrationDate(): Nullable<krono.LocalDate>;
        get taxPayerIdentificationNo(): Nullable<string>;
        get vatNo(): Nullable<string>;
        get website(): Nullable<string>;
        get industry(): Nullable<identifier.Industry>;
        get gid(): string;
        get type(): identifier.CorporateType;
    }
}
export declare namespace identifier {
    abstract class CorporateType {
        get label(): string;
        static get NGO(): identifier.CorporateType & {
            get name(): "NGO";
            get ordinal(): 0;
        };
        static get COMPANY(): identifier.CorporateType & {
            get name(): "COMPANY";
            get ordinal(): 1;
        };
        static get GOVERNMENT_INSTITUTION(): identifier.CorporateType & {
            get name(): "GOVERNMENT_INSTITUTION";
            get ordinal(): 2;
        };
        static values(): Array<identifier.CorporateType>;
        static valueOf(value: string): identifier.CorporateType;
        get name(): "NGO" | "COMPANY" | "GOVERNMENT_INSTITUTION";
        get ordinal(): 0 | 1 | 2;
    }
}
export declare namespace identifier {
    abstract class DocumentType {
        get label(): string;
        static get PASSPORT(): identifier.DocumentType & {
            get name(): "PASSPORT";
            get ordinal(): 0;
        };
        static get DRIVING_LICENSE(): identifier.DocumentType & {
            get name(): "DRIVING_LICENSE";
            get ordinal(): 1;
        };
        static get VOTERS_CARD(): identifier.DocumentType & {
            get name(): "VOTERS_CARD";
            get ordinal(): 2;
        };
        static get NATIONAL_ID(): identifier.DocumentType & {
            get name(): "NATIONAL_ID";
            get ordinal(): 3;
        };
        static get UNKNOWN(): identifier.DocumentType & {
            get name(): "UNKNOWN";
            get ordinal(): 4;
        };
        static get CLUB_CARD(): identifier.DocumentType & {
            get name(): "CLUB_CARD";
            get ordinal(): 5;
        };
        static get STUDENT_CARD(): identifier.DocumentType & {
            get name(): "STUDENT_CARD";
            get ordinal(): 6;
        };
        static values(): Array<identifier.DocumentType>;
        static valueOf(value: string): identifier.DocumentType;
        get name(): "PASSPORT" | "DRIVING_LICENSE" | "VOTERS_CARD" | "NATIONAL_ID" | "UNKNOWN" | "CLUB_CARD" | "STUDENT_CARD";
        get ordinal(): 0 | 1 | 2 | 3 | 4 | 5 | 6;
    }
}
export declare namespace identifier {
    abstract class Gender {
        static get Male(): identifier.Gender & {
            get name(): "Male";
            get ordinal(): 0;
        };
        static get Female(): identifier.Gender & {
            get name(): "Female";
            get ordinal(): 1;
        };
        static values(): Array<identifier.Gender>;
        static valueOf(value: string): identifier.Gender;
        get name(): "Male" | "Female";
        get ordinal(): 0 | 1;
    }
}
export declare namespace identifier {
    class IndividualDto extends identifier.LegalEntityDto {
        get uid(): string;
        get name(): string;
        get image(): Nullable<string>;
        get title(): Nullable<string>;
        get dob(): Nullable<krono.LocalDate>;
        get gender(): Nullable<identifier.Gender>;
        get comms(): any/* kotlin.collections.List<identifier.Comm> */;
        get gid(): string;
        get idDocumentNumber(): Nullable<string>;
        get idDocumentType(): Nullable<identifier.DocumentType>;
        get location(): Nullable<geo.GeoLocation>;
        get address(): Nullable<string>;
        get emails(): kollections.List<identifier.UserEmail>;
        get phones(): kollections.List<identifier.UserPhone>;
    }
}
export declare namespace identifier {
    abstract class Industry {
        get label(): string;
        static get AUTOMOTIVE(): identifier.Industry & {
            get name(): "AUTOMOTIVE";
            get ordinal(): 0;
        };
        static get BASIC_MATERIALS(): identifier.Industry & {
            get name(): "BASIC_MATERIALS";
            get ordinal(): 1;
        };
        static get BEAUTY_PRODUCTS(): identifier.Industry & {
            get name(): "BEAUTY_PRODUCTS";
            get ordinal(): 2;
        };
        static get CONSUMER_GOODS(): identifier.Industry & {
            get name(): "CONSUMER_GOODS";
            get ordinal(): 3;
        };
        static get CONSTRUCTION(): identifier.Industry & {
            get name(): "CONSTRUCTION";
            get ordinal(): 4;
        };
        static get CONSUMER_SERVICES(): identifier.Industry & {
            get name(): "CONSUMER_SERVICES";
            get ordinal(): 5;
        };
        static get EDUCATION(): identifier.Industry & {
            get name(): "EDUCATION";
            get ordinal(): 6;
        };
        static get ENERGY(): identifier.Industry & {
            get name(): "ENERGY";
            get ordinal(): 7;
        };
        static get ENTERTAINMENT(): identifier.Industry & {
            get name(): "ENTERTAINMENT";
            get ordinal(): 8;
        };
        static get FASHION(): identifier.Industry & {
            get name(): "FASHION";
            get ordinal(): 9;
        };
        static get FINANCIAL_SERVICES(): identifier.Industry & {
            get name(): "FINANCIAL_SERVICES";
            get ordinal(): 10;
        };
        static get FOOD_AND_BEVERAGE(): identifier.Industry & {
            get name(): "FOOD_AND_BEVERAGE";
            get ordinal(): 11;
        };
        static get HEALTH_CARE(): identifier.Industry & {
            get name(): "HEALTH_CARE";
            get ordinal(): 12;
        };
        static get INDUSTRIALS(): identifier.Industry & {
            get name(): "INDUSTRIALS";
            get ordinal(): 13;
        };
        static get MANUFACTURING(): identifier.Industry & {
            get name(): "MANUFACTURING";
            get ordinal(): 14;
        };
        static get OIL_AND_GAS(): identifier.Industry & {
            get name(): "OIL_AND_GAS";
            get ordinal(): 15;
        };
        static get PROFESSIONAL_SERVICES(): identifier.Industry & {
            get name(): "PROFESSIONAL_SERVICES";
            get ordinal(): 16;
        };
        static get TECHNOLOGY(): identifier.Industry & {
            get name(): "TECHNOLOGY";
            get ordinal(): 17;
        };
        static get TOURISM(): identifier.Industry & {
            get name(): "TOURISM";
            get ordinal(): 18;
        };
        static get TELECOMMUNICATIONS(): identifier.Industry & {
            get name(): "TELECOMMUNICATIONS";
            get ordinal(): 19;
        };
        static get UTILITIES(): identifier.Industry & {
            get name(): "UTILITIES";
            get ordinal(): 20;
        };
        static values(): Array<identifier.Industry>;
        static valueOf(value: string): identifier.Industry;
        get name(): "AUTOMOTIVE" | "BASIC_MATERIALS" | "BEAUTY_PRODUCTS" | "CONSUMER_GOODS" | "CONSTRUCTION" | "CONSUMER_SERVICES" | "EDUCATION" | "ENERGY" | "ENTERTAINMENT" | "FASHION" | "FINANCIAL_SERVICES" | "FOOD_AND_BEVERAGE" | "HEALTH_CARE" | "INDUSTRIALS" | "MANUFACTURING" | "OIL_AND_GAS" | "PROFESSIONAL_SERVICES" | "TECHNOLOGY" | "TOURISM" | "TELECOMMUNICATIONS" | "UTILITIES";
        get ordinal(): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
    }
}
export declare namespace identifier {
    interface LegalEntityApi extends hormone.Deleter<identifier.LegalEntityDto>, hormone.Loader<identifier.LegalEntityDto> {
        delete(uid: string): koncurrent.Later<Nullable<identifier.LegalEntityDto>>;
        deleteBulk(ids: kollections.List<string>): koncurrent.Later<kollections.List<Nullable<identifier.LegalEntityDto>>>;
        load(options: any/* kronecker.LoadOptions */): koncurrent.Later<kollections.List<identifier.LegalEntityDto>>;
        loadById(uid: string): koncurrent.Later<identifier.LegalEntityDto>;
    }
}
export declare namespace identifier {
    abstract class LegalEntityDto {
        get uid(): string;
        get gid(): string;
        get name(): string;
        get image(): Nullable<string>;
        get asIndividual(): Nullable<identifier.IndividualDto>;
        get asCorporate(): Nullable<identifier.CorporateDto>;
        get loc(): Nullable<geo.GeoLocation>;
    }
}
export declare namespace identifier {
    interface OrganisationProfileApi {
        update(params: identifier.params.CorporateParams): koncurrent.Later<identifier.CorporateDto>;
        updateLogo(logo: epsilon.Blob): koncurrent.Later<identifier.CorporateDto>;
        updateCurrency(currency: kash.Currency): koncurrent.Later<kash.Currency>;
        updateTimezone(tz: string): koncurrent.Later<string>;
        updateSalesTax(percentage: number): koncurrent.Later<number>;
    }
}
export declare namespace identifier {
    interface PersonalProfileApi {
        changeProfilePicture(file: epsilon.Blob): koncurrent.Later<identifier.IndividualDto>;
        changePassword(params: any/* identifier.params.PasswordParams */): koncurrent.Later<identifier.IndividualDto>;
        update(params: identifier.params.IndividualProfileParams): koncurrent.Later<identifier.IndividualDto>;
        addEmail(email: string): koncurrent.Later<identifier.IndividualDto>;
        beginEmailVerificationProcess(email: string): koncurrent.Later<string>;
        completeEmailVerificationProcess(token: string): koncurrent.Later<string>;
        deleteEmail(email: string): koncurrent.Later<identifier.IndividualDto>;
        beginPhoneVerificationProcess(phone: string): koncurrent.Later<string>;
        completePhoneVerificationProcess(phone: string): koncurrent.Later<string>;
        addPhone(phone: string): koncurrent.Later<identifier.IndividualDto>;
        deletePhone(phone: string): koncurrent.Later<identifier.IndividualDto>;
    }
}
export declare namespace identifier.params {
    class ContactParams {
        get name(): string;
        get role(): Nullable<string>;
        get email(): Nullable<string>;
        get phone(): Nullable<string>;
    }
}
export declare namespace identifier.params {
    class CorporateParams {
        get name(): string;
        get contactName(): Nullable<string>;
        get contactEmail(): Nullable<string>;
        get contactPhone(): Nullable<string>;
        get contactRole(): Nullable<string>;
        get industry(): Nullable<identifier.Industry>;
        get registrationNo(): Nullable<string>;
        get registrationDate(): Nullable<krono.LocalDate>;
        get tin(): Nullable<string>;
        get vat(): Nullable<string>;
        get website(): Nullable<string>;
        get hqLocation(): Nullable<geo.GeoLocation>;
        get address(): Nullable<geo.AddressDto>;
        get businessType(): Nullable<identifier.CorporateType>;
    }
}
export declare namespace identifier.params {
    class IndividualParams {
        get name(): string;
        get email(): Nullable<string>;
        get phone(): Nullable<string>;
        get title(): Nullable<string>;
        get dob(): Nullable<krono.LocalDate>;
        get gender(): Nullable<identifier.Gender>;
        get idDocumentNumber(): Nullable<string>;
        get idDocumentType(): Nullable<identifier.DocumentType>;
        get location(): Nullable<geo.GeoLocation>;
        get address(): Nullable<string>;
    }
}
export declare namespace identifier.params {
    class IndividualProfileParams {
        get name(): string;
        get title(): Nullable<string>;
        get dob(): Nullable<krono.LocalDate>;
        get gender(): Nullable<identifier.Gender>;
        get idDocumentNumber(): Nullable<string>;
        get idDocumentType(): Nullable<identifier.DocumentType>;
        get location(): Nullable<geo.GeoLocation>;
        get address(): Nullable<string>;
    }
}
export declare namespace kase {
    class Error {
        get message(): string;
        get type(): string;
        get cause(): string;
        get stackTrace(): string;
        toException(): any/* kotlin.RuntimeException */;
    }
}
export declare namespace kase {
    class Failed /* extends kase.internal.AbstractPossible<never> */ implements kase.Possible<never>, kase.Response<never> {
        get status(): kase.Status;
        get error(): kase.Error;
        valueOrThrowException(exp: Error): never;
        valueOrThrowMessage(msg: string): never;
        valueOrThrow(): never;
        valueOrNull(): Nullable<never>;
        exists(): boolean;
        valueOr(_default: never): never;
        getOrThrowException(exp: Error): never;
        getOrThrowMessage(msg: string): never;
        getOrThrow(): never;
        getOr(_default: never): never;
        getOrNull(): Nullable<never>;
        get asSuccessful(): Nullable<kase.Successful<never>>;
        get asFailure(): Nullable<kase.Failed>;
        get message(): string;
    }
}
export declare namespace kase {
    interface Response<D> extends kase.Possible<D> {
        readonly status: kase.Status;
        readonly asSuccessful?: Nullable<kase.Successful<D>>;
        readonly asFailure?: Nullable<kase.Failed>;
        readonly message: string;
        valueOrThrowException(exp: Error): D;
        valueOrThrowMessage(msg: string): D;
        valueOrThrow(): D;
        getOrThrowException(exp: Error): D;
        getOrThrowMessage(msg: string): D;
        getOrThrow(): D;
        valueOr(_default: D): D;
        getOr(_default: D): D;
        valueOrNull(): Nullable<D>;
        getOrNull(): Nullable<D>;
        exists(): boolean;
    }
}
export declare namespace kase {
    class Status {
        get code(): number;
        get message(): string;
    }
}
export declare namespace kase {
    class Successful<D> /* extends kase.internal.AbstractPossible<D> */ implements kase.Possible<D>, kase.Response<D> {
        get status(): kase.Status;
        get data(): D;
        static withData<D>(data: D): kase.Successful<D>;
        valueOrThrowException(exp: Error): never;
        valueOrThrowMessage(msg: string): D;
        valueOrThrow(): D;
        valueOrNull(): D;
        exists(): boolean;
        valueOr(_default: D): D;
        getOrThrowException(exp: Error): D;
        getOrThrowMessage(msg: string): D;
        getOrThrow(): D;
        getOr(_default: D): D;
        getOrNull(): Nullable<D>;
        get asSuccessful(): Nullable<kase.Successful<D>>;
        get asFailure(): Nullable<kase.Failed>;
        get message(): string;
    }
}
export declare namespace sentinel.params {
    class SignUpParams {
        get name(): string;
        get email(): string;
    }
}
export declare namespace sentinel {
    interface RegistrationApi {
        signUp(params: sentinel.params.SignUpParams): koncurrent.Later<sentinel.params.SignUpParams>;
        sendVerificationLink(email: string): koncurrent.Later<string>;
        verify(params: sentinel.params.VerificationParams): koncurrent.Later<sentinel.params.VerificationParams>;
        createUserAccount(params: sentinel.params.UserAccountParams): koncurrent.Later<sentinel.params.UserAccountParams>;
    }
}
export declare namespace sentinel {
    interface ProfileApi {
        readonly personal: identifier.PersonalProfileApi;
        readonly organisation: identifier.OrganisationProfileApi;
    }
}
export declare namespace cabinet {
    class Attachment {
        get uid(): string;
        get name(): string;
        get url(): string;
        get sizeInBytes(): number;
        get description(): Nullable<string>;
        get contentType(): Nullable<string>;
    }
}
export declare namespace cabinet {
    interface CabinetApi {
        readonly attachments: cabinet.RootDir;
    }
}
export declare namespace cabinet {
    interface Directory {
        rootDir(uid: string): cabinet.RootDir;
    }
}
export declare namespace cabinet {
    class FileUploadParam {
        get path(): string;
        get filename(): string;
        get blob(): epsilon.Blob;
    }
}
export declare namespace cabinet {
    interface RootDir {
        upload(param: cabinet.FileUploadParam): koncurrent.Later<cabinet.Attachment>;
        uploadMany(params: Array<cabinet.FileUploadParam>): kollections.Map<cabinet.FileUploadParam, koncurrent.Later<cabinet.Attachment>>;
        list(): koncurrent.Later<kollections.List<cabinet.Attachment>>;
        deleteAttachment(attachment: cabinet.Attachment): koncurrent.Later<cabinet.Attachment>;
    }
}
export declare namespace sentinel {
    interface AuthenticationApi {
        signIn(params: sentinel.params.SignInParams): koncurrent.Later<sentinel.UserSession>;
        session(): koncurrent.Later<sentinel.UserSession>;
        signOut(): koncurrent.Later<void>;
        sendPasswordResetLink(email: string): koncurrent.Later<string>;
        resetPassword(params: sentinel.params.PasswordResetParams): koncurrent.Later<sentinel.params.PasswordResetParams>;
    }
}
export declare namespace sentinel {
    class UserSession {
        get user(): identifier.IndividualDto;
        get secret(): string;
        get company(): identifier.CorporateDto;
        get currency(): kash.Currency;
        get timezone(): string;
        get salesTax(): number;
    }
}
export declare namespace sentinel.params {
    class PasswordResetParams {
        get password(): string;
        get passwordResetToken(): Nullable<string>;
    }
}
export declare namespace sentinel.params {
    class SendPasswordResetParams {
        get email(): string;
        get url(): string;
    }
}
export declare namespace sentinel.params {
    class SignInParams {
        get email(): string;
        get password(): string;
    }
}
export declare namespace picapital {
    interface PiCapitalApi {
        readonly authentication: sentinel.AuthenticationApi;
        readonly registration: sentinel.RegistrationApi;
    }
}
export declare namespace bringer {
    interface DownloadOptionsRaw {
        readonly url: string;
        readonly filename?: Nullable<string>;
        readonly destination?: Nullable<string>;
    }
}
export declare namespace bringer {
    interface Downloader {
        downloadWithFilename(url: string, filename: string): koncurrent.Later<Nullable<any>>;
        download(url: string): koncurrent.Later<Nullable<any>>;
        downloadNow(options: bringer.DownloadOptionsRaw): koncurrent.Later<Nullable<any>>;
    }
}
export declare namespace keep {
    interface Cacheable {
        readonly cache: any/* keep.Cache */;
    }
}
export declare namespace symphony {
    abstract class Visibility {
        get isVisible(): boolean;
        get isHidden(): boolean;
        toggled(): symphony.Visibility;
        static get Visible(): {
        } & symphony.Visibility;
        static get Hidden(): {
        } & symphony.Visibility;
    }
}
export declare namespace cinematic {
    interface Live<S> extends cinematic.Watchable<S> {
        readonly value: S;
        map<R>(transformer: (p0: S) => R): cinematic.Live<R>;
        stopAll(): void;
        watchWithModeAndExecutor(callback: (p0: S) => void, mode: cinematic.WatchMode, executor: any/* koncurrent.Executor */): cinematic.Watcher;
        watchWithExecutor(callback: (p0: S) => void, executor: any/* koncurrent.Executor */): cinematic.Watcher;
        watchWithMode(callback: (p0: S) => void, mode: cinematic.WatchMode): cinematic.Watcher;
        watch(callback: (p0: S) => void): cinematic.Watcher;
    }
}
export declare namespace cinematic {
    interface MutableLive<S> extends cinematic.Live<S> {
        value: S;
        undo(): void;
        redo(): void;
        map<R>(transformer: (p0: S) => R): cinematic.MutableLive<R>;
        dispatchValue(value: S): void;
        dispatch(): void;
        stopAll(): void;
        watchWithModeAndExecutor(callback: (p0: S) => void, mode: cinematic.WatchMode, executor: any/* koncurrent.Executor */): cinematic.Watcher;
        watchWithExecutor(callback: (p0: S) => void, executor: any/* koncurrent.Executor */): cinematic.Watcher;
        watchWithMode(callback: (p0: S) => void, mode: cinematic.WatchMode): cinematic.Watcher;
        watch(callback: (p0: S) => void): cinematic.Watcher;
    }
}
export declare namespace cinematic {
    function mutableLiveOf<S>(value: S, capacity?: number): cinematic.MutableLive<S>;
    function singleWatchableLiveOf<S>(value: S, capacity?: number): cinematic.MutableLive<S>;
}
export declare namespace cinematic {
    abstract class WatchMode {
        static get Eagerly(): cinematic.WatchMode & {
            get name(): "Eagerly";
            get ordinal(): 0;
        };
        static get Casually(): cinematic.WatchMode & {
            get name(): "Casually";
            get ordinal(): 1;
        };
        static values(): Array<cinematic.WatchMode>;
        static valueOf(value: string): cinematic.WatchMode;
        get name(): "Eagerly" | "Casually";
        get ordinal(): 0 | 1;
    }
}
export declare namespace cinematic {
    interface Watchable<S> {
        readonly value: S;
        watchWithModeAndExecutor(callback: (p0: S) => void, mode: cinematic.WatchMode, executor: any/* koncurrent.Executor */): cinematic.Watcher;
        watchWithExecutor(callback: (p0: S) => void, executor: any/* koncurrent.Executor */): cinematic.Watcher;
        watchWithMode(callback: (p0: S) => void, mode: cinematic.WatchMode): cinematic.Watcher;
        watch(callback: (p0: S) => void): cinematic.Watcher;
    }
}
export declare namespace cinematic {
    interface Watcher {
        stop(): void;
    }
}
export declare namespace lexi {
    interface AppenderConfigurationJson {
        readonly type: string;
        readonly level?: Nullable<string>;
        readonly format?: Nullable<lexi.LogFormatterConfigurationJson>;
    }
}
export declare namespace lexi {
    interface LogFormatterConfigurationJson {
        readonly type: string;
        readonly source?: Nullable<boolean>;
        readonly status?: Nullable<boolean>;
        readonly verbose?: Nullable<boolean>;
    }
}
export declare namespace lexi {
    interface LoggingConfigurationJson {
        readonly level?: Nullable<string>;
        readonly verbose?: Nullable<boolean>;
        readonly source?: Nullable<boolean>;
        readonly status?: Nullable<boolean>;
        readonly appenders: Array<lexi.AppenderConfigurationJson>;
    }
}
export declare namespace symphony {
    interface BaseField<O> extends symphony.Field<O, symphony.BaseFieldState<O>>, symphony.BaseFieldState<O>, symphony.properties.Settable<O> {
        readonly state: cinematic.Live<symphony.BaseFieldState<O>>;
        readonly visibility: symphony.Visibility;
        show(show?: Nullable<boolean>): void;
        hide(hide?: Nullable<boolean>): void;
        setVisibility(v: symphony.Visibility): void;
        clear(): void;
        readonly output?: Nullable<O>;
        readonly required: boolean;
        readonly feedbacks: symphony.Feedbacks;
        readonly name: string;
        readonly label: symphony.Label;
        readonly hint: string;
        setValue(value: Nullable<O>): void;
    }
}
export declare namespace symphony {
    interface BaseFieldState<O> extends symphony.FieldState<O> {
        readonly name: string;
        readonly label: symphony.Label;
        readonly hint: string;
        readonly output?: Nullable<O>;
        readonly required: boolean;
        readonly visibility: symphony.Visibility;
        readonly feedbacks: symphony.Feedbacks;
    }
}
export declare namespace symphony {
    class Button implements symphony.properties.Labeled {
        get name(): string;
        get label(): symphony.Label;
    }
}
export declare namespace symphony {
    class Feedbacks {
        get items(): kollections.List<symphony.Feedback>;
        get errors(): kollections.List<string>;
        get warnings(): kollections.List<string>;
    }
    interface Feedback {
        readonly message: string;
        readonly asWarning?: Nullable<symphony.Warning>;
        readonly asError?: Nullable<symphony.Error>;
    }
    class Warning implements symphony.Feedback {
        get message(): string;
        get asWarning(): Nullable<symphony.Warning>;
        get asError(): Nullable<symphony.Error>;
    }
    class Error implements symphony.Feedback {
        get message(): string;
        get asWarning(): Nullable<symphony.Warning>;
        get asError(): Nullable<symphony.Error>;
    }
}
export declare namespace symphony {
    interface Field<O, S extends symphony.FieldState<O>> extends symphony.properties.Hideable, symphony.properties.Clearable, symphony.FieldState<O>/*, symphony.properties.Resetable, symphony.properties.Validable, symphony.properties.Finishable */ {
        readonly state: cinematic.Live<S>;
        readonly visibility: symphony.Visibility;
        show(show?: Nullable<boolean>): void;
        hide(hide?: Nullable<boolean>): void;
        setVisibility(v: symphony.Visibility): void;
        clear(): void;
        readonly output?: Nullable<O>;
        readonly required: boolean;
        readonly feedbacks: symphony.Feedbacks;
    }
}
export declare namespace symphony {
    interface FieldState<O> {
        readonly output?: Nullable<O>;
        readonly required: boolean;
        readonly visibility: symphony.Visibility;
        readonly feedbacks: symphony.Feedbacks;
    }
}
export declare namespace symphony {
    abstract class Fields<O extends any> implements symphony.properties.Clearable/*, symphony.properties.Validable, symphony.properties.Finishable, symphony.properties.Resetable */ {
        get output(): O;
        get state(): cinematic.MutableLive<symphony.Fields.State<O>>;
        clear(): void;
        getOrCreate<F extends symphony.Field<any /*UnknownType **/, any /*UnknownType **/>>(_this_: symphony.Fields<any /*UnknownType **/>, property: any/* kotlin.reflect.KProperty<Nullable<any>> */, builder: () => F): F;
        notify(): void;
    }
    namespace Fields {
        class State<O> {
            get output(): O;
            get feedbacks(): symphony.Feedbacks;
        }
    }
}
export declare namespace symphony {
    interface Form<R, O extends any, F extends symphony.Fields<O>> extends symphony.FormInfo, symphony.properties.Clearable, symphony.properties.Hideable/*, symphony.properties.Resetable */ {
        readonly state: cinematic.Live<symphony.FormState<O, R>>;
        readonly fields: F;
        exit(): void;
        submit(): koncurrent.Later<R>;
        readonly heading: string;
        readonly details: string;
        clear(): void;
        readonly visibility: symphony.Visibility;
        show(show?: Nullable<boolean>): void;
        hide(hide?: Nullable<boolean>): void;
        setVisibility(v: symphony.Visibility): void;
    }
}
export declare namespace symphony {
    interface FormInfo {
        readonly heading: string;
        readonly details: string;
    }
}
export declare namespace symphony {
    interface FormStage extends symphony.FormInfo {
        readonly fields: symphony.Fields<any /*UnknownType **/>;
        readonly onNext?: Nullable<() => void>;
        readonly onPrev?: Nullable<() => void>;
        readonly heading: string;
        readonly details: string;
    }
}
export declare namespace symphony {
    class FormState<O, R> {
        get visibility(): symphony.Visibility;
        get phase(): symphony.FormPhase<O, R>;
        get isSubmitting(): boolean;
    }
    interface FormPhase<O, R> {
        readonly asCapturing?: Nullable<typeof symphony.CapturingPhase>;
        readonly asValidating?: Nullable<symphony.ValidatingPhase<O>>;
        readonly asSubmitting?: Nullable<symphony.SubmittingPhase<O>>;
        readonly asSuccess?: Nullable<symphony.SuccessPhase<O, R>>;
        readonly asFailure?: Nullable<symphony.FailurePhase<O>>;
    }
    const CapturingPhase: {
        get asCapturing(): Nullable<typeof symphony.CapturingPhase>;
        get asValidating(): Nullable<symphony.ValidatingPhase<never>>;
        get asSubmitting(): Nullable<symphony.SubmittingPhase<never>>;
        get asSuccess(): Nullable<symphony.SuccessPhase<never, never>>;
        get asFailure(): Nullable<symphony.FailurePhase<never>>;
    } & symphony.FormPhase<never, never>;
    class ValidatingPhase<O> implements symphony.FormPhase<O, never> {
        get output(): O;
        get asCapturing(): Nullable<typeof symphony.CapturingPhase>;
        get asValidating(): Nullable<symphony.ValidatingPhase<O>>;
        get asSubmitting(): Nullable<symphony.SubmittingPhase<O>>;
        get asSuccess(): Nullable<symphony.SuccessPhase<O, never>>;
        get asFailure(): Nullable<symphony.FailurePhase<O>>;
    }
    class SubmittingPhase<O> implements symphony.FormPhase<O, never> {
        get output(): O;
        get asCapturing(): Nullable<typeof symphony.CapturingPhase>;
        get asValidating(): Nullable<symphony.ValidatingPhase<O>>;
        get asSubmitting(): Nullable<symphony.SubmittingPhase<O>>;
        get asSuccess(): Nullable<symphony.SuccessPhase<O, never>>;
        get asFailure(): Nullable<symphony.FailurePhase<O>>;
    }
    class SuccessPhase<O, R> implements symphony.FormPhase<O, R> {
        get output(): O;
        get result(): R;
        get asCapturing(): Nullable<typeof symphony.CapturingPhase>;
        get asValidating(): Nullable<symphony.ValidatingPhase<O>>;
        get asSubmitting(): Nullable<symphony.SubmittingPhase<O>>;
        get asSuccess(): Nullable<symphony.SuccessPhase<O, R>>;
        get asFailure(): Nullable<symphony.FailurePhase<O>>;
    }
    class FailurePhase<O> implements symphony.FormPhase<O, never> {
        get output(): O;
        get reasons(): kollections.List<string>;
        get asCapturing(): Nullable<typeof symphony.CapturingPhase>;
        get asValidating(): Nullable<symphony.ValidatingPhase<O>>;
        get asSubmitting(): Nullable<symphony.SubmittingPhase<O>>;
        get asSuccess(): Nullable<symphony.SuccessPhase<O, never>>;
        get asFailure(): Nullable<symphony.FailurePhase<O>>;
    }
}
export declare namespace symphony {
    class Label {
        get text(): string;
        capitalizedWithAstrix(): string;
        capitalizedWithoutAstrix(): string;
    }
}
export declare namespace symphony {
    interface ListField<E> extends symphony.Field<kollections.List<E>, symphony.ListFieldState<E>>, symphony.ListFieldState<E> {
        add(item: E): void;
        addAll(items: kollections.List<E>): void;
        remove(item: E): void;
        removeAll(items?: Nullable<kollections.List<E>>): void;
        update(item: E, updater: () => E): void;
        readonly state: cinematic.Live<symphony.ListFieldState<E>>;
        readonly visibility: symphony.Visibility;
        show(show?: Nullable<boolean>): void;
        hide(hide?: Nullable<boolean>): void;
        setVisibility(v: symphony.Visibility): void;
        clear(): void;
        readonly output: kollections.MutableList<E>;
        readonly required: boolean;
        readonly feedbacks: symphony.Feedbacks;
    }
}
export declare namespace symphony {
    interface ListFieldState<E> extends symphony.FieldState<kollections.List<E>> {
        readonly output: kollections.MutableList<E>;
        readonly required: boolean;
        readonly visibility: symphony.Visibility;
        readonly feedbacks: symphony.Feedbacks;
    }
}
export declare namespace symphony {
    interface MultiStageForm<R, O extends any, S extends symphony.FormStage> extends symphony.properties.Clearable, symphony.properties.Hideable/*, symphony.properties.Resetable */ {
        readonly stages: kollections.List<S>;
        readonly state: cinematic.Live<symphony.MultiStageFormState<R, O, S>>;
        exit(): void;
        prev(): koncurrent.Later<any /*UnknownType **/>;
        next(): koncurrent.Later<any /*UnknownType **/>;
        clear(): void;
        readonly visibility: symphony.Visibility;
        show(show?: Nullable<boolean>): void;
        hide(hide?: Nullable<boolean>): void;
        setVisibility(v: symphony.Visibility): void;
    }
}
export declare namespace symphony {
    class MultiStageFormState<R, O, S extends symphony.FormStage> {
        get visibility(): symphony.Visibility;
        get stages(): kollections.List<S>;
        get stage(): symphony.MultiStageFormState.StageState<S>;
        get phase(): symphony.FormPhase<O, R>;
        get output(): O;
        get progress(): symphony.MultiStageFormState.Progress;
    }
    namespace MultiStageFormState {
        class StageState<S> {
            get current(): S;
            get isFirst(): boolean;
            get isLast(): boolean;
        }
        class Progress {
            get step(): number;
            get total(): number;
            get percentage(): number;
        }
    }
}
export declare namespace symphony {
    class Option {
        get label(): string;
        get value(): string;
        get selected(): boolean;
    }
}
export declare namespace symphony {
    class Range<T> {
        get start(): T;
        get end(): T;
    }
}
export declare namespace symphony {
    interface RangeField<O extends any> extends symphony.Field<symphony.Range<O>, symphony.RangeFieldState<O>> {
        setStart(value: Nullable<O>): void;
        setEnd(value: Nullable<O>): void;
        readonly state: cinematic.Live<symphony.RangeFieldState<O>>;
        readonly visibility: symphony.Visibility;
        show(show?: Nullable<boolean>): void;
        hide(hide?: Nullable<boolean>): void;
        setVisibility(v: symphony.Visibility): void;
        clear(): void;
        readonly output?: Nullable<symphony.Range<O>>;
        readonly required: boolean;
        readonly feedbacks: symphony.Feedbacks;
    }
}
export declare namespace symphony {
    interface RangeFieldState<O extends any> extends symphony.FieldState<symphony.Range<O>> {
        readonly start?: Nullable<O>;
        readonly end?: Nullable<O>;
        readonly visibility: symphony.Visibility;
        readonly required: boolean;
        readonly feedbacks: symphony.Feedbacks;
        readonly input: symphony.Range<Nullable<O>>;
        readonly output?: Nullable<symphony.Range<O>>;
    }
}
export declare namespace symphony {
    interface SubmitConfig /* extends lexi.Logable */ {
        readonly exitOnSuccess: boolean;
    }
}
export declare namespace symphony {
    interface TransState<I, O> extends symphony.FieldState<O> {
        readonly input?: Nullable<I>;
        readonly output?: Nullable<O>;
        readonly required: boolean;
        readonly visibility: symphony.Visibility;
        readonly feedbacks: symphony.Feedbacks;
    }
}
export declare namespace symphony {
    interface TransformingField<I, O> extends symphony.Field<O, symphony.TransState<I, O>>, symphony.properties.Settable<I>, symphony.TransState<I, O> {
        readonly state: cinematic.Live<symphony.TransState<I, O>>;
        readonly visibility: symphony.Visibility;
        show(show?: Nullable<boolean>): void;
        hide(hide?: Nullable<boolean>): void;
        setVisibility(v: symphony.Visibility): void;
        clear(): void;
        readonly output?: Nullable<O>;
        readonly required: boolean;
        readonly feedbacks: symphony.Feedbacks;
        setValue(value: Nullable<I>): void;
        readonly input?: Nullable<I>;
    }
}
export declare namespace symphony.internal {
    class AbstractRangeField<O extends any> /* extends symphony.internal.AbstractHideable */ implements symphony.properties.Hideable, symphony.RangeField<O> {
        setStart(value: Nullable<O>): void;
        setEnd(value: Nullable<O>): void;
        clear(): void;
        setVisibility(v: symphony.Visibility): void;
        get state(): cinematic.MutableLive<symphony.internal.AbstractRangeField.State<O>>;
        get output(): Nullable<symphony.Range<O>>;
        get required(): boolean;
        get visibility(): symphony.Visibility;
        get feedbacks(): symphony.Feedbacks;
        show(show?: Nullable<boolean>): void;
        hide(hide?: Nullable<boolean>): void;
    }
    namespace AbstractRangeField {
        class State<O extends any> implements symphony.RangeFieldState<O> {
            get name(): string;
            get start(): Nullable<O>;
            get end(): Nullable<O>;
            get visibility(): symphony.Visibility;
            get required(): boolean;
            get feedbacks(): symphony.Feedbacks;
            get input(): symphony.Range<Nullable<O>>;
            get output(): Nullable<symphony.Range<O>>;
        }
    }
}
export declare namespace symphony.internal {
    class BaseFieldImpl<O> /* extends symphony.internal.AbstractHideable */ implements symphony.properties.Hideable, symphony.BaseField<O> {
        setValue(value: Nullable<O>): void;
        get state(): cinematic.MutableLive<symphony.internal.BaseFieldImpl.State<O>>;
        setVisibility(v: symphony.Visibility): void;
        clear(): void;
        get name(): string;
        get label(): symphony.Label;
        get hint(): string;
        get output(): Nullable<O>;
        get required(): boolean;
        get visibility(): symphony.Visibility;
        get feedbacks(): symphony.Feedbacks;
        show(show?: Nullable<boolean>): void;
        hide(hide?: Nullable<boolean>): void;
    }
    namespace BaseFieldImpl {
        class State<O> implements symphony.BaseFieldState<O> {
            get name(): string;
            get label(): symphony.Label;
            get hint(): string;
            get visibility(): symphony.Visibility;
            get required(): boolean;
            get output(): Nullable<O>;
            get feedbacks(): symphony.Feedbacks;
        }
    }
}
export declare namespace symphony.internal {
}
export declare namespace symphony.internal {
}
export declare namespace symphony.properties {
    interface Clearable {
        clear(): void;
    }
}
export declare namespace symphony.properties {
    interface Hideable {
        readonly visibility: symphony.Visibility;
        show(show?: Nullable<boolean>): void;
        hide(hide?: Nullable<boolean>): void;
        setVisibility(v: symphony.Visibility): void;
    }
}
export declare namespace symphony.properties {
    interface Hintable {
        readonly hint: string;
    }
}
export declare namespace symphony.properties {
    interface Labeled {
        readonly label: symphony.Label;
    }
}
export declare namespace symphony.properties {
    interface Mutable {
        readonly isReadonly: boolean;
    }
}
export declare namespace symphony.properties {
    interface Requireble {
        readonly isRequired: boolean;
    }
}
export declare namespace symphony.properties {
    interface Settable<V> {
        setValue(value: Nullable<V>): void;
    }
}
export declare namespace symphony.properties {
    interface SettableRange<V> {
        setStart(value: Nullable<V>): void;
        setEnd(value: Nullable<V>): void;
    }
}
export declare namespace symphony.properties {
    interface Typeable {
        type(text: string): void;
    }
}
export declare namespace formatter {
    /** @deprecated use liquid instead */
    interface NumberFormatter {
        readonly options: formatter.NumberFormatterRawOptions;
        formatNumber(number: number): string;
    }
}
export declare namespace formatter {
    /** @deprecated use liquid instead */
    interface NumberFormatterRawOptions {
        readonly abbreviate?: Nullable<boolean>;
        readonly prefix?: Nullable<string>;
        readonly postfix?: Nullable<string>;
        readonly decimals?: Nullable<number>;
        readonly enforceDecimals?: Nullable<boolean>;
        readonly decimalSeparator?: Nullable<string>;
        readonly thousandsSeparator?: Nullable<string>;
    }
}
export declare namespace liquid {
    interface NumberFormatter {
        readonly options: liquid.NumberFormatterRawOptions;
        formatNumber(number: number): string;
    }
}
export declare namespace liquid {
    interface NumberFormatterRawOptions {
        readonly abbreviate?: Nullable<boolean>;
        readonly prefix?: Nullable<string>;
        readonly postfix?: Nullable<string>;
        readonly decimals?: Nullable<number>;
        readonly enforceDecimals?: Nullable<boolean>;
        readonly decimalSeparator?: Nullable<string>;
        readonly thousandsSeparator?: Nullable<string>;
    }
}
export declare namespace symphony {
    interface NumberField<N extends unknown/* kotlin.Number */> extends symphony.BaseField<N> {
        increment(step?: Nullable<N>): void;
        decrement(step?: Nullable<N>): void;
        setNumber(double?: Nullable<number>): void;
        setText(text?: Nullable<string>): void;
        readonly state: cinematic.Live<symphony.BaseFieldState<N>>;
        readonly visibility: symphony.Visibility;
        show(show?: Nullable<boolean>): void;
        hide(hide?: Nullable<boolean>): void;
        setVisibility(v: symphony.Visibility): void;
        clear(): void;
        readonly output?: Nullable<N>;
        readonly required: boolean;
        readonly feedbacks: symphony.Feedbacks;
        readonly name: string;
        readonly label: symphony.Label;
        readonly hint: string;
        setValue(value: Nullable<N>): void;
    }
}
export declare namespace symphony {
    interface TransformingNumberField<I extends Nullable<any>/* Nullable<kotlin.Number> */, O> extends symphony.TransformingField<I, O> {
        increment(step?: Nullable<I>): void;
        decrement(step?: Nullable<I>): void;
        setNumber(double?: Nullable<number>): void;
        setText(text?: Nullable<string>): void;
        readonly state: cinematic.Live<symphony.TransState<I, O>>;
        readonly visibility: symphony.Visibility;
        show(show?: Nullable<boolean>): void;
        hide(hide?: Nullable<boolean>): void;
        setVisibility(v: symphony.Visibility): void;
        clear(): void;
        readonly output?: Nullable<O>;
        readonly required: boolean;
        readonly feedbacks: symphony.Feedbacks;
        setValue(value: Nullable<I>): void;
        readonly input?: Nullable<I>;
    }
}
export declare namespace symphony {
    interface BooleanField extends symphony.BaseField<boolean> {
        toggle(): void;
        readonly state: cinematic.Live<symphony.BaseFieldState<boolean>>;
        readonly visibility: symphony.Visibility;
        show(show?: Nullable<boolean>): void;
        hide(hide?: Nullable<boolean>): void;
        setVisibility(v: symphony.Visibility): void;
        clear(): void;
        readonly output?: Nullable<boolean>;
        readonly required: boolean;
        readonly feedbacks: symphony.Feedbacks;
        readonly name: string;
        readonly label: symphony.Label;
        readonly hint: string;
        setValue(value: Nullable<boolean>): void;
    }
}
export declare namespace symphony {
    interface ChoiceField<O> {
        readonly items: kollections.Collection<O>;
        readonly mapper: (p0: O) => symphony.Option;
    }
}
export declare namespace symphony {
    interface MultiChoiceField<O> extends symphony.ListField<O>, symphony.ChoiceField<O> {
        readonly optionLabels: kollections.List<string>;
        readonly optionValues: kollections.List<string>;
        readonly selectedValues: kollections.Set<string>;
        readonly selectedItems: kollections.List<O>;
        readonly selectedOptions: kollections.List<symphony.Option>;
        readonly options: kollections.List<symphony.Option>;
        readonly optionsWithSelectLabel: kollections.List<symphony.Option>;
        isSelected(item: O): boolean;
        isSelectedValue(v: string): boolean;
        isSelectedOption(o: symphony.Option): boolean;
        isSelectedLabel(l: string): boolean;
        addSelectedItem(item: O): void;
        addSelectedOption(o: symphony.Option): void;
        addSelectedValue(v: string): void;
        addSelectLabel(l: string): void;
        unselectOption(o: symphony.Option): void;
        unselectItem(i: O): void;
        unselectValue(v: string): void;
        unselectLabel(l: string): void;
        unselectAll(): void;
        toggleSelectedValue(v: string): void;
        toggleSelectedOption(o: symphony.Option): void;
        toggleSelectedItem(i: O): void;
        toggleSelectedLabel(l: string): void;
        add(item: O): void;
        addAll(items: kollections.List<O>): void;
        remove(item: O): void;
        removeAll(items?: Nullable<kollections.List<O>>): void;
        update(item: O, updater: () => O): void;
        readonly state: cinematic.Live<symphony.ListFieldState<O>>;
        readonly visibility: symphony.Visibility;
        show(show?: Nullable<boolean>): void;
        hide(hide?: Nullable<boolean>): void;
        setVisibility(v: symphony.Visibility): void;
        clear(): void;
        readonly output: kollections.MutableList<O>;
        readonly required: boolean;
        readonly feedbacks: symphony.Feedbacks;
        readonly items: kollections.Collection<O>;
        readonly mapper: (p0: O) => symphony.Option;
    }
}
export declare namespace symphony {
    abstract class SearchBy {
        static get Filtering(): symphony.SearchBy & {
            get name(): "Filtering";
            get ordinal(): 0;
        };
        static get Ordering(): symphony.SearchBy & {
            get name(): "Ordering";
            get ordinal(): 1;
        };
        static values(): Array<symphony.SearchBy>;
        static valueOf(value: string): symphony.SearchBy;
        get name(): "Filtering" | "Ordering";
        get ordinal(): 0 | 1;
    }
}
export declare namespace symphony {
    interface Searchable {
        setSearchKey(key?: Nullable<string>): string;
        appendSearchKey(key?: Nullable<string>): string;
        backspaceSearchKey(): string;
        clearSearchKey(): string;
        setSearchBy(sb: symphony.SearchBy): void;
        setSearchByOrdering(): void;
        setSearchByFiltering(): void;
        search(): void;
    }
}
export declare namespace symphony {
    interface SearchableState {
        readonly key: string;
        readonly searchBy: symphony.SearchBy;
    }
}
export declare namespace symphony {
    interface SingleChoiceField<O> extends symphony.Field<O, symphony.SingleChoiceFieldState<O>>, symphony.BaseFieldState<O>, symphony.properties.Settable<O>, symphony.ChoiceField<O>, symphony.Searchable {
        readonly selectedItem?: Nullable<O>;
        readonly selectedOption?: Nullable<symphony.Option>;
        options(withSelect?: boolean): kollections.List<symphony.Option>;
        selectOption(option: symphony.Option): void;
        selectLabel(optionLabel: string): void;
        selectValue(optionValue: string): void;
        selectItem(item: O): void;
        select(item: O): void;
        unselect(): void;
        readonly state: cinematic.Live<symphony.SingleChoiceFieldState<O>>;
        readonly visibility: symphony.Visibility;
        show(show?: Nullable<boolean>): void;
        hide(hide?: Nullable<boolean>): void;
        setVisibility(v: symphony.Visibility): void;
        clear(): void;
        readonly output?: Nullable<O>;
        readonly required: boolean;
        readonly feedbacks: symphony.Feedbacks;
        readonly name: string;
        readonly label: symphony.Label;
        readonly hint: string;
        setValue(value: Nullable<O>): void;
        readonly items: kollections.Collection<O>;
        readonly mapper: (p0: O) => symphony.Option;
        setSearchKey(key?: Nullable<string>): string;
        appendSearchKey(key?: Nullable<string>): string;
        backspaceSearchKey(): string;
        clearSearchKey(): string;
        setSearchBy(sb: symphony.SearchBy): void;
        setSearchByOrdering(): void;
        setSearchByFiltering(): void;
        search(): void;
    }
}
export declare namespace symphony {
    interface SingleChoiceFieldState<O> extends symphony.BaseFieldState<O>, symphony.SearchableState {
        readonly items: kollections.List<O>;
        readonly selectedItem?: Nullable<O>;
        readonly selectedOption?: Nullable<symphony.Option>;
        readonly name: string;
        readonly label: symphony.Label;
        readonly hint: string;
        readonly output?: Nullable<O>;
        readonly required: boolean;
        readonly visibility: symphony.Visibility;
        readonly feedbacks: symphony.Feedbacks;
        readonly key: string;
        readonly searchBy: symphony.SearchBy;
    }
}
export declare namespace symphony {
    interface TransformingSingleChoiceField<I, O> extends symphony.TransformingField<I, O>, symphony.ChoiceField<I> {
        readonly selectedItem?: Nullable<O>;
        readonly selectedOption?: Nullable<symphony.Option>;
        options(withSelect?: boolean): kollections.List<symphony.Option>;
        selectOption(option: symphony.Option): void;
        selectLabel(optionLabel: string): void;
        selectValue(optionValue: string): void;
        selectItem(item: I): void;
        select(item: I): void;
        unselect(): void;
        readonly state: cinematic.Live<symphony.TransState<I, O>>;
        readonly visibility: symphony.Visibility;
        show(show?: Nullable<boolean>): void;
        hide(hide?: Nullable<boolean>): void;
        setVisibility(v: symphony.Visibility): void;
        clear(): void;
        readonly output?: Nullable<O>;
        readonly required: boolean;
        readonly feedbacks: symphony.Feedbacks;
        setValue(value: Nullable<I>): void;
        readonly input?: Nullable<I>;
        readonly items: kollections.Collection<I>;
        readonly mapper: (p0: I) => symphony.Option;
    }
}
export declare namespace symphony.internal {
    abstract class AbstractSingleChoiceField<O> /* extends symphony.internal.AbstractHideable */ implements symphony.properties.Hideable, symphony.Field<O, symphony.SingleChoiceFieldState<O>>, symphony.BaseFieldState<O>, symphony.properties.Settable<O> {
        setValue(value: Nullable<O>): void;
        get state(): cinematic.MutableLive<symphony.SingleChoiceFieldState<O>/* symphony.internal.SingleChoiceFieldStateImpl<O> */>;
        setVisibility(v: symphony.Visibility): void;
        clear(): void;
        get name(): string;
        get label(): symphony.Label;
        get hint(): string;
        get output(): Nullable<O>;
        get required(): boolean;
        get visibility(): symphony.Visibility;
        get feedbacks(): symphony.Feedbacks;
        show(show?: Nullable<boolean>): void;
        hide(hide?: Nullable<boolean>): void;
    }
}
export declare namespace symphony {
    interface PhoneField extends symphony.Field<symphony.PhoneOutput, symphony.PhoneFieldState>, symphony.PhoneFieldState {
        options(withSelect?: boolean): kollections.List<symphony.Option>;
        searchByFiltering(key?: Nullable<string>): void;
        searchByOrdering(key?: Nullable<string>): void;
        clearSearch(): void;
        selectCountryOption(option: symphony.Option): void;
        selectCountryLabel(optionLabel: string): void;
        selectCountryValue(optionValue: string): void;
        unsetCountry(): void;
        setCountry(country?: Nullable<geo.Country>): void;
        setBody(value: Nullable<string>): void;
        setBodyAsLong(long?: Nullable<any>/* Nullable<kotlin.Long> */): void;
        readonly state: cinematic.Live<symphony.PhoneFieldState>;
        readonly visibility: symphony.Visibility;
        show(show?: Nullable<boolean>): void;
        hide(hide?: Nullable<boolean>): void;
        setVisibility(v: symphony.Visibility): void;
        clear(): void;
        readonly output?: Nullable<symphony.PhoneOutput>;
        readonly required: boolean;
        readonly feedbacks: symphony.Feedbacks;
        readonly name: string;
        readonly label: symphony.Label;
        readonly countries: kollections.List<geo.Country>;
        readonly hint: string;
        readonly country?: Nullable<geo.Country>;
        readonly body?: Nullable<any>/* Nullable<kotlin.Long> */;
        readonly option?: Nullable<symphony.Option>;
    }
}
export declare namespace symphony {
    interface PhoneFieldState extends symphony.FieldState<symphony.PhoneOutput> {
        readonly name: string;
        readonly label: symphony.Label;
        readonly countries: kollections.List<geo.Country>;
        readonly hint: string;
        readonly country?: Nullable<geo.Country>;
        readonly body?: Nullable<any>/* Nullable<kotlin.Long> */;
        readonly option?: Nullable<symphony.Option>;
        readonly output?: Nullable<symphony.PhoneOutput>;
        readonly required: boolean;
        readonly visibility: symphony.Visibility;
        readonly feedbacks: symphony.Feedbacks;
    }
}
export declare namespace symphony {
    class PhoneOutput {
        get country(): geo.Country;
        get body(): any/* kotlin.Long */;
        get bodyAsDouble(): number;
    }
}
export declare namespace cinematic {
    abstract class LazyScene<S> extends cinematic.Scene<kase.LazyState<S>> {
        static asPending<S>(): cinematic.LazyScene<S>;
        static asSuccess<S>(state: S): cinematic.LazyScene<S>;
        deInitialize(): void;
    }
}
export declare namespace cinematic {
    abstract class Scene<S> extends cinematic.BaseScene {
        get ui(): cinematic.MutableLive<S>;
    }
}
export declare namespace cinematic {
    abstract class BaseScene {
    }
}
export declare namespace snitch {
    class Bubble<I, B> {
        get title(): string;
        get icon(): I;
        get body(): B;
        get timeoutSeconds(): number;
        get type(): snitch.Type;
        get actions(): kollections.List<kevlar.Action0<void>>;
    }
}
export declare namespace snitch {
    abstract class BubbleBuilder<I, B> extends kevlar.ActionsBuilder<snitch.BubbleBuilder<I, B>, () => void> {
        show(): void;
        withIcon(i: I): snitch.BubbleBuilder<I, B>;
        withBody(b: B): snitch.BubbleBuilder<I, B>;
        withTimeoutSeconds(value: number): snitch.BubbleBuilder<I, B>;
    }
}
export declare namespace snitch {
    interface Snitch {
        readonly bubbles: cinematic.Live<kollections.List<snitch.Bubble<Nullable<any>, Nullable<any>>>>;
        makeNewSuccess(title: string): snitch.BubbleBuilder<Nullable<any>, Nullable<any>>;
        makeNewInfo(title: string): snitch.BubbleBuilder<Nullable<any>, Nullable<any>>;
        makeNewWarning(title: string): snitch.BubbleBuilder<Nullable<any>, Nullable<any>>;
        makeNewError(title: string): snitch.BubbleBuilder<Nullable<any>, Nullable<any>>;
        close(title: string): void;
    }
}
export declare namespace snitch {
    function makeSnitch(): snitch.Snitch;
}
export declare namespace snitch {
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
export declare namespace sentinel {
    class AuthenticationScenes {
        get signIn(): sentinel.SignInScene;
        get barrier(): sentinel.BarrierScene;
        get registration(): sentinel.RegistrationScene;
        get password(): sentinel.PasswordScenes;
    }
}
export declare namespace sentinel {
    class BarrierScene extends cinematic.BaseScene {
        get ui(): cinematic.MutableLive<kase.LazyState<sentinel.UserSession>>;
        initialize(onDiscard: (p0: Error) => void): koncurrent.Later<sentinel.UserSession>;
        deInitialize(): void;
    }
}
export declare namespace sentinel {
    class CompleteRegistration extends cinematic.BaseScene {
        get ui(): cinematic.MutableLive<kase.LazyState<sentinel.UserSession>>;
        initialize(onDiscard: (p0: Error) => void): koncurrent.Later<sentinel.UserSession>;
        deInitialize(): void;
    }
}
export declare namespace sentinel {
    class PasswordForgotScene extends cinematic.LazyScene<symphony.Form<any, any/* sentinel.fields.PasswordForgotOutput */, sentinel.fields.PasswordForgotFields>> {
        initialize(): void;
        resend(): Nullable<koncurrent.Later<any>>;
    }
}
export declare namespace sentinel {
    class PasswordResetScene extends cinematic.LazyScene<symphony.Form<any, any/* sentinel.fields.PasswordResetOutput */, sentinel.fields.PasswordResetFields>> {
        initialize(link: string, onResult: (p0: kase.Result<void>) => void): void;
        deInitialize(): void;
    }
}
export declare namespace sentinel {
    class PasswordScenes {
        get forgot(): sentinel.PasswordForgotScene;
        get reset(): sentinel.PasswordResetScene;
    }
}
export declare namespace sentinel {
    class RegistrationScene extends cinematic.LazyScene<sentinel.UserSession> {
        initialize(onSuccess: () => void): koncurrent.Later<sentinel.UserSession>;
    }
}
export declare namespace sentinel {
    class SignInScene extends cinematic.Scene<kase.LazyState<sentinel.UserSession>> {
        get form(): symphony.Form<sentinel.UserSession, any/* sentinel.fields.SignInFormOutput */, sentinel.fields.SignInFields>;
        initialize(onSuccess: (p0: sentinel.UserSession) => void): void;
        deInitialize(): void;
    }
}
export declare namespace sentinel.fields {
    class PasswordForgotFields extends symphony.Fields<any/* sentinel.fields.PasswordForgotOutput */> {
        get email(): symphony.BaseField<string>;
    }
}
export declare namespace sentinel.fields {
    class PasswordResetFields extends symphony.Fields<any/* sentinel.fields.PasswordResetOutput */> {
        get password1(): symphony.BaseField<string>;
        get password2(): symphony.BaseField<string>;
    }
}
export declare namespace sentinel.fields {
    class SignInFields extends symphony.Fields<any/* sentinel.fields.SignInFormOutput */> {
        get email(): symphony.BaseField<string>;
        get password(): symphony.BaseField<string>;
        get recoverText(): string;
        get signUpPromptText(): string;
        get signInText(): string;
    }
}
export declare namespace koder {
    interface BarCode {
    }
}
export declare namespace koder {
    interface BarCodeUPC extends koder.BarCode {
        readonly data: string;
        readonly guardBars: Int32Array;
        readonly middleBars: Int32Array;
        readonly startBars: Int32Array;
        readonly leftBars: Int32Array;
        readonly rightBars: Int32Array;
        readonly endBars: Int32Array;
    }
}
export declare namespace koder {
    function barCodeUPCOf(code: string): koder.BarCodeUPC;
    function barCodeUPCOrNullOf(code: string): Nullable<koder.BarCodeUPC>;
    function barCodeUPCOrDefault(code: string, _default?: koder.BarCodeUPC): koder.BarCodeUPC;
}
export declare namespace koder {
    const BarCodeUPCSpec: {
        get L(): kollections.Map<string, Int32Array>;
        get R(): kollections.Map<string, Int32Array>;
        get GUARD_BARS(): Int32Array;
        get MIDDLE_BARS(): Int32Array;
    };
}
export declare namespace koder {
    function renderUPCBarcodeToString(_this_: koder.BarCodeUPC, separator?: string): string;
}
export declare namespace cinematic {
    function emptyMutableLiveListOF<E>(): cinematic.MutableLiveList<E>;
    function mutableLiveListOf<E>(elements: Array<E>): cinematic.MutableLiveList<E>;
    function emptyMutableLiveSetOf<E>(): cinematic.MutableLiveSet<E>;
    function mutableLiveSetOf<E>(elements: Array<E>): cinematic.MutableLiveSet<E>;
    function emptyMutableLiveMapOf<K, V>(): cinematic.MutableLiveMap<K, V>;
    function mutableLiveMapOf<K, V>(pairs: kollections.MapEntry<K, V>): cinematic.MutableLiveMap<K, V>;
}
export declare namespace cinematic {
    interface LiveList<E> extends kollections.CollectionLike<E>, cinematic.Live<kollections.List<E>> {
        isEmpty(): boolean;
        readonly size: number;
        contains(element: E): boolean;
        first(): E;
        firstOrNull(): Nullable<E>;
        joinToString(separator: string, transformer: (p0: E) => string): string;
        iterator(): any/* kotlin.collections.Iterator<E> */;
        toArray(): Array<E>;
        count(): number;
        readonly value: kollections.List<E>;
        map<R>(transformer: (p0: kollections.List<E>) => R): cinematic.Live<R>;
        stopAll(): void;
        watchWithModeAndExecutor(callback: (p0: kollections.List<E>) => void, mode: cinematic.WatchMode, executor: any/* koncurrent.Executor */): cinematic.Watcher;
        watchWithExecutor(callback: (p0: kollections.List<E>) => void, executor: any/* koncurrent.Executor */): cinematic.Watcher;
        watchWithMode(callback: (p0: kollections.List<E>) => void, mode: cinematic.WatchMode): cinematic.Watcher;
        watch(callback: (p0: kollections.List<E>) => void): cinematic.Watcher;
    }
}
export declare namespace cinematic {
    interface LiveMap<K, V> extends kollections.MapLike<K, V>, cinematic.Live<kollections.Map<K, V>> {
        readonly size: number;
        readonly keys: kollections.Set<K>;
        readonly values: kollections.Collection<V>;
        readonly pairs: kollections.Set<kollections.MapEntry<K, V>>;
        containsKey(key: K): boolean;
        containsValue(value: V): boolean;
        get(key: K): Nullable<V>;
        getValue(key: K): V;
        isEmpty(): boolean;
        contains(element: kollections.MapEntry<K, V>): boolean;
        first(): kollections.MapEntry<K, V>;
        firstOrNull(): Nullable<kollections.MapEntry<K, V>>;
        joinToString(separator: string, transformer: (p0: kollections.MapEntry<K, V>) => string): string;
        iterator(): any/* kotlin.collections.Iterator<kollections.MapEntry<K, V>> */;
        toArray(): Array<kollections.MapEntry<K, V>>;
        count(): number;
        readonly value: kollections.Map<K, V>;
        map<R>(transformer: (p0: kollections.Map<K, V>) => R): cinematic.Live<R>;
        stopAll(): void;
        watchWithModeAndExecutor(callback: (p0: kollections.Map<K, V>) => void, mode: cinematic.WatchMode, executor: any/* koncurrent.Executor */): cinematic.Watcher;
        watchWithExecutor(callback: (p0: kollections.Map<K, V>) => void, executor: any/* koncurrent.Executor */): cinematic.Watcher;
        watchWithMode(callback: (p0: kollections.Map<K, V>) => void, mode: cinematic.WatchMode): cinematic.Watcher;
        watch(callback: (p0: kollections.Map<K, V>) => void): cinematic.Watcher;
    }
}
export declare namespace cinematic {
    interface LiveSet<E> extends kollections.CollectionLike<E>, cinematic.Live<kollections.Set<E>> {
        isEmpty(): boolean;
        readonly size: number;
        contains(element: E): boolean;
        first(): E;
        firstOrNull(): Nullable<E>;
        joinToString(separator: string, transformer: (p0: E) => string): string;
        iterator(): any/* kotlin.collections.Iterator<E> */;
        toArray(): Array<E>;
        count(): number;
        readonly value: kollections.Set<E>;
        map<R>(transformer: (p0: kollections.Set<E>) => R): cinematic.Live<R>;
        stopAll(): void;
        watchWithModeAndExecutor(callback: (p0: kollections.Set<E>) => void, mode: cinematic.WatchMode, executor: any/* koncurrent.Executor */): cinematic.Watcher;
        watchWithExecutor(callback: (p0: kollections.Set<E>) => void, executor: any/* koncurrent.Executor */): cinematic.Watcher;
        watchWithMode(callback: (p0: kollections.Set<E>) => void, mode: cinematic.WatchMode): cinematic.Watcher;
        watch(callback: (p0: kollections.Set<E>) => void): cinematic.Watcher;
    }
}
export declare namespace cinematic {
    interface MutableLiveList<E> extends kollections.MutableCollectionLike<E>, cinematic.MutableLive<kollections.List<E>>, cinematic.LiveList<E> {
        update<R>(block: (p0: kollections.MutableList<E>) => R): R;
        add(element: E): boolean;
        remove(element: E): boolean;
        clear(): void;
        iterator(): any/* kotlin.collections.MutableIterator<E> */;
        readonly size: number;
        isEmpty(): boolean;
        contains(element: E): boolean;
        first(): E;
        firstOrNull(): Nullable<E>;
        joinToString(separator: string, transformer: (p0: E) => string): string;
        toArray(): Array<E>;
        count(): number;
        value: kollections.List<E>;
        undo(): void;
        redo(): void;
        map<R>(transformer: (p0: kollections.List<E>) => R): cinematic.MutableLive<R>;
        dispatchValue(value: kollections.List<E>): void;
        dispatch(): void;
        stopAll(): void;
        watchWithModeAndExecutor(callback: (p0: kollections.List<E>) => void, mode: cinematic.WatchMode, executor: any/* koncurrent.Executor */): cinematic.Watcher;
        watchWithExecutor(callback: (p0: kollections.List<E>) => void, executor: any/* koncurrent.Executor */): cinematic.Watcher;
        watchWithMode(callback: (p0: kollections.List<E>) => void, mode: cinematic.WatchMode): cinematic.Watcher;
        watch(callback: (p0: kollections.List<E>) => void): cinematic.Watcher;
    }
}
export declare namespace cinematic {
    interface MutableLiveMap<K, V> extends kollections.MutableMapLike<K, V>, cinematic.LiveMap<K, V> {
        update<R>(block: (p0: kollections.MutableMap<K, V>) => R): R;
        readonly size: number;
        readonly keys: kollections.MutableSet<K>;
        readonly values: kollections.MutableCollection<V>;
        put(key: K, value: V): Nullable<V>;
        clear(): void;
        remove(key: K): Nullable<V>;
        set(key: K, value: V): void;
        readonly pairs: kollections.Set<kollections.MapEntry<K, V>>;
        containsKey(key: K): boolean;
        containsValue(value: V): boolean;
        get(key: K): Nullable<V>;
        getValue(key: K): V;
        isEmpty(): boolean;
        contains(element: kollections.MapEntry<K, V>): boolean;
        first(): kollections.MapEntry<K, V>;
        firstOrNull(): Nullable<kollections.MapEntry<K, V>>;
        joinToString(separator: string, transformer: (p0: kollections.MapEntry<K, V>) => string): string;
        iterator(): any/* kotlin.collections.Iterator<kollections.MapEntry<K, V>> */;
        toArray(): Array<kollections.MapEntry<K, V>>;
        count(): number;
        readonly value: kollections.Map<K, V>;
        map<R>(transformer: (p0: kollections.Map<K, V>) => R): cinematic.Live<R>;
        stopAll(): void;
        watchWithModeAndExecutor(callback: (p0: kollections.Map<K, V>) => void, mode: cinematic.WatchMode, executor: any/* koncurrent.Executor */): cinematic.Watcher;
        watchWithExecutor(callback: (p0: kollections.Map<K, V>) => void, executor: any/* koncurrent.Executor */): cinematic.Watcher;
        watchWithMode(callback: (p0: kollections.Map<K, V>) => void, mode: cinematic.WatchMode): cinematic.Watcher;
        watch(callback: (p0: kollections.Map<K, V>) => void): cinematic.Watcher;
    }
}
export declare namespace cinematic {
    interface MutableLiveSet<E> extends kollections.MutableCollectionLike<E>, cinematic.MutableLive<kollections.Set<E>>, cinematic.LiveSet<E> {
        update<R>(block: (p0: kollections.MutableSet<E>) => R): R;
        add(element: E): boolean;
        remove(element: E): boolean;
        clear(): void;
        iterator(): any/* kotlin.collections.MutableIterator<E> */;
        readonly size: number;
        isEmpty(): boolean;
        contains(element: E): boolean;
        first(): E;
        firstOrNull(): Nullable<E>;
        joinToString(separator: string, transformer: (p0: E) => string): string;
        toArray(): Array<E>;
        count(): number;
        value: kollections.Set<E>;
        undo(): void;
        redo(): void;
        map<R>(transformer: (p0: kollections.Set<E>) => R): cinematic.MutableLive<R>;
        dispatchValue(value: kollections.Set<E>): void;
        dispatch(): void;
        stopAll(): void;
        watchWithModeAndExecutor(callback: (p0: kollections.Set<E>) => void, mode: cinematic.WatchMode, executor: any/* koncurrent.Executor */): cinematic.Watcher;
        watchWithExecutor(callback: (p0: kollections.Set<E>) => void, executor: any/* koncurrent.Executor */): cinematic.Watcher;
        watchWithMode(callback: (p0: kollections.Set<E>) => void, mode: cinematic.WatchMode): cinematic.Watcher;
        watch(callback: (p0: kollections.Set<E>) => void): cinematic.Watcher;
    }
}
export declare namespace krest {
    class WorkerLedger {
        get type(): string;
        get topic(): Nullable<string>;
        get progress(): cinematic.MutableLiveMap<string, kase.ExecutorState<Nullable<any>>>;
    }
}
export declare namespace sentinel {
    interface RegistrationSceneConfig<A> extends keep.Cacheable/*, hormone.HasApi<A>, lexi.Logable */ {
        readonly cache: any/* keep.Cache */;
    }
}
export declare namespace sentinel {
    interface RegistrationScenes {
        readonly signUp: sentinel.SignUpScene;
        readonly verification: sentinel.VerificationScene;
        readonly password: sentinel.SetPasswordScene;
    }
}
export declare namespace sentinel {
    class SetPasswordScene {
        initialize(onSuccess: () => void): void;
        deInitialize(): void;
        get form(): symphony.Form<sentinel.params.UserAccountParams, any/* sentinel.fields.SetPasswordOutput */, sentinel.fields.SetPasswordFields>;
    }
}
export declare namespace sentinel {
    class SignUpScene extends cinematic.BaseScene {
        initialize(): koncurrent.Later<sentinel.fields.SignUpFields>;
        get form(): symphony.Form<string, any/* sentinel.fields.SignUpOutput */, sentinel.fields.SignUpFields>;
        resendVerificationLink(): koncurrent.Later<string>;
    }
}
export declare namespace sentinel {
    class VerificationScene extends cinematic.LazyScene<sentinel.params.VerificationParams> {
        initialize(link: string, onCompleted: (p0: kase.Result<sentinel.params.VerificationParams>) => void): koncurrent.Later<any>;
    }
}
export declare namespace sentinel.fields {
    class SetPasswordFields extends symphony.Fields<any/* sentinel.fields.SetPasswordOutput */> {
        get password1(): symphony.BaseField<string>;
        get password2(): symphony.BaseField<string>;
    }
}
export declare namespace sentinel.fields {
    class SignUpFields extends symphony.Fields<any/* sentinel.fields.SignUpOutput */> {
        get name(): symphony.BaseField<string>;
        get email(): symphony.BaseField<string>;
    }
}
export declare namespace identifier {
    class ContactPresenter {
        get src(): identifier.ContactDto;
        get uid(): string;
        get name(): string;
        get comms(): any/* kotlin.collections.List<identifier.Comm> */;
        get role(): Nullable<string>;
        get isPrimary(): boolean;
        get emails(): kollections.List<identifier.UserEmail>;
        get phones(): kollections.List<identifier.UserPhone>;
    }
}
export declare namespace identifier {
    class CorporateBranchPresenter {
        get src(): identifier.CorporateBranchDto;
        get name(): string;
        get contacts(): any/* kotlin.collections.List<identifier.ContactPresenter> */;
        get location(): Nullable<geo.GeoLocation>;
        get address(): Nullable<string>;
    }
}
export declare namespace identifier {
    class CorporatePresenter extends identifier.LegalEntityPresenter {
        get src(): identifier.CorporateDto;
        get uid(): string;
        get name(): string;
        get image(): Nullable<string>;
        get headQuarters(): identifier.CorporateBranchPresenter;
        get branches(): any/* kotlin.collections.List<identifier.CorporateBranchPresenter> */;
        get registrationNo(): Nullable<string>;
        get registrationDate(): Nullable<krono.LocalDate>;
        get taxPayerIdentificationNo(): Nullable<string>;
        get vatNo(): Nullable<string>;
        get website(): Nullable<string>;
        get industry(): Nullable<identifier.Industry>;
        get gid(): string;
        get type(): identifier.CorporateType;
    }
}
export declare namespace identifier {
    class IndividualPresenter extends identifier.LegalEntityPresenter {
        get src(): identifier.IndividualDto;
        get uid(): string;
        get name(): string;
        get image(): Nullable<string>;
        get title(): Nullable<string>;
        get dob(): Nullable<krono.LocalDate>;
        get gender(): Nullable<identifier.Gender>;
        get comms(): any/* kotlin.collections.List<identifier.Comm> */;
        get gid(): string;
        get idDocumentNumber(): Nullable<string>;
        get idDocumentType(): Nullable<identifier.DocumentType>;
        get location(): Nullable<geo.GeoLocation>;
        get address(): Nullable<string>;
        get emails(): kollections.List<identifier.UserEmail>;
        get phones(): kollections.List<identifier.UserPhone>;
    }
}
export declare namespace identifier {
    abstract class LegalEntityPresenter {
        get src(): identifier.LegalEntityDto;
        get uid(): string;
        get gid(): string;
        get name(): string;
        get image(): Nullable<string>;
        get asIndividual(): Nullable<identifier.IndividualPresenter>;
        get asCorporate(): Nullable<identifier.CorporatePresenter>;
        get loc(): Nullable<geo.GeoLocation>;
    }
}
export declare namespace kase {
    class Bag<T extends any> /* extends kase.internal.AbstractPossible<T> */ implements kase.Possible<T> {
        get value(): Nullable<T>;
        set value(value: Nullable<T>);
        valueOrThrowException(exp: Error): T;
        valueOrThrowMessage(msg: string): T;
        valueOrThrow(): T;
        valueOrNull(): Nullable<T>;
        exists(): boolean;
        valueOr(_default: T): T;
        put(value: Nullable<T>): void;
        map<R extends any>(transform: (p0: T) => R): kase.Bag<R>;
        flatMap<R extends any>(transform: (p0: T) => kase.Bag<R>): kase.Bag<R>;
        catch(resolver: () => T): kase.Bag<T>;
        clean(): void;
        getOrThrowException(exp: Error): T;
        getOrThrowMessage(msg: string): T;
        getOrThrow(): T;
        getOr(_default: T): T;
        getOrNull(): Nullable<T>;
    }
}
export declare namespace kase {
    function bagOf<T extends any>(value: Nullable<T>): kase.Bag<T>;
}
export declare namespace kase {
    abstract class None<T extends any> /* extends kase.internal.AbstractPossible<T> */ implements kase.Possible<T>, kase.Optional<T> {
        map<R extends any>(transform: (p0: T) => R): kase.None<R>;
        flatMap<R extends any>(transform: (p0: T) => kase.Optional<R>): kase.None<R>;
        catch(fn: () => T): kase.Optional<T>;
        valueOrThrow(): never;
        valueOr(_default: T): T;
        valueOrThrowException(exp: Error): never;
        valueOrThrowMessage(msg: string): never;
        valueOrNull(): Nullable<T>;
        exists(): boolean;
        getOrThrowException(exp: Error): T;
        getOrThrowMessage(msg: string): T;
        getOrThrow(): T;
        getOr(_default: T): T;
        getOrNull(): Nullable<T>;
        get asSome(): Nullable<kase.Some<T>>;
        get asNone(): Nullable<kase.None<never>>;
    }
}
export declare namespace kase {
    interface Optional<T extends any> extends kase.Possible<T> {
        readonly asSome?: Nullable<kase.Some<T>>;
        readonly asNone?: Nullable<kase.None<never>>;
        map<R extends any>(transform: (p0: T) => R): kase.Optional<R>;
        flatMap<R extends any>(transform: (p0: T) => kase.Optional<R>): kase.Optional<R>;
        catch(fn: () => T): kase.Optional<T>;
        valueOrThrowException(exp: Error): T;
        valueOrThrowMessage(msg: string): T;
        valueOrThrow(): T;
        getOrThrowException(exp: Error): T;
        getOrThrowMessage(msg: string): T;
        getOrThrow(): T;
        valueOr(_default: T): T;
        getOr(_default: T): T;
        valueOrNull(): Nullable<T>;
        getOrNull(): Nullable<T>;
        exists(): boolean;
    }
}
export declare namespace kase {
    function optionalOf<T extends any>(value: Nullable<T>): kase.Optional<T>;
    function none<T extends any>(): kase.None<T>;
    function some<T extends any>(value: T): kase.Some<T>;
}
export declare namespace kase {
    class Some<T extends any> /* extends kase.internal.AbstractPossible<T> */ implements kase.Possible<T>, kase.Optional<T> {
        get value(): T;
        get asSome(): kase.Some<T>;
        get asNone(): Nullable<never>;
        map<R extends any>(transform: (p0: T) => R): kase.Optional<R>;
        flatMap<R extends any>(transform: (p0: T) => kase.Optional<R>): kase.Optional<R>;
        catch(fn: () => T): kase.Some<T>;
        valueOrThrow(): T;
        valueOr(_default: T): T;
        exists(): boolean;
        valueOrThrowException(exp: Error): T;
        valueOrThrowMessage(msg: string): T;
        valueOrNull(): T;
        getOrThrowException(exp: Error): T;
        getOrThrowMessage(msg: string): T;
        getOrThrow(): T;
        getOr(_default: T): T;
        getOrNull(): Nullable<T>;
    }
}
export declare namespace symphony {
    interface Page<T> {
        readonly items: kollections.List<symphony.Row<T>>;
        readonly capacity: number;
        readonly number: number;
        readonly isEmpty: boolean;
        readonly hasMore: boolean;
        readonly isFistPage: boolean;
        readonly isLastPage: boolean;
        map<R>(transformer: (p0: T) => R): symphony.Page<R>;
        mapIndexed<R>(transformer: (p0: number, p1: T) => R): symphony.Page<R>;
    }
}
export declare namespace symphony {
    class PageResult<T> {
        get page(): symphony.Page<T>;
        get row(): symphony.Row<T>;
    }
}
export declare namespace symphony {
    interface Pageable<T> {
        readonly paginator: symphony.PaginationManager<T>;
    }
}
export declare namespace symphony {
    interface PaginationManager<T> {
        readonly current: cinematic.Live<kase.LazyState<symphony.Page<T>>>;
        readonly continuous: kollections.List<symphony.Row<T>>;
        readonly currentPageOrNull?: Nullable<symphony.Page<T>>;
        readonly capacity: number;
        readonly hasMore: boolean;
        initialize(loader?: Nullable<(p0: number, p1: number) => koncurrent.Later<any/* kotlin.collections.Collection<T> */>>): koncurrent.Later<symphony.Page<T>>;
        wipeMemory(): void;
        clearPages(): void;
        setPageCapacity(cap: number): void;
        refreshAllPages(): koncurrent.Later<Nullable<any>>;
        refreshCurrentPage(): koncurrent.Later<Nullable<any>>;
        loadNextPage(): koncurrent.Later<Nullable<any>>;
        loadPreviousPage(): koncurrent.Later<Nullable<any>>;
        loadPage(no: number): koncurrent.Later<symphony.Page<T>>;
        loadFirstPage(): koncurrent.Later<symphony.Page<T>>;
        loadLastPage(): koncurrent.Later<symphony.Page<T>>;
        forEachPage(block: (p0: symphony.Page<T>) => void): void;
        findRow(row: number, page: number): Nullable<symphony.PageResult<T>>;
        findItem(item: T): Nullable<symphony.PageResult<T>>;
        findPage(page: number): Nullable<symphony.Page<T>>;
        map<R>(transform: (p0: T) => R): symphony.PaginationManager<R>;
        deInitialize(clearPages?: Nullable<boolean>): void;
    }
}
export declare namespace symphony {
    interface Row<D> {
        readonly index: number;
        readonly item: D;
        readonly number: number;
    }
}
export declare namespace symphony {
    interface Selectable<T> {
        readonly selector: symphony.SelectionManager<T>;
    }
}
export declare namespace symphony {
    interface Selected<T> {
        readonly none?: Nullable<typeof symphony.SelectedNone>;
        readonly item?: Nullable<symphony.SelectedItem<T>>;
        readonly items?: Nullable<symphony.SelectedItems<T>>;
        readonly global?: Nullable<symphony.SelectedGlobal<T>>;
    }
    const SelectedNone: {
        get none(): Nullable<typeof symphony.SelectedNone>;
        get item(): Nullable<symphony.SelectedItem<never>>;
        get items(): Nullable<symphony.SelectedItems<never>>;
        get global(): Nullable<symphony.SelectedGlobal<never>>;
    } & symphony.Selected<never>;
    class SelectedItem<T> implements symphony.Selected<T> {
        get page(): symphony.Page<T>;
        get row(): symphony.Row<T>;
        get none(): Nullable<typeof symphony.SelectedNone>;
        get item(): Nullable<symphony.SelectedItem<T>>;
        get items(): Nullable<symphony.SelectedItems<T>>;
        get global(): Nullable<symphony.SelectedGlobal<T>>;
    }
    class SelectedItems<T> implements symphony.Selected<T> {
        get page(): kollections.Map<symphony.Page<T>, kollections.Set<symphony.Row<T>>>;
        get none(): Nullable<typeof symphony.SelectedNone>;
        get item(): Nullable<symphony.SelectedItem<T>>;
        get items(): Nullable<symphony.SelectedItems<T>>;
        get global(): Nullable<symphony.SelectedGlobal<T>>;
    }
    class SelectedGlobal<T> implements symphony.Selected<T> {
        get exceptions(): kollections.Set<symphony.SelectedItem<T>>;
        get none(): Nullable<typeof symphony.SelectedNone>;
        get item(): Nullable<symphony.SelectedItem<T>>;
        get items(): Nullable<symphony.SelectedItems<T>>;
        get global(): Nullable<symphony.SelectedGlobal<T>>;
    }
}
export declare namespace symphony {
    interface SelectionManager<T> {
        readonly selected: cinematic.Live<symphony.Selected<T>>;
        selectAllItemsInTheCurrentPage(): void;
        selectAllItemsInPage(page: number): void;
        selectAllItemsInAllPages(): void;
        selectRowInPage(row: number, page: number): void;
        selectRow(row: number): void;
        select(obj: T): void;
        addSelectionOfRowInPage(row: number, page: number): void;
        addSelectionOfRowNumber(row: number): void;
        addSelectionOf(obj: T): void;
        toggleSelectionOfRowInPage(row: number, page: number): void;
        toggleSelectionOfRowInCurrentPage(row: number): void;
        toggleSelectionOfPage(page: number): void;
        toggleSelectionOfCurrentPage(): void;
        isPageSelectedWholly(page: number): boolean;
        isPageSelectedPartially(page: number): boolean;
        isCurrentPageSelectedWholly(): boolean;
        isCurrentPageSelectedPartially(): boolean;
        isRowSelectedOnCurrentPage(row: number): boolean;
        isRowSelectedOnPage(row: number, page: number): boolean;
        unSelectAllItemsInAllPages(): void;
        unSelectAllItemsInTheCurrentPage(): void;
        unSelectAllItemsInPage(page: number): void;
        unSelectRowInCurrentPage(row: number): void;
        unSelectRowInPage(row: number, page: number): void;
        unSelect(item: T): void;
        map<R>(transform: (p0: T) => R): symphony.SelectionManager<R>;
    }
}
export declare namespace symphony {
    interface ActionableSelection<T> {
        readonly actions: symphony.SelectorBasedActionsManager<T>;
    }
}
export declare namespace symphony {
    interface ActionsManager<T> {
        readonly current: cinematic.Live<kollections.List<kevlar.Action0<void>>>;
        get(): kollections.List<kevlar.Action0<void>>;
        add(name: string, handler: () => void): symphony.ActionsManager<T>;
        remove(key: string): symphony.ActionsManager<T>;
    }
}
export declare namespace symphony {
    interface FixedActionsManager extends symphony.ActionsManager<any> {
        refresh(): void;
        readonly current: cinematic.Live<kollections.List<kevlar.Action0<void>>>;
        get(): kollections.List<kevlar.Action0<void>>;
        add(name: string, handler: () => void): symphony.ActionsManager<any>;
        remove(key: string): symphony.ActionsManager<any>;
    }
}
export declare namespace symphony {
    interface SelectorBasedActionsManager<T> extends symphony.ActionsManager<T> {
        addSingle(name: string, handler: (p0: T) => void): symphony.SelectorBasedActionsManager<T>;
        addMulti(name: string, handler: (p0: kollections.List<T>) => void): symphony.SelectorBasedActionsManager<T>;
        of(item: T): kollections.List<kevlar.Action0<void>>;
        readonly current: cinematic.Live<kollections.List<kevlar.Action0<void>>>;
        get(): kollections.List<kevlar.Action0<void>>;
        add(name: string, handler: () => void): symphony.ActionsManager<T>;
        remove(key: string): symphony.ActionsManager<T>;
    }
}
export declare namespace symphony {
    abstract class Column<D> /* implements kotlin.Comparable<symphony.Column<any>> */ {
        get name(): string;
        get key(): string;
        get index(): number;
        get visibility(): symphony.Visibility;
        get number(): number;
        get asSelect(): Nullable<symphony.Column.Select>;
        get asData(): Nullable<symphony.Column.Data<D>>;
        get asAction(): Nullable<symphony.Column.Action>;
        copy$default(name?: string, index?: number, visibility?: symphony.Visibility): symphony.Column<D>;
    }
    namespace Column {
        class Select extends symphony.Column<Nullable<any>> {
            get name(): string;
            get key(): string;
            get index(): number;
            get visibility(): symphony.Visibility;
        }
        class Data<D> extends symphony.Column<D> {
            get name(): string;
            get key(): string;
            get index(): number;
            get visibility(): symphony.Visibility;
            get default(): string;
            get accessor(): (p0: symphony.Row<D>) => Nullable<any>;
            resolve(row: symphony.Row<D>): string;
        }
        class Action extends symphony.Column<Nullable<any>> {
            get name(): string;
            get key(): string;
            get index(): number;
            get visibility(): symphony.Visibility;
        }
    }
}
export declare namespace symphony {
    interface ColumnMover<D> {
        before(name: string): symphony.ColumnsManager<D>;
        after(name: string): symphony.ColumnsManager<D>;
    }
}
export declare namespace symphony {
    interface ColumnsManager<D> {
        readonly current: cinematic.Live<kollections.Set<symphony.Column<D>>>;
        all(): kollections.Set<symphony.Column<D>>;
        add(name: string, accessor: (p0: symphony.Row<D>) => string): symphony.ColumnsManager<D>;
        find(name: string): Nullable<symphony.Column<D>>;
        hide(name: string): symphony.ColumnsManager<D>;
        show(name: string): symphony.ColumnsManager<D>;
        toggleVisibility(name: string): symphony.ColumnsManager<D>;
        remove(name: string): symphony.ColumnsManager<D>;
        rename(prev: string, curr: string): symphony.ColumnsManager<D>;
        index(name: string, idx: number): symphony.ColumnsManager<D>;
        move(name: string): symphony.ColumnMover<D>;
    }
}
export declare namespace symphony {
    interface Table<T> extends symphony.Pageable<T>, symphony.Selectable<T>, symphony.ActionableSelection<T> {
        readonly columns: symphony.ColumnsManager<T>;
        manageActions(block: (p0: symphony.SelectorBasedActionsManager<T>) => void): symphony.Table<T>;
        manageColumns(block: (p0: symphony.ColumnsManager<T>) => void): symphony.Table<T>;
        map<R>(transform: (p0: T) => R): symphony.Table<R>;
        readonly paginator: symphony.PaginationManager<T>;
        readonly selector: symphony.SelectionManager<T>;
        readonly actions: symphony.SelectorBasedActionsManager<T>;
    }
}
export declare namespace symphony {
    interface List<T> extends symphony.Pageable<T>, symphony.Selectable<T>, symphony.ActionableSelection<T> {
        readonly rows: kollections.List<symphony.Row<T>>;
        manageActions(block: (p0: symphony.SelectorBasedActionsManager<T>) => void): symphony.List<T>;
        map<R>(transform: (p0: T) => R): symphony.List<R>;
        readonly paginator: symphony.PaginationManager<T>;
        readonly selector: symphony.SelectionManager<T>;
        readonly actions: symphony.SelectorBasedActionsManager<T>;
    }
}
export declare namespace symphony {
    abstract class CollectionScene<T> extends cinematic.BaseScene {
        get view(): cinematic.MutableLive<symphony.View>;
        get cache(): any/* keep.Cache */;
        /** @deprecated Might not be needed */
        get paginator(): symphony.PaginationManager<T>;
        get selector(): symphony.SelectionManager<T>;
        get actions(): symphony.SelectorBasedActionsManager<T>;
        get columns(): symphony.ColumnsManager<T>;
        get list(): symphony.List<T>;
        get table(): symphony.Table<T>;
        switchToLatestSelectedView(): koncurrent.Later<symphony.View>;
        switchToListView(): koncurrent.Later<symphony.View>;
        switchToTableView(): koncurrent.Later<symphony.View>;
        get searchBox(): symphony.BaseField<string>;
        search(): koncurrent.Later<symphony.Page<T>>;
        unselect(item?: Nullable<T>): void;
        select(item: T): koncurrent.Later<T>;
    }
}
export declare namespace symphony {
    abstract class View {
        static get Table(): symphony.View & {
            get name(): "Table";
            get ordinal(): 0;
        };
        static get List(): symphony.View & {
            get name(): "List";
            get ordinal(): 1;
        };
        static values(): Array<symphony.View>;
        static valueOf(value: string): symphony.View;
        get name(): "Table" | "List";
        get ordinal(): 0 | 1;
    }
}
export declare namespace geo {
    interface AddressField extends symphony.BaseField<any/* geo.AddressOutput */> {
        readonly country: symphony.SingleChoiceField<geo.Country>;
        readonly entries: kollections.List<symphony.BaseField<string>>;
        readonly state: cinematic.Live<symphony.BaseFieldState<any/* geo.AddressOutput */>>;
        readonly visibility: symphony.Visibility;
        show(show?: Nullable<boolean>): void;
        hide(hide?: Nullable<boolean>): void;
        setVisibility(v: symphony.Visibility): void;
        clear(): void;
        readonly output?: Nullable<any>/* Nullable<geo.AddressOutput> */;
        readonly required: boolean;
        readonly feedbacks: symphony.Feedbacks;
        readonly name: string;
        readonly label: symphony.Label;
        readonly hint: string;
        setValue(value: Nullable<any>/* Nullable<geo.AddressOutput> */): void;
    }
}
export declare namespace geo {
    const GoogleLocationProvider: {
    } & any/* geo.LocationProvider */;
}
export declare namespace geo {
    interface LocationField extends symphony.TransformingField<string, geo.GeoLocation> {
        readonly provider: any/* geo.LocationProvider */;
        readonly state: cinematic.Live<symphony.TransState<string, geo.GeoLocation>>;
        readonly visibility: symphony.Visibility;
        show(show?: Nullable<boolean>): void;
        hide(hide?: Nullable<boolean>): void;
        setVisibility(v: symphony.Visibility): void;
        clear(): void;
        readonly output?: Nullable<geo.GeoLocation>;
        readonly required: boolean;
        readonly feedbacks: symphony.Feedbacks;
        setValue(value: Nullable<string>): void;
        readonly input?: Nullable<string>;
    }
}
export declare namespace krono {
    interface LocalDateField extends symphony.BaseField<krono.LocalDate> {
        setIso(iso?: Nullable<string>): void;
        readonly state: cinematic.Live<symphony.BaseFieldState<krono.LocalDate>>;
        readonly visibility: symphony.Visibility;
        show(show?: Nullable<boolean>): void;
        hide(hide?: Nullable<boolean>): void;
        setVisibility(v: symphony.Visibility): void;
        clear(): void;
        readonly output?: Nullable<krono.LocalDate>;
        readonly required: boolean;
        readonly feedbacks: symphony.Feedbacks;
        readonly name: string;
        readonly label: symphony.Label;
        readonly hint: string;
        setValue(value: Nullable<krono.LocalDate>): void;
    }
}
export declare namespace krono {
    interface LocalDateRangeField extends symphony.RangeField<krono.LocalDate> {
        setStartIsoString(iso?: Nullable<string>): void;
        setEndIsoString(iso?: Nullable<string>): void;
        setStart(value: Nullable<krono.LocalDate>): void;
        setEnd(value: Nullable<krono.LocalDate>): void;
        readonly state: cinematic.Live<symphony.RangeFieldState<krono.LocalDate>>;
        readonly visibility: symphony.Visibility;
        show(show?: Nullable<boolean>): void;
        hide(hide?: Nullable<boolean>): void;
        setVisibility(v: symphony.Visibility): void;
        clear(): void;
        readonly output?: Nullable<symphony.Range<krono.LocalDate>>;
        readonly required: boolean;
        readonly feedbacks: symphony.Feedbacks;
    }
}
export declare namespace krono {
    interface LocalDateTimeField extends symphony.BaseField<krono.DateTimePresenter> {
        setDateTimeIso(iso?: Nullable<string>): void;
        setDateIso(iso?: Nullable<string>): void;
        setTimeIso(iso?: Nullable<string>): void;
        readonly state: cinematic.Live<symphony.BaseFieldState<krono.DateTimePresenter>>;
        readonly visibility: symphony.Visibility;
        show(show?: Nullable<boolean>): void;
        hide(hide?: Nullable<boolean>): void;
        setVisibility(v: symphony.Visibility): void;
        clear(): void;
        readonly output?: Nullable<krono.DateTimePresenter>;
        readonly required: boolean;
        readonly feedbacks: symphony.Feedbacks;
        readonly name: string;
        readonly label: symphony.Label;
        readonly hint: string;
        setValue(value: Nullable<krono.DateTimePresenter>): void;
    }
}
export declare namespace identifier.fields {
    class CorporateFields extends identifier.fields.LegalEntityFields<any/* identifier.fields.CorporateOutput */> {
        get entity(): Nullable<identifier.CorporatePresenter>;
        get name(): symphony.BaseField<string>;
        get industry(): symphony.SingleChoiceField<identifier.Industry>;
        get businessType(): symphony.SingleChoiceField<identifier.CorporateType>;
        get headquarters(): geo.LocationField;
        get address(): symphony.BaseField<string>;
        get registrationNo(): symphony.BaseField<string>;
        get registrationDate(): krono.LocalDateField;
        get tin(): symphony.BaseField<string>;
        get vat(): symphony.BaseField<string>;
        get website(): symphony.BaseField<string>;
        get contactName(): symphony.BaseField<string>;
        get contactEmail(): symphony.BaseField<string>;
        get contactPhone(): symphony.PhoneField;
        get numberOfEmployees(): symphony.NumberField<number>;
        get contactRole(): symphony.SingleChoiceField<string>;
        get contactTitle(): symphony.SingleChoiceField<string>;
    }
}
export declare namespace identifier.fields {
    class IndividualFields extends identifier.fields.LegalEntityFields<any/* identifier.fields.IndividualOutput */> {
        get entity(): Nullable<identifier.IndividualPresenter>;
        get name(): symphony.BaseField<string>;
        get title(): symphony.SingleChoiceField<string>;
        get email(): symphony.BaseField<string>;
        get phone(): symphony.PhoneField;
        get dob(): krono.LocalDateField;
        get location(): geo.LocationField;
        get address(): symphony.BaseField<string>;
        get idNumber(): symphony.BaseField<string>;
        get gender(): symphony.SingleChoiceField<identifier.Gender>;
        get idType(): symphony.SingleChoiceField<identifier.DocumentType>;
    }
}
export declare namespace identifier.fields {
    abstract class LegalEntityFields<O extends any> extends symphony.Fields<O> {
        get entity(): Nullable<identifier.LegalEntityPresenter>;
        get asIndividual(): Nullable<identifier.fields.IndividualFields>;
        get asCorporate(): Nullable<identifier.fields.CorporateFields>;
    }
}
export declare namespace identifier.forms {
    abstract class LegalEntityFormScene extends cinematic.LazyScene<symphony.Form<identifier.LegalEntityPresenter, any /*UnknownType **/, identifier.fields.LegalEntityFields<any /*UnknownType **/>>> {
        get api(): hormone.Loader<identifier.LegalEntityDto>;
        get original(): Nullable<any>/* Nullable<identifier.IdentifierSettings<Nullable<identifier.LegalEntityPresenter>>> */;
        set original(value: Nullable<any>/* Nullable<identifier.IdentifierSettings<Nullable<identifier.LegalEntityPresenter>>> */);
        switchToCorporateForm(): void;
        switchToIndividualForm(): void;
        deInitialize(): void;
        individualForm(country: geo.Country, customer?: Nullable<identifier.IndividualPresenter>): symphony.Form<identifier.LegalEntityPresenter, any /*UnknownType **/, identifier.fields.IndividualFields>;
        corporateForm(country: geo.Country, customer?: Nullable<identifier.CorporatePresenter>): symphony.Form<identifier.LegalEntityPresenter, any /*UnknownType **/, identifier.fields.CorporateFields>;
    }
}
export declare namespace epsilon {
    interface FileBlob extends epsilon.Blob {
        readonly path: string;
        readonly name: string;
        readBytes(executor: any/* koncurrent.Executor */): koncurrent.Later<Int8Array>;
    }
}
export declare namespace epsilon {
    class BrowserBlob implements epsilon.Blob {
        get blob(): Blob;
        readBytes(executor: any/* koncurrent.Executor */): koncurrent.Later<Int8Array>;
        toFileBlob(name: string): kase.Result<epsilon.FileBlob>;
    }
}
export declare namespace epsilon {
    function blobOf(blob: Blob): epsilon.Blob;
    function blob(blob?: Nullable<Blob>): kase.Result<epsilon.Blob>;
}
export declare namespace epsilon {
    function fileBlobsFrom(list?: Nullable<FileList>): kollections.List<epsilon.FileBlob>;
    function fileBlobOf(file: File): epsilon.FileBlob;
    function fileBlob(file?: Nullable<File>): kase.Result<epsilon.FileBlob>;
}
export declare namespace symphony {
    interface ImageViewerUploader {
        readonly state: cinematic.Live<symphony.ImageViewerUploaderState>;
        readonly uploader?: Nullable<(p0: epsilon.FileBlob) => koncurrent.Later<string>>;
        view(url: string): void;
        edit(image: epsilon.FileBlob): void;
        upload(image: epsilon.FileBlob): koncurrent.Later<string>;
    }
}
export declare namespace symphony {
    interface ImageViewerUploaderState {
        readonly asAwaiting?: Nullable<typeof symphony.AwaitingImage>;
        readonly asViewing?: Nullable<symphony.ViewingImage>;
        readonly asLoadingToEdit?: Nullable<symphony.LoadingToEditImage>;
        readonly asEditing?: Nullable<symphony.EditingImage>;
        readonly asUploading?: Nullable<symphony.UploadingImage>;
    }
    const AwaitingImage: {
        get asAwaiting(): Nullable<typeof symphony.AwaitingImage>;
        get asViewing(): Nullable<symphony.ViewingImage>;
        get asLoadingToEdit(): Nullable<symphony.LoadingToEditImage>;
        get asEditing(): Nullable<symphony.EditingImage>;
        get asUploading(): Nullable<symphony.UploadingImage>;
    } & symphony.ImageViewerUploaderState;
    class ViewingImage implements symphony.ImageViewerUploaderState {
        get url(): string;
        get asAwaiting(): Nullable<typeof symphony.AwaitingImage>;
        get asViewing(): Nullable<symphony.ViewingImage>;
        get asLoadingToEdit(): Nullable<symphony.LoadingToEditImage>;
        get asEditing(): Nullable<symphony.EditingImage>;
        get asUploading(): Nullable<symphony.UploadingImage>;
    }
    class LoadingToEditImage implements symphony.ImageViewerUploaderState {
        get image(): epsilon.FileBlob;
        get asAwaiting(): Nullable<typeof symphony.AwaitingImage>;
        get asViewing(): Nullable<symphony.ViewingImage>;
        get asLoadingToEdit(): Nullable<symphony.LoadingToEditImage>;
        get asEditing(): Nullable<symphony.EditingImage>;
        get asUploading(): Nullable<symphony.UploadingImage>;
    }
    class EditingImage implements symphony.ImageViewerUploaderState {
        get image(): epsilon.FileBlob;
        get asAwaiting(): Nullable<typeof symphony.AwaitingImage>;
        get asViewing(): Nullable<symphony.ViewingImage>;
        get asLoadingToEdit(): Nullable<symphony.LoadingToEditImage>;
        get asEditing(): Nullable<symphony.EditingImage>;
        get asUploading(): Nullable<symphony.UploadingImage>;
    }
    class UploadingImage implements symphony.ImageViewerUploaderState {
        get image(): epsilon.Blob;
        get asAwaiting(): Nullable<typeof symphony.AwaitingImage>;
        get asViewing(): Nullable<symphony.ViewingImage>;
        get asLoadingToEdit(): Nullable<symphony.LoadingToEditImage>;
        get asEditing(): Nullable<symphony.EditingImage>;
        get asUploading(): Nullable<symphony.UploadingImage>;
    }
}
export declare namespace sentinel {
    class BusinessInfoScene extends cinematic.LazyScene<symphony.Form<identifier.CorporatePresenter, any/* identifier.fields.CorporateOutput */, identifier.fields.CorporateFields>> {
        initialize(): void;
    }
}
export declare namespace sentinel {
    class BusinessLogoScene implements symphony.ImageViewerUploader {
        get state(): cinematic.Live<symphony.ImageViewerUploaderState>;
        get uploader(): Nullable<(p0: epsilon.FileBlob) => koncurrent.Later<string>>;
        edit(image: epsilon.FileBlob): void;
        upload(image: epsilon.FileBlob): koncurrent.Later<string>;
        view(url: string): void;
        initialize(): koncurrent.Later<void>;
    }
}
export declare namespace sentinel {
    class BusinessProfileScenes {
        get logo(): sentinel.BusinessLogoScene;
        get info(): sentinel.BusinessInfoScene;
    }
}
export declare namespace sentinel {
    class ChangePasswordScene extends cinematic.LazyScene<symphony.Form<identifier.IndividualDto, any/* sentinel.fields.ChangePasswordOutput */, sentinel.fields.ChangePasswordFields>> {
        initialize(): koncurrent.Later<symphony.Form<identifier.IndividualDto, any/* sentinel.fields.ChangePasswordOutput */, sentinel.fields.ChangePasswordFields>>;
    }
}
export declare namespace sentinel {
    class PersonalProfileInfoScene extends cinematic.LazyScene<symphony.Form<identifier.IndividualDto, any/* identifier.fields.IndividualOutput */, sentinel.fields.PersonalProfileInfoFields>> {
        initialize(): koncurrent.Later<symphony.Form<identifier.IndividualDto, any/* identifier.fields.IndividualOutput */, sentinel.fields.PersonalProfileInfoFields>>;
    }
}
export declare namespace sentinel {
    class PersonalProfilePictureScene implements symphony.ImageViewerUploader {
        get state(): cinematic.Live<symphony.ImageViewerUploaderState>;
        get uploader(): Nullable<(p0: epsilon.FileBlob) => koncurrent.Later<string>>;
        edit(image: epsilon.FileBlob): void;
        upload(image: epsilon.FileBlob): koncurrent.Later<string>;
        view(url: string): void;
        initialize(): koncurrent.Later<void>;
        deInitialize(): void;
    }
}
export declare namespace sentinel {
    class PersonalProfileScenes {
        get picture(): sentinel.PersonalProfilePictureScene;
        get info(): sentinel.PersonalProfileInfoScene;
        get security(): sentinel.ChangePasswordScene;
    }
}
export declare namespace sentinel {
    interface ProfileScenes {
        readonly business: sentinel.BusinessProfileScenes;
        readonly personal: sentinel.PersonalProfileScenes;
    }
}
export declare namespace sentinel.fields {
    class ChangePasswordFields extends symphony.Fields<any/* sentinel.fields.ChangePasswordOutput */> {
        get current(): symphony.BaseField<string>;
        get password1(): symphony.BaseField<string>;
        get password2(): symphony.BaseField<string>;
    }
}
export declare namespace sentinel.fields {
    class PersonalProfileInfoFields extends symphony.Fields<any/* identifier.fields.IndividualOutput */> {
        get name(): symphony.BaseField<string>;
    }
}
export declare namespace sentinel {
    abstract class AccountType {
        static get Business(): sentinel.AccountType & {
            get name(): "Business";
            get ordinal(): 0;
        };
        static get Individual(): sentinel.AccountType & {
            get name(): "Individual";
            get ordinal(): 1;
        };
        static values(): Array<sentinel.AccountType>;
        static valueOf(value: string): sentinel.AccountType;
        get name(): "Business" | "Individual";
        get ordinal(): 0 | 1;
    }
}
export declare namespace sentinel {
    class OnBoardingScene extends cinematic.BaseScene {
        get form(): symphony.MultiStageForm<identifier.CorporatePresenter, any/* sentinel.OnBoardingOutput */, sentinel.OnBoardingStage>;
        initialize(onComplete: (p0: kase.Result<identifier.CorporatePresenter>) => void): void;
        deInitialize(): void;
    }
}
export declare namespace sentinel {
    abstract class OnBoardingStage implements symphony.FormStage {
        get asAccount(): Nullable<sentinel.OnBoardingStage.Account>;
        get asBusinessName(): Nullable<sentinel.OnBoardingStage.BusinessName>;
        get asCurrency(): Nullable<sentinel.OnBoardingStage.Currency>;
        get asAddress(): Nullable<sentinel.OnBoardingStage.Address>;
        get fields(): symphony.Fields<any /*UnknownType **/>;
        get onNext(): Nullable<() => void>;
        get onPrev(): Nullable<() => void>;
        get heading(): string;
        get details(): string;
    }
    namespace OnBoardingStage {
        class Account extends sentinel.OnBoardingStage {
            get heading(): string;
            get details(): string;
            get fields(): sentinel.fields.AccountTypeFields;
            get onNext(): Nullable<() => void>;
            get onPrev(): Nullable<() => void>;
        }
        class BusinessName extends sentinel.OnBoardingStage {
            get heading(): string;
            get details(): string;
            get fields(): sentinel.fields.BusinessNameFields;
            get onNext(): Nullable<() => void>;
            get onPrev(): Nullable<() => void>;
        }
        class Currency extends sentinel.OnBoardingStage {
            get heading(): string;
            get details(): string;
            get fields(): sentinel.fields.CurrencyFields;
            get onNext(): () => void;
            get onPrev(): Nullable<() => void>;
        }
        class Address extends sentinel.OnBoardingStage {
            get heading(): string;
            get details(): string;
            get fields(): sentinel.fields.AddressFields;
            get onNext(): Nullable<() => void>;
            get onPrev(): Nullable<() => void>;
        }
    }
}
export declare namespace sentinel.fields {
    class AccountTypeFields extends symphony.Fields<any/* sentinel.fields.AccountTypeOutput */> {
        get type(): symphony.SingleChoiceField<sentinel.AccountType>;
    }
}
export declare namespace sentinel.fields {
    class AddressFields extends symphony.Fields<any/* sentinel.fields.OnboardingAddressOutput */> {
        get address(): geo.AddressField;
    }
}
export declare namespace sentinel.fields {
    class BusinessNameFields extends symphony.Fields<any/* sentinel.fields.BusinessNameOutput */> {
        get name(): symphony.BaseField<string>;
    }
}
export declare namespace sentinel.fields {
    class CurrencyFields extends symphony.Fields<any/* sentinel.fields.CurrencyOutput */> {
        get currency(): symphony.SingleChoiceField<geo.Country>;
    }
}
export declare namespace sentinel.fields {
    class LocationFields extends symphony.Fields<any/* sentinel.fields.LocationOutput */> {
        get location(): geo.LocationField;
    }
}
export declare namespace sentinel.params {
    class AccountTypeOnBoardingParams {
        get type(): Nullable<sentinel.AccountType>;
        set type(value: Nullable<sentinel.AccountType>);
    }
}
export declare namespace sentinel.params {
    class BusinessNameOnBoardingParams {
        get name(): Nullable<string>;
        set name(value: Nullable<string>);
    }
}
export declare namespace sentinel.params {
    class CurrencyOnBoardingParams {
        get currency(): Nullable<kash.Currency>;
        set currency(value: Nullable<kash.Currency>);
        get country(): Nullable<geo.Country>;
    }
}
export declare namespace sentinel.params {
    class LocationOnBoardingParams {
        get location(): Nullable<geo.GeoLocation>;
        set location(value: Nullable<geo.GeoLocation>);
    }
}
export declare namespace picapital {
    class PiCapitalAppScenes {
        get api(): picapital.PiCapitalApi;
        get registration(): sentinel.RegistrationScenes;
        get authentication(): sentinel.AuthenticationScenes;
        get toaster(): snitch.Snitch;
        get downloader(): bringer.Downloader;
    }
}
export declare namespace picapital {
    class PiCapitalAppScenesConfig<A> implements sentinel.RegistrationSceneConfig<A>, keep.Cacheable/*, sentinel.AuthenticationScenesConfig<A>, sentinel.OnboardingScenesConfig<A>, sentinel.ProfileScenesConfig<A> */ {
        get cache(): any/* keep.Cache */;
        get clock(): krono.Clock;
        get workManager(): any/* krest.WorkManager */;
        get downloader(): bringer.Downloader;
        get clipboard(): any/* klip.Clipboard */;
    }
}
export declare namespace cinematic {
    function useNullableLive<S>(live?: Nullable<cinematic.Live<S>>, executor?: Nullable<any>/* Nullable<koncurrent.Executor> */): Nullable<S>;
    function useLive<S>(live: cinematic.Live<S>, executor?: Nullable<any>/* Nullable<koncurrent.Executor> */): S;
}
export declare namespace symphony {
    interface ImageUploaderProps extends Props {
        scene: symphony.ImageViewerUploader;
        placeholder?: Nullable<ReactNode>;
        uploading?: Nullable<ReactNode>;
        loading?: Nullable<ReactNode>;
        viewer?: Nullable<FC<symphony.ImageUploaderViewerProps>>;
        save?: Nullable<ReactNode>;
        onSave?: Nullable<(p0: epsilon.BrowserBlob) => void>;
        color?: Nullable<string>;
    }
}
export declare namespace symphony {
    const ImageUploader: FC<symphony.ImageUploaderProps>;
}
export declare namespace symphony {
    interface ImageUploaderViewerProps extends Props {
        url: string;
    }
}
export declare class Durator {
    get running(): boolean;
    set running(value: boolean);
    start(): void;
    stop(): void;
}
export declare function useDuration(i: krono.Instant, suffix?: string): string;
export declare interface PiCapitalReactConfiguration {
    picapitalUrl: string;
    verificationUrl: string;
    passwordResetUrl: string;
    logging?: Nullable<lexi.LoggingConfigurationJson>;
    namespace?: Nullable<string>;
}
export declare function scenes(config: PiCapitalReactConfiguration): picapital.PiCapitalAppScenes;
export as namespace picapital_react;
