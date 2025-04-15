import { Tooltip } from 'antd';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { DragableUploadListItemProps } from '../data';

const type = 'DragableUploadList';
const DragableUploadListItem = ({ originNode, moveRow, file, fileList, setDragFlagCallback }: DragableUploadListItemProps) => {

  const ref = useRef<HTMLDivElement>(null);
  const index = fileList.indexOf(file);

  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item: any) => {
      moveRow(item.index, index);
    },
  });

  const [, drag] = useDrag({
    type,
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => {
      setDragFlagCallback(true);
    },
  });

  drop(drag(ref));
  const errorNode = <Tooltip title="Upload Error">{originNode.props.children}</Tooltip>;

  return (
    <div ref={ref} style={{ cursor: 'move' }} className={`ant-upload-draggable-list-item ${isOver ? dropClassName : ''}`} >
      {file.status === 'error' ? errorNode : originNode}
    </div>
  );
};

export default DragableUploadListItem;