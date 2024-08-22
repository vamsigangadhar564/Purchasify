// CategoryChip.tsx
import React from "react";
import { Chip, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CategoryIcon from "@mui/icons-material/Category";
import "./CategoryChip.css"; // Import the CSS file

interface CategoryChipProps {
  categories: string[];
}

const CategoryChip: React.FC<CategoryChipProps> = ({ categories }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    navigate(`/categories/${category}`);
  };

  return (
    <Box display='flex' flexWrap='wrap' gap='8px' mb={2}>
      {categories.map((category) => (
        <Chip
          key={category}
          label={category}
          variant='outlined'
          icon={<CategoryIcon />}
          onClick={() => handleCategoryClick(category)}
          className='styled-chip' // Apply the custom class
          style={{ cursor: "pointer" }}
        />
      ))}
    </Box>
  );
};

export default CategoryChip;
