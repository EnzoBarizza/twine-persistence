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

                switch (element.tagName) {
                    case "INPUT":
                        if (element.getAttribute("type")?.toLowerCase?.() == "checkbox") {
                            element.checked = value;
                        }
                    case "TEXTAREA":
                        element.value = value;
                        break;
                }
            }

            const dynamicHandle = (event) => {
                if (element.getAttribute("type")?.toLowerCase?.() == "checkbox") {
                    handleInput(attribute, event.target.checked);
                    return;
                }
                handleInput(attribute, event.target.value);
            }

            element.addEventListener('input', dynamicHandle);
            element.addEventListener('propertychange', dynamicHandle);
        }
    })
    persistenceLog("Tick End");
}

setInterval(tick, 250);
