const widget_container = document.getElementById("widget-container");
const stores = document.getElementsByClassName("store");
const score_element = document.getElementById("score");
const gems_element = document.getElementById("gems");
let score = 5;
let gems = 0;
let super_gompei_count = 0;

function changeScore(amount) {
    score += amount;
    //set score element
    score_element.innerHTML = "Score: " + score;
    // Update the stores to show ones that are too expensive
    for (let store of stores) {
        let cost = parseInt(store.getAttribute("cost"));
        // This only checks score, gem check is in changeGems

        if (score < cost) {
            store.setAttribute("broke", "");
        } else {
            store.removeAttribute("broke");
        }
    }

    if (score >= 1000000000000000000) {
        if (window.confirm("You Win! Want to play again?")) {
            location.reload();
        } else {
            window.close();
            window.open("../index.html");
        }
    }
}

function changeGems(amount) {
    gems += amount;
    gems_element.innerHTML = "Gems: " + gems;

    // Update stores that have a gem cost
    for (let store of stores) {
        if (store.hasAttribute("gem-cost")) {
            let gemCost = parseInt(store.getAttribute("gem-cost"));
            if (gems < gemCost && score < parseInt(store.getAttribute("cost"))) {
                store.setAttribute("broke", "");
            } else {
                store.removeAttribute("broke");
            }
        }
    }
}

function buy(store) {
    const cost = parseInt(store.getAttribute("cost"));
    const gemCostAttr = store.getAttribute("gem-cost");
    const gemCost = gemCostAttr ? parseInt(gemCostAttr) : null;

    if (gemCost !== null && gems >= gemCost) {
        changeGems(-gemCost);
    } else if (score >= cost) {
        changeScore(-cost);
    } else {
        return;
    }
    

    if (store.getAttribute("name") === "Super-Gompei") {
        const super_gompei = document.querySelector("#widget-container #super-gompei")?.parentElement;
        // If Super-Gompei already exists
        if (super_gompei) {
            super_gompei.setAttribute("reap", (parseInt(super_gompei.getAttribute("reap")) + 100));
            return;
        }
        super_gompei_count += 1;
        document.body.style = "--gompei-count: " + super_gompei_count + ";"
    }

    

    // clone node for widget, and add to container
    const widget = store.firstElementChild.cloneNode(true);
    widget.onclick = () => {
        // If the widget is automatic, a manual click just gives bonus points
        // without resetting the auto-harvest timer.
        if (widget.getAttribute("auto") == 'true') {
            if (widget.hasAttribute("gem-reap")) {
                // Manual click on a gem generator gives 1 bonus gem
                changeGems(1);
                showPoint(widget, 1, true);
            } else {
                const pointsToAdd = getPointsForWidget(widget);
                changeScore(pointsToAdd);
                showPoint(widget, pointsToAdd, false);
            }
        } else {
            // For manual widgets, run the full harvest cycle with its cooldown.
            harvest(widget);
        }
    }
    widget_container.appendChild(widget);

    // If the widget is automatic, start its harvest cycle.
    if (widget.getAttribute("auto") == 'true') {
        widget.setAttribute("harvesting", "");
        setup_end_harvest(widget);
    }
}

function setup_end_harvest(widget) {
    setTimeout(() => {
        // Remove the harvesting flag
        widget.removeAttribute("harvesting");
        // If automatic, start again
        if (widget.getAttribute("auto") == 'true') {
            harvest(widget);
        }
    }, parseFloat(widget.getAttribute("cooldown")) * 1000);
}

function getPointsForWidget(widget) {
    // Special logic for Mega Gompei's random harvest
    if (widget.getAttribute("name") === "Mega-Gompei") {
        const min = -100000;
        const max = 100000;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
        return parseInt(widget.getAttribute("reap"));
    }
}

function harvest(widget) {
    // Only run if currently not harvesting
    if (widget.hasAttribute("harvesting")) return;
    // Set harvesting flag
    widget.setAttribute("harvesting", "");
    
    // Check if this widget generates gems or points
    if (widget.hasAttribute("gem-reap")) {
        const gemsToAdd = parseInt(widget.getAttribute("gem-reap"));
        changeGems(gemsToAdd);
        showPoint(widget, gemsToAdd, true);
    } else {
        const pointsToAdd = getPointsForWidget(widget);
        changeScore(pointsToAdd);
        showPoint(widget, pointsToAdd, false);
    }

    setup_end_harvest(widget);
}


function showPoint(widget, points, isGem = false) {
    let number = document.createElement("span");
    number.className = "point";
    const pointsToShow = points !== undefined ? points : widget.getAttribute("reap");
    const symbol = isGem ? "💎" : "";
    number.innerHTML = (pointsToShow >= 0 ? "+" : "") + pointsToShow.toLocaleString() + symbol;
    // When the animation finishes, remove the element.
    number.onanimationend = () => number.remove();
    widget.appendChild(number);
}

changeScore(0);
changeGems(0);