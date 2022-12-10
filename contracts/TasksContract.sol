// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract TasksContract {
    uint256 public tasksCounter = 0;

    struct Task {
        uint256 id;
        string title;
        string description;
        bool done;
        uint256 createdAt;
        string storeName;
        string stage;
    }

    event TaskCreated(
        uint256 id,
        string title,
        string description,
        bool done,
        uint256 createdAt,
        string storeName,
        string stage
    );
    event TaskToggledDone(uint256 id, bool done);

    event TaskUpdateSatage(string stage, uint256 id);

    mapping(uint256 => Task) public tasks;

    constructor() {
        createTask("my first task", "my first description","little store","delivery");
    }

    function createTask(string memory _title, string memory _description,string memory storeName,string memory stage)
        public
    {


        tasksCounter++;
        tasks[tasksCounter] = Task(
            tasksCounter,
            _title,
            _description,
            false,
            block.timestamp,
            storeName,
            stage
        );

        emit TaskCreated(
            tasksCounter,
            _title,
            _description,
            false,
            block.timestamp,
            storeName,
            stage
        );
    }

    function toggleDone(uint256 _id) public {
        Task memory _task = tasks[_id];
        _task.done = !_task.done;
        tasks[_id] = _task;
        emit TaskToggledDone(_id, _task.done);
    }

    function updateSatage(string memory stage, uint256 _id) public {
        Task memory _task = tasks[_id];
        _task.stage = stage;
        tasks[_id] = _task;
        emit TaskUpdateSatage(stage,_id);
    }
}
