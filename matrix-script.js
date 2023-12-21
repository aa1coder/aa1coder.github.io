function chooseCalculator(calculatorType) {
    const calculatorContent = document.getElementById('calculatorContent');

    // Clear previous content
    calculatorContent.innerHTML = '';

    if (calculatorType === 'basic') {
        // Display basic calculator content
        calculatorContent.innerHTML = '<p>Basic Calculator Content</p>';
    } else if (calculatorType === 'matrix') {
        // Display matrix calculator content
        const matrixContent = document.createElement('div');
        matrixContent.innerHTML = `<p>Matrix Calculator Content</p>
                                   <div class="input-group">
                                       <label for="matrixRows">Enter the number of rows for the matrix:</label>
                                       <input type="number" id="matrixRows">
                                   </div>
                                   <div class="input-group">
                                       <label for="matrixCols">Enter the number of columns for the matrix:</label>
                                       <input type="number" id="matrixCols">
                                   </div>
                                   <button onclick="createMatrixInputGrid()">Create Matrix</button>`;

        calculatorContent.appendChild(matrixContent);
    }
}


function createMatrixInputGrid() {
    const rows = document.getElementById('matrixRows').value;
    const cols = document.getElementById('matrixCols').value;

    if (!rows || !cols || rows <= 0 || cols <= 0) {
        alert('Please enter valid values for rows and columns.');
        return;
    }

    const matrixInputContainer = document.createElement('div');
    matrixInputContainer.innerHTML = '<p>Enter matrix values:</p>';

    const matrixTable = document.createElement('table');
    matrixTable.id = 'matrixInputTable';

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            cell.appendChild(input);
            row.appendChild(cell);
        }
        matrixTable.appendChild(row);
    }

    matrixInputContainer.appendChild(matrixTable);

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit Matrix';
    submitButton.onclick = submitMatrix;

    matrixInputContainer.appendChild(submitButton);

    calculatorContent.appendChild(matrixInputContainer);
}

function submitMatrix() {
    const matrix = getMatrixFromInputTable();

    if (!matrixIsValid(matrix)) {
        alert('Please enter valid numeric values for all matrix elements.');
        return;
    }

    console.log('Submitted Matrix:', matrix);

    // Display steps to row-reduced echelon form (rref)
    const steps = rref(matrix);
    displayResultAndSteps(steps);
}

// Rest of the code remains unchanged


function performOperation(operation) {
    const matrix = getMatrixFromInputTable();
    let result;

    switch (operation) {
        case 'rref':
            result = rref(matrix);
            break;
        default:
            console.error('Invalid operation');
            return;
    }

    console.log('Result:', result);

    // Uncomment the line below to display steps
    // displayResultAndSteps(result);
}

function getMatrixFromInputTable() {
    const matrix = [];

    const table = document.getElementById('matrixInputTable');
    const rows = table.rows;

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].cells;
        const row = [];

        for (let j = 0; j < cells.length; j++) {
            const value = parseFloat(cells[j].querySelector('input').value);
            row.push(isNaN(value) ? 0 : value);
        }

        matrix.push(row);
    }

    return matrix;
}

function matrixIsValid(matrix) {
    return matrix.every(row => row.every(value => !isNaN(value)));
}

function rref(matrix) {
    const steps = [];

    // Copy the original matrix to perform operations without modifying the input
    const workingMatrix = copyMatrix(matrix);
    steps.push({ step: 'Original Matrix', matrix: copyMatrix(workingMatrix) });

    // Implement row reduction to echelon form
    for (let i = 0; i < workingMatrix.length; i++) {
        // Make the diagonal element 1
        const divisor = workingMatrix[i][i];
        if (divisor !== 0) {
            for (let j = i; j < workingMatrix[i].length; j++) {
                workingMatrix[i][j] /= divisor;
            }
        }
        steps.push({ step: `Make the diagonal element in row ${i + 1} 1`, matrix: copyMatrix(workingMatrix) });

        // Eliminate other elements in the column
        for (let k = 0; k < workingMatrix.length; k++) {
            if (k !== i) {
                const factor = workingMatrix[k][i];
                for (let j = i; j < workingMatrix[i].length; j++) {
                    workingMatrix[k][j] -= factor * workingMatrix[i][j];
                }
            }
        }
        steps.push({ step: `Eliminate elements below and above the diagonal in column ${i + 1}`, matrix: copyMatrix(workingMatrix) });
    }

    return steps;
}

// Helper function to create a copy of a matrix
function copyMatrix(matrix) {
    return matrix.map(row => [...row]);
}

function displayResultAndSteps(steps) {
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('result-container');

    steps.forEach((step, index) => {
        const stepContainer = document.createElement('div');
        stepContainer.innerHTML = `<p>${step.step}</p>
                                   <pre>${matrixToString(step.matrix)}</pre>`;

        resultContainer.appendChild(stepContainer);

        // Add a separator between steps
        if (index < steps.length - 1) {
            const separator = document.createElement('hr');
            resultContainer.appendChild(separator);
        }
    });

    calculatorContent.appendChild(resultContainer);
}

function matrixToString(matrix) {
    return matrix.map(row => `[${row.join(' ')}]`).join('\n');
}
