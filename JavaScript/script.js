// Global variables :
let golds = 0;
let gps = 0;
let minions = initializeMinionTable();
let store = false;
let clickValue = 1; 
let multiplicator = 0;
let crazyIconRain = 'iconRain--crazy';
let loonyIconRain = 'iconRain--loony';
let nutsIconRain = 'iconRain--nuts';
let crazyAccuracy = 0;
let loonyAccuracy = 0;
let nutsAccuracy = 0;

// executed functions at the beginning :
goldPerSecond();
getGPS();
setStoreTimer();
setInterval( function(){updateClickPunch();},1000)
getLocalStorage();
setInterval(function(){chooseMonster();},2000);

function addGold(x)
{

    golds = golds + x;
}

function displayGolds()
{

    document.querySelector('#gold').innerHTML = golds.toFixed(2);
}

function punch()
{
    document.getElementById('pushy').setAttribute("src", '../images/pushiV2.png');
    setTimeout(function(){document.getElementById('pushy').setAttribute("src", '../images/pushiV1.png');},250);
    addGold(clickValue);
    displayGolds();
}

function goldPerSecond()
{

    setInterval(function() {addGold(gps);displayGolds(); }, 1000);
}



function getGPS() 
{
    setInterval( function() 
        { 
            var tempGps =0;
            minions.forEach(minion => { tempGps += (minion.gps*minion.owned); })
            if(gps!==tempGps) 
                {
                    gps = tempGps;
                }
            displayGPS();
        }, 1000);
}

function displayGPS()
{

    
    document.querySelector('#gps').innerHTML = gps.toFixed(2);
}



function initializeMinionTable() 
{
    // classes :
    class minion 
    {

        constructor(id, name, cost, gps, owned) 
        {
            this.id = id;
            this.name = name;
            this.cost = cost;
            this.gps = gps;
            this.owned = owned;
        }
    }

    let crazy = new minion(1,"crazy",50,0.3,0);
    let loony = new minion(2,"loony",250,1,0);
    let nuts = new minion(3,"nuts",1000,10,0);
    let minions = [crazy, loony, nuts];
    return minions;
}

function CreateStore()
{
    
    minions.forEach(minion => 
    {
        let minionSection = document.createElement('button');
        minionSection.className = 'minion';
        minionSection.setAttribute('onclick','getMinion('+minion.id+')');
        document.querySelector('.store').appendChild(minionSection);

        //div container for title and img
        let subSection1 = document.createElement('div');
        subSection1.className = 'subSection--1';
        document.querySelectorAll('.minion')[minion.id-1].appendChild(subSection1);
        
        let minionName = document.createElement('h2');
        minionName.className = 'minionName';
        minionName.innerHTML = minion.name;
        document.querySelectorAll('.subSection--1')[minion.id-1].appendChild(minionName);

        let minionPicture = document.createElement('img');
        minionPicture.className = 'minionPicture';
        minionPicture.src = '../images/'+minion.name+'.png';
        document.querySelectorAll('.subSection--1')[minion.id-1].appendChild(minionPicture);






        //div container with numbers 
        let subSection2 = document.createElement('div');
        subSection2.className = 'subSection--2';
        document.querySelectorAll('.minion')[minion.id-1].appendChild(subSection2);

        let minionCost = document.createElement('p');
        minionCost.className = 'minionCost';
        minionCost.innerText = minion.cost.toFixed(2);
        document.querySelectorAll('.subSection--2')[minion.id-1].appendChild(minionCost);

        let minionGps = document.createElement('p');
        minionGps.className = 'minionGps';
        minionGps.innerText = minion.gps.toFixed(2)+'Gps';
        document.querySelectorAll('.subSection--2')[minion.id-1].appendChild(minionGps);

        let numberOfMinionsOwned = document.createElement('p');
        numberOfMinionsOwned.className = 'numberOfMinionsOwned';
        numberOfMinionsOwned.innerText = minion.owned;
        document.querySelectorAll('.subSection--2')[minion.id-1].appendChild(numberOfMinionsOwned);

        //div container for labels
        let subSection3 = document.createElement('div');
        subSection3.className = 'subSection--3';
        document.querySelectorAll('.minion')[minion.id-1].appendChild(subSection3);

        let CostLabel = document.createElement('p');
        CostLabel.className = 'Labels';
        CostLabel.innerText ='Cost';
        document.querySelectorAll('.subSection--3')[minion.id-1].appendChild(CostLabel);

        let gpsLabel = document.createElement('p');
        gpsLabel.className = 'Labels';
        gpsLabel.innerText ='GPS';
        document.querySelectorAll('.subSection--3')[minion.id-1].appendChild(gpsLabel);
        
        let OwndLabel = document.createElement('p');
        OwndLabel.className = 'Labels';
        OwndLabel.innerText ='Owned';
        document.querySelectorAll('.subSection--3')[minion.id-1].appendChild(OwndLabel);

    })
    
    store = true;
}

function refreshStore()
{

    if (store === false)
    {
        CreateStore();
        refreshStore();
    }
    else
    {
        minions.forEach( minion => 
        {
            document.querySelectorAll('.minionCost')[minion.id-1].innerHTML = minion.cost.toFixed(2);
            document.querySelectorAll('.minionGps')[minion.id-1].innerHTML = minion.gps.toFixed(2);
            document.querySelectorAll('.numberOfMinionsOwned')[minion.id-1].innerHTML = minion.owned;
        })
    }
}

