export class ResourceEvent {
    name: string;
    location: string;
    start: Date;
    end: Date;
    constructor(start:Date,end:Date,name,location){
        this.name=name;
        this.location=location;
        this.start=new Date(start);
        this.end=new Date(end);
    }
}