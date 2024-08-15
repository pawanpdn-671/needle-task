# Firebase Project Documentation

## Introduction

This document provides a detailed explanation of the Firestore data structure and security rules, an idea to include Nodejs function, and an outline of the unit test approach for the project.

### Firestore Document Structure

Here are the screenshots that illustrate the structure of the Firestore database:
![Firestore User Document](<./written_task_src/Screenshot%20(66).png>)

### Document Fields:

![Firestore field1](<./written_task_src/Screenshot%20(67).png>)

-  **`favoriteBreeds` (Array of Strings):**
   -  This array stores the names of the user's selected favorite dog breeds. Each element in the array is a string representing a breed name.
   -  **Example:**
      ```json
      "favoriteBreeds": ["affenpinscher", "african", "appenzeller"]
      ```

![Firestore field2](<./written_task_src/Screenshot%20(68).png>)
![Firestore field2](<./written_task_src/Screenshot%20(69).png>)

-  **`likedPhotos` (Array of Objects):**
   -  This array stores objects where each object represents a photo that the user has liked. Each object (or map) contains the following fields:
      -  `breedName` (String): The breed of the dog in the liked photo.
      -  `likedAt` (String, Timestamp): The date and time when the photo was liked.
      -  `photoUrl` (String): The URL of the liked photo.
   -  **Example:**
      ```json
      "likedPhotos": [
        {
          "breedName": "affenpinscher",
          "likedAt": "2024-08-15T13:59:11.385Z",
          "photoUrl": "https://images.dog.ceo/breeds/affenpinscher/n02110627_10185.jpg"
        },
        {
          "breedName": "affenpinscher",
          "likedAt": "2024-08-15T16:08:18.218Z",
          "photoUrl": "https://images.dog.ceo/breeds/affenpinscher/n02110627_10185.jpg"
        }
      ]
      ```

## Security Explanation

![Firestore security rule](<./written_task_src/Screenshot%20(70).png>)

### Firestore Security Rules

The security of the application is ensured through carefully crafted Firestore security rules, which regulate how data is accessed and manipulated. The primary focus is to ensure that users can only interact with their own data, thus preserving privacy and preventing unauthorized access.

### Example Firestore Security Rules

```plaintext
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Refactoring to Include a Node.js Firebase Function

To improve our app, we can create a Firebase Cloud Function using Node.js. This function will connect to the [Dog CEO API](https://dog.ceo/api/breeds/list/all) to get a list of all dog breeds, and then simplify this data into a single list of breed names.

### Approach

**Create a Firebase Cloud Function:**

-  **Purpose:** The function will make a request to the Dog CEO API to fetch all the dog breeds.
-  **Implementation:**
   -  Use a package like `axios` to send a GET request to the API.
   -  When the response is received, the function will extract just the breed names.
   -  These breed names will be combined into one simple list (array).

**Simplifying the Data:**

-  The Dog CEO API provides breed data in a nested format. For example:
   ```json
   {
   	"bulldog": ["boston", "english", "french"]
   }
   ```
-  The function will flatten this into a list like:
   ```javascript
   ["bulldog-boston", "bulldog-english", "bulldog-french"];
   ```
-  This makes it easier to use the data in the app.

**Triggering the Function:**

-  The function can be set to run automatically (e.g., once a day) or be triggered manually when needed. This keeps the breed list updated without requiring constant API calls.

**Storing Data in Firestore:**

-  After processing, the function stores the list of breed names in Firestore, so the app can easily access it.

### Considerations

-  **Error Handling:**

   -  If something goes wrong (like the API request fails), the function should handle it properly, maybe by trying again or logging the error for later review.

-  **Security:**

   -  Make sure only authorized users or tasks can run this function to keep it secure.

-  **Performance:**

   -  The function should be optimized to run quickly and efficiently, avoiding unnecessary delays.

-  **Scalability:**
   -  The solution should be able to handle different levels of traffic without any manual adjustments.

### Example of Data Simplification

If the API returns this data:

```json
{
  "bulldog": ["boston", "english", "french"]
}

The function will return this:
["bulldog-boston", "bulldog-english", "bulldog-french"]
```

## Unit Test Approach

Unit testing ensures that individual parts of our app function correctly.

### Testing Strategy

-  Prioritize testing key functions, such as data fetching, user input handling, and UI updates.
-  Test each function or component in isolation to quickly identify issues when a test fails.
-  Include tests for both typical scenarios and edge cases, such as API failures or invalid inputs.

### Example of a Key Test

One key test I would choose to write is to verify that a user can select a dog breed from the list and successfully add it to their list of favorite breeds. This functionality is central to the user experience, and ensuring it works correctly is vital.
