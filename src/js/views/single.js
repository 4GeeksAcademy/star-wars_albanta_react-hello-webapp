import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/single.css";

export const Single = () => {
    const { type, id } = useParams(); 
    const navigate = useNavigate();
    const [details, setDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/${type}/${id}`);
                if (!response.ok) throw new Error(`Error fetching details: ${response.statusText}`);
                const data = await response.json();
                setDetails(data.result.properties);
            } catch (error) {
                setError("Failed to fetch details. Please try again.");
                console.error("Error fetching details:", error);
            }
        };
        fetchDetails();
    }, [type, id]);

    return (
        <div className="container single-container text-light">
            {error ? (
                <div className="text-center mt-5">
                    <h2>{error}</h2>
                    <button className="btn btn-outline-light mt-3" onClick={() => navigate(-1)}>
                        <i className="fas fa-arrow-left"></i> Back
                    </button>
                </div>
            ) : details ? (
                <div className="row">
                    <div className="col-md-6">
                        <img
                            src={`https://starwars-visualguide.com/assets/img/${type === "people" ? "characters" : "planets"}/${id}.jpg`}
                            alt={details.name}
                            className="img-fluid rounded"
                            onError={(e) => (e.target.src = "https://via.placeholder.com/400x300?text=No+Image")}
                        />
                    </div>
                    <div className="col-md-6">
                        <h1>{details.name}</h1>
                        {type === "people" && (
                            <>
                                <p><strong>Birth Year:</strong> {details.birth_year}</p>
                                <p><strong>Gender:</strong> {details.gender}</p>
                                <p><strong>Height:</strong> {details.height} cm</p>
                                <p><strong>Mass:</strong> {details.mass} kg</p>
                                <p><strong>Eye Color:</strong> {details.eye_color}</p>
                            </>
                        )}
                        {type === "planets" && (
                            <>
                                <p><strong>Climate:</strong> {details.climate}</p>
                                <p><strong>Population:</strong> {details.population}</p>
                                <p><strong>Orbital Period:</strong> {details.orbital_period}</p>
                                <p><strong>Surface Water:</strong> {details.surface_water}</p>
                                <p><strong>Terrain:</strong> {details.terrain}</p>
                            </>
                        )}
                        <button className="btn btn-outline-light mt-3" onClick={() => navigate(-1)}>
                            <i className="fas fa-arrow-left"></i> Back
                        </button>
                    </div>
                </div>
            ) : (
                <div className="spinner-container">
                    <div className="spinner-border text-light" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
        </div>
    );
};





