import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

type CountdownProps = { time: number };

const Countdown = ({ time }: CountdownProps) => {
  return (
    <FlipClockCountdown
      to={new Date().getTime() + time}
      labelStyle={{
        color: '#000',
        textTransform: 'uppercase',
        fontWeight: '500',
        fontSize: '13px',
      }}
      digitBlockStyle={{ fontSize: 'inherit', width: 27, height: 50 }}
      separatorStyle={{ color: '#000' }}
    >
      <span className="text-red-500 font-bold">The event has ended!</span>
    </FlipClockCountdown>
  );
};

export default Countdown;
