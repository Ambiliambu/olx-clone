import { createContext ,useState} from "react";

export const PostContext=createContext(null)

function Post({children}){
const [postDetails,setPostDetails]=useState()

    return (
        // <h1>Post</h1>
        <div>
    <PostContext.Provider value={{postDetails,setPostDetails}}>
        {children}
    </PostContext.Provider>
    </div>
    )
}
export default Post