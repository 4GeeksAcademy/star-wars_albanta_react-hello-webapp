import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../styles/planets.css";

export const Planets = () => {
    const { store, actions } = useContext(Context);
    const [selectedPlanet, setSelectedPlanet] = useState(null);

    useEffect(() => {
        actions.fetchData("planets");
    }, []);

    const fetchPlanetDetails = async (id) => {
        try {
            const response = await fetch(`https://www.swapi.tech/api/planets/${id}`);
            const data = await response.json();
            setSelectedPlanet(data.result.properties);
        } catch (error) {
            console.error("Error fetching planet details:", error);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center text-light my-4">Planets</h1>
            <div className="row">
                {store.planets.slice(0, 5).map((planet) => (
                    <div className="col-md-4 mb-4" key={planet.uid}>
                        <div className="card bg-dark text-light">
                            <img
                                src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
                                alt={planet.name}
                                className="card-img-top"
                                onError={(e) => (e.target.src = "https://via.placeholder.com/400x300?text=No+Image")}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{planet.name}</h5>
                                <button
                                    className="btn btn-outline-primary"
                                    onClick={() => fetchPlanetDetails(planet.uid)}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedPlanet && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{selectedPlanet.name}</h2>
                        <p><strong>Climate:</strong> {selectedPlanet.climate}</p>
                        <p><strong>Population:</strong> {selectedPlanet.population}</p>
                        <p><strong>Orbital Period:</strong> {selectedPlanet.orbital_period}</p>
                        <p><strong>Terrain:</strong> {selectedPlanet.terrain}</p>
                        <p><strong>Surface Water:</strong> {selectedPlanet.surface_water}</p>
                        <button
                            className="btn btn-outline-light mt-3"
                            onClick={() => setSelectedPlanet(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
