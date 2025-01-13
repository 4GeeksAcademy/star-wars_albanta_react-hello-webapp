const getState = ({ getStore, setStore }) => {
    return {
        store: {
            characters: [], 
            planets: [], 
            favorites: [] 
        },
        actions: {
            
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

            
            addFavorite: (item) => {
                const store = getStore();
                const isAlreadyFavorite = store.favorites.some((fav) => fav.name === item.name);

                if (!isAlreadyFavorite) {
                    setStore({ favorites: [...store.favorites, item] });
                }
            },

            
            removeFavorite: (name) => {
                const store = getStore();
                const updatedFavorites = store.favorites.filter((fav) => fav.name !== name); // Filtra solo el favorito con el uid
                setStore({ favorites: updatedFavorites });
            }
        }
    };
};

export default getState;

