const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            characters: [], // Lista de personajes
            planets: [], // Lista de planetas
            favorites: [] // Lista de favoritos
        },
        actions: {
            // Acción genérica para obtener datos desde la API
            fetchData: async (endpoint) => {
                try {
                    const response = await fetch(`https://www.swapi.tech/api/${endpoint}`);
                    if (!response.ok) throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
                    const data = await response.json();
                    if (endpoint === "people") setStore({ characters: data.results });
                    if (endpoint === "planets") setStore({ planets: data.results });
                } catch (error) {
                    console.error(`Error fetching ${endpoint}:`, error);
                }
            },

            // Agregar un elemento a favoritos
            addFavorite: (item) => {
                const store = getStore();
                const isAlreadyFavorite = store.favorites.some((fav) => fav.uid === item.uid);

                if (!isAlreadyFavorite) {
                    setStore({ favorites: [...store.favorites, item] });
                }
            },

            // Eliminar un elemento de favoritos
            removeFavorite: (uid) => {
                const store = getStore();
                const updatedFavorites = store.favorites.filter((fav) => fav.uid !== uid);
                setStore({ favorites: updatedFavorites });
            }
        }
    };
};

export default getState;
