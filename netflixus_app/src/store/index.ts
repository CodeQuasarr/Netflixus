import {createStore} from 'vuex'
import {User} from "@/helpers/types/UserType";
import {MovieDetailsWithGenre} from "@/helpers/types/MovieType";

export default createStore({
    state: {
        user: {} as User,
        token: null as string | null,
        // Posters
        posters: [] as MovieDetailsWithGenre[],
        searchBarState: false,
    },
    getters: {
        isAuthenticated: (state) => {
            return state.token !== null;
        },
        posters: (state) => state.posters,
        searchBarIsOpen: (state) => state.searchBarState,
    },
    mutations: {
        setSearchBarState(state, value: boolean) {
            state.searchBarState = value;
            console.log("aaaaaaaaaaabbbbbbbbbbb", state.searchBarState)
        },
        // Posters on the homepage by genres
        setPostersByGenre(state, posters: MovieDetailsWithGenre[]) {
            state.posters = posters;
            localStorage.setItem("posters", JSON.stringify(posters));
        },
        // Set the state values on refresh page
        initializeStore(state) {
            if (localStorage.getItem("user")) {
                state.user = JSON.parse(localStorage.getItem("user") || "{}");
            }
            if (localStorage.getItem("token")) {
                state.token = localStorage.getItem("token") || "";
            }
            if (localStorage.getItem("posters")) {
                state.posters = JSON.parse(localStorage.getItem("posters") || "[]");
            }
        },
    },
    actions: {
        // Add all posters by genre
        addAllPosters({commit}, posters: MovieDetailsWithGenre[]) {
            commit("setPostersByGenre", posters);
        }
    },
    modules: {}
})
