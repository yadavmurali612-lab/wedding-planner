const buildings = [
    "Main Gate",
    "Library",
    "CSE Block",
    "ECE Block",
    "Cafeteria",
    "Hostel"
];

let routes = [];

function addRoute() {

    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;

    if (!from || !to) {
        alert("Please select both buildings!");
        return;
    }

    if (from === to) {
        alert("Please select different buildings!");
        return;
    }

    routes.push([from, to]);

    showRoutes();

    document.getElementById("from").value = "";
    document.getElementById("to").value = "";
}

function showRoutes() {

    let box = document.getElementById("routes");

    if (routes.length === 0) {
        box.innerHTML = "No walkways added";
        return;
    }

    box.innerHTML = routes.map((r, i) =>
        `<div class="routeItem">
            🛣️ ${r[0]} ➡️ ${r[1]}
        </div>`
    ).join("");
}

function checkCampus() {

    let graph = {};

    buildings.forEach(b => graph[b] = []);

    routes.forEach(r => {
        graph[r[0]].push(r[1]);
        graph[r[1]].push(r[0]);
    });

    let visited = new Set();
    let stack = ["Main Gate"];

    while (stack.length) {

        let current = stack.pop();

        if (visited.has(current))
            continue;

        visited.add(current);

        graph[current].forEach(next => {
            if (!visited.has(next))
                stack.push(next);
        });
    }

    let unreachable = buildings.filter(b => !visited.has(b));

    let result = document.getElementById("result");

    if (unreachable.length === 0) {

        result.innerHTML = `
            <div class="success">
                ✅ All buildings are reachable!
            </div>
            <p>Every building can be reached from the Main Gate.</p>
        `;

    } else {

        result.innerHTML = `
            <div class="failure">
                ❌ Some buildings are unreachable
            </div>

            <p><b>Reachable Buildings:</b></p>

            ${buildings
                .filter(b => visited.has(b))
                .map(b => `<span class="buildingResult reachable">🟢 ${b}</span>`)
                .join("")}

            <p><b>Unreachable Buildings:</b></p>

            ${unreachable
                .map(b => `<span class="buildingResult unreachable">🔴 ${b}</span>`)
                .join("")}
        `;
    }
}