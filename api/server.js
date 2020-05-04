import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import books from './data/books.json'

const app = express()

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('ello ello'))

app.get('/books', (req, res) => {
    let orderedBooks = books
    const order = req.query.order
    const page = +req.query.page || 1
    let selectedPage = orderedBooks.slice((page * 20) - 20, page * 20)

    if (order === 'highest') {
        orderedBooks = orderedBooks.sort((a, b) => (a.average_rating > b.average_rating) ? -1 : 1)
        selectedPage = orderedBooks.slice((page * 20) - 20, page * 20)
        res.json(selectedPage)
    } else if (order === 'lowest') {
        orderedBooks = orderedBooks.sort((a, b) => (a.average_rating > b.average_rating) ? 1 : -1)
        selectedPage = orderedBooks.slice((page * 20) - 20, page * 20)
        res.json(selectedPage)
    } else if (order === 'longest') {
        orderedBooks = orderedBooks.sort((a, b) => (a.num_pages > b.num_pages) ? -1 : 1)
        selectedPage = orderedBooks.slice((page * 20) - 20, page * 20)
        res.json(selectedPage)
    } else if (order === 'shortest') {
        orderedBooks = orderedBooks.sort((a, b) => (a.num_pages > b.num_pages) ? 1 : -1)
        selectedPage = orderedBooks.slice((page * 20) - 20, page * 20)
        res.json(selectedPage)
    } else {
        orderedBooks = orderedBooks.sort((a, b) => (a.bookID > b.bookID) ? 1 : -1)
        selectedPage = orderedBooks.slice((page * 20) - 20, page * 20)
        res.json(selectedPage)
    }

})
app.get('/authors/:author', (req, res) => {
    const author = req.params.author.toLowerCase()
    const selectedAuthor = books.filter((book) => book.authors.toLowerCase().replace(' ', '_').includes(author))
    res.json(selectedAuthor)
})

app.put('/books/:id', (req, res) => {
    const id = req.params.id
    const foundBook = books.find((book) => book.bookID === +id)
    foundBook.image_url = req.body.image_url
    res.send(foundBook)
})

app.listen(4000, () => console.log('App listening on port 4000'))