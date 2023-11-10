import { kollections } from './kollections'

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

    function mutableLiveOf<S>(value: S, capacity?: number): cinematic.MutableLive<S>;
    function singleWatchableLiveOf<S>(value: S, capacity?: number): cinematic.MutableLive<S>;

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

    interface Watchable<S> {
        readonly value: S;
        watchWithModeAndExecutor(callback: (p0: S) => void, mode: cinematic.WatchMode, executor: any/* koncurrent.Executor */): cinematic.Watcher;
        watchWithExecutor(callback: (p0: S) => void, executor: any/* koncurrent.Executor */): cinematic.Watcher;
        watchWithMode(callback: (p0: S) => void, mode: cinematic.WatchMode): cinematic.Watcher;
        watch(callback: (p0: S) => void): cinematic.Watcher;
    }

    interface Watcher {
        stop(): void;
    }

    abstract class LazyScene<S> extends cinematic.Scene<kase.LazyState<S>> {
        static asPending<S>(): cinematic.LazyScene<S>;
        static asSuccess<S>(state: S): cinematic.LazyScene<S>;
        deInitialize(): void;
    }

    abstract class Scene<S> extends cinematic.BaseScene {
        get ui(): cinematic.MutableLive<S>;
    }

    abstract class BaseScene {
    }

    function emptyMutableLiveListOF<E>(): cinematic.MutableLiveList<E>;
    function mutableLiveListOf<E>(elements: Array<E>): cinematic.MutableLiveList<E>;
    function emptyMutableLiveSetOf<E>(): cinematic.MutableLiveSet<E>;
    function mutableLiveSetOf<E>(elements: Array<E>): cinematic.MutableLiveSet<E>;
    function emptyMutableLiveMapOf<K, V>(): cinematic.MutableLiveMap<K, V>;
    function mutableLiveMapOf<K, V>(pairs: kollections.MapEntry<K, V>): cinematic.MutableLiveMap<K, V>;

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

    function useNullableLive<S>(live?: Nullable<cinematic.Live<S>>, executor?: Nullable<any>/* Nullable<koncurrent.Executor> */): Nullable<S>;
    function useLive<S>(live: cinematic.Live<S>, executor?: Nullable<any>/* Nullable<koncurrent.Executor> */): S;
}