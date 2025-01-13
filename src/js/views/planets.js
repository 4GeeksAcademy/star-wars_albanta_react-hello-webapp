import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/planets.css";

export const Planets = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.fetchData("planets"); 
    }, []);

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
                               
                                <Link to={`/single/planets/${planet.uid}`} className="btn btn-outline-primary me-2">
                                    View Details
                                </Link>
                               
                                <button
                                    className="btn btn-outline-warning"
                                    onClick={() => actions.addFavorite({ name: planet.name, uid: planet.uid })}
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

