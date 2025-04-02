let bandInfo;

// Put your code here
bandInfo = "The Beatles are a legendary rock band from Liverpool, England, known for hits like 'Hey Jude' and 'Let It Be'.";

// Don't edit the code below here
let section = document.querySelector('section'); // Ensure the section element exists in the HTML
let para1 = document.createElement('p');
para1.textContent = bandInfo;
section.appendChild(para1);