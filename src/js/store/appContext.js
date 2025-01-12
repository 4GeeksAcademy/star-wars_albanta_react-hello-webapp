import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// No cambies esto, aquí inicializamos el contexto, por defecto será null.
export const Context = React.createContext(null);

// Esta función inyecta el store global en cualquier vista/componente donde lo necesites.
// En este caso lo inyectaremos en layout.js.
// https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/src/js/layout.js#L35
const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		// Esto será pasado como el valor del contexto
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			// Llamadas iniciales a la API para cargar personajes y planetas
			state.actions.fetchData("people"); // Carga personajes desde la API
			state.actions.fetchData("planets"); // Carga planetas desde la API
		}, []);

		// El valor inicial para el contexto ya no será null, sino el estado actual de este componente.
		// El contexto tendrá disponibles las funciones getStore, getActions y setStore.
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;

