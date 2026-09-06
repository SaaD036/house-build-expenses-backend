import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

export type IconTypes = OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
};
