import EmployeeName from "./employee-name";
import Location from "./location";

export default class Employee {
    constructor({
        name,
        gender,
        email,
        location,
        thumbnail
    }) {
        this.name = name;
        this.gender = gender;
        this.email = email;
        this.location = location;
        this.thumbnail = thumbnail;
    }

    get fullName() {
        if (this.name instanceof EmployeeName) {
            return `${this.name.title}. ${this.name.first} ${this.name.last}`;
        }

        return 'N/A';
    }

    get address() {
        if (this.location instanceof Location) {
            return `
                ${this.location.postcode},
                ${this.location.street} ${this.location.city},
                ${this.location.state} ${this.location.country}
            `.trim();
        }

        return 'N/A';
    }
}
