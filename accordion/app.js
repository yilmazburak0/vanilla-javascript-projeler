down_arrows = document.querySelectorAll(".fa-chevron-down");

down_arrows.forEach(arrow => {
    arrow.addEventListener("click",() =>{
        arrow.parentElement.classList.toggle("active");
        arrow.classList.toggle("up")
    })
});