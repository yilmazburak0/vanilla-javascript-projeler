const down_arrows = document.querySelectorAll(".fa-chevron-down");
const jokes = document.querySelectorAll(".joke")  

down_arrows.forEach(arrow => {
    arrow.addEventListener("click",() =>{
        jokes.forEach((joke) => {
            if (joke !== arrow.parentElement) {
                joke.classList.remove("active");
            }
        })
        arrow.parentElement.classList.toggle("active");
        arrow.classList.toggle("up")
    })
});