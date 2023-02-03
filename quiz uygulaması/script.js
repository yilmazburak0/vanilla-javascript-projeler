let sorular = [
    new Soru("1-Hangisi javascript paket yönetim uygulasıdır?", { a: "Node.js", b: "Typescript", c: "Npm" , d: "Nuget" }, "c"),
    new Soru("2-Hangisi frontend kapsamında değerlendirilmez?", { a: "css", b: "html", c: "javascipt", d: "sql" }, "d"),
    new Soru("3-Hangisi backend kapsamında değerlendirilir?", { a: "node.js", b: "typescript", c: "angular", d: "react" }, "a"),
    new Soru("4-Hangisi javascript programlama dilini kullanmaz?", { a: "react", b: "angular", c: "vuejs", d: "asp.net" }, "d")
];

const quiz = new Quiz(sorular);

btn_start = document.querySelector(".btn_start");
quiz_box = document.querySelector(".quiz_box");
question_text = document.querySelector(".question_text");
option_list = document.querySelector(".option_list");
this.correctIcon = '<div class="icon"><i class="fas fa-check"></i></div>',
this.incorrectIcon = '<div class="icon"><i class="fas fa-times"></i></div>',
next_btn =  document.querySelector(".next_btn");
question_index =  document.querySelector(".question_index");
score_box = document.querySelector(".score_box");
score_text = document.querySelector(".score_text");
btn_quit = document.querySelector(".btn_quit");
btn_replay = document.querySelector(".btn_replay");

btn_start.addEventListener("click", () => {
    quiz_box.classList.add("active")
    displayQuestion();
    question_index.innerText = `${quiz.soruIndex + 1}/${quiz.sorular.length}`
});

const displayQuestion = () => {
    let question = quiz.getQuestion();
    question_text.innerHTML =`<span>${question.soruMetni}</span>`;;
    
    let options = '';

    for(let answer in question.cevapSecenekleri) {
        options += 
        `
            <div class="option"> 
                <span><b>${answer}</b>: ${question.cevapSecenekleri[answer]}</span>
            </div>
        `;
    }
    option_list.innerHTML = options;

    const option = this.option_list.querySelectorAll(".option");

    for(let opt of option) {
        opt.setAttribute("onclick", "optionSelected(this)")
    }

    
};

const optionSelected = (option) => {
    let cevap = option.querySelector("span b").textContent;
    let soru = quiz.getQuestion();

    if(soru.checkAnswer(cevap)) {
        quiz.dogruCevapSayisi += 1;
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", correctIcon);
    } else {
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend", incorrectIcon);
    }

    for(let i=0; i < option_list.children.length; i++) {
        option_list.children[i].classList.add("disabled");
    }

    next_btn.classList.add("show");
};

next_btn.addEventListener("click", () => {
    if ((quiz.sorular.length)-1 != quiz.soruIndex) {
        quiz.soruIndex++;
        displayQuestion();
        question_index.innerText = `${quiz.soruIndex + 1}/${quiz.sorular.length}`
    }
    else{
        score_text.innerText = `${quiz.sorular.length} soruda ${quiz.dogruCevapSayisi} doğru cevap verdiniz.`
        score_box.classList.add("active");
        quiz_box.classList.remove("active");
    }
})

btn_quit.addEventListener("click", () => {
    window.location.reload();
} );

btn_replay.addEventListener("click", () => {
    quiz.soruIndex = 0;
    quiz.dogruCevapSayisi = 0;
    btn_start.click();
    score_box.classList.remove("active");
    quiz_box.classList.add("active");
});

