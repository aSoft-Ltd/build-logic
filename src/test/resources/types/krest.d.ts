import { cinematic } from './cinematic'

export declare namespace krest {
    class WorkerLedger {
        get type(): string;
        get topic(): Nullable<string>;
        get progress(): cinematic.MutableLiveMap<string, kase.ExecutorState<Nullable<any>>>;
    }
}