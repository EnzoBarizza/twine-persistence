window.persistenceMap = new Map();

window.persistenceDebug = false;

window.persistenceLog = (msg) => {
    if (persistenceDebug) {
        console.info(`[PERSISTENCE]: ${msg}`);
    }
}

window.handleInput = (persistenceId, value) => {
    persistenceLog(`Input for: "${persistenceId}" value: "${value}"`);
    persistenceMap.set(persistenceId, value);
}

window.tick = () => {
    persistenceLog("Tick Start");

    let elements = document.querySelectorAll('*');
    elements.forEach((element) => {
        let attribute = element.getAttribute('use-persistence');

        if (attribute) {
            persistenceLog(`Found the persistence object ${attribute}`);
            let value = persistenceMap.get(attribute);
            if ((value !== null && value !== undefined) && (element.value !== undefined)) {
                persistenceLog(`Found persisted value for the object "${attribute}" value: "${value}"`);
                element.value = value;
            }

            element.addEventListener('input', (e) => { handleInput(attribute, e.target.value) })
            element.addEventListener('propertychange', (e) => { handleInput(attribute, e.target.value) })
        }
    })
    persistenceLog("Tick End");
}

setInterval(tick, 250);