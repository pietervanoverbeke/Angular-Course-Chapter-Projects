import { Injectable } from "@angular/core";
import { CountService } from "./count.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    activeUsers = ['Max', 'Anna'];
    inactiveUsers = ['Chris', 'Manu'];

    constructor(private countService: CountService) {}

    setToInactive(id: number) {
        this.inactiveUsers.push(this.activeUsers[id]);
        this.activeUsers.splice(id, 1);
        this.countService.addInactivateClick()
    }

    setToActive(id: number) {
        this.activeUsers.push(this.inactiveUsers[id]);
        this.inactiveUsers.splice(id, 1);
        this.countService.addActivateClick()
    }
}