class Quiz{
    constructor(sorular) {
        this.sorular = sorular;
        this.soruIndex = 0;
        this.dogruCevapSayisi = 0;
    }

    getQuestion(){
        return this.sorular[this.soruIndex];
    }

}