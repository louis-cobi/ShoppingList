// import React from "react";

interface TextFieldProps {
    value: string | number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    label: string
    type?: string
}

export const TextField: React.FC<TextFieldProps> = ({
    value,
    onChange,
    label,
    type = "text",
}) => {
    return (
        <div>
            <label>
                {label}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    style={{
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        width: "90%",
                        margin: "4px"
                    }}
                />
            </label>
        </div>
    )
}
