export default class Location {

    constructor();

    cfi: string;
    index: number;
    percentage: number;

    set(props?: { cfi?: string, index?: number, percentage?: number }): Location;
}