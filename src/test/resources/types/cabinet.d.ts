import { epsilon } from './epsilon'
import { koncurrent } from './koncurrent'
import { kollections } from './kollections'

export declare namespace cabinet {
    class Attachment {
        get uid(): string;
        get name(): string;
        get url(): string;
        get sizeInBytes(): number;
        get description(): Nullable<string>;
        get contentType(): Nullable<string>;
    }

    interface CabinetApi {
        readonly attachments: cabinet.RootDir;
    }

    interface Directory {
        rootDir(uid: string): cabinet.RootDir;
    }

    class FileUploadParam {
        get path(): string;
        get filename(): string;
        get blob(): epsilon.Blob;
    }

    interface RootDir {
        upload(param: cabinet.FileUploadParam): koncurrent.Later<cabinet.Attachment>;
        uploadMany(params: Array<cabinet.FileUploadParam>): kollections.Map<cabinet.FileUploadParam, koncurrent.Later<cabinet.Attachment>>;
        list(): koncurrent.Later<kollections.List<cabinet.Attachment>>;
        deleteAttachment(attachment: cabinet.Attachment): koncurrent.Later<cabinet.Attachment>;
    }
}