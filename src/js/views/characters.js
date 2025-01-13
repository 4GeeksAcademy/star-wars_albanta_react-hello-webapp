import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/characters.css";

export const Characters = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.fetchData("people"); // Llama a la API para obtener los personajes
    }, []);

    return (
        <div className="container">
            <h1 className="text-center text-light my-4">Characters</h1>
            <div className="row">
                {store.characters.slice(0, 5).map((character) => (
                    <div className="col-md-4 mb-4" key={character.uid}>
                        <div className="card bg-dark text-light">
                            <img
                                src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}
                                alt={character.name}
                                className="card-img-top"
                                onError={(e) => (e.target.src = "https://via.placeholder.com/400x300?text=No+Image")}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{character.name}</h5>
                              
                                <Link to={`/single/people/${character.uid}`} className="btn btn-outline-primary me-2">
                                    View Details
                                </Link>
                             
                                <button
                                    className="btn btn-outline-warning"
                                    onClick={() => actions.addFavorite({ name: character.name, uid: character.uid })}
                                >
                                    <i className="fas fa-heart"></i> Add to Favorites
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
