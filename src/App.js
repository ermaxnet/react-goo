import React, { Component, Fragment } from 'react';
import Box from "./Box/Box";
import {
    Employee,
    EmployeeName,
    Location
} from "./models";
import EmployeeTable from "./EmployeeTable/EmployeeTable";
import "./App.css";

const namesDB = [
    'Maksim',
    'Good Kat',
    'Patrick O\'Brian'
];

export default class App extends Component {
    total = 5000;

    state = {
        names: [ ...namesDB ],
        acceptedNames: [],
        employees: []
    }

    componentDidMount() {
        fetch(`https://randomuser.me/api/?results=${this.total}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => {
                const employees = response.results.map(employee => new Employee({
                    name: new EmployeeName(employee.name),
                    email: employee.email,
                    gender: employee.gender,
                    location: new Location({
                        city: employee.location.city,
                        country: employee.location.country,
                        postcode: String(employee.location.postcode),
                        state: employee.location.state,
                        street: employee.location.street.name
                    }),
                    thumbnail: employee.picture.thumbnail
                }));

                this.setState({ employees });
            });
    }

    constructor() {
        super();
        this.dragstart = this.onDragStart.bind(this);
        this.dragover = this.onDragOver.bind(this);
        this.drop = this.onDrop.bind(this);
        this.click = this.onClick.bind(this);
    }

    onDragStart(event) {
        if (event.target) {
            event.dataTransfer.setData(
                'text/plain',
                event.target.attributes.getNamedItem('data-name').value
            );
        }
    }

    onDragOver(event) {
        event.preventDefault();
    }

    onDrop(event) {
        const name = event.dataTransfer.getData('text');

        const names = this.state.names.filter(na => na !== name);
        const acceptedNames = [
            ...this.state.acceptedNames,
            name
        ];

        event.dataTransfer.clearData();

        this.setState({ names, acceptedNames });
    }

    onClick() {
        const names = [ ...namesDB ];
        const acceptedNames = [];

        this.setState({ names, acceptedNames });
    }

    render() {
        return (
            <Fragment>
                <div className="container">
                    <div className="boxes boxes--source">
                        {this.state.names.map(name =>
                            <Box
                                key={name}
                                name={name}
                                isDraggable={true}
                                onDragStart={this.dragstart}
                            />
                        )}
                    </div>

                    <button className="reset-button" onClick={this.click}>Reset</button>

                    <div className="boxes boxes--destination" onDragOver={this.dragover} onDrop={this.drop}>
                        {this.state.acceptedNames.map(name =>
                            <Box key={name} name={name} isAccepted={true} />
                        )}
                    </div>
                </div>

                <div className="employees-table-container">
                    <EmployeeTable employees={this.state.employees} />
                </div>
            </Fragment>
        );
    }
}
