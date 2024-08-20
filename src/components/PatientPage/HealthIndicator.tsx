import GppGoodIcon from "@mui/icons-material/GppGood";

import { HealthCheckRating } from "../../types";

const HealthIndicator = ({ rating }: { rating: HealthCheckRating }) => {
  return (
    <div>
      Health rating: {HealthCheckRating[rating]}
      {rating === 0 && <GppGoodIcon color="success" />}
    </div>
  );
};

export default HealthIndicator;
