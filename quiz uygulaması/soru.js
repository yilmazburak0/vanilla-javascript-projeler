class Soru{
    constructor(soruMetni, cevapSecenekleri, dogruCevap) {
        this.soruMetni = soruMetni;
        this.cevapSecenekleri = cevapSecenekleri;
        this.dogruCevap = dogruCevap;
    }

    checkAnswer(cevap){
        return cevap === this.dogruCevap
    }

}