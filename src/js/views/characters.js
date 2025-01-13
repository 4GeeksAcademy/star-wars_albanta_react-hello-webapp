import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../styles/characters.css";

export const Characters = () => {
    const { store, actions } = useContext(Context);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    useEffect(() => {
        actions.fetchData("people");
    }, []);

    const fetchCharacterDetails = async (id) => {
        try {
            const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
            const data = await response.json();
            setSelectedCharacter(data.result.properties);
        } catch (error) {
            console.error("Error fetching character details:", error);
        }
    };

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
                                <button
                                    className="btn btn-outline-primary"
                                    onClick={() => fetchCharacterDetails(character.uid)}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedCharacter && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{selectedCharacter.name}</h2>
                        <p><strong>Birth Year:</strong> {selectedCharacter.birth_year}</p>
                        <p><strong>Gender:</strong> {selectedCharacter.gender}</p>
                        <p><strong>Height:</strong> {selectedCharacter.height} cm</p>
                        <p><strong>Mass:</strong> {selectedCharacter.mass} kg</p>
                        <p><strong>Eye Color:</strong> {selectedCharacter.eye_color}</p>
                        <button
                            className="btn btn-outline-light mt-3"
                            onClick={() => setSelectedCharacter(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
