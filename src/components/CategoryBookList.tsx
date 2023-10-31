import CategoryBookListItem from './CategoryBookListItem';
import {BookItem, bookProps} from "../types";
import '../assets/css/CategoryBookList.css';


function CategoryBookList({bookList}: bookProps) {

    return (
        <ul className="book-lists">
            {bookList.map((book: BookItem) => (
                <CategoryBookListItem
                    key={book.bookId}
                    bookId={book.bookId}
                    isPublic={book.isPublic}
                    description={book.description}
                    imageUrl={book.imageUrl}
                    price={book.price}
                    title={book.title}
                    author={book.author}
                />
            ))}
        </ul>
    )
}

export default CategoryBookList;
