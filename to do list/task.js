class Task {
    constructor(taskName, isDone) {
        this.taskName = taskName;
        this.isDone = isDone;   
    }

    getTaskName() {
        return this.taskName;
    }

    getIsDone() {
        return this.isDone;
    }

    setIsDone(status){
        this.isDone = status;
    }
}