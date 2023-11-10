import { kollections } from './kollections'

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

    class Executing implements kase.ExecutorState<never> {
        get message(): string;
        get progress(): kase.progress.ProgressState;
        get data(): Nullable<never>;
        get asPending(): Nullable<never>;
        get asExecuting(): kase.Executing;
        get asSuccess(): Nullable<never>;
        get asFailure(): Nullable<never>;
    }

    interface ExecutorState<D> extends kase.State<D>, kase.CanPend, kase.CanExecute, kase.CanSucceed<D>, kase.CanFail<D> {
        readonly data?: Nullable<D>;
        readonly asPending?: Nullable<typeof kase.Pending>;
        readonly asExecuting?: Nullable<kase.Executing>;
        readonly asSuccess?: Nullable<kase.Success<D>>;
        readonly asFailure?: Nullable<kase.Failure<D>>;
    }

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

    interface LazyState<D> extends kase.State<D>, kase.CanPend, kase.CanLoad<D>, kase.CanSucceed<D>, kase.CanFail<D> {
        readonly data?: Nullable<D>;
        readonly asPending?: Nullable<typeof kase.Pending>;
        readonly asLoading?: Nullable<kase.Loading<D>>;
        readonly asSuccess?: Nullable<kase.Success<D>>;
        readonly asFailure?: Nullable<kase.Failure<D>>;
    }

    class Loading<D> implements kase.LazyState<D> {
        get message(): string;
        get data(): Nullable<D>;
        get progress(): kase.progress.ProgressState;
        get asPending(): Nullable<never>;
        get asLoading(): kase.Loading<D>;
        get asSuccess(): Nullable<never>;
        get asFailure(): Nullable<never>;
    }

    const Pending: {
        get data(): Nullable<never>;
        get asPending(): typeof kase.Pending;
        get asLoading(): Nullable<never>;
        get asExecuting(): Nullable<never>;
        get asSuccess(): Nullable<never>;
        get asFailure(): Nullable<never>;
    } & kase.LazyState<never> & kase.ExecutorState<never>;

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

    interface State<D> {
        readonly data?: Nullable<D>;
    }

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

    class Error {
        get message(): string;
        get type(): string;
        get cause(): string;
        get stackTrace(): string;
        toException(): any/* kotlin.RuntimeException */;
    }

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

    class Status {
        get code(): number;
        get message(): string;
    }

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

    function bagOf<T extends any>(value: Nullable<T>): kase.Bag<T>;

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

    function optionalOf<T extends any>(value: Nullable<T>): kase.Optional<T>;
    function none<T extends any>(): kase.None<T>;
    function some<T extends any>(value: T): kase.Some<T>;

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