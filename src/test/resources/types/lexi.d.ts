export declare namespace lexi {
    interface AppenderConfigurationJson {
        readonly type: string;
        readonly level?: Nullable<string>;
        readonly format?: Nullable<lexi.LogFormatterConfigurationJson>;
    }

    interface LogFormatterConfigurationJson {
        readonly type: string;
        readonly source?: Nullable<boolean>;
        readonly status?: Nullable<boolean>;
        readonly verbose?: Nullable<boolean>;
    }

    interface LoggingConfigurationJson {
        readonly level?: Nullable<string>;
        readonly verbose?: Nullable<boolean>;
        readonly source?: Nullable<boolean>;
        readonly status?: Nullable<boolean>;
        readonly appenders: Array<lexi.AppenderConfigurationJson>;
    }
}