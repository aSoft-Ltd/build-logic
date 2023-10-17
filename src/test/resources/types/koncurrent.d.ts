import { kase } from './kase'
import { kollections } from './kollections'

export declare namespace koncurrent {
    const Executors: {
        default(): any/* koncurrent.Executor */;
    };

    const SetTimeoutExecutor: {
    } & any/* koncurrent.Executor */;

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

    function pendingLater<T>(executor?: any/* koncurrent.Executor */): koncurrent.PendingLater<T>;
    function laterOf<T>(value: T, executor?: any/* koncurrent.Executor */): koncurrent.Later<T>;
    function FailedLaterWithMessage(message: string, executor?: any/* koncurrent.Executor */): koncurrent.Later<never>;
    function FailedLater(error: Error, executor?: any/* koncurrent.Executor */): koncurrent.Later<never>;
    function TODOLater(message?: string, executor?: any/* koncurrent.Executor */): koncurrent.Later<never>;

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