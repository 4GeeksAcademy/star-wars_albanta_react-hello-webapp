import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

export const Home = () => {
    return (
        <div className="container text-center mt-5">
            <h1>Welcome to the Star Wars Database</h1>
            <p>
                Explore the galaxy far, far away. Discover characters, planets, and much more from the Star Wars universe.
            </p>
            <div className="d-flex justify-content-center">
                <Link to="/characters" className="btn btn-outline-primary me-3">
                    Explore Characters
                </Link>
                <Link to="/planets" className="btn btn-outline-success">
                    Explore Planets
                </Link>
            </div>
        </div>
    );
};
