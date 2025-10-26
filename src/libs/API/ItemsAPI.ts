import { Item } from "@/app/admin/types";

const API_URL = "http://localhost:8080/api/items"; // Base URL

export const searchItem = async (query: string): Promise<Item[]> => {
  const encodedQuery = encodeURIComponent(query);
  // Ensure this becomes http://localhost:8080/api/items/search?q=YOUR_QUERY
  const response = await fetch(`${API_URL}/search?q=${encodedQuery}`); 

  // Check if the response was successful BEFORE trying to parse JSON
  if (!response.ok) {
      // Log the response text to see the HTML
      const errorText = await response.text(); 
      console.error("Server responded with an error:", response.status, errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json(); // Only parse if response is ok
};

export const getItems = async (): Promise<Item[]> => {
    try {
        // Fetch from the base API URL (e.g., GET http://localhost:8080/api/items)
        const response = await fetch(API_URL); 
        
        if (!response.ok) {
           const errorText = await response.text();
           console.error("Failed to fetch items:", response.status, errorText);
           throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching items:", error);
        throw error;
    }
};

export const postItem = async (itemData: Omit<Item, "item_id">): Promise<Item> => {
  try {
    const response = await fetch(API_URL, { // POST goes to the base /api/items URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Send the form data (without id) as JSON
      body: JSON.stringify(itemData), 
    });

    if (!response.ok) {
      // If the server responded with an error, log it and throw an error
      const errorText = await response.text();
      console.error("Failed to post item:", response.status, errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response (the created item, including its new ID)
    const createdItem: Item = await response.json();
    console.log("Item created successfully:", createdItem);
    return createdItem; // Return the full item object from the backend

  } catch (error) {
    console.error("Error sending post request:", error);
    // Re-throw the error so the component knows something went wrong
    throw error; 
  }
};

export const updateItem = async (itemData: Item): Promise<Item> => {
    if (!itemData.item_id) {
        throw new Error("Item ID is required for updating.");
    }
    try {
        const response = await fetch(`${API_URL}/${itemData.item_id}`, { 
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemData), 
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Failed to update item ${itemData.item_id}:`, response.status, errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const updatedItemFromServer: Item = await response.json();
        console.log("Item updated successfully:", updatedItemFromServer);
        return updatedItemFromServer; 
    } catch (error) {
        console.error("Error sending PUT request:", error);
        throw error; 
    }
};

// export async function getItems() {
//         const res = await fetch("http://localhost:3000/admin/testItemData");
//         const data = await res.json();
//         return data;
// }

//export async function postItem(item : Omit<Item, "id">) {
  //      const res = await fetch("http://localhost:3000/admin/testItemData", {
    //        method : "POST",
      //      headers : { "Content-Type" : "application/json" },
          //  body : JSON.stringify(item),
        //});
    //}

// export async function searchItema(query : string) {
//         const res = await fetch(`http://localhost:3000/admin/ItemManagement?search=${query}`);
//         const data = await res.json();
//         return data;
//     }

// export async function updateItem(item: Item) {
//     const res = await fetch("http://localhost:3000/admin/testItemData", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(item),
//     });
// 
//     const data = await res.json();
//     return data;
// }

export async function deleteItemById() {
    
}