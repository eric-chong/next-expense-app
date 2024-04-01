import { addMonths, format, subMonths } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useParams } from 'react-router-dom';
import Navigator from '@/app/ui/Navigator';
import { UTCDate } from '@date-fns/utc';

export default function MonthNavigator() {
  const router = useRouter();
  const { year, month } = useParams();
  const currentDate = new UTCDate(`${year}-${month}-01`);
  const prevMonth = subMonths(currentDate, 1);
  const nextMonth = addMonths(currentDate, 1);

  return (
    <Navigator
      hasPrev
      onPrev={() => router.push(`/expenses/${format(prevMonth, 'yyyy/MM')}`)}
      hasNext
      onNext={() => router.push(`/expenses/${format(nextMonth, 'yyyy/MM')}`)}
    >
      {`${year}-${month}`}
    </Navigator>
  );
}
