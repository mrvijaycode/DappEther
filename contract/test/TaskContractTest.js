const { expect } = require("chai");
const { ethers } = require("hardhat");

let user1, user2;

describe("Task Contract", function () {
  let taskContract;
  let owner;

  beforeEach(async function () {

    [user1, user2] = await ethers.getSigners();

    const TaskContract = await ethers.getContractFactory("TaskContract");
    [owner] = await ethers.getSigners();
    taskContract = await TaskContract.deploy();

  });

  describe("AddTask", function () {
    it("should emit AddTask event", async function () {
      const receipt = await taskContract.addTask("New Task", false, owner.address);
      await expect(receipt)
        .to.emit(taskContract, "AddTask")
        .withArgs(owner.address, 0);
    });
  });


  describe("Get Tasks", function () {

    it("should return the tasks for an account", async function () {

      await taskContract.addTask("Task 1", false, owner.address);
      await taskContract.addTask("Task 2", false, owner.address);

      const tasks = await taskContract.getMyTasks();

      expect(tasks.length).to.equal(2);
    });
  });

  describe('completeTask', () => {

    it('should allow assigned user to complete task', async () => {

      await taskContract.addTask('Sample task', true, user1.address);

      await taskContract.connect(user1).completeTask(0);

      const tasks = await taskContract.getMyTasks();
      const task = tasks[0]
      expect(task.isCompleted).to.be.true;

    });

    it('should revert if unassigned user tries to complete task', async () => {

      await taskContract.addTask('Sample task', false, user1.address);

      await expect(
        taskContract.connect(user2).completeTask(0)
      ).to.be.revertedWith("Only assigned user can complete task");

    });

  });
});
