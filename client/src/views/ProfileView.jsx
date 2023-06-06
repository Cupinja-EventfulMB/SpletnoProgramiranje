import { useState, useEffect } from "react";
import useUser from "api/useUser";
import Button from "components/form/Button";

import Gradient from "components/Gradient";

const ProfileView = ({userId}) => {
    const {getUser, getUserEvents} = useUser()
    const [user, setUser] = useState(null);
    const [going, setGoing] = useState(null);
    const [interested, setInterested] = useState(null);
    const [visited, setVisited] = useState(null)

    useEffect(() =>{
        getUser(userId).then((usr) => {
            setUser(usr);            
        })
        getUserEvents(userId).then((events) => {
            setGoing(events.going)
            setInterested(events.interested)
            setVisited(events.visited)
        })
    }, [])

    //TODO server/routes/userRoute.js -> add router.get("/:id/events", getUserEvents)
    //TODO server/controllers/userController.js -> add getUserEvents() -> (returns {going:{}, interested:{}, visited:{}})


    return ( 
        <>
            <Gradient title={"Welcome to the Events App"}
            subtitle={"Welcome to the Events App"}
            />
            <div className="">
                <div className="">Going events:</div>
                <div className="">Interested events:</div>
                <div className="">Recently visited events:</div>
            </div>
            <div className="">
                <div className="">Activity this year</div>
                <div className="">Activity based by category</div>
            </div>
            <div class="">
                <Button primary title="Edit your profile" />
            </div>
        </> 
    );
}
 
export default ProfileView;