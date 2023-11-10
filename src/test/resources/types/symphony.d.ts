import { cinematic } from './cinematic'
import { kollections } from './kollections'
import { koncurrent } from './koncurrent'
import { lexi } from './lexi'
import { geo } from './geo'
import { epsilon } from './epsilon'

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

    interface BaseFieldState<O> extends symphony.FieldState<O> {
        readonly name: string;
        readonly label: symphony.Label;
        readonly hint: string;
        readonly output?: Nullable<O>;
        readonly required: boolean;
        readonly visibility: symphony.Visibility;
        readonly feedbacks: symphony.Feedbacks;
    }

    class Button implements symphony.properties.Labeled {
        get name(): string;
        get label(): symphony.Label;
    }

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

    interface FieldState<O> {
        readonly output?: Nullable<O>;
        readonly required: boolean;
        readonly visibility: symphony.Visibility;
        readonly feedbacks: symphony.Feedbacks;
    }

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

    interface FormInfo {
        readonly heading: string;
        readonly details: string;
    }

    interface FormStage extends symphony.FormInfo {
        readonly fields: symphony.Fields<any /*UnknownType **/>;
        readonly onNext?: Nullable<() => void>;
        readonly onPrev?: Nullable<() => void>;
        readonly heading: string;
        readonly details: string;
    }

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

    class Label {
        get text(): string;
        capitalizedWithAstrix(): string;
        capitalizedWithoutAstrix(): string;
    }

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

    interface ListFieldState<E> extends symphony.FieldState<kollections.List<E>> {
        readonly output: kollections.MutableList<E>;
        readonly required: boolean;
        readonly visibility: symphony.Visibility;
        readonly feedbacks: symphony.Feedbacks;
    }

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

    class Option {
        get label(): string;
        get value(): string;
        get selected(): boolean;
    }

    class Range<T> {
        get start(): T;
        get end(): T;
    }

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

    interface RangeFieldState<O extends any> extends symphony.FieldState<symphony.Range<O>> {
        readonly start?: Nullable<O>;
        readonly end?: Nullable<O>;
        readonly visibility: symphony.Visibility;
        readonly required: boolean;
        readonly feedbacks: symphony.Feedbacks;
        readonly input: symphony.Range<Nullable<O>>;
        readonly output?: Nullable<symphony.Range<O>>;
    }

    interface SubmitConfig /* extends lexi.Logable */ {
        readonly exitOnSuccess: boolean;
    }

    interface TransState<I, O> extends symphony.FieldState<O> {
        readonly input?: Nullable<I>;
        readonly output?: Nullable<O>;
        readonly required: boolean;
        readonly visibility: symphony.Visibility;
        readonly feedbacks: symphony.Feedbacks;
    }

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

    interface ChoiceField<O> {
        readonly items: kollections.Collection<O>;
        readonly mapper: (p0: O) => symphony.Option;
    }

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

    interface SearchableState {
        readonly key: string;
        readonly searchBy: symphony.SearchBy;
    }

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

    class PhoneOutput {
        get country(): geo.Country;
        get body(): any/* kotlin.Long */;
        get bodyAsDouble(): number;
    }

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

    class PageResult<T> {
        get page(): symphony.Page<T>;
        get row(): symphony.Row<T>;
    }

    interface Pageable<T> {
        readonly paginator: symphony.PaginationManager<T>;
    }

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

    interface Row<D> {
        readonly index: number;
        readonly item: D;
        readonly number: number;
    }

    interface Selectable<T> {
        readonly selector: symphony.SelectionManager<T>;
    }

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

    interface ActionableSelection<T> {
        readonly actions: symphony.SelectorBasedActionsManager<T>;
    }

    interface ActionsManager<T> {
        readonly current: cinematic.Live<kollections.List<kevlar.Action0<void>>>;
        get(): kollections.List<kevlar.Action0<void>>;
        add(name: string, handler: () => void): symphony.ActionsManager<T>;
        remove(key: string): symphony.ActionsManager<T>;
    }

    interface FixedActionsManager extends symphony.ActionsManager<any> {
        refresh(): void;
        readonly current: cinematic.Live<kollections.List<kevlar.Action0<void>>>;
        get(): kollections.List<kevlar.Action0<void>>;
        add(name: string, handler: () => void): symphony.ActionsManager<any>;
        remove(key: string): symphony.ActionsManager<any>;
    }

    interface SelectorBasedActionsManager<T> extends symphony.ActionsManager<T> {
        addSingle(name: string, handler: (p0: T) => void): symphony.SelectorBasedActionsManager<T>;
        addMulti(name: string, handler: (p0: kollections.List<T>) => void): symphony.SelectorBasedActionsManager<T>;
        of(item: T): kollections.List<kevlar.Action0<void>>;
        readonly current: cinematic.Live<kollections.List<kevlar.Action0<void>>>;
        get(): kollections.List<kevlar.Action0<void>>;
        add(name: string, handler: () => void): symphony.ActionsManager<T>;
        remove(key: string): symphony.ActionsManager<T>;
    }

    abstract class Column<D> /* implements kotlin.Comparable<symphony.Column<any>> */ {
        get name(): string;
        get key(): string;
        get index(): number;
        get visibility(): symphony.Visibility;
        get number(): number;
        get asSelect(): Nullable<symphony.Column.Select>;
        get asData(): Nullable<symphony.Column.Data<D>>;
        get asAction(): Nullable<symphony.Column.Action>;
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

    interface ColumnMover<D> {
        before(name: string): symphony.ColumnsManager<D>;
        after(name: string): symphony.ColumnsManager<D>;
    }

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

    interface Table<T> extends symphony.Pageable<T>, symphony.Selectable<T>, symphony.ActionableSelection<T> {
        readonly columns: symphony.ColumnsManager<T>;
        manageActions(block: (p0: symphony.SelectorBasedActionsManager<T>) => void): symphony.Table<T>;
        manageColumns(block: (p0: symphony.ColumnsManager<T>) => void): symphony.Table<T>;
        map<R>(transform: (p0: T) => R): symphony.Table<R>;
        readonly paginator: symphony.PaginationManager<T>;
        readonly selector: symphony.SelectionManager<T>;
        readonly actions: symphony.SelectorBasedActionsManager<T>;
    }

    interface List<T> extends symphony.Pageable<T>, symphony.Selectable<T>, symphony.ActionableSelection<T> {
        readonly rows: kollections.List<symphony.Row<T>>;
        manageActions(block: (p0: symphony.SelectorBasedActionsManager<T>) => void): symphony.List<T>;
        map<R>(transform: (p0: T) => R): symphony.List<R>;
        readonly paginator: symphony.PaginationManager<T>;
        readonly selector: symphony.SelectionManager<T>;
        readonly actions: symphony.SelectorBasedActionsManager<T>;
    }

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

    interface ImageViewerUploader {
        readonly state: cinematic.Live<symphony.ImageViewerUploaderState>;
        readonly uploader?: Nullable<(p0: epsilon.FileBlob) => koncurrent.Later<string>>;
        view(url: string): void;
        edit(image: epsilon.FileBlob): void;
        upload(image: epsilon.FileBlob): koncurrent.Later<string>;
    }

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

    const ImageUploader: FC<symphony.ImageUploaderProps>;

    interface ImageUploaderViewerProps extends Props {
        url: string;
    }
}