function setStoreTimer()
{
    setInterval(() => {
        refreshStore();
    }, 1000);
}

function getMinion(idMinion) 
{

    
    if (golds>=minions[idMinion-1].cost)
    {
        minions[idMinion-1].owned +=1;
        golds-=minions[idMinion-1].cost;
        minions[idMinion-1].cost *= 1.15;

    }
}

function updateClickPunch()
{
    //Checking total number of minions and *2 each 50 minions punchForce
    var numberOfMinionsOwned = 0;
    minions.forEach(minion => { 
        numberOfMinionsOwned+=minion.owned;
    }) 
    let factor = numberOfMinionsOwned / 50;
        clickValue = 1;
        for(let i=0;i<factor;i++)
        {
            clickValue = clickValue*2;
        }
    //Checking each type of minions and set Gps augmentation of minions following the owned number 
    minions.forEach(minion => {

        let numberOfThisMinionsOwned = minion.owned;
        if (numberOfThisMinionsOwned>=25 && numberOfThisMinionsOwned<50 && multiplicator!==1)
        {
            minion.gps *= 2; 
            multiplicator = 1;
        }
        else if (numberOfThisMinionsOwned>=50 && numberOfThisMinionsOwned<100 && multiplicator!==2)
        {
            minion.gps *= 2;
            multiplicator = 2;
        }
        else if (numberOfThisMinionsOwned>=100 && numberOfThisMinionsOwned<250 && multiplicator!==3)
        {
            minion.gps *= 2;
            multiplicator = 3;
        }
        else if (numberOfThisMinionsOwned>=250 && numberOfThisMinionsOwned<1000 && multiplicator!==4)
        {
            minion.gps *= (5/2);
            multiplicator = 4;
        }
        else if (numberOfThisMinionsOwned>=1000 && multiplicator!==5)
        {
            minion.gps *= 4;
            multiplicator = 5;
        }

    })
}

function setLocalStorage()
{
    localStorage.setItem('golds' ,golds.toFixed(2));
    localStorage.setItem('gps' ,gps.toFixed(2));
    localStorage.setItem('multiplicator' ,multiplicator);
    localStorage.setItem('minions' ,JSON.stringify(minions));
    localStorage.setItem('clickValue' ,clickValue);
    
}

function getLocalStorage()
{
    if (localStorage.length > 0)
    {
        golds=parseInt(localStorage.getItem('golds'));
        gps=parseInt(localStorage.getItem('gps'));
        multiplicator=parseInt(localStorage.getItem('multiplicator'));
        clickValue=parseInt(localStorage.getItem('clickValue'));
        
        minions=JSON.parse(localStorage.getItem("minions"));
    }
    setTimeout(() => {setInterval( function(){setLocalStorage();},1000);}, 3000);
}

function newGame()
{
    golds = 0;
    gps = 0;
    minions = initializeMinionTable();
    clickValue = 1; 
    multiplicator = 0;
    localStorage.clear();
    location.reload();
}

//monster rainFall
function rainFall(todisplay) 
{   
    const waterDrop = document.createElement('div');
    waterDrop.style.animationDuration = 3 + 's';
    waterDrop.className = todisplay+' fa-tint';
     var test = (Math.random() * document.querySelector('#gameSection').clientWidth) - 15;
    waterDrop.style.left = test + 'px';
    document.querySelector('#gameSection').appendChild(waterDrop);
    setTimeout(()=>{waterDrop.remove();},4000);
}

// this function is used to set the icon that will rain 
function chooseMonster()
{
    let crazyOwnd = minions[0].owned;
    let loonyOwnd = minions[1].owned;
    let nutsOwnd = minions[2].owned;

    /*Define the number of crazy falling in same time*/
    if(crazyOwnd>0 && crazyAccuracy==0)
        {
            setInterval(function(){rainFall(crazyIconRain);},2000);
            crazyAccuracy+=1;
            
        }
    else if (crazyOwnd>10 && crazyAccuracy==1)
    {
            setInterval(function(){rainFall(crazyIconRain);},1000);
            crazyAccuracy+=1;
    }
    else if (crazyOwnd==100 && crazyAccuracy == 2)
        {
            setInterval(function(){rainFall(crazyIconRain);},500);
            crazyAccuracy+=1;
        }

        /*Define the number of loony falling in same time*/
        if(loonyOwnd>0 && loonyAccuracy==0)
        {
            setInterval(function(){ rainFall(loonyIconRain);},2000);
            loonyAccuracy+=1;
        }
        else if (loonyOwnd>10 && loonyAccuracy==1)
        {
            setInterval(function(){rainFall(loonyIconRain);},1000);
            loonyAccuracy+=1;
        } 
        else if (loonyOwnd==25 && loonyAccuracy==2)
        {
            setInterval(function(){rainFall(loonyIconRain);},500);
            loonyAccuracy+=1;
        }
        /*Define the number of nuts falling in same time*/
        if(nutsOwnd>0 && nutsAccuracy==0)
        {
            setInterval(function(){rainFall(nutsIconRain);},2000);
            nutsAccuracy+=1;
        }
        else if (nutsOwnd>3 && nutsAccuracy==1)
        {
            setInterval(function(){rainFall(nutsIconRain);},1000);
            nutsAccuracy+=1;
        } 
        else if (loonyOwnd>5 && nutsAccuracy==2)
        {
            setInterval(function(){rainFall(nutsIconRain);},500);
            nutsAccuracy+=1;
        }
    
}
