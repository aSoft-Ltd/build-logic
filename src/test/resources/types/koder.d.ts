import { kollections } from './kollections'

export declare namespace koder {
    interface BarCode {
    }

    interface BarCodeUPC extends koder.BarCode {
        readonly data: string;
        readonly guardBars: Int32Array;
        readonly middleBars: Int32Array;
        readonly startBars: Int32Array;
        readonly leftBars: Int32Array;
        readonly rightBars: Int32Array;
        readonly endBars: Int32Array;
    }

    function barCodeUPCOf(code: string): koder.BarCodeUPC;
    function barCodeUPCOrNullOf(code: string): Nullable<koder.BarCodeUPC>;
    function barCodeUPCOrDefault(code: string, _default?: koder.BarCodeUPC): koder.BarCodeUPC;

    const BarCodeUPCSpec: {
        get L(): kollections.Map<string, Int32Array>;
        get R(): kollections.Map<string, Int32Array>;
        get GUARD_BARS(): Int32Array;
        get MIDDLE_BARS(): Int32Array;
    };

    function renderUPCBarcodeToString(_this_: koder.BarCodeUPC, separator?: string): string;
}