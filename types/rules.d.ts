export interface Parser {
    file: string;
    parse: Function;
    values: string[];
}
export interface RecursiveRule {
    has: string[];
    computed: string;
    type: string;
    time: number;
    info?: Parser;
}
export interface StaticRule {
    path: string;
    type: string;
    computed: string;
}
interface Rule {
    static: StaticRule[];
    recursive: RecursiveRule[];
    ignore: string[];
}
declare const rules: Rule;
export default rules;
