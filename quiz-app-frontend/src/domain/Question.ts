import { Option } from './Option';

export type Question = {
    id: number;
    text: string;
    options: Option[];
};