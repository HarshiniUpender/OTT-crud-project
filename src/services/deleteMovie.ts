import { ObjectId } from "mongodb";

export async function deleteMovie(req: any, res: any) {
    try {
        const { db } =  req.app;
        const { id } = req.params;
        const {userRole} = req.body;
        if(userRole.toLowerCase() === 'admin'){
            const result = await db.collection('movies').deleteOne({ _id : new ObjectId(id) });
            if(result.deletedCount === 1){
                res.status(200).json({ message : 'Deleted the movie.' });
            } else {
                res.status(200).json({ message : 'No movie with the input id exists!.' });
            }
        } else{
            res.status(200).json({ message : 'User does not have admin access to delete a movie.' });
        }
    } catch (error) {
        res.status(500).json({ error : error.toString() });
    }
}