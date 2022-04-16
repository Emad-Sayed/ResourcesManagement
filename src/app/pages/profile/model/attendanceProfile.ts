import { interval, Subscription } from 'rxjs';

export class AttendanceProfile {
    isAttendanceSet: boolean = false;
    hours: number = 0;
    minues: number = 0;
    seconds: number = 0;
    source = interval(1000);
    subscription: Subscription;
    startTimeCounting() {
        this.isAttendanceSet = true;
        this.subscription = this.source.subscribe(
            sec => {
                this.seconds = (this.seconds == 59) ? 1 : ++this.seconds
                this.minues = (this.minues == 59) ? 1 :  this.minues
                this.hours = (sec % 3600 == 0 && sec != 0) ? ++this.hours : this.hours
                this.minues = (sec % 60 == 0 && sec != 0) ? ++this.minues : this.minues
            }
        )
    }
    endTimeCounting() {
        this.isAttendanceSet = false;
        this.hours=0;
        this.minues=0;
        this.seconds=0;
        this.subscription.unsubscribe();
    }
}
