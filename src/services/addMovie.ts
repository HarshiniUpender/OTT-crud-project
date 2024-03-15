export async function addMovie(req: any, res: any) {
    try {
        const {userRole, title, genre, rating, streamingLink} = req.body;
        if(userRole.toLowerCase() === 'admin'){
            if(!title || !genre){
                res.status(200).json({ message : 'Title or genre of the movie is missing, please add a value!' });
                return;
            }
            const { db } =  req.app;
            const movieExists = await db.collection('movies').findOne({
                title: title,
            });
            if(movieExists){
                res.status(200).json({ message : 'Movie already exists!' });
                return;
            }
            const result = await db.collection('movies').insertOne({
                title,
                genre,
                rating, 
                streamingLink,
            });
            console.log(result);
            if(result.acknowledged){
                res.status(200).json({ message : 'Movie is added to the lobby!' });
            } else {
                throw new Error('Movie was not added.')
            }
        } else{
            res.status(200).json({ message : 'User does not have admin access to add a movie.' });
        }
    } catch (error) {
        res.status(500).json({ error : error.toString() });
    }
}