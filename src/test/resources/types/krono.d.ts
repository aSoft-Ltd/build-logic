import { kase } from './kase'
import { symphony } from './symphony'
import { cinematic } from './cinematic'

export declare namespace krono {
    interface Clock {
        currentMicrosAsLong(): any/* kotlin.Long */;
        currentMicrosAsDouble(): number;
        currentMillisAsLong(): any/* kotlin.Long */;
        currentMillisAsDouble(): number;
        currentSecondsAsLong(): any/* kotlin.Long */;
        currentSecondsAsDouble(): number;
    }

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

    interface Dateable<D extends krono.Dateable<D>> {
        atDate(date: number): D;
        atEndOfMonth(): D;
    }

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

    function localDateAt(year?: number, month?: number, dayOfMonth?: number): kase.Result<krono.LocalDate>;
    function localDateEpoch(): krono.LocalDate;
    function parseLocalDate(isoString?: Nullable<string>): kase.Result<krono.LocalDate>;
    function parseLocalDateOrNUll(isoString?: Nullable<string>): Nullable<krono.LocalDate>;

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

    function localDateTimeFromDateAndTime(date: krono.LocalDate, time: krono.LocalTime): kase.Result<krono.LocalDateTime>;
    function localDateTime(year?: number, month?: number, dayOfMonth?: number, hour?: number, minutes?: number, seconds?: number, nanoseconds?: number): kase.Result<krono.LocalDateTime>;
    function localDateTimeEpoch(): krono.LocalDateTime;
    function parseLocalDateTime(isoString?: Nullable<string>): kase.Result<krono.LocalDateTime>;

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

    function localTime(hour?: number, minutes?: number, seconds?: number, nanoseconds?: number): kase.Result<krono.LocalTime>;
    function parseLocalTime(isoString?: Nullable<string>): kase.Result<krono.LocalTime>;
    function Midnight(): krono.LocalTime;
    function parseLocalTimeOrMidnight(isoString: string): krono.LocalTime;

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

    function numberOfDays(_this_: krono.Month, year: number): number;

    const Patterns: {
        get ISO_DATE(): string;
        get ISO_TIME(): string;
        get ISO_DATE_TIME(): string;
    };

    class PresenterFormatter {
        get pattern(): krono.PresenterPattern;
        get date(): krono.PureDateFormatter;
        get time(): krono.PureTimeFormatter;
        get dateTime(): krono.PureDateTimeFormatter;
    }

    class PresenterPattern {
        get date(): string;
        get time(): string;
        get dateTime(): string;
        get formatter(): krono.PresenterFormatter;
    }

    interface PureDateFormatter {
        formatDate(year: number, month: number, day: number): string;
    }

    interface PureDateTimeFormatter extends krono.PureDateFormatter, krono.PureTimeFormatter {
        formatDateTime(year: number, month: number, day: number, hour: number, minutes: number, seconds: number): string;
        formatDate(year: number, month: number, day: number): string;
        formatTime(hour: number, minutes: number, seconds: number): string;
    }

    function pureDateFormatter(pattern: string): krono.PureDateFormatter;
    function pureTimeFormatter(pattern: string): krono.PureTimeFormatter;
    function pureDateTimeFormatter(pattern: string): krono.PureDateTimeFormatter;

    interface PureTimeFormatter {
        formatTime(hour: number, minutes: number, seconds: number): string;
    }

    interface TemporalComparable<E> /* extends kotlin.Comparable<E> */ {
        isBefore(other: E): boolean;
        isAfter(other: E): boolean;
    }

    interface TemporalFormattable {
        format(pattern: string): string;
        toIsoString(): string;
    }

    interface TimeLike extends krono.TemporalFormattable {
        readonly hour: number;
        readonly minute: number;
        readonly second: number;
        readonly nanosecond: number;
        format(pattern: string): string;
        toIsoString(): string;
    }

    interface TimeZone {
        readonly id: string;
    }

    function timeZoneOf(id: string): krono.TimeZone;

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

    function dateOf(ld: krono.LocalDate): Date;
    function dateOrNullOf(ld?: Nullable<krono.LocalDate>): Nullable<Date>;
    function localDateOf(d: Date): Date;

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

    function toInstant(_this_: krono.DateTimePresenter): krono.Instant;
    function currentInstant(_this_: krono.Clock): krono.Instant;

    const TimeZones: {
        get UTC(): krono.TimeZone;
        get System(): krono.TimeZone;
    };

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