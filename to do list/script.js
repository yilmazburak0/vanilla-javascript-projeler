const tasks = new Map();
let globalKey = 1;

const txtTaskName = document.querySelector("#txtTaskName");
const addBtn = document.querySelector("#btn-add");
const ul = document.querySelector("#to-do-list");
const show_all = document.querySelector("#show-all");
const show_done = document.querySelector("#show-done");
const show_gonna_do = document.querySelector("#show-gonna-do");
const buttons = document.querySelector(".buttons");
const input_wrapper = document.querySelector(".input-wrapper");

const displayAll = () => {
    ul.innerHTML=""; 
    for(let [key,value] of tasks.entries()) {

        let li = `<li class="to-do-list-item">
                    <input onclick="updateTaskStatus(this)" type="checkbox" id="${key}">
                    <label for="${key}" >${value.getTaskName()}</label>
                    <button type="submit" class="btn btn-secondary" id="${key}">Sil</button>
                    </li>`
        ul.insertAdjacentHTML("beforeend", li);  
    }
    for(let i=0; i < ul.children.length; i++) {
            ul.children[i].lastElementChild.setAttribute("onclick" , "removeTask(this.id)")
        }
}

displayAll();

const addActive = (button) => {
    if (button.id === "show-all") {
        input_wrapper.style.display = "flex";
    }
    else{
        input_wrapper.style.display = "none";
    }
    let active_btn = document.querySelector(".btn.active");
    removeActive(active_btn);
    button.classList.add("active");
    button.disabled=true;
    displayWithFilter(button.id)
};

const removeActive = (button) => {
    button.classList.remove("active");
    button.disabled=false;
};

for(let i=0; i < buttons.children.length; i++) {
    buttons.children[i].setAttribute("onclick" , "addActive(this)")    
}

addBtn.addEventListener("click" , () => {
    let text_value = txtTaskName.value;
    if (text_value === "") {
        return;
    }
    for(value of tasks.values()){
        if (value.getTaskName()===text_value) {
            return;
        } 
    }
    txtTaskName.value="";
    let li = `<li class="to-do-list-item">
                <input onclick="updateTaskStatus(this)" type="checkbox" id="${globalKey}">
                <label for="${globalKey}" >${text_value}</label>
                <button type="submit" class="btn btn-secondary" id="${globalKey}">Sil</button>
                </li>`

    ul.insertAdjacentHTML("beforeend", li);
    ul.lastElementChild.lastElementChild.setAttribute("onclick" , "removeTask(this.id)") 
    
    tasks.set(globalKey,new Task(text_value,false))
    globalKey++;
});


show_all.addEventListener("click" , displayAll);

const removeTask = (deleteBtnId) => { 
    tasks.delete(parseInt(deleteBtnId))
    let active_btn = document.querySelector(".btn.active");
    displayWithFilter(active_btn.id)
    //displayAll();
};


const updateTaskStatus = (inputBox) => {
    if (inputBox.checked) {
        tasks.get(parseInt(inputBox.id)).setIsDone(true)
        let active_btn = document.querySelector(".btn.active");
        displayWithFilter(active_btn.id)
    }
    else{
        tasks.get(parseInt(inputBox.id)).setIsDone(false)
        let active_btn = document.querySelector(".btn.active");
        displayWithFilter(active_btn.id)   
    }
};


const displayWithFilter = (btnId) => {
    ul.innerHTML=""; 
    if (btnId === "show-done"){
        for(let [key,value] of tasks.entries()) {
            if (value.getIsDone()) {
                let li = `<li class="to-do-list-item">
                    <input onclick="updateTaskStatus(this)" type="checkbox" id="${key}" checked>
                    <label for="${key}" >${value.getTaskName()}</label>
                    <button type="submit" class="btn btn-secondary" id="${key}">Sil</button>
                    </li>`
                    ul.insertAdjacentHTML("beforeend", li);  
            }
              
        }
    }

    else{
        for(let [key,value] of tasks.entries()) {
            if (!value.getIsDone()) {
                let li = `<li class="to-do-list-item">
                    <input onclick="updateTaskStatus(this)" type="checkbox" id="${key}">
                    <label for="${key}" >${value.getTaskName()}</label>
                    <button type="submit" class="btn btn-secondary" id="${key}">Sil</button>
                    </li>`
                    ul.insertAdjacentHTML("beforeend", li);  
            }
              
        }
    }
    
    for(let i=0; i < ul.children.length; i++) {
        ul.children[i].lastElementChild.setAttribute("onclick" , "removeTask(this.id)")
    }
}
