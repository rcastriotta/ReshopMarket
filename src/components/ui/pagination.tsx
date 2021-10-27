import RCPagination, { PaginationProps } from 'rc-pagination';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import 'rc-pagination/assets/index.css';

const Pagination: React.FC<PaginationProps> = (props) => {
  return (
    <RCPagination
      // nextIcon={<GrFormNext />}
      // prevIcon={<GrFormPrevious />}
      {...props}
    />
  );
};

export default Pagination;
