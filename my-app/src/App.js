import React, { useState } from "react";
import "./App.css";

function App() {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");

	const handleInputChange = (e) => {
		setNewTask(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (newTask.trim() !== "") {
			// check if newTask is not empty after trimming whitespace
			setTasks([...tasks, newTask]);
		}
		setNewTask("");
	};

	const handleDelete = (index) => {
		setTasks(tasks.filter((task, i) => i !== index));
	};

	return (
		<div className="App">
			<h1>To-Do List</h1>
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="Add new task" value={newTask} onChange={handleInputChange} />
				<button type="submit">Add</button>
			</form>
			<ul>
				{tasks.map((task, index) => (
					<li key={index}>
						{task}
						<button onClick={() => handleDelete(index)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
