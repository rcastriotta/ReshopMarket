import cn from 'classnames';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import { useRef } from 'react';

type ScrollbarProps = {
  options?: any;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
};

const Scrollbar: React.FC<ScrollbarProps> = ({
  options,
  children,
  style,
  className,
  id,
  ...props
}) => {
  return (
    <OverlayScrollbarsComponent
      id={id}
      options={{
        className: cn('os-theme-thin', className),
        scrollbars: {
          autoHide: 'scroll',
        },
        ...options,
      }}
      style={style}
      {...props}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};

export default Scrollbar;
