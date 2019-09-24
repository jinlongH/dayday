declare module Zlib {
    export class Inflate {
        constructor(data: any);
        decompress(): any;
    }

    export class Gunzip {
        constructor(data: any);
        decompress(): any;
    }

    export class Deflate {
        constructor(data: any);
        compress(): any;
    }
    export class Gzip {
        constructor(data: any);
        compress(): any;
    }


}  