# Backend

- Create a backend that interfaces with openai
    - This should be a single post request to their api
    - Takes an array of data which will include the function name and state
    - We will use a prompt and a set of functions in order for the assistant to create a skip state button to take you to your goal screen

- Create an openai assistant to handle the state management

# Front End
- Create a multi screen app with different goal screens
- Interact with the app by clicking around until reaching a goal screen
- Send that data to openai
    - most likely this will start out as a an array with a button name and description for proof of concept

# Data flow
- Data will be collected on the frontend and passed to the ai on the backend.
- This data will be button name and state change:
    - Right now that would look like this:\
    { \
    buttonName: string; // name of button either literal of functionality\
    stateChange: string; // what was the resulting change of state when the button was pressed\
      }
- Based off of the array of data your starting state array[0] and the state a user ended in array[x] the ai would make inferences on what you were trying to achieve.
    - array[x] would be the most important for example:\
    If a user opens the app navigates to the explore screen even though the app opens up to the home screen every time we would want the ai to realize that the user wants to go to the explore screen


