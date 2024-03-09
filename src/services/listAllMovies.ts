export async function listAllMovies(req: any, res: any) {
    try {
        const { db } =  req.app;
        const result = await db.collection('movies').find().toArray();
        if(result){
            res.status(200).json({ message : 'Listed all the movies.', movies: result });
        } else{
            res.status(200).json({ message : 'No movies in the lobby yet!' });
        }
    } catch (error) {
        res.status(500).json({ error : error.toString() });
    }
}