window.onload = function () {
    let loadFinish = localStorage.getItem("FINISHED");
    let loadPending = localStorage.getItem("PENDING");
    const todoForm = document.querySelector("#js-form"),
        todoInput = document.querySelector("#js-input");

    let pendingArry = [],
        finishArry = [];

    let pending = true;

    let todoCont = "",
        arryName = "",
        arryId = "",
        reverseId = "",
        Checkbox = "",
        reverseArry = "",
        checkCont = "",
        removeCont = "";

    let nums = [];

    function randomNum() {
        let random = Math.floor(Math.random() * 10000000);
        function test(a) {
            return random === a ? false : true;
        }
        let randomCheck = nums.every(test);
        if (!randomCheck) {
            randomNum();
        } else {
            nums.push(random);
            return nums.length;
        }
    }

    function change() {
        const findCheck_1 = document.querySelector("#js-Pending-todos"),
            findCheck_2 = document.querySelector("#js-Finished-todos");
        let i = 0;
        for (i = 0; i < findCheck_2.children.length; i++) {
            findCheck_2.children[i].children[2].innerHTML = "⏪";
        }
        for (i = 0; i < findCheck_1.children.length; i++) {
            findCheck_1.children[i].children[2].innerHTML = "✅";
        }
    }

    function finishTodo(e) {
        e.preventDefault();

        const finCheck = e.target.parentElement.parentElement.id;
        if (finCheck === `js-Pending-todos`) {
            let LOAD_PENDING = localStorage.getItem("PENDING");
            let LOADED_PENDING = JSON.parse(LOAD_PENDING);
            pendingArry = LOADED_PENDING;
            arryName = pendingArry;
            reverseArry = finishArry;
            checkCont = document.querySelector("#js-Finished-todos");
            removeCont = document.querySelector("#js-Pending-todos");

            arryId = "PENDING";
            reverseId = "FINISHED";
        } else {
            let LOAD_FINISH = localStorage.getItem("FINISHED");
            let LOADED_FINISHED = JSON.parse(LOAD_FINISH);
            let finishArry = LOADED_FINISHED;
            arryName = finishArry;
            reverseArry = pendingArry;
            checkCont = document.querySelector("#js-Pending-todos");
            removeCont = document.querySelector("#js-Finished-todos");

            arryId = "FINISHED";
            reverseId = "PENDING";
        }

        removeCont.removeChild(e.target.parentElement);
        checkCont.appendChild(e.target.parentElement);

        let idx = e.target.parentElement.id;
        let removedArray = arryName.filter(function (a) {
            return a.id !== parseInt(idx, 10);
        });

        arryName = removedArray;
        localStorage.setItem(arryId, JSON.stringify(arryName));

        let todoObj = {
            id: parseInt(e.target.parentElement.id, 10),
            text: e.target.parentElement.children[0].innerHTML
        };

        reverseArry.push(todoObj);
        localStorage.setItem(reverseId, JSON.stringify(reverseArry));
        change();

        pendingArry = JSON.parse(localStorage.getItem("PENDING"));
        finishArry = JSON.parse(localStorage.getItem("FINISHED"));
    }

    function delTodos(e) {
        e.preventDefault();

        const delCheck = e.target.parentElement.parentElement.id;

        if (delCheck === `js-Pending-todos`) {
            todoCont = document.querySelector("#js-Pending-todos");
            let LOAD_PENDING = localStorage.getItem("PENDING");
            let LOADED_PENDING = JSON.parse(LOAD_PENDING);
            pendingArry = LOADED_PENDING;
            arryName = pendingArry;
            arryId = "PENDING";
        } else {
            todoCont = document.querySelector("#js-Finished-todos");
            let LOAD_FINISH = localStorage.getItem("FINISHED");
            let LOADED_FINISHED = JSON.parse(LOAD_FINISH);
            finishArry = LOADED_FINISHED;
            arryName = finishArry;
            arryId = "FINISHED";
        }

        todoCont.removeChild(e.target.parentElement);
        let idx = e.target.parentElement.id;

        let removedArray = arryName.filter(function (a) {
            return a.id !== parseInt(idx, 10);
        });
        arryName = removedArray;
        localStorage.setItem(arryId, JSON.stringify(arryName));
    }

    function makeTodo(todo, index) {
        if (pending) {
            todoCont = document.querySelector("#js-Pending-todos");
            Checkbox = "✅";
        } else {
            todoCont = document.querySelector("#js-Finished-todos");
            Checkbox = "⏪";
        }
        const todos = document.createElement("li");
        const text = document.createElement("span");
        const del = document.createElement("span");
        const check = document.createElement("span");
        todoCont.appendChild(todos);
        todos.id = index;
        todos.appendChild(text);
        text.innerHTML = todo;
        todos.appendChild(del);
        del.innerHTML = `&nbsp;&nbsp;❌`;
        todos.appendChild(check);
        check.innerHTML = Checkbox;

        del.addEventListener("click", delTodos);
        check.addEventListener("click", finishTodo);
    }

    function loadTodos() {
        if (loadPending != null) {
            let loadedPending = JSON.parse(loadPending);
            pendingArry = loadedPending;
            loadedPending.forEach(function (a) {
                makeTodo(a.text, a.id);
            });
        }

        if (loadFinish != null) {
            let loadedFinish = JSON.parse(loadFinish);
            finishArry = loadedFinish;
            pending = false;
            loadedFinish.forEach(function (b) {
                makeTodo(b.text, b.id);
            });
            pending = true;
        }
    }

    function getValue(event) {
        event.preventDefault();
        let numsIdx = randomNum() - 1;
        let randomId = nums[numsIdx];
        makeTodo(todoInput.value, randomId);
        let todoObj = {
            id: randomId,
            text: todoInput.value
        };
        todoInput.value = "";
        pendingArry.push(todoObj);
        localStorage.setItem("PENDING", JSON.stringify(pendingArry));
    }

    function init() {
        loadTodos();
        todoForm.addEventListener("submit", getValue);
    }

    init();
};
// <⚠️ /DONT DELETE THIS ⚠️>