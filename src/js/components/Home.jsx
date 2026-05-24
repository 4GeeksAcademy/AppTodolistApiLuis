import React, { useState, useEffect } from "react";

export function Home() {
	
	const [tasks, setTasks] = useState([]);
	const [inputValue, setInputValue] = useState("");


	const username = "luis_timaure";
	const urlApi = `https://playground.4geeks.com/todo/users/${username}`;

	
	const loadTasks = () => {
		fetch(urlApi)
			.then((response) => {
				if (response.status === 404) {
					createUser(); 
					return null;
				}
				return response.json();
			})
			.then((data) => {
				if (data && data.todos) {
					setTasks(data.todos);
				}
			})
			.catch((error) => console.error("Error cargando tareas:", error));
	};

	
	const createUser = () => {
		fetch(urlApi, { method: "POST" })
			.then(() => loadTasks())
			.catch((error) => console.error("Error creando usuario:", error));
	};

	
	useEffect(() => {
		loadTasks();
	}, []);

	
	const handleAdd = (e) => {
		if (e.key === "Enter") {
			e.preventDefault(); 
			
			const cleanedValue = inputValue.trim();
			if (cleanedValue !== "") {
				const newTask = {
					label: cleanedValue,
					is_done: false
				};

				fetch(`https://playground.4geeks.com/todo/todos/${username}`, {
					method: "POST",
					body: JSON.stringify(newTask),
					headers: {
						"Content-Type": "application/json"
					}
				})
				.then((response) => response.json())
				.then(() => {
					loadTasks(); 
					setInputValue(""); 
				})
				.catch((error) => console.error("Error agregando tarea:", error));
			}
		}
	};

	
	const handleDeleteAll = () => {
		fetch(urlApi, { method: "DELETE" })
			.then((response) => {
				if (response.ok) {
					setTasks([]); 
					createUser(); 
				}
			})
			.catch((error) => console.error("Error borrando las tareas:", error));
	};

	return (
		<div className="main-container">
			<h1 className="preset-title">todos</h1>

			<div className="content-box">
				<ul className="task-list">
					<li className="input-item">
					
						<input
							type="text"
							className="task-input"
							placeholder="¿Qué necesitas hacer?"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyDown={handleAdd}
						/>
					</li>

					{tasks.length === 0 ? (
						<li className="empty-message">
							No hay tareas, añadir tareas
						</li>
					) : (
						tasks.map((task) => (
							
							<li key={task.id} className="task-item">
								{task.label}
							</li>
						))
					)}

					<li className="footer-text">
						<span>
							{tasks.length}{" "}
							{tasks.length === 1 ? "item left" : "items left"}
						</span>
					</li>
				</ul>
			</div>

			{tasks.length > 0 && (
				<button 
					className="btn btn-primary clear-button" 
					onClick={handleDeleteAll}
				>
					Borrar todo
				</button>
			)}
		</div>
	);
}