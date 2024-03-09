export async function searchMovie(req: any, res: any) {
    try {
        const { db } =  req.app;
        
        const { title, genre } = req.query;
        const result = title ? 
        await db.collection('movies').findOne({ title: title }) 
        : await db.collection('movies').find({ genre: genre }).toArray();
        if(result){
            res.status(200).json({ message : 'Retrieved the movie(s).', movies: result });
        } else{
            res.status(200).json({ message : 'No movie(s) found.' });
        }

    } catch (error) {
        res.status(500).json({ error : error.toString() });
    }
}