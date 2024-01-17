// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.19;

contract TaskContract {
    event AddTask(address recipient, uint taskId);
    event CompleteTask(uint taskId, bool isCompleted);

    struct Task {
        uint id;
        address username;
        string taskText;
        bool isCompleted;
    }

    Task[] private tasks;

    mapping(uint256 => address) taskToOwner;

    function addTask(string memory taskText, bool isCompleted) external {
        uint taskId = tasks.length;
        tasks.push(Task(taskId, msg.sender, taskText, isCompleted));
        taskToOwner[taskId] = msg.sender;
        emit AddTask(msg.sender, taskId);
    }

    function getMyTasks() external view returns (Task[] memory) {
        Task[] memory temporary = new Task[](tasks.length);
        uint counter = 0;
        for (uint i = 0; i < tasks.length; i++) {
            if (taskToOwner[i] == msg.sender && tasks[i].isCompleted == false) {
                temporary[counter] = tasks[i];
                counter++;
            }
        }

        Task[] memory result = new Task[](counter);
        for (uint i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    function completeTask(uint taskId, bool isCompleted) external {
        if (taskToOwner[taskId] == msg.sender) {
            tasks[taskId].isCompleted = isCompleted;
            emit CompleteTask(taskId, isCompleted);
        }
    }
}
