const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');
const movie_prive = document.getElementById("price");
const movie_name = document.getElementById("movie-name");


getFromLocalStorage();
calculateTotal();

container.addEventListener('click', function(e) {
   if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
       e.target.classList.toggle('selected');
       calculateTotal();     
    }
});

select.addEventListener('change', function(e) {
    calculateTotal();
    movie_prive.innerText = select.value;
    let selectedOption = select.options[select.selectedIndex];
    movie_name.innerText = selectedOption.text;
});

function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.seat.selected');

    const selectedSeatsArr = [...selectedSeats]
    const seatsArr = [...seats]

    let selectedSeatIndexs = selectedSeatsArr.map(function(seat) {
        return seatsArr.indexOf(seat);
    });

    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !=null && selectedSeats.length > 0) {
        seats.forEach(function(seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }



    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
        let selectedOption = select.options[selectedMovieIndex];
        movie_name.innerText = selectedOption.text;
    }

    const movie_price = localStorage.getItem('movie-price');
    movie_prive.innerText = movie_price;

}

function saveToLocalStorage(indexs) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
    localStorage.setItem('movie-price', select.value);
}
