import { main } from '../src/index';
import request from 'supertest';


describe('Testing for the OTT endpoints', () => {
    let app: any;

    beforeAll(async () => {
        app  = await main();
    });

    afterAll(async () => {
        console.log('Testing done!');
        
    });
    
    // Adding a movie.
    it('Should add a movie', async () => {
        const movieData = {
            userRole: 'admin',
            title: 'Test Movie1.0',
            genre: 'Test Genre1.0',
            rating: 5,
            streamingLink: 'http://example.com'
        };

        const response = await request(app)
            .post('/movies')
            .send(movieData)
            .expect(200);

        expect(response.body).toEqual({ message: 'Movie is added to the lobby!' });
    });

    it('Should not add a movie as user does not have admin access', async () => {
        const movieData = {
            userRole: 'user',
            title: 'Test Movie',
            genre: 'Test Genre',
            rating: 5,
            streamingLink: 'http://example.com'
        };

        const response = await request(app)
            .post('/movies')
            .send(movieData)
            .expect(200);

        expect(response.body).toEqual({ message: 'User does not have admin access to add a movie.' });
    });

    // Deleting a movie.
    it('Should delete a movie', async () => {
        const movieData = {
            userRole: 'admin',
        };

        const response = await request(app)
            .delete('/movies/65ee6b73ac7d41ddc10761a1')
            .send(movieData)
            .expect(200);

        expect(response.body).toEqual({ message: 'No movie with the input id exists!.' });
    });

    it('Should not delete a movie as user does not have admin access', async () => {
        const movieData = {
            userRole: 'user',
        };

        const response = await request(app)
            .delete('/movies/65ec30d6b7bfecbd4acd609c')
            .send(movieData)
            .expect(200);

        expect(response.body).toEqual({ message: 'User does not have admin access to delete a movie.' });
    });

    // Listing movies in lobby.
    it('Should list all the movies', async () => {

        const response = await request(app)
            .get('/movies')
            .expect(200);

        expect(response.body.message).toEqual('Listed all the movies.');
    });


    // Search a movie.
    it('Should search a movie', async () => {
        const response = await request(app)
            .get('/movies/search?title=BTS')
            .expect(200);

        expect(response.body.message).toEqual('Retrieved the movie(s).');
    });

    // Update a movie.
    it('Should update a movie', async () => {
        const movieData = {
            userRole: 'admin',
            title: 'Test Movie2',
            genre: 'Test Genre2',
            rating: 5,
            streamingLink: 'http://example.com'
        };

        const response = await request(app)
            .put('/movies/65f41cb86ea0c6a0d30c8433')
            .send(movieData)
            .expect(200);

        expect(response.body).toEqual({ message: 'Updated the movie.' });
    });

    it('Should not update a movie as user does not have admin access', async () => {
        const movieData = {
            userRole: 'user',
            title: 'Test Movie3',
            genre: 'Test Genre3',
            rating: 5,
            streamingLink: 'http://example.com'
        };

        const response = await request(app)
            .put('/movies/65f41cb86ea0c6a0d30c8433')
            .send(movieData)
            .expect(200);

        expect(response.body).toEqual({ message: 'User does not have admin access to update a movie.' });
    });

});
