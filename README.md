# Notes Filesystem App

## Running the code

1. If you don’t have it please install [node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
2. Run `npm install` in the project directory.
3. Run `npm run dev` in the project directory.
4. The app should now be running on `localhost:3030` so put that into your web browser and try it out.


## Provided code

**Items**

An **Item** can be either a **Note** or a **Directory**. A **Note** is a leaf node in the filesystem and contains a string of text. A **Directory** is a node in the filesystem that can contain other **Items**. The root of the filesystem is a **Directory**.

Schema:

| **Field** | **Type**              | **Description**                                                                                       |
|-----------|-----------------------|-------------------------------------------------------------------------------------------------------|
| type      | ‘note’ \| ‘directory’ | Defines whether an Item is a Note or Directory.                                                       |
| name      | string                | The name associated with the Item.                                                                    |
| parent    | Item \| undefined     | A reference to the parent of this Item.   undefined for the `root` directory.                         |
| note      | string \| undefined   | The actual notes text that the user can set for `Note` items.   undefined when `type == ‘directory’`. |
| items     | Item[] \| undefined   | The items in this directory if the item is a `Directory`.   undefined when `type == ‘note’`.          |

This is defined in `app/components/types.ts`.

**Components**

* `ReactApp (app/components/reactApp.tsx)` - The main component that renders the app.
* `Workspace (app/components/workspace.tsx)` - The component that renders the filesystem.
  * This component provides a `React.Context` through which child components can filesystem methods and state.
* `ItemView (app/components/workspace.tsx)` - The component which renders an individual Item.
  * This component is checks the type and renders the correct component for the Item type (Note or Directory).
* `noteView (app/components/noteView.tsx)` - The component which renders a Note.
* `directoryView (app/components/directoryView.tsx)` - The component which renders a Directory.

**React Context**

The `Workspace` component provides a `React.Context` through which child components can filesystem methods and state. This is defined in `app/components/workspace.tsx`.

| **Field**      | **Type**     | **Description**                                                                            |
|----------------|--------------|--------------------------------------------------------------------------------------------|
| currentItem    | Item \| null | The current item rendered in the `Workspace`.                                              |
| setCurrentItem | Function     | Sets the current item to a different item.                                                 |
| addNote        | Function     | Creates a new note given a `fileName` and `noteText`, if the `currentItem` is a directory. |
| addDirectory   | Function     | Creates a new directory given a `newDirName`, if the `currentItem` is a directory.         |
| updateNote     | Function     | Updates the `note` text of the `currentItem`, if it is a note.                             |

**Challenges Faced**
1. Windows XP UI Theme: The program UI was designed using the Windows XP look, which requires a keen eye for detail. Matching the styles, typefaces, icons, and general look and feel of Windows XP while maintaining current usability and responsiveness presented a unique challenge.

2. Context Menu for Directories and Notes: Creating a right-click context menu that adjusts dynamically based on whether a directory or a note was clicked was a challenge. We handled this by setting context state when a right-click event occurs and then displaying options accordingly.

3. Recursive Directory Navigation: Handling the recursive nature of directories and allowing for deep nested navigation required careful state management and prop drilling.

4. Audio Playback on Boot: Autoplay policies in modern browsers meant that audio wouldn't play automatically on page load. We implemented various solutions and fallbacks to ensure the audio plays, considering user interactions.


**Future Improvements:**
1. Drag and Drop: Implement a drag and drop feature for moving files and directories.

2. Search Functionality: Allow users to search for specific notes or directories.

3. Improved Audio Handling: Use an audio library or further refine the audio handling to ensure consistent behavior across all browsers and devices.

4. Advanced Context Menus: Implement more advanced context menu features such as "Copy", "Paste", and "Move To".

**Major Libraries Used:**
1. react: For building the user interface.
2. next: For routing and image optimizations.
3. lodash: Utility library for deep cloning and other utilities.
4. date-fns: Modern JavaScript date utility library.
5. react-icons: Easily include popular icons in your React projects.
6. react-modal: Accessible modal dialog component for React.
7. xp.css: Modern CSS framework with Windows XP styles.

## Support

If you enjoyed Notes Filesystem App and would like to support the development, consider buying me a coffee! ☕️

[![Buy Me a Coffee](https://camo.githubusercontent.com/12f516d86d600c89a6abd2326256045c27325ad7c8532c0d36772965a4923be0/68747470733a2f2f7777772e6275796d6561636f666665652e636f6d2f6173736574732f696d672f637573746f6d5f696d616765732f6f72616e67655f696d672e706e67)](https://www.buymeacoffee.com/kairavpateu)

Your support helps keep the adventure alive! 🚀
