import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
} from '@mui/material/colors';

export default function useChartColors() {
  const ColorSet = [
    red[500],
    orange[500],
    yellow[500],
    green[500],
    lime[500],
    blue[500],
    purple[500],
    pink[500],
    deepOrange[500],
    deepPurple[500],
    lightGreen[500],
    indigo[500],
    cyan[500],
    amber[500],
    teal[500],
    lightBlue[500],
    brown[500],
  ];

  const getColor = (index: number) => {
    return ColorSet[index % ColorSet.length];
  };

  return { getColor };
}
