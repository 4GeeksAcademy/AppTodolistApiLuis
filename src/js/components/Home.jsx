import React, { useState } from "react";

export function Home() {
	const [tasks, setTasks] = useState([]);
	const [inputValue, setInputValue] = useState("");

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && inputValue.trim() !== "") {
			setTasks([...tasks, inputValue.trim()]);
			setInputValue("");
		}
	};

	const clearAllTasks = () => {
		setTasks([]);
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
							onKeyDown={handleKeyDown}
						/>
					</li>

					{tasks.length === 0 ? (
						<li className="empty-message">
							No hay tareas, añadir tareas
						</li>
					) : (
						tasks.map((task, index) => (
							<li key={index} className="task-item">
								{task}
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
				<button className="btn btn-primary clear-button" onClick={clearAllTasks}>
					Borrar todo
				</button>
			)}
		</div>
	);
}