
import React, { useEffect, useState } from "react";

// Defines an uneditable text field which becomes editable on focus
const Editable = ({
    text,
    type,
    placeholder,
    children,
    ...props
}) => {

    const [isEditing, setEditing] = useState(false);

    useEffect(() => {
        if (props.childref && props.childref.current && isEditing === true) {
            props.childref.current.focus();
        }
    }, [isEditing, props.childref]);

    return (
        <section {...props}>
            {/* Handles switching between editable and non editable modes */}
            {isEditing ? (
                <div onBlur={() => setEditing(false)}>
                    {children}
                </div>
            ) : (
                <div onClick={() => setEditing(true)}>
                    <span>
                        {text || placeholder || "Editable content"}
                    </span>
                </div>
            )}
        </section>
    );
};

export default Editable;