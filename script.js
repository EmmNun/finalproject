const colors = ["#E0F7FA", "#0288D1", "#01579B"];
const userName = prompt("What is your name?");
const colorChoice = prompt("Pick a background color: 0 for light blue, 1 for medium blue, 2 for dark blue");

const userInfo = {
    name: userName,
    selectedColor: colors[colorChoice]
};

document.body.style.backgroundColor = userInfo.selectedColor;
