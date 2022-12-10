App = {
  contracts: {},
  init: async () => {
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();
    await App.render();
    await App.renderTasks();
  },
  loadWeb3: async () => {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } else if (web3) {
      web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log(
        "No ethereum browser is installed. Try it installing MetaMask "
      );
    }
  },
  loadAccount: async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    App.account = accounts[0];
  },
  loadContract: async () => {
    try {
      const res = await fetch("TasksContract.json");
      const tasksContractJSON = await res.json();
      App.contracts.TasksContract = TruffleContract(tasksContractJSON);
      App.contracts.TasksContract.setProvider(App.web3Provider);

      App.tasksContract = await App.contracts.TasksContract.deployed();
    } catch (error) {
      console.error(error);
    }
  },
  render: async () => {
    document.getElementById("account").innerText = App.account;
  },
  renderTasks: async () => {
    const tasksCounter = await App.tasksContract.tasksCounter();
    const taskCounterNumber = tasksCounter.toNumber();

    let html = "";

    for (let i = 1; i <= taskCounterNumber; i++) {
      const task = await App.tasksContract.tasks(i);
      const taskId = task[0].toNumber();
      const taskTitle = task[1];
      const taskDescription = task[2];
      const taskDone = task[3];
      const taskCreatedAt = task[4];
      const storeName = task[5];
      const stage = task[6];
      console.log(stage);

      var s1 = "";
      var s2 = "";
      var s3 = "";

      switch (stage) {
        case "Store1":
            s1="selected"
          break;
        case "Store2":
            s2="selected"
          break;
        case "Store3":
            s3="selected"
          break;
        default:
          break;
      }

      let taskElement = `<div class="card bg-dark rounded-0 mb-2">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h3>${storeName}</h3>
          <div class="form-check form-switch">
          <span>Estado--></span>
          <select name="select" id="store" data-id="${taskId}" onchange="App.updateSatage(this)" data-selected="${stage}">
              <option value="Store1" ${s1}>Fabricación</option>
              <option value="Store2" ${s2}>distribución</option>
              <option value="Store3" ${s3}>entregado</option>
            </select>
          </div>
        </div>
        <div class="card-body">
        <span>${taskTitle}</span>
        <hr>
          <span>${taskDescription}</span>
          <span>${taskDone}</span>
          <p class="text-muted">Solicitud creada: ${new Date(
            taskCreatedAt * 1000
          ).toLocaleString()}</p>
          </label>
        </div>
      </div>`;
      html += taskElement;
    }

    document.querySelector("#tasksList").innerHTML = html;

  },
  createTask: async (title, description,store) => {
    try {
      const result = await App.tasksContract.createTask(title, description, store,"delivery", {
        from: App.account,
      });
      console.log(result.logs[0].args);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  },
  toggleDone: async (element) => {
    const taskId = element.dataset.id;
    await App.tasksContract.toggleDone(taskId, {
      from: App.account,
    });
    window.location.reload();
  },
  updateSatage: async (element) => {
    const taskId = element.dataset.id;
    await App.tasksContract.updateSatage(element.value,taskId, {
      from: App.account,
    });
    window.location.reload();
  },
};
