import { addMonths, format, subMonths } from 'date-fns';
import { useRouter } from 'next/navigation';
import Navigator from '@/app/ui/Navigator';
import { UTCDate } from '@date-fns/utc';

interface IMonthNavigator {
  date: Date | string;
}

export default function MonthNavigator({ date }: IMonthNavigator) {
  const router = useRouter();
  const prevMonth = subMonths(new UTCDate(date), 1);
  const nextMonth = addMonths(new UTCDate(date), 1);
  return (
    <Navigator
      hasPrev
      onPrev={() =>
        router.push(`/expenses?date=${format(prevMonth, 'yyyy-MM-dd')}`)
      }
      hasNext
      onNext={() =>
        router.push(`/expenses?date=${format(nextMonth, 'yyyy-MM-dd')}`)
      }
    >
      {format(date, 'yyyy-MM')}
    </Navigator>
  );
}
