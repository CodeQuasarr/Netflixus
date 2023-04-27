import {Genre} from "@/helpers/types/MovieType";

const date: Date = new Date();
const genreList: Genre[] = [
    { id: 28,     name: "Action",           label: "action" },
    { id: 12,     name: "Aventure",         label: "aventure" },
    { id: 35,     name: "Comédie",          label: "comedie" },
    { id: 27,     name: "Horreur",          label: "horreur" },
    { id: 10402,  name: "Musique",          label: "musique" },
    { id: 878,    name: "Science-Fiction",  label: "science_fiction" },
]

const yearsList: { id: number; name: number; }[] = [
    { id: date.getFullYear(), name: date.getFullYear() },
    { id: date.getFullYear() - 1, name: date.getFullYear() - 1 },
    { id: date.getFullYear() - 2, name: date.getFullYear() - 2 },
    { id: date.getFullYear() - 3, name: date.getFullYear() - 3 },
];

const languagesList: { name: string, id: string }[] = [
    { name: 'Englais', id: 'en' },
    { name: 'Espagnol', id: 'es' },
    { name: 'Français', id: 'fr' },
]

export const Helpers = {
    genreList,
    languagesList,
    yearsList
}
