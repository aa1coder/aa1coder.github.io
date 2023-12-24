const plantDescriptions = {
    jasmine: "Jasmine is a fragrant flower known for its beautiful white blooms.",
    'prickly pair': "The Prickly Pear is a cactus known for its sweet and juicy fruits.",
    'snake plant': "Snake Plant, also known as Mother-in-law's Tongue, is a hardy and low-maintenance indoor plant.",
    'pothos plant': "Pothos Plant is a popular indoor plant with attractive, heart-shaped leaves.",
    monstera: "Monstera is a tropical plant with unique split leaves.",
    'jade plant': "Jade Plant is a succulent known for its thick, fleshy leaves.",
    bougainvillea: "Bougainvillea is a colorful and vibrant flowering plant.",
    'prayer plant': "Prayer Plant is known for its decorative leaves that fold up at night."
};

function showDescription(plantName) {
    const descriptionDiv = document.getElementById('plantDescription');
    const imagePath = `${plantName.toLowerCase()}.jpeg`; // Use lowercase for consistency
    const description = plantDescriptions[plantName.toLowerCase()];

    descriptionDiv.innerHTML = `<img src="${imagePath}" alt="${plantName} Image"><p>${description}</p>`;
}

if (imagePath) {
        descriptionDiv.innerHTML += `<img src="${imagePath}" alt="${plantName} Image">`;
    }



function search() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const plantEntries = document.querySelectorAll('.plant');

    plantEntries.forEach(entry => {
        const entryName = entry.innerText.toLowerCase();
        const entryId = entry.id.toLowerCase();
        const isVisible = entryName.includes(searchInput) || entryId.includes(searchInput);

        entry.style.display = isVisible ? 'block' : 'none';
    });
}

