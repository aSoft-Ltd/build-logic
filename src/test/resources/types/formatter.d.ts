export declare namespace formatter {
    /** @deprecated use liquid instead */
    interface NumberFormatter {
        readonly options: formatter.NumberFormatterRawOptions;
        formatNumber(number: number): string;
    }

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