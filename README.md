## Notes

This was one of my first projects when first learning javascript. This and Wordle. I didn't (and still really don't) know git and github that well. I am starting to upload them for git and github practice, and maybe to show to get help when needed.

## Issues

- set up to switch between players
- beginning if can't get on board but try to stay tell why can't stay
- Need a way of tell player to keep rolling if all 6 are on top
- when all 6 are up top if I hit roll I get zilch instead of a new set of rolls
- make notes about what everything does
- need to update notes on preRollCheck()
- need current score to show while playing. right now it only shows potential score

# How To Play

Versions vary so this is my version.
You have six dice. The goal is to get 10,000 (which is what the game is also called)
You have to roll at least 500 to get on the board to start.

# Rules

The points work if
You roll a 1 or a 5. 1 == 100 5 = 50;
You must at least roll a 1 or a 5 or you get zilch(nothing).
If it is a 1 on any of the 3 to 6 of a kind make the 1 a 10 then multiply so 3 of a kind would be 1000
Other ways of points are, must be done in one roll:

- 3 of a kind = the number on the die x 1
- 4 of a kind = the number on the die x 2
- 5 of a kind = the number on the die x 3
- 6 of a kind = the number on the die x 4
- straight = 1500 (has to be done on the very first roll)
- 3 pairs = 1500 (has to be done on the very first roll)

If you don't roll any of the above and get zilch(nothing) you lose all points you rolled and it's the next person's turn. If you rolled all 6 dice and got points you continue and roll all the dice over while keeping the points you have accumulated.
After you get on the board (500) You can stop and keep what points you have made except if you had rolled all 6 then you must roll to continue.

# Side note

I'm sure I have missed something or my points may not even match what I wrote. Just another issue to fix :p

## pseudo code

- show welcome screen with option how many players. option to enter name or create random ones
- maybe limit number of players. 4 maybe 6
- after you hit stay move to next player.
- have players names on the outside of the board with their name and score. get fancy add a pic
- give a delayed zilch across the screen when you lose turn
