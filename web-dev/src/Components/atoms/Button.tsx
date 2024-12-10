// import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = "button",
  variant = "primary",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: "8px 16px",
        backgroundColor: variant === "primary" ? "#007BFF" : "#6C757D",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        margin:"4px"
      }}
    >
      {children}
    </button>
  );
};