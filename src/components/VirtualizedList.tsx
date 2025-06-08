
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface VirtualizedListProps {
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  className?: string;
  gridClassName?: string;
}

const VirtualizedList: React.FC<VirtualizedListProps> = ({
  items,
  renderItem,
  className = "",
  gridClassName = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
}) => {
  const memoizedItems = useMemo(() => items, [items]);

  return (
    <div className={className}>
      <div className={gridClassName}>
        {memoizedItems.map((item, index) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {renderItem(item, index)}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VirtualizedList;
