// Variables
const container = document.getElementById('container');
const newGridBtn = document.getElementById('newGridBtn');

// Create initial 16x16 grid
createGrid(16);

// Button event listener to prompt for new grid size
newGridBtn.addEventListener('click', () => {
  let size = prompt('Enter number of squares per side (maximum 100):', 16);
  if (size > 100) {
    size = 100;
  }
  createNewGrid(size);
});

// Function to create a new grid
function createNewGrid(size) {
  clearGrid(); // Clear existing grid
  createGrid(size); // Create new grid
}

// Function to clear the existing grid
function clearGrid() {
  container.innerHTML = ''; // Remove all existing squares
}

// Function to create the grid
function createGrid(size) {
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement('div');
    div.classList.add('grid-square');
    div.dataset.interactionCount = 0; // Initialize interaction count

    // Add hover effect to change background color
    div.addEventListener('mouseover', changeColor);
  
    container.appendChild(div);
  }
}

// Function to change color of grid square
function changeColor(e) {
  let square = e.target;
  let interactionCount = parseInt(square.dataset.interactionCount);

  // Increase the interaction count
  if (interactionCount < 10) {
    interactionCount++;
    square.dataset.interactionCount = interactionCount;

    // Generate a random color for the square
    let baseColor = randomColor();

    // Set the background color using the base color
    square.style.backgroundColor = `rgb(${baseColor.r}, ${baseColor.g}, ${baseColor.b})`;

    // Set the opacity based on the interaction count
    square.style.opacity = interactionCount / 10; // Ranges from 0 to 1
  }
}

// Function to generate random RGB values for color
function randomColor() {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256)
  };
}
