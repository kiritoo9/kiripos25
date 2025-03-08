export interface UploadOptionSchema {
    dir: string;
    file_name: string | null,
    allowed_ext?: string[] | null,
    max_size?: number | null
}