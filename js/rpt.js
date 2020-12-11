//1 = Piedra
const R = 1;
//2 = Papel
const P = 2;
//3 = Tijera
const T = 3;
//Vacio = Empate
const E = 0;

let generations = [];
let genLength = 0;

function setup(){
    const canvas = createCanvas(1200, 680);
    canvas.parent("#canvasHolder");
    noLoop()
}


function draw() {
    background(65, 88, 75);
    textSize(30);
    fill(35, 18, 11)
    rect(1150, 10, 40, 40);
    text('R (1)', 1070, 15, 1150, 50);
    fill(33, 32, 156)
    rect(1150, 60, 40, 40);
    text('P (2)', 1070, 65, 1150, 100);
    fill(253, 184, 39)
    rect(1150, 110, 40, 40);
    text('T (3)', 1070, 115, 1150, 150);
    fill(241, 241, 241)
    rect(1150, 160, 40, 40);
    text('E (0)', 1070, 165, 1150, 200);
    let s = width/genLength
    let d = s*(int)(genLength/2)
    for (let i = 0; i < generations.length; i++) {
        const gen = generations[i];
        let j = d;
        gen.forEach(function (e){
            setColor((int)(e));
            rect(j, i*s, s, s);
            j+=s;
        })
        d-=s;
    }
}

function setColor(C){
    // T P R
    if(C === R)
        fill(35, 18, 11)
    if(C === P)
        fill(33, 32, 156)
    if(C === T)
        fill(253, 184, 39)
    if(C === E)
        fill(241, 241, 241)
}

function getStr(Pasos, Symbol){
    generations = [];
    genLength = (Pasos*2)+3;
    console.log(Symbol);
    let StartSymbol = -1;

    if(Symbol === 'P')
        StartSymbol = P;
    if(Symbol === 'R')
        StartSymbol = R;
    if(Symbol === 'T')
        StartSymbol = T;
    if(Symbol === 'E')
        StartSymbol = E;

    const Cin = [StartSymbol]
    generations.push([StartSymbol])
    redraw();
    //###Valor de la piramide
    console.log(StartSymbol.toString());
    const iterator = automata(Cin, Pasos);
    for (const w of iterator) {
        let r = '';
        generations.push(w);
        redraw();
        w.forEach(function (e){
            r+=e;
        })
        //###Valor de la piramide
        //console.log(r);
    }
}

function* automata(Cinit, N){
    let RR = Cinit;
    let i = 0;
    while (i < N){
        RR = generardesde(RR);
        yield RR;
        //yield [1,2,3]
        i++;
    }
}

function generardesde(Cinta){
    if (Cinta.length === 0)
        return NaN;
    let Buffer = []
    let despl = 0
    let RR;
    for (const j in Cinta) {
        let Resp = Array.from(new Array(despl), (x, i) => E).concat(cabezal(Cinta[j]));
        despl++;
        Buffer.push(Resp)
        if (Buffer.length === 2) {
            let PP = Buffer.pop()
            let QQ = Buffer.pop()
            QQ = QQ.concat([E])
            RR = Array.from(new Array(QQ.length), (x, i) => subconjunto(PP[i], QQ[i]))
            Buffer.push(RR)
        }
    }
    RR = Buffer.pop()
    return RR
}

function cabezal(C){
    // T P R
    if(C === R)
        return [E,P,R]
    if(C === P)
        return [P,E,T]
    if(C === T)
        return [R,T,E]
    if(C === E)
        return [R,P,T]
}

function subconjunto(A, B){
    //Piedra
    if(A === R && B === R)
        return E
    if(A === R && B === P)
        return P
    if(A === R && B === T)
        return R
    //Papel
    if(A === P && B === R)
        return P
    if(A === P && B === P)
        return E
    if(A === P && B === T)
        return T
    //Tijera
    if(A === T && B === R)
        return R
    if(A === T && B === P)
        return T
    if(A === T && B === T)
        return E
    //Si son 0
    if(A === E)
        return B
    if(B === E)
        return A
}