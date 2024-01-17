// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.19;

contract TaskContract {
    event AddTask(address recipient, uint taskId);
    event CompleteTask(uint taskId, bool isCompleted);

    struct Task {
        uint id;
        address assignedTo;
        string taskText;
        bool isCompleted;
    }

    Task[] private tasks;

    mapping(address => Task[]) tasksAssigned;

    address public admin;

    constructor() {
        admin = msg.sender;
    }

    function addTask(
        string memory taskText,
        bool isCompleted,
        address assignedTo
    ) external {
        uint taskId = tasks.length;
        tasks.push(Task(taskId, assignedTo, taskText, isCompleted));
        tasksAssigned[assignedTo].push(
            Task(taskId, assignedTo, taskText, isCompleted)
        );
        emit AddTask(assignedTo, taskId);
    }

  function getMyTasks() external view returns (Task[] memory) {
        Task[] memory myTasks = new Task[](tasksAssigned[msg.sender].length);
        for (uint i = 0; i < tasksAssigned[msg.sender].length; i++) {
            myTasks[i] = tasksAssigned[msg.sender][i];
        }
        return myTasks;
    }

    function completeTask(uint taskId) external {
        require(
            msg.sender == tasks[taskId].assignedTo,
            "Only assigned user can complete task"
        );
        tasks[taskId].isCompleted = true;
        emit CompleteTask(taskId, true);
    }
}
