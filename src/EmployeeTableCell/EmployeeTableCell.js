import React from "react";
import PropTypes from "prop-types";
import "./EmployeeTableCell.css";

export const CellType = {
    IMAGE: "image",
    ADDRESS: "address",
    EMAIL: "email",
    COMMON: "common"
};

function EmployeeTableCell({
    value,
    componentType,
    alt = undefined
}) {
    let content = null;

    switch (componentType) {
        case CellType.IMAGE:
            content = <img src={value} alt={alt} />;
            break;
        case CellType.ADDRESS:
            content = <address>{value}</address>;
            break;
        case CellType.EMAIL:
            content = <a href={`mailto:${value}`}>{value}</a>;
            break;
        default:
            content = <span>{value}</span>;
            break;
    }

    return <td className="employee-cell">{content}</td>;
};

EmployeeTableCell.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    componentType: PropTypes.oneOf([
        CellType.EMAIL,
        CellType.IMAGE,
        CellType.ADDRESS,
        CellType.COMMON
    ]),
    alt: PropTypes.string
};

EmployeeTableCell.defaultProps = {
    componentType: PropTypes.COMMON
};

export default EmployeeTableCell;
