import faker from 'Faker';
import uuid from 'uuid';

export function randomPosts(page = 1, itemPerPage = 10, totalItem = 100){
    var posts : Array<PostType> = [];
    for(var i = 0; i < 20; i++){
        posts.push({
            id: uuid.v4(),
            title: faker.Lorem.words(7).join(' '),
            description: faker.Lorem.sentence(6),
            content: faker.Lorem.paragraphs(10),
            user: {
                id: uuid.v4(),
                username: faker.Name.firstName(),
                fullname: faker.Name.lastName()
            }
        })
    }
    return {
        data: posts.slice(0, itemPerPage),
        pagination: {
            totalItem,
            itemPerPage,
            page
        }
    };
}