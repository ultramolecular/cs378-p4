/**
 * EventDisplay - A component for rendering a list of event cards.
 *
 * This component takes an array of event objects and displays them as a list of cards.
 * Each card includes details about the event such as its name, genre, artist(s),
 * date, venue, and an image that represents the event. If there are no events to
 * display, it renders a message indicating that no events are available.
 *
 * Props:
 * - events: Array of event objects. Each event object must include:
 *    - name: Name of the event (string).
 *    - dates: Object containing start date and time of the event.
 *    - url: URL for event details (string).
 *    - images: Array of event images, each with a URL.
 *    - _embedded: Object containing venue and attraction details.
 *
 * Example of an event object:
 * {
 *   name: "Concert ABC",
 *   dates: { start: { localDate: "2024-01-01", localTime: "20:00" } },
 *   url: "https://example.com/event/1",
 *   images: [ { url: "https://s1.ticktm.en/dam/a/063/eventImg.jpg" } ]
 *   _embedded: { venues: [{ name: "Venue XYZ" }],
 *                attractions: [{ name: "Artist ABC", 
 *                      classifications: [{ genre: { name: "Pop" } }] }] }
 * }
 */


/**
 * Formats the given YYYY-MM-DD date format to Month, Day Year format.
 * 
 * @param {String} dateString - Date in YYYY-MM-DD format.
 * 
 * @returns {String} The date in Month, Day Year format string.
 */
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * Formats the given HH:MM:SS 24-hour string into HH:MM (am/pm) format.
 * 
 * @param {String} timeString - Time in HH:MM:SS format.
 * 
 * @returns {String} Time in HH:MM (am/pm) format string.
 */
const formatTime = (timeString) => {
    // Handles undefined times, like 2+ day events or if time isn't specified
    if (!timeString) {
        return 'N/A';
    }

    const [hour, minute] = timeString.split(':');
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString(undefined, { timeStyle: 'short' });
};

const EventDisplay = ({ events }) => {
    if (!events || events.length === 0) {
        return <div>No events to display.</div>
    }
    
    return (
        <div className="event-display-container">
            {events.map((event) => {
                const { name, dates, url, images, _embedded } = event;
                const { venues, attractions } = _embedded;
                const genre = attractions?.[0]?.classifications?.[0]?.genre?.name;
                const artist = attractions?.map((attraction) => attraction.name).join(', ');
                const venueName = venues?.[0]?.name;
                const eventDate = formatDate(dates?.start?.localDate);
                const eventTime = formatTime(dates?.start?.localTime);
                const imgUrl = images[0]?.url;

                return (
                    <a href={url} target="_blank" rel="noopener noreferrer" key={event.id} className="event-card">
                        <h3>{name}</h3>
                        <p><b>Genre:</b> {genre}</p>
                        <p><b>Artist(s):</b> {artist}</p>
                        <p><b>Date:</b> {eventDate} @ {eventTime}</p>
                        <p><b>Venue:</b> {venueName}</p>
                        <img src={imgUrl} alt={name} style={{ width: "40%", height: "auto" }} />
                    </a>
                );
            })}
        </div>
    );
};

export default EventDisplay