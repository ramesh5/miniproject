export class Songs {
    
    constructor(private _title: string,  
        public duration: string,
        public genre: string,
        public addeddate: Date=new Date(),public id?: number) {}

    get title() {
        return this._title;
    }

    set title(title: string) {
        
        this._title = title;
    }
}