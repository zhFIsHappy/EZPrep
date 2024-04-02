export enum SenderType {
    SELF,
    AI,
    OTHER
}

export interface ChatMessage {
    sender: SenderType;
    content: string;
}

export interface RegisterForm {
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
    salt: string;

    // constructor() {
    //     this.username = "";
    //     this.email = "";
    //     this.password = "";
    //     this.salt = "";
    // }
}

export interface PreferenceItem {
    question: string;
    options: string[];
}

export interface SuggestionItem {
    suggestion: string;
    value: any;
}

export interface SelectedPreference {
    difficulty: string;
    language: string;
    time: number;
}


export interface BookItem {
    description: string;
    bookId: number;
    title: string;
    author: string;
    price: string;
    imageUrl: string;
    isPublic: boolean;
}

export interface CategoryItem {
    categoryId: string;
    name: string;
}

// export interface categoryProps {
//     categoryList: CategoryItem[]
// }

export interface bookProps {
    bookList: BookItem[]
}


//this interface represents the items(books) in our shopping cart
export class ShoppingCartItem {
    id: number;
    book: BookItem;
    quantity: number;

    constructor(theBook: BookItem) {
        this.id = theBook.bookId;
        this.book = theBook;
        this.quantity = 1;
    }
}

// this is used by the reducer. You can define it on the CartReducer
export const initialCartState: ShoppingCartItem[] = [];

