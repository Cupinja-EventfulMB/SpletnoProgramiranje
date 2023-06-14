import EventCard from "./EventCard";
const EventCardContainer = ({ events, title }) => {
  return (
    <>
      <h1 className="text-2xl font-semibold py-4">{title}</h1>
      <div className="w-full flex flex-row gap-8">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </>
  );
};

export default EventCardContainer;
