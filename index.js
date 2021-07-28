

function print(s){console.log(s)}


// get calculated output divs
let oPSA,
    oMA,
    oF2P,
    oF2PTrialFarmPerDay,
    oF2PWeeklyIncome,
    oPSEDropIncomePerDay,
    oPSEDropWeeklyIncome,
    oDreadDropIncomePerDay,
    oDreadDropWeeklyIncome,
    oGigaDropIncomePerDay,
    oGigaDropWeeklyIncome,
    oDreadGigaDropIncomePerDay,
    oDreadGigaDropWeeklyIncome,
    simResHeader,
    simResSAMeseta,
    simResF2PMeseta,
    simResSAMesetaPerPlayer,
    simResF2PMesetaPerPlayer;

// sim canvas
let simCanvas, simCTX;
let simCanvasWidth, simCanvasHeight;

function init(){
  oPSA = document.getElementById("oPSA");
  oF2P = document.getElementById("oF2P");
  oMA  = document.getElementById("oMA");

  oF2PTrialFarmPerDay = document.getElementById("oF2PTrialFarmPerDay");
  oF2PWeeklyIncome = document.getElementById("oF2PWeeklyIncome");
  
  oPSEDropIncomePerDay = document.getElementById("oPSEDropIncomePerDay");
  oPSEDropWeeklyIncome = document.getElementById("oPSEDropWeeklyIncome");
  

  oDreadDropIncomePerDay = document.getElementById("oDreadDropIncomePerDay");
  oDreadDropWeeklyIncome = document.getElementById("oDreadDropWeeklyIncome");
  
  oGigaDropIncomePerDay = document.getElementById("oGigaDropIncomePerDay");
  oGigaDropWeeklyIncome = document.getElementById("oGigaDropWeeklyIncome");
  
  oDreadGigaDropIncomePerDay = document.getElementById("oDreadGigaDropIncomePerDay");
  oDreadGigaDropWeeklyIncome = document.getElementById("oDreadGigaDropWeeklyIncome");

  simResHeader = document.getElementById("simResHeader");
  simResSAMeseta = document.getElementById("simResSAMeseta");
  simResF2PMeseta = document.getElementById("simResF2PMeseta");
  simResSAMesetaPerPlayer = document.getElementById("simResSAMesetaPerPlayer");
  simResF2PMesetaPerPlayer = document.getElementById("simResF2PMesetaPerPlayer");

  simCanvas = document.getElementById("simCanvas");
  simCanvas.style.width="100%";
  simCanvas.style.alignSelf ="center";
  simCanvas.style.backgroundColor ="azure";

  simCanvas.width   = window.innerWidth;
  simCanvas.height  = simCanvas.width/(16/9);
  simCTX = simCanvas.getContext('2d');
}

