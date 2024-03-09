import PaidIcon from '@mui/icons-material/Paid';
import { lusitana } from '@/app/ui/fonts';

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <PaidIcon sx={{ fontSize: 40 }} />
      <p className="text-[34px]">Planner</p>
    </div>
  );
}
