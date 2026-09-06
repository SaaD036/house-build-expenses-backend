import { DO } from '../../../../Types/DOs';

export type SeeDOtablePropsType = {
    DOs: DO[] | null;
    loadDOs: () => Promise<void>;
};
