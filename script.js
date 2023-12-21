function showDescription(plantName) {
    const descriptionDiv = document.getElementById('plantDescription');
    const imagePath = `${plantName.toLowerCase()}.jpeg`; // Use lowercase for consistency
    descriptionDiv.innerHTML = `<h2>${plantName}</h2><img src="${imagePath}" alt="${plantName} Image"><p>Description for ${plantName} goes here.</p>`;
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

