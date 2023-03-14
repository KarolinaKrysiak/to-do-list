import React, { useState } from "react";
import "./App.css";

function App() {
	const [tasks, setTasks] = useState([]); // state variable for tasks and a function to update it
	const [newTask, setNewTask] = useState(""); // state variable for the new task and a function to update it

	// input change
	const handleInputChange = (e) => {
		setNewTask(e.target.value);
	};

	// form submission
	const handleSubmit = (e) => {
		e.preventDefault(); // Prevent the default form submission behavior

		// check if the new task is not an empty string after trimming whitespace
		if (newTask.trim() !== "") {
			setTasks([...tasks, newTask]); // Add the new task to the tasks array
			setNewTask(""); // Clear the new task state variable
		} else {
			alert("Please enter a task.");
		}
	};

	// Define a function to handle key down events on the input
	const handleKeyDown = (e) => {
		// Check if the key pressed is the Enter key
		if (e.key === "Enter") {
			e.preventDefault();
			handleSubmit(e);
		}
	};

	const handleDelete = (index) => {
		setTasks(tasks.filter((task, i) => i !== index)); // Remove the task
	};

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
				/>{" "}
				<button type="submit">Add</button>
			</form>
			<ul>
				{tasks.map((task, index) => (
					// map over the tasks array to create list items for each task
					<li key={index}>
						{index + 1}. {task}
						<button onClick={() => handleDelete(index)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
