import React from "react";

interface ChipButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  isMobile: boolean;
}

const ChipButton: React.FC<ChipButtonProps> = ({
  label,
  isSelected,
  onClick,
  isMobile,
}) => {
  const chipStyles = {
    border: "1px solid white",
    backgroundColor: isSelected ? "white" : "black",
    color: isSelected ? "black" : "white",
    margin: "3px",
    borderRadius: "0px",
    padding: isMobile ? "5px 10px" : "5px 10px",
    fontSize: isMobile ? "12px" : "16px",
    fontFamily: "Times New Roman, Times, serif",
    fontWeight: "700",
    width: "auto",
    cursor: "pointer",
    transition: isMobile ? "none" : "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: isMobile ? "black" : "white",
      color: isMobile ? "white" : "black",
    },
  };

  return (
    <button style={chipStyles} onClick={onClick}>
      {label.toUpperCase()}
    </button>
  );
};

export default ChipButton;