function simulate()
{
  // Get Input
  let activePlayers   = Number(document.getElementById("activePlayersInput").value);
  let saPlayersFrac   = Number(document.getElementById("saPlayersInput").value)/100;
  let maPlayersFrac   = Number(document.getElementById("playerMultiAccountingInput").value)/100;
  
  let playTime        = Number(document.getElementById("playTimeInput").value);
  let playerSpending  = Number(document.getElementById("playerSpendingInput").value)/100;
  let playerSpendingGear  = Number(document.getElementById("playerSpendingGearInput").value)/100;
  
  let shopTax    = Number(document.getElementById("percentShopTaxInput").value)/100;
  let dailyMission    = Number(document.getElementById("dailyMissionInput").value);
  let weeklyMission   = Number(document.getElementById("weeklyMissionInput").value);
  let ilegalMesetaPerWeek   = Number(document.getElementById("ilegalMesetaPerWeekInput").value);
  

  let avTPerHour  = Number(document.getElementById("avTPerHourInput").value);
  let avTReward   = Number(document.getElementById("avTRewardInput").value);

  let gSword    = Number(document.getElementById("goldSInput").value);
  let armor4    = Number(document.getElementById("armor4Input").value);
  let rRifle    = Number(document.getElementById("rRifleInput").value);
  let sRod      = Number(document.getElementById("sRodInput").value);
  let dread1    = Number(document.getElementById("dread1Input").value);
  let dread2    = Number(document.getElementById("dread2Input").value);
  let geant     = Number(document.getElementById("geantInput").value);
  let gMight1   = Number(document.getElementById("gMight1Input").value);
  let gPrec1    = Number(document.getElementById("gPrec1Input").value);
  let gTech1    = Number(document.getElementById("gTech1Input").value);
  let gMight2   = Number(document.getElementById("gMight2Input").value);
  let gPrec2    = Number(document.getElementById("gPrec2Input").value);
  let gTech2    = Number(document.getElementById("gTech2Input").value);

  let pseGSPerHour      = Number(document.getElementById("pseGSPerHourInput").value);
  let pseArmor4PerDay   = Number(document.getElementById("pseArmor4PerDayInput").value);
  let pseRPerDay        = Number(document.getElementById("pseRPerDayInput").value);

  let dread1PerDay   = Number(document.getElementById("dread1PerDayInput").value);
  let dread2PerDay   = Number(document.getElementById("dread2PerDayInput").value);
  let dreadGSPerDay  = Number(document.getElementById("dreadGSPerDayInput").value);
  let dreadRPerDay   = Number(document.getElementById("dreadRPerDayInput").value);

  let gigCap1PerDay   = Number(document.getElementById("gigCap1PerDayInput").value);
  let gigCap2PerDay   = Number(document.getElementById("gigCap2PerDayInput").value);
  let geantPerDay     = Number(document.getElementById("geantPerDayInput").value);
  let gigSPerDay    = Number(document.getElementById("gigSPerDayInput").value);
  let gigRPerDay    = Number(document.getElementById("gigRPerDayInput").value);
    

  let simWeeks    = Number(document.getElementById("simWeeksInput").value);
    
    

  // basic calculations

  let saPlayers = Math.round(activePlayers*saPlayersFrac);
  let f2pPlayers = activePlayers-saPlayers;
  let maPlayers = Math.round(saPlayers*maPlayersFrac);
  saPlayers -= maPlayers;

  oPSA.innerText = "Players With Shop Access: "+saPlayers;
  oMA.innerText = "Players With Shop Access and Multi-Accounting: "+maPlayers;
  oF2P.innerText = "Players Without Shop Access: "+f2pPlayers;

  let trialDailyIncome = avTPerHour*playTime*avTReward;
  let f2pWeeklyIncome = 7*(trialDailyIncome+dailyMission)+weeklyMission;
    
  oF2PTrialFarmPerDay.innerText = "Tial Farming Per Day: "+trialDailyIncome;
  oF2PWeeklyIncome.innerText = "Total Weekly Income: "+f2pWeeklyIncome;

  let pseDropDailyIncome = gSword*pseGSPerHour*playTime
                          +armor4*pseArmor4PerDay
                          +(rRifle/12)*pseRPerDay;  // 1 in 12 is a rifle
  let pseWeeklyIncome = 7*(pseDropDailyIncome+trialDailyIncome+dailyMission)+weeklyMission;
  oPSEDropIncomePerDay.innerText = "Drop Income Per Day: "+pseDropDailyIncome;
  oPSEDropWeeklyIncome.innerText = "Total Weekly Income: "+pseWeeklyIncome;
    

  let dreadDropDailyIncome = dread1*dread1PerDay
                            +dread2*dread2PerDay
                            +gSword*dreadGSPerDay
                            +(rRifle/12)*dreadRPerDay;
  let dreadWeeklyIncome = 7*(dreadDropDailyIncome+dailyMission)+weeklyMission;
  oDreadDropIncomePerDay.innerText = "Drop Income Per Day: "+dreadDropDailyIncome;
  oDreadDropWeeklyIncome.innerText = "Total Weekly Income: "+dreadWeeklyIncome;

    
  let gigaDropDailyIncome = ((gMight1+gPrec1+gTech1)*gigCap1PerDay/3)
                            +((gMight2+gPrec2+gTech2)*gigCap2PerDay/3)
                            +geant*geantPerDay
                            +(sRod/4)*gigSPerDay
                            +(rRifle/12)*gigRPerDay;
  gigaDropDailyIncome = Math.floor(gigaDropDailyIncome)
  let gigaWeelyIncome = 7*(gigaDropDailyIncome+dailyMission)+weeklyMission;
  oGigaDropIncomePerDay.innerText = "Drop Income Per Day: "+gigaDropDailyIncome;
  oGigaDropWeeklyIncome.innerText = "Total Weekly Income: "+gigaWeelyIncome;

  let DreadGigaDropDailyIncome = gigaDropDailyIncome+0.9*dreadDropDailyIncome;
  let DreadGigaWeeklyIncome    = 7*(DreadGigaDropDailyIncome+dailyMission)+weeklyMission;
  oDreadGigaDropIncomePerDay.innerText = "Drop Income Per Day: "+DreadGigaDropDailyIncome;
  oDreadGigaDropWeeklyIncome.innerText = "Total Weekly Income: "+DreadGigaWeeklyIncome;
    
  

  // run simulation

  let simF2PMeseta = Array(simWeeks);
  let simSAMeseta = Array(simWeeks);

  simF2PMeseta[0] = 0;
  simSAMeseta[0] = 0;

  //assume 80% farming efficiency
  let maxMeseta = 0;

  for(let i=1; i<simWeeks+1; i++)
  {
    simF2PMeseta[i] = simF2PMeseta[i-1]+f2pWeeklyIncome*f2pPlayers;
    simSAMeseta[i]  = simF2PMeseta[i-1]+f2pWeeklyIncome*(saPlayers+maPlayers);
    simSAMeseta[i]  += maPlayers*ilegalMesetaPerWeek;

    let f2pSpent = simF2PMeseta[i]*playerSpending;
    let saSpent  = simSAMeseta[i]*playerSpending;

    let f2pSpentGear = simF2PMeseta[i]*playerSpendingGear;
    let saSpentGear = simSAMeseta[i]*playerSpendingGear;

    simF2PMeseta[i] -= f2pSpent+f2pSpentGear;
    simSAMeseta[i]  -= saSpent+saSpentGear;
    
    simSAMeseta[i]  += (f2pSpent+saSpent)*shopTax;

    maxMeseta = Math.max(maxMeseta,simF2PMeseta[i]);
    maxMeseta = Math.max(maxMeseta,simSAMeseta[i]);
  }

  if(window.innerWidth<1000)
    simCTX.font = '12px serif';
  else if(window.innerWidth<2000)
    simCTX.font = '20px serif';
  else if(window.innerWidth<3400)
    simCTX.font = '24px serif';
  else
    simCTX.font = '32px serif';

  
  hMargin = 0.10*simCanvas.width;
  wMargin = hMargin;

  plotW = simCanvas.width-2*hMargin;
  plotH = simCanvas.height-2*wMargin;

  tickL   = 0.01*simCanvas.width;
  hTicks = Math.min(30,simWeeks);
  tickHMargin = plotW/hTicks;
  tickVMargin = plotH/20;


  simCTX.clearRect(0, 0, simCanvas.width, simCanvas.height);

  
  //draw axis
  simCTX.save();
  simCTX.beginPath(); 
  simCTX.moveTo(wMargin,hMargin);
  simCTX.lineTo(wMargin,simCanvas.height-hMargin);
  simCTX.lineTo(simCanvas.width-wMargin,simCanvas.height-hMargin);
  simCTX.stroke();
  simCTX.restore();

  // draw horizontal ticks
  simCTX.save();
  for(let i=0; i<hTicks+1; i++)
  {
    simCTX.beginPath(); 
    simCTX.moveTo(wMargin+i*tickHMargin,simCanvas.height-hMargin+0.5*tickL);
    simCTX.lineTo(wMargin+i*tickHMargin,simCanvas.height-hMargin-0.5*tickL);
    simCTX.stroke();
  }
  simCTX.restore();

  // draw horizontal ticks lables
  simCTX.save();
  simCTX.rotate(Math.PI/2);
  simCTX.translate(simCanvas.height-hMargin+0.5*tickL,-wMargin);
  for(let i=0; i<hTicks+1; i++)
  {
    simCTX.fillText(Math.round(simWeeks*i/hTicks), 0, -i*tickHMargin);
  }
  simCTX.restore();

  //Draw Vertical Ticks
  simCTX.save();
  for(let i=0; i<21; i++)
  {
    simCTX.beginPath(); 
    simCTX.moveTo(wMargin-0.5*tickL,hMargin+i*tickVMargin);
    simCTX.lineTo(wMargin+0.5*tickL,hMargin+i*tickVMargin);
    simCTX.stroke();
  }
  simCTX.restore();

  // draw vertical ticks lables
  simCTX.save();
  simCTX.translate(wMargin*0.2,hMargin+plotH);
  for(let i=0; i<21; i++)
  {
    simCTX.fillText(Math.round(i*maxMeseta/20/10000)/100+"M", 0, -i*tickVMargin);
  }
  simCTX.restore();



  let hSimData = plotW/simWeeks;
  // Draw F2P Meseta
  simCTX.save();
  simCTX.strokeStyle = '#00FF00';
  for(let i=0; i<simWeeks; i++)
  {
    simCTX.beginPath();
    let x = wMargin+i*hSimData;
    let y = hMargin+( plotH-(simF2PMeseta[i]/maxMeseta)*plotH);
    simCTX.rect(x-0.5*tickL,y-0.5*tickL,tickL,tickL);
    simCTX.stroke();

    simCTX.beginPath();
    simCTX.moveTo(x,y);
    simCTX.lineTo(wMargin+(i+1)*hSimData,hMargin+( plotH-(simF2PMeseta[i+1]/maxMeseta)*plotH) );
    simCTX.stroke();
  }
  simCTX.beginPath();
  simCTX.rect(
    wMargin+(simWeeks)*hSimData-0.5*tickL,
    hMargin+( plotH-(simF2PMeseta[simWeeks]/maxMeseta)*plotH)-0.5*tickL,
    tickL,tickL
    );
  simCTX.stroke();
  simCTX.restore();

  // Draw F2P Meseta
  simCTX.save();
  simCTX.strokeStyle = '#0000FF';
  for(let i=0; i<simWeeks; i++)
  {
    simCTX.beginPath();
    let x = wMargin+i*hSimData;
    let y = hMargin+( plotH-(simSAMeseta[i]/maxMeseta)*plotH);
    simCTX.rect(x-0.5*tickL,y-0.5*tickL,tickL,tickL);
    simCTX.stroke();

    simCTX.beginPath(); 
    simCTX.moveTo(wMargin+i*hSimData,hMargin+( plotH-(simSAMeseta[i]/maxMeseta)*plotH) );
    simCTX.lineTo(wMargin+(i+1)*hSimData,hMargin+( plotH-(simSAMeseta[i+1]/maxMeseta)*plotH) );
    simCTX.stroke();
  }
  simCTX.beginPath();
  simCTX.rect(
    wMargin+(simWeeks)*hSimData-0.5*tickL,
    hMargin+( plotH-(simSAMeseta[simWeeks]/maxMeseta)*plotH)-0.5*tickL,
    tickL,tickL
    );
  simCTX.stroke();
  simCTX.restore();

  
  

  // Sim results
  simResHeader.innerText            = "Results After "+simWeeks+" Weeks";
  simResSAMeseta.innerText          = "Players With Shop Accesss Hold: "+Math.trunc(simSAMeseta[simWeeks]/10000)/100+"M";
  simResF2PMeseta.innerText         = "Players Without Shop Accesss Hold: "+Math.trunc(simF2PMeseta[simWeeks]/10000)/100+"M";
  simResSAMesetaPerPlayer.innerText = "Players With Shop Accesss Hold Per Player:"+Math.trunc(simSAMeseta[simWeeks]/saPlayers/10000)/100+"M on average";
  simResF2PMesetaPerPlayer.innerText= "Players Without Shop Accesss Hold Per Player:"+Math.trunc(simF2PMeseta[simWeeks]/f2pPlayers/10000)/100+"M on average";


  
}

function onResize()
{
  simCanvas.width = window.innerWidth;
  simCanvas.height = simCanvas.width/(16/9);
}

window.onload = init;
window.onresize = onResize;