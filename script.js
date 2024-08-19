const hexagons = document.querySelectorAll('.hexagon input');

hexagons.forEach(input => {
  input.addEventListener('input', (event) => {
    // Validate input (optional)
    const validChar = /^[a-zA-Z]+$/.test(event.target.value);
    if (!validChar) {
      // Display error message or highlight invalid input
      console.error('Invalid input: Only letters allowed');
      return;
    }
    
    // Update input visually (optional)
    event.target.value = event.target.value.toUpperCase(); // Automatic capitalization
  });
});

findSolutionsButton.addEventListener('click', () => {
    console.log('Button clicked');
  const letters = Array.from(document.querySelectorAll('.hexagon input')).map(input => input.value.toLowerCase());
  const centerLetter = letters.shift(); // Remove the center letter

  // Update the URL to your dictionary location
  const dictionaryUrl = 'https://raw.githubusercontent.com/kyhuber/bee-solver/blob/main/words_dictionary.json';

  fetch(dictionaryUrl)
    .then(response => response.json())
    .then(wordList => {
      const solutions = wordList.filter(word => {
        // Check if the word meets the criteria
        return word.length >= 4 &&
          word.includes(centerLetter) &&
          word.split('').every(letter => letters.includes(letter));
      });

      // Display the solutions
      results.innerHTML = solutions.join('<br>');
    })
    .catch(error => {
      console.error('Error fetching word list:', error);
    });
});