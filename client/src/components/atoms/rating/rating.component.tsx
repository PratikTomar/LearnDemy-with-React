import "./rating.css";

type ratingsProps = {
  ratings: number;
  reviews: number;
};

const Ratings = (props: ratingsProps) => {
  const maxRating = [1, 2, 3, 4, 5];
  const stars = maxRating.map((item) => {
    const isFilled = item <= props.ratings;
    const isHalfFilled =
      props.ratings % 1 >= 0.5 && item === Math.floor(props.ratings) + 1;
    const starClassName = isFilled
      ? "fa-solid fa-star filled"
      : isHalfFilled
      ? "fa-solid fa-star-half"
      : "fa-solid fa-star";

    return <i key={item} className={starClassName} />;
  });
  return (
    <div className="rating-wrapper">
      <div className="ratings">{props.ratings}</div>
      <div className="stars">{stars}</div>
      <div className="reviews">{`(${props.reviews})`}</div>
    </div>
  );
};

export default Ratings;
