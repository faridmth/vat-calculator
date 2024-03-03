let htInput = document.querySelector('.ht-input')
let ttcInput = document.querySelector('.ttc-input')
let result = document.querySelector('#result')
let optionsRadio = document.querySelectorAll('.options div input[type="radio"]')
let otherVal = document.querySelector('.other-value-input')
let otherValBox = document.querySelector('.other-value-box')
let copyButtonHt = document.querySelector('#copyButton-ht')
let copyButtonTtc = document.querySelector('#copyButton-ttc')
let copyButtonResult = document.querySelector('#copyButton-result')
let htCopied = document.querySelector('#ht-copied')
let ttcCopied = document.querySelector('#ttc-copied')
let resultCopied = document.querySelector('#result-copied')
ttcInput.value=''
htInput.value=''
result.value=''
htInput.addEventListener('input',()=>{
    calculTtc()
    if(htInput.value==''){
        ttcInput.value=''
        result.value=''
    }
})
ttcInput.addEventListener('input',()=>{
    calculateHt()
    if(ttcInput.value==''){
        htInput.value=''
        result.value=''
    }
})

for(let i=0;i<optionsRadio.length;i++){
    optionsRadio[i].addEventListener('change',()=>{
        if(htInput.value!==''){
            calculTtc()
        }
        if(ttcInput.value!==''){
            calculateHt() 
        }

    })
}
otherVal.addEventListener('input',()=>{
    if(otherValBox.checked){
        if(htInput.value!==''){
            calculTtc()
        }else{
            calculateHt() 
        }
    }
})
copyButtonHt.addEventListener('click',()=>{
    if(htInput.value!==''){
        htInput.select();
        document.execCommand("copy");
        copiedEffect(copyButtonHt,htCopied)
    }
})
copyButtonTtc.addEventListener('click',()=>{
    if(ttcInput.value!==''){
        ttcInput.select();
        document.execCommand("copy");
        copiedEffect(copyButtonTtc,ttcCopied)
    }

})
copyButtonResult.addEventListener('click',()=>{
    if(result.value!==''){
        result.select();
        document.execCommand("copy");
        copiedEffect(copyButtonResult,resultCopied)
    }

})



















//functions
function whichIsChecked(){
    let optionsRadio = document.querySelectorAll('.options div input[type="radio"]')
    let otherVal = document.querySelector('.other-value-input')
    for(let i=0;i<optionsRadio.length;i++){
        if(optionsRadio[i].checked){
            if(!isNaN(optionsRadio[i].value)){
                return optionsRadio[i].value
            }else{
                if(!isNaN(otherVal.value) && otherVal.value!==''){
                    return otherVal.value
                }
            }
        }
    }
}

function calculTtc(){
    ttcInput.value = ''
    let porentage = whichIsChecked()
    let ttcToDisp = Number(htInput.value) + Number(porentage)* Number(htInput.value) /100
    if(!isNaN(ttcToDisp)){
        ttcInput.value =ttcToDisp
        result.value= ttcToDisp - Number(htInput.value)
    }
}
function calculateHt(){
    let porentage = whichIsChecked()
    //Montant HT = Montant TTC / (1 + Taux TVA / 100)
    let htToDisp = Number(ttcInput.value)/(1+porentage/100)
    if(!isNaN(htToDisp)){
        htInput.value =htToDisp.toFixed(2)
        let resultToDisp=Number(ttcInput.value) - htToDisp
        result.value= resultToDisp.toFixed(2) +" "+"€"
    }
}

function copiedEffect(btn1,btn2){
    btn1.style.display='none'
    btn2.style.display='inline-block'

    setInterval(()=>{
        btn2.style.display='none'
        btn1.style.display='inline-block'

    },1200)
}