import firbase from '../../Firebase';

const chapters = [
    {id: '1', title: 'All of the changes to the language since ECMAScript 5', content: 'ab'},
    {id: '2', title: 'How the new class syntax relates to more familiar JavaScript concepts', content: 'ab'},
    {id: '3', title: 'Why iterators and generators are useful', content: 'ab'},
    {id: '4', title: 'How arrow functions are differ from regular functions', content: 'ab'},
    {id: '5', title: 'Additional options for storing data using sets, maps, and more', content: 'ab'},
    {id: '6', title: 'The power of inheriting from native types', content: 'ab'},
]

const books = [
    {
        id: '1',
        title: 'Khởi nghiệp tinh gọn lẹ',
        sub_title: 'Những bí quyết để khởi nghiệp trong thời gian ngắn nhất',
        photoURL: 'https://s3.amazonaws.com/titlepages.leanpub.com/ccie-spv4-comp-guide/large?1466705433',
        summary: "The service provider landscape has changed rapidly over the past several years. Networking vendors are continuing to propose new standards, techniques, and procedures for overcoming new challenges while concurrently reducing costs and delivering new services. Cisco has recently updated the CCIE Service Provider track to reflect these changes; this book represents the author's personal journey in achieving that certification.",
        about_book: "The service provider landscape has changed rapidly over the past several years. Networking vendors are continuing to propose new standards, techniques, and procedures for overcoming new challenges while concurrently reducing costs and delivering new services. Cisco has recently updated the CCIE Service Provider track to reflect these changes; this book represents the author's personal journey in achieving that certification.",
        author: {
            displayName: "Nicholas Russo",
            description: "The service provider landscape has changed rapidly over the past several years.",
            photoURL: 'https://s3.amazonaws.com/avatars.leanpub.com/avatars/761875/medium/nick_professional_square.jpg?1468410106'
        },
        chapters
    },
    {
        id: '2',
        title: 'Unintended Features',
        sub_title: 'Thoughts on thinking and life as a network engineer',
        photoURL: 'https://s3.amazonaws.com/titlepages.leanpub.com/unintendedfeatures/large?1467135429',
        summary: "So you’ve decided you want to be a network engineer—or you’re already you a network engineer, and you want to be a better engineer, to rise to the top, to be among the best, to… Well, you get the idea. The question is, how do you get from where you are now to where you want to be? This short volume is designed to answer just that question.",
        about_book: "The service provider landscape has changed rapidly over the past several years. Networking vendors are continuing to propose new standards, techniques, and procedures for overcoming new challenges while concurrently reducing costs and delivering new services. Cisco has recently updated the CCIE Service Provider track to reflect these changes; this book represents the author's personal journey in achieving that certification.",
        author: {
            displayName: "Nicholas Russo",
            description: "The service provider landscape has changed rapidly over the past several years.",
            photoURL: 'https://s3.amazonaws.com/avatars.leanpub.com/avatars/761875/medium/nick_professional_square.jpg?1468410106'
        },
        chapters
    },
    {
        id: '3',
        title: 'Mastering Advanced Scala',
        sub_title: 'Exploring the deep end of functional programming',
        photoURL: 'https://s3.amazonaws.com/titlepages.leanpub.com/mastering-advanced-scala/large?1474480027',
        summary: "So you’ve decided you want to be a network engineer—or you’re already you a network engineer, and you want to be a better engineer, to rise to the top, to be among the best, to… Well, you get the idea. The question is, how do you get from where you are now to where you want to be? This short volume is designed to answer just that question.",
        about_book: "The service provider landscape has changed rapidly over the past several years. Networking vendors are continuing to propose new standards, techniques, and procedures for overcoming new challenges while concurrently reducing costs and delivering new services. Cisco has recently updated the CCIE Service Provider track to reflect these changes; this book represents the author's personal journey in achieving that certification.",
        author: {
            displayName: "Nicholas Russo",
            description: "The service provider landscape has changed rapidly over the past several years.",
            photoURL: 'https://s3.amazonaws.com/avatars.leanpub.com/avatars/761875/medium/nick_professional_square.jpg?1468410106'
        },
        chapters
    },
    {
        id: '4',
        title: 'The DevOps 2.1 Toolkit: Docker Swarm',
        sub_title: 'Building, testing, deploying, and monitoring services inside Docker Swarm clusters',
        photoURL: 'https://s3.amazonaws.com/titlepages.leanpub.com/the-devops-2-1-toolkit/large?1473258356',
        summary: "So you’ve decided you want to be a network engineer—or you’re already you a network engineer, and you want to be a better engineer, to rise to the top, to be among the best, to… Well, you get the idea. The question is, how do you get from where you are now to where you want to be? This short volume is designed to answer just that question.",
        about_book: "The service provider landscape has changed rapidly over the past several years. Networking vendors are continuing to propose new standards, techniques, and procedures for overcoming new challenges while concurrently reducing costs and delivering new services. Cisco has recently updated the CCIE Service Provider track to reflect these changes; this book represents the author's personal journey in achieving that certification.",
        author: {
            displayName: "Nicholas Russo",
            description: "The service provider landscape has changed rapidly over the past several years.",
            photoURL: 'https://s3.amazonaws.com/avatars.leanpub.com/avatars/761875/medium/nick_professional_square.jpg?1468410106'
        },
        chapters
    }
]

export default class BookFirebase {
    getBookLists() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(books);
            }, 300);
        });
    }

    getBook(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(books.find((book) => book.id === id));
            }, 300);
        })
    }
}