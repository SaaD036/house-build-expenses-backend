import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type IconTypes = OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
};
