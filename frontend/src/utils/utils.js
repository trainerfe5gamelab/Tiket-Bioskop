export const formatDate = (dateString) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "id-ID",
    options
  );
  return formattedDate;
};

export const formatMovieDate = (dateString) => {
  const options = { day: "numeric", month: "long" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "id-ID",
    options
  );
  return formattedDate;
};

export const imageBest = (file) => {
  const imagesUrl = "http://localhost:5000/uploads/" + file;

  return imagesUrl;
};

export const formatTime = (timeString) => {
  // Split the timeString by the colon
  const [hours, minutes] = timeString.split(":");

  // Return formatted time in HH:MM format
  return `${hours}:${minutes}`;
};
