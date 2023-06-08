import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useUser from "api/useUser";
import Button from "components/form/Button";
import * as d3 from "d3"; 
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import Gradient from "components/Gradient";
import EventCardContainer from "components/event/EventCardContainer";

const ProfileView = () => {
  const { userId } = useParams();
  const { getUser, getUserEvents } = useUser();
  const [user, setUser] = useState(null);
  const [going, setGoing] = useState(null);
  const [interested, setInterested] = useState(null);
  const [visited, setVisited] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    getUser(userId).then((usr) => {
      setUser(usr);
      console.log(usr);
    });
    getUserEvents(userId).then((events) => {
      setGoing(events.going);
      setInterested(events.interested);
      setVisited(events.visited);
      console.log(events);
    });
  }, []);

  useEffect(() => {
    if (going && interested && visited) {
      const data = [
        { category: "Going", count: going.length },
        { category: "Interested", count: interested.length },
        { category: "Visited", count: visited.length },
      ];
  
      d3.select("#chart").selectAll("*").remove();
  
      const width = 500;
      const height = 300;
      const margin = { top: 30, right: 30, bottom: 40, left: 40 };
  
      const svg = d3
        .select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
  
      const xScale = d3
        .scaleBand()
        .domain(data.map((d) => d.category))
        .range([margin.left, width - margin.right])
        .padding(0.1);
  
      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.count)])
        .range([height - margin.bottom, margin.top]);
  
      
      svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => xScale(d.category))
        .attr("y", (d) => yScale(d.count))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => height - margin.bottom - yScale(d.count))
        .attr("rx", 15) 
        .attr("ry", 10)
        .attr("fill", (d, i) => `rgb(250, ${i * 30}, ${i * 30})`) 
  
      svg
        .append("g")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(xScale));
  
      svg
        .append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(
          d3
            .axisLeft(yScale)
            .tickValues(d3.range(d3.min(data, (d) => d.count), d3.max(data, (d) => d.count) + 1))
        );
    }
  }, [going, interested, visited]);   
  
  useEffect(() => {
    if (going && interested && visited) {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const eventsThisMonth = going.concat(interested, visited).filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getMonth() === currentMonth;
      });
  
      const data = [
        { category: "Going This Month", count: going.filter(event => new Date(event.date).getMonth() === currentMonth).length },
        { category: "Interested This Month", count: interested.filter(event => new Date(event.date).getMonth() === currentMonth).length },
        { category: "Visited This Month", count: visited.filter(event => new Date(event.date).getMonth() === currentMonth).length }
      ];
  
      d3.select("#chart-this-month").selectAll("*").remove();
  
      const width = 500;
      const height = 300;
      const margin = { top: 30, right: 30, bottom: 40, left: 40 };
  
      const svg = d3
        .select("#chart-this-month")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
  
      const xScale = d3
        .scaleBand()
        .domain(data.map((d) => d.category))
        .range([margin.left, width - margin.right])
        .padding(0.1);
  
      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.count)])
        .range([height - margin.bottom, margin.top]);
  
      svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => xScale(d.category))
        .attr("y", (d) => yScale(d.count))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => height - margin.bottom - yScale(d.count))
        .attr("rx", 15)
        .attr("ry", 10)
        .attr("fill", (d, i) => `rgb(232, 129, ${i * 30})`) 
  
      svg
        .append("g")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(xScale));
  
      svg
        .append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(yScale).tickValues(d3.range(d3.min(data, (d) => d.count), d3.max(data, (d) => d.count) + 1)));
      
    }
  }, [going, interested, visited]);   

  return (
    <>
      <Gradient title={"Welcome to the Events App"} subtitle={"Welcome to the Events App"} />
      <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "25px", marginTop: "15px", marginBottom: "5px" }}>
        <Button primary title="Edit your profile" />
      </div>
      <div className="flex">
        <div className="w-2/5 ml-20 overflow-y-auto max-h-screen" id="profile-scroll">
          <EventCardContainer title={"Going"} events={going} />
          <EventCardContainer title={"Interested"} events={interested} />
          <EventCardContainer title={"Visited"} events={visited} />
        </div>
        <div className="ml-20 w-3/5 flex flex-col">
        <h2 className="font-semibold">Your events data</h2>
          <div className="flex-1" id="chart">
            {/* events data */}
          </div>
          <h2 className="font-semibold">Your events data for this month</h2>
          <div className="flex-1" id="chart-this-month">
            {/* events this month */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileView;