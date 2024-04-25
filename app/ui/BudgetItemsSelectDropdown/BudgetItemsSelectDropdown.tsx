import { useRef, useState } from 'react';
import { Box, Button, Menu } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { BudgetItem } from '@/app/types';
import MultiSelectMenuItems from '@/app/ui/MultiSelectMenuItems';
import SingleSelectMenuItems from '@/app/ui/SingleSelectMenuItems';

interface IBudgetItemsSelectDropdown {
  allowSingle?: boolean;
  budgetItems: Array<BudgetItem>;
  onMultiChange: (items: Array<BudgetItem>) => void;
  onSingleChange?: (itemId: string) => void;
  triggerButtonLabel: string;
}

export default function BudgetItemsSelectDropdown({
  allowSingle = false,
  budgetItems,
  onMultiChange,
  onSingleChange,
  triggerButtonLabel,
}: IBudgetItemsSelectDropdown) {
  const [selectedBudgetItems, setSelectedBudgetItems] =
    useState<Array<BudgetItem>>(budgetItems);
  const [refBudgetItemId, setRefBudgetItemId] = useState<string>('');

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
        {triggerButtonLabel}
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
              maxHeight: '20rem',
            },
          },
        }}
      >
        <Box display="flex" gap="0.5rem" padding="0 0.5rem">
          <Box>
            <MultiSelectMenuItems
              disabled={!!refBudgetItemId}
              dividerLabel="Expense lines"
              items={budgetItems}
              selectedItems={selectedBudgetItems}
              onChange={(items: Array<any>) => {
                setSelectedBudgetItems(items);
                onMultiChange(items as Array<BudgetItem>);
              }}
            />
          </Box>
          {allowSingle && (
            <Box>
              <SingleSelectMenuItems
                dividerLabel="Budget item amount"
                items={budgetItems}
                selectedItem={budgetItems.find(
                  (budgetItem) => budgetItem.id === refBudgetItemId,
                )}
                onChange={(id: string) => {
                  if (onSingleChange) {
                    setRefBudgetItemId(id);
                    onSingleChange(id);
                  }
                }}
              />
            </Box>
          )}
        </Box>
      </Menu>
    </>
  );
}
