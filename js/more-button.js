
function respondToButtonClick(readMoreBtn, textElement, hiddenElement, dotsElement){
  let textElementId = document.getElementById(textElement);
  let hiddenTextElementId = document.getElementById(hiddenElement);
  let dotsTextELementId = document.getElementById(dotsElement);

  if (readMoreBtn.innerText.toUpperCase() === "Read More".toUpperCase()) {
    readMoreBtn.innerText = "Read Less";
    hiddenTextElementId.style.display = "inline";
    dotsTextElementId.style.display = "none";
  } else {
    readMoreBtn.innerText = "Read More";
    hiddenTextElementId.style.display = "none";
    dotsTextElementId.style.display = "inline";
  }
}
