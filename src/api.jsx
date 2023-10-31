import axios from 'axios';

const baseURL = 'http://localhost:8080/RanBookstoreReactState/api'; // Replace with your actual API URL
// const baseURL = 'http://webdev.cs.vt.edu:8080/RanBookstoreReactState/api'; // Replace with your actual API URL
/**
 *
 * categories/name/Mystery
 * categories/name/Mystery/books
 * categories/name/Mystery/suggested-books
 * categories/name/Mystery/suggested-books?limit=2
 */

/**
 * Function to fetch a list of categories
 * @returns {Promise<any>}
 */
export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${baseURL}/categories`);
        return response.data;
    } catch (error) {
        // Handle error or throw it to be caught by the action
        throw error;
    }
};

/**
 * Function to fetch book list by ID
 * @param categoryName
 * @returns {Promise<any>}
 */
export const fetchBookList = async (categoryName) => {
    try {
        const response = await axios.get(`${baseURL}/categories/name/${categoryName}/books`);
        return response.data;
    } catch (error) {
        // Handle error or throw it to be caught by the action
        throw error;
    }
};

/**
 * Function to fetch suggest book list by ID
 * @param categoryName
 * @returns {Promise<T>}
 */
export const fetchSuggestBookList = async (categoryName, count = 4) => {
    try {
        const response = await axios.get(`${baseURL}/categories/name/${categoryName}/suggested-books?limit=${count}`);
        return response.data;
    } catch (error) {
        // Handle error or throw it to be caught by the action
        throw error;
    }
};


/**
 * Function to fetch book details by ID
 * @param bookId
 * @returns {Promise<T>}
 */
export const fetchBookDetails = (bookId) => {
    return axios.get(`${baseURL}/books/${bookId}`)
        .then((response) => response.data)
        .catch((error) => {
            // Handle error or throw it to be caught by the action
            throw error;
        });
};

// Function to add a book to the user's cart
export const addToCart = (bookId, userId) => {
    const data = {bookId, userId};
    return axios.post(`${baseURL}/cart/add`, data)
        .then((response) => response.data)
        .catch((error) => {
            // Handle error or throw it to be caught by the action
            throw error;
        });
};

// More API functions for user authentication, orders, etc.
