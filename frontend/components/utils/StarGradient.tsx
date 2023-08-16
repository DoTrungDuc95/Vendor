type StarGradientProps = {
  percent: number;
  id: number;
};

const StarGradient = ({ percent, id }: StarGradientProps) => {
  return (
    <svg width="0" height="0">
      <linearGradient
        id={'star-gradient-' + id}
        x1={`${percent}%`}
        y1="0%"
        x2={`${percent + 0.01}%`}
        y2="0%"
      >
        <stop style={{ stopColor: '#f6ba00', stopOpacity: 1 }} offset="0%" />
        <stop style={{ stopColor: '#ccc', stopOpacity: 1 }} offset="100%" />
      </linearGradient>
    </svg>
  );
};

export default StarGradient;
