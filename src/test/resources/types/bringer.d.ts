import { koncurrent } from './koncurrent'

export declare namespace bringer {
    interface DownloadOptionsRaw {
        readonly url: string;
        readonly filename?: Nullable<string>;
        readonly destination?: Nullable<string>;
    }

    interface Downloader {
        downloadWithFilename(url: string, filename: string): koncurrent.Later<Nullable<any>>;
        download(url: string): koncurrent.Later<Nullable<any>>;
        downloadNow(options: bringer.DownloadOptionsRaw): koncurrent.Later<Nullable<any>>;
    }
}