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
export interface categoryProps {
  categoryList: CategoryItem[]
}
export interface bookProps {
  bookList: BookItem[]
}
