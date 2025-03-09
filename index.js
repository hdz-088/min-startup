// // Object containing key-value pairs for shortcuts.
// // Keys are single-letter shortcuts, and values are URLs or objects with a URL and an alias.
// const links = {
//   q: {
//     href: "https://drive.google.com/",
//     alias: "drive",
//   },
//   w: {
//     href: "https://mail.google.com/mail/u/0/",
//     alias: "gmail",
//   },
//   a: "https://youtube.com",
//   s: "https://github.com",
//   d: "https://chatgpt.com",
//   z: {
//     href: "https://sounotes.vercel.app/",
//     alias: "SOUNotes",
//   },
//   c: {
//     href: "https://classroom.google.com/c/NjE2OTM2Mzk2MTUy",
//     alias: "classroom",
//   },
// };

// /**
//  * Function to extract the last letter from a given key event string.
//  * This ensures compatibility across different keyboard event codes.
//  *
//  * @param {string} key - The key event string (e.g., "KeyA").
//  * @returns {string} - The extracted lowercase letter.
//  */
// const key_to_letter = (key) => {
//   return key[key.length - 1].toLowerCase().toString();
// };

// // Run this script when the DOM is fully loaded.
// document.addEventListener("DOMContentLoaded", () => {
//   // Listen for keypress events
//   window.addEventListener("keypress", (e) => {
//     // Get the corresponding link based on the pressed key
//     const link = links[key_to_letter(e.code)];

//     if (link) {
//       // If the link is an object, extract the `href`; otherwise, use it as is.
//       const url = typeof link === "object" ? link.href : link;
//       // Redirect the browser to the URL
//       window.location.href = url;
//     }
//   });

//   // Get the list element where shortcuts will be displayed
//   const list_element = document.getElementById("list");

//   // Iterate over the `links` object to generate a list of shortcuts
//   for (const [key, value] of Object.entries(links)) {
//     let list_item = document.createElement("li"); // Create list item
//     let list_link = document.createElement("a"); // Create anchor element

//     // Determine display title: use alias if value is an object; otherwise, format the URL
//     let display_title =
//       typeof value === "object"
//         ? value.alias
//         : value.replace("https://", "").replace(/\.[a-zA-Z0-9]+$/, "");

//     // Set link text to show the shortcut key and the website name/alias
//     list_link.innerText = `[${key}] ${display_title}`;

//     // Assign the correct href value based on whether `value` is an object or string
//     list_link.href = typeof value === "object" ? value.href : value;

//     // Append the anchor element to the list item
//     list_item.appendChild(list_link);

//     // Append the list item to the unordered list element in the DOM
//     list_element.appendChild(list_item);
//   }
// });

/**
 * Extract the last letter from a given key event string.
 * @param {string} key
 * @returns {string}
 */
const key_to_letter = (key) => {
  return key[key.length - 1].toLowerCase();
};

// Function to load links.json and initialize event listeners
const loadLinks = async () => {
  try {
    const response = await fetch("links.json"); // Fetch JSON file
    const links = await response.json(); // Parse JSON

    // Keypress event listener to open links
    window.addEventListener("keypress", (e) => {
      const link = links[key_to_letter(e.code)];
      if (link) {
        const url = typeof link === "object" ? link.href : link;
        window.location.href = url;
      }
    });

    // Populate the list with links
    const list_element = document.getElementById("list");
    for (const [key, value] of Object.entries(links)) {
      let list_item = document.createElement("li");
      let list_link = document.createElement("a");

      let display_title =
        typeof value === "object"
          ? value.alias
          : value.replace("https://", "").replace(/\.[a-zA-Z0-9]+$/, "");

      list_link.innerText = `[${key}] ${display_title}`;
      list_link.href = typeof value === "object" ? value.href : value;

      list_item.appendChild(list_link);
      list_element.appendChild(list_item);
    }
  } catch (error) {
    console.error("Error loading links.json:", error);
  }
};

// Load links.json when the page is fully loaded
document.addEventListener("DOMContentLoaded", loadLinks);
