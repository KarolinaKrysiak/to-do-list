import React, { useState } from "react";
import "./App.css";

function App() {
	// declare state variables for tasks and new task
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");

	// update new task state based on input change
	const handleInputChange = (e) => {
		setNewTask(e.target.value);
	};

	// add new task to tasks array when form is submitted
	const handleSubmit = (e) => {
		e.preventDefault(); // prevent default form submission behavior
		if (newTask.trim() !== "") {
			setTasks([...tasks, newTask]); // add new task to tasks array
			setNewTask(""); // reset new task state to empty string
		} else {
			alert("Please enter a task."); // show alert if task is empty
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleSubmit(e);
		}
	};

	// remove a task from tasks array
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

	// return JSX for rendering to the DOM
	return (
		<div className="App">
			<h1>To-Do List</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Add new task"
					value={newTask}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
				/>
				<button type="submit">Add</button>
			</form>
			<ul>
				{/* map over tasks array to render each task as a list item */}
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
