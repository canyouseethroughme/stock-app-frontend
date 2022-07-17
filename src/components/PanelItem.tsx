import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, InputNumber, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useStorageProducts } from "src/hooks/useStorageItems";

interface PanelItemProps {
  name: string;
  measurementUnit?: string;
  quantity: number;
  getValue?: (value: number) => void;
  initialValue?: number;
  firstInitialValue?: number;
  enableEdit?: boolean;
  moreThanInitial?: boolean;
  itemId: string;
}

const { Title, Paragraph } = Typography;

export const PanelItem: React.FC<PanelItemProps> = ({
  name,
  measurementUnit,
  quantity,
  getValue,
  initialValue,
  firstInitialValue,
  enableEdit = false,
  moreThanInitial = false,
  itemId,
}) => {
  const [value, setValue] = useState<number>(initialValue ?? 0);
  const [firstValue, setFirstValue] = useState<number>(initialValue || 0);
  const [totalNoOfItems, setTotalNoOfItems] = useState<number>(0);

  const { isLoading: isStorageProductsLoading, data: storageItems } =
    useStorageProducts({ enabled: false });
  const location = useLocation();

  useEffect(() => {
    if (storageItems) {
      const foundIndex = storageItems.data.items.findIndex(
        (el) => el._id === itemId
      );
      if (foundIndex >= 0) {
        setTotalNoOfItems(storageItems.data.items[foundIndex].quantity);
      }
    }
  }, [storageItems]);

  useEffect(() => {
    setValue(initialValue || 0);
  }, [initialValue]);

  const minusOne = () => {
    setValue((prevState) => prevState - 1);
    getValue && getValue(value - 1);
  };

  const plusOne = () => {
    setValue((prevState) => prevState + 1);
    getValue && getValue(value + 1);
  };

  const leftItems = useMemo(
    () => totalNoOfItems + (firstValue || 0) - value,
    [value, totalNoOfItems, firstValue]
  );

  return (
    <>
      <div
        className="flex-row"
        style={{
          paddingTop: ".5rem",
          justifyContent: "space-between",
        }}
      >
        <div className="flex-column">
          <Title level={4}>{name}</Title>
          <Paragraph style={{ color: "grey" }}>{measurementUnit}</Paragraph>
        </div>
        {enableEdit ? (
          <div className="flex-column">
            {firstInitialValue && firstInitialValue > 0 && (
              <Paragraph style={{ color: "grey", textAlign: "center" }}>
                Initially ordered: {firstInitialValue}
              </Paragraph>
            )}
            <div className="flex-row">
              <Button
                type="text"
                size="large"
                disabled={value === 0}
                onClick={minusOne}
              >
                <MinusOutlined style={{ fontSize: "1.2rem" }} />
              </Button>

              <InputNumber
                value={value}
                max={12}
                min={0}
                style={{
                  width: "3rem",
                  fontSize: "1.2rem",
                  caretColor: "transparent",
                }}
                onKeyDown={(e) => e.preventDefault()}
              />
              {/* TODO: FIX DISABLED TO NOT WORK WITH MORE THAN THE ONES EXISTING IN STOCK */}
              <Button
                type="text"
                size="large"
                disabled={!moreThanInitial && value === firstValue}
                onClick={plusOne}
              >
                <PlusOutlined style={{ fontSize: "1.2rem" }} />
              </Button>
            </div>
            <Paragraph style={{ color: "grey", textAlign: "center" }}>
              {leftItems} left
            </Paragraph>
          </div>
        ) : (
          <Title level={4} style={{ marginRight: "2rem" }}>
            {initialValue}
          </Title>
        )}
      </div>
      <Divider style={{ margin: "0" }} />
    </>
  );
};
