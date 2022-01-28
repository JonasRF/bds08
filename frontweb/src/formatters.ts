import { Gender } from "./types/gender";

export const formatGender = (gender: Gender) => {
    const textGender = {
        MALE: 'Masculino',
        FEMALE: 'Feminino',
        OTHER: 'Outros'
    }
    return textGender[gender];
}
