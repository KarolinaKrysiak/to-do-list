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

	// remove a task from tasks array
	const handleDelete = (index) => {
		setTasks(tasks.filter((task, i) => i !== index));
	};

	// function to handle drag start event on task item
	const handleDragStart = (e, index) => {
		e.dataTransfer.setData("text/plain", index); // set data to be transferred during drag and drop
	};

	// function to handle drag over event on task item
	const handleDragOver = (e, index) => {
		e.preventDefault(); // prevent default drag and drop behavior
		const draggedIndex = e.dataTransfer.getData("text/plain"); // get index of dragged task
		if (draggedIndex !== index) {
			// if dragged task is not being dragged over itself
			const newTasks = [...tasks];
			const [removed] = newTasks.splice(draggedIndex, 1); // remove dragged task from tasks array
			newTasks.splice(index, 0, removed); // insert dragged task at new index
			setTasks(newTasks); // update tasks array with new order
		}
	};

	// return JSX for rendering to the DOM
	return (
		<div className="App">
			<h1>To-Do List</h1>
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="Add new task" value={newTask} onChange={handleInputChange} />
				<button type="submit">Add</button>
			</form>
			<ul>
				{/* map over tasks array to render each task as a list item */}
				{tasks.map((task, index) => (
					<li
						key={index} // set key to index for unique identification
						draggable="true" // allow task item to be draggable
						onDragStart={(e) => handleDragStart(e, index)} // handle drag start event
						onDragOver={(e) => handleDragOver(e, index)} // handle drag over event
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
