import ePub from './epub';
import Book from './book';

const test = () => {

    const epub = ePub("https://s3.amazonaws.com/moby-dick/moby-dick.epub");
    const book = new Book("https://s3.amazonaws.com/moby-dick/moby-dick.epub", {});
}

test();