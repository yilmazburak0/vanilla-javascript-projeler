const down_arrows = document.querySelectorAll(".fa-chevron-down");
const jokes = document.querySelectorAll(".joke")  

down_arrows.forEach(arrow => {
    arrow.addEventListener("click",() =>{
        const selected_joke = arrow.parentElement;
        jokes.forEach((joke) => {
            if (joke !== selected_joke) {
                joke.classList.remove("active");
                // joke.lastElementChild => arrow icon
                joke.lastElementChild.classList.remove("up")
            }
        })
        selected_joke.classList.toggle("active");
        arrow.classList.toggle("up")
    })
});