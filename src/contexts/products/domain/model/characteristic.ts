export interface Characteristic {
    label: string;
    value: string;
}

export interface CharacteristicNested {
    label: string;
    value: Characteristic[];
}
