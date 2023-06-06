import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useUser from "api/useUser";
import Button from "components/form/Button";

import Gradient from "components/Gradient";
import EventCardContainer from "components/event/EventCardContainer";

const ProfileView = () => {
    const {userId} = useParams()
    const {getUser, getUserEvents} = useUser()
    const [user, setUser] = useState(null);
    const [going, setGoing] = useState(null);
    const [interested, setInterested] = useState(null);
    const [visited, setVisited] = useState(null)

    useEffect(() =>{
        getUser(userId).then((usr) => {
            setUser(usr); 
            console.log(usr)           
        })
        getUserEvents(userId).then((events) => {
            setGoing(events.going)
            setInterested(events.interested)
            setVisited(events.visited)
            console.log(events)
        })
    }, [])

//TODO 
    
//⚠️ TESTING ⚠️
//test@test.com
//test
//api call: http://localhost:3001/user/647df0928280855f4faec661/events
//TODO add route for ⬇️
//client side: http://localhost:3000/user/647df0928280855f4faec661

    
    return ( 
        <>
            <Gradient title={"Welcome to the Events App"}
            subtitle={"Welcome to the Events App"}
            />
            <div className="container mx-auto">
                <EventCardContainer title={"Going"} events={going} />
                <EventCardContainer title={"Interested"} events={interested} />
                <EventCardContainer title={"Visited"} events={visited} />
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