import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CountService {
    counter: {activeClicks: number, inactiveClicks: number} = {
        activeClicks: 0,
        inactiveClicks: 0
    }

    addActivateClick() {
        this.counter = {
            ...this.counter,
            activeClicks: ++this.counter.activeClicks
        }
        console.log('Activate click count: ', this.counter.activeClicks);
    }

    addInactivateClick() {
        this.counter = {
            ...this.counter,
            inactiveClicks: ++this.counter.inactiveClicks,
        }
        console.log('Inactivate click count: ', this.counter.inactiveClicks);
        
    }


}