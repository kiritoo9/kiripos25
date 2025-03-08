import fs from "fs";
import path from "path";

import type { UploadOptionSchema } from "../interfaces/schemas/upload.schema";
import ENV from "../infras/environ";

const upload = (base64string: string, options: UploadOptionSchema): string => {
    try {
        // define base options
        const BASE_FOLDER: string = path.join(__dirname, "./../../cdn");
        const DEFAULT_EXT: string[] = ["jpg", "jpeg", "png", "gif"];
        const MAX_SIZE: number = 1000; // in kb
        const UPLOAD_TARGET: string = `${BASE_FOLDER}/${options.dir}`;

        // check options
        options.allowed_ext = options.allowed_ext ?? DEFAULT_EXT;
        options.max_size = options.max_size ?? MAX_SIZE;

        // handle require input
        if (options?.dir === undefined || !options.dir) throw new Error("Option dir is required, please not leave it empty");
        if (options?.file_name === undefined || !options.file_name) throw new Error("Option file_name is required, please not leave it empty");

        // MIME check & size calculation
        const match = base64string.match(/^data:(.+);base64,/);
        if (!match) throw new Error("Missing mime type of base64 string, please check your input");
        const mimeType = match[1]; // extract MIME type
        const FILE_EXT = mimeType.split("/")[1]; // get file extension

        const base64Data = base64string.replace(/^data:.+;base64,/, "");
        const SIZE_IN_BYTES = (base64Data.length * 3) / 4; // decode base64 size
        const SIZE_IN_KB = (SIZE_IN_BYTES / 1024).toFixed(2);

        // process to check extension
        if (!options.allowed_ext.includes(FILE_EXT)) throw new Error("Extension of this file is not acceptable");

        // process to check maximum size
        if (options.max_size < parseInt(SIZE_IN_KB)) throw new Error("File size you uploaded is too big");

        // create directory-sub-drectory and convert into file
        if (!fs.existsSync(UPLOAD_TARGET)) {
            fs.mkdirSync(UPLOAD_TARGET, { recursive: true });
        }
        const FILE_NAME: string = `${options.file_name}.${FILE_EXT}`;
        const FILE_PATH: string = path.join(UPLOAD_TARGET, FILE_NAME);
        const FILE_BUFFER = Buffer.from(base64Data, "base64");
        fs.writeFileSync(FILE_PATH, new Uint8Array(FILE_BUFFER));

        // response
        return FILE_NAME;
    } catch (error: any) {
        throw new Error(error?.message);
    }
}

const pop = (dir: string, file_name: string): string => {
    return `${ENV.CDN_FILE}/${dir}/${file_name}`;
}

export {
    upload,
    pop
}