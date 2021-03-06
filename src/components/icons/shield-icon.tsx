const ShieldIcon = ({
  color = '#02B290',
  width = '30',
  height = '30',
  className = '',
}) => {
  return (
    <svg
      width={width}
      height={height}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 64 64"
      enableBackground="new 0 0 64 64"
    >
      <g>
        <path
          fill={color}
          d="M57,10c-7.8,0-19-3.2-23.5-8.3l-1.4-1.6l-1.5,1.5C25.3,6.9,14.9,11,7,11H5v25c0,16.8,25.2,27.4,26.2,27.8l0.8,0.3l0.8-0.3
		C33.8,63.4,59,52.8,59,36V10H57z M55,36c0,12.7-18.9,22-23,23.8C27.9,58,9,48.7,9,36V14.9c7.9-0.5,17.2-4.2,22.9-9.2
		c5.4,4.8,15.2,7.7,23.1,8.2V36z"
        />
        <polygon
          fill={color}
          points="20.4,32.6 17.6,35.4 27,44.8 48.4,23.4 45.6,20.6 27,39.2 	"
        />
      </g>
    </svg>
  );
};

export default ShieldIcon;
