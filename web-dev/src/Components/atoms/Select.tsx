interface SelectProps {
    label: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    options: { label: string; value: string }[]
}

export const Select: React.FC<SelectProps> = ({
    label,
    value,
    onChange,
    options,
}) => {
    return (
        <>
            {label}
            <select
                value={value}
                onChange={onChange}
                style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    width: "100%",
                    margin: "4px",
                }}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </>
    )
}
