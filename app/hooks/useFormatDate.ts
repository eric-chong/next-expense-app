import { format } from 'date-fns';
import { UTCDate } from '@date-fns/utc';

export default function useFormatDate() {
  const formatDate = (date: Date | null) => {
    if (!date) return;
    return format(new UTCDate(date), 'yyyy-MM-dd');
  };

  return { formatDate };
}
