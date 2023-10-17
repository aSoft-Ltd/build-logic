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

    interface CollectionLike<E> extends kollections.Iterable<E>/*, kotlin.collections.Collection<E> */ {
        first(): E;
        firstOrNull(): Nullable<E>;
        joinToString(separator?: string, transformer?: (p0: E) => string): string;
        toArray(): Array<E>;
        count(): number;
    }

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

    function undirectedGraph<N, E>(nodes: Array<N>): kollections.MutableGraph<N, E>;
    function directedGraphOf<N, E>(nodes: Array<N>): kollections.MutableGraph<N, E>;
    function buildDirectedGraph<N, E>(nodes: Array<N>, builder: (p0: kollections.MutableGraph<N, E>) => void): kollections.MutableGraph<N, E>;
    function graphOf<N, E>(nodes: Array<N>): kollections.Graph<N, E>;

    interface LinearlyTraversable<E> {
        current(): Nullable<E>;
        forward(): Nullable<E>;
        backward(): Nullable<E>;
        canGoForward(): boolean;
        canGoBackward(): boolean;
        canGo(steps: number): boolean;
        go(steps: number): Nullable<E>;
    }

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

    function traversableStackOf<E>(): kollections.LinearlyTraversableStack<E>;

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

    function emptyMutableList<E>(): kollections.MutableList<E>;
    function mutableListOf<E>(elements: Array<E>): kollections.MutableList<E>;
    function emptyListOf<E>(): kollections.List<E>;
    function emptyList<E>(): kollections.List<E>;
    function listOf<E>(elements: Array<E>): kollections.List<E>;

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

    function pairOf<K, V>(key: K, value: V): kollections.MapEntry<K, V>;
    function to<K, V>(_this_: K, value: V): kollections.MapEntry<K, V>;
    function mutableMapOf<K, V>(pairs: Array<kollections.MapEntry<K, V>>): kollections.MutableMap<K, V>;
    function emptyMapOf<K, V>(): kollections.Map<K, V>;
    function emptyMap<K, V>(): kollections.Map<K, V>;
    function mapOf<K, V>(pairs: Array<kollections.MapEntry<K, V>>): kollections.Map<K, V>;

    interface MapEntry<K, V> /* extends kotlin.collections.Map.Entry<K, V> */ {
        readonly k: K;
        readonly v: V;
    }

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

    function emptyMutableSet<E>(): kollections.MutableSet<E>;
    function mutableSetOf<E>(elements: Array<E>): kollections.MutableSet<E>;
    function emptySetOf<E>(): kollections.Set<E>;
    function emptySet<E>(): kollections.Set<never>;
    function setOf<E>(elements: Array<E>): kollections.Set<E>;

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

    interface Iterable<E> /* extends kotlin.collections.Iterable<E> */ {
        toArray(): Array<E>;
        count(): number;
    }
}