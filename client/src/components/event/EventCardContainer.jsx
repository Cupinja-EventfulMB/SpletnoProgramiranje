import EventCard from "./EventCard";
const EventCardContainer = ({ events, title, max }) => {
  console.log(events);
  if (!events || events.length == 0) return <div>No events</div>;
  return (
    <>
      <h1 className="text-2xl font-semibold py-4">{title}</h1>
      <div className="w-full flex flex-row gap-8 flex-wrap mb-7">
        {events.slice(0, max).map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </>
  );
};

export default EventCardContainer;
