import { krono } from './krono'
import { koncurrent } from './koncurrent'

export declare namespace hormone {
    class ActionDateDto {
        get created(): krono.Instant;
        get updated(): krono.Instant;
    }

    interface BulkVoid<R> {
        void(uid: string): koncurrent.Later<R>;
        voidBulk(ids: kollections.List<string>): koncurrent.Later<kollections.List<R>>;
    }

    interface Creator<P, R> {
        create(params: P): koncurrent.Later<R>;
    }

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

    interface Deleter<R extends any> {
        delete(uid: string): koncurrent.Later<Nullable<R>>;
        deleteBulk(ids: kollections.List<string>): koncurrent.Later<kollections.List<Nullable<R>>>;
    }

    interface Loader<R> {
        load(options?: any/* kronecker.LoadOptions */): koncurrent.Later<kollections.List<R>>;
        loadById(uid: string): koncurrent.Later<R>;
    }

    interface Updater<P, R> {
        update(params: any/* hormone.Identified<string, P> */): koncurrent.Later<R>;
    }
}