import { useRef, useState } from 'react';
import { Button, Menu } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { BudgetItem } from '@/app/types';
import MultiSelectMenuItems from '@/app/ui/MultiSelectMenuItems';

interface IBudgetExpenseTrendsView {
  budgetItems: Array<BudgetItem>;
  onShowSeriesChange: (items: Array<BudgetItem>) => void;
}

export default function BudgetExpenseTrendsView({
  budgetItems,
  onShowSeriesChange,
}: IBudgetExpenseTrendsView) {
  const [selectedBudgetItems, setSelectedBudgetItems] =
    useState<Array<BudgetItem>>(budgetItems);

  const triggerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        endIcon={<ArrowDropDownIcon />}
        onClick={() => setMenuOpen((open: boolean) => !open)}
        ref={triggerRef}
        sx={{
          position: 'absolute',
          top: { xs: '0.5rem', sm: '0.5rem', md: '1rem' },
          right: { xs: '0.5rem', sm: '0.5rem', md: '1rem' },
        }}
      >
        View
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={triggerRef.current}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            style: {
              maxHeight: '10rem',
            },
          },
        }}
      >
        <MultiSelectMenuItems
          items={budgetItems}
          selectedItems={selectedBudgetItems}
          onChange={(items: Array<any>) => {
            setSelectedBudgetItems(items);
            onShowSeriesChange(items as Array<BudgetItem>);
          }}
        />
      </Menu>
    </>
  );
}
