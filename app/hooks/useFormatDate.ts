import { format } from 'date-fns';
export default function useFormatDate() {
  const formatDate = (date?: Date) => {
    if (!date) return;
    return format(date, 'yyyy-MM-dd');
  };

  return { formatDate };
}
