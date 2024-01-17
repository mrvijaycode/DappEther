const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Task Contract", function () {
  let TaskContract;
  let taskContract;
  let owner;

  const NUM_TOTAL_TASKS = 5;

  let totalTasks;

  beforeEach(async function () {
    TaskContract = await ethers.getContractFactory("TaskContract");
    [owner] = await ethers.getSigners();
    taskContract = await TaskContract.deploy();

    totalTasks = [];

    for (let i = 0; i < NUM_TOTAL_TASKS; i++) {
      let task = {
        'taskText': 'Task number:- ' + i,
        'isCompleted': false
      };

      await taskContract.addTask(task.taskText, task.isCompleted);
      totalTasks.push(task);
    }
  });

  describe("Add Task", function () {
    it("should emit AddTask event", async function () {
      let task = {
        'taskText': 'New Task',
        'isCompleted': false
      };

      await expect(await taskContract.addTask(task.taskText, task.isCompleted)
      ).to.emit(taskContract, 'AddTask').withArgs(owner.address, NUM_TOTAL_TASKS);
    })
  });

  describe("Get All Tasks", function () {
    it("should return the correct number of total tasks", async function () {
      const tasksFromChain = await taskContract.getMyTasks();
      expect(tasksFromChain.length).to.equal(NUM_TOTAL_TASKS);
    })
  })

  describe("Complete Task", function () {
    it("should emit complete task event", async function () {
      const TASK_ID = 0;
      const TASK_COMPLETED = true;

      await expect(
        taskContract.completeTask(TASK_ID, TASK_COMPLETED)
      ).to.emit(
        taskContract, 'CompleteTask'
      ).withArgs(
        TASK_ID, TASK_COMPLETED
      );
    })
  })
});
