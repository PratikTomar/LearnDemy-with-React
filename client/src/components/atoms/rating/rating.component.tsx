import "./rating.css";

type ratingsProps = {
  ratings: number;
  reviews: number;
};

export default function Ratings(props: ratingsProps) {
  const maxRating = [1, 2, 3, 4, 5];
  const stars = maxRating.map((item) => {
    if (item <= props.ratings) {
      return <i key={item} className="fa-solid fa-star stars" />;
    }
  });

  return (
    <div className="rating-wrapper">
      <div>{props.ratings}</div>
      <div className="stars">{stars}</div>
      <div className="reviews">{`(${props.reviews})`}</div>
    </div>
  );
}
