import { Button, Box } from "@mui/material";

interface PaginationProps {
  pageIndex: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange: (newPage: number) => void;
}

export const Pagination = ({
  pageIndex,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
}: PaginationProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={2}
      mt={4}
      data-testid="pagination"
      my={4}
    >
      <Button
        variant="contained"
        data-testid="has-previous-page-button"
        onClick={() => onPageChange(pageIndex - 1)}
        disabled={!hasPreviousPage}
        sx={{
          minWidth: 100,
          fontWeight: 'bold',
          textTransform: 'none',
        }}
      >
        Назад
      </Button>
      
      <Button
        variant="contained"
        data-testid="has-next-page-button"
        onClick={() => onPageChange(pageIndex + 1)}
        disabled={!hasNextPage}
        sx={{
          minWidth: 100,
          fontWeight: 'bold',
          textTransform: 'none',
        }}
      >
        Вперед
      </Button>
    </Box>
  );
};