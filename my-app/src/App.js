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
			setNewTask("");
		} else {
			alert("Please enter a task.");
		}
	};

	const handleDelete = (index) => {
		setTasks(tasks.filter((task, i) => i !== index));
	};

	const handleDragStart = (e, index) => {
		e.dataTransfer.setData("text/plain", index);
	};

	const handleDragOver = (e, index) => {
		e.preventDefault();
		const draggedIndex = e.dataTransfer.getData("text/plain");
		if (draggedIndex !== index) {
			const newTasks = [...tasks];
			const [removed] = newTasks.splice(draggedIndex, 1);
			newTasks.splice(index, 0, removed);
			setTasks(newTasks);
		}
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
					<li
						key={index}
						draggable="true"
						onDragStart={(e) => handleDragStart(e, index)}
						onDragOver={(e) => handleDragOver(e, index)}
					>
						{index + 1}. {task}
						<button onClick={() => handleDelete(index)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
