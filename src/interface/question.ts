export interface QuestionInterface {
    uuid: string;
    qType: string;
    title: string;
    desc: string;
    options: Array<OptionInterface>;
}

interface OptionInterface {
    uuid: string;
    title: string;
    desc: string;
}