import React from "react";
import classNames from "classnames";
import "./Box.css";

function Box({ name, onDragStart, isDraggable = false, isAccepted = false }) {
    const classes = classNames({
        "box": true,
        "box--green": isAccepted
    });

    return (
        <div data-name={name} className={classes} draggable={isDraggable} onDragStart={onDragStart}>
            <strong>{name}</strong>
        </div>
    );
}

export default Box;