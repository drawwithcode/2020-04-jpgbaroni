function typeText(linesList,size,pos,time) {
  let secperchar = 0.07;
  let maxChar = time/secperchar;
  let endTypeTime = linesList.join("").length*secperchar;
  let outTime = 2;
  if (time < endTypeTime+outTime) {
    fill(255,255,255,255);
    stroke(0);
    textAlign(CENTER,CENTER);
    textSize(size);
    if (time > endTypeTime) {
      fill(255,255,255,255-255*(time-endTypeTime)/outTime);
    }
    let ichar = 0;
    let toType = "";
    for (let iline = 0; iline < linesList.length && ichar<maxChar; iline++) {
      let icl
      for (icl = 0; icl < linesList[iline].length && ichar<maxChar; icl++) {
        toType += linesList[iline][icl];
        ichar++;
      }
      if (iline < linesList.length-1) {
        toType += "\n";
      }
    }
    text(toType, pos[0], pos[1]);
    return false
  }
  return true
}
