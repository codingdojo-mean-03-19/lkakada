export class Author {
    _id: String;
    name: String;
    quotes: [
        {
            _id: String;
            content: String;
            votes: Number;
        }
    ]
}