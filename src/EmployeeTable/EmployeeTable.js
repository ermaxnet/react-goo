import React from "react";
import PropTypes from "prop-types";
import EmployeeTableCell, { CellType } from "../EmployeeTableCell/EmployeeTableCell";
import { Employee } from "../models";
import "./EmployeeTable.css";

function EmployeeTable({ employees }) {
    return (
        <table className="employee-table">
            <colgroup>
                <col style={{ width: "70px" }} />
                <col />
                <col />
                <col />
                <col />
            </colgroup>
            <thead>
                <tr>
                    <th></th>
                    <th>Full Name</th>
                    <th>Gender</th>
                    <th>Address</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((employee, index) => {
                    return (
                        <tr key={index}>
                            <EmployeeTableCell
                                componentType={CellType.IMAGE}
                                value={employee.thumbnail}
                                alt={employee.fullName}
                            />
                            <EmployeeTableCell
                                value={employee.fullName}
                            />
                            <EmployeeTableCell
                                value={employee.gender}
                            />
                            <EmployeeTableCell
                                componentType={CellType.ADDRESS}
                                value={employee.address}
                            />
                            <EmployeeTableCell
                                componentType={CellType.EMAIL}
                                value={employee.email}
                            />
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

EmployeeTable.propTypes = {
    employees: PropTypes.arrayOf(
        PropTypes.instanceOf(Employee).isRequired
    ).isRequired
};

export default EmployeeTable;
