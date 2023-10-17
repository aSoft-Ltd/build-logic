import { koncurrent } from './koncurrent'
import { kase } from './kase'
import { kollections } from './kollections'

export declare namespace epsilon {
    interface Blob {
        readBytes(executor?: any/* koncurrent.Executor */): koncurrent.Later<Int8Array>;
    }

    interface FileBlob extends epsilon.Blob {
        readonly path: string;
        readonly name: string;
        readBytes(executor: any/* koncurrent.Executor */): koncurrent.Later<Int8Array>;
    }

    class BrowserBlob implements epsilon.Blob {
        get blob(): Blob;
        readBytes(executor: any/* koncurrent.Executor */): koncurrent.Later<Int8Array>;
        toFileBlob(name: string): kase.Result<epsilon.FileBlob>;
    }

    function blobOf(blob: Blob): epsilon.Blob;
    function blob(blob?: Nullable<Blob>): kase.Result<epsilon.Blob>;

    function fileBlobsFrom(list?: Nullable<FileList>): kollections.List<epsilon.FileBlob>;
    function fileBlobOf(file: File): epsilon.FileBlob;
    function fileBlob(file?: Nullable<File>): kase.Result<epsilon.FileBlob>;
}