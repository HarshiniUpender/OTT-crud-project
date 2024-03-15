import { ObjectId } from "mongodb";

export async function updateMovie(req: any, res: any) {
    try {
        const { db } =  req.app;
        const { id } = req.params;
        const {userRole, title, genre, rating, streamingLink} = req.body;
        
        if(userRole.toLowerCase() === 'admin'){
            const result = await db.collection('movies').updateOne({ _id : new ObjectId(id) }, 
                {
                $set: {
                    title: title,
                    genre: genre,
                    rating: rating, 
                    streamingLink: streamingLink,
                }
            });
            res.status(200).json({ message : 'Updated the movie.' });
        } else{
            res.status(200).json({ message : 'User does not have admin access to update a movie.' });
        }
    } catch (error) {
        res.status(500).json({ error : error.toString() });
    }
}