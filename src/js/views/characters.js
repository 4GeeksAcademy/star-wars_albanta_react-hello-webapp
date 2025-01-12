import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../styles/characters.css";

export const Characters = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.fetchData("people");
    }, []);

    if (!store.characters.length) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <h1 className="text-center text-light my-4">Characters</h1>
            <div className="row">
                {store.characters.slice(0, 5).map((character) => (
                    <div className="col-md-4 mb-4" key={character.uid}>
                        <div className="card bg-dark text-light">
                            <img
                                src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}
                                className="card-img-top"
                                alt={character.name}
                                onError={(e) => (e.target.src = "https://via.placeholder.com/400x300?text=No+Image")}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{character.name}</h5>
                                <p className="card-text">
                                    <strong>Gender:</strong> {character.gender || "unknown"} <br />
                                    <strong>Eye Color:</strong> {character.eye_color || "unknown"} <br />
                                    <strong>Birth Year:</strong> {character.birth_year || "unknown"} <br />
                                </p>
                                <Link to={`/single/character/${character.uid}`} className="btn btn-outline-primary me-2">
                                    View Details
                                </Link>
                                <button
                                    className="btn btn-outline-warning"
                                    onClick={() => actions.addFavorite({ name: character.name, uid: character.uid })}
                                >
                                    <i className="fas fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


