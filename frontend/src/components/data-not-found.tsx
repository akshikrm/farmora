import { useTheme, alpha } from "@mui/material";

type Props = {
  title: string;
  description: string;
};

const DataNotFound = ({ title, description }: Props) => {
  const theme = useTheme();

  // Create a very light gray-tinted green (85% gray + 15% primary color)
  const iconColor = alpha(theme.palette.primary.main, 0.15);
  const textColor = alpha(theme.palette.primary.main, 0.2);

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="mb-4" style={{ color: iconColor }}>
        <svg
          className="w-16 h-16 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <h3
        className="capitalize text-lg font-medium mb-1"
        style={{ color: textColor }}
      >
        {title}
      </h3>
      <p className="text-sm" style={{ color: alpha(textColor, 0.7) }}>
        {description}
      </p>
    </div>
  );
};

export default DataNotFound;
