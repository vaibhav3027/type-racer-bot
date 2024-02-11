// ==UserScript==
// @name         Type Racer Bot
// @version      2024-02-11
// @description  Trying to take over the world, one step a time
// @author       vaibhav3027
// @match        https://play.typeracer.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=typeracer.com
// @grant        none
// ==/UserScript==

function sleep(ms) {
    return new Promise(resolve => sleepSetTimeout_ctrl = setTimeout(resolve, ms));
}

const DESIRED_WPM = 95; // Words per minute you desire (approxiamtely)
// ** CAVEATS ** : beyond 100 wpm typeracer throws another test which is based on squiggly image
async function startDoingTheThing() {
    var text = document.querySelector('span[unselectable="on"]:nth-child(1)').parentNode.textContent

    let words = text.split(" "); // number of words in the text
    const WPS = DESIRED_WPM/60;
    let adjustedSleep = (1/WPS)*1000 + 30; // +30 to adjust for the calculation of WPM for long words
    for (let i=0; i<words.length; i++) {
            document.querySelector("input.txtInput").value=words[i] + " ";
            document.querySelector("input.txtInput").dispatchEvent(new KeyboardEvent('keypress', {'key': Event.Space}));
            await sleep(adjustedSleep);
    }
}


function doc_keyUp(e) {
    if (e.ctrlKey && e.code === 'ArrowDown') { // SHORT CUT to activate the "thing" CTRL+ArrowDown
            startDoingTheThing()
    }
}


document.addEventListener('keyup', doc_keyUp, false);