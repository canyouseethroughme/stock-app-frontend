import { Typography } from 'antd';
import React, { useState } from 'react';
import { StorageItemType } from 'services/storage';

interface StorageItemFormProps {
  item?: StorageItemType;
}

const { Text } = Typography;

export const StorageItemForm: React.FC<StorageItemFormProps> = ({ item }) => {
  const [name, setName] = useState<string | undefined>(item?.name);
  const [quantity, setQuantity] = useState<number | undefined>(item?.quantity);
  const [measurementUnit, setMeasurementUnit] = useState<string | undefined>(
    item?.measurementUnit
  );
  const [category, setCategory] = useState<string | undefined>(item?.category);

  return <div></div>;
};
