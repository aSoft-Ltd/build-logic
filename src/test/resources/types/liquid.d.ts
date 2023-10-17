export declare namespace liquid {
    interface NumberFormatter {
        readonly options: liquid.NumberFormatterRawOptions;
        formatNumber(number: number): string;
    }

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