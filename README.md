# Personal_Website

This is a JavaScript code that implements a Candy Crush-style game. The game board is an 8x8 grid of candy-colored squares, where the player can drag and swap adjacent candies to form horizontal or vertical lines of at least three candies of the same color, which will disappear, giving the player points.

The game has four categories: journey, CV, projects, and contact, each represented by a progress bar with a score displayed below it. The player needs to fill each progress bar by scoring points through candy matching, and once a progress bar is full, a "show" button appears that displays information about the corresponding category.

The code creates the game board, sets up event listeners for drag-and-drop functionality, handles the mechanics of candy swapping and matching, and updates the scores and progress bars. The createBoard() function creates the grid and populates it with random candy colors. The dragStart(), dragEnd(), dragOver(), dragEnter(), dragLeave(), and dragDrop() functions handle the drag-and-drop mechanics, determining the validity of moves and swapping candies accordingly. The moveIntoSquareBelow() function handles the dropping of candies once some have been cleared.

The fillBar() function updates the progress bar and score of each category based on the number of points scored. The showButton event listener, when triggered, shows the "show" button for each category when the progress bar is full.