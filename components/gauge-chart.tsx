import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';

export default function BasicGauges({value, unit, valueMax}: {value: number, unit: string, valueMax: number}){
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
      <Gauge width={150} height={150} value={value} text={value + unit} valueMax={valueMax}/>
    </Stack>
  );